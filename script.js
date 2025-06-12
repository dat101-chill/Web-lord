document.addEventListener("DOMContentLoaded", function () {
    // -- Đảm bảo toàn bộ HTML đã tải xong trước khi chạy script
    const categoryItems = document.querySelectorAll(".category-item");
    // -- Lấy tham chiếu đến các mục menu danh mục
    const categories = document.querySelectorAll(".category");
    // -- Lấy tham chiếu đến khung gợi ý sản phẩm
    const suggestedProducts = document.getElementById("suggested-products");
    // -- Lấy tham chiếu đến liên kết giỏ hàng
    const cartLink = document.querySelector(".cart-link");
    // -- Khởi tạo mảng cart để lưu sản phẩm người dùng thêm
    let cart = [];

    // -- Định nghĩa danh sách sản phẩm với id danh mục, tên, giá và ảnh
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

     // -- Sinh đoạn HTML cho mỗi sản phẩm
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

    // -- Hiển thị tất cả sản phẩm theo từng khung danh mục
    function renderProducts() {
        const productSections = {
            "suggested-products": document.getElementById("suggested-products"),
            "gia-dung": document.getElementById("gia-dung"),
            "quan-ao": document.getElementById("quan-ao"),
            "thiet-bi-dien-tu": document.getElementById("thiet-bi-dien-tu"),
            "qua-tang": document.getElementById("qua-tang")
        };

        // -- Xóa nội dung cũ trong các khung
        Object.keys(productSections).forEach(section => {
            productSections[section].innerHTML = "";
        });

        // -- Thêm sản phẩm vào khung tương ứng
        products.forEach(product => {
            if (productSections[product.id]) {
                productSections[product.id].innerHTML += generateProductHTML(product);
            }
        });

        // -- Gán sự kiện click cho từng sản phẩm để hiển thị chi tiết
        document.querySelectorAll(".product").forEach(productElement => {
            productElement.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                const product = products.find(p => p.id === productId);
                showProductOptions(product);
            });
        });

        // -- Gán sự kiện click cho đánh giá sao
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

    // -- Ẩn tất cả khung và chỉ hiển thị khung được chọn
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

    // -- Hiển thị duy nhất một sản phẩm trong main
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

    // -- Hiển thị chi tiết sản phẩm với các tùy chọn đặt hàng/giỏ hàng
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

        // -- Đặt hàng ngay: mở popup chọn thanh toán
        document.querySelector(".order-now").addEventListener("click", showPaymentOptions);
        // -- Thêm vào giỏ hàng: lưu sản phẩm và thông báo
        document.querySelector(".add-to-cart").addEventListener("click", function () {
            addToCart(product);
            alert("Đã thêm vào giỏ hàng!");
        });

        // -- Bật tương tác đánh giá sao trên chi tiết sản phẩm
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

    // -- Hiển thị popup để chọn phương thức thanh toán
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

        // -- Xử lý khi chọn phương thức thanh toán
        document.querySelectorAll(".payment-option").forEach(option => {
            option.addEventListener("click", function () {
                const method = this.getAttribute("data-method");
                alert(`Bạn đã chọn phương thức thanh toán: ${method}`);
                paymentSection.remove();
            });
        });
        // -- Đóng popup thanh toán
        document.querySelector(".close-payment").addEventListener("click", function () {
            paymentSection.remove();
        });
    }

    // -- Thêm sản phẩm vào mảng giỏ hàng
    function addToCart(product) {
        cart.push(product);
    }

    // -- Hiển thị giỏ hàng với danh sách sản phẩm, nút đặt hàng và xóa
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

        // -- Đặt hàng từ giỏ: mở popup thanh toán
        document.querySelectorAll(".order-now").forEach(button => {
            button.addEventListener("click", showPaymentOptions);
        });
        // -- Xóa sản phẩm khỏi giỏ hàng
        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", function () {
                const productId = this.parentElement.getAttribute("data-id");
                cart = cart.filter(item => item.id !== productId);
                showCart();
            });
        });
        // -- Đóng giỏ hàng và khôi phục nội dung chính
        document.querySelector(".close-cart").addEventListener("click", restoreMainContent);
    }

    // -- Khôi phục lại cấu trúc main ban đầu và render lại sản phẩm
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

    // -- Chuyển danh mục khi người dùng click menu
    categoryItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            const categoryId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showCategory(categoryId);
        });
    });

    // -- Quay về gợi ý sản phẩm khi click logo
    document.querySelector(".logo").addEventListener("click", function (event) {
        event.preventDefault();
        restoreMainContent();
        showCategory("suggested-products");
    });

    // -- Hiển thị giỏ hàng khi click icon giỏ
    cartLink.addEventListener("click", function (event) {
        event.preventDefault();
        showCart();
    });

    // -- Khởi tạo giao diện khi load trang
    renderProducts();
    showCategory("suggested-products");

    const searchBar = document.querySelector(".search-bar");
    const searchSuggestions = document.querySelector(".search-suggestions");

    // -- Xử lý tìm kiếm, hiển thị gợi ý sản phẩm
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
                    // -- Hiển thị chi tiết khi click vào gợi ý
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

    // -- Ẩn gợi ý tìm kiếm khi click ra ngoài vùng tìm kiếm
    document.addEventListener("click", function (event) {
        if (!searchBar.contains(event.target) && !searchSuggestions.contains(event.target)) {
            searchSuggestions.classList.add("hidden");
        }
    });

    // -- Xử lý click trên gợi ý tìm kiếm để hiển thị chi tiết
    searchSuggestions.addEventListener("click", function (event) {
        if (event.target.closest(".search-suggestion")) {
            const productId = event.target.closest(".search-suggestion").getAttribute("data-id");
            const product = products.find(p => p.id === productId);
            showProductOptions(product);
        }
    });
});