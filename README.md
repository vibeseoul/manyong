# 마뇽을 찾아라 · vibe seoul Halloween 2026

매장에 숨은 마뇽 3마리를 QR로 찾는 스탬프 페이지입니다. (10/26–31, Zeil 68)

## 운영 중 자주 바꾸는 것: `config.js`

| 항목 | 설명 |
|---|---|
| `offer` / `bonusOffer` | 혜택 문구 (영어·독일어·한국어) |
| `sample` | 혜택이 확정되면 `false` 로 바꾸기 → '예시' 표시가 사라짐 |
| `staffPinHash` | 직원 PIN. `tools/pin.html` 에서 새 값을 만들어 붙여 넣기 |
| `sheetUrl` | 참여 집계용 구글 Apps Script 웹 앱 주소 |
| `endsAt` | 이 시각 이후 쿠폰 사용 불가 |

GitHub에서 `config.js` → 연필 아이콘 → 수정 → Commit changes 하면 1–2분 뒤 반영됩니다.

## QR 코드

| QR | 들어가는 주소 | 손으로 입력하는 코드 |
|---|---|---|
| 입구 POP | `…/?f=pop` | – |
| 1번 마뇽 | `…/?s=BOO` | BOO |
| 2번 마뇽 | `…/?s=FANG` | FANG |
| 3번 마뇽 | `…/?s=CAPE` | CAPE |
| 황금 마뇽 (게임 클리어 화면) | `…/?s=MOON` | MOON |

## 직원용

- 쿠폰 사용: 손님 화면의 **직원 전용 · 사용 처리** → PIN 4자리. 5번 틀리면 1분 잠김.
- 테스트 후 기록 지우기: 주소 끝에 `#reset` 을 붙여 열고 PIN 입력.

## 파일

- `index.html` 화면 · `app.js` 동작 · `config.js` 설정
- `jsQR.js` QR 인식 (Apache-2.0) · `fonts/` 자체 호스팅 폰트 (SIL OFL)
- 외부 서버에서 폰트·스크립트를 불러오지 않습니다. 집계를 켜면 구글 Apps Script로 익명 집계만 보냅니다.
