# 🎯 Nest Reward Server

> **Nest Reward Server**는 NestJS 기반의 마이크로서비스 아키텍처(MSA)로 설계된 **이벤트 및 리워드 관리 서버**입니다.
> 인증, 이벤트 실행, 보상 지급까지의 전체 흐름을 서비스 단위로 분리하여 높은 확장성과 유지보수성을 확보했으며, Docker Compose 기반 통합 배포 환경을 제공합니다.

---

## 🧱 아키텍처 구성도

![image](https://github.com/user-attachments/assets/07a7468d-96e2-44dc-b12d-38012a12805e)

* **Gateway**: 외부 요청을 수신하고 인증, 이벤트, 리워드 서비스로 라우팅
* **Auth**: 사용자 인증 및 JWT 기반 권한 관리
* **Event**: 이벤트 생성, 실행, 보상 지급, 기록 관리
* **MongoDB**: 모든 도메인의 데이터를 저장하는 중앙 DB

---

## ⚙️ 서비스 구성 및 역할
> 서비스 이름을 클릭하면 이동합니다.

### 🛡️ [Gateway](https://github.com/tjdcjf1996/nest-reward-server/tree/main/gateway)

* NestJS 기반의 API 게이트웨이
* 인증 검증 및 유저 역할 기반 라우팅 처리
* 각 마이크로서비스와의 통신 중계
* 요청/응답 로깅, 전역 에러 핸들링 포함
* 토큰 주입, 서버 토큰 헤더 자동화 등 커스텀 기능 제공

---

### 🔐 [Auth Service](https://github.com/tjdcjf1996/nest-reward-server/tree/main/auth)

* 회원가입, 로그인, 권한 변경 등 유저 관리 기능 제공
* JWT 기반 인증 및 `@AuthToken`, `@InjectToken` 데코레이터 활용
* `JwtAuthGuard`, `RoleGuard`를 통한 접근 제어
* 유저 역할(Role): `USER`, `ADMIN`, `AUDITOR`, `OPERATOR` 등 확장 가능

---

### 🎁 [Event & Reward Service](https://github.com/tjdcjf1996/nest-reward-server/tree/main/event)

* 이벤트 등록/조회/수정/삭제 및 실행
* 보상 자동 지급/수동 지급 분리 처리
* **전략 패턴 기반**으로 다양한 이벤트 로직 유연하게 확장 가능
* 지급된 보상은 Reward Record로 저장되며, 유저·관리자별로 조회 및 **xlsx 다운로드 가능**

---

## 🛠 개발 환경

- **Node.js**: v18.x
- **NestJS**: v10.x ( v11.x 도 지원하나, 의존성 설치 시 warn 표기 )
- **Package Manager**: npm
- **OS**: Linux / Windows (Docker 기반)

---

## 📦 기술 스택

![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb\&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-^7.x-880000?logo=mongoose\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-jsonwebtoken-yellowgreen?logo=jsonwebtokens\&logoColor=black)
![Passport](https://img.shields.io/badge/Passport-^0.6.0-34D058?logo=passport\&logoColor=white)
![AuthGuard](https://img.shields.io/badge/NestJS-AuthGuard-red?logo=nestjs\&logoColor=white)
![RolesGuard](https://img.shields.io/badge/NestJS-RolesGuard-orange?logo=nestjs\&logoColor=white)
![class-validator](https://img.shields.io/badge/ClassValidator-^0.14.x-blueviolet)
![ExcelJS](https://img.shields.io/badge/ExcelJS-.xlsx-yellowgreen)
![Jest](https://img.shields.io/badge/Jest-Test%20Framework-C21325?logo=jest\&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-E2E%20Testing-000000)
![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker\&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-1.29+-2496ED?logo=docker\&logoColor=white)
![nestjs/config](https://img.shields.io/badge/NestJS-ConfigModule-cc3333?logo=nestjs)

- **NestJS** – 모듈 기반 구조의 백엔드 프레임워크
- **TypeScript** – 타입 안정성과 생산성 확보
- **MongoDB + Mongoose** – 이벤트 및 리워드 데이터 저장 및 ODM 관리
- **JWT (jsonwebtoken)** – 사용자 인증 및 토큰 기반 인가 처리
- **Passport + @nestjs/passport** – 인증 전략 처리 및 JWT 연동
- **AuthGuard / RolesGuard** – NestJS Guard를 활용한 인증 및 역할 기반 접근 제어
- **class-validator** – DTO 기반 입력 유효성 검사
- **ExcelJS** – 리워드 기록 Excel(xlsx) 파일 생성 및 다운로드
- **Supertest + Jest** – E2E 통합 테스트 프레임워크
- **Docker & Docker Compose** – 컨테이너 기반 통합 실행 및 배포 환경
- **@nestjs/config** – 환경변수 관리 및 설정 유효성 검증

---

## 🚀 빠른 시작 (Docker Compose 기반)

### 1. 환경 변수 설정

```env
MONGO_USER="root"
MONGO_PASS="your_passward"
GATEWAY_PORT=8210
AUTH_PORT=1234
EVENT_PORT=2345
```

> `.env` 파일은 프로젝트 루트에 위치하며, 본인에 맞는 값을 적으면 됩니다.
> 각 서비스 폴더에 `.env` 파일 생성이 필요하며, 각 서비스 폴더 내 readMe에 기재되어 있습니다.
> `./env`,`gateway/.env`,`auth/.env`,`event/.env` 필요

### 2. 전체 서비스 실행

```bash
docker-compose up --build
```

* 모든 서비스가 자동 빌드 및 실행됩니다
* 변경된 서비스만 재빌드되므로 효율적인 개발 가능

---

## 🌐 서비스 접속 정보

| 서비스        | 접근 URL                    | 비고                     |
| ---------- | ------------------------- | ---------------------- |
| Gateway    | `http://localhost:{PORT}` | 모든 API는 Gateway를 통해 접근 |
| Auth/Event | 직접 접근 불가                  | 내부 서비스로만 호출됨           |
| MongoDB    | `localhost:27017`         | Docker 내에서 공유됨         |

---

## 🧪 테스트
![테스트 결과](https://github.com/user-attachments/assets/d9447637-883a-4900-9bbc-cbacb71f7df0)

- Gateway 서비스 디렉토리 내 test 폴더를 통해 end-to-end 테스트 가능 
- 각 서비스별로 통합 테스트 코드 포함

---

## 📁 폴더 구조

```plaintext
nest-reward-server/
├── gateway/              # API Gateway
├── auth/                 # 인증 서비스
├── event/                # 이벤트 및 보상 서비스
├── docker-compose.yml
├── .env                  # 공통 환경 변수
└── README.md
```

> 각 서비스는 NestJS 기반으로 설계되었으며, 독립된 실행 및 테스트가 가능합니다.
> 독립 실행 시 각 서비스 `src/auth` 폴더 내 `jwt.strategy.ts` 파일 내 validate 부분을 비활성화 하십시오.

---

## 📚 참고 자료

* [NestJS 공식 문서](https://docs.nestjs.com/)
* [Docker 공식 문서](https://docs.docker.com/)
* [MongoDB 공식 문서](https://www.mongodb.com/docs/)
