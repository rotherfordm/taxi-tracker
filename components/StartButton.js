import React from "react";
import { StyleSheet, Button, Text } from "react-native";
import Colors from "../constants/Colors";

const StartButton = (props) => {
  return (
    <Button
      fontSize={18}
      fontFamily="Montserrat-Regular"
      color={Colors.primary}
      title="Start"
      onPress={props.onPress}
    />
  );
};

export default StartButton;
