const express = require('express');
const router = express.Router();
const sqlConn = require ('../connection')
sqlConn.connection
  .connect()
  .then(() => console.log("Database Connected ..."))
  .catch((err) => console.error("Connection error", err.stack));

router.get ('/items', async (req, res) => {
  // console.log(req.body.email);
  // console.log(req.body.password);
  try {
  const result = await sqlConn.connection.query(`SELECT * FROM items`)
    if (result.rowCount === 0) throw new Error ('items Does Not Exist.')
    else{
        res.json(result.rows)
    }
  } catch (error) {
    return res.status(500).json({ msg: `${error.message}` });
  }
});
// router.post ('/signup', indexcontroller.campaigner_signup);
// router.post ('/reset-password', indexcontroller.campaigner_resetpassword);
// router.get ('/change-password/:id/:token', indexcontroller.campaigner_changepassword);
// router.post ('/change-password/:id/:token', indexcontroller.campaigner_submitchangepassword);
// router.get ('/authorize',auth,  indexcontroller.authorize);
// router.post ('/createcampaign', auth, indexcontroller.create_campaign);
// router.get ('/logout', auth, indexcontroller.logout);

module.exports = router;