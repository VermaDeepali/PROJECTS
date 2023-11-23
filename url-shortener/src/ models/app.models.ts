import * as mongoose from 'mongoose';
import * as shortId from 'shortid';

export const ShortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
});

export interface ShortUrl {
  id: string;
  full: string;
  short: string;
}
// module.exports = mongoose.model("ShortUrl", ShortUrlSchema)
