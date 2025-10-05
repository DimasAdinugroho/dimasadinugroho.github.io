---
title: Prevent API Overload: A Comprehensive Guide to Rate Limiting with Bottleneck
date: 15 Oct, 2025
excerpt: A practical guide to managing API rate limits using the Bottleneck library in Node.js
tags: nodejs, api, rate-limiting, bottleneck, javascript
---

In the realm of modern web development, APIs have become the lifeblood of our applications. They enable us to tap into a vast array of external services and data sources, empowering us to build rich and powerful experiences. However, with great power comes great responsibility – and in this case, that responsibility lies in respecting the rate limits imposed by API providers.

Rate limits are necessary measures put in place to prevent abuse and maintain the performance of APIs. Exceeding these limits can lead to rate limit errors, which can bring your application to a screeching halt, disrupting functionality and leaving your users high and dry. To address this challenge, there is a powerful solution at our disposal: the Bottleneck package.

## Introducing Bottleneck: Your Rate Limiting Gatekeeper
The Bottleneck package is a rate limiter that enforces a maximum number of operations within a given time period. It acts as a gatekeeper, ensuring that your application does not overwhelm the target API with too many requests, thereby preventing rate limit errors and maintaining a smooth and reliable experience for your users.

Installing Bottleneck is as simple as running npm install bottleneck in your project directory. Once installed, you can create a new limiter instance like so:

```javascript
const Bottleneck = require("bottleneck");
// Create a new limiter with a maximum of 1 concurrent requests
// and a limit of 10 requests per minute
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 6000 // 6000ms = 1 minute / 10 requests
});
```

In this example, we've created a limiter that allows a maximum of 1 concurrent requests and enforces a limit of 10 requests per minute. The maxConcurrent option specifies the maximum number of concurrent requests allowed, while the minTime option defines the minimum time (in milliseconds) between requests.

Scheduling API Requests with Bottleneck
With your limiter configured, you can start scheduling API requests using the schedule method. Here's an example:


async function makeRequest() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
// Schedule 20 requests
for (let i = 0; i < 20; i++) {
  limiter.schedule(makeRequest);
}
In this case, we've defined a makeRequest function that simulates an API request. We then schedule 20 requests using the limiter.schedule method. Bottleneck will automatically queue and execute these requests according to the specified rate limit, ensuring that we stay within the boundaries set by the API provider.

Customizing Rate Limiting Behavior
One of the significant advantages of the Bottleneck package is its flexibility. It provides various options to customize the rate limiting behavior according to your application's needs. For instance, you can configure different rate limits based on priorities, handle errors gracefully, and even implement dynamic rate limiting strategies.

Here's an example of how you can handle errors and configure different rate limits based on priorities:


const Bottleneck = require("bottleneck");
// Create a new limiter with various options
const limiter = new Bottleneck({
  maxConcurrent: 5,
  minTime: 6000,
  reservoir: 10, // Initial reservoir size
  reservoirRefreshAmount: 10, // Number of tokens to add to the reservoir
  reservoirRefreshInterval: 60 * 1000 // Interval to refill the reservoir (1 minute)
});
// Configure error handling
limiter.on("failed", async (error, jobInfo) => {
  // Handle failed requests
  console.error(`Request failed: ${error.message}`);
});
// Define priority levels
const priorities = {
  high: 5,
  normal: 3,
  low: 1
};
// Schedule a high-priority request
limiter.schedule({ priority: priorities.high }, makeRequest);
// Schedule a normal-priority request
limiter.schedule({ priority: priorities.normal }, makeRequest);
In this example, we've configured the limiter with an initial reservoir size of 10 requests, refilling 10 tokens every minute. We've also set up error handling by listening to the failed event, which allows us to handle failed requests gracefully.

Additionally, we've defined priority levels (high, normal, and low) and scheduled requests with different priorities using the limiter.schedule method. The Bottleneck package will prioritize higher-priority requests over lower-priority ones, ensuring that critical requests are processed first.

Best Practices and Final Thoughts
When working with the Bottleneck package, it's essential to follow best practices to ensure optimal performance and reliability. Here are a few tips:

Monitor your rate limit usage and adjust your limiter settings accordingly to avoid hitting rate limits.
Implement retry strategies for failed requests to improve resilience.
Cache API responses when possible to reduce the number of requests made.
Consider implementing circuit breakers to prevent cascading failures.
By leveraging the power of the Bottleneck package, you can effectively manage API rate limits, prevent rate limit errors, and maintain a reliable and performant application. Its flexibility and extensive configuration options make it a valuable tool in any Node.js developer's arsenal.
