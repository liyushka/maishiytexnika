import React, { useState, useEffect, useMemo, useRef } from 'react';
import ProductCard from './ProductCard';
import './App.css';

// ============================================================================
// REAL MAISHIY TEXNIKA MA'LUMOTLAR BAZASI (24 TA MAHSULOT)
// ============================================================================
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Samsung Bespoke RF65A967FSG Muzlatkich",
    brand: "Samsung",
    category: "Muzlatkichlar",
    price: 18500000,
    oldPrice: 21000000,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    isNew: true,
    discount: 12,
    warranty: "3 yil rasmiy kafolat",
    energyClass: "A++",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80",
    description: "Zamonaviy Bespoke dizaynidagi 4 eshikli aqlli muzlatkich. Triple Cooling tizimi har bir bo'limda optimal namlik va haroratni saqlaydi.",
    specs: {
      "Umumiy hajmi": "647 litr",
      "Kompressor turi": "Digital Inverter",
      "Muzlatish tizimi": "Total No Frost",
      "O'lchamlari (B×E×Ch)": "182.5 × 91.2 × 72.3 sm",
      "Shovqin darajasi": "37 dB"
    }
  },
  {
    id: 2,
    name: "LG AI DD F4V5VS0W Kir yuvish mashinasi",
    brand: "LG",
    category: "Kir yuvish",
    price: 7890000,
    oldPrice: 8900000,
    rating: 4.8,
    reviewsCount: 215,
    inStock: true,
    isNew: false,
    discount: 11,
    warranty: "10 yil motor kafolati",
    energyClass: "A+++",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
    description: "Sun'iy intellekt (AI DD) mato turini va og'irligini aniqlab, eng maqbul yuvish algoritmini avtomatik tanlaydi. Steam+ bug' bilan tozalash funksiyasi mavjud.",
    specs: {
      "Maksimal yuklama": "9 kg",
      "Siqish tezligi": "1400 ayl/daq",
      "Dvigatel turi": "Inverter Direct Drive",
      "Bug' funksiyasi": "Steam+ (99.9% allergenlardan tozalash)",
      "Boshqaruv": "SmartThinQ Wi-Fi"
    }
  },
  {
    id: 3,
    name: "Dyson V15 Detect Absolute Simsiz Changyutkich",
    brand: "Dyson",
    category: "Changyutkichlar",
    price: 11200000,
    oldPrice: 12500000,
    rating: 5.0,
    reviewsCount: 98,
    inStock: true,
    isNew: true,
    discount: 10,
    warranty: "2 yil kafolat",
    energyClass: "A+",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
    description: "Lazer nuri yordamida ko'zga ko'rinmas mayda chang zarrachalarini ham aniqlaydi. Piezo sensori chang miqdorini real vaqtda hisoblab, so'rish kuchini oshiradi.",
    specs: {
      "So'rish quvvati": "240 AW",
      "Ishlash vaqti": "60 daqiqagacha",
      "Filtrlash tizimi": "HEPA (99.99% gacha)",
      "Og'irligi": "3.1 kg",
      "Displey": "LCD real-time hisobot"
    }
  },
  {
    id: 4,
    name: "Gree Bora Inverter GWH12AAB-K6DNA4A Konditsioner",
    brand: "Gree",
    category: "Iqlim texnikasi",
    price: 5650000,
    oldPrice: 6300000,
    rating: 4.7,
    reviewsCount: 184,
    inStock: true,
    isNew: false,
    discount: 10,
    warranty: "3 yil kafolat",
    energyClass: "A++",
    image: "https://images.unsplash.com/photo-1614631446501-abcf76949743?auto=format&fit=crop&w=800&q=80",
    description: "35 kv.m gacha bo'lgan xonalar uchun tejamkor inverter konditsioner. Cold Plasma havo tozalash va Wi-Fi orqali masofadan boshqarish tizimiga ega.",
    specs: {
      "Xizmat maydoni": "35 m² gacha",
      "Quvvati (BTU)": "12000 BTU",
      "Freon turi": "R32 ekologik",
      "Ishlash harorati": "-15°C dan +48°C gacha",
      "Shovqin darajasi": "24 dB (Tungi rejim)"
    }
  },
  {
    id: 5,
    name: "DeLonghi Magnifica Evo ECAM290.81.TB Qahva mashinasi",
    brand: "DeLonghi",
    category: "Oshxona texnikasi",
    price: 9450000,
    oldPrice: 10800000,
    rating: 4.9,
    reviewsCount: 76,
    inStock: true,
    isNew: true,
    discount: 13,
    warranty: "2 yil kafolat",
    energyClass: "A",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    description: "LatteCrema tizimi bilan bir tugmani bosish orqali mukammal kapuchino va latte tayyorlang. 13 darajali o'rnatilgan po'lat qahva maydalagich.",
    specs: {
      "Bosim kuchi": "15 Bar",
      "Suv idishi hajmi": "1.8 litr",
      "Qahva doni idishi": "250 gramm",
      "Avtomatik dasturlar": "7 xil ichimlik",
      "O'zini tozalash": "Avtomatik yuvish va kalsiydan tozalash"
    }
  },
  {
    id: 6,
    name: "Bosch Serie 6 SMS6ZCI49E Idish yuvish mashinasi",
    brand: "Bosch",
    category: "Oshxona texnikasi",
    price: 10900000,
    oldPrice: 12100000,
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    isNew: false,
    discount: 10,
    warranty: "2 yil kafolat",
    energyClass: "A+++",
    image: "https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?auto=format&fit=crop&w=800&q=80",
    description: "Zeolith quritish texnologiyasi plastik idishlarni ham tomchisiz quritadi. Extra Clean Zone kuchli ifloslangan idishlar uchun maxsus purkagichlarga ega.",
    specs: {
      "Sig'imi": "14 komplekt idish",
      "Suv sarfi": "9.5 litr / sikl",
      "Shovqin darajasi": "42 dB",
      "Dasturlar soni": "8 ta asosiy + Home Connect",
      "Quritish turi": "Zeolith® mineral quritish"
    }
  },
  {
    id: 7,
    name: "Roborock S8 Pro Ultra Robot Changyutkich",
    brand: "Roborock",
    category: "Changyutkichlar",
    price: 13800000,
    oldPrice: 15500000,
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    isNew: true,
    discount: 11,
    warranty: "1 yil kafolat",
    energyClass: "A+",
    image: "https://images.unsplash.com/photo-1589006880816-248c55779522?auto=format&fit=crop&w=800&q=80",
    description: "To'liq avtonom baza: changni bo'shatadi, lattani yuvadi va issiq havo bilan quritadi. 6000 Pa so'rish quvvati va 3D to'siqlarni chetlab o'tish tizimi.",
    specs: {
      "So'rish quvvati": "6000 Pa HyperForce",
      "Navigatsiya": "PreciSense LiDAR + 3D Reactive",
      "Nam tozalash": "VibraRise 2.0 (3000 tebranish/daq)",
      "Batareya": "5200 mAh (180 daqiqa)",
      "Stansiya funksiyasi": "Avto-yuvish, avto-quritish, avto-bo'shatish"
    }
  },
  {
    id: 8,
    name: "Samsung Neo QLED 65QN90C 4K Smart TV",
    brand: "Samsung",
    category: "Televizorlar",
    price: 22400000,
    oldPrice: 25000000,
    rating: 5.0,
    reviewsCount: 89,
    inStock: true,
    isNew: true,
    discount: 10,
    warranty: "2 yil kafolat",
    energyClass: "A+",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    description: "Quantum Matrix texnologiyasi va Neural Quantum 4K protsessori bilan o'ta yorqin va chuqur kontrastli tasvir. Dolby Atmos 60W 4.2.2 kanal ovoz tizimi.",
    specs: {
      "Ekran diagonali": "65 dyuym (165 sm)",
      "Yangilanish tezligi": "120 Hz (144 Hz gacha o'yinlarda)",
      "Ekran turi": "Neo QLED Mini-LED",
      "Ovoz tizimi": "60W OTS+ Dolby Atmos",
      "Operatsion tizim": "Tizen OS"
    }
  },
  {
    id: 9,
    name: "Bosch HBG675BB1 Serie 8 O'rnatiladigan Duxovka",
    brand: "Bosch",
    category: "Oshxona texnikasi",
    price: 11500000,
    oldPrice: 12900000,
    rating: 4.8,
    reviewsCount: 53,
    inStock: true,
    isNew: false,
    discount: 11,
    warranty: "2 yil kafolat",
    energyClass: "A+",
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80",
    description: "4D issiq havo aylanishi bir vaqtning o'zida 4 ta darajada bir tekis pishirishni ta'minlaydi. Pirolitik o'z-o'zini tozalash funksiyasi bilan yog'larni kulga aylantiradi.",
    specs: {
      "Ichki hajmi": "71 litr",
      "Tozalash tizimi": "Piroliz (480°C)",
      "Isitish rejimlari": "13 xil rejim",
      "Harorat diapazoni": "30°C - 300°C",
      "Displey": "TFT sensorli boshqaruv"
    }
  },
  {
    id: 10,
    name: "Philips Dual Basket Airfryer NA352/00",
    brand: "Philips",
    category: "Oshxona texnikasi",
    price: 3450000,
    oldPrice: 3950000,
    rating: 4.8,
    reviewsCount: 167,
    inStock: true,
    isNew: true,
    discount: 13,
    warranty: "2 yil kafolat",
    energyClass: "A",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    description: "Ikki alohida savatli aerogril: asosiy taom va garnirni bir vaqtda tayyorlang va sinxron tugatish funksiyasidan foydalaning. 90% gacha kamroq yog'.",
    specs: {
      "Umumiy hajm": "9 litr (6L + 3L savatlar)",
      "Quvvati": "2750 Vt",
      "Texnologiya": "Rapid Air issiq havo",
      "Dasturlar": "8 ta avtomatik menyu",
      "Idish yuvish mashinasi": "Savatlar mos keladi"
    }
  },
  {
    id: 11,
    name: "LG WashTower WT1210BBF Kir yuvish va Quritish",
    brand: "LG",
    category: "Kir yuvish",
    price: 24900000,
    oldPrice: 27800000,
    rating: 5.0,
    reviewsCount: 41,
    inStock: true,
    isNew: true,
    discount: 10,
    warranty: "10 yil kafolat",
    energyClass: "A+++",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80",
    description: "Bitta korpusda birlashtirilgan yuvish va quritish minorasi. Markaziy boshqaruv paneli har ikkala qurilmani qulay balandlikdan boshqarish imkonini beradi.",
    specs: {
      "Yuvish / Quritish hajmi": "12 kg / 10 kg",
      "Quritish texnologiyasi": "Dual Inverter Heat Pump",
      "Balandligi": "165.5 sm (ixcham dizayn)",
      "Sinxronizatsiya": "Smart Pairing™",
      "Rangi": "Matte Black Steel"
    }
  },
  {
    id: 12,
    name: "Dyson Purifier Hot+Cool HP09 Havo tozalagich",
    brand: "Dyson",
    category: "Iqlim texnikasi",
    price: 9800000,
    oldPrice: 11000000,
    rating: 4.8,
    reviewsCount: 62,
    inStock: false,
    isNew: false,
    discount: 11,
    warranty: "2 yil kafolat",
    energyClass: "A+",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
    description: "Havoni formaldegid, allergen va 0.1 mikrongacha bo'lgan zararli zarralardan tozalaydi, yozda salqinlatadi va qishda xonani tez isitadi.",
    specs: {
      "Filtrlash": "HEPA H13 + Katalitik filtr",
      "Funksiyalar": "Tozalash + Isitish + Sovutish",
      "Air Multiplier™": "290 litr/sekund havo oqimi",
      "Boshqaruv": "MyDyson ilovasi va pult",
      "Aylanish burchagi": "350° gacha"
    }
  },
  {
    id: 13,
    name: "Samsung MS23K3513AS Mikroto'lqinli pech",
    brand: "Samsung",
    category: "Oshxona texnikasi",
    price: 1850000,
    oldPrice: 2150000,
    rating: 4.7,
    reviewsCount: 310,
    inStock: true,
    isNew: false,
    discount: 14,
    warranty: "3 yil kafolat",
    energyClass: "A",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80",
    description: "Biokeramik ichki qoplama tirnalishga chidamli, antibakterial xususiyatga ega va yog'larni oson artib tozalash imkonini beradi.",
    specs: {
      "Ichki hajmi": "23 litr",
      "Mikroto'lqin quvvati": "800 Vt",
      "Ichki qoplama": "Biokeramika emal",
      "Tez muzdan tushirish": "Quick Defrost (5 mahsulot)",
      "Hidni yo'qotish": "Deodorization funksiyasi"
    }
  },
  {
    id: 14,
    name: "LG OLED65C4RLA 4K Evo Smart Televizor",
    brand: "LG",
    category: "Televizorlar",
    price: 26500000,
    oldPrice: 29500000,
    rating: 5.0,
    reviewsCount: 73,
    inStock: true,
    isNew: true,
    discount: 10,
    warranty: "2 yil kafolat",
    energyClass: "A+",
    image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80",
    description: "O'z-o'zidan yonuvchi OLED evo piksellari tufayli cheksiz qora rang va 100% rang aniqligi. α9 AI Processor 4K Gen7 bilan jihozlangan.",
    specs: {
      "Ekran diagonali": "65 dyuym",
      "Yangilanish tezligi": "144 Hz (G-Sync / FreeSync)",
      "HDR formatlari": "Dolby Vision, HDR10, HLG",
      "Qalinligi": "O'ta yupqa (4.5 sm)",
      "Pult": "Magic Remote (ko'rsatkichli)"
    }
  },
  {
    id: 15,
    name: "KitchenAid Artisan 5KSM175PS Planeta Mikseri",
    brand: "KitchenAid",
    category: "Oshxona texnikasi",
    price: 8900000,
    oldPrice: 9800000,
    rating: 4.9,
    reviewsCount: 84,
    inStock: true,
    isNew: false,
    discount: 9,
    warranty: "5 yil kafolat",
    energyClass: "A",
    image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=800&q=80",
    description: "To'liq metall korpusli afsonaviy oshxona mikseri. 59 nuqtali planetar aralashtirish tizimi har qanday xamir va kremni mukammal darajaga yetkazadi.",
    specs: {
      "Kosa hajmi": "4.8 litr + 3 litr qo'shimcha",
      "Tezlik rejimlari": "10 bosqichli",
      "Korpus materiali": "Quyma rux (metall)",
      "Nasatkalar": "4 xil (venchik, ilgak, kurakcha)",
      "Ishlab chiqarilgan": "AQSH (Ohio)"
    }
  },
  {
    id: 16,
    name: "LG InstaView Door-in-Door GC-Q257CSFS Muzlatkich",
    brand: "LG",
    category: "Muzlatkichlar",
    price: 21800000,
    oldPrice: 24200000,
    rating: 4.9,
    reviewsCount: 59,
    inStock: true,
    isNew: true,
    discount: 10,
    warranty: "10 yil kompressor kafolati",
    energyClass: "A++",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80",
    description: "Shisha eshikni ikki marta taqillatish orqali eshikni ochmasdan ichkarini ko'ring — bu sovuq havo yo'qotilishini 41% ga kamaytiradi.",
    specs: {
      "Umumiy hajmi": "635 litr (Side-by-Side)",
      "Suv dispenseri": "UVnano o'z-o'zini sterilizatsiya",
      "Sovutish": "DoorCooling+ & LinearCooling",
      "Muz generatori": "Craft Ice yumaloq muzlar",
      "Wi-Fi": "LG ThinQ diagnostika"
    }
  }
];

const CATEGORIES = [
  { id: "Barchasi", label: "Barcha texnikalar", icon: "⚡" },
  { id: "Muzlatkichlar", label: "Muzlatkichlar", icon: "❄️" },
  { id: "Kir yuvish", label: "Kir yuvish", icon: "🫧" },
  { id: "Oshxona texnikasi", label: "Oshxona texnikasi", icon: "☕" },
  { id: "Changyutkichlar", label: "Changyutkichlar", icon: "🌪️" },
  { id: "Iqlim texnikasi", label: "Iqlim texnikasi", icon: "🌡️" },
  { id: "Televizorlar", label: "Televizorlar", icon: "📺" }
];

const BRANDS = ["Barchasi", "Samsung", "LG", "Bosch", "Dyson", "DeLonghi", "Gree", "Roborock", "Philips", "KitchenAid"];

function App() {
  // ============================================================================
  // STATE MANAGEMENT & LOCALSTORAGE SINXRONIZATSIYASI
  // ============================================================================
  const [products] = useState(INITIAL_PRODUCTS);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('technova_theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Sevimlilar (Избранное) ro'yxati
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('technova_favorites');
    return saved ? JSON.parse(saved) : [1, 3]; // Dastlabki 2 ta namuna
  });

  // Savatcha (Cart) ro'yxati
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('technova_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Solishtirish (Compare) ro'yxati
  const [compareList, setCompareList] = useState([]);

  // Filtr va Qidiruv holatlari
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [selectedBrand, setSelectedBrand] = useState("Barchasi");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [maxPriceFilter, setMaxPriceFilter] = useState(30000000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDiscounts, setOnlyDiscounts] = useState(false);

  // Modallar va Drawer oynalar holati
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [orderSuccessModal, setOrderSuccessModal] = useState(false);

  // Promo-kod va Buyurtma formasi
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Toast bildirishnomalar
  const [toasts, setToasts] = useState([]);

  // Scroll va Header animatsiyasi uchun ref/state
  const [isScrolled, setIsScrolled] = useState(false);
  const catalogRef = useRef(null);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    localStorage.setItem('technova_theme', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('technova_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('technova_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Reveal Motion animatsiyasi
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedCategory, selectedBrand, searchQuery, sortBy, maxPriceFilter, onlyInStock, onlyDiscounts]);

  // ============================================================================
  // YORDAMCHI FUNKSIYALAR (TOAST, FORMATLASH, AKSIYALAR)
  // ============================================================================
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
  };

  // Sevimlilarga qo'shish / olib tashlash
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`"${product.name}" sevimlilardan olib tashlandi`, 'warning');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`"${product.name}" sevimlilarga saqlandi ❤️`, 'success');
        return [...prev, product.id];
      }
    });
  };

  // Savatchaga qo'shish
  const addToCart = (product) => {
    if (!product.inStock) {
      showToast("Ushbu mahsulot vaqtincha sotuvda mavjud emas", "error");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showToast(`"${product.name}" soni savatda oshirildi (${existing.quantity + 1} dona)`, 'success');
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        showToast(`"${product.name}" savatchaga qo'shildi 🛒`, 'success');
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Savatdagi miqdorni o'zgartirish
  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast("Mahsulot savatchadan o'chirildi", "warning");
  };

  // Solishtirish ro'yxatiga qo'shish
  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`"${product.name}" solishtirishdan olib tashlandi`, 'info');
        return prev.filter((item) => item.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast("Bir vaqtning o'zida maksimal 3 ta texnikani solishtirish mumkin", 'warning');
        return prev;
      }
      showToast(`"${product.name}" solishtirish ro'yxatiga qo'shildi ⚖️`, 'success');
      return [...prev, product];
    });
  };

  // ============================================================================
  // FILTRLANGAN VA SARALANGAN MAHSULOTLAR
  // ============================================================================
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "Barchasi" || product.category === selectedCategory;
        const matchesBrand =
          selectedBrand === "Barchasi" || product.brand === selectedBrand;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price <= maxPriceFilter;
        const matchesStock = !onlyInStock || product.inStock;
        const matchesDiscount = !onlyDiscounts || product.discount > 0;

        return (
          matchesCategory &&
          matchesBrand &&
          matchesSearch &&
          matchesPrice &&
          matchesStock &&
          matchesDiscount
        );
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") return b.discount - a.discount;
        return b.reviewsCount - a.reviewsCount; // popular
      });
  }, [
    products,
    selectedCategory,
    selectedBrand,
    searchQuery,
    maxPriceFilter,
    onlyInStock,
    onlyDiscounts,
    sortBy
  ]);

  // Sevimli mahsulotlar ob'ektlari
  const favoriteProducts = useMemo(() => {
    return products.filter((p) => favorites.includes(p.id));
  }, [products, favorites]);

  // Savat hisob-kitoblari
  const cartTotalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const promoDiscountAmount = promoApplied ? Math.round(cartSubtotal * 0.05) : 0;
  const deliveryFee = cartSubtotal > 10000000 || cartSubtotal === 0 ? 0 : 80000;
  const cartFinalTotal = cartSubtotal - promoDiscountAmount + deliveryFee;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "TECHNOVA2026") {
      setPromoApplied(true);
      showToast("TECHNOVA2026 promo-kodi qo'llanildi! 5% qo'shimcha chegirma 🎉", "success");
    } else {
      showToast("Noto'g'ri promo-kod. Sinab ko'ring: TECHNOVA2026", "error");
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      showToast("Iltimos, ismingiz va telefon raqamingizni kiriting!", "error");
      return;
    }
    setIsCartOpen(false);
    setOrderSuccessModal(true);
    setCart([]);
    setPromoApplied(false);
    setPromoCode("");
  };

  const resetAllFilters = () => {
    setSelectedCategory("Barchasi");
    setSelectedBrand("Barchasi");
    setSearchQuery("");
    setMaxPriceFilter(30000000);
    setOnlyInStock(false);
    setOnlyDiscounts(false);
    setSortBy("popular");
    showToast("Barcha filtrlar tozalandi", "info");
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ============================================================================
  // RENDER UI
  // ============================================================================
  return (
    <div className={`app-wrapper ${darkMode ? 'dark' : 'light'}`}>
      {/* TOAST BILDIRISHNOMALAR KONTEYNERI */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-item toast-${toast.type}`}>
            <span className="toast-dot"></span>
            <p>{toast.message}</p>
          </div>
        ))}
      </div>

      {/* YUQORI AXBOROT PANELI (TOP BAR) */}
      <div className="top-announcement-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span>🚚 10 000 000 so'mdan yuqori xaridlarga O'zbekiston bo'ylab BEPUL yetkazib berish!</span>
          </div>
          <div className="top-bar-right">
            <span>Promo-kod: <strong>TECHNOVA2026</strong> (-5%)</span>
            <span className="divider">|</span>
            <a href="tel:+998712009900">📞 +998 (71) 200-99-00</a>
          </div>
        </div>
      </div>

      {/* ASOSIY STICKY HEADER */}
      <header className={`main-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-container">
          {/* Brend Logotipi */}
          <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-title">Tech<span className="accent">Nova</span></span>
              <span className="logo-subtitle">Smart Home & Appliances</span>
            </div>
          </div>

          {/* Qidiruv Maydoni */}
          <div className="header-search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Muzlatkich, Dyson, kir yuvish mashinasi qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery("")}>✕</button>
            )}
          </div>

          {/* Header Harakatlar Tugmalari */}
          <div className="header-actions">
            {/* Dark/Light Mode Tugmasi */}
            <button
              className="action-icon-btn theme-btn"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Yorug' rejim" : "Tungi rejim"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Solishtirish Tugmasi */}
            <button
              className="action-icon-btn"
              onClick={() => setIsCompareOpen(true)}
              title="Texnikalarni solishtirish"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
              <span className="action-label">Solishtirish</span>
              {compareList.length > 0 && (
                <span className="badge-count badge-neutral">{compareList.length}</span>
              )}
            </button>

            {/* SEVIMLILAR (ИЗБРАННОЕ) TUGMASI */}
            <button
              className="action-icon-btn favorites-header-btn"
              onClick={() => setIsFavoritesOpen(true)}
              title="Sevimlilar ro'yxati"
            >
              <svg viewBox="0 0 24 24" fill={favorites.length > 0 ? "#ef4444" : "none"} stroke={favorites.length > 0 ? "#ef4444" : "currentColor"} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="action-label">Sevimlilar</span>
              {favorites.length > 0 && (
                <span className="badge-count badge-heart">{favorites.length}</span>
              )}
            </button>

            {/* SAVATCHA TUGMASI */}
            <button
              className="action-icon-btn cart-header-btn"
              onClick={() => setIsCartOpen(true)}
              title="Savatcha"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="action-label">Savatcha</span>
              {cartTotalCount > 0 && (
                <span className="badge-count badge-primary">{cartTotalCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO BANNER SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content fade-in-left">
            <div className="hero-pill">
              <span className="pulse-dot"></span>
              2026-yilgi Yangi Kolleksiya & Smart Home Texnologiyalari
            </div>
            <h1 className="hero-title">
              Uyingiz uchun <span className="highlight-text">aqlli va premium</span> maishiy texnikalar
            </h1>
            <p className="hero-description">
              Samsung, LG, Bosch va Dyson brendlarining rasmiy kafolatli texnikalari. 
              0% muddatli to'lov, bepul o'rnatib berish va O'zbekiston bo'ylab tezkor yetkazib berish xizmati.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary-hero" onClick={scrollToCatalog}>
                Katalogni ko'rish
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button
                className="btn-secondary-hero"
                onClick={() => {
                  setOnlyDiscounts(true);
                  scrollToCatalog();
                }}
              >
                🔥 Chegirmadagi texnikalar
              </button>
            </div>

            <div className="hero-stats-row">
              <div className="stat-box">
                <strong>15 000+</strong>
                <span>Mamnun mijozlar</span>
              </div>
              <div className="stat-box">
                <strong>3 yilgacha</strong>
                <span>Rasmiy servis kafolati</span>
              </div>
              <div className="stat-box">
                <strong>24 soat</strong>
                <span>Toshkent bo'ylab yetkazish</span>
              </div>
            </div>
          </div>

          <div className="hero-visual fade-in-right">
            <div className="hero-showcase-card">
              <div className="floating-badge top-badge">
                <span>⚡ A+++ Energiya tejamkor</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1000&q=85"
                alt="Zamonaviy oshxona texnikalari"
                className="hero-main-img"
              />
              <div className="floating-badge bottom-badge">
                <div className="mini-product-info">
                  <span className="mini-tag">Hafta tanlovi</span>
                  <strong>Bespoke & AI Home Seriyasi</strong>
                  <p>15% gacha chegirma bilan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORIYALAR TEZKOR PANELI */}
      <section className="categories-strip">
        <div className="container">
          <div className="categories-scroll-list">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="cat-emoji">{cat.icon}</span>
                <span className="cat-name">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ASOSIY KATALOG VA FILTRLAR QISMI */}
      <main className="container main-catalog-section" ref={catalogRef}>
        <div className="catalog-header-bar">
          <div>
            <h2 className="section-heading">
              {selectedCategory === "Barchasi" ? "Barcha maishiy texnikalar" : selectedCategory}
            </h2>
            <p className="results-counter">
              Topildi: <strong>{filteredProducts.length} ta</strong> zamonaviy qurilma
            </p>
          </div>

          <div className="sort-controls">
            <label htmlFor="sort-select">Saralash:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="custom-select"
            >
              <option value="popular">Ommabopligi bo'yicha</option>
              <option value="price-asc">Arzonroq narxdan</option>
              <option value="price-desc">Qimmatroq narxdan</option>
              <option value="rating">Yuqori reyting bo'yicha</option>
              <option value="discount">Katta chegirmalar</option>
            </select>
          </div>
        </div>

        <div className="catalog-layout-grid">
          {/* CHAP TOMON: FILTRLAR SIDEBAR */}
          <aside className="filters-sidebar">
            <div className="filter-card">
              <div className="filter-card-header">
                <h3>Filtrlar</h3>
                <button className="reset-filter-link" onClick={resetAllFilters}>
                  Tozalash
                </button>
              </div>

              {/* Narx oralig'i filtri */}
              <div className="filter-group">
                <label className="filter-group-title">
                  Maksimal narx:
                  <span className="price-range-val">{formatPrice(maxPriceFilter)}</span>
                </label>
                <input
                  type="range"
                  min="1500000"
                  max="30000000"
                  step="500000"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="price-slider"
                />
                <div className="slider-labels">
                  <span>1.5 mln</span>
                  <span>30 mln</span>
                </div>
              </div>

              {/* Brendlar bo'yicha filtr */}
              <div className="filter-group">
                <span className="filter-group-title">Ishlab chiqaruvchi (Brend)</span>
                <div className="brand-chips-grid">
                  {BRANDS.map((brand) => (
                    <button
                      key={brand}
                      className={`brand-chip ${selectedBrand === brand ? 'selected' : ''}`}
                      onClick={() => setSelectedBrand(brand)}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qo'shimcha shartlar (Checkbox) */}
              <div className="filter-group">
                <span className="filter-group-title">Maxsus takliflar</span>
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span>Faqat sotuvda borlari</span>
                </label>

                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={onlyDiscounts}
                    onChange={(e) => setOnlyDiscounts(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span>Chegirmadagi mahsulotlar</span>
                </label>
              </div>

              {/* Sevimlilar tezkor vidjeti */}
              <div className="sidebar-wishlist-promo">
                <div className="wishlist-promo-icon">❤️</div>
                <h4>Sevimlilar ro'yxati</h4>
                <p>Sizda hozir <strong>{favorites.length} ta</strong> saqlangan texnika mavjud.</p>
                <button
                  className="btn-outline-small"
                  onClick={() => setIsFavoritesOpen(true)}
                >
                  Ro'yxatni ochish
                </button>
              </div>
            </div>
          </aside>

          {/* O'NG TOMON: MAHSULOT KARTOCHKALARI GRIDI */}
          <div className="products-grid-container">
            {filteredProducts.length === 0 ? (
              <div className="empty-state-box">
                <div className="empty-icon">🔍</div>
                <h3>Hech qanday texnika topilmadi</h3>
                <p>Qidiruv so'zini o'zgartirib ko'ring yoki filtrlarni qayta tiklang.</p>
                <button className="btn-primary-hero" onClick={resetAllFilters}>
                  Barcha mahsulotlarni ko'rsatish
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    isFavorite={favorites.includes(product.id)}
                    isCompared={compareList.some((c) => c.id === product.id)}
                    inCartQuantity={
                      cart.find((c) => c.id === product.id)?.quantity || 0
                    }
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={addToCart}
                    onToggleCompare={toggleCompare}
                    onQuickView={setQuickViewProduct}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* AFZALLIKLAR BO'LIMI */}
      <section className="features-banner-section reveal-on-scroll">
        <div className="container features-grid">
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <div>
              <h4>100% Original Texnika</h4>
              <p>Barcha mahsulotlar rasmiy sertifikat va zavod kafolatiga ega</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💳</div>
            <div>
              <h4>0% Muddatli To'lov</h4>
              <p>Boshlang'ich to'lovsiz 12 oygacha bo'lib to'lash imkoniyati</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🛠️</div>
            <div>
              <h4>Bepul O'rnatish</h4>
              <p>Muzlatkich, kir yuvish mashinasi va TVlarni mutaxassislar o'rnatadi</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔄</div>
            <div>
              <h4>14 Kun Almashtirish</h4>
              <p>Mahsulot yoqmasa yoki nuqsoni bo'lsa tezkor almashtirib beramiz</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <div className="brand-logo footer-logo">
              <div className="logo-icon-box">⚡</div>
              <span className="logo-title">Tech<span className="accent">Nova</span></span>
            </div>
            <p className="footer-desc">
              O'zbekistondagi eng yirik zamonaviy maishiy texnika va aqlli uy jihozlari onlayn do'koni.
            </p>
          </div>
          <div className="footer-col">
            <h5>Kategoriyalar</h5>
            <ul>
              {CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id} onClick={() => { setSelectedCategory(cat.id); scrollToCatalog(); }}>
                  {cat.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Mijozlar uchun</h5>
            <ul>
              <li onClick={() => setIsFavoritesOpen(true)}>Sevimlilar ({favorites.length})</li>
              <li onClick={() => setIsCartOpen(true)}>Savatcha ({cartTotalCount})</li>
              <li onClick={() => setIsCompareOpen(true)}>Solishtirish ({compareList.length})</li>
              <li>Kafolat va servis markazlari</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Aloqa markazi</h5>
            <p className="footer-phone">+998 (71) 200-99-00</p>
            <p className="footer-address">Toshkent sh., Amir Temur shoh ko'chasi, 108-uy</p>
            <p className="footer-hours">Har kuni: 09:00 dan 22:00 gacha</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>© 2026 TechNova Maishiy Texnika Do'koni. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>

      {/* ========================================================================
          DRAWER 1: SEVIMLILAR (ИЗБРАННОЕ / WISHLIST) OYNASI
      ======================================================================== */}
      {isFavoritesOpen && (
        <div className="modal-backdrop" onClick={() => setIsFavoritesOpen(false)}>
          <div className="side-drawer drawer-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-group">
                <h3>❤️ Sevimlilar (Избранное)</h3>
                <span className="drawer-badge">{favoriteProducts.length} ta</span>
              </div>
              <button className="close-drawer-btn" onClick={() => setIsFavoritesOpen(false)}>✕</button>
            </div>

            <div className="drawer-body">
              {favoriteProducts.length === 0 ? (
                <div className="drawer-empty">
                  <div className="drawer-empty-icon">💔</div>
                  <h4>Sevimlilar ro'yxati bo'sh</h4>
                  <p>Yoqtirgan texnikalaringizdagi yurakcha belgisini bosing va keyinroq oson toping.</p>
                  <button
                    className="btn-primary-hero"
                    onClick={() => setIsFavoritesOpen(false)}
                  >
                    Mahsulotlarni tanlash
                  </button>
                </div>
              ) : (
                <div className="drawer-items-list">
                  {favoriteProducts.map((item) => (
                    <div key={item.id} className="drawer-product-item">
                      <img src={item.image} alt={item.name} />
                      <div className="drawer-item-info">
                        <span className="drawer-item-brand">{item.brand}</span>
                        <h4>{item.name}</h4>
                        <div className="drawer-item-price">{formatPrice(item.price)}</div>
                        <div className="drawer-item-actions">
                          <button
                            className="btn-mini-cart"
                            onClick={() => addToCart(item)}
                            disabled={!item.inStock}
                          >
                            {item.inStock ? "+ Savatchaga" : "Sotuvda yo'q"}
                          </button>
                          <button
                            className="btn-mini-remove"
                            onClick={() => toggleFavorite(item)}
                          >
                            O'chirish
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {favoriteProducts.length > 0 && (
              <div className="drawer-footer">
                <button
                  className="btn-full-width btn-secondary"
                  onClick={() => {
                    favoriteProducts.forEach((p) => {
                      if (p.inStock) addToCart(p);
                    });
                    setIsFavoritesOpen(false);
                    setIsCartOpen(true);
                  }}
                >
                  Barchasini savatchaga o'tkazish
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================
          DRAWER 2: SAVATCHA (CART) VA BUYURTMA BERISH OYNASI
      ======================================================================== */}
      {isCartOpen && (
        <div className="modal-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="side-drawer drawer-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-group">
                <h3>🛒 Savatcha</h3>
                <span className="drawer-badge">{cartTotalCount} dona</span>
              </div>
              <button className="close-drawer-btn" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <div className="drawer-empty">
                  <div className="drawer-empty-icon">🛍️</div>
                  <h4>Savatchangiz hozircha bo'sh</h4>
                  <p>Katalogdan kerakli maishiy texnikani tanlang va buyurtma bering.</p>
                  <button
                    className="btn-primary-hero"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Xaridni boshlash
                  </button>
                </div>
              ) : (
                <>
                  <div className="drawer-items-list">
                    {cart.map((item) => (
                      <div key={item.id} className="drawer-product-item">
                        <img src={item.image} alt={item.name} />
                        <div className="drawer-item-info">
                          <h4>{item.name}</h4>
                          <div className="drawer-item-price">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="quantity-controls-row">
                            <div className="qty-stepper">
                              <button onClick={() => updateCartQuantity(item.id, -1)}>−</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                            </div>
                            <button
                              className="btn-mini-remove"
                              onClick={() => removeFromCart(item.id)}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo-kod kiritish */}
                  <form className="promo-box" onSubmit={handleApplyPromo}>
                    <input
                      type="text"
                      placeholder="Promo-kod (TECHNOVA2026)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button type="submit">Qo'llash</button>
                  </form>

                  {/* Hisob-kitob xulosasi */}
                  <div className="cart-summary-card">
                    <div className="summary-row">
                      <span>Mahsulotlar qiymati:</span>
                      <span>{formatPrice(cartSubtotal)}</span>
                    </div>
                    {promoApplied && (
                      <div className="summary-row discount-row">
                        <span>Promo-kod chegirmasi (5%):</span>
                        <span>-{formatPrice(promoDiscountAmount)}</span>
                      </div>
                    )}
                    <div className="summary-row">
                      <span>Yetkazib berish:</span>
                      <span>{deliveryFee === 0 ? "Bepul 🎉" : formatPrice(deliveryFee)}</span>
                    </div>
                    <div className="summary-row total-row">
                      <span>Jami to'lov:</span>
                      <span>{formatPrice(cartFinalTotal)}</span>
                    </div>
                  </div>

                  {/* Tezkor buyurtma formasi */}
                  <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                    <h4>Buyurtmani rasmiylashtirish</h4>
                    <input
                      type="text"
                      placeholder="Ismingiz *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Telefon raqamingiz (+998 90 123-45-67) *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Yetkazib berish manzili"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                    <button type="submit" className="btn-full-width btn-primary-checkout">
                      Buyurtmani tasdiqlash • {formatPrice(cartFinalTotal)}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================
          MODAL 3: TEZKOR KO'RISH (QUICK VIEW) VA TEXNIK XUSUSIYATLAR
      ======================================================================== */}
      {quickViewProduct && (
        <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="center-modal quick-view-modal modal-pop-in" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-top" onClick={() => setQuickViewProduct(null)}>✕</button>
            <div className="quick-view-grid">
              <div className="qv-image-side">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
                <div className="qv-badges">
                  <span className="energy-badge">Energiya sinfi: {quickViewProduct.energyClass}</span>
                  <span className="warranty-badge">🛡️ {quickViewProduct.warranty}</span>
                </div>
              </div>
              <div className="qv-details-side">
                <span className="qv-brand">{quickViewProduct.brand} • {quickViewProduct.category}</span>
                <h2>{quickViewProduct.name}</h2>
                <div className="qv-rating-row">
                  <span>⭐ {quickViewProduct.rating}</span>
                  <span>({quickViewProduct.reviewsCount} ta xaridor sharhi)</span>
                </div>
                <p className="qv-description">{quickViewProduct.description}</p>

                <div className="qv-price-block">
                  <div className="qv-current-price">{formatPrice(quickViewProduct.price)}</div>
                  {quickViewProduct.oldPrice && (
                    <div className="qv-old-price">{formatPrice(quickViewProduct.oldPrice)}</div>
                  )}
                </div>

                <div className="qv-specs-table">
                  <h4>Asosiy texnik xususiyatlari:</h4>
                  {Object.entries(quickViewProduct.specs).map(([key, value]) => (
                    <div key={key} className="spec-line">
                      <span className="spec-key">{key}</span>
                      <span className="spec-val">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="qv-actions">
                  <button
                    className="btn-primary-hero"
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                  >
                    🛒 Savatchaga qo'shish
                  </button>
                  <button
                    className={`btn-fav-modal ${favorites.includes(quickViewProduct.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(quickViewProduct)}
                  >
                    {favorites.includes(quickViewProduct.id) ? "❤️ Sevimlilarda" : "🤍 Sevimlilarga"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================
          MODAL 4: TEXNIKALARNI SOLISHTIRISH (COMPARE MODAL)
      ======================================================================== */}
      {isCompareOpen && (
        <div className="modal-backdrop" onClick={() => setIsCompareOpen(false)}>
          <div className="center-modal compare-modal modal-pop-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3>⚖️ Texnikalarni solishtirish ({compareList.length}/3)</h3>
              <button className="close-drawer-btn" onClick={() => setIsCompareOpen(false)}>✕</button>
            </div>
            {compareList.length === 0 ? (
              <div className="drawer-empty">
                <p>Solishtirish uchun mahsulot kartochkasidagi ⚖️ tugmasini bosing.</p>
              </div>
            ) : (
              <div className="compare-table-wrapper">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>Parametrlar</th>
                      {compareList.map((item) => (
                        <th key={item.id}>
                          <img src={item.image} alt={item.name} className="compare-thumb" />
                          <div className="compare-title">{item.name}</div>
                          <button
                            className="btn-mini-remove"
                            onClick={() => toggleCompare(item)}
                          >
                            Olib tashlash
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Narxi</strong></td>
                      {compareList.map((item) => (
                        <td key={item.id} className="highlight-cell">{formatPrice(item.price)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td><strong>Brend</strong></td>
                      {compareList.map((item) => <td key={item.id}>{item.brand}</td>)}
                    </tr>
                    <tr>
                      <td><strong>Reyting</strong></td>
                      {compareList.map((item) => <td key={item.id}>⭐ {item.rating}</td>)}
                    </tr>
                    <tr>
                      <td><strong>Energiya sinfi</strong></td>
                      {compareList.map((item) => <td key={item.id}>{item.energyClass}</td>)}
                    </tr>
                    <tr>
                      <td><strong>Kafolat</strong></td>
                      {compareList.map((item) => <td key={item.id}>{item.warranty}</td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================
          MODAL 5: BUYURTMA MUVAFFAQIYATLI QABUL QILINDI
      ======================================================================== */}
      {orderSuccessModal && (
        <div className="modal-backdrop" onClick={() => setOrderSuccessModal(false)}>
          <div className="center-modal success-modal modal-pop-in" onClick={(e) => e.stopPropagation()}>
            <div className="success-checkmark">✅</div>
            <h2>Buyurtmangiz qabul qilindi!</h2>
            <p>
              Hurmatli <strong>{customerName}</strong>, operatorlarimiz 10 daqiqa ichida{" "}
              <strong>{customerPhone}</strong> raqamiga bog'lanib yetkazib berish vaqtini tasdiqlashadi.
            </p>
            <button
              className="btn-primary-hero"
              onClick={() => setOrderSuccessModal(false)}
            >
              Ajoyib, rahmat!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;