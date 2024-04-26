import { Timestamp } from "firebase/firestore";
import { IQuizQuestion } from "./IQuizQuestion";

export enum Categories {
    MATH = "Math",
    PHYSICS = "Physics",
    FOREIGN_LANGUAGES = "Foreign languages"
}

export enum ContestTypes {
    Quiz = "Quiz",
    Collaborative = "Collaborative",
    PeerAssessment = "Peer Assessment",
  }
  

export interface IContest {
    id: string;
    title: string;
    description: string;
    start: Timestamp;
    end: Timestamp;
    organizer: string;
    Participants: string[];
    category: Categories;
    tags: string[];
    completed: boolean;
    max_participants: number;
    questions?: IQuizQuestion[];
}