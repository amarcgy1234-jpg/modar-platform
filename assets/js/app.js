// فتح/إغلاق قائمة الجوال
const burger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => nav.classList.toggle('open'));
}

// تمرير سلس للروابط داخل الصفحة
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
      nav?.classList.remove('open');
    }
  });
});
