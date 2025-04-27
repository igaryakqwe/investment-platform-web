import { API_URL } from "@/lib/constants";
import type { ErrorResponse } from "@/types/api";
import type { Project } from "@/types/project";
import type { CreateProjectDto } from "@/api/projects/projects.dto";

export const createProject = async (data: CreateProjectDto) => {
  try {
    const response = await fetch(
      `${API_URL}/projects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    
    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }
    
    return response;
  } catch (e) {
    throw e;
  }
};

export const uploadImage = async (data: FormData) => {
  try {
    const response = await fetch(
      `${API_URL}/project/photos/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      },
    );
    
    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }
    
    return (await response.json()) as string[];
  } catch (e) {
    throw e;
  }
};

export const getProjects = async (queryString?: string) => {
  try {
    const response = await fetch(
      `${API_URL}/project${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as Project[];
  } catch (e) {
    throw e;
  }
};
