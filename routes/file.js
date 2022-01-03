var express = require("express");
var router = express.Router();
var fileController = require("../controllers").file;

router.get("/",(req,res)=>{
    res.send("file");
});
router.get("/download",fileController.download);
router.get("/compress",fileController.compress);

module.exports = router;
