/* ============================================
   LEARNING MACHINE - Main Application Logic
   ============================================ */

// State
let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';
let quizState = { category: null, questions: [], currentIndex: 0, score: 0, answered: false };

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initNavigation();
    initTabs();
    initCourseCards();
    initScrollEffects();
    loadProgress();
    addScrollTopButton();
});

// ============================================
// THEME TOGGLE
// ============================================
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    document.getElementById('theme-toggle').addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
    });
}

function updateThemeIcon() {
    const icon = document.querySelector('#theme-toggle i');
    icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ============================================
// LANGUAGE SWITCHER
// ============================================
function initLanguage() {
    applyTranslations();
    document.getElementById('current-lang').textContent = currentLang.toUpperCase();
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'id' : 'en';
        localStorage.setItem('lang', currentLang);
        document.getElementById('current-lang').textContent = currentLang.toUpperCase();
        applyTranslations();
    });
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[currentLang][key];
            } else {
                el.innerHTML = translations[currentLang][key];
            }
        }
    });
    document.documentElement.lang = currentLang === 'id' ? 'id' : 'en';
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============================================
// COURSE CARD NAVIGATION (FIX)
// ============================================
function initCourseCards() {
    const courseCards = document.querySelectorAll('.course-card[data-target]');
    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function navigateTo(section) {
    const el = document.getElementById(section);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// TABS
// ============================================
function initTabs() {
    const tabSections = document.querySelectorAll('.learning-section');
    tabSections.forEach(section => {
        const tabBtns = section.querySelectorAll('.tab-btn');
        const tabContents = section.querySelectorAll('.tab-content');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                const targetContent = section.querySelector(`#tab-${tabId}`);
                if (targetContent) targetContent.classList.add('active');
            });
        });
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.course-card, .vocab-card, .grammar-card, .code-card, .math-card, .conversation-card, .excel-card, .tool-card, .vuln-card, .platform-card, .roadmap-phase').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// ============================================
// SCROLL TO TOP
// ============================================
function addScrollTopButton() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 300);
    });
}

// ============================================
// TEXT-TO-SPEECH
// ============================================
function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// ============================================
// CODE COPY
// ============================================
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code, pre').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const icon = button.querySelector('i');
        icon.className = 'fas fa-check';
        button.style.color = '#28a745';
        setTimeout(() => { icon.className = 'fas fa-copy'; button.style.color = ''; }, 2000);
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}

// ============================================
// QUIZ SYSTEM
// ============================================
function startQuiz(category) {
    quizState.category = category;
    quizState.currentIndex = 0;
    quizState.score = 0;
    quizState.answered = false;
    const allQuestions = [...quizData[category]];
    quizState.questions = shuffleArray(allQuestions).slice(0, 10);
    document.getElementById('quiz-category-select').style.display = 'none';
    document.getElementById('quiz-body').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-total').textContent = quizState.questions.length;
    document.getElementById('quiz-score').textContent = '0';
    showQuestion();
}

function showQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    quizState.answered = false;
    document.getElementById('quiz-current').textContent = quizState.currentIndex + 1;
    document.getElementById('quiz-question').textContent = currentLang === 'id' && q.question_id ? q.question_id : q.question;
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(btn);
    });
    document.getElementById('quiz-feedback').className = 'quiz-feedback';
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-next').style.display = 'none';
}

function selectAnswer(index) {
    if (quizState.answered) return;
    quizState.answered = true;
    const q = quizState.questions[quizState.currentIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    options.forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === q.correct) opt.classList.add('correct');
        if (i === index && i !== q.correct) opt.classList.add('wrong');
    });
    if (index === q.correct) {
        quizState.score++;
        document.getElementById('quiz-score').textContent = quizState.score;
        feedback.textContent = translations[currentLang].quiz_correct;
        feedback.className = 'quiz-feedback show correct';
    } else {
        feedback.textContent = translations[currentLang].quiz_wrong + q.options[q.correct];
        feedback.className = 'quiz-feedback show wrong';
    }
    feedback.style.display = 'block';
    document.getElementById('quiz-next').style.display = 'block';
    saveQuizProgress(quizState.category);
}

function nextQuestion() {
    quizState.currentIndex++;
    if (quizState.currentIndex >= quizState.questions.length) {
        showQuizResult();
    } else {
        showQuestion();
    }
}

function showQuizResult() {
    document.getElementById('quiz-body').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    const total = quizState.questions.length;
    const score = quizState.score;
    const pct = Math.round((score / total) * 100);
    const msg = currentLang === 'id' ? `Skor kamu: ${score}/${total} (${pct}%)` : `Your score: ${score}/${total} (${pct}%)`;
    document.getElementById('result-score').textContent = msg;
}

function resetQuiz() {
    document.getElementById('quiz-category-select').style.display = 'block';
    document.getElementById('quiz-body').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    quizState = { category: null, questions: [], currentIndex: 0, score: 0, answered: false };
}

// ============================================
// PROGRESS TRACKING
// ============================================
function saveQuizProgress(category) {
    const progress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    if (!progress[category]) progress[category] = { completed: 0, total: 10 };
    progress[category].completed = Math.max(progress[category].completed, quizState.score);
    localStorage.setItem('learningProgress', JSON.stringify(progress));
    loadProgress();
}

function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    ['english', 'coding', 'math', 'bughunter', 'excel', 'quiz'].forEach(cat => {
        const bar = document.getElementById(`progress-${cat}`);
        if (bar && progress[cat]) {
            const pct = (progress[cat].completed / progress[cat].total) * 100;
            bar.style.width = `${pct}%`;
        }
    });
}

// ============================================
// UTILITY
// ============================================
function shuffleArray(array) {
    const s = [...array];
    for (let i = s.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
}
