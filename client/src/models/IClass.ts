export enum Category {
  CREATIVITY = "Creativity",
  EXACT_SCIENCE = "Exact science",
  BUSINESS = "Business",
  TECHNOLOGY = "Technology",
  HUMANITIES = "Humanities",
};

export enum Level {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
};

export interface Class {
  title: string;
  description: string;
  imgUrl: string;
  price?: number | null;
  category: Category;
  level: Level;
  sections: Section[];
}

export interface Section {
  title: string;
  lectures: Lecture[];
}

export interface Lecture {
  title: string;
  type: string;
  url?: string; // Optional for video lectures
  content?: string; // Optional for text lectures
  quizData?: any;
}
