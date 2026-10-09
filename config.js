// ================================================================
//  마뇽을 찾아라 · 설정 파일
//  이벤트 운영 중 바꿀 일이 있는 값은 모두 여기에 있습니다.
// ================================================================
window.MANYONG_CONFIG = {

  // 참여 숫자 집계용 구글 Apps Script 웹 앱 주소
  // (비워 두면 집계하지 않고 페이지만 작동합니다)
  sheetUrl: "https://script.google.com/macros/s/AKfycbxBWJHeDlGCoDD1LHT7_SVsC5KbX_AdR79n6a63oOJEDdknttL07-Rt3ult-wi9-ocjEg/exec",

  // 직원 PIN (SHA-256 해시값). PIN을 바꾸려면 tools/pin.html 에서 새 값을 만들어 붙여 넣으세요.
  // PIN은 매장 직원에게만 공유하세요.
  staffPinHash: "2ae45826a7dc163b07ac0d8a8d81dfff5f3ca2c56cf557772e9f0cb930362219",

  // 테스트용 초기화 PIN (SHA-256 해시값). 쿠폰의 PIN 칸에 이 번호를 넣으면 처음 상태로 돌아갑니다.
  resetPinHash: "53e59a03619994f7ad12832b1b0848e4ab46b772bed3fb1669169750ba186853",

  // 쿠폰은 받은 날 이 시각까지만 사용할 수 있습니다 (매장 마감 시각, 독일 시간)
  couponUntil: "20:00",

  // 이 시각이 지나면 쿠폰을 사용할 수 없습니다 (독일 시간 11/1 0시)
  endsAt: "2026-11-01T00:00:00+01:00",

  // 혜택 문구가 아직 확정 전이면 true → 화면에 '예시' 표시가 붙습니다
  sample: true,

  // 마뇽 3마리를 모두 찾았을 때 혜택
  offer: {
    en: "10% off your purchase today",
    de: "10 % auf deinen Einkauf heute",
    ko: "오늘 구매 10% 할인"
  },

  // 황금 마뇽(게임 클리어) 혜택: 할로윈 시즌 음료 할인 (카페에서 사용)
  bonusOffer: {
    en: "50% off a Halloween seasonal drink",
    de: "50 % auf ein Halloween-Saisongetränk",
    ko: "할로윈 시즌 음료 50% 할인"
  },
  // 황금 쿠폰은 받은 날 이 시각까지만 사용 가능 (카페 라스트 오더)
  bonusUntil: "19:30"
};
