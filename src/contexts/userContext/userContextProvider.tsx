import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
import { IUser } from '../../models/';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";

type Props = {
    children: ReactNode;
}

type UserContextType = {
    user: IUser | null;
    userId: string | null;
}

const UserContext = createContext<UserContextType>({ user: null, userId: null });

export default function UserContextProvider({ children }: Props) {
    const [user, setUser] = useState<IUser | null>(null);
    const [userId, setId] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const id = currentUser.uid;
                const docRef = doc(db, "users", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log(docRef)
                    setUser(docSnap.data() as IUser);
                    setId(id)
                } else {
                    console.log("No such document!");
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <UserContext.Provider value={{ user, userId }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}
