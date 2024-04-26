import { useEffect, useState } from 'react'
import { useUserContext } from '../../contexts/userContext/userContextProvider'
import { IContest } from '../../models';
import { getContestByID } from '../../firebase/contestOperations';
import { Link } from 'react-router-dom';

export default function MyContests() {
  const { user } = useUserContext();
  const [contests, setContests] = useState<IContest[]>([]);

  useEffect(() => {
    const fetchContests = async () => {
      if (user && user.contests) {
        const contestPromises = user.contests.map(async (contestId) => {
          const contest = await getContestByID(contestId);
          return contest;
        });
        const resolvedContests = await Promise.all(contestPromises);
        // Filter out null and undefined values
        const validContests = resolvedContests.filter(contest => contest !== null && contest !== undefined) as IContest[];
        setContests(validContests);
      }
    };
    fetchContests();
  }, [user]);

  return (
    <div>
      <ul>
        {contests.map((contest, index) => (
          <li key={index}>
            <p>Description: {contest.description}</p>
            <p>Name: {contest.title}</p>
            <ul>
                <p>Quiz</p>
                <Link to={`contestroom/:${user?.contests && user.contests[index]}`}>Join the quiz</Link>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
