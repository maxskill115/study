// ===== CÀI ĐẶT ỨNG DỤNG =====
const settings = {
    levels: ['unit'],           // Mảng: cho phép chọn nhiều mức độ
    problemType: 'quick-math',  // Dạng toán: 'quick-math', 'find-x', 'word-problem'
    difficulties: ['no-carry'], // Mảng: cho phép chọn nhiều độ khó
    operations: ['add'],        // Mảng: cho phép chọn nhiều phép tính
    mode: 'view',
    highlightEnabled: true,     // Bật/tắt highlight cho toán đố
    examHighlightEnabled: false // Tắt mặc định trong bài thi
};

// ===== DANH SÁCH CÁC GIÁ TRỊ HỢP LỆ =====
const VALID_LEVELS = ['unit', 'tens', 'hundreds', 'thousands'];
const VALID_PROBLEM_TYPES = ['quick-math', 'find-x', 'word-problem'];
const VALID_DIFFICULTIES = ['no-carry', 'carry'];
const VALID_OPERATIONS = ['add', 'subtract', 'multiply', 'divide'];

// ===== DỮ LIỆU CHO TOÁN ĐỐ =====
const WORD_PROBLEM_DATA = {
    names: [
        "Minh", "Lan", "Hùng", "Mai", "Nam", "Hoa", "Dũng", "Linh",
        "Tuấn", "Nga", "Bình", "Thu", "Hải", "An", "Đức", "Chi"
    ],
    items: [
        "quả táo", "cái kẹo", "bông hoa", "quyển sách", "chiếc bút", 
        "viên bi", "cái bánh", "quả cam", "chiếc xe", "con tem",
        "cây bút chì", "quyển vở", "quả bóng", "con thú", "cái ly",
        "chiếc lá", "viên đá", "hạt cườm", "cây nến", "quả trứng"
    ],
    templates: {
        add: [
            "{A} có {x} {item}, {B} cho thêm {y} {item}. Hỏi {A} có tất cả bao nhiêu {item}?",
            "{A} có {x} {item}, đi mua thêm {y} {item}. Hỏi {A} có tất cả bao nhiêu {item}?",
            "{A} có {x} {item}, nhặt được thêm {y} {item}. Hỏi {A} có tất cả bao nhiêu {item}?",
            "Sáng {A} có {x} {item}, chiều được tặng thêm {y} {item}. Hỏi {A} có tất cả bao nhiêu {item}?",
            "Hôm qua {A} có {x} {item}, hôm nay làm thêm được {y} {item}. Hỏi {A} có tất cả bao nhiêu {item}?",
            "{A} và {B} gộp {item} lại. {A} có {x} {item}, {B} có {y} {item}. Hỏi cả hai có tất cả bao nhiêu {item}?",
            "Trong rổ có {x} {item}, {A} bỏ thêm {y} {item} vào rổ. Hỏi trong rổ có bao nhiêu {item}?"
        ],
        subtract: [
            "{A} có {x} {item}, {A} cho {B} {y} {item}. Hỏi {A} còn lại bao nhiêu {item}?",
            "{A} có {x} {item}, ăn mất {y} {item}. Hỏi {A} còn lại bao nhiêu {item}?",
            "{A} có {x} {item}, làm mất {y} {item}. Hỏi {A} còn lại bao nhiêu {item}?",
            "{A} có {x} {item}, bán đi {y} {item}. Hỏi {A} còn lại bao nhiêu {item}?",
            "{A} có {x} {item}, tặng {B} {y} {item}. Hỏi {A} còn lại bao nhiêu {item}?",
            "Trong hộp có {x} {item}, {A} lấy ra {y} {item}. Hỏi trong hộp còn lại bao nhiêu {item}?",
            "{A} có {x} {item}, dùng đi {y} {item}. Hỏi {A} còn lại bao nhiêu {item}?"
        ],
        multiply: [
            "{A} có {x} túi, mỗi túi có {y} {item}. Hỏi {A} có tất cả bao nhiêu {item}?",
            "Có {x} hàng, mỗi hàng có {y} {item}. Hỏi có tất cả bao nhiêu {item}?",
            "{A} mua {x} hộp, mỗi hộp có {y} {item}. Hỏi {A} có tất cả bao nhiêu {item}?",
            "Lớp có {x} bàn, mỗi bàn có {y} {item}. Hỏi lớp có tất cả bao nhiêu {item}?",
            "{A} làm được {y} {item} mỗi ngày, làm trong {x} ngày. Hỏi {A} làm được tất cả bao nhiêu {item}?",
            "{A} cho {x} bạn, mỗi bạn {y} {item}. Hỏi {A} phát tất cả bao nhiêu {item}?",
            "Có {x} đĩa, mỗi đĩa có {y} {item}. Hỏi có tất cả bao nhiêu {item}?"
        ],
        divide: [
            "{A} có {x} {item}, chia đều cho {y} bạn. Hỏi mỗi bạn được bao nhiêu {item}?",
            "{A} có {x} {item}, xếp đều vào {y} hộp. Hỏi mỗi hộp có bao nhiêu {item}?",
            "{A} có {x} {item}, chia đều vào {y} túi. Hỏi mỗi túi có bao nhiêu {item}?",
            "Chia {x} {item} cho {y} người. Hỏi mỗi người được bao nhiêu {item}?",
            "{A} xếp {x} {item} thành {y} hàng đều nhau. Hỏi mỗi hàng có bao nhiêu {item}?",
            "{A} có {x} {item}, chia đều cho {y} nhóm. Hỏi mỗi nhóm được bao nhiêu {item}?",
            "{A} phân phát {x} {item} cho {y} em. Hỏi mỗi em được bao nhiêu {item}?"
        ]
    },
    highlightRules: {
        add: {
            keywords: ["cho thêm", "mua thêm", "nhặt được thêm", "được tặng thêm", "làm thêm được", "gộp", "bỏ thêm"],
            question: ["có tất cả bao nhiêu"]
        },
        subtract: {
            keywords: ["cho", "ăn mất", "uống mất", "làm mất", "bán đi", "tặng", "lấy ra", "dùng đi"],
            question: ["còn lại bao nhiêu"]
        },
        multiply: {
            keywords: ["mỗi", "mỗi ngày", "mỗi hàng", "mỗi túi", "mỗi hộp", "mỗi bàn"],
            question: ["có tất cả bao nhiêu"]
        },
        divide: {
            keywords: ["chia đều", "xếp đều", "phân phát", "chia"],
            question: ["mỗi bạn được bao nhiêu", "mỗi hộp có bao nhiêu", "mỗi túi có bao nhiêu", 
                       "mỗi người được bao nhiêu", "mỗi hàng có bao nhiêu", "mỗi nhóm được bao nhiêu", "mỗi em được bao nhiêu"]
        }
    }
};

let displaySettings = {
    fontScale: 100,
    primaryColor: '#88ccff',
    secondaryColor: '#ffd700',
    correctColor: '#00ff88'
};

// ===== ÂM THANH =====
const sounds = {
    click: new Audio('music/Click.wav'),
    bgMusic: new Audio('music/nhacnen.mp3'),
    success: new Audio('music/thanhcong.wav'),
    failure: new Audio('music/thatbai.wav')
};

// Cài đặt nhạc nền
sounds.bgMusic.loop = true;
sounds.bgMusic.volume = 0.5; // 50% âm lượng

// Hàm phát âm thanh click
function playClickSound() {
    sounds.click.currentTime = 0;
    sounds.click.play().catch(e => console.log('Audio play failed:', e));
}

// Hàm phát âm thanh thành công
function playSuccessSound() {
    sounds.success.currentTime = 0;
    sounds.success.play().catch(e => console.log('Audio play failed:', e));
}

// Hàm phát âm thanh thất bại
function playFailureSound() {
    sounds.failure.currentTime = 0;
    sounds.failure.play().catch(e => console.log('Audio play failed:', e));
}

// Cập nhật hiển thị âm lượng
function updateVolumeDisplay() {
    const volumePercent = Math.round(sounds.bgMusic.volume * 100);
    document.getElementById('volume-display').textContent = volumePercent + '%';
}

let currentProblem = {
    num1: 0,
    num2: 0,
    answer: 0,
    operator: '+'
};

let problemCount = 0;

// ===== CHẾ ĐỘ THI =====
let examSettings = {
    totalQuestions: 10
};
let examCurrentIndex = 0;
let examProblems = [];
let examUserAnswers = [];

// ===== KHỞI TẠO =====
document.addEventListener('DOMContentLoaded', () => {
    loadDisplaySettings();
    initOptionButtons();
    initControlButtons();
    initDisplaySettings();
    initExamSettings();
    
    // Phát nhạc nền khi trang được tải
    // Một số trình duyệt yêu cầu tương tác người dùng trước khi phát âm thanh
    document.body.addEventListener('click', () => {
        if (sounds.bgMusic.paused) {
            sounds.bgMusic.play().catch(e => console.log('Background music play failed:', e));
        }
    }, { once: true });
    
    // Thêm âm thanh click cho tất cả các nút
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', playClickSound);
    });
});

// ===== LƯU/TẢI CÀI ĐẶT =====
function loadDisplaySettings() {
    const saved = localStorage.getItem('displaySettings');
    if (saved) {
        displaySettings = JSON.parse(saved);
        applyDisplaySettings();
    }
}

function saveDisplaySettings() {
    localStorage.setItem('displaySettings', JSON.stringify(displaySettings));
}

function applyDisplaySettings() {
    const root = document.documentElement;
    root.style.setProperty('--font-scale', displaySettings.fontScale / 100);
    root.style.setProperty('--primary-color', displaySettings.primaryColor);
    root.style.setProperty('--secondary-color', displaySettings.secondaryColor);
    root.style.setProperty('--correct-color', displaySettings.correctColor);
    
    document.getElementById('font-size-display').textContent = displaySettings.fontScale + '%';
    document.getElementById('primary-color').value = displaySettings.primaryColor;
    document.getElementById('secondary-color').value = displaySettings.secondaryColor;
    document.getElementById('correct-color').value = displaySettings.correctColor;
}

// ===== TOGGLE CÀI ĐẶT GIAO DIỆN =====
const defaultDisplaySettings = {
    fontScale: 100,
    primaryColor: '#88ccff',
    secondaryColor: '#ffd700',
    correctColor: '#00ff88'
};

// ===== XỬ LÝ CÀI ĐẶT GIAO DIỆN =====
function initDisplaySettings() {
    // Nút toggle hiển thị cài đặt
    document.getElementById('toggle-settings-btn').addEventListener('click', () => {
        const settingsPanel = document.getElementById('display-settings');
        const toggleBtn = document.getElementById('toggle-settings-btn');
        settingsPanel.classList.toggle('hidden');
        toggleBtn.classList.toggle('active');
    });
    
    // Nút reset về mặc định
    document.getElementById('reset-settings-btn').addEventListener('click', () => {
        if (confirm('Khôi phục tất cả cài đặt giao diện về mặc định?')) {
            displaySettings = { ...defaultDisplaySettings };
            applyDisplaySettings();
            saveDisplaySettings();
        }
    });
    
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            if (action === 'increase' && displaySettings.fontScale < 150) {
                displaySettings.fontScale += 10;
                applyDisplaySettings();
                saveDisplaySettings();
            } else if (action === 'decrease' && displaySettings.fontScale > 70) {
                displaySettings.fontScale -= 10;
                applyDisplaySettings();
                saveDisplaySettings();
            } else if (action === 'volume-increase' && sounds.bgMusic.volume < 1) {
                sounds.bgMusic.volume = Math.min(1, sounds.bgMusic.volume + 0.1);
                updateVolumeDisplay();
            } else if (action === 'volume-decrease' && sounds.bgMusic.volume > 0) {
                sounds.bgMusic.volume = Math.max(0, sounds.bgMusic.volume - 0.1);
                updateVolumeDisplay();
            }
        });
    });

    document.getElementById('primary-color').addEventListener('input', (e) => {
        displaySettings.primaryColor = e.target.value;
        applyDisplaySettings();
        saveDisplaySettings();
    });

    document.getElementById('secondary-color').addEventListener('input', (e) => {
        displaySettings.secondaryColor = e.target.value;
        applyDisplaySettings();
        saveDisplaySettings();
    });

    document.getElementById('correct-color').addEventListener('input', (e) => {
        displaySettings.correctColor = e.target.value;
        applyDisplaySettings();
        saveDisplaySettings();
    });
}

// ===== XỬ LÝ NÚT LỰA CHỌN (MULTI-SELECT) =====
function initOptionButtons() {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const setting = btn.dataset.setting;
            const value = btn.dataset.value;
            
            // mode và problemType là single select
            if (setting === 'mode' || setting === 'problemType') {
                settings[setting] = value;
                document.querySelectorAll(`[data-setting="${setting}"]`).forEach(sib => {
                    sib.classList.remove('active');
                });
                btn.classList.add('active');
            } else {
                // Multi-select cho levels, difficulties, operations
                const settingKey = getSettingKey(setting);
                toggleMultiSelect(settingKey, value, btn);
            }
        });
    });
}

// ===== CHUYỂN ĐỔI TÊN SETTING =====
function getSettingKey(setting) {
    const map = {
        'level': 'levels',
        'difficulty': 'difficulties',
        'operation': 'operations'
    };
    return map[setting] || setting;
}

// ===== XỬ LÝ MULTI-SELECT =====
function toggleMultiSelect(settingKey, value, btn) {
    const arr = settings[settingKey];
    const index = arr.indexOf(value);
    
    if (index > -1) {
        // Đã chọn -> bỏ chọn (nhưng phải còn ít nhất 1)
        if (arr.length > 1) {
            arr.splice(index, 1);
            btn.classList.remove('active');
        }
    } else {
        // Chưa chọn -> thêm vào
        arr.push(value);
        btn.classList.add('active');
    }
}

// ===== XỬ LÝ NÚT ĐIỀU KHIỂN =====
function initControlButtons() {
    document.getElementById('start-btn').addEventListener('click', startPractice);
    document.getElementById('exam-btn').addEventListener('click', startExam);
    document.getElementById('back-btn').addEventListener('click', goHome);
    document.getElementById('exam-back-btn').addEventListener('click', confirmExitExam);
    document.getElementById('show-answer-btn').addEventListener('click', showAnswer);
    document.getElementById('check-btn').addEventListener('click', checkAnswer);
    document.getElementById('next-btn').addEventListener('click', nextProblem);
    document.getElementById('home-btn').addEventListener('click', goHome);
    
    // Toggle highlight button
    document.getElementById('toggle-highlight-btn').addEventListener('click', toggleHighlight);
    document.getElementById('exam-toggle-highlight-btn').addEventListener('click', toggleExamHighlight);
    
    // Exam navigation
    document.getElementById('exam-prev-btn').addEventListener('click', examPrevQuestion);
    document.getElementById('exam-next-btn').addEventListener('click', examNextQuestion);
    
    // Review screen
    document.getElementById('review-back-btn').addEventListener('click', () => {
        showScreen('exam-screen');
        displayExamQuestion();
    });
    document.getElementById('submit-exam-btn').addEventListener('click', confirmSubmitExam);
    
    // Enter key
    document.getElementById('user-answer').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
    document.getElementById('exam-user-answer').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') examNextQuestion();
    });

    // Only allow numbers and minus sign
    document.getElementById('user-answer').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9-]/g, '');
    });
    document.getElementById('exam-user-answer').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9-]/g, '');
    });
}

// ===== XỬ LÝ CÀI ĐẶT BÀI THI =====
function initExamSettings() {
    document.querySelectorAll('.size-btn').forEach(btn => {
        const action = btn.dataset.action;
        if (action === 'exam-increase' || action === 'exam-decrease') {
            btn.addEventListener('click', () => {
                if (action === 'exam-increase' && examSettings.totalQuestions < 50) {
                    examSettings.totalQuestions += 5;
                } else if (action === 'exam-decrease' && examSettings.totalQuestions > 5) {
                    examSettings.totalQuestions -= 5;
                }
                document.getElementById('exam-count-display').textContent = examSettings.totalQuestions;
            });
        }
    });
}

// ===== CHUYỂN MÀN HÌNH =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function goHome() {
    showScreen('home-screen');
    problemCount = 0;
}

// ===== TOGGLE HIGHLIGHT =====
function toggleHighlight() {
    settings.highlightEnabled = !settings.highlightEnabled;
    const toggleBtn = document.getElementById('toggle-highlight-btn');
    
    if (settings.highlightEnabled) {
        toggleBtn.classList.add('active');
    } else {
        toggleBtn.classList.remove('active');
    }
    
    // Refresh current problem nếu là toán đố
    if (currentProblem.problemType === 'word-problem') {
        const wordProblemEl = document.getElementById('word-problem-text');
        const highlightedText = highlightWordProblem(
            currentProblem.questionText,
            currentProblem.operation,
            currentProblem.num1,
            currentProblem.num2,
            currentProblem.item
        );
        wordProblemEl.innerHTML = highlightedText;
    }
}

function toggleExamHighlight() {
    settings.examHighlightEnabled = !settings.examHighlightEnabled;
    const toggleBtn = document.getElementById('exam-toggle-highlight-btn');
    
    if (settings.examHighlightEnabled) {
        toggleBtn.classList.add('active');
    } else {
        toggleBtn.classList.remove('active');
    }
    
    // Refresh màn hình bài thi
    displayExamQuestion();
}

function confirmExitExam() {
    if (confirm('Bạn có chắc muốn thoát bài thi? Kết quả sẽ không được lưu.')) {
        goHome();
    }
}

// ===== BẮT ĐẦU LUYỆN TẬP =====
function startPractice() {
    problemCount = 0;
    showScreen('practice-screen');
    
    if (settings.mode === 'view') {
        document.getElementById('mode-view').classList.remove('hidden');
        document.getElementById('mode-input').classList.add('hidden');
    } else {
        document.getElementById('mode-view').classList.add('hidden');
        document.getElementById('mode-input').classList.remove('hidden');
    }
    
    generateProblem();
}

// ===== BẮT ĐẦU BÀI THI =====
function startExam() {
    examCurrentIndex = 0;
    examProblems = [];
    examUserAnswers = [];
    
    // Sinh tất cả bài toán
    for (let i = 0; i < examSettings.totalQuestions; i++) {
        examProblems.push(generateExamProblem());
        examUserAnswers.push(null); // null = chưa làm
    }
    
    document.getElementById('exam-total').textContent = examSettings.totalQuestions;
    showScreen('exam-screen');
    displayExamQuestion();
}

// ===== SINH BÀI TOÁN CHO BÀI THI =====
function generateExamProblem() {
    return generateMathProblem();
}

// ===== HÀM SINH BÀI TOÁN CHÍNH =====
function generateMathProblem() {
    // Kiểm tra dạng toán
    if (settings.problemType === 'find-x') {
        return generateFindXProblem();
    } else if (settings.problemType === 'word-problem') {
        return generateWordProblem();
    } else {
        // quick-math
        return generateQuickMathProblem();
    }
}

// ===== SINH BÀI TOÁN TÍNH NHANH =====
function generateQuickMathProblem() {
    // Random chọn từ các lựa chọn đã chọn
    const level = randomFromArray(settings.levels);
    const difficulty = randomFromArray(settings.difficulties);
    const operation = randomFromArray(settings.operations);
    
    // Gọi hàm sinh số dựa trên level, difficulty, operation
    const { num1, num2 } = generateNumbers(level, difficulty, operation);
    
    const operator = getOperatorSymbol(operation);
    const answer = calculateAnswer(num1, num2, operation);
    
    return { num1, num2, answer, operator, problemType: 'quick-math' };
}

// ===== SINH BÀI TOÁN TÌM X =====
function generateFindXProblem() {
    // Random chọn từ các lựa chọn đã chọn
    const level = randomFromArray(settings.levels);
    const difficulty = randomFromArray(settings.difficulties);
    const operation = randomFromArray(settings.operations);
    
    // Sinh 2 số bình thường
    let { num1, num2 } = generateNumbers(level, difficulty, operation);
    
    // Tính kốt quả
    const result = calculateAnswer(num1, num2, operation);
    
    // Random vị trí của X: 'num1', 'num2', hoặc 'result'
    const positions = ['num1', 'num2', 'result'];
    const xPosition = randomFromArray(positions);
    
    const operator = getOperatorSymbol(operation);
    let answer; // Đáp án là giá trị của X
    let displayNum1, displayNum2, displayResult;
    
    if (xPosition === 'num1') {
        // X + num2 = result hoặc X - num2 = result, ...
        answer = num1;
        displayNum1 = 'X';
        displayNum2 = num2;
        displayResult = result;
    } else if (xPosition === 'num2') {
        // num1 + X = result hoặc num1 - X = result, ...
        answer = num2;
        displayNum1 = num1;
        displayNum2 = 'X';
        displayResult = result;
    } else {
        // num1 + num2 = X
        answer = result;
        displayNum1 = num1;
        displayNum2 = num2;
        displayResult = 'X';
    }
    
    // Đảm bảo X là số tự nhiên không âm
    // Nếu operation là subtract và X ở num2, cần kiểm tra
    if (operation === 'subtract' && xPosition === 'num2' && num1 < num2) {
        // Hoán đổi để tránh X âm
        const temp = num1;
        num1 = num2;
        num2 = temp;
        displayNum1 = num1;
        displayNum2 = 'X';
        answer = num2;
        displayResult = num1 - num2;
    }
    
    // Kiểm tra X không âm và không phải số thập phân
    if (answer < 0 || !Number.isInteger(answer)) {
        // Sinh lại bài toán
        return generateFindXProblem();
    }
    
    // Với phép chia, đảm bảo kết quả là số nguyên
    if (operation === 'divide') {
        if (xPosition === 'result' && result !== Math.floor(result)) {
            return generateFindXProblem();
        }
        if (xPosition === 'num1' && num1 % num2 !== 0) {
            return generateFindXProblem();
        }
        if (xPosition === 'num2' && num1 % answer !== 0) {
            return generateFindXProblem();
        }
    }
    
    return {
        num1: displayNum1,
        num2: displayNum2,
        answer: answer,
        operator: operator,
        result: displayResult,
        problemType: 'find-x',
        xPosition: xPosition
    };
}

// ===== HÀM HIGHLIGHT CÂU HỎI TOÁN ĐỐ =====
function highlightWordProblem(text, operation, num1, num2, item) {
    if (!settings.highlightEnabled) {
        return text; // Không highlight nếu tắt
    }
    
    const rules = WORD_PROBLEM_DATA.highlightRules[operation];
    if (!rules) return text;
    
    let highlightedText = text;
    
    // Highlight số {x} và {y}
    highlightedText = highlightedText.replace(new RegExp(`\\b${num1}\\b`, 'g'), `<span class="highlight">${num1}</span>`);
    highlightedText = highlightedText.replace(new RegExp(`\\b${num2}\\b`, 'g'), `<span class="highlight">${num2}</span>`);
    
    // Highlight item (vật phẩm)
    if (item) {
        const regex = new RegExp(`(${item})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
    }
    
    // Highlight keywords
    rules.keywords.forEach(keyword => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
    });
    
    // Highlight question phrases
    rules.question.forEach(phrase => {
        const regex = new RegExp(`(${phrase})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
    });
    
    return highlightedText;
}

// ===== SINH BÀI TOÁN ĐỐ =====
function generateWordProblem() {
    // Random chọn từ các lựa chọn đã chọn
    const level = randomFromArray(settings.levels);
    const difficulty = randomFromArray(settings.difficulties);
    const operation = randomFromArray(settings.operations);
    
    // Sinh 2 số dựa trên level, difficulty, operation
    const { num1, num2 } = generateNumbers(level, difficulty, operation);
    
    // Tính kết quả
    const answer = calculateAnswer(num1, num2, operation);
    const operator = getOperatorSymbol(operation);
    
    // Random chọn tên, vật phẩm và template
    const nameA = randomFromArray(WORD_PROBLEM_DATA.names);
    let nameB = randomFromArray(WORD_PROBLEM_DATA.names);
    // Đảm bảo 2 tên khác nhau
    while (nameB === nameA) {
        nameB = randomFromArray(WORD_PROBLEM_DATA.names);
    }
    
    const item = randomFromArray(WORD_PROBLEM_DATA.items);
    const templates = WORD_PROBLEM_DATA.templates[operation];
    const template = randomFromArray(templates);
    
    // Thay thế các biến trong template
    const questionText = template
        .replace(/{A}/g, nameA)
        .replace(/{B}/g, nameB)
        .replace(/{x}/g, num1)
        .replace(/{y}/g, num2)
        .replace(/{item}/g, item);
    
    return {
        num1: num1,
        num2: num2,
        answer: answer,
        operator: operator,
        problemType: 'word-problem',
        questionText: questionText,
        operation: operation  // Lưu operation để biết quy tắc highlight
    };
}

// ===== LẤY KÝ HIỆU PHÉP TÍNH =====
function getOperatorSymbol(operation) {
    const symbols = {
        'add': '+',
        'subtract': '-',
        'multiply': '×',  // Cho sau này
        'divide': '÷'     // Cho sau này
    };
    return symbols[operation] || '+';
}

// ===== TÍNH ĐÁP ÁN =====
function calculateAnswer(num1, num2, operation) {
    switch (operation) {
        case 'add': return num1 + num2;
        case 'subtract': return num1 - num2;
        case 'multiply': return num1 * num2;  // Cho sau này
        case 'divide': return num1 / num2;    // Cho sau này
        default: return num1 + num2;
    }
}

// ===== SINH SỐ DỰA TRÊN LEVEL, DIFFICULTY, OPERATION =====
function generateNumbers(level, difficulty, operation) {
    const generators = {
        'unit': generateUnitNumbers,
        'tens': generateTensNumbers,
        'hundreds': generateHundredsNumbers,
        'thousands': generateThousandsNumbers
    };
    
    const generator = generators[level] || generators['unit'];
    return generator(difficulty, operation);
}

// ===== SINH SỐ HÀNG ĐƠN VỊ =====
function generateUnitNumbers(difficulty, operation) {
    let num1, num2;
    
    if (operation === 'add') {
        if (difficulty === 'no-carry') {
            // Cộng không nhớ: tổng <= 9
            num1 = randomInt(1, 8);
            num2 = randomInt(1, 9 - num1);
        } else {
            // Cộng có nhớ: tổng >= 10
            num1 = randomInt(2, 9);
            num2 = randomInt(Math.max(1, 10 - num1), Math.min(9, 18 - num1));
        }
    } else if (operation === 'subtract') {
        if (difficulty === 'no-carry') {
            // Trừ không nhớ: num1 >= num2
            num1 = randomInt(2, 9);
            num2 = randomInt(1, num1);
        } else {
            // Trừ có nhớ: cần mượn
            num1 = randomInt(11, 18);
            num2 = randomInt(Math.max(2, num1 - 9), 9);
        }
    } else if (operation === 'multiply') {
        // Nhân đơn giản: bảng cửu chương
        num1 = randomInt(2, 9);
        num2 = randomInt(2, 9);
    } else if (operation === 'divide') {
        // Chia hết: tạo số chia trước, sau đó nhân để được số bị chia
        num2 = randomInt(2, 9);
        const quotient = randomInt(2, 9);
        num1 = num2 * quotient;
    }
    
    return { num1, num2 };
}

// ===== SINH SỐ HÀNG CHỤC =====
function generateTensNumbers(difficulty, operation) {
    let num1, num2;
    
    if (operation === 'add') {
        if (difficulty === 'no-carry') {
            let unit1 = randomInt(0, 4);
            let unit2 = randomInt(0, 9 - unit1);
            let tens1 = randomInt(1, 8);
            let tens2 = randomInt(1, 9 - tens1);
            num1 = tens1 * 10 + unit1;
            num2 = tens2 * 10 + unit2;
        } else {
            let unit1 = randomInt(2, 9);
            let unit2 = randomInt(Math.max(1, 10 - unit1), 9);
            let tens1 = randomInt(1, 7);
            let tens2 = randomInt(1, 8 - tens1);
            num1 = tens1 * 10 + unit1;
            num2 = tens2 * 10 + unit2;
        }
    } else if (operation === 'subtract') {
        if (difficulty === 'no-carry') {
            let unit1 = randomInt(3, 9);
            let unit2 = randomInt(0, unit1);
            let tens1 = randomInt(2, 9);
            let tens2 = randomInt(1, tens1 - 1);
            num1 = tens1 * 10 + unit1;
            num2 = tens2 * 10 + unit2;
        } else {
            let unit1 = randomInt(0, 6);
            let unit2 = randomInt(unit1 + 1, 9);
            let tens1 = randomInt(3, 9);
            let tens2 = randomInt(1, tens1 - 1);
            num1 = tens1 * 10 + unit1;
            num2 = tens2 * 10 + unit2;
        }
    } else if (operation === 'multiply') {
        // Nhân: một số 1 chữ số với số trong khoảng 10-99
        num1 = randomInt(2, 9);
        num2 = randomInt(10, 99);
    } else if (operation === 'divide') {
        // Chia hết: số hàng chục chia cho 1 chữ số
        num2 = randomInt(2, 9);
        const quotient = randomInt(2, 15);
        num1 = num2 * quotient;
    }
    
    return { num1, num2 };
}

// ===== SINH SỐ HÀNG TRĂM =====
function generateHundredsNumbers(difficulty, operation) {
    let num1, num2;
    
    if (operation === 'add') {
        if (difficulty === 'no-carry') {
            let unit1 = randomInt(0, 4);
            let unit2 = randomInt(0, 9 - unit1);
            let tens1 = randomInt(0, 4);
            let tens2 = randomInt(0, 9 - tens1);
            let hund1 = randomInt(1, 8);
            let hund2 = randomInt(1, 9 - hund1);
            num1 = hund1 * 100 + tens1 * 10 + unit1;
            num2 = hund2 * 100 + tens2 * 10 + unit2;
        } else {
            let unit1 = randomInt(2, 9);
            let unit2 = randomInt(Math.max(1, 10 - unit1), 9);
            let tens1 = randomInt(0, 8);
            let tens2 = randomInt(0, 9 - tens1);
            let hund1 = randomInt(1, 7);
            let hund2 = randomInt(1, 8 - hund1);
            num1 = hund1 * 100 + tens1 * 10 + unit1;
            num2 = hund2 * 100 + tens2 * 10 + unit2;
        }
    } else if (operation === 'subtract') {
        if (difficulty === 'no-carry') {
            let unit1 = randomInt(3, 9);
            let unit2 = randomInt(0, unit1);
            let tens1 = randomInt(3, 9);
            let tens2 = randomInt(0, tens1);
            let hund1 = randomInt(2, 9);
            let hund2 = randomInt(1, hund1 - 1);
            num1 = hund1 * 100 + tens1 * 10 + unit1;
            num2 = hund2 * 100 + tens2 * 10 + unit2;
        } else {
            let unit1 = randomInt(0, 6);
            let unit2 = randomInt(unit1 + 1, 9);
            let tens1 = randomInt(0, 8);
            let tens2 = randomInt(0, 9 - tens1);
            let hund1 = randomInt(3, 9);
            let hund2 = randomInt(1, hund1 - 1);
            num1 = hund1 * 100 + tens1 * 10 + unit1;
            num2 = hund2 * 100 + tens2 * 10 + unit2;
        }
    } else if (operation === 'multiply') {
        // Nhân: số trong khoảng 10-99 với nhau
        num1 = randomInt(10, 99);
        num2 = randomInt(10, 99);
    } else if (operation === 'divide') {
        // Chia hết: số hàng trăm chia cho số 10-99
        num2 = randomInt(10, 99);
        const quotient = randomInt(2, 15);
        num1 = num2 * quotient;
    }
    
    return { num1, num2 };
}

// ===== SINH SỐ HÀNG NGHÌN =====
function generateThousandsNumbers(difficulty, operation) {
    let num1, num2;
    
    if (operation === 'add') {
        if (difficulty === 'no-carry') {
            let unit1 = randomInt(0, 4);
            let unit2 = randomInt(0, 9 - unit1);
            let tens1 = randomInt(0, 4);
            let tens2 = randomInt(0, 9 - tens1);
            let hund1 = randomInt(0, 4);
            let hund2 = randomInt(0, 9 - hund1);
            let thou1 = randomInt(1, 8);
            let thou2 = randomInt(1, 9 - thou1);
            num1 = thou1 * 1000 + hund1 * 100 + tens1 * 10 + unit1;
            num2 = thou2 * 1000 + hund2 * 100 + tens2 * 10 + unit2;
        } else {
            let unit1 = randomInt(2, 9);
            let unit2 = randomInt(Math.max(1, 10 - unit1), 9);
            let tens1 = randomInt(0, 8);
            let tens2 = randomInt(0, 9 - tens1);
            let hund1 = randomInt(0, 8);
            let hund2 = randomInt(0, 9 - hund1);
            let thou1 = randomInt(1, 7);
            let thou2 = randomInt(1, 8 - thou1);
            num1 = thou1 * 1000 + hund1 * 100 + tens1 * 10 + unit1;
            num2 = thou2 * 1000 + hund2 * 100 + tens2 * 10 + unit2;
        }
    } else if (operation === 'subtract') {
        if (difficulty === 'no-carry') {
            let unit1 = randomInt(3, 9);
            let unit2 = randomInt(0, unit1);
            let tens1 = randomInt(3, 9);
            let tens2 = randomInt(0, tens1);
            let hund1 = randomInt(3, 9);
            let hund2 = randomInt(0, hund1);
            let thou1 = randomInt(2, 9);
            let thou2 = randomInt(1, thou1 - 1);
            num1 = thou1 * 1000 + hund1 * 100 + tens1 * 10 + unit1;
            num2 = thou2 * 1000 + hund2 * 100 + tens2 * 10 + unit2;
        } else {
            let unit1 = randomInt(0, 6);
            let unit2 = randomInt(unit1 + 1, 9);
            let tens1 = randomInt(0, 8);
            let tens2 = randomInt(0, 9 - tens1);
            let hund1 = randomInt(0, 8);
            let hund2 = randomInt(0, 9 - hund1);
            let thou1 = randomInt(3, 9);
            let thou2 = randomInt(1, thou1 - 1);
            num1 = thou1 * 1000 + hund1 * 100 + tens1 * 10 + unit1;
            num2 = thou2 * 1000 + hund2 * 100 + tens2 * 10 + unit2;
        }
    } else if (operation === 'multiply') {
        // Nhân: số hàng trăm với số hàng chục (có số lẻ)
        num1 = randomInt(100, 999);
        num2 = randomInt(10, 99);
    } else if (operation === 'divide') {
        // Chia hết: số hàng nghìn chia cho số 10-999
        num2 = randomInt(10, 99);
        const quotient = randomInt(10, 99);
        num1 = num2 * quotient;
    }
    
    return { num1, num2 };
}

// ===== HIỂN THỊ CÂU HỎI BÀI THI =====
function displayExamQuestion() {
    const problem = examProblems[examCurrentIndex];
    
    document.getElementById('exam-current').textContent = examCurrentIndex + 1;
    
    const num1El = document.getElementById('exam-num1');
    const num2El = document.getElementById('exam-num2');
    const answerEl = document.getElementById('exam-answer-display');
    const wordProblemEl = document.getElementById('exam-word-problem-text');
    const problemAreaEl = document.getElementById('exam-problem-area');
    const highlightBtn = document.getElementById('exam-toggle-highlight-btn');
    
    // Xóa class cũ
    num1El.className = '';
    num2El.className = '';
    answerEl.className = '';
    
    // Hiển thị số và kết quả
    num1El.textContent = problem.num1;
    document.getElementById('exam-operator').textContent = problem.operator;
    num2El.textContent = problem.num2;
    
    // Xử lý theo dạng bài toán
    if (problem.problemType === 'find-x') {
        // Hiển thị result thay vì ?
        answerEl.textContent = problem.result;
        wordProblemEl.innerHTML = '';
        wordProblemEl.classList.add('hidden');
        problemAreaEl.classList.remove('hidden');
        highlightBtn.classList.add('hidden');
        
        // Thêm class x-variable cho phần tử chứa X
        if (problem.num1 === 'X') {
            num1El.classList.add('x-variable');
        } else if (problem.num2 === 'X') {
            num2El.classList.add('x-variable');
        } else if (problem.result === 'X') {
            answerEl.classList.add('x-variable');
        }
    } else if (problem.problemType === 'word-problem') {
        // Ẩn phép tính, chỉ hiển thị câu hỏi
        problemAreaEl.classList.add('hidden');
        highlightBtn.classList.remove('hidden');
        
        // Hiển thị toán đố (có highlight hoặc không)
        if (settings.examHighlightEnabled) {
            const highlightedText = highlightWordProblem(
                problem.questionText,
                problem.operation,
                problem.num1,
                problem.num2,
                problem.item
            );
            wordProblemEl.innerHTML = highlightedText;
        } else {
            wordProblemEl.textContent = problem.questionText;
        }
        wordProblemEl.classList.remove('hidden');
    } else {
        // Quick math
        wordProblemEl.innerHTML = '';
        wordProblemEl.classList.add('hidden');
        problemAreaEl.classList.remove('hidden');
        highlightBtn.classList.add('hidden');
        answerEl.textContent = '?';
        answerEl.classList.add('question-mark');
    }
    
    // Hiển thị đáp án đã nhập (nếu có)
    const userAnswer = examUserAnswers[examCurrentIndex];
    document.getElementById('exam-user-answer').value = userAnswer !== null ? userAnswer : '';
    
    // Cập nhật nút điều hướng
    document.getElementById('exam-prev-btn').disabled = examCurrentIndex === 0;
    
    // Nút tiếp theo / Nộp bài
    const nextBtn = document.getElementById('exam-next-btn');
    if (examCurrentIndex === examSettings.totalQuestions - 1) {
        nextBtn.textContent = 'XEM LẠI & NỘP BÀI 📋';
        nextBtn.style.background = 'linear-gradient(135deg, #c9a227, #e6b800)';
    } else {
        nextBtn.textContent = 'TIẾP THEO →';
        nextBtn.style.background = 'linear-gradient(135deg, #2d6a4f, #40916c)';
    }
    
    // Focus vào ô nhập
    setTimeout(() => {
        document.getElementById('exam-user-answer').focus();
    }, 100);
}

// ===== LƯU ĐÁP ÁN HIỆN TẠI =====
function saveCurrentAnswer() {
    const input = document.getElementById('exam-user-answer').value.trim();
    if (input === '') {
        examUserAnswers[examCurrentIndex] = null;
    } else {
        examUserAnswers[examCurrentIndex] = parseInt(input);
    }
}

// ===== ĐIỀU HƯỚNG BÀI THI =====
function examPrevQuestion() {
    if (examCurrentIndex > 0) {
        saveCurrentAnswer();
        examCurrentIndex--;
        displayExamQuestion();
    }
}

function examNextQuestion() {
    saveCurrentAnswer();
    
    if (examCurrentIndex < examSettings.totalQuestions - 1) {
        examCurrentIndex++;
        displayExamQuestion();
    } else {
        // Đến câu cuối -> Hiển thị trang xem lại
        showReviewScreen();
    }
}

// ===== HIỂN THỊ TRANG XEM LẠI =====
function showReviewScreen() {
    showScreen('review-screen');
    
    // Đếm số câu đã làm / chưa làm
    let doneCount = 0;
    let notDoneCount = 0;
    examUserAnswers.forEach(ans => {
        if (ans !== null) doneCount++;
        else notDoneCount++;
    });
    
    document.getElementById('done-count').textContent = doneCount;
    document.getElementById('not-done-count').textContent = notDoneCount;
    
    // Tạo danh sách câu hỏi
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';
    
    examProblems.forEach((problem, index) => {
        const userAnswer = examUserAnswers[index];
        const item = document.createElement('div');
        item.className = 'review-item';
        item.onclick = () => goToQuestion(index);
        
        const problemText = document.createElement('span');
        problemText.className = 'review-problem';
        
        // Hiển thị bài toán
        if (problem.problemType === 'find-x') {
            if (problem.result === 'X') {
                problemText.textContent = `Câu ${index + 1}: ${problem.num1} ${problem.operator} ${problem.num2} = ?`;
            } else {
                problemText.textContent = `Câu ${index + 1}: ${problem.num1} ${problem.operator} ${problem.num2} = ${problem.result}`;
            }
        } else {
            problemText.textContent = `Câu ${index + 1}: ${problem.num1} ${problem.operator} ${problem.num2} = ?`;
        }
        
        const answerText = document.createElement('span');
        answerText.className = 'review-answer';
        
        if (userAnswer !== null) {
            answerText.classList.add('answered');
            answerText.textContent = `Đáp án: ${userAnswer}`;
        } else {
            answerText.classList.add('not-answered');
            answerText.textContent = 'Chưa làm';
        }
        
        item.appendChild(problemText);
        item.appendChild(answerText);
        reviewList.appendChild(item);
    });
}

// ===== CHUYỂN ĐẾN CÂU HỎI CỤ THỂ =====
function goToQuestion(index) {
    examCurrentIndex = index;
    showScreen('exam-screen');
    displayExamQuestion();
}

// ===== XÁC NHẬN NỘP BÀI =====
function confirmSubmitExam() {
    const notDoneCount = examUserAnswers.filter(ans => ans === null).length;
    
    let message = 'Bạn có chắc chắn muốn nộp bài thi?';
    if (notDoneCount > 0) {
        message = `Còn ${notDoneCount} câu chưa làm. Bạn có chắc chắn muốn nộp bài?`;
    }
    
    if (confirm(message)) {
        showExamResults();
    }
}

// ===== HIỂN THỊ KẾT QUẢ BÀI THI =====
function showExamResults() {
    showScreen('result-screen');
    
    // Tính điểm
    let correctCount = 0;
    let incorrectCount = 0;
    
    examProblems.forEach((problem, index) => {
        const userAnswer = examUserAnswers[index];
        if (userAnswer === problem.answer) {
            correctCount++;
        } else {
            incorrectCount++;
        }
    });
    
    const percent = Math.round((correctCount / examSettings.totalQuestions) * 100);
    
    // Phát âm thanh phù hợp với kết quả
    if (percent >= 50) {
        playSuccessSound();
    } else {
        playFailureSound();
    }
    
    document.getElementById('score-percent').textContent = percent + '%';
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('incorrect-count').textContent = incorrectCount;
    document.getElementById('total-count').textContent = examSettings.totalQuestions;
    
    // Thông điệp
    const resultMessage = document.getElementById('result-message');
    if (percent >= 80) {
        resultMessage.textContent = '🎉 Xuất sắc! Con làm rất giỏi!';
        resultMessage.className = 'result-message excellent';
    } else if (percent >= 50) {
        resultMessage.textContent = '👍 Tốt lắm! Cố gắng thêm nhé!';
        resultMessage.className = 'result-message good';
    } else {
        resultMessage.textContent = '💪 Cần luyện tập thêm! Cố lên nào!';
        resultMessage.className = 'result-message try-again';
    }
    
    // Tạo bảng kết quả chi tiết
    const tableBody = document.getElementById('result-table-body');
    tableBody.innerHTML = '';
    
    examProblems.forEach((problem, index) => {
        const userAnswer = examUserAnswers[index];
        const isCorrect = userAnswer === problem.answer;
        
        const row = document.createElement('tr');
        
        // Cột bài toán
        const problemCell = document.createElement('td');
        problemCell.className = 'problem-col';
        
        if (problem.problemType === 'find-x') {
            if (problem.result === 'X') {
                problemCell.textContent = `${problem.num1} ${problem.operator} ${problem.num2} = X`;
            } else {
                problemCell.textContent = `${problem.num1} ${problem.operator} ${problem.num2} = ${problem.result}`;
            }
        } else {
            problemCell.textContent = `${problem.num1} ${problem.operator} ${problem.num2}`;
        }
        
        // Cột đáp án đúng
        const answerCell = document.createElement('td');
        answerCell.className = 'answer-col';
        answerCell.textContent = problem.answer;
        
        // Cột kết quả
        const resultCell = document.createElement('td');
        if (isCorrect) {
            resultCell.className = 'result-col correct';
            resultCell.innerHTML = '✓';
        } else {
            resultCell.className = 'result-col incorrect';
            if (userAnswer !== null) {
                resultCell.innerHTML = `✗<span class="user-wrong-answer">(Đã nhập: ${userAnswer})</span>`;
            } else {
                resultCell.innerHTML = `✗<span class="user-wrong-answer">(Bỏ trống)</span>`;
            }
        }
        
        row.appendChild(problemCell);
        row.appendChild(answerCell);
        row.appendChild(resultCell);
        tableBody.appendChild(row);
    });
}

// ===== SINH BÀI TOÁN LUYỆN TẬP =====
function generateProblem() {
    problemCount++;
    document.getElementById('problem-number').textContent = problemCount;
    
    resetUI();
    
    // Sử dụng hàm sinh bài toán chung
    const problem = generateMathProblem();
    currentProblem = problem;
    
    // Hiển thị bài toán
    if (problem.problemType === 'word-problem') {
        // Hiển thị toán đố với highlight
        const wordProblemEl = document.getElementById('word-problem-text');
        const highlightedText = highlightWordProblem(
            problem.questionText,
            problem.operation,
            problem.num1,
            problem.num2,
            problem.item
        );
        wordProblemEl.innerHTML = highlightedText;
        wordProblemEl.classList.remove('hidden');
        
        // Hiển thị nút toggle highlight
        const toggleBtn = document.getElementById('toggle-highlight-btn');
        toggleBtn.classList.remove('hidden');
        if (settings.highlightEnabled) {
            toggleBtn.classList.add('active');
        }
        
        // Hiển thị biểu thức (ẩn đi, chỉ dùng cho xem kết quả)
        document.getElementById('num1').textContent = problem.num1;
        document.getElementById('num2').textContent = problem.num2;
        document.getElementById('operator').textContent = problem.operator;
        document.getElementById('answer-display').textContent = '?';
        document.getElementById('answer-display').classList.add('question-mark');
        
        // Ẩn biểu thức toán học, chỉ hiển thị câu hỏi
        document.querySelector('.problem-display').classList.add('hidden');
        
    } else if (problem.problemType === 'find-x') {
        // Ẩn câu hỏi toán đố và nút highlight
        document.getElementById('word-problem-text').classList.add('hidden');
        document.getElementById('toggle-highlight-btn').classList.add('hidden');
        document.querySelector('.problem-display').classList.remove('hidden');
        
        // Hiển thị dạng: num1 operator num2 = result
        const num1El = document.getElementById('num1');
        const num2El = document.getElementById('num2');
        const answerDisplayEl = document.getElementById('answer-display');
        
        // Hiển thị num1
        num1El.textContent = problem.num1;
        if (problem.num1 === 'X') {
            num1El.classList.add('x-variable');
        } else {
            num1El.classList.remove('x-variable', 'x-revealed');
        }
        
        // Hiển thị num2
        num2El.textContent = problem.num2;
        if (problem.num2 === 'X') {
            num2El.classList.add('x-variable');
        } else {
            num2El.classList.remove('x-variable', 'x-revealed');
        }
        
        // Hiển thị operator
        document.getElementById('operator').textContent = problem.operator;
        
        // Hiển thị kết quả
        if (problem.result === 'X') {
            answerDisplayEl.textContent = 'X';
            answerDisplayEl.classList.add('x-variable');
            answerDisplayEl.classList.remove('revealed');
        } else {
            answerDisplayEl.textContent = problem.result;
            answerDisplayEl.classList.remove('x-variable', 'x-revealed', 'revealed');
        }
    } else {
        // Tính nhanh bình thường - xóa các class X và ẩn nút highlight
        document.getElementById('word-problem-text').classList.add('hidden');
        document.getElementById('toggle-highlight-btn').classList.add('hidden');
        document.querySelector('.problem-display').classList.remove('hidden');
        
        const num1El = document.getElementById('num1');
        const num2El = document.getElementById('num2');
        const answerDisplayEl = document.getElementById('answer-display');
        
        num1El.textContent = problem.num1;
        num1El.classList.remove('x-variable', 'x-revealed');
        
        num2El.textContent = problem.num2;
        num2El.classList.remove('x-variable', 'x-revealed');
        
        document.getElementById('operator').textContent = problem.operator;
        
        answerDisplayEl.textContent = '?';
        answerDisplayEl.classList.remove('revealed', 'x-variable', 'x-revealed');
        answerDisplayEl.classList.add('question-mark');
    }
}

// ===== RESET GIAO DIỆN =====
function resetUI() {
    // Xóa tất cả các class liên quan
    document.getElementById('num1').classList.remove('x-variable', 'x-revealed');
    document.getElementById('num2').classList.remove('x-variable', 'x-revealed');
    
    document.getElementById('answer-display').textContent = '?';
    document.getElementById('answer-display').classList.remove('revealed', 'x-variable', 'x-revealed', 'question-mark');
    document.getElementById('user-answer').value = '';
    document.getElementById('feedback-area').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');
    
    document.getElementById('show-answer-btn').disabled = false;
    document.getElementById('check-btn').disabled = false;
    document.getElementById('user-answer').disabled = false;
    
    if (settings.mode === 'input') {
        setTimeout(() => {
            document.getElementById('user-answer').focus();
        }, 100);
    }
}

// ===== CHẾ ĐỘ A: XEM KẾT QUẢ =====
function showAnswer() {
    if (currentProblem.problemType === 'word-problem') {
        // Hiển thị đáp án cho toán đố
        // Hiển thị biểu thức toán học với đáp án
        document.querySelector('.problem-display').classList.remove('hidden');
        document.getElementById('answer-display').textContent = currentProblem.answer;
        document.getElementById('answer-display').classList.add('revealed');
        document.getElementById('answer-display').classList.remove('question-mark');
    } else if (currentProblem.problemType === 'find-x') {
        // Hiển thị giá trị của X với highlight CHỈ ở vị trí X
        if (currentProblem.num1 === 'X') {
            const num1El = document.getElementById('num1');
            num1El.textContent = currentProblem.answer;
            num1El.classList.remove('x-variable');
            num1El.classList.add('x-revealed');
        } else if (currentProblem.num2 === 'X') {
            const num2El = document.getElementById('num2');
            num2El.textContent = currentProblem.answer;
            num2El.classList.remove('x-variable');
            num2El.classList.add('x-revealed');
        } else if (currentProblem.result === 'X') {
            const answerDisplayEl = document.getElementById('answer-display');
            answerDisplayEl.textContent = currentProblem.answer;
            answerDisplayEl.classList.remove('x-variable');
            answerDisplayEl.classList.add('x-revealed');
        }
        // KHÔNG thêm revealed vào answer-display nếu nó không phải X
    } else {
        document.getElementById('answer-display').textContent = currentProblem.answer;
        document.getElementById('answer-display').classList.add('revealed');
        document.getElementById('answer-display').classList.remove('question-mark');
    }
    
    document.getElementById('show-answer-btn').disabled = true;
    document.getElementById('next-btn').classList.remove('hidden');
}

// ===== CHẾ ĐỘ B: KIỂM TRA ĐÁP ÁN =====
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('user-answer').value);
    
    if (isNaN(userAnswer)) {
        alert('Hãy nhập đáp án của con nhé!');
        return;
    }
    
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackMessage = document.getElementById('feedback-message');
    const correctAnswerEl = document.getElementById('correct-answer');
    
    feedbackArea.classList.remove('hidden');
    document.getElementById('check-btn').disabled = true;
    document.getElementById('user-answer').disabled = true;
    
    if (userAnswer === currentProblem.answer) {
        playSuccessSound();
        feedbackMessage.textContent = getCorrectMessage();
        feedbackMessage.className = 'feedback-message correct';
        correctAnswerEl.textContent = '';
        
        // Hiển thị đáp án
        if (currentProblem.problemType === 'word-problem') {
            // Hiển thị biểu thức với đáp án cho toán đố
            document.querySelector('.problem-display').classList.remove('hidden');
            document.getElementById('answer-display').textContent = currentProblem.answer;
            document.getElementById('answer-display').classList.add('revealed');
            document.getElementById('answer-display').classList.remove('question-mark');
        } else if (currentProblem.problemType === 'find-x') {
            if (currentProblem.num1 === 'X') {
                const num1El = document.getElementById('num1');
                num1El.textContent = currentProblem.answer;
                num1El.classList.remove('x-variable');
                num1El.classList.add('x-revealed');
            } else if (currentProblem.num2 === 'X') {
                const num2El = document.getElementById('num2');
                num2El.textContent = currentProblem.answer;
                num2El.classList.remove('x-variable');
                num2El.classList.add('x-revealed');
            } else if (currentProblem.result === 'X') {
                const answerDisplayEl = document.getElementById('answer-display');
                answerDisplayEl.textContent = currentProblem.answer;
                answerDisplayEl.classList.remove('x-variable');
                answerDisplayEl.classList.add('x-revealed');
            }
        } else {
            document.getElementById('answer-display').textContent = currentProblem.answer;
            document.getElementById('answer-display').classList.add('revealed');
            document.getElementById('answer-display').classList.remove('question-mark');
        }
    } else {
        playFailureSound();
        feedbackMessage.textContent = getIncorrectMessage();
        feedbackMessage.className = 'feedback-message incorrect';
        correctAnswerEl.innerHTML = `Đáp án đúng là: <span class="answer-number">${currentProblem.answer}</span>`;
        
        // Hiển thị đáp án
        if (currentProblem.problemType === 'word-problem') {
            // Hiển thị biểu thức với đáp án cho toán đố
            document.querySelector('.problem-display').classList.remove('hidden');
            document.getElementById('answer-display').textContent = currentProblem.answer;
            document.getElementById('answer-display').classList.add('revealed');
            document.getElementById('answer-display').classList.remove('question-mark');
        } else if (currentProblem.problemType === 'find-x') {
            if (currentProblem.num1 === 'X') {
                const num1El = document.getElementById('num1');
                num1El.textContent = currentProblem.answer;
                num1El.classList.remove('x-variable');
                num1El.classList.add('x-revealed');
            } else if (currentProblem.num2 === 'X') {
                const num2El = document.getElementById('num2');
                num2El.textContent = currentProblem.answer;
                num2El.classList.remove('x-variable');
                num2El.classList.add('x-revealed');
            } else if (currentProblem.result === 'X') {
                const answerDisplayEl = document.getElementById('answer-display');
                answerDisplayEl.textContent = currentProblem.answer;
                answerDisplayEl.classList.remove('x-variable');
                answerDisplayEl.classList.add('x-revealed');
            }
        } else {
            document.getElementById('answer-display').textContent = currentProblem.answer;
            document.getElementById('answer-display').classList.add('revealed');
            document.getElementById('answer-display').classList.remove('question-mark');
        }
    }
    
    document.getElementById('next-btn').classList.remove('hidden');
}

// ===== CÂU PHẢN HỒI =====
function getCorrectMessage() {
    const messages = [
        '✓ Đúng rồi! Giỏi lắm! 🌟',
        '✓ Tuyệt vời! Con làm đúng! ⭐',
        '✓ Xuất sắc! Tiếp tục nhé! 🎉',
        '✓ Chính xác! Con thật giỏi! 👏'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

function getIncorrectMessage() {
    const messages = [
        '✗ Chưa đúng, thử lại nhé!',
        '✗ Gần đúng rồi, cố lên nào!',
        '✗ Không sao, xem đáp án và học nhé!',
        '✗ Cố gắng thêm nhé con!'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

// ===== BÀI TIẾP THEO =====
function nextProblem() {
    generateProblem();
}

// ===== HÀM TIỆN ÍCH =====
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
