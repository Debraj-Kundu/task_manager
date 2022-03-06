const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: [true, "required"],
    trim: true,
    maxlength: [20, "less than 20 chars"],
  },
  done: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Tasks", TodoSchema);
