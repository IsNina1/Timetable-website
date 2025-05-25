document.addEventListener('DOMContentLoaded', () => {
  // 1) 각 요소 가져오기
  const ageInput = document.querySelector('#age');
  const gradeInput = document.querySelector('#grade');
  const kakaoInput = document.querySelector('#kakao');

  const confirmAge = document.querySelector('#confirm-age');
  const confirmGrade = document.querySelector('#confirm-grade');
  const confirmKakao = document.querySelector('#confirm-kakao');

  const msgAge = document.querySelector('#msg-age');
  const msgGrade = document.querySelector('#msg-grade');
  const msgKakao = document.querySelector('#msg-kakao');

  const smokeNoBtn = document.querySelector('#smoke-no');
  const smokeYesBtn = document.querySelector('#smoke-yes');
  const smokeBtns = [smokeNoBtn, smokeYesBtn];

  const meetOfflineBtn = document.querySelector('#meet-offline');
  const meetOnlineBtn = document.querySelector('#meet-online');
  const meetBtns = [meetOfflineBtn, meetOnlineBtn];

  const saveBtn = document.querySelector('#save-btn');

  // 2) 입력 완료 여부 플래그
  let ageDone = false, gradeDone = false, kakaoDone = false;
  let smokeSelected = false, meetSelected = false;

  // 3) "계속" 버튼 활성화 체크 함수
  function updateSaveButton() {
    const allDone = ageDone && gradeDone && kakaoDone && smokeSelected && meetSelected;
    saveBtn.disabled = !allDone;
    saveBtn.classList.toggle('active', allDone);
  }

  // 4) "확인" 버튼 로직 수정: 입력 필드와 확인 버튼을 비활성화하지 않음
  confirmAge.addEventListener('click', () => {
    if (ageInput.value.trim()) {
      ageDone = true;
      msgAge.textContent = `나이가 입력되었습니다: ${ageInput.value}`;
      // ageInput.disabled = true; // 비활성화 로직 제거
      // confirmAge.disabled = true; // 비활성화 로직 제거
    } else {
      ageDone = false;
      msgAge.textContent = '나이를 입력해주세요.';
    }
    updateSaveButton();
  });

  confirmGrade.addEventListener('click', () => {
    if (gradeInput.value.trim()) {
      gradeDone = true;
      msgGrade.textContent = `학년이 입력되었습니다: ${gradeInput.value}`;
      // gradeInput.disabled = true; // 비활성화 로직 제거
      // confirmGrade.disabled = true; // 비활성화 로직 제거
    } else {
      gradeDone = false;
      msgGrade.textContent = '학년을 입력해주세요.';
    }
    updateSaveButton();
  });

  confirmKakao.addEventListener('click', () => {
    if (kakaoInput.value.trim()) {
      kakaoDone = true;
      msgKakao.textContent = `카카오톡 아이디가 입력되었습니다: ${kakaoInput.value}`;
      // kakaoInput.disabled = true; // 비활성화 로직 제거
      // confirmKakao.disabled = true; // 비활성화 로직 제거
    } else {
      kakaoDone = false;
      msgKakao.textContent = '카카오톡 아이디를 입력해주세요.';
    }
    updateSaveButton();
  });

  // 5) 토글 그룹 로직 수정: 선택 변경 가능하도록, 버튼 비활성화 로직 제거
  function setupToggle(buttons, flagSetter) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // 먼저 현재 그룹의 모든 버튼에서 'active' 클래스를 제거합니다.
        buttons.forEach(b => b.classList.remove('active'));
        
        // 현재 클릭된 버튼에 'active' 클래스를 추가합니다.
        btn.classList.add('active');
        flagSetter(true); // 해당 그룹이 선택되었음을 표시합니다.

        // 선택 후 다른 버튼을 비활성화하지 않아 변경이 가능하도록 합니다.
        // buttons.forEach(b => b.disabled = true); // 이 줄 제거 또는 주석 처리

        updateSaveButton();
      });
    });
  }

  setupToggle(smokeBtns, (value) => smokeSelected = value);
  setupToggle(meetBtns,  (value) => meetSelected = value);

  // 6) 초기 상태 반영 (페이지 로드 시 아무것도 선택되지 않은 상태이므로, 버튼은 비활성화 상태로 시작)
  updateSaveButton();

  // 7) 계속 버튼 클릭 시 페이지 이동
  saveBtn.addEventListener('click', () => {
    if (!saveBtn.disabled) {
      const surveyData = {
          age: ageInput.value,
          grade: gradeInput.value,
          kakaoId: kakaoInput.value,
          smoking: smokeNoBtn.classList.contains('active') ? '비흡연' : (smokeYesBtn.classList.contains('active') ? '흡연' : null),
          meetingPreference: meetOfflineBtn.classList.contains('active') ? '오프라인' : (meetOnlineBtn.classList.contains('active') ? '온라인' : null)
      };
      console.log('Survey Data:', surveyData);
      alert('설문 데이터가 콘솔에 기록되었습니다. 다음 페이지로 이동합니다 (경로 설정 필요).');
      window.location.href = '/study-prefs';
    }
  });
});