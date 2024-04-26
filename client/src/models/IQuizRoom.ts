export interface IQuizRoom {
  id: string;
  name: string;
  participants: string[]; // Array of participant user IDss
  quizId: string; // ID of the quiz associated with the room
  status: QuizRoomStatus; // Status of the quiz room (e.g., pending, active, completed)
  timer: number; // Timer duration in seconds
  currentQuestionIndex: number; // Index of the current question being asked
}

export enum QuizRoomStatus {
  Pending = "Pending",
  Active = "Active",
  Completed = "Completed",
}
