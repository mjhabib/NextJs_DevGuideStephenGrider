import { db } from "@/db";
import { redirect } from "next/navigation";

export default function CreateSnippetPage() {
  async function createSnippet(formDate: FormData) {
    "use server";
    const title = formDate.get("title") as string;
    const code = formDate.get("code") as string;
    // the 'title' & 'code' come from our form 'name property'
    // 'as string' tells TS we are getting string data from our form not other types of data like a file (because we can also submit a file to a form)

    const snippet = await db.snippet.create({
      data: {
        title: title,
        code: code,
        // since these keys/values are identical, we could shorten them out to just 'title,' and 'code'
      },
    });
    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet!</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        <button className="rounded p-2 bg-blue-200" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
