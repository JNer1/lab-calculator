import NavbarLink from "./NavbarLink";

const Navbar = () => {
  return (
    <nav className="flex w-full justify-center py-4">
      <ul className="flex gap-8 ">
        <NavbarLink href="/" label="Agar" />
        <NavbarLink href="/antibiotic" label="Antibiotic" />
      </ul>
    </nav>
  );
};

export default Navbar;
