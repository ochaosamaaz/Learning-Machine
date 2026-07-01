/* ============================================
   SPEAKING PRACTICE - Interactive English Conversation
   Uses Web Speech API (Recognition + Synthesis)
   ============================================ */

// ============================================
// SPEAKING SCENARIOS DATA
// ============================================
const speakingScenarios = [
    {
        id: 'greetings',
        title: 'Greetings & Introductions',
        title_id: 'Salam & Perkenalan',
        icon: 'hand-wave',
        dialogue: [
            { speaker: 'ai', text: "Hi there! What's your name?" },
            { speaker: 'user', expected: "My name is", hint: "Say: My name is [your name]" },
            { speaker: 'ai', text: "Nice to meet you! Where are you from?" },
            { speaker: 'user', expected: "I am from", hint: "Say: I am from [your country/city]" },
            { speaker: 'ai', text: "That's great! What do you do for a living?" },
            { speaker: 'user', expected: "I am a", hint: "Say: I am a [your job/student]" },
            { speaker: 'ai', text: "Wonderful! It was nice talking to you. Have a great day!" },
            { speaker: 'user', expected: "Thank you", hint: "Say: Thank you! You too!" }
        ]
    },
    {
        id: 'ordering',
        title: 'Ordering Food',
        title_id: 'Memesan Makanan',
        icon: 'utensils',
        dialogue: [
            { speaker: 'ai', text: "Welcome to our restaurant! How can I help you?" },
            { speaker: 'user', expected: "I would like", hint: "Say: I would like to order..." },
            { speaker: 'ai', text: "Would you like something to drink?" },
            { speaker: 'user', expected: "I will have", hint: "Say: I'll have a coffee/water/juice please" },
            { speaker: 'ai', text: "Anything else?" },
            { speaker: 'user', expected: "No", hint: "Say: No, that's all. Thank you!" },
            { speaker: 'ai', text: "Your total is fifteen dollars. Cash or card?" },
            { speaker: 'user', expected: "card", hint: "Say: Card please / Cash please" }
        ]
    },
    {
        id: 'shopping',
        title: 'At the Store',
        title_id: 'Di Toko',
        icon: 'shopping-bag',
        dialogue: [
            { speaker: 'ai', text: "Hello! Can I help you find anything?" },
            { speaker: 'user', expected: "looking for", hint: "Say: Yes, I'm looking for a [item]" },
            { speaker: 'ai', text: "What size do you need?" },
            { speaker: 'user', expected: "medium", hint: "Say: Medium / Large / Small please" },
            { speaker: 'ai', text: "Here you go. Would you like to try it on?" },
            { speaker: 'user', expected: "yes", hint: "Say: Yes please. Where is the fitting room?" },
            { speaker: 'ai', text: "The fitting room is on your right. How does it fit?" },
            { speaker: 'user', expected: "perfect", hint: "Say: It fits perfectly! I'll take it." }
        ]
    },
    {
        id: 'directions',
        title: 'Asking Directions',
        title_id: 'Bertanya Arah',
        icon: 'map-signs',
        dialogue: [
            { speaker: 'ai', text: "You look lost. Do you need help?" },
            { speaker: 'user', expected: "how do I get to", hint: "Say: Yes, how do I get to the train station?" },
            { speaker: 'ai', text: "Go straight for two blocks, then turn right at the traffic light." },
            { speaker: 'user', expected: "how far", hint: "Say: How far is it from here?" },
            { speaker: 'ai', text: "About five minutes walking. You can't miss it." },
            { speaker: 'user', expected: "thank you", hint: "Say: Thank you so much for your help!" }
        ]
    },
    {
        id: 'hotel',
        title: 'Hotel Check-in',
        title_id: 'Check-in Hotel',
        icon: 'hotel',
        dialogue: [
            { speaker: 'ai', text: "Good evening! Welcome to Grand Hotel. Do you have a reservation?" },
            { speaker: 'user', expected: "yes", hint: "Say: Yes, I have a reservation under [name]" },
            { speaker: 'ai', text: "For how many nights?" },
            { speaker: 'user', expected: "nights", hint: "Say: For three nights / two nights" },
            { speaker: 'ai', text: "Would you prefer a room with a city view or garden view?" },
            { speaker: 'user', expected: "city view", hint: "Say: City view please / Garden view please" },
            { speaker: 'ai', text: "Here's your key card. Room 507. Enjoy your stay!" },
            { speaker: 'user', expected: "thank you", hint: "Say: Thank you! What time is breakfast?" }
        ]
    },
    {
        id: 'phone',
        title: 'Phone Conversation',
        title_id: 'Percakapan Telepon',
        icon: 'phone',
        dialogue: [
            { speaker: 'ai', text: "Hello, this is Tech Support. How may I help you?" },
            { speaker: 'user', expected: "problem with", hint: "Say: Hi, I have a problem with my internet" },
            { speaker: 'ai', text: "I'm sorry to hear that. Can you describe the issue?" },
            { speaker: 'user', expected: "not working", hint: "Say: My internet is not working since this morning" },
            { speaker: 'ai', text: "Have you tried restarting your router?" },
            { speaker: 'user', expected: "yes", hint: "Say: Yes, I've already tried that but it didn't help" },
            { speaker: 'ai', text: "I'll send a technician tomorrow morning. Is that okay?" },
            { speaker: 'user', expected: "that would be great", hint: "Say: That would be great. Thank you!" }
        ]
    }
];

// ============================================
// REPEAT AFTER ME DATA
// ============================================
const repeatPhrases = [
    { text: "How are you doing today?", level: "easy" },
    { text: "I would like to make a reservation.", level: "easy" },
    { text: "Could you please speak more slowly?", level: "easy" },
    { text: "What time does the meeting start?", level: "easy" },
    { text: "I'm looking forward to hearing from you.", level: "medium" },
    { text: "The weather has been quite unpredictable lately.", level: "medium" },
    { text: "Would you mind if I opened the window?", level: "medium" },
    { text: "I've been working on this project for three months.", level: "medium" },
    { text: "Despite the challenges, we managed to finish on time.", level: "hard" },
    { text: "The conference will be held at the international convention center.", level: "hard" },
    { text: "She's been promoted to senior vice president of operations.", level: "hard" },
    { text: "The unprecedented growth in technology has transformed our daily lives.", level: "hard" }
];

// ============================================
// STATE
// ============================================
let speakingState = {
    currentScenario: null,
    currentStep: 0,
    isListening: false,
    recognition: null,
    score: 0,
    totalAttempts: 0
};

// ============================================
// SPEECH RECOGNITION SETUP
// ============================================
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 3;
    return recognition;
}

// ============================================
// TEXT TO SPEECH
// ============================================
function speakText(text, callback) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1;
    if (callback) utterance.onend = callback;
    window.speechSynthesis.speak(utterance);
}

// ============================================
// SPEAKING PRACTICE UI
// ============================================
function initSpeaking() {
    const container = document.getElementById('speaking-scenarios');
    if (!container) return;

    // Render scenario cards
    container.innerHTML = speakingScenarios.map(s => `
        <div class="speaking-scenario-card" onclick="startSpeakingScenario('${s.id}')">
            <i class="fas fa-${s.icon}"></i>
            <h4>${s.title}</h4>
            <p class="speaking-scenario-subtitle">${s.title_id}</p>
        </div>
    `).join('');
}

function startSpeakingScenario(id) {
    const scenario = speakingScenarios.find(s => s.id === id);
    if (!scenario) return;

    speakingState.currentScenario = scenario;
    speakingState.currentStep = 0;
    speakingState.score = 0;
    speakingState.totalAttempts = 0;

    // Show dialogue UI
    document.getElementById('speaking-scenarios').style.display = 'none';
    document.getElementById('speaking-repeat').style.display = 'none';
    const chatUI = document.getElementById('speaking-chat');
    chatUI.style.display = 'block';
    document.getElementById('speaking-chat-title').textContent = scenario.title;
    document.getElementById('speaking-messages').innerHTML = '';
    document.getElementById('speaking-result').style.display = 'none';

    playNextStep();
}

function playNextStep() {
    const scenario = speakingState.currentScenario;
    if (speakingState.currentStep >= scenario.dialogue.length) {
        showSpeakingResult();
        return;
    }

    const step = scenario.dialogue[speakingState.currentStep];
    const messagesEl = document.getElementById('speaking-messages');

    if (step.speaker === 'ai') {
        // AI speaks
        const msgEl = document.createElement('div');
        msgEl.className = 'speaking-msg speaking-msg-ai';
        msgEl.innerHTML = `<i class="fas fa-robot"></i><div class="msg-bubble">${step.text}</div>`;
        messagesEl.appendChild(msgEl);
        messagesEl.scrollTop = messagesEl.scrollHeight;

        speakText(step.text, () => {
            speakingState.currentStep++;
            setTimeout(playNextStep, 500);
        });
    } else {
        // User's turn
        const hintEl = document.createElement('div');
        hintEl.className = 'speaking-hint';
        hintEl.innerHTML = `<i class="fas fa-lightbulb"></i> ${step.hint}`;
        messagesEl.appendChild(hintEl);
        messagesEl.scrollTop = messagesEl.scrollHeight;

        // Show mic button
        document.getElementById('speaking-mic-btn').style.display = 'flex';
        document.getElementById('speaking-mic-btn').onclick = () => startListening(step);
    }
}

function startListening(step) {
    const recognition = initSpeechRecognition();
    if (!recognition) {
        alert('Speech recognition is not supported in your browser. Try Chrome or Edge.');
        return;
    }

    speakingState.isListening = true;
    const micBtn = document.getElementById('speaking-mic-btn');
    micBtn.classList.add('listening');
    micBtn.innerHTML = '<i class="fas fa-circle recording-dot"></i> Listening...';

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        const confidence = event.results[0][0].confidence;
        handleUserSpeech(transcript, confidence, step);
    };

    recognition.onerror = (event) => {
        speakingState.isListening = false;
        micBtn.classList.remove('listening');
        micBtn.innerHTML = '<i class="fas fa-microphone"></i> Tap to Speak';
        if (event.error !== 'no-speech') {
            showSpeakingFeedback('Could not hear you. Please try again.', false);
        }
    };

    recognition.onend = () => {
        speakingState.isListening = false;
        micBtn.classList.remove('listening');
        micBtn.innerHTML = '<i class="fas fa-microphone"></i> Tap to Speak';
    };
}

function handleUserSpeech(transcript, confidence, step) {
    const messagesEl = document.getElementById('speaking-messages');
    const expected = step.expected.toLowerCase();

    // Add user message
    const msgEl = document.createElement('div');
    msgEl.className = 'speaking-msg speaking-msg-user';
    msgEl.innerHTML = `<div class="msg-bubble">${transcript}</div><i class="fas fa-user"></i>`;
    messagesEl.appendChild(msgEl);

    speakingState.totalAttempts++;

    // Check if response contains expected phrase
    const isCorrect = transcript.includes(expected) || similarity(transcript, expected) > 0.4;

    const feedbackEl = document.createElement('div');
    if (isCorrect) {
        speakingState.score++;
        feedbackEl.className = 'speaking-feedback correct';
        feedbackEl.innerHTML = '<i class="fas fa-check-circle"></i> Great job!';
        if (typeof gamification !== 'undefined') gamification.addXP(15, 'Speaking practice correct!');
    } else {
        feedbackEl.className = 'speaking-feedback wrong';
        feedbackEl.innerHTML = `<i class="fas fa-info-circle"></i> Try saying something like: "${step.hint.replace('Say: ', '')}"`;
    }
    messagesEl.appendChild(feedbackEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    // Hide mic, proceed
    document.getElementById('speaking-mic-btn').style.display = 'none';

    // Remove hint
    const hints = messagesEl.querySelectorAll('.speaking-hint');
    hints.forEach(h => h.remove());

    speakingState.currentStep++;
    setTimeout(playNextStep, 1500);
}

function showSpeakingResult() {
    document.getElementById('speaking-mic-btn').style.display = 'none';
    const resultEl = document.getElementById('speaking-result');
    resultEl.style.display = 'block';
    const pct = Math.round((speakingState.score / speakingState.totalAttempts) * 100) || 0;
    resultEl.innerHTML = `
        <div class="speaking-result-content">
            <i class="fas fa-trophy" style="font-size:3rem;color:var(--warning);"></i>
            <h3>Conversation Complete!</h3>
            <p>Score: ${speakingState.score}/${speakingState.totalAttempts} (${pct}%)</p>
            <button class="btn btn-primary" onclick="backToSpeakingMenu()">Try Another</button>
        </div>
    `;
}

function backToSpeakingMenu() {
    document.getElementById('speaking-scenarios').style.display = 'grid';
    document.getElementById('speaking-repeat').style.display = 'block';
    document.getElementById('speaking-chat').style.display = 'none';
}

// ============================================
// REPEAT AFTER ME MODE
// ============================================
function startRepeatMode() {
    const phrase = repeatPhrases[Math.floor(Math.random() * repeatPhrases.length)];
    const container = document.getElementById('repeat-content');
    container.innerHTML = `
        <div class="repeat-card">
            <span class="repeat-level ${phrase.level}">${phrase.level.toUpperCase()}</span>
            <p class="repeat-text" id="repeat-target">${phrase.text}</p>
            <button class="btn btn-outline btn-sm" onclick="speakText('${phrase.text.replace(/'/g, "\\'")}')">
                <i class="fas fa-volume-up"></i> Listen
            </button>
            <div class="repeat-actions">
                <button class="btn btn-primary" id="repeat-mic-btn" onclick="startRepeatListening('${phrase.text.replace(/'/g, "\\'")}')">
                    <i class="fas fa-microphone"></i> Record Your Voice
                </button>
            </div>
            <div id="repeat-result"></div>
        </div>
    `;
}

function startRepeatListening(expectedText) {
    const recognition = initSpeechRecognition();
    if (!recognition) {
        alert('Speech recognition not supported. Try Chrome or Edge.');
        return;
    }

    const btn = document.getElementById('repeat-mic-btn');
    btn.classList.add('listening');
    btn.innerHTML = '<i class="fas fa-circle recording-dot"></i> Listening...';

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const score = similarity(transcript.toLowerCase(), expectedText.toLowerCase());
        const pct = Math.round(score * 100);

        const resultEl = document.getElementById('repeat-result');
        let rating = '';
        if (pct >= 80) rating = '<span class="rating-excellent">Excellent!</span>';
        else if (pct >= 60) rating = '<span class="rating-good">Good!</span>';
        else if (pct >= 40) rating = '<span class="rating-okay">Keep practicing!</span>';
        else rating = '<span class="rating-try-again">Try again!</span>';

        resultEl.innerHTML = `
            <div class="repeat-result-box">
                <p><strong>You said:</strong> "${transcript}"</p>
                <div class="repeat-score-bar"><div class="repeat-score-fill" style="width:${pct}%"></div></div>
                <p class="repeat-score-text">${rating} Pronunciation: ${pct}%</p>
            </div>
        `;

        if (pct >= 60 && typeof gamification !== 'undefined') {
            gamification.addXP(10, 'Good pronunciation!');
        }

        btn.classList.remove('listening');
        btn.innerHTML = '<i class="fas fa-microphone"></i> Try Again';
    };

    recognition.onerror = () => {
        btn.classList.remove('listening');
        btn.innerHTML = '<i class="fas fa-microphone"></i> Record Your Voice';
    };

    recognition.onend = () => {
        btn.classList.remove('listening');
    };
}

// ============================================
// SIMILARITY SCORE (Levenshtein-based)
// ============================================
function similarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    const costs = [];
    for (let i = 0; i <= longer.length; i++) {
        let lastVal = i;
        for (let j = 0; j <= shorter.length; j++) {
            if (i === 0) { costs[j] = j; }
            else if (j > 0) {
                let newVal = costs[j - 1];
                if (longer[i - 1] !== shorter[j - 1]) {
                    newVal = Math.min(Math.min(newVal, lastVal), costs[j]) + 1;
                }
                costs[j - 1] = lastVal;
                lastVal = newVal;
            }
        }
        if (i > 0) costs[shorter.length] = lastVal;
    }
    return (longer.length - costs[shorter.length]) / longer.length;
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initSpeaking();
    startRepeatMode();
});
