const express           = require('express');
const DevController     = require('./controllers/DevController');
const LikeController    = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const router            = express.Router();

router.get('/devs', DevController.index);
router.post('/devs', DevController.store);
router.post('/devs/:devID/likes', LikeController.store);
router.post('/devs/:devID/dislikes', DislikeController.store);

module.exports = router; 