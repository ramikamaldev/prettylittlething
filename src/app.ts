import { checkIfSKUExistsInStock, aggregateAllTransactionsWithGivenSKU, calculateAggregatedTransactionsFromStockLevel, retrieveAllTransactionsWithGivenSKU } from "./plt-functionality/plt-functionality"

/**
 * This function calculates the stock quantity level after all transactions have been applied to it.
 * @param sku - sku provided by the user
 * @returns {"sku":string, "qty":number}
 */
export function calculateSKSU(sku: string): Promise<{ sku: string, qty: number }> {
    return new Promise(function (resolve, reject) {
        try {
            let transactionArray = retrieveAllTransactionsWithGivenSKU(sku);
            let aggregatedTransactionsObj = aggregateAllTransactionsWithGivenSKU(transactionArray, sku);
            let newStockLevelObj = calculateAggregatedTransactionsFromStockLevel(aggregatedTransactionsObj);
            return resolve(newStockLevelObj)
        }
        catch (err) {
            try {
                return resolve(checkIfSKUExistsInStock(sku));
            }
            catch (error) {
                throw new Error(error);
            }
        }
    })
}


calculateSKSU("QWP084011/40/33").then(function (returnedObject) {
    console.log("Stock levels: ", returnedObject)
}).catch(function (error) {
    console.log(error.message);
});

