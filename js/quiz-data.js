/* ============================================
   QUIZ DATA - Questions for all categories
   ============================================ */

const quizData = {
    english: [
        {
            question: "What is the past tense of 'go'?",
            question_id: "Apa bentuk past tense dari 'go'?",
            options: ["goed", "went", "gone", "going"],
            correct: 1,
            explanation: "'Went' is the irregular past tense of 'go'."
        },
        {
            question: "Which sentence is correct?",
            question_id: "Kalimat mana yang benar?",
            options: ["She don't like coffee.", "She doesn't likes coffee.", "She doesn't like coffee.", "She not like coffee."],
            correct: 2,
            explanation: "With third person singular (she/he/it), we use 'doesn't' + base verb."
        },
        {
            question: "What does 'magnificent' mean?",
            question_id: "Apa arti 'magnificent'?",
            options: ["Small", "Ugly", "Very impressive/beautiful", "Boring"],
            correct: 2,
            explanation: "'Magnificent' means extremely beautiful or impressive."
        },
        {
            question: "Choose the correct preposition: 'I arrived ___ the airport.'",
            question_id: "Pilih preposisi yang benar: 'I arrived ___ the airport.'",
            options: ["in", "on", "at", "to"],
            correct: 2,
            explanation: "We use 'at' for specific locations like airports, stations."
        },
        {
            question: "What is the plural of 'child'?",
            question_id: "Apa bentuk jamak dari 'child'?",
            options: ["childs", "childrens", "children", "childes"],
            correct: 2,
            explanation: "'Children' is the irregular plural of 'child'."
        },
        {
            question: "Which word is a synonym of 'happy'?",
            question_id: "Kata mana yang sinonim dari 'happy'?",
            options: ["Sad", "Joyful", "Angry", "Tired"],
            correct: 1,
            explanation: "'Joyful' means feeling great happiness, same as 'happy'."
        },
        {
            question: "'I have been studying for 3 hours.' What tense is this?",
            question_id: "'I have been studying for 3 hours.' Tense apa ini?",
            options: ["Simple Present", "Present Perfect", "Present Perfect Continuous", "Past Continuous"],
            correct: 2,
            explanation: "Present Perfect Continuous: have/has + been + verb-ing (duration of action)."
        },
        {
            question: "What is the opposite of 'generous'?",
            question_id: "Apa lawan kata dari 'generous'?",
            options: ["Kind", "Selfish", "Brave", "Honest"],
            correct: 1,
            explanation: "'Selfish' (only thinks of themselves) is opposite of 'generous' (likes to give)."
        },
        {
            question: "Fill in: 'If I ___ rich, I would travel the world.'",
            question_id: "Isi: 'If I ___ rich, I would travel the world.'",
            options: ["am", "was", "were", "be"],
            correct: 2,
            explanation: "In second conditional (unreal present), we use 'were' for all subjects."
        },
        {
            question: "Which is a correct question tag? 'She is a doctor, ___?'",
            question_id: "Mana question tag yang benar? 'She is a doctor, ___?'",
            options: ["is she?", "isn't she?", "does she?", "doesn't she?"],
            correct: 1,
            explanation: "Positive statement → negative tag. 'is' → 'isn't she?'"
        }
    ],
    coding: [
        {
            question: "What does HTML stand for?",
            question_id: "Apa kepanjangan HTML?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
            correct: 0,
            explanation: "HTML = Hyper Text Markup Language, the standard language for web pages."
        },
        {
            question: "Which CSS property changes text color?",
            question_id: "Properti CSS mana yang mengubah warna teks?",
            options: ["text-color", "font-color", "color", "text-style"],
            correct: 2,
            explanation: "The 'color' property in CSS is used to set the text color."
        },
        {
            question: "What is the correct way to declare a variable in JavaScript?",
            question_id: "Apa cara yang benar untuk mendeklarasikan variabel di JavaScript?",
            options: ["variable x = 5;", "let x = 5;", "v x = 5;", "declare x = 5;"],
            correct: 1,
            explanation: "In modern JavaScript, 'let' and 'const' are used to declare variables."
        },
        {
            question: "What does CSS stand for?",
            question_id: "Apa kepanjangan CSS?",
            options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
            correct: 1,
            explanation: "CSS = Cascading Style Sheets, used for styling web pages."
        },
        {
            question: "Which symbol is used for comments in Python?",
            question_id: "Simbol apa yang digunakan untuk komentar di Python?",
            options: ["//", "/* */", "#", "--"],
            correct: 2,
            explanation: "In Python, the # symbol is used for single-line comments."
        },
        {
            question: "What is the output of: console.log(typeof [])?",
            question_id: "Apa output dari: console.log(typeof [])?",
            options: ["array", "object", "list", "undefined"],
            correct: 1,
            explanation: "In JavaScript, arrays are technically objects, so typeof [] returns 'object'."
        },
        {
            question: "Which tag is used for the largest heading in HTML?",
            question_id: "Tag apa yang digunakan untuk heading terbesar di HTML?",
            options: ["<heading>", "<h6>", "<h1>", "<head>"],
            correct: 2,
            explanation: "<h1> is the largest heading tag, <h6> is the smallest."
        },
        {
            question: "What does 'print()' do in Python?",
            question_id: "Apa fungsi 'print()' di Python?",
            options: ["Prints a document", "Displays output to console", "Creates a variable", "Imports a module"],
            correct: 1,
            explanation: "print() displays/outputs text or values to the console/terminal."
        },
        {
            question: "Which is NOT a JavaScript data type?",
            question_id: "Mana yang BUKAN tipe data JavaScript?",
            options: ["String", "Boolean", "Float", "Undefined"],
            correct: 2,
            explanation: "JavaScript has Number (not separate Float/Integer), String, Boolean, etc."
        },
        {
            question: "What does the '===' operator do in JavaScript?",
            question_id: "Apa yang dilakukan operator '===' di JavaScript?",
            options: ["Assigns a value", "Compares value only", "Compares value and type", "Mathematical equality"],
            correct: 2,
            explanation: "'===' checks both value AND data type (strict equality)."
        }
    ],
    math: [
        {
            question: "What is 15% of 200?",
            question_id: "Berapa 15% dari 200?",
            options: ["15", "20", "30", "35"],
            correct: 2,
            explanation: "15% × 200 = (15/100) × 200 = 30"
        },
        {
            question: "Solve: 3x + 7 = 22",
            question_id: "Selesaikan: 3x + 7 = 22",
            options: ["x = 3", "x = 5", "x = 7", "x = 4"],
            correct: 1,
            explanation: "3x = 22 - 7 = 15, so x = 15/3 = 5"
        },
        {
            question: "What is the area of a circle with radius 7? (use π ≈ 22/7)",
            question_id: "Berapa luas lingkaran dengan jari-jari 7? (gunakan π ≈ 22/7)",
            options: ["44", "154", "88", "196"],
            correct: 1,
            explanation: "A = πr² = (22/7) × 7² = (22/7) × 49 = 154"
        },
        {
            question: "What is √144?",
            question_id: "Berapa √144?",
            options: ["11", "12", "13", "14"],
            correct: 1,
            explanation: "12 × 12 = 144, so √144 = 12"
        },
        {
            question: "If a triangle has angles of 60° and 80°, what is the third angle?",
            question_id: "Jika segitiga memiliki sudut 60° dan 80°, berapa sudut ketiga?",
            options: ["30°", "40°", "50°", "60°"],
            correct: 1,
            explanation: "Sum of angles in triangle = 180°. So: 180 - 60 - 80 = 40°"
        },
        {
            question: "What is 2³ × 2²?",
            question_id: "Berapa 2³ × 2²?",
            options: ["16", "32", "64", "10"],
            correct: 1,
            explanation: "2³ × 2² = 2^(3+2) = 2⁵ = 32"
        },
        {
            question: "Simplify: (x² + 2x) / x",
            question_id: "Sederhanakan: (x² + 2x) / x",
            options: ["x + 2x", "x + 2", "x² + 2", "2x"],
            correct: 1,
            explanation: "(x² + 2x) / x = x²/x + 2x/x = x + 2"
        },
        {
            question: "What is the slope of the line y = 3x + 5?",
            question_id: "Berapa gradien garis y = 3x + 5?",
            options: ["5", "3", "8", "15"],
            correct: 1,
            explanation: "In y = mx + b form, m is the slope. Here m = 3."
        },
        {
            question: "How many sides does a hexagon have?",
            question_id: "Berapa sisi yang dimiliki segi enam?",
            options: ["5", "6", "7", "8"],
            correct: 1,
            explanation: "A hexagon (hexa = 6) has 6 sides."
        },
        {
            question: "What is the value of: 5! (5 factorial)?",
            question_id: "Berapa nilai dari: 5! (5 faktorial)?",
            options: ["25", "60", "120", "720"],
            correct: 2,
            explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120"
        }
    ]
};

// Mixed quiz combines questions from all categories
quizData.mixed = [...quizData.english, ...quizData.coding, ...quizData.math];
