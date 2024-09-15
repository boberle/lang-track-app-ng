import appConfig from "@/const/lta";

const baseURL = appConfig.backendURL;

export const buildListAssignmentsURL = (): URL => {
  return new URL(`assignments/`, baseURL);
};

export const buildGetAssignmentURL = (assignmentId: string): URL => {
  return new URL(`assignments/${assignmentId}/`, baseURL);
};

export const buildSubmitAssignmentURL = (assignmentId: string): URL => {
  return new URL(`assignments/${assignmentId}/`, baseURL);
};

export const buildRegisterDeviceURL = (): URL => {
  return new URL(`devices/register/`, baseURL);
};

export const buildTestNotificationURL = (): URL => {
  return new URL(`test-notification/`, baseURL);
};
