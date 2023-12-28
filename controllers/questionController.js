const Question = require('../models/Question');
const Option = require('../models/Option');

// Create a question
exports.createQuestion = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Blank question cannot be created',
      });
    }

    // Check if a question with the same title already exists
    const existingQuestion = await Question.findOne({ title });

    if (existingQuestion) {
      return res.status(400).json({
        success: false,
        message: 'A question with the same text had already been created.',
      });
    }

    // If no existing question found, create and save the new question
    const newQuestion = new Question({ title });
    await newQuestion.save();

    return res.json({ success: true, message: 'Question created', question: newQuestion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Add options to a question
exports.addOptions = async (req, res) => {
  try {
    const questionId = req.params.id;
    const {text} = req.body;

    if (!text) {
      return res.status(404).json({
        success: false,
        message: 'text required for creating option',
      });
    }
  
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'question not found!',
      });
    }
    console.log("start");
    const existingOption = await Option.findOne({ text, question_id: questionId });

    if (existingOption) {
      return res.status(400).json({
        success: false,
        message: 'An option with the same text already exists for this question.',
      });
    }
    const option = await Option.create({
      text,
      question_id: questionId,
    });
    console.log("end");
    // create link_to_vote using _id of option
    const link_to_vote = `http://localhost:8000/options/${option.id}/add_vote`;

    option.link_to_vote = link_to_vote;

    option.save();

    // put reference of option in question schema
    await question.updateOne({ $push: { options: option } });

    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    console.log('*******', err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Delete associated options first (if needed)
    await Option.deleteMany({ _id: { $in: question.options } });

    await question.deleteOne();

    return res.json({ success: true, message: 'Question and associated options deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// View a question and its options
exports.viewQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findById(questionId).populate('options');

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    return res.json({ success: true, question });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
