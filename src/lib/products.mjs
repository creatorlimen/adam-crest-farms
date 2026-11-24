export const products = [
  {
    slug: 'crops', name: 'Crops', teaser: 'Fresh vegetables',
    image: '/assets/farm/cucumbers.webp', alt: 'Bags of harvested cucumbers at the farm', width: 1280, height: 720,
    intro: 'We grow vegetables for households, market traders, restaurants and bulk buyers. What is ready depends on the harvest.',
    listTitle: 'What we grow', items: ['Cucumbers', 'Tomatoes', 'Green and coloured bell peppers'],
    enquiry: 'Tell us which vegetables you need, the quantity and your preferred date.',
  },
  {
    slug: 'ostriches', name: 'Ostriches', teaser: 'Fertilised eggs and young chicks',
    image: '/assets/farm/ostrich-paddock.webp', alt: 'Adult ostriches in the farm paddock', width: 720, height: 1280,
    intro: 'The adult flock pictured here lives in our paddock in Ede South. Please enquire about availability for your preferred date.',
    listTitle: 'Ostrich products', items: ['Fertilised ostrich eggs', 'Chicks aged 4–8 weeks'],
    enquiry: 'Include whether you are looking for eggs or chicks and how many you need.',
  },
  {
    slug: 'sheep', name: 'Sheep', teaser: 'Four breeds raised on the farm',
    intro: 'We keep sheep in Ologobi Village, alongside our ostriches and goats.',
    listTitle: 'Breeds', items: ['Balami', 'Saudanis', 'Koroji', 'Huda'],
    enquiry: 'Include your preferred breed and the number of sheep you are looking for.',
  },
  {
    slug: 'goats', name: 'Goats', teaser: 'Ask about available animals',
    intro: 'Goats are part of our livestock operation. Breed and sale details are awaiting confirmation.',
    enquiry: 'Tell us the type and number of goats you need so the farm can confirm the options.',
  },
];
export const productRoute = product => '/products/' + product.slug + '/';
