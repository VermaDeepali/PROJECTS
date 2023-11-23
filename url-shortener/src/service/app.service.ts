import { Injectable, NotFoundException } from "@nestjs/common";
import { ShortUrl } from "../ models/app.models";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

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
    const shortUrl = await this.shortUrlModel.findOne({ short: data.shortUrl });
    console.log("shortUrl", shortUrl);
    if (shortUrl === null) {
      throw new NotFoundException();
    }
    return { fullUrl: shortUrl.full };
  }

  async isFullUrlExist(data): Promise<Record<string, any> | null> {
    const fullUrl = await this.shortUrlModel.findOne({ full: data.fullUrl });
    return fullUrl;
  }

  async createShortUrl(data): Promise<IGetShortUrl | null> {
    const isShortUrlExist = await this.isFullUrlExist(data);
    if (isShortUrlExist) {
      return { shortUrl: isShortUrlExist.short };
    }
    const newShortUrl = new this.shortUrlModel({ full: data.fullUrl });
    const result = await newShortUrl.save();
    return { shortUrl: result.short };
  }
}
