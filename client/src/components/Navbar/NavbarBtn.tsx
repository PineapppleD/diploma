import Button from "../Button";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  to: "login" | "register";
  classname?: string;
};

export default function NavbarBtn({ children, classname, to }: Props) {
  return (
    <Link to={`/${to}`} className={`mr-4 hover:text-gray-400 flex items-center ${classname}`}>
      <Button>
        <BiLogIn width={18} className="block md:hidden" />
        <span className="hidden md:inline-block">{children}</span>
      </Button>
    </Link>
  );
}
