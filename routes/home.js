const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.send("Hello Node js");
    // res.render('index', {title: 'my express app',  greeting:"Assalomu alaykum va rahmatulloh"} )
  });
  module.exports = router