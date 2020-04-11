import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = props => {
  let start = new Date();
  let intervalRef = null;

  const [timerData, setTimerData] = useState({});

  intervalRef = setInterval(_ => {
    let current = new Date();
    let count = +current - +start;

    let ms = count % 1000;
    let s = Math.floor(count / 1000) % 60;
    let m = Math.floor(count / 60000) % 60;

    setTimerData({
      milliSeconds: ms,
      seconds: s,
      minutes: s
    });
  }, 10);

  return (
    <View>
      <Text>
        {timerData.minutes} : {timerData.seconds} : {timerData.milliSeconds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  }
});

export default Timer;
