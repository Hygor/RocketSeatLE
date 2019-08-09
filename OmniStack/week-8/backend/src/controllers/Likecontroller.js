const Dev = require('../models/Dev');

module.exports = {
  async store(req,res) {
    
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
      console.log('deu match!');
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};