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
};

const isAssignmentListResponse = (o: any): o is AssignmentListResponse => {
  if (typeof o !== "object" || !("assignments" in o)) return false;
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

const convertDAOToAssignmentList = (dao: any): AssignmentListItemType[] => {
  if (!isAssignmentListResponse(dao)) {
    throw new Error("Invalid assignment list data");
  }
  try {
    return dao.assignments.map((item) => ({
      id: item.id,
      title: item.title,
      answered: item.answered,
      date: new Date(item.date),
    }));
  } catch {
    throw new Error("Failed to convert DAO to assignment list");
  }
};

const useFetchAssignmentList = () => {
  const { data, isLoading, isError: isFetchError, fetchData } = useFetch();
  const [isError, setIsError] = useState<boolean>(false);
  const [assignmentList, setAssignmentList] = useState<
    AssignmentListItemType[]
  >([]);

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
      setAssignmentList([]);
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
