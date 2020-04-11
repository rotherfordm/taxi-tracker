class Transaction {
  constructor(
    id, // transaction id
    googleDistance, //km
    googleTravelTime, //mins
    googleCost, //php
    appDistance,
    appTravelTime,
    appCost,
    actualDistance,
    actualTravelTime,
    actualCost,
    fromLocation, //{lat: '', lng: '',},
    toLocation, //{lat: '', lng: '',}
    userTraveledLocation,
    startTime,
    endTime,
    userId //user id
  ) {
    this.id = id;
    this.googleDistance = googleDistance;
    this.googleTravelTime = googleTravelTime;
    this.googleCost = googleCost;
    this.appDistance = appDistance;
    this.appTravelTime = appTravelTime;
    this.appCost = appCost;
    this.actualDistance = actualDistance;
    this.actualTravelTime = actualTravelTime;
    this.actualCost = actualCost;
    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.userTravelledLocation = userTraveledLocation;
    this.startTime = startTime;
    this.endTime = endTime;
    this.userId = userId;
  }
}

export default Transaction;
