# 🔒 Nest Reward Auth

> **Nest Reward Auth**는 NestJS를 기반으로 한 통합 인증 마이크로서비스로, 사용자 인증, 관리, 역할 기반 접근 제어를 포괄적으로 지원합니다.
> MongoDB와 Mongoose를 활용한 데이터베이스 연동부터 JWT 기반의 인증 메커니즘, 서버 간 토큰 검증을 수행하여 안전한 통신이 가능합니다.

---

## 📌 주요 기능

* 🔐 **JWT 인증** – Passport 전략 기반의 안전한 인증 시스템 구현
* 👥 **역할 기반 접근 제어** – `Role` Enum을 통한 권한 분리 및 관리
* 🧾 **사용자 관리 API** – 회원가입, 로그인, 탈퇴 등 핵심 유저 기능 제공
* 🧬 **MongoDB 연동** – Mongoose ODM을 통한 유저 데이터 저장 및 관리
* ⚙️ **환경별 설정 지원** – `.env` 및 `@nestjs/config` 기반 설정 분리
* 🛡️ **서버 간 인증 강화** – `msa-server-token` 헤더 기반 추가 보안 처리

---

## 📁 프로젝트 구조

```
src/
  ├── auth/         # 인증 전략, 가드, JWT 처리 로직
  ├── user/         # 유저 컨트롤러, 서비스, DTO
  ├── config/       # 환경변수 및 MongoDB 설정
  ├── main.ts       # 애플리케이션 엔트리포인트
  └── app.module.ts # 루트 모듈 정의
```

---

## ⚙️ 환경 변수 설정 예시

```env
MONGO_USER=root
MONGO_PASS=password
MONGO_DB=auth
MONGO_HOST=mongo
MONGO_PORT=27017
PORT=1234
JWT_SECRET_KEY=jwt_secret_key_input
```

> `.env` 파일은 프로젝트 루트에 위치하며, 본인에 맞는 값을 적으면 됩니다.

---

## 📚 API 명세
> 기본적으로 게이트웨이 서버에서 발급하는 서버 토큰이 있어야 통신이 가능합니다.

| 이름                  | 메서드 | 경로                | 인증 필요 |
|-----------------------|--------|---------------------|------------|
| 회원가입              | POST   | /user/register      | ❌         |
| 로그인                | POST   | /user/login         | ❌         |
| 역할수정              | PATCH  | /user/role          | ✅         |
| 관리자 권한 습득 (최초) | PATCH  | /user/role/admin    | ✅        |
| 아이디 삭제           | DELETE | /user               | ✅         |


---

## 🧪 실행 방법

### 1. 로컬 환경

```bash
npm install
npm run build
npm run start:prod
```

### 2. Docker 실행

```bash
docker build -t nest-reward-auth .
docker run -p <PORT>:<PORT> --env-file .env nest-reward-auth
```

> `.env` 경로 및 포트는 필요 시 자유롭게 커스터마이징 가능합니다.

---

* 🔄 **Docker 환경에서 MongoDB 연결 문제**

  * 도커 컴포즈를 사용하는 경우, `MONGO_HOST`는 컨테이너 서비스명( 도커 컴포즈 기준 mongo ) 사용
  * 단독 실행 시: `host.docker.internal` 또는 실제 IP 사용

---
