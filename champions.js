'use strict';
/* Continuous Canvas rigs: two new heroes with independent feet, arms and weapons. */
function championPortrait(c,hero,x,y,size,clock=0,moving=false,prepare=0,release=0,wolf=false){
 const cyber=hero===4,step=moving?Math.sin(clock*12):0,bob=moving?Math.abs(step)*1.3:0;
 const poly=(points,color,edge=null)=>{c.fillStyle=color;c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fill();if(edge){c.strokeStyle=edge;c.lineWidth=.8;c.stroke()}};
 const line=(points,color,width)=>{c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.stroke()};
 c.save();c.translate(x,y-bob);c.scale(size/80,size/80);
 if(wolf){c.save();c.globalAlpha*=.2;ellipse(c,0,22,28,9,'#eb99bd');c.restore();line([[-12,7],[-28,18],[-32,8]],'#706078',9)}
 // Legs pivot through hip, knee and ankle, rather than sliding the whole sprite.
 for(let side of [-1,1]){let stride=step*side*6;
  line([[side*6,7],[side*7+stride*.5,19],[side*8+stride,30-Math.max(0,step*side)*3]],wolf?'#75687b':'#222a30',wolf?9:7);
  line([[side*8+stride-3,30-Math.max(0,step*side)*3],[side*8+stride+5,30-Math.max(0,step*side)*3]],cyber?'#303c40':wolf?'#a48ea6':'#4b3344',5);
  if(cyber)line([[side*7+stride*.5,18],[side*8+stride,26]],'#8bacb0',1.2);
  if(wolf)for(let k=0;k<3;k++)line([[side*8+stride+k*2-2,30],[side*8+stride+k*2-1,33]],'#f4dfd0',1);
 }
 if(cyber){
  poly([[-13,-16],[12,-16],[15,7],[7,12],[-10,9]],'#dfb731','#f2d66b');
  poly([[-5,-14],[5,-14],[7,9],[-5,9]],'#29373b');
  poly([[-15,-19],[-5,-15],[-7,-8],[-17,-13]],'#d8ece9');poly([[5,-16],[14,-20],[17,-13],[8,-7]],'#d8ece9');
  line([[-12,-6],[-7,-5]],'#62d8d0',1.8);line([[8,-6],[12,-7]],'#62d8d0',1.8);
  line([[-11,2],[-7,2]],'#766728',1);line([[8,1],[12,1]],'#766728',1);
  for(let k=0;k<3;k++){line([[-2,-8+k*4],[1,-9+k*4]],'#64ead0',1.2)}
  line([[-10,9],[9,11]],'#665e35',2);
 }else if(wolf){
  poly([[-17,-16],[-8,-23],[8,-23],[18,-15],[16,10],[4,16],[-10,12]],'#77617c','#b9a5b7');
  poly([[-7,-19],[7,-19],[9,8],[0,13],[-9,8]],'#c3b0b8');
  for(let side of [-1,1])for(let k=0;k<5;k++)poly([[side*(12-k*.3),-12+k*4],[side*22,-9+k*4],[side*15,-4+k*4]],k%2?'#8c748d':'#69576f');
 }else{
  // Long hair frames a human face; no animal ears in the human form.
  poly([[-12,-31],[9,-32],[16,-20],[15,12],[6,9],[-14,8],[-17,-16]],'#776179','#b596b4');
  poly([[-12,-14],[11,-14],[13,9],[-9,12]],'#654753','#aa7887');
  poly([[-5,-15],[6,-15],[5,0],[-3,1]],'#bdb1a0');
  line([[-10,7],[10,7]],'#2d242c',3);ellipse(c,0,7,2.5,2,'#c9a47c');
  line([[-7,-6],[-5,3],[5,-5]],'#bf8ba0',1);
 }
 // Arms ease back for preparation and reach forward at the release.
 let recoil=Math.sin(Math.min(1,release/.3)*Math.PI),reach=prepare*4-recoil*7;
 for(let side of [-1,1]){
  line([[side*12,-12],[side*(17+reach*.4),-1-step*side*2],[side*(16+reach),7-step*side*3]],cyber?'#d9b736':wolf?'#7d657e':'#7d5364',wolf?8:6);
  ellipse(c,side*(16+reach),7-step*side*3,wolf?4.7:3,wolf?4:3,cyber?'#bd9679':wolf?'#bc9cae':'#d3ac9e');
  if(wolf)for(let k=0;k<3;k++)line([[side*(16+reach)+k*2-2,8-step*side*3],[side*(18+reach)+k*2-2,14-step*side*3]],'#f4ded2',1.2);
 }
 ellipse(c,0,-20,4,5,cyber?'#b6886f':'#d2ac9c');
 if(wolf){
  poly([[-11,-31],[-15,-45],[-3,-35],[6,-35],[15,-44],[12,-26],[5,-18],[-8,-20]],'#897184','#c0a1b5');
  poly([[-10,-34],[-12,-41],[-5,-34]],'#bc8eaa');poly([[7,-34],[12,-40],[10,-32]],'#bc8eaa');
  poly([[-8,-27],[8,-27],[7,-19],[-6,-18]],'#c1aeb3');ellipse(c,0,-25,3,2,'#30232d');
  line([[-6,-30],[-2,-31]],'#fae490',1.8);line([[3,-31],[7,-30]],'#fae490',1.8);
  line([[-5,-21],[5,-21]],'#34232e',1.5);poly([[-4,-21],[-2,-16],[-1,-21]],'#f5ead4');poly([[2,-21],[3,-16],[5,-21]],'#f5ead4');
 }else{
  ellipse(c,0,-27,9,11,cyber?'#c69b81':'#d6afa1');
  if(cyber){
   poly([[-10,-30],[-8,-39],[5,-42],[12,-34],[7,-30],[1,-32],[-6,-29]],'#352d28');
   line([[-9,-28],[-8,-23]],'#877064',2);line([[8,-29],[9,-24]],'#877064',2);
   for(let k=0;k<3;k++)line([[-9,-29+k*2],[-6,-30+k*2]],'#cad4c4',.65);
   line([[4,-30],[8,-29]],'#40342e',1.3);line([[-6,-30],[-2,-31]],'#40342e',1.3);
   line([[2,-20],[5,-21]],'#85614f',.8);
  }else{
   poly([[-10,-30],[-9,-38],[7,-39],[13,-29],[8,-23],[4,-33],[-3,-27]],'#a48ba8','#d3b5cc');
   line([[-6,-28],[-2,-28]],'#785560',1.2);line([[3,-28],[7,-28]],'#785560',1.2);
   ellipse(c,-4,-27,1,1,'#e8c889');ellipse(c,5,-27,1,1,'#e8c889');line([[-2,-20],[2,-20]],'#9f6c79',.7);
   ellipse(c,0,-13,2.2,2.2,'#d9bb87');
  }
 }
 c.restore();
}
const championSprite=animatedHeroSprite;
animatedHeroSprite=function(c,hero,frame,attack,x,y,size){if(hero<4)return championSprite(c,hero,frame,attack,x,y,size);championPortrait(c,hero,x,y,size)};
const championHero=drawHero;
drawHero=function(){let s=state;if(s.hero<4){championHero();return}let wind=s.skillWind||s.shotWind||0,duration=s.skillWind?.28:s.shotDuration||.2,prep=wind>0?1-wind/duration:0;ctx.save();ctx.globalAlpha=s.down?.3:s.invuln>0&&Math.floor(s.time*15)%2?.45:1;ellipse(ctx,s.x,s.y+29,s.wolfForm>0?25:18,6,'#0007');ctx.translate(s.x,s.y);ctx.scale(Math.cos(s.aimAngle||0)<0?-1:1,1);if(s.timeStop>0){ctx.save();ctx.globalAlpha*=.18;championPortrait(ctx,s.hero,-12,0,78,s.walkClock,s.moving,prep,s.attackAnim);ctx.restore()}championPortrait(ctx,s.hero,0,0,s.wolfForm>0?90:78,s.walkClock,s.moving,prep,s.attackAnim,s.wolfForm>0);ctx.restore();championWeapon(s.x,s.y,s.aimAngle||0,weaponKind(),prep,s.attackAnim||0,s.wolfForm>0)};
function championWeapon(x,y,angle,kind,prep,release,wolf){if(kind!=='gun'&&kind!=='claws'){weaponCycle(x,y,angle,kind,prep,release,false,DATA.heroes[state.hero].color);return}ctx.save();ctx.translate(x,y-5);ctx.rotate(angle);if(kind==='gun'){let kick=release>.18?3:0;ctx.fillStyle='#303c42';ctx.fillRect(13-prep*4-kick,-4,20,8);ctx.fillStyle='#9cb4b6';ctx.fillRect(16-prep*4-kick,-5,15,3);ctx.fillStyle='#26323b';ctx.fillRect(14-prep*4-kick,3,6,9);ctx.fillStyle='#68f1d1';ctx.fillRect(24-prep*4-kick,-1,5,1);if(release>.21){ctx.fillStyle='#ffd98c';ctx.beginPath();ctx.moveTo(32,0);ctx.lineTo(42,-6);ctx.lineTo(38,0);ctx.lineTo(45,4);ctx.closePath();ctx.fill()}}else{ctx.strokeStyle=wolf?'#f1cad8':'#d6c3d9';ctx.lineWidth=2;for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(12-prep*5,i*5);ctx.lineTo((wolf?35:26)-prep*5,i*5-3);ctx.stroke()}if(release>0){ctx.globalAlpha=release/.3;ctx.lineWidth=wolf?4:2;ctx.beginPath();ctx.arc(0,0,wolf?70:47,-.8+prep,.8);ctx.stroke()}}ctx.restore()}
function clawStrike(){let s=state;if(!nearestEnemy()&&!aim.active&&!touchAim.active)return;let a=aimDirection(),range=s.wolfForm>0?115:85;s.attackAnim=.3;s.attackCount++;for(let e of s.enemies){let d=Math.hypot(e.x-s.x,e.y-s.y),angle=Math.atan2(e.y-s.y,e.x-s.x),diff=Math.atan2(Math.sin(angle-a),Math.cos(angle-a));if(e.hp>0&&d<range+e.radius&&Math.abs(diff)<1.05){e.hp-=s.damage*(s.wolfForm>0?1.9:1)*(Math.random()<(s.critChance||0)?2:1);e.hitAnim=.2;particles(e.x,e.y,'#e9c0d6',4)}}weaponSound('claws')}
const championHurt=hurt;hurt=function(v){championHurt(v*(state?.wolfForm>0?.65:1))};
const championState=newState;newState=function(){let s=championState();s.timeStop=0;s.wolfForm=0;return s};
const championMigrate=migrateState;migrateState=function(s){championMigrate(s);s.timeStop=Math.max(0,Math.min(4,s.timeStop||0));s.wolfForm=Math.max(0,Math.min(8,s.wolfForm||0));if(s.wolfForm>0)s.skillCooldown=0};
const championUpdate=update;update=function(dt){let s=state,form=s.wolfForm||0;championUpdate(dt);s.timeStop=Math.max(0,(s.timeStop||0)-dt);s.wolfForm=Math.max(0,(s.wolfForm||0)-dt);if(form>0&&s.wolfForm===0){s.skillCooldown=DATA.heroes[s.hero].active.cooldown*(1-Math.min(.6,s.focusBonus||0));toast('Человеческий облик · способность восстанавливается')}hud()};
const championHud=hud;hud=function(){championHud();if(state.wolfForm>0||state.timeStop>0){let remaining=state.wolfForm||state.timeStop;skillButton.disabled=true;skillButton.textContent=DATA.heroes[state.hero].active.name+' · '+remaining.toFixed(1)+' с';skillButton.title=state.wolfForm>0?'Форма оборотня. Откат начнётся после её завершения.':'Время остановлено.'}};
// Touch actions do not depend on a synthesized primary-finger click.
function independentTouchButton(button,action){button.onpointerdown=e=>{if(e.pointerType==='mouse')return;e.preventDefault();e.stopPropagation();if(!button.disabled)action()};button.onclick=e=>{if(e?.pointerType==='touch'||e?.pointerType==='pen')return;action()}}
independentTouchButton(skillButton,()=>activeSkill());independentTouchButton(potionButton,()=>usePotion());

const championClear=clearMovement;clearMovement=function(){championClear();joyPointer=null;aimPointer=null};
