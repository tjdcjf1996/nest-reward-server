import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RoleUpdateDto {
  @IsEmail()
  @IsNotEmpty({ message: '타겟 이메일를 입력해주세요' })
  targetEmail: string;

  @IsString()
  @IsNotEmpty({ message: '변경할 역할을 선택해주세요.' })
  targetRole: string;
}
