// Everything editable: salon details, prices, reviews, photo slots and all text in 3 languages.
// Headings may contain <em> for the italic accent words.

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
// The hero can also be a video: public/media/hero.mp4.
export const media = {
  hero: { path: 'hero', hint: 'Your single best nail photo (or hero.mp4)' },
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
    nav: { label: 'Navigimi', services: 'Shërbimet', work: 'Punimet', contact: 'Kontakti', book: 'Rezervo' },
    hero: {
      eyebrow: 'Sallon thonjsh · Podujevë',
      title: 'Thonj që <em>bien në sy</em>.',
      sub: 'Manikyr, pedikyr dhe zgjatime me xhel, të punuara me kujdes dhe me produkte cilësore.',
      cta: 'Rezervo në WhatsApp', cta2: 'Shiko punimet', alt: 'Punë me thonj nga Shkurta Nails',
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
    nav: { label: 'Main', services: 'Services', work: 'Work', contact: 'Contact', book: 'Book' },
    hero: {
      eyebrow: 'Nail salon · Podujevo',
      title: 'Nails that <em>get noticed</em>.',
      sub: 'Manicure, pedicure and gel extensions, done with care and quality products.',
      cta: 'Book on WhatsApp', cta2: 'See our work', alt: 'Nail work by Shkurta Nails',
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
    nav: { label: 'Navigation', services: 'Leistungen', work: 'Arbeiten', contact: 'Kontakt', book: 'Buchen' },
    hero: {
      eyebrow: 'Nagelstudio · Podujevo',
      title: 'Nägel, die <em>auffallen</em>.',
      sub: 'Maniküre, Pediküre und Gel-Verlängerungen, mit Sorgfalt und hochwertigen Produkten.',
      cta: 'Per WhatsApp buchen', cta2: 'Arbeiten ansehen', alt: 'Nageldesign von Shkurta Nails',
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
