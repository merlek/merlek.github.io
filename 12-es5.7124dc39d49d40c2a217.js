function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function _possibleConstructorReturn(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?_assertThisInitialized(t):e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _getPrototypeOf(t){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_setPrototypeOf(t,e)}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{ElCL:function(t,e,n){"use strict";n.r(e);var i,s,a,r,o,u=n("8Y7J"),l=function t(){_classCallCheck(this,t)},h=n("pMnS"),c=function(){function t(){_classCallCheck(this,t)}return _createClass(t,null,[{key:"setCookie",value:function(t,e,n){var i=new Date;i.setTime(i.getTime()+24*n*60*60*1e3);var s="expires="+i.toUTCString();document.cookie=t+"="+e+";"+s+";path=/"}},{key:"getCookie",value:function(t){for(var e=t+"=",n=decodeURIComponent(document.cookie).split(";"),i=0;i<n.length;i++){for(var s=n[i];" "===s.charAt(0);)s=s.substring(1);if(0===s.indexOf(e))return s.substring(e.length,s.length)}return""}}]),t}(),f=n("26NK"),d=n("YTka"),v=((i=function t(){_classCallCheck(this,t)}).NORTH=f.Point.create(0,-1),i.SOUTH=f.Point.create(0,1),i.EAST=f.Point.create(1,0),i.WEST=f.Point.create(-1,0),i),y=function(){function t(e,n,i,s){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[];_classCallCheck(this,t),this.cols=e,this.rows=n,this.moves=i,this.start=s,this.snake=a}return _createClass(t,[{key:"willEat",value:function(t){return f.Point.equals(this.nextHead())(t)}},{key:"inSnake",value:function(t){return this.snake.some(f.Point.equals(t))}},{key:"willCrash",value:function(t){var e=this.nextHead();return this.inSnake(e)||t&&(t.inSnake(e)||f.Point.equals(this.snake[0])(t.snake[0]))}},{key:"validMove",value:function(t){return this.moves[0].x+t.x!==0||this.moves[0].y+t.y!==0}},{key:"nextMoves",value:function(){return this.moves.length>1?this.moves.slice(1):this.moves}},{key:"nextHead",value:function(){return 0===this.snake.length?this.start:f.Point.create(Object(d.mod)(this.cols)(this.snake[0].x+this.moves[0].x),Object(d.mod)(this.rows)(this.snake[0].y+this.moves[0].y))}},{key:"nextSnake",value:function(t,e){var n=this;return this.willCrash(e)?[]:t.some((function(t){return n.willEat(t)}))?[this.nextHead()].concat(this.snake):[this.nextHead()].concat(this.snake.slice(0,this.snake.length-1))}},{key:"merge",value:function(e){return Object.assign(new t(this.cols,this.rows,this.moves,this.start,this.snake),e)}},{key:"next",value:function(e,n,i,s){return new t(e,n,this.nextMoves(),this.start,this.nextSnake(i,s))}},{key:"enqueue",value:function(t){return this.validMove(t)?this.merge({moves:this.moves.concat([t])}):this}},{key:"direction",value:function(){var t=this.moves[0];return f.Point.equals(t)(v.NORTH)?270:f.Point.equals(t)(v.SOUTH)?90:f.Point.equals(t)(v.EAST)?0:f.Point.equals(t)(v.WEST)?180:null}},{key:"segments",value:function(){return this.snake.reduce((function(t,e){if(0===t.length)t.push([e]);else{var n=t[t.length-1];1===f.Point.distance(e,n[n.length-1])?n.push(e):t.push([e])}return t}),[])}},{key:"isAlive",value:function(){return this.snake.length>0}}]),t}(),g=((s=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:24,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:24,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[f.Point.create(20,2),f.Point.create(2,20)];_classCallCheck(this,t),this.isTwoPlayers=e,this.cols=n,this.rows=i,this.snakes=s,this.apples=a,0===this.snakes.length&&(this.snakes=[this.snakeFromState(v.EAST,f.Point.create(2,2))],this.isTwoPlayers&&this.snakes.push(this.snakeFromState(v.NORTH,f.Point.create(20,20))))}return _createClass(t,[{key:"snakeFromState",value:function(t,e){return new y(this.cols,this.rows,[t],e,[e])}},{key:"isCrash",value:function(){return this.snakes.reduce((function(t,e){return t||!e.isAlive()}),!1)}},{key:"willEat",value:function(t){return this.snakes.reduce((function(e,n){return e||n.willEat(t)}),!1)}},{key:"newApple",value:function(){var t;do{t=this.snakes.reduce((function(t,e){return e.inSnake(t)?null:t}),this.rndPos())}while(!t);return t}},{key:"nextApple",value:function(t){return this.willEat(t)?this.apples.length<=1||0===Object(d.randomInt)(0)(2)?this.newApple():null:t}},{key:"nextApples",value:function(){var e=this,n=this.apples.map((function(t){return e.nextApple(t)})).filter(Boolean);return this.apples.length<t.MAX_APPLES&&0===Object(d.randomInt)(0)(100)&&n.push(this.newApple()),n}},{key:"nextSnakes",value:function(){var t=this;return this.snakes.map((function(e,n,i){return e.next(t.cols,t.rows,t.apples,i.length>1?i[(n+1)%i.length]:null)}))}},{key:"rndPos",value:function(){return f.Point.create(Object(d.randomInt)(0)(this.cols),Object(d.randomInt)(0)(this.rows))}},{key:"merge",value:function(e){return Object.assign(new t,this,e)}},{key:"next",value:function(){return new t(this.isTwoPlayers,this.cols,this.rows,this.nextSnakes(),this.nextApples())}},{key:"enqueue",value:function(t,e){var n=this;return t%=this.snakes.length,this.merge({snakes:this.snakes.map((function(i,s){return s===t?n.snakes[t].enqueue(e):i}))})}}]),t}()).MAX_APPLES=5,s),k=function(t){function e(t,n,i,s){var a;_classCallCheck(this,e),(a=_possibleConstructorReturn(this,_getPrototypeOf(e).call(this,t,n))).buttons=[],a.eventListeners=[],a.draw=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.ctx;a.clear(),a.buttons.forEach((function(e){return f.Button.draw(t,e)}))};var r=t.width/4,o=t.height/8,u=t.width/2-r/2,l=t.height/2-o/2;return a.buttons.push({x:u,y:l,width:r,height:o,radius:5,fillStyle:"#005FA1",hoverStyle:"#00487b",text:"Paused",font:f.Text.getFont(a.y(1)),textStyle:"white",enabled:!0,onClick:function(){i()}},{x:u,y:l+2*o,width:r,height:o,radius:5,fillStyle:"#005fa1",hoverStyle:"#00487b",text:"Two Players",font:f.Text.getFont(a.y(1)),textStyle:"rgba(255, 255, 255, 1)",enabled:!0,onClick:function(){s()}}),a.addEventListeners(),a}return _inherits(e,t),_createClass(e,[{key:"addEventListeners",value:function(){var t,e,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.canvas,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.buttons;return this.eventListeners.push((t=f.Mouse).addClickEventListener.apply(t,[n].concat(_toConsumableArray(i))),(e=f.Mouse).addHoverEventListener.apply(e,[n].concat(_toConsumableArray(i))))}},{key:"removeEventListeners",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.canvas,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.eventListeners;e.forEach((function(e){t.removeEventListener(e.type,e.function)}))}},{key:"enableButtons",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.buttons;t.forEach((function(t){return t.enabled=!0}))}},{key:"disableButtons",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.buttons;t.forEach((function(t){return t.enabled=!1}))}},{key:"show",value:function(){this.enableButtons(),this.draw()}},{key:"hide",value:function(){this.clear(),this.disableButtons(),this.canvas.style.cursor="default"}},{key:"ngOnDestroy",value:function(){this.removeEventListeners()}}]),e}(f.Animators.CanvasGridAnimator),p=((r=function(t){function e(t,n){var i;return _classCallCheck(this,e),(i=_possibleConstructorReturn(this,_getPrototypeOf(e).call(this,t,n))).draw=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i.ctx;return function(n){t.save(),n.snakes.forEach((function(n,s){n.isAlive()&&(t.strokeStyle=e.SNAKE_COLORS[s],i.drawSnake(t,n))})),t.restore()}},i.drawSnakeSegment=function(t){return function(e){t.save(),t.lineWidth=Math.min(i.x(1),i.y(1)),t.lineCap="round",t.lineJoin="round";var n=e.shift();t.moveTo(i.x(n.x)+i.x(1)/2,i.y(n.y)+i.y(1)/2),t.beginPath(),t.lineTo(i.x(n.x)+i.x(1)/2,i.y(n.y)+i.y(1)/2),e.forEach((function(e){t.lineTo(i.x(e.x)+i.x(1)/2,i.y(e.y)+i.y(1)/2)})),t.stroke(),t.restore()}},i}return _inherits(e,t),_createClass(e,[{key:"drawSnake",value:function(t,e){e.segments().forEach(this.drawSnakeSegment(t)),this.drawSnakeHead(t,e)}},{key:"drawSnakeHead",value:function(t,e){t.save();var n=e.snake[0];t.translate(this.x(n.x)+this.x(1)/2,this.y(n.y)+this.y(1)/2),t.rotate(Math.PI/180*e.direction());var i=0+3*this.x(1)/16,s=3*this.y(1)/16;t.fillStyle="white";var a=Math.min(this.x(1),this.y(1))/8;t.beginPath(),t.arc(i,0-s,a,0,2*Math.PI),t.arc(i,0+s,a,0,2*Math.PI),t.fill(),t.fillStyle="black",a/=2,t.beginPath(),t.arc(i+a,0-s,a,0,2*Math.PI),t.arc(i+a,0+s,a,0,2*Math.PI),t.fill(),t.restore()}}]),e}(f.Animators.CanvasGridAnimator)).SNAKE_COLORS=["#00c832","#c7c700"],r),m=((a=function(t){function e(t,n){var i;return _classCallCheck(this,e),(i=_possibleConstructorReturn(this,_getPrototypeOf(e).call(this,t,n))).draw=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.ctx;i.clear(),i.snakeAnimator.draw()(t),i.drawApple(e)(t),t.isCrash()&&i.drawCrash(e)},i.drawApple=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i.ctx;return function(n){t.save(),n.apples.forEach((function(n){f.RoundedRect.draw(t,{x:i.x(n.x),y:i.y(n.y),width:i.x(1),height:i.y(1),radius:10,fillStyle:e.APPLE_COLOR})})),t.restore()}},i.snakeAnimator=new p(t,n),i}return _inherits(e,t),_createClass(e,[{key:"drawCrash",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.ctx;t.fillStyle=e.CRASH_COLOR,t.fillRect(0,0,this.canvas.width,this.canvas.height)}}]),e}(f.Animators.CanvasGridAnimator)).APPLE_COLOR="#ff3200",a.CRASH_COLOR="rgb(255,0,0)",a),w=function(){function t(e,n,i){var s=this,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new g(!0);_classCallCheck(this,t),this.state=a,this.fps=10,this.paused=!1,this.update=function(t){return function(e){e-t>1e3/s.fps?(s.paused?s.pauseMenuAnimator.draw():(s.state=s.state.next(),s.gameAnimator.draw(s.state)),s.animationFrameId=window.requestAnimationFrame(s.update(e))):s.animationFrameId=window.requestAnimationFrame(s.update(t))}},this.gameAnimator=new m(e,a),this.pauseMenuAnimator=new k(i,a,(function(){return s.pause()}),(function(){return s.toggleTwoPlayers()})),this.backgroundAnimator=new f.Animators.BackgroundAnimator(n)}return _createClass(t,[{key:"start",value:function(){this.backgroundAnimator.draw(),this.gameAnimator.draw(this.state),this.pause(),this.animationFrameId=window.requestAnimationFrame(this.update(0))}},{key:"ngOnDestroy",value:function(){this.animationFrameId&&(window.cancelAnimationFrame(this.animationFrameId),this.pauseMenuAnimator.ngOnDestroy())}},{key:"keyEvent",value:function(t){switch(t){case" ":return this.pause(),!0;case"w":return this.state=this.state.enqueue(0,v.NORTH),!0;case"a":return this.state=this.state.enqueue(0,v.WEST),!0;case"s":return this.state=this.state.enqueue(0,v.SOUTH),!0;case"d":return this.state=this.state.enqueue(0,v.EAST),!0;case"i":case"ArrowUp":return this.state=this.state.enqueue(1,v.NORTH),!0;case"j":case"ArrowLeft":return this.state=this.state.enqueue(1,v.WEST),!0;case"k":case"ArrowDown":return this.state=this.state.enqueue(1,v.SOUTH),!0;case"l":case"ArrowRight":return this.state=this.state.enqueue(1,v.EAST),!0}return!1}},{key:"pause",value:function(){(this.paused=!this.paused)?this.pauseMenuAnimator.show():this.pauseMenuAnimator.hide()}},{key:"toggleTwoPlayers",value:function(){this.gameAnimator.draw(this.state=new g(!this.state.isTwoPlayers))}}]),t}(),b=((o=function(){function t(){_classCallCheck(this,t),this._highScore=0}return _createClass(t,[{key:"ngOnInit",value:function(){var e=this;this.scaleCanvas(),this.animator=new w(document.getElementById("game-layer"),document.getElementById("background-layer"),document.getElementById("ui-layer")),window.addEventListener("keydown",(function(t){e.animator.keyEvent(t.key)&&t.preventDefault()})),this.animator.start(),this.highScore=+c.getCookie(t.COOKIE_NAME)}},{key:"ngOnDestroy",value:function(){this.animator.ngOnDestroy()}},{key:"scaleCanvas",value:function(t){var e=document.getElementById("menu"),n=document.getElementById("main"),i=document.getElementById("stage"),s=document.getElementById("background-layer"),a=(window.innerHeight-e.offsetHeight-10)/s.height,r=n.offsetWidth/s.width,o=Math.min(r,a);Math.max(r,a),i.style.transformOrigin="0 0",i.style.transform="scale("+o+")"}},{key:"score",get:function(){return Math.max.apply(Math,_toConsumableArray(this.animator.state.snakes.map((function(t){return t.snake.length}))))},set:function(t){}},{key:"highScore",get:function(){return this.score>this._highScore&&(this._highScore=this.score,c.setCookie(t.COOKIE_NAME,this._highScore,90)),this._highScore},set:function(t){this._highScore=t}}]),t}()).COOKIE_NAME="snake-high-score",o),_=u.vb({encapsulation:0,styles:[["#stage[_ngcontent-%COMP%]{width:900px;height:900px;position:relative;box-sizing:content-box;border:1px solid;background-color:#fff}#stage[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{position:absolute}#stage[_ngcontent-%COMP%]   #ui-layer[_ngcontent-%COMP%]{z-index:3}#stage[_ngcontent-%COMP%]   #game-layer[_ngcontent-%COMP%]{z-index:2}#stage[_ngcontent-%COMP%]   #background-layer[_ngcontent-%COMP%]{z-index:1}"]],data:{}});function C(t){return u.Tb(0,[(t()(),u.xb(0,0,null,null,3,"div",[["id","stage"]],null,null,null,null,null)),(t()(),u.xb(1,0,null,null,0,"canvas",[["height","900"],["id","ui-layer"],["width","900"]],null,null,null,null,null)),(t()(),u.xb(2,0,null,null,0,"canvas",[["height","900"],["id","game-layer"],["width","900"]],null,null,null,null,null)),(t()(),u.xb(3,0,null,null,0,"canvas",[["height","900"],["id","background-layer"],["width","900"]],null,null,null,null,null))],null,null)}var x=u.tb("app-snake",b,(function(t){return u.Tb(0,[(t()(),u.xb(0,0,null,null,1,"app-snake",[],null,[["window","resize"]],(function(t,e,n){var i=!0;return"window:resize"===e&&(i=!1!==u.Jb(t,1).scaleCanvas(n)&&i),i}),C,_)),u.wb(1,245760,null,0,b,[],null,null)],(function(t,e){t(e,1,0)}),null)}),{},{},[]),A=n("SVse"),O=n("s7LF"),P=n("iInd"),S=function t(){_classCallCheck(this,t)};n.d(e,"SnakeModuleNgFactory",(function(){return E}));var E=u.ub(l,[],(function(t){return u.Gb([u.Hb(512,u.l,u.fb,[[8,[h.a,x]],[3,u.l],u.B]),u.Hb(4608,A.o,A.n,[u.x,[2,A.D]]),u.Hb(4608,O.o,O.o,[]),u.Hb(1073742336,A.b,A.b,[]),u.Hb(1073742336,P.o,P.o,[[2,P.t],[2,P.k]]),u.Hb(1073742336,S,S,[]),u.Hb(1073742336,O.n,O.n,[]),u.Hb(1073742336,O.d,O.d,[]),u.Hb(1073742336,l,l,[]),u.Hb(1024,P.i,(function(){return[[{path:"",component:b}]]}),[])])}))}}]);