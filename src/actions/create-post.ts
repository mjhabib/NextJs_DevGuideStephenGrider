"use server";

import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });
  // we need to save our 'topicId' inside of our 'post table' in db, that's why we need to first reach out to our 'topic table' in db and find its 'topicId'.

  if (!topic) {
    return {
        errors: {
            _form: ['Can not find topic']
        }
    }
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create post"],
        },
      };
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
