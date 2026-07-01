/* ============================================
   LEARNING MACHINE - Advanced Features
   Search, Bookmarks, Notes, Gamification, Dashboard
   ============================================ */

// ============================================
// SEARCH SYSTEM
// ============================================
const searchIndex = [
    // English
    { title: "Vocabulary - Hello, Thank you, Good morning", section: "english", tab: "vocabulary", keywords: "hello halo thank you terima kasih good morning selamat pagi vocabulary kosakata" },
    { title: "Grammar - Present, Past, Future Tenses", section: "english", tab: "grammar", keywords: "tense present past future continuous perfect grammar tata bahasa" },
    { title: "Conversation - Restaurant, Doctor, Interview", section: "english", tab: "conversation", keywords: "conversation percakapan restaurant doctor interview shopping directions" },
    { title: "English Idioms", section: "english", tab: "idioms", keywords: "idioms break ice piece cake burn midnight oil" },
    // Coding
    { title: "HTML & CSS - Structure, Forms, Flexbox, Grid", section: "coding", tab: "html-css", keywords: "html css flexbox grid form layout web page structure" },
    { title: "JavaScript - Variables, Functions, DOM, Fetch", section: "coding", tab: "javascript", keywords: "javascript js variable function arrow dom fetch async await api" },
    { title: "Python - Basics, Loops, OOP, Classes", section: "coding", tab: "python", keywords: "python variable loop class oop function list dictionary" },
    { title: "Git & GitHub - Commands, Push, Pull, Branch", section: "coding", tab: "git", keywords: "git github commit push pull branch merge clone fork" },
    // Bug Hunter
    { title: "Bug Hunter Roadmap - Beginner to Pro", section: "bughunter", tab: "bh-roadmap", keywords: "bug hunter roadmap cybersecurity hacking security beginner" },
    { title: "Security Tools - Burp Suite, Nmap, SQLMap", section: "bughunter", tab: "bh-tools", keywords: "burp suite nmap sqlmap nuclei tools hacking recon" },
    { title: "Vulnerabilities - XSS, SQLi, SSRF, IDOR", section: "bughunter", tab: "bh-vulns", keywords: "xss sql injection ssrf idor rce vulnerability exploit" },
    { title: "Bug Bounty Platforms - HackerOne, Bugcrowd", section: "bughunter", tab: "bh-platforms", keywords: "hackerone bugcrowd tryhackme hackthebox platform bounty" },
    // Excel
    { title: "Excel Basics - Shortcuts, Cell References", section: "excel", tab: "excel-basics", keywords: "excel basics shortcut cell reference format" },
    { title: "Excel Formulas - SUM, VLOOKUP, IF, INDEX", section: "excel", tab: "excel-formulas", keywords: "excel formula sum vlookup if countif average index match" },
    { title: "Excel Advanced - Pivot Table, Charts", section: "excel", tab: "excel-advanced", keywords: "pivot table chart conditional formatting filter" },
    { title: "Excel Tips & Tricks", section: "excel", tab: "excel-tips", keywords: "excel tips flash fill xlookup freeze panes data validation" },
    // Math
    { title: "Algebra - Linear, Quadratic Equations", section: "math", tab: "algebra", keywords: "algebra linear quadratic equation solve x variable" },
    { title: "Geometry - Area, Volume, Pythagorean", section: "math", tab: "geometry", keywords: "geometry area volume pythagorean circle triangle rectangle" },
    { title: "Statistics - Mean, Median, Probability", section: "math", tab: "statistics", keywords: "statistics mean median mode probability range" },
    // Other
    { title: "Quiz & Practice - All Categories", section: "quiz", tab: null, keywords: "quiz practice test question score" },
    { title: "Coding Playground - Live Editor", section: "playground", tab: null, keywords: "playground editor code run live practice" },
    { title: "Developer Roadmaps", section: "roadmaps", tab: null, keywords: "roadmap frontend backend fullstack data science developer career" },
    { title: "Design & UI/UX", section: "design", tab: null, keywords: "design ui ux figma canva color typography" },
];

function initSearch() {
    // Create search modal
    const modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-modal-content">
            <div class="search-input-wrapper">
                <i class="fas fa-search"></i>
                <input type="text" id="search-input" placeholder="Search lessons, topics, keywords..." autocomplete="off">
                <kbd>ESC</kbd>
            </div>
            <div class="search-results" id="search-results"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add search button to nav
    const searchBtn = document.createElement('button');
    searchBtn.className = 'btn-search';
    searchBtn.id = 'search-btn';
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    searchBtn.title = 'Search (Ctrl+K)';
    const navActions = document.querySelector('.nav-actions');
    navActions.insertBefore(searchBtn, navActions.firstChild);

    // Events
    searchBtn.addEventListener('click', openSearch);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeSearch(); });
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
        if (e.key === 'Escape') closeSearch();
    });

    const input = document.getElementById('search-input');
    input.addEventListener('input', (e) => performSearch(e.target.value));
}

function openSearch() {
    document.getElementById('search-modal').classList.add('active');
    document.getElementById('search-input').value = '';
    document.getElementById('search-input').focus();
    document.getElementById('search-results').innerHTML = '<p class="search-hint">Type to search across all courses and lessons...</p>';
}

function closeSearch() {
    document.getElementById('search-modal').classList.remove('active');
}

function performSearch(query) {
    const results = document.getElementById('search-results');
    if (!query.trim()) {
        results.innerHTML = '<p class="search-hint">Type to search across all courses and lessons...</p>';
        return;
    }
    const q = query.toLowerCase();
    const matches = searchIndex.filter(item =>
        item.title.toLowerCase().includes(q) || item.keywords.includes(q)
    );
    if (matches.length === 0) {
        results.innerHTML = '<p class="search-no-result">No results found. Try different keywords.</p>';
        return;
    }
    results.innerHTML = matches.map(item => `
        <div class="search-result-item" onclick="goToSearchResult('${item.section}', '${item.tab}')">
            <i class="fas fa-${getIconForSection(item.section)}"></i>
            <div>
                <strong>${item.title}</strong>
                <small>${item.section.charAt(0).toUpperCase() + item.section.slice(1)}</small>
            </div>
        </div>
    `).join('');
}

function getIconForSection(section) {
    const icons = { english: 'language', coding: 'code', bughunter: 'bug', excel: 'table', math: 'calculator', quiz: 'brain', playground: 'play', roadmaps: 'map', design: 'palette' };
    return icons[section] || 'book';
}

function goToSearchResult(section, tab) {
    closeSearch();
    const el = document.getElementById(section);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (tab && tab !== 'null') {
            setTimeout(() => {
                const sectionEl = document.getElementById(section);
                const tabBtn = sectionEl ? sectionEl.querySelector(`[data-tab="${tab}"]`) : null;
                if (tabBtn) tabBtn.click();
            }, 500);
        }
    }
}

// ============================================
// GAMIFICATION SYSTEM (XP, Levels, Badges, Streaks)
// ============================================
const gamification = {
    getState() {
        return JSON.parse(localStorage.getItem('gamification') || JSON.stringify({
            xp: 0, level: 1, streak: 0, lastActive: null,
            badges: [], quizzesTaken: 0, lessonsRead: 0, notesCreated: 0
        }));
    },
    saveState(state) { localStorage.setItem('gamification', JSON.stringify(state)); },
    addXP(amount, reason) {
        const state = this.getState();
        state.xp += amount;
        const newLevel = Math.floor(state.xp / 100) + 1;
        if (newLevel > state.level) {
            state.level = newLevel;
            showNotification(`Level Up! You're now Level ${state.level}!`, 'level-up');
        }
        this.saveState(state);
        this.updateUI();
        showNotification(`+${amount} XP: ${reason}`, 'xp');
    },
    checkStreak() {
        const state = this.getState();
        const today = new Date().toDateString();
        if (state.lastActive !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            state.streak = (state.lastActive === yesterday) ? state.streak + 1 : 1;
            state.lastActive = today;
            this.saveState(state);
            if (state.streak >= 7) this.awardBadge('streak7', '7-Day Streak');
            if (state.streak >= 30) this.awardBadge('streak30', '30-Day Streak');
        }
    },
    awardBadge(id, name) {
        const state = this.getState();
        if (!state.badges.includes(id)) {
            state.badges.push(id);
            this.saveState(state);
            showNotification(`Badge Unlocked: ${name}!`, 'badge');
        }
    },
    updateUI() {
        const state = this.getState();
        const xpBar = document.getElementById('xp-bar-fill');
        const xpText = document.getElementById('xp-text');
        const levelText = document.getElementById('level-text');
        const streakText = document.getElementById('streak-text');
        if (xpBar) xpBar.style.width = `${(state.xp % 100)}%`;
        if (xpText) xpText.textContent = `${state.xp} XP`;
        if (levelText) levelText.textContent = `Lv.${state.level}`;
        if (streakText) streakText.textContent = `${state.streak} days`;
    }
};

// ============================================
// BOOKMARK SYSTEM
// ============================================
const bookmarks = {
    get() { return JSON.parse(localStorage.getItem('bookmarks') || '[]'); },
    save(list) { localStorage.setItem('bookmarks', JSON.stringify(list)); },
    add(title, section, tab) {
        const list = this.get();
        const id = `${section}-${tab}-${Date.now()}`;
        if (!list.find(b => b.section === section && b.tab === tab)) {
            list.push({ id, title, section, tab, date: new Date().toISOString() });
            this.save(list);
            gamification.addXP(5, 'Bookmarked a lesson');
            showNotification('Bookmarked!', 'bookmark');
        }
    },
    remove(id) {
        const list = this.get().filter(b => b.id !== id);
        this.save(list);
    },
    render() {
        const list = this.get();
        const container = document.getElementById('bookmarks-list');
        if (!container) return;
        if (list.length === 0) {
            container.innerHTML = '<p class="empty-state">No bookmarks yet. Click the bookmark icon on any lesson to save it here.</p>';
            return;
        }
        container.innerHTML = list.map(b => `
            <div class="bookmark-item">
                <div class="bookmark-info" onclick="goToSearchResult('${b.section}','${b.tab}')">
                    <i class="fas fa-${getIconForSection(b.section)}"></i>
                    <span>${b.title}</span>
                </div>
                <button class="bookmark-remove" onclick="bookmarks.remove('${b.id}');bookmarks.render();">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
};

// ============================================
// NOTES SYSTEM
// ============================================
const notes = {
    get() { return JSON.parse(localStorage.getItem('userNotes') || '[]'); },
    save(list) { localStorage.setItem('userNotes', JSON.stringify(list)); },
    add(text) {
        if (!text.trim()) return;
        const list = this.get();
        list.unshift({ id: Date.now(), text, date: new Date().toISOString() });
        this.save(list);
        gamification.addXP(10, 'Created a note');
        this.render();
    },
    remove(id) {
        const list = this.get().filter(n => n.id !== id);
        this.save(list);
        this.render();
    },
    render() {
        const container = document.getElementById('notes-list');
        if (!container) return;
        const list = this.get();
        if (list.length === 0) {
            container.innerHTML = '<p class="empty-state">No notes yet. Write your first note above!</p>';
            return;
        }
        container.innerHTML = list.map(n => `
            <div class="note-item">
                <p>${n.text}</p>
                <div class="note-meta">
                    <small>${new Date(n.date).toLocaleDateString()}</small>
                    <button onclick="notes.remove(${n.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }
};

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.innerHTML = `<i class="fas fa-${type === 'xp' ? 'star' : type === 'badge' ? 'medal' : type === 'level-up' ? 'arrow-up' : type === 'bookmark' ? 'bookmark' : 'info-circle'}"></i> ${message}`;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 10);
    setTimeout(() => { notif.classList.remove('show'); setTimeout(() => notif.remove(), 300); }, 3000);
}

// ============================================
// INIT ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    gamification.checkStreak();
    gamification.updateUI();
    bookmarks.render();
    notes.render();
});
