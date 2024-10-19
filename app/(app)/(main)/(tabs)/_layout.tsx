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
          title: "Accueil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconHome focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconProfile focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerShown: true,
          title: "À propos",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconAbout focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
