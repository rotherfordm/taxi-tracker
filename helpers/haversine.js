import haversine from "haversine";

export const getHaversineDistance = userTraveledLocations => {
  let totalDistance = 0;
  for (let i = 0; i < userTraveledLocations.length; i++) {
    if (userTraveledLocations[i + 1]) {
      let start = userTraveledLocations[i];
      let end = userTraveledLocations[i + 1];
      let distance = haversine(start, end, { unit: "meter" });
      totalDistance += distance;
    }
  }

  totalDistance = totalDistance / 1000;

  return totalDistance;
};
