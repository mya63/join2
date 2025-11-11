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
