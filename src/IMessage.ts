export default interface IMessage {
  id: number;
  authorId: number;
  customId: number;
  text: string;
  buttons: IButton[];
  title: string;
  imageUrl: string;
  timestamp: string;
  parsedDate: string;
  own: boolean
}

export interface IButton {
  title: string;
  postback: string;
}