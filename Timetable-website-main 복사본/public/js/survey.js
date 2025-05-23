document.addEventListener('DOMContentLoaded', () => {
    // 1) 각 요소 가져오기
    const ageInput    = document.querySelector('#age');
    const gradeInput  = document.querySelector('#grade');
    const kakaoInput  = document.querySelector('#kakao');

    const confirmAge   = document.querySelector('#confirm-age');
    const confirmGrade = document.querySelector('#confirm-grade');
    const confirmKakao = document.querySelector('#confirm-kakao');

    const msgAge   = document.querySelector('#msg-age');
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
    let smokeSelected = false, meetSelected = false; // Renamed for clarity

    // 3) "계속" 버튼 활성화 체크 함수
    function updateSaveButton() {
      const allDone = ageDone && gradeDone && kakaoDone && smokeSelected && meetSelected;
      saveBtn.disabled = !allDone;
      saveBtn.classList.toggle('active', allDone); // Assumes .active class styles the enabled button from push-btn.css
    }

    // 4) "확인" 버튼 로직
    confirmAge.addEventListener('click', () => {
      if (ageInput.value.trim()) {
        ageDone = true;
        msgAge.textContent = `나이가 입력되었습니다: ${ageInput.value}`; // Updated message for clarity
        ageInput.disabled = true; // Disable input after confirmation
        confirmAge.disabled = true; // Disable button after confirmation
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
        gradeInput.disabled = true;
        confirmGrade.disabled = true;
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
        kakaoInput.disabled = true;
        confirmKakao.disabled = true;
      } else {
        kakaoDone = false;
        msgKakao.textContent = '카카오톡 아이디를 입력해주세요.';
      }
      updateSaveButton();
    });

    // 5) 토글 그룹 로직 (한 개만 선택)
    function setupToggle(buttons, flagSetter, otherButtonsToDisable = []) {
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          // Deselect all buttons in this group first
          buttons.forEach(b => b.classList.remove('active'));
          // Select the clicked button
          btn.classList.add('active');
          flagSetter(true);

          // Disable all buttons in this group after selection
          buttons.forEach(b => b.disabled = true);
          // Disable buttons in the "other" group if specified (used for smoke/meet groups)
          otherButtonsToDisable.forEach(ob => ob.disabled = true);

          updateSaveButton();
        });
      });
    }

    setupToggle(smokeBtns, (value) => smokeSelected = value);
    setupToggle(meetBtns,  (value) => meetSelected = value);


    // 6) 초기 상태 반영
    updateSaveButton();

    // 7) 계속 버튼 클릭 시 페이지 이동 (추후 DB 저장 후에 사용)
    saveBtn.addEventListener('click', () => {
      if (!saveBtn.disabled) {
        // 여기에 모든 데이터를 수집하는 로직을 추가할 수 있습니다.
        const surveyData = {
            age: ageInput.value,
            grade: gradeInput.value,
            kakaoId: kakaoInput.value,
            smoking: document.querySelector('#smoke-no.active') ? '비흡연' : '흡연',
            meetingPreference: document.querySelector('#meet-offline.active') ? '오프라인' : '온라인'
        };
        console.log('Survey Data:', surveyData);
        // 예시: 다음 페이지로 이동
        // window.location.href = '/next-page'; // 실제 다음 페이지 경로로 변경
        alert('설문 데이터가 콘솔에 기록되었습니다. 다음 페이지로 이동합니다 (경로 설정 필요).');
      }
    });
});