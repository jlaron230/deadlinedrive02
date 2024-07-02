const models = require("../models");

const upvote = async (req, res) => {
  try {
    const userId = req.payload.sub; // Assuming user ID is in JWT payload
    const quoteId = parseInt(req.params.quoteId, 10);

    console.log(`Upvoting quote ID: ${quoteId} by user ID: ${userId}`);

    const [existingVote] = await models.user_votes.getVoteByUserAndQuote(userId, quoteId);
    console.log("Existing vote:", existingVote);

    if (existingVote.length > 0) {
      if (existingVote[0].vote === 1) {
        console.log("User already upvoted this quote, downvoting instead.");
        
        await models.quote.decrementVote(quoteId, -1);
        await models.user_votes.delete(existingVote[0].id);
        console.log("Removed upvote");
      } else {
        await models.quote.incrementVote(quoteId); // Changing downvote to neutral first
        await models.quote.incrementVote(quoteId); // Then neutral to upvote
        await models.user_votes.updateVote(userId, quoteId, 1);
      }
    } else {
        await models.quote.incrementVote(quoteId);
        await models.user_votes.insertVote(userId, quoteId, 1);
      console.log("Added new upvote");
    }

    const updatedQuote = await models.quote.getById(quoteId);
    res.status(200).json(updatedQuote);
  } catch (error) {
    console.error("Error upvoting quote:", error);
    res.status(500).json({ message: "Failed to upvote quote" });
  }
};

const downvote = async (req, res) => {
  try {
    const userId = req.payload.sub; // Assuming user ID is in JWT payload
    const quoteId = parseInt(req.params.quoteId, 10);

    console.log(`Downvoting quote ID: ${quoteId} by user ID: ${userId}`);

    const [existingVote] = await models.user_votes.getVoteByUserAndQuote(userId, quoteId);
    console.log("Existing vote:", existingVote);

    if (existingVote.length > 0) {
      if (existingVote[0].vote === -1) {
        await models.quote.incrementVote(quoteId);
        await models.user_votes.delete(existingVote[0].id);
        console.log("Removed downvote");
      } else {
        await models.quote.decrementVote(quoteId); // Changing upvote to neutral first
        await models.quote.decrementVote(quoteId); // Then neutral to downvote
        await models.user_votes.updateVote(userId, quoteId, -1);
        console.log("Switched upvote to downvote");
      }
    } else {
        await models.quote.decrementVote(quoteId);
        await models.user_votes.insertVote(userId, quoteId, -1);
      console.log("Added new downvote");
    }

    const updatedQuote = await models.quote.getById(quoteId);
    res.status(200).json(updatedQuote);
  } catch (error) {
    console.error("Error downvoting quote:", error);
    res.status(500).json({ message: "Failed to downvote quote" });
  }
};

module.exports = {
  upvote,
  downvote,
};
