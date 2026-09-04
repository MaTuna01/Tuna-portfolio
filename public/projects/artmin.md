# 아트민 (artmin) — 유휴공간 매칭 플랫폼

> 상권의 활성도가 시기·시간에 따라 달라 **낭비되는 공간(유휴공간)** 을, 공간을 가진 사람 · 예술가 · 일반 시민을 연결해 되살리는 서비스.

천안 유휴공간 대여 해커톤 MVP. 카페·식당·술집처럼 **원래 다른 용도로 운영되다 비는 시간**을, 취미 모임·원데이클래스 공간으로 매칭한다.

🌐 운영 중: **https://artmin.duckdns.org**

---

## 🧩 어떤 문제를 푸나

- 대학가·상권은 특정 시기(방학·종강)와 시간대에 유동인구와 매출이 급감한다. 그동안 **공간은 비어 있고 손님은 없다.**
- 반대로 **클래스를 열고 싶지만 전용 공간이 없는 예술가**, **가까운 곳에서 취미 활동에 참여하고 싶은 시민**이 있다.
- 아트민은 이 셋을 잇는다 — 비는 시간을 등록하면, 거대 LLM이 **개최하려는 활동에 필요한 조건을 자연어에서 뽑아** 알맞은 공간을 자동 추천하고, 등록된 활동에는 다른 시민이 참여 신청한다.

> **기존 공간대여 서비스와의 차이** — 스페이스클라우드 같은 서비스는 *대여 자체가 목적인 전용 공간*을 빌려준다. 아트민은 **다른 용도로 운영되다 비는 시간**만 매칭한다는 점이 핵심 차별점이다.

---

## 👥 세 집단, 세 역할

| 역할 | 하는 일 |
|---|---|
| **일반 회원 (`MEMBER`)** | 취미 모임 개설, 공개된 활동에 참여 |
| **공간 제공자 (`HOST`)** | 유휴공간·유휴 시간대 등록, 개최 요청 승인/거절 |
| **예술가 (`ARTIST`)** | 일반 회원이 하는 일 전부 + 원데이클래스 개설 |
| **관리자 (`ADMIN`)** | 관리자 콘솔에서 회원·프로그램·공간 운영·통제 |

역할은 가입 시 하나만 선택한다. 관리자는 가입으로 만들 수 없고 환경변수 시드로만 생성된다.

---

## 🔄 서비스 핵심 플로우

```
취미 모임/클래스 개설      AI 공간 매칭        개최 요청          공간 제공자 승인      활동 자동 공개        시민 참여 신청
   (일반 회원/예술가)  →   (LLM 조건 추출)  →  (제공자에게 전송)  →   (HOST)          →   (PUBLISHED)     →   (다른 회원)
```

1. **활동 개설** — 회원이 열고 싶은 취미 모임/클래스와 필요한 조건을 자연어로 입력한다.
2. **AI 공간 매칭** — LLM이 입력에서 지역·수용 인원·분야·시간 등 필요 요소를 추출하고, 조건에 맞는 유휴공간을 점수와 함께 추천한다.
3. **개최 요청 → 승인** — 회원이 추천 공간을 골라 개최 요청을 보내고, 공간 제공자가 승인/거절한다.
4. **자동 공개 & 참여** — 매칭이 확정되면 활동이 공개되고, 다른 시민이 참여를 신청한다.

---

## 🏗️ 저장소 구성 (모노레포)

| 경로 | 내용 | 상세 문서 |
|---|---|---|
| [`../../../../../../Borrow/backend`](backend/) | Spring Boot 4.1 + MySQL. 인증·CRUD·AI 매칭 전부 담당 (별도 AI 서비스 없음) | [`../../../../../../Borrow/backend/CLAUDE.md`](../../../../../../Borrow/backend/CLAUDE.md) |
| [`../../../../../../Borrow/frontend`](frontend/) | Expo SDK 54 (React Native + Expo Router). 역할별 화면을 한 앱에 통합 | [`../../../../../../Borrow/frontend/BUILD.md`](../../../../../../Borrow/frontend/BUILD.md) |
| [`../../../../../../Borrow/DEPLOYMENT.md`](../../../../../../Borrow/DEPLOYMENT.md) | CI/CD · 클라우드 배포 계획 · 런북 | — |

---

## ⚙️ 기술 스택

### 백엔드 — `../../../../../../Borrow/backend`

| 구분 | 기술 | 활용 |
|---|---|---|
| 언어/런타임 | **Java 17** | — |
| 프레임워크 | **Spring Boot 4.1** | REST API 서버 |
| 보안 | **Spring Security 7** (람다 DSL) | ID/PW 로그인, HTTP Basic, 경로별 인가 |
| 데이터 | **Spring Data JPA** + **MySQL** | 도메인 영속화 (테스트는 인메모리 H2) |
| AI | **anthropic-java** · **openai-java** | LLM 공간 매칭·활동 분석 (provider 선택) |
| 문서화 | **springdoc-openapi (Swagger UI)** | `/swagger-ui.html` API 문서 |
| 검증 | Spring Validation | 요청 DTO 검증 |
| 테스트 | JUnit 5 · Mockito · AssertJ · H2 | 엔티티·서비스·컨트롤러·인가 매트릭스 |
| 빌드 | Gradle | `compileJava` + `test`가 품질 게이트 |

### 프론트엔드 — `../../../../../../Borrow/frontend`

| 구분 | 기술 | 활용 |
|---|---|---|
| 프레임워크 | **Expo SDK 54** (React Native 0.81) | iOS·Android·Web 단일 코드베이스 |
| 언어 | **TypeScript 6** | 백엔드 DTO와 1:1 타입 |
| 라우팅 | **Expo Router 6** | 역할별 라우트 그룹 `(auth)`·`(user)`·`(provider)`·`(admin)` |
| UI | React 19 · Reanimated · Gesture Handler · Expo Image | 애니메이션·이미지·제스처 |
| 저장소 | **AsyncStorage** | HTTP Basic 자격증명 영속 (앱 재시작 시 자동 복구) |
| 웹 | **react-native-web** | 같은 코드로 웹 번들 빌드 |
| 린트 | ESLint (eslint-config-expo) | — |

### 인프라 / 배포

| 구분 | 기술 | 활용 |
|---|---|---|
| 컨테이너 | **Docker** · Docker Compose | 백엔드 이미지 + MySQL |
| 리버스 프록시 | **Caddy** | 프론트 웹 번들 + API를 **단일 오리진**으로 서빙, 자동 HTTPS |
| CI | **GitHub Actions** | 백엔드 `compileJava`+`test`, 프론트 `tsc`+`lint`+웹 빌드 |
| CD | GitHub Actions (`deploy.yml`) | `main` push마다 이미지·웹 번들 빌드 후 자동 배포 |
| 호스팅 | 가비아 클라우드 · **DuckDNS** | `artmin.duckdns.org` |
| 업로드 저장소 | **블록 볼륨** 마운트 | 업로드 이미지를 루트 디스크와 분리 |

---

## 🤖 AI 매칭 활용

거대 LLM은 두 지점에서 쓰인다 (전부 백엔드 `ai/` 도메인, 별도 마이크로서비스 없음).

- **활동 분석 (자연어 → 조건 추출)** — 개설자가 자연어로 입력한 활동 설명에서 필요한 운영 조건을 뽑아낸다.
- **공간 추천** — 추출한 조건으로 등록된 유휴공간 중 알맞은 곳을 추천한다.

**LLM provider는 교체 가능하다.** `ai.provider` 설정으로 선택한다.

| provider | 기본 모델 | 비고 |
|---|---|---|
| `anthropic` (기본) | `claude-opus-4-8` | — |
| `openai` | `gpt-4o-mini` | — |
| `gemini` | `gemini-flash-latest` | Google의 OpenAI 호환 엔드포인트 재사용, 무료 티어 가능 (운영 배포 대상) |

> 후보 1차 필터(지역·수용 인원·허용 분야·슬롯 시간 겹침)는 LLM이 아니라 JPA 쿼리 하드 필터다. **API 키가 없어도 서버는 뜨고**, 공간 추천은 규칙 기반으로 폴백한다.

---

## 🔐 인증

**ID/PW 로그인 + HTTP Basic (STATELESS).** 세션·토큰이 없다.

- 매 요청에 `Authorization: Basic base64(loginId:password)`.
- 별도 로그인 API가 없다 — `POST /api/auth/signup`으로 가입하고, `GET /api/auth/me`가 200이면 로그인 성공으로 판정한다.
- 비밀번호는 **BCrypt 해시로만** 저장한다.
- base64는 암호화가 아니므로 외부 배포에서는 **HTTPS가 필수 전제**다.

---

## 🚀 로컬 실행

### 백엔드

```bash
cd backend
docker compose up -d          # MySQL 기동 (최초 1회)
./gradlew bootRun             # → http://localhost:8080/swagger-ui.html
```

PR 전 품질 게이트 (DB 불필요, 테스트는 H2):

```bash
cd backend && ./gradlew compileJava && ./gradlew test
```

### 프론트엔드

```bash
cd frontend
npm install
npx expo start                # 폰은 LAN IP로 접속 (frontend/BUILD.md 참고)
npx tsc --noEmit              # 타입 체크
```

---

## 🌿 브랜치 전략

```
<이름>/feat/*  →  <이름>/backend  →  backend  →  dev  →  main
   (작업)         (개인 작업 공간)   (팀 공용 통합)  (통합 검증)  (릴리스)
```

모든 작업은 **이슈 발급 → 브랜치 분기 → `[#이슈번호]` 커밋 → PR** 순서로 진행한다. `backend`·`dev`·`main` 승격 머지는 팀 합의 시점에만 한다. 상세 규칙은 [`../../../../../../Borrow/backend/CLAUDE.md`](../../../../../../Borrow/backend/CLAUDE.md)의 Git 규칙 참고.

**CI가 빨간 PR은 머지하지 않는다.**

---

<sub>천안 유휴공간 대여 해커톤 MVP · 공주대학교 KKMLJH 팀</sub>
