import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext/userContextProvider";

type Props = {
  menu: boolean;
};

const NavigationLinks = ({ menu }: Props) => {
  const { user } = useUserContext();

  return (
    <nav
      className={`md:flex text-base items-center justify-between lg:text-2xl lg:w-2/6 ${
        menu ? "flex flex-col gap-2" : "hidden"
      } w-1/3`}
    >
      {user ? (
        <>
          <Link to="/contests">Contests</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About Us</Link>
        </>
      )}
    </nav>
  );
};

export default NavigationLinks;
