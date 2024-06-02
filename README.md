# Nginx Configuration API

This is a Node.js application that provides an API for managing Nginx configuration.

The server will start running on port 4000 by default.

## Adding a New Nginx Configuration


1. **POST Request**: User sends a POST request with plain text containing the new Nginx configuration.

2. **File Creation**: API creates two configuration files in `sites-available` and `sites-enabled`.

3. **Symbolic Link**: API creates a symbolic link between the files.

4. **Nginx Reload**: Nginx is reloaded to apply the new configuration.

5. **Response**: API responds with success or error messages.

This summarizes the key steps involved in adding a new Nginx configuration via the API.


![Screenshot from 2024-06-03 02-53-13](https://github.com/RafsanBinAli/demo-nginx/assets/154937557/fd35be2c-4362-41a5-84b6-da09983ef225)


## Endpoints

### GET /nginx

Returns the current Nginx configuration.

### POST /nginx

Adds new configuration entries to the Nginx configuration.
#### Request Body

The request body should be plain text containing the new configuration entries. Each configuration entry should be provided in the format:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name example.com;

    root /var/www/example.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```


## Note

The addition of configuration entries requires sudo privileges to modify the Nginx configuration files. Ensure that the files specified in the configuration paths have appropriate sudo privileges for writing. 

Or one can start this application by using 

```bash
sudo node app.js
```

## Response

- **200 OK:** If the configuration is successfully updated.
- **400 Bad Request:** If the request body is missing or invalid.
- **500 Internal Server Error:** If there is an error while reading/writing the Nginx configuration or reloading Nginx.
