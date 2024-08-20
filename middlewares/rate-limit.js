const rateLimitData = new Map();
const windowSize = 60 * 1000; // 1 minute
const maxRequests = 30; // Maximum requests per minute


export default function rateLimit(req, res, next) {
    let timestamps = rateLimitData.get(req.ip) || [];
  
    // Remove old timestamps
    timestamps = timestamps.filter(t => t >= Date.now() - windowSize);
  
    if (timestamps.length >= maxRequests) {
      return res.status(429).send('Too Many Requests');
    }
  
    timestamps.push(Date.now());
    rateLimitData.set(req.ip, timestamps);
  
    return next()
}
