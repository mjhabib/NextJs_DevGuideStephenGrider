import HeaderAuth from "./header-auth";
import Link from "next/link";
import { Suspense } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import SearchInput from "./search-input";

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
          {/* we used this suspense here only to solve a warning in production mode, related to 'useSearchParams' hook we're using */}
          <Suspense>
            <SearchInput />
          </Suspense>
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
