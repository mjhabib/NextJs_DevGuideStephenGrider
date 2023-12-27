import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import * as actions from "@/actions";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

// if we log 'props' it's gonna pass an object called 'params' and inside it, is the name of our directory (id), so by getting that 'id' we can fetch specific data from our db.
export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 1100));
  // this delay is only here so we can test our custom loading page

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });
  // findFirst is a prisma method we're using to fetch data

  if (!snippet) {
    notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
  // we use bind here to convert the type of our id (number) to string because when we are dealing with forms, we need to pass on the type of string

  return (
    <div>
      <div className="flex justify-between m-4 items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// since during build time the next.js treat this page under the wildcard [id] into a dynamic page, we lose the benefit of caching. we can fix that by adding the function below with the exact name of 'generateStaticParams'
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
