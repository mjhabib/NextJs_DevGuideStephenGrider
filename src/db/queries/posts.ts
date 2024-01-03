import type { Post } from "@prisma/client";
import { db } from "@/db";

// '&' means combine 'Post' with other objects specified
export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

// Alternative way to auto-generate the type of objects specified above
// this way, we don't need to define a return type (promise) in our function below
// export type PostWithDate = Awaited<
//   ReturnType<typeof fetchPostByTopicSlug>
// >[number];

// Prisma queries
export function fetchPostByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug: slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
