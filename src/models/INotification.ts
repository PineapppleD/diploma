import { IStudent } from ".";

enum notificaiton_types {
    STUDENT_REQUEST = 'Join request',
    MESSAGE = 'Message'
}

export interface INotification {
    type: notificaiton_types.MESSAGE;
    content: string;
    from: IStudent | null;
}