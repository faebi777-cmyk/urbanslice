import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingCart, MapPin, Phone, Mail, Instagram, Facebook, Music, ChevronDown, Check, AlertCircle } from 'lucide-react';

/**
 * URBAN SLICE - ARTISAN PIZZERIA WEBSITE
 * 
 * DESIGN PHILOSOPHY: Dark, moody, editorial aesthetic
 * - Deep charcoal/black backgrounds (#1a1a1a, #2d2d2d)
 * - Warm ember/brick accents (#e8541a, #c0392b)
 * - Gold highlights (#d4a843)
 * - Cream text (#f5f0e8)
 * - Typography: Bebas Neue (headlines), Playfair Display (subheadings), DM Sans (body)
 * - Asymmetric layouts, overlapping elements, bold transitions, subtle grain texture
 */

// Menu data structure
const MENU_DATA = {
  pizzaClassica: [
    { name: 'MARGHERITA', sizes: { '32cm': { price: 40, weight: '580 g' }, '40cm': { price: 55, weight: '700 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, busuioc' },
    { name: 'VEGETARIANA', sizes: { '32cm': { price: 40, weight: '660 g' }, '40cm': { price: 55, weight: '770 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, ciuperci, ardei gras, porumb, măsline' },
    { name: 'CAPRICIOSA', sizes: { '32cm': { price: 45, weight: '670 g' }, '40cm': { price: 65, weight: '870 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă, ciuperci, măsline, cârnați' },
    { name: 'PROSCIUTTO FUNGHI', sizes: { '32cm': { price: 45, weight: '620 g' }, '40cm': { price: 65, weight: '720 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă, ciuperci' },
    { name: 'QUATTRO FORMAGGI', sizes: { '32cm': { price: 50, weight: '600 g' }, '40cm': { price: 65, weight: '740 g' } }, ingredients: 'Palina, cheddar, mozzarella, gorgonzola, parmezan' },
    { name: 'COTTO', sizes: { '32cm': { price: 42, weight: '600 g' }, '40cm': { price: 65, weight: '700 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă' },
    { name: 'TONNO', sizes: { '32cm': { price: 45, weight: '650 g' }, '40cm': { price: 65, weight: '890 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, ton, măsline, ceapă' },
    { name: 'CAPRESE', sizes: { '32cm': { price: 45, weight: '615 g' }, '40cm': { price: 65, weight: '770 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, pesto, roșii cherry' },
    { name: 'DIAVOLA', sizes: { '32cm': { price: 45, weight: '630 g' }, '40cm': { price: 65, weight: '730 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam, peperoncini' },
    { name: 'SALAMI', sizes: { '32cm': { price: 45, weight: '630 g' }, '40cm': { price: 65, weight: '750 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam' },
    { name: 'CALZONE', sizes: { '32cm': { price: 45, weight: '560 g' }, '40cm': { price: 65, weight: '760 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă, bacon' },
    { name: 'TARANEASCA', sizes: { '32cm': { price: 50, weight: '620 g' }, '40cm': { price: 70, weight: '820 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, bacon, șuncă, salam, cârnați, ciuperci, ardei gras, porumb, ceapă' },
    { name: 'QUATTRO STAGIONI', sizes: { '32cm': { price: 45, weight: '660 g' }, '40cm': { price: 65, weight: '880 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, șuncă, ciuperci, salam, măsline' },
  ],
  pizzaCasa: [
    { name: 'ZUCCHINI', sizes: { '32cm': { price: 40, weight: '630 g' }, '40cm': { price: 55, weight: '740 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, zucchini, gorgonzola, peperoncino' },
    { name: 'URBAN', sizes: { '32cm': { price: 45, weight: '660 g' }, '40cm': { price: 65, weight: '800 g' } }, ingredients: 'Palina, sos roșii, mozzarella, chorizo, gorgonzola, cedar, parmezan' },
    { name: 'MORTADELLA', sizes: { '32cm': { price: 50, weight: '640 g' }, '40cm': { price: 70, weight: '840 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, mortadella, pesto, busuioc' },
    { name: 'EL CIOLANESCU', sizes: { '32cm': { price: 50, weight: '660 g' }, '40cm': { price: 70, weight: '800 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, ciolan afumat, ouă de prepeliță, ardei gras, usturoi, piper, ulei de măsline extravirgin' },
    { name: 'QUATTRO CARNE', sizes: { '32cm': { price: 50, weight: '660 g' }, '40cm': { price: 70, weight: '660 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam Napoli, prosciutto cotto, ventricina, cârnați, parmezan' },
    { name: 'QUATTRO FORMAGGI E VENTRICINA', sizes: { '32cm': { price: 50, weight: '640 g' }, '40cm': { price: 70, weight: '640 g' } }, ingredients: 'Palina, sos alb, cheddar, mozzarella, gorgonzola, parmezan, ventricina' },
    { name: 'TARTUFO E SALSICCIA', sizes: { '32cm': { price: 50, weight: '660 g' }, '40cm': { price: 70, weight: '660 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, pastă de trufe, cârnat proaspăt salsiccia' },
    { name: 'PASTRAMI CON POMODORI SECCHI', sizes: { '32cm': { price: 45, weight: '660 g' }, '40cm': { price: 65, weight: '660 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, pastramă, roșii uscate' },
    { name: 'PROSCIUTTO CRUDO E RUCOLA', sizes: { '32cm': { price: 50, weight: '660 g' }, '40cm': { price: 70, weight: '660 g' } }, ingredients: 'Palina, mozzarella, roșii cherry, rucola, prosciutto crudo, parmezan' },
    { name: 'CARBONARA', sizes: { '32cm': { price: 45, weight: '620 g' }, '40cm': { price: 65, weight: '800 g' } }, ingredients: 'Palina, sos alb, mozzarella, pancetta, ou' },
    { name: 'DIAVOLA TARTUFATA', sizes: { '32cm': { price: 45, weight: '660 g' }, '40cm': { price: 65, weight: '800 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam, pasta de trufe, peperoncini' },
    { name: 'SALAMI TARTUFATA', sizes: { '32cm': { price: 50, weight: '650 g' }, '40cm': { price: 70, weight: '750 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam, pastă de trufe' },
  ],
  streetFood: [
    { name: 'URBAN HOT DOG', sizes: { 'standard': { price: 30, weight: '280 g' } }, ingredients: 'Cârnat semiafumat, sos Urban, cheddar, mozzarella, parmezan' },
    { name: 'PANUZZO COTTO', sizes: { 'standard': { price: 30, weight: '320 g' } }, ingredients: 'Palina, sos de roșii cu busuioc, mozzarella, prosciutto cotto, rucola, unt, ulei de măsline' },
    { name: 'PANUZZO MORTADELA', sizes: { 'standard': { price: 35, weight: '320 g' } }, ingredients: 'Palina, mortadella, rucola, stracciatella, pesto, ulei de măsline' },
    { name: 'PANUZZO CHORIZO', sizes: { 'standard': { price: 30, weight: '320 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, chorizo, rucola, cheddar, ulei picant' },
    { name: 'PANUZZO CRISPY', sizes: { 'standard': { price: 35, weight: '320 g' } }, ingredients: 'Palina, pui crispy, sos Urban, rucola' },
    { name: 'PANUZZO CAPRESE', sizes: { 'standard': { price: 30, weight: '320 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, pesto, roșii cherry, rucola, ulei de măsline' },
    { name: 'PANUZZO VENTRICINA', sizes: { 'standard': { price: 30, weight: '320 g' } }, ingredients: 'Palina, sos de roșii, mozzarella, salam ventricina, rucola' },
    { name: 'BURGER URBAN BLACK ANGUS', sizes: { 'standard': { price: 50, weight: '350 g' } }, ingredients: 'Chiflă burger, burger Black Angus România, sos Urban, cheddar, mozzarella, castraveți murați, salată, bacon, ceapă' },
    { name: 'BURGER CRISPY', sizes: { 'standard': { price: 45, weight: '350 g' } }, ingredients: 'Chiflă burger, 120 g pui crispy, sos Urban, cheddar, mozzarella, castraveți murați, salată, bacon, ceapă' },
  ],
  gratar: [
    { name: 'MICI', sizes: { 'standard': { price: 7, weight: '90 g' } }, ingredients: 'Carne vită, carne porc, condimente' },
    { name: 'CÂRNAȚI SEMIAFUMAȚI', sizes: { 'standard': { price: 25, weight: '80 g' } }, ingredients: 'Carne porc, usturoi, condimente' },
    { name: 'CEAFĂ DE PORC LA GRĂTAR', sizes: { 'standard': { price: 25, weight: '200 g' } }, ingredients: 'Ceafă de porc, condimente' },
    { name: 'COTLET DE PORC LA GRĂTAR', sizes: { 'standard': { price: 20, weight: '200 g' } }, ingredients: 'Cotlet de porc, condimente' },
    { name: 'PIEPT DE PORC LA GRĂTAR', sizes: { 'standard': { price: 25, weight: '200 g' } }, ingredients: 'Piept de porc, condimente' },
    { name: 'PIEPT DE PUI LA GRĂTAR', sizes: { 'standard': { price: 20, weight: '200 g' } }, ingredients: 'Piept de pui, condimente' },
    { name: 'PASTRAMĂ DE BERBECUȚ', sizes: { 'standard': { price: 25, weight: '100 g' } }, ingredients: 'Carne de berbecuț, condimente' },
  ],
  beverages: [
    { name: 'Pepsi', sizes: { '330ml': { price: 10, weight: '330 ml' } }, ingredients: '' },
    { name: 'Mirinda', sizes: { '330ml': { price: 10, weight: '330 ml' } }, ingredients: '' },
    { name: 'Lipton', sizes: { '330ml': { price: 10, weight: '330 ml' } }, ingredients: '' },
    { name: 'Apa plată', sizes: { '500ml': { price: 10, weight: '500 ml' } }, ingredients: '' },
    { name: 'Apa minerală', sizes: { '500ml': { price: 10, weight: '500 ml' } }, ingredients: '' },
    { name: 'Limonada simplă', sizes: { 'standard': { price: 15, weight: '' } }, ingredients: '' },
    { name: 'Limonada arome', sizes: { 'standard': { price: 18, weight: '' } }, ingredients: '' },
    { name: 'Ceai cald', sizes: { 'standard': { price: 15, weight: '' } }, ingredients: '' },
    { name: 'Espresso', sizes: { '30ml': { price: 10, weight: '30 ml' } }, ingredients: '' },
    { name: 'Latte', sizes: { '280ml': { price: 15, weight: '280 ml' } }, ingredients: '' },
    { name: 'Cappuccino', sizes: { '200ml': { price: 15, weight: '200 ml' } }, ingredients: '' },
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
            <h1 className="text-2xl font-bold text-amber-400" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}>
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
                style={{ fontFamily: 'DM Sans, sans-serif' }}
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
                style={{ fontFamily: 'DM Sans, sans-serif' }}
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

// Component: Hero Section
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
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=800&fit=crop)',
          opacity: 0.4,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="space-y-6 max-w-3xl">
          <h1
            className="text-5xl md:text-7xl font-bold text-amber-100 leading-tight"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '3px' }}
          >
            PIZZA ARTIZANALĂ
            <br />
            <span className="text-amber-400">CU SUFLET URBAN</span>
          </h1>

          <p
            className="text-lg md:text-xl text-amber-50/80 max-w-2xl mx-auto"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Fiecare pizza este o creație artizanală, preparată cu ingrediente premium și pasiune pentru detalii. Bine venit la Urban Slice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              onClick={() => document.getElementById('rezerva-masa')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors duration-200"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '1px' }}
            >
              REZERVĂ MASĂ
            </button>
            <button
              onClick={() => document.getElementById('comanda')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-amber-400 text-amber-400 font-bold hover:bg-amber-400/10 transition-colors duration-200"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '1px' }}
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

// Component: About Section
function AboutSection() {
  return (
    <section className="bg-gradient-to-b from-black to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-6">
          <h2
            className="text-4xl md:text-5xl font-bold text-amber-100"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}
          >
            DESPRE URBAN SLICE
          </h2>

          <p
            className="text-amber-50/70 leading-relaxed"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Urban Slice nu este doar o pizzerie. Este o pasiune transformată în fiecare bucată pe care o servim. Folosim doar ingrediente premium, provenite din furnizori selectați, și o rețetă tradițională de aluat care se odihnește 72 de ore.
          </p>

          <p
            className="text-amber-50/70 leading-relaxed"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Cuptorul nostru de lemn, încălzit la 350°C, asigură o coacere perfectă în doar 90 de secunde. Fiecare pizza este o operă de artă, preparată cu atenție la detalii și iubire pentru meserie.
          </p>

          <p
            className="text-amber-50/70 leading-relaxed"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Bun venit în lumea Urban Slice, unde tradiția italiană se întâlnește cu spiritul urban și inovația.
          </p>
        </div>

        {/* Image */}
        <div className="relative h-96 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1571407-4713efb1f6b8?w=600https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=600&h=600&fit=croph=600https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=600&h=600&fit=cropfit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-amber-100 mb-12"
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}
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
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {currentMenu.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900/50 border border-amber-900/30 p-6 hover:border-amber-500/50 transition-all duration-200"
            >
              <h3
                className="text-lg font-bold text-amber-100 mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {item.name}
              </h3>

              <p
                className="text-sm text-amber-50/60 mb-4"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {item.ingredients}
              </p>

              <div className="flex flex-wrap gap-4 items-center justify-between">
                {Object.entries(item.sizes).map(([size, data]) => (
                  <div key={size} className="flex items-center gap-3">
                    <div>
                      <p
                        className="text-xs text-amber-50/50"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {size}
                        {data.weight && ` • ${data.weight}`}
                      </p>
                      <p
                        className="text-xl font-bold text-amber-400"
                        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                      >
                        {data.price} RON
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-12 p-6 bg-amber-900/20 border border-amber-500/30 text-center text-amber-50/70"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          <p className="italic">
            Meniul complet cu gramaje și ingrediente detaliate este disponibil în restaurant. Comenzi speciale și diete particulare sunt bine-venite.
          </p>
        </div>
      </div>
    </section>
  );
}

// Component: Gallery Section
function GallerySection() {
  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=500&fit=crop', caption: 'Pizza Artizanală' },
    { url: 'https://images.unsplash.com/photo-1571407-4713efb1f6b8?w=500&h=500&fit=crop', caption: 'Cuptorul Nostru' },
    { url: 'https://images.unsplash.com/photo-1571407-4713efb1f6b8?w=500https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=500&fit=cropfit=crop', caption: 'Ingrediente Premium' },
    { url: 'https://images.unsplash.com/photo-1577003833154-a92bbd4f2f5a?w=500https://images.unsplash.com/photo-1555939594-58d7cb561404?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1555939594-58d7cb561404?w=500&h=500&fit=cropfit=crop', caption: 'Echipa Noastră' },
    { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500https://images.unsplash.com/photo-1595521624512-6d4ee2871583?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1595521624512-6d4ee2871583?w=500&h=500&fit=cropfit=crop', caption: 'Spațiul Nostru' },
    { url: 'https://images.unsplash.com/photo-1571407-4713efb1f6b8?w=500&h=500&fit=crop', caption: 'Preparare Tradițională' },
  ];

  return (
    <section id="galerie" className="bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-amber-100 mb-12"
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}
        >
          GALERIE FOTO
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className="relative h-64 overflow-hidden group cursor-pointer"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p
                  className="text-amber-100 font-bold"
                  style={{ fontFamily: 'Playfair Display, serif' }}
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

// Component: Reservation Form
function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
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

    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time) {
      setError('Vă rugăm completați toate câmpurile obligatorii.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Vă rugăm introduceți o adresă de email validă.');
      return;
    }

    // Phone validation (basic)
    if (formData.phone.length < 10) {
      setError('Vă rugăm introduceți un număr de telefon valid.');
      return;
    }

    try {
      // Using Formspree for form submission
      const response = await fetch('https://formspree.io/f/xyzabc123', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: formData.date,
          time: formData.time,
          guests: formData.guests,
          requests: formData.requests,
          subject: 'Nouă Rezervare - Urban Slice',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', date: '', time: '', guests: '2', requests: '' });
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
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}
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
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Nume"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="tel"
              name="phone"
              placeholder="Telefon"
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'persoană' : 'persoane'}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="requests"
            placeholder="Cerințe speciale (opțional)"
            value={formData.requests}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-900 border border-amber-900/30 text-amber-50 px-4 py-3 focus:outline-none focus:border-amber-500"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          />

          <button
            type="submit"
            className="w-full bg-amber-500 text-black font-bold py-3 hover:bg-amber-400 transition-colors duration-200"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '1px' }}
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
  const [cart, setCart] = useState<Array<{ name: string; size: string; price: number; quantity: number }>>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  const allItems = [
    ...MENU_DATA.pizzaClassica.map((p) => ({ ...p, category: 'Pizza Clasică' })),
    ...MENU_DATA.pizzaCasa.map((p) => ({ ...p, category: 'Pizza Della Casa' })),
    ...MENU_DATA.streetFood.map((p) => ({ ...p, category: 'Street Food' })),
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

    if (!customerData.name || !customerData.phone || !customerData.email || !customerData.address) {
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
          email: customerData.email,
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
        setCustomerData({ name: '', phone: '', email: '', address: '', notes: '' });
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
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-amber-100 mb-12"
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}
        >
          COMANDĂ ONLINE
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="md:col-span-2 space-y-6">
            {allItems.slice(0, 12).map((item, idx) => (
              <div key={idx} className="bg-gray-900/50 border border-amber-900/30 p-4">
                <h3 className="text-amber-100 font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(item.sizes).map(([size, data]) => (
                    <button
                      key={size}
                      onClick={() => addToCart(item, size)}
                      className="px-3 py-2 bg-amber-500 text-black text-sm font-bold hover:bg-amber-400 transition-colors"
                      style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                    >
                      {size} - {data.price} RON
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Sidebar */}
          <div className="bg-gray-900/50 border border-amber-900/30 p-6 h-fit sticky top-24">
            <h3
              className="text-amber-100 font-bold mb-4 flex items-center justify-between"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              COȘUL MEU
              <span className="bg-amber-500 text-black px-2 py-1 text-sm rounded">{cart.length}</span>
            </h3>

            {cart.length === 0 ? (
              <p className="text-amber-50/50 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
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
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
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
                  placeholder="Nume"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
                <input
                  type="tel"
                  placeholder="Telefon"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
                <input
                  type="text"
                  placeholder="Adresă livrare"
                  value={customerData.address}
                  onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
                <textarea
                  placeholder="Note (opțional)"
                  value={customerData.notes}
                  onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                  rows={2}
                  className="w-full bg-gray-800 border border-amber-900/30 text-amber-50 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-2 hover:bg-green-700 transition-colors text-sm"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1577003833154-a92bbd4f2f5a?w=1200https://images.unsplash.com/photo-1555939594-58d7cb561404?w=1200&h=600&fit=croph=600https://images.unsplash.com/photo-1555939594-58d7cb561404?w=1200&h=600&fit=cropfit=crop)',
          opacity: 0.3,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2
          className="text-4xl md:text-5xl font-bold text-amber-100 mb-6"
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}
        >
          CATERING & EVENIMENTE
        </h2>

        <p
          className="text-lg text-amber-50/80 mb-8 leading-relaxed"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Urban Slice oferă servicii de catering de înaltă calitate pentru corporate events, nunți, petreceri private și orice ocazie specială. Echipa noastră se ocupă de toate detaliile, de la preparare până la servire, asigurând o experiență memorabilă pentru oaspeții dvs.
        </p>

        <p
          className="text-lg text-amber-50/80 mb-8 leading-relaxed"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Oferim meniuri personalizate, adaptate la bugetul și preferințele dvs., cu ingrediente premium și prezentare impecabilă.
        </p>

        <div className="bg-amber-500 text-black p-8 text-center">
          <p
            className="text-lg font-bold mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '1px' }}
          >
            PENTRU DETALII ȘI OFERTE PERSONALIZATE
          </p>
          <a
            href="tel:+40740011876"
            className="text-2xl font-bold hover:underline"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}
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
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px' }}
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
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                ADRESĂ
              </h3>
              <p
                className="text-amber-50/70"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Urban Slice Pizzeria
                <br />
                București, România
              </p>
            </div>

            <div>
              <h3
                className="text-2xl font-bold text-amber-100 mb-4"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                PROGRAM
              </h3>
              <div className="space-y-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <p className="text-amber-50/70">Luni - Joi: 11:00 - 23:00</p>
                <p className="text-amber-50/70">Vineri - Sâmbătă: 11:00 - 00:00</p>
                <p className="text-amber-50/70">Duminică: 12:00 - 23:00</p>
              </div>
            </div>

            <div>
              <h3
                className="text-2xl font-bold text-amber-100 mb-4"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                CONTACT
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+40740011876"
                  className="flex items-center gap-3 text-amber-100 hover:text-amber-400 transition-colors"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <Phone size={20} />
                  (0740) 011 876
                </a>
                <a
                  href="mailto:mihai.grigoras82@gmail.com"
                  className="flex items-center gap-3 text-amber-100 hover:text-amber-400 transition-colors"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
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
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              URBAN SLICE
            </h3>
            <p className="text-amber-50/60 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Pizza artizanală cu suflet urban
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-amber-100 font-bold mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              MENIU
            </h4>
            <ul className="space-y-2 text-amber-50/60 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <li><a href="#meniu" className="hover:text-amber-400 transition-colors">Meniu Complet</a></li>
              <li><a href="#galerie" className="hover:text-amber-400 transition-colors">Galerie</a></li>
              <li><a href="#catering" className="hover:text-amber-400 transition-colors">Catering</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-amber-100 font-bold mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              URMĂREȘTE-NE
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-amber-100 hover:text-amber-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-amber-100 hover:text-amber-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-amber-100 hover:text-amber-400 transition-colors">
                <Music size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-amber-100 font-bold mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              CONTACT
            </h4>
            <div className="space-y-2 text-amber-50/60 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <p>(0740) 011 876</p>
              <p>mihai.grigoras82@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-amber-900/30 pt-8 text-center text-amber-50/50 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          <p>© 2025 Urban Slice. Toate drepturile rezervate.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#privacy" className="hover:text-amber-400 transition-colors">Politica de Confidențialitate</a>
            <a href="#terms" className="hover:text-amber-400 transition-colors">Termeni și Condiții</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Component: WhatsApp Floating Button
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/40740011876"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-40 hover:scale-110 transform duration-200"
      title="Contactează-ne pe WhatsApp"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.355.203-.368-.088c-1.262-.304-2.454-.966-3.428-1.996C2.432 5.904 1.846 4.757 1.846 3.649c0-2.176 1.773-3.946 3.954-3.946 1.05 0 2.047.398 2.832 1.116l.26.245.273-.073c1.315-.358 2.718-.356 4.006.105l.21.07.26-.248c.784-.718 1.78-1.116 2.83-1.116 2.18 0 3.954 1.77 3.954 3.946 0 1.108-.586 2.255-1.604 3.272-1.973 1.973-4.805 2.727-7.398 2.727m5.231 9.375c-.788 0-1.5.236-2.119.664-.306.206-.59.453-.84.734-.249-.281-.534-.528-.84-.734-.619-.428-1.331-.664-2.119-.664-.788 0-1.5.236-2.119.664-.306.206-.59.453-.84.734-.249-.281-.534-.528-.84-.734-.619-.428-1.331-.664-2.119-.664-1.657 0-3 1.343-3 3s1.343 3 3 3c.788 0 1.5-.236 2.119-.664.306-.206.59-.453.84-.734.249.281.534.528.84.734.619.428 1.331.664 2.119.664.788 0 1.5-.236 2.119-.664.306-.206.59-.453.84-.734.249.281.534.528.84.734.619.428 1.331.664 2.119.664 1.657 0 3-1.343 3-3s-1.343-3-3-3z" />
      </svg>
    </a>
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
        <p className="text-amber-50/70 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Folosim cookies pentru a îmbunătăți experiența dvs. Continuând, acceptați politica noastră de cookies.
        </p>
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors whitespace-nowrap"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
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
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
}
