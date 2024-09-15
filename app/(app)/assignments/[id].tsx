import { useLocalSearchParams } from "expo-router";
import Assigment from "@/components/assignment/Assigment";
import { router } from "expo-router";

const AssignmentsRoute = () => {
  const { id } = useLocalSearchParams();

  if (typeof id !== "string") {
    return null;
  }

  return <Assigment assignmentId={id} onClose={() => router.replace("/")} />;
};

export default AssignmentsRoute;
