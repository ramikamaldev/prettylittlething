const { aggregateAllTransactionsWithGivenSKU, checkIfSKUExistsInStock, calculateAggregatedTransactionsFromStockLevel, retrieveAllTransactionsWithGivenSKU } = require("../bin/plt-functionality/plt-functionality");
test("retrieves all transactions with given SKU", function () {
    expect(retrieveAllTransactionsWithGivenSKU("QWP084011/40/33")).toEqual([
        { sku: 'QWP084011/40/33', type: 'order', qty: 9 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 0 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 10 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 1 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 7 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 8 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 7 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 9 },
        { sku: 'QWP084011/40/33', type: 'refund', qty: 6 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 10 },
        { sku: 'QWP084011/40/33', type: 'refund', qty: 3 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 5 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 2 }
    ]);
});

test("aggregates all transactions with given SKU", function () {
    expect(aggregateAllTransactionsWithGivenSKU([
        { sku: 'QWP084011/40/33', type: 'order', qty: 9 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 0 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 10 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 1 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 7 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 8 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 7 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 9 },
        { sku: 'QWP084011/40/33', type: 'refund', qty: 6 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 10 },
        { sku: 'QWP084011/40/33', type: 'refund', qty: 3 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 5 },
        { sku: 'QWP084011/40/33', type: 'order', qty: 2 }
    ], 'QWP084011/40/33')).toEqual({ sku: 'QWP084011/40/33', qty: 59 });
});

test("calculates all transactions for given SKU and returns stock level", function () {
    expect(calculateAggregatedTransactionsFromStockLevel({ sku: 'QWP084011/40/33', qty: 59 })).toEqual(
        { sku: 'QWP084011/40/33', qty: 2197 }
    );
});

test("returns a calculated stock level when no SKU existed in stock", function () {
    expect(calculateAggregatedTransactionsFromStockLevel({ sku: 'QWP0840111/40/33', qty: 59 })).toEqual(
        { sku: 'QWP0840111/40/33', qty: -59 }
    );
});

test("asserts whether sku exists in stock", function () {
    expect(checkIfSKUExistsInStock('QWP084011/40/33')).toEqual(
        { sku: 'QWP084011/40/33', stock: 2256 }
    );
});