const Option = require('../models/Option');

// Controller function to add a vote to an option
exports.addVote = async (req, res) => {
  try {
    const optionId = req.params.id;

    // Find the option by its ID
    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(404).json({ success: false, message: 'Option not found' });
    }

    // Increment the vote count
    option.votes += 1;

    // Save the updated option
    await option.save();

    return res.json({ success: true, message: 'Vote added to option', option });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Controller function to delete an option
exports.deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;

    // Find the option by its ID
    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(404).json({ success: false, message: 'Option not found' });
    }

    // Delete the option
    await option.deleteOne();

    return res.json({ success: true, message: 'Option deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
