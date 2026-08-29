const DEFAULT_MENU = [
  {id:1,name:'Dalma',category:'Veg',price:180,available:true},
  {id:2,name:'Pakhala Bhata',category:'Veg',price:150,available:true},
  {id:3,name:'Machha Besara',category:'Fish',price:280,available:true},
  {id:4,name:'Chicken Kosha',category:'Chicken',price:320,available:true},
  {id:5,name:'Odia Mutton Curry',category:'Mutton',price:390,available:true},
  {id:6,name:'Chhena Poda',category:'Dessert',price:120,available:true}
];

function getMenu(){
  const saved=localStorage.getItem('odishaRasoiMenu');
  if(!saved){localStorage.setItem('odishaRasoiMenu',JSON.stringify(DEFAULT_MENU));return [...DEFAULT_MENU];}
  try{return JSON.parse(saved)}catch{return [...DEFAULT_MENU]}
}
function saveMenu(menu){localStorage.setItem('odishaRasoiMenu',JSON.stringify(menu));}

const loginForm=document.getElementById('login-form');
if(loginForm){
  if(localStorage.getItem('odishaAdminLoggedIn')==='true') location.href='dashboard.html';
  loginForm.addEventListener('submit',e=>{
    e.preventDefault();
    const email=document.getElementById('email').value.trim();
    const password=document.getElementById('password').value;
    const error=document.getElementById('login-error');
    if(email==='admin@odisharasoi.com' && password==='admin123'){
      localStorage.setItem('odishaAdminLoggedIn','true');
      location.href='dashboard.html';
    }else error.textContent='Invalid email or password.';
  });
}

const dashboard=document.getElementById('dashboard');
if(dashboard){
  if(localStorage.getItem('odishaAdminLoggedIn')!=='true') location.href='login.html';
  const menu=getMenu();
  document.getElementById('menu-count').textContent=menu.length;
  document.getElementById('available-count').textContent=menu.filter(x=>x.available).length;
  document.getElementById('category-count').textContent=new Set(menu.map(x=>x.category)).size;
  renderMenu();
  document.getElementById('add-form').addEventListener('submit',e=>{
    e.preventDefault();
    const current=getMenu();
    current.push({id:Date.now(),name:document.getElementById('item-name').value.trim(),category:document.getElementById('item-category').value,price:Number(document.getElementById('item-price').value),available:true});
    saveMenu(current);e.target.reset();renderMenu();updateStats();
  });
}

function updateStats(){
  const m=getMenu();
  document.getElementById('menu-count').textContent=m.length;
  document.getElementById('available-count').textContent=m.filter(x=>x.available).length;
  document.getElementById('category-count').textContent=new Set(m.map(x=>x.category)).size;
}
function renderMenu(){
  const body=document.getElementById('menu-body'); if(!body)return;
  body.innerHTML='';
  getMenu().forEach(item=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td><strong>${escapeHtml(item.name)}</strong></td><td>${escapeHtml(item.category)}</td><td>₹${item.price}</td><td><span class="status ${item.available?'':'off'}">${item.available?'Available':'Unavailable'}</span></td><td class="actions"><button class="secondary" onclick="toggleItem(${item.id})">${item.available?'Disable':'Enable'}</button><button class="danger" onclick="deleteItem(${item.id})">Delete</button></td>`;
    body.appendChild(tr);
  });
}
function toggleItem(id){const m=getMenu();const x=m.find(i=>i.id===id);if(x)x.available=!x.available;saveMenu(m);renderMenu();updateStats();}
function deleteItem(id){if(!confirm('Delete this menu item?'))return;saveMenu(getMenu().filter(i=>i.id!==id));renderMenu();updateStats();}
function logout(){localStorage.removeItem('odishaAdminLoggedIn');location.href='login.html';}
function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
