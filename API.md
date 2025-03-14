# Elevator System API Usage Guide

## Authentication

Before making any API calls, you need to obtain an API key. Include it in all requests using the `X-API-Key` header:

```bash
X-API-Key: your_api_key_here
```

## Base URLs

- Production: `https://api.elevatorsystem.com/v1`
- Staging: `https://staging-api.elevatorsystem.com/v1`

## Examples

### 1. Register a Building

First, register your building to get a `buildingId`:

```bash
curl -X POST https://api.elevatorsystem.com/v1/buildings \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tower A",
    "floors": 6,
    "elevators": 5,
    "configuration": {
      "algorithm": "optimized",
      "peakHours": {
        "morning": {
          "start": "08:00",
          "end": "10:00"
        },
        "evening": {
          "start": "17:00",
          "end": "19:00"
        }
      }
    }
  }'
```

JavaScript:
```javascript
const registerBuilding = async () => {
  const response = await fetch('https://api.elevatorsystem.com/v1/buildings', {
    method: 'POST',
    headers: {
      'X-API-Key': 'your_api_key_here',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Tower A',
      floors: 6,
      elevators: 5,
      configuration: {
        algorithm: 'optimized',
        peakHours: {
          morning: { start: '08:00', end: '10:00' },
          evening: { start: '17:00', end: '19:00' },
        },
      },
    }),
  });
  
  const building = await response.json();
  return building;
};
```

### 2. Call an Elevator

To request an elevator to a specific floor:

```bash
curl -X POST https://api.elevatorsystem.com/v1/elevators/call \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "buildingId": "123e4567-e89b-12d3-a456-426614174000",
    "fromFloor": 2,
    "direction": "up"
  }'
```

JavaScript:
```javascript
const callElevator = async (buildingId, fromFloor, direction) => {
  const response = await fetch('https://api.elevatorsystem.com/v1/elevators/call', {
    method: 'POST',
    headers: {
      'X-API-Key': 'your_api_key_here',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      buildingId,
      fromFloor,
      direction,
    }),
  });
  
  const result = await response.json();
  return result;
};
```

### 3. Select Floor from Inside Elevator

To select a destination floor from inside an elevator:

```bash
curl -X POST https://api.elevatorsystem.com/v1/elevators/1/select \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "buildingId": "123e4567-e89b-12d3-a456-426614174000",
    "targetFloor": 5
  }'
```

JavaScript:
```javascript
const selectFloor = async (elevatorId, buildingId, targetFloor) => {
  const response = await fetch(`https://api.elevatorsystem.com/v1/elevators/${elevatorId}/select`, {
    method: 'POST',
    headers: {
      'X-API-Key': 'your_api_key_here',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      buildingId,
      targetFloor,
    }),
  });
  
  const result = await response.json();
  return result;
};
```

### 4. Get Elevator Status

To monitor the status of all elevators in a building:

```bash
curl https://api.elevatorsystem.com/v1/elevators/status?buildingId=123e4567-e89b-12d3-a456-426614174000 \
  -H "X-API-Key: your_api_key_here"
```

JavaScript:
```javascript
const getElevatorStatus = async (buildingId) => {
  const response = await fetch(`https://api.elevatorsystem.com/v1/elevators/status?buildingId=${buildingId}`, {
    headers: {
      'X-API-Key': 'your_api_key_here',
    },
  });
  
  const status = await response.json();
  return status;
};
```

### 5. Get Building Analytics

To retrieve analytics data for a specific building:

```bash
curl https://api.elevatorsystem.com/v1/buildings/123e4567-e89b-12d3-a456-426614174000/analytics \
  -H "X-API-Key: your_api_key_here" \
  -G \
  -d "startDate=2025-01-01T00:00:00Z" \
  -d "endDate=2025-01-31T23:59:59Z"
```

JavaScript:
```javascript
const getBuildingAnalytics = async (buildingId, startDate, endDate) => {
  const params = new URLSearchParams({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  const response = await fetch(
    `https://api.elevatorsystem.com/v1/buildings/${buildingId}/analytics?${params}`,
    {
      headers: {
        'X-API-Key': 'your_api_key_here',
      },
    }
  );
  
  const analytics = await response.json();
  return analytics;
};
```

## Rate Limits and Pricing

The API has rate limits based on your pricing tier:

- Basic: 1,000 requests/month
- Professional: 10,000 requests/month
- Enterprise: 100,000 requests/month

Rate limit information is included in the response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 985
X-RateLimit-Reset: 1640995200
```

## Error Handling

The API uses standard HTTP status codes and returns detailed error messages:

```javascript
try {
  const response = await callElevator(buildingId, fromFloor, direction);
 
} catch (error) {
  if (error.status === 429) {
    
    console.log('Rate limit exceeded. Please upgrade your plan.');
  } else if (error.status === 403) {
    
    console.log('API quota exceeded for this month.');
  } else {
   
    console.error('API Error:', error.message);
  }
}
```
