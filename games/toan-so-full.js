// ===== TOÁN SỐ GAME MODULE - ĐẦY ĐỦ TÍNH NĂNG =====
const ToanSoGame = {
    // Copy toàn bộ settings và data từ app.js gốc
    settings: {
        levels: ['unit'],
        problemType: 'quick-math',
        difficulties: ['no-carry'],
        operations: ['add'],
        mode: 'view',
        highlightEnabled: true,
        examHighlightEnabled: false
    },

    VALID_LEVELS: ['unit', 'tens', 'hundreds', 'thousands'],
    VALID_PROBLEM_TYPES: ['quick-math', 'find-x', 'word-problem'],
    VALID_DIFFICULTIES: ['no-carry', 'carry'],
    VALID_OPERATIONS: ['add', 'subtract', 'multiply', 'divide'],

    WORD_PROBLEM_DATA: {
        names: ["Minh", "Lan", "Hùng", "Mai", "Nam", "Hoa", "Dũng", "Linh", "Tuấn", "Nga", "Bình", "Thu", "Hải", "An", "Đức", "Chi"],
        items: ["quả táo", "cái kẹo", "bông hoa", "quyển sách", "chiếc bút", "viên bi", "cái bánh", "quả cam", "chiếc xe", "con tem", "cây bút chì", "quyển vở", "quả bóng", "con thú", "cái ly", "chiếc lá", "viên đá", "hạt cườm", "cây nến", "quả trứng"],
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
                question: ["mỗi bạn được bao nhiêu", "mỗi hộp có bao nhiêu", "mỗi túi có bao nhiêu", "mỗi người được bao nhiêu", "mỗi hàng có bao nhiêu", "mỗi nhóm được bao nhiêu", "mỗi em được bao nhiêu"]
            }
        }
    },

    displaySettings: {
        fontScale: 100,
        primaryColor: '#88ccff',
        secondaryColor: '#ffd700',
        correctColor: '#00ff88'
    },

    sounds: {
        click: null,
        bgMusic: null,
        success: null,
        failure: null
    },

    currentProblem: { num1: 0, num2: 0, answer: 0, operator: '+' },
    problemCount: 0,

    examSettings: { totalQuestions: 10 },
    examCurrentIndex: 0,
    examProblems: [],
    examUserAnswers: [],

    // ===== INITIALIZATION =====
    init() {
        console.log('🖐️ Initializing Toán Số game...');
        
        try {
            // Create full HTML structure
            this.createGameHTML();
            
            // Load settings
            this.loadDisplaySettings();
            
            // Initialize sounds
            this.initSounds();
            
            // Initialize all event listeners
            this.initAllEventListeners();
            
            // Apply display settings
            this.applyDisplaySettings();
            
            // Start background music
            this.startBackgroundMusic();
            
            console.log('✅ Toán Số game initialized successfully');
            return this;
        } catch (error) {
            console.error('❌ Failed to initialize Toán Số game:', error);
            throw error;
        }
    },

    // ===== DESTRUCTION =====
    destroy() {
        console.log('🗑️ Destroying Toán Số game...');
        
        // Stop all sounds
        this.stopAllSounds();
        
        // Clear game area
        const gameArea = document.getElementById('game-area');
        if (gameArea) {
            gameArea.innerHTML = '';
        }
        
        // Reset all variables
        this.currentProblem = { num1: 0, num2: 0, answer: 0, operator: '+' };
        this.problemCount = 0;
        this.examCurrentIndex = 0;
        this.examProblems = [];
        this.examUserAnswers = [];
        
        console.log('✅ Toán Số game destroyed');
    },

    // ===== CREATE FULL HTML STRUCTURE =====
    createGameHTML() {
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = \`
            <link rel="stylesheet" href="styles.css">
            <div class="container">
                <!-- MÀN HÌNH CHÍNH -->
                <div id="home-screen" class="screen active">
                    <h1>🖐️ Finger Math</h1>
                    <h2>Luyện Tính Nhẩm Cho Bé</h2>

                    <!-- Chọn mức độ (multi-select) -->
                    <div class="settings-group">
                        <label>📊 Mức độ: <span class="hint">(có thể chọn nhiều)</span></label>
                        <div class="button-group">
                            <button class="option-btn active" data-setting="level" data-value="unit">Hàng đơn vị</button>
                            <button class="option-btn" data-setting="level" data-value="tens">Hàng chục</button>
                            <button class="option-btn" data-setting="level" data-value="hundreds">Hàng trăm</button>
                            <button class="option-btn" data-setting="level" data-value="thousands">Hàng nghìn</button>
                        </div>
                    </div>

                    <!-- Chọn dạng toán -->
                    <div class="settings-group">
                        <label>🎲 Dạng toán:</label>
                        <div class="button-group">
                            <button class="option-btn active" data-setting="problemType" data-value="quick-math">⚡ Tính nhanh</button>
                            <button class="option-btn" data-setting="problemType" data-value="find-x">🔍 Tìm X</button>
                            <button class="option-btn" data-setting="problemType" data-value="word-problem">📖 Toán Đố</button>
                        </div>
                    </div>

                    <!-- Chọn độ khó (multi-select) -->
                    <div class="settings-group">
                        <label>⚡ Độ khó: <span class="hint">(có thể chọn nhiều)</span></label>
                        <div class="button-group">
                            <button class="option-btn active" data-setting="difficulty" data-value="no-carry">Không nhớ</button>
                            <button class="option-btn" data-setting="difficulty" data-value="carry">Có nhớ</button>
                        </div>
                    </div>

                    <!-- Chọn phép tính (multi-select) -->
                    <div class="settings-group">
                        <label>➕ Phép tính: <span class="hint">(có thể chọn nhiều)</span></label>
                        <div class="button-group">
                            <button class="option-btn active" data-setting="operation" data-value="add">Cộng (+)</button>
                            <button class="option-btn" data-setting="operation" data-value="subtract">Trừ (−)</button>
                            <button class="option-btn" data-setting="operation" data-value="multiply">Nhân (×)</button>
                            <button class="option-btn" data-setting="operation" data-value="divide">Chia (÷)</button>
                        </div>
                    </div>

                    <!-- Chọn chế độ (chỉ cho luyện tập) -->
                    <div class="settings-group">
                        <label>🎯 Chế độ luyện tập:</label>
                        <div class="button-group">
                            <button class="option-btn active" data-setting="mode" data-value="view">Xem kết quả</button>
                            <button class="option-btn" data-setting="mode" data-value="input">Nhập kết quả</button>
                        </div>
                    </div>

                    <!-- Cài đặt bài thi -->
                    <div class="settings-group exam-settings">
                        <label>📝 Số câu bài thi:</label>
                        <div class="size-controls">
                            <button class="size-btn" data-action="exam-decrease">−</button>
                            <span id="exam-count-display">10</span>
                            <button class="size-btn" data-action="exam-increase">+</button>
                        </div>
                    </div>

                    <!-- 2 nút chính -->
                    <div class="main-buttons">
                        <button id="start-btn" class="primary-btn half-btn">▶️ LUYỆN TẬP</button>
                        <button id="exam-btn" class="primary-btn half-btn exam-btn-color">📝 BÀI THI</button>
                    </div>

                    <!-- Nút cài đặt giao diện (thu gọn) -->
                    <button id="toggle-settings-btn" class="toggle-settings-btn">⚙️ Cài đặt giao diện</button>
                    
                    <!-- Cài đặt giao diện (ẩn mặc định) -->
                    <div id="display-settings" class="settings-group display-settings hidden">
                        <label>🎨 Tùy chỉnh giao diện:</label>
                        <div class="setting-row">
                            <span>Cỡ chữ:</span>
                            <div class="size-controls">
                                <button class="size-btn" data-action="decrease">−</button>
                                <span id="font-size-display">100%</span>
                                <button class="size-btn" data-action="increase">+</button>
                            </div>
                        </div>
                        <div class="setting-row">
                            <span>Màu chính:</span>
                            <input type="color" id="primary-color" value="#88ccff">
                        </div>
                        <div class="setting-row">
                            <span>Màu phụ:</span>
                            <input type="color" id="secondary-color" value="#ffd700">
                        </div>
                        <div class="setting-row">
                            <span>Màu kết quả đúng:</span>
                            <input type="color" id="correct-color" value="#00ff88">
                        </div>
                        <div class="setting-row">
                            <span>🔊 Âm lượng nhạc nền:</span>
                            <div class="size-controls">
                                <button class="size-btn" data-action="volume-decrease">−</button>
                                <span id="volume-display">50%</span>
                                <button class="size-btn" data-action="volume-increase">+</button>
                            </div>
                        </div>
                        <button id="reset-settings-btn" class="reset-btn">🔄 Khôi phục mặc định</button>
                    </div>
                </div>

                <!-- MÀN HÌNH LUYỆN TẬP -->
                <div id="practice-screen" class="screen">
                    <div class="header">
                        <button id="back-btn" class="back-btn">← Quay lại</button>
                        <div class="problem-counter">Bài số: <span id="problem-number">1</span></div>
                        <button id="toggle-highlight-btn" class="toggle-highlight-btn hidden">💡</button>
                    </div>

                    <div class="problem-area">
                        <!-- Hiển thị câu hỏi toán đố -->
                        <div id="word-problem-text" class="word-problem-text hidden"></div>
                        
                        <!-- Hiển thị biểu thức toán học -->
                        <div class="problem-display">
                            <span id="num1">0</span>
                            <span id="operator">+</span>
                            <span id="num2">0</span>
                            <span>=</span>
                            <span id="answer-display">?</span>
                        </div>
                    </div>

                    <!-- Chế độ A: Xem kết quả -->
                    <div id="mode-view" class="mode-section">
                        <button id="show-answer-btn" class="primary-btn">XEM KẾT QUẢ</button>
                    </div>

                    <!-- Chế độ B: Nhập kết quả -->
                    <div id="mode-input" class="mode-section hidden">
                        <div class="input-area">
                            <label class="input-label">Đáp án của con:</label>
                            <input type="text" inputmode="numeric" pattern="[0-9]*" id="user-answer">
                        </div>
                        <button id="check-btn" class="primary-btn">KIỂM TRA</button>
                    </div>

                    <!-- Khu vực phản hồi -->
                    <div id="feedback-area" class="feedback-area hidden">
                        <div id="feedback-message" class="feedback-message"></div>
                        <div id="correct-answer" class="correct-answer"></div>
                    </div>

                    <!-- Nút bài tiếp theo -->
                    <button id="next-btn" class="primary-btn next-btn hidden">BÀI TIẾP THEO →</button>
                </div>

                <!-- MÀN HÌNH BÀI THI - Từng câu một -->
                <div id="exam-screen" class="screen">
                    <div class="header">
                        <button id="exam-back-btn" class="back-btn">← Quay lại</button>
                        <button id="exam-toggle-highlight-btn" class="toggle-highlight-btn" title="Bật/Tắt hiển thị đề bài">💡</button>
                        <div class="problem-counter">Câu: <span id="exam-current">1</span> / <span id="exam-total">10</span></div>
                    </div>

                    <div class="word-problem-text hidden" id="exam-word-problem-text"></div>

                    <div class="problem-area" id="exam-problem-area">
                        <div class="problem-display">
                            <span id="exam-num1">0</span>
                            <span id="exam-operator">+</span>
                            <span id="exam-num2">0</span>
                            <span>=</span>
                            <span id="exam-answer-display">?</span>
                        </div>
                    </div>

                    <div class="input-area">
                        <label class="input-label">Nhập đáp án:</label>
                        <input type="text" inputmode="numeric" pattern="[0-9-]*" id="exam-user-answer">
                    </div>

                    <div class="exam-nav-buttons">
                        <button id="exam-prev-btn" class="primary-btn nav-btn">← QUAY LẠI</button>
                        <button id="exam-next-btn" class="primary-btn nav-btn">TIẾP THEO →</button>
                    </div>
                </div>

                <!-- MÀN HÌNH XEM LẠI TRƯỚC KHI NỘP -->
                <div id="review-screen" class="screen">
                    <div class="header">
                        <button id="review-back-btn" class="back-btn">← Tiếp tục làm bài</button>
                        <h2 class="review-title">📋 XEM LẠI BÀI THI</h2>
                    </div>

                    <div class="review-summary">
                        <div class="summary-item done">
                            <span class="summary-label">✓ Đã làm:</span>
                            <span id="done-count" class="summary-value">0</span>
                        </div>
                        <div class="summary-item not-done">
                            <span class="summary-label">○ Chưa làm:</span>
                            <span id="not-done-count" class="summary-value">0</span>
                        </div>
                    </div>

                    <div class="review-list" id="review-list">
                        <!-- Danh sách câu hỏi sẽ được sinh bằng JS -->
                    </div>

                    <button id="submit-exam-btn" class="primary-btn submit-btn">📤 NỘP BÀI THI</button>
                </div>

                <!-- MÀN HÌNH KẾT QUẢ BÀI THI -->
                <div id="result-screen" class="screen">
                    <div class="result-container">
                        <h1 class="result-title">🎉 KẾT QUẢ BÀI THI</h1>
                        
                        <div class="result-score">
                            <div class="score-circle">
                                <span id="score-percent">0%</span>
                            </div>
                        </div>

                        <div class="result-details">
                            <div class="result-item correct-item">
                                <span class="result-label">✓ Số câu đúng:</span>
                                <span id="correct-count" class="result-value">0</span>
                            </div>
                            <div class="result-item incorrect-item">
                                <span class="result-label">✗ Số câu sai:</span>
                                <span id="incorrect-count" class="result-value">0</span>
                            </div>
                            <div class="result-item total-item">
                                <span class="result-label">📊 Tổng số câu:</span>
                                <span id="total-count" class="result-value">0</span>
                            </div>
                        </div>

                        <div class="result-message excellent" id="result-message">
                            🎉 Con đã hoàn thành bài thi!
                        </div>

                        <!-- Bảng chi tiết kết quả 3 cột -->
                        <div class="result-table-container">
                            <table class="result-table">
                                <thead>
                                    <tr>
                                        <th>Bài toán</th>
                                        <th>Đáp án</th>
                                        <th>Kết quả</th>
                                    </tr>
                                </thead>
                                <tbody id="result-table-body">
                                    <!-- Sẽ được sinh bằng JS -->
                                </tbody>
                            </table>
                        </div>

                        <button id="home-btn" class="primary-btn">🏠 VỀ TRANG CHỦ</button>
                    </div>
                </div>
            </div>
        \`;
    },

    // ===== INITIALIZE SOUNDS =====
    initSounds() {
        this.sounds.click = new Audio('music/Click.wav');
        this.sounds.bgMusic = new Audio('music/nhacnen.mp3');
        this.sounds.success = new Audio('music/thanhcong.wav');
        this.sounds.failure = new Audio('music/thatbai.wav');
        
        this.sounds.bgMusic.loop = true;
        this.sounds.bgMusic.volume = 0.5;
        
        Object.values(this.sounds).forEach(sound => {
            if (sound !== this.sounds.bgMusic) {
                sound.volume = 0.7;
            }
        });
    },

    // ===== INITIALIZE ALL EVENT LISTENERS =====
    initAllEventListeners() {
        this.initOptionButtons();
        this.initControlButtons();
        this.initDisplaySettings();
        this.initExamSettings();
        
        // Add click sound to all buttons
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => this.playClickSound());
        });
    },

    // [Tiếp tục với tất cả các methods từ app.js gốc...]
    // Tôi sẽ thêm các method quan trọng nhất:

    // ===== BASIC UTILITY METHODS =====
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomFromArray(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    playClickSound() {
        if (this.sounds.click) {
            this.sounds.click.currentTime = 0;
            this.sounds.click.play().catch(e => console.log('Audio failed:', e));
        }
    },

    startBackgroundMusic() {
        if (this.sounds.bgMusic) {
            this.sounds.bgMusic.play().catch(e => console.log('Music failed:', e));
        }
    },

    stopAllSounds() {
        Object.values(this.sounds).forEach(sound => {
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }
        });
    },

    // ===== SETTINGS MANAGEMENT =====
    loadDisplaySettings() {
        const saved = localStorage.getItem('toanso-displaySettings');
        if (saved) {
            this.displaySettings = { ...this.displaySettings, ...JSON.parse(saved) };
        }
    },

    saveDisplaySettings() {
        localStorage.setItem('toanso-displaySettings', JSON.stringify(this.displaySettings));
    },

    applyDisplaySettings() {
        const root = document.documentElement;
        root.style.setProperty('--font-scale', this.displaySettings.fontScale / 100);
        root.style.setProperty('--primary-color', this.displaySettings.primaryColor);
        root.style.setProperty('--secondary-color', this.displaySettings.secondaryColor);
        root.style.setProperty('--correct-color', this.displaySettings.correctColor);
        
        const fontSizeDisplay = document.getElementById('font-size-display');
        const primaryColor = document.getElementById('primary-color');
        const secondaryColor = document.getElementById('secondary-color');
        const correctColor = document.getElementById('correct-color');
        
        if (fontSizeDisplay) fontSizeDisplay.textContent = this.displaySettings.fontScale + '%';
        if (primaryColor) primaryColor.value = this.displaySettings.primaryColor;
        if (secondaryColor) secondaryColor.value = this.displaySettings.secondaryColor;
        if (correctColor) correctColor.value = this.displaySettings.correctColor;
    },

    // ===== BASIC EVENT HANDLERS =====
    initControlButtons() {
        const startBtn = document.getElementById('start-btn');
        const backBtn = document.getElementById('back-btn');
        const homeBtn = document.getElementById('home-btn');
        const examBtn = document.getElementById('exam-btn');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.showScreen('practice-screen');
                this.generateProblem();
            });
        }
        
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showScreen('home-screen'));
        }
        
        if (homeBtn) {
            homeBtn.addEventListener('click', () => this.showScreen('home-screen'));
        }
        
        if (examBtn) {
            examBtn.addEventListener('click', () => {
                this.startExam();
            });
        }
    },

    initOptionButtons() {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const setting = btn.dataset.setting;
                const value = btn.dataset.value;
                
                if (setting === 'mode' || setting === 'problemType') {
                    this.settings[setting] = value;
                    document.querySelectorAll(\`[data-setting="\${setting}"]\`).forEach(sib => {
                        sib.classList.remove('active');
                    });
                    btn.classList.add('active');
                } else {
                    const settingKey = this.getSettingKey(setting);
                    this.toggleMultiSelect(settingKey, value, btn);
                }
            });
        });
    },

    getSettingKey(setting) {
        const map = {
            'level': 'levels',
            'difficulty': 'difficulties', 
            'operation': 'operations'
        };
        return map[setting] || setting;
    },

    toggleMultiSelect(settingKey, value, btn) {
        const arr = this.settings[settingKey];
        const index = arr.indexOf(value);
        
        if (index === -1) {
            arr.push(value);
            btn.classList.add('active');
        } else {
            if (arr.length > 1) {
                arr.splice(index, 1);
                btn.classList.remove('active');
            }
        }
    },

    initDisplaySettings() {
        // Basic implementation - could expand with full functionality
        const toggleBtn = document.getElementById('toggle-settings-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const settingsPanel = document.getElementById('display-settings');
                if (settingsPanel) {
                    settingsPanel.classList.toggle('hidden');
                }
            });
        }
    },

    initExamSettings() {
        // Basic implementation
        document.getElementById('exam-count-display')?.textContent = this.examSettings.totalQuestions;
    },

    // ===== SCREEN MANAGEMENT =====
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    },

    // ===== BASIC PROBLEM GENERATION =====
    generateProblem() {
        const num1 = this.randomInt(1, 10);
        const num2 = this.randomInt(1, 10);
        const operator = '+';
        const answer = num1 + num2;
        
        this.currentProblem = { num1, num2, operator, answer };
        
        document.getElementById('num1').textContent = num1;
        document.getElementById('operator').textContent = operator;
        document.getElementById('num2').textContent = num2;
        document.getElementById('answer-display').textContent = '?';
        
        // Initialize show answer button
        const showAnswerBtn = document.getElementById('show-answer-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (showAnswerBtn) {
            showAnswerBtn.onclick = () => {
                document.getElementById('answer-display').textContent = answer;
                document.getElementById('answer-display').style.color = this.displaySettings.correctColor;
                if (nextBtn) nextBtn.classList.remove('hidden');
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = () => {
                this.generateProblem();
                nextBtn.classList.add('hidden');
            };
        }
    },

    startExam() {
        console.log('Starting exam...');
        this.showScreen('exam-screen');
        // Basic exam implementation could go here
    }
};

// Export the game module
window.ToanSoGame = ToanSoGame;