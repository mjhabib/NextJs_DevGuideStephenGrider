"use client";
import Editor from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { useState } from "react";
import * as actions from "@/actions";
// this importing used when we have a lot of actions that we need to use in our project

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  function handleEditorChange(value: string = "") {
    setCode(value);
  }

  // the first arg in 'bind method' is always 'null', the second is whatever the first arg of our 'server action', and third is the 'code' we're gonna update.
  const editSnippetAction = actions.editSnippet.bind(
    null,
    snippet.id,
    code
  );

  return (
    <div>
      {" "}
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
