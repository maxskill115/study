// ===== TOÁN SỐ GAME MODULE - GAME GỐC =====
const ToanSoGame = {
    // ===== INITIALIZATION =====
    init() {
        console.log('🖐️ Initializing Toán Số (redirect to original)...');
        
        try {
            // Redirect to original index.html
            window.location.href = './index.html';
            
            console.log('✅ Redirecting to original Toán Số game');
            return this;
        } catch (error) {
            console.error('❌ Failed to redirect:', error);
            throw error;
        }
    },

    // ===== DESTRUCTION =====
    destroy() {
        console.log('🗑️ Destroying Toán Số game...');
        // No cleanup needed for redirect
    }
};

// Export the game module
window.ToanSoGame = ToanSoGame;