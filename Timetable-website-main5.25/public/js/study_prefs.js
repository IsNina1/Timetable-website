document.addEventListener('DOMContentLoaded', () => {
    const purposeGroup = document.getElementById('study-purpose-group'); // 스터디 목적 버튼 그룹
    const atmosphereGroup = document.getElementById('study-atmosphere-group'); // 스터디 분위기 버튼 그룹
    
    // user_style_prefs.ejs에 해당하는 ID로 변경해야 합니다.
    // 아래는 user_style_prefs.ejs에 맞춘 ID 예시입니다. 실제 EJS 파일의 ID를 확인해주세요.
    const speakingStyleGroup = document.getElementById('speaking-style-group'); 
    const envSensitivityGroup = document.getElementById('env-sensitivity-group');
    const charmPointInput = document.getElementById('charm-point');
    const strengthPointInput = document.getElementById('strength-point');

    // continueBtn ID도 일치시켜야 합니다.
    // study_prefs.ejs의 경우 'continue-btn'
    // user_style_prefs.ejs의 경우 'submit-style-prefs-btn'
    const continueBtn = document.getElementById('submit-style-prefs-btn') || document.getElementById('continue-btn');


    let purposeSelected = false; // study_prefs.ejs 용
    let atmosphereSelected = false; // study_prefs.ejs 용
    
    let speakingStyleSelected = false; // user_style_prefs.ejs 용
    let envSensitivitySelected = false; // user_style_prefs.ejs 용
    let charmPointEntered = false; // user_style_prefs.ejs 용
    let strengthPointEntered = false; // user_style_prefs.ejs 용

    function updateContinueButton() {
        let allDone = false;
        // 현재 페이지가 어떤 페이지인지에 따라 검사 로직을 분기할 수 있습니다.
        // 여기서는 두 페이지의 모든 플래그를 OR 조건으로 확인하거나,
        // 또는 이 JS 파일이 사용되는 EJS 페이지에 따라 필요한 플래그만 검사하도록 합니다.
        // 일단은 user_style_prefs.ejs 기준으로 작성하고, study_prefs.js와 공용으로 사용한다면 수정이 필요합니다.

        if (document.getElementById('study-purpose-group')) { // study_prefs.ejs의 요소가 있다면
             allDone = purposeSelected && atmosphereSelected;
        } else if (document.getElementById('speaking-style-group')) { // user_style_prefs.ejs의 요소가 있다면
             allDone = speakingStyleSelected && envSensitivitySelected && charmPointEntered && strengthPointEntered;
        }

        if (continueBtn) {
            continueBtn.disabled = !allDone;
            continueBtn.classList.toggle('active', allDone);
        }
    }

    function setupButtonGroup(groupElement, flagUpdater) {
        if (!groupElement) {
            // console.warn('Button group not found:', groupElement); // 디버깅용
            return; 
        }
        const buttons = groupElement.querySelectorAll('.sel-btn');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. 현재 그룹의 모든 버튼에서 'active' 클래스를 제거하고, 'disabled' 상태도 해제합니다.
                buttons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.disabled = false; // 다른 버튼들도 다시 활성화하여 선택 변경 가능하게 함
                });

                // 2. 현재 클릭된 버튼에 'active' 클래스를 추가합니다.
                button.classList.add('active');
                flagUpdater(true); // 해당 그룹에 선택이 이루어졌음을 알립니다.

                // 3. (선택 사항) 한 번 선택하면 해당 버튼만 활성화 상태로 두고 다른 버튼은 선택 못하게 하려면
                //    여기서 다른 버튼들을 비활성화 할 수 있습니다.
                //    현재 요구사항은 "다시 변경 가능하게" 이므로, 모든 버튼은 계속 활성화 상태로 둡니다.
                //    만약, 클릭된 버튼도 비활성화 시키고 싶다면(정말 최종 선택처럼), button.disabled = true; 추가 가능.
                //    하지만 "변경 가능"이 핵심이므로 여기서는 그대로 둡니다.

                updateContinueButton(); // "계속" 버튼 상태 업데이트
            });
        });
    }

    // study_prefs.ejs 관련 그룹 설정
    if (purposeGroup) {
        setupButtonGroup(purposeGroup, (value) => purposeSelected = value);
    }
    if (atmosphereGroup) {
        setupButtonGroup(atmosphereGroup, (value) => atmosphereSelected = value);
    }

    // user_style_prefs.ejs 관련 그룹 설정
    if (speakingStyleGroup) {
        setupButtonGroup(speakingStyleGroup, (value) => speakingStyleSelected = value);
    }
    if (envSensitivityGroup) {
        setupButtonGroup(envSensitivityGroup, (value) => envSensitivitySelected = value);
    }
    
    // user_style_prefs.ejs 텍스트 입력 필드 이벤트 리스너
    if (charmPointInput) {
        charmPointInput.addEventListener('input', () => {
            charmPointEntered = charmPointInput.value.trim() !== '';
            updateContinueButton();
        });
    }
    if (strengthPointInput) {
        strengthPointInput.addEventListener('input', () => {
            strengthPointEntered = strengthPointInput.value.trim() !== '';
            updateContinueButton();
        });
    }
    
    // 페이지 로드 시 "계속" 버튼 상태를 초기화 (아무것도 선택/입력되지 않았으므로 비활성화)
    // EJS 파일에서 data-initial-selected 속성을 제거했으므로, 초기 선택 로직은 필요 없습니다.
    updateContinueButton(); 

    // "계속" 버튼 클릭 이벤트 리스너
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (!continueBtn.disabled) {
                let dataToSubmit = {};

                if (document.getElementById('study-purpose-group')) { // study_prefs.ejs 데이터
                    const selectedPurposeBtn = purposeGroup.querySelector('.sel-btn.active');
                    const selectedAtmosphereBtn = atmosphereGroup.querySelector('.sel-btn.active');
                    dataToSubmit = {
                        purpose: selectedPurposeBtn ? selectedPurposeBtn.textContent.trim() : null,
                        atmosphere: selectedAtmosphereBtn ? selectedAtmosphereBtn.textContent.trim() : null,
                    };
                    console.log('Study Preferences Data:', dataToSubmit);
                    alert('스터디 환경설정이 저장되었습니다 (콘솔 확인)! 다음 페이지로 이동합니다. (경로 설정 필요)');

                } else if (document.getElementById('speaking-style-group')) { // user_style_prefs.ejs 데이터
                    const selectedSpeakingStyle = speakingStyleGroup.querySelector('.sel-btn.active');
                    const selectedEnvSensitivity = envSensitivityGroup.querySelector('.sel-btn.active');
                    dataToSubmit = {
                        speakingStyle: selectedSpeakingStyle ? selectedSpeakingStyle.textContent.trim() : null,
                        envSensitivity: selectedEnvSensitivity ? selectedEnvSensitivity.textContent.trim() : null,
                        charmPoint: charmPointInput.value.trim(),
                        strengthPoint: strengthPointInput.value.trim(),
                    };
                    console.log('User Style Preferences Data:', dataToSubmit);
                    alert('스타일 환경설정이 저장되었습니다 (콘솔 확인)! 다음 페이지로 이동합니다. (경로 설정 필요)');
                }
                window.location.href = '/style-prefs';
            }
        });
    }
});