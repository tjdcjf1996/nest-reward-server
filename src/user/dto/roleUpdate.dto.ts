import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../types/userRole.type.js';

export class RoleUpdateDto {
  @IsEmail()
  @IsNotEmpty({ message: '타겟 이메일를 입력해주세요' })
  targetEmail: string;

  @IsEnum(Role)
  @IsNotEmpty({ message: '변경할 역할을 선택해주세요.' })
  targetRole: Role;
}
