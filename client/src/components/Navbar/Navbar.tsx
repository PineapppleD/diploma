import NavigationLinks from "./NavigationLinks";
import UserControls from "./UserControls";
import Logo from "./Logo";
import { useEffect, useState } from "react";

function Navbar() {

  const [menu, setMenu] = useState(false)

  useEffect(() => {
    console.log(menu)
  }, [menu])

  return (
    <nav className="py-4 top-0 w-full bg-transparent backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto flex items-start justify-between text-2xl font-open-sans">
        <Logo setMenu={setMenu}/>
        <NavigationLinks menu={menu}/>
        <UserControls />
      </div>
    </nav>
  );
}

export default Navbar;
