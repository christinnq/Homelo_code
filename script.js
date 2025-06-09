let favorites = JSON.parse(localStorage.getItem('homeloFavorites')) || [];
let shoppingCart = JSON.parse(localStorage.getItem('homeloShoppingCart')) || [];
let currentFilter = 'all';
let currentPage = 1;
const propertiesPerPage = 6;
let allProperties = [];
let currentSort = 'price-asc';

const propertiesGrid = document.getElementById('propertiesGrid');
const featuredGrid = document.getElementById('featuredGrid');
const favoritesSidebar = document.getElementById('favoritesSidebar');
const shoppingCartSidebar = document.getElementById('shoppingCartSidebar');
const favoritesCount = document.getElementById('favoritesCount');
const cartCount = document.getElementById('cartCount');
const favoritesItems = document.getElementById('favoritesItems');
const shoppingItems = document.getElementById('shoppingItems');
const favoritesTotal = document.getElementById('favoritesTotal');
const shoppingTotal = document.getElementById('shoppingTotal');
const propertyModal = document.getElementById('propertyModal');
const modalContent = document.getElementById('modalContent');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const priceFilter = document.getElementById('priceFilter');
const sortProperties = document.getElementById('sortProperties');
const loadMoreBtn = document.getElementById('loadMoreBtn');

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    
    if (typeof properties !== 'undefined') {
        allProperties = [...properties];
        renderFeaturedProperties();
        renderProperties();
        updateFavoritesUI();
        updateShoppingCartUI();
    } else {
        updateFavoritesUI();
        updateShoppingCartUI();
    }
});

function setupEventListeners() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (navMenu) {
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        toggleMobileMenu();
                    }, 150);
                }
            });
        });
    }

    document.addEventListener('click', closeMobileMenuOnOutsideClick);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });

    window.addEventListener('resize', function() {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
            enableBodyScroll();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }

    if (typeFilter) {
        typeFilter.addEventListener('change', performSearch);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', performSearch);
    }
    if (sortProperties) {
        sortProperties.addEventListener('change', sortAndRenderProperties);
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProperties);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    window.addEventListener('click', function(e) {
        if (e.target === propertyModal) {
            closeModal();
        }
    });

    window.addEventListener('scroll', updateActiveNavOnScroll);

    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    if (!document.getElementById('mobile-enhancements')) {
        const style = document.createElement('style');
        style.id = 'mobile-enhancements';
        style.textContent = `
            .menu-open {
                overflow: hidden !important;
            }
            
            .touch-device .nav-link {
                -webkit-tap-highlight-color: transparent;
            }
            
            @media (max-width: 768px) {
                .nav-menu.active {
                    animation: slideInFromTop 0.3s ease-out;
                }
                
                .hamburger.active {
                    background: rgba(0, 0, 0, 0.05);
                }
                
                .nav-menu .nav-link {
                    position: relative;
                    overflow: hidden;
                }
                
                .nav-menu .nav-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(17, 17, 17, 0.05), transparent);
                    transition: left 0.5s;
                }
                
                .nav-menu .nav-link:active::before {
                    left: 100%;
                }
            }
            
            @keyframes slideInFromTop {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .nav-menu {
                -webkit-overflow-scrolling: touch;
            }
            
            .hamburger:focus {
                outline: 2px solid var(--text-dark);
                outline-offset: 2px;
            }
            
            @media screen and (max-width: 768px) {
                input[type="text"],
                input[type="email"],
                input[type="tel"],
                select,
                textarea {
                    font-size: 16px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;
    
    if (navMenu && hamburger) {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
            enableBodyScroll();
        } else {
            navMenu.classList.add('active');
            hamburger.classList.add('active');
            body.classList.add('menu-open');
            disableBodyScroll();
        }
    }
}

function disableBodyScroll() {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
}

function enableBodyScroll() {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

function closeMobileMenuOnOutsideClick(event) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');
    
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navContainer.contains(event.target)) {
            toggleMobileMenu();
        }
    }
}

function renderFeaturedProperties() {
    if (!featuredGrid || !featuredProperties) return;

    featuredGrid.innerHTML = '';

    featuredProperties.slice(0, 3).forEach(property => {
        const propertyCard = createPropertyCard(property, true);
        featuredGrid.appendChild(propertyCard);
    });
}

function renderProperties(propertiesToRender = null) {
    if (!propertiesGrid) return;

    const properties = propertiesToRender || getFilteredAndSortedProperties();
    
    if (currentPage === 1) {
        propertiesGrid.innerHTML = '';
    }

    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const propertiesToShow = properties.slice(startIndex, endIndex);

    propertiesToShow.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertiesGrid.appendChild(propertyCard);
    });

    updateLoadMoreButton(properties.length);
}

function createPropertyCard(property, isFeatured = false) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    const isFavorite = favorites.some(fav => fav.id === property.id);
    const isInCart = shoppingCart.some(item => item.id === property.id);
    const heartIcon = isFavorite ? 'fas fa-heart' : 'far fa-heart';
    const cartIcon = isInCart ? 'fas fa-shopping-cart' : 'far fa-plus-square';
    
    card.innerHTML = `
        <div class="property-image" onclick="openPropertyDetails(${property.id})">
            <div class="property-type">${capitalizeFirst(property.type)}</div>
        </div>
        <div class="property-content">
            <h3 class="property-title" onclick="openPropertyDetails(${property.id})">${property.title}</h3>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i>
                ${property.location}
            </div>
            <div class="property-features">
                <span><i class="fas fa-bed"></i> ${property.bedrooms}</span>
                <span><i class="fas fa-bath"></i> ${property.bathrooms}</span>
                <span><i class="fas fa-expand-arrows-alt"></i> ${property.area}m²</span>
            </div>
            <div class="property-price">€${property.price.toLocaleString()}</div>
            <div class="property-actions">
                <button class="btn btn-outline" onclick="openPropertyDetails(${property.id})">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <button class="btn btn-primary" onclick="toggleFavorite(${property.id})" style="background: var(--text-dark);">
                    <i class="${heartIcon}"></i> ${isFavorite ? 'Saved' : 'Save'}
                </button>
                <button class="btn btn-primary" onclick="addToCart(${property.id})" style="background: #5E6C5B;">
                    <i class="${cartIcon}"></i> ${isInCart ? 'In Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `;

    return card;
}

function getFilteredAndSortedProperties() {
    let filteredProperties = [...allProperties];

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    if (searchTerm) {
        filteredProperties = filteredProperties.filter(property => 
            property.title.toLowerCase().includes(searchTerm) ||
            property.location.toLowerCase().includes(searchTerm) ||
            property.type.toLowerCase().includes(searchTerm)
        );
    }

    const selectedType = typeFilter ? typeFilter.value : 'all';
    if (selectedType !== 'all') {
        filteredProperties = filteredProperties.filter(property => property.type === selectedType);
    }

    const selectedPriceRange = priceFilter ? priceFilter.value : 'all';
    if (selectedPriceRange !== 'all') {
        const [min, max] = selectedPriceRange.split('-').map(val => 
            val.includes('+') ? Infinity : parseInt(val)
        );
        filteredProperties = filteredProperties.filter(property => 
            property.price >= min && (max === Infinity || property.price <= max)
        );
    }

    if (currentFilter !== 'all') {
        filteredProperties = filteredProperties.filter(property => property.type === currentFilter);
    }

    const sortOption = sortProperties ? sortProperties.value : 'price-asc';
    filteredProperties.sort((a, b) => {
        switch (sortOption) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'area-desc':
                return b.area - a.area;
            case 'year-desc':
                return b.yearBuilt - a.yearBuilt;
            default:
                return 0;
        }
    });

    return filteredProperties;
}

function filterProperties(type) {
    currentFilter = type;
    currentPage = 1;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderProperties();
}

function performSearch() {
    currentPage = 1;
    renderProperties();
}

function sortAndRenderProperties() {
    currentPage = 1;
    renderProperties();
}

function loadMoreProperties() {
    currentPage++;
    renderProperties();
}

function updateLoadMoreButton(totalProperties) {
    if (!loadMoreBtn) return;

    const shownProperties = currentPage * propertiesPerPage;
    if (shownProperties >= totalProperties) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
        const remainingProperties = totalProperties - shownProperties;
        loadMoreBtn.textContent = `Load More Properties (${remainingProperties} remaining)`;
    }
}

function openPropertyDetails(propertyId) {
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) return;

    const isFavorite = favorites.some(fav => fav.id === property.id);
    const isInCart = shoppingCart.some(item => item.id === property.id);
    const heartIcon = isFavorite ? 'fas fa-heart' : 'far fa-heart';
    const favoriteText = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
    const cartIcon = isInCart ? 'fas fa-shopping-cart' : 'far fa-plus-square';
    const cartText = isInCart ? 'Remove from Cart' : 'Add to Cart';

    const modalHTML = `
        <div class="property-details">
            <div class="property-gallery">
                <div class="main-image">
                </div>
            </div>
            <div class="property-info">
                <h1>${property.title}</h1>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </div>
                <div class="property-price">€${property.price.toLocaleString()}</div>
                <div class="property-description">
                    ${property.description}
                </div>
                <div class="property-specs">
                    <div class="spec">
                        <div class="spec-value">${property.bedrooms}</div>
                        <div class="spec-label">Bedrooms</div>
                    </div>
                    <div class="spec">
                        <div class="spec-value">${property.bathrooms}</div>
                        <div class="spec-label">Bathrooms</div>
                    </div>
                    <div class="spec">
                        <div class="spec-value">${property.area}m²</div>
                        <div class="spec-label">Area</div>
                    </div>
                    <div class="spec">
                        <div class="spec-value">${property.yearBuilt}</div>
                        <div class="spec-label">Year Built</div>
                    </div>
                    <div class="spec">
                        <div class="spec-value">${property.energyClass}</div>
                        <div class="spec-label">Energy Class</div>
                    </div>
                    <div class="spec">
                        <div class="spec-value">${property.orientation}</div>
                        <div class="spec-label">Orientation</div>
                    </div>
                </div>
                <div style="margin-top: 2rem;">
                    <h3>Features:</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-top: 1rem; font-size: 0.9rem;">
                        ${property.features.parking > 0 ? `<div><i class="fas fa-car"></i> ${property.features.parking} Parking spaces</div>` : ''}
                        ${property.features.garden ? '<div><i class="fas fa-seedling"></i> Garden</div>' : ''}
                        ${property.features.pool ? '<div><i class="fas fa-swimming-pool"></i> Swimming Pool</div>' : ''}
                        ${property.features.terrace ? '<div><i class="fas fa-home"></i> Terrace</div>' : ''}
                        ${property.features.fireplace ? '<div><i class="fas fa-fire"></i> Fireplace</div>' : ''}
                        ${property.features.airConditioning ? '<div><i class="fas fa-snowflake"></i> Air Conditioning</div>' : ''}
                        ${property.features.security ? '<div><i class="fas fa-shield-alt"></i> Security System</div>' : ''}
                        ${property.features.storage > 0 ? `<div><i class="fas fa-warehouse"></i> ${property.features.storage} Storage rooms</div>` : ''}
                    </div>
                </div>
                <div style="margin-top: 2rem; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                    <button class="btn btn-primary" onclick="toggleFavorite(${property.id}); updateModalButtons(${property.id});" style="background: var(--text-dark);">
                        <i class="${heartIcon}"></i> ${favoriteText}
                    </button>
                    <button class="btn btn-primary" onclick="addToCart(${property.id}); updateModalButtons(${property.id});" style="background: #5E6C5B;">
                        <i class="${cartIcon}"></i> ${cartText}
                    </button>
                    <button class="btn btn-outline" onclick="contactAgent(${property.id})">
                        <i class="fas fa-phone"></i> Contact Agent
                    </button>
                </div>
            </div>
        </div>
    `;

    modalContent.innerHTML = modalHTML;
    propertyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    propertyModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateModalButtons(propertyId) {
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) return;

    const isFavorite = favorites.some(fav => fav.id === property.id);
    const isInCart = shoppingCart.some(item => item.id === property.id);
    
    const favoriteButton = document.querySelector('.property-info .btn-primary[style*="var(--text-dark)"]');
    const cartButton = document.querySelector('.property-info .btn-primary[style*="#5E6C5B"]');
    
    if (favoriteButton) {
        const heartIcon = isFavorite ? 'fas fa-heart' : 'far fa-heart';
        const favoriteText = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
        favoriteButton.innerHTML = `<i class="${heartIcon}"></i> ${favoriteText}`;
    }
    
    if (cartButton) {
        const cartIcon = isInCart ? 'fas fa-shopping-cart' : 'far fa-plus-square';
        const cartText = isInCart ? 'Remove from Cart' : 'Add to Cart';
        cartButton.innerHTML = `<i class="${cartIcon}"></i> ${cartText}`;
    }
}

function toggleFavorite(propertyId) {
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) return;

    const existingIndex = favorites.findIndex(fav => fav.id === propertyId);
    
    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
        showNotification('Property removed from favorites!', 'info');
    } else {
        favorites.push({
            id: property.id,
            title: property.title,
            location: property.location,
            price: property.price,
            type: property.type
        });
        showNotification('Property added to favorites!', 'success');
    }

    localStorage.setItem('homeloFavorites', JSON.stringify(favorites));
    updateFavoritesUI();
    
    renderProperties();
    renderFeaturedProperties();
}

function removeFromFavorites(propertyId) {
    favorites = favorites.filter(fav => fav.id !== propertyId);
    localStorage.setItem('homeloFavorites', JSON.stringify(favorites));
    updateFavoritesUI();
    showNotification('Property removed from favorites!', 'info');
}

function toggleSidebar(type) {
    if (type === 'favorites') {
        favoritesSidebar.classList.toggle('active');
        shoppingCartSidebar.classList.remove('active');
    } else if (type === 'cart') {
        shoppingCartSidebar.classList.toggle('active');
        favoritesSidebar.classList.remove('active');
    }
    
    if (favoritesSidebar.classList.contains('active') || shoppingCartSidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function updateFavoritesUI() {
    if (favoritesCount) {
        favoritesCount.textContent = favorites.length;
    }

    if (favoritesItems) {
        if (favorites.length === 0) {
            favoritesItems.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-light);">No favorite properties</div>';
            if (favoritesTotal) {
                favoritesTotal.textContent = '€0';
            }
            return;
        }

        favoritesItems.innerHTML = '';
        let total = 0;

        favorites.forEach(item => {
            total += item.price;
            
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            favoriteItem.innerHTML = `
                <div class="favorite-item-image">
                </div>
                <div class="favorite-item-info">
                    <div class="favorite-item-title">${item.title}</div>
                    <div class="favorite-item-location">${item.location}</div>
                    <div class="favorite-item-price">€${item.price.toLocaleString()}</div>
                </div>
                <button class="remove-favorite" onclick="removeFromFavorites(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            favoritesItems.appendChild(favoriteItem);
        });

        if (favoritesTotal) {
            favoritesTotal.textContent = `€${total.toLocaleString()}`;
        }
    }
}

function contactAboutFavorites() {
    if (favorites.length === 0) {
        showNotification('No favorite properties to inquire about!', 'warning');
        return;
    }

    const propertyTitles = favorites.map(fav => fav.title).join(', ');
    showNotification(`Inquiry sent about: ${propertyTitles}. An agent will contact you soon!`, 'success');
    
    toggleSidebar('favorites');
}

function contactAgent(propertyId) {
    const property = allProperties.find(p => p.id === propertyId);
    if (property) {
        showNotification(`Inquiry sent for ${property.title}. An agent will contact you soon!`, 'info');
    }
}

function handleContactForm(e) {
    e.preventDefault();
    showNotification('Your message has been sent successfully! We will respond soon.', 'success');
    e.target.reset();
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#5E6C5B' : type === 'warning' ? '#f59e0b' : type === 'error' ? '#ef4444' : '#111111'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1004;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-size: 0.9rem;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.documentElement.style.scrollBehavior = 'smooth';

function addToCart(propertyId) {
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) return;

    const existingItem = shoppingCart.find(item => item.id === propertyId);
    
    if (existingItem) {
        removeFromCart(propertyId);
        return;
    } else {
        shoppingCart.push({
            id: property.id,
            title: property.title,
            location: property.location,
            price: property.price,
            type: property.type,
            quantity: 1
        });
        showNotification('Property added to cart!', 'success');
    }

    localStorage.setItem('homeloShoppingCart', JSON.stringify(shoppingCart));
    updateShoppingCartUI();
    
    renderProperties();
    renderFeaturedProperties();
}

function removeFromCart(propertyId) {
    shoppingCart = shoppingCart.filter(item => item.id !== propertyId);
    localStorage.setItem('homeloShoppingCart', JSON.stringify(shoppingCart));
    updateShoppingCartUI();
    renderProperties();
    renderFeaturedProperties();
    showNotification('Property removed from cart!', 'info');
}

function updateQuantity(propertyId, change) {
    const item = shoppingCart.find(item => item.id === propertyId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(propertyId);
        return;
    }

    localStorage.setItem('homeloShoppingCart', JSON.stringify(shoppingCart));
    updateShoppingCartUI();
}

function updateShoppingCartUI() {
    if (cartCount) {
        const totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    if (shoppingItems) {
        if (shoppingCart.length === 0) {
            shoppingItems.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-light);">Your cart is empty</div>';
            if (shoppingTotal) {
                shoppingTotal.textContent = '€0';
            }
            return;
        }

        shoppingItems.innerHTML = '';
        let total = 0;

        shoppingCart.forEach(item => {
            total += item.price * item.quantity;
            
            const shoppingItem = document.createElement('div');
            shoppingItem.className = 'shopping-item';
            shoppingItem.innerHTML = `
                <div class="shopping-item-image">
                </div>
                <div class="shopping-item-info">
                    <div class="shopping-item-title">${item.title}</div>
                    <div class="shopping-item-location">${item.location}</div>
                    <div class="shopping-item-price">€${item.price.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-from-cart" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            shoppingItems.appendChild(shoppingItem);
        });

        if (shoppingTotal) {
            shoppingTotal.textContent = `€${total.toLocaleString()}`;
        }
    }
}

function proceedToCheckout() {
    if (shoppingCart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }

    createCheckoutPage();
}

function createCheckoutPage() {
    const total = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);

    const checkoutHTML = `
        <div class="checkout-container" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-white); z-index: 1003; overflow-y: auto;">
            <div class="container" style="padding: 2rem; max-width: 1000px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h1>Checkout</h1>
                    <button onclick="closeCheckout()" style="background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-light);">×</button>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 400px; gap: 3rem;">
                    <div class="checkout-form">
                        <h2>Billing Information</h2>
                        <form id="checkoutForm" style="display: grid; gap: 1.5rem; margin-top: 2rem;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <input type="text" placeholder="First Name" required style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
                                <input type="text" placeholder="Last Name" required style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
                            </div>
                            <input type="email" placeholder="Email Address" required style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
                            <input type="tel" placeholder="Phone Number" required style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
                            <input type="text" placeholder="Address" required style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
                            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem;">
                                <input type="text" placeholder="City" required style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
                                <input type="text" placeholder="Postal Code" required style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
                            </div>
                            
                            <h3 style="margin-top: 2rem;">Payment Method</h3>
                            <div style="display: grid; gap: 1rem;">
                                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;">
                                    <input type="radio" name="paymentMethod" value="bank" checked>
                                    <i class="fas fa-university"></i>
                                    <span>Bank Transfer</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;">
                                    <input type="radio" name="paymentMethod" value="cash">
                                    <i class="fas fa-money-bill"></i>
                                    <span>Cash Payment</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;">
                                    <input type="radio" name="paymentMethod" value="financing">
                                    <i class="fas fa-chart-line"></i>
                                    <span>Property Financing</span>
                                </label>
                            </div>
                            
                            <textarea placeholder="Additional Notes (Optional)" rows="3" style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; resize: vertical;"></textarea>
                            
                            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 2rem; padding: 16px; background: #5E6C5B; font-size: 1.1rem;">
                                <i class="fas fa-credit-card"></i> Complete Purchase - €${total.toLocaleString()}
                            </button>
                        </form>
                    </div>
                    
                    <div class="order-summary" style="background: var(--bg-light); padding: 2rem; border-radius: 12px; height: fit-content;">
                        <h3>Order Summary</h3>
                        <div style="margin: 1.5rem 0;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Total Items:</span>
                                <span>${totalItems}</span>
                            </div>
                        </div>
                        <div style="margin-top: 2rem;">
                            ${shoppingCart.map(item => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 1rem; background: white;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 0.9rem;">${item.title}</div>
                                        <div style="color: var(--text-light); font-size: 0.8rem;">${item.location}</div>
                                        <div style="color: var(--text-light); font-size: 0.8rem;">Qty: ${item.quantity}</div>
                                    </div>
                                    <div style="font-weight: 700; color: #5E6C5B;">€${(item.price * item.quantity).toLocaleString()}</div>
                                </div>
                            `).join('')}
                        </div>
                        <div style="border-top: 2px solid var(--border-color); padding-top: 1rem; margin-top: 1rem;">
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700;">
                                <span>Total:</span>
                                <span style="color: #000;">€${total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', checkoutHTML);
    document.body.style.overflow = 'hidden';

    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmission);
}

function closeCheckout() {
    const checkoutContainer = document.querySelector('.checkout-container');
    if (checkoutContainer) {
        checkoutContainer.remove();
    }
    document.body.style.overflow = 'auto';
}

function handleCheckoutSubmission(e) {
    e.preventDefault();
    
    showNotification('Your order has been placed successfully! Our team will contact you soon.', 'success');
    
    shoppingCart = [];
    localStorage.setItem('homeloShoppingCart', JSON.stringify(shoppingCart));
    updateShoppingCartUI();
    
    closeCheckout();
    toggleSidebar('cart');
    
    renderProperties();
    renderFeaturedProperties();
    
    setTimeout(() => {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
} 