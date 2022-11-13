const { Schema, model } = require('mongoose');
const moment = require('moment')

const userSchema = new Schema(
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
        get: moment(this).format("MMM DD, YYYY [at] hh:mm a")
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
userSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return reactions.length;
  })
  .set(function (v) {
   
    this.set(v);
  });

const Thought = model('thought', thoughtSchema);

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
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: moment(this).format("MMM DD, YYYY [at] hh:mm a")
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



module.exports = Thought;
