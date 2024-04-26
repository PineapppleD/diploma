import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ContestFormValues } from './CreateContest';
import CreateQuiz from '../Quiz/CreateQuiz';

const CreateContestDetails: React.FC = () => {
  const location = useLocation();
  const [contestData, setContestData] = useState<ContestFormValues | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const contestName = searchParams.get('name');
    if (contestName) {
      const existingIncompletedContests = localStorage.getItem('incompletedContests');
      if (existingIncompletedContests) {
        const incompletedContests: ContestFormValues[] = JSON.parse(existingIncompletedContests);
        const selectedContest = incompletedContests.find(contest => contest.name === contestName);
        setContestData(selectedContest || null);
      }
    }
  }, [location.search]);

  return (
    <div>
      {contestData ? (
        <div>
          <h2>{contestData.name}</h2>
          <p>{contestData.description}</p>
          <CreateQuiz name={contestData.name}/>
        </div>
      ) : (
        <p>No contest data found.</p>
      )}
    </div>
  );
};

export default CreateContestDetails;
