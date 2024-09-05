import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import Footer from "@/components/assignment/common/Footer";
import { ReactNode } from "react";

type IconType = "done" | "single" | "multiple" | "open-ended";

export type BaseQuestionProps = {
  children: ReactNode | ReactNode[];
  iconType: IconType;
  onNext: () => void;
  onPrevious: () => void;
  nextButtonLabel?: string;
  enableNextButton: boolean;
};

export type QuestionProps = {
  message: string;
  onNext: () => void;
  onPrevious: () => void;
  enableNextButton: boolean;
};

const BaseQuestionLayout = ({
  children,
  iconType,
  onNext,
  onPrevious,
  nextButtonLabel = "Next",
  enableNextButton,
}: BaseQuestionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon type={iconType} />
      </View>
      <View style={styles.message}>{children}</View>
      <View style={styles.footer}>
        <Footer
          mainButtonLabel={nextButtonLabel}
          mainButtonPress={onNext}
          secondaryButtonLabel={"Previous"}
          secondaryButtonPress={onPrevious}
          enableMainButton={enableNextButton}
        />
      </View>
    </View>
  );
};

const Icon = ({ type }: { type: IconType }) => {
  let file: ImageSourcePropType | null = null;
  switch (type) {
    case "done":
      file = require("./icons/icon_done.png");
      break;
    case "single":
      file = require("./icons/icon_single.png");
      break;
    case "multiple":
      file = require("./icons/icon_multiple.png");
      break;
    case "open-ended":
      file = require("./icons/icon_text.png");
      break;
  }

  if (file == null) {
    return null;
  }

  return (
    <View>
      <Image source={file} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginBottom: 10,
    marginTop: 40,
    flex: 1,
    alignItems: "center",
  },
  message: {
    padding: 25,
  },
  footer: {
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default BaseQuestionLayout;
