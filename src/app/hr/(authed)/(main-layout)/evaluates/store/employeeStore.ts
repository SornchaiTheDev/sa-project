import { atom } from "jotai";
import { Employee } from "~/types/employee";

export const employeeAtom = atom<Employee>({
  username: "",
  firstName: "",
  lastName: "",
  profileImage: "",
  positionID: "",
  positionName: "",
});
