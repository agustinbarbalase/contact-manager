const { Router } = require('express');
const router = Router();
const contactControllers = require('../controllers/contact.controllers');
const { isAuthenticated } = require('../middlewares/authentication');

// List contact
router.get('/contact', isAuthenticated, contactControllers.getAllContacts);

// Add contact
router.get('/contact/add', isAuthenticated, contactControllers.getPostFormContacts);
router.post('/contact/add', isAuthenticated, contactControllers.postContact);

// Edit contact
router.get('/contact/edit/:id', isAuthenticated, contactControllers.getPutFormContact);
router.post('/contact/edit/:id', isAuthenticated, contactControllers.putContact);

// Delete contact
router.get('/contact/delete/:id', isAuthenticated, contactControllers.deleteContact);

module.exports = router;