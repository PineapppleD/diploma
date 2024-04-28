import { Timestamp } from "firebase/firestore";
import { INotification } from ".";

export interface Video {
  id: string;
  title: string;
  description: string;
  url?: string; // Optional URL for the video
  thumbnailUrl?: string | undefined; // Optional thumbnail URL
  createdAt?: Timestamp; // Optional creation date
  // Add more video properties as needed
}

export interface IUser {
  id?: string;
  role: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  notificaitons?: INotification[];
  contests?: string[];
  videos?: Video;
}
