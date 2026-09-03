<div align="center">

# 👔 ClosetBuddy

### 대규모 트래픽을 고려한 MSA 기반 의류 이커머스 플랫폼

<br/>

**비동기 이벤트 기반 Saga 패턴** · **Redis 캐싱 & 분산락** · **Elasticsearch 한국어 검색** · **AI 상품 추천**

<br/>

<img src="https://img.shields.io/badge/Java_17-007396?style=for-the-badge&logo=OpenJDK&logoColor=white">
<img src="https://img.shields.io/badge/Spring_Boot_3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/Spring_Cloud_2025.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
<img src="https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white">
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
<img src="https://img.shields.io/badge/MySQL_8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">

</div>

---

## 📖 프로젝트 소개

**ClosetBuddy**는 대규모 트래픽 환경을 가정하고 설계한 **의류 이커머스 플랫폼**입니다.

단순한 CRUD 애플리케이션을 넘어, **마이크로서비스 아키텍처(MSA)**, **Apache Kafka 기반 비동기 이벤트 통신**, **Redis 캐싱 및 Redisson 분산락**, **Elasticsearch 한국어 전문 검색** 등 실무에서 대규모 트래픽을 처리하기 위해 적용하는 핵심 기술들을 직접 구현하였습니다.

### 핵심 목표

| 목표 | 접근 방식 |
|------|----------|
| **높은 동시성 처리** | Redisson 분산락으로 재고 동시성 제어, 데드락 방지를 위한 순서 기반 락 획득 |
| **서비스 간 느슨한 결합** | Apache Kafka를 통한 비동기 이벤트 기반 통신, Saga 패턴으로 분산 트랜잭션 관리 |
| **응답 속도 최적화** | Redis 다중 인스턴스 캐싱 (상품/장바구니), `@Cacheable` 기반 캐시 전략 |
| **검색 성능 확보** | Elasticsearch + Nori 분석기로 한국어 형태소 분석, 자동완성, 오타 허용 검색 |
| **독립적 배포 & 확장** | 서비스별 독립 DB, Docker 컨테이너화, K3s 기반 Kubernetes 오케스트레이션 |

---

## 🏛 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              Client (Browser)                                   │
│                           React 19 + Vite + Nginx                               │
└──────────────────────────────────┬──────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     API Gateway (Spring Cloud Gateway)                           │
│                          :8090  |  lb:// 로드 밸런싱                              │
└────────┬──────────┬──────────┬──────────┬───────────────────────────────────────┘
         │          │          │          │
         ▼          ▼          ▼          ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
   │  user    │ │  main    │ │  order   │ │  pay     │
   │  service │ │  service │ │  service │ │  service │
   │  :8085   │ │  :8082   │ │  :8087   │ │  :8088   │
   ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤
   │• Auth    │ │• Catalog │ │• Order   │ │• Payment │
   │• JWT     │ │• Product │ │• Cart    │ │• Account │
   │• OAuth2  │ │• Search  │ │• AI추천  │ │• 정산    │
   │• Member  │ │• Stock   │ │  (Kafka) │ │• Batch   │
   └──────────┘ └──────────┘ └──────────┘ └──────────┘
         │          │          │          │
         └──────────┴──────┬───┴──────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
   ┌───────────┐    ┌───────────┐    ┌───────────────┐
   │  MySQL    │    │ Redis ×2  │    │ Elasticsearch │
   │  8.0      │    │ Cache     │    │ + Nori        │
   │ (DB/svc)  │    │ + Lock    │    │ (검색엔진)     │
   └───────────┘    └───────────┘    └───────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
       ┌───────────┐ ┌──────────┐ ┌──────────────┐
       │  Kafka    │ │ Eureka   │ │ Prometheus   │
       │ (Saga)    │ │ Discovery│ │ + Grafana    │
       └───────────┘ └──────────┘ └──────────────┘
```

---

## 🔑 핵심 기술 전략

### 1. Kafka 기반 Saga 패턴 — 분산 트랜잭션 관리

주문 처리 시 **재고 차감 → 결제**의 멀티 서비스 트랜잭션을 **Choreography 방식의 Saga 패턴**으로 구현하였습니다. 각 단계의 실패 시 **보상 트랜잭션(Compensating Transaction)**을 통해 데이터의 최종 일관성(Eventual Consistency)을 보장합니다.

```
                         성공
order-service ─────────────────────> main-service (재고)
  │  ① order.stock-check.request         │
  │                                      │ ② order.stock-check.result
  │ <────────────────────────────────────┘
  │
  │  ③ order.payment.request
  │  ───────────────────────────────> pay-service
  │                                      │ ④ order.payment.result
  │ <────────────────────────────────────┘
  │
  │  [실패 시 보상 트랜잭션]
  │  ⑤ order.stock.rollback ─────> main-service
  │  ⑥ order.payment.rollback ───> pay-service
```

| Kafka Topic | Producer | Consumer | 설명 |
|-------------|----------|----------|------|
| `order.stock-check.request` | order-service | main-service | 재고 차감 요청 |
| `order.stock-check.result` | main-service | order-service | 재고 차감 결과 |
| `order.payment.request` | order-service | pay-service | 결제 요청 |
| `order.payment.result` | pay-service | order-service | 결제 결과 |
| `order.stock.rollback` | order-service | main-service | 재고 복구 (보상) |
| `order.payment.rollback` | order-service | pay-service | 결제 복구 (보상) |
| `recommend.result` | AI 서비스 | order-service | AI 추천 결과 수신 |

> 📦 **이벤트 계약 관리**: `common-event`, `recommend-event` 공통 라이브러리를 GitHub Packages로 배포하여 서비스 간 Kafka 이벤트 DTO를 버전 관리합니다.

---

### 2. Redis 캐싱 & Redisson 분산락 — 동시성 제어

#### 📌 캐싱 전략

서비스별로 Redis 인스턴스를 분리하여 캐시 부하를 분산하고, 독립적인 장애 격리를 보장합니다.

| Redis 인스턴스 | 포트 | 서비스 | 용도 |
|---------------|------|--------|------|
| `closetBuddy-redis` | 6379 | main-service | 상품 조회 캐싱, 분산락 |
| `closetBuddy-order-redis` | 6380 | order-service | 장바구니 캐싱, AI 추천 결과 캐싱 |

- **상품 조회**: `@Cacheable`을 활용한 Look-Aside 캐싱으로 DB 부하를 최소화
- **캐시 무효화**: 상품 등록/수정 시 `@CacheEvict`로 관련 캐시를 즉시 무효화

#### 📌 분산락 (Redisson)

다수의 서버 인스턴스가 동시에 재고를 차감하는 상황에서 **데이터 정합성**을 보장합니다.

```java
// 핵심 설계 포인트
1. 데드락 방지: productId 오름차순 정렬 후 순서대로 락 획득
2. 타임아웃: WAIT_TIME=5초 대기, LEASE_TIME=3초 후 자동 해제
3. 보상 처리: 결제 실패 시 restoreStock()으로 재고 복구 (Saga 패턴 연계)
```

---

### 3. Elasticsearch — 고성능 한국어 검색

MySQL의 LIKE 쿼리 한계를 극복하기 위해 Elasticsearch를 도입하였습니다.

| 기능 | 기술 | 설명 |
|------|------|------|
| **한국어 형태소 분석** | Nori Analyzer | "겨울코트" → "겨울" + "코트" 분리 검색 |
| **자동완성** | Edge N-gram + bool_prefix | 부분 문자열 입력 시 실시간 상품 제안 |
| **오타 허용 검색** | Fuzziness AUTO | "니트" → "니드" 입력에도 검색 가능 |
| **동의어 검색** | Synonym Analyzer | "아우터" ↔ "외투" 동의어 매핑 |
| **카테고리 부스팅** | Field Boosting | 카테고리 일치 시 `^5` 가중치로 상위 노출 |

---

## 🧩 마이크로서비스 구성

### 서비스 목록

| 서비스 | 포트 | 역할 | 주요 기술 |
|--------|------|------|----------|
| **discovery-service** | 8761 | Eureka 서버 (서비스 레지스트리) | Spring Cloud Netflix Eureka |
| **gateway-service** | 8090 | API Gateway, 라우팅, Swagger 통합 | Spring Cloud Gateway, lb:// |
| **main-service** | 8082 | 상품/판매자/상점 카탈로그, 검색, 재고 관리 | Elasticsearch, Redis, Redisson, Kafka |
| **user-service** | 8085 | 인증/인가, 회원 관리 | Spring Security, JWT, OAuth2 (Google) |
| **order-service** | 8087 | 주문, 장바구니, AI 상품 추천 | Kafka (Saga), Redis, OpenFeign |
| **pay-service** | 8088 | 결제, 예치금, 정산 배치 | Kafka, Spring Batch |

### 공통 라이브러리

| 모듈 | 역할 |
|------|------|
| **common-event** | 주문/재고/결제 Kafka 이벤트 DTO (Java `record`) |
| **recommend-event** | AI 추천 서비스 Kafka 이벤트 계약 |

---

## 🗄 서비스별 데이터베이스 격리

MSA의 **Database per Service** 원칙에 따라 각 서비스가 독립된 데이터베이스를 사용합니다.

| 서비스 | 데이터베이스 | 주요 엔티티 |
|--------|------------|------------|
| main-service | `closetBuddy` | Product, Store, Seller, Category |
| user-service | `closetBuddy_db_user` | Member, RefreshToken |
| order-service | `closetBuddy_db_order` | Order, OrderItem, Cart, CartItem |
| pay-service | `closetBuddy_db_pay` | Account, AccountHistory, Payment, SettlementRawData, SettlementDetail |

---

## 🔐 인증 & 보안

- **JWT (JJWT 0.13.0)**: Stateless 인증, Access Token (1h) + Refresh Token (14d)
- **Spring Security**: 역할 기반 접근 제어 (GUEST / MEMBER / SELLER)
- **OAuth2 (Google)**: 소셜 로그인, Gateway를 통한 OAuth2 플로우 라우팅
- **필터 체인**: `JwtExceptionFilter → JwtAuthenticationFilter → UsernamePasswordAuthenticationFilter`

| 역할 | 권한 |
|------|------|
| `GUEST` | 상품 조회 |
| `MEMBER` | 주문, 장바구니, 결제, 회원 정보 관리 |
| `SELLER` | 판매자/상점/상품 등록 및 관리 |

---

## ⏰ 정산 배치 (Spring Batch)

**pay-service**에서 매월 10일 자동으로 판매자 정산을 수행합니다.

- **처리 방식**: `JpaPagingItemReader` → Chunk 단위 (100건) 처리 → OOM 방지
- **수수료 계산**: 결제 완료건에 대해 수수료율 3.0% 적용
- **안정성**: `faultTolerant()` + `skipLimit(10)`으로 오류 발생 시에도 배치 중단 방지

---

## 🤖 AI 상품 추천

**Python(FastAPI) 기반의 독립 AI 서비스**가 Kafka를 통해 order-service와 비동기 통신합니다.

```
order-service → (Kafka: recommend.request) → AI Service (FastAPI + ChromaDB)
                                                        │
order-service ← (Kafka: recommend.result)  ←────────────┘
                      │
                      ▼
                Redis에 추천 결과 캐싱
```

---

## 📊 모니터링

| 도구 | 포트 | 역할 |
|------|------|------|
| **Spring Actuator** | 각 서비스 | 메트릭 엔드포인트 (`/actuator/prometheus`) |
| **Prometheus** | 9090 | 메트릭 수집 및 저장 |
| **Grafana** | 3000 | 대시보드 시각화 |

---

## 🛠 기술 스택 요약

### Backend

| 분류 | 기술 |
|------|------|
| **Language & Framework** | Java 17, Spring Boot 3.5, Spring Cloud 2025.0 |
| **MSA Infrastructure** | Eureka, Spring Cloud Gateway, OpenFeign |
| **Database** | MySQL 8.0, Spring Data JPA / Hibernate |
| **Cache & Lock** | Redis, Redisson (분산락) |
| **Messaging** | Apache Kafka (Saga 패턴, AI 추천) |
| **Search** | Elasticsearch (Nori 분석기, Edge N-gram) |
| **Security** | Spring Security, JWT (JJWT), OAuth2 (Google) |
| **Batch** | Spring Batch |
| **Monitoring** | Actuator, Prometheus, Grafana |
| **API Docs** | SpringDoc OpenAPI (Swagger) |
| **Testing** | JUnit 5, Testcontainers (MySQL, Kafka, ES) |

### Frontend

| 분류 | 기술 |
|------|------|
| **Core** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS, Radix UI, Lucide Icons |
| **State** | Zustand, TanStack Query, Axios |
| **Payment** | Toss Payments |

### AI Service

| 분류 | 기술 |
|------|------|
| **Framework** | Python, FastAPI |
| **Vector DB** | ChromaDB |
| **Messaging** | Apache Kafka |

### DevOps & Infra

| 분류 | 기술 |
|------|------|
| **Containerization** | Docker, Docker Compose |
| **Orchestration** | Kubernetes (K3s) |
| **CI/CD** | GitHub Actions |
| **Package Registry** | GitHub Packages (Maven) |
| **Cloud** | AWS |

### Collaboration

<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">

---

## 🚀 로컬 실행 방법

### 사전 요구사항

- Java 17+
- Docker & Docker Compose
- Node.js 18+

### 1. 인프라 실행 (Docker Compose)

```bash
docker-compose up -d
# MySQL (3308), Redis (6379, 6380), Kafka (9092),
# Elasticsearch (9200), Prometheus (9090), Grafana (3000)
```

### 2. 서비스 실행 (순서 중요)

```bash
# 1) Service Discovery
cd discovery-service && ./gradlew bootRun

# 2) Gateway
cd gateway-service && ./gradlew bootRun

# 3) 비즈니스 서비스 (순서 무관)
cd main-service && ./gradlew bootRun
cd user-service && ./gradlew bootRun
cd order-service && ./gradlew bootRun
cd pay-service && ./gradlew bootRun
```

### 3. API 문서 확인

```
http://localhost:8090/v3/swagger-ui.html
```
> Gateway의 통합 Swagger UI에서 모든 마이크로서비스의 API를 확인할 수 있습니다.

---

## 🏗 CI/CD 파이프라인

```
Push/PR → GitHub Actions CI (Build & Test)
                    │
                    ▼
          GitHub Actions CD (Release)
                    │
         ┌──────────┼──────────┐
         ▼          ▼          ▼
      Tagging   Docker Build  K8s Deploy
   (자동 버전)  (Docker Hub)   (K3s 클러스터)
```

- **CI**: 서비스별 독립 빌드/테스트 워크플로우
- **CD**: 자동 버전 태깅 → Docker 이미지 빌드/푸시 → K8s 배포
- **라이브러리 배포**: `common-event`, `recommend-event` 변경 시 GitHub Packages 자동 퍼블리싱

---

## 📁 프로젝트 구조

```
ClosetBuddy/
├── ClsoetBuddy-MSA/           # 백엔드 (본 레포지토리)
│   ├── discovery-service/     # Eureka 서버
│   ├── gateway-service/       # API Gateway
│   ├── main-service/          # 카탈로그·검색·재고
│   ├── user-service/          # 인증·회원관리
│   ├── order-service/         # 주문·장바구니·추천
│   ├── pay-service/           # 결제·정산
│   ├── common-event/          # Kafka 이벤트 공통 DTO
│   ├── recommend-event/       # AI 추천 이벤트 계약
│   └── docs/                  # 기술 문서
├── beadv3_3_CodeBuddy_FE/     # 프론트엔드 (React)
└── beadv3_3_CodeBuddy_AI/     # AI 추천 서비스 (FastAPI)
```

---

<div align="center">

**ClosetBuddy** — *대규모 트래픽에 대응하는 MSA 이커머스 플랫폼*

</div>