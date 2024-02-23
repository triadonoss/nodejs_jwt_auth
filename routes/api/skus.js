const express = require('express');
const router = express.Router();
const skusController = require('../../controllers/skusController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(skusController.getAllSkus)
    .post(verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor), skusController.createNewSku)
    .put(verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor), skusController.updateSku)
    .delete(verifyRoles(ROLES_LIST.User), skusController.deleteSku);

router.route('/:id')
    .get(skusController.getSku);

module.exports = router;