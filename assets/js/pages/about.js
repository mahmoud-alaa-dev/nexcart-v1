
const ELEMENTS = {
    aboutInfo: document.getElementById("aboutInfo"),
    ourStoryImg: document.getElementById("ourStoryImg"),
    cardIntercom: document.getElementById("cardIntercom"),
    cardProductSale: document.getElementById("cardProductSale"),
    cardCustomerActive: document.getElementById("cardCustomerActive"),
    cardAnualGross: document.getElementById("cardAnualGross"),
    ourTeamTitle: document.getElementById("ourTeamTitle"),
    memberOne: document.getElementById("memberOne"),
    memberTwo: document.getElementById("memberTwo"),
    memberThree: document.getElementById("memberThree"),
    memberFour: document.getElementById("memberFour"),
    ourServicesTitle: document.getElementById("ourServicesTitle"),
    serviceOne: document.getElementById("serviceOne"),
    serviceTwo: document.getElementById("serviceTwo"),
    serviceThree: document.getElementById("serviceThree"),
};

const options = {
    rootMargin: "0px 1000px 0px 1000px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
},options);

for(let key in ELEMENTS){
    observer.observe(ELEMENTS[key])
};