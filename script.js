let currentStep = 0;
        let progressValue = 0;
        let currentCaptcha = 'BX7K9';
        const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        const steps = [
            { duration: 6000, text: 'Checking secure connection...', progress: 25 },
            { duration: 7000, text: 'Analyzing browser fingerprint...', progress: 50 },
            { duration: 8000, text: 'Verifying you\'re not a bot...', progress: 75 },
            { duration: 4000, text: 'Loading page content...', progress: 100 }
        ];

        function updateProgress() {
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');
            
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                const statusItem = document.getElementById(`status-${currentStep + 1}`);
                
                // Mark current step as active
                statusItem.classList.add('active');
                statusItem.querySelector('.status-icon').textContent = '⟳';
                progressText.textContent = step.text;
                
                // Gradually increase progress
                const startProgress = progressValue;
                const endProgress = step.progress;
                const duration = step.duration;
                const startTime = Date.now();
                
                const animateProgress = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    progressValue = startProgress + (endProgress - startProgress) * progress;
                    progressBar.style.width = progressValue + '%';
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateProgress);
                    } else {
                        // Step completed
                        if (currentStep === 2) {
                            // Bot verification fails
                            statusItem.classList.remove('active');
                            statusItem.classList.add('failed');
                            statusItem.querySelector('.status-icon').textContent = '✗';
                            showError();
                        } else {
                            // Step passes
                            statusItem.classList.remove('active');
                            statusItem.classList.add('complete');
                            statusItem.querySelector('.status-icon').textContent = '✓';
                            
                            currentStep++;
                            if (currentStep < steps.length && currentStep !== 3) {
                                setTimeout(updateProgress, 500);
                            }
                        }
                    }
                };
                
                animateProgress();
            }
        }

        function showError() {
            setTimeout(() => {
                document.getElementById('error-message').classList.add('show');
                setTimeout(() => {
                    document.getElementById('captcha-notice').classList.add('show');
                    document.getElementById('retry-section').classList.add('show');
                }, 1000);
            }, 1500);
        }

        function showCaptcha() {
            document.getElementById('captcha-overlay').style.display = 'flex';
        }

        function closeCaptcha() {
            document.getElementById('captcha-overlay').style.display = 'none';
        }

        function generateRandomCaptcha() {
            let captcha = '';
            for (let i = 0; i < 5; i++) {
                captcha += allChars[Math.floor(Math.random() * allChars.length)];
            }
            return captcha;
        }

        function refreshCaptcha() {
            currentCaptcha = generateRandomCaptcha();
            document.getElementById('captcha-display').textContent = currentCaptcha;
            document.getElementById('captcha-input').value = '';
        }

        function scrambleInput() {
            const input = document.getElementById('captcha-input');
            let scrambled = '';
            
            for (let i = 0; i < input.value.length; i++) {
                if (input.value[i] === ' ') {
                    scrambled += ' ';
                } else {
                    scrambled += allChars[Math.floor(Math.random() * allChars.length)];
                }
            }
            
            input.value = scrambled;
        }

        function verifyCaptcha() {
            const userInput = document.getElementById('captcha-input').value.toUpperCase();
            
            if (userInput === currentCaptcha) {
                closeCaptcha();
                
                // Complete the loading process
                const status3 = document.getElementById('status-3');
                status3.classList.remove('failed');
                status3.classList.add('complete');
                status3.querySelector('.status-icon').textContent = '✓';
                
                // Hide error messages
                document.getElementById('error-message').classList.remove('show');
                document.getElementById('captcha-notice').classList.remove('show');
                document.getElementById('retry-section').classList.remove('show');
                
                // Complete final step
                currentStep = 3;
                setTimeout(() => {
                    const status4 = document.getElementById('status-4');
                    status4.classList.add('active');
                    status4.querySelector('.status-icon').textContent = '⟳';
                    document.getElementById('progress-text').textContent = 'Loading page content...';
                    
                    // Final progress animation
                    const progressBar = document.getElementById('progress-bar');
                    progressBar.style.width = '100%';
                    
                    setTimeout(() => {
                        status4.classList.remove('active');
                        status4.classList.add('complete');
                        status4.querySelector('.status-icon').textContent = '✓';
                        document.getElementById('progress-text').textContent = 'Verification complete!';
                        
                        setTimeout(() => {
                            alert('Verification successful! Redirecting to secure page...');
                        }, 1000);
                    }, 3000);
                }, 500);
                
            } else {
                alert('Incorrect CAPTCHA. Please try again.');
                refreshCaptcha();
            }
        }

        // Add scrambling effect to captcha input
        document.getElementById('captcha-input').addEventListener('input', function(e) {
            setTimeout(scrambleInput, 100);
        });

        // Start the loading process
        setTimeout(updateProgress, 1000);
