(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{ElCL:function(t,e,s){"use strict";s.r(e);var n=s("8Y7J");class i{}var a=s("pMnS");class r{static setCookie(t,e,s){const n=new Date;n.setTime(n.getTime()+24*s*60*60*1e3);const i="expires="+n.toUTCString();document.cookie=t+"="+e+";"+i+";path=/"}static getCookie(t){const e=t+"=",s=decodeURIComponent(document.cookie).split(";");for(let n=0;n<s.length;n++){let t=s[n];for(;" "===t.charAt(0);)t=t.substring(1);if(0===t.indexOf(e))return t.substring(e.length,t.length)}return""}}class h{constructor(t,e){this.x=t,this.y=e}equals(t){return null!=t&&this.x===t.x&&this.y===t.y}squaredDistance(t){return Math.pow(t.x-this.x,2)+Math.pow(t.y-this.y,2)}distance(t){return Math.sqrt(this.squaredDistance(t))}}let l=(()=>{class t{constructor(){}}return t.NORTH=new h(0,-1),t.SOUTH=new h(0,1),t.EAST=new h(1,0),t.WEST=new h(-1,0),t})();const o=(t,e)=>Math.floor(Math.random()*e)+t,u=t=>e=>(e%t+t)%t;class c{constructor(t,e,s,n,i,a=[]){this.cols=t,this.rows=e,this.moves=s,this.start=n,this.apple=i,this.snake=a}willEat(){return this.nextHead().equals(this.apple)}inSnake(t){return this.snake.some(e=>e.equals(t))}willCrash(t){const e=this.nextHead();return this.inSnake(e)||t&&(t.inSnake(e)||this.snake[0]&&this.snake[0].equals(t.snake[0]))}validMove(t){return this.moves[0].x+t.x!==0||this.moves[0].y+t.y!==0}nextMoves(){return this.moves.length>1?this.moves.slice(1):this.moves}nextHead(){return 0===this.snake.length?this.start:new h(u(this.cols)(this.snake[0].x+this.moves[0].x),u(this.rows)(this.snake[0].y+this.moves[0].y))}nextSnake(t){return this.willCrash(t)?[]:this.willEat()?[this.nextHead()].concat(this.snake):[this.nextHead()].concat(this.snake.slice(0,this.snake.length-1))}merge(t){return Object.assign(new c(this.cols,this.rows,this.moves,this.start,this.apple,this.snake),t)}next(t,e,s,n){return new c(t,e,this.nextMoves(),this.start,s,this.nextSnake(n))}enqueue(t){return this.validMove(t)?this.merge({moves:this.moves.concat([t])}):this}direction(){const t=this.moves[0];return t.equals(l.NORTH)?270:t.equals(l.SOUTH)?90:t.equals(l.EAST)?0:t.equals(l.WEST)?180:null}segments(){return this.snake.reduce((t,e)=>{if(0===t.length)t.push([e]);else{const s=t[t.length-1];1===e.distance(s[s.length-1])?s.push(e):t.push([e])}return t},[])}isAlive(){return this.snake.length>0}}class d{constructor(t=!1,e=24,s=24,n=[],i=new h(20,2)){this.isTwoPlayers=t,this.cols=e,this.rows=s,this.snakes=n,this.apple=i,0===this.snakes.length&&(this.snakes=[this.snakeFromState(l.EAST,new h(2,2))],this.isTwoPlayers&&this.snakes.push(this.snakeFromState(l.NORTH,new h(20,20))))}snakeFromState(t,e){return new c(this.cols,this.rows,[t],e,this.apple,[e])}isCrash(){return this.snakes.reduce((t,e)=>t||!e.isAlive(),!1)}willEat(){return this.snakes.reduce((t,e)=>t||e.willEat(),!1)}nextApple(){if(this.willEat()){let t;do{t=this.snakes.reduce((t,e)=>e.inSnake(t)?null:t,this.rndPos())}while(!t);return t}return this.apple}nextSnakes(){return this.snakes.map((t,e,s)=>t.next(this.cols,this.rows,this.apple,s.length>1?s[(e+1)%s.length]:null))}rndPos(){return new h(o(0,this.cols-1),o(0,this.rows-1))}merge(t){return Object.assign(new d,this,t)}next(){return new d(this.isTwoPlayers,this.cols,this.rows,this.nextSnakes(),this.nextApple())}enqueue(t,e){return t%=this.snakes.length,this.merge({snakes:this.snakes.map((s,n)=>n===t?this.snakes[t].enqueue(e):s)})}}let g=(()=>{class t{constructor(t,e,s,n=new d){this.state=n,this.fps=10,this.paused=!1,this.update=t=>e=>{e-t>1e3/this.fps?(this.paused||(this.state=this.state.next(),this.drawGame()),this.animationFrameId=window.requestAnimationFrame(this.update(e))):this.animationFrameId=window.requestAnimationFrame(this.update(t))},this.drawSnakeSegment=t=>e=>{t.save(),t.lineWidth=Math.min(this.x(1),this.y(1)),t.lineCap="round",t.lineJoin="round";const s=e.shift();t.moveTo(this.x(s.x)+this.x(1)/2,this.y(s.y)+this.y(1)/2),t.beginPath(),t.lineTo(this.x(s.x)+this.x(1)/2,this.y(s.y)+this.y(1)/2),e.forEach(e=>{t.lineTo(this.x(e.x)+this.x(1)/2,this.y(e.y)+this.y(1)/2)}),t.stroke(),t.restore()},this.backgroundCtx=e.getContext("2d",{alpha:!1}),this.canvasWidth=e.width,this.canvasHeight=e.height,this.gameCtx=t.getContext("2d"),this.uiCtx=s.getContext("2d")}start(){this.drawBackground(),this.drawGame(),this.pause(),this.animationFrameId=window.requestAnimationFrame(this.update(0))}drawGame(t=this.gameCtx){this.clearDrawing(t),this.drawSnakes(t,this.state),this.drawApple(t,this.state),this.state.isCrash()&&this.drawCrash(t)}clearDrawing(t){t.clearRect(0,0,this.canvasWidth,this.canvasHeight)}drawSnakes(e,s){e.save(),s.snakes.forEach((s,n)=>{s.isAlive()&&(e.strokeStyle=t.SNAKE_COLORS[n],this.drawSnake(e,s))}),e.restore()}drawSnake(t,e){e.segments().forEach(this.drawSnakeSegment(t)),this.drawSnakeHead(t,e)}drawSnakeHead(t,e){t.save();const s=e.snake[0];t.translate(this.x(s.x)+this.x(1)/2,this.y(s.y)+this.y(1)/2),t.rotate(Math.PI/180*e.direction());const n=0+3*this.x(1)/16,i=3*this.y(1)/16;t.fillStyle="white";let a=Math.min(this.x(1),this.y(1))/8;t.beginPath(),t.arc(n,0-i,a,0,2*Math.PI),t.arc(n,0+i,a,0,2*Math.PI),t.fill(),t.fillStyle="black",a/=2,t.beginPath(),t.arc(n+a,0-i,a,0,2*Math.PI),t.arc(n+a,0+i,a,0,2*Math.PI),t.fill(),t.restore()}drawApple(e,s){e.fillStyle=t.APPLE_COLOR,this.drawRoundedRect(e,this.x(s.apple.x),this.y(s.apple.y),this.x(1),this.y(1))}drawCrash(e){this.drawBackground(e,t.CRASH_COLOR)}drawPaused(t=this.uiCtx){t.save();const e=this.canvasWidth/2,s=this.canvasHeight/2,n=this.canvasWidth/4,i=this.canvasHeight/8;t.globalAlpha=.5,t.fillStyle="grey",this.drawRoundedRect(t,e-n/2,s-i/2,n,i),t.globalAlpha=1,t.fillStyle="white",t.font="24px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("Paused",e,s),t.restore()}drawBackground(e=this.backgroundCtx,s=t.BACKGROUND_COLOR){e.fillStyle=s,e.fillRect(0,0,this.canvasWidth,this.canvasHeight)}drawRoundedRect(t,e,s,n,i,a=10,r=!0,h=!1){if("number"==typeof a)a={tl:a,tr:a,br:a,bl:a};else{const t={tl:0,tr:0,br:0,bl:0};for(const e of Object.keys(t))a[e]=a[e]||t[e]}t.save(),t.beginPath(),t.moveTo(e+a.tl,s),t.lineTo(e+n-a.tr,s),t.quadraticCurveTo(e+n,s,e+n,s+a.tr),t.lineTo(e+n,s+i-a.br),t.quadraticCurveTo(e+n,s+i,e+n-a.br,s+i),t.lineTo(e+a.bl,s+i),t.quadraticCurveTo(e,s+i,e,s+i-a.bl),t.lineTo(e,s+a.tl),t.quadraticCurveTo(e,s,e+a.tl,s),t.closePath(),r&&t.fill(),h&&t.stroke(),t.restore()}destroy(){window.cancelAnimationFrame(this.animationFrameId)}keyEvent(t){switch(t){case" ":return this.pause(),!0;case"w":return this.state=this.state.enqueue(0,l.NORTH),!0;case"a":return this.state=this.state.enqueue(0,l.WEST),!0;case"s":return this.state=this.state.enqueue(0,l.SOUTH),!0;case"d":return this.state=this.state.enqueue(0,l.EAST),!0;case"i":case"ArrowUp":return this.state=this.state.enqueue(1,l.NORTH),!0;case"j":case"ArrowLeft":return this.state=this.state.enqueue(1,l.WEST),!0;case"k":case"ArrowDown":return this.state=this.state.enqueue(1,l.SOUTH),!0;case"l":case"ArrowRight":return this.state=this.state.enqueue(1,l.EAST),!0}return!1}x(t){return Math.round(t*this.canvasWidth/this.state.cols)}y(t){return Math.round(t*this.canvasHeight/this.state.rows)}pause(){(this.paused=!this.paused)?this.drawPaused():this.clearDrawing(this.uiCtx)}toggleTwoPlayers(){this.state=new d(!this.state.isTwoPlayers),this.drawGame()}}return t.SNAKE_COLORS=["#00c832","#c7c700"],t.APPLE_COLOR="#ff3200",t.BACKGROUND_COLOR="#232323",t.CRASH_COLOR="rgb(255,0,0)",t})(),w=(()=>{class t{constructor(){this._highScore=0}ngOnInit(){this.scaleCanvas(),this.animator=new g(document.getElementById("game-layer"),document.getElementById("background-layer"),document.getElementById("ui-layer")),window.addEventListener("keydown",t=>{this.animator.keyEvent(t.key)&&t.preventDefault()}),this.animator.start(),this.highScore=+r.getCookie(t.COOKIE_NAME)}ngOnDestroy(){this.animator.destroy()}get score(){return Math.max(...this.animator.state.snakes.map(t=>t.snake.length))}set score(t){}get highScore(){return this.score>this._highScore&&(this._highScore=this.score,r.setCookie(t.COOKIE_NAME,this._highScore,90)),this._highScore}set highScore(t){this._highScore=t}scaleCanvas(t){const e=document.getElementById("menu"),s=document.getElementById("main"),n=document.getElementById("stage"),i=document.getElementById("background-layer"),a=(window.innerHeight-e.offsetHeight-10)/i.height,r=s.offsetWidth/i.width,h=Math.min(r,a);Math.max(r,a),n.style.transformOrigin="0 0",n.style.transform="scale("+h+")"}}return t.COOKIE_NAME="snake-high-score",t})();var m=n.vb({encapsulation:0,styles:[["#stage[_ngcontent-%COMP%]{width:900px;height:900px;position:relative;box-sizing:content-box;border:1px solid;background-color:#fff}#stage[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{position:absolute}#stage[_ngcontent-%COMP%]   #ui-layer[_ngcontent-%COMP%]{z-index:3}#stage[_ngcontent-%COMP%]   #game-layer[_ngcontent-%COMP%]{z-index:2}#stage[_ngcontent-%COMP%]   #background-layer[_ngcontent-%COMP%]{z-index:1}"]],data:{}});function k(t){return n.Tb(0,[(t()(),n.xb(0,0,null,null,3,"div",[["id","stage"]],null,null,null,null,null)),(t()(),n.xb(1,0,null,null,0,"canvas",[["height","900"],["id","ui-layer"],["width","900"]],null,null,null,null,null)),(t()(),n.xb(2,0,null,null,0,"canvas",[["height","900"],["id","game-layer"],["width","900"]],null,null,null,null,null)),(t()(),n.xb(3,0,null,null,0,"canvas",[["height","900"],["id","background-layer"],["width","900"]],null,null,null,null,null))],null,null)}function p(t){return n.Tb(0,[(t()(),n.xb(0,0,null,null,1,"app-snake",[],null,[["window","resize"]],(function(t,e,s){var i=!0;return"window:resize"===e&&(i=!1!==n.Jb(t,1).scaleCanvas(s)&&i),i}),k,m)),n.wb(1,245760,null,0,w,[],null,null)],(function(t,e){t(e,1,0)}),null)}var x=n.tb("app-snake",w,p,{},{},[]),y=s("SVse"),v=s("s7LF"),b=s("iInd");class S{}s.d(e,"SnakeModuleNgFactory",(function(){return C}));var C=n.ub(i,[],(function(t){return n.Gb([n.Hb(512,n.l,n.fb,[[8,[a.a,x]],[3,n.l],n.B]),n.Hb(4608,y.o,y.n,[n.x,[2,y.D]]),n.Hb(4608,v.o,v.o,[]),n.Hb(1073742336,y.b,y.b,[]),n.Hb(1073742336,b.o,b.o,[[2,b.t],[2,b.k]]),n.Hb(1073742336,S,S,[]),n.Hb(1073742336,v.n,v.n,[]),n.Hb(1073742336,v.d,v.d,[]),n.Hb(1073742336,i,i,[]),n.Hb(1024,b.i,(function(){return[[{path:"",component:w}]]}),[])])}))}}]);