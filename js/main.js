import {createAds} from './data.js';
import {showCard} from './card.js';

let ads = createAds();
console.log(ads);
showCard(ads[0]);
