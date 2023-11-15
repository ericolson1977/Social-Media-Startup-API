const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const { userId } = req.params;

            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that id!' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            await User.findOneAndRemove({ _id: userId });

            res.json({ message: 'User and associated thoughts deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createFriend(req, res) {
        try {
            const { userId, friendId } = req.params;

            const user = await User.findByIdAndUpdate(
                userId,
                { $push: { friends: friendId } },
                { new: true }
            );

            const friend = await User.findByIdAndUpdate(
                friendId,
                { $push: { friends: userId } },
                { new: true }
            );

            res.json({ user, friend });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a friend relationship between two users
    async deleteFriend(req, res) {
        try {
            const { userId, friendId } = req.params;

            const user = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
                { new: true }
            );

            const friend = await User.findByIdAndUpdate(
                friendId,
                { $pull: { friends: userId } },
                { new: true }
            );

            res.json({ user, friend });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};