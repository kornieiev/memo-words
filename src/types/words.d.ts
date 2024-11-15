// export interface WordProps {
//   definition: string;
//   folder: string;
//   id: string;
//   imageLink?: string | undefined;
//   learningStatus: string;
//   translation: string;
//   userId: string;
//   word: string;
// }

export interface WordProps {
  definition?: string;
  folder?: string;
  id?: string;
  imageLink?: string;
  learningStatus?: string;
  translation?: string;
  userId?: string;
  word?: string;
}

export interface FolderProps {
  id: string;
  folderName: string;
  folderDescription: string;
}
