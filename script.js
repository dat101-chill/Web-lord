document.addEventListener("DOMContentLoaded", function () {
    const categoryItems = document.querySelectorAll(".category-item");
    const categories = document.querySelectorAll(".category");
    const suggestedProducts = document.getElementById("suggested-products");
    const cartLink = document.querySelector(".cart-link");
    let cart = [];

    const products = [
        { id: "suggested-products", name: "Áo Thun Polo Nam Thêu Chữ U", price: "$10", img: "img/vn-11134207-7r98o-lrol6kavr6hl42.webp" },
        { id: "suggested-products", name: "Tai nghe Bluetooth 5.3 không dây", price: "$15", img: "img/sg-11134301-7rcbu-ltuwe1ovx45y1b.webp" },
        { id: "gia-dung", name: "Máy Xay Sinh Tố Đa Năng KAW SILVER CREST SC-1589", price: "₫308.000", img: "img/mayxaysinhto.webp" },
        { id: "gia-dung", name: "Lò vi sóng Cuckoo 20 lít CMW-A201D", price: "₫1.290.000", img: "img/lò vi sóng.webp" },
        { id: "gia-dung", name: "Khăn Tắm Sumi Lớn Kích Thước 70x140cm", price: "₫18.900", img: "img/gia dụng 1.webp" },
        { id: "gia-dung", name: "Cây Lau Bàn Bếp Tự Vắt Thông Minh Mini 25cm", price: "₫16.379", img: "img/giadungj 2.webp" },
        { id: "gia-dung", name: "Thùng rác lưới thép màu đen", price: "₫29.000", img: "img/gia dụng 3.webp" },
        { id: "quan-ao", name: "Áo Thun Polo Nam Thêu Chữ U", price: "₫196.000", img: "img/vn-11134207-7r98o-lrol6kavr6hl42.webp" },
        { id: "quan-ao", name: "Quần jeans nữ dáng ôm skinny lưng cao Avocado", price: "₫176.000", img: "img/quầnnjean.webp" },
        { id: "quan-ao", name: "Áo polo nữ TOLI 16 màu trơn", price: "₫172.000", img: "img/quần áo 1.webp" },
        { id: "quan-ao", name: "Áo Kiểu Nữ Trễ Vai Tay Bồng", price: "₫119.000", img: "img/quần áo 3.webp" },
        { id: "quan-ao", name: "Quần Jean Ống Rộng WIDE LEG", price: "₫144.000", img: "img/quần áo 2.webp" },
        { id: "thiet-bi-dien-tu", name: "Laptop ASUS Vivobook S 14 OLED", price: "₫34.890.000", img: "img/laptop1.webp" },
        { id: "thiet-bi-dien-tu", name: "iPhone 16 Pro Max 256GB", price: "₫32.290.000", img: "img/phone1.webp" },
        { id: "thiet-bi-dien-tu", name: "Điện Thoại Samsung Galaxy S24 Ultra", price: "₫33.990.000", img: "img/tbdt2.webp" },
        { id: "thiet-bi-dien-tu", name: "Tai nghe Bluetooth không dây A6STWS", price: "₫51.700", img: "img/tbdt1.webp" },
        { id: "thiet-bi-dien-tu", name: "Điện thoại thông minh Xiaomi 15 Ultra", price: "₫31.990.000", img: "img/tbdt3.webp" },
        { id: "qua-tang", name: "Set Quà Tặng Nến Thơm Aroma Story", price: "₫94.000", img: "img/quà1.webp" },
        { id: "qua-tang", name: "Bộ quà tặng bạn gái 8/3", price: "₫179.000", img: "img/quà2.webp" },
        { id: "qua-tang", name: "Bộ quà tặng nến và sáp thơm ONIÕ", price: "₫238.400", img: "img/quà3.webp" },
        { id: "qua-tang", name: "Bộ Trang Sức CELINA Tif Watches", price: "₫550.000", img: "img/quà4.webp" },
        { id: "qua-tang", name: "Sáng Tạo Tự Làm Hoa Tulip Biển", price: "₫42.900", img: "img/quà5.webp" }
    ];

    function generateProductHTML(product) {
        return `
            <div class="product" data-id="${product.id}">
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <p>Giá: ${product.price}</p>
                <div class="star-rating">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
            </div>
        `;
    }

    function renderProducts() {
        const productSections = {
            "suggested-products": document.getElementById("suggested-products"),
            "gia-dung": document.getElementById("gia-dung"),
            "quan-ao": document.getElementById("quan-ao"),
            "thiet-bi-dien-tu": document.getElementById("thiet-bi-dien-tu"),
            "qua-tang": document.getElementById("qua-tang")
        };

        Object.keys(productSections).forEach(section => {
            productSections[section].innerHTML = "";
        });

        products.forEach(product => {
            if (productSections[product.id]) {
                productSections[product.id].innerHTML += generateProductHTML(product);
            }
        });

        document.querySelectorAll(".product").forEach(productElement => {
            productElement.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                const product = products.find(p => p.id === productId);
                showProductOptions(product);
            });
        });

        document.querySelectorAll(".star-rating span").forEach(star => {
            star.addEventListener("click", function () {
                const allStars = this.parentElement.querySelectorAll("span");
                allStars.forEach(s => s.classList.remove("selected"));
                this.classList.add("selected");
                let previousSibling = this.previousElementSibling;
                while (previousSibling) {
                    previousSibling.classList.add("selected");
                    previousSibling = previousSibling.previousElementSibling;
                }
                const rating = Array.from(allStars).filter(s => s.classList.contains("selected")).length;
                console.log(`Rating: ${rating} stars`);
            });
        });
    }

    function showCategory(categoryId) {
        categories.forEach(category => {
            category.classList.add("hidden");
        });

        suggestedProducts.classList.add("hidden");

        const selectedCategory = document.getElementById(categoryId);
        if (selectedCategory) {
            selectedCategory.classList.remove("hidden");
        }
    }

    function showSingleProduct(product) {
        categories.forEach(category => {
            category.classList.add("hidden");
        });
        suggestedProducts.classList.add("hidden");

        const productSection = document.createElement("section");
        productSection.classList.add("products");
        productSection.innerHTML = generateProductHTML(product);
        document.querySelector("main").innerHTML = "";
        document.querySelector("main").appendChild(productSection);
    }

    function showProductOptions(product) {
        const productSection = document.createElement("section");
        productSection.classList.add("product-options");
        productSection.innerHTML = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <p>Giá: ${product.price}</p>
                <div class="star-rating">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
                <button class="order-now">Đặt hàng ngay</button>
                <button class="add-to-cart">Thêm vào giỏ hàng</button>
            </div>
        `;
        document.querySelector("main").innerHTML = "";
        document.querySelector("main").appendChild(productSection);

        document.querySelector(".order-now").addEventListener("click", function () {
            showPaymentOptions();
        });

        document.querySelector(".add-to-cart").addEventListener("click", function () {
            addToCart(product);
            alert("Đã thêm vào giỏ hàng!");
        });

        document.querySelectorAll(".star-rating span").forEach(star => {
            star.addEventListener("click", function () {
                const allStars = this.parentElement.querySelectorAll("span");
                allStars.forEach(s => s.classList.remove("selected"));
                this.classList.add("selected");
                let previousSibling = this.previousElementSibling;
                while (previousSibling) {
                    previousSibling.classList.add("selected");
                    previousSibling = previousSibling.previousElementSibling;
                }
                const rating = Array.from(allStars).filter(s => s.classList.contains("selected")).length;
                console.log(`Rating: ${rating} stars`);
            });
        });
    }

    function showPaymentOptions() {
        const paymentSection = document.createElement("section");
        paymentSection.classList.add("payment-options");
        paymentSection.innerHTML = `
            <div class="payment-window">
                <h2>Chọn phương thức thanh toán</h2>
                <button class="payment-option" data-method="cod">COD (Thanh toán khi nhận hàng)</button>
                <button class="payment-option" data-method="bank">Thẻ ngân hàng</button>
                <button class="payment-option" data-method="transfer">Chuyển khoản</button>
                <button class="close-payment">Đóng</button>
            </div>
        `;
        document.querySelector("main").appendChild(paymentSection);

        document.querySelectorAll(".payment-option").forEach(option => {
            option.addEventListener("click", function () {
                const method = this.getAttribute("data-method");
                alert(`Bạn đã chọn phương thức thanh toán: ${method}`);
                paymentSection.remove();
            });
        });

        document.querySelector(".close-payment").addEventListener("click", function () {
            paymentSection.remove();
        });
    }

    function addToCart(product) {
        cart.push(product);
    }

    function showCart() {
        const cartSection = document.createElement("section");
        cartSection.classList.add("cart");
        cartSection.innerHTML = `
            <h2>Giỏ hàng</h2>
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.img}" alt="${item.name}">
                        <p>${item.name}</p>
                        <p>Giá: ${item.price}</p>
                        <div class="star-rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <button class="order-now">Đặt hàng ngay</button>
                        <button class="remove-from-cart">Xóa</button>
                    </div>
                `).join('')}
            </div>
            <button class="close-cart">Đóng</button>
        `;
        document.querySelector("main").innerHTML = "";
        document.querySelector("main").appendChild(cartSection);

        document.querySelectorAll(".order-now").forEach(button => {
            button.addEventListener("click", function () {
                showPaymentOptions();
            });
        });

        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", function () {
                const productId = this.parentElement.getAttribute("data-id");
                cart = cart.filter(item => item.id !== productId);
                showCart();
            });
        });

        document.querySelector(".close-cart").addEventListener("click", function () {
            restoreMainContent();
        });

        document.querySelectorAll(".star-rating span").forEach(star => {
            star.addEventListener("click", function () {
                const allStars = this.parentElement.querySelectorAll("span");
                allStars.forEach(s => s.classList.remove("selected"));
                this.classList.add("selected");
                let previousSibling = this.previousElementSibling;
                while (previousSibling) {
                    previousSibling.classList.add("selected");
                    previousSibling = previousSibling.previousElementSibling;
                }
                const rating = Array.from(allStars).filter(s => s.classList.contains("selected")).length;
                console.log(`Rating: ${rating} stars`);
            });
        });
    }

    function restoreMainContent() {
        document.querySelector("main").innerHTML = `
            <section id="suggested-products" class="products hidden"></section>
            <section id="gia-dung" class="products category hidden"></section>
            <section id="quan-ao" class="products category hidden"></section>
            <section id="thiet-bi-dien-tu" class="products category hidden"></section>
            <section id="qua-tang" class="products category hidden"></section>
        `;
        renderProducts();
    }

    categoryItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            const categoryId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showCategory(categoryId);
        });
    });

    document.querySelector(".logo").addEventListener("click", function (event) {
        event.preventDefault();
        restoreMainContent();
        showCategory("suggested-products");
    });

    cartLink.addEventListener("click", function (event) {
        event.preventDefault();
        showCart();
    });

    renderProducts();
    showCategory("suggested-products");

    const searchBar = document.querySelector(".search-bar");
    const searchSuggestions = document.querySelector(".search-suggestions");

    searchBar.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        searchSuggestions.innerHTML = "";
        if (query) {
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => {
                    const suggestion = document.createElement("div");
                    suggestion.classList.add("search-suggestion");
                    suggestion.setAttribute("data-id", product.id);
                    suggestion.innerHTML = `<img src="${product.img}" alt="${product.name}"><span>${product.name} - ${product.price}</span>`;
                    suggestion.addEventListener("click", function () {
                        showSingleProduct(product);
                        searchSuggestions.classList.add("hidden");
                    });
                    searchSuggestions.appendChild(suggestion);
                });
            } else {
                const noResults = document.createElement("div");
                noResults.classList.add("no-results");
                noResults.textContent = "Không có kết quả tương ứng";
                searchSuggestions.appendChild(noResults);
            }
            searchSuggestions.classList.remove("hidden");
        } else {
            searchSuggestions.classList.add("hidden");
        }
    });

    document.addEventListener("click", function (event) {
        if (!searchBar.contains(event.target) && !searchSuggestions.contains(event.target)) {
            searchSuggestions.classList.add("hidden");
        }
    });

    searchSuggestions.addEventListener("click", function (event) {
        if (event.target.closest(".search-suggestion")) {
            const productId = event.target.closest(".search-suggestion").getAttribute("data-id");
            const product = products.find(p => p.id === productId);
            showProductOptions(product);
        }
    });
});