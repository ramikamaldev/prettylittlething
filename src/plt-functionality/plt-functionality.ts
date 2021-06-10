let stock = require("../../data/stock.json");
let transactions = require("../../data/transactions.json");
import { renameKeys } from "../common-functions/utility-functions"


export function retrieveAllTransactionsWithGivenSKU(sku: string): {}[] {
    let transactionArray = [];
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].sku === sku) {
            transactionArray.push(transactions[i]);
        }
    }
    if (transactionArray.length == 0) {
        throw new Error("There are no transactions matching the provided SKU")
    }
    return transactionArray;
}

export function aggregateAllTransactionsWithGivenSKU(transactionArray, sku) {
    let stockTransactionCounter = 0;
    for (let i = 0; i < transactionArray.length; i++) {
        if (transactionArray[i]["type"] === "refund") {
            stockTransactionCounter -= transactionArray[i]["qty"];
        }
        else if (transactionArray[i]["type"] === "order") {
            stockTransactionCounter += transactionArray[i]["qty"];
        }
    }
    let aggregatedTransactionObject = { sku: sku, qty: stockTransactionCounter };
    console.log(aggregatedTransactionObject);
    return aggregatedTransactionObject;
}

export function deductAggregatedTransactionsFromStockLevel(skuTransactionObject) {
    let skuStockObject: { sku: string, qty: string };
    for (let i = 0; i <= stock.length; i++) {
        if (i === stock.length) {
            let stockQty = 0;
            stock[i] = { "sku": skuTransactionObject["sku"], "qty": stockQty -= skuTransactionObject["qty"] }
            skuStockObject = stock[i];
            skuStockObject = renameKeys(skuStockObject, { "stock": "qty" });
            break;
        }
        if (skuTransactionObject["sku"] === stock[i]["sku"]) {
            stock[i]["stock"] -= skuTransactionObject["qty"];
            skuStockObject = stock[i];
            skuStockObject = renameKeys(skuStockObject, { "stock": "qty" });
            break;
        }

    }
    return skuStockObject;
}

export function checkIfSKUExistsInStock(sku) {
    for (let i = 0; i < stock.length; i++) {
        if(sku === stock[i]["sku"])
        {
            return stock[i];
        }
    }
    throw new Error("sku does not exist in stock or in transactions.");
}