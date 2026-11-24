import React, { useState, useRef } from 'react';

// ============================================================================
// PRODUCT CARD COMPONENT — TECH NOVA SMART HOME & APPLIANCES
// ============================================================================
const ProductCard = ({
  product,
  index = 0,
  isFavorite = false,
  isCompared = false,
  inCartQuantity = 0,
  onToggleFavorite,
  onAddToCart,
  onToggleCompare,
  onQuickView,
  formatPrice
}) => {
  // ============================================================================
  // LOCAL UI & MOTION STATES
  // ============================================================================
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [heartPulse, setHeartPulse] = useState(false);
  const [cartAddedAnim, setCartAddedAnim] = useState(false);
  const [installmentMonths, setInstallmentMonths] = useState(12);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showAllMiniSpecs, setShowAllMiniSpecs] = useState(false);

  // ============================================================================
  // 3D TILT VA YORUG'LIK REFLEKSI (SPOTLIGHT MOTION) HANDLERLARI
  // ============================================================================
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Maksimal 5 graduslik silliq 3D burilish
    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`,
      transition: 'transform 0.1s ease-out'
    });

    setGlarePosition({
      x: glareX,
      y: glareY,
      opacity: 0.14
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
    });
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  // ============================================================================
  // INTERAKTIV TUGMA HANDLERLARI (ANIMATSIYALAR BILAN)
  // ============================================================================
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setHeartPulse(true);
    onToggleFavorite(product);
    setTimeout(() => setHeartPulse(false), 550);
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    onToggleCompare(product);
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    onQuickView(product);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    setCartAddedAnim(true);
    onAddToCart(product);
    setTimeout(() => setCartAddedAnim(false), 650);
  };

  const cycleInstallmentPlan = (e) => {
    e.stopPropagation();
    setInstallmentMonths((prev) => {
      if (prev === 12) return 6;
      if (prev === 6) return 3;
      return 12;
    });
  };

  // ============================================================================
  // HISOB-KITOBLAR (TEJALGAN SUMMA, OYLIK TO'LOV, XUSUSIYATLAR RO'YXATI)
  // ============================================================================
  const savedAmount = product.oldPrice ? product.oldPrice - product.price : 0;
  const monthlyPayment = Math.round(product.price / installmentMonths);

  const specEntries = product.specs ? Object.entries(product.specs) : [];
  const visibleSpecs = showAllMiniSpecs ? specEntries : specEntries.slice(0, 3);

  // Staggered kirish animatsiyasi uchun kechikish vaqti
  const animationDelay = `${Math.min(index * 65, 600)}ms`;

  // Reyting yulduzchalarini generatsiya qilish
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star-icon ${i < fullStars ? 'star-filled' : 'star-muted'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Energiya tejamkorlik sinfi rangi
  const getEnergyBadgeClass = (energyClass) => {
    if (!energyClass) return 'energy-standard';
    if (energyClass.includes('+++')) return 'energy-ultra';
    if (energyClass.includes('++')) return 'energy-high';
    return 'energy-good';
  };

  // ============================================================================
  // RENDER COMPONENT
  // ============================================================================
  return (
    <article
      ref={cardRef}
      className={`product-card reveal-on-scroll ${!product.inStock ? 'out-of-stock-card' : ''} ${
        isFavorite ? 'is-favorited-card' : ''
      }`}
      style={{
        ...tiltStyle,
        animationDelay
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleQuickViewClick}
    >
      {/* Kursor harakatiga ergashuvchi yorug'lik effekti */}
      <div
        className="card-spotlight-glare"
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.85), transparent 65%)`
        }}
      />

      {/* ======================================================================
          1. KARTOCHKA YUQORI QISMI: RASM, BADGE'LAR VA TEZKOR TUGMALAR
      ====================================================================== */}
      <div className="product-image-stage">
        {/* Chap yuqori burchakdagi holat belgilari (Chegirma / Yangilik / Energiya) */}
        <div className="product-badges-stack">
          {product.discount > 0 && (
            <span className="p-badge badge-discount">
              -{product.discount}% CHEGIRMA
            </span>
          )}
          {product.isNew && (
            <span className="p-badge badge-new">
              ✨ YANGI MODEL
            </span>
          )}
          {product.energyClass && (
            <span className={`p-badge badge-energy ${getEnergyBadgeClass(product.energyClass)}`}>
              ⚡ {product.energyClass}
            </span>
          )}
        </div>

        {/* O'ng yuqori burchak: Sevimlilar (Избранное) va Solishtirish tugmalari */}
        <div className="product-floating-actions">
          <button
            type="button"
            className={`card-circle-btn fav-btn ${isFavorite ? 'active' : ''} ${
              heartPulse ? 'heart-burst-anim' : ''
            }`}
            onClick={handleFavoriteClick}
            title={isFavorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
            aria-label="Sevimlilarga qo'shish"
          >
            <svg
              viewBox="0 0 24 24"
              fill={isFavorite ? '#ef4444' : 'none'}
              stroke={isFavorite ? '#ef4444' : 'currentColor'}
              strokeWidth="2.1"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {heartPulse && <span className="heart-ripple-ring"></span>}
          </button>

          <button
            type="button"
            className={`card-circle-btn compare-btn ${isCompared ? 'active' : ''}`}
            onClick={handleCompareClick}
            title={isCompared ? "Solishtirishdan olib tashlash" : "Solishtirishga qo'shish"}
            aria-label="Solishtirishga qo'shish"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>

          <button
            type="button"
            className="card-circle-btn quickview-circle-btn"
            onClick={handleQuickViewClick}
            title="Tezkor ko'rish va xususiyatlar"
            aria-label="Tezkor ko'rish"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>

        {/* Rasm yuklanayotganda Skeleton Shimmer */}
        {!imageLoaded && <div className="image-skeleton-shimmer" />}

        {/* Asosiy Mahsulot Rasmi */}
        <div className="product-img-wrapper">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`product-main-photo ${imageLoaded ? 'img-loaded' : ''} ${
              isHovered ? 'img-zoomed' : ''
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Hover bo'lganda pastdan chiquvchi Tezkor Ko'rish paneli */}
        <div className={`image-hover-overlay ${isHovered ? 'visible' : ''}`}>
          <button
            type="button"
            className="quick-view-bar-btn"
            onClick={handleQuickViewClick}
          >
            <span>🔍 Texnik xususiyatlarni ko'rish</span>
          </button>
        </div>

        {/* Sotuvda yo'q bo'lsa holat lentasi */}
        {!product.inStock && (
          <div className="sold-out-ribbon">
            <span>Vaqtincha sotuvda yo'q</span>
          </div>
        )}
      </div>

      {/* ======================================================================
          2. KARTOCHKA ASOSIY MA'LUMOTLAR QISMI
      ====================================================================== */}
      <div className="product-card-body">
        {/* Brend, Kategoriya va Sotuvda borligi */}
        <div className="product-meta-top">
          <div className="brand-tag-pill">
            <span className="brand-dot"></span>
            <span>{product.brand}</span>
          </div>
          <span className={`stock-indicator ${product.inStock ? 'in-stock' : 'no-stock'}`}>
            {product.inStock ? '● Sotuvda bor' : '○ Tugagan'}
          </span>
        </div>

        {/* Mahsulot Nomi */}
        <h3 className="product-card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Reyting va Sharhlar soni */}
        <div className="product-rating-strip">
          <div className="stars-group">{renderStars(product.rating)}</div>
          <span className="rating-numeric">{product.rating.toFixed(1)}</span>
          <span className="reviews-link">({product.reviewsCount} sharh)</span>
        </div>

        {/* Qisqa Texnik Xususiyatlar (Specs Mini Table) */}
        {visibleSpecs.length > 0 && (
          <div className="mini-specs-box" onClick={(e) => e.stopPropagation()}>
            {visibleSpecs.map(([specKey, specVal]) => (
              <div key={specKey} className="mini-spec-row">
                <span className="mini-spec-label">{specKey}:</span>
                <span className="mini-spec-dots"></span>
                <span className="mini-spec-value">{specVal}</span>
              </div>
            ))}
            {specEntries.length > 3 && (
              <button
                type="button"
                className="toggle-specs-btn"
                onClick={() => setShowAllMiniSpecs((prev) => !prev)}
              >
                {showAllMiniSpecs ? '▲ Qisqartirish' : `▼ Yana ${specEntries.length - 3} ta xususiyat`}
              </button>
            )}
          </div>
        )}

        {/* Kafolat eslatmasi */}
        <div className="warranty-strip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          <span>{product.warranty}</span>
        </div>

        {/* ====================================================================
            3. NARX, MUDDATLI TO'LOV VA SAVATCHAGA QO'SHISH BLOKI
        ==================================================================== */}
        <div className="product-card-footer">
          {/* Muddatli to'lov interaktiv vidjeti */}
          <div
            className="installment-pill-box"
            onClick={cycleInstallmentPlan}
            title="Muddatli to'lov oyini o'zgartirish uchun bosing (3 / 6 / 12 oy)"
          >
            <div className="installment-left">
              <span className="installment-badge">{installmentMonths} oy</span>
              <span className="installment-amount">
                {formatPrice(monthlyPayment)} <span>/ oyiga</span>
              </span>
            </div>
            <span className="installment-switch-hint">↻</span>
          </div>

          {/* Asosiy narx va chegirma */}
          <div className="price-action-row">
            <div className="price-column">
              {product.oldPrice && (
                <div className="old-price-line">
                  <span className="old-price-text">{formatPrice(product.oldPrice)}</span>
                  <span className="saved-pill">-{formatPrice(savedAmount)}</span>
                </div>
              )}
              <div className="current-price-text">{formatPrice(product.price)}</div>
            </div>

            {/* Savatchaga qo'shish tugmasi */}
            <button
              type="button"
              disabled={!product.inStock}
              onClick={handleAddToCartClick}
              className={`add-to-cart-main-btn ${cartAddedAnim ? 'btn-added-pulse' : ''} ${
                inCartQuantity > 0 ? 'has-items' : ''
              }`}
            >
              {!product.inStock ? (
                <span>Mavjud emas</span>
              ) : cartAddedAnim ? (
                <span className="btn-content-flex">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Qo'shildi!
                </span>
              ) : (
                <span className="btn-content-flex">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span>{inCartQuantity > 0 ? `Savatda (${inCartQuantity})` : "Savatga"}</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;