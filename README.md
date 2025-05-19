# 🚪 Nest Reward Gateway

> **Nest Reward Gateway**는 마이크로서비스 환경에서 유저, 이벤트, 리워드 시스템을 연결하고 인증/이벤트 관련 요청을 통합 관리하는 **NestJS 기반 게이트웨이 서버**입니다.
> 인증 및 권한 처리, 유저 관리, 이벤트 실행, 보상 지급, 기록 조회 등 다양한 리워드 기능을 RESTful API 형태로 제공합니다.

---

## 📌 주요 기능

### 🔐 인증 (Auth)

* JWT 기반 인증 및 Passport 전략 적용
* `@AuthToken`, `@InjectToken` 등 커스텀 데코레이터로 토큰 추출 자동화
* `JwtAuthGuard`를 활용한 라우팅 보호 및 권한 체크
* `@Public()` 데코레이터로 인증 예외 엔드포인트 관리

---

### 👥 유저 (User)

* 회원가입, 로그인, 권한 변경, 어드민 권한 부여 등 유저 전반 기능 제공
* `Role` Enum 기반의 **역할 기반 접근 제어**
* DTO + class-validator를 통한 타입 안정성 및 유효성 검사

---

### 🧩 이벤트 (Event)

* 이벤트 생성, 조회, 수정, 삭제 및 실행 기능 제공
* `POST /event/execute`를 통해 이벤트 실행 시 외부 이벤트 서버와 연동
* 이벤트 조건, 유형 등 유연한 설정 가능

---

### 🎁 리워드 (Reward)

* 리워드 등록, 조회, 수정, 삭제, 지급 요청
* 자동/수동 지급 이벤트 대응
* 수동 보상 요청은 어드민 전용 API(`/reward/execute/pending`)로 처리
* 지급 요청 시 외부 시스템 연동 가능 ( 현재는 인벤토리 서버 미구현으로 콘솔 처리 )

---

### 📑 리워드 기록 (Reward Record)

* 내 보상 이력, 어드민 및 감사자 전용 조회 API 제공
* 보상 기록은 **Excel 다운로드 기능 포함**
* `Pending` 상태 리워드 필터링 및 전용 관리 API 제공

---

## 🧬 추가 기능

* **DTO 기반 유효성 검증**: 모든 입력은 `class-validator` 기반 DTO로 처리
* **Custom Decorator**: 토큰 추출, 헤더 자동 변환 등 공통 로직을 데코레이터로 추상화
* **HttpClientService**: 이벤트 서버 등 외부 API 연동을 중앙 집중화

---

## 🎯 테스트

| 종류          | 설명                                |
| ----------- | --------------------------------- |
|             | 실제 API 호출 기반 통합 테스트 (`supertest`) |
|**E2E 테스트**| 로그인 후 발급된 토큰을 활용해 연속 시나리오 테스트 가능  |
|             | 테스트 데이터 자동 생성/정리 로직 포함            |

> 테스트 코드는 루트 디렉토리 test 폴더에 위치합니다.

---

## 🗂️ 프로젝트 구조

```bash
nest-reward-gateway/
├── src/
│   ├── app.module.ts               # 루트 모듈
│   ├── main.ts                     # 애플리케이션 엔트리포인트
│   ├── auth/                       # 인증 (JWT 전략, Guard, 커스텀 데코레이터 등)
│   ├── config/                     # 환경 설정 및 validation schema
│   ├── event/                      # 이벤트 도메인 (컨트롤러, 서비스, DTO 등)
│   ├── reward/                     # 리워드 도메인
│   ├── reward-record/              # 리워드 지급 기록 모듈
│   ├── user/                       # 유저 도메인 (회원가입, 로그인, 권한 등)
│   └── utils/
│       ├── decorator/              # 공통 커스텀 데코레이터 모음
│       ├── httpClient/             # 외부 API 연동용 HttpClientService
│       └── util/                   # 범용 유틸 함수 모음
│
├── test/
│   ├── event/
│   │   ├── event-create.e2e-spec.ts
│   │   ├── event-modify.e2e-spec.ts
│   │   └── event-execute.e2e-spec.ts
│   ├── reward/
│   │   └── reward.e2e-spec.ts
│   ├── user/
│   │   ├── user-create.e2e-spec.ts
│   │   ├── user-role.e2e-spec.ts
│   │   └── ...
│   └── util/
│       └── login.util.ts           # 테스트용 로그인 유틸리티 등
│
├── package.json
├── tsconfig.json
├── .env
└── README.md
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

## 🔐 인증(Auth) / 유저(User) 관련 API

| 이름                | 메서드 | 경로                | 인증 필요 |
|---------------------|--------|---------------------|------------|
| 회원가입             | POST   | /user/register       | ✅         |
| 로그인               | POST   | /user/login          | ✅         |
| 회원 탈퇴            | DELETE | /user                | ✅         |
| 권한 변경            | PATCH  | /user/role           | ✅         |
| 어드민 권한 습득      | PATCH  | /user/role/admin     | ✅         |

---

## 🧩 이벤트 관련 API

| 이름                        | 메서드 | 경로              | 인증 필요 |
|-----------------------------|--------|-------------------|------------|
| 이벤트 추가                  | POST   | /event            | ✅         |
| 이벤트 조회 (유저용)         | GET    | /event            | ✅         |
| 이벤트 조회 (삭제 포함)      | GET    | /event/all        | ✅         |
| 이벤트 상세 조회             | GET    | /event/:id        | ✅         |
| 이벤트 수정 (어드민 이상)     | PATCH  | /event/:id        | ✅         |
| 이벤트 삭제 (어드민 이상)     | DELETE | /event/:id        | ✅         |
| 이벤트 참여 (실행)           | POST   | /event/execute    | ✅         |

---

## 🎁 리워드 관련 API

| 이름                              | 메서드 | 경로                         | 인증 필요 |
|-----------------------------------|--------|------------------------------|------------|
| 보상 추가                         | POST   | /reward                      | ✅         |
| 보상 조회                         | GET    | /reward                      | ✅         |
| 보상 조회 (삭제 포함)             | GET    | /reward/all                  | ✅         |
| 보상 상세 조회                    | GET    | /reward/:id                  | ✅         |
| 보상 수정                         | PATCH  | /reward/:id                  | ✅         |
| 보상 삭제                         | DELETE | /reward/:id                  | ✅         |
| 보상 지급 요청 (자동/유저 요청)   | POST   | /reward/execute              | ✅         |
| 보상 수동 지급 요청 (어드민 전용) | POST   | /reward/execute/pending      | ✅         |

---

## 📑 리워드 기록 관련 API

| 이름                               | 메서드 | 경로                                   | 인증 필요 |
|------------------------------------|--------|----------------------------------------|------------|
| 내 보상 기록 조회                   | GET    | /reward-record                         | ✅         |
| 감사자 보상 기록 전체 조회          | GET    | /reward-record/all/auditor             | ✅         |
| 감사자 보상 기록 엑셀 다운로드      | GET    | /reward-record/download/auditor        | ✅         |
| 어드민 보상 기록 전체 조회          | GET    | /reward-record/all/admin               | ✅         |
| 어드민 보상 기록 엑셀 다운로드      | GET    | /reward-record/download/admin          | ✅         |
| 어드민 보상 펜딩 상태 조회          | GET    | /reward-record/pending                 | ✅         |
| 어드민 보상 펜딩 엑셀 다운로드      | GET    | /reward-record/pending/download        | ✅         |

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
docker build -t nest-reward-gateway .
docker run -p <PORT>:<PORT> --env-file .env nest-reward-gateway
```

> `.env` 경로 및 포트는 필요 시 자유롭게 커스터마이징 가능합니다.

---

* 🔄 **Docker 환경에서 MongoDB 연결 문제**

  * 도커 컴포즈를 사용하는 경우, `MONGO_HOST`는 컨테이너 서비스명( 도커 컴포즈 기준 mongo ) 사용
  * 단독 실행 시: `host.docker.internal` 또는 실제 IP 사용

---

