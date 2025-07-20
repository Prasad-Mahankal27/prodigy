let startTime = 0;
        let elapsedTime = 0;
        let timerInterval = null;
        let isRunning = false;
        let lapCount = 0;

        function formatTime(milliseconds) {
            const totalSeconds = Math.floor(milliseconds / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const ms = Math.floor((milliseconds % 1000) / 10);
            
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
        }

        function updateDisplay() {
            document.getElementById('display').textContent = formatTime(elapsedTime);
        }

        function startStopwatch() {
            if (!isRunning) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(() => {
                    elapsedTime = Date.now() - startTime;
                    updateDisplay();
                }, 10);
                
                isRunning = true;
                document.getElementById('startBtn').disabled = true;
                document.getElementById('pauseBtn').disabled = false;
                document.getElementById('lapBtn').disabled = false;
            }
        }

        function pauseStopwatch() {
            if (isRunning) {
                clearInterval(timerInterval);
                isRunning = false;
                document.getElementById('startBtn').disabled = false;
                document.getElementById('pauseBtn').disabled = true;
                document.getElementById('lapBtn').disabled = true;
            }
        }

        function resetStopwatch() {
            clearInterval(timerInterval);
            isRunning = false;
            elapsedTime = 0;
            lapCount = 0;
            
            updateDisplay();
            
            document.getElementById('startBtn').disabled = false;
            document.getElementById('pauseBtn').disabled = true;
            document.getElementById('lapBtn').disabled = true;
            
            // Clear lap times
            document.getElementById('lapList').innerHTML = '';
            document.getElementById('noLaps').style.display = 'block';
        }

        function recordLap() {
            if (isRunning) {
                lapCount++;
                const lapTime = formatTime(elapsedTime);
                
                const lapList = document.getElementById('lapList');
                const lapItem = document.createElement('div');
                lapItem.className = 'lap-item';
                lapItem.innerHTML = `
                    <span class="lap-number">Lap ${lapCount}</span>
                    <span class="lap-time">${lapTime}</span>
                `;
                
                lapList.insertBefore(lapItem, lapList.firstChild);
                document.getElementById('noLaps').style.display = 'none';
            }
        }

        updateDisplay();