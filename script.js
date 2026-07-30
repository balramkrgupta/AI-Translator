async function translateText(){


    let text =
    document.getElementById("inputText").value;



    let source =
    document.getElementById("sourceLang").value;



    let target =
    document.getElementById("targetLang").value;




    if(text.trim()===""){


        alert("Please enter some text");

        return;

    }





    document.getElementById("loading").style.display="block";




    try{


        let url =
        "https://api.mymemory.translated.net/get?q="
        + encodeURIComponent(text)
        + "&langpair="
        + source
        + "|"
        + target;





        let response =
        await fetch(url);




        let data =
        await response.json();




        let translatedText =
        data.responseData.translatedText;





        document.getElementById("outputText").value =
        translatedText;





    }



    catch(error){


        console.log(error);


        alert("Translation failed. Please try again.");


    }




    document.getElementById("loading").style.display="none";



}







function swapLanguages(){



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








function countCharacters() {
    let text = document.getElementById("inputText").value;
    document.getElementById("charCount").innerHTML =
        text.length + " characters";
}









function copyText(){



    let output =
    document.getElementById("outputText");



    output.select();



    document.execCommand("copy");



    alert("Text copied!");



}








function speakText(){



    let text =
    document.getElementById("outputText").value;




    if(text.trim()===""){


        alert("No translated text available");


        return;


    }




    let speech =
    new SpeechSynthesisUtterance(text);





    let language =
    document.getElementById("targetLang").value;





    if(language==="hi"){

        speech.lang="hi-IN";

    }


    else if(language==="fr"){

        speech.lang="fr-FR";

    }


    else if(language==="es"){

        speech.lang="es-ES";

    }


    else if(language==="de"){

        speech.lang="de-DE";

    }


    else{

        speech.lang="en-US";

    }





    window.speechSynthesis.speak(speech);



}
