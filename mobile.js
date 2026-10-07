/* One-slot consumables, persisted across runs and older saves. */
const mobileNewState=newState;
newState=function(){let s=mobileNewState();s.potion=1;s.potionHeal=30;s.mobileVersion=13;return s};
const mobileMigrate=migrateState;
migrateState=function(s){mobileMigrate(s);if(s.mobileVersion!==13){for(let e of s.enemies||[])if(e.type==='boss')e.speed*=1.12;s.mobileVersion=13}s.potion=s.potion===0?0:1;s.potionHeal=s.potionHeal||30};
function usePotion(){if(mode!=='playing'||!state||state.down||netGuest()||!state.potion||state.hp>=state.maxHp)return;state.hp=Math.min(state.maxHp,state.hp+(state.potionHeal||30));state.potion=0;sound(650,.15);particles(state.x,state.y,'#a6d69b',12);saveRun();hud()}
const potionButton=document.createElement('button');potionButton.id='potionButton';potionButton.className='potionButton';potionButton.onclick=usePotion;$('game').append(potionButton);
const mobileHud=hud;
hud=function(){mobileHud();potionButton.disabled=mode!=='playing'||state.down||netGuest()||!state.potion||state.hp>=state.maxHp;potionButton.textContent=state.potion?'✚ Зелье · 1':'✚ Зелье · 0';potionButton.title='Восстановить 30 здоровья · Q';potionButton.setAttribute?.('aria-label',state.potion?'Использовать лечебное зелье: 30 здоровья':'Нет лечебного зелья')};
window.addEventListener('keydown',e=>{if(e.code==='KeyQ'&&!e.repeat){e.preventDefault();usePotion()}});
