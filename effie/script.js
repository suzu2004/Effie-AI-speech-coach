/* ===== TOPIC GENERATOR ===== */
const topics = [
  "Talk about your favorite hobby",
  "Is social media good or bad?",
  "Describe your dream job",
  "Should AI replace humans?",
  "Talk about a life lesson",
  "Describe your ideal day"
];

function spinTopic() {
  const random = topics[Math.floor(Math.random() * topics.length)];
  document.getElementById("topic").innerText = random;
}

/* ===== SPEECH RECOGNITION ===== */
let recognition;
let transcript = "";
let time = 60;
let timerInterval;

function startSpeech() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Use Chrome browser");
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;

  transcript = "";

  recognition.onresult = function(event) {
    transcript = "";
    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    document.getElementById("output").innerText = transcript;
  };

  recognition.start();
  startTimer();
}

/* ===== TIMER ===== */
function startTimer() {
  time = 60;

  timerInterval = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = time;

    if (time <= 0) {
      clearInterval(timerInterval);
      recognition.stop();
      analyzeSpeech();
    }
  }, 1000);
}

/* ===== ANALYSIS ===== */
function analyzeSpeech() {
  const words = transcript.trim().split(/\s+/);
  const wordCount = words.length;

  const fillers = ["um", "uh", "like", "you know"];
  let fillerCount = 0;

  fillers.forEach(f => {
    const regex = new RegExp(`\\b${f}\\b`, "gi");
    fillerCount += (transcript.match(regex) || []).length;
  });

  const wpm = wordCount; // since 60 sec

  // simple score logic
  const fluency = Math.max(0, 100 - fillerCount * 5);
  const confidence = Math.min(100, wpm);

  document.getElementById("resultsText").innerHTML = `
    Words: ${wordCount} <br>
    WPM: ${wpm} <br>
    Fillers: ${fillerCount} <br><br>

    Fluency:
    <div class="bar"><div class="fill" style="width:${fluency}%"></div></div>

    Confidence:
    <div class="bar"><div class="fill" style="width:${confidence}%"></div></div>
  `;
}

/* ===== INTERACTIVE BACKGROUND ===== */
document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  const bg = document.querySelector(".bg");

  if (bg) {
    bg.style.background =
      `radial-gradient(circle at ${x}px ${y}px,
        rgba(255, 0, 150, 0.3),
        rgba(0, 0, 0, 0.9)
      ),
      linear-gradient(
        to right,
        #0f0c29,
        #302b63,
        #24243e,
        #ff0080,
        #ff4d4d,
        #ff9900
      )`;
  }
});

/* ===== BUTTON CLICK ANIMATION ===== */
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 100);
  });
});
/* ===== SPINNING WHEEL LOGIC ===== */
let topicsWheel = [
  "Talk about your favorite hobby",
  "Is social media good or bad?",
  "Describe your dream job",
  "Should AI replace humans?",
  "Talk about a life lesson",
  "Describe your ideal day"
];

let currentRotation = 0;
let selectedTopic = "";
let sessionTime = 60;

/* AUDIO */
const spinSound = new Audio("assets/spin.mp3");
const dingSound = new Audio("assets/ding.mp3");

/* SPIN FUNCTION */
function spinWheel() {
  const customInput = document.getElementById("customTopics").value;
  const customTime = document.getElementById("customTime").value;

  if (customInput) {
    topicsWheel = customInput.split(",");
  }

  if (customTime) {
    sessionTime = parseInt(customTime);
  }

  spinSound.play();

  const spinDegrees = Math.floor(2500 + Math.random() * 1500);
  currentRotation += spinDegrees;

  document.getElementById("wheel").style.transform =
    `rotate(${currentRotation}deg)`;

  const normalized = currentRotation % 360;
  const sector = 360 / topicsWheel.length;

  const index = Math.floor((360 - normalized) / sector) % topicsWheel.length;

 setTimeout(() => {
  selectedTopic = topicsWheel[index];

  dingSound.play();

  document.getElementById("selectedTopic").innerText = selectedTopic;
  document.getElementById("topicModal").classList.remove("hidden");

}, 4000);
}
function startSession() {
  document.getElementById("topicModal").classList.add("hidden");

  startSpeech();
  startCustomTimer();
}
function startSession() {
  document.getElementById("topicCard").classList.add("hidden");

  startSpeech();
  startCustomTimer();
}

function startCustomTimer() {
  let timeLeft = sessionTime;

  document.getElementById("timer").innerText = timeLeft;

  const interval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(interval);
      recognition.stop();
      analyzeSpeech();
    }
  }, 1000);
}