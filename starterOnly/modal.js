function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData")
const modalthanks = document.querySelector(".bground-thanks");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
document.querySelector(".close").addEventListener("click", closeModal);

// close modal thanks
document.querySelector(".close-thanks").addEventListener("click", closeModalthanks);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.body.style.overflow = 'hidden';
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
// close modal thanks
function closeModalthanks() {
  modalthanks.style.display = "none";

}


function validate() {
  // Récupération des valeurs des champs
  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;
  
  
  // Initialisation d'un statut de validation
  let isValid = true;
  
  // Vérification si un lieu a été sélectionné
  const locationInputs = document.querySelectorAll('input[name="location"]');
  let locationSelected = false;
  for (let i = 0; i < locationInputs.length; i++) {
    if (locationInputs[i].checked) {
      locationSelected = true;
      break;
    }
  }
  
  // Vérification des conditions d'utilisation
  const termsChecked = document.getElementById("checkbox1").checked;
  
  // Validation du prénom (au moins 2 caractères)
  if (firstName.trim().length < 2) {
    createErrorMessage("first", "Veuillez entrer un prénom valide (2 caractères minimum).");
    isValid = false;
  } else {
    clearErrorMessage("first");
  }
  
  // Validation du nom (au moins 2 caractères)
  if (lastName.trim().length < 2) {
    createErrorMessage("last", "Veuillez entrer un nom valide (2 caractères minimum).");
    isValid = false;
  } else {
    clearErrorMessage("last");
  }
  
  // Validation de l'email avec une expression régulière
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    createErrorMessage("email", "Veuillez entrer une adresse email valide.");
    isValid = false;
  } else {
    clearErrorMessage("email");
  }
  
  // Validation de la date de naissance (simplement s'assurer qu'une date est entrée)
  if (!birthdate) {
    createErrorMessage("birthdate", "Veuillez entrer votre date de naissance.");
    isValid = false;
  } else {
    clearErrorMessage("birthdate");
  }
  
  // Validation de la quantité (doit être un nombre entre 0 et 99)
  if (quantity === "" || isNaN(quantity) || parseInt(quantity) < 0 || parseInt(quantity) > 99) {
    createErrorMessage("quantity", "Veuillez indiquer un nombre de tournois valide (entre 0 et 99).");
    isValid = false;
  } else {
    clearErrorMessage("quantity");
  }
  
  // Validation du choix de lieu
  if (!locationSelected) {
    // Créer un message d'erreur pour la section des lieux
    const locationSection = document.querySelector('.formData:nth-of-type(6)');
    
    // Vérifier si un message d'erreur existe déjà
    const existingError = document.getElementById("location-error");
    if (!existingError) {
      const errorDiv = document.createElement("div");
      errorDiv.id = "location-error";
      errorDiv.className = "error-message";
      errorDiv.textContent = "Veuillez sélectionner un lieu de tournoi.";
      errorDiv.style.color = "red";
      errorDiv.style.fontSize = "12px";
      errorDiv.style.marginTop = "5px";
      
      // Ajouter le message après les options de lieu
      locationSection.appendChild(errorDiv);
    }
    
    isValid = false;
  } else {
    // Effacer le message d'erreur s'il existe
    const errorDiv = document.getElementById("location-error");
    if (errorDiv) {
      errorDiv.remove();
    }
  }
  
  // Validation des conditions d'utilisation
  if (!termsChecked) {
    // Créer un message d'erreur pour les conditions
    const termsSection = document.querySelector('.formData:nth-of-type(7)');
    
    // Vérifier si un message d'erreur existe déjà
    const existingError = document.getElementById("terms-error");
    if (!existingError) {
      const errorDiv = document.createElement("div");
      errorDiv.id = "terms-error";
      errorDiv.className = "error-message";
      errorDiv.textContent = "Vous devez accepter les conditions d'utilisation.";
      errorDiv.style.color = "red";
      errorDiv.style.fontSize = "12px";
      errorDiv.style.marginTop = "5px";
      
      // Ajouter le message après les conditions
      termsSection.appendChild(errorDiv);
    }
    
    isValid = false;
  } else {
    // Effacer le message d'erreur s'il existe
    const errorDiv = document.getElementById("terms-error");
    if (errorDiv) {
      errorDiv.remove();
    }
  }
  
  // Si toutes les validations sont passées
  return isValid;
}



// Fonction pour ajouter des messages d'erreur sous chaque champ
function createErrorMessage(id, message) {
  // Vérifier si un message d'erreur existe déjà
  const existingError = document.getElementById(id + "-error");
  if (existingError) {
    existingError.textContent = message;
    return;
  }
  
  // Créer un nouvel élément pour le message d'erreur
  const errorDiv = document.createElement("div");
  errorDiv.id = id + "-error";
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "12px";
  errorDiv.style.marginTop = "5px";
  
  // Ajouter le message après le champ
  const field = document.getElementById(id);
  field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

// Fonction pour effacer les messages d'erreur
function clearErrorMessage(id) {
  const errorDiv = document.getElementById(id + "-error");
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Ajout de la validation en temps réel pour chaque champ
document.addEventListener("DOMContentLoaded", function() {
  // Validation du prénom
  document.getElementById("first").addEventListener("input", function() {
    if (this.value.trim().length < 2) {
      createErrorMessage("first", "Le prénom doit contenir au moins 2 caractères");
    } else {
      clearErrorMessage("first");
    }
  });
  
  // Validation du nom
  document.getElementById("last").addEventListener("input", function() {
    if (this.value.trim().length < 2) {
      createErrorMessage("last", "Le nom doit contenir au moins 2 caractères");
    } else {
      clearErrorMessage("last");
    }
  });
  
  // Validation de l'email
  document.getElementById("email").addEventListener("input", function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      createErrorMessage("email", "Veuillez entrer une adresse email valide");
    } else {
      clearErrorMessage("email");
    }
  });
  
  // Validation simple de la date de naissance (juste vérifier si elle est remplie)
  document.getElementById("birthdate").addEventListener("change", function() {
    if (!this.value) {
      createErrorMessage("birthdate", "Veuillez entrer votre date de naissance");
    } else {
      clearErrorMessage("birthdate");
    }
  });
  
  // Validation du nombre de tournois
  document.getElementById("quantity").addEventListener("input", function() {
    if (this.value === "" || isNaN(this.value) || parseInt(this.value) < 0 || parseInt(this.value) > 99) {
      createErrorMessage("quantity", "Veuillez entrer un nombre entre 0 et 99");
    } else {
      clearErrorMessage("quantity");
    }
  });
  
  // Validation des choix de lieu
  const locationInputs = document.querySelectorAll('input[name="location"]');
  locationInputs.forEach(input => {
    input.addEventListener("change", function() {
      const errorDiv = document.getElementById("location-error");
      if (errorDiv) {
        errorDiv.remove();
      }
    });
  });
  
  // Validation des conditions d'utilisation
  document.getElementById("checkbox1").addEventListener("change", function() {
    const errorDiv = document.getElementById("terms-error");
    if (this.checked && errorDiv) {
      errorDiv.remove();
    } else if (!this.checked) {
      const termsSection = document.querySelector('.formData:nth-of-type(7)');
      if (!document.getElementById("terms-error")) {
        const errorDiv = document.createElement("div");
        errorDiv.id = "terms-error";
        errorDiv.className = "error-message";
        errorDiv.textContent = "Vous devez accepter les conditions d'utilisation.";
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "12px";
        errorDiv.style.marginTop = "5px";
        termsSection.appendChild(errorDiv);
      }
    }
  });
});
// Fonction pour afficher un message de succès
function messageValidation() {
  // Cacher le formulaire
  modalbg.style.display = "none";
  
  // Afficher le message de succès
  modalthanks.style.display = "block";
  
}

// Validation du formulaire lors de la soumission
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche la soumission du formulaire
  if (validate()) {
    messageValidation();
  }
});