import { API_URL } from "@/lib/constants";
import type { ErrorResponse } from "@/types/api";
import type { Project } from "@/types/project";
import type {
  CreateInvestmentDto,
  CreateProjectDto,
} from "@/api/projects/projects.dto";
import { generateAuthHeaders } from "@/utils/auth.utils";

export const createProject = async (data: CreateProjectDto) => {
  try {
    const response = await fetch(`${API_URL}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
      body: JSON.stringify({
        ...data,
        ...{
          estimatedCost: 0,
          currencyType: "UAH",
          projectType: "INVESTMENT",
        },
      }),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (e) {
    throw e;
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const response = await fetch(`${API_URL}/project/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as Project;
  } catch (e) {
    throw e;
  }
};

export const uploadImage = async (data: FormData) => {
  try {
    const response = await fetch(`${API_URL}/project/photos/upload`, {
      method: "POST",
      headers: {
        ...generateAuthHeaders(),
      },
      body: data,
    });

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

export const createInvestment = async (body: CreateInvestmentDto) => {
  try {
    const response = await fetch(`${API_URL}/investments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (e) {
    throw e;
  }
};
