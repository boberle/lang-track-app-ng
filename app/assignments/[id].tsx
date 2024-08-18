import { useLocalSearchParams } from "expo-router";
import Assigment from "@/components/assignment/Assigment";
import { router } from "expo-router";

const AssignmentsRoute = () => {
  const { id } = useLocalSearchParams();

  if (typeof id !== "string") {
    return null;
  }

  const assignment = {
    id: parseInt(id),
    welcomeMessage: "Welcome to our survey!",
    submitMessage: "Thank you for completing the survey!",
    questions: [
      {
        message: "How satisfied are you with our service?",
        type: "singleChoice" as const,
        values: ["1 (Very Unsatisfied)", "2", "3", "4", "5 (Very Satisfied)"],
      },
      {
        message: "What aspects of our service did you find most helpful?",
        type: "multipleChoice" as const,
        values: ["Product", "Support", "Customer Service", "Price", "Location"],
      },
      {
        message: "What food did you enjoy most?",
        type: "multipleChoice" as const,
        values: ["Burgers", "Pizza", "Salads", "Desserts", "Drinks"],
      },
      {
        message: "Please provide any additional comments or feedback:",
        type: "openEnded" as const,
      },
    ],
  };

  return (
    <Assigment
      assignment={assignment}
      onSubmit={(answers) => {
        console.log(answers);
        router.navigate("/");
      }}
      onClose={() => router.navigate("/")}
    />
  );
};

export default AssignmentsRoute;
