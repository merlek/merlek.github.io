function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{ElCL:function(e,t,n){"use strict";n.r(t);var a,s,i=n("8Y7J"),r=function e(){_classCallCheck(this,e)},l=n("pMnS"),u=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"setCookie",value:function(e,t,n){var a=new Date;a.setTime(a.getTime()+24*n*60*60*1e3);var s="expires="+a.toUTCString();document.cookie=e+"="+t+";"+s+";path=/"}},{key:"getCookie",value:function(e){for(var t=e+"=",n=decodeURIComponent(document.cookie).split(";"),a=0;a<n.length;a++){for(var s=n[a];" "===s.charAt(0);)s=s.substring(1);if(0===s.indexOf(t))return s.substring(t.length,s.length)}return""}}]),e}(),o=function(){function e(t,n){_classCallCheck(this,e),this.x=t,this.y=n}return _createClass(e,[{key:"equals",value:function(e){return null!=e&&this.x===e.x&&this.y===e.y}},{key:"squaredDistance",value:function(e){return Math.pow(e.x-this.x,2)+Math.pow(e.y-this.y,2)}},{key:"distance",value:function(e){return Math.sqrt(this.squaredDistance(e))}}]),e}(),h=function(){var e=function e(){_classCallCheck(this,e)};return e.NORTH=new o(0,-1),e.SOUTH=new o(0,1),e.EAST=new o(1,0),e.WEST=new o(-1,0),e}(),c=function(e,t){return Math.floor(Math.random()*t)+e},d=function(e){return function(t){return(t%e+e)%e}},v=function(){function e(t,n,a,s,i){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[];_classCallCheck(this,e),this.cols=t,this.rows=n,this.moves=a,this.start=s,this.apple=i,this.snake=r}return _createClass(e,[{key:"willEat",value:function(){return this.nextHead().equals(this.apple)}},{key:"inSnake",value:function(e){return this.snake.some((function(t){return t.equals(e)}))}},{key:"willCrash",value:function(e){var t=this.nextHead();return this.inSnake(t)||e&&(e.inSnake(t)||this.snake[0]&&this.snake[0].equals(e.snake[0]))}},{key:"validMove",value:function(e){return this.moves[0].x+e.x!==0||this.moves[0].y+e.y!==0}},{key:"nextMoves",value:function(){return this.moves.length>1?this.moves.slice(1):this.moves}},{key:"nextHead",value:function(){return 0===this.snake.length?this.start:new o(d(this.cols)(this.snake[0].x+this.moves[0].x),d(this.rows)(this.snake[0].y+this.moves[0].y))}},{key:"nextSnake",value:function(e){return this.willCrash(e)?[]:this.willEat()?[this.nextHead()].concat(this.snake):[this.nextHead()].concat(this.snake.slice(0,this.snake.length-1))}},{key:"merge",value:function(t){return Object.assign(new e(this.cols,this.rows,this.moves,this.start,this.apple,this.snake),t)}},{key:"next",value:function(t,n,a,s){return new e(t,n,this.nextMoves(),this.start,a,this.nextSnake(s))}},{key:"enqueue",value:function(e){return this.validMove(e)?this.merge({moves:this.moves.concat([e])}):this}},{key:"direction",value:function(){var e=this.moves[0];return e.equals(h.NORTH)?270:e.equals(h.SOUTH)?90:e.equals(h.EAST)?0:e.equals(h.WEST)?180:null}},{key:"segments",value:function(){return this.snake.reduce((function(e,t){if(0===e.length)e.push([t]);else{var n=e[e.length-1];1===t.distance(n[n.length-1])?n.push(t):e.push([t])}return e}),[])}},{key:"isAlive",value:function(){return this.snake.length>0}}]),e}(),f=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:24,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:24,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:new o(20,2);_classCallCheck(this,e),this.isTwoPlayers=t,this.cols=n,this.rows=a,this.snakes=s,this.apple=i,0===this.snakes.length&&(this.snakes=[this.snakeFromState(h.EAST,new o(2,2))],this.isTwoPlayers&&this.snakes.push(this.snakeFromState(h.NORTH,new o(20,20))))}return _createClass(e,[{key:"snakeFromState",value:function(e,t){return new v(this.cols,this.rows,[e],t,this.apple,[t])}},{key:"isCrash",value:function(){return this.snakes.reduce((function(e,t){return e||!t.isAlive()}),!1)}},{key:"willEat",value:function(){return this.snakes.reduce((function(e,t){return e||t.willEat()}),!1)}},{key:"nextApple",value:function(){if(this.willEat()){var e;do{e=this.snakes.reduce((function(e,t){return t.inSnake(e)?null:e}),this.rndPos())}while(!e);return e}return this.apple}},{key:"nextSnakes",value:function(){var e=this;return this.snakes.map((function(t,n,a){return t.next(e.cols,e.rows,e.apple,a.length>1?a[(n+1)%a.length]:null)}))}},{key:"rndPos",value:function(){return new o(c(0,this.cols-1),c(0,this.rows-1))}},{key:"merge",value:function(t){return Object.assign(new e,this,t)}},{key:"next",value:function(){return new e(this.isTwoPlayers,this.cols,this.rows,this.nextSnakes(),this.nextApple())}},{key:"enqueue",value:function(e,t){var n=this;return e%=this.snakes.length,this.merge({snakes:this.snakes.map((function(a,s){return s===e?n.snakes[e].enqueue(t):a}))})}}]),e}(),k=function(){var e=function(){function e(t,n,a,s){var i=this;_classCallCheck(this,e),this.canvasWidth=t,this.canvasHeight=n,this.gameCols=a,this.gameRows=s,this.drawSnakeSegment=function(e){return function(t){e.save(),e.lineWidth=Math.min(i.x(1),i.y(1)),e.lineCap="round",e.lineJoin="round";var n=t.shift();e.moveTo(i.x(n.x)+i.x(1)/2,i.y(n.y)+i.y(1)/2),e.beginPath(),e.lineTo(i.x(n.x)+i.x(1)/2,i.y(n.y)+i.y(1)/2),t.forEach((function(t){e.lineTo(i.x(t.x)+i.x(1)/2,i.y(t.y)+i.y(1)/2)})),e.stroke(),e.restore()}}}return _createClass(e,[{key:"drawSnakes",value:function(t,n){var a=this;t.save(),n.snakes.forEach((function(n,s){n.isAlive()&&(t.strokeStyle=e.SNAKE_COLORS[s],a.drawSnake(t,n))})),t.restore()}},{key:"drawSnake",value:function(e,t){t.segments().forEach(this.drawSnakeSegment(e)),this.drawSnakeHead(e,t)}},{key:"drawSnakeHead",value:function(e,t){e.save();var n=t.snake[0];e.translate(this.x(n.x)+this.x(1)/2,this.y(n.y)+this.y(1)/2),e.rotate(Math.PI/180*t.direction());var a=0+3*this.x(1)/16,s=3*this.y(1)/16;e.fillStyle="white";var i=Math.min(this.x(1),this.y(1))/8;e.beginPath(),e.arc(a,0-s,i,0,2*Math.PI),e.arc(a,0+s,i,0,2*Math.PI),e.fill(),e.fillStyle="black",i/=2,e.beginPath(),e.arc(a+i,0-s,i,0,2*Math.PI),e.arc(a+i,0+s,i,0,2*Math.PI),e.fill(),e.restore()}},{key:"x",value:function(e){return Math.round(e*this.canvasWidth/this.gameCols)}},{key:"y",value:function(e){return Math.round(e*this.canvasHeight/this.gameRows)}}]),e}();return e.SNAKE_COLORS=["#00c832","#c7c700"],e}(),g=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"drawRoundedRect",value:function(e,t,n,a,s){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:10,r=!(arguments.length>6&&void 0!==arguments[6])||arguments[6],l=arguments.length>7&&void 0!==arguments[7]&&arguments[7];if("number"==typeof i)i={tl:i,tr:i,br:i,bl:i};else for(var u={tl:0,tr:0,br:0,bl:0},o=0,h=Object.keys(u);o<h.length;o++){var c=h[o];i[c]=i[c]||u[c]}e.save(),e.beginPath(),e.moveTo(t+i.tl,n),e.lineTo(t+a-i.tr,n),e.quadraticCurveTo(t+a,n,t+a,n+i.tr),e.lineTo(t+a,n+s-i.br),e.quadraticCurveTo(t+a,n+s,t+a-i.br,n+s),e.lineTo(t+i.bl,n+s),e.quadraticCurveTo(t,n+s,t,n+s-i.bl),e.lineTo(t,n+i.tl),e.quadraticCurveTo(t,n,t+i.tl,n),e.closePath(),r&&e.fill(),l&&e.stroke(),e.restore()}}]),e}(),y=((s=function(){function e(t,n,a){var s=this,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new f(!0);_classCallCheck(this,e),this.state=i,this.fps=10,this.paused=!1,this.update=function(e){return function(t){t-e>1e3/s.fps?(s.paused||(s.state=s.state.next(),s.drawGame()),s.animationFrameId=window.requestAnimationFrame(s.update(t))):s.animationFrameId=window.requestAnimationFrame(s.update(e))}},this.backgroundCtx=n.getContext("2d",{alpha:!1}),this.canvasWidth=n.width,this.canvasHeight=n.height,this.gameCtx=t.getContext("2d"),this.uiCtx=a.getContext("2d"),this.snakeAnimator=new k(this.canvasWidth,this.canvasHeight,this.state.cols,this.state.rows)}return _createClass(e,[{key:"start",value:function(){this.drawBackground(),this.drawGame(),this.pause(),this.animationFrameId=window.requestAnimationFrame(this.update(0))}},{key:"drawGame",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.gameCtx;this.clearDrawing(e),this.snakeAnimator.drawSnakes(e,this.state),this.drawApple(e,this.state),this.state.isCrash()&&this.drawCrash(e)}},{key:"clearDrawing",value:function(e){e.clearRect(0,0,this.canvasWidth,this.canvasHeight)}},{key:"drawApple",value:function(t,n){t.fillStyle=e.APPLE_COLOR,g.drawRoundedRect(t,this.x(n.apple.x),this.y(n.apple.y),this.x(1),this.y(1))}},{key:"drawPaused",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.uiCtx;e.save();var t=this.canvasWidth/2,n=this.canvasHeight/2,a=this.canvasWidth/4,s=this.canvasHeight/8;e.globalAlpha=.5,e.fillStyle="grey",g.drawRoundedRect(e,t-a/2,n-s/2,a,s),e.globalAlpha=1,e.fillStyle="white",e.font="24px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("Paused",t,n),e.restore()}},{key:"drawCrash",value:function(t){this.drawBackground(t,e.CRASH_COLOR)}},{key:"drawBackground",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.backgroundCtx,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.BACKGROUND_COLOR;t.fillStyle=n,t.fillRect(0,0,this.canvasWidth,this.canvasHeight)}},{key:"destroy",value:function(){this.animationFrameId&&window.cancelAnimationFrame(this.animationFrameId)}},{key:"keyEvent",value:function(e){switch(e){case" ":return this.pause(),!0;case"w":return this.state=this.state.enqueue(0,h.NORTH),!0;case"a":return this.state=this.state.enqueue(0,h.WEST),!0;case"s":return this.state=this.state.enqueue(0,h.SOUTH),!0;case"d":return this.state=this.state.enqueue(0,h.EAST),!0;case"i":case"ArrowUp":return this.state=this.state.enqueue(1,h.NORTH),!0;case"j":case"ArrowLeft":return this.state=this.state.enqueue(1,h.WEST),!0;case"k":case"ArrowDown":return this.state=this.state.enqueue(1,h.SOUTH),!0;case"l":case"ArrowRight":return this.state=this.state.enqueue(1,h.EAST),!0}return!1}},{key:"x",value:function(e){return Math.round(e*this.canvasWidth/this.state.cols)}},{key:"y",value:function(e){return Math.round(e*this.canvasHeight/this.state.rows)}},{key:"pause",value:function(){(this.paused=!this.paused)?this.drawPaused():this.clearDrawing(this.uiCtx)}},{key:"toggleTwoPlayers",value:function(){this.state=new f(!this.state.isTwoPlayers),this.drawGame()}}]),e}()).APPLE_COLOR="#ff3200",s.BACKGROUND_COLOR="#232323",s.CRASH_COLOR="rgb(255,0,0)",s),w=((a=function(){function e(){_classCallCheck(this,e),this._highScore=0}return _createClass(e,[{key:"ngOnInit",value:function(){var t=this;this.scaleCanvas(),this.animator=new y(document.getElementById("game-layer"),document.getElementById("background-layer"),document.getElementById("ui-layer")),window.addEventListener("keydown",(function(e){t.animator.keyEvent(e.key)&&e.preventDefault()})),this.animator.start(),this.highScore=+u.getCookie(e.COOKIE_NAME)}},{key:"ngOnDestroy",value:function(){this.animator.destroy()}},{key:"scaleCanvas",value:function(e){var t=document.getElementById("menu"),n=document.getElementById("main"),a=document.getElementById("stage"),s=document.getElementById("background-layer"),i=(window.innerHeight-t.offsetHeight-10)/s.height,r=n.offsetWidth/s.width,l=Math.min(r,i);Math.max(r,i),a.style.transformOrigin="0 0",a.style.transform="scale("+l+")"}},{key:"score",get:function(){return Math.max.apply(Math,_toConsumableArray(this.animator.state.snakes.map((function(e){return e.snake.length}))))},set:function(e){}},{key:"highScore",get:function(){return this.score>this._highScore&&(this._highScore=this.score,u.setCookie(e.COOKIE_NAME,this._highScore,90)),this._highScore},set:function(e){this._highScore=e}}]),e}()).COOKIE_NAME="snake-high-score",a),m=i.vb({encapsulation:0,styles:[["#stage[_ngcontent-%COMP%]{width:900px;height:900px;position:relative;box-sizing:content-box;border:1px solid;background-color:#fff}#stage[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{position:absolute}#stage[_ngcontent-%COMP%]   #ui-layer[_ngcontent-%COMP%]{z-index:3}#stage[_ngcontent-%COMP%]   #game-layer[_ngcontent-%COMP%]{z-index:2}#stage[_ngcontent-%COMP%]   #background-layer[_ngcontent-%COMP%]{z-index:1}"]],data:{}});function p(e){return i.Tb(0,[(e()(),i.xb(0,0,null,null,3,"div",[["id","stage"]],null,null,null,null,null)),(e()(),i.xb(1,0,null,null,0,"canvas",[["height","900"],["id","ui-layer"],["width","900"]],null,null,null,null,null)),(e()(),i.xb(2,0,null,null,0,"canvas",[["height","900"],["id","game-layer"],["width","900"]],null,null,null,null,null)),(e()(),i.xb(3,0,null,null,0,"canvas",[["height","900"],["id","background-layer"],["width","900"]],null,null,null,null,null))],null,null)}var C=i.tb("app-snake",w,(function(e){return i.Tb(0,[(e()(),i.xb(0,0,null,null,1,"app-snake",[],null,[["window","resize"]],(function(e,t,n){var a=!0;return"window:resize"===t&&(a=!1!==i.Jb(e,1).scaleCanvas(n)&&a),a}),p,m)),i.wb(1,245760,null,0,w,[],null,null)],(function(e,t){e(t,1,0)}),null)}),{},{},[]),x=n("SVse"),b=n("s7LF"),S=n("iInd"),_=function e(){_classCallCheck(this,e)};n.d(t,"SnakeModuleNgFactory",(function(){return O}));var O=i.ub(r,[],(function(e){return i.Gb([i.Hb(512,i.l,i.fb,[[8,[l.a,C]],[3,i.l],i.B]),i.Hb(4608,x.o,x.n,[i.x,[2,x.D]]),i.Hb(4608,b.o,b.o,[]),i.Hb(1073742336,x.b,x.b,[]),i.Hb(1073742336,S.o,S.o,[[2,S.t],[2,S.k]]),i.Hb(1073742336,_,_,[]),i.Hb(1073742336,b.n,b.n,[]),i.Hb(1073742336,b.d,b.d,[]),i.Hb(1073742336,r,r,[]),i.Hb(1024,S.i,(function(){return[[{path:"",component:w}]]}),[])])}))}}]);