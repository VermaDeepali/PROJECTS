import { Injectable, NotFoundException } from '@nestjs/common';
import {ShortUrl} from '../ models/app.models'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {

  constructor(@InjectModel('ShortUrl') private readonly shortUrlModel: Model<ShortUrl>) {}

  getHello(): string {
    return 'Hello World!';
  }

  // async getFullUrl(): Promise<string> {
  //   // const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
  //   // if(shortUrl === null ) {return new NotFoundException(404)}
  //   // shortUrl.save()
  //   // return shortUrl.full;
  //   return ""
  // }

  async createShortUrl(data): Promise<Record<string, any>> {
    const newShortUrl = new this.shortUrlModel({full: data.fullUrl})
    // ShortUrl.create({full: req.body.fullUrl})
    const result = await newShortUrl.save()
    console.log(result, "result")
    return result;
  }
}
