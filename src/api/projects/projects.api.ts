import { API_URL } from "@/lib/constants";
import type { ErrorResponse } from "@/types/api";
import type { Project } from "@/types/project";

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
