import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import { buildListAssignmentsURL } from "./_url_builders";

type AssignmentListItemResponse = {
  id: number;
  title: string;
  answered: boolean;
  date: string;
};

type PendingAssignmentResponse = {
  id: number;
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
        typeof o.pending_assignment.id === "number")
    )
  )
    return false;

  if (!Array.isArray(o.assignments)) return false;

  return o.assignments.every(
    (item: any) =>
      typeof item === "object" &&
      typeof item.id === "number" &&
      typeof item.title === "string" &&
      typeof item.answered === "boolean" &&
      typeof item.date === "string",
  );
};

const convertDAOToAssignmentList = (dao: any): AssignmentListType => {
  if (!isAssignmentListResponse(dao)) {
    throw new Error("Invalid assignment list data");
  }
  try {
    const assignments: AssignmentListItemType[] = dao.assignments.map(
      (item) => ({
        id: item.id,
        title: item.title,
        answered: item.answered,
        date: new Date(item.date),
      }),
    );

    let pendingAssignment: PendingAssignmentType | null = null;
    if (dao.pending_assignment != null) {
      pendingAssignment = {
        id: dao.pending_assignment.id,
        expiredAt: new Date(dao.pending_assignment.expired_at),
      };
    }
    return {
      assignments,
      totalAssignments: dao.total_assignments,
      answeredAssignments: dao.answered_assignments,
      pendingAssignment: pendingAssignment,
    };
  } catch {
    throw new Error("Failed to convert DAO to assignment list");
  }
};

const useFetchAssignmentList = () => {
  const { data, isLoading, isError: isFetchError, fetchData } = useFetch();
  const [isError, setIsError] = useState<boolean>(false);
  const [assignmentList, setAssignmentList] =
    useState<AssignmentListType | null>(null);

  const fetchAssignmentList = useCallback(
    async (userId: number) => {
      setIsError(false);
      const url = buildListAssignmentsURL(userId);
      fetchData(url);
    },
    [fetchData],
  );

  useEffect(() => {
    if (data === null) {
      setAssignmentList(null);
      return;
    }
    try {
      const convertedData = convertDAOToAssignmentList(data);
      setAssignmentList(convertedData);
    } catch {
      setIsError(true);
    }
  }, [data]);

  useEffect(() => {
    setIsError((prev) => prev || isFetchError);
  }, [isFetchError]);

  return {
    assignmentList,
    fetchAssignmentList,
    isLoading,
    isError,
  };
};

export default useFetchAssignmentList;
