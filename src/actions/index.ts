// here we're gonna define all the 'server action components' that we're not allowed to define them inside a file that is using 'client components', then we simply pass them around.

"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  redirect("/");
}

export async function createSnippet(
  formState: { msg: string },
  formDate: FormData
) {
  try {
    const title = formDate.get("title");
    const code = formDate.get("code");
    // the 'title' & 'code' come from our form 'name property'

    if (typeof title !== "string" || title.length < 3) {
      return { msg: "The title must be longer" };
    }
    if (typeof code !== "string" || code.length < 10) {
      return { msg: "The code must be longer" };
    }

    await db.snippet.create({
      data: {
        title: title,
        code: code,
        // since these keys/values are identical, we could shorten them out to just 'title,' and 'code'
      },
    });

    // throw new Error("Failed to save data into the database.");
    // just by throwing an error here without any try-catch, the next.js is gonna call the error page which does not contains the functions of this page which is not very user-friendly, instead we want show an error msg to the user so he/she can try again.
    
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { msg: err.message };
    } else {
      return { msg: "Something went wrong!" };
    }
  }
  redirect("/");
}
