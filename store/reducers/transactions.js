import Transaction from "../../models/transaction";
import { ADD_TRANSACTION, SET_TRANSACTIONS } from "../actions/transactions";

const initialState = {
  transactions: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return {
        transactions: action.transactions.map(
          (tr) =>
            new Transaction(
              tr.id.toString(),
              tr.googleDistance.toString(),
              tr.googleTravelTime.toString(),
              tr.googleCost.toString(),
              tr.appDistance.toString(),
              tr.appTravelTime.toString(),
              tr.appCost.toString(),
              tr.actualDistance.toString(),
              tr.actualTravelTime.toString(),
              tr.actualCost.toString(),
              tr.fromLocation.toString(),
              tr.toLocation.toString(),
              tr.userTraveledLocation.toString(),
              tr.startTime.toString(),
              tr.endTime.toString(),
              tr.userId.toString()
            )
        ),
      };
    case ADD_TRANSACTION:
      const newTransaction = new Transaction(
        action.transactionData.id.toString(),
        action.transactionData.googleDistance,
        action.transactionData.googleTravelTime,
        action.transactionData.googleCost,
        action.transactionData.appDistance,
        action.transactionData.appTravelTime,
        action.transactionData.appCost,
        action.transactionData.actualDistance,
        action.transactionData.actualTravelTime,
        action.transactionData.actualCost,
        action.transactionData.fromLocation,
        action.transactionData.toLocation,
        action.transactionData.userTraveledLocation,
        action.transactionData.startTime,
        action.transactionData.endTime,
        action.transactionData.userId
      );
      return {
        transactions: state.transactions.concat(newTransaction),
      };
    default:
      return state;
  }
};
