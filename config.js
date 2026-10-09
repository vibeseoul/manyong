// ================================================================
//  마뇽을 찾아라 · 설정 파일
//  이벤트 운영 중 바꿀 일이 있는 값은 모두 여기에 있습니다.
// ================================================================
window.MANYONG_CONFIG = {

  // 참여 숫자 집계용 구글 Apps Script 웹 앱 주소
  // (비워 두면 집계하지 않고 페이지만 작동합니다)
  sheetUrl: "",

  // 직원 PIN (SHA-256 해시값). PIN을 바꾸려면 tools/pin.html 에서 새 값을 만들어 붙여 넣으세요.
  // PIN은 매장 직원에게만 공유하세요.
  staffPinHash: "2ae45826a7dc163b07ac0d8a8d81dfff5f3ca2c56cf557772e9f0cb930362219",

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

  // 황금 마뇽(게임 클리어) 혜택
  bonusOffer: {
    en: "An extra gift at the checkout",
    de: "Ein Extra-Geschenk an der Kasse",
    ko: "계산대에서 추가 선물"
  }
};
