const Faq = require('../models/Faq');

// Insert FAQ
const insertFaq = async (req, res) => {
  const { question, answer, position } = req.body;

  try {
    // Get the maximum position value in the collection
    
    const maxPositionFaq = await Faq.findOne().sort({ position: -1 });
    const maxPosition = maxPositionFaq ? maxPositionFaq.position : 0;

    // Adjust the position if it's too high
    let adjustedPosition = position;
    if (position > maxPosition + 1) {
      adjustedPosition = maxPosition + 1;
    }

    // Shift positions if needed
    await Faq.updateMany(
      { position: { $gte: adjustedPosition } },
      { $inc: { position: 1 } }
    );

    // Create new FAQ
    const newFaq = new Faq({ question, answer, position: adjustedPosition });
    await newFaq.save();

    res.status(201).json(newFaq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete FAQ
const deleteFaq = async (req, res) => {
  const { position } = req.body;

  try {
    const faqToDelete = await Faq.findOne({ position });
    if (!faqToDelete) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    await Faq.findByIdAndDelete(faqToDelete._id);

    // Decrement positions
    await Faq.updateMany(
      { position: { $gt: position } },
      { $inc: { position: -1 } }
    );

    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch FAQs
const fetchFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ position: 1 });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  insertFaq,
  deleteFaq,
  fetchFaqs
};
