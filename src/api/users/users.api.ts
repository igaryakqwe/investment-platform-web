import { type UserUpdateDto } from "@/api/users/users.dto";
import { API_URL } from "@/lib/constants";
import type { ErrorResponse } from "@/types/api";
import { type ChatUser, type User } from "@/types/user";
import { generateAuthHeaders } from "@/utils/auth.utils";
import type { Investment } from "@/types/investment";

export const updateUser = async (data: UserUpdateDto, id: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
      body: JSON.stringify({ ...data }),
    });

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.message);
    }
  } catch (e) {
    throw e;
  }
};

export const updateUserAvatar = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_URL}/users/avatars/upload`, {
      method: "PATCH",
      headers: {
        ...generateAuthHeaders(),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.message);
    }
  } catch (e) {
    throw e;
  }
};

export const getUserChats = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/chats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
    });

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.message);
    }

    const chats = (await response.json()) as ChatUser[];

    return chats.map((chat) => ({
      id: chat.userId,
      name: chat.name,
      firstName: chat.firstName,
      lastName: chat.lastName,
      middleName: chat.middleName,
      avatarLink: chat.avatarLink,
    })) as User[];
  } catch (e) {
    throw e;
  }
};

export const getUserInvestments = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/investments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
    });

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.message);
    }

    return (await response.json()) as Investment[];
  } catch (e) {
    throw e;
  }
};

export const getInvestmentCertificate = async (investmentId: string) => {
  try {
    const response = await fetch(`${API_URL}/investments/${investmentId}/certificates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        ...generateAuthHeaders(),
      },
    });
    
    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.message);
    }
    
    return (await response.blob());
  } catch (e) {
    throw e;
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
    });

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.message);
    }

    return (await response.json()) as User;
  } catch (e) {
    throw e;
  }
};
