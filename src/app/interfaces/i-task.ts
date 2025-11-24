import { IContact } from "./i-contact";

export interface ITask {
    dbid?: string;
    createDate: string;
    ownerId: string;
    completed: boolean;
    dueDate: string;
    status: string | 'to-do' | 'in-progress' | 'await-feedback' | 'done';
    positionIndex: number;
    category:{ category: number, categoryProperties: { name: string; color: string }[]};
    title: string;
    description: string;
    assignTo: IContact[];
    priority: string | 'low' | 'medium' | 'urgent';
    subTasks: {subtaskTitle: string; subtaskCompleted: boolean}[];
}[]
