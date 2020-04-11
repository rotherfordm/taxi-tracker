import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ColorPropType,
} from "react-native";

import Colors from "../constants/Colors";

import { material } from "react-native-typography";

const RunningStartCard = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={styles.locationOutputResultContainer}>
      <View style={styles.container}>
        <Text style={{ ...material.headline, ...styles.textHeader }}>
          Status
        </Text>
        <View style={styles.containerBorder} />
        {isVisible && (
          <View style={styles.container}>
            <Text style={{ ...material.subheading, ...styles.textHeader }}>
              Estimated data from Google
            </Text>
            <Text style={{ ...material.body1, ...styles.textBody }}>
              Shortest distance: {props.taxiResults.distance / 1000} km
            </Text>
            <Text style={{ ...material.body1, ...styles.textBody }}>
              Travel time: {props.taxiResults.time_str}
            </Text>
            <Text style={{ ...material.body1, ...styles.textBody }}>
              Estimated cost: {props.taxiResults.cost} Php
            </Text>
            <View style={styles.containerBorder} />
            <Text style={{ ...material.subheading, ...styles.textHeader }}>
              Current Data
            </Text>
            <Text style={{ ...material.body1, ...styles.textBody }}>
              Current distance: {props.currentData.haversineDistance} km
            </Text>
          </View>
        )}

        <View style={styles.containerBorder} />
      </View>

      {isVisible && (
        <TouchableHighlight
          onPress={() => {
            setIsVisible(false);
          }}
        >
          <Text style={styles.ShowHide}>Hide</Text>
        </TouchableHighlight>
      )}

      {!isVisible && (
        <TouchableHighlight
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <Text style={styles.ShowHide}>Show</Text>
        </TouchableHighlight>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  locationOutputResultContainer: {
    flexDirection: "column",
    flex: 1,
    position: "absolute",
    backgroundColor: Colors.accent,
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: "2.5%",
    paddingBottom: "5%",
    paddingRight: "5%",
    paddingLeft: "5%",
    borderRadius: 5,
    left: "3%",
    right: "3%",
    top: "5%",
    zIndex: 1,
    overflow: "hidden",
    elevation: 5,
  },
  container: {
    backgroundColor: Colors.accent,
  },
  textHeader: {
    fontFamily: "Montserrat-Regular",
    textAlignVertical: "center",
    textAlign: "center",
    color: Colors.text,
    marginBottom: 5,
    marginTop: 5,
  },
  textBody: {
    fontFamily: "Montserrat-Regular",
    color: Colors.text,
    marginBottom: 2.5,
    marginTop: 2.5,
    textAlign: "center",
  },
  containerBorder: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
  },
  ShowHide: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "right",
    color: Colors.text,
  },
});

export default RunningStartCard;
