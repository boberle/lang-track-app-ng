const baseURL = "http://192.168.1.18:8000/api/mobile/v1/";

export const buildListAssignmentsURL = (): URL => {
  return new URL(`assignments/`, baseURL);
};

export const buildGetAssignmentURL = (assignmentId: number): URL => {
  return new URL(`assignments/${assignmentId}/`, baseURL);
};

export const buildSubmitAssignmentURL = (assignmentId: number): URL => {
  return new URL(`assignments/${assignmentId}/`, baseURL);
};
