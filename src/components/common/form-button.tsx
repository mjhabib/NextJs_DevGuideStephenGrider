"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
// this 'useFormStatus hook', looks at the form in a parent component (topic-create-form.tsx), that's why we can not use it directly there, instead we created this separate file for it in order to use it in our parent component.

interface FormButtonProps {
  children: React.ReactNode;
}

export default function FormButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      {children}
    </Button>
  );
}
