import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingCart, MapPin, Phone, Mail, Instagram, Facebook, Music, ChevronDown, Check, AlertCircle, Globe, Star } from 'lucide-react';

/**
 * URBAN SLICE - ARTISAN PIZZERIA WEBSITE
 * 
 * DESIGN PHILOSOPHY: Dark, moody, editorial aesthetic with Italian elements
 * - Deep charcoal/black backgrounds (#1a1a1a, #2d2d2d)
 * - Warm ember/brick accents (#e8541a, #c0392b)
 * - Gold highlights (#d4a843)
 * - Cream text (#f5f0e8)
 * - Modern typography with Italian flair
 * - Animated rotating pizza background
 * - Asymmetric layouts, overlapping elements, bold transitions
 */

// Image URLs from CDN
const IMAGE_URLS = {
  cover: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/ 1. Cover_f80e1aff.png',
  margherita: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/margherita_654b8716.png',
  vegetariana: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/vegerariana_cae58381.png',
  capricciosa: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/capricciosa_a3f529c2.png',
  prosciuttoFunghi: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/prosciutto e funghi_06e662c4.png',
  quattroFormaggi: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/quattro fromaggi_5687a92d.png',
  tonno: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/tonno_bd3cfa2a.jpeg',
  caprese: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/capresse_30794f3a.png',
  diavola: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/diavola_eb7c3fa5.png',
  salami: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/salami_0f5f3a4b.png',
  calzone: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/calzone_f2aab74b.png',
  taraneasca: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/taraneasca_d34444e8.png',
  quattroStagioni: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/quattro stagioni_ebd125f3.png',
  zucchini: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/quattro fromaggi_5687a92d.png',
  urban: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/pollo_81e6630f.png',
  mortadella: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/prosciutto crudo_28078c58.png',
  carbonara: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/carbonara_20be5bff.png',
  prosciuttoCrudo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/prosciutto crudo_28078c58.png',
  diavola_tartufata: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/diavola_eb7c3fa5.png',
  salami_tartufata: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/salami_0f5f3a4b.png',
};

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663414316478/mdHwtXncmAPABssMUNeNmG/logourbanslice_a919f1bf.png';

// Complete Menu Data
const MENU_DATA = {
  pizzaClassica: [
    { name: 'MARGHERITA', image: IMAGE_URLS.margherita, sizes: { '32cm': { price: 40, weight: '580 g' }, '40cm': { price: 55, weight: '700 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, busuioc' },
    { name: 'VEGETARIANA', image: IMAGE_URLS.vegetariana, sizes: { '32cm': { price: 40, weight: '660 g' }, '40cm': { price: 55, weight: '770 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, ciuperci, ardei gras, porumb, măsline' },
    { name: 'CAPRICIOSA', image: IMAGE_URLS.capricciosa, sizes: { '32cm': { price: 45, weight: '670 g' }, '40cm': { price: 65, weight: '870 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă, ciuperci, măsline, cârnați' },
    { name: 'PROSCIUTTO FUNGHI', image: IMAGE_URLS.prosciuttoFunghi, sizes: { '32cm': { price: 45, weight: '620 g' }, '40cm': { price: 65, weight: '720 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă, ciuperci' },
    { name: 'QUATTRO FORMAGGI', image: IMAGE_URLS.quattroFormaggi, sizes: { '32cm': { price: 50, weight: '600 g' }, '40cm': { price: 70, weight: '740 g' } }, ingredients: 'Palina, cheddar, mozzarella, gorgonzola, parmezan' },
    { name: 'COTTO', image: IMAGE_URLS.margherita, sizes: { '32cm': { price: 42, weight: '600 g' }, '40cm': { price: 65, weight: '700 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă' },
    { name: 'TONNO', image: IMAGE_URLS.tonno, sizes: { '32cm': { price: 45, weight: '650 g' }, '40cm': { price: 65, weight: '890 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, ton, măsline, ceapă' },
    { name: 'CAPRESE', image: IMAGE_URLS.caprese, sizes: { '32cm': { price: 45, weight: '615 g' }, '40cm': { price: 65, weight: '770 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, pesto, roșii cherry' },
    { name: 'DIAVOLA', image: IMAGE_URLS.diavola, sizes: { '32cm': { price: 45, weight: '630 g' }, '40cm': { price: 65, weight: '730 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam, peperoncini' },
    { name: 'SALAMI', image: IMAGE_URLS.salami, sizes: { '32cm': { price: 45, weight: '630 g' }, '40cm': { price: 65, weight: '750 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam' },
    { name: 'CALZONE', image: IMAGE_URLS.calzone, sizes: { '32cm': { price: 45, weight: '560 g' }, '40cm': { price: 65, weight: '760 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă, bacon' },
    { name: 'TARANEASCA', image: IMAGE_URLS.taraneasca, sizes: { '32cm': { price: 50, weight: '620 g' }, '40cm': { price: 70, weight: '820 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, bacon, șuncă, salam, cârnați, ciuperci, ardei gras, porumb, ceapă' },
    { name: 'QUATTRO STAGIONI', image: IMAGE_URLS.quattroStagioni, sizes: { '32cm': { price: 45, weight: '660 g' }, '40cm': { price: 65, weight: '880 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă, ciuperci, salam, măsline' },
  ],
  pizzaCasa: [
    { name: 'ZUCCHINI', image: IMAGE_URLS.zucchini, sizes: { '32cm': { price: 40, weight: '630 g' }, '40cm': { price: 55, weight: '740 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, zucchini, gorgonzola, peperoncino' },
    { name: 'URBAN', image: IMAGE_URLS.urban, sizes: { '32cm': { price: 45, weight: '660 g' }, '40cm': { price: 65, weight: '800 g' } }, ingredients: 'Palina, sos roșii, mozzarella, chorizo, gorgonzola, cedar, parmezan' },
    { name: 'MORTADELLA', image: IMAGE_URLS.mortadella, sizes: { '32cm': { price: 50, weight: '640 g' }, '40cm': { price: 70, weight: '840 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, mortadella, pesto, busuioc' },
    { name: 'EL CIOLANESCU', image: IMAGE_URLS.margherita, sizes: { '32cm': { price: 50, weight: '660 g' }, '40cm': { price: 70, weight: '800 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, ciolan afumat, ouă de prepeliță, ardei gras, usturoi, piper, ulei de măsline extravirgin' },
    { name: 'QUATTRO CARNE', image: IMAGE_URLS.quattroFormaggi, sizes: { '32cm': { price: 50, weight: '660 g' }, '40cm': { price: 70, weight: '660 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam Napoli, prosciutto cotto, ventricina, cârnați, parmezan' },
    { name: 'QUATTRO FORMAGGI E VENTRICINA', image: IMAGE_URLS.quattroFormaggi, sizes: { '32cm': { price: 50, weight: '640 g' }, '40cm': { price: 70, weight: '640 g' } }, ingredients: 'Palina, sos alb, cheddar, mozzarella, gorgonzola, parmezan, ventricina' },
    { name: 'TARTUFO E SALSICCIA', image: IMAGE_URLS.margherita, sizes: { '32cm': { price: 50, weight: '660 g' }, '40cm': { price: 70, weight: '660 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, pastă de trufe, cârnat proaspăt salsiccia' },
    { name: 'PASTRAMI CON POMODORI SECCHI', image: IMAGE_URLS.margherita, sizes: { '32cm': { price: 45, weight: '660 g' }, '40cm': { price: 65, weight: '660 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, pastramă, roșii uscate' },
    { name: 'PROSCIUTTO CRUDO E RUCOLA', image: IMAGE_URLS.prosciuttoCrudo, sizes: { '32cm': { price: 50, weight: '660 g' }, '40cm': { price: 70, weight: '660 g' } }, ingredients: 'Palina, mozzarella, roșii cherry, rucola, prosciutto crudo, parmezan' },
    { name: 'CARBONARA', image: IMAGE_URLS.carbonara, sizes: { '32cm': { price: 45, weight: '620 g' }, '40cm': { price: 65, weight: '800 g' } }, ingredients: 'Palina, sos alb, mozzarella, pancetta, ou' },
    { name: 'DIAVOLA TARTUFATA', image: IMAGE_URLS.diavola_tartufata, sizes: { '32cm': { price: 50, weight: '660 g' }, '40cm': { price: 70, weight: '800 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam, pasta de trufe, peperoncini' },
    { name: 'SALAMI TARTUFATA', image: IMAGE_URLS.salami_tartufata, sizes: { '32cm': { price: 50, weight: '650 g' }, '40cm': { price: 70, weight: '750 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam, pastă de trufe' },
  ],
  streetFood: [
    { name: 'URBAN HOT DOG', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 30, weight: '280 g' } }, ingredients: 'Cârnat semiafumat, sos Urban, cheddar, mozzarella, parmezan' },
    { name: 'PANUZZO COTTO', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 30, weight: '320 g' } }, ingredients: 'Palina, sos de roșii cu busuioc, mozzarella, prosciutto cotto, rucola, unt, ulei de măsline' },
    { name: 'PANUZZO MORTADELA', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 35, weight: '320 g' } }, ingredients: 'Palina, mortadella, rucola, stracciatella, pesto, ulei de măsline' },
    { name: 'PANUZZO CHORIZO', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 30, weight: '320 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, chorizo, rucola, cheddar, ulei picant' },
    { name: 'PANUZZO CRISPY', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 35, weight: '320 g' } }, ingredients: 'Palina, pui crispy, sos Urban, rucola' },
    { name: 'PANUZZO CAPRESE', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 30, weight: '320 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, pesto, roșii cherry, rucola, ulei de măsline' },
    { name: 'PANUZZO VENTRICINA', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 30, weight: '320 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam ventricina, rucola' },
    { name: 'BURGER URBAN BLACK ANGUS', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 50, weight: '350 g' } }, ingredients: 'Chiflă burger, burger Black Angus România, sos Urban, cheddar, mozzarella, castraveți murați, salată, bacon, ceapă - Vin și cu cartofi prăjiți cu parmezan' },
    { name: 'BURGER CRISPY', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 45, weight: '350 g' } }, ingredients: 'Chiflă burger, 120 g pui crispy, sos Urban, cheddar, mozzarella, castraveți murați, salată, bacon, ceapă - Vin și cu cartofi prăjiți cu parmezan' },
  ],
  garnituri: [
    { name: 'LEGUME LA GRĂTAR', image: IMAGE_URLS.margherita, sizes: { '200g': { price: 7, weight: '200 g' } }, ingredients: 'Dovlecel, ardei, vinete' },
    { name: 'CARTOFI PRĂJIȚI', image: IMAGE_URLS.margherita, sizes: { '200g': { price: 10, weight: '200 g' } }, ingredients: 'Cartofi, ulei' },
    { name: 'CARTOFI CU PARMEZAN', image: IMAGE_URLS.margherita, sizes: { '200g': { price: 12, weight: '200 g' } }, ingredients: 'Cartofi prăjiți, parmezan' },
  ],
  salate: [
    { name: 'SALATĂ DE VINETE', image: IMAGE_URLS.margherita, sizes: { '150g': { price: 20, weight: '150 g' } }, ingredients: 'Vinete coapte, ulei, ceapă' },
    { name: 'SALATĂ DE FASOLE BĂTUTĂ', image: IMAGE_URLS.margherita, sizes: { '150g': { price: 20, weight: '150 g' } }, ingredients: 'Fasole, ulei, usturoi' },
    { name: 'SALATĂ DE CRUDITĂȚI', image: IMAGE_URLS.margherita, sizes: { '150g': { price: 18, weight: '150 g' } }, ingredients: 'Varză, morcov, țelină' },
    { name: 'SALATĂ DE VARZĂ', image: IMAGE_URLS.margherita, sizes: { '150g': { price: 10, weight: '150 g' } }, ingredients: 'Varză, oțet, sare' },
    { name: 'MURĂTURI ASORTATE', image: IMAGE_URLS.margherita, sizes: { '150g': { price: 10, weight: '150 g' } }, ingredients: 'Castraveți murați, gogonele, varză murată' },
  ],
  alcoholicBeverages: [
    // Cocktails
    { name: 'Cuba Libre', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '' } }, ingredients: '' },
    { name: 'Hugo', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '' } }, ingredients: '' },
    { name: 'Aperol Spritz', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '' } }, ingredients: '' },
    // De autobază
    { name: '"Adio, mamă" (vin fiert cu rom)', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '' } }, ingredients: '' },
    { name: '"Submarin" (bere draft cu rom)', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '' } }, ingredients: '' },
    { name: 'Whiskey Jack Daniel\'s - 100 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '' } }, ingredients: '' },
    { name: 'Whiskey Glenfiddich 12 ani - 100 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 30, weight: '' } }, ingredients: '' },
    { name: 'Vodcă Absolut - 100 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 20, weight: '' } }, ingredients: '' },
    { name: 'Vodcă Grey Goose - 100 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 30, weight: '' } }, ingredients: '' },
    { name: 'Rom Captain Morgan - 100 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '' } }, ingredients: '' },
    { name: 'Rom Bacardi Spiced - 100 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '' } }, ingredients: '' },
    { name: 'Coniac Alexandrion 5* - 100 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 20, weight: '' } }, ingredients: '' },
    { name: 'Coniac Metax™ - 100 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '' } }, ingredients: '' },
    // Bere sticlă 500 ml
    { name: 'Amstel - 500 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 10, weight: '' } }, ingredients: '' },
    { name: 'Heineken - 500 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 12, weight: '' } }, ingredients: '' },
    { name: 'Birra Moretti - 500 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 12, weight: '' } }, ingredients: '' },
    { name: 'Silva neagra - 500 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 15, weight: '' } }, ingredients: '' },
    { name: 'Harghita - 500 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 12, weight: '' } }, ingredients: '' },
    { name: 'Hategana - 500 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 12, weight: '' } }, ingredients: '' },
    { name: 'Suceava - 500 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 14, weight: '' } }, ingredients: '' },
    { name: 'Solca - 500 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 14, weight: '' } }, ingredients: '' },
    { name: 'Calimani - 500 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 14, weight: '' } }, ingredients: '' },
    // Bere sticlă 330 ml
    { name: 'Corona - 330 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 15, weight: '' } }, ingredients: '' },
    { name: 'Praga - 330 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 14, weight: '' } }, ingredients: '' },
    { name: 'St Miguel - 330 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 14, weight: '' } }, ingredients: '' },
    { name: 'Bermas - 330 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 14, weight: '' } }, ingredients: '' },
    { name: 'Paulaner - 330 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 20, weight: '' } }, ingredients: '' },
    // Bere draft 400 ml
    { name: 'Ciuc premium - 400 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 10, weight: '' } }, ingredients: '' },
    { name: 'Birra Moretti - 400 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 12, weight: '' } }, ingredients: '' },
    { name: 'Calimani - 400 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 14, weight: '' } }, ingredients: '' },
    { name: 'St Miguel - 400 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 15, weight: '' } }, ingredients: '' },
    // Vinuri 0.75 ml
    { name: 'Budureasca Clasic (rosé, roșu, fume) - 0.75 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 70, weight: '' } }, ingredients: '' },
    { name: 'Compas (rosé, Pinot Grigio) - 0.75 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 65, weight: '' } }, ingredients: '' },
    { name: 'Compas Shiraz (roșu) - 0.75 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 75, weight: '' } }, ingredients: '' },
    { name: 'Caii de la Letea - Vol. I (roșu) - 0.75 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 75, weight: '' } }, ingredients: '' },
    { name: 'Implicit (alb, rosé, roșu) - 0.75 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 85, weight: '' } }, ingredients: '' },
    { name: 'Petro Vaselo (alb, rosé) - 0.75 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 75, weight: '' } }, ingredients: '' },
    { name: 'Caraman Tabu (alb, rosé) - 0.75 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 70, weight: '' } }, ingredients: '' },
    { name: 'Domeniul Bogdan (alb, rosé, roșu) - 0.75 ml', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 40, weight: '' } }, ingredients: '' },
    // Vin casei și la pahar
    { name: 'Vinul casei (carafa 0.500ml)', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 40, weight: '' } }, ingredients: '' },
    { name: 'Vin pahar (alb, rosé, roșu)', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 15, weight: '' } }, ingredients: '' },
    { name: 'Spumant (alb, rosé)', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '' } }, ingredients: '' },
  ],
  gratar: [
    { name: 'MICI', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 7, weight: '90 g' } }, ingredients: 'Carne vită, carne porc, condimente' },
    { name: 'CÂRNAȚI SEMIAFUMAȚI', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 8, weight: '80 g' } }, ingredients: 'Carne porc, usturoi, condimente' },
    { name: 'CEAFĂ DE PORC LA GRĂTAR', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '200 g' } }, ingredients: 'Ceafă de porc, condimente' },
    { name: 'COTLET DE PORC LA GRĂTAR', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '200 g' } }, ingredients: 'Cotlet de porc, condimente' },
    { name: 'PIEPT DE PORC LA GRĂTAR', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 20, weight: '200 g' } }, ingredients: 'Piept de porc, condimente' },
    { name: 'PIEPT DE PUI LA GRĂTAR', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '200 g' } }, ingredients: 'Piept de pui, condimente' },
    { name: 'PASTRAMĂ DE BERBECUȚ', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 20, weight: '100 g' } }, ingredients: 'Carne de berbecuț, condimente' },
  ],
  beverages: [
    { name: 'Pepsi', image: IMAGE_URLS.margherita, sizes: { '330ml': { price: 10, weight: '330 ml' } }, ingredients: '' },
    { name: 'Mirinda', image: IMAGE_URLS.margherita, sizes: { '330ml': { price: 10, weight: '330 ml' } }, ingredients: '' },
    { name: 'Lipton', image: IMAGE_URLS.margherita, sizes: { '330ml': { price: 10, weight: '330 ml' } }, ingredients: '' },
    { name: 'Apa plată', image: IMAGE_URLS.margherita, sizes: { '500ml': { price: 10, weight: '500 ml' } }, ingredients: '' },
    { name: 'Apa minerală', image: IMAGE_URLS.margherita, sizes: { '500ml': { price: 10, weight: '500 ml' } }, ingredients: '' },
    { name: 'Limonada simplă', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 15, weight: '' } }, ingredients: '' },
    { name: 'Limonada arome', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 18, weight: '' } }, ingredients: '' },
    { name: 'Ceai cald', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 15, weight: '' } }, ingredients: '' },
    { name: 'Espresso', image: IMAGE_URLS.margherita, sizes: { '30ml': { price: 10, weight: '30 ml' } }, ingredients: '' },
    { name: 'Latte', image: IMAGE_URLS.margherita, sizes: { '280ml': { price: 15, weight: '280 ml' } }, ingredients: '' },
    { name: 'Cappuccino', image: IMAGE_URLS.margherita, sizes: { '200ml': { price: 15, weight: '200 ml' } }, ingredients: '' },
  ],
};
// Navigation Menu Items Mapping
const MENU_ITEMS = [
  { label: 'Meniu', sectionId: 'meniu' },
  { label: 'Galerie', sectionId: 'galerie' },
  { label: 'Catering', sectionId: 'catering' },
  { label: 'Rezervă Masă', sectionId: 'rezerva' },
  { label: 'Comandă', sectionId: 'comanda' },
];

// Business Hours
const BUSINESS_HOURS = {
  Monday: { open: '12:00', close: '22:00' },
  Tuesday: { open: '12:00', close: '22:00' },
  Wednesday: { open: '12:00', close: '22:00' },
  Thursday: { open: '12:00', close: '22:00' },
  Friday: { open: '12:00', close: '22:00' },
  Saturday: { open: '12:00', close: '22:00' },
  Sunday: { open: '12:00', close: '22:00' },
};

// Testimonials/Reviews
const TESTIMONIALS = [
  { name: 'Mihai Popescu', rating: 5, text: 'Pizza extraordinară! Ingrediente proaspete și gust autentic. Recomand cu plăcere!' },
  { name: 'Ana Ionescu', rating: 5, text: 'Serviciu rapid și prietenos. Mâncare delicioasă, prezentare frumoasă. Voi reveni sigur!' },
  { name: 'Cristian Vasile', rating: 5, text: 'Cea mai bună pizzerie din București! Calitate premium la prețuri rezonabile.' },
  { name: 'Elena Stoian', rating: 5, text: 'Ambianță plăcută, personal atent. Pizza e crocantă și savuroasă. Bravo!' },
  { name: 'Radu Gheorghe', rating: 5, text: 'Panuzzo-urile sunt fenomenale! Combinații de ingrediente unice și gustoase.' },
  { name: 'Ioana Marinescu', rating: 5, text: 'Meniu variat, preparate gustoase. Urban Slice e alegerea perfectă pentru o cină de calitate.' },
];

// Component: Navigation Bar
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img src={LOGO_URL} alt="Urban Slice" className="h-12 w-12 object-contain" />
            <h1 className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}>
              URBAN SLICE
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {MENU_ITEMS.map((menuItem) => (
              <button
                key={menuItem.label}
                onClick={() => scrollToSection(menuItem.sectionId)}
                className="text-amber-100 hover:text-amber-400 transition-colors duration-200 text-sm font-medium"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
              >
                {menuItem.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-100 hover:text-amber-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md py-4 space-y-2">
            {MENU_ITEMS.map((menuItem) => (
              <button
                key={menuItem.label}
                onClick={() => scrollToSection(menuItem.sectionId)}
                className="block w-full text-left px-4 py-2 text-amber-100 hover:text-amber-400 hover:bg-amber-900/20 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {menuItem.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Component: Hero Section
function HeroSection({ setShowPolicy }: { setShowPolicy?: (policy: string) => void } = {}) {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Rotating Pizza Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="relative w-96 h-96">
          <style>{`
            @keyframes rotatePizza {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .rotating-pizza {
              animation: rotatePizza 20s linear infinite;
              filter: blur(8px);
            }
          `}</style>
          <img
            src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=400&fit=crop"
            alt="Pizza Background"
            className="rotating-pizza w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-amber-100 mb-6 drop-shadow-lg"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '3px', fontWeight: 900 }}
        >
          PIZZA ARTIZANALĂ
        </h1>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-amber-400 mb-8 drop-shadow-lg"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '4px', fontWeight: 900 }}
        >
          CU SUFLET URBAN
        </h2>
        <p
          className="text-sm md:text-lg text-amber-50/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
        >
          Fiecare pizza este o creație artizanală, preparată cu ingrediente premium și pasiune pentru detalii. Bine venit la Urban Slice.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
          <button
            onClick={() => document.getElementById('rezerva')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-amber-500 text-black font-bold text-base sm:text-lg hover:bg-amber-400 transition-all duration-300 hover:scale-105 transform shadow-lg"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '2px', fontWeight: 700 }}
          >
            REZERVĂ MASĂ
          </button>
          <button
            onClick={() => document.getElementById('comanda')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-amber-500 text-amber-400 font-bold text-base sm:text-lg hover:bg-amber-500/10 transition-all duration-300 hover:scale-105 transform"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '2px', fontWeight: 700 }}
          >
            COMANDĂ ACUM
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => document.getElementById('despre')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce text-amber-400 hover:text-amber-300 transition-colors bg-transparent border-none cursor-pointer p-0"
          aria-label="Scroll to About"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}

// Component: About Section with Cover Image
function AboutSection() {
  return (
    <section id="despre" className="bg-gradient-to-b from-black to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-6">
          <h2
            className="text-4xl md:text-5xl font-bold text-amber-100"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}
          >
            DESPRE URBAN SLICE
          </h2>

          <p
            className="text-amber-50/70 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
          >
            Urban Slice nu este doar o pizzerie. Este o pasiune transformată în fiecare bucată pe care o servim. Folosim doar ingrediente premium, provenite din furnizori selectați, și o rețetă tradițională de aluat care se odihnește 72 de ore.
          </p>

          <p
            className="text-amber-50/70 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
          >
            Cuptorul nostru de lemn, încălzit la 350°C, asigură o coacere perfectă în doar 90 de secunde. Fiecare pizza este o operă de artă, preparată cu atenție la detalii și iubire pentru meserie.
          </p>

          <p
            className="text-amber-50/70 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
          >
            Bun venit în lumea Urban Slice, unde tradiția italiană se întâlnește cu spiritul urban și inovația.
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
          <img
            src={IMAGE_URLS.cover}
            alt="Urban Slice Cover"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

// Component: Testimonials Section
function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-2 text-amber-400">
          Ce spun clienții noștri
        </h2>
        <p className="text-center text-slate-400 mb-12">Recenzii autentice de la clienții satisfăcuți</p>
        
        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee {
              animation: marquee 30s linear infinite;
            }
            .marquee:hover {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="marquee flex gap-6 w-fit">
            {/* First set of testimonials */}
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="flex-shrink-0 w-96 bg-slate-800 border border-amber-400/20 rounded-lg p-6 hover:border-amber-400/50 transition-all">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-200 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-amber-400 font-semibold">{testimonial.name}</p>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={`dup-${idx}`} className="flex-shrink-0 w-96 bg-slate-800 border border-amber-400/20 rounded-lg p-6 hover:border-amber-400/50 transition-all">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-200 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-amber-400 font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Component: Menu Section
function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('pizzaClassica');

  const categories = [
    { id: 'pizzaClassica', label: 'PIZZA CLASICĂ' },
    { id: 'pizzaCasa', label: 'PIZZA DELLA CASA' },
    { id: 'streetFood', label: 'STREET FOOD' },
    { id: 'gratar', label: 'GRĂTAR' },
    { id: 'beverages', label: 'BĂUTURI' },
    { id: 'alcoholicBeverages', label: 'BĂUTURI ALCOOLICE' },
  ];

  const currentMenu = MENU_DATA[activeCategory as keyof typeof MENU_DATA];

  return (
    <section id="meniu" className="bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-amber-100 mb-8"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}
        >
          MENIU COMPLET
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 font-bold transition-all duration-200 text-sm ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-black'
                  : 'bg-gray-800 text-amber-100 hover:bg-gray-700'
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {currentMenu.map((item, idx) => {
            const showImage = activeCategory === 'pizzaClassica' || activeCategory === 'pizzaCasa';
            return (
            <div
              key={idx}
              className="bg-gray-900/50 border border-amber-900/30 hover:border-amber-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-amber-900/20 overflow-hidden"
            >
              {showImage && (
              <div className="relative h-32 overflow-hidden bg-gray-800">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
              </div>
              )}
              <div className="p-3">
                <h3 className="text-sm font-bold text-amber-100 mb-1 line-clamp-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                  {item.name}
                </h3>
                {item.ingredients && (
                <p className="text-xs text-amber-50/50 mb-2 line-clamp-2" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
                  {item.ingredients}
                </p>
                )}
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  {Object.entries(item.sizes).map(([size, data]) => (
                    <div key={size} className="flex flex-col">
                      <p className="text-xs text-amber-50/50" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>{size}</p>
                      <p className="text-sm font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{data.price} RON</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Component: Gallery Section
function GallerySection() {
  const galleryImages = [
    { url: IMAGE_URLS.margherita, caption: 'Pizza Artizanală' },
    { url: IMAGE_URLS.diavola, caption: 'Diavola Specială' },
    { url: IMAGE_URLS.cover, caption: 'Ingrediente Premium' },
    { url: IMAGE_URLS.quattroFormaggi, caption: 'Quattro Formaggi' },
    { url: IMAGE_URLS.taraneasca, caption: 'Taraneasca' },
    { url: IMAGE_URLS.carbonara, caption: 'Carbonara Tradițională' },
  ];

  return (
    <section id="galerie" className="bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-amber-100 mb-12"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}
        >
          GALERIE FOTO
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className="relative h-64 overflow-hidden group cursor-pointer rounded-lg"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p
                  className="text-amber-100 font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                >
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Component: Simplified Reservation Form
function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    requests: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.phone) {
      setError('Vă rugăm completați toate câmpurile obligatorii.');
      return;
    }

    if (formData.phone.length < 10) {
      setError('Vă rugăm introduceți un număr de telefon valid.');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xzdjyvol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          guests: formData.guests,
          requests: formData.requests,
          subject: 'Nouă Rezervare - Urban Slice',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', guests: '2', requests: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('A apărut o eroare. Vă rugăm contactați-ne direct.');
      }
    } catch (err) {
      setError('A apărut o eroare. Vă rugăm contactați-ne direct la (0740) 011 876.');
    }
  };

  return (
    <section id="rezerva" className="bg-black py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-amber-100 mb-12"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}
        >
          REZERVĂ MASĂ
        </h2>

        {submitted && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded flex items-start gap-3">
            <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-green-100 font-bold">Rezervare primită!</p>
              <p className="text-green-50/70 text-sm">Vă vom contacta în scurt timp pentru confirmare.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded flex items-start gap-3">
            <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
            <p className="text-red-100 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Nume *"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Telefon *"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />

          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'persoană' : 'persoane'}
              </option>
            ))}
          </select>

          <textarea
            name="requests"
            placeholder="Cerințe speciale (opțional)"
            value={formData.requests}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />

          <button
            type="submit"
            className="w-full bg-amber-500 text-black font-bold py-3 hover:bg-amber-400 transition-all duration-200 hover:scale-105 transform"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '1px', fontWeight: 700 }}
          >
            REZERVĂ MASA
          </button>
        </form>
      </div>
    </section>
  );
}

// Component: Online Order Section
function OrderSection() {
  const [activeCategory, setActiveCategory] = useState('pizzaClassica');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showCart, setShowCart] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const categories = [
    { id: 'pizzaClassica', label: 'PIZZA CLASICĂ' },
    { id: 'pizzaCasa', label: 'PIZZA DELLA CASA' },
    { id: 'streetFood', label: 'STREET FOOD' },
    { id: 'gratar', label: 'GRĂTAR' },
    { id: 'beverages', label: 'BĂUTURI' },
  ];

  const currentMenu = MENU_DATA[activeCategory as keyof typeof MENU_DATA];

  const addToCart = (itemName: string, size: string, price: number) => {
    const key = `${itemName}|${size}|${price}`;
    setCart((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const removeFromCart = (key: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[key];
      return newCart;
    });
  };

  const updateQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(key);
    } else {
      setCart((prev) => ({
        ...prev,
        [key]: quantity,
      }));
    }
  };

  const cartTotal = Object.entries(cart).reduce((sum, [key, qty]) => {
    const price = parseInt(key.split('|')[2]);
    return sum + price * qty;
  }, 0);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(cart).length === 0) {
      alert('Adaugă produse în coș!');
      return;
    }
    if (!customerData.name || !customerData.phone || !customerData.address) {
      alert('Completează toate câmpurile!');
      return;
    }

    const cartItems = Object.entries(cart)
      .map(([key, qty]) => {
        const [name, size, price] = key.split('|');
        return `${name} (${size}) x${qty} = ${parseInt(price) * qty} RON`;
      })
      .join('\n');

    const message = `COMANDĂ NOUĂ\n\nClient: ${customerData.name}\nTelefon: ${customerData.phone}\nAdresă: ${customerData.address}\n\nProduse:\n${cartItems}\n\nTotal: ${cartTotal} RON\n\nNote: ${customerData.notes || 'N/A'}`;

    try {
      await fetch('https://formspree.io/f/xlgpalzv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      setOrderSubmitted(true);
      setCart({});
      setCustomerData({ name: '', phone: '', address: '', notes: '' });
      setTimeout(() => setOrderSubmitted(false), 3000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section id="comanda" className="bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-amber-100 mb-8"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}
        >
          COMANDĂ ACUM
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 font-bold transition-all duration-200 text-sm ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-black'
                  : 'bg-gray-800 text-amber-100 hover:bg-gray-700'
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Products */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentMenu.map((item, idx) => {
                const showImage = activeCategory === 'pizzaClassica' || activeCategory === 'pizzaCasa';
                return (
                  <div
                    key={idx}
                    className="bg-gray-900/50 border border-amber-900/30 hover:border-amber-500/50 transition-all duration-200 overflow-hidden"
                  >
                    {showImage && (
                      <div className="relative h-32 overflow-hidden bg-gray-800">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-amber-100 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                        {item.name}
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(item.sizes).map(([size, data]) => {
                          const key = `${item.name}|${size}|${data.price}`;
                          const qty = cart[key] || 0;
                          return (
                            <div key={size} className="flex items-center justify-between bg-gray-800/50 p-2 rounded">
                              <div>
                                <p className="text-xs text-amber-50/70" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
                                  {size} • {data.price} RON
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {qty > 0 ? (
                                  <>
                                    <button
                                      onClick={() => updateQuantity(key, qty - 1)}
                                      className="w-6 h-6 bg-amber-500 text-black text-sm font-bold hover:bg-amber-400"
                                    >
                                      −
                                    </button>
                                    <span className="w-6 text-center text-amber-400 font-bold">{qty}</span>
                                    <button
                                      onClick={() => addToCart(item.name, size, data.price)}
                                      className="w-6 h-6 bg-amber-500 text-black text-sm font-bold hover:bg-amber-400"
                                    >
                                      +
                                    </button>
                                    <button
                                      onClick={() => removeFromCart(key)}
                                      className="w-6 h-6 bg-red-600 text-white text-sm font-bold hover:bg-red-500"
                                    >
                                      ✕
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => addToCart(item.name, size, data.price)}
                                    className="px-3 py-1 bg-amber-500 text-black text-xs font-bold hover:bg-amber-400"
                                  >
                                    ADAUGĂ
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="bg-gray-900/50 border border-amber-900/30 p-4 h-fit lg:sticky lg:top-24 rounded-lg">
            <h3 className="text-lg font-bold text-amber-100 mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              COȘ ({Object.keys(cart).length})
            </h3>

            {Object.keys(cart).length > 0 ? (
              <>
                <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                  {Object.entries(cart).map(([key, qty]) => {
                    const [name, size, price] = key.split('|');
                    return (
                      <div key={key} className="text-sm text-amber-50/80 flex justify-between items-center">
                        <span>{name} ({size}) x{qty}</span>
                        <span className="text-amber-400 font-bold">{parseInt(price) * qty} RON</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-amber-900/30 pt-2 mb-4">
                  <div className="flex justify-between items-center text-amber-100 font-bold">
                    <span>Total:</span>
                    <span className="text-lg text-amber-400">{cartTotal} RON</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowCart(true)}
                    className="w-full bg-amber-500 text-black font-bold py-2 hover:bg-amber-400 transition-all"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                  >
                    FINALIZEAZĂ COMANDA
                  </button>
                  <button
                    onClick={() => setCart({})}
                    className="w-full bg-red-600/70 text-white font-bold py-2 hover:bg-red-600 transition-all"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                  >
                    GOLEȘTE COȘUL
                  </button>
                </div>
              </>
            ) : (
              <p className="text-amber-50/50 text-sm">Coșul este gol</p>
            )}
          </div>
        </div>

        {/* Checkout Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-amber-900/50 p-6 max-w-md w-full rounded-lg">
              <h3 className="text-2xl font-bold text-amber-100 mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                FINALIZEAZĂ COMANDA
              </h3>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nume *"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-4 py-2 focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <input
                  type="tel"
                  placeholder="Telefon *"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-4 py-2 focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <input
                  type="text"
                  placeholder="Adresă livrare *"
                  value={customerData.address}
                  onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-4 py-2 focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <textarea
                  placeholder="Note (opțional)"
                  value={customerData.notes}
                  onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-4 py-2 focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCart(false)}
                    className="flex-1 bg-gray-700 text-amber-100 font-bold py-2 hover:bg-gray-600"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                  >
                    ÎNAPOI
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 text-black font-bold py-2 hover:bg-amber-400"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                  >
                    TRIMITE COMANDA
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {orderSubmitted && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg z-50">
            Comandă trimisă cu succes!
          </div>
        )}
      </div>
    </section>
  );
}

// Component: Catering Section
function CateringSection() {
  return (
    <section id="catering" className="relative py-20 px-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGE_URLS.cover})`,
          opacity: 0.2,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2
          className="text-4xl md:text-5xl font-bold text-amber-100 mb-6"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}
        >
          CATERING & EVENIMENTE
        </h2>

        <p
          className="text-lg text-amber-50/80 mb-8 leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
        >
          Urban Slice oferă servicii de catering de înaltă calitate pentru corporate events, nunți, petreceri private și orice ocazie specială. Echipa noastră se ocupă de toate detaliile, de la preparare până la servire, asigurând o experiență memorabilă pentru oaspeții dvs.
        </p>

        <p
          className="text-lg text-amber-50/80 mb-8 leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
        >
          Oferim meniuri personalizate, adaptate la bugetul și preferințele dvs., cu ingrediente premium și prezentare impecabilă.
        </p>

        <div className="bg-amber-500 text-black p-8 text-center rounded-lg">
          <p
            className="text-lg font-bold mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '1px', fontWeight: 700 }}
          >
            PENTRU DETALII ȘI OFERTE PERSONALIZATE
          </p>
          <a
            href="tel:+40740011876"
            className="text-2xl font-bold hover:underline"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}
          >
            (0740) 011 876
          </a>
        </div>

        {/* Scroll Arrow */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-amber-400 hover:text-amber-300 transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}

// Component: Location Section
function LocationSection() {
  return (
    <section id="contact" className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-amber-100 mb-12"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}
        >
          LOCAȚIE & CONTACT
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Map */}
          <div className="h-96 bg-gray-900 rounded overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2835.8!2d26.0968!3d44.4365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff0d6bd3d13b%3A0x6e94645937abf452!2sUrban%20Slice!5e0!3m2!1sen!2sro!4v1710769200"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3
                className="text-2xl font-bold text-amber-100 mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
              >
                ADRESĂ
              </h3>
              <p
                className="text-amber-50/70"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
              >
                Urban Slice
                <br />
                Strada Măgura Vulturului 2, 021704 București, Romania
              </p>
            </div>

            <div>
              <h3
                className="text-2xl font-bold text-amber-100 mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
              >
                PROGRAM
              </h3>
              <div className="space-y-2" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
                <p className="text-amber-50/70">Luni - Duminică: 12:00 - 22:00</p>
              </div>
            </div>

            <div>
              <h3
                className="text-2xl font-bold text-amber-100 mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
              >
                CONTACT
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+40740011876"
                  className="flex items-center gap-3 text-amber-100 hover:text-amber-400 transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                >
                  <Phone size={20} />
                  (0740) 011 876
                </a>
                <a
                  href="mailto:mihai.grigoras82@gmail.com"
                  className="flex items-center gap-3 text-amber-100 hover:text-amber-400 transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                >
                  <Mail size={20} />
                  mihai.grigoras82@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Component: Footer
function Footer({ setShowPolicy }: { setShowPolicy: (policy: string) => void }) {
  return (
    <footer className="bg-gray-950 border-t border-amber-900/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              URBAN SLICE
            </h3>
            <p className="text-amber-50/60 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Pizza artizanală cu suflet urban
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-amber-100 font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              MENIU
            </h4>
            <ul className="space-y-2 text-amber-50/60 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <li><a href="#meniu" className="hover:text-amber-400 transition-colors">Meniu Complet</a></li>
              <li><a href="#galerie" className="hover:text-amber-400 transition-colors">Galerie</a></li>
              <li><a href="#catering" className="hover:text-amber-400 transition-colors">Catering</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-amber-100 font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              CONTACT
            </h4>
            <div className="space-y-2 text-amber-50/60 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <p>(0740) 011 876</p>
              <p>mihai.grigoras82@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-amber-900/30 pt-8 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          <p className="text-amber-50/50 text-sm mb-4">© 2025 Urban Slice. Toate drepturile rezervate.</p>
          <div className="flex justify-center gap-6 text-sm">
            <button onClick={() => setShowPolicy('privacy')} className="text-amber-100 hover:text-amber-400 transition-colors duration-200 bg-transparent border-none cursor-pointer">Privacy Policy</button>
            <span className="text-amber-900/50">|</span>
            <button onClick={() => setShowPolicy('terms')} className="text-amber-100 hover:text-amber-400 transition-colors duration-200 bg-transparent border-none cursor-pointer">Terms & Conditions</button>
            <span className="text-amber-900/50">|</span>
            <button onClick={() => setShowPolicy('cookies')} className="text-amber-100 hover:text-amber-400 transition-colors duration-200 bg-transparent border-none cursor-pointer">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Component: Cookie Consent Banner
function CookieConsent() {
  const [showCookie, setShowCookie] = useState(true);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      setShowCookie(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookie(false);
  };

  if (!showCookie) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-amber-900/30 p-4 z-30">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-amber-50/70 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Folosim cookies pentru a îmbunătăți experiența dvs. Continuând, acceptați politica noastră de cookies.
        </p>
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors whitespace-nowrap"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
        >
          ACCEPT
        </button>
      </div>
    </div>
  );
}

// Policy Modals Component
function PolicyModals({ activePolicy, onClose }: { activePolicy: string | null; onClose: () => void }) {
  const policies: Record<string, { title: string; content: string }> = {
    privacy: {
      title: 'Politica de Confidențialitate',
      content: `Ultima actualizare: martie 2025\n\nUrban Slice respectă confidențialitatea datelor dumneavoastră personale și se angajează să le protejeze în conformitate cu Regulamentul (UE) 2016/679 (GDPR).\n\nDate colectate\nColectăm datele furnizate voluntar: nume, adresă de e-mail, număr de telefon, la momentul rezervărilor sau contactării noastre.\n\nScopul prelucrării\n- Gestionarea rezervărilor și comenzilor\n- Comunicarea informațiilor despre oferte și evenimente\n- Îmbunătățirea serviciilor noastre\n\nDrepturile dumneavoastră\nAveți dreptul de acces, rectificare, ștergere, restricționare a prelucrării, portabilitate și opoziție. Puteți exercita aceste drepturi scriind la mihai.grigoras82@gmail.com.\n\nSecuritate\nDatele dumneavoastră sunt stocate în condiții de securitate și nu sunt vândute sau transferate către terți fără consimțământul dumneavoastră.\n\nContact DPO\nPentru orice întrebare legată de prelucrarea datelor, ne puteți contacta la adresa de mai sus sau prin poștă la sediul restaurantului.`
    },
    terms: {
      title: 'Termeni și Condiții',
      content: `Ultima actualizare: martie 2025\n\nPrin utilizarea site-ului Urban Slice, acceptați termenii și condițiile de mai jos.\n\nProprietate intelectuală\nTot conținutul acestui site (logo, imagini, texte, meniu) este proprietatea Urban Slice și este protejat de legea drepturilor de autor.\n\nRezervări\nRezervările se pot face online, telefonic sau prin e-mail. Vă rugăm să ne anunțați cu cel puțin 2 ore înainte în cazul anulării.\n\nResponsabilitate\nUrban Slice nu poate fi ținut responsabil pentru inexactitățile tehnice de pe site sau pentru disponibilitatea anumitor preparate în funcție de sezon.\n\nPrețuri\nPrețurile afișate sunt în lei (RON) și includ TVA conform legislației române în vigoare. Ne rezervăm dreptul de a modifica prețurile fără notificare prealabilă.\n\nLegislație aplicabilă\nPrezentul acord este guvernat de legislația română. Orice litigiu va fi soluționat de instanțele competente din România.`
    },
    cookies: {
      title: 'Politica Cookies',
      content: `Ultima actualizare: martie 2025\n\nSite-ul Urban Slice utilizează fișiere de tip cookie pentru a vă oferi o experiență optimă de navigare.\n\nCe sunt cookies?\nCookie-urile sunt fișiere mici stocate pe dispozitivul dumneavoastră când vizitați un site web. Ele ne ajută să îmbunătățim funcționalitatea și relevanța conținutului.\n\nTipuri de cookies utilizate\n- Cookie-uri esențiale – necesare pentru funcționarea site-ului (sesiune, coș de comenzi)\n- Cookie-uri analitice – pentru a înțelege cum este utilizat site-ul (Google Analytics)\n- Cookie-uri de marketing – pentru afișarea de conținut relevant pe platformele partenere\n\nGestionarea cookies\nPuteți controla și șterge cookie-urile prin setările browserului dumneavoastră. Dezactivarea cookies poate afecta funcționalitatea site-ului.\n\nConsimțământ\nPrin continuarea navigării pe site-ul nostru, vă exprimați acordul cu utilizarea cookies conform prezentei politici.`
    }
  };

  if (!activePolicy || !policies[activePolicy]) return null;

  const policy = policies[activePolicy];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-amber-400/30 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
            {policy.title}
          </h2>
          <button
            onClick={onClose}
            className="text-amber-400 hover:text-amber-300 transition-colors text-2xl"
          >
            ✕
          </button>
        </div>
        <div className="text-slate-200 whitespace-pre-wrap text-sm leading-relaxed">
          {policy.content}
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function Home() {
  const [showPolicy, setShowPolicy] = React.useState<string | null>(null);
  return (
    <div className="bg-black text-amber-50 overflow-hidden">
      {showPolicy && <PolicyModals activePolicy={showPolicy} onClose={() => setShowPolicy(null)} />}
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;500;700&display=swap');
        
        * {
          font-family: 'Montserrat', sans-serif;
        }
        
        /* Grain texture overlay */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.05"/></svg>');
          z-index: -1;
        }
        
        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }
        
        /* Selection color */
        ::selection {
          background-color: #d4a843;
          color: #1a1a1a;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #d4a843;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #e8a855;
        }
      `}</style>

      <Navigation />
      <HeroSection setShowPolicy={setShowPolicy} />
      <AboutSection />
      <TestimonialsSection />
      <MenuSection />
      <GallerySection />
      <ReservationSection />
      <OrderSection />
      <CateringSection />
      <LocationSection />
      <Footer setShowPolicy={setShowPolicy} />
      <CookieConsent />
    </div>
  );
}
