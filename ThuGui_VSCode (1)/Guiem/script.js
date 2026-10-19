
(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const BAR=2200;                       // thời lượng đọc gốc (ms) của 1 "bar" kịch bản
const BPM=76.5, BEAT=60000/BPM, OFF=450;   // Từng Ngày Yêu Em: nhịp & độ lệch pha (ms)
function snap(ms){ const U=BEAT*2; let d=Math.max(1,Math.round(ms/U))*U;
  if(!bgm.paused){ const t=bgm.currentTime*1000-OFF; d=Math.max(U*.75,Math.round((t+d)/U)*U-t); }
  return d; }
const YRS=new Date().getFullYear()-1930;
const qp=new URLSearchParams(location.search);
const TO=(qp.get('to')||'').trim().slice(0,40), FROM=(qp.get('from')||'').trim().slice(0,40);
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ================= KỊCH BẢN ================= */
const S=[
 {say:TO?'này <em>'+esc(TO)+'</em> ơi!':'này cậu ơi!', bars:1.1, mood:'wave', mode:'hero', bg:0, fx:{meteor:1}},
 {say:'tớ là <em>Nụ</em> — nàng tiên nhỏ của vườn hoa', bars:1.7, mood:'talk'},
 {say:'hôm nay tớ được giao một nhiệm vụ bởi một người đặc biệt lắm đó…😎', bars:1.7, mood:'shy'},
 {say:'vì hôm nay là…', bars:1, mood:'talk'},
 {scene:'date', mode:'side', say:'<em>20/10</em> rồi!', bars:1.7, mood:'happy', bg:2, fx:{petals:.7,meteor:1}},

 {scene:'history', say:'ngày 20/10/1930, Hội Phụ nữ phụ nữ Việt Nam ra đời', bars:2, mood:'talk', reveal:['h1','h2']},
 {say:'đã <em>'+YRS+'</em> năm trôi qua, và 20/10 thành ngày cả nước dành để tri ân phụ nữ', bars:2.3, mood:'talk', reveal:['h3','h4'], on(){countTo($('#yrs'),YRS,2200)}},

 {scene:'heroes', say:'trong câu chuyện đất nước, có biết bao người phụ nữ phi thường…', bars:2, mood:'talk', bg:0, fx:{meteor:1.6}, reveal:['n1','l1','n2','l2','e12']},
 {say:'từ Hai Bà Trưng, Bà Triệu thuở dựng nước, đến những người con gái kiên cường của thế kỷ XX', bars:2.4, mood:'talk', reveal:['n3','l3','e23','n4','l4','e24','n5','l5','e35','e45']},
 {say:'và còn những người không có tên trong sách trên là : bà, mẹ, chị, cô giáo… và cả <em>em</em> nữa🌹', bars:2.4, mood:'happy', reveal:['n6','l6','e46','e56'], fx:{meteor:2.2,petals:.3}},

 {scene:'unseen', say:'có những điều rất nhỏ mà phụ nữ vẫn lặng lẽ làm mỗi ngày…', bars:2, mood:'talk', bg:2, fx:{petals:.2}},
 {say:'', bars:1.15, reveal:['c1']},
 {say:'', bars:1.15, reveal:['c2']},
 {say:'', bars:1.15, reveal:['c3']},
 {say:'', bars:1.4, reveal:['c4']},
 {say:'mà hiếm khi có ai nói lời cảm ơn', bars:1.8, mood:'shy'},
 {scene:'none', mode:'hero', say:'nên hôm nay, đến lượt <em>em</em> được quan tâm rồi ạ 😘', bars:2, mood:'happy', fx:{petals:1.1}},

 {say:'Anh xin gửi em sáu lời chúc nhé ạ', bars:1.5, mood:'wave', bg:2},
 {scene:'health', mode:'side', say:'chúc em thật nhiều <em>sức khỏe</em> — để còn đi hết những nơi em muốn đến ✈️', bars:2.4, mood:'talk', bg:1, fx:{meteor:.6}},
 {scene:'peace', say:'chúc em <em>bình yên</em> — dù ngoài kia có ồn ào thế nào 🍀', bars:2.2, mood:'talk', bg:1},
 {scene:'free', say:'chúc em đủ <em>tự do</em> để làm điều mình thích, và đủ dũng cảm để theo đuổi nó 🌹', bars:2.5, mood:'talk', bg:0, fx:{lantern:1,meteor:.8}},
 {scene:'love', say:'chúc em luôn được <em>yêu thương</em> — đúng cách, đúng người, và cả bởi chính em 😽', bars:2.5, mood:'happy', bg:2, fx:{hearts:1,petals:.3}},
 {scene:'success', say:'Chúc em luôn <em>thành công</em> trên con đường mình đã chọn, và luôn tự hào về chính mình 🥳', bars:2.5, mood:'happy', bg:2, fx:{hearts:1}},
 {scene:'dream', say:'Chúc em luôn giữ được <em>nụ cười</em> trên môi, gặp thật nhiều điều may mắn và mỗi ngày đều có một lý do để hạnh phúc 😁', bars:2.8, mood:'happy', bg:2, fx:{hearts:1,petals:.5}},

 {scene:'none', mode:'hero', say:'em không cần phải hoàn hảo đâu', bars:1.6, mood:'talk', fx:{petals:.8}},
 {say:'em đẹp ở cách em cố gắng, cách em cười, và cách em thương người khác', bars:2.4, mood:'shy'},

 {scene:'gift', mode:'side', say:'anh tặng em bó hoa này nè', bars:1.8, mood:'happy', bg:3, fx:{petals:1,meadow:1.1}},
 {say:'một loài hoa không bao giờ héo — vì mỗi cánh là một lời yêu thương', bars:2.4, mood:'talk'},

 {scene:'question', mode:'hero', say:'cho anh hỏi một câu thôi nhé…<br>hôm nay em đã <em>khen bản thân</em> chưa?', bars:2, mood:'wink', bg:2, fx:{petals:.3,meteor:1}, wait:true, reveal:['q1']},
 {scene:'final', mode:'side', say:'', mood:'happy', bg:3, fx:{fire:1,petals:.9,meadow:1.5}, wait:true, final:true}
];

/* ================= TRẠNG THÁI ================= */
const nu=$('#nu'), bgls=$$('.bgl'), line=$('#line'), bubble=$('#bubble'), hint=$('#hint'), prog=$('#prog');
let idx=-1, timer=null, started=false, curScene=null, waiting=false, lock=0, talkT=null;
let fxS={petals:0,hearts:0,lantern:0,fire:0,meteor:1,meadow:.6};

function mood(m){ nu.className=(m||''); }
function talk(on){ clearTimeout(talkT); nu.classList.toggle('talk',on); if(on) talkT=setTimeout(()=>nu.classList.remove('talk'),1500); }

function say(html){
  bubble.classList.toggle('empty',!html);
  line.innerHTML=html||'';
  let k=0;
  (function walk(n){
    [...n.childNodes].forEach(c=>{
      if(c.nodeType===3){
        const f=document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(p=>{
          if(!p) return;
          if(!p.trim()){ f.append(p); return; }
          const s=document.createElement('span'); s.className='w'; s.textContent=p; s.style.animationDelay=(k++*65)+'ms'; f.append(s);
        });
        c.replaceWith(f);
      } else if(c.nodeType===1 && c.tagName!=='BR') walk(c);
    });
  })(line);
}

function showScene(name){
  if(name===undefined) return;
  const next = name==='none' ? null : $('#sc-'+name);
  if(next===curScene) return;
  if(curScene){ curScene.classList.remove('on'); }
  const old=curScene; curScene=next;
  if(old) setTimeout(()=>{ if(old!==curScene) $$('.rv.on,.node.on,.edge.on,.lbl.on',old).forEach(e=>e.classList.remove('on')); },800);
  if(next) setTimeout(()=>{ if(curScene===next) next.classList.add('on'); }, old?420:60);
}

function countTo(el,to,ms){
  const t0=performance.now();
  (function f(t){ const k=Math.min(1,(t-t0)/ms); el.textContent=Math.round(to*(1-Math.pow(1-k,3))); if(k<1) requestAnimationFrame(f); })(t0);
}

function go(n){
  clearTimeout(timer);
  if(n>=S.length) return;
  idx=n; const st=S[n]; document.body.classList.toggle('bloom',!!st.final);
  if(st.mode){ document.body.classList.toggle('m-side',st.mode==='side'); document.body.classList.toggle('m-hero',st.mode==='hero'); }
  if(st.bg!==undefined) bgls.forEach((e,k)=>e.classList.toggle('on',k===st.bg));
  if(st.fx){ fxS=Object.assign({petals:0,hearts:0,lantern:0,fire:0,meteor:1,meadow:.6},st.fx); parts.forEach(p=>{ if((p.t==='lantern'&&!fxS.lantern)||(p.t==='heart'&&!fxS.hearts)) p.kill=true; }); }
  showScene(st.scene);
  if(st.mood!==undefined){ const talking=nu.classList.contains('talk'); mood(st.mood); if(talking) nu.classList.add('talk'); }
  say(st.say);
  talk(!!st.say);
  if(st.reveal) st.reveal.forEach((id,j)=>setTimeout(()=>{const e=document.getElementById(id); if(e) e.classList.add('on');}, (st.scene?650:0)+j*260));
  if(st.on) st.on();
  prog.style.width=((n+1)/S.length*100)+'%';
  hint.classList.toggle('on', n>=1 && n<=4);
  waiting=!!st.wait;
  if(!st.wait && !qp.has('hold')) timer=setTimeout(()=>go(n+1),snap((st.bars||1.5)*BAR));
  if(st.final) setupFinal();
}

function next(){ const now=Date.now(); if(now-lock<220) return; lock=now; if(!waiting && idx<S.length-1) go(idx+1); }

/* ================= TƯƠNG TÁC ================= */
document.addEventListener('click',e=>{
  if(!started) return;
  if(e.target.closest('.ui,button,input,a,.final')) return;
  next();
});
document.addEventListener('keydown',e=>{ if(started&&(e.key===' '||e.key==='ArrowRight')&&e.target.tagName!=='INPUT'){e.preventDefault();next();} });

$('#q1').addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b||!waiting) return;
  waiting=false; $('#q1').classList.remove('on');
  mood('happy'); talk(true);
  if(b.dataset.a==='yes'){
    say('giỏi quá! cứ khen thật nhiều vào nhé — em xứng đáng mà');
  } else {
    say('vậy để anh khen giúp: em <em>mạnh mẽ</em> hơn em nghĩ, <em>dịu dàng</em> hơn em tưởng, và quan trọng hơn em vẫn nghĩ rất nhiều');
  }
  clearTimeout(timer); timer=setTimeout(()=>go(idx+1), snap(4.4*BAR));
});

function setupFinal(){
  const to=TO||'';
  $('#f-to').textContent = to ? 'gửi '+to+(FROM?' · từ '+FROM:'') : 'gửi người phụ nữ tuyệt vời'+(FROM?' · từ '+FROM:'');
}
$('#b-replay').addEventListener('click',()=>{
  $$('.rv.on,.node.on,.edge.on,.lbl.on').forEach(e=>e.classList.remove('on'));
  if(curScene){curScene.classList.remove('on'); curScene=null;}
  setTimeout(()=>go(0),300);
});

/* ================= ÂM THANH ================= */
const bgm=$('#bgm'); let actx=null, an=null, fd=null, avg=0, dpeak=.02;
function setupAudio(){
  try{
    const AC=window.AudioContext||window.webkitAudioContext; actx=new AC();
    const src=actx.createMediaElementSource(bgm); an=actx.createAnalyser(); an.fftSize=256; an.smoothingTimeConstant=.55;
    src.connect(an); an.connect(actx.destination); fd=new Uint8Array(an.frequencyBinCount);
    if(actx.state==='suspended') actx.resume();
  }catch(err){ an=null; }
}
$('#mute').addEventListener('click',()=>{ bgm.muted=!bgm.muted; $('#mute').classList.toggle('muted',bgm.muted); });

$('#start').addEventListener('click',()=>{
  if(started) return; started=true;
  $('#start').classList.add('gone');
  setupAudio(); bgm.volume=.9; const pr=bgm.play(); if(pr&&pr.catch) pr.catch(()=>{});
  setTimeout(()=>go(0),500);
});

/* ================= HIỆU ỨNG NỀN (canvas) ================= */
const cv=$('#fx'), ctx=cv.getContext('2d');
let W=0,H=0,DPR=1, stars=[], parts=[], pulse=0, lastP=-1, acc={p:0,h:0,l:0,f:0,m:0};

function spr(w,h,fn){ const c=document.createElement('canvas'); c.width=w; c.height=h; fn(c.getContext('2d'),w,h); return c; }
function petalSpr(c1,c2){ return spr(40,56,(g,w,h)=>{ const gr=g.createLinearGradient(0,h,0,0); gr.addColorStop(0,c1); gr.addColorStop(1,c2);
  g.fillStyle=gr; g.beginPath(); g.moveTo(w/2,h*.96); g.bezierCurveTo(-w*.25,h*.62,w*.08,h*.02,w/2,0); g.bezierCurveTo(w*.92,h*.02,w*1.25,h*.62,w/2,h*.96); g.fill(); }); }
const SP={ petal:[petalSpr('#ff7ab8','#ffe3f0'),petalSpr('#ffb347','#fff0c4'),petalSpr('#9b6bff','#eadfff')],
  heart:spr(48,44,(g,w,h)=>{ const gr=g.createLinearGradient(0,0,0,h); gr.addColorStop(0,'#ffc2dd'); gr.addColorStop(1,'#ff5f9a'); g.fillStyle=gr;
    g.beginPath(); g.moveTo(w/2,h*.95); g.bezierCurveTo(-w*.2,h*.55,w*.12,-h*.1,w/2,h*.28); g.bezierCurveTo(w*.88,-h*.1,w*1.2,h*.55,w/2,h*.95); g.fill(); }),
  lantern:spr(64,84,(g,w,h)=>{ const r=g.createRadialGradient(w/2,h*.5,2,w/2,h*.5,w/2); r.addColorStop(0,'rgba(255,200,120,.7)'); r.addColorStop(1,'rgba(255,160,90,0)'); g.fillStyle=r; g.fillRect(0,0,w,h);
    const gr=g.createLinearGradient(0,h*.25,0,h*.75); gr.addColorStop(0,'#fff0b8'); gr.addColorStop(1,'#ff9a58'); g.fillStyle=gr;
    g.beginPath(); g.moveTo(w*.34,h*.24); g.quadraticCurveTo(w*.14,h*.5,w*.3,h*.74); g.lineTo(w*.7,h*.74); g.quadraticCurveTo(w*.86,h*.5,w*.66,h*.24); g.closePath(); g.fill();
    g.fillStyle='#ffd9a0'; g.fillRect(w*.32,h*.2,w*.36,h*.05); g.fillStyle='#e07a3c'; g.fillRect(w*.32,h*.74,w*.36,h*.04);
    g.strokeStyle='rgba(180,70,20,.35)'; g.lineWidth=1; g.beginPath(); g.moveTo(w*.5,h*.25); g.lineTo(w*.5,h*.74); g.stroke(); }) };

function resize(){
  DPR=Math.min(devicePixelRatio||1,1.5); W=innerWidth; H=innerHeight;
  cv.width=W*DPR; cv.height=H*DPR; ctx.setTransform(DPR,0,0,DPR,0,0);
  const n=Math.min(230,Math.round(W*H/6500)); stars=[];
  for(let i=0;i<n;i++) stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+.4,t:Math.random()*6.28,s:.6+Math.random()*1.6,h:Math.random()<.2?330:Math.random()<.4?210:45});
}
addEventListener('resize',resize); resize();
let mdw=.6; const BL=[];
function blades(){ BL.length=0; const n=Math.round(W/5);
  for(let i=0;i<n;i++) BL.push({x:i/n*W+Math.random()*4, h:(.04+Math.random()*.08)*H*(.55+.9*Math.pow(Math.sin(i/n*9+1),2)), ph:Math.random()*6.28, w:1+Math.random()*1.2, hue:[160,175,190,95,55,320][(Math.random()*6)|0]}); }
blades(); addEventListener('resize',blades);

function spawn(type){
  const R=Math.random;
  if(type==='petal') parts.push({t:'petal',x:R()*W,y:-30,vx:-10+R()*30,vy:40+R()*55,r:R()*6.28,vr:(R()-.5)*3,s:.35+R()*.45,ph:R()*6.28,sp:SP.petal[(R()*3)|0],a:1});
  else if(type==='heart') parts.push({t:'heart',x:R()*W,y:H+20,vx:(R()-.5)*30,vy:-(50+R()*60),r:0,vr:0,s:.25+R()*.45,ph:R()*6.28,sp:SP.heart,a:.9});
  else if(type==='lantern') parts.push({t:'lantern',x:R()*W,y:H+50,vx:(R()-.5)*14,vy:-(24+R()*28),r:0,vr:0,s:.5+R()*.7,ph:R()*6.28,sp:SP.lantern,a:.95});
  else if(type==='meteor'){ const x=W*(.3+R()*.7), y=R()*H*.35; parts.push({t:'meteor',x,y,vx:-(380+R()*220),vy:150+R()*100,life:1}); }
  else if(type==='fire'){ const cx=W*(.15+R()*.7), cy=H*(.12+R()*.4), hue=[330,45,280,200][(R()*4)|0], n=34;
    for(let i=0;i<n;i++){ const a=i/n*6.283+R()*.2, v=90+R()*120; parts.push({t:'spark',x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,hue}); } }
}

let lastT=performance.now();
function frame(now){
  const dt=Math.min(.05,(now-lastT)/1000); lastT=now;
  /* nhịp bass → pulse */
  let target=0;
  if(an&&fd&&!bgm.paused){ an.getByteFrequencyData(fd); const lvl=(fd[0]+fd[1]+fd[2]+fd[3])/(4*255); avg+=(lvl-avg)*Math.min(1,dt*3.2); const d=lvl-avg; dpeak=Math.max(dpeak*Math.pow(.6,dt),d,.02); target=Math.min(1,Math.max(0,d/dpeak)); target*=target; }
  else if(started){ { const bp=BEAT/1000; target=Math.max(0,1-(((now/1000)%bp)/bp)*3); } }
  if(!bgm.paused){ const ph=(((bgm.currentTime*1000-OFF)%BEAT)+BEAT)%BEAT/BEAT; target=Math.max(target,Math.pow(Math.max(0,1-ph*2.4),2)*.65); }
  pulse=Math.max(pulse*Math.pow(.02,dt),target); if(pulse>1) pulse=1;
  if(Math.abs(pulse-lastP)>.03){ lastP=pulse; document.documentElement.style.setProperty('--p',pulse.toFixed(2)); }

  ctx.clearRect(0,0,W,H);
  /* sao */
  for(const s of stars){ s.t+=dt*s.s; const a=.35+.45*Math.abs(Math.sin(s.t))+pulse*.25; ctx.globalAlpha=Math.min(1,a); ctx.fillStyle='hsl('+s.h+',90%,88%)'; ctx.beginPath(); ctx.arc(s.x,s.y,s.r*(1+pulse*.35),0,6.283); ctx.fill(); }
  ctx.globalAlpha=1;
  /* đồng cỏ neon */
  mdw+=(fxS.meadow-mdw)*Math.min(1,dt*1.6);
  ctx.globalCompositeOperation='lighter'; ctx.lineCap='round'; const tm=now/1000;
  for(const b of BL){ const sw=Math.sin(tm*1.2+b.ph+b.x*.004)*(5+b.h*.12)+Math.sin(tm*.5+b.x*.01)*4, h=b.h*mdw;
    ctx.strokeStyle='hsla('+b.hue+',95%,60%,'+(.5+pulse*.35)+')'; ctx.lineWidth=b.w;
    ctx.beginPath(); ctx.moveTo(b.x,H); ctx.quadraticCurveTo(b.x+sw*.3,H-h*.6,b.x+sw,H-h); ctx.stroke(); }
  ctx.globalCompositeOperation='source-over';
  /* sinh hạt */
  acc.p+=dt*fxS.petals*7; while(acc.p>=1){acc.p--; spawn('petal');}
  acc.h+=dt*fxS.hearts*4; while(acc.h>=1){acc.h--; spawn('heart');}
  acc.l+=dt*fxS.lantern*1.5; while(acc.l>=1){acc.l--; spawn('lantern');}
  acc.f+=dt*fxS.fire*1.1; while(acc.f>=1){acc.f--; spawn('fire');}
  acc.m+=dt*fxS.meteor*.22; while(acc.m>=1){acc.m--; spawn('meteor');}
  if(parts.length>420) parts.splice(0,parts.length-420);
  /* vẽ hạt */
  for(let i=parts.length-1;i>=0;i--){
    const p=parts[i];
    if(p.t==='meteor'){ p.x+=p.vx*dt; p.y+=p.vy*dt; p.life-=dt*1.1; if(p.life<=0){parts.splice(i,1);continue;}
      const g=ctx.createLinearGradient(p.x,p.y,p.x-p.vx*.16,p.y-p.vy*.16); g.addColorStop(0,'rgba(255,255,255,'+p.life+')'); g.addColorStop(1,'rgba(255,255,255,0)');
      ctx.strokeStyle=g; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x-p.vx*.16,p.y-p.vy*.16); ctx.stroke(); continue; }
    if(p.t==='spark'){ p.vy+=90*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; p.vx*=.985; p.life-=dt*.75; if(p.life<=0){parts.splice(i,1);continue;}
      ctx.globalCompositeOperation='lighter'; ctx.globalAlpha=Math.max(0,p.life); ctx.fillStyle='hsl('+p.hue+',100%,70%)'; ctx.beginPath(); ctx.arc(p.x,p.y,2.2,0,6.283); ctx.fill(); ctx.globalCompositeOperation='source-over'; ctx.globalAlpha=1; continue; }
    if(p.kill){ p.a-=dt*.9; if(p.a<=0){parts.splice(i,1);continue;} }
    p.ph+=dt*2; p.x+=(p.vx+Math.sin(p.ph)*22)*dt; p.y+=p.vy*dt; p.r+=p.vr*dt;
    if(p.y>H+60||p.y<-90){parts.splice(i,1);continue;}
    const sc=p.s*(1+(p.t==='heart'?pulse*.12:0)), w=p.sp.width*sc, h=p.sp.height*sc;
    ctx.save(); ctx.globalAlpha=p.a; ctx.translate(p.x,p.y); ctx.rotate(p.r);
    if(p.t==='petal') ctx.scale(Math.abs(Math.cos(p.ph))*.7+.3,1);
    ctx.drawImage(p.sp,-w/2,-h/2,w,h); ctx.restore();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

if(qp.has('debug')) window.__go=go;
document.addEventListener('visibilitychange',()=>{ if(started&&!document.hidden&&bgm.paused&&!bgm.muted) bgm.play().catch(()=>{}); });
})();


/* ===== Script tiếp theo ===== */


/* ===== PATCH: hiệu ứng chạm + nút dễ ấn ===== */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const G=['✿','♡','✦','❀','✧','♥','✺'], C=['#ff7ab8','#ffd98a','#a99bff','#7dffd0','#ffffff','#ff9ec7'];
  const rnd=(a,b)=>a+Math.random()*(b-a), pick=a=>a[(Math.random()*a.length)|0];

  function burst(x,y,n,spread){
    if(reduce) return;
    for(let i=0;i<n;i++){
      const s=document.createElement('span'); s.className='fxp'; s.textContent=pick(G);
      s.style.left=x+'px'; s.style.top=y+'px'; s.style.color=pick(C); s.style.fontSize=rnd(11,26)+'px';
      document.body.appendChild(s);
      const a=rnd(0,Math.PI*2), d=rnd(spread*.35,spread), dx=Math.cos(a)*d, dy=Math.sin(a)*d-rnd(10,40), rot=rnd(-200,200);
      const an=s.animate([
        {transform:'translate(-50%,-50%) scale(.2) rotate(0deg)',opacity:1},
        {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1) rotate(${rot*.6}deg)`,opacity:1,offset:.55},
        {transform:`translate(calc(-50% + ${dx*1.1}px),calc(-50% + ${dy+60}px)) scale(.3) rotate(${rot}deg)`,opacity:0}
      ],{duration:rnd(800,1400),easing:'cubic-bezier(.2,.8,.3,1)'});
      an.onfinish=()=>s.remove();
    }
  }
  function ring(x,y){
    if(reduce) return;
    const r=document.createElement('div'); r.className='tapring'; r.style.left=x+'px'; r.style.top=y+'px';
    document.body.appendChild(r); setTimeout(()=>r.remove(),750);
  }
  function ripple(btn,e){
    const b=btn.getBoundingClientRect(), s=Math.max(b.width,b.height)*2.4;
    const r=document.createElement('span'); r.className='rip';
    r.style.cssText=`left:${e.clientX-b.left}px;top:${e.clientY-b.top}px;width:${s}px;height:${s}px`;
    btn.appendChild(r); setTimeout(()=>r.remove(),700);
  }
  function vibrate(ms){ try{ navigator.vibrate&&navigator.vibrate(ms); }catch(_){} }

  const startEl=document.getElementById('start');
  const isStarted=()=>startEl.classList.contains('gone');

  /* pointerdown: phản hồi NGAY khi chạm (không chờ nhả tay) */
  document.addEventListener('pointerdown',e=>{
    const btn=e.target.closest&&e.target.closest('button');
    if(btn){
      ripple(btn,e);
      const b=btn.getBoundingClientRect();
      burst(b.left+b.width/2,b.top+b.height/2,btn.closest('.qbtns')?22:12,btn.closest('.qbtns')?130:80);
      ring(e.clientX,e.clientY); vibrate(14);
      return;
    }
    if(e.target.closest&&e.target.closest('input')) return;
    if(!isStarted()){ burst(e.clientX,e.clientY,26,170); ring(e.clientX,e.clientY); vibrate(20); return; }
    burst(e.clientX,e.clientY,6,60); ring(e.clientX,e.clientY);
  },{passive:true});

  /* Space/Enter trên nút phải bấm được nút, không bị nhảy cảnh */
  document.addEventListener('keydown',e=>{
    if(e.target&&e.target.tagName==='BUTTON'&&(e.key===' '||e.key==='Enter')) e.stopPropagation();
  },true);

  /* nút "yes/no": nổ pháo hoa nhỏ ở giữa màn khi chọn xong */
  const q1=document.getElementById('q1');
  if(q1) q1.addEventListener('click',e=>{
    if(!e.target.closest('button')) return;
    const w=innerWidth,h=innerHeight;
    setTimeout(()=>burst(w/2,h*.4,34,Math.min(w,h)*.45),120);
    vibrate([18,40,18]);
  });

  /* thẻ kết: mưa tim nhẹ khi hiện ra */
  const fin=document.getElementById('sc-final');
  if(fin) new MutationObserver(()=>{
    if(fin.classList.contains('on')){
      let k=0; const t=setInterval(()=>{ burst(rnd(innerWidth*.15,innerWidth*.85),rnd(innerHeight*.15,innerHeight*.45),5,90); if(++k>6) clearInterval(t); },320);
    }
  }).observe(fin,{attributes:true,attributeFilter:['class']});
})();


/* ===== Script tiếp theo ===== */


/* ===== WOW PATCH 2: canvas fx (pháo hoa tim, trail, shockwave, confetti) ===== */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const $=s=>document.querySelector(s);
  const rnd=(a,b)=>a+Math.random()*(b-a), pick=a=>a[(Math.random()*a.length)|0];
  const HUES=[335,345,45,265,160,320];

  /* --- cực quang + vòng sóng ở màn mở quà (CSS thuần, chạy cả khi reduce) --- */
  const au=document.createElement('div'); au.id='aurora'; au.innerHTML='<i></i><i></i><i></i>';
  const bgs=$('#bgs'); bgs.parentNode.insertBefore(au,bgs.nextSibling);
  const start=$('#start'), bud=start.querySelector('.bud');
  if(bud){
    const wrap=document.createElement('div'); wrap.className='budwrap';
    bud.replaceWith(wrap);
    wrap.innerHTML='<span class="sring"></span><span class="sring"></span><span class="sring"></span>';
    wrap.appendChild(bud);
  }
  if(reduce) return;

  /* --- phần tử overlay --- */
  const mk=(tag,id)=>{const e=document.createElement(tag); e.id=id; document.body.appendChild(e); return e;};
  const cv=mk('canvas','fx2'), flashEl=mk('div','flash'), sweepEl=mk('div','sweep'), cglow=mk('div','cglow');
  const g=cv.getContext('2d');
  let W=0,H=0,D=1;
  function rs(){ D=Math.min(devicePixelRatio||1,2); W=innerWidth; H=innerHeight; cv.width=W*D; cv.height=H*D; g.setTransform(D,0,0,D,0,0); }
  rs(); addEventListener('resize',rs);

  const P=[], R=[], RING=[], CF=[];
  const MAXP=1600;

  function spark(x,y,vx,vy,h,life,s,grav,drag,tw){
    if(P.length>MAXP) return;
    P.push({x,y,px:x,py:y,vx,vy,h,l:life,m:life,s,g:grav,d:drag,tw:!!tw});
  }
  function ring(x,y,h,max){ RING.push({x,y,r:6,max:max||Math.min(W,H)*.55,h:h==null?335:h,a:1}); }
  function confetti(x,y,n,rain){
    for(let i=0;i<n;i++){
      CF.push({x:rain?rnd(0,W):x+rnd(-20,20), y:rain?rnd(-H*.3,-10):y,
        vx:rain?rnd(-1,1):rnd(-7,7), vy:rain?rnd(1.5,4):-rnd(6,15),
        r:rnd(0,6.28), vr:rnd(-.25,.25), w:rnd(5,10), h:rnd(8,16), c:`hsl(${pick(HUES)+rnd(-10,10)},100%,${rnd(60,80)}%)`, ph:rnd(0,6.28), l:rnd(260,420)});
    }
  }
  function flash(a){ flashEl.animate([{opacity:a},{opacity:0}],{duration:900,easing:'ease-out'}); }
  function sweep(){ sweepEl.style.opacity=1; sweepEl.animate([{transform:'translateX(-110%)',opacity:1},{transform:'translateX(260%)',opacity:1}],{duration:950,easing:'cubic-bezier(.4,0,.2,1)'}).onfinish=()=>{sweepEl.style.opacity=0;}; }

  /* --- nổ pháo hoa: tim hoặc tròn --- */
  function explode(x,y,h,shape){
    const m=Math.min(W,H);
    ring(x,y,h,m*.28);
    if(shape==='heart'){
      const k=m*.00085*rnd(.9,1.15);
      [[1,86],[.55,48]].forEach(([sc,n])=>{
        for(let i=0;i<n;i++){
          const t=i/n*6.2832, hx=16*Math.pow(Math.sin(t),3),
                hy=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
          spark(x,y,hx*k*sc,hy*k*sc,h+rnd(-10,10),rnd(60,85),2.4,.018,.94,1);
        }
      });
      for(let i=0;i<46;i++){ const a=rnd(0,6.28), s=rnd(.4,3.2)*m*.0016; spark(x,y,Math.cos(a)*s*3,Math.sin(a)*s*3,45+rnd(-10,10),rnd(30,60),1.4,.03,.93,1); }
    } else {
      const sp=m*.0105;
      for(let i=0;i<110;i++){ const a=rnd(0,6.28), s=sp*rnd(.55,1); spark(x,y,Math.cos(a)*s,Math.sin(a)*s,h+(i%2?rnd(20,50):0),rnd(55,85),2.1,.035,.94,1); }
      for(let i=0;i<30;i++){ const a=i/30*6.28, s=sp*.5; spark(x,y,Math.cos(a)*s,Math.sin(a)*s,50,rnd(45,60),1.6,.03,.95,1); }
    }
  }
  function launch(tx,ty,shape,h,delay){
    setTimeout(()=>{ R.push({x:tx+rnd(-60,60),y:H+10,tx,ty,h:h==null?pick(HUES):h,shape:shape||(Math.random()<.5?'heart':'ring')}); },delay||0);
  }

  /* --- vòng lặp vẽ --- */
  let last=performance.now(), dirty=false;
  function loop(t){
    const f=Math.min(3,(t-last)/16.667); last=t;
    if(P.length||R.length||RING.length||CF.length){
      dirty=true;
      g.globalCompositeOperation='source-over'; g.clearRect(0,0,W,H);
      /* confetti */
      for(let i=CF.length-1;i>=0;i--){
        const c=CF[i]; c.ph+=.08*f; c.vy=Math.min(5,c.vy+.14*f); c.vx*=Math.pow(.985,f);
        c.x+=(c.vx+Math.sin(c.ph)*1.2)*f; c.y+=c.vy*f; c.r+=c.vr*f; c.l-=f;
        if(c.l<=0||c.y>H+30){ CF[i]=CF[CF.length-1]; CF.pop(); continue; }
        g.save(); g.translate(c.x,c.y); g.rotate(c.r); g.scale(1,Math.abs(Math.cos(c.ph)));
        g.globalAlpha=Math.min(1,c.l/40); g.fillStyle=c.c; g.fillRect(-c.w/2,-c.h/2,c.w,c.h); g.restore();
      }
      g.globalAlpha=1; g.globalCompositeOperation='lighter';
      /* sóng xung kích */
      for(let i=RING.length-1;i>=0;i--){
        const r=RING[i]; r.r+=(r.max-r.r)*.07*f+2*f; r.a=Math.max(0,1-r.r/r.max);
        if(r.a<=.02){ RING[i]=RING[RING.length-1]; RING.pop(); continue; }
        g.lineWidth=1+r.a*5; g.strokeStyle=`hsla(${r.h},100%,70%,${r.a*.8})`;
        g.shadowColor=`hsl(${r.h},100%,60%)`; g.shadowBlur=18;
        g.beginPath(); g.arc(r.x,r.y,r.r,0,6.2832); g.stroke();
      }
      g.shadowBlur=0;
      /* tên lửa */
      for(let i=R.length-1;i>=0;i--){
        const r=R[i], dx=r.tx-r.x, dy=r.ty-r.y, d=Math.hypot(dx,dy);
        if(d<14){ explode(r.tx,r.ty,r.h,r.shape); flash(.1); R[i]=R[R.length-1]; R.pop(); continue; }
        const s=Math.min(d,(8+d*.035)*f); r.x+=dx/d*s; r.y+=dy/d*s;
        spark(r.x,r.y,rnd(-.4,.4),rnd(.5,1.4),rnd(35,55),rnd(14,24),1.8,.02,.95);
        g.fillStyle='rgba(255,240,220,.95)'; g.beginPath(); g.arc(r.x,r.y,2.4,0,6.2832); g.fill();
      }
      /* tia lửa */
      g.lineCap='round';
      for(let i=P.length-1;i>=0;i--){
        const p=P[i]; p.px=p.x; p.py=p.y;
        const dr=Math.pow(p.d,f); p.vx*=dr; p.vy=p.vy*dr+p.g*f; p.x+=p.vx*f; p.y+=p.vy*f; p.l-=f;
        if(p.l<=0){ P[i]=P[P.length-1]; P.pop(); continue; }
        let a=Math.min(1,p.l/p.m*1.7); if(p.tw&&p.l<p.m*.5&&Math.random()<.3) a*=.35;
        g.strokeStyle=`hsla(${p.h},100%,${62+a*18}%,${a})`; g.lineWidth=p.s;
        g.beginPath(); g.moveTo(p.px,p.py); g.lineTo(p.x,p.y); g.stroke();
        if(p.s>1.9){ g.fillStyle=`hsla(${p.h},100%,78%,${a*.45})`; g.beginPath(); g.arc(p.x,p.y,p.s*1.9,0,6.2832); g.fill(); }
      }
    } else if(dirty){ g.clearRect(0,0,W,H); dirty=false; }

    /* tilt mượt */
    tcx+=(ttx-tcx)*.08*f; tcy+=(tty-tcy)*.08*f;
    if(Math.abs(tcx-lx)>.01||Math.abs(tcy-ly)>.01){ lx=tcx; ly=tcy; const s=document.documentElement.style; s.setProperty('--tx',tcx.toFixed(2)); s.setProperty('--ty',tcy.toFixed(2)); }
    requestAnimationFrame(loop);
  }
  let ttx=0,tty=0,tcx=0,tcy=0,lx=0,ly=0;
  requestAnimationFrame(loop);

  /* --- trail bám theo tay + quầng sáng --- */
  let glowT=null, th=0, lastX=-1, lastY=-1;
  function trail(x,y){
    th=(th+6)%360;
    const hue=[335,345,45,265][(th/90)|0]+rnd(-8,8);
    const dx=lastX<0?0:x-lastX, dy=lastY<0?0:y-lastY;
    const n=Math.min(4,1+Math.hypot(dx,dy)/18|0);
    for(let i=0;i<n;i++) spark(x-dx*i/n+rnd(-3,3),y-dy*i/n+rnd(-3,3),rnd(-.7,.7)-dx*.02,rnd(-.7,.7)+.35,hue,rnd(26,48),rnd(1.4,3),.03,.95,1);
    lastX=x; lastY=y;
  }
  function moveGlow(x,y){
    cglow.style.transform=`translate3d(${x}px,${y}px,0)`; cglow.style.opacity=1;
    clearTimeout(glowT); glowT=setTimeout(()=>{cglow.style.opacity=0;lastX=lastY=-1;},900);
  }
  addEventListener('pointermove',e=>{
    trail(e.clientX,e.clientY); moveGlow(e.clientX,e.clientY);
    tty=(e.clientX/W-.5)*12; ttx=-(e.clientY/H-.5)*9;
  },{passive:true});
  addEventListener('pointerup',e=>{ if(e.pointerType!=='mouse'){ clearTimeout(glowT); glowT=setTimeout(()=>{cglow.style.opacity=0;lastX=lastY=-1;},350);} },{passive:true});
  addEventListener('deviceorientation',e=>{
    if(e.gamma==null||e.pointerType) return;
    tty=Math.max(-25,Math.min(25,e.gamma))*.4;
    ttx=-Math.max(-25,Math.min(25,(e.beta||45)-45))*.3;
  },{passive:true});

  /* --- sự kiện chạm: nút / nền --- */
  const fin=$('#sc-final');
  const finalOn=()=>fin&&fin.classList.contains('on');
  addEventListener('pointerdown',e=>{
    moveGlow(e.clientX,e.clientY);
    for(let i=0;i<16;i++){ const a=rnd(0,6.28), s=rnd(1,5); spark(e.clientX,e.clientY,Math.cos(a)*s,Math.sin(a)*s,pick(HUES),rnd(22,42),rnd(1.5,2.8),.05,.93,1); }
    ring(e.clientX,e.clientY,pick(HUES),90);
    if(finalOn() && !(e.target.closest&&e.target.closest('button,input'))){
      R.push({x:e.clientX,y:H+10,tx:e.clientX,ty:Math.max(H*.12,Math.min(e.clientY,H*.55)),h:pick(HUES),shape:Math.random()<.65?'heart':'ring'});
    }
  },{passive:true});

  /* --- mở quà: bùng nổ --- */
  let opened=false;
  start.addEventListener('click',()=>{
    if(opened) return; opened=true;
    flash(.95); sweep();
    const cx=W/2, cy=H*.4;
    [335,45,265].forEach((h,i)=>setTimeout(()=>ring(cx,cy,h,Math.max(W,H)*.8),i*140));
    confetti(cx,H*.55,150);
    launch(W*.25,H*.28,'heart',335,200); launch(W*.75,H*.26,'heart',265,500);
    launch(W*.5,H*.18,'heart',45,850);
  });

  /* --- mỗi lần đổi cảnh: quét sáng + sóng + pháo nhỏ --- */
  document.querySelectorAll('.scene').forEach(sc=>{
    new MutationObserver(ms=>{
      ms.forEach(m=>{
        const was=(m.oldValue||'').split(/\s+/).includes('on'), now=sc.classList.contains('on');
        if(now&&!was&&opened){
          if(sc.id==='sc-final') return;
          ring(W/2,H*.4,pick(HUES),Math.max(W,H)*.6); sweep(); flash(.12);
          if(Math.random()<.6) launch(rnd(W*.2,W*.8),rnd(H*.12,H*.3),'ring');
        }
      });
    }).observe(sc,{attributes:true,attributeFilter:['class'],attributeOldValue:true});
  });

  /* --- trả lời câu hỏi: pháo trái tim giữa màn --- */
  const q1=$('#q1');
  if(q1) q1.addEventListener('click',e=>{
    if(!e.target.closest('button')) return;
    flash(.35); confetti(W/2,H*.62,90);
    launch(W*.5,H*.3,'heart',335,0); launch(W*.25,H*.36,'ring',265,280); launch(W*.75,H*.36,'ring',45,420);
  });

  /* --- thẻ kết: đại tiệc --- */
  let finT=null;
  if(fin) new MutationObserver(ms=>{
    const on=finalOn();
    if(on&&!finT){
      flash(.7); sweep(); ring(W/2,H*.4,335,Math.max(W,H)*.9); confetti(0,0,170,true);
      launch(W*.3,H*.25,'heart',335,150); launch(W*.7,H*.22,'heart',265,450); launch(W*.5,H*.14,'heart',45,800);
      finT=setInterval(()=>{
        if(document.hidden) return;
        launch(rnd(W*.12,W*.88),rnd(H*.1,H*.42),Math.random()<.55?'heart':'ring');
        if(Math.random()<.25) confetti(0,0,26,true);
      },1100);
    } else if(!on&&finT){ clearInterval(finT); finT=null; }
  }).observe(fin,{attributes:true,attributeFilter:['class']});
})();
