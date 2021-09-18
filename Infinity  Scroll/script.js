const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = [];
// Unsplash API
const count = 30;

//get your api key by following instructions on 'https://unsplash.com/documentation'
const apiKey = '';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// GET photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photos = await response.json();
    displayPhotos();
  } catch (error) {
    console.error('Error while trying to fetch photos from Unsplash', error);
  }
}
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('Ready = ', ready);
  }
}
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photos.length;
  console.log('total images', totalImages);
  photos.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    const desc = photo.alt_description ? photo.alt_description : '';
    setAttributes(img, {
      src: photo.urls.regular,
      alt: desc,
      title: desc,
    });
    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
function setAttributes(item, attributes) {
  for (const key in attributes) {
    item.setAttribute(key, attributes[key]);
  }
}

//Check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
