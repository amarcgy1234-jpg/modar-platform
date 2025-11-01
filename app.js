// فتح/إغلاق قائمة الموبايل
document.addEventListener('click', (e)=>{
  const t = e.target;
  if(t.closest('.nav-toggle')){
    const list = document.querySelector('.nav-list');
    const btn  = t.closest('.nav-toggle');
    const open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  }
});

// منع إرسال بحث فعلي في الديمو
document.querySelectorAll('.search').forEach(f=>{
  f.addEventListener('submit',(e)=>{ e.preventDefault(); alert('بحث تجريبي'); });
});
