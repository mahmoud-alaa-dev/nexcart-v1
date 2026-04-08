const body = document.body;
const header = document.querySelector("header");
const navLinksContainer = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const themeIcon = document.getElementById("color-theme-icon");
const hotDealSlider = document.getElementById("hotDealSlider");
const electronicsSlider = document.getElementById("electronicsSlider");
const appliancesSlider = document.getElementById("appliancesSlider");
const mobilesSlider = document.getElementById("mobilesSlider");
const footerBottom = document.querySelector(".footer-bottom");


localStorage.getItem("theme") && body.classList.add("dark");

themeIcon.addEventListener("click", function() {
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "");
});

window.addEventListener("scroll", () => {
    header.style.background = window.scrollY > 40 ? "var(--bg-dark)" : "none";
});

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinksContainer.classList.toggle("active");
})

/**
 * Changes the padding-top of the body based on the window's inner width.
 * This is to ensure that the header is always visible when the page is scrolled.
 * The padding is calculated based on the following rules:
 * - If the window's inner width is less than or equal to 767px, the padding is set to the height of the header multiplied by 1.1.
 * - If the window's inner width is greater than 767px and less than or equal to 992px, the padding is set to the height of the header multiplied by 1.29.
 * - If the window's inner width is greater than 992px and less than or equal to 1200px, the padding is set to the height of the header multiplied by 1.34.
 * - If the window's inner width is greater than 1200px, the padding is set to the height of the header multiplied by 1.4.
 * @returns {undefined}
 */
function changePaddingBasedOnWindowSize(){
    switch (true) {
        case window.innerWidth <= 767:
            document.body.style.paddingTop = `${header.clientHeight * 1.1}px`;
            navLinksContainer.style.top = `${header.clientHeight - 5}px`;
            break;
        case window.innerWidth > 767 && window.innerWidth < 992:
            document.body.style.paddingTop = `${header.clientHeight * 1.29}px`;
            navLinksContainer.style.top = `${header.clientHeight - 5}px`;
            break;
        case window.innerWidth > 992 && window.innerWidth < 1200:
            document.body.style.paddingTop = `${header.clientHeight * 1.34}px`;
            break;
        case window.innerWidth > 1200:
            document.body.style.paddingTop = `${header.clientHeight * 1.4}px`;
            break;
        default:
            break;
    };
};

changePaddingBasedOnWindowSize();
window.addEventListener("resize", changePaddingBasedOnWindowSize);

const navLinks = document.querySelectorAll(".nav-links li");

navLinks.forEach(link => {
    link.addEventListener("click", function(){
        navLinks.forEach((li) => {
            li.classList.remove("active");
        });
        this.classList.add("active");
    });
});



// initialize swiper
//
// main section swiper
var swiper = new Swiper(".mySwiper", {
    pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
    },
    autoplay: {
        delay: 2500,
    },
    loop: true,
});

// products seciton swiper
var swiper = new Swiper(".slide-products", {
    slidesPerView: 5,
    spaceBetween: 20,
    navigation: {
        nextEl: ".nextEl",
        prevEl: ".prevtEl",
    },
    breakpoints: {
        1200: {
            slidesPerView: 5,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
        767: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        0: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
    },
});



// get data
const apiLink = "./assets/data/products.json";
const products = getData(apiLink);
products.then((data) => {
    let hotDealSwiperSlide = "";
    let electronicsSwiperSlide = "";
    let appliancesSwiperSlide = "";
    let mobilesSwiperSlide = "";
    data.forEach((product) => {
        if(product.old_price){
            hotDealSwiperSlide += `
                    <div class="swiper-slide">
                    <div class="product-card">
                        <span class="product-sale">${((product.old_price - product.price) * 100 / product.old_price).toFixed(2)}%</span>
                        <div class="product-img">
                            <img src=${product.img} alt=${product.name}>
                        </div>
                        <div class="product-rate">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <p class="product-name">
                            <a href="#">${product.name}</a>
                        </p>
                        <div class="product-price">
                            <strong class="current-price">$${product.price}</strong>
                            <span class="product-old-price">$${product.old_price}</span>
                        </div>
                        <div class="product-btns">
                            <button class="add-cart">
                                <i class="fa-solid fa-cart-plus"></i>
                                <span>Add To Cart</span>
                            </button> 
                            <button class="add-fav">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        };
        if(product.category === "electronics"){
            let oldPrice = product.old_price ? `<span class="product-old-price">$${product.old_price}</span>` : "";
            let salePercent = product.old_price ? `<span class="product-sale">${((product.old_price - product.price) * 100 / product.old_price).toFixed(2)}%</span>` : "";
            electronicsSwiperSlide += `
                <div class="swiper-slide">
                    <div class="product-card">
                        ${salePercent}
                        <div class="product-img">
                            <img src=${product.img} alt=${product.name}>
                        </div>
                        <div class="product-rate">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <p class="product-name">
                            <a href="#">${product.name}</a>
                        </p>
                        <div class="product-price">
                            <strong class="current-price">$${product.price}</strong>
                            ${oldPrice}
                        </div>
                        <div class="product-btns">
                            <button class="add-cart">
                                <i class="fa-solid fa-cart-plus"></i>
                                <span>Add To Cart</span>
                            </button> 
                            <button class="add-fav">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        };
        if(product.category === "appliances"){
            let oldPrice = product.old_price ? `<span class="product-old-price">$${product.old_price}</span>` : "";
            let salePercent = product.old_price ? `<span class="product-sale">${((product.old_price - product.price) * 100 / product.old_price).toFixed(2)}%</span>` : "";
            appliancesSwiperSlide += `
                <div class="swiper-slide">
                    <div class="product-card">
                        ${salePercent}
                        <div class="product-img">
                            <img src=${product.img} alt=${product.name}>
                        </div>
                        <div class="product-rate">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <p class="product-name">
                            <a href="#">${product.name}</a>
                        </p>
                        <div class="product-price">
                            <strong class="current-price">$${product.price}</strong>
                            ${oldPrice}
                        </div>
                        <div class="product-btns">
                            <button class="add-cart">
                                <i class="fa-solid fa-cart-plus"></i>
                                <span>Add To Cart</span>
                            </button> 
                            <button class="add-fav">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        };
        if(product.category === "mobiles"){
            let oldPrice = product.old_price ? `<span class="product-old-price">$${product.old_price}</span>` : "";
            let salePercent = product.old_price ? `<span class="product-sale">${((product.old_price - product.price) * 100 / product.old_price).toFixed(2)}%</span>` : "";
            mobilesSwiperSlide += `
                <div class="swiper-slide">
                    <div class="product-card">
                        ${salePercent}
                        <div class="product-img">
                            <img src=${product.img} alt=${product.name}>
                        </div>
                        <div class="product-rate">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <p class="product-name">
                            <a href="#">${product.name}</a>
                        </p>
                        <div class="product-price">
                            <strong class="current-price">$${product.price}</strong>
                            ${oldPrice}
                        </div>
                        <div class="product-btns">
                            <button class="add-cart">
                                <i class="fa-solid fa-cart-plus"></i>
                                <span>Add To Cart</span>
                            </button> 
                            <button class="add-fav">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        };
    });
    return {hotDealSwiperSlide, electronicsSwiperSlide, appliancesSwiperSlide, mobilesSwiperSlide};
}).then((data) => {
    hotDealSlider.innerHTML = data.hotDealSwiperSlide;
    electronicsSlider.innerHTML = data.electronicsSwiperSlide;
    appliancesSlider.innerHTML = data.appliancesSwiperSlide;
    mobilesSlider.innerHTML = data.mobilesSwiperSlide;
});

footerBottom.innerHTML = `<p>&copy; Copyright nexCart ${new Date().getFullYear()}, All Rights Reserved</p>`;


async function getData(apiLink){
    const response = await fetch(apiLink);
    const data = await response.json();
    return data;
};

function isLandscape(){
    return window.matchMedia("(orientation: landscape)").matches;
}

function isPortrait(){
    return window.matchMedia("(orientation: portrait)").matches;
}

