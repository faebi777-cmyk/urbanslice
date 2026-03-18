import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingCart, MapPin, Phone, Mail, Instagram, Facebook, Music, ChevronDown, Check, AlertCircle } from 'lucide-react';

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

// Complete Menu Data
const MENU_DATA = {
  pizzaClassica: [
    { name: 'MARGHERITA', image: IMAGE_URLS.margherita, sizes: { '32cm': { price: 40, weight: '580 g' }, '40cm': { price: 55, weight: '700 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, busuioc' },
    { name: 'VEGETARIANA', image: IMAGE_URLS.vegetariana, sizes: { '32cm': { price: 40, weight: '660 g' }, '40cm': { price: 55, weight: '770 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, ciuperci, ardei gras, porumb, măsline' },
    { name: 'CAPRICIOSA', image: IMAGE_URLS.capricciosa, sizes: { '32cm': { price: 45, weight: '670 g' }, '40cm': { price: 65, weight: '870 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă, ciuperci, măsline, cârnați' },
    { name: 'PROSCIUTTO FUNGHI', image: IMAGE_URLS.prosciuttoFunghi, sizes: { '32cm': { price: 45, weight: '620 g' }, '40cm': { price: 65, weight: '720 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă, ciuperci' },
    { name: 'QUATTRO FORMAGGI', image: IMAGE_URLS.quattroFormaggi, sizes: { '32cm': { price: 50, weight: '600 g' }, '40cm': { price: 65, weight: '740 g' } }, ingredients: 'Palina, cheddar, mozzarella, gorgonzola, parmezan' },
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
    { name: 'DIAVOLA TARTUFATA', image: IMAGE_URLS.diavola_tartufata, sizes: { '32cm': { price: 45, weight: '660 g' }, '40cm': { price: 65, weight: '800 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam, pasta de trufe, peperoncini' },
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
    { name: 'BURGER URBAN BLACK ANGUS', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 50, weight: '350 g' } }, ingredients: 'Chiflă burger, burger Black Angus România, sos Urban, cheddar, mozzarella, castraveți murați, salată, bacon, ceapă' },
    { name: 'BURGER CRISPY', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 45, weight: '350 g' } }, ingredients: 'Chiflă burger, 120 g pui crispy, sos Urban, cheddar, mozzarella, castraveți murați, salată, bacon, ceapă' },
  ],
  gratar: [
    { name: 'MICI', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 7, weight: '90 g' } }, ingredients: 'Carne vită, carne porc, condimente' },
    { name: 'CÂRNAȚI SEMIAFUMAȚI', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '80 g' } }, ingredients: 'Carne porc, usturoi, condimente' },
    { name: 'CEAFĂ DE PORC LA GRĂTAR', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '200 g' } }, ingredients: 'Ceafă de porc, condimente' },
    { name: 'COTLET DE PORC LA GRĂTAR', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 20, weight: '200 g' } }, ingredients: 'Cotlet de porc, condimente' },
    { name: 'PIEPT DE PORC LA GRĂTAR', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '200 g' } }, ingredients: 'Piept de porc, condimente' },
    { name: 'PIEPT DE PUI LA GRĂTAR', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 20, weight: '200 g' } }, ingredients: 'Piept de pui, condimente' },
    { name: 'PASTRAMĂ DE BERBECUȚ', image: IMAGE_URLS.margherita, sizes: { 'standard': { price: 25, weight: '100 g' } }, ingredients: 'Carne de berbecuț, condimente' },
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
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}>
              URBAN SLICE
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Meniu', 'Galerie', 'Catering', 'Rezervă Masă', 'Comandă'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s/g, '-'))}
                className="text-amber-100 hover:text-amber-400 transition-colors duration-200 text-sm font-medium"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
              >
                {item}
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
            {['Meniu', 'Galerie', 'Catering', 'Rezervă Masă', 'Comandă'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s/g, '-'))}
                className="block w-full text-left px-4 py-2 text-amber-100 hover:text-amber-400 hover:bg-amber-900/20 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Component: Hero Section with Rotating Pizza
function HeroSection() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen bg-black overflow-hidden pt-16">
      {/* Animated Rotating Pizza Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="relative w-96 h-96 animate-spin" style={{ animationDuration: '20s' }}>
          <img
            src={IMAGE_URLS.margherita}
            alt="Pizza"
            className="w-full h-full object-cover rounded-full blur-xl"
          />
        </div>
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="space-y-6 max-w-3xl">
          <h1
            className="text-5xl md:text-7xl font-bold text-amber-100 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '3px', fontWeight: 700 }}
          >
            PIZZA ARTIZANALĂ
            <br />
            <span className="text-amber-400">CU SUFLET URBAN</span>
          </h1>

          <p
            className="text-lg md:text-xl text-amber-50/80 max-w-2xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
          >
            Fiecare pizza este o creație artizanală, preparată cu ingrediente premium și pasiune pentru detalii. Bine venit la Urban Slice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              onClick={() => document.getElementById('rezerva-masa')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all duration-200 hover:scale-105 transform"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '1px', fontWeight: 700 }}
            >
              REZERVĂ MASĂ
            </button>
            <button
              onClick={() => document.getElementById('comanda')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-amber-400 text-amber-400 font-bold hover:bg-amber-400/10 transition-all duration-200 hover:scale-105 transform"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '1px', fontWeight: 700 }}
            >
              COMANDĂ ACUM
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        {showScroll && (
          <div className="absolute bottom-8 animate-bounce">
            <ChevronDown className="text-amber-400" size={32} />
          </div>
        )}
      </div>
    </section>
  );
}

// Component: About Section with Cover Image
function AboutSection() {
  return (
    <section className="bg-gradient-to-b from-black to-gray-900 py-20 px-4">
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

// Component: Menu Section
function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('pizzaClassica');

  const categories = [
    { id: 'pizzaClassica', label: 'PIZZA CLASICĂ' },
    { id: 'pizzaCasa', label: 'PIZZA DELLA CASA' },
    { id: 'streetFood', label: 'STREET FOOD ITALIAN' },
    { id: 'gratar', label: 'GRĂTAR' },
    { id: 'beverages', label: 'BĂUTURI' },
  ];

  const currentMenu = MENU_DATA[activeCategory as keyof typeof MENU_DATA];

  return (
    <section id="meniu" className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-amber-100 mb-12"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}
        >
          MENIU COMPLET
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 font-bold transition-all duration-200 ${
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMenu.map((item, idx) => {
            const showImage = activeCategory === 'pizzaClassica' || activeCategory === 'pizzaCasa';
            return (
            <div
              key={idx}
              className="bg-gray-900/50 border border-amber-900/30 overflow-hidden hover:border-amber-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-amber-900/20"
            >
              {/* Product Image - Only for Pizza categories */}
              {showImage && (
              <div className="relative h-48 overflow-hidden bg-gray-800">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              )}

              {/* Product Info */}
              <div className={showImage ? 'p-4' : 'p-6'}>
                <h3
                  className="text-lg font-bold text-amber-100 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                >
                  {item.name}
                </h3>

                <p
                  className="text-sm text-amber-50/60 mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                >
                  {item.ingredients}
                </p>

                <div className="flex flex-wrap gap-3 items-center justify-between">
                  {Object.entries(item.sizes).map(([size, data]) => (
                    <div key={size} className="flex items-center gap-2">
                      <div>
                        <p
                          className="text-xs text-amber-50/50"
                          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                        >
                          {size}
                          {data.weight && ` • ${data.weight}`}
                        </p>
                        <p
                          className="text-lg font-bold text-amber-400"
                          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                        >
                          {data.price} RON
                        </p>
                      </div>
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
      const response = await fetch('https://formspree.io/f/xyzabc123', {
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
    <section id="rezerva-masa" className="bg-black py-20 px-4">
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

// Component: Online Order Section - All Products
function OrderSection() {
  const [cart, setCart] = useState<Array<{ name: string; size: string; price: number; quantity: number }>>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const allItems = [
    ...MENU_DATA.pizzaClassica,
    ...MENU_DATA.pizzaCasa,
    ...MENU_DATA.streetFood,
    ...MENU_DATA.gratar,
    ...MENU_DATA.beverages,
  ];

  const addToCart = (item: any, size: string) => {
    const price = item.sizes[size].price;
    const cartItem = { name: item.name, size, price, quantity: 1 };
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name && c.size === size);
      if (existing) {
        return prev.map((c) =>
          c.name === item.name && c.size === size ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (name: string, size: string) => {
    setCart((prev) => prev.filter((c) => !(c.name === name && c.size === size)));
  };

  const updateQuantity = (name: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(name, size);
    } else {
      setCart((prev) =>
        prev.map((c) => (c.name === name && c.size === size ? { ...c, quantity } : c))
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError('');

    if (!customerData.name || !customerData.phone || !customerData.address) {
      setOrderError('Vă rugăm completați toate câmpurile obligatorii.');
      return;
    }

    if (cart.length === 0) {
      setOrderError('Coșul dvs. este gol. Adăugați articole înainte de a comanda.');
      return;
    }

    try {
      const orderDetails = cart.map((item) => `${item.quantity}x ${item.name} (${item.size}) - ${item.price * item.quantity} RON`).join('\n');

      const response = await fetch('https://formspree.io/f/xyzabc123', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerData.name,
          phone: customerData.phone,
          address: customerData.address,
          notes: customerData.notes,
          order_details: orderDetails,
          total: `${cartTotal} RON`,
          subject: 'Nouă Comandă Online - Urban Slice',
        }),
      });

      if (response.ok) {
        setOrderSubmitted(true);
        setCart([]);
        setCustomerData({ name: '', phone: '', address: '', notes: '' });
        setTimeout(() => {
          setOrderSubmitted(false);
          setShowCart(false);
        }, 5000);
      } else {
        setOrderError('A apărut o eroare. Vă rugăm contactați-ne direct.');
      }
    } catch (err) {
      setOrderError('A apărut o eroare. Vă rugăm contactați-ne direct la (0740) 011 876.');
    }
  };

  return (
    <section id="comanda" className="bg-gradient-to-b from-black to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-amber-100 mb-12"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px', fontWeight: 700 }}
        >
          COMANDĂ ONLINE
        </h2>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {allItems.map((item, idx) => (
                <div key={idx} className="bg-gray-900/50 border border-amber-900/30 overflow-hidden hover:border-amber-500/50 transition-all duration-200">
                  {/* Product Image */}
                  <div className="relative h-40 overflow-hidden bg-gray-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-amber-100 font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(item.sizes).map(([size, data]) => (
                        <button
                          key={size}
                          onClick={() => addToCart(item, size)}
                          className="px-3 py-2 bg-amber-500 text-black text-sm font-bold hover:bg-amber-400 transition-colors"
                          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                        >
                          {size} - {data.price} RON
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="bg-gray-900/50 border border-amber-900/30 p-6 h-fit sticky top-24 rounded-lg">
            <h3
              className="text-amber-100 font-bold mb-4 flex items-center justify-between"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              COȘUL MEU
              <span className="bg-amber-500 text-black px-2 py-1 text-sm rounded">{cart.length}</span>
            </h3>

            {cart.length === 0 ? (
              <p className="text-amber-50/50 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Coșul dvs. este gol
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {cart.map((item, idx) => (
                    <div key={idx} className="border-b border-amber-900/20 pb-3">
                      <p className="text-amber-100 text-sm font-bold">{item.name}</p>
                      <p className="text-amber-50/50 text-xs">{item.size}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.name, item.size, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-800 text-amber-100 text-xs hover:bg-gray-700"
                          >
                            −
                          </button>
                          <span className="text-amber-100 text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.name, item.size, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-800 text-amber-100 text-xs hover:bg-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-amber-400 font-bold">{item.price * item.quantity} RON</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-amber-900/20 pt-4 mb-4">
                  <p className="flex justify-between text-amber-100 font-bold">
                    <span>TOTAL:</span>
                    <span>{cartTotal} RON</span>
                  </p>
                </div>

                <button
                  onClick={() => setShowCart(!showCart)}
                  className="w-full bg-amber-500 text-black font-bold py-2 hover:bg-amber-400 transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                >
                  {showCart ? 'ASCUNDE FORMULAR' : 'FINALIZEAZĂ COMANDA'}
                </button>
              </>
            )}

            {showCart && cart.length > 0 && (
              <form onSubmit={handleOrderSubmit} className="mt-6 space-y-3 border-t border-amber-900/20 pt-6">
                {orderSubmitted && (
                  <div className="p-3 bg-green-900/30 border border-green-500/50 rounded text-green-100 text-sm">
                    ✓ Comanda ta a fost plasată! Vei fi contactat în scurt timp.
                  </div>
                )}

                {orderError && (
                  <div className="p-3 bg-red-900/30 border border-red-500/50 rounded text-red-100 text-sm">
                    {orderError}
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Nume *"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <input
                  type="tel"
                  placeholder="Telefon *"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <input
                  type="text"
                  placeholder="Adresă livrare *"
                  value={customerData.address}
                  onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <textarea
                  placeholder="Note (opțional)"
                  value={customerData.notes}
                  onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                  rows={2}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-2 hover:bg-green-700 transition-colors text-sm"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                >
                  PLASEAZĂ COMANDA
                </button>
              </form>
            )}
          </div>
        </div>
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
      </div>
    </section>
  );
}

// Component: Location Section
function LocationSection() {
  return (
    <section className="bg-black py-20 px-4">
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2834.7366347656396!2d26.10385!3d44.43688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201d4e4e4e4e5%3A0x1234567890abcdef!2sBucharest%2C%20Romania!5e0!3m2!1sen!2sro!4v1234567890"
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
                Urban Slice Pizzeria
                <br />
                București, România
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
                <p className="text-amber-50/70">Luni - Joi: 11:00 - 23:00</p>
                <p className="text-amber-50/70">Vineri - Sâmbătă: 11:00 - 00:00</p>
                <p className="text-amber-50/70">Duminică: 12:00 - 23:00</p>
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
function Footer() {
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
        <div className="border-t border-amber-900/30 pt-8 text-center text-amber-50/50 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          <p>© 2025 Urban Slice. Toate drepturile rezervate.</p>
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

// Main Component
export default function Home() {
  return (
    <div className="bg-black text-amber-50 overflow-hidden">
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
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ReservationSection />
      <OrderSection />
      <CateringSection />
      <LocationSection />
      <Footer />
      <CookieConsent />
    </div>
  );
}
