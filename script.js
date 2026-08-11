// =========================
// 시험용 공학용계산기 확인 시스템
// Demo Version 0.3
// =========================

console.log("★★★★★ SCRIPT VERSION 0.3 ★★★★★");

// =========================
// HTML 요소
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

// 사진 촬영
cameraBtn.addEventListener("click", () => {

    imageInput.setAttribute("capture", "environment");
    imageInput.click();

});

// 사진 선택
galleryBtn.addEventListener("click", () => {

    imageInput.removeAttribute("capture");
    imageInput.click();

});

// =========================
// 사진 선택
// =========================

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;
        previewImage.style.display = "block";

        maker.textContent = "분석 중...";
        model.textContent = "분석 중...";
        result.textContent = "⏳ 분석 중...";

        startOCR(e.target.result);

    };

    reader.readAsDataURL(file);

});

// =========================
// OCR
// =========================

async function startOCR(image){

    console.log("OCR 시작");

}