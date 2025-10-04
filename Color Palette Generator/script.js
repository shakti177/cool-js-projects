const paletteContainer = document.getElementById('paletteContainer');
        const generateBtn = document.getElementById('generateBtn');
        const exportBtn = document.getElementById('exportBtn');
        const toast = document.getElementById('toast');

        let currentPalette = [];

        function generateRandomColor() {
            const hue = Math.floor(Math.random() * 360);
            const saturation = Math.floor(Math.random() * 30) + 60;
            const lightness = Math.floor(Math.random() * 30) + 45;
            return hslToHex(hue, saturation, lightness);
        }

        function hslToHex(h, s, l) {
            l /= 100;
            const a = s * Math.min(l, 1 - l) / 100;
            const f = n => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');
            };
            return `#${f(0)}${f(8)}${f(4)}`;
        }

        function generatePalette() {
            currentPalette = [];
            paletteContainer.innerHTML = '';

            for (let i = 0; i < 5; i++) {
                const color = generateRandomColor();
                currentPalette.push(color);

                const card = document.createElement('div');
                card.className = 'color-card';
                card.style.backgroundColor = color;
                card.style.animationDelay = `${i * 0.1}s`;
                
                card.innerHTML = `
                    <div class="color-info">
                        <div class="color-hex">${color}</div>
                        <div class="copy-hint">Click to copy</div>
                    </div>
                `;

                card.addEventListener('click', () => copyToClipboard(color));
                paletteContainer.appendChild(card);
            }
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast(`Copied ${text} to clipboard! 🎉`);
            });
        }

        function showToast(message) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }

        function exportPalette() {
            const paletteText = currentPalette.join(', ');
            navigator.clipboard.writeText(paletteText).then(() => {
                showToast('All colors copied to clipboard! 🚀');
            });
        }

        generateBtn.addEventListener('click', generatePalette);
        exportBtn.addEventListener('click', exportPalette);

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.target === document.body) {
                e.preventDefault();
                generatePalette();
            }
        });

        generatePalette();