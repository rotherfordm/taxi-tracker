import React from "react";
import { StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors";

const GenericButton = (props) => {
  return (
    <Button
      fontSize={18}
      fontFamily="Montserrat-Regular"
      color={Colors.primary}
      title={props.title}
      onPress={props.onPress}
    />
  );
};

const styles = StyleSheet.create({});

export default GenericButton;
