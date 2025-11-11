// ---------------------------------(EXPERIMENTAL)
export interface IAvatar {
  initials: string;
  color: string;
}

export interface IBoardCard {
  id: string;
  label: string;
  labelColor: 'blue' | 'green' | 'cyan' | 'orange';
  title: string;
  text: string;
  progress: number;
  subtasksText: string;
  avatars: IAvatar[];
  priority: 'low' | 'medium' | 'urgent';
}

export interface BoardColumn {
  title: string;
  cards: IBoardCard[];
}

// ---------------------------------(ADAM)

export interface ITask {
  dbid?: string;
  positionIndex?: number;

  createDate: string;
  ownerId: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  priority: string | 'low' | 'medium' | 'high';
  assignTo: string[];
  category: { name: string; color: string };
  subTasks: ITask[];
  status: string | 'to-do' | 'in-progress' | 'await-feedback' | 'done';
}
[];
