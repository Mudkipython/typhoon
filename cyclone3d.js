(() => {
  'use strict';
  const QUALITY = { high: 1900, balanced: 1000, eco: 420 };
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const mobile=()=>matchMedia('(max-width:760px)').matches;
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoQuality=()=> reduced()?'eco':mobile()?'eco':((navigator.deviceMemory||4)>=8?'high':'balanced');
  const colorFor=(wind=0)=>wind<17?'#38bdf8':wind<25?'#facc15':wind<33?'#fb923c':wind<42?'#f43f5e':wind<51?'#ec4899':'#a855f7';
  function destination(p,bearing,km){const R=6371,d=km/R,t=bearing*Math.PI/180,p1=p.lat*Math.PI/180,l1=p.lon*Math.PI/180;const p2=Math.asin(Math.sin(p1)*Math.cos(d)+Math.cos(p1)*Math.sin(d)*Math.cos(t));const l2=l1+Math.atan2(Math.sin(t)*Math.sin(d)*Math.cos(p1),Math.cos(d)-Math.sin(p1)*Math.sin(p2));return{lat:p2*180/Math.PI,lon:((l2*180/Math.PI+540)%360)-180};}
  class FX {
    constructor(){this.map=null;this.canvas=null;this.ctx=null;this.enabled=false;this.quality='auto';this.options={particles:true,eyewall:true,trail:true};this.storm=null;this.particles=[];this.raf=0;this.start=performance.now();this.resize=this.resize.bind(this);this.draw=this.draw.bind(this);}
    attach(map){if(!map)return false;if(this.map===map)return true;this.map=map;const container=map.getContainer();let canvas=container.querySelector('#cycloneFxCanvas');if(!canvas){canvas=document.createElement('canvas');canvas.id='cycloneFxCanvas';canvas.className='cyclone-fx-canvas';container.appendChild(canvas);}this.canvas=canvas;this.ctx=canvas.getContext('2d');map.on('resize',this.resize);map.on('move',()=>this.enabled&&this.request());this.resize();this.rebuild();this.request();return true;}
    resize(){if(!this.canvas||!this.map)return;const rect=this.map.getContainer().getBoundingClientRect(),dpr=Math.min(2,devicePixelRatio||1);this.canvas.width=Math.max(1,Math.round(rect.width*dpr));this.canvas.height=Math.max(1,Math.round(rect.height*dpr));this.canvas.style.width=rect.width+'px';this.canvas.style.height=rect.height+'px';this.ctx?.setTransform(dpr,0,0,dpr,0,0);this.request();}
    rebuild(){const q=this.quality==='auto'?autoQuality():this.quality,count=QUALITY[q]||QUALITY.balanced;this.particles=Array.from({length:count},()=>({r:Math.pow(Math.random(),.68),a:Math.random()*Math.PI*2,arm:Math.floor(Math.random()*5),seed:Math.random(),lift:.2+Math.random()*.8}));}
    setEnabled(v){this.enabled=!!v;if(this.canvas)this.canvas.hidden=!this.enabled;this.request();}
    setQuality(q){if(q&&q!==this.quality){this.quality=q;this.rebuild();}}
    setOptions(o){this.options={...this.options,...o};this.request();}
    setStorm(s){this.storm=s?{...s}:null;this.request();}
    request(){if(!this.raf)this.raf=requestAnimationFrame(this.draw);}
    screenRadius(center,radiusKm){if(!this.map)return 150;const a=this.map.project([center.lon,center.lat]),b=this.map.project([destination(center,90,radiusKm).lon,destination(center,90,radiusKm).lat]);return clamp(Math.abs(b.x-a.x),70,mobile()?170:300);}
    drawTrail(points,color,dashed=false,height=0){if(!this.ctx||!this.map||!points||points.length<2)return;const ctx=this.ctx;ctx.save();ctx.beginPath();points.forEach((p,i)=>{const q=this.map.project([p.lon,p.lat]);const lift=(i/(points.length-1||1))*height;const x=q.x,y=q.y-lift;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.strokeStyle=color;ctx.lineWidth=dashed?3:4;ctx.globalAlpha=.85;ctx.shadowColor=color;ctx.shadowBlur=12;ctx.setLineDash(dashed?[9,8]:[]);ctx.stroke();ctx.restore();}
    draw(){this.raf=0;if(!this.enabled||!this.ctx||!this.canvas||!this.storm||!this.map)return;const ctx=this.ctx,rect=this.map.getContainer().getBoundingClientRect();ctx.clearRect(0,0,rect.width,rect.height);const center=this.map.project([+this.storm.lon,+this.storm.lat]);if(center.x<-350||center.y<-350||center.x>rect.width+350||center.y>rect.height+350){this.request();return;}const wind=+this.storm.windMs||25,radiusKm=+this.storm.radiusKm||Math.max(200,150+wind*7),R=this.screenRadius(this.storm,radiusKm),t=(performance.now()-this.start)/1000,dir=(+this.storm.lat<0?-1:1),color=colorFor(wind),intensity=clamp((wind-10)/45,.25,1);
      if(this.options.trail){this.drawTrail(this.storm.observed,'#38bdf8',false,18);this.drawTrail((this.storm.observed?.length?[this.storm.observed.at(-1),...(this.storm.forecast||[])]:this.storm.forecast),'#fb923c',true,46);}
      ctx.save();ctx.translate(center.x,center.y);ctx.globalCompositeOperation='lighter';
      if(this.options.particles){for(const p of this.particles){const drift=(p.seed+t*(.018+.022*intensity))%1;const r=((p.r-drift*.10+1)%1);const rr=(.13+Math.pow(r,.76)*.87)*R;const theta=p.a+dir*(t*(.38+intensity*.72)*(1.25-r*.48)+r*11.2+p.arm*1.28);const z=(1-r)*R*.28*p.lift;const x=Math.cos(theta)*rr,y=Math.sin(theta)*rr*.56-z;const len=2.5+intensity*4.5+(1-r)*4;const alpha=.10+(1-r)*.48;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-Math.sin(theta)*len*dir,y+Math.cos(theta)*len*.56*dir);ctx.strokeStyle=color;ctx.globalAlpha=alpha;ctx.lineWidth=.7+(1-r)*1.5;ctx.stroke();}}
      if(this.options.eyewall){const eye=clamp(R*(.11-.035*intensity),14,36);const wall=eye*1.8;const g=ctx.createRadialGradient(0,-R*.04,eye*.4,0,0,R*.48);g.addColorStop(0,'rgba(2,10,20,.98)');g.addColorStop(.09,'rgba(2,10,20,.96)');g.addColorStop(.12,color+'dd');g.addColorStop(.18,'rgba(255,255,255,.72)');g.addColorStop(.28,color+'55');g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=.92;ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,R*.54,R*.31,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.72)';ctx.lineWidth=2.2;ctx.shadowColor=color;ctx.shadowBlur=20;ctx.beginPath();ctx.ellipse(0,-R*.02,wall,wall*.56,0,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=.96;ctx.fillStyle='rgba(1,8,17,.94)';ctx.beginPath();ctx.ellipse(0,-R*.02,eye,eye*.58,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.55;for(let i=1;i<=3;i++){ctx.strokeStyle=color;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,-i*10,wall*(1+i*.18),wall*.56*(1+i*.12),0,0,Math.PI*2);ctx.stroke();}}
      ctx.restore();ctx.globalCompositeOperation='source-over';
      if(!reduced())this.request();
    }
  }
  const fx=new FX();
  window.CycloneFX={isAvailable:()=>!!document.createElement('canvas').getContext,attach:m=>fx.attach(m),setEnabled:v=>fx.setEnabled(v),setQuality:q=>fx.setQuality(q),setOptions:o=>fx.setOptions(o),setStorm:s=>fx.setStorm(s)};
  dispatchEvent(new Event('cyclonefxready'));
})();
