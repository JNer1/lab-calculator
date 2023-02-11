import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavBarLinkProps {
  href: string;
  label: string;
}

const NavbarLink = (props: NavBarLinkProps) => {
  const { href, label } = props;
  const [isActive, setIsActive] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === href) setIsActive(true);
  }, [href, pathname]);

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
