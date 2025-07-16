document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 2000);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('open');
        this.innerHTML = mainNav.classList.contains('open') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Theme Switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeSwitcher.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.innerHTML = newTheme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Filter Products
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize products (this would normally come from a database)
    initializeProducts();
});

function initializeProducts() {
    const productList = document.querySelector('.product-list');
    
    const products = [
        {
            id: 1,
            name: "Placa Base",
            description: "MSI B650 GAMING PLUS WIFI",
            price: 170.98,
            image: "https://thumb.pccomponentes.com/w-530-530/articles/1073/10733728/5872-msi-b650-gaming-plus-wifi-caracteristicas.jpg",
            category: "motherboard"
        },
        {
            id: 2,
            name: "Procesador",
            description: "Intel Core i9-14900KF 3.2/6GHz Box",
            price: 349.99,
            image: "https://thumb.pccomponentes.com/w-530-530/articles/1077/10779174/1127-intel-core-i9-14900kf-32-6ghz-box.jpg",
            category: "cpu"
        },
        {
            id: 3,
            name: "Memoria RAM",
            description: "Corsair Vengeance RGB Pro 32GB",
            price: 78.99,
            image: "https://img.pccomponentes.com/articles/35/351295/1838-corsair-vengeance-rgb-pro-ddr4-3200-pc4-25600-32gb-2x16gb-cl16.jpg",
            category: "ram"
        },
        {
            id: 4,
            name: "Tarjeta Gráfica",
            description: "ASUS Dual GeForce RTX 4060 V2 OC Edition 8GB GDDR6 DLSS3",
            price: 409.99,
            image: "https://img.pccomponentes.com/articles/1080/10802398/1764-asus-dual-geforce-rtx-4060-v2-oc-edition-8gb-gddr6-dlss3-2bfe8e2d-42c1-469d-bec5-a077d07f2fd5.jpg",
            category: "gpu"
        },
        {
            id: 5,
            name: "Caja PC Gaming",
            description: "CoolBox GE2000 DualView frontal doble magnético, 4x ARGB, ATX, negro",
            price: 85.90,
            image: "https://img.pccomponentes.com/articles/1092/10920189/1176-caja-pc-gaming-coolbox-ge2000-dualview-frontal-doble-magnetico-4x-argb-atx-negro.jpg",
            category: "case"
        },
        {
            id: 6,
            name: "Disco Duro",
            description: "Kingston FURY Renegade SSD 1TB M.2 PCIe 4.0 NVMe",
            price: 119.95,
            image: "https://thumb.pccomponentes.com/w-530-530/articles/73/737021/1958-kingston-fury-renegade-ssd-1tb-m2-pcie-40-nvme.jpg",
            category: "storage"
        },
        {
            id: 7,
            name: "Ventilador CPU",
            description: "Tempest Cooler 6Pipes A-RGB 2x120mm",
            price: 50.95,
            image: "https://img.pccomponentes.com/articles/1080/10804383/1469-tempest-cooler-6pipes-black-rgb-ventilador-cpu-dual-heatsink-2x120mm-negro-foto.jpg",
            category: "cooling"
        },
        {
            id: 8,
            name: "Teclado Gaming",
            description: "SteelSeries Apex 3 TKL RGB US",
            price: 49.99,
            image: "https://img.pccomponentes.com/articles/1046/10461020/2222-steelseries-apex-3-tkl-teclado-gaming-rgb-us-comprar.jpg",
            category: "peripherals"
        },
        {
            id: 9,
            name: "Ratón Gaming",
            description: "Tempest MS300 Razor 4000DPI RGB",
            price: 14.90,
            image: "https://img.pccomponentes.com/articles/1081/10817489/2930-tempest-ms300-razor-raton-gaming-4000dpi-rgb-negro-foto.jpg",
            category: "peripherals"
        },
        {
            id: 10,
            name: "Fuente de Alimentación",
            description: "Tempest PSU PRO 750W 80+ Bronze",
            price: 54.00,
            image: "https://img.pccomponentes.com/articles/40/409508/1949-tempest-gaming-psu-pro-750w-80-plus-bronce.jpg",
            category: "power"
        },
        {
            id: 11,
            name: "Monitor",
            description: "MSI G27C3F 27\" LED FullHD 180Hz",
            price: 127.00,
            image: "https://img.pccomponentes.com/articles/1080/10800434/1370-msi-g27c3f-27-led-fullhd-180hz-curvo.jpg",
            category: "monitor"
        },
        {
            id: 12,
            name: "Auriculares Gaming",
            description: "Spirit of Gamer PRO-H8 RGB",
            price: 24.00,
            image: "https://img.pccomponentes.com/articles/1074/10740884/1228-spirit-of-gamer-pro-h8-auriculares-gaming-rgb-con-microfono-negro.jpg",
            category: "peripherals"
        }
    ];

    // Generate product cards
    products.forEach((product, index) => {
        const productCard = document.createElement('article');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category;
        productCard.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        
        productCard.innerHTML = `
            <section class="card-image">
                <img src="${product.image}" alt="${product.name}">
            </section>
            <section class="card-data">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <div class="price">
                    <span class="pricio">${product.price.toFixed(2)}€</span>
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Añadir al carrito
                </button>
            </section>
        `;
        
        productList.appendChild(productCard);
    });
}