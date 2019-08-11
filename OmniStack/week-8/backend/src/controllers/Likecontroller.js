const Dev = require('../models/Dev');

module.exports = {
  async store(req,res) {

    console.log(req.io, req.connectedUsers);
    
    const { devID } = req.params;
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devID);

    if (!targetDev) {
      return res.status(400).json({
        error: 'user not exists'
      })
    }

    if ( targetDev.likes.includes(loggedDev._id) ) {
      const loggedSocket = req.connectedUsers[user];
      const targgetSocket = req.connectedUsers[devID];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetDev);
      }
      if (targgetSocket) {
        req.io.to(targgetSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};