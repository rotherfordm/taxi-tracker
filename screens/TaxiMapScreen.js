import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";

import ENV from "../env";

import Colors from "../constants/Colors";

import YourLocationButton from "../components/YourLocationButton";
import SearchToLocationInput from "../components/SearchToLocationInput";
import StartButton from "../components/StartButton";

import RunningStartCard from "../components/RunningStartCard";

import { reverseGeocodingSearch } from "../helpers/maps";
import { getDistance } from "../helpers/maps";
import { getCost } from "../helpers/cost";
import { getHaversineDistance } from "../helpers/haversine";

import GenericButton from "../components/GenericButton";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import MapStyle from "../constants/MapStyle";

import { useDispatch } from "react-redux";

import * as transactionsActions from "../store/actions/transactions";

const TaxiMapScreen = (props) => {
  const initialLocation = props.navigation.getParam("initialLocation");
  const readonly = props.navigation.getParam("readonly");
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const [locationTextBoxesFocused, setlocationTextBoxesFocused] = useState(
    false
  );

  const [toLocationResults, setToLocationResults] = useState([]);
  const [toLocationTextValue, setToLocationTextValue] = useState("");
  const [isWaitingForResults, setIsWaitingForResults] = useState(false);
  const [hasLocationResult, setHasLocationResult] = useState(false);
  const [userLocation, setUserLocation] = useState();
  const [fromLocation, setFromLocation] = useState({});
  const [taxiResults, setTaxiResults] = useState();

  const [hasCalculationStarted, setHasCalculationStarted] = useState(false);
  const [userTraveledLocations, setUserTraveledLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [isFinished, setIsFinished] = useState(false);

  const [dateTime, setDateTime] = useState(new Date().toString());

  const [currentData, setCurrentData] = useState({
    haversineDistance: 0,
    dateTimeStarted: 0,
    dateTimeFinished: 0,
  });

  const [actualDistanceTravelled, setActualDistanceTravelled] = useState(0);
  const [actualTimeDuration, setActualTimeDuration] = useState(0);
  const [actualCost, setActualCost] = useState(0);

  const dispatch = useDispatch();

  const resetView = () => {
    setIsFinished(false);
    setUserTraveledLocations([]);
  };

  const saveTransactionHandler = () => {
    dispatch(
      //add data from app.
      transactionsActions.addTransaction(
        taxiResults.distance / 1000, //google distance
        taxiResults.time_str, //google travel time
        taxiResults.cost, // google cost
        currentData.haversineDistance, //app distance
        new Date(
          Math.abs(new Date(dateTime) - new Date(currentData.dateTimeFinished))
        ).getMinutes(), // app travel time
        getCost(
          new Date(
            Math.abs(
              new Date(dateTime) - new Date(currentData.dateTimeFinished)
            )
          ).getMinutes(),
          currentData.haversineDistance
        ), //app cost
        actualDistanceTravelled, //actualdistance
        actualTimeDuration, // actual travel time
        actualCost, //actual cost
        JSON.stringify(fromLocation), //fromlocation
        JSON.stringify(userLocation), //toLocation
        JSON.stringify(userTraveledLocations), //user travel location
        JSON.stringify(dateTime), //starttime
        JSON.stringify(currentData.dateTimeFinished), //endtime
        JSON.stringify(0) //userID
      )
    );

    resetView();
  };

  const getFullDateFormat = (date) => {
    return date.toDateString() + ", " + date.toLocaleTimeString();
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    // console.log(hasPermission);
    if (!hasPermission) {
      return;
    }
  };

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }

    setSelectedLocations([
      ...selectedLocations,
      {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      },
    ]);

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });

    reverseGeocodingSearch(
      {
        lat: event.nativeEvent.coordinate.latitude,
        lng: event.nativeEvent.coordinate.longitude,
      },
      setToLocationTextValue,
      setFromLocation,
      userLocation
    );

    //console.log(selectedLocations);
  };

  const calculateEstimates = () => {
    if (fromLocation && selectedLocation) {
      getDistance(
        {
          from: {
            lat: fromLocation.latitude,
            lng: fromLocation.longitude,
          },
          to: {
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
          },
        },
        setTaxiResults
      );
    }
  };

  let locationInputContainer = {
    flexDirection: "column",
    flex: 1,
    position: "absolute",
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: "2.5%",
    paddingBottom: "5%",
    paddingRight: "5%",
    paddingLeft: "5%",
    borderRadius: 5,
    left: "3%",
    right: "3%",
    top: "70%",
    zIndex: 1,
    overflow: "hidden",
    elevation: 5,
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  if (locationTextBoxesFocused || hasLocationResult || isWaitingForResults) {
    locationInputContainer = { ...locationInputContainer, top: "5%" };
  } else {
    locationInputContainer = { ...locationInputContainer, top: "70%" };
  }

  const locations = useSelector((state) => state.locations.initialLocation);

  return (
    <View style={styles.container}>
      {hasCalculationStarted && taxiResults && (
        <RunningStartCard
          taxiResults={taxiResults}
          setCurrentData={setCurrentData}
          currentData={currentData}
        />
      )}

      {!isFinished && (
        <View style={locationInputContainer}>
          <View style={{ marginBottom: 10 }}>
            <YourLocationButton
              userLocation={userLocation}
              mapView={this.mapView}
              getLocationHandler={getLocationHandler}
            />
          </View>
          <View>
            {!hasCalculationStarted && (
              <View>
                <View style={{ marginBottom: 10 }}>
                  <SearchToLocationInput
                    setlocationTextBoxesFocused={setlocationTextBoxesFocused}
                    setToLocationTextValue={setToLocationTextValue}
                    setIsWaitingForResults={setIsWaitingForResults}
                    toLocationTextValue={toLocationTextValue}
                    toLocationResults={toLocationResults}
                    setSelectedLocation={setSelectedLocation}
                    setFromLocation={setFromLocation}
                    userLocation={userLocation}
                    setToLocationResults={setToLocationResults}
                    setHasLocationResult={setHasLocationResult}
                  />
                </View>

                {!locationTextBoxesFocused &&
                  !hasLocationResult &&
                  !isWaitingForResults && (
                    <View
                      style={{
                        marginBottom: 10,
                        backgroundColor: Colors.primary,
                      }}
                    >
                      <StartButton
                        onPress={() => {
                          if (
                            selectedLocations.length !== 0 ||
                            selectedLocations
                          ) {
                            setDateTime(new Date().toString());
                            setHasCalculationStarted(true);
                            calculateEstimates();
                          }
                        }}
                      />
                    </View>
                  )}
              </View>
            )}
            {hasCalculationStarted && (
              <GenericButton
                title={"Stop"}
                icon={{
                  name: "flag-checkered",
                  type: "font-awesome",
                  size: 15,
                  color: "white",
                }}
                onPress={() => {
                  setHasCalculationStarted(false);
                  setIsFinished(true);

                  setCurrentData({
                    ...currentData,
                    dateTimeFinished: new Date(),
                  });
                }}
              />
            )}
          </View>
        </View>
      )}

      {isFinished && (
        <View style={styles.resultContainer}>
          <ScrollView>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.textHeader}>Results</Text>
            </View>
            <View style={styles.line} />
            <View style={{ alignItems: "center" }}>
              <Text style={styles.textHeader}>Estimated data from Google</Text>
            </View>
            <Text style={styles.textBody}>
              Shortest distance: {taxiResults.distance / 1000} km
            </Text>
            <Text style={styles.textBody}>
              Travel time: {taxiResults.time_str}
            </Text>
            <Text style={styles.textBody}>
              Estimated cost: {taxiResults.cost} Php
            </Text>
            <View style={styles.line} />
            <View style={{ alignItems: "center" }}>
              <Text style={styles.textHeader}>Gathered data</Text>
            </View>
            <Text style={styles.textBody}>
              Current distance: {currentData.haversineDistance} km
            </Text>
            <Text style={styles.textBody}>
              Starting time: {getFullDateFormat(new Date(dateTime))}
            </Text>
            <Text style={styles.textBody}>
              End time:{" "}
              {getFullDateFormat(
                new Date(currentData.dateTimeFinished.toString())
              )}
            </Text>
            <Text style={styles.textBody}>
              Total travel time:{" "}
              {new Date(
                Math.abs(
                  new Date(dateTime) - new Date(currentData.dateTimeFinished)
                )
              ).getMinutes()}{" "}
              mins
            </Text>
            <Text style={styles.textBody}>
              Total cost:{" "}
              {getCost(
                new Date(
                  Math.abs(
                    new Date(dateTime) - new Date(currentData.dateTimeFinished)
                  )
                ).getMinutes(),
                currentData.haversineDistance
              )}
              php
            </Text>
            <View style={styles.line} />
            <View style={{ alignItems: "center" }}>
              <Text style={styles.textHeader}>Enter actual taxi data</Text>
            </View>
            <Text style={styles.textHeader}>Distance travelled in km:</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="decimal-pad"
              value={`${actualDistanceTravelled}`}
              onChangeText={(value) => {
                setActualDistanceTravelled(value);
              }}
            />

            <Text style={styles.textHeader}>Total travel time in mins:</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="decimal-pad"
              value={`${actualTimeDuration}`}
              onChangeText={(value) => {
                setActualTimeDuration(value);
              }}
            />

            <Text style={styles.textHeader}>Total cost in php:</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="decimal-pad"
              value={`${actualCost}`}
              onChangeText={(value) => {
                setActualCost(value);
              }}
            />

            <GenericButton
              title={"Save"}
              icon={{
                name: "flag-checkered",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
              onPress={saveTransactionHandler}
            />
          </ScrollView>
        </View>
      )}

      <MapView
        ref={(ref) => (this.mapView = ref)}
        showsCompass={false}
        showsMyLocationButton={false}
        onUserLocationChange={(e) => {
          if (!isFinished) {
            setUserLocation({
              lat: e.nativeEvent.coordinate.latitude,
              lng: e.nativeEvent.coordinate.longitude,
            });

            setUserTraveledLocations([
              ...userTraveledLocations,
              {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              },
            ]);

            setCurrentData({
              ...currentData,
              haversineDistance: getHaversineDistance(
                userTraveledLocations
              ).toFixed(3),
            });
          }
        }}
        loadingEnabled={true}
        showsTraffic={false}
        showsUserLocation={true}
        zoomControlEnabled={false}
        customMapStyle={MapStyle}
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.lat : 10.7170058,
          longitude: userLocation ? userLocation.lng : 122.5317206,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        onPress={selectLocationHandler}
        provider={MapView.PROVIDER_GOOGLE}
      >
        {fromLocation && selectedLocation && (
          <MapViewDirections
            origin={{
              latitude: fromLocation ? parseFloat(fromLocation.latitude) : null,
              longitude: fromLocation
                ? parseFloat(fromLocation.longitude)
                : null,
            }}
            destination={{
              latitude: selectedLocation
                ? parseFloat(selectedLocation.lat)
                : null,
              longitude: selectedLocation
                ? parseFloat(selectedLocation.lng)
                : null,
            }}
            apikey={ENV.googleApiKey}
            strokeWidth={4}
            strokeColor="#5571cf"
          />
        )}

        {userTraveledLocations && (
          <Polyline
            key={0}
            coordinates={userTraveledLocations}
            strokeColor="#000"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={1}
          />
        )}
      </MapView>
    </View>
  );
};

TaxiMapScreen.navigationOptions = () => {
  return { header: null };
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  headerButton: {
    marginHorizontal: 20,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  locationInputContainer: {},
  resultContainer: {
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
    top: "70%",
    zIndex: 1,
    overflow: "hidden",
    elevation: 5,
    top: "5%",
  },
  textInput: {
    height: 30,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginVertical: 10,
    color: Colors.text,
  },
  line: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    marginTop: 10,
  },
  textHeader: {
    fontSize: 16,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    color: Colors.text,
  },
  textBody: {
    fontSize: 12,
    color: Colors.text,
  },
});

export default TaxiMapScreen;
