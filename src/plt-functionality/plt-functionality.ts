import * as fs from "fs";
import * as path from "path";
/**
 * This function takes in an argument of sku and uses to identify all transactions with that sku.
 * @param sku - unique identifier for transactions on a particular stock
 * @returns Array - Array of transactions for particular sku
 */
export function retrieveAllTransactionsWithGivenSKU(sku: string) {
    let transactions = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../data/transactions.json"),"utf8"))
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
/**
 * This function calculates the aggregate of the transactions for a particular stock.
 * @param transactionArray - array of transactions for a particular sku stock
 * @param sku - the sku for the transactions
 * @returns - This function returns an object containing the aggregated transactions.
 */
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
    return aggregatedTransactionObject;
}
/**
 * This function takes the aggregated transactions from the stock available, calculating the remaining value.
 * @param skuTransactionObject - aggregated transactions for a particular stock.
 * @returns 
 */
export function calculateAggregatedTransactionsFromStockLevel(skuTransactionObject) {
    let stock = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../data/stock.json"),"utf8"))
    let skuStockObject: { sku: string, qty: number };
    for (let i = 0; i <= stock.length; i++) {
        if (i === stock.length) {
            let stockQty = 0;
            skuStockObject = { "sku": skuTransactionObject["sku"], "qty": stockQty -= skuTransactionObject["qty"] };
            break;
        }
        if (skuTransactionObject["sku"] === stock[i]["sku"]) {
            let stockLevel = stock[i]["stock"]
            stockLevel -= skuTransactionObject["qty"];
            skuStockObject = stock[i];
            skuStockObject["qty"] = stockLevel;
            delete skuStockObject["stock"];
            break;
        }

    }
    return skuStockObject;
}

/**
 * This function is a fallback function, incase there are no matching transactions for a particular stock, it checks if there are any stock with the relevant sku.
 * @param sku - This is the sku provided by the user.
 * @returns either returns the stock or returns an error in case there are no matching skus.
 */
export function checkIfSKUExistsInStock(sku) {
    let stock = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../data/stock.json"),"utf8"));
    for (let i = 0; i < stock.length; i++) {
        if(sku === stock[i]["sku"])
        {
            return stock[i];
        }
    }
    throw new Error("sku does not exist in stock or in transactions.");
}