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

// =======================================================
// OCR 실행
// =======================================================

async function startOCR(image){

    console.log("OCR 시작");

    const img = new Image();
    img.src = image;

    img.onload = async function(){

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 상단 18%만 확대
        canvas.width = img.width * 2;
        canvas.height = img.height * 0.18 * 2;

        ctx.filter = "contrast(250%) grayscale(100%)";

        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height * 0.18,
            0,
            0,
            img.width * 2,
            img.height * 0.18 * 2
        );

        const cropImage = canvas.toDataURL();

        const ocrResult = await Tesseract.recognize(
            cropImage,
            "eng"
        );

        const text = ocrResult.data.text
            .toUpperCase()
            .replace(/\n/g," ")
            .replace(/\s+/g," ")
            .trim();

        console.log("OCR 결과");
        console.log(text);

        const detectedMaker = extractMaker(text);
        const detectedNumber = extractModelNumber(text);

        console.log("제조사 =", detectedMaker);
        console.log("모델번호 =", detectedNumber);

    };

}

    function extractMaker(text){

    if(text.includes("CASIO")) return "CASIO";
    if(text.includes("SHARP")) return "SHARP";
    if(text.includes("CANON")) return "CANON";

    return "";
    }

    function extractModelNumber(text){

    const match = text.match(/\d{3}/);

    if(match){
        return match[0];
    }

    return "";
    }

