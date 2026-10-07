'use strict';
/* Painted sprites follow the original four heroes; independent limb animation preserves texture. */
const championPaintImage=new Image();let championPaintAtlas=null;
const championPaintRows=[[0,28,384,286],[0,332,384,322],[0,654,384,340]];
championPaintImage.onload=()=>{championPaintAtlas=championPaintImage;if(DATA)renderMenu()};championPaintImage.src='champions-painted.webp';
function championRect(hero,frame=0,wolf=false){let row=wolf?2:hero===4?0:1,r=championPaintRows[row];return[r[0]+(frame===3?0:Math.min(3,Math.max(0,frame)))*384,r[1],r[2],r[3]]}
const championCells=new Map();
function championCell(hero,frame,wolf){let row=wolf?2:hero===4?0:1,key=row+':'+frame;if(championCells.has(key))return championCells.get(key);let r=championRect(hero,frame,wolf),cell=document.createElement('canvas');cell.width=384;cell.height=r[3];let c=cell.getContext('2d'),trim=0;c.drawImage(championPaintAtlas,r[0]+trim,r[1],384-trim,r[3],trim,0,384-trim,r[3]);championCells.set(key,cell);return cell}
function championPortrait(c,hero,x,y,size,clock=0,moving=false,prepare=0,release=0,wolf=false){if(!championPaintAtlas)return;let frame=prepare>0?(prepare>.4?1:0):release>.18?2:release>0?3:0,r=championRect(hero,frame,wolf),height=size,width=size*r[2]/r[3];limbSprite(c,championCell(hero,frame,wolf),[0,0,384,r[3]],x-width/2,y-height/2,width,height,clock,moving,prepare,.52,wolf?.66:.64)}
const championSprite=animatedHeroSprite;
animatedHeroSprite=function(c,hero,frame,attack,x,y,size){if(hero<4)return championSprite(c,hero,frame,attack,x,y,size);championPortrait(c,hero,x,y,size)};
const championHero=drawHero;
drawHero=function(){let s=state;if(s.hero<4){championHero();return}if(!championPaintAtlas)return;let wind=s.skillWind||s.shotWind||0,duration=s.skillWind?.28:s.shotDuration||.2,prep=wind>0?1-wind/duration:0,height=s.wolfForm>0?99:88,cy=22-height/2;ctx.save();ctx.globalAlpha=s.down?.3:s.invuln>0&&Math.floor(s.time*15)%2?.45:1;ellipse(ctx,s.x,s.y+22,s.wolfForm>0?24:17,6,'#0007');ctx.translate(s.x,s.y);ctx.scale(Math.cos(s.aimAngle||0)<0?-1:1,1);if(s.timeStop>0){ctx.save();ctx.globalAlpha*=.18;championPortrait(ctx,s.hero,-12,cy,height,s.walkClock,s.moving,prep,s.attackAnim);ctx.restore()}championPortrait(ctx,s.hero,0,cy,height,s.walkClock,s.moving,prep,s.attackAnim,s.wolfForm>0);ctx.restore();let kind=weaponKind();if(kind!=='gun'&&kind!=='claws')weaponCycle(s.x,s.y,s.aimAngle||0,kind,prep,s.attackAnim||0,false,DATA.heroes[s.hero].color)};
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
