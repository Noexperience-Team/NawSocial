const router = require("express").Router();
const messageCtrl = require("../controllers/messageCtrl");
router.post("/new/conversation", messageCtrl.conversation);
router.post("/new/message", messageCtrl.message);
router.get("/get/conversationList", messageCtrl.conversationList);
router.get("/get/conversation", messageCtrl.conversationGet);
router.get("/get/lastMessage", messageCtrl.lastMessage);
router.delete("/delete/conversation", messageCtrl.delete);
module.exports = router;
