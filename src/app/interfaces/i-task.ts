export interface ITask {
    dbid?: string;
    createDate: string;
    ownerId: string;
    completed: boolean;
    dueDate: string;
    status: string | 'to-do' | 'in-progress' | 'await-feedback' | 'done';
    positionIndex: number;
    category: { name: string; color: string };
    title: string;
    description: string;
    assignTo: string[];
    priority: string | 'low' | 'medium' | 'high';
    subTasks: ITask[];
}[]
