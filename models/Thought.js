const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const { format_time, format_date } = require('../utils/helpers.js');

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
            get: function (createdAt) {
                return {
                    time: format_time(createdAt),
                    date: format_date(createdAt),
                };
            },
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
            getters: true,
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