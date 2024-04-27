import { Categories, ContestTypes, IContest, IQuizQuestion, Participant } from "../models";
import { auth, db } from "./firebase";

//Now import this
import "firebase/firestore";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getUserById } from "./userOperations";
export const addContest = async (
  name: string,
  description: string,
  start: Timestamp,
  end: Timestamp,
  max_participants: number,
  category: Categories,
  contestType: ContestTypes,
  questions?: IQuizQuestion[]
) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  try {
    // Use doc() to automatically generate a unique ID for the new contest document
    const userRef = doc(db, "users", user.uid);

    const docRef = await addDoc(collection(db, "contests"), {
      start, // Convert Timestamp to Date
      end, // Convert Timestamp to Date
      Participants: [], // Initialize Participants array
      completed: false, // Set completed flag to false
      title: name,
      description,
      organizer: user.uid, // Store the UID of the organizer
      max_participants,
      tags: "Dias",
      category,
      contestType,
      questions,
    });
    await updateDoc(userRef, {
      contests: arrayUnion(docRef.id),
    });

    console.log("contest is added");
    return docRef.id;
  } catch (error) {
    console.error("Error adding contest: ", error);
    throw new Error("Failed to add contest");
  }
};

export const removeContest = async (userId: string, contestId: string) => {
  try {
    // Get the contest document reference
    const contestDocRef = doc(db, "contests", contestId);

    // Check if the contest document exists
    const contestDocSnap = await getDoc(contestDocRef);

    if (contestDocSnap.exists()) {
      
      // Get the user reference
      const userRef = doc(db, "users", userId);

      // Update the user's contests field by removing the contestId
      await updateDoc(userRef, {
        contests: arrayRemove(contestId)
      });

      await removeContestFromParticipants(contestId)
    } else {
      console.log(`Contest with ID ${contestId} does not exist.`);
    }
  } catch (error) {
    console.error("Error removing contest:", error);
    throw new Error("Failed to remove contest");
  }
};


export const getContests = async () => {
  try {
    const contestsCollection = collection(db, "contests");
    const querySnapshot = await getDocs(contestsCollection);
    const contests: any = [];
    querySnapshot.forEach((doc) => {
      contests.push({ id: doc.id, ...doc.data() });
    });
    return contests;
  } catch (error) {
    console.log(error);
  }
};

export const getContestByID = async (id: string) => {
  try {
    const contestDoc = await getDoc(doc(db, "contests", id));
    if (contestDoc.exists()) {
      return { id: contestDoc.id, ...contestDoc.data() } as IContest;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addParticipant = async (userId: string, contestId: string) => {
  try {
    const contestDocRef = doc(db, "contests", contestId);
    const contestDocSnap = await getDoc(contestDocRef);

    if (contestDocSnap.exists()) {
      const contestData = contestDocSnap.data();

      // Check if the user is already participating
      if (contestData.Participants.includes(userId)) {
        console.log(`User ${userId} is already participating in this contest.`);
      } else {
        // Update the contest document with the new participant
        await updateDoc(contestDocRef, {
          Participants: [...contestData.Participants, {id: userId, points: 0}],
        });

        // Fetch user details
        const user = await getUserById(userId);
        if (user) {
          // Ensure that user.contests is defined before spreading it into an array
          const updatedContests = user.contests
            ? [...user.contests, contestId]
            : [contestId];

          // Update the user document with the new contest ID
          await updateDoc(doc(db, "users", userId), {
            contests: updatedContests,
          });

          console.log(`User ${userId} added as participant.`);
        } else {
          console.log(`User with ID ${userId} not found.`);
        }
      }
    } else {
      console.log(`Contest with ID ${contestId} does not exist.`);
    }
  } catch (error) {
    console.error("Error adding participant:", error);
  }
};

export const removeContestFromParticipants = async (contestId: string) => {
  try {
    // Get the contest document reference
    const contestDocRef = doc(db, "contests", contestId);

    // Check if the contest document exists
    const contestDocSnap = await getDoc(contestDocRef);
    if (contestDocSnap.exists()) {
      // Delete the contest document
      await deleteDoc(contestDocRef);
      console.log(
        `Contest with ID ${contestId} has been successfully removed.`
      );

      // Get the participants of the contest
      const contestData = contestDocSnap.data();
      if (contestData) {
        const { Participants } = contestData;

        // Update contests field for each participant by removing the contest ID
        const updatePromises = Participants.map(async (participantId: string) => {
          try {
            const user = await getUserById(participantId);
            if (user && user.contests) {
              const updatedContests = user.contests.filter(cId => cId !== contestId);
              await updateDoc(doc(db, 'users', participantId), {
                contests: updatedContests,
              });
              console.log(`Contest ID ${contestId} removed from user ${participantId}'s contests.`);
            }
          } catch (error) {
            console.error(`Error updating user ${participantId}'s contests:`, error);
          }
        });

        // Wait for all updates to complete
        await Promise.all(updatePromises);
      }
    } else {
      console.log(`Contest with ID ${contestId} does not exist.`);
    }
  } catch (error) {
    console.error("Error removing contest:", error);
    throw new Error("Failed to remove contest");
  }
};


// Function to calculate points for each participant and update the contest
export const calculateAndUpdatePoints = async (contestId: string, participantId: string, points: number) => {
    try {
        // Get the contest document reference
        const contestRef = doc(db, 'contests', contestId);
        const contestDoc = await getDoc(contestRef);

        if (contestDoc.exists()) {
            // Get the current contest data
            const contestData = contestDoc.data() as IContest;

            // Update participant's points
            const updatedParticipants = contestData.Participants.map((participant: Participant) => {
                if (participant.id === participantId) {
                    return { ...participant, points: points };
                }
                return participant;
            });

            // Update the contest document with the new participant points
            await updateDoc(contestRef, { Participants: updatedParticipants });
            console.log('Participant points updated successfully.');
        } else {
            console.error(`Contest with ID ${contestId} not found.`);
        }
    } catch (error) {
        console.error('Error updating participant points:', error);
    }
};
