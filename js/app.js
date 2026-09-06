/* =====================================================================
   Meta Tag Generator Pro — app.js
   Build and live-preview Open Graph / Twitter / SEO meta tags with
   real Google, X and generic link-preview mockups.
   Classic script (no modules). Depends on window.WUS (core.js).
   ===================================================================== */
(function () {
  'use strict';

  var WUS = window.WUS;
  var STORE_KEY = 'metatags.state';

  var TITLE_LIMIT = 60;
  var TITLE_WARN = 50;
  var DESC_LIMIT = 160;
  var DESC_WARN = 145;

  /* ----------------------------- DOM refs ---------------------------- */
  var fTitle          = document.getElementById('fTitle');
  var fDescription     = document.getElementById('fDescription');
  var fSiteName        = document.getElementById('fSiteName');
  var fCanonical       = document.getElementById('fCanonical');
  var fImage           = document.getElementById('fImage');
  var fOgType          = document.getElementById('fOgType');
  var fTwitterCard     = document.getElementById('fTwitterCard');
  var fThemeColor      = document.getElementById('fThemeColor');
  var fThemeColorHex   = document.getElementById('fThemeColorHex');
  var fFavicon         = document.getElementById('fFavicon');

  var titleCount = document.getElementById('titleCount');
  var titleWarn  = document.getElementById('titleWarn');
  var descCount  = document.getElementById('descCount');
  var descWarn   = document.getElementById('descWarn');

  var googleFavicon         = document.getElementById('googleFavicon');
  var googleFaviconFallback = document.getElementById('googleFaviconFallback');
  var googleSiteName        = document.getElementById('googleSiteName');
  var googleBreadcrumb      = document.getElementById('googleBreadcrumb');
  var googleTitle           = document.getElementById('googleTitle');
  var googleDesc            = document.getElementById('googleDesc');

  var twitterCard           = document.getElementById('twitterCard');
  var twitterImage          = document.getElementById('twitterImage');
  var twitterImageFallback  = document.getElementById('twitterImageFallback');
  var twitterDomain         = document.getElementById('twitterDomain');
  var twitterTitle          = document.getElementById('twitterTitle');
  var twitterDesc           = document.getElementById('twitterDesc');

  var linkImage         = document.getElementById('linkImage');
  var linkImageFallback = document.getElementById('linkImageFallback');
  var linkDomain        = document.getElementById('linkDomain');
  var linkTitle         = document.getElementById('linkTitle');
  var linkDesc          = document.getElementById('linkDesc');

  var snippetOutput   = document.getElementById('snippetOutput');
  var themeChipSwatch = document.getElementById('themeChipSwatch');
  var themeChipHex    = document.getElementById('themeChipHex');

  var btnExample = document.getElementById('btnExample');
  var btnClear   = document.getElementById('btnClear');
  var btnCopy    = document.getElementById('btnCopy');

  var lastSnippet = '';

  /* =================================================================
     HELPERS
     ================================================================= */
  var HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

  function getHost(urlStr) {
    if (!urlStr) return null;
    try {
      var u = new URL(urlStr);
      return u.hostname.replace(/^www\./i, '');
    } catch (e) {
      return null;
    }
  }

  function buildBreadcrumb(urlStr) {
    if (!urlStr) return '';
    try {
      var u = new URL(urlStr);
      var host = u.hostname.replace(/^www\./i, '');
      var segments = u.pathname.split('/').filter(Boolean).map(function (s) {
        try { return decodeURIComponent(s); } catch (e2) { return s; }
      });
      return [host].concat(segments).join(' › ');
    } catch (e) {
      return '';
    }
  }

  /* Mimic Google's visual truncation: cut at the limit, then back off
     to the last whole word so the ellipsis doesn't split mid-word. */
  function truncateVisual(text, limit) {
    if (!text) return '';
    if (text.length <= limit) return text;
    var slice = text.slice(0, limit);
    var lastSpace = slice.lastIndexOf(' ');
    if (lastSpace > limit * 0.55) slice = slice.slice(0, lastSpace);
    return slice.replace(/[\s,.;:\-–—]+$/, '') + '…';
  }

  function domainOrFallback(canonical, siteName) {
    var host = getHost(canonical.value.trim());
    if (host) return host;
    if (siteName) return siteName;
    return 'example.com';
  }

  function setCounter(el, warnEl, len, limit, warnAt) {
    el.textContent = len + ' / ' + limit;
    el.classList.remove('counter--ok', 'counter--warn', 'counter--danger');
    if (len === 0) {
      warnEl.textContent = '';
    } else if (len > limit) {
      el.classList.add('counter--danger');
      warnEl.textContent = 'Likely to be truncated';
    } else if (len >= warnAt) {
      el.classList.add('counter--warn');
      warnEl.textContent = 'Approaching the limit';
    } else {
      el.classList.add('counter--ok');
      warnEl.textContent = '';
    }
  }

  /* Wire an <img> + fallback <div> pair: attempts to load `url`, shows
     the fallback if the url is empty or the image fails to load. */
  function bindImage(imgEl, fallbackEl, url) {
    var value = (url || '').trim();
    if (!value) {
      imgEl.hidden = true;
      imgEl.removeAttribute('src');
      fallbackEl.hidden = false;
      return;
    }
    fallbackEl.hidden = true;
    imgEl.hidden = false;
    imgEl.onerror = function () {
      imgEl.hidden = true;
      fallbackEl.hidden = false;
    };
    imgEl.onload = function () {
      imgEl.hidden = false;
      fallbackEl.hidden = true;
    };
    if (imgEl.src !== value) imgEl.src = value;
  }

  /* =================================================================
     RENDER — previews
     ================================================================= */
  function render() {
    var title = fTitle.value.trim();
    var desc = fDescription.value.trim();
    var siteName = fSiteName.value.trim();
    var canonical = fCanonical.value.trim();
    var image = fImage.value.trim();
    var favicon = fFavicon.value.trim();
    var twitterCardType = fTwitterCard.value;
    var host = getHost(canonical) || 'example.com';

    /* --- counters --- */
    setCounter(titleCount, titleWarn, title.length, TITLE_LIMIT, TITLE_WARN);
    setCounter(descCount, descWarn, desc.length, DESC_LIMIT, DESC_WARN);

    /* --- Google preview --- */
    googleSiteName.textContent = siteName || host;
    googleBreadcrumb.textContent = buildBreadcrumb(canonical) || host;
    googleTitle.textContent = title ? truncateVisual(title, TITLE_LIMIT) : 'Your page title will appear here';
    googleDesc.textContent = desc ? truncateVisual(desc, DESC_LIMIT) : 'Your meta description will appear here once you start typing above.';
    bindImage(googleFavicon, googleFaviconFallback, favicon);

    /* --- Twitter / X card --- */
    twitterCard.setAttribute('data-card', twitterCardType);
    twitterDomain.textContent = host;
    twitterTitle.textContent = title || 'Your page title will appear here';
    twitterDesc.textContent = desc || 'Your meta description will appear here.';
    bindImage(twitterImage, twitterImageFallback, image);

    /* --- Generic link-preview card --- */
    linkDomain.textContent = (siteName || host).toUpperCase();
    linkTitle.textContent = title || 'Your page title will appear here';
    linkDesc.textContent = desc || 'Your meta description will appear here.';
    bindImage(linkImage, linkImageFallback, image);

    /* --- theme chip --- */
    var hex = fThemeColorHex.value.trim();
    if (HEX_RE.test(hex)) {
      themeChipSwatch.style.background = hex;
      themeChipHex.textContent = hex;
    }

    buildSnippet();
  }

  /* =================================================================
     SNIPPET GENERATION
     ================================================================= */
  function tag(str) { return WUS.escapeHtml(str); }

  function buildSnippet() {
    var title = fTitle.value.trim();
    var desc = fDescription.value.trim();
    var siteName = fSiteName.value.trim();
    var canonical = fCanonical.value.trim();
    var image = fImage.value.trim();
    var ogType = fOgType.value;
    var twitterCardType = fTwitterCard.value;
    var favicon = fFavicon.value.trim();
    var hex = fThemeColorHex.value.trim();
    var themeColor = HEX_RE.test(hex) ? hex : fThemeColor.value;

    var lines = [];

    if (title) lines.push('<title>' + tag(title) + '</title>');
    if (desc) lines.push('<meta name="description" content="' + tag(desc) + '">');
    if (canonical) lines.push('<link rel="canonical" href="' + tag(canonical) + '">');

    lines.push('');
    lines.push('<!-- Open Graph -->');
    if (title) lines.push('<meta property="og:title" content="' + tag(title) + '">');
    if (desc) lines.push('<meta property="og:description" content="' + tag(desc) + '">');
    if (image) lines.push('<meta property="og:image" content="' + tag(image) + '">');
    if (canonical) lines.push('<meta property="og:url" content="' + tag(canonical) + '">');
    lines.push('<meta property="og:type" content="' + tag(ogType) + '">');
    if (siteName) lines.push('<meta property="og:site_name" content="' + tag(siteName) + '">');

    lines.push('');
    lines.push('<!-- Twitter -->');
    lines.push('<meta name="twitter:card" content="' + tag(twitterCardType) + '">');
    if (title) lines.push('<meta name="twitter:title" content="' + tag(title) + '">');
    if (desc) lines.push('<meta name="twitter:description" content="' + tag(desc) + '">');
    if (image) lines.push('<meta name="twitter:image" content="' + tag(image) + '">');

    lines.push('');
    lines.push('<!-- Misc -->');
    lines.push('<meta name="theme-color" content="' + tag(themeColor) + '">');
    if (favicon) lines.push('<link rel="icon" href="' + tag(favicon) + '">');

    var result = lines.join('\n').replace(/^\n+/, '');
    lastSnippet = result;
    snippetOutput.textContent = result;
  }

  /* =================================================================
     ACTIONS
     ================================================================= */
  function copySnippet() {
    if (!lastSnippet.trim()) { WUS.toast('Nothing to copy yet', 'error'); return; }
    WUS.copy(lastSnippet, 'Meta tags copied to clipboard');
  }

  /* mod+c is registered as a global shortcut for "copy the generated
     snippet", but the page is full of text inputs. Without this guard,
     pressing Ctrl/Cmd+C to copy a normal text selection (e.g. some text
     you selected inside the Page Title field) would be hijacked and
     silently replaced with the full meta tag snippet instead. If the
     user has an active selection, copy that selection like the browser
     normally would; only fall back to the snippet when nothing is
     selected. */
  function copySnippetOrSelection() {
    var active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') &&
        typeof active.selectionStart === 'number' && active.selectionStart !== active.selectionEnd) {
      WUS.copy(active.value.slice(active.selectionStart, active.selectionEnd), 'Selection copied to clipboard');
      return;
    }
    var sel = window.getSelection ? window.getSelection().toString() : '';
    if (sel) { WUS.copy(sel, 'Selection copied to clipboard'); return; }
    copySnippet();
  }

  var EXAMPLE = {
    title: '10 Proven Strategies to Grow Your SaaS in 2026',
    description: 'Discover ten actionable, data-backed strategies to grow your SaaS business faster in 2026 — from onboarding tweaks to pricing experiments that compound over time.',
    siteName: 'GrowthLoop Blog',
    canonical: 'https://growthloop.example.com/blog/saas-growth-strategies-2026',
    image: 'https://images.growthloop.example.com/og/saas-growth-2026.jpg',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    themeColor: '#6366f1',
    favicon: '/favicon.ico'
  };

  function loadExample() {
    fTitle.value = EXAMPLE.title;
    fDescription.value = EXAMPLE.description;
    fSiteName.value = EXAMPLE.siteName;
    fCanonical.value = EXAMPLE.canonical;
    fImage.value = EXAMPLE.image;
    fOgType.value = EXAMPLE.ogType;
    fTwitterCard.value = EXAMPLE.twitterCard;
    fThemeColor.value = EXAMPLE.themeColor;
    fThemeColorHex.value = EXAMPLE.themeColor;
    fFavicon.value = EXAMPLE.favicon;
    render();
    persist();
    WUS.toast('Example loaded');
  }

  function clearAll() {
    fTitle.value = '';
    fDescription.value = '';
    fSiteName.value = '';
    fCanonical.value = '';
    fImage.value = '';
    fOgType.value = 'website';
    fTwitterCard.value = 'summary_large_image';
    fThemeColor.value = '#6366f1';
    fThemeColorHex.value = '#6366f1';
    fFavicon.value = '';
    render();
    WUS.store.remove(STORE_KEY);
    fTitle.focus();
    WUS.toast('Cleared');
  }

  /* =================================================================
     PERSISTENCE
     ================================================================= */
  function persist() {
    WUS.store.set(STORE_KEY, {
      title: fTitle.value,
      description: fDescription.value,
      siteName: fSiteName.value,
      canonical: fCanonical.value,
      image: fImage.value,
      ogType: fOgType.value,
      twitterCard: fTwitterCard.value,
      themeColor: fThemeColorHex.value,
      favicon: fFavicon.value
    });
  }
  var persistDebounced = WUS.debounce(persist, 300);
  var renderDebounced = WUS.debounce(render, 60);

  function restore() {
    var saved = WUS.store.get(STORE_KEY, null);
    if (!saved) return;
    if (typeof saved.title === 'string') fTitle.value = saved.title;
    if (typeof saved.description === 'string') fDescription.value = saved.description;
    if (typeof saved.siteName === 'string') fSiteName.value = saved.siteName;
    if (typeof saved.canonical === 'string') fCanonical.value = saved.canonical;
    if (typeof saved.image === 'string') fImage.value = saved.image;
    if (saved.ogType) fOgType.value = saved.ogType;
    if (saved.twitterCard) fTwitterCard.value = saved.twitterCard;
    if (saved.themeColor && HEX_RE.test(saved.themeColor)) {
      fThemeColor.value = saved.themeColor;
      fThemeColorHex.value = saved.themeColor;
    }
    if (typeof saved.favicon === 'string') fFavicon.value = saved.favicon;
  }

  /* =================================================================
     THEME COLOR SYNC
     ================================================================= */
  fThemeColor.addEventListener('input', function () {
    fThemeColorHex.value = fThemeColor.value;
    render();
    persistDebounced();
  });
  fThemeColorHex.addEventListener('input', function () {
    var v = fThemeColorHex.value.trim();
    if (HEX_RE.test(v)) fThemeColor.value = v.length === 4 ? expandHex(v) : v;
    render();
    persistDebounced();
  });
  function expandHex(short) {
    var m = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(short);
    if (!m) return short;
    return '#' + m[1] + m[1] + m[2] + m[2] + m[3] + m[3];
  }

  /* =================================================================
     SHORTCUTS HELP MODAL
     ================================================================= */
  var helpBackdrop = document.getElementById('helpBackdrop');
  var helpClose    = document.getElementById('helpClose');
  var shortcutRows = document.getElementById('shortcutRows');

  var SHORTCUTS = [
    { keys: ['mod', 'C'], desc: 'Copy generated meta tags' },
    { keys: ['?'], desc: 'Show this help' },
    { keys: ['Esc'], desc: 'Close dialog' }
  ];

  function buildShortcutTable() {
    var html = '';
    SHORTCUTS.forEach(function (s) {
      var kbds = s.keys.map(function (k) { return '<kbd>' + WUS.escapeHtml(k) + '</kbd>'; }).join('');
      html += '<tr><td>' + WUS.escapeHtml(s.desc) + '</td><td>' + kbds + '</td></tr>';
    });
    shortcutRows.innerHTML = html;
  }

  function openHelp() { helpBackdrop.hidden = false; helpClose.focus(); }
  function closeHelp() { helpBackdrop.hidden = true; }

  helpClose.addEventListener('click', closeHelp);
  helpBackdrop.addEventListener('click', function (e) {
    if (e.target === helpBackdrop) closeHelp();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !helpBackdrop.hidden) closeHelp();
  });

  var helpBtns = document.querySelectorAll('[data-shortcut-help]');
  for (var i = 0; i < helpBtns.length; i++) helpBtns[i].addEventListener('click', openHelp);

  /* =================================================================
     WIRING
     ================================================================= */
  var liveFields = [fTitle, fDescription, fSiteName, fCanonical, fImage, fFavicon];
  liveFields.forEach(function (el) {
    el.addEventListener('input', function () {
      renderDebounced();
      persistDebounced();
    });
  });
  [fOgType, fTwitterCard].forEach(function (el) {
    el.addEventListener('change', function () {
      render();
      persist();
    });
  });

  btnExample.addEventListener('click', loadExample);
  btnClear.addEventListener('click', clearAll);
  btnCopy.addEventListener('click', copySnippet);
  googleTitle.addEventListener('click', function (e) { e.preventDefault(); });

  WUS.registerShortcut('mod+c', function () { copySnippetOrSelection(); }, 'Copy generated meta tags');
  WUS.registerShortcut('?', function () { openHelp(); }, 'Show shortcuts');

  /* =================================================================
     INIT
     ================================================================= */
  buildShortcutTable();
  restore();
  render();
})();
