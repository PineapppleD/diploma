import { useEffect, useState } from "react";
// import { getContests } from "../../firebase/contestOperations";
import { IContest } from "../../models";
import { Contest } from "./Contest";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Contests = () => {
  const [contests, setContests] = useState<IContest[]>([]);

  useEffect(() => {
    // Fetch contests initially
    // const fetchContests = async () => {
    //   try {
    //     const contestsData = await getContests();
    //     setContests(contestsData);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // Subscribe to real-time updates for contests
    const unsubscribe = onSnapshot(collection(db, "contests"), (snapshot) => {
      const updatedContests: IContest[] = [];
      snapshot.forEach((doc) => {
        updatedContests.push({ id: doc.id, ...doc.data() } as IContest);
      });
      setContests(updatedContests);
    });

    // Clean up function to unsubscribe from real-time updates
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-4">Contests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contests.map((contest: IContest) => (
          <Contest contest={contest} key={contest.id} />
        ))}
      </div>
    </div>
  );
};

export default Contests;
