                                            // Testimonial Old

// class Testimonial {
//     constructor(image, quote, author, rating) {
//         this.image = image;
//         this.quote = quote;
//         this.author = author;
//         this.rating = rating
//     }

//     card() {
//         return `
//         <div class="card">
//             <img src="${this.image}" alt="">
//             <p class="quotes">"${this.quote}"</p>
//             <p class="author"> - ${this.author}</p>
//             <p class="star">${this.rating} <i class="fa-solid fa-star"></i></p>
//         </div>`
//     }
// }

// const testimonial1 = new Testimonial("image/testimonial/1.jpeg", "The Internet is becoming the town square for the global village of tomorrow.y", "Bill Gates", 5); 
// const testimonial2 = new Testimonial("image/testimonial/2.jpeg", "Privacy is not an option, and it shouldn't be the price we accept for just getting on the Internet.", "Gary Kovacs", 1); 
// const testimonial3 = new Testimonial("image/testimonial/3.jpeg", "In the world of cyber security, the last thing you want is to have a target painted on you.", "Tim Cook", 4); 
// const testimonial4 = new Testimonial("image/testimonial/4.jpeg", "The Internet is the first thing that humanity has built that humanity doesn't understand, the largest experiment in anarchy that we have ever had.", "Eric Schmidt", 2); 
// const testimonial5 = new Testimonial("image/testimonial/5.jpeg", "Cyber security is much more than a matter of IT.", "Stephane Nappo", 3); 
// const testimonial6 = new Testimonial("image/testimonial/6.jpeg", "Hacking involves a different way of looking at problems that no one's thought of.", "Walter O'Brien", 1); 
// const testimonial7 = new Testimonial("image/testimonial/7.jpeg", "The Internet is so big, so powerful and pointless that for some people it is a complete substitute for life.", "Andrew Brown", 5); 
// const testimonial8 = new Testimonial("image/testimonial/8.jpeg", "It's not that we use technology, we live technology.", "Godfrey Reggio", 2); 
// const testimonial9 = new Testimonial("image/testimonial/9.jpeg", "The power of the Internet is infinite; the potential for its misuse, equally vast.", "Unknown", 4); 
// const testimonial10 = new Testimonial("image/testimonial/10.jpeg", "The Internet gave us access to everything; but it also gave everything access to us.", "James Veitch", 3); 
// const testimonial11 = new Testimonial("image/testimonial/11.jpeg", "The world of digital data is one where trust is the most valued currency.", "Handika Diaz", 5);

// const testimonialGroup = [testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6, testimonial7, testimonial8, testimonial9, testimonial10, testimonial11];

// let testimonialCard = ``

// for(let i = 0; i < testimonialGroup.length; i++) {
//     testimonialCard += testimonialGroup[i].card();
// }

// document.getElementById("section-card").innerHTML = testimonialCard;


                                            // Testimonial Callback
// const testimonial = [
//     {
//         image : "image/testimonial/1.jpeg",
//         quote : "The Internet is becoming the town square for the global village of tomorrow.y",
//         author : "Bill Gates",
//         rating : 5
//     },
//     {
//         image : "image/testimonial/2.jpeg",
//         quote : "Privacy is not an option, and it shouldn't be the price we accept for just getting on the Internet.",
//         author : "Gary Kovacs",
//         rating : 1
//     },
//     {
//         image : "image/testimonial/3.jpeg",
//         quote : "In the world of cyber security, the last thing you want is to have a target painted on you.",
//         author : "Tim Cook",
//         rating : 4
//     },
//     {
//         image : "image/testimonial/4.jpeg",
//         quote : "The Internet is the first thing that humanity has built that humanity doesn't understand, the largest experiment in anarchy that we have ever had.",
//         author : "Eric Schmidt",
//         rating : 2
//     },
//     {
//         image : "image/testimonial/5.jpeg",
//         quote : "Cyber security is much more than a matter of IT.",
//         author : "Stephane Nappo",
//         rating : 3
//     },
//     {
//         image : "image/testimonial/6.jpeg",
//         quote : "Hacking involves a different way of looking at problems that no one's thought of.",
//         author : "Walter O'Brien",
//         rating : 1
//     },
//     {
//         image : "image/testimonial/7.jpeg",
//         quote : "The Internet is so big, so powerful and pointless that for some people it is a complete substitute for life.",
//         author : "Andrew Brown",
//         rating : 5
//     },
//     {
//         image : "image/testimonial/8.jpeg",
//         quote : "It's not that we use technology, we live technology.",
//         author : "Godfrey Reggio",
//         rating : 2
//     },
//     {
//         image : "image/testimonial/9.jpeg",
//         quote : "The power of the Internet is infinite; the potential for its misuse, equally vast.",
//         author : "Unknown",
//         rating : 4
//     },
//     {
//         image : "image/testimonial/10.jpeg",
//         quote : "The Internet gave us access to everything; but it also gave everything access to us.",
//         author : "James Veitch",
//         rating : 3
//     },
//     {
//         image : "image/testimonial/11.jpeg",
//         quote : "The world of digital data is one where trust is the most valued currency.",
//         author : "Handika Diaz",
//         rating : 5
//     },
// ];

// let testimonialHTML = ``;

// testimonial.forEach( testimonialGroup => {
//     testimonialHTML += `
//         <div class="card">
//             <img src="${testimonialGroup.image}" alt="">
//             <p class="quotes">"${testimonialGroup.quote}"</p>
//             <p class="author"> - ${testimonialGroup.author}</p>
//             <p class="star">${testimonialGroup.rating} <i class="fa-solid fa-star"></i></p>
//         </div>`
// });

// function allTestimonial() {
//     const testimonialHTML = testimonial.map( testimonialGroup => {
//         return `
//         <div class="card">
//             <img src="${testimonialGroup.image}" alt="">
//             <p class="quotes">"${testimonialGroup.quote}"</p>
//             <p class="author"> - ${testimonialGroup.author}</p>
//             <p class="star">${testimonialGroup.rating} <i class="fa-solid fa-star"></i></p>
//         </div>`
//     });

//     document.getElementById("section-card").innerHTML = testimonialHTML.join("");
// };

// function testimonialFilter(rating) {
//     const testimonialFilter = testimonial.filter( testimonialGroup => {
//         return testimonialGroup.rating == rating
//     });

//     const testimonialHTML = testimonialFilter.map( testimonialGroup => {
//         return `
//         <div class="card">
//             <img src="${testimonialGroup.image}" alt="">
//             <p class="quotes">"${testimonialGroup.quote}"</p>
//             <p class="author"> - ${testimonialGroup.author}</p>
//             <p class="star">${testimonialGroup.rating} <i class="fa-solid fa-star"></i></p>
//         </div>`
//     });

//     document.getElementById("section-card").innerHTML = testimonialHTML.join("");
// };

// allTestimonial();

                                            // Testimonial Ajax 
// Fungsi untuk menyimpan dan mengambil data
function getData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onerror = () => {
            reject ("Connection Error");
        };

        xhr.onload = () => {
            try{
                resolve(JSON.parse(xhr.responseText));
                console.log("Ada data yang error :", resolve(JSON.parse(xhr.responseText)));
            } catch(error) {
                console.log("Ada data yang error :", error);
            }
        };

        xhr.send();
    });
};

// Fungsi untuk menambahkan kartu
// async function addTestimonial(newTestimonial) {
//     try {
//         const testimonialData = await getData("https://api.npoint.io/5ae145be87dab7a21a58");
//         testimonialData.push(newTestimonial);

//         let response = await fetch("https://api.npoint.io/5ae145be87dab7a21a58", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(testimonialData)
//         });

//         if (!response.ok) {
//             throw new Error("Gagal mengirim data");
//         }

//         console.log("Data berhasil ditambahkan");
//     } catch(error) {
//         console.log(error)
//     };
// };

// Fungsi untuk mengambil semua data
let testimonialHTML = ``;
async function allTestimonial() {
    try {
        const testimonialData = await getData("https://api.npoint.io/5ae145be87dab7a21a58");
        if (!testimonialData) {
            throw new Error("Data gagal ditambahkan");
        }

        const testimonialHTML = testimonialData.map( testimonialGroup => {
            return `
                <div class="card">
                    <img src="${testimonialGroup.image}" alt="">
                    <p class="quotes">"${testimonialGroup.quote}"</p>
                    <p class="author"> - ${testimonialGroup.author}</p>
                    <p class="star">${testimonialGroup.rating} <i class="fa-solid fa-star"></i></p>
                </div>`
            });

        document.getElementById("section-card").innerHTML = testimonialHTML.join("");

        console.log("Data berhasil ditampilkan");
    } catch (error) {
        console.log("Ada error di Function allTestimonial :", error)
    };
};

// Fungsi untuk memfilter semua data
async function testimonialFilter(rating) {
    try {
        const testimonial = await getData("https://api.npoint.io/5ae145be87dab7a21a58")
        if (!testimonial) {
            throw new Error("Data gagal difilter");
        }

        const testimonialFilter = testimonial.filter( testimonialGroup => {
            return testimonialGroup.rating == rating
        });
    
        const testimonialHTML = testimonialFilter.map( testimonialGroup => {
            return `
            <div class="card">
                <img src="${testimonialGroup.image}" alt="">
                <p class="quotes">"${testimonialGroup.quote}"</p>
                <p class="author"> - ${testimonialGroup.author}</p>
                <p class="star">${testimonialGroup.rating} <i class="fa-solid fa-star"></i></p>
            </div>`
        });

        document.getElementById("section-card").innerHTML = testimonialHTML.join("")

        console.log("Data berhasil difilter");
    } catch(error) {
        console.log("Ada error di Function testimonialFilter :", error)
    };
};

allTestimonial();

// Pengambilan data untuk membuat kartu dan animasi
// let rating = 1
// const ratingAnimation = document.querySelectorAll("#rating-box i");

// ratingAnimation.forEach((rating, ratingSelect1) => {
//     rating.addEventListener(("click"), () => {
//         ratingAnimation.forEach((rating, ratingSelect2) => {
//             ratingSelect1 >= ratingSelect2 ? rating.classList.add("active") : rating.classList.remove("active");
//         });
//         rating = rating.getAttribute("data-value");
//         console.log("Rating selected:", rating);
//     });
// });

// function cardTestimonial(event) {
//     event.preventDefault();

//     let image = document.getElementById("inputImage").files;
//     image = URL.createObjectURL(image[0]);
//     console.log(image);
    
//     let quote = document.getElementById("inputQuote").value;
//     let name = document.getElementById("inputName").value;
    
//     const newTestimonial = {
//         image: image,
//         quote: quote,
//         author: name,
//         rating: rating
//     };

//     console.log(newTestimonial)
// };

document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.rating-box button');
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});
