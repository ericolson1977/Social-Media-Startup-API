const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 200,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `reaction` that gets the amount of reactions per thought
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;