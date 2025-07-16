document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    const floatingCart = document.querySelector('.floating-cart');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');
    const notification = document.querySelector('.notification');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
    
    // Update cart UI
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            totalAmount.textContent = '0€';
        } else {
            let total = 0;
            
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.price}€</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            
            totalAmount.textContent = `${total.toFixed(2)}€`;
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
    
    // Add to cart function (call this from your product buttons)
    window.addToCart = function(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartUI();
        showNotification('Producto añadido al carrito');
    };
    
    // Show notification
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
    
    // Event delegation for quantity controls and remove buttons
    cartItemsContainer.addEventListener('click', function(e) {
        const index = e.target.closest('button')?.dataset?.index;
        
        if (e.target.classList.contains('plus') || e.target.closest('.plus')) {
            cart[index].quantity += 1;
            updateCartUI();
        } else if (e.target.classList.contains('minus') || e.target.closest('.minus')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            updateCartUI();
        } else if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            cart.splice(index, 1);
            updateCartUI();
            showNotification('Producto eliminado');
        }
    });
    
    // Toggle cart visibility
    cartIcon.addEventListener('click', function() {
        floatingCart.classList.add('show');
    });
    
    closeCartBtn.addEventListener('click', function() {
        floatingCart.classList.remove('show');
    });
    
    // Initialize cart UI
    updateCartUI();
});