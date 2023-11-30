import { Injectable, NotFoundException } from "@nestjs/common";
import { ShortUrl } from "../ models/app.models";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as shortId from "shortid";

export interface IGetFullUrl {
  fullUrl: string;
}

export interface IGetShortUrl {
  shortUrl: string;
}

@Injectable()
export class AppService {
  constructor(
    @InjectModel("ShortUrl") private readonly shortUrlModel: Model<ShortUrl>,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  async getFullUrl(data): Promise<IGetFullUrl | null> {
    console.log("data", data);
    const shortUrl = await this.shortUrlModel.findOne({
      short_url: data.shortUrl,
    });
    console.log("shortUrl", shortUrl);
    if (shortUrl === null) {
      throw new NotFoundException();
    }
    return { fullUrl: shortUrl.full_url };
  }

  async isFullUrlExist(data): Promise<Record<string, any> | null> {
    const fullUrl = await this.shortUrlModel.findOne({
      full_url: data.fullUrl,
    });
    return fullUrl;
  }

  async createShortUrl(data): Promise<IGetShortUrl | null> {
    const isShortUrlExist = await this.isFullUrlExist(data);
    if (isShortUrlExist) {
      return { shortUrl: isShortUrlExist.short_url };
    }
    const key = shortId.generate();
    const newShortUrl = new this.shortUrlModel({
      key,
      full_url: data.fullUrl,
      short_url: `http://localhost:3000/${key}`,
    });
    const result = await newShortUrl.save();
    console.log(result, ">>>>>>>>>>>>>>");
    return { shortUrl: result.short_url };
  }
}
