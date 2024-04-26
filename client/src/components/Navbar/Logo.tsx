import { IoMdMenu } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setMenu: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function Logo({setMenu, className}: Props) {


  const handleMenuClick = () => {
    setMenu((menu: boolean) => !menu)
  }

  return (
    <div className="text-xl font-bold flex items-center">
      <IoMdMenu width={36} className={`inline md:hidden cursor-pointer ${className}`} onClick={handleMenuClick}/>
      EduHub
    </div>
  );
}
