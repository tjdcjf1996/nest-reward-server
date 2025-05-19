# 🎁 Nest Reward Event Server

> **Nest Reward Event**는 NestJS와 MongoDB 기반의 **이벤트 및 리워드 관리 서버**입니다.
> 출석체크, 미션, 랭킹 등 다양한 이벤트 조건에 따라 유저에게 보상을 자동 또는 수동으로 지급하고, 그 결과를 기록 및 관리할 수 있도록 설계되었습니다.

---

## 📌 주요 기능

* 🗂️ **이벤트 관리**

  * 출석체크, 미션, 랭킹 등 다양한 유형의 이벤트 등록/수정/삭제 지원
  * 이벤트별 지급 방식 설정 (`autoExecute`: 자동/수동)
  * **Strategy 패턴 기반 이벤트 처리 구조**
    → 새로운 이벤트 타입 추가 시 `EventType` enum 및 대응 전략 클래스만 구현하면 확장 가능
  * `contents` 필드로 각 이벤트의 조건·파라미터를 유연하게 설정
    
* 🎁 **리워드 지급 및 기록**

  * 이벤트 조건 충족 시 리워드 자동/수동 지급
  * **중복 지급 방지** 및 **지급 기준 검증**
  * 지급 이력을 `RewardRecord`에 저장

* 👤 **유저/어드민별 기록 조회**

  * 유저별 개인 리워드 조회 API
  * 어드민 및 감사자용 전체 리워드 기록 열람 기능
  * **엑셀(Excel) 파일로 다운로드 가능**

* 🔐 **권한 기반 접근 제어**

  * `User`, `Admin`, `Operator`, `Auditor` 등의 역할별로 API 접근 제한

---
## 🧩 확장성 설계 포인트

* 이벤트 타입은 `EventType` enum 및 새로운 전략 클래스만 추가하면 간편히 확장 가능
* 이벤트 조건별 로직은 `contents` 필드를 통해 자유롭게 정의 가능
* 각 모듈은 책임 단위로 분리되어 있어 **MSA 환경에서도 유연하게 전환 가능**

---

## 🧬 프로젝트 구조

```
src/
  ├── event/             # 이벤트 등록/수정/삭제/조회
  ├── reward/            # 리워드 조건 정의 및 전략
  ├── reward-execute/    # 리워드 지급 처리 로직
  ├── reward-record/     # 지급 이력 저장 및 조회
  ├── auth/              # 인증/인가 및 권한 가드
  ├── utils/             # 엑셀 등 유틸리티 함수
  └── types/             # 공용 enum 및 타입 정의
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

### 📚 이벤트 관련 API 

| 이름               | 메서드 | 경로               | 인증 필요 |
|--------------------|--------|--------------------|------------|
| 이벤트 추가         | POST   | /event             | ✅         |
| 이벤트 조회 (유저)  | GET    | /event             | ✅         |
| 이벤트 조회 (어드민, 삭제 포함) | GET    | /event/all         | ✅         |
| 이벤트 상세조회      | GET    | /event/:id         | ✅         |
| 이벤트 수정         | PATCH  | /event/:id         | ✅         |
| 이벤트 삭제         | DELETE | /event/:id         | ✅         |
| 이벤트 참여         | POST   | /event-execute     | ✅         |

---

### 🎁 리워드 관련 API

| 이름               | 메서드 | 경로                     | 인증 필요 |
|--------------------|--------|--------------------------|------------|
| 보상 추가           | POST   | /reward                  | ✅         |
| 보상 조회           | GET    | /reward                  | ✅         |
| 보상 조회 (삭제 포함) | GET    | /reward/all              | ✅         |
| 보상 상세조회        | GET    | /reward/:id              | ✅         |
| 보상 수정           | PATCH  | /reward/:id              | ✅         |
| 보상 삭제           | DELETE | /reward/:id              | ✅         |
| 보상 지급 요청       | POST   | /reward-execute          | ✅         |
| 수동 보상 지급 (어드민) | POST   | /reward-execute/pending  | ✅         |

---

### 📑 리워드 기록 관련 API

| 이름                             | 메서드 | 경로                                | 인증 필요 |
|----------------------------------|--------|-------------------------------------|------------|
| 내 보상 기록 조회                  | GET    | /reward-record                     | ✅         |
| 감사자용 전체 보상 내역 확인         | GET    | /reward-record/all/auditor         | ✅         |
| 감사자용 보상 내역 엑셀 다운로드     | GET    | /reward-record/download/auditor    | ✅         |
| 어드민용 전체 보상 내역 확인         | GET    | /reward-record/all/admin           | ✅         |
| 어드민용 보상 내역 엑셀 다운로드     | GET    | /reward-record/download/admin      | ✅         |
| 어드민용 펜딩 상태 조회             | GET    | /reward-record/pending             | ✅         |
| 어드민용 펜딩 내역 엑셀 다운로드     | GET    | /reward-record/pending/download    | ✅         |


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
docker build -t nest-reward-event .
docker run -p <PORT>:<PORT> --env-file .env nest-reward-event
```

> `.env` 경로 및 포트는 필요 시 자유롭게 커스터마이징 가능합니다.

---

* 🔄 **Docker 환경에서 MongoDB 연결 문제**

  * 도커 컴포즈를 사용하는 경우, `MONGO_HOST`는 컨테이너 서비스명( 도커 컴포즈 기준 mongo ) 사용
  * 단독 실행 시: `host.docker.internal` 또는 실제 IP 사용

---

