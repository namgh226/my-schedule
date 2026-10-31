/* =========================================================
   📌 "내근무달력" 개인 설정 템플릿
   ---------------------------------------------------------
   사용 방법:
   1) 이 파일을 복사해서 "config.js"라는 이름으로 저장하세요.
      (index.html과 같은 폴더에 두어야 합니다)
   2) 아래 Firebase 설정값을 본인의 Firebase 프로젝트 정보로
      교체하세요. (Firebase 콘솔 → 프로젝트 설정 → 일반 →
      "내 앱" 섹션에서 확인 가능)
   3) 공공데이터포털(data.go.kr)에서 "특일정보" API를
      직접 신청/발급받아 본인의 서비스키를 입력하세요.

   ⚠️ 주의: config.js 파일은 개인 정보(Firebase DB 접근 정보,
   API 키)가 담겨 있으므로 절대 다른 사람과 공유하거나
   깃허브 등 공개된 곳에 올리지 마세요!
   ========================================================= */

window.FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.REGION.firebasedatabase.app",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 공공데이터포털(data.go.kr) "특일정보" API 서비스키
window.DATA_GO_KR_API_KEY = "YOUR_DATA_GO_KR_API_KEY";
