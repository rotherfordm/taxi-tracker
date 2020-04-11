import React from "react";
import { Text, StyleSheet } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { TouchableOpacity } from "react-native-gesture-handler";

import { searchLocation, geocodingLookup } from "../helpers/maps";

const SearchToLocationInput = props => {
  return (
    <Autocomplete
      onBlur={() => {
        props.setlocationTextBoxesFocused(false);
      }}
      onFocus={() => {
        props.setlocationTextBoxesFocused(true);
        props.setToLocationTextValue({
          toLocTextValue: ""
        });
      }}
      onEndEditing={() => {
        props.setIsWaitingForResults(true);
        searchLocation(
          props.toLocationTextValue
            ? props.toLocationTextValue.toLocTextValue
            : "",
          props.setToLocationResults,
          props.setIsWaitingForResults,
          props.setHasLocationResult
        );
      }}
      placeholder="I'm going to..."
      onChangeText={text => {
        props.setToLocationTextValue({
          toLocTextValue: text
        });
      }}
      data={props.toLocationResults.predictions}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            props.setToLocationTextValue({
              toLocTextValue: item.description
            });
            props.setFromLocation({
              latitude: props.userLocation.lat,
              longitude: props.userLocation.lng
            });
            searchLocation(
              item ? item.description : "",
              props.setToLocationResults,
              props.setIsWaitingForResults,
              props.setHasLocationResult
            );
            geocodingLookup(
              item ? item.description : "",
              props.setSelectedLocation,
              props.setHasLocationResult,
              props.setToLocationResults
            );
          }}
        >
          <Text style={styles.itemText}>{item.description}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => item.id.toString()}
      value={props.toLocationTextValue.toLocTextValue}
    />
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 15,
    margin: 2
  }
});

export default SearchToLocationInput;
