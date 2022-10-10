import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex w-full justify-center py-4">
      <ul className="flex gap-8 ">
        <li>
          <Link href="/">Agar</Link>
        </li>

        <li>
          <Link href="/antibiotic">Antibiotic</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
