export type Role = "user";

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  name: string | null;
  description: string | null;
  role: Role;
  isApproved: boolean;
  isLegal: boolean;
  avatarLink: string | null;
}

export interface ChatUser {
  name: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  avatarLink: string | null;
  userId: string;
}
