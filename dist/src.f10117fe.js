// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Entity.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = void 0;

var Entity =
/** @class */
function () {
  function Entity(w, h, x, y) {
    this.xVel = 0;
    this.yVel = 0;
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  Entity.prototype.draw = function (context) {
    context.fillStyle = "#fff";
    context.fillRect(this.x, this.y, this.width, this.height);
  };

  return Entity;
}();

exports.Entity = Entity;
},{}],"src/Controls.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyBindings = void 0;
var KeyBindings;

(function (KeyBindings) {
  KeyBindings[KeyBindings["UP"] = 38] = "UP";
  KeyBindings[KeyBindings["DOWN"] = 40] = "DOWN";
  KeyBindings[KeyBindings["LEFT"] = 37] = "LEFT";
  KeyBindings[KeyBindings["RIGHT"] = 39] = "RIGHT";
})(KeyBindings = exports.KeyBindings || (exports.KeyBindings = {}));
},{}],"src/Paddle.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paddle = void 0;

var Entity_1 = require("./Entity");

var Game_1 = require("./Game");

var Controls_1 = require("./Controls");

var Paddle =
/** @class */
function (_super) {
  __extends(Paddle, _super);

  function Paddle(w, h, x, y) {
    var _this = _super.call(this, w, h, x, y) || this; //Paddle Move


    _this.speed = 10;
    return _this;
  } //left and right key controls


  Paddle.prototype.update = function (canvas) {
    if (Game_1.Game.keysPressed[Controls_1.KeyBindings.LEFT]) {
      this.xVel = -1;

      if (this.x <= 20) {
        this.xVel = 0;
      }
    } else if (Game_1.Game.keysPressed[Controls_1.KeyBindings.RIGHT]) {
      this.xVel = 1;

      if (this.x + this.width >= canvas.width - 20) {
        this.xVel = 0;
      }
    } else {
      this.xVel = 0;
    } //paddle move


    this.x += this.xVel * this.speed;
  };

  return Paddle;
}(Entity_1.Entity);

exports.Paddle = Paddle;
},{"./Entity":"src/Entity.ts","./Game":"src/Game.ts","./Controls":"src/Controls.ts"}],"src/ComputerPaddle.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComputerPaddle = void 0;

var Entity_1 = require("./Entity");

var ComputerPaddle =
/** @class */
function (_super) {
  __extends(ComputerPaddle, _super);

  function ComputerPaddle(w, h, x, y) {
    var _this = _super.call(this, w, h, x, y) || this;

    _this.speed = 5;
    return _this;
  }

  ComputerPaddle.prototype.update = function (ball, canvas) {
    //chase ball - Simple AI
    if (this.x < ball.x) {
      this.xVel = 1;

      if (this.x + this.width >= canvas.width - 20) {
        this.xVel = 0;
      }
    } else {
      this.xVel = -1;

      if (this.x < 20) {
        this.xVel = 0;
      }
    }

    this.x += this.xVel * this.speed;
  };

  return ComputerPaddle;
}(Entity_1.Entity);

exports.ComputerPaddle = ComputerPaddle;
},{"./Entity":"src/Entity.ts"}],"src/Ball.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

var Entity_1 = require("./Entity");

var Game_1 = require("./Game");

var Ball =
/** @class */
function (_super) {
  __extends(Ball, _super);

  function Ball(w, h, x, y) {
    var _this = _super.call(this, w, h, x, y) || this;

    _this.speed = 5;
    _this.paddleDiff = 30; //made random direction ball

    var randomDirection = Math.floor(Math.random() * 2) + 1;

    if (randomDirection % 2) {
      _this.xVel = 1;
    } else {
      _this.xVel = -1;
    }

    _this.yVel = 1;
    return _this;
  }

  Ball.prototype.update = function (player, computer, canvas) {
    //bounce bal limit left | right border
    //-----------------------------------------
    //check left canvas bounds
    if (this.x <= 0) {
      this.xVel = 1;
    } //check right canvas bounds


    if (this.x + this.width >= canvas.width) {
      this.xVel = -1;
    } //CHECK POINT
    //-----------------------------------------
    //check top canvas bounds | POINT playerScore


    if (this.y <= 0) {
      //reset ball middle
      this.y = canvas.height / 2 - this.height / 2;
      Game_1.Game.playerScore += 1;
    } //check bottom canvas bounds | POINT computerScore


    if (this.y + this.height >= canvas.height) {
      //reset ball middle
      this.y = canvas.height / 2 - this.height / 2;
      Game_1.Game.computerScore += 1;
    } //_________________________
    //bottom check - computer


    if (this.y >= canvas.height - this.paddleDiff) {
      if (this.x >= player.x && this.x + this.width <= player.x + player.width) {
        //change direction
        this.yVel = -1;
      }
    } // top check - player


    if (this.y <= this.paddleDiff) {
      if (this.x >= computer.x && this.x + this.width <= computer.x + computer.width) {
        //change direction
        this.yVel = +1;
      }
    } //set move ball


    this.x += this.xVel * this.speed;
    this.y += this.yVel * this.speed;
  };

  return Ball;
}(Entity_1.Entity);

exports.Ball = Ball;
},{"./Entity":"src/Entity.ts","./Game":"src/Game.ts"}],"src/Game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var Paddle_1 = require("./Paddle");

var ComputerPaddle_1 = require("./ComputerPaddle");

var Ball_1 = require("./Ball");

var Game =
/** @class */
function () {
  function Game() {
    this.gameCanvas = document.getElementById("game-canvas");
    this.gameContext = this.gameCanvas.getContext("2d");
    this.gameContext.font = "30px Orbitron";
    window.addEventListener("keydown", function (e) {
      Game.keysPressed[e.which] = true;
    });
    window.addEventListener("keyup", function (e) {
      Game.keysPressed[e.which] = false;
    }); //paddle set size and wall offset

    var paddleWidth = 50,
        paddleHeight = 10,
        ballSize = 10,
        wallOffset = 50; //payer

    this.player1 = new Paddle_1.Paddle(paddleWidth, paddleHeight, this.gameCanvas.width / 2 - paddleWidth / 2, this.gameCanvas.height - paddleHeight - 20); //computer player

    this.computerPlayer = new ComputerPaddle_1.ComputerPaddle(paddleWidth, paddleHeight, this.gameCanvas.width / 2 - paddleWidth / 2, this.gameCanvas.height / 2 - paddleHeight - 320);
    this.ball = new Ball_1.Ball(ballSize, ballSize, this.gameCanvas.width / 2 - ballSize / 2, this.gameCanvas.height / 2 - ballSize / 2);
    console.log("Pong init");
  }

  Game.prototype.drawBoardDetails = function () {
    //draw court outline
    this.gameContext.strokeStyle = "#fff";
    this.gameContext.lineWidth = 5;
    this.gameContext.strokeRect(10, 10, this.gameCanvas.width - 20, this.gameCanvas.height - 20); //draw center lines - X -----

    for (var i = 0; i + 30 < this.gameCanvas.height; i += 29) {
      this.gameContext.fillStyle = "#fff";
      this.gameContext.fillRect(i + 10, this.gameCanvas.height / 2 - 10, 20, 5);
    } //draw scores


    this.gameContext.fillText(Game.playerScore, 20, this.gameCanvas.height / 2 + 40);
    this.gameContext.fillText(Game.computerScore, 20, this.gameCanvas.height / 2 - 20);
  };

  Game.prototype.update = function () {
    this.player1.update(this.gameCanvas);
    this.computerPlayer.update(this.ball, this.gameCanvas);
    this.ball.update(this.player1, this.computerPlayer, this.gameCanvas);
  };

  Game.prototype.draw = function () {
    this.gameContext.fillStyle = "#000";
    this.gameContext.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.drawBoardDetails();
    this.player1.draw(this.gameContext);
    this.computerPlayer.draw(this.gameContext);
    this.ball.draw(this.gameContext);
  };

  Game.keysPressed = [];
  Game.playerScore = 0;
  Game.computerScore = 0;
  return Game;
}();

exports.Game = Game;
},{"./Paddle":"src/Paddle.ts","./ComputerPaddle":"src/ComputerPaddle.ts","./Ball":"src/Ball.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game_1 = require("./Game");

var game = new Game_1.Game();
requestAnimationFrame(gameLoop);

function gameLoop() {
  game.update();
  game.draw();
  requestAnimationFrame(gameLoop);
}
},{"./Game":"src/Game.ts"}],"../../../.nvm/versions/node/v14.17.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58609" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v14.17.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map