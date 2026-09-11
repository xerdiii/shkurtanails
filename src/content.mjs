// Everything editable: salon details, prices, reviews, photo slots and all text in 3 languages.
// Section headings may contain <em> for the italic accent words.

const founded = 2018; // ⚠ Confirm: the old site said both 2016 and 2018.

export const site = {
  name: 'Shkurta Nails',
  url: 'https://shkurtanails.salon',
  founded,
  phone: '+38345505490',
  phoneDisplay: '045 505 490',
  whatsapp: '38345505490',
  whatsappDisplay: '+383 45 505 490',
  instagram: 'shkurtanails',
  mapsUrl: 'https://maps.app.goo.gl/z5PeNquBfMrXZ667A',
  address: { street: 'Zahir Pajaziti', city: 'Podujevë', country: 'XK' },
  // Days use JavaScript numbering: 0 = Sunday … 6 = Saturday. ⚠ Confirm whether you open on Saturday.
  hours: { days: [1, 2, 3, 4, 5], open: '09:00', close: '18:00' },
  languages: ['sq', 'en', 'de'],
  defaultLang: 'sq',
};

// Main services, in the order of the original price list.
export const services = [
  { id: 'gel-overlay', price: 13, name: { sq: 'Mbulesë natyrale me xhel', en: 'Natural gel overlay', de: 'Natürliche Gel-Verstärkung' } },
  { id: 'repair', price: 15, name: { sq: 'Riparim', en: 'Repair', de: 'Reparatur' } },
  {
    id: 'toenails', price: 15,
    name: { sq: 'Thonjtë e këmbëve', en: 'Toenails', de: 'Fußnägel' },
    note: { sq: 'Zgjatim + ngjyrë ose French', en: 'Extensions + colour or French', de: 'Verlängerung + Farbe oder French' },
  },
  { id: 'gel-extensions', price: 20, name: { sq: 'Zgjatime me xhel', en: 'Gel extensions', de: 'Gel-Verlängerung' } },
  { id: 'tips-extensions', price: 20, name: { sq: 'Zgjatime me tips', en: 'Extensions with tips', de: 'Verlängerung mit Tips' } },
];

export const addons = [
  { id: 'chrome', min: 2, max: 2, name: { sq: 'Chrome', en: 'Chrome', de: 'Chrome' } },
  { id: 'french', min: 3, max: 3, name: { sq: 'French', en: 'French', de: 'French' } },
  { id: 'ombre', min: 5, max: 5, name: { sq: 'Ombré', en: 'Ombré', de: 'Ombré' } },
  { id: 'design', min: 1, max: 2, name: { sq: 'Dizajn', en: 'Nail design', de: 'Nageldesign' } },
];

// Direct WhatsApp numbers, shown as one line in Contact.
export const artists = [
  { first: 'Shkurta', whatsapp: '38345505490' },
  { first: 'Yllka', whatsapp: '38345619586' },
  { first: 'Erza', whatsapp: '38345783623' },
];

// ⚠ Taken from the old site. Replace with real Google reviews if these aren't real.
export const reviews = [
  {
    name: 'Arta L.',
    text: {
      sq: 'Salloni më i mirë i thonjve në Podujevë! Efekti chrome ishte mahnitës. Marr komplimente çdo herë.',
      en: 'Best nail salon in Podujevo! The chrome effect was absolutely stunning. I get compliments every time.',
      de: 'Das beste Nagelstudio in Podujevo! Der Chrome-Effekt war atemberaubend. Ich bekomme jedes Mal Komplimente.',
    },
  },
  {
    name: 'Mrika K.',
    text: {
      sq: 'Shkurta më bëri dizajnin French më të bukur për dasmën time. S’kisha çfarë të kërkoja më shumë.',
      en: 'Shkurta did the most beautiful French design for my wedding. I couldn’t have asked for better.',
      de: 'Shkurta hat mir das schönste French-Design für meine Hochzeit gemacht. Besser geht es nicht.',
    },
  },
  {
    name: 'Donika V.',
    text: {
      sq: 'Thonjtë ombré zgjatën mbi 3 javë pa u ngritur fare. Cilësi e mrekullueshme dhe atmosferë qetësuese.',
      en: 'The ombré nails lasted over 3 weeks without any lifting. Amazing quality and such a relaxing atmosphere.',
      de: 'Die Ombré-Nägel hielten über 3 Wochen, ohne sich zu lösen. Tolle Qualität und eine entspannte Atmosphäre.',
    },
  },
];

// Photo slots. Drop a file at public/media/<path>.jpg (or .webp/.png/.avif) and rebuild.
export const media = {
  hero: { path: 'hero', hint: 'Main photo: close-up manicure, portrait', size: '1600×2000' },
  heroDetail: { path: 'hero-detail', hint: 'A second, different nail detail', size: '800×1000' },
  about: { path: 'about', hint: 'The salon interior, no people' },
  portfolio: [
    { path: 'portfolio/1', ratio: '4/5', hint: 'Signature set, close-up' },
    { path: 'portfolio/2', ratio: '3/4', hint: 'French' },
    { path: 'portfolio/3', ratio: '1/1', hint: 'Chrome' },
    { path: 'portfolio/4', ratio: '3/4', hint: 'Nail art detail' },
    { path: 'portfolio/5', ratio: '4/5', hint: 'Ombré' },
    { path: 'portfolio/6', ratio: '1/1', hint: 'Natural gel overlay' },
    { path: 'portfolio/7', ratio: '3/4', hint: 'Long extensions' },
    { path: 'portfolio/8', ratio: '4/5', hint: 'Toenails or seasonal set' },
  ],
};

export const strings = {
  sq: {
    htmlLang: 'sq', ogLocale: 'sq_AL', quote: ['„', '“'],
    meta: {
      title: 'Shkurta Nails · Sallon thonjsh në Podujevë',
      description: 'Manikyr, pedikyr, zgjatime me xhel, chrome, French dhe ombré në Podujevë. Rezervo në WhatsApp: +383 45 505 490.',
    },
    skip: 'Kalo te përmbajtja',
    nav: {
      label: 'Navigimi', services: 'Shërbimet', work: 'Punimet', about: 'Rreth nesh', contact: 'Kontakti',
      book: 'Rezervo', menu: 'Hap menynë', close: 'Mbyll menynë',
    },
    hero: {
      eyebrow: 'Shkurta Nails',
      lines: ['Punuar', 'me stil.'],
      titleScale: 1.2,
      sub: 'Manikyr premium, xhel dhe nail art në Podujevë.',
      cta: 'Rezervo një termin', cta2: 'Shiko punimet',
      location: 'Podujevë · Kosovë', aside: 'Nail art · Manikyr · Xhel',
      alt: 'Manikyr nga afër nga Shkurta Nails', detailAlt: 'Detaj nail art nga Shkurta Nails',
    },
    booking: { hello: 'Përshëndetje! Dua të rezervoj një termin.' },
    services: { eyebrow: 'Shërbimet', title: 'Shërbimet & <em>çmimet</em>', sub: 'Çmime të qarta, pa surpriza.', addons: 'Shtesa' },
    work: { eyebrow: 'Portofoli', title: 'Punimet <em>tona</em>', ig: 'Më shumë në Instagram', open: 'Hap foton', alt: 'Thonj të punuar në Shkurta Nails' },
    about: {
      eyebrow: 'Rreth nesh', title: 'Kujdes për çdo <em>detaj</em>',
      story: `Shkurta Nails nisi në qershor ${founded} me një ëndërr të thjeshtë: një vend ku bukuria, kreativiteti dhe kujdesi për veten bashkohen. Sot jemi një sallon i besuar në Podujevë, ku çdo set punohet me produkte cilësore dhe vëmendje për detajet. Shkurta ka tre certifikata profesionale për nail art.`,
      alt: 'Salloni Shkurta Nails',
    },
    reviews: { eyebrow: 'Vlerësimet', title: 'Fjalë nga <em>klientet</em>' },
    contact: {
      eyebrow: 'Kontakti', title: 'Rezervo <em>terminin</em>',
      sub: 'Na shkruaj në WhatsApp ose Instagram për të rezervuar terminin tënd.',
      phone: 'Telefoni', address: 'Adresa', hours: 'Orari', days: 'E hënë – E premte',
      city: 'Podujevë', country: 'Kosovë', maps: 'Hap në Google Maps', direct: 'Ose shkruaj direkt:',
    },
    footer: { madeBy: 'Faqja nga Erdi', langs: 'Gjuha' },
    close: 'Mbyll',
  },

  en: {
    htmlLang: 'en', ogLocale: 'en_GB', quote: ['“', '”'],
    meta: {
      title: 'Shkurta Nails · Nail salon in Podujevo',
      description: 'Manicure, pedicure, gel extensions, chrome, French and ombré nails in Podujevo, Kosovo. Book on WhatsApp: +383 45 505 490.',
    },
    skip: 'Skip to content',
    nav: {
      label: 'Main', services: 'Services', work: 'Our Work', about: 'About', contact: 'Contact',
      book: 'Book now', menu: 'Open menu', close: 'Close menu',
    },
    hero: {
      eyebrow: 'Shkurta Nails',
      lines: ['Beautifully', 'Done.'],
      titleScale: 1,
      sub: 'Premium manicure, gel & nail art in Podujevë.',
      cta: 'Book an appointment', cta2: 'View our work',
      location: 'Podujevë · Kosovo', aside: 'Nail art · Manicure · Gel',
      alt: 'Close-up of a manicure by Shkurta Nails', detailAlt: 'Nail art detail by Shkurta Nails',
    },
    booking: { hello: 'Hi! I’d like to book an appointment.' },
    services: { eyebrow: 'Services', title: 'Services & <em>prices</em>', sub: 'Clear prices, no surprises.', addons: 'Add-ons' },
    work: { eyebrow: 'Portfolio', title: 'Our <em>work</em>', ig: 'More on Instagram', open: 'Open photo', alt: 'Nails done at Shkurta Nails' },
    about: {
      eyebrow: 'About', title: 'Care in every <em>detail</em>',
      story: `Shkurta Nails opened in June ${founded} with a simple dream: a place where beauty, creativity and self-care come together. Today it’s a trusted salon in Podujevo, where every set is done with quality products and close attention to detail. Shkurta holds three professional nail art certificates.`,
      alt: 'Inside Shkurta Nails',
    },
    reviews: { eyebrow: 'Reviews', title: 'Kind <em>words</em>' },
    contact: {
      eyebrow: 'Contact', title: 'Book your <em>appointment</em>',
      sub: 'Message us on WhatsApp or Instagram to book your appointment.',
      phone: 'Phone', address: 'Address', hours: 'Hours', days: 'Monday – Friday',
      city: 'Podujevo', country: 'Kosovo', maps: 'Open in Google Maps', direct: 'Or message directly:',
    },
    footer: { madeBy: 'Website by Erdi', langs: 'Language' },
    close: 'Close',
  },

  de: {
    htmlLang: 'de', ogLocale: 'de_DE', quote: ['„', '“'],
    meta: {
      title: 'Shkurta Nails · Nagelstudio in Podujevo',
      description: 'Maniküre, Pediküre, Gel-Verlängerung, Chrome, French und Ombré in Podujevo, Kosovo. Termin per WhatsApp: +383 45 505 490.',
    },
    skip: 'Zum Inhalt springen',
    nav: {
      label: 'Navigation', services: 'Leistungen', work: 'Arbeiten', about: 'Über uns', contact: 'Kontakt',
      book: 'Jetzt buchen', menu: 'Menü öffnen', close: 'Menü schließen',
    },
    hero: {
      eyebrow: 'Shkurta Nails',
      lines: ['Wunderschön', 'gemacht.'],
      titleScale: 0.9,
      sub: 'Premium-Maniküre, Gel & Nail Art in Podujevë.',
      cta: 'Termin buchen', cta2: 'Unsere Arbeiten',
      location: 'Podujevë · Kosovo', aside: 'Nail Art · Maniküre · Gel',
      alt: 'Maniküre in Nahaufnahme von Shkurta Nails', detailAlt: 'Nail-Art-Detail von Shkurta Nails',
    },
    booking: { hello: 'Hallo! Ich möchte gerne einen Termin buchen.' },
    services: { eyebrow: 'Leistungen', title: 'Leistungen & <em>Preise</em>', sub: 'Klare Preise, keine Überraschungen.', addons: 'Extras' },
    work: { eyebrow: 'Portfolio', title: 'Unsere <em>Arbeiten</em>', ig: 'Mehr auf Instagram', open: 'Foto öffnen', alt: 'Nägel aus dem Studio Shkurta Nails' },
    about: {
      eyebrow: 'Über uns', title: 'Liebe zum <em>Detail</em>',
      story: `Shkurta Nails wurde im Juni ${founded} mit einem einfachen Traum eröffnet: ein Ort, an dem Schönheit, Kreativität und Selbstfürsorge zusammenkommen. Heute vertrauen uns viele Kundinnen in Podujevo, und jedes Set entsteht mit hochwertigen Produkten und viel Liebe zum Detail. Shkurta hat drei Fachzertifikate für Nail Art.`,
      alt: 'Im Studio Shkurta Nails',
    },
    reviews: { eyebrow: 'Bewertungen', title: 'Was Kundinnen <em>sagen</em>' },
    contact: {
      eyebrow: 'Kontakt', title: 'Termin <em>buchen</em>',
      sub: 'Schreib uns per WhatsApp oder Instagram, um deinen Termin zu buchen.',
      phone: 'Telefon', address: 'Adresse', hours: 'Öffnungszeiten', days: 'Montag – Freitag',
      city: 'Podujevo', country: 'Kosovo', maps: 'In Google Maps öffnen', direct: 'Oder direkt schreiben:',
    },
    footer: { madeBy: 'Website von Erdi', langs: 'Sprache' },
    close: 'Schließen',
  },
};
