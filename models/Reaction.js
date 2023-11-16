const { Schema, Types } = require('mongoose');
const { format_time, format_date } = require('../utils/helpers.js');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
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
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;