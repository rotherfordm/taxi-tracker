import React from "react";
import { Alert, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors";

const YourLocationButton = (props) => {
  return (
    <Button
      color={Colors.accent}
      title={"Your Location"}
      onPress={() => {
        props.getLocationHandler();

        if (props.userLocation) {
          props.mapView.animateToRegion(
            {
              latitude: props.userLocation.lat,
              longitude: props.userLocation.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            1000
          );
        } else {
          Alert.alert(
            "Location not found",
            "Please enable Location on your phone.",
            [{}],
            { cancelable: true }
          );
        }
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default YourLocationButton;
