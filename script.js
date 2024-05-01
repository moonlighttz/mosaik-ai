const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

function startSpeechRecognition() {
  recognition.start();

  document.getElementById('speechInput').value = '';
  document.getElementById('translatedOutput').value = '';
}

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  document.getElementById('speechInput').value = transcript;
};

let targetLanguage = 'id-ID';

function changeLanguage(language) {
  if (language === 'id-ID') {
    recognition.lang = 'id-ID';
    targetLanguage = 'en-US';

    document.getElementById('speechLabel').textContent = 'Indonesian';
    document.getElementById('translateLabel').textContent = 'English';

    document.getElementById('speechEnglish').classList.remove('active');
    document.getElementById('speechIndonesian').classList.add('active');
  } else if (language === 'en-US') {
    recognition.lang = 'en-US';
    targetLanguage = 'id-ID';

    document.getElementById('speechLabel').textContent = 'English';
    document.getElementById('translateLabel').textContent = 'Indonesian';

    document.getElementById('speechIndonesian').classList.remove('active');
    document.getElementById('speechEnglish').classList.add('active');
  }
}
function translateAndReadAloud() {
  const textToTranslate = document.getElementById('speechInput').value;
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' +
      targetLanguage +
      '&dt=t&q=' +
      encodeURIComponent(textToTranslate),
    true
  );
  xhr.onload = function () {
    const response = JSON.parse(xhr.responseText);
    const translatedText = response[0][0][0];
    document.getElementById('translatedOutput').value = translatedText;

    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLanguage === 'en-US' ? 'en-US' : 'id-ID';
    speechSynthesis.speak(utterance);
  };
  xhr.send();
}
