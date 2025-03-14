module.exports = (req, res, next) => {
  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }


  if (req.method !== 'OPTIONS') {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== 'test_api_key_123') {
      return res.status(401).json({
        error: 'Invalid or missing API key'
      });
    }
  }

 
  res.header('X-RateLimit-Limit', '1000');
  res.header('X-RateLimit-Remaining', '999');
  res.header('X-RateLimit-Reset', new Date(Date.now() + 3600000).getTime());


  if (req.path.includes('/buildings/') && req.path.includes('/analytics')) {
    const buildingId = req.path.split('/buildings/')[1].split('/analytics')[0];
    const analytics = res.locals.data.analytics.find(a => a.id === buildingId);
    
    if (analytics) {
      const { startDate, endDate } = req.query;
      analytics.period = {
        start: startDate,
        end: endDate
      };
      return res.json(analytics);
    }
  }

  next();
}