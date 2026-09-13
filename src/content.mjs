// Everything editable: salon details, prices, reviews, photo slots and all text in 3 languages.
// Section headings may contain <em> for the accent-coloured words.

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
  credit: { name: 'Xovah Web', url: 'https://xovahweb.com' },
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

// Photo slots. Drop a file at public/media/<name>.webp (or .jpg/.png/.avif) and rebuild.
export const media = {
  heroWide: { path: 'hero-wide', hint: 'Hero photo for computers, wide', size: '2400×1200' },
  heroTall: { path: 'hero-tall', hint: 'Hero photo for phones, tall', size: '1200×1800' },
  clip: { path: 'hero', hint: 'Short salon video', size: '1080×1350' },
  clipStill: { path: 'hero-detail', hint: 'Photo shown next to the video', size: '1000×1250' },
  portfolio: [
    { path: '1', hint: 'Photo 1' },
    { path: '2', hint: 'Photo 2' },
    { path: '3', hint: 'Photo 3' },
    { path: '4', hint: 'Photo 4' },
    { path: '5', hint: 'Photo 5' },
    { path: '6', hint: 'Photo 6' },
  ],
  // Four salon photos behind the draggable dot: top-left, top-right, bottom-left, bottom-right.
  salon: [
    { path: 'salon-1', cell: 'tl', hint: 'Salon 1 · top left' },
    { path: 'salon-2', cell: 'tr', hint: 'Salon 2 · top right' },
    { path: 'salon-3', cell: 'bl', hint: 'Salon 3 · bottom left' },
    { path: 'salon-4', cell: 'br', hint: 'Salon 4 · bottom right' },
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
      label: 'Navigimi', services: 'Shërbimet', work: 'Punimet', about: 'Salloni', faq: 'Pyetje', contact: 'Kontakti',
      book: 'Rezervo', menu: 'Hap menynë', close: 'Mbyll menynë',
    },
    theme: { toDark: 'Kalo në pamje të errët', toLight: 'Kalo në pamje të ndritshme' },
    hero: {
      eyebrow: 'Podujevë · Kosovë',
      lines: ['Bukuri', 'në çdo detaj.'],
      sub: 'Manikyr, pedikyr dhe nail art, në një ambient të qetë e të kujdesshëm.',
      cta: 'Rezervo një termin', cta2: 'Shiko punimet',
      scroll: 'Zbrit',
      alt: 'Klientet e Shkurta Nails',
    },
    booking: { hello: 'Përshëndetje! Dua të rezervoj një termin.' },
    services: { eyebrow: 'Shërbimet', title: 'Çmime të <em>qarta</em>', sub: 'Pa surpriza në fund. Shtesat i kombinon si të duash.', addons: 'Shtesa' },
    clip: {
      eyebrow: 'Në sallon', title: 'Punuar me <em>dashuri</em>',
      sub: 'Një moment nga puna jonë e përditshme, me produkte cilësore dhe kujdes për çdo thua.',
      cta: 'Rezervo terminin', alt: 'Video nga salloni Shkurta Nails', stillAlt: 'Detaj nail art nga Shkurta Nails',
    },
    work: { eyebrow: 'Portofoli', title: 'Punimet <em>tona</em>', ig: 'Më shumë në Instagram', open: 'Hap foton', alt: 'Thonj të punuar në Shkurta Nails' },
    about: {
      eyebrow: 'Salloni', title: 'Një vend për <em>t’u çlodhur</em>',
      story: `Shkurta Nails nisi në qershor ${founded} me një ëndërr të thjeshtë: një vend ku bukuria, kreativiteti dhe kujdesi për veten bashkohen. Sot jemi një sallon i besuar në Podujevë, ku çdo set punohet me produkte cilësore dhe vëmendje për detajet. Shkurta ka tre certifikata profesionale për nail art.`,
      alt: (i) => `Salloni Shkurta Nails, foto ${i}`,
      dragLabel: 'Tërhiq pikën për të parë katër foto të sallonit',
      dragHint: 'Tërhiq pikën',
    },
    reviews: { eyebrow: 'Vlerësimet', title: 'Fjalë nga <em>klientet</em>' },
    faq: {
      eyebrow: 'Pyetje', title: 'Mirë të <em>dihet</em>', sub: 'Diçka tjetër? Na shkruaj në WhatsApp.',
      items: [
        { q: 'Sa zgjat xheli?', a: 'Zakonisht 3–4 javë, varësisht nga rritja e thonjve dhe kujdesi që u bën.' },
        { q: 'A mund të sjell foto të dizajnit që dua?', a: 'Po. Na e dërgo foton në WhatsApp para terminit dhe e përgatisim bashkë.' },
        { q: 'Sa kushton një set i plotë?', a: 'Zgjatimet me xhel janë 20€. Shtesat: chrome +2€, French +3€, ombré +5€, dizajn +1–2€.' },
        { q: 'Si të rezervoj termin?', a: 'Na shkruaj në WhatsApp ose Instagram dhe e caktojmë orarin që të përshtatet.' },
        { q: 'Po nëse vonohem ose s’mund të vij?', a: 'Na njofto sa më herët në WhatsApp që ta zhvendosim terminin.' },
      ],
    },
    contact: {
      eyebrow: 'Kontakti', title: 'Rezervo <em>terminin</em>',
      sub: 'Na shkruaj në WhatsApp ose Instagram për të rezervuar terminin tënd.',
      phone: 'Telefoni', address: 'Adresa', hours: 'Orari', days: 'E hënë – E premte',
      city: 'Podujevë', country: 'Kosovë', maps: 'Hap në Google Maps', direct: 'Ose shkruaj direkt:',
    },
    footer: { credit: 'Powered by', langs: 'Gjuha', top: 'Lart' },
    bar: { book: 'WhatsApp', call: 'Thirr' },
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
      label: 'Main', services: 'Services', work: 'Our Work', about: 'Salon', faq: 'FAQ', contact: 'Contact',
      book: 'Book now', menu: 'Open menu', close: 'Close menu',
    },
    theme: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
    hero: {
      eyebrow: 'Podujevë · Kosovo',
      lines: ['Beauty', 'in every detail.'],
      sub: 'Manicure, pedicure and nail art in a calm, careful little salon.',
      cta: 'Book an appointment', cta2: 'View our work',
      scroll: 'Scroll',
      alt: 'Shkurta Nails clients',
    },
    booking: { hello: 'Hi! I’d like to book an appointment.' },
    services: { eyebrow: 'Services', title: 'Clear <em>prices</em>', sub: 'No surprises at the end. Mix the add-ons however you like.', addons: 'Add-ons' },
    clip: {
      eyebrow: 'In the salon', title: 'Made with <em>love</em>',
      sub: 'A moment from an ordinary day, with quality products and care for every single nail.',
      cta: 'Book your appointment', alt: 'Video from the Shkurta Nails salon', stillAlt: 'Nail art detail by Shkurta Nails',
    },
    work: { eyebrow: 'Portfolio', title: 'Our <em>work</em>', ig: 'More on Instagram', open: 'Open photo', alt: 'Nails done at Shkurta Nails' },
    about: {
      eyebrow: 'The salon', title: 'A place to <em>unwind</em>',
      story: `Shkurta Nails opened in June ${founded} with a simple dream: a place where beauty, creativity and self-care come together. Today it’s a trusted salon in Podujevo, where every set is done with quality products and close attention to detail. Shkurta holds three professional nail art certificates.`,
      alt: (i) => `Inside Shkurta Nails, photo ${i}`,
      dragLabel: 'Drag the dot to see four salon photos',
      dragHint: 'Drag the dot',
    },
    reviews: { eyebrow: 'Reviews', title: 'Kind <em>words</em>' },
    faq: {
      eyebrow: 'FAQ', title: 'Good to <em>know</em>', sub: 'Something else? Message us on WhatsApp.',
      items: [
        { q: 'How long does gel last?', a: 'Usually 3–4 weeks, depending on how fast your nails grow and how you care for them.' },
        { q: 'Can I bring a photo of the design I want?', a: 'Yes. Send it on WhatsApp before your appointment and we’ll plan it together.' },
        { q: 'How much is a full set?', a: 'Gel extensions are 20€. Add-ons: chrome +2€, French +3€, ombré +5€, nail design +1–2€.' },
        { q: 'How do I book?', a: 'Message us on WhatsApp or Instagram and we’ll agree on a time that suits you.' },
        { q: 'What if I’m late or can’t make it?', a: 'Let us know on WhatsApp as early as you can so we can move your appointment.' },
      ],
    },
    contact: {
      eyebrow: 'Contact', title: 'Book your <em>appointment</em>',
      sub: 'Message us on WhatsApp or Instagram to book your appointment.',
      phone: 'Phone', address: 'Address', hours: 'Hours', days: 'Monday – Friday',
      city: 'Podujevo', country: 'Kosovo', maps: 'Open in Google Maps', direct: 'Or message directly:',
    },
    footer: { credit: 'Powered by', langs: 'Language', top: 'Top' },
    bar: { book: 'WhatsApp', call: 'Call' },
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
      label: 'Navigation', services: 'Leistungen', work: 'Arbeiten', about: 'Salon', faq: 'FAQ', contact: 'Kontakt',
      book: 'Jetzt buchen', menu: 'Menü öffnen', close: 'Menü schließen',
    },
    theme: { toDark: 'Zu dunkler Ansicht wechseln', toLight: 'Zu heller Ansicht wechseln' },
    hero: {
      eyebrow: 'Podujevë · Kosovo',
      lines: ['Schönheit', 'im Detail.'],
      sub: 'Maniküre, Pediküre und Nail Art in einem ruhigen, liebevoll geführten Studio.',
      cta: 'Termin buchen', cta2: 'Unsere Arbeiten',
      scroll: 'Mehr',
      alt: 'Kundinnen von Shkurta Nails',
    },
    booking: { hello: 'Hallo! Ich möchte gerne einen Termin buchen.' },
    services: { eyebrow: 'Leistungen', title: 'Klare <em>Preise</em>', sub: 'Keine Überraschungen. Extras frei kombinierbar.', addons: 'Extras' },
    clip: {
      eyebrow: 'Im Salon', title: 'Mit <em>Liebe</em> gemacht',
      sub: 'Ein Moment aus einem ganz normalen Tag, mit hochwertigen Produkten und Sorgfalt für jeden Nagel.',
      cta: 'Termin buchen', alt: 'Video aus dem Studio Shkurta Nails', stillAlt: 'Nail-Art-Detail von Shkurta Nails',
    },
    work: { eyebrow: 'Portfolio', title: 'Unsere <em>Arbeiten</em>', ig: 'Mehr auf Instagram', open: 'Foto öffnen', alt: 'Nägel aus dem Studio Shkurta Nails' },
    about: {
      eyebrow: 'Der Salon', title: 'Ein Ort zum <em>Abschalten</em>',
      story: `Shkurta Nails wurde im Juni ${founded} mit einem einfachen Traum eröffnet: ein Ort, an dem Schönheit, Kreativität und Selbstfürsorge zusammenkommen. Heute vertrauen uns viele Kundinnen in Podujevo, und jedes Set entsteht mit hochwertigen Produkten und viel Liebe zum Detail. Shkurta hat drei Fachzertifikate für Nail Art.`,
      alt: (i) => `Im Studio Shkurta Nails, Foto ${i}`,
      dragLabel: 'Zieh den Punkt, um vier Salonfotos zu sehen',
      dragHint: 'Punkt ziehen',
    },
    reviews: { eyebrow: 'Bewertungen', title: 'Was Kundinnen <em>sagen</em>' },
    faq: {
      eyebrow: 'FAQ', title: 'Gut zu <em>wissen</em>', sub: 'Noch etwas? Schreib uns per WhatsApp.',
      items: [
        { q: 'Wie lange hält Gel?', a: 'Meist 3–4 Wochen, je nachdem, wie schnell deine Nägel wachsen und wie du sie pflegst.' },
        { q: 'Kann ich ein Foto meines Wunschdesigns mitbringen?', a: 'Ja. Schick es uns vor dem Termin per WhatsApp und wir planen es gemeinsam.' },
        { q: 'Was kostet ein komplettes Set?', a: 'Gel-Verlängerung kostet 20€. Extras: Chrome +2€, French +3€, Ombré +5€, Nageldesign +1–2€.' },
        { q: 'Wie buche ich einen Termin?', a: 'Schreib uns per WhatsApp oder Instagram, und wir finden einen passenden Termin.' },
        { q: 'Was, wenn ich mich verspäte oder absagen muss?', a: 'Sag uns so früh wie möglich per WhatsApp Bescheid, dann verschieben wir den Termin.' },
      ],
    },
    contact: {
      eyebrow: 'Kontakt', title: 'Termin <em>buchen</em>',
      sub: 'Schreib uns per WhatsApp oder Instagram, um deinen Termin zu buchen.',
      phone: 'Telefon', address: 'Adresse', hours: 'Öffnungszeiten', days: 'Montag – Freitag',
      city: 'Podujevo', country: 'Kosovo', maps: 'In Google Maps öffnen', direct: 'Oder direkt schreiben:',
    },
    footer: { credit: 'Powered by', langs: 'Sprache', top: 'Nach oben' },
    bar: { book: 'WhatsApp', call: 'Anrufen' },
    close: 'Schließen',
  },
};
