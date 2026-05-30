(function(){
  const root=document.documentElement;
  const lang=root.dataset.siteLang||root.lang||'en';
  const page=root.dataset.sitePage||'home';
  const siteRoot=root.dataset.siteRoot||'.';
  const params=new URLSearchParams(window.location.search);
  const savedTheme=localStorage.getItem('theme');
  if(savedTheme==='dark')root.classList.add('dark-theme');
  else if(savedTheme==='light')root.classList.add('light-theme');
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
    en:{features:'Features',privacy:'Privacy',contact:'Contact',switchLanguage:'\u0627\u0644\u0639\u0631\u0628\u064a\u0629',theme:'Toggle theme',actionHome:'Home',actionPolicy:'Privacy Policy'},
    ar:{features:'\u0627\u0644\u0645\u064a\u0632\u0627\u062a',privacy:'\u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629',contact:'\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',switchLanguage:'English',theme:'\u062a\u0628\u062f\u064a\u0644 \u0627\u0644\u0633\u0645\u0629',actionHome:'\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',actionPolicy:'\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629'}
  };
  const sunIcon='<svg class="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const moonIcon='<svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  function renderNav(){
    const nav=document.getElementById('site-nav');
    if(!nav)return;
    const t=labels[lang]||labels.en;
    const homeFile=lang==='ar'?'index_ar.html':'index.html';
    const policyFile=lang==='ar'?'privacy-policy/index_ar.html':'privacy-policy/index.html';
    const homeHref=sitePath(homeFile);
    const featuresHref=page==='home'?'#features':`${homeHref}#features`;
    const privacyAnchorHref=page==='home'?'#privacy':`${homeHref}#privacy`;
    const languageHref=lang==='ar'?'index.html?lang=en':'index_ar.html?lang=ar';
    const actionHref=page==='privacy'?homeHref:sitePath(policyFile);
    const actionText=page==='privacy'?t.actionHome:t.actionPolicy;
    nav.innerHTML=`<div class="nav-inner"><a href="${homeHref}" class="nav-logo">Calc<span>Editor</span></a><div class="nav-links"><a href="${featuresHref}" class="nav-link-features">${t.features}</a><a href="${privacyAnchorHref}" class="nav-link-privacy">${t.privacy}</a><a href="mailto:Omarahmadmzory@gmail.com" class="nav-link-contact">${t.contact}</a><a href="${languageHref}" class="nav-lang">${t.switchLanguage}</a><button id="theme-toggle" class="theme-toggle-btn" aria-label="${t.theme}">${sunIcon}${moonIcon}</button><span class="nav-action-slot"><a href="${actionHref}" class="nav-cta">${actionText}</a></span><button id="hamburger-toggle" class="hamburger-btn" aria-label="Menu"><svg class="hamburger-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line class="line-1" x1="3" y1="6" x2="21" y2="6"></line><line class="line-2" x1="3" y1="12" x2="21" y2="12"></line><line class="line-3" x1="3" y1="18" x2="21" y2="18"></line></svg></button></div></div><div id="mobile-menu" class="mobile-dropdown"><div class="mobile-theme-row"><span>${t.theme}</span><button id="theme-toggle-mobile" class="theme-toggle-btn" aria-label="${t.theme}">${sunIcon}${moonIcon}</button></div><a href="mailto:Omarahmadmzory@gmail.com" class="mobile-contact-link">${t.contact}</a></div>`;
  }
  function bindThemeToggle(){
    const toggleTheme=()=>{
      const isDark=root.classList.contains('dark-theme')||(!root.classList.contains('light-theme')&&window.matchMedia('(prefers-color-scheme: dark)').matches);
      if(isDark){root.classList.remove('dark-theme');root.classList.add('light-theme');localStorage.setItem('theme','light')}
      else{root.classList.remove('light-theme');root.classList.add('dark-theme');localStorage.setItem('theme','dark')}
    };
    const desktopBtn=document.getElementById('theme-toggle');
    const mobileBtn=document.getElementById('theme-toggle-mobile');
    if(desktopBtn)desktopBtn.addEventListener('click',toggleTheme);
    if(mobileBtn)mobileBtn.addEventListener('click',toggleTheme);
  }
  function bindHamburger(){
    const toggleBtn=document.getElementById('hamburger-toggle');
    const mobileMenu=document.getElementById('mobile-menu');
    if(!toggleBtn||!mobileMenu)return;
    toggleBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
      toggleBtn.classList.toggle('active');
    });
    document.addEventListener('click',(e)=>{
      if(!mobileMenu.contains(e.target)&&!toggleBtn.contains(e.target)){
        mobileMenu.classList.remove('open');
        toggleBtn.classList.remove('active');
      }
    });
  }
  routeLanguage();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{renderNav();bindThemeToggle();bindHamburger()});
  else{renderNav();bindThemeToggle();bindHamburger()}
})();
