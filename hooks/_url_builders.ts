const baseURL = "http://localhost:8000/api/mobile/v1/";

export const buildListAssignmentsURL = (userId: number): URL => {
  const url = new URL(`assignments/`, baseURL);
  url.searchParams.append("user_id", userId.toString());
  return url;
};

export const buildGetAssignmentURL = (assignmentId: number): URL => {
  return new URL(`assignments/${assignmentId}/`, baseURL);
};
