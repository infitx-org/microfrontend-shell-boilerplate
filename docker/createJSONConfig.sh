#!/bin/sh

# Creates the JSON config based on environment variables
echo "{
  \"API_BASE_URL\": \"${API_BASE_URL}\",
  \"AUTH_ENABLED\": \"${AUTH_ENABLED}\",
  \"LOGIN_URL\": \"${LOGIN_URL}\",
  \"LOGOUT_URL\": \"${LOGOUT_URL}\",
  \"MOCK_API\": \"${MOCK_API}\",
  \"TOKEN_URL\": \"${TOKEN_URL}\"
}" | jq '.' > config.json

# This will exec the CMD from your Dockerfile, i.e. "npm start"
exec "$@"