const express = require("express");
const router = express.Router();

const { getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact } = require("../controllers/contactController");

const { webData,getdata } = require("../controllers/testController");

router.route("/contacts").get(getContacts).post(createContact);

router.route("/contacts/:id").get(getContact).put(updateContact).delete(deleteContact);

router.route("/webdata").get(webData).post(getdata);

module.exports = router;