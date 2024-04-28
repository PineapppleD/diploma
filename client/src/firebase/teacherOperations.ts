import { db } from "./firebase";
import { doc, updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore";
import { Video } from "../models";

export const addVideoToFirestore = async (
  videoData: Video,
  userId?: string
) => {
  if (!userId) return; // Handle missing user ID

  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      videos: arrayUnion(videoData), // Add video to user's videos field using arrayUnion
    });
  } catch (error) {
    console.error("Error adding video to user's videos field:", error);
  }
};

export const addClass = async (videoData: Video, userId?: string) => {
    try {
      const videosCollectionRef = collection(db, "videos");
      await addDoc(videosCollectionRef, {
        ...videoData,
        uploadedBy: userId, // Add uploadedBy field for user association
      });
    } catch (error) {
      console.error("Error adding video data to Firestore:", error);
    }
  };