import { checkIfSKUExistsInStock, aggregateAllTransactionsWithGivenSKU, deductAggregatedTransactionsFromStockLevel, retrieveAllTransactionsWithGivenSKU } from "./plt-functionality/plt-functionality"

function calculateSKSU(sku: string): Promise<{ sku: string, qty: string }> {
    return new Promise(function (resolve, reject) {
        try {
            let transactionArray = retrieveAllTransactionsWithGivenSKU(sku);
            let aggregatedTransactionsObj = aggregateAllTransactionsWithGivenSKU(transactionArray, sku);
            let newStockLevelObj = deductAggregatedTransactionsFromStockLevel(aggregatedTransactionsObj);
            return resolve(newStockLevelObj)
        }
        catch (err) {
            try {
                return resolve(checkIfSKUExistsInStock(sku));
            }
            catch (error) {
                return reject(error);
            }
        }
    })
}


calculateSKSU("QWP084011/40/33").then(function (returnedObject) {
    console.log(returnedObject)
}).catch(function (error) {
    console.log(error.message);
});

