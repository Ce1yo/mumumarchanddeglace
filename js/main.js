// Menu mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Toggle du menu mobile
burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animation des liens
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Animation du burger
    burger.classList.toggle('toggle');
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Filtrage des produits
document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('.categories li');
    const productCards = document.querySelectorAll('.product-card');
    
    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Function to filter products by category
    const filterProducts = (category) => {
        productCards.forEach(card => {
            card.classList.remove('active');
            if (category === 'all' || !category || card.getAttribute('data-category') === category) {
                card.classList.add('active');
            }
        });
        
        // Update active state in category list
        categoryItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-category') === category || 
                (!category && item.getAttribute('data-category') === 'all')) {
                item.classList.add('active');
            }
        });
    };
    
    // Show all products by default or filter by URL parameter
    if (categoryParam) {
        filterProducts(categoryParam);
    } else {
        filterProducts('all');
    }
    
    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Retirer la classe active de tous les éléments
                categoryItems.forEach(i => i.classList.remove('active'));
                // Ajouter la classe active à l'élément cliqué
                item.classList.add('active');
                
                const category = item.getAttribute('data-category');
                
                // Update URL without reloading the page
                const url = new URL(window.location);
                if (category === 'all') {
                    url.searchParams.delete('category');
                } else {
                    url.searchParams.set('category', category);
                }
                window.history.pushState({}, '', url);
                
                // Filter products
                filterProducts(category);
            });
        });
    }
    
    // Gestion du panier (simplifiée pour l'instant)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Animation d'ajout au panier
            button.textContent = 'Ajouté !';
            button.style.backgroundColor = '#2ecc71';
            
            // Réinitialiser le bouton après 2 secondes
            setTimeout(() => {
                button.textContent = 'Ajouter au panier';
                button.style.backgroundColor = '';
            }, 2000);
            
            // Ici, vous pourriez ajouter la logique pour ajouter le produit au panier
            console.log(`Produit ajouté: ${productName} - ${productPrice}`);
        });
    });
    
    // Animation au défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature, .product-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Appliquer l'animation au chargement
    window.addEventListener('load', () => {
        const features = document.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            feature.style.transitionDelay = `${index * 0.1}s`;
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'all 0.5s ease-out';
        });
        
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.style.transitionDelay = `${(index % 3) * 0.1}s`;
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
        });
        
        // Déclencher l'animation après un court délai
        setTimeout(animateOnScroll, 300);
    });
    
    // Déclencher l'animation au défilement
    window.addEventListener('scroll', animateOnScroll);
});
