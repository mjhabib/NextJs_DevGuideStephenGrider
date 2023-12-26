import Link from "next/link";
import { db } from "@/db";
// since the 'db' directory contains index.tsx we don't need to specify the name 'index' in our import

export default async function HomePage() {
  const snippets = await db.snippet.findMany();
  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        className="flex justify-between items-center p-2 border rounded"
        href={`/snippets/${snippet.id}`}
        key={snippet.id}
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">New</Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}

// npm i prisma --save-dev (install prisma as 'dev' & client as 'dep')
// npx prisma init --datasource-provider sqlite
// then we're gonna add new models to the schema.prisma file
// npx prisma migrate dev --name SOME_NAME
// npx prisma studio (manage db)
