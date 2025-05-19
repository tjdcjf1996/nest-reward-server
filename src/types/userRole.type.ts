// user - 보상 요청 가능 / operator - 이벤트,보상 등록 / auditor - 보상 이력 조회만 가능 / admin - 모든 권한

export enum Role {
  User = 'user',
  Operator = 'operator',
  Auditor = 'auditor',
  Admin = 'admin',
}
