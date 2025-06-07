// Hamburger menu functionality - direct translation from jQuery
document.addEventListener('DOMContentLoaded', function() {
    // Equivalent to $(document).on('click', '#hamburger-trigger', function() {...});
    document.addEventListener('click', function(event) {
        const target = event.target.closest('#hamburger-trigger');
        if (target) {
            // $('.hamburger').toggleClass('active');
            document.querySelectorAll('.hamburger').forEach(function(element) {
                element.classList.toggle('active');
            });
            
            // $('#hamburger-trigger').toggleClass('active');
            document.getElementById('hamburger-trigger').classList.toggle('active');
        }
    });
}); 