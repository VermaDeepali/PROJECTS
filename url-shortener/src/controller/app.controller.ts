import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get("/fullUrl")
  // getFullUrl(): string {
  //   // console.log(shortid.generate(), "new id")
  //   return this.appService.getFullUrl()
  // }

  @Post("/shortUrls")
  async createShortUrl(@Body() body: {fullUrl: String}, @Res() res): Promise<Record<string, any>> {
    // console.log(shortid.generate(), "new id")
    console.log(body, "body")
    let result =  await this.appService.createShortUrl(body)
    console.log(result, "57jsdgjshdg")
    return result
  }

  // @Get("/:shortUrl")
  // getFullUrl(Req): Promise<string> {
  //   // console.log(shortid.generate(), "new id")
  //   // return this.appService.getFullUrl(Req)
  // }
}
