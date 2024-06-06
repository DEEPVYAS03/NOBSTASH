const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Insert FAQ
router.post('/insert', faqController.insertFaq);

// Delete FAQ
router.delete('/delete', faqController.deleteFaq);

// Fetch FAQs
router.get('/fetch', faqController.fetchFaqs);

module.exports = router;
