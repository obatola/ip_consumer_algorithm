# IP Consumer

I implemented the ip consumer in 3 different ways

## Approach 1
In this approach, I maintained the tally of ip requests in an object/dictionary, where ip is the key and tally is the respective value. The top 100 ips are stored in a separate array. on each request, the tally of the ip address is updated and, if applicable, the top 100 list is updated with the ip address and sorted.

When top100 is called, the top100 list is returned.

with more time, I would have replaced the sorts on insertion with a simple shift to insert the ip at the correct location.

### Time Complexity of Approach 1
The time complexity of this approach is O(nlogn) for each request_handled() and O(nlogn) (could be o(1), but I added a final sort, just in case) for top100(), where n is the size of the topIps we're mainting (in our case, 100).

### running the code
in order to run create a file that imports `request_handled, top100, clear, top100WithTally` from `ip_consumer_with_array.js`
```js
import {request_handled, top100, clear, top100WithTally} from 'ip_consumer_with_array.js'
...
request_handled(ipAddress)
...
console.log(top100())
...
clear()
```

## Approach 2
In this approach, I maintaned the tally of ip requests in an object/dictionary, where ip is the key and tally is the respective value. The top 100 ips are stored in a separate min heap. on each request, the tally of the ip address is updated and, if applicable, the top 100 heap is updated with the ip address.

When top100 is called, the internal array in the top100 heap is copied, sorted, and returned.

**This method is best** as it scales if we decide to change the capacity of the top ips we want to maintain. The O(logn) insertion will perform better with a larger capacity than that of the topXIps stored as an array.

### Time Complexity of Approach 2
The time complexity of this approach is O(nlogn) for each request_handled() and O(time complexity of JS's array.sort algorithm ~nlogn) for top100(), where n is the size of the topIps we're maintaining (in our case, 100).

### running the code
in order to run create a file that imports `request_handled, top100, clear, top100WithTally` from `ip_consumer_with_heap.js`
```js
import {request_handled, top100, clear, top100WithTally} from 'ip_consumer_with_heap.js'
...
request_handled(ipAddress)
...
console.log(top100())
...
clear()
```

## Approach 3
In this approach, I maintained the tally of ip requests in an object/dictionary, where ip is the key and tally is the respective value. The top 100 ips are not tracked.

When top100 is called, the tally dictionary is converted to a list, sorted, and returned with the top 100 items.

To test all of these, I ran each approach in the `runner.js` file and compared the top 100 results returned with a bruteforce top100 array generated from the tallies.

### Time Complexity of Approach 3
The time complexity of this approach is O(1) for each request_handled() and O(ylogy) for top100(), where y is the size of the number of unique ips received. 

If I had more time, I'd try to build a system where request_handled would add a request to a queue, and in the background a worker would consume the queue by adding tallies and updating the top100s list.

### running the code
in order to run create a file that imports `request_handled, top100, clear, top100WithTally` from `ip_consumer_with_array.js`. 
in order to run Approach 3, you'll have to pass a flag, false, to each function, top100WithTally, top100, and request_handled which will tell the function not to manage top 100 on each request.
```js
import {request_handled, top100, clear, top100WithTally} from 'ip_consumer_with_array.js'
...
request_handled(ipAddress, false)
...
console.log(top100(false))
...
clear()
```


## Small snapshot of stats I recorded

in order to play around number of items and view the time elapsed for each solution, run, `node performance_runner.js`

### Approach 1
running with 100,000,000 ips and maintaining a list of top 2000 ips
    time to fire all requests and request top 100: 15441.44ms
        time to fire all requests: 15441.24ms
        time elapsed per request: 0.00015441244542121888ms
        time to getTop100: 0.2ms

running with 100,000,000 ips and maintaining a list of top 100 ips
    time to fire all requests and request top 100: 6006.89ms
            time to fire all requests: 6006.69ms
            time elapsed per request: 0.00006006691125392914ms
            time to getTop100: 0.2ms
    
running with 20,000,000 ips and maintaining a list of top 100 ips
    time to fire all requests and request top 100: 1188.91ms
                time to fire all requests: 1188.72ms
                time elapsed per request: 0.00005943616251945496ms
                time to getTop100: 0.19ms
                
### Approach 2
running with 100,000,000 ips and maintaining a list of top 2000 ips
    time to fire all requests and request top 100: 7626.78ms
        time to fire all requests: 7625.29ms
        time elapsed per request: 0.00007625286833286285ms
        time to getTop100: 1.49ms

running with 100,000,000 ips and maintaining a list of top 100 ips
    time to fire all requests and request top 100: 4970.65ms
        time to fire all requests: 4970.21ms
        time elapsed per request: 0.00004970214084148407ms
        time to getTop100: 0.44ms

running with 20,000,000 ips and maintaining a list of top 100 ips
    time to fire all requests and request top 100: 1024.54ms
        time to fire all requests: 1024.07ms
        time elapsed per request: 0.00005120337290763855ms
        time to getTop100: 0.47ms

### Approach 3
running with 100,000,000 ips and maintaining a list of top 2000 ips
    time to fire all requests and request top 100: 2679.85ms
        time to fire all requests: 2247.63ms
        time elapsed per request: 0.00002247628458023071ms
        time to getTop100: 432.22ms

running with 100,000,000 ips and maintaining a list of top 100 ips
    time to fire all requests and request top 100: 2860.69ms
        time to fire all requests: 2411.46ms
        time elapsed per request: 0.00002411459749698639ms
        time to getTop100: 449.23ms
    
running with 20,000,000 ips and maintaining a list of top 100 ips
    time to fire all requests and request top 100: 914.62ms
        time to fire all requests: 526.19ms
        time elapsed per request: 0.000026309583353996278ms
        time to getTop100: 388.43ms