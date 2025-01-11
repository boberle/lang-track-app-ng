import { useCallback } from "react";
import useFetchItem from "./_fetch_item";
import { buildListAssignmentsURL } from "./_url_builders";

type AssignmentListItemResponse = {
  id: string;
  title: string;
  answered: boolean;
  date: string;
};

type PendingAssignmentResponse = {
  id: string;
  expired_at: string;
};

type AssignmentListResponse = {
  assignments: AssignmentListItemResponse[];
  total_assignments: number;
  answered_assignments: number;
  pending_assignment?: PendingAssignmentResponse;
};

const isAssignmentListResponse = (o: any): o is AssignmentListResponse => {
  if (typeof o !== "object") return false;
  if (
    !(
      "assignments" in o &&
      "total_assignments" in o &&
      "answered_assignments" in o &&
      "pending_assignment" in o
    )
  )
    return false;

  if (
    typeof o.total_assignments !== "number" ||
    typeof o.answered_assignments !== "number"
  )
    return false;

  if (
    !(
      o.pending_assignment == null ||
      (typeof o.pending_assignment === "object" &&
        "expired_at" in o.pending_assignment &&
        typeof o.pending_assignment.expired_at === "string" &&
        "id" in o.pending_assignment &&
        typeof o.pending_assignment.id === "string")
    )
  )
    return false;

  if (!Array.isArray(o.assignments)) return false;

  return o.assignments.every(
    (item: any) =>
      typeof item === "object" &&
      typeof item.id === "string" &&
      typeof item.title === "string" &&
      typeof item.answered === "boolean" &&
      typeof item.date === "string",
  );
};

const convertDTOToAssignmentList = (dto: any): AssignmentListType => {
  if (!isAssignmentListResponse(dto)) {
    throw new Error("Invalid assignment list data");
  }
  try {
    const assignments: AssignmentListItemType[] = dto.assignments.map(
      (item) => ({
        id: item.id,
        title: item.title,
        answered: item.answered,
        date: new Date(item.date),
      }),
    );

    let pendingAssignment: PendingAssignmentType | null = null;
    if (dto.pending_assignment != null) {
      pendingAssignment = {
        id: dto.pending_assignment.id,
        expiredAt: new Date(dto.pending_assignment.expired_at),
      };
    }
    return {
      assignments,
      totalAssignments: dto.total_assignments,
      answeredAssignments: dto.answered_assignments,
      pendingAssignment: pendingAssignment,
    };
  } catch {
    throw new Error("Failed to convert DTO to assignment list");
  }
};

const useFetchAssignmentList = () => {
  const { item, isLoading, isError, fetchItem } =
    useFetchItem<AssignmentListType>(convertDTOToAssignmentList);

  const fetchAssignmentList = useCallback(
    (token: string) => {
      const url = buildListAssignmentsURL();
      fetchItem(url, { token });
    },
    [fetchItem],
  );

  return {
    assignmentList: item,
    fetchAssignmentList,
    isLoading,
    isError,
  };
};

export default useFetchAssignmentList;
