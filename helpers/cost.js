import ENV from "../env";

import { Alert } from "react-native";

export const getCost = (travelTimeInMins, distanceInKM) => {
  /*
    40php - initial

    2php - per min

    13.5php - per km
*/

  const initialValue = 40;
  const perMin = 2;
  const perKM = 13.5;

  let cost = 0;

  perMinCostTotal = Math.trunc(travelTimeInMins * perMin);
  perKMCostTotal = Math.trunc(distanceInKM * perKM);

  cost = initialValue + perMinCostTotal + perKMCostTotal;
  return cost;
};
