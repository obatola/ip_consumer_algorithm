// https://www.youtube.com/watch?v=t0Cq6tVNRBA TODO: remove
class IpConsumerWithMinHeap {
    _ipTallyMap = {}
    _capacityOfTopIps = 100;
    _topIps = []

    handleNewIP(ipAddress) {
        this._addTallyToIpAddress(ipAddress); 
        this._putIpInTopIpsIfApplicable(ipAddress);
    }

    getOrderedTopIps() {
        return this._topIps.sort((ipA, ipB) => {
            if (this._getTallyOfIp(ipA) > this._getTallyOfIp(ipB)) return -1;
            if (this._getTallyOfIp(ipA) < this._getTallyOfIp(ipB)) return 1;
            if (this._getTallyOfIp(ipA) === this._getTallyOfIp(ipB)) return 0;
        });
    } 

    clear() {
        this._ipTallyMap = {};
        this._topIps = [];
    }

    _addTallyToIpAddress = (ipAddress) => {
        const tally = this._getTallyOfIp(ipAddress);
        this._ipTallyMap[ipAddress] = tally ? tally + 1 : 1;
    }

    _getTallyOfIp = (ipAddress) => {
        return this._ipTallyMap[ipAddress]
    }


    /* - - - TOP IP FUNCTIONS - - - - - - - */   
    _putIpInTopIpsIfApplicable(ipAddress) {
        const tally = this._getTallyOfIp(ipAddress);
        if (this._getSizeOfTopIps() < this._capacityOfTopIps) {
            // topIps is not at capacity
            if(this._isIpInTopIps(ipAddress)) {
                // ip address is already in topIps
                this._handleTallyChangeForIpInTopIps(ipAddress);
            } else {
                // ip address is not in topIps
                this._addIpToTopIps(ipAddress)
            }
        } else {
            // topIps is full
            if (this._getLeastFrequentIpInTopIps() === ipAddress) {
                // ipAddress is already in the topIps and is the least frequent ip in topIps
                this._handleTallyChangeForIpInTopIps(ipAddress);
            } else if (tally > this._getLeastFrequentTallyInTopIps()) {
                // ipAddress is more frequent than least frequent in topIps
                if (!this._isIpInTopIps(ipAddress)) {
                    // ipAddress is not in topIps
                    // replace least frequent ip from topIps with given ip
                    this._removeLeastFrequentIpFromTopIps();
                    this._addIpToTopIps(ipAddress);
                } else {
                    // ipAddress is in topIps
                    this._handleTallyChangeForIpInTopIps(ipAddress)

                }
            }
        }
    }

    _handleTallyChangeForIpInTopIps(ipAddress) {
        this._removeIpFromTopIps(ipAddress);
        this._addIpToTopIps(ipAddress);
    }

    _isIpInTopIps(ipAddress) {
        return this._topIps.indexOf(ipAddress) >= 0;
    }

    _getSizeOfTopIps = () => this._topIps.length;

    _getLeftChildIndex = (parentIndex) =>  2 * parentIndex + 1;
    _getRightChildIndex = (parentIndex) =>  2 * parentIndex + 2;
    _getParentIndex = (childIndex) =>  (childIndex - 1) / 2;

    _hasLeftChild = (index) => this._getLeftChildIndex(index) < this._getSizeOfTopIps();
    _hasRightChild = (index) => this._getRightChildIndex(index) < this._getSizeOfTopIps();
    _hasParent = (index) => this._getParentIndex(index) >= 0;

    _getLeftChildTally = (index) => this._getTallyOfIp(this._topIps[this._getLeftChildIndex(index)]);
    _getRightChildTally = (index) => this._getTallyOfIp(this._topIps[this._getRightChildIndex(index)]);
    _getParentTally = (index) => this._getTallyOfIp(this._topIps[this._getParentIndex(index)]);

    _swap = (indexA, indexB) => {
        const temp = this._topIps[indexA];
        this._topIps[indexA] =  this._topIps[indexB];
        this._topIps[indexB] = temp;
    }

    _getLeastFrequentIpInTopIps = () => {
        if (this._getSizeOfTopIps() === 0) {
            return null;
        }

        return this._topIps[0];
    }

    _getLeastFrequentTallyInTopIps = () => {
        if (this._getSizeOfTopIps() === 0) {
            return null;
        }

        return this._getTallyOfIp(this._topIps[0]);
    }

    _addIpToTopIps = (node) => {
        this._topIps.push(node);
        this._heapifyUp();
    }

    _removeLeastFrequentIpFromTopIps = () => {
        if (this._getSizeOfTopIps() === 0) {
            return null;
        }

        const min = this._topIps[0];
        this._swap(0, this._getSizeOfTopIps() - 1);
        this._topIps.pop();

        this._heapifyDown();

        return min;
    }

    _removeIpFromTopIps = (val) => {
        const indexOfNode = this._topIps.indexOf(val);
        if (indexOfNode > -1) {
            // replace ipWithVal with last ip
            this._swap(indexOfNode, this._getSizeOfTopIps() - 1);
            // delete ipWithVal
            this._topIps.pop();
            this._heapifyDown(indexOfNode);
        }
    }

    _heapifyUp = () => {
        let index = this._getSizeOfTopIps() - 1
        while(this._hasParent(index) && this._getTallyOfIp(this._getParentTally(index)) > this._getTallyOfIp(this._topIps[index])) {
            this._swap(this._getParentIndex(index), index);
            index = this._getParentIndex(index);
        }
    }

    _heapifyDown = (index = 0) => {
        while(this._hasLeftChild(index)) {
            let smallerChildIndex = this._getLeftChildIndex(index);
            if (this._hasRightChild(index) && this._getRightChildTally(index) < this._getLeftChildTally(index)) {
                smallerChildIndex = this._getRightChildIndex(index);
            }

            if (this._getTallyOfIp(this._topIps[index]) < this._getTallyOfIp(this._topIps[smallerChildIndex])) {
                break;
            } else {
                this._swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
}

const controller = new IpConsumerWithMinHeap();

const request_handled = (ipAddress) => {
    controller.handleNewIP(ipAddress);
}

const clear = () => {
    controller.clear();
}

const top100 = () => {
    return controller.getOrderedTopIps();
}

const top100WithTally = () => {
    return controller.getOrderedTopIps().map(ip => [ip, controller._getTallyOfIp(ip)]);
}

module.exports = {
    request_handled, top100, clear, top100WithTally,
}