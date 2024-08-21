const baseURL = "http://localhost:8000/api/mobile/v1/";

export const buildListAssignmentsURL = (userId: number): URL => {
  return new URL(`assignments/${userId}/`, baseURL);
};
