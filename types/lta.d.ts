type AssignmentListItemType = {
  id: number;
  title: string;
  answered: boolean;
  date: Date;
};

type PendingAssignmentType = {
  id: number;
  expiredAt: Date;
};

type AssignmentListType = {
  assignments: AssignmentListItemType[];
  totalAssignments: number;
  answeredAssignments: number;
  pendingAssignment: PendingAssignmentType | null;
};
