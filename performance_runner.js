
const {request_handled: rhv1, top100: t100v1, top100WithTally: t100WithTallyv1, clear: cv1} = require('./ip_consumer_with_array');
const {request_handled: rhv2, top100: t100v2, top100WithTally: t100WithTallyv2, clear: cv2} = require('./ip_consumer_with_heap');

const NUM_ITEMS = 20000000;
const allIps = [];

const _generateAllIps = (numItems) => {
    for (let count = 0; count < numItems - 1; count++) {
        const ipAdress = Math.floor(Math.random() * 1000000) + '';
        allIps.push(ipAdress);
    }
}

function _round(value, precision = 2) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
}

function _performanceTest(numItems, {request_handled, top100, top100WithTally, clear}) {
    let start;
    let end;

    let totalTime;

    const sortOnEntry = false;

    start = performance.now();
    for (let ip of allIps) {
        request_handled(ip, sortOnEntry);
    }
    end = performance.now();

    let fireRequestTimeDiff = end - start;
    let fireRequestElapsePreRequest  = fireRequestTimeDiff / numItems;

    start = performance.now();
    console.log('length of top100', top100(sortOnEntry).length);
    end = performance.now();
    let getTop100TimeDiff = end - start;
    console.log('top 10 ips', top100WithTally(sortOnEntry).slice(0, 10));

    clear();
    
    totalTime = fireRequestTimeDiff + getTop100TimeDiff

    console.log(`
        ${numItems.toLocaleString("en-US")}
        time to fire all requests and request top 100: ${_round(totalTime)}ms
            time to fire all requests: ${_round(fireRequestTimeDiff)}ms
            time elapsed per request: ${fireRequestElapsePreRequest}ms
            time to getTop100: ${_round(getTop100TimeDiff)}ms
    `);
}

console.log('\n')
console.log('\n= = = = = = = = = = = \n')

const top100MaintainedWithArrayPackage = {request_handled: (ip) => rhv1(ip, true), top100: () => t100v1(true), clear: () => cv1(true), top100WithTally: () => t100WithTallyv1(true)};
const tallyOnlyTop100CalculatedEachRequestPackage = {request_handled: (ip) => rhv1(ip, false), top100: () => t100v1(false), clear: () => cv1(false), top100WithTally: () => t100WithTallyv1(false)};
const top100MaintainedWithMinHeapPackage = {request_handled: rhv2, top100: t100v2, clear: cv2, top100WithTally: t100WithTallyv2};

_generateAllIps(NUM_ITEMS);
console.log('- - - Approach 1: top100MaintainedWithArrayPackage - - - - - - - - - - - - -');
_performanceTest(NUM_ITEMS, top100MaintainedWithArrayPackage);
console.log('- - - Approach 2: top100MaintainedWithMinHeapPackage - - - - - - - - - - - - -');
_performanceTest(NUM_ITEMS, top100MaintainedWithMinHeapPackage);
console.log('- - - Approach 3: tallyOnlyTop100CalculatedEachRequestPackage - - - - - - - - - - - - -');
_performanceTest(NUM_ITEMS, tallyOnlyTop100CalculatedEachRequestPackage);
