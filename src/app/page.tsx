import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";

export default async function HomePage() {
  const session = await auth();

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
      {session?.user ? (
        <div>{session.user.email} Is Signed In</div>
      ) : (
        <div>Signed Out</div>
      )}
      {/* the '?' after session makes sure that the session object is defined, if not the expression after ':' will executed */}

      <Profile />
    </div>
  );
}
