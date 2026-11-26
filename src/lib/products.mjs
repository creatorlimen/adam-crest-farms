export const products = [
  {
    slug: 'crops', name: 'Crops', teaser: 'Cucumbers, tomatoes and bell peppers',
    group: 'Vegetables', art: '/assets/products/market-vegetables.webp', artAlt: 'Illustration of cucumbers, tomatoes and bell peppers', artWidth: 1600, artHeight: 900,
    image: '/assets/farm/cucumbers.webp', alt: 'Bags of harvested cucumbers at the farm', width: 1280, height: 720,
    intro: 'We grow vegetables for households, market traders, restaurants and bulk buyers. What is ready depends on the harvest.',
    listTitle: 'What we grow', items: ['Cucumbers', 'Tomatoes', 'Green and coloured bell peppers'],
    enquiry: 'Tell us which vegetables you need, the quantity and your preferred date.',
  },
  {
    slug: 'ostriches', name: 'Ostriches', teaser: 'Fertilised eggs and chicks aged 4–8 weeks',
    group: 'Eggs & chicks', art: '/assets/products/ostrich-eggs.webp', artAlt: 'Illustration of two ivory ostrich eggs on straw', artWidth: 1200, artHeight: 800,
    image: '/assets/farm/ostrich-paddock.webp', alt: 'Adult ostriches in the farm paddock', width: 720, height: 1280,
    intro: 'The adult flock pictured here lives in our paddock in Ede South. Please enquire about availability for your preferred date.',
    listTitle: 'Ostrich products', items: ['Fertilised ostrich eggs', 'Chicks aged 4–8 weeks'],
    enquiry: 'Include whether you are looking for eggs or chicks and how many you need.',
  },
  {
    slug: 'sheep', name: 'Sheep', teaser: 'Four breeds raised on the farm',
    group: 'Livestock', art: '/assets/products/sheep.webp', artAlt: 'Illustrative portrait of a cream-coloured sheep', artWidth: 1200, artHeight: 800,
    intro: 'We keep sheep in Ologobi Village, alongside our ostriches and goats.',
    listTitle: 'Breeds', items: ['Balami', 'Saudanis', 'Koroji', 'Huda'],
    enquiry: 'Include your preferred breed and the number of sheep you are looking for.',
  },
  {
    slug: 'goats', name: 'Goats', teaser: 'Ask about available animals',
    group: 'Livestock', art: '/assets/products/goats.webp', artAlt: 'Illustrative portrait of a brown goat', artWidth: 1200, artHeight: 800,
    intro: 'We raise goats alongside our sheep in Ologobi Village. Ask which animals are available for your preferred date.',
    enquiry: 'Tell us the type and number of goats you need so the farm can confirm the options.',
  },
];
export const productRoute = product => '/products/' + product.slug + '/';
