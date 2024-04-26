import { Link } from "react-router-dom";
import { IContest } from "../../models";
import { useUserContext } from "../../contexts/userContext/userContextProvider";
import { removeContest } from "../../firebase/contestOperations";

type Props = {
  contest: IContest;
};

export const Contest = ({ contest }: Props) => {

    const {userId} = useUserContext();
    const handleClick = () => {
      if (userId) removeContest(userId, contest.id)
    }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      { contest.organizer === userId ? 
        <button onClick={handleClick}>delete</button> : null}
      <h2 className="text-xl font-bold mb-2">{contest.title}</h2>
      {/* <p className="text-gray-600 mb-2">Prize: {contest.prize}</p> */}
      <p className="text-gray-600 mb-2">
        Start: {contest.start.toString()}
      </p>
      <p className="text-gray-600 mb-2">
        End: {contest.end.toString()}
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
        <Link to={`/contest/${contest.id}`}>Details</Link>
      </button>
    </div>
  );
};