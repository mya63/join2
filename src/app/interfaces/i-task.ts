export interface IBoardCard {
  label: string;
  labelColor: 'blue' | 'green' | 'cyan' | 'orange';
  title: string;
  text: string;
  progress: number;
  subtasksText: string;
}
