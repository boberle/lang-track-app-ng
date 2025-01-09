import { ScrollView, Text, StyleSheet, Linking } from "react-native";
import { ReactNode } from "react";
import { backgroundColor } from "@/const/colors";

const AboutPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Heading>À propos de l'application</Heading>
      <Paragraph>
        Nous avons développé l'application Lang-Track-App pour étudier quand, où
        et à quelle fréquence les apprenants de langues sont en contact avec
        différentes langues étrangères dans la vie quotidienne. Cela est crucial
        pour améliorer notre compréhension des défis de l'apprentissage des
        langues en dehors des salles de classe.
      </Paragraph>
      <Paragraph>
        Il est important que vous répondiez à chaque enquête dès que possible.
        Si vous ne répondez pas à une enquête, elle expirera automatiquement
        après 60 minutes.
      </Paragraph>
      <Heading>Traitement des données et Confidentialité</Heading>
      <Paragraph>
        En plus de vos réponses aux enquêtes, l'application enregistrera
        automatiquement la date et l'heure d'ouverture de chaque enquête et la
        soumission de vos réponses. L'application n'enregistrera aucune autre
        donnée, par exemple, concernant votre localisation.
      </Paragraph>
      <Text style={styles.paragraph}>
        Vous pouvez consulter la politique de confidentialité complète sur{" "}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://langtrackapp.com")}
        >
          langtrackapp.com
        </Text>
        .
      </Text>
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
    backgroundColor: backgroundColor,
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
