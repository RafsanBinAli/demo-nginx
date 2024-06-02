var express = require('express');
var router = express.Router();
const nginxController = require("../controllers/nginxController")


// Route to get the current Nginx configuration
router.get('/', nginxController.getNginxConfig);

// Route to update the Nginx configuration
router.post('/', nginxController.addNginxConfig);


module.exports = router;
