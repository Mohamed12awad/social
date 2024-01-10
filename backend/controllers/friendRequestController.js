const User = require("../models/userModel");

exports.get_friends = async (req, res) => {
  const loggedUser = req.user.userId;
  try {
    const users = await User.findById(loggedUser);
    res.status(200).json({ friends: users.friends });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Finding Friends", error: err.message });
  }
};

exports.get_requestsSent = async (req, res) => {
  const loggedUser = req.user.userId;
  try {
    const users = await User.findById(loggedUser);
    res.status(200).json({ friendsSent: users.friendRequestsSent });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Finding Friends", error: err.message });
  }
};

exports.get_requestsReceived = async (req, res) => {
  const loggedUser = req.user.userId;
  try {
    const users = await User.findById(loggedUser);
    res.status(200).json({ friendsReceived: users.friendRequestsReceived });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Finding Friends", error: err.message });
  }
};

exports.post_sendRequest = async (req, res) => {
  const { id: recipientId } = req.params;
  const loggedUser = req.user.userId;
  try {
    const sender = await User.findById(loggedUser);
    const recipient = await User.findById(recipientId);
    // remember to make it into a switch statement to handle errors Efficiently
    if (
      !sender.friendRequestsSent.includes(recipientId) &&
      !sender.friendRequestsSent.includes(loggedUser) &&
      !sender.friends.includes(recipientId) &&
      !recipient.friendRequestsReceived.includes(loggedUser) &&
      !recipient.friendRequestsReceived.includes(recipientId) &&
      !sender._id.equals(recipientId)
    ) {
      recipient.friendRequestsReceived.push(loggedUser);
      sender.friendRequestsSent.push(recipientId);

      await recipient.save();
      await sender.save();
      res.status(200).json({ message: "friend request sent", user: sender });
    } else {
      return res.status(200).json({ message: "request could not be sent" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding Friends", error: err.message });
  }
};

exports.delete_friendRequest = async (req, res) => {
  const { id: recipientId } = req.params;
  const loggedUser = req.user.userId;
  try {
    const sender = await User.findById(loggedUser);
    const recipient = await User.findById(recipientId);

    if (
      sender.friendRequestsSent.includes(recipientId) ||
      recipient.friendRequestsReceived.includes(loggedUser)
    ) {
      recipient.friendRequestsReceived.pull(loggedUser);
      sender.friendRequestsSent.pull(recipientId);

      await recipient.save();
      await sender.save();
      res.status(200).json({ message: "friend request deleted", user: sender });
    } else {
      return res.status(200).json({ message: "friend request Does not Exist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding Friends", error: err.message });
  }
};
exports.delete_removeFriend = async (req, res) => {
  const { id: recipientId } = req.params;
  const loggedUser = req.user.userId;
  try {
    const sender = await User.findById(loggedUser);
    const recipient = await User.findById(recipientId);

    if (
      sender.friends.includes(recipientId) ||
      recipient.friends.includes(loggedUser)
    ) {
      recipient.friends.pull(loggedUser);
      sender.friends.pull(recipientId);

      await recipient.save();
      await sender.save();
      res.status(200).json({ message: "friend request deleted", user: sender });
    } else {
      return res.status(200).json({ message: "friend request Does not Exist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding Friends", error: err.message });
  }
};

exports.post_acceptRequest = async (req, res) => {
  const { id: acceptedFriendId } = req.params;
  const loggedUserId = req.user.userId;

  try {
    const user = await User.findById(loggedUserId);
    const friend = await User.findById(acceptedFriendId);

    const requestCanBeAccepted =
      friend.friendRequestsSent.includes(loggedUserId) &&
      user.friendRequestsReceived.includes(acceptedFriendId) &&
      !user.friends.includes(acceptedFriendId) &&
      !friend.friends.includes(loggedUserId);

    if (requestCanBeAccepted) {
      user.friendRequestsReceived.pull(acceptedFriendId);
      friend.friendRequestsSent.pull(loggedUserId);

      friend.friends.push(loggedUserId);
      user.friends.push(acceptedFriendId);

      // await Promise.all([friend.save(), user.save()]);
      await friend.save();
      await user.save();
      res.status(200).json({ message: "friend added", user: loggedUserId });
    } else {
      return res.status(200).json({ message: "request could not be sent" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding Friends", error: err.message });
  }
};
