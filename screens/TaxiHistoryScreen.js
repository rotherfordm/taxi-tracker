import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TransactionItem from "../components/TransactionItem";

import Colors from "../constants/Colors";

import * as transactionsActions from "../store/actions/transactions";

const TaxiHistoryScreen = (props) => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionsActions.loadTransactions());
  }, [dispatch]);

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <TransactionItem
          id={itemData.item.id}
          googleDistance={itemData.item.googleDistance}
          googleTravelTime={itemData.item.googleTravelTime}
          googleCost={itemData.item.googleCost}
          appDistance={itemData.item.appDistance}
          appTravelTime={itemData.item.appTravelTime}
          appCost={itemData.item.appCost}
          actualDistance={itemData.item.actualDistance}
          actualTravelTime={itemData.item.actualTravelTime}
          actualCost={itemData.item.actualCost}
          userTraveledLocation={itemData.item.userTraveledLocation}
          fromLocation={
            JSON.parse(itemData.item.fromLocation).latitude +
            ", " +
            JSON.parse(itemData.item.fromLocation).longitude
          }
          toLocation={
            JSON.parse(itemData.item.toLocation).lat +
            ", " +
            JSON.parse(itemData.item.toLocation).lng
          }
          startTime={
            new Date(JSON.parse(itemData.item.startTime)).toDateString() +
            ", " +
            new Date(JSON.parse(itemData.item.startTime)).toLocaleTimeString()
          }
          endTime={
            new Date(JSON.parse(itemData.item.endTime)).toDateString() +
            ", " +
            new Date(JSON.parse(itemData.item.endTime)).toLocaleTimeString()
          }
        />
      )}
    />
  );
};

TaxiHistoryScreen.navigationOptions = () => {
  return { header: null };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default TaxiHistoryScreen;
