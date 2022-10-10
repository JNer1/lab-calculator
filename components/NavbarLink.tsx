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
      <Link href={href}>
        <a
          className={`${
            isActive ? "text-purple-500 underline underline-offset-4" : ""
          } hover:text-purple-500`}
        >
          {label}
        </a>
      </Link>
    </li>
  );
};

export default NavbarLink;
