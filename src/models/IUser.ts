import { INotification } from ".";

export interface IUser {
    id?: string;
    role: string;
    name: string;
    email: string;
    password: string;
    bio?: string;
    notificaitons?: INotification[];
    contests?: string[];
}