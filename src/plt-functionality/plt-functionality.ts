import * as fs from "fs";
import * as path from "path";

export function retrieveAllTransactionsWithGivenSKU(sku: string): {}[] {
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
    console.log(transactionArray);
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
    return aggregatedTransactionObject;
}

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
    console.log(skuStockObject);
    return skuStockObject;
}

export function checkIfSKUExistsInStock(sku) {
    let stock = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../data/stock.json"),"utf8"));
    for (let i = 0; i < stock.length; i++) {
        if(sku === stock[i]["sku"])
        {
            console.log(stock[i]);
            return stock[i];
        }
    }
    throw new Error("sku does not exist in stock or in transactions.");
}