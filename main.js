(function(){
  var root=document.documentElement;

  /* Menü auf iPhone und iPad hochkant */
  var top=document.querySelector('.top');
  if(top){
    var btn=top.querySelector('.menu-btn');
    var nav=document.getElementById('nav');
    var setOpen=function(o){top.classList.toggle('open',o);btn.setAttribute('aria-expanded',o?'true':'false');btn.textContent=o?'Schließen':'Menü';};
    btn.addEventListener('click',function(){setOpen(!top.classList.contains('open'));});
    nav.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&top.classList.contains('open')){setOpen(false);btn.focus();}});
  }

  /* Einblenden: jedes Element nur einmal, danach bleibt es stehen */
  var items=document.querySelectorAll('.reveal,.draw,.year');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
      });
    },{rootMargin:'0px 0px -8% 0px',threshold:0.12});
    items.forEach(function(el){io.observe(el);});
  }else{
    items.forEach(function(el){el.classList.add('in');});
  }

  /* Kontaktformular: öffnet das Mailprogramm mit fertiger Nachricht */
  var form=document.getElementById('anfrage');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var f=form.elements;
      var subject='Anfrage Platzpartner: '+(f.typ.value||'Allgemein')+(f.org.value?' / '+f.org.value:'');
      var body='Name: '+f.name.value+'\n'+(f.typ.value==='Verein'?'Verein: ':'Betrieb: ')+f.org.value+'\nStadtteil: '+f.ort.value+'\n\n'+f.text.value;
      window.location.href='mailto:info@platzpartner.de?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
  }
})();
