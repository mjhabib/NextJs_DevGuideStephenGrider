"use client";

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, { errors: {} });
  // both these args must be the same type otherwise, we're gonna get a type error, and since these args come from our server action, we need to deal with their type there.

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col p-4 gap-4 w-80">
            <h3 className="text-lg">Create a topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            {/*   "!!" will convert our value to a boolean   */}
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />

            {/* user (login) validation error handling */}
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
