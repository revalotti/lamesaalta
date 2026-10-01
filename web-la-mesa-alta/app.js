const menu=document.querySelector('.menu');const nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}));
const dialog=document.querySelector('#info-dialog');const content={instagram:['INSTAGRAM','El enlace al perfil oficial de la peña estará disponible aquí cuando se confirme.'],x:['EN X','El enlace al perfil oficial de la peña estará disponible aquí cuando se confirme.'],pedidos:['PEDIDOS Y RECOGIDA','El catálogo actual es una propuesta de muestra. Los pedidos no están abiertos. La peña confirmará precios, disponibilidad, contacto y condiciones de recogida antes de aceptar solicitudes.'],privacidad:['PRIVACIDAD','Esta web no tiene registro de usuarios, formularios de compra ni base de datos de socios. Los enlaces a redes sociales y al pódcast abrirán servicios externos, con sus propias condiciones de privacidad. Las tipografías se cargan desde Google Fonts.'],accesibilidad:['ACCESIBILIDAD','Puedes recorrer los enlaces con el teclado, usar el acceso “Saltar al contenido” y cerrar las ventanas con Escape. Las imágenes incluyen descripciones y la web se adapta al tamaño de pantalla.'],socio:['TU SITIO EN LA MESA.','El canal de altas estará disponible en breve. Antes de inscribirte podrás consultar la cuota, las condiciones y la forma de pago directamente con la peña.'],camiseta:['LA CAMISETA ORIGINAL.','Camiseta blanca con el escudo de La Mesa Alta en el pecho y en la espalda. Las tallas, el precio y la forma de recogida están pendientes de confirmar. Todavía no se aceptan pedidos.'],contacto:['HABLAMOS PRONTO.','Estamos preparando el contacto oficial de la peña para altas, desplazamientos y consultas. Nos encontrarás en Hinojosa del Duque, Córdoba.']};document.querySelectorAll('[data-dialog]').forEach(b=>b.addEventListener('click',()=>{const [title,body]=content[b.dataset.dialog];document.querySelector('#dialog-title').textContent=title;const p=document.createElement('p');p.textContent=body;document.querySelector('#dialog-content').replaceChildren(p);dialog.showModal()}));document.querySelectorAll('.close,.dialog-done').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const channel=document.querySelector('#podcast-channel');
if(channel&&window.MESA_ALTA_LINKS?.podcast){
  try{
    const url=new URL(window.MESA_ALTA_LINKS.podcast);
    if(url.protocol==='https:'){
      channel.href=url.href;channel.hidden=false;
      document.querySelector('#podcast-pending').hidden=true;
      document.querySelector('#podcast-ready').hidden=false;
    }
  }catch{/* Un enlace sin configurar mantiene el aviso informativo. */}
}

for(const key of ['instagram','x']){
  const element=document.querySelector('[data-social="'+key+'"]');
  const value=window.MESA_ALTA_LINKS?.[key];
  if(!element||!value)continue;
  try{const url=new URL(value);if(url.protocol!=='https:')continue;
    const link=document.createElement('a');link.href=url.href;link.target='_blank';link.rel='noopener noreferrer';link.innerHTML=element.innerHTML;link.setAttribute('aria-label',element.getAttribute('aria-label'));element.replaceWith(link);
  }catch{}
}
