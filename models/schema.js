const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    voteId: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: String, required: true },
    place: { type: String, required: true },
    constituency: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    // Assuming you don't want to encrypt the 'vote' field
    vote: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash and salt sensitive fields before saving
userSchema.pre("save", async function (next) {
  const user = this;

  // Hash and salt the sensitive fields
  const saltRounds = 10;
  const hashFields = ["voteId", "name", "phoneNumber", "age", "place", "constituency", "district", "state"];

  for (const field of hashFields) {
    if (user.isModified(field)) {
      const hashedValue = await bcrypt.hash(user[field], saltRounds);
      user[field] = hashedValue;
    }
  }

  next();
});

const Vote = mongoose.model("Vote_details", userSchema);
module.exports = Vote;
