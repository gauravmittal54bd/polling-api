const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true
    },
    options: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Option'
    }]
  },
  {
    versionKey: 'customVersionKey',
    timestamps: {
      createdAt: 'customCreatedAt',
      updatedAt: 'customUpdatedAt'
    }
  }
  );
  
  module.exports = mongoose.model('Question', questionSchema);