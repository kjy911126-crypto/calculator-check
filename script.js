// =======================================================
// 시험용 공학용계산기 확인 시스템
// Demo Version 1.0
// =======================================================

console.log("★★★★★ SCRIPT VERSION 1.0 ★★★★★");

// =======================================================
// HTML 요소 가져오기
// =======================================================

const cameraBtn = document.querySelector(".camera-btn");
const galleryBtn = document.querySelector(".gallery-btn");

const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");

const maker = document.getElementById("maker");
const model = document.getElementById("model");
const result = document.getElementById("result");

const makerCheck = document.getElementById("makerCheck");
const modelCheck = document.getElementById("modelCheck");

// =======================================================
// 이벤트 등록
// =======================================================

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

// =======================================================
// 사진 선택
// =======================================================

imageInput.addEventListener("change", handleImageSelect);

// =======================================================
// 사진 선택 처리
// =======================================================

function handleImageSelect(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        // 미리보기
        previewImage.src = e.target.result;
        previewImage.style.display = "block";

        // 분석중 표시
        showLoading();

        // OCR 시작
        startOCR(e.target.result);

    };

    reader.readAsDataURL(file);

}

// =======================================================
// 분석중 표시
// =======================================================

function showLoading(){

    maker.textContent = "분석 중...";
    model.textContent = "분석 중...";
    result.textContent = "⏳ 분석 중...";

    makerCheck.checked = false;
    modelCheck.checked = false;

}

// =======================================================
// OCR (다음 Part에서 구현)
// =======================================================

async function startOCR(image){

    console.log("OCR 시작");

}