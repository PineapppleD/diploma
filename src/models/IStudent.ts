import { IContest, INotification } from ".";

export interface IStudent {
    id: string;
    contests: IContest[];
    notifications: INotification[];
    goals: string[];
}