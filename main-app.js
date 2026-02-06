// ===== MAIN APP CONTROLLER =====
// This is the main application that manages the multi-game system

class MultiGameApp {
    constructor() {
        this.currentGame = null;
        this.games = {
            'toan-so': null,
            'toan-choi': null,
            'tu-tien': null
        };
        this.isLoading = false;
        
        console.log('MultiGameApp initialized');
    }

    // ===== INITIALIZATION =====
    async init() {
        console.log('Starting Multi-Game Application...');
        
        try {
            // Initialize hamburger menu
            this.initHamburgerMenu();
            
            console.log('Hamburger menu initialized');
            
            // Load default game (Toán Số)
            await this.loadGame('toan-so');
            
            console.log('Multi-Game Application started successfully');
        } catch (error) {
            console.error('Failed to initialize Multi-Game Application:', error);
            
            // Show error message in game area
            const gameArea = document.getElementById('game-area');
            gameArea.innerHTML = `
                <div style="
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    height: 100vh; 
                    color: white; 
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background: linear-gradient(45deg, #1a1a2e, #16213e);
                ">
                    <div>
                        <h2>❌ Lỗi Khởi Tạo</h2>
                        <p>Không thể tải game mặc định</p>
                        <p style="font-size: 12px; opacity: 0.7;">Click hamburger menu (☰) để thử game khác</p>
                    </div>
                </div>
            `;
        }
    }

    // ===== HAMBURGER MENU MANAGEMENT =====
    initHamburgerMenu() {
        console.log('Initializing hamburger menu...');
        
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const gameSelector = document.getElementById('game-selector');
        const closeSelectorBtn = document.getElementById('close-selector');

        if (!hamburgerBtn || !gameSelector || !closeSelectorBtn) {
            console.error('Hamburger menu elements not found:', {
                hamburgerBtn: !!hamburgerBtn,
                gameSelector: !!gameSelector,
                closeSelectorBtn: !!closeSelectorBtn
            });
            return;
        }

        // Open menu
        hamburgerBtn.addEventListener('click', () => {
            console.log('Hamburger button clicked');
            this.showGameSelector();
        });

        // Close menu
        closeSelectorBtn.addEventListener('click', () => {
            console.log('Close button clicked');
            this.hideGameSelector();
        });

        // Close menu when clicking outside
        gameSelector.addEventListener('click', (e) => {
            if (e.target === gameSelector) {
                console.log('Clicked outside selector');
                this.hideGameSelector();
            }
        });

        // Handle game selection
        const gameButtons = document.querySelectorAll('.game-btn');
        gameButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const gameType = btn.dataset.game;
                this.hideGameSelector();
                await this.loadGame(gameType);
            });
        });
    }

    showGameSelector() {
        const gameSelector = document.getElementById('game-selector');
        gameSelector.classList.remove('hidden');
        
        // Add backdrop blur effect
        document.body.style.overflow = 'hidden';
    }

    hideGameSelector() {
        const gameSelector = document.getElementById('game-selector');
        gameSelector.classList.add('hidden');
        
        // Remove backdrop blur effect
        document.body.style.overflow = 'auto';
    }

    updateActiveGameButton(gameType) {
        const gameButtons = document.querySelectorAll('.game-btn');
        gameButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.game === gameType) {
                btn.classList.add('active');
            }
        });
    }

    // ===== GAME LOADING MANAGEMENT =====
    async loadGame(gameType) {
        if (this.isLoading) {
            console.log('Already loading a game, please wait...');
            return;
        }

        if (this.currentGame === gameType) {
            console.log(\`Game '\${gameType}' is already loaded\`);
            return;
        }

        console.log(\`Loading game: \${gameType}\`);
        this.isLoading = true;
        
        // Show loading screen
        this.showLoadingScreen();

        try {
            // Destroy current game
            if (this.currentGame) {
                await this.destroyCurrentGame();
            }

            // Load new game
            await this.initializeGame(gameType);
            
            // Update current game
            this.currentGame = gameType;
            
            // Update UI
            this.updateActiveGameButton(gameType);
            
            console.log(\`Successfully loaded game: \${gameType}\`);

        } catch (error) {
            console.error(\`Failed to load game '\${gameType}':\`, error);
            alert(\`Không thể tải game \${gameType}. Vui lòng thử lại.\`);
        } finally {
            this.isLoading = false;
            this.hideLoadingScreen();
        }
    }

    async destroyCurrentGame() {
        if (!this.currentGame) return;

        console.log(\`Destroying current game: \${this.currentGame}\`);
        
        const gameInstance = this.games[this.currentGame];
        if (gameInstance && typeof gameInstance.destroy === 'function') {
            gameInstance.destroy();
        }
        
        // Clear the game instance
        this.games[this.currentGame] = null;
        
        // Clear game area
        this.clearGameArea();
    }

    async initializeGame(gameType) {
        console.log(\`Initializing game: \${gameType}\`);

        // Load game script if not already loaded
        await this.loadGameScript(gameType);

        // Get game class
        const GameClass = this.getGameClass(gameType);
        if (!GameClass) {
            throw new Error(\`Game class for '\${gameType}' not found\`);
        }

        // Initialize game
        const gameInstance = GameClass.init();
        this.games[gameType] = gameInstance;

        console.log(\`Game '\${gameType}' initialized successfully\`);
    }

    async loadGameScript(gameType) {
        // Check if script is already loaded
        const GameClass = this.getGameClass(gameType);
        if (GameClass) {
            console.log(\`Game script for '\${gameType}' already loaded\`);
            return;
        }

        console.log(\`Loading script for game: \${gameType}\`);

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = \`games/\${gameType}.js\`;
            script.onload = () => {
                console.log(\`Script loaded: \${gameType}.js\`);
                resolve();
            };
            script.onerror = () => {
                reject(new Error(\`Failed to load script: \${gameType}.js\`));
            };
            document.head.appendChild(script);
        });
    }

    getGameClass(gameType) {
        switch (gameType) {
            case 'toan-so':
                return window.ToanSoGame;
            case 'toan-choi':
                return window.ToanChoiGame;
            case 'tu-tien':
                return window.TuTienGame;
            default:
                return null;
        }
    }

    // ===== UTILITY METHODS =====
    clearGameArea() {
        const gameArea = document.getElementById('game-area');
        if (gameArea) {
            // Fade out effect
            gameArea.style.opacity = '0';
            setTimeout(() => {
                gameArea.innerHTML = '';
                gameArea.style.opacity = '1';
            }, 200);
        }
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    // ===== ERROR HANDLING =====
    handleError(error, context = 'Unknown') {
        console.error(\`Error in \${context}:\`, error);
        
        // Show user-friendly error message
        const errorMessage = error.message || 'Đã xảy ra lỗi không xác định';
        alert(\`Lỗi: \${errorMessage}\`);
        
        // Hide loading screen in case of error
        this.hideLoadingScreen();
        this.isLoading = false;
    }

    // ===== KEYBOARD SHORTCUTS =====
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // ESC to open/close menu
            if (e.key === 'Escape') {
                const gameSelector = document.getElementById('game-selector');
                if (gameSelector.classList.contains('hidden')) {
                    this.showGameSelector();
                } else {
                    this.hideGameSelector();
                }
            }
            
            // Number keys for quick game switching
            if (e.ctrlKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.loadGame('toan-so');
                        break;
                    case '2':
                        e.preventDefault();
                        this.loadGame('toan-choi');
                        break;
                    case '3':
                        e.preventDefault();
                        this.loadGame('tu-tien');
                        break;
                }
            }
        });
    }
}

// ===== APPLICATION STARTUP =====
let app = null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('DOM Content Loaded - Starting Multi-Game App');
        
        // Create and initialize app
        app = new MultiGameApp();
        await app.init();
        
        // Initialize keyboard shortcuts
        app.initKeyboardShortcuts();
        
        console.log('Multi-Game App fully loaded and ready!');
        
    } catch (error) {
        console.error('Failed to start Multi-Game App:', error);
        alert('Không thể khởi động ứng dụng. Vui lòng tải lại trang.');
    }
});

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    if (app) {
        app.handleError(e.error, 'Global');
    }
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    if (app) {
        app.handleError(e.reason, 'Promise Rejection');
    }
});

// ===== EXPORT FOR DEBUGGING =====
window.MultiGameApp = MultiGameApp;
window.app = app;