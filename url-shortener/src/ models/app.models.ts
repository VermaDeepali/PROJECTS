import * as mongoose from "mongoose";

export const ShortUrlSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
});

export interface ShortUrl {
  id: string;
  key: string;
  full_url: string;
  short_url: string;
}
// module.exports = mongoose.model("ShortUrl", ShortUrlSchema)
