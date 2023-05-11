import mongoose from "mongoose";

const { Schema } = mongoose;

const budgetSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
