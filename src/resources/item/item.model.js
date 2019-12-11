import mongoose from 'mongoose'
var ObjectId = mongoose.Schema.Types.ObjectId

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
      trim: true
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'complete', 'pastdue'],
      required: true
    },
    notes: String,
    due: Date,
    createdBy: {
      type: ObjectId,
      ref: 'user',
      required: true
    },
    list: {
      type: ObjectId,
      ref: 'list',
      required: true
    }
  },
  { timestamps: true }
)

itemSchema.index({ list: 1, name: 1 }, { unique: true })

export const Item = mongoose.model('item', itemSchema)
