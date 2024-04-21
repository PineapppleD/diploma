import { useEffect, useState } from "react";
import { IContest } from "../../models";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addParticipant,
  getContestByID,
} from "../../firebase/contestOperations";
import { useUserContext } from "../../contexts/userContext/userContextProvider";
import { getUserById } from "../../firebase/userOperations";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
// import LeaderBoard from "../../pages/LeaderBoard/LeaderBoard";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userId } = useUserContext();
  const [contest, setContest] = useState<IContest>();
  const [participants, setParticipants] = useState<any>();
  const [organizer, setOrganizer] = useState<any>();

  useEffect(() => {
    const getContest = async () => {
      const data = await getContestByID(id as string);
      setContest(data as IContest);
    };

    getContest();
  }, []);

  useEffect(() => {
    if (contest) {
      const fetchParticipants = async () => {
        const updatedParticipants = await Promise.all(
          contest.Participants.map(async (id: string) => {
            const user = await getUserById(id);
            console.log(user);
            return user;
          })
        );
        setParticipants(updatedParticipants);
      };

      const getOrganizer = async () => {
        const data = await getUserById(contest.organizer);
        setOrganizer(data);
        console.log("teacher", organizer);
      };

      getOrganizer();
      fetchParticipants();
    }
  }, [contest]);

  useEffect(() => {
    let unsubscribe: () => void;
    try {
      // Subscribe to contest document changes
      unsubscribe = onSnapshot(doc(db, "contests", id as string), (doc) => {
        setContest(doc.data() as IContest);
      });
    } catch (error) {
      console.log(error);
    }

    // Return the unsubscribe function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleJoinClick = async () => {
    try {
      if (user) {
        if (user.role === "student") {
          await addParticipant(userId as string, id as string);
          
          navigate(`/contestroom/:${id}`)
        } else {
          console.log("User is not a student.");
        }
      } else {
        console.log("No user is currently signed in.");
      }
    } catch (error) {
      console.error("Error handling join click:", error);
    }
  };

  const renderParticipants = () => {
    if ((!participants || participants.length === 0)) {
      return  <p className="text-gray-600">waiting for participants</p>;
    }

    return participants.map((participant: any) => (
      <div key={participant.id} className="mb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {participant.name}
        </span>
      </div>
    ));
  };

  return (
    contest && (
      <>
      <div className="bg-white shadow-md rounded-lg p-6 mt-20">
        <h2 className="text-2xl font-semibold mb-4">{contest.title}</h2>
        <p className="text-gray-700 mb-2">Description: {contest.description}</p>
        <p className="text-gray-700 mb-2">Start: {contest.start.toString()}</p>
        <p className="text-gray-700 mb-2">End: {contest.end.toString()}</p>
        {organizer && (
          <p className="text-gray-700 mb-2">Organizer: {organizer.name}</p>
        )}
        <p className="text-gray-700 mb-2">
          Number of Participants: {contest.Participants.length}
        </p>
        <p className="text-gray-700 mb-2">
          Completed: {contest.completed ? "Yes" : "No"}
        </p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Participants:</h3>
          {renderParticipants()}
        </div>
        {user?.role === "student" ? (
          <>
          {
            participants &&
            participants.includes(user) ? 
            <Link to="/contestRoom"></Link>
            :<button
            onClick={handleJoinClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Join
          </button>
          }
            {/* {
            <button
              onClick={handleJoinClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Leave
            </button> */}
          </>
        ) : null}
      </div>
      {/* <LeaderBoard /> */}
      </>
      
    )
  );
};

export default ContestDetails;
