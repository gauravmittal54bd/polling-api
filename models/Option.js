const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique : true
  },
  votes: {
    type: Number,
    default: 0
  },
  link_to_vote: {
    type: String
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('Option', optionSchema);
