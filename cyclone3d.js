(() => {
'use strict';
const QUALITY={high:2400,balanced:1300,eco:520};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const mobile=()=>matchMedia('(max-width:760px)').matches;
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const autoQuality=()=>reduced()?'eco':mobile()?'eco':((navigator.deviceMemory||4)>=8?'high':'balanced');
const colorFor=w=>w<17?'#38bdf8':w<25?'#facc15':w<33?'#fb923c':w<42?'#f43f5e':w<51?'#ec4899':'#a855f7';
function destination(p,b,km){const R=6371,d=km/R,t=b*Math.PI/180,p1=p.lat*Math.PI/180,l1=p.lon*Math.PI/180,p2=Math.asin(Math.sin(p1)*Math.cos(d)+Math.cos(p1)*Math.sin(d)*Math.cos(t)),l2=l1+Math.atan2(Math.sin(t)*Math.sin(d)*Math.cos(p1),Math.cos(d)-Math.sin(p1)*Math.sin(p2));return{lat:p2*180/Math.PI,lon:((l2*180/Math.PI+540)%360)-180};}
class FX{
constructor(){this.map=null;this.canvas=null;this.ctx=null;this.enabled=false;this.quality='auto';this.options={particles:true,eyewall:true,trail:true};this.storm=null;this.particles=[];this.raf=0;this.start=performance.now();this.resize=this.resize.bind(this);this.draw=this.draw.bind(this);}
attach(map){if(!map)return false;if(this.map===map)return true;this.map=map;const c=map.getContainer();let x=c.querySelector('#cycloneFxCanvas');if(!x){x=document.createElement('canvas');x.id='cycloneFxCanvas';x.className='cyclone-fx-canvas';c.appendChild(x)}this.canvas=x;this.ctx=x.getContext('2d');map.on('resize',this.resize);map.on('move',()=>this.enabled&&this.request());this.resize();this.rebuild();this.request();return true;}
resize(){if(!this.canvas||!this.map)return;const r=this.map.getContainer().getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);this.canvas.width=Math.max(1,Math.round(r.width*d));this.canvas.height=Math.max(1,Math.round(r.height*d));this.canvas.style.width=r.width+'px';this.canvas.style.height=r.height+'px';this.ctx?.setTransform(d,0,0,d,0,0);this.request();}
rebuild(){const q=this.quality==='auto'?autoQuality():this.quality,n=QUALITY[q]||QUALITY.balanced;this.particles=Array.from({length:n},()=>({r:Math.pow(Math.random(),.68),a:Math.random()*Math.PI*2,arm:Math.floor(Math.random()*6),seed:Math.random(),lift:.2+Math.random()*.8}));}
setEnabled(v){this.enabled=!!v;if(this.canvas)this.canvas.hidden=!this.enabled;this.request();}
setQuality(q){if(q&&q!==this.quality){this.quality=q;this.rebuild()}}
setOptions(o){this.options={...this.options,...o};this.request()}
setStorm(s){this.storm=s?{...s}:null;this.request()}
request(){if(!this.raf)this.raf=requestAnimationFrame(this.draw)}
screenRadius(c,km){const a=this.map.project([c.lon,c.lat]),b=this.map.project([destination(c,90,km).lon,destination(c,90,km).lat]);return clamp(Math.abs(b.x-a.x),85,mobile()?190:340)}
drawMotionPath(points,color,t){if(!this.options.trail||!points?.length)return;const ctx=this.ctx,projected=points.map(p=>this.map.project([p.lon,p.lat]));ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<projected.length;i++){const q=projected[i],age=(projected.length-1-i)/(projected.length||1),pulse=.55+.45*Math.sin(t*2.2+i*.9);ctx.globalAlpha=.12+(1-age)*.45;ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=12;ctx.beginPath();ctx.arc(q.x,q.y-10*(1-age),3+(1-age)*5*pulse,0,Math.PI*2);ctx.fill();}
for(let k=0;k<18;k++){const phase=(t*.12+k/18)%1,pos=phase*(projected.length-1),i=Math.floor(pos),f=pos-i;if(!projected[i]||!projected[i+1])continue;const x=projected[i].x+(projected[i+1].x-projected[i].x)*f,y=projected[i].y+(projected[i+1].y-projected[i].y)*f;ctx.globalAlpha=.18+.6*(1-phase);ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,1.6+3*(1-phase),0,Math.PI*2);ctx.fill();}
ctx.restore();}
draw(){this.raf=0;if(!this.enabled||!this.ctx||!this.storm||!this.map)return;const ctx=this.ctx,r=this.map.getContainer().getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);const c=this.map.project([+this.storm.lon,+this.storm.lat]);if(c.x<-400||c.y<-400||c.x>r.width+400||c.y>r.height+400){this.request();return}const wind=+this.storm.windMs||28,km=+this.storm.radiusKm||Math.max(220,170+wind*7),R=this.screenRadius(this.storm,km),t=(performance.now()-this.start)/1000,dir=(+this.storm.lat<0?-1:1),color=colorFor(wind),intensity=clamp((wind-10)/45,.25,1);
this.drawMotionPath([...(this.storm.observed||[]),...(this.storm.forecast||[])],color,t);
ctx.save();ctx.translate(c.x,c.y);ctx.globalCompositeOperation='lighter';
if(this.options.particles){for(const p of this.particles){const drift=(p.seed+t*(.022+.03*intensity))%1,rr=(.14+Math.pow((p.r-drift*.12+1)%1,.75)*.86)*R,theta=p.a+dir*(t*(.46+intensity*.85)*(1.25-p.r*.45)+p.r*12.5+p.arm*1.06),z=(1-p.r)*R*.3*p.lift,x=Math.cos(theta)*rr,y=Math.sin(theta)*rr*.55-z,len=3+intensity*6+(1-p.r)*4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-Math.sin(theta)*len*dir,y+Math.cos(theta)*len*.55*dir);ctx.strokeStyle=color;ctx.globalAlpha=.1+(1-p.r)*.5;ctx.lineWidth=.8+(1-p.r)*1.7;ctx.stroke();}}
if(this.options.eyewall){const eye=clamp(R*(.105-.035*intensity),15,38),wall=eye*1.9,g=ctx.createRadialGradient(0,-R*.03,eye*.25,0,0,R*.56);g.addColorStop(0,'rgba(2,8,18,.98)');g.addColorStop(.09,'rgba(2,8,18,.98)');g.addColorStop(.13,color+'ee');g.addColorStop(.2,'rgba(255,255,255,.75)');g.addColorStop(.34,color+'55');g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=.94;ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,R*.6,R*.34,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.78)';ctx.lineWidth=2.4;ctx.shadowColor=color;ctx.shadowBlur=24;ctx.beginPath();ctx.ellipse(0,-R*.02,wall,wall*.56,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(1,7,16,.96)';ctx.beginPath();ctx.ellipse(0,-R*.02,eye,eye*.58,0,0,Math.PI*2);ctx.fill();}
ctx.restore();ctx.globalCompositeOperation='source-over';if(!reduced())this.request();}
}
const fx=new FX();window.CycloneFX={isAvailable:()=>!!document.createElement('canvas').getContext,attach:m=>fx.attach(m),setEnabled:v=>fx.setEnabled(v),setQuality:q=>fx.setQuality(q),setOptions:o=>fx.setOptions(o),setStorm:s=>fx.setStorm(s)};dispatchEvent(new Event('cyclonefxready'));
})();