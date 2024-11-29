const Vote = require("../models/Vote");

// Fetch leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.status(200).json(votes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

// Update or create votes
exports.castVote = async (req, res) => {
  const { formName } = req.body;

  try {
    let vote = await Vote.findOne({ formName });
    if (vote) {
      vote.count += 1; // Increment count if form exists
    } else {
      vote = new Vote({ formName, count: 1 }); // Create new entry
    }
    await vote.save();
    res.status(200).json({ success: true, message: "Vote cast successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to cast vote" });
  }
};
