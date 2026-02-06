// ===== TOÁN CHƠI GAME MODULE - GAME GỐC =====
const ToanChoiGame = {
    // ===== INITIALIZATION =====
    init() {
        console.log('🚀 Initializing Toán Chơi (redirect to original)...');
        
        try {
            // Redirect to original toán chơi.html
            window.location.href = './toán chơi.html';
            
            console.log('✅ Redirecting to original Toán Chơi game');
            return this;
        } catch (error) {
            console.error('❌ Failed to redirect:', error);
            throw error;
        }
    },

    // ===== DESTRUCTION =====
    destroy() {
        console.log('🗑️ Destroying Toán Chơi game...');
        // No cleanup needed for redirect
    }
};

// Export the game module
window.ToanChoiGame = ToanChoiGame;