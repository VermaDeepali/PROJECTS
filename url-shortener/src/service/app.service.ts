import { Injectable, NotFoundException } from '@nestjs/common';
import {ShortUrl} from '../ models/app.models'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface IGetFullUrl {
  fullUrl: string
}

@Injectable()
export class AppService {

  constructor(@InjectModel('ShortUrl') private readonly shortUrlModel: Model<ShortUrl>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getFullUrl(data): Promise<IGetFullUrl | null> {  
    const shortUrl = await this.shortUrlModel.findOne({short: data.shortUrl})
    if(shortUrl === null ) { throw new NotFoundException()}
    return { fullUrl: shortUrl.full};
  }

  async createShortUrl(data): Promise<Record<string, any>> {
    const newShortUrl = new this.shortUrlModel({full: data.fullUrl})
    // ShortUrl.create({full: req.body.fullUrl})
    const result = await newShortUrl.save()
    console.log(result, "result")
    return result;
  }
}
