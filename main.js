(function(){
  // año del pie
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // sombra del encabezado al bajar
  var header = document.querySelector('header');
  function onScroll(){ if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // menú en celular
  var menu = document.querySelector('.menu'), nav = document.getElementById('nav');
  if (menu && nav) {
    menu.addEventListener('click', function(){
      var o = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
  }

  // ventana de cada trabajo (solo en works.html)
  var dlg = document.getElementById('caso');
  if (dlg) {
    document.querySelectorAll('button.t').forEach(function(b){
      b.addEventListener('click', function(){
        document.getElementById('caso-t').textContent = b.dataset.t;
        document.getElementById('caso-k').textContent = b.dataset.k;
        document.getElementById('caso-d').textContent = b.dataset.d;
        var ph = document.getElementById('caso-ph');
        ph.style.background = b.style.getPropertyValue('--g');
        ph.textContent = '';
        if (b.dataset.vid) {
          ph.classList.add('vid');
          var v = document.createElement('video');
          v.controls = true; v.playsInline = true; v.preload = 'metadata';
          v.poster = b.dataset.img; v.src = b.dataset.vid;
          ph.appendChild(v);
        } else {
          ph.classList.remove('vid');
          var im = new Image(); im.alt = b.dataset.t; im.src = b.dataset.img;
          ph.appendChild(im);
        }
        dlg.showModal();
      });
    });
    function cerrar(){ dlg.close(); }
    document.getElementById('caso-x').addEventListener('click', cerrar);
    dlg.addEventListener('close', function(){ document.getElementById('caso-ph').textContent=''; });
    dlg.addEventListener('click', function(e){ if (e.target === dlg) cerrar(); });
  }

  // intro del logo (solo en la portada, una vez por visita)
  var root = document.documentElement, intro = document.getElementById('intro');
  if (intro && root.classList.contains('intro-on')) {
    var done = false;
    function salir(){
      if (done) return; done = true;
      try { sessionStorage.setItem('introVisto', '1'); } catch(e) {}
      intro.classList.add('out');
      setTimeout(function(){ root.classList.remove('intro-on'); }, 450);
      setTimeout(function(){ intro.style.display = 'none'; }, 1000);
    }
    setTimeout(salir, 3000);
    intro.addEventListener('click', salir);
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') salir(); });
  }
})();
