import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";

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
          <Link href={`/snippets`} className="p-2 border rounded">
            Delete
          </Link>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
