
const products = [
  // --- (EM - Espresso Machine) ---
  {
    sku: "EM-MICRA",
    name: "LINEA MICRA - LA MARZOCCO",
    category: "machine",
    price: 103000000,
    groups: 1,
    brand: "La Marzocco",
    mainImage: "https://res.cloudinary.com/drrao1nzd/image/upload/v1770194470/nab_coffee/products/main/ixwb9eyueb46b6ypzwgu.png"
  },
  {
    sku: "EM-MINI",
    name: "LINEA MINI - LA MARZOCCO",
    category: "machine",
    price: 130000000,
    groups: 1,
    brand: "La Marzocco",
    mainImage: "https://res.cloudinary.com/drrao1nzd/image/upload/v1770302311/nab_coffee/products/main/qfoofjrlngmoizhttqpf.jpg"
  },
  {
    sku: "EM-GS3-AV",
    name: "GS3 1 GROUP AV - LA MARZOCCO",
    category: "machine",
    price: 185900000,
    groups: 1,
    brand: "La Marzocco",
    mainImage: "/images/machines/gs3-av.png"
  },
  {
    sku: "EM-LEVA-X1",
    name: "LEVA X 1 GROUP - LA MARZOCCO",
    category: "machine",
    price: 282900000,
    groups: 1,
    brand: "La Marzocco",
    mainImage: "/images/machines/leva-x-1.png"
  },
  {
    sku: "EM-LEVA-X2",
    name: "LEVA X 2 GROUP - LA MARZOCCO",
    category: "machine",
    price: 405000000,
    groups: 2,
    brand: "La Marzocco",
    mainImage: "/images/machines/leva-x-2.png"
  },
  {
    sku: "EM-STRADA-X",
    name: "STRADA X 2 GROUP - LA MARZOCCO",
    category: "machine",
    price: 754000000,
    groups: 2,
    brand: "La Marzocco",
    mainImage: "/images/machines/strada-x.png"
  },
  {
    sku: "EM-KB90",
    name: "KB90 2 GROUP - LA MARZOCCO",
    category: "machine",
    price: 401000000,
    groups: 2,
    brand: "La Marzocco",
    mainImage: "/images/machines/kb90.png"
  },
  {
    sku: "EM-PBX-2",
    name: "LINEA PB X 2 GROUP - LA MARZOCCO",
    category: "machine",
    price: 348000000,
    groups: 2,
    brand: "La Marzocco",
    mainImage: "/images/machines/linea-pb-x.png"
  },
  {
    sku: "EM-LINEA-S",
    name: "LINEA S 2 GROUP - LA MARZOCCO",
    category: "machine",
    price: 219000000,
    groups: 2,
    brand: "La Marzocco",
    mainImage: "/images/machines/linea-s.png"
  },

  // --- (CG - Coffee Grinder) ---
  {
    sku: "CG-PICO",
    name: "PICO",
    category: "grinder",
    price: 27000000,
    brand: "La Marzocco",
    mainImage: "/images/grinders/pico.png"
  },
  {
    sku: "CG-VULCANO",
    name: "VULCANO",
    category: "grinder",
    price: 79900000,
    brand: "La Marzocco",
    mainImage: "/images/grinders/vulcano.png"
  },
  {
    sku: "CG-SWIFT",
    name: "DUAL SWIFT",
    category: "grinder",
    price: 91900000,
    brand: "La Marzocco",
    mainImage: "/images/grinders/dual-swift.png"
  },
  {
    sku: "CG-SWAN",
    name: "SWAN",
    category: "grinder",
    price: 101900000,
    brand: "La Marzocco",
    mainImage: "/images/grinders/swan.png"
  },

  // --- (BC - Bean Coffee) ---
  {
    sku: "BC-ESP-SUPER",
    name: "ESPRESSO SUPPER BAR - DARK ROASTED",
    category: "beans",
    price: 370000,
    weight: 500,
    roastLevel: "Dark",
    brand: "NAB Coffee",
    mainImage: "/images/beans/espresso-supper-bar.png"
  },
  {
    sku: "BC-ESP-BAR",
    name: "ESPRESSO BAR - DARK ROASTED",
    category: "beans",
    price: 300000,
    weight: 500,
    roastLevel: "Dark",
    brand: "NAB Coffee",
    mainImage: "/images/beans/espresso-bar.png"
  },
  {
    sku: "BC-ROBUSTA",
    name: "ROBUSTA - COFFEE BEANS",
    category: "beans",
    price: 210000,
    weight: 500,
    roastLevel: "Medium",
    brand: "NAB Coffee",
    mainImage: "/images/beans/robusta.png"
  },
  {
    sku: "BC-ARABICA",
    name: "ARABICA - COFFEE BEANS",
    category: "beans",
    price: 250000,
    weight: 500,
    brand: "NAB Coffee",
    mainImage: "/images/beans/arabica.png"
  },
  {
    sku: "BC-MOKA",
    name: "MOKA - COFFEE BEANS",
    category: "beans",
    price: 190000,
    weight: 500,
    brand: "NAB Coffee",
    mainImage: "/images/beans/moka.png"
  },
  {
    sku: "BC-LIBERICA",
    name: "LIBERICA - COFFEE BEANS",
    category: "beans",
    price: 300000,
    weight: 500,
    brand: "NAB Coffee",
    mainImage: "/images/beans/liberica.png"
  },
  {
    sku: "BC-ORGANIC",
    name: "ORGANIC - COFFEE BEANS",
    category: "beans",
    price: 390000,
    weight: 500,
    brand: "NAB Coffee",
    mainImage: "/images/beans/organic.png"
  },
  {
    sku: "BC-FIL-TRUFFLE",
    name: "TRUFFLE - FILTER COFFEE",
    category: "beans",
    price: 150000,
    weight: 200,
    brand: "NAB Coffee",
    mainImage: "/images/beans/truffle-filter.png"
  },
  {
    sku: "BC-FIL-ORIGINAL",
    name: "ORIGINAL - FILTER COFFEE",
    category: "beans",
    price: 100000,
    weight: 200,
    brand: "NAB Coffee",
    mainImage: "/images/beans/original-filter.png"
  },

  // --- (ACC - Accessories) ---
  {
    sku: "ACC-TAMPER-HEAVY",
    name: "HEAVY COFFEE TAMPER",
    category: "accessories",
    price: 1299000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/heavy-tamper.png"
  },
  {
    sku: "ACC-TAMPER-PALM",
    name: "COFFEE PALM TAMPER",
    category: "accessories",
    price: 999000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/palm-tamper.png"
  },
  {
    sku: "ACC-PORTAFILTER",
    name: "BOTTOMLESS PORTAFILTER WITH HANDLE",
    category: "accessories",
    price: 1649000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/bottomless-portafilter.png"
  },
  {
    sku: "ACC-STATION-STD",
    name: "TAMPING STATION",
    category: "accessories",
    price: 725000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/tamping-station.png"
  },
  {
    sku: "ACC-STATION-COMPACT",
    name: "COMPACT TAMPING STATION - UPGRADED",
    category: "accessories",
    price: 599000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/compact-station.png"
  },
  {
    sku: "ACC-PITCHER",
    name: "MILK PITCHER",
    category: "accessories",
    price: 399000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/milk-pitcher.png"
  },
  {
    sku: "ACC-PITCHER-HANDLESS",
    name: "HANDLELESS MILK PITCHER",
    category: "accessories",
    price: 499000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/handleless-pitcher.png"
  },
  {
    sku: "ACC-WDT",
    name: "WDT DISTRIBUTION TOOL WITH STAND",
    category: "accessories",
    price: 399000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/wdt-tool.png"
  },
  {
    sku: "ACC-BRUSH",
    name: "BARISTA BENCH CLEANING BRUSH",
    category: "accessories",
    price: 250000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/cleaning-brush.png"
  },
  {
    sku: "ACC-GRINDER-MANUAL",
    name: "MANUAL COFFEE GRINDER",
    category: "accessories",
    price: 2499000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/manual-grinder.png"
  },
  {
    sku: "ACC-SCALE",
    name: "ULTRA THIN COFFEE SCALE",
    category: "accessories",
    price: 1300000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/scale.png"
  },
  {
    sku: "ACC-CELLAR",
    name: "COFFEE BEAN CELLARS WITH STAND",
    category: "accessories",
    price: 60000,
    brand: "NAB Coffee",
    mainImage: "/images/accessories/bean-cellars.png"
  }
];

export default products;