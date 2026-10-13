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
    en: "5% off your purchase today",
    de: "5 % auf deinen Einkauf heute",
    ko: "오늘 구매 5% 할인"
  },

  // 황금 마뇽(게임 클리어) 혜택: 매장 카페 음료 1잔 할인, 사용 기한 없음
  // (마뇽 3마리를 모두 찾은 뒤에 열립니다)
  bonusOffer: {
    en: "15% off one drink at our café",
    de: "15 % auf ein Getränk in unserem Café",
    ko: "카페 음료 1잔 15% 할인"
  }
};
