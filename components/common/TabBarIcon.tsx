import { Ionicons } from "@expo/vector-icons";

type TabBarIconProps = {
  name:
    | "home"
    | "home-outline"
    | "information-circle"
    | "information-circle-outline"
    | "person"
    | "person-outline";
  color: string;
};

const TabBarIcon = ({ name, color }: TabBarIconProps) => {
  return <Ionicons name={name} size={24} color={color} />;
};

export type SpecificTabBarIconProps = {
  focused: boolean;
  color: string;
};

export const TabBarIconHome = ({ focused, color }: SpecificTabBarIconProps) => {
  return <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />;
};

export const TabBarIconAbout = ({
  focused,
  color,
}: SpecificTabBarIconProps) => {
  return (
    <TabBarIcon
      name={focused ? "information-circle" : "information-circle-outline"}
      color={color}
    />
  );
};

export const TabBarIconProfile = ({
  focused,
  color,
}: SpecificTabBarIconProps) => {
  return (
    <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />
  );
};
