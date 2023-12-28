"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();

  if (session.data?.user) {
    return <div>From client: {session.data.user.email} is signed in</div>;
  }
  return <div>From client: user in NOT signed in</div>;
}
