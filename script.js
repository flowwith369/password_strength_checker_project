document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const toggleButton = document.getElementById('toggleVisibility');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthLabel = document.getElementById('strengthLabel');
    const requirementItems = {
        length: document.getElementById('length'),
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        number: document.getElementById('number'),
        special: document.getElementById('special')
    };

    let isPasswordVisible = false;

    // Toggle password visibility
    toggleButton.addEventListener('click', function() {
        isPasswordVisible = !isPasswordVisible;
        passwordInput.type = isPasswordVisible ? 'text' : 'password';
       toggleBtn.textContent = isPasswordVisible ? '🙈' : '👁️';
    });

    // Check password strength on input
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        checkPasswordStrength(password);
    });

    function checkPasswordStrength(password) {
        // Check requirements
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        // Update requirement indicators
        requirementItems.length.classList.toggle('valid', hasLength);
        requirementItems.uppercase.classList.toggle('valid', hasUppercase);
        requirementItems.lowercase.classList.toggle('valid', hasLowercase);
        requirementItems.number.classList.toggle('valid', hasNumber);
        requirementItems.special.classList.toggle('valid', hasSpecial);

        // Calculate strength score (0-100)
        let strength = 0;
        if (hasLength) strength += 20;
        if (hasUppercase) strength += 20;
        if (hasLowercase) strength += 15;
        if (hasNumber) strength += 15;
        if (hasSpecial) strength += 30;

        // Additional points for length beyond minimum
        if (password.length > 12) strength += 10;
        if (password.length > 16) strength += 10;

        // Cap at 100
        strength = Math.min(strength, 100);

        // Update strength meter
        strengthBar.style.width = `${strength}%`;

        // Update strength label and color
        if (strength < 40) {
            strengthLabel.textContent = "Weak";
            strengthBar.style.backgroundColor = "#e74c3c";
        } else if (strength < 70) {
            strengthLabel.textContent = "Moderate";
            strengthBar.style.backgroundColor = "#f39c12";
        } else if (strength < 90) {
            strengthLabel.textContent = "Strong";
            strengthBar.style.backgroundColor = "#3498db";
        } else {
            strengthLabel.textContent = "Very Strong";
            strengthBar.style.backgroundColor = "#2ecc71";
        }
    }
});