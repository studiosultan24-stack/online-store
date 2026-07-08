/* ---------------------------------------------------------
   منتجات تجريبية — استبدلها ببيانات متجرك الفعلية
   تطوير حمزة
--------------------------------------------------------- */
const PRODUCTS = [
  {
    id:"p1", slug:"iphone-17", badge:true,
    title:"آيفون 17 256 جيجابايت - 5G مع فيس تايم",
    rating:4.6, reviews:"22.3K",
    price:54999, oldPrice:62999, discount:13,
    colors:["#2e3440","#6b7688"],
    delivery:"60 دقيقة"
  },
  {
    id:"p2", slug:"iphone-17-pro", badge:true,
    title:"آيفون 17 برو 256 جيجابايت - إصدار تيتانيوم",
    rating:4.7, reviews:"16.8K",
    price:74999, oldPrice:null, discount:null,
    colors:["#3a2f22","#8a7355"],
    delivery:"60 دقيقة"
  },
  {
    id:"p3", slug:"iphone-17-pro-max", badge:true,
    title:"آيفون 17 برو ماكس 512 جيجابايت - كاميرا احترافية",
    rating:4.8, reviews:"9.4K",
    price:89999, oldPrice:97999, discount:8,
    colors:["#c9ccd1","#8f95a0"],
    delivery:"60 دقيقة"
  },
  {
    id:"p4", slug:"galaxy-s26", badge:false,
    title:"سامسونج جالاكسي S26 256 جيجابايت - 5G",
    rating:4.5, reviews:"14.1K",
    price:42999, oldPrice:46999, discount:9,
    colors:["#1f2a44","#3d5a99"],
    delivery:"90 دقيقة"
  },
  {
    id:"p5", slug:"galaxy-s26-plus", badge:false,
    title:"سامسونج جالاكسي S26 بلس 256 جيجابايت - شاشة 6.7 بوصة",
    rating:4.6, reviews:"7.9K",
    price:53999, oldPrice:null, discount:null,
    colors:["#22303f","#4c6a80"],
    delivery:"اليوم"
  },
  {
    id:"p6", slug:"galaxy-s26-ultra", badge:true,
    title:"سامسونج جالاكسي S26 ألترا 512 جيجابايت - قلم S Pen",
    rating:4.8, reviews:"11.6K",
    price:64999, oldPrice:71999, discount:10,
    colors:["#2b2b2b","#565656"],
    delivery:"اليوم"
  },
];

/* svg بسيط لشكل جوال بألوان متدرجة مختلفة لكل شريحة كاروسيل */
function phoneSVG(c1, c2, angle){
  return `
  <svg viewBox="0 0 200 340" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g-${c1.slice(1)}-${c2.slice(1)}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <g transform="rotate(${angle} 100 170)">
      <rect x="20" y="10" width="160" height="320" rx="34" fill="url(#g-${c1.slice(1)}-${c2.slice(1)})" stroke="rgba(255,255,255,.15)" stroke-width="2"/>
      <rect x="34" y="26" width="132" height="288" rx="22" fill="rgba(10,12,16,.55)"/>
      <circle cx="100" cy="40" r="4" fill="rgba(255,255,255,.35)"/>
      <rect x="42" y="34" width="46" height="34" rx="12" fill="rgba(0,0,0,.35)"/>
      <circle cx="58" cy="50" r="9" fill="rgba(255,255,255,.25)"/>
      <circle cx="76" cy="50" r="9" fill="rgba(255,255,255,.15)"/>
      <rect x="60" y="300" width="80" height="6" rx="3" fill="rgba(255,255,255,.2)"/>
    </g>
  </svg>`;
}

function starsHTML(rating){
  const full = Math.round(rating);
  let s = "";
  for(let i=0;i<5;i++){ s += `<i class="bi ${i<full?'bi-star-fill':'bi-star'}"></i>`; }
  return s;
}

function fmt(n){ return n.toLocaleString('en-US'); }

function renderCard(p, idx){
  const carouselId = `car-${p.id}`;
  const [c1, c2] = p.colors;
  const svgFallbacks = [phoneSVG(c1,c2,-8), phoneSVG(c2,c1,0), phoneSVG(c1,c2,8)];

  /* كل منتج بيدور على 3 صور محلية باسم: images/<slug>-1.jpg .. -3.jpg
     لو الصورة مش موجودة، بيرجع تلقائيًا للرسمة البديلة (SVG) عن طريق جافاسكريبت بعد التحميل */
  // تطوير حمزة
  const items = svgFallbacks.map((_,i)=>{
    const imgPath = `images/${p.slug}-${i+1}.jpg`;
    return `
    <div class="carousel-item ${i===0?'active':''}">
      <div class="slide-inner">
        <img src="${imgPath}" alt="${p.title}" class="prod-img"
             data-slug="${p.slug}" data-c1="${c1}" data-c2="${c2}" data-idx="${i}">
      </div>
    </div>`;
  }).join("");

  const indicators = svgFallbacks.map((_,i)=>`
    <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${i}" class="${i===0?'active':''}" aria-current="${i===0?'true':'false'}"></button>
  `).join("");

  const priceBlock = p.oldPrice ? `
    <span class="price-now">${fmt(p.price)}<span class="curr">ج.م</span></span>
    <span class="price-old">${fmt(p.oldPrice)}</span>
    <span class="discount-pill">-${p.discount}%</span>
  ` : `<span class="price-now">${fmt(p.price)}<span class="curr">ج.م</span></span>`;

  return `
  <div class="col-sm-6 col-lg-4">
    <div class="product-card">
      <div class="card-media">
        ${p.badge ? '<span class="badge-best">أفضل المنتجات</span>' : ''}
        <button class="wish-btn" onclick="this.classList.toggle('active')"><i class="bi bi-heart-fill"></i></button>

        <div id="${carouselId}" class="carousel slide carousel-shell" data-bs-ride="carousel" data-bs-interval="${2600 + idx*300}">
          <div class="carousel-inner">${items}</div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
          <div class="carousel-indicators">${indicators}</div>
        </div>

        <button class="fab-add" title="إضافة سريعة للسلة"><i class="bi bi-plus-lg"></i></button>
      </div>

      <div class="card-body-store">
        <div class="prod-title">${p.title}</div>
        <div class="rating-row">
          <span class="stars">${starsHTML(p.rating)}</span>
          <span>(${p.reviews})</span>
          <span class="fw-bold text-light">${p.rating}</span>
        </div>
        <div class="price-row">${priceBlock}</div>
        <div class="ship-row">
          <span><i class="bi bi-truck ms-1"></i>توصيل مجاني</span>
          <span class="delivery-badge"><i class="bi bi-lightning-charge-fill"></i> خلال ${p.delivery}</span>
        </div>
      </div>
    </div>
  </div>`;
}

document.getElementById('productGrid').innerHTML = PRODUCTS.map(renderCard).join("");

// تطوير حمزة — لو الصورة الحقيقية مش موجودة، استبدلها بالرسمة البديلة بدل ما الصفحة تتكسر
document.querySelectorAll('.prod-img').forEach(img=>{
  img.addEventListener('error', ()=>{
    const c1 = img.dataset.c1, c2 = img.dataset.c2, idx = Number(img.dataset.idx);
    const angle = idx === 0 ? -8 : (idx === 1 ? 0 : 8);
    const colorsInOrder = idx === 1 ? [c2, c1] : [c1, c2];
    const fallback = document.createElement('div');
    fallback.className = 'svg-fallback';
    fallback.innerHTML = phoneSVG(colorsInOrder[0], colorsInOrder[1], angle);
    img.replaceWith(fallback);
  }, { once:true });
});

document.querySelectorAll('.chip').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
  });
});
