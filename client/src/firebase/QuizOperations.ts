// import { addDoc, collection, } from "firebase/firestore";
// import { db } from "./firebase";
// import { IQuiz } from "../models";
// import { addContest } from "./contestOperations";

// export const addQuiz = async (quiz: IQuiz, contestInfo: any) => {
//   try {
//     // Add the contest information first
//     const contestId = await addContest(contestInfo.name, contestInfo.description, contestInfo.start, contestInfo.end, contestInfo.max_participants, contestInfo.category, contestInfo.contestType);

//     // Update the quiz object with the contest ID
//     const quizWithContestId = { ...quiz, contestId };

//     // Add the quiz document to the "quizzes" collection
//     const docRef = await addDoc(collection(db, "quizzes"), quizWithContestId);

//     // Return the ID of the newly added quiz document
//     return quizWithContestId.id;
//   } catch (error) {
//     console.error("Error adding quiz: ", error);
//     throw new Error("Failed to add quiz");
//   }
// };
