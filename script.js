document.addEventListener('DOMContentLoaded', function() {

  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-link');

  if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          alert("Thank you for your message! It has been sent.");
          contactForm.reset();
        } else {
          alert("Oops! There was a problem. Please try again.");
        }
      }).catch(error => {
        alert("Oops! A network error occurred. Please try again.");
      });
    });
  }
  
  const searchInput = document.getElementById('searchInput');
  const suggestionsBox = document.getElementById('suggestionsBox');
  const recipeCards = document.querySelectorAll('.recipe-card');
  const searchForm = document.querySelector('.search-box');

  const recipes = [];
  recipeCards.forEach(card => {
    const titleElement = card.querySelector('h2');
    if (titleElement) {
      recipes.push({
        name: titleElement.textContent.trim(),
        element: card
      });
    }
  });

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    
    suggestionsBox.innerHTML = '';

    if (query.length === 0) {
      suggestionsBox.style.display = 'none';
      return;
    }

    const filteredRecipes = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(query)
    );

    if (filteredRecipes.length > 0) {
      filteredRecipes.forEach(recipe => {
        const item = document.createElement('div');
        item.classList.add('suggestion-item');
        item.textContent = recipe.name;
        
        item.addEventListener('click', function() {
          
          recipe.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          searchInput.value = '';
          suggestionsBox.style.display = 'none';
        });
        
        suggestionsBox.appendChild(item);
      });
      suggestionsBox.style.display = 'block';
    } else {
      suggestionsBox.style.display = 'none';
    }
  });
  
  searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
  });
});