const capacityOfTopIps = 100;
let topIps = [];
let ipTallyMap = {};

function _sortTallyMap(ipA, ipB) {
    if (ipTallyMap[ipA] > ipTallyMap[ipB]) return -1;
    if (ipTallyMap[ipA] < ipTallyMap[ipB]) return 1;
        if (ipTallyMap[ipA] === ipTallyMap[ipB]) return 0;
}

function _handleIPAddressForTop100(ip) {
    const tally = ipTallyMap[ip];

    if (topIps.length >= capacityOfTopIps) {
        if (ipTallyMap[topIps[capacityOfTopIps - 1]] < tally) {
            const top100IndexOfIp = topIps.indexOf(ip)
            if (top100IndexOfIp < 0) {
                topIps[capacityOfTopIps - 1] = ip;
                topIps = topIps.sort(_sortTallyMap)
            }
        }
    } else if (topIps.length === capacityOfTopIps - 1) {
        topIps.push(ip);
        topIps = topIps.sort(_sortTallyMap)
    } else {
        topIps.push(ip)
    }
}

/*
    manageTop100EachRequest is just a flag used for testing to compare the performance of
    the solution that updates top100 per request with a solution that doesn't maintain a
    top100 structure at all
 */
function request_handled(ipAdress, manageTop100EachRequest = true) {
    const tally = ipTallyMap[ipAdress];

    if (tally) {
        const newTally = tally + 1;
        ipTallyMap[ipAdress] = newTally; 
        if (manageTop100EachRequest) {
            _handleIPAddressForTop100(ipAdress);
        }
    } else {
        ipTallyMap[ipAdress] = 1; 
        if (manageTop100EachRequest) {
            _handleIPAddressForTop100(ipAdress);
        }
    }
}

/*
    manageTop100EachRequest is just a flag used for testing to compare the performance of
    the solution that updates top100 per request with a solution that doesn't maintain a
    top100 structure at all
 */
function top100(manageTop100EachRequest = true) {
    if (manageTop100EachRequest) {
        return topIps;
    } else {
        return Object.keys(ipTallyMap).sort(_sortTallyMap).slice(0, capacityOfTopIps);
    }
}

/*
    manageTop100EachRequest is just a flag used for testing to compare the performance of
    the solution that updates top100 per request with a solution that doesn't maintain a
    top100 structure at all
 */
function top100WithTally(manageTop100EachRequest = true) {
    if (manageTop100EachRequest) {
        return topIps.map(ip => [ip, ipTallyMap[ip]]);
    } else {
        return Object.keys(ipTallyMap).map(ip => [ip, ipTallyMap[ip]]).sort((ipA, ipB) => {
            if (ipA[1] > ipB[1]) return -1;
            if (ipA[1] < ipB[1]) return 1;
            if (ipA[1] === ipB[1]) return 0;
        });
    }
}

function clear() {
    topIps = [];
    ipTallyMap = {};
}



module.exports = {
    request_handled, top100, clear, top100WithTally
}