import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { useScreens } from "react-native-screens";
import ReduxThunk from "redux-thunk";

import * as Font from "expo-font";

import Navigator from "./navigation/Navigator";

import transactionsReducer from "./store/reducers/transactions";
import locationsReducer from "./store/reducers/locations";

import { init } from "./helpers/db";

import Colors from "./constants/Colors";

useScreens();

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  locations: locationsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

init()
  .then(() => {
    // console.log("Initialized database");
  })
  .catch((err) => {
    // console.log("Initializing db failed.");
    // console.log(err);
  });

class Container extends Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded) {
      return this.props.children;
    } else {
      return (
        <View style={{ flexDirection: "column", flex: 1, paddingTop: "50%" }}>
          <ActivityIndicator size="large" color={Colors.accent} />
        </View>
      );
    }
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <Container>
        <Navigator />
      </Container>
    </Provider>
  );
}
