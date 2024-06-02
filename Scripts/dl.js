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
            const respoms = data.response;
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

                const status = document.createElement('p');
                status.textContent = `Status: ${device.active ? 'Active' : 'Inactive'}`;
                card.appendChild(status);

                card.addEventListener('click', () => {
                    fetch(`https://raw.githubusercontent.com/isg32/official_devices-pixelstar/patch-1/devices/${device.codename}.json`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(deviceData => {
                            showModal(deviceData);
                        })
                        .catch(error => console.error('Error fetching device details:', error));
                });

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    const modal = document.getElementById('device-details');
    const modalContent = document.getElementById('device-details-content');
    console.log(span);
    const span = document.getElementsByClassName('close')[0];

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    function showModal(deviceData) {
        modalContent.innerHTML = `
        <center><div class="cardforwiki">
        <center>
            <h2>${deviceData.response[0].filename}</h2>
            <p>ROM-Type: ${deviceData.response[0].romtype}</p>
            <p>Version: ${deviceData.response[0].version}</p>
            <p>Filehash: ${deviceData.response[0].filehash}</p>
            <p>Size: ${deviceData.response[0].size}_KB</p>
            <p>Status: ${deviceData.active ? 'Active' : 'Inactive'}</p>
            <button onclick="location.href='${deviceData.response[0].url}'" type="button">Download</button>
            </center><form id="site-search"> <button class="nvbutton"> X </button></form>
            </div>
            </center>
        `;
        modal.style.display = 'block';
    }
});
