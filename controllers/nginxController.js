const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
require('dotenv').config();

const nginxConfigPath = process.env.nginxConfigPath;
const sitesAvailablePath = process.env.SITES_AVAILABLE_PATH;
const sitesEnabledPath = process.env.SITES_ENABLED_PATH;



exports.getNginxConfig = (req, res) => {
    fs.readFile(nginxConfigPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read Nginx configuration' });
        }

        res.send(`<pre>${data}</pre>`);
    });
};





exports.addNginxConfig = (req, res) => {
    
    let newConfigText = '';

    // Reading the request body as plain text
    req.on('data', (chunk) => {
        newConfigText += chunk.toString();
    });

    req.on('end', () => {
        if (!newConfigText) {
            return res.status(400).json({ error: 'New configuration is required' });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const configFilename = `config-${timestamp}.conf`;
        const configFilePath = path.join(sitesAvailablePath, configFilename);
        const configFileEnablePath = path.join(sitesEnabledPath, configFilename);

        // Write the configuration text to a file
        fs.writeFile(configFilePath, newConfigText, 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write Nginx configuration', details: err });
            }

            // Create a symbolic link in sites-enabled
            fs.symlink(configFilePath, configFileEnablePath, (symlinkErr) => {
                if (symlinkErr) {
                    return res.status(500).json({ error: 'Failed to create symlink', details: symlinkErr });
                }

                // Reload Nginx to apply the new configuration
                exec('sudo nginx -s reload', (execErr, stdout, stderr) => {
                    if (execErr) {
                        return res.status(500).json({ error: 'Failed to reload Nginx', details: stderr });
                    }
                    res.json({ message: 'New Nginx configuration added and Nginx reloaded successfully', config: newConfigText });
                });
            });
        });
    });
};


