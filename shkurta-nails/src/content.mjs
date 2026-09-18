// Everything you'd want to edit lives here: salon details, prices, team, reviews and all text in 3 languages.
// Text may contain <em> for the rose italic words in headings.

const founded = 2018; // ⚠ Confirm: the old site said both 2016 and 2018.

export const site = {
  name: 'Shkurta Nails',
  url: 'https://shkurtanails.salon',
  founded,
  phone: '+38345505490',
  phoneDisplay: '045 505 490',
  whatsapp: '38345505490',
  instagram: 'shkurtanails',
  mapsUrl: 'https://maps.app.goo.gl/z5PeNquBfMrXZ667A',
  address: { street: 'Zahir Pajaziti', city: 'Podujevë', country: 'XK' },
  // Days use JavaScript numbering: 0 = Sunday … 6 = Saturday. ⚠ Confirm whether you open on Saturday.
  hours: { days: [1, 2, 3, 4, 5], open: '09:00', close: '18:00' },
  stats: { clients: '750+', certificates: 3 },
  languages: ['sq', 'en', 'de'],
  defaultLang: 'sq',
};

// duration: fill in like '60 min' and it appears next to the service.
export const services = [
  {
    id: 'gel-overlay', price: 13, duration: '',
    hint: 'Close-up: natural gel overlay',
    name: { sq: 'Mbulesë natyrale me xhel', en: 'Natural gel overlay', de: 'Natürliche Gel-Verstärkung' },
    desc: {
      sq: 'Forcon thonjtë natyralë me një shtresë të hollë xheli, për një look të pastër dhe natyral.',
      en: 'Strengthens your natural nails with a thin layer of gel for a clean, natural look.',
      de: 'Stärkt deine Naturnägel mit einer dünnen Gelschicht für einen natürlichen, gepflegten Look.',
    },
  },
  {
    id: 'gel-extensions', price: 20, duration: '',
    hint: 'Close-up: gel extensions',
    name: { sq: 'Zgjatime me xhel', en: 'Gel extensions', de: 'Gel-Verlängerung' },
    desc: {
      sq: 'Gjatësi dhe formë sipas dëshirës, e ndërtuar me xhel.',
      en: 'The length and shape you want, built with gel.',
      de: 'Länge und Form nach Wunsch, mit Gel modelliert.',
    },
  },
  {
    id: 'tips-extensions', price: 20, duration: '',
    hint: 'Close-up: extensions with tips',
    name: { sq: 'Zgjatime me tips', en: 'Extensions with tips', de: 'Verlängerung mit Tips' },
    desc: {
      sq: 'Zgjatim i shpejtë me tips, i përfunduar me xhel.',
      en: 'Quick extensions with tips, finished in gel.',
      de: 'Schnelle Verlängerung mit Tips, mit Gel veredelt.',
    },
  },
  {
    id: 'toenails', price: 15, duration: '',
    hint: 'Toenails, finished set',
    name: { sq: 'Thonjtë e këmbëve', en: 'Toenails', de: 'Fußnägel' },
    desc: {
      sq: 'Zgjatim me ngjyrë ose French.',
      en: 'Extensions with colour or French.',
      de: 'Verlängerung mit Farbe oder French.',
    },
  },
  {
    id: 'repair', price: 15, duration: '',
    hint: 'Repair: close-up of a fixed nail',
    name: { sq: 'Riparim', en: 'Repair', de: 'Reparatur' },
    desc: {
      sq: 'Rregullim i thonjve tuaj me xhel.',
      en: 'Repair and touch-up of your gel nails.',
      de: 'Reparatur und Auffrischung deiner Gelnägel.',
    },
  },
];

export const addons = [
  { id: 'chrome', min: 2, max: 2, name: { sq: 'Efekt chrome', en: 'Chrome effect', de: 'Chrome-Effekt' } },
  { id: 'french', min: 3, max: 3, name: { sq: 'Dizajn French', en: 'French design', de: 'French-Design' } },
  { id: 'ombre', min: 5, max: 5, name: { sq: 'Ombré', en: 'Ombré', de: 'Ombré' } },
  { id: 'design', min: 1, max: 2, name: { sq: 'Dizajn i thonjve', en: 'Nail design', de: 'Nageldesign' } },
];

export const team = [
  {
    id: 'shkurta', name: 'Shkurta Thaçi', first: 'Shkurta', acc: 'Shkurtën',
    whatsapp: '38345505490', instagram: 'shkurtathaci', years: '8+',
    role: { sq: 'Themeluese & artiste kryesore', en: 'Founder & lead artist', de: 'Gründerin & Lead Artist' },
    bio: {
      sq: 'Specialiste e zgjatimeve me xhel dhe e nail art-it të detajuar. Ka 3 certifikata profesionale dhe ka trajnuar studente.',
      en: 'Specialises in gel extensions and detailed nail art. Holds 3 professional certificates and has trained students.',
      de: 'Spezialisiert auf Gel-Verlängerungen und detailreiches Nail Art. Hat 3 Fachzertifikate und bereits Schülerinnen ausgebildet.',
    },
    tags: { sq: ['Zgjatime me xhel', 'Nail art', 'French'], en: ['Gel extensions', 'Nail art', 'French'], de: ['Gel-Verlängerung', 'Nail Art', 'French'] },
  },
  {
    id: 'yllka', name: 'Yllka Thaçi', first: 'Yllka', acc: 'Yllkën',
    whatsapp: '38345619586', instagram: 'yllkathacii', years: '7+', // ⚠ Old site said both 7+ and 8+.
    role: { sq: 'Manikyr & pedikyr', en: 'Manicure & pedicure', de: 'Maniküre & Pediküre' },
    bio: {
      sq: 'Perfeksioniste e mbulesave natyrale me xhel dhe e punës precize me kutikulat, për një look elegant që zgjat.',
      en: 'A perfectionist known for flawless natural gel overlays and precise cuticle work: elegant looks that last.',
      de: 'Perfektionistin für makellose Gel-Verstärkungen und präzise Nagelhautpflege: elegante Looks, die halten.',
    },
    tags: { sq: ['Xhel natyral', 'Manikyr', 'Pedikyr'], en: ['Gel overlay', 'Manicure', 'Pedicure'], de: ['Gel-Verstärkung', 'Maniküre', 'Pediküre'] },
  },
  {
    id: 'erza', name: 'Erza Thaçi', first: 'Erza', acc: 'Erzën',
    whatsapp: '38345783623', instagram: 'erzaathaci', years: '5+',
    role: { sq: 'Nail art & dizajn', en: 'Nail art & design', de: 'Nail Art & Design' },
    bio: {
      sq: 'Forca kreative e ekipit: efekte chrome, ngjyra të guximshme dhe gjithmonë trendet më të reja.',
      en: 'The creative force of the team: chrome effects, bold colours and always the newest trends.',
      de: 'Die kreative Kraft im Team: Chrome-Effekte, mutige Farben und immer die neuesten Trends.',
    },
    tags: { sq: ['Chrome', 'Dizajne', 'Trende'], en: ['Chrome', 'Designs', 'Trends'], de: ['Chrome', 'Designs', 'Trends'] },
  },
];

// ⚠ These are the testimonials from the old site. Replace them with real Google reviews if they aren't real.
export const reviews = [
  {
    name: 'Arta L.', since: 2019,
    text: {
      sq: 'Salloni më i mirë i thonjve në Podujevë! Efekti chrome ishte mahnitës. Marr komplimente çdo herë.',
      en: 'Best nail salon in Podujevo! The chrome effect they did was absolutely stunning. I get compliments every time.',
      de: 'Das beste Nagelstudio in Podujevo! Der Chrome-Effekt war einfach atemberaubend. Ich bekomme jedes Mal Komplimente.',
    },
  },
  {
    name: 'Mrika K.', since: 2020,
    text: {
      sq: 'Shkurta është artiste. Më bëri dizajnin French më të bukur për dasmën time. S’kisha çfarë të kërkoja më shumë.',
      en: 'Shkurta is an artist. She did the most beautiful French design for my wedding. I couldn’t have asked for better.',
      de: 'Shkurta ist eine Künstlerin. Sie hat mir das schönste French-Design für meine Hochzeit gemacht. Besser geht es nicht.',
    },
  },
  {
    name: 'Donika V.', since: 2021,
    text: {
      sq: 'Thonjtë ombré zgjatën mbi 3 javë pa u ngritur fare. Cilësi e mrekullueshme dhe atmosferë shumë qetësuese.',
      en: 'The ombré nails lasted over 3 weeks without any lifting. Amazing quality and such a relaxing atmosphere.',
      de: 'Die Ombré-Nägel hielten über 3 Wochen, ohne sich zu lösen. Tolle Qualität und eine so entspannte Atmosphäre.',
    },
  },
  {
    name: 'Sara H.', since: 2022,
    text: {
      sq: 'Vëmendja e Yllkës ndaj detajeve është e pabesueshme. Xheli im duket kaq natyral dhe perfekt. E rekomandoj!',
      en: 'Yllka’s attention to detail is incredible. My gel overlay looks so natural and perfect. Highly recommend!',
      de: 'Yllkas Liebe zum Detail ist unglaublich. Meine Gel-Verstärkung sieht so natürlich und perfekt aus. Absolute Empfehlung!',
    },
  },
  {
    name: 'Luljeta B.', since: 2023,
    text: {
      sq: 'Erza krijoi nail art-in më unik që kam parë ndonjëherë. I di gjithmonë trendet e fundit. E dua këtë vend!',
      en: 'Erza created the most unique nail art I’ve ever seen. She always knows the latest trends. Love this place!',
      de: 'Erza hat das einzigartigste Nail Art gemacht, das ich je gesehen habe. Sie kennt immer die neuesten Trends. Ich liebe diesen Ort!',
    },
  },
  {
    name: 'Elira A.', since: 2020,
    text: {
      sq: 'E pastër, profesionale dhe rezultatet janë gjithmonë perfekte. Shkurta Nails është salloni im i preferuar.',
      en: 'Clean, professional, and the results are always perfect. Shkurta Nails is my go-to salon. Never disappointed.',
      de: 'Sauber, professionell und die Ergebnisse sind immer perfekt. Shkurta Nails ist mein Stammstudio. Nie enttäuscht.',
    },
  },
];

// Portfolio slots. Add or remove rows freely; ratio controls the shape in the photo wall.
export const portfolioHints = {
  gel: 'Natural gel overlay set', french: 'French set', chrome: 'Chrome set',
  ombre: 'Ombré set', design: 'Nail art close-up', toenails: 'Toenails set',
};
export const portfolio = [
  { cat: 'chrome', path: 'portfolio/chrome-1', ratio: '4/5' },
  { cat: 'french', path: 'portfolio/french-1', ratio: '1/1' },
  { cat: 'design', path: 'portfolio/design-1', ratio: '3/4' },
  { cat: 'gel', path: 'portfolio/gel-1', ratio: '4/5' },
  { cat: 'ombre', path: 'portfolio/ombre-1', ratio: '1/1' },
  { cat: 'french', path: 'portfolio/french-2', ratio: '4/5' },
  { cat: 'chrome', path: 'portfolio/chrome-2', ratio: '3/4' },
  { cat: 'design', path: 'portfolio/design-2', ratio: '4/5' },
  { cat: 'toenails', path: 'portfolio/toenails-1', ratio: '1/1' },
  { cat: 'gel', path: 'portfolio/gel-2', ratio: '3/4' },
  { cat: 'design', path: 'portfolio/design-3', ratio: '1/1' },
  { cat: 'chrome', path: 'portfolio/chrome-3', ratio: '4/5' },
  { cat: 'french', path: 'portfolio/french-3', ratio: '3/4' },
  { cat: 'ombre', path: 'portfolio/ombre-2', ratio: '4/5' },
  { cat: 'design', path: 'portfolio/design-4', ratio: '1/1' },
  { cat: 'toenails', path: 'portfolio/toenails-2', ratio: '4/5' },
];

export const salon = {
  video: { path: 'salon/salon', hint: 'Salon clip: slow, calm pan through the space', size: '1920×1080 · 8–15 s · no sound' },
  photos: [
    { path: 'salon/wide', hint: 'Wide shot from the door' },
    { path: 'team/group', hint: 'Shkurta, Yllka & Erza together' },
    { path: 'salon/station', hint: 'A nail station, ready for a client' },
    { path: 'salon/polish-wall', hint: 'Polish wall / colour choices' },
    { path: 'salon/reception', hint: 'Reception' },
    { path: 'salon/details', hint: 'Details: tools, flowers, candles' },
  ],
  entrance: { path: 'salon/entrance', hint: 'Entrance & sign, seen from the street' },
};

export const strings = {
  sq: {
    htmlLang: 'sq', locale: 'sq', ogLocale: 'sq_AL', quote: ['„', '“'],
    meta: {
      title: 'Shkurta Nails · Sallon thonjsh në Podujevë',
      description: 'Manikyr, pedikyr, zgjatime me xhel, chrome, French dhe ombré në Podujevë. Rezervo me Shkurtën, Yllkën ose Erzën në WhatsApp.',
    },
    skip: 'Kalo te përmbajtja',
    nav: { services: 'Shërbimet', work: 'Punimet', team: 'Ekipi', salon: 'Salloni', faq: 'Pyetje', visit: 'Kontakti', book: 'Rezervo', menu: 'Menyja' },
    hero: {
      eyebrow: 'Sallon thonjsh në Podujevë',
      title: 'Thonj që <em>bien në sy</em>.',
      sub: 'Manikyr, pedikyr, zgjatime me xhel dhe dizajne unike nga Shkurta, Yllka dhe Erza, me produkte cilësore dhe kujdes për çdo detaj.',
      cta: 'Rezervo në WhatsApp',
      cta2: 'Shiko punimet',
      proof: { since: 'hapur që nga', clients: 'kliente të kënaqura', certs: 'certifikata profesionale', services: 'shërbime' },
      chips: ['Chrome', 'French', 'Xhel natyral'],
      videoAlt: 'Video: punë me thonj në sallon',
    },
    marquee: ['Xhel natyral', 'Zgjatime me xhel', 'French', 'Chrome', 'Ombré', 'Nail art', 'Pedikyr'],
    services: {
      eyebrow: 'Shërbimet', title: 'Çmime të <em>qarta</em>',
      sub: 'Produkte cilësore, punë e kujdesshme dhe asnjë surprizë në fund. Shtesat i kombinon si të duash.',
      addonsTitle: 'Shtesa', addonsNote: 'P.sh. zgjatime me xhel + French = 23€', cta: 'Rezervo një termin',
    },
    work: {
      eyebrow: 'Portofoli', title: 'Punimet <em>tona</em>',
      sub: 'Çdo set këtu është bërë në sallonin tonë nga Shkurta, Yllka ose Erza.',
      filters: { all: 'Të gjitha', gel: 'Xhel', french: 'French', chrome: 'Chrome', ombre: 'Ombré', design: 'Dizajne', toenails: 'Këmbët' },
      filterLabel: 'Filtro sipas stilit',
      baTitle: 'Para & <em>pas</em>', baSub: 'Tërhiq vijën për të parë ndryshimin.',
      before: 'Para', after: 'Pas', drag: 'Krahaso para dhe pas', open: 'Hap foton',
      igLine: 'Sete të reja çdo javë në',
    },
    team: {
      eyebrow: 'Ekipi', title: 'Njihuni me <em>artistet</em>',
      sub: 'Tri artiste, secila me stilin e saj. Rezervo direkt me atë që të pëlqen.',
      years: (y) => `${y} vite përvojë`,
      book: (m) => `Rezervo me ${m.acc}`,
      waText: (first) => `Përshëndetje ${first}! Dua të rezervoj një termin.`,
    },
    salon: {
      eyebrow: 'Salloni', title: 'Një vend për <em>t’u çlodhur</em>',
      story: [
        `Filluam në qershor ${founded} me një ëndërr të thjeshtë: një vend ku bukuria, kreativiteti dhe kujdesi për veten bashkohen.`,
        'Që atëherë kemi pritur qindra kliente, kemi rinovuar hapësirën, kemi zgjeruar shërbimet dhe kemi investuar në vegla e produkte më të mira. Sot, Shkurta Nails është vendi ku vjen për t’u çlodhur dhe largohesh me thonj që i do.',
      ],
      alt: 'Salloni Shkurta Nails', stripLabel: 'Foto nga salloni',
    },
    reviews: {
      eyebrow: 'Vlerësimet', title: 'Çfarë thonë <em>klientet</em>',
      stars: '5 nga 5 yje', since: (y) => `Kliente që nga ${y}`,
    },
    booking: {
      eyebrow: 'Rezervimi', title: 'Rezervo në <em>tre hapa</em>',
      sub: 'Zgjidh çfarë dëshiron dhe të hapet WhatsApp me mesazhin gati. Ne të kthejmë përgjigje me orarin e lirë.',
      step1: 'Çfarë dëshiron?', addons: 'Shtesa (opsionale)', step2: 'Me cilën artiste?', any: 'Cilado',
      step3: 'Kur të përshtatet?', flexible: 'Jam fleksibile',
      nameLabel: 'Emri yt', namePh: 'p.sh. Arta',
      previewLabel: 'Mesazhi yt', totalLabel: 'Çmimi i përafërt', send: 'Dërgo në WhatsApp',
      note: 'Termini konfirmohet kur të të përgjigjemi në WhatsApp.',
      today: 'Sot', tomorrow: 'Nesër',
      hello: 'Përshëndetje! Dua të rezervoj një termin.', service: 'Shërbimi', artist: 'Artistja', day: 'Dita', name: 'Emri',
      // Many browsers lack Albanian date formatting, so the names are spelled out here.
      names: {
        weekdaysShort: ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht'],
        weekdaysLong: ['e diel', 'e hënë', 'e martë', 'e mërkurë', 'e enjte', 'e premte', 'e shtunë'],
        monthsShort: ['jan', 'shk', 'mar', 'pri', 'maj', 'qer', 'kor', 'gus', 'sht', 'tet', 'nën', 'dhj'],
        monthsLong: ['janar', 'shkurt', 'mars', 'prill', 'maj', 'qershor', 'korrik', 'gusht', 'shtator', 'tetor', 'nëntor', 'dhjetor'],
      },
    },
    faq: {
      eyebrow: 'Pyetje', title: 'Pyetje të <em>shpeshta</em>', sub: 'Nuk e gjen përgjigjen? Na shkruaj në',
      items: [
        { q: 'Sa zgjat xheli?', a: 'Zakonisht 3–4 javë, varësisht nga rritja e thonjve dhe kujdesi. Pas kësaj rekomandojmë një termin të ri që thonjtë të mbeten të shëndetshëm.' },
        { q: 'A mund të sjell foto të dizajnit që dua?', a: 'Po! Na e dërgo foton në WhatsApp para terminit dhe e përshtatim dizajnin bashkë.' },
        { q: 'Sa kushton një set i plotë?', a: 'Zgjatimet me xhel kushtojnë 20€. Shtesat: chrome +2€, French +3€, ombré +5€, dizajn +1–2€. P.sh. zgjatime me French janë 23€.' },
        { q: 'Si t’i mirëmbaj thonjtë pas terminit?', a: 'Përdor vaj për kutikula çdo ditë, mbaj doreza kur pastron dhe mos i përdor thonjtë si vegël. Nëse diçka thyhet, na shkruaj për riparim.' },
        { q: 'Po nëse vonohem ose s’mund të vij?', a: 'Na shkruaj në WhatsApp sa më herët, që ta zhvendosim terminin ose t’ia japim dikujt tjetër.' },
      ],
    },
    visit: {
      eyebrow: 'Kontakti', title: 'Na <em>vizitoni</em>',
      address: 'Adresa', hours: 'Orari', phone: 'Telefoni', instagram: 'Instagram',
      days: 'E hënë – E premte', city: 'Podujevë', country: 'Kosovë', maps: 'Hap në Google Maps', alt: 'Hyrja e sallonit',
    },
    footer: { rights: 'Të gjitha të drejtat e rezervuara.', madeBy: 'Faqja nga Erdi' },
    bar: { book: 'Rezervo', call: 'Thirr' },
    close: 'Mbyll',
  },

  en: {
    htmlLang: 'en', locale: 'en-GB', ogLocale: 'en_GB', quote: ['“', '”'],
    meta: {
      title: 'Shkurta Nails · Nail salon in Podujevo',
      description: 'Manicure, pedicure, gel extensions, chrome, French and ombré nails in Podujevo, Kosovo. Book with Shkurta, Yllka or Erza on WhatsApp.',
    },
    skip: 'Skip to content',
    nav: { services: 'Services', work: 'Work', team: 'Team', salon: 'Salon', faq: 'FAQ', visit: 'Contact', book: 'Book now', menu: 'Menu' },
    hero: {
      eyebrow: 'Nail salon in Podujevo, Kosovo',
      title: 'Nails that <em>get noticed</em>.',
      sub: 'Manicure, pedicure, gel extensions and one-of-a-kind designs by Shkurta, Yllka and Erza, with quality products and care in every detail.',
      cta: 'Book on WhatsApp',
      cta2: 'See our work',
      proof: { since: 'open since', clients: 'happy clients', certs: 'professional certificates', services: 'services' },
      chips: ['Chrome', 'French', 'Gel overlay'],
      videoAlt: 'Video of nail work in the salon',
    },
    marquee: ['Gel overlay', 'Gel extensions', 'French', 'Chrome', 'Ombré', 'Nail art', 'Toenails'],
    services: {
      eyebrow: 'Services', title: 'Clear <em>prices</em>',
      sub: 'Quality products, careful work and no surprises at the end. Mix and match the add-ons however you like.',
      addonsTitle: 'Add-ons', addonsNote: 'E.g. gel extensions + French = 23€', cta: 'Book an appointment',
    },
    work: {
      eyebrow: 'Portfolio', title: 'Our <em>work</em>',
      sub: 'Every set here was made in our salon by Shkurta, Yllka or Erza.',
      filters: { all: 'All', gel: 'Gel', french: 'French', chrome: 'Chrome', ombre: 'Ombré', design: 'Nail art', toenails: 'Toenails' },
      filterLabel: 'Filter by style',
      baTitle: 'Before & <em>after</em>', baSub: 'Drag the line to see the difference.',
      before: 'Before', after: 'After', drag: 'Compare before and after', open: 'Open photo',
      igLine: 'New sets every week on',
    },
    team: {
      eyebrow: 'The team', title: 'Meet the <em>artists</em>',
      sub: 'Three artists, each with her own style. Book directly with the one you love.',
      years: (y) => `${y} years of experience`,
      book: (m) => `Book with ${m.first}`,
      waText: (first) => `Hi ${first}! I’d like to book an appointment.`,
    },
    salon: {
      eyebrow: 'The salon', title: 'A place to <em>unwind</em>',
      story: [
        `We started in June ${founded} with a simple dream: a place where beauty, creativity and self-care come together.`,
        'Since then we’ve welcomed hundreds of clients, renovated the space, added services and invested in better tools and products. Today Shkurta Nails is where you come to relax and leave with nails you love.',
      ],
      alt: 'Inside Shkurta Nails', stripLabel: 'Salon photos',
    },
    reviews: {
      eyebrow: 'Reviews', title: 'What clients <em>say</em>',
      stars: '5 out of 5 stars', since: (y) => `Client since ${y}`,
    },
    booking: {
      eyebrow: 'Booking', title: 'Book in <em>three steps</em>',
      sub: 'Pick what you’d like and WhatsApp opens with your message ready. We’ll reply with a free time.',
      step1: 'What would you like?', addons: 'Add-ons (optional)', step2: 'Which artist?', any: 'Anyone',
      step3: 'When suits you?', flexible: 'I’m flexible',
      nameLabel: 'Your name', namePh: 'e.g. Arta',
      previewLabel: 'Your message', totalLabel: 'Estimated price', send: 'Send on WhatsApp',
      note: 'Your appointment is confirmed once we reply on WhatsApp.',
      today: 'Today', tomorrow: 'Tomorrow',
      hello: 'Hi! I’d like to book an appointment.', service: 'Service', artist: 'Artist', day: 'Day', name: 'Name',
    },
    faq: {
      eyebrow: 'FAQ', title: 'Good to <em>know</em>', sub: 'Can’t find your answer? Message us on',
      items: [
        { q: 'How long does gel last?', a: 'Usually 3–4 weeks, depending on how fast your nails grow and how you care for them. After that we recommend a new appointment to keep your nails healthy.' },
        { q: 'Can I bring a photo of the design I want?', a: 'Yes! Send it to us on WhatsApp before your appointment and we’ll plan the design together.' },
        { q: 'How much is a full set?', a: 'Gel extensions are 20€. Add-ons: chrome +2€, French +3€, ombré +5€, nail design +1–2€. For example, extensions with French are 23€.' },
        { q: 'How do I look after my nails?', a: 'Use cuticle oil every day, wear gloves when cleaning and don’t use your nails as tools. If something breaks, message us about a repair.' },
        { q: 'What if I’m running late or can’t make it?', a: 'Message us on WhatsApp as early as you can so we can move your appointment or give the slot to someone else.' },
      ],
    },
    visit: {
      eyebrow: 'Contact', title: 'Come <em>visit</em>',
      address: 'Address', hours: 'Opening hours', phone: 'Phone', instagram: 'Instagram',
      days: 'Monday – Friday', city: 'Podujevo', country: 'Kosovo', maps: 'Open in Google Maps', alt: 'Salon entrance',
    },
    footer: { rights: 'All rights reserved.', madeBy: 'Website by Erdi' },
    bar: { book: 'Book', call: 'Call' },
    close: 'Close',
  },

  de: {
    htmlLang: 'de', locale: 'de-DE', ogLocale: 'de_DE', quote: ['„', '“'],
    meta: {
      title: 'Shkurta Nails · Nagelstudio in Podujevo',
      description: 'Maniküre, Pediküre, Gel-Verlängerung, Chrome, French und Ombré in Podujevo, Kosovo. Termin bei Shkurta, Yllka oder Erza per WhatsApp.',
    },
    skip: 'Zum Inhalt springen',
    nav: { services: 'Leistungen', work: 'Arbeiten', team: 'Team', salon: 'Salon', faq: 'FAQ', visit: 'Kontakt', book: 'Termin buchen', menu: 'Menü' },
    hero: {
      eyebrow: 'Nagelstudio in Podujevo, Kosovo',
      title: 'Nägel, die <em>auffallen</em>.',
      sub: 'Maniküre, Pediküre, Gel-Verlängerungen und einzigartige Designs von Shkurta, Yllka und Erza, mit hochwertigen Produkten und Liebe zum Detail.',
      cta: 'Per WhatsApp buchen',
      cta2: 'Arbeiten ansehen',
      proof: { since: 'geöffnet seit', clients: 'zufriedene Kundinnen', certs: 'Fachzertifikate', services: 'Leistungen' },
      chips: ['Chrome', 'French', 'Gel'],
      videoAlt: 'Video: Nageldesign im Salon',
    },
    marquee: ['Gel-Verstärkung', 'Gel-Verlängerung', 'French', 'Chrome', 'Ombré', 'Nail Art', 'Pediküre'],
    services: {
      eyebrow: 'Leistungen', title: 'Klare <em>Preise</em>',
      sub: 'Hochwertige Produkte, sorgfältige Arbeit und keine Überraschungen. Extras kannst du frei kombinieren.',
      addonsTitle: 'Extras', addonsNote: 'Z. B. Gel-Verlängerung + French = 23€', cta: 'Termin buchen',
    },
    work: {
      eyebrow: 'Portfolio', title: 'Unsere <em>Arbeiten</em>',
      sub: 'Jedes Set hier ist in unserem Salon entstanden, von Shkurta, Yllka oder Erza.',
      filters: { all: 'Alle', gel: 'Gel', french: 'French', chrome: 'Chrome', ombre: 'Ombré', design: 'Nail Art', toenails: 'Fußnägel' },
      filterLabel: 'Nach Stil filtern',
      baTitle: 'Vorher & <em>nachher</em>', baSub: 'Zieh die Linie, um den Unterschied zu sehen.',
      before: 'Vorher', after: 'Nachher', drag: 'Vorher und nachher vergleichen', open: 'Foto öffnen',
      igLine: 'Neue Sets jede Woche auf',
    },
    team: {
      eyebrow: 'Das Team', title: 'Unsere <em>Artists</em>',
      sub: 'Drei Artists, jede mit ihrem eigenen Stil. Buch direkt bei deiner Favoritin.',
      years: (y) => `${y} Jahre Erfahrung`,
      book: (m) => `Termin bei ${m.first}`,
      waText: (first) => `Hallo ${first}! Ich möchte gerne einen Termin buchen.`,
    },
    salon: {
      eyebrow: 'Der Salon', title: 'Ein Ort zum <em>Abschalten</em>',
      story: [
        `Angefangen haben wir im Juni ${founded} mit einem einfachen Traum: ein Ort, an dem Schönheit, Kreativität und Selbstfürsorge zusammenkommen.`,
        'Seitdem durften wir Hunderte Kundinnen begrüßen, haben den Salon renoviert, unser Angebot erweitert und in bessere Werkzeuge und Produkte investiert. Heute ist Shkurta Nails ein Ort zum Entspannen, und du gehst mit Nägeln, die du liebst.',
      ],
      alt: 'Im Salon Shkurta Nails', stripLabel: 'Fotos aus dem Salon',
    },
    reviews: {
      eyebrow: 'Bewertungen', title: 'Das sagen unsere <em>Kundinnen</em>',
      stars: '5 von 5 Sternen', since: (y) => `Kundin seit ${y}`,
    },
    booking: {
      eyebrow: 'Termin', title: 'In <em>drei Schritten</em> buchen',
      sub: 'Wähle aus, was du möchtest, und WhatsApp öffnet sich mit fertiger Nachricht. Wir antworten mit einem freien Termin.',
      step1: 'Was möchtest du?', addons: 'Extras (optional)', step2: 'Bei welcher Artist?', any: 'Egal',
      step3: 'Wann passt es dir?', flexible: 'Ich bin flexibel',
      nameLabel: 'Dein Name', namePh: 'z. B. Arta',
      previewLabel: 'Deine Nachricht', totalLabel: 'Ungefährer Preis', send: 'Per WhatsApp senden',
      note: 'Dein Termin ist bestätigt, sobald wir dir auf WhatsApp antworten.',
      today: 'Heute', tomorrow: 'Morgen',
      hello: 'Hallo! Ich möchte gerne einen Termin buchen.', service: 'Leistung', artist: 'Artist', day: 'Tag', name: 'Name',
    },
    faq: {
      eyebrow: 'FAQ', title: 'Gut zu <em>wissen</em>', sub: 'Keine Antwort gefunden? Schreib uns auf',
      items: [
        { q: 'Wie lange hält Gel?', a: 'Meist 3–4 Wochen, je nachdem, wie schnell deine Nägel wachsen und wie du sie pflegst. Danach empfehlen wir einen neuen Termin, damit deine Nägel gesund bleiben.' },
        { q: 'Kann ich ein Foto von meinem Wunschdesign mitbringen?', a: 'Ja! Schick es uns vor dem Termin per WhatsApp und wir planen das Design gemeinsam.' },
        { q: 'Was kostet ein komplettes Set?', a: 'Gel-Verlängerung kostet 20€. Extras: Chrome +2€, French +3€, Ombré +5€, Nageldesign +1–2€. Zum Beispiel Verlängerung mit French: 23€.' },
        { q: 'Wie pflege ich meine Nägel danach?', a: 'Täglich Nagelhautöl verwenden, beim Putzen Handschuhe tragen und die Nägel nicht als Werkzeug benutzen. Wenn etwas abbricht, schreib uns für eine Reparatur.' },
        { q: 'Was, wenn ich mich verspäte oder nicht kommen kann?', a: 'Schreib uns so früh wie möglich per WhatsApp, damit wir den Termin verschieben oder an jemand anderen vergeben können.' },
      ],
    },
    visit: {
      eyebrow: 'Kontakt', title: 'Besuch <em>uns</em>',
      address: 'Adresse', hours: 'Öffnungszeiten', phone: 'Telefon', instagram: 'Instagram',
      days: 'Montag – Freitag', city: 'Podujevo', country: 'Kosovo', maps: 'In Google Maps öffnen', alt: 'Eingang des Salons',
    },
    footer: { rights: 'Alle Rechte vorbehalten.', madeBy: 'Website von Erdi' },
    bar: { book: 'Buchen', call: 'Anrufen' },
    close: 'Schließen',
  },
};
