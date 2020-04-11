import { insertTransaction, fetchTransactions } from "../../helpers/db";

export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const SET_TRANSACTIONS = "SET_TRANSACTIONS";

export const addTransaction = (
  googleDistance,
  googleTravelTime,
  googleCost,
  appDistance,
  appTravelTime,
  appCost,
  actualDistance,
  actualTravelTime,
  actualCost,
  fromLocation,
  toLocation,
  userTraveledLocation,
  startTime,
  endTime,
  userId
) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertTransaction(
        googleDistance,
        googleTravelTime,
        googleCost,
        appDistance,
        appTravelTime,
        appCost,
        actualDistance,
        actualTravelTime,
        actualCost,
        fromLocation,
        toLocation,
        userTraveledLocation,
        startTime,
        endTime,
        userId
      );

      // console.log(dbResult);
      dispatch({
        type: ADD_TRANSACTION,
        transactionData: {
          id: dbResult.insertId,
          googleDistance: googleDistance,
          googleTravelTime: googleTravelTime,
          googleCost: googleCost,
          appDistance: appDistance,
          appTravelTime: appTravelTime,
          appCost: appCost,
          actualDistance: actualDistance,
          actualTravelTime: actualTravelTime,
          actualCost: actualCost,
          fromLocation: fromLocation,
          toLocation: toLocation,
          userTraveledLocation: userTraveledLocation,
          startTime: startTime,
          endTime: endTime,
          userId: userId,
        },
      });
    } catch (err) {
      // console.log(err);
      throw err;
    }
  };
};

export const loadTransactions = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchTransactions();
      // console.log(dbResult);
      dispatch({ type: SET_TRANSACTIONS, transactions: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
