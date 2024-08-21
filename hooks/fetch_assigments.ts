import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import { buildListAssignmentsURL } from "./_url_builders";

type AssignmentListItemResponse = {
  id: number;
  title: string;
  answered: boolean;
  date: string;
};

type AssignmentListResponse = {
  assignments: AssignmentListItemResponse[];
  total_assignments: number;
  answered_assignments: number;
  pending_assignments: number;
};

const isAssignmentListResponse = (o: any): o is AssignmentListResponse => {
  if (typeof o !== "object") return false;
  if (
    !(
      "assignments" in o &&
      "total_assignments" in o &&
      "answered_assignments" in o &&
      "pending_assignments" in o
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
    return {
      assignments,
      total_assignments: dao.total_assignments,
      answered_assignments: dao.answered_assignments,
      pending_assignments: dao.pending_assignments,
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
    } catch (error) {
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
