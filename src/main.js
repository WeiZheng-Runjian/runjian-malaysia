import $ from 'jquery';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './local.css';
import { siteConfig } from './site-config.js';

window.$ = window.jQuery = $;
window.Swiper = Swiper;
window.isFrontEnv = () => true;
window.addEvent = (name, fn) => window.addEventListener(name, fn);
const homeLink = document.querySelector('a.logoImg');
const siteRoot = new URL('.', new URL(homeLink?.getAttribute('href') || './index.html', location.href));
window.runjianURL = path => new URL(path, siteRoot).href;
function initializePresentation(callback) {
  // Legacy shared scripts also register sliders for sections absent on this page.
  const selectors = [...callback.toString().matchAll(/new Swiper\(['"]([^'"]+)['"]/g)].map(match => match[1]);
  if (selectors.some(selector => !document.querySelector(selector)?.querySelector('.swiper-slide'))) return;
  callback(Swiper);
}
const dependencies = [];
window.$require = (names, callback) => dependencies.push(() => initializePresentation(callback));
$.fn.hoverDelay = function ({ hoverEvent, outEvent }) {
  return this.on('mouseenter', function () { hoverEvent?.call(this); })
    .on('mouseleave', function () { outEvent?.call(this); });
};
// The source's presentation scripts register jQuery-ready handlers; release them
// together once all local vendor scripts and page-specific scripts are loaded.
$.holdReady(true);
const scripts = JSON.parse(document.querySelector('#local-presentation-scripts')?.textContent || '[]');
for (const src of [...new Set(scripts)]) {
  await new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => { console.error(`Presentation script failed: ${src}`); resolve(); };
    document.body.append(script);
  });
}
document.querySelectorAll('.swiper,.swiper-container,.xg_news,.case_right,.case_left').forEach(el => { if (!el.querySelector(':scope > .swiper-wrapper')) { const wrapper = document.createElement('div'); wrapper.className = 'swiper-wrapper'; while(el.firstChild) wrapper.append(el.firstChild); el.append(wrapper); [...wrapper.children].forEach(child=>child.classList.add('swiper-slide')); } });
window.Swiper = Swiper;
window.$require = (names, callback) => initializePresentation(callback);
for (const initialize of dependencies) initialize();
$.holdReady(false);

for (const video of document.querySelectorAll('video')) {
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'metadata';
  new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) { video.play().catch(() => {}); }
    else video.pause();
  }, { rootMargin: '150px' }).observe(video);
}

// Make source controls keyboard-operable without altering their appearance.
for (const el of document.querySelectorAll('.hyf_li,.topLi,.nav-button,.closes,.souso,.guanbi,.tc_but,.p_btnCon')) {
  if (!['A', 'BUTTON', 'INPUT'].includes(el.tagName)) {
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); el.click(); }
    });
  }
}
$('.topLi').on('click focus', function () { $(this).trigger('mouseenter'); });
$('.closes').on('click', () => $('.header .topNav').removeClass('active'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    $('.header .topNav').removeClass('active');
    $('.guanbi').trigger('click');
    $('#c_effect_138-17580769568930').hide();
  }
});

// Local search replaces the original CMS search endpoint on static hosting.
function search(value) {
  const url = new URL('globalSearch.html', siteRoot);
  url.searchParams.set('keywords', value.trim());
  location.href = url.href;
}
document.addEventListener('click', (event) => {
  const button = event.target.closest('.p_btnCon');
  if (button) { event.preventDefault(); search(button.closest('[id]')?.querySelector('input:not([type=hidden])')?.value || document.querySelector('.p_inputCon input')?.value || ''); }
}, true);
for (const input of document.querySelectorAll('.p_inputCon input')) {
  input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); search(input.value); } });
}
if (location.pathname.endsWith('/globalSearch.html')) {
  const query = new URLSearchParams(location.search).get('keywords') || '';
  const section = document.createElement('section');
  section.className = 'local-search-results w1440';
  const heading = document.createElement('h1'); heading.textContent = query ? `Search results for “${query}”` : 'Search Runjian';
  section.append(heading);
  const form = document.createElement('form');
  const input = document.createElement('input'); input.type = 'search'; input.value = query; input.placeholder = 'Search products, solutions and news'; input.setAttribute('aria-label', 'Search the site');
  const button = document.createElement('button');button.textContent = 'Search';
  form.append(input,button);form.addEventListener('submit',event=>{event.preventDefault();search(input.value);});section.append(form);
  const index = await fetch(new URL('search-index.json', siteRoot)).then(r => r.json());
  const matches = query ? index.filter(page => !page.url.includes('globalSearch') && `${page.title} ${page.text}`.toLowerCase().includes(query.toLowerCase())) : [];
  const count = document.createElement('p');count.textContent = query ? `${matches.length} pages found` : 'Enter a keyword to explore the site.';section.append(count);
  for (const page of matches) {
    const article = document.createElement('article');const a = document.createElement('a');a.href = new URL(page.url,siteRoot);a.textContent = page.title;
    article.append(a);section.append(article);
  }
  const header = document.querySelector('#c_grid-116273709439191');
  if (header) header.after(section);else document.querySelector('.main')?.prepend(section);
}

// Keep enquiries on this site; never submit visitor information to the source CMS.
for (const form of document.forms) {
  form.removeAttribute('action');
  const submit = (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input:not([type=hidden]),textarea')].filter(i => i.type !== 'submit');
    fields.forEach(field => { field.required = true; });
    if (!form.reportValidity()) return;
    let status = form.querySelector('.local-form-status');
    if (!status) { status = document.createElement('p'); status.className = 'local-form-status'; status.setAttribute('role', 'status');form.append(status); }
    if (!siteConfig.email) {
      status.textContent = 'Malaysia contact details are being confirmed. Your enquiry has not been sent.';
      return;
    }
    const body = fields.map(field => `${field.closest('.form-group')?.querySelector('label')?.textContent.trim() || field.name}: ${field.value}`).join('\n\n');
    location.href = `mailto:${encodeURIComponent(siteConfig.email)}?subject=${encodeURIComponent('Runjian Malaysia enquiry')}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email app will open with your enquiry. Please send it there to complete your request.';
  };
  form.addEventListener('submit', submit);
  form.querySelectorAll('[class*="formBtn"]').forEach(button => button.addEventListener('click', submit));
}
if (siteConfig.localizeContact) {
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    if (siteConfig.telephone) { link.href = `tel:${siteConfig.telephone}`;link.textContent = siteConfig.telephone; }
  });
}
window.runjianReady = true;
