(function(){
  const root=document.documentElement;
  const lang=root.dataset.siteLang||root.lang||'en';
  const page=root.dataset.sitePage||'home';
  const siteRoot=root.dataset.siteRoot||'.';
  const params=new URLSearchParams(window.location.search);
  const savedTheme=localStorage.getItem('theme');
  function applyTheme(mode){
    // Two class-naming schemes are kept in sync: `dark-theme`/`light-theme`
    // (assets/site.css, existing production styling) and `cx-dark`/`cx-light`
    // (assets/css/site-design-system.css, S003). Only one pair is ever
    // present in production markup today, but keeping both synchronized
    // here means any future S005+ component built on the S003 tokens
    // already responds correctly to the existing toggle.
    root.classList.remove('dark-theme','light-theme','cx-dark','cx-light');
    if(mode==='dark')root.classList.add('dark-theme','cx-dark');
    else if(mode==='light')root.classList.add('light-theme','cx-light');
  }
  if(savedTheme==='dark'||savedTheme==='light')applyTheme(savedTheme);

  function siblingPath(targetLang){return targetLang==='ar'?'index_ar.html':'index.html'}
  function routeLanguage(){
    if(params.get('lang')===lang){localStorage.setItem('lang_explicit',lang);return}
    const explicit=localStorage.getItem('lang_explicit');
    if(explicit===lang)return;
    if(explicit==='ar'&&lang!=='ar'){window.location.replace(siblingPath('ar'));return}
    if(explicit==='en'&&lang!=='en'){window.location.replace(siblingPath('en'));return}
    if(lang!=='ar'){
      const isArabic=navigator.languages?navigator.languages.some(v=>v.toLowerCase().startsWith('ar')):(navigator.language&&navigator.language.toLowerCase().startsWith('ar'));
      if(isArabic)window.location.replace(siblingPath('ar'));
    }
  }
  function sitePath(path){return siteRoot==='.'?path:`${siteRoot}/${path}`}

  const labels={
    en:{
      home:'Home',features:'Features',privacyPolicy:'Privacy Policy',contact:'Contact',
      switchLanguage:'العربية',switchLanguageFull:'Switch to Arabic',
      theme:'Toggle theme',cta:'Get Early Access',menu:'Menu',closeMenu:'Close menu',
      primaryNav:'Primary'
    },
    ar:{
      home:'الرئيسية',features:'الميزات',privacyPolicy:'سياسة الخصوصية',contact:'تواصل معنا',
      switchLanguage:'English',switchLanguageFull:'التبديل إلى الإنجليزية',
      theme:'تبديل السمة',cta:'طلب الوصول المبكر',menu:'القائمة',closeMenu:'إغلاق القائمة',
      primaryNav:'التنقل الرئيسي'
    }
  };

  const sunIcon='<svg class="cx-theme-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const moonIcon='<svg class="cx-theme-icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const menuIcon='<span class="cx-menu-toggle__bar"></span><span class="cx-menu-toggle__bar"></span><span class="cx-menu-toggle__bar"></span>';

  function routes(){
    const t=labels[lang]||labels.en;
    const homeHref=sitePath(lang==='ar'?'index_ar.html':'index.html');
    const privacyPolicyHref=sitePath(lang==='ar'?'privacy-policy/index_ar.html':'privacy-policy/index.html');
    const featuresHref=page==='home'?'#features':`${homeHref}#features`;
    const ctaHref=page==='home'?'#beta-modal':`${homeHref}#beta-modal`;
    const languageHref=lang==='ar'?'index.html?lang=en':'index_ar.html?lang=ar';
    return {t,homeHref,privacyPolicyHref,featuresHref,ctaHref,languageHref};
  }

  function navLinksMarkup(r,variant){
    const t=r.t;
    const linkClass=variant==='mobile'?'cx-mobile-panel__link':'cx-site-nav__link';
    const current=(cond)=>cond?' aria-current="page"':'';
    return `
      <a href="${r.homeHref}" class="${linkClass}"${current(page==='home')}>${t.home}</a>
      <a href="${r.featuresHref}" class="${linkClass}">${t.features}</a>
      <a href="${r.privacyPolicyHref}" class="${linkClass}"${current(page==='privacy')}>${t.privacyPolicy}</a>
      <a href="mailto:Omarahmadmzory@gmail.com" class="${linkClass}">${t.contact}</a>`;
  }

  function renderHeader(){
    const mount=document.getElementById('site-header');
    if(!mount)return;
    const r=routes();
    const t=r.t;
    mount.className='cx-site-header';
    mount.innerHTML=`
      <div class="cx-site-header__inner">
        <a href="${r.homeHref}" class="cx-site-header__logo">Calc<span class="cx-site-header__logo-accent">Editor</span></a>
        <nav class="cx-site-nav" aria-label="${t.primaryNav}">
          <ul class="cx-site-nav__list">
            ${navLinksMarkup(r,'desktop').split('\n').filter(Boolean).map(l=>`<li>${l.trim()}</li>`).join('')}
          </ul>
        </nav>
        <div class="cx-site-header__actions">
          <a href="${r.languageHref}" class="cx-lang-switch" aria-label="${t.switchLanguageFull}">${t.switchLanguage}</a>
          <button type="button" id="theme-toggle" class="cx-icon-btn" aria-label="${t.theme}">${sunIcon}${moonIcon}</button>
          <a href="${r.ctaHref}" class="cx-btn cx-btn--primary cx-site-header__cta">${t.cta}</a>
          <button type="button" id="menu-toggle" class="cx-menu-toggle" aria-label="${t.menu}" aria-expanded="false" aria-controls="mobile-menu-panel">${menuIcon}</button>
        </div>
      </div>
      <div id="mobile-menu-panel" class="cx-mobile-panel" hidden>
        <nav class="cx-mobile-panel__list" aria-label="${t.primaryNav}">
          ${navLinksMarkup(r,'mobile')}
        </nav>
        <div class="cx-mobile-panel__row">
          <span>${t.theme}</span>
          <button type="button" id="theme-toggle-mobile" class="cx-icon-btn" aria-label="${t.theme}">${sunIcon}${moonIcon}</button>
        </div>
        <div class="cx-mobile-panel__row">
          <a href="${r.languageHref}" class="cx-lang-switch" aria-label="${t.switchLanguageFull}">${t.switchLanguage}</a>
        </div>
        <a href="${r.ctaHref}" class="cx-btn cx-btn--primary cx-mobile-panel__cta">${t.cta}</a>
      </div>`;
  }

  function renderFooter(){
    const mount=document.getElementById('site-footer');
    if(!mount)return;
    const r=routes();
    const t=r.t;
    const brandTagline=lang==='ar'?'محرّر الرياضيات العلمي':'The Scientific Math Editor';
    const copy=lang==='ar'
      ?'&copy; ٢٠٢٦ عمر أ. الكوردي (Omar A. Kurdi). جميع الحقوق محفوظة.'
      :'&copy; 2026 Omar A. Kurdi (O.A.Kurdi). All rights reserved.';
    mount.className='cx-site-footer';
    mount.innerHTML=`
      <div class="cx-site-footer__inner">
        <div>
          <div class="cx-site-footer__brand">Calc<span class="cx-site-footer__brand-accent">Editor</span> &nbsp;&mdash;&nbsp; ${brandTagline}</div>
          <div class="cx-site-footer__copy">${copy}</div>
        </div>
        <div class="cx-site-footer__links">
          <a href="${r.homeHref}">${t.home}</a>
          <a href="${r.privacyPolicyHref}">${t.privacyPolicy}</a>
          <a href="mailto:Omarahmadmzory@gmail.com">${t.contact}</a>
        </div>
      </div>`;
  }

  function bindThemeToggle(){
    const toggleTheme=()=>{
      const isDark=root.classList.contains('dark-theme')||(!root.classList.contains('light-theme')&&window.matchMedia('(prefers-color-scheme: dark)').matches);
      applyTheme(isDark?'light':'dark');
      localStorage.setItem('theme',isDark?'light':'dark');
    };
    const desktopBtn=document.getElementById('theme-toggle');
    const mobileBtn=document.getElementById('theme-toggle-mobile');
    if(desktopBtn)desktopBtn.addEventListener('click',toggleTheme);
    if(mobileBtn)mobileBtn.addEventListener('click',toggleTheme);
  }

  function bindMobileMenu(){
    const toggleBtn=document.getElementById('menu-toggle');
    const panel=document.getElementById('mobile-menu-panel');
    if(!toggleBtn||!panel)return;

    function isOpen(){return toggleBtn.getAttribute('aria-expanded')==='true'}

    function openMenu(){
      panel.hidden=false;
      toggleBtn.setAttribute('aria-expanded','true');
      document.addEventListener('keydown',onKeydown);
      document.addEventListener('click',onOutsideClick,true);
    }
    function closeMenu(restoreFocus){
      panel.hidden=true;
      toggleBtn.setAttribute('aria-expanded','false');
      document.removeEventListener('keydown',onKeydown);
      document.removeEventListener('click',onOutsideClick,true);
      if(restoreFocus)toggleBtn.focus();
    }
    function onKeydown(e){
      if(e.key==='Escape'||e.key==='Esc')closeMenu(true);
    }
    function onOutsideClick(e){
      if(!panel.contains(e.target)&&!toggleBtn.contains(e.target))closeMenu(false);
    }

    toggleBtn.addEventListener('click',()=>{
      if(isOpen())closeMenu(false);
      else openMenu();
    });
    // Close after choosing a same-site destination inside the panel;
    // let mailto: / same-page anchors navigate normally without a
    // focus fight, since the browser is about to move focus anyway.
    panel.addEventListener('click',(e)=>{
      const link=e.target.closest('a');
      if(link)closeMenu(false);
    });
  }

  routeLanguage();
  function init(){renderHeader();renderFooter();bindThemeToggle();bindMobileMenu()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
