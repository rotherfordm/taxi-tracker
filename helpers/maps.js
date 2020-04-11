import ENV from "../env";

import { Alert } from "react-native";
import { getCost } from "../helpers/cost";

export const searchLocation = (
  query,
  setToLocationResults,
  setIsWaitingForResults,
  setHasLocationResult
) => {
  if (query === "") {
    return [];
  }

  return fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ENV.googleApiKey}&input=${query}`
  )
    .then(response => response.json())
    .then(responseJson => {
      setToLocationResults({ predictions: responseJson.predictions });
      setIsWaitingForResults(false);
      setHasLocationResult(true);
      return responseJson.predictions;
    })
    .catch(error => {
      console.error(error);
    });
};

export const getTaxiTimeString = time => {
  if (time) {
    let timeInMins = Math.round((time / 60) * 100) / 100;

    if (timeInMins > 60) {
      timeInHours = timeInMins / 60;
      return timeInHours.toFixed(2) + " " + "hrs";
    }
    return timeInMins.toFixed(0) + " " + "mins";
  }
};

export const getDistance = (address, setTaxiResults) => {
  if (address === "") {
    return [];
  }

  return fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${address.from.lat},${address.from.lng}&destinations=${address.to.lat},${address.to.lng}&key=${ENV.googleApiKey}`
  )
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson) {
        try {
          console.log(responseJson);
          setTaxiResults({
            distance: responseJson.rows[0].elements[0].distance.value,
            time: responseJson.rows[0].elements[0].duration.value,
            cost: getCost(
              responseJson.rows[0].elements[0].duration.value / 60,
              responseJson.rows[0].elements[0].distance.value / 1000
            ),
            time_str: getTaxiTimeString(
              responseJson.rows[0].elements[0].duration.value
            )
          });
        } catch (err) {
          Alert.alert(
            "Location Error",
            "Can't find route to destination. " + err,
            [{}],
            { cancelable: true }
          );
        }
      }

      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
};

export const reverseGeocodingSearch = (
  latlng,
  setToLocationTextValue,
  setFromLocation,
  userLocation
) => {
  if (latlng === "") {
    return [];
  }

  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=${ENV.googleApiKey}`
  )
    .then(response => response.json())
    .then(responseJson => {
      let address = responseJson.results[0].formatted_address;

      setToLocationTextValue({
        toLocTextValue: address
      });

      setFromLocation({
        latitude: userLocation ? userLocation.lat : null,
        longitude: userLocation ? userLocation.lng : null
      });

      return address;
    })
    .catch(error => {
      console.error(error);
    });
};

export const geocodingLookup = (
  addressQuery,
  setSelectedLocation,
  setHasLocationResult,
  setToLocationResults
) => {
  if (addressQuery === "") {
    return [];
  }

  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}&key=${ENV.googleApiKey}`
  )
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson) {
        if (
          Array.isArray(responseJson.results) &&
          responseJson.results.length
        ) {
          setSelectedLocation({
            lat: responseJson.results[0].geometry.location.lat,
            lng: responseJson.results[0].geometry.location.lng
          });

          setHasLocationResult(false);
          setToLocationResults({});
        }
      }
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
};
