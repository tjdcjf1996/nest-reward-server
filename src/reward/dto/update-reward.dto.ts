import { PartialType } from '@nestjs/mapped-types';
import { CreateRewardDto } from './create-reward.dto.js';

export class UpdateRewardDto extends PartialType(CreateRewardDto) {}
