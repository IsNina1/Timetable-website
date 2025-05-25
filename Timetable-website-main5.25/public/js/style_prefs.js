document.addEventListener('DOMContentLoaded', () => {
    const speakingStyleGroup = document.getElementById('speaking-style-group');
    const envSensitivityGroup = document.getElementById('env-sensitivity-group');
    const charmPointInput = document.getElementById('charm-point');
    const strengthPointInput = document.getElementById('strength-point');
    const continueBtn = document.getElementById('submit-style-prefs-btn');

    let speakingStyleSelected = false;
    let envSensitivitySelected = false;
    let charmPointEntered = false;
    let strengthPointEntered = false;

    // 초기 선택을 설정하는 함수 (이제 사용하지 않으므로 주석 처리 또는 삭제 가능)
    // function applyInitialSelections() {
    //     const initialSpeakingStyle = speakingStyleGroup.querySelector('.sel-btn[data-initial-selected="true"]');
    //     if (initialSpeakingStyle) {
    //         initialSpeakingStyle.classList.add('active');
    //         speakingStyleSelected = true;
    //     }

    //     const initialEnvSensitivity = envSensitivityGroup.querySelector('.sel-btn[data-initial-selected="true"]');
    //     if (initialEnvSensitivity) {
    //         initialEnvSensitivity.classList.add('active');
    //         envSensitivitySelected = true;
    //     }
    // }

    function checkAllInputs() {
        charmPointEntered = charmPointInput.value.trim() !== '';
        strengthPointEntered = strengthPointInput.value.trim() !== '';
        return speakingStyleSelected && envSensitivitySelected && charmPointEntered && strengthPointEntered;
    }

    function updateContinueButton() {
        if (checkAllInputs()) {
            continueBtn.disabled = false;
            continueBtn.classList.add('active');
        } else {
            continueBtn.disabled = true;
            continueBtn.classList.remove('active');
        }
    }

    function setupButtonGroup(groupElement, flagUpdater) {
        const buttons = groupElement.querySelectorAll('.sel-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. 현재 그룹의 모든 버튼에서 'active' 클래스를 제거하고, 'disabled' 상태도 해제합니다.
                buttons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.disabled = false; 
                });

                // 2. 현재 클릭된 버튼에 'active' 클래스를 추가합니다.
                button.classList.add('active');
                flagUpdater(true); 

                // 3. (선택 사항) 선택 변경을 허용하므로, 다른 버튼을 비활성화하지 않습니다.
                //    만약 한 번 선택 후 변경을 막고 싶다면, 여기서 다른 버튼을 비활성화합니다.
                //    예: buttons.forEach(btn => { if(btn !== button) btn.disabled = true; });
                //    현재는 클릭된 버튼만 active 상태가 되고, 다른 버튼도 여전히 클릭 가능합니다.

                updateContinueButton();
            });
        });
    }
    
    // 페이지 로드 시 초기 선택 항목을 적용하는 부분을 제거했으므로, 
    // applyInitialSelections(); 호출을 삭제하거나 주석 처리합니다.

    // 각 버튼 그룹 설정
    setupButtonGroup(speakingStyleGroup, (value) => speakingStyleSelected = value);
    setupButtonGroup(envSensitivityGroup, (value) => envSensitivitySelected = value);

    // 텍스트 입력 필드 이벤트 리스너
    charmPointInput.addEventListener('input', () => {
        charmPointEntered = charmPointInput.value.trim() !== '';
        updateContinueButton();
    });

    strengthPointInput.addEventListener('input', () => {
        strengthPointEntered = strengthPointInput.value.trim() !== '';
        updateContinueButton();
    });
    
    // 페이지 로드 시 "계속" 버튼 상태를 초기화합니다 (아무것도 선택되지 않았으므로 비활성화).
    updateContinueButton(); 

    // "계속" 버튼 클릭 이벤트 리스너
    continueBtn.addEventListener('click', () => {
        if (!continueBtn.disabled) {
            const selectedSpeakingStyle = speakingStyleGroup.querySelector('.sel-btn.active');
            const selectedEnvSensitivity = envSensitivityGroup.querySelector('.sel-btn.active');

            const userStyleData = {
                speakingStyle: selectedSpeakingStyle ? selectedSpeakingStyle.textContent.trim() : null,
                envSensitivity: selectedEnvSensitivity ? selectedEnvSensitivity.textContent.trim() : null,
                charmPoint: charmPointInput.value.trim(),
                strengthPoint: strengthPointInput.value.trim(),
            };
            console.log('User Style Preferences Data:', userStyleData);
            alert('스타일 환경설정이 저장되었습니다 (콘솔 확인)! 다음 페이지로 이동합니다. (경로 설정 필요)');
            // 예시: window.location.href = '/another-page';
        }
    });
});