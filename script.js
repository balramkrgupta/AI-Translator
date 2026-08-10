// ==========================================
// AI LANGUAGE TRANSLATOR
// ==========================================

// Maximum characters sent to MyMemory per request.
// MyMemory allows a maximum of 500 characters.
// We use 450 to stay safely below the limit.
const CHUNK_SIZE = 450;


// ==========================================
// TRANSLATE TEXT
// ==========================================

async function translateText() {

    let text = document.getElementById("inputText").value;

    let source =
        document.getElementById("sourceLang").value;

    let target =
        document.getElementById("targetLang").value;


    // Check empty input
    if (text.trim() === "") {

        alert("Please enter some text");

        return;
    }


    // If source and target languages are the same
    if (source === target) {

        document.getElementById("outputText").value = text;

        return;
    }


    // Show loading animation
    document.getElementById("loading").style.display = "block";


    // Clear previous translation
    document.getElementById("outputText").value = "";


    try {

        // Split the text into smaller chunks
        let chunks = splitTextIntoChunks(text, CHUNK_SIZE);

        let translatedParts = [];


        // Translate every chunk
        for (let i = 0; i < chunks.length; i++) {

            let translatedChunk =
                await translateChunk(
                    chunks[i],
                    source,
                    target
                );


            translatedParts.push(translatedChunk);


            // Show progress
            document.getElementById("outputText").value =
                translatedParts.join(" ");


            // Small delay between requests
            // Helps avoid sending requests too quickly
            if (i < chunks.length - 1) {

                await new Promise(resolve =>
                    setTimeout(resolve, 300)
                );
            }
        }


        // Combine all translated chunks
        let finalTranslation =
            translatedParts.join(" ");


        document.getElementById("outputText").value =
            finalTranslation;

    }


    catch (error) {

        console.log(error);

        alert(
            "Translation failed. Please try again."
        );

    }


    // Hide loading animation
    document.getElementById("loading").style.display = "none";
}



// ==========================================
// TRANSLATE ONE CHUNK
// ==========================================

async function translateChunk(
    text,
    source,
    target
) {

    let url =
        "https://api.mymemory.translated.net/get?q="
        + encodeURIComponent(text)
        + "&langpair="
        + source
        + "|"
        + target;


    let response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Translation API request failed"
        );
    }


    let data =
        await response.json();


    // Check API response
    if (
        !data.responseData ||
        !data.responseData.translatedText
    ) {

        throw new Error(
            "Invalid translation response"
        );
    }


    return data.responseData.translatedText;
}



// ==========================================
// SPLIT LONG TEXT INTO CHUNKS
// ==========================================

function splitTextIntoChunks(
    text,
    maxLength
) {

    let chunks = [];

    let remainingText = text;


    while (remainingText.length > maxLength) {

        // Find the last space before the limit
        let splitPosition =
            remainingText.lastIndexOf(
                " ",
                maxLength
            );


        // If there is no space,
        // split exactly at maxLength
        if (splitPosition <= 0) {

            splitPosition = maxLength;
        }


        let chunk =
            remainingText
                .substring(0, splitPosition)
                .trim();


        chunks.push(chunk);


        remainingText =
            remainingText
                .substring(splitPosition)
                .trim();
    }


    // Add remaining text
    if (remainingText.length > 0) {

        chunks.push(remainingText);
    }


    return chunks;
}



// ==========================================
// SWAP LANGUAGES
// ==========================================

function swapLanguages() {

    let source =
        document.getElementById("sourceLang");

    let target =
        document.getElementById("targetLang");


    let temp =
        source.value;


    source.value =
        target.value;


    target.value =
        temp;
}



// ==========================================
// CHARACTER COUNTER
// ==========================================

function countCharacters() {

    let text =
        document.getElementById("inputText").value;


    document.getElementById("charCount").innerHTML =
        text.length + " characters";
}



// ==========================================
// COPY TRANSLATED TEXT
// ==========================================

function copyText() {

    let output =
        document.getElementById("outputText");


    if (output.value.trim() === "") {

        alert(
            "No translated text available"
        );

        return;
    }


    output.select();


    document.execCommand("copy");


    alert("Text copied!");
}



// ==========================================
// TEXT TO SPEECH
// ==========================================

function speakText() {

    let text =
        document.getElementById("outputText").value;


    if (text.trim() === "") {

        alert(
            "No translated text available"
        );

        return;
    }


    let speech =
        new SpeechSynthesisUtterance(text);


    let language =
        document.getElementById("targetLang").value;


    if (language === "hi") {

        speech.lang = "hi-IN";

    }


    else if (language === "fr") {

        speech.lang = "fr-FR";

    }


    else if (language === "es") {

        speech.lang = "es-ES";

    }


    else if (language === "de") {

        speech.lang = "de-DE";

    }


    else {

        speech.lang = "en-US";

    }


    window.speechSynthesis.speak(
        speech
    );
}