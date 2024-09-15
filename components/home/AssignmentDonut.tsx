import { Text, View, ViewStyle, StyleSheet } from "react-native";
import Svg, { G, Circle, Text as SvgText, TSpan } from "react-native-svg";
import {
  donutSectionBackgroundColor,
  donutSectionBorderColor,
} from "@/const/colors";

export type AssignmentDonutProps = {
  style?: ViewStyle;
  answeredAssignments: number;
  totalAssignments: number;
};

const AssignmentDonut = ({
  style,
  answeredAssignments,
  totalAssignments,
}: AssignmentDonutProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.flexContainer, style]}>
        <Donut proportion={answeredAssignments / totalAssignments} />
        <Message
          answeredAssignments={answeredAssignments}
          totalAssignments={totalAssignments}
        />
      </View>
    </View>
  );
};

type MessageProps = {
  answeredAssignments: number;
  totalAssignments: number;
};

const Message = ({ answeredAssignments, totalAssignments }: MessageProps) => {
  return (
    <View style={styles.message}>
      <SmileyFace proportion={answeredAssignments / totalAssignments} />
      <Text>You have answered</Text>
      <Text>
        {answeredAssignments} of your {totalAssignments}
      </Text>
      <Text>assigned surveys.</Text>
    </View>
  );
};

type SmileyFaceProps = {
  proportion: number;
};

const SmileyFace = ({ proportion }: SmileyFaceProps) => {
  let smiley: string;
  if (proportion >= 0.9) {
    smiley = "🌟";
  } else if (proportion >= 0.8) {
    smiley = "😁";
  } else if (proportion >= 0.5) {
    smiley = "👍";
  } else if (proportion >= 0.25) {
    smiley = "😏";
  } else {
    smiley = "😬";
  }

  return <Text style={styles.smileyFace}>{smiley}</Text>;
};

type DonutProps = {
  proportion: number;
};

const Donut = ({ proportion }: DonutProps) => {
  return (
    <View style={styles.donutContainer}>
      <View style={styles.donut}>
        <Svg viewBox="0 0 38 38">
          <G strokeWidth="4">
            <Circle
              transform="rotate(-90 19 19)"
              fill="transparent"
              cx="19"
              cy="19"
              r="16"
              strokeDasharray={`${(proportion * 100 + proportion).toFixed(1)} 100`}
              strokeDashoffset="0"
              stroke="#6e9650"
            ></Circle>
            <Circle
              transform="rotate(-90 19 19) translate(0, 38) scale(1, -1)"
              fill="transparent"
              cx="19"
              cy="19"
              r="16"
              strokeDasharray={`${(101 - (proportion * 100 + proportion)).toFixed(1)} 100`}
              strokeDashoffset="0"
              stroke="#ddd"
            ></Circle>
          </G>
          <SvgText
            x="18"
            y="20"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontSize={6}
          >
            <TSpan dx="0" dy="0">
              {Math.round(proportion * 100)}%
            </TSpan>
          </SvgText>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    backgroundColor: donutSectionBackgroundColor,
    borderColor: donutSectionBorderColor,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  donutContainer: {
    padding: 0,
    flex: 1,
  },
  donut: {},
  message: {
    padding: 5,
    width: "50%",
    flex: 1,
    alignItems: "center",
  },
  smileyFace: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default AssignmentDonut;
