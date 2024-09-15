import { Tabs } from "expo-router";
import Header from "@/components/common/Header";
import {
  TabBarIconAbout,
  TabBarIconHome,
  TabBarIconProfile,
} from "@/components/common/TabBarIcon";
import { tabBarBackgroundColor } from "@/const/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
        tabBarActiveTintColor: "steelblue",
        tabBarStyle: { backgroundColor: tabBarBackgroundColor },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconHome focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconProfile focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerShown: true,
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconAbout focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
