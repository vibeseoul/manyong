/**
 * 마뇽을 찾아라 · 참여 집계 (vibe seoul Halloween 2026)
 *
 * 사용법
 * 1) 이 코드를 구글 시트의 [확장 프로그램 → Apps Script]에 통째로 붙여 넣고 저장
 * 2) 위쪽 함수 목록에서 setup 을 골라 [실행] → 권한 승인
 * 3) [배포 → 새 배포 → 웹 앱] / 실행 사용자: 나 / 액세스 권한: 모든 사용자 → 배포
 * 4) 나온 웹 앱 URL을 이벤트 페이지의 config.js → sheetUrl 에 넣기
 *
 * 개인정보: 이름·연락처·기기 ID·IP는 저장하지 않습니다.
 * 저장하는 값은 시각, 이벤트 종류, 쿠폰 코드, 화면 언어, 들어온 경로, 기록 ID(중복 방지용 임의 값)뿐입니다.
 *
 * v2 (10/12): 저장 성공 여부를 답하고, 같은 기록·같은 쿠폰의 두 번째 사용은 쌓지 않습니다.
 * 업데이트: 코드를 통째로 바꿔 저장 → [배포 → 배포 관리 → 연필 → 버전: 새 버전 → 배포]. 주소는 그대로입니다.
 */

const EVENTS = ['visit', 'found1', 'found2', 'found3', 'complete', 'redeem', 'bonus', 'bonus_redeem'];
const LABELS = {
  visit: '페이지 접속 (기기 수)',
  found1: '1번 마뇽 찾음',
  found2: '2번 마뇽 찾음',
  found3: '3번 마뇽 찾음',
  complete: '3마리 완료 (쿠폰 발급)',
  redeem: '쿠폰 사용',
  bonus: '황금 마뇽 찾음 (게임 클리어)',
  bonus_redeem: '황금 쿠폰 사용'
};
const EVENT_START = [2026, 10, 26]; // 이벤트 첫날
const EVENT_DAYS = 6;               // 10/26 – 10/31

// 쿠폰 코드 하나당 한 번만 기록하는 이벤트 (두 번째부터는 dup 으로 답하고 쌓지 않음)
const ONCE_PER_CODE = ['complete', 'redeem', 'bonus', 'bonus_redeem'];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (EVENTS.indexOf(d.ev) < 0) return json_({ ok: true, ignored: true });
    const id = clean_(d.id, 24);
    const code = clean_(d.code, 12);
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sh = log_();
      // 같은 기록을 다시 받은 경우 (휴대폰이 저장 확인을 못 받고 다시 보낸 경우)
      if (id && seen_(sh, id)) return json_({ ok: true, dup: true });
      // 같은 쿠폰을 두 번 사용하려는 경우 등
      if (code && ONCE_PER_CODE.indexOf(d.ev) >= 0 && hasCode_(sh, d.ev, code)) return json_({ ok: true, dup: true });
      sh.appendRow([new Date(), d.ev, code, clean_(d.lang, 2), clean_(d.src, 10), id]);
      SpreadsheetApp.flush();
      const cache = CacheService.getScriptCache();
      if (id) cache.put('id:' + id, '1', 21600);
      if (code && ONCE_PER_CODE.indexOf(d.ev) >= 0) cache.put('c:' + d.ev + ':' + code, '1', 21600);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true, dup: false });
  } catch (err) {
    return json_({ ok: false });
  }
}

function seen_(sh, id) {
  if (CacheService.getScriptCache().get('id:' + id)) return true;
  const last = sh.getLastRow();
  if (last < 2) return false;
  return !!sh.getRange(2, 6, last - 1, 1).createTextFinder(id).matchEntireCell(true).findNext();
}

function hasCode_(sh, ev, code) {
  if (CacheService.getScriptCache().get('c:' + ev + ':' + code)) return true;
  const last = sh.getLastRow();
  if (last < 2) return false;
  const rows = sh.getRange(2, 2, last - 1, 2).getValues();
  for (let i = 0; i < rows.length; i++) if (rows[i][0] === ev && String(rows[i][1]) === code) return true;
  return false;
}

function doGet() {
  return out_('manyong counter is running (v2)');
}

function out_(s) {
  return ContentService.createTextOutput(s);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// 시트에 수식이 들어가지 않도록 글자·숫자·하이픈만 남깁니다.
function clean_(v, n) {
  return String(v || '').replace(/[^A-Za-z0-9\-]/g, '').slice(0, n);
}

function log_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Log');
  if (!sh) {
    sh = ss.insertSheet('Log');
    sh.appendRow(['시각', '이벤트', '쿠폰 코드', '언어', '경로', '기록 ID']);
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  } else if (sh.getRange(1, 6).getValue() === '') {
    sh.getRange(1, 6).setValue('기록 ID');
  }
  return sh;
}

/** 처음 한 번만 실행: Log 시트와 요약 시트를 만듭니다. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone('Europe/Berlin');
  log_();

  let sh = ss.getSheetByName('요약');
  if (sh) ss.deleteSheet(sh);
  sh = ss.insertSheet('요약', 0);

  const y = EVENT_START[0], m = EVENT_START[1], d0 = EVENT_START[2];
  const startF = 'DATE(' + y + ',' + m + ',' + d0 + ')';
  const endF = startF + '+' + EVENT_DAYS;

  sh.getRange('A1').setValue('마뇽을 찾아라 · 참여 집계').setFontSize(14).setFontWeight('bold');
  sh.getRange('A2').setValue('이벤트 기간 합계에는 10/26 이전 테스트 기록이 들어가지 않습니다.').setFontColor('#777777');

  const header = ['항목', '이벤트 기간 합계', '전체 (테스트 포함)'];
  for (let i = 0; i < EVENT_DAYS; i++) header.push('');
  sh.getRange(3, 1, 1, header.length).setValues([header]);
  for (let i = 0; i < EVENT_DAYS; i++) {
    sh.getRange(3, 4 + i).setFormula('=' + startF + '+' + i).setNumberFormat('mm/dd (ddd)');
  }

  EVENTS.forEach(function (ev, r) {
    const row = 4 + r;
    sh.getRange(row, 1).setValue(LABELS[ev]);
    sh.getRange(row, 2).setFormula('=COUNTIFS(Log!$B:$B,"' + ev + '",Log!$A:$A,">="&' + startF + ',Log!$A:$A,"<"&(' + endF + '))');
    sh.getRange(row, 3).setFormula('=COUNTIF(Log!$B:$B,"' + ev + '")');
    for (let i = 0; i < EVENT_DAYS; i++) {
      const col = sh.getRange(3, 4 + i).getA1Notation().replace(/\d+/, '');
      sh.getRange(row, 4 + i).setFormula('=COUNTIFS(Log!$B:$B,"' + ev + '",Log!$A:$A,">="&' + col + '$3,Log!$A:$A,"<"&' + col + '$3+1)');
    }
  });

  const r0 = 4 + EVENTS.length + 1;
  sh.getRange(r0, 1, 3, 1).setValues([['완료율 (완료 ÷ 접속)'], ['쿠폰 사용률 (사용 ÷ 완료)'], ['게임 연결률 (황금 ÷ 완료)']]);
  sh.getRange(r0, 2).setFormula('=IFERROR(B8/B4,0)');
  sh.getRange(r0 + 1, 2).setFormula('=IFERROR(B9/B8,0)');
  sh.getRange(r0 + 2, 2).setFormula('=IFERROR(B10/B8,0)');
  sh.getRange(r0, 2, 3, 1).setNumberFormat('0%');

  sh.getRange(3, 1, 1, 3 + EVENT_DAYS).setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
  sh.getRange(4, 2, EVENTS.length, 1).setFontWeight('bold').setBackground('#f3f1ec');
  sh.setColumnWidth(1, 220);
  sh.setColumnWidths(2, 2, 140);
  sh.setFrozenRows(3);
}
