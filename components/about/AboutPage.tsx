import { ScrollView, Text, StyleSheet, Linking } from "react-native";
import { ReactNode } from "react";

const AboutPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Heading>About the app</Heading>
      <Paragraph>
        We developed the Lang-Track-App to study when, where and how often
        language learners are in contact with different foreign languages in
        everyday life. This is crucial to improving our understanding of the
        challenges of language learning outside of classrooms.
      </Paragraph>
      <Paragraph>
        It's important that you answer each survey as soon as possible. If you
        don't answer a survey, it will automatically expire after 60 minutes.
      </Paragraph>
      <Paragraph>The project is a collaboration between TODO.</Paragraph>
      <Heading>Data processing and Privacy</Heading>
      <Paragraph>
        In addition to your survey responses, the app will automatically record
        the date and time when you opened each survey and when you submitted
        your answers. The app will not record any other data, e.g. about your
        location.
      </Paragraph>
      <Text style={styles.paragraph}>
        You can find the complete privacy policy{" "}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://idontexist.net")}
        >
          here (TODO)
        </Text>
        .
      </Text>
      <Heading>Links</Heading>
      <Paragraph>TODO</Paragraph>

      <Version>Version: 1.0.0</Version>
    </ScrollView>
  );
};

const Heading = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <Text style={styles.heading}>{children}</Text>;
};

const Paragraph = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <Text style={styles.paragraph}>{children}</Text>;
};

const Version = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <Text style={styles.version}>{children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 20,
  },
  version: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: "italic",
  },
  link: {
    color: "#007bff",
  },
});

export default AboutPage;
