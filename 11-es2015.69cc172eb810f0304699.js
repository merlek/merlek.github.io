(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{ElCL:function(t,e,s){"use strict";s.r(e);var n=s("8Y7J");class i{}var a=s("pMnS");class r{static setCookie(t,e,s){const n=new Date;n.setTime(n.getTime()+24*s*60*60*1e3);const i="expires="+n.toUTCString();document.cookie=t+"="+e+";"+i+";path=/"}static getCookie(t){const e=t+"=",s=decodeURIComponent(document.cookie).split(";");for(let n=0;n<s.length;n++){let t=s[n];for(;" "===t.charAt(0);)t=t.substring(1);if(0===t.indexOf(e))return t.substring(e.length,t.length)}return""}}var h=s("oFjw"),o=s("dQPR");class l{constructor(t,e,s,n,i=[]){this.cols=t,this.rows=e,this.moves=s,this.start=n,this.snake=i}willEat(t){return this.nextHead().equals(t)}inSnake(t){return this.snake.some(e=>e.equals(t))}willCrash(t){const e=this.nextHead();return this.inSnake(e)||t&&(t.inSnake(e)||this.snake[0]&&this.snake[0].equals(t.snake[0]))}validMove(t){return this.moves[0].x+t.x!==0||this.moves[0].y+t.y!==0}nextMoves(){return this.moves.length>1?this.moves.slice(1):this.moves}nextHead(){return 0===this.snake.length?this.start:new h.b(Object(o.a)(this.cols)(this.snake[0].x+this.moves[0].x),Object(o.a)(this.rows)(this.snake[0].y+this.moves[0].y))}nextSnake(t,e){return this.willCrash(e)?[]:t.some(t=>this.willEat(t))?[this.nextHead()].concat(this.snake):[this.nextHead()].concat(this.snake.slice(0,this.snake.length-1))}merge(t){return Object.assign(new l(this.cols,this.rows,this.moves,this.start,this.snake),t)}next(t,e,s,n){return new l(t,e,this.nextMoves(),this.start,this.nextSnake(s,n))}enqueue(t){return this.validMove(t)?this.merge({moves:this.moves.concat([t])}):this}direction(){const t=this.moves[0];return t.equals(h.a.NORTH)?270:t.equals(h.a.SOUTH)?90:t.equals(h.a.EAST)?0:t.equals(h.a.WEST)?180:null}segments(){return this.snake.reduce((t,e)=>{if(0===t.length)t.push([e]);else{const s=t[t.length-1];1===e.distance(s[s.length-1])?s.push(e):t.push([e])}return t},[])}isAlive(){return this.snake.length>0}}let u=(()=>{class t{constructor(t=!1,e=24,s=24,n=[],i=[new h.b(20,2),new h.b(2,20)]){this.isTwoPlayers=t,this.cols=e,this.rows=s,this.snakes=n,this.apples=i,0===this.snakes.length&&(this.snakes=[this.snakeFromState(h.a.EAST,new h.b(2,2))],this.isTwoPlayers&&this.snakes.push(this.snakeFromState(h.a.NORTH,new h.b(20,20))))}snakeFromState(t,e){return new l(this.cols,this.rows,[t],e,[e])}isCrash(){return this.snakes.reduce((t,e)=>t||!e.isAlive(),!1)}willEat(t){return this.snakes.reduce((e,s)=>e||s.willEat(t),!1)}newApple(){let t;do{t=this.snakes.reduce((t,e)=>e.inSnake(t)?null:t,this.rndPos())}while(!t);return t}nextApple(t){return this.willEat(t)?this.apples.length<=1||0===Object(o.b)(0)(2)?this.newApple():null:t}nextApples(){const e=this.apples.map(t=>this.nextApple(t)).filter(Boolean);return this.apples.length<t.MAX_APPLES&&0===Object(o.b)(0)(100)&&e.push(this.newApple()),e}nextSnakes(){return this.snakes.map((t,e,s)=>t.next(this.cols,this.rows,this.apples,s.length>1?s[(e+1)%s.length]:null))}rndPos(){return new h.b(Object(o.b)(0)(this.cols),Object(o.b)(0)(this.rows))}merge(e){return Object.assign(new t,this,e)}next(){return new t(this.isTwoPlayers,this.cols,this.rows,this.nextSnakes(),this.nextApples())}enqueue(t,e){return t%=this.snakes.length,this.merge({snakes:this.snakes.map((s,n)=>n===t?this.snakes[t].enqueue(e):s)})}}return t.MAX_APPLES=5,t})();var c=s("uclk");let d=(()=>{class t extends c.a{constructor(e,s){super(e,s),this.draw=(e=this.ctx)=>{e.save(),e.fillStyle=t.BACKGROUND_COLOR,e.fillRect(0,0,this.canvas.width,this.canvas.height),e.restore()}}}return t.BACKGROUND_COLOR="#232323",t})();var g=s("UMXM");class w extends c.a{constructor(t,e,s,n){super(t,e),this.buttons=[],this.eventListeners=[],this.draw=(t=this.ctx)=>{this.clear(),t.save(),this.buttons.forEach(g.a.drawButton(t)),t.restore()};const i=t.width/4,a=t.height/8,r=t.width/2-i/2,h=t.height/2-a/2;this.buttons.push({x:r,y:h,width:i,height:a,radius:5,fillStyle:"#005FA1",hoverStyle:"#00487b",text:"Paused",font:g.a.getFont(this.y(1)),textStyle:"white",enabled:!0,onClick:()=>{s()}},{x:r,y:h+2*a,width:i,height:a,radius:5,fillStyle:"#005fa1",hoverStyle:"#00487b",text:"Two Players",font:g.a.getFont(.8*this.y(1)),textStyle:"rgba(255, 255, 255, 1)",enabled:!0,onClick:()=>{n()}}),this.addEventListeners()}addEventListeners(t=this.canvas,e=this.buttons){return this.eventListeners.push(g.a.addButtonClickEventListener(t,e),g.a.addButtonHoverEventListener(t,e))}removeEventListeners(t=this.canvas,e=this.eventListeners){e.forEach(e=>{t.removeEventListener(e.type,e.function)})}enableButtons(t=this.buttons){t.forEach(t=>t.enabled=!0)}disableButtons(t=this.buttons){t.forEach(t=>t.enabled=!1)}show(){this.enableButtons(),this.draw()}hide(){this.clear(),this.disableButtons(),this.canvas.style.cursor="default"}ngOnDestroy(){this.removeEventListeners()}}let m=(()=>{class t extends c.a{constructor(e,s){super(e,s),this.draw=(e=this.ctx)=>s=>{e.save(),s.snakes.forEach((s,n)=>{s.isAlive()&&(e.strokeStyle=t.SNAKE_COLORS[n],this.drawSnake(e,s))}),e.restore()},this.drawSnakeSegment=t=>e=>{t.save(),t.lineWidth=Math.min(this.x(1),this.y(1)),t.lineCap="round",t.lineJoin="round";const s=e.shift();t.moveTo(this.x(s.x)+this.x(1)/2,this.y(s.y)+this.y(1)/2),t.beginPath(),t.lineTo(this.x(s.x)+this.x(1)/2,this.y(s.y)+this.y(1)/2),e.forEach(e=>{t.lineTo(this.x(e.x)+this.x(1)/2,this.y(e.y)+this.y(1)/2)}),t.stroke(),t.restore()}}drawSnake(t,e){e.segments().forEach(this.drawSnakeSegment(t)),this.drawSnakeHead(t,e)}drawSnakeHead(t,e){t.save();const s=e.snake[0];t.translate(this.x(s.x)+this.x(1)/2,this.y(s.y)+this.y(1)/2),t.rotate(Math.PI/180*e.direction());const n=0+3*this.x(1)/16,i=3*this.y(1)/16;t.fillStyle="white";let a=Math.min(this.x(1),this.y(1))/8;t.beginPath(),t.arc(n,0-i,a,0,2*Math.PI),t.arc(n,0+i,a,0,2*Math.PI),t.fill(),t.fillStyle="black",a/=2,t.beginPath(),t.arc(n+a,0-i,a,0,2*Math.PI),t.arc(n+a,0+i,a,0,2*Math.PI),t.fill(),t.restore()}}return t.SNAKE_COLORS=["#00c832","#c7c700"],t})(),p=(()=>{class t extends c.a{constructor(e,s){super(e,s),this.draw=(t,e=this.ctx)=>{this.clear(),this.snakeAnimator.draw()(t),this.drawApple(e)(t),t.isCrash()&&this.drawCrash(e)},this.drawApple=(e=this.ctx)=>s=>{e.save(),e.fillStyle=t.APPLE_COLOR,s.apples.forEach(t=>{g.a.drawRoundedRect(e,this.x(t.x),this.y(t.y),this.x(1),this.y(1))}),e.restore()},this.snakeAnimator=new m(e,s)}drawCrash(e=this.ctx){e.fillStyle=t.CRASH_COLOR,e.fillRect(0,0,this.canvas.width,this.canvas.height)}}return t.APPLE_COLOR="#ff3200",t.CRASH_COLOR="rgb(255,0,0)",t})();class b{constructor(t,e,s,n=new u(!0)){this.state=n,this.fps=10,this.paused=!1,this.update=t=>e=>{e-t>1e3/this.fps?(this.paused?this.pauseMenuAnimator.draw():(this.state=this.state.next(),this.gameAnimator.draw(this.state)),this.animationFrameId=window.requestAnimationFrame(this.update(e))):this.animationFrameId=window.requestAnimationFrame(this.update(t))},this.gameAnimator=new p(t,n),this.pauseMenuAnimator=new w(s,n,()=>this.pause(),()=>this.toggleTwoPlayers()),this.backgroundAnimator=new d(e,n)}start(){this.backgroundAnimator.draw(),this.gameAnimator.draw(this.state),this.pause(),this.animationFrameId=window.requestAnimationFrame(this.update(0))}ngOnDestroy(){this.animationFrameId&&(window.cancelAnimationFrame(this.animationFrameId),this.pauseMenuAnimator.ngOnDestroy())}keyEvent(t){switch(t){case" ":return this.pause(),!0;case"w":return this.state=this.state.enqueue(0,h.a.NORTH),!0;case"a":return this.state=this.state.enqueue(0,h.a.WEST),!0;case"s":return this.state=this.state.enqueue(0,h.a.SOUTH),!0;case"d":return this.state=this.state.enqueue(0,h.a.EAST),!0;case"i":case"ArrowUp":return this.state=this.state.enqueue(1,h.a.NORTH),!0;case"j":case"ArrowLeft":return this.state=this.state.enqueue(1,h.a.WEST),!0;case"k":case"ArrowDown":return this.state=this.state.enqueue(1,h.a.SOUTH),!0;case"l":case"ArrowRight":return this.state=this.state.enqueue(1,h.a.EAST),!0}return!1}pause(){(this.paused=!this.paused)?this.pauseMenuAnimator.show():this.pauseMenuAnimator.hide()}toggleTwoPlayers(){this.gameAnimator.draw(this.state=new u(!this.state.isTwoPlayers))}}let k=(()=>{class t{constructor(){this._highScore=0}ngOnInit(){this.scaleCanvas(),this.animator=new b(document.getElementById("game-layer"),document.getElementById("background-layer"),document.getElementById("ui-layer")),window.addEventListener("keydown",t=>{this.animator.keyEvent(t.key)&&t.preventDefault()}),this.animator.start(),this.highScore=+r.getCookie(t.COOKIE_NAME)}ngOnDestroy(){this.animator.ngOnDestroy()}get score(){return Math.max(...this.animator.state.snakes.map(t=>t.snake.length))}set score(t){}get highScore(){return this.score>this._highScore&&(this._highScore=this.score,r.setCookie(t.COOKIE_NAME,this._highScore,90)),this._highScore}set highScore(t){this._highScore=t}scaleCanvas(t){const e=document.getElementById("menu"),s=document.getElementById("main"),n=document.getElementById("stage"),i=document.getElementById("background-layer"),a=(window.innerHeight-e.offsetHeight-10)/i.height,r=s.offsetWidth/i.width,h=Math.min(r,a);Math.max(r,a),n.style.transformOrigin="0 0",n.style.transform="scale("+h+")"}}return t.COOKIE_NAME="snake-high-score",t})();var y=n.vb({encapsulation:0,styles:[["#stage[_ngcontent-%COMP%]{width:900px;height:900px;position:relative;box-sizing:content-box;border:1px solid;background-color:#fff}#stage[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{position:absolute}#stage[_ngcontent-%COMP%]   #ui-layer[_ngcontent-%COMP%]{z-index:3}#stage[_ngcontent-%COMP%]   #game-layer[_ngcontent-%COMP%]{z-index:2}#stage[_ngcontent-%COMP%]   #background-layer[_ngcontent-%COMP%]{z-index:1}"]],data:{}});function x(t){return n.Tb(0,[(t()(),n.xb(0,0,null,null,3,"div",[["id","stage"]],null,null,null,null,null)),(t()(),n.xb(1,0,null,null,0,"canvas",[["height","900"],["id","ui-layer"],["width","900"]],null,null,null,null,null)),(t()(),n.xb(2,0,null,null,0,"canvas",[["height","900"],["id","game-layer"],["width","900"]],null,null,null,null,null)),(t()(),n.xb(3,0,null,null,0,"canvas",[["height","900"],["id","background-layer"],["width","900"]],null,null,null,null,null))],null,null)}function v(t){return n.Tb(0,[(t()(),n.xb(0,0,null,null,1,"app-snake",[],null,[["window","resize"]],(function(t,e,s){var i=!0;return"window:resize"===e&&(i=!1!==n.Jb(t,1).scaleCanvas(s)&&i),i}),x,y)),n.wb(1,245760,null,0,k,[],null,null)],(function(t,e){t(e,1,0)}),null)}var S=n.tb("app-snake",k,v,{},{},[]),O=s("SVse"),f=s("s7LF"),A=s("iInd");class E{}s.d(e,"SnakeModuleNgFactory",(function(){return C}));var C=n.ub(i,[],(function(t){return n.Gb([n.Hb(512,n.l,n.fb,[[8,[a.a,S]],[3,n.l],n.B]),n.Hb(4608,O.o,O.n,[n.x,[2,O.D]]),n.Hb(4608,f.o,f.o,[]),n.Hb(1073742336,O.b,O.b,[]),n.Hb(1073742336,A.o,A.o,[[2,A.t],[2,A.k]]),n.Hb(1073742336,E,E,[]),n.Hb(1073742336,f.n,f.n,[]),n.Hb(1073742336,f.d,f.d,[]),n.Hb(1073742336,i,i,[]),n.Hb(1024,A.i,(function(){return[[{path:"",component:k}]]}),[])])}))}}]);