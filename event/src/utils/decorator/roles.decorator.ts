import { SetMetadata } from '@nestjs/common';
import { Role } from '../../types/userRole.type';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
