import HeaderAuth from "./header-auth";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from "@nextui-org/react";

export default function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}

// if we build this project as is, the next.js is gonna mark all of the pages as dynamic, simply because we're using the header in all of our pages (layout). And since inside the header we're using authentication which deals with cookies and other features, the whole project is gonna be dynamic which is not very efficient when we care about speed/performance (caching).
// solution: we can put our auth in a separate client component called HeaderAuth and call it here.
