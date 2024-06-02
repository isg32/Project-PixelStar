document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://raw.githubusercontent.com/isg32/official_devices-pixelstar/patch-1/devices.json';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const devices = data.devices;
            const container = document.getElementById('device-container');

            devices.forEach(device => {
                const card = document.createElement('div');
                card.className = 'card';

                const model = document.createElement('h2');
                model.textContent = device.model;
                card.appendChild(model);

                const codename = document.createElement('p');
                codename.textContent = `Codename: ${device.codename}`;
                card.appendChild(codename);

                const maintainer = document.createElement('p');
                maintainer.textContent = `Maintainer: ${device.maintainer_name}`;
                card.appendChild(maintainer);

                card.addEventListener('click', () => {
                    fetch(`https://raw.githubusercontent.com/Project-PixelStar/official_devices/14/instructions/${device.codename}.md`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(markdownContent => {
                            showModal(markdownContent);
                        })
                        .catch(error => console.error('Error fetching device details:', error));
                });

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    const modal = document.getElementById('device-details');
    const modalContent = document.getElementById('device-details-content');
    const span = document.getElementsByClassName('close')[0];

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    function showModal(markdownContent) {
        modalContent.innerHTML = `
        <center><div>
            <pre class="cardforwiki">${markdownContent}</pre>
        </div></center>
        `;
        modal.style.display = 'block';
    }
});
