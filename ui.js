(function(){
'use strict';
var titles={overview:['Your day, at a glance.','A clear picture of your accounts and monthly collections.'],search:['Find references. Prepare faster.','Enter aliases, check the total, then share only the reference numbers.'],records:['Every account. One clear list.','Find a client, update details or download a private backup.'],add:['Keep your records up to date.','Add one account or bring an existing list into your workspace.'],schedule:['Prepare your schedule','Add clients in one step. Then share your schedule.'],admin:['Your admin workspace.','Review agent accounts and their records. Handle access changes in the secure database dashboard.']};
var current='schedule',nav=document.querySelector('.workspace-nav');
window.rdShowView=function(view){
 if(!titles[view]||(view==='admin'&&document.getElementById('adminCard').style.display==='none'))view='schedule';
 current=view;document.body.dataset.currentView=view;
 document.getElementById("approxMaturing").style.display=view==='schedule'?'none':'';
 document.querySelectorAll('[data-view]').forEach(function(el){el.hidden=el.id==='legacySchedule'||el.dataset.view!==view;});
 nav.querySelectorAll('button').forEach(function(el){el.classList.toggle('selected',el.dataset.viewTarget===view);if(el.dataset.viewTarget===view)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
 document.getElementById('viewTitle').textContent=titles[view][0];document.getElementById('viewHint').textContent=titles[view][1];
};
nav.addEventListener('click',function(e){var b=e.target.closest('[data-view-target]');if(b){window.rdShowView(b.dataset.viewTarget);window.scrollTo({top:0,behavior:'smooth'});}});
function sync(){var signed=document.getElementById('authForm').style.display==='none';document.body.classList.toggle('signed-in',signed);var admin=document.getElementById('adminCard').style.display!=='none';document.getElementById('adminNav').hidden=!admin;if(!signed)window.rdShowView('schedule');else if(current==='admin'&&!admin)window.rdShowView('schedule');}
new MutationObserver(sync).observe(document.getElementById('authForm'),{attributes:true,attributeFilter:['style']});
new MutationObserver(sync).observe(document.getElementById('adminCard'),{attributes:true,attributeFilter:['style']});
function labelCells(){document.querySelectorAll('#resultsTable,#allTable,#schedTable,#adminTable').forEach(function(table){var heads=Array.from(table.querySelectorAll('thead th')).map(function(th){return th.textContent;});table.querySelectorAll('tbody tr').forEach(function(row){Array.from(row.cells).forEach(function(cell,i){cell.dataset.label=heads[i]||'Actions';});});});}
new MutationObserver(labelCells).observe(document.getElementById('appBody'),{childList:true,subtree:true});labelCells();
window.rdShowView('schedule');sync();
})();
