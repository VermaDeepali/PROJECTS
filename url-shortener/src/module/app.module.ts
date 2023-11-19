import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortUrlSchema } from 'src/ models/app.models';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/urlShortener'), MongooseModule.forFeature([{
    name: 'ShortUrl', schema: ShortUrlSchema
  }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
