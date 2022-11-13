const { Schema, model, Types } = require('mongoose');
const moment = require('moment')

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: value => moment(value).format("MMM DD, YYYY [at] hh:mm a")
        },
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false,
    },
)

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: value => moment(value).format("MMM DD, YYYY [at] hh:mm a")
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        reactionSchema
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per user
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })
  .set(function (v) {
   
    this.set(v);
  });

const Thought = model('thought', thoughtSchema);





module.exports = Thought;
