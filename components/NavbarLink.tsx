import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface NavBarLinkProps {
  href: string;
  label: string;
}

const NavbarLink = (props: NavBarLinkProps) => {
  const { href, label } = props;
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === href) setIsActive(true);
  }, [href, router.pathname]);

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
