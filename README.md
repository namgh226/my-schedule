# 📅 내근무달력 - 설치 및 사용 안내

> 💡 **이 파일(README.md) 보는 방법**: 메모장으로 열어도 내용은 다 보이지만
> `#`, `**` 같은 기호가 그대로 보여서 조금 불편할 수 있어요.
> 가장 편한 방법은 **아래 "🌐 1단계: Github에 올리기"를 먼저 진행**해서
> Github 저장소 화면에서 이 README를 예쁘게 렌더링된 상태로 보는 것입니다.
> (VS Code나 Typora 같은 마크다운 뷰어로 로컬에서 봐도 됩니다)

개인 근무 스케줄을 실시간으로 기록하고 동기화할 수 있는 웹앱입니다.
스마트폰에 설치하면 앱처럼 사용할 수 있습니다(PWA).

---

## 📦 받으신 파일 구성

| 파일명 | 설명 |
|---|---|
| `index.html` | 앱 메인 화면 (수정 불필요) |
| `config.example.js` | 개인 설정 템플릿 (복사해서 사용) |
| `manifest.json` | 앱 아이콘/이름 설정 (수정 불필요) |
| `sw.js` | 오프라인 캐싱 설정 (수정 불필요) |
| `icon-192.png`, `icon-512.png` | 앱 아이콘 이미지 |

---

## 🌐 1단계: Github에 올리기 (호스팅)

가장 먼저 할 일입니다. 이 단계를 진행하면 이후부터는 Github 저장소
화면에서 이 README를 예쁘게 보면서 나머지 설정을 따라할 수 있습니다.

**준비물**: Github 계정 (무료 가입: https://github.com)

### ① 저장소(Repository) 만들기

1. Github 로그인 → 우측 상단 **"+"** → **"New repository"** 클릭
2. Repository name에 **`my-schedule`** 입력 (아래 "경로 주의사항" 참고)
3. **Public**(공개) 선택 → **Create repository** 클릭

> ⚠️ Public으로 만들면 저장소 내용이 전체 공개됩니다. 그래서 이 단계에서는
> **`config.js`를 아직 올리지 않고, `config.example.js`만 올립니다.**
> `config.js`는 나중에 4단계에서 내용을 다 채운 뒤 마지막에 업로드합니다.

### ② 파일 업로드 (config.js 제외)

1. 저장소 화면에서 **"uploading an existing file"** 클릭
2. `README.md`, `index.html`, `config.example.js`, `manifest.json`, `sw.js`,
   `icon-192.png`, `icon-512.png`를 전부 드래그해서 업로드
   (※ `config.js`는 아직 없는 상태이니 올리지 않습니다)
3. 하단에 커밋 메시지 입력(예: "초기 업로드") → **Commit changes** 클릭

### ③ Github Pages 활성화

1. 저장소 상단 메뉴 **Settings** 클릭
2. 왼쪽 메뉴 **Pages** 클릭
3. **Source**를 **"Deploy from a branch"**로 설정
4. Branch는 **main**(또는 master), 폴더는 **/ (root)** 선택 → **Save**
5. 몇 분 기다리면 아래와 같은 주소가 생성됩니다:
   ```
   https://[본인아이디].github.io/my-schedule/
   ```

> 🙂 지금 바로 이 주소로 접속해보면 PIN 화면은 뜨지만, Firebase 설정이
> 없어서 아직 정상 동작하지는 않습니다. 걱정하지 마세요! 아래 2~4단계를
> 마치면 완전히 동작합니다.

### ④ 경로 주의사항 (중요)

현재 코드의 `manifest.json`, `sw.js`, `index.html`이 **`/my-schedule/`**
경로를 기준으로 작성되어 있어서, Github 저장소 이름도 반드시
**`my-schedule`**로 맞춰야 아이콘/오프라인 캐싱이 정상 동작합니다.

| 저장소 이름 | 결과 |
|---|---|
| `my-schedule` | ✅ 바로 정상 동작 |
| 다른 이름(예: `work-cal`) | ⚠️ 경로 불일치로 오류 가능 (코드 내 경로 전부 수정 필요) |

---

## 🔥 2단계: Firebase 프로젝트 만들기 (무료)

1. https://console.firebase.google.com 접속 → 로그인
2. **"프로젝트 추가"** 클릭 → 이름 입력(예: `my-schedule`) → 생성
3. 왼쪽 메뉴 **Build → Realtime Database** 클릭 → **데이터베이스 만들기**
   - 위치: 아시아(서울과 가까운 지역 선택, 예: `asia-southeast1`)
   - 보안 규칙: **테스트 모드로 시작** 선택 (일단 진행, 추후 변경 가능)
4. 왼쪽 상단 ⚙️(톱니바퀴) → **프로젝트 설정** → 아래로 스크롤 → **"내 앱"** → `</>` (웹 앱) 아이콘 클릭
5. 앱 닉네임 입력 후 등록 → 화면에 나오는 `firebaseConfig` 코드 전체를 복사해두기

> 💡 이 `firebaseConfig` 값이 아래 4단계에서 필요합니다.

---

## 🔑 3단계: 공공데이터포털 API 키 발급받기 (공휴일 자동 조회용)

1. https://www.data.go.kr 접속 → 회원가입/로그인
2. 검색창에 **"특일정보"** 검색
3. **"한국천문연구원_특일 정보"** API 선택 → **활용신청**
4. 승인 후 **마이페이지 → 개발계정** 에서 **서비스키(인증키)** 복사

> 💡 승인은 보통 즉시~몇 분 내로 완료됩니다.

---

## 📝 4단계: `config.js` 만들고 Github에 업로드

1. `config.example.js` 파일을 로컬 컴퓨터에서 복사합니다.
2. 복사한 파일 이름을 **`config.js`**로 변경합니다.
3. 메모장(또는 편집기)으로 열어서, 2단계에서 복사한 `firebaseConfig` 값과
   3단계에서 받은 API 키를 아래처럼 채워 넣습니다.

```javascript
window.FIREBASE_CONFIG = {
  apiKey: "여기에 본인 값 입력",
  authDomain: "여기에 본인 값 입력",
  databaseURL: "여기에 본인 값 입력",
  projectId: "여기에 본인 값 입력",
  storageBucket: "여기에 본인 값 입력",
  messagingSenderId: "여기에 본인 값 입력",
  appId: "여기에 본인 값 입력"
};

window.DATA_GO_KR_API_KEY = "여기에 본인 API 키 입력";
```

4. 저장합니다.
5. 1단계에서 만든 Github 저장소로 돌아가서, **"Add file" → "Upload files"**
   클릭 → 지금 만든 `config.js` 파일을 업로드 → Commit

6. 1~2분 정도 기다린 후 아래 주소로 다시 접속해보세요:
   ```
   https://[본인아이디].github.io/my-schedule/
   ```
   PIN 입력 후 달력이 정상적으로 보이고 "🟢 실시간 동기화 연결됨"이
   뜨면 완료입니다! 🎉

> ⚠️ `config.js`에는 본인의 Firebase/API 키가 들어있습니다. Public
> 저장소에 올리면 이 정보도 함께 공개된다는 점을 꼭 인지하세요.
> 완전히 숨기고 싶다면 아래 "🔒 Firebase 보안 규칙" 섹션을 참고해
> 최소한의 접근 제한을 걸어두시길 권장합니다.

---

## 📱 모바일에 앱처럼 설치하는 방법

1. 호스팅된 주소를 모바일 브라우저(Chrome/Safari)로 접속
2. **공유 버튼 → "홈 화면에 추가"** 선택
3. 설치 완료! 이후 앱 아이콘을 눌러서 바로 실행 가능

---

## 🔑 처음 실행 시

1. 처음 접속하면 **PIN 입력 화면**이 나옵니다.
2. 기본 PIN은 `1234`입니다. (로그인 후 우측 상단 **🔑 PIN변경**에서 바로 변경 권장)
3. 로그인 후 **👤 이름변경**에서 본인 이름을 입력하면 상단에 표시됩니다.

---

## 🔒 Firebase 보안 규칙 (중요 — 꼭 읽어주세요)

Firebase Realtime Database를 **"테스트 모드"**로 생성하면, 기본적으로
**누구나 해당 DB 주소를 알면 데이터를 읽고 쓸 수 있는 상태**입니다.
앱 화면의 PIN 입력은 "화면 잠금"일 뿐, Firebase 서버 자체를 막아주지는 않습니다.

### 📌 현재 기본 규칙 (테스트 모드, 생성 시 자동 적용)

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

> ⚠️ 개인적으로 가볍게 사용하는 용도라면 당장 큰 문제는 없지만,
> DB 주소나 구조가 외부에 노출되면 누구나 내 근무 데이터를
> 보거나 바꿀 수 있다는 점은 꼭 인지하고 계시는 게 좋습니다.

### ✅ 옵션 1 — 간단 버전 (PIN 값만 외부 접근 차단)

**코드 수정 없이 규칙만 교체하면 됩니다.**

```json
{
  "rules": {
    "myPin": {
      ".read": false,
      ".write": false
    },
    "myName": {
      ".read": true,
      ".write": true
    },
    "myScheduleData": {
      ".read": true,
      ".write": true
    }
  }
}
```

> ⚠️ 참고: 이 규칙을 적용하면 앱이 PIN을 Firebase에서 불러오지 못해,
> PIN 변경 기능이 정상 동작하지 않을 수 있습니다. 가볍게 막아두는
> 용도로만 생각해주세요.

---

### ✅ 옵션 2 — 권장 버전 (Firebase 익명 인증 추가)

가장 현실적인 보안 방법입니다. **규칙 교체 + 코드 2곳 수정**이 필요합니다.
아래 순서를 **그대로** 따라하시면 됩니다. (코딩을 몰라도 복사/붙여넣기만 하면 됩니다)

#### ① Firebase 콘솔에서 익명 로그인 기능 켜기

1. Firebase 콘솔 → 왼쪽 메뉴 **Build → Authentication** 클릭
2. **"시작하기"** 버튼 클릭
3. 로그인 방법 목록에서 **"익명(Anonymous)"** 항목 클릭 → 사용 설정(토글 ON) → 저장

#### ② Realtime Database 규칙 교체

```
Firebase 콘솔 → Realtime Database → 규칙(Rules) 탭
```

아래 내용을 붙여넣고 **"게시(Publish)"** 클릭:

```json
{
  "rules": {
    "myPin": { ".read": "auth != null", ".write": "auth != null" },
    "myName": { ".read": "auth != null", ".write": "auth != null" },
    "myScheduleData": { ".read": "auth != null", ".write": "auth != null" }
  }
}
```

#### ③ `index.html` 파일 수정 (2곳)

**수정 위치 1 — `<head>` 안, Firebase SDK 스크립트 부분**

아래처럼 생긴 부분을 찾으세요:

```html
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script src="./config.js"></script>
```

`firebase-database-compat.js` 줄 **바로 다음**, `config.js` 줄 **바로 위**에
한 줄을 추가하세요:

```html
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="./config.js"></script>
```

**수정 위치 2 — `<script>` 안의 `initFirebase` 함수**

아래처럼 생긴 부분을 찾으세요 (Ctrl+F로 `function initFirebase` 검색):

```javascript
function initFirebase(){
  const syncEl = document.getElementById('syncStatus');
  db.ref('.info/connected').on('value', snap=>{
```

이 부분을 아래처럼 **맨 첫 줄에 코드 추가**해서 바꿔주세요:

```javascript
function initFirebase(){
  firebase.auth().signInAnonymously().catch(err=>{
    console.error('익명 로그인 실패:', err);
  });
  const syncEl = document.getElementById('syncStatus');
  db.ref('.info/connected').on('value', snap=>{
```

(= `const syncEl = ...` 줄 바로 위에 `firebase.auth().signInAnonymously()...` 3줄만 추가하면 끝입니다)

#### ④ 적용 확인

1. 수정한 `index.html`을 Github 저장소에 다시 업로드(덮어쓰기)
2. 1~2분 기다린 후 배포 주소로 다시 접속
3. 평소처럼 PIN 입력 후 정상적으로 달력이 보이고 동기화되면 성공입니다
4. 만약 "🔴 오프라인"이 계속 뜨거나 동기화가 안 되면:
   - Authentication에서 익명 로그인이 정말 켜져 있는지 다시 확인
   - 브라우저 콘솔(F12 → Console 탭)에서 에러 메시지 확인

> 💡 코드 수정이 막막하게 느껴진다면, 메모장으로 `index.html`을 열고
> `Ctrl+F`로 위에 적힌 문구를 찾아서 그 줄 근처에 추가하는 식으로
> 진행하시면 됩니다. 전체 구조를 바꾸는 게 아니라 **딱 4줄 추가**하는
> 작업입니다.

---

### 📊 보안 옵션 비교

| 옵션 | 보안 수준 | 코드 수정 필요 여부 | 난이도 |
|---|---|---|---|
| 기본(테스트 모드) | ❌ 없음 | 없음 | - |
| 옵션 1(PIN 차단) | ⚠️ 낮음 | 없음 (규칙만 교체) | 쉬움 |
| 옵션 2(익명 인증) | ✅ 양호 | 있음 (4줄 추가) | 보통 |

---

## ⚠️ 주의사항

- `config.js` 파일은 **본인의 Firebase/API 키가 담긴 개인 파일**입니다.
  - Public 저장소에 올리면 이 정보도 함께 공개된다는 점을 꼭 인지하세요.
  - 다른 사람과 공유하지 마세요.
- 공공데이터포털 API는 **본인 계정으로 직접 신청**받아 사용하세요.
  (여러 명이 한 키를 같이 쓰면 호출 제한에 걸릴 수 있습니다)

---

## ❓ 문제가 생겼을 때

| 증상 | 확인해볼 것 |
|---|---|
| 화면에 "config.js 누락" 경고가 뜸 | `config.js` 파일을 Github 저장소에 업로드했는지 확인 |
| 동기화 상태가 "🔴 오프라인"으로 뜸 | Firebase `databaseURL`이 정확한지 확인 |
| 공휴일이 표시되지 않음 | 공공데이터포털 API 키가 정확한지, 승인이 완료됐는지 확인 |
| PIN이 기억나지 않음 | Firebase 콘솔 → Realtime Database → `myPin` 값을 직접 확인/수정 |
| 보안 규칙 적용 후 동기화가 안 됨 | Authentication에서 익명 로그인이 켜져 있는지, 코드 4줄이 정확히 추가됐는지 확인 |
| Github Pages 아이콘/캐싱이 안 됨 | 저장소 이름이 `my-schedule`인지 확인 |

---

문의사항이 있으면 템플릿을 전달해준 사람에게 연락주세요. 🙂
