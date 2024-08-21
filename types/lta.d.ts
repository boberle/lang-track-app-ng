type AssignmentListItemType = {
  id: number;
  title: string;
  answered: boolean;
  date: Date;
};

type AssignmentListType = {
  assignments: AssignmentListItemType[];
  total_assignments: number;
  answered_assignments: number;
  pending_assignments: number;
};
