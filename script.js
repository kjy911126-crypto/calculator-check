// =========================
// HTML 요소 가져오기
// =========================
const cameraBtn = document.querySelector(".camera-btn");
const galleryBtn = document.querySelector(".gallery-btn");

const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");

const maker = document.getElementById("maker");
const model = document.getElementById("model");
const result = document.getElementById("result");
const makerCheck = document.getElementById("makerCheck");
const modelCheck = document.getElementById("modelCheck");

// =========================
// 버튼 이벤트
// =========================
// 📷 사진 촬영 버튼
cameraBtn.addEventListener("click", () => {
    imageInput.setAttribute("capture", "environment");
    imageInput.click();
});

// 🖼 사진 선택 버튼
galleryBtn.addEventListener("click", () => {
    imageInput.removeAttribute("capture");
    imageInput.click();
});

// =========================
// 사진 선택 및 AI 분석
// =========================
// 사진 선택 후 실행
imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        // 사진 미리보기
        previewImage.src = e.target.result;
        previewImage.style.display = "block";

        // 분석 중 표시
        maker.textContent = "분석 중...";
        model.textContent = "분석 중...";
        result.textContent = "⏳ 분석 중...";

        // 2초 후 결과 표시 (데모)
setTimeout(() => {

    const aiResult = {
        maker: "CASIO",
        model: "FX-570ES PLUS"
    };

    maker.textContent = aiResult.maker;
    model.textContent = aiResult.model;

    // 체크박스 초기화
    makerCheck.checked = false;
    modelCheck.checked = false;

    // 결과는 다시 확인 대기
    result.textContent = "⏳ 확인 대기";

}, 2000);

    };

    reader.readAsDataURL(file);

});

// =========================
// 감독관 확인 및 판정
// =========================
function checkResult() {

    if (makerCheck.checked && modelCheck.checked) {

    if (isAllowedCalculator(maker.textContent, model.textContent)) {

        result.textContent = "🟢 허용기종";

    } else {

        result.textContent = "🔴 사용 불가";

    }

} else {

    result.textContent = "⏳ 확인 대기";

}

}

makerCheck.addEventListener("change", checkResult);

modelCheck.addEventListener("change", checkResult);

// =========================
// 모델명 숫자 추출
// =========================
function getModelNumber(modelName) {

    const match = modelName.match(/\d{3}/);

    if (match) {
        return Number(match[0]);
    }

    return null;

}

// =========================
// 허용기종 판정
// =========================
function isAllowedCalculator(maker, modelName) {

    const number = getModelNumber(modelName);

    if (number === null) {
        return false;
    }

    for (const rule of allowRules) {

        if (rule.maker !== maker) {
            continue;
        }

        // 범위 규칙
        if (rule.min !== undefined) {

            if (number >= rule.min && number <= rule.max) {
                return true;
            }

        }

        // 모델명 규칙
        if (rule.models) {

            if (rule.models.includes(modelName)) {
                return true;
            }

        }

    }

    return false;

}
