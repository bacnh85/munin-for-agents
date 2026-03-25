# Munin Error Codes (Spec v1)

## Standard Codes

- `AUTH_INVALID`  
  Credentials are missing, malformed, expired, or invalid.

- `FEATURE_DISABLED`  
  The requested action/feature is disabled for the current tier/project.

- `NOT_FOUND`  
  Requested memory/project/resource could not be found.

- `RATE_LIMITED`  
  Request exceeded allowed rate limits.

- `VALIDATION_ERROR`  
  Request payload failed schema/semantic validation.

- `INTERNAL_ERROR`  
  Unexpected server failure.

## Error Envelope

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "query is required",
    "details": {
      "field": "payload.query"
    }
  },
  "requestId": "req_123"
}
```

## Mapping guidance

- HTTP `401/403` -> `AUTH_INVALID` or `FEATURE_DISABLED`
- HTTP `404` -> `NOT_FOUND`
- HTTP `429` -> `RATE_LIMITED`
- HTTP `400/422` -> `VALIDATION_ERROR`
- HTTP `500+` -> `INTERNAL_ERROR`
