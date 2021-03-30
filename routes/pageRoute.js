const router = require("express").Router();
const { pageData } = require("../controllers/pageController");

router.post("/page_data", pageData);

module.exports = router;