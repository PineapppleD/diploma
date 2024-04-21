import { setDoc, getDocs, getDoc, collection, doc } from "firebase/firestore";
import { IUser } from "../models";
import { db } from "./firebase";

export const addUser = async (userId: string, user: IUser) => {
  try {
    const docRef = doc(db, "users", userId); // Use custom ID here
    await setDoc(docRef, user); // Use setDoc instead of addDoc to specify the custom ID
    console.log("Document added with ID: ", userId);
    return userId; // Return the custom ID
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const getUsers = async () => {
  try {
    const userCollection = collection(db, "users");
    const querySnapshot = await getDocs(userCollection);
    const users: any = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", id));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as IUser; // Return the user object
    } else {
      return null; // User document does not exist
    }
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// export const setGoal = async (id: string) => {
//   const user = await getUserById(id);
//   if (user && user.role) {

//   }
// }