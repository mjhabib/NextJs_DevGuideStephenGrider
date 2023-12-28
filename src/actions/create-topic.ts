"use server";

import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

// '?' here means we may or may not pass an object called 'name' or 'description'
// _form handles the errors related to our form like when our user is not logged in and wants to submit a topic. Also '_' in our name is just to make our name unique and it does not collide with an actual form name.
interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  // we need Promise to make sure both of these types are the same

  // we get these data (name, description) from our form in the 'topic-create-form' page
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  // form validation
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // user validation (logged in or not)
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }

  // save data in db
  // the reason we're creating this topic variable is because we don't know the slug until we save it into db so later on we can use it in our redirect.
  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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
          _form: ["Something went wrong"],
        },
      };
    }
  }

  // revalidate the homepage (purge cache)
  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
