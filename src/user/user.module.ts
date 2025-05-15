import { MongooseModule } from '@nestjs/mongoose';
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
