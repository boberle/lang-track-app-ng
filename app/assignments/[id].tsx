import { useLocalSearchParams } from "expo-router";
import Assigment from "@/components/assignment/Assigment";
import { router } from "expo-router";

const AssignmentsRoute = () => {
  const { id } = useLocalSearchParams();

  if (typeof id !== "string") {
    return null;
  }

  return (
    <Assigment
      assignmentId={parseInt(id)}
      onSubmit={(answers) => {
        console.log(answers);
        router.navigate("/");
      }}
      onClose={() => router.navigate("/")}
    />
  );
};

export default AssignmentsRoute;
