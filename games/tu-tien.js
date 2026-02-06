// ===== TU TIÊN GAME MODULE - GAME GỐC =====
const TuTienGame = {
    // ===== INITIALIZATION =====
    init() {
        console.log('⚔️ Initializing Tu Tiên (redirect to original)...');
        
        try {
            // Redirect to original tu tiên.html
            window.location.href = './tu tiên.html';
            
            console.log('✅ Redirecting to original Tu Tiên game');
            return this;
        } catch (error) {
            console.error('❌ Failed to redirect:', error);
            throw error;
        }
    },

    // ===== DESTRUCTION =====
    destroy() {
        console.log('🗑️ Destroying Tu Tiên game...');
        // No cleanup needed for redirect
    }
};

// Export the game module
window.TuTienGame = TuTienGame;