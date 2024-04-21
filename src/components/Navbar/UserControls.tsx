import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/userContext/userContextProvider";
import { CgLogOut } from "react-icons/cg";
import { auth } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import NavbarBtn from "./NavbarBtn";

export default function UserControls() {
  const { user } = useUserContext();
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLoggedIn(true);
      setIsStudent(user.role === "student");
    } else {
      setLoggedIn(false);
      setIsStudent(false);
    }
  }, [user, loggedIn]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setLoggedIn(false);
      navigate("/");
    });
  };
  return (
    <div className="flex justify-between">
      {loggedIn ? (
        <div className="flex items-center">
          {isStudent && (
            <Link to="/progress" className="mr-4 hover:text-gray-400">
              My Progress
            </Link>
          )}
          <div className="mr-4">{name}</div>
          <Button
            onClick={handleLogout}
            className="hover:text-gray-400 flex items-center"
          >
            <CgLogOut className="mr-1 w-5 h-full" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <NavbarBtn to={'login'}>Login</NavbarBtn>
          <NavbarBtn classname="hidden md:block" to={'register'}>Register</NavbarBtn>
        </div>
      )}
    </div>
  );
}
