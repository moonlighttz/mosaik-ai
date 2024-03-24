const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

function startSpeechRecognition() {
    recognition.start();
}

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('speechInput').value = transcript;
};

function translateAndReadAloud() {
    const textToTranslate = document.getElementById('speechInput').value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=' + encodeURIComponent(textToTranslate), true);
    xhr.onload = function() {
        const response = JSON.parse(xhr.responseText);
        const translatedText = response[0][0][0];
        document.getElementById('translatedOutput').value = translatedText;
        
        const utterance = new SpeechSynthesisUtterance(translatedText);
        utterance.lang = 'id-ID'; // Set language to Indonesian
        speechSynthesis.speak(utterance);
    };
    xhr.send();
}