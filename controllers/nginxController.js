const fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config();

const nginxConfigPath = process.env.nginxConfigPath;

exports.getNginxConfig = (req, res) => {
    fs.readFile(nginxConfigPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read Nginx configuration' });
        }

        res.send(`<pre>${data}</pre>`);
    });
};

exports.addNginxConfig = (req, res) => {
    const newConfig = req.body.config;

    if (!newConfig) {
        return res.status(400).json({ error: 'New configuration is required' });
    }

    fs.readFile(nginxConfigPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read Nginx configuration' });
        }

        // Construct the new configuration string
        const newConfigString = Object.entries(newConfig)
            .map(([key, value]) => `${key} ${value};`)
            .join('\n');

        // Append the new configuration to the existing configuration
        const updatedConfig = `${data}\n\n${newConfigString}`;

        // Write the updated configuration back to the file
        fs.writeFile(nginxConfigPath, updatedConfig, 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write Nginx configuration. You need Sudo Preveilage . To do that make the file writable' });
            }

            // Reload Nginx to apply the new configuration
            exec('nginx -s reload', (error, stdout, stderr) => {
                if (error) {
                    return res.status(500).json({ error: 'Failed to reload Nginx', details: stderr });
                }
                res.json({ message: 'New Nginx configuration added and Nginx reloaded successfully', config: updatedConfig });
            });
        });
    });
};
