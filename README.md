# Nginx Configuration API

This is a Node.js application that provides an API for managing Nginx configuration.

## Getting Started

To run this application, follow these steps:

1. Install Node.js and npm if you haven't already.
2. Clone this repository.
3. Navigate to the project directory.
4. Install dependencies:
    ```bash
    npm install
    ```
5. Start the server:
    ```bash
    npm start
    ```

The server will start running on port 4000 by default.

## Endpoints

### GET /nginx

Returns the current Nginx configuration.

### POST /nginx

Adds new configuration entries to the Nginx configuration.

#### Request Body

The request body should be a JSON object containing the new configuration entries.
Example:
```json
{
    "config": {
        "sendfile": "on",
        "tcp_nopush": "on",
        "types_hash_max_size": "2048",
        "ssl_protocols": "TLSv1 TLSv1.1 TLSv1.2 TLSv1.3",
        "ssl_prefer_server_ciphers": "on",
        "access_log": "/var/log/nginx/access.log",
        "error_log": "/var/log/nginx/error.log",
        "gzip": "on"
    }
}
```
## Note

The addition of configuration entries requires sudo privileges to modify the Nginx configuration files. Ensure that the files specified in the configuration paths have appropriate sudo privileges for writing.

## Response

- **200 OK:** If the configuration is successfully updated.
- **400 Bad Request:** If the request body is missing or invalid.
- **500 Internal Server Error:** If there is an error while reading/writing the Nginx configuration or reloading Nginx.
