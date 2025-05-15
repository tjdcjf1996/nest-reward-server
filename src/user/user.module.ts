import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConfig } from 'src/config/db/jwt.config';
    JwtModule.registerAsync(jwtConfig),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
