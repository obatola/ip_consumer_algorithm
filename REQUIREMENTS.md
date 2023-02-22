## Problem Statement:
    Imagine your team has developed a web service that receives requests from about
    20 million unique IP addresses every day. You want to keep track of the IP addresses
    that are making the most requests to your service each day. Your job is to write a
    program that (1) tracks these IP addresses in memory (don’t use a database), and
    (2) returns the 100 most common IP addresses.

In the language of your choice, please implement these functions:

### request_handled(ip_address)
    This function accepts a string containing an IP address like “145.87.2.109”.
    This function will be called by the web service every time it handles a request.
    The calling code is outside the scope of this project. Since it is being called very
    often, this function needs to have a fast runtime.
    
### top100()
    This function should return the top 100 IP addresses by request count, with
    the highest traffic IP address first. This function also needs to be fast. Imagine
    it needs to provide a quick response (< 300ms) to display on a dashboard, even with
    20 millions IP addresses. This is a very important requirement. Don’t forget to satisfy this requirement.

### clear()
    This function should clear all the IP addresses and tallies. In theory, it
    would be called at the start of each day to forget about all IP addresses and
    tallies.

## Deliverables:

Please package up your solution into:
    - A standalone project in a GitHub repository
    - With directions on how to install and run your solution
    - Share the repository with charliejl28 on Github once it’s ready

Along with your code, please provide a short written description (e.g. in the Readme)  of your approach that explains:
    - How does your code work?
    - How would you test this to ensure it’s working correctly?
    - What is the runtime complexity of each function?
    - What would you do differently if you had more time?
    - What other approaches did you decide not to pursue?