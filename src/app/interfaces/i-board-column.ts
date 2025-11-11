import { IBoardCard } from '../interfaces/i-task';

export interface BoardColumn {
  title: string;
  cards: IBoardCard[];
}
