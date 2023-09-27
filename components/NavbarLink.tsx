"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarLinkProps {
  href: string;
  label: string;
}

const NavbarLink = (props: NavBarLinkProps) => {
  const { href, label } = props;

  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`${
          isActive ? "text-teal-200 underline underline-offset-4" : ""
        } hover:text-teal-200`}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavbarLink;
