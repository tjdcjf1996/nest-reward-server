import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../types/userRole.type';
export class UpdateRoleDto {
  @IsEmail()
  @IsNotEmpty({ message: '타겟 이메일을 입력해주세요.' })
  targetEmail: string;

  @IsEnum(Role)
  @IsNotEmpty({ message: '변경할 타겟의 역할을 입력해주세요.' })
  targetRole: string;
}
