export interface Evaluation {
  id: string;
  studentUsername: string;
  jobAUsername: string;
  result: "Pass" | "Not Pass" | null;
  dateTime: Date | null;
  positionId: string;
}
