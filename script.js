'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforebegin', html);

}


// const getCountryAndNeighbour = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();
//     // console.log(request.responseText);

//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         renderCountry(data);

//         const [neighbour] = data.borders;
//         console.log(neighbour);

//         if (!neighbour) return;
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v3.1/name/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function () {
//             const [data2] = JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2, 'neighbour');
//         })
//     })
// };

// getCountryAndNeighbour("usa");


////////////////////////////////////////////////////
const request = fetch(`https://restcountries.com/v3.1/name/bharat`);

const getCountryData = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(
            response => {
                if (!response.ok)

                    throw new Error(`Country not found ${response.status}`);

                return response.json();

            })
        .then(data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) return;

            return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
        })
        .then(
            response => response.json())
        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => alert(err))
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

btn.addEventListener('click', function () {
    // getCountryData("usa");
    // getCountryData("portugal");
})


//coding Challenge - 3


// const whereAmI = function (lat, lng) {
//     fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//         .then(res => {
//             if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);

//             return res.json();
//         })
//         .then(data => {
//             console.log(data);
//             // console.log(`You are in ${data.city}, ${data.country}`);



//             return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//         })
//         .then(res => {
//             if (!res.ok) throw new Error(`Country not found (${res.status})`);

//             return res.json();
//         })
//         .then(data => {
//             console.log(data);
//             renderCountry(data[0])
//         })
//         .catch(err => console.error(`${err.message} 💥`));
// };
// whereAmI(52.578, 13.381);

// setTimeout(function () {
//     whereAmI(19.037, 72.873);
// }, 5000)


////////////////////////////

// console.log('test 1');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('resolve promise 1').then(res => console.log(res));
// Promise.resolve('resolve promise 2').then(res => {
//     for (let index = 0; index < 1000000000; index++) {
//     }
//     console.log(res)
// });
// console.log('test end');

//////////////////////////
// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log("starting");
//     const randomNum = Math.random();
//     setTimeout(function () {
//         if (randomNum >= 0.5) {
//             resolve('You Won!!');
//         } else {
//             reject(new Error("You lost!"))
//         }
//     }, 2000);
// })

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// const wait = function (seconds) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, seconds * 1000);
//     })
// }
// wait(2).then(() => {
//     console.log("wait fun");
//     return wait(1);
// }).then(() => console.log("wait func for 1 sec"));

///////////////////////////////

// const getPosition = function () {
//     return new Promise(function (resolve, reject) {
//         // navigator.geolocation.getCurrentPosition(
//         //     possition => resolve(possition),
//         //     err => reject(err)
//         // );

//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };


// getPosition().then(pos => console.log(pos))


// Coding Challenge -2

// const wait = function (seconds) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, seconds * 1000);
//     })
// }

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//     return new Promise(function (resolve, reject) {
//         const img = document.createElement('img');
//         img.src = imgPath;

//         img.addEventListener('load', function () {
//             imgContainer.append(img);
//             resolve(img);
//         });

//         img.addEventListener('error', function () {
//             reject(new Error('Image not found'));
//         });
//     });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//     .then(img => {
//         currentImg = img;
//         console.log('Image 1 ');
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//         return createImage('img/img-2.jpg');
//     })
//     .then(img => {
//         currentImg = img;
//         console.log('Image 2 ');
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//     })
//     .catch(err => console.error(err));

//////////////////////

//Coding Challenge - 3

const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function () {
            reject(new Error('Image not found'));
        });
    });
};

let currentImg;

createImage('img/img-1.jpg')
    .then(img => {
        currentImg = img;
        console.log('Image 1 loaded');
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
        return createImage('img/img-2.jpg');
    })
    .then(img => {
        currentImg = img;
        console.log('Image 2 loaded');
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
    })
    .catch(err => console.error(err));


const loadNPause = async function () {
    try {

        let img = await createImage('img/img-1.jpg');
        console.log('Image 1 loaded');
        await wait(2);
        img.style.display = 'none';


        img = await createImage('img/img-2.jpg');
        console.log('Image 2 loaded');
        await wait(2);
        img.style.display = 'none';
    } catch (err) {
        console.error(err);
    }
};
// loadNPause();

const loadAll = async function (imgArr) {
    try {
        const imgs = imgArr.map(async img => await createImage(img));
        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);
        imgsEl.forEach(img => img.classList.add('parallel'));
    } catch (err) {
        console.error(err);
    }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
