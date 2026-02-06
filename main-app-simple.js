// ===== MAIN APP CONTROLLER =====
class MultiGameApp {
    constructor() {
        this.currentGame = null;
        this.isLoading = false;
        console.log('MultiGameApp initialized');
    }

    // ===== INITIALIZATION =====
    async init() {
        console.log('Starting Multi-Game Application...');
        
        try {
            this.initHamburgerMenu();
            console.log('Hamburger menu initialized');
            
            await this.loadGame('toan-so');
            console.log('Multi-Game Application started successfully');
        } catch (error) {
            console.error('Failed to initialize:', error);
            this.showError('Không thể khởi tạo ứng dụng');
        }
    }

    // ===== HAMBURGER MENU =====
    initHamburgerMenu() {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const gameSelector = document.getElementById('game-selector');
        const closeSelectorBtn = document.getElementById('close-selector');

        if (!hamburgerBtn || !gameSelector || !closeSelectorBtn) {
            console.error('Menu elements not found');
            return;
        }

        hamburgerBtn.addEventListener('click', () => {
            console.log('Hamburger clicked');
            gameSelector.classList.remove('hidden');
        });

        closeSelectorBtn.addEventListener('click', () => {
            console.log('Close clicked');
            gameSelector.classList.add('hidden');
        });

        // Game selection
        const gameButtons = document.querySelectorAll('.game-btn');
        gameButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const gameType = btn.dataset.game;
                gameSelector.classList.add('hidden');
                await this.loadGame(gameType);
            });
        });
    }

    // ===== GAME LOADING =====
    async loadGame(gameType) {
        if (this.isLoading) return;
        this.isLoading = true;
        
        console.log(`Loading game: ${gameType}`);
        
        try {
            // Destroy current game
            if (this.currentGame) {
                this.destroyCurrentGame();
            }

            // Load script
            await this.loadScript(gameType);
            
            // Initialize game
            const GameClass = this.getGameClass(gameType);
            if (GameClass) {
                GameClass.init();
                this.currentGame = gameType;
                console.log(`Game ${gameType} loaded successfully`);
            } else {
                throw new Error(`Game class ${gameType} not found`);
            }
            
        } catch (error) {
            console.error(`Failed to load game ${gameType}:`, error);
            this.showError(`Không thể tải game ${gameType}`);
        }
        
        this.isLoading = false;
    }

    destroyCurrentGame() {
        const GameClass = this.getGameClass(this.currentGame);
        if (GameClass && GameClass.destroy) {
            GameClass.destroy();
        }
    }

    async loadScript(gameType) {
        const GameClass = this.getGameClass(gameType);
        if (GameClass) {
            console.log(`Script for ${gameType} already loaded`);
            return;
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `games/${gameType}.js`;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load ${gameType}.js`));
            document.head.appendChild(script);
        });
    }

    getGameClass(gameType) {
        switch (gameType) {
            case 'toan-so': return window.ToanSoGame;
            case 'toan-choi': return window.ToanChoiGame;
            case 'tu-tien': return window.TuTienGame;
            default: return null;
        }
    }

    showError(message) {
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
                    <h2>❌ ${message}</h2>
                    <p style="font-size: 12px; opacity: 0.7;">Click hamburger menu (☰) để thử lại</p>
                </div>
            </div>
        `;
    }
}

// Export class to global scope
window.MultiGameApp = MultiGameApp;