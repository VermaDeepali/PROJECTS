import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService, IGetFullUrl, IGetShortUrl } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/shortUrls')
  async createShortUrl(
    @Body() body: { fullUrl: string },
    @Res() res,
  ): Promise<IGetShortUrl | null> {
    console.log(body, 'body');
    const result = await this.appService.createShortUrl(body);
    if (result) {
      return res.send(result);
    }
  }

  @Get('/:shortUrl')
  getFullUrl(@Req() req): Promise<IGetFullUrl | null> {
    return this.appService.getFullUrl(req.params);
  }
}
