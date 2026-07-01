/* ============================================
   CODING PLAYGROUND - Live Code Editor
   ============================================ */

function initPlayground() {
    const htmlEditor = document.getElementById('pg-html');
    const cssEditor = document.getElementById('pg-css');
    const jsEditor = document.getElementById('pg-js');
    const preview = document.getElementById('pg-preview');
    const runBtn = document.getElementById('pg-run');

    if (!runBtn) return;

    runBtn.addEventListener('click', runPlayground);

    // Also run on Ctrl+Enter
    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
        if (editor) {
            editor.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); runPlayground(); }
                // Tab key support
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = editor.selectionStart;
                    const end = editor.selectionEnd;
                    editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
                    editor.selectionStart = editor.selectionEnd = start + 4;
                }
            });
        }
    });

    // Templates
    const templates = document.querySelectorAll('.pg-template-btn');
    templates.forEach(btn => {
        btn.addEventListener('click', () => {
            const template = btn.getAttribute('data-template');
            loadTemplate(template);
        });
    });

    // Load saved code or default
    const saved = JSON.parse(localStorage.getItem('playground') || 'null');
    if (saved) {
        if (htmlEditor) htmlEditor.value = saved.html || '';
        if (cssEditor) cssEditor.value = saved.css || '';
        if (jsEditor) jsEditor.value = saved.js || '';
    } else {
        loadTemplate('hello');
    }
    runPlayground();
}

function runPlayground() {
    const html = document.getElementById('pg-html')?.value || '';
    const css = document.getElementById('pg-css')?.value || '';
    const js = document.getElementById('pg-js')?.value || '';
    const preview = document.getElementById('pg-preview');

    if (!preview) return;

    const doc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
    preview.srcdoc = doc;

    // Save to localStorage
    localStorage.setItem('playground', JSON.stringify({ html, css, js }));

    // Award XP first time
    if (!localStorage.getItem('pg_first_run')) {
        localStorage.setItem('pg_first_run', 'true');
        if (typeof gamification !== 'undefined') gamification.addXP(20, 'First code run in Playground!');
    }
}

function loadTemplate(name) {
    const templates = {
        hello: {
            html: '<h1>Hello World!</h1>\n<p>Welcome to Learning Machine Playground</p>\n<button id="btn">Click Me!</button>',
            css: 'body {\n    font-family: Arial, sans-serif;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    min-height: 100vh;\n    background: linear-gradient(135deg, #667eea, #764ba2);\n    color: white;\n    margin: 0;\n}\n\nbutton {\n    padding: 12px 24px;\n    font-size: 16px;\n    border: none;\n    border-radius: 8px;\n    background: white;\n    color: #764ba2;\n    cursor: pointer;\n    margin-top: 20px;\n}\n\nbutton:hover {\n    transform: scale(1.05);\n}',
            js: 'document.getElementById("btn").addEventListener("click", () => {\n    alert("Hello from Learning Machine! \uD83D\uDE80");\n});'
        },
        card: {
            html: '<div class="card">\n    <div class="card-img">\uD83C\uDFA8</div>\n    <h2>Beautiful Card</h2>\n    <p>This is a CSS card component with hover effect.</p>\n    <button>Learn More</button>\n</div>',
            css: 'body {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 100vh;\n    background: #f0f0f0;\n    margin: 0;\n    font-family: sans-serif;\n}\n\n.card {\n    background: white;\n    border-radius: 16px;\n    padding: 30px;\n    text-align: center;\n    box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n    transition: transform 0.3s;\n    max-width: 300px;\n}\n\n.card:hover { transform: translateY(-10px); }\n.card-img { font-size: 4rem; margin-bottom: 15px; }\n.card h2 { margin: 0 0 10px; color: #333; }\n.card p { color: #666; line-height: 1.5; }\n\nbutton {\n    margin-top: 15px;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 8px;\n    background: #6c63ff;\n    color: white;\n    cursor: pointer;\n}',
            js: '// No JS needed for this example\nconsole.log("Card component loaded!");'
        },
        todo: {
            html: '<div class="todo-app">\n    <h1>Todo List</h1>\n    <div class="input-group">\n        <input type="text" id="todo-input" placeholder="Add a task...">\n        <button onclick="addTodo()">Add</button>\n    </div>\n    <ul id="todo-list"></ul>\n</div>',
            css: 'body { font-family: sans-serif; display: flex; justify-content: center; padding: 40px; background: #1a1a2e; margin: 0; }\n.todo-app { background: white; padding: 30px; border-radius: 12px; width: 350px; }\nh1 { text-align: center; color: #333; }\n.input-group { display: flex; gap: 8px; margin-bottom: 20px; }\ninput { flex: 1; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px; }\nbutton { padding: 10px 16px; background: #6c63ff; color: white; border: none; border-radius: 6px; cursor: pointer; }\nul { list-style: none; padding: 0; }\nli { padding: 10px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }\nli.done { text-decoration: line-through; opacity: 0.5; }',
            js: 'function addTodo() {\n    const input = document.getElementById("todo-input");\n    const text = input.value.trim();\n    if (!text) return;\n    \n    const li = document.createElement("li");\n    li.textContent = text;\n    li.onclick = () => li.classList.toggle("done");\n    document.getElementById("todo-list").appendChild(li);\n    input.value = "";\n}\n\ndocument.getElementById("todo-input").addEventListener("keypress", (e) => {\n    if (e.key === "Enter") addTodo();\n});'
        },
        calculator: {
            html: '<div class="calc">\n    <input type="text" id="display" readonly>\n    <div class="buttons">\n        <button onclick="clearDisplay()">C</button>\n        <button onclick="appendToDisplay(\'(\')\">(</button>\n        <button onclick="appendToDisplay(\')\')">)</button>\n        <button onclick="appendToDisplay(\'/\')\">/</button>\n        <button onclick="appendToDisplay(\'7\')">7</button>\n        <button onclick="appendToDisplay(\'8\')">8</button>\n        <button onclick="appendToDisplay(\'9\')">9</button>\n        <button onclick="appendToDisplay(\'*\')">*</button>\n        <button onclick="appendToDisplay(\'4\')">4</button>\n        <button onclick="appendToDisplay(\'5\')">5</button>\n        <button onclick="appendToDisplay(\'6\')">6</button>\n        <button onclick="appendToDisplay(\'-\')">-</button>\n        <button onclick="appendToDisplay(\'1\')">1</button>\n        <button onclick="appendToDisplay(\'2\')">2</button>\n        <button onclick="appendToDisplay(\'3\')">3</button>\n        <button onclick="appendToDisplay(\'+\')">+</button>\n        <button onclick="appendToDisplay(\'0\')" style="grid-column: span 2">0</button>\n        <button onclick="appendToDisplay(\'.\')">.</button>\n        <button onclick="calculate()" class="equals">=</button>\n    </div>\n</div>',
            css: 'body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #222; margin: 0; font-family: sans-serif; }\n.calc { background: #333; border-radius: 16px; padding: 20px; width: 280px; }\n#display { width: 100%; padding: 15px; font-size: 24px; text-align: right; border: none; border-radius: 8px; margin-bottom: 15px; background: #1a1a1a; color: #0f0; box-sizing: border-box; }\n.buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }\nbutton { padding: 15px; font-size: 18px; border: none; border-radius: 8px; background: #555; color: white; cursor: pointer; }\nbutton:hover { background: #666; }\n.equals { background: #6c63ff; }\n.equals:hover { background: #5a52d5; }',
            js: 'function appendToDisplay(value) {\n    document.getElementById("display").value += value;\n}\n\nfunction clearDisplay() {\n    document.getElementById("display").value = "";\n}\n\nfunction calculate() {\n    try {\n        const result = eval(document.getElementById("display").value);\n        document.getElementById("display").value = result;\n    } catch (e) {\n        document.getElementById("display").value = "Error";\n    }\n}'
        }
    };

    const t = templates[name];
    if (t) {
        const htmlEditor = document.getElementById('pg-html');
        const cssEditor = document.getElementById('pg-css');
        const jsEditor = document.getElementById('pg-js');
        if (htmlEditor) htmlEditor.value = t.html;
        if (cssEditor) cssEditor.value = t.css;
        if (jsEditor) jsEditor.value = t.js;
        runPlayground();
    }
}

document.addEventListener('DOMContentLoaded', initPlayground);
