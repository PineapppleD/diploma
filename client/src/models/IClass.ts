export interface Class {
    title: string;
    description: string;
    imgUrl: string;
    price?: number;
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
  