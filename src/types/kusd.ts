import { User } from "./user";

export type KUSD = Omit<User, "phoneNumber" | "isActive">;
