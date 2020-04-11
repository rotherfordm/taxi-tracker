import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "./Card";

import { material } from "react-native-typography";

import Colors from "../constants/Colors";

const TransactionItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.transaction}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={styles.content}>
            <Text style={{ ...material.subheading, ...styles.headText }}>
              ID: {props.id}
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              Start time: {props.startTime}
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              End time: {props.endTime}
            </Text>

            <Text style={{ ...material.body1, ...styles.subText }}>
              Data from Google
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              Distance: {props.googleDistance}
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              Travel Time: {props.googleTravelTime}
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              Cost: {props.googleCost}
            </Text>

            <Text style={{ ...material.body1, ...styles.subText }}>
              App Data
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              Distance: {props.appDistance}
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              Travel Time: {props.appTravelTime}
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              Cost: {props.appCost}
            </Text>

            <Text style={{ ...material.body1, ...styles.subText }}>
              Actual Data
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              Distance: {props.actualDistance}
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              Travel Time: {props.actualTravelTime}
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              Cost: {props.actualCost}
            </Text>

            <Text style={{ ...material.body1, ...styles.subText }}>
              Location
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              From: {props.fromLocation}
            </Text>
            <Text style={{ ...material.body1, ...styles.bodyText }}>
              To: {props.toLocation}
            </Text>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  transaction: {
    height: 525,
    margin: 20,
    backgroundColor: Colors.accent,
  },
  touchable: {
    borderRadius: 7,
    overflow: "hidden",
  },
  content: {
    padding: 10,
  },
  headText: {
    fontFamily: "Montserrat-Regular",
    marginVertical: 0,
    marginTop: 5,
    marginBottom: 15,
    fontWeight: "bold",
    color: Colors.text,
  },
  subText: {
    fontFamily: "Montserrat-Regular",
    marginVertical: 0,
    marginTop: 10,
    fontWeight: "bold",
    color: Colors.text,
  },
  bodyText: {
    fontFamily: "Montserrat-Regular",
    marginVertical: 0,
    marginBottom: 2.5,
    color: Colors.text,
  },
});

export default TransactionItem;
