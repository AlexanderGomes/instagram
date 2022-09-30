const express = require("express");
const router = express.Router();

const {
  getNotification,

} = require("../controllers/notifications");


router.get('/:id', getNotification)

module.exports = router;