var STATUS = {
    PARSEC_OK: 0,
    PARSEC_CONNECTING: 20,
    CONNECT_WRN_APPROVAL: 6,
    CONNECT_WRN_DECLINED: 8,
    CONNECT_WRN_PEER_GONE: 99,
    CONNECT_WRN_UNCONFIRMED: 100,
    PARSEC_NOT_RUNNING: -3,
    WS_ERR_CONNECT: -6101,
    WS_ERR_CLOSE: -6105,
    NAT_ERR_WEBRTC: -6200
}, DEVICE = {
    All: 255,
    None: 0,
    Gamepad: 1,
    Mouse: 2,
    Keyboard: 4
}, GAMEPAD_BUTTON = {
    0 : 0,
    1 : 1,
    2 : 2,
    3 : 3,
    4 : 9,
    5 : 10,
    8 : 4,
    9 : 6,
    10 : 7,
    11 : 8,
    12 : 11,
    13 : 12,
    14 : 13,
    15 : 14
}, KEYBOARD = {
    KeyA: 4,
    KeyB: 5,
    KeyC: 6,
    KeyD: 7,
    KeyE: 8,
    KeyF: 9,
    KeyG: 10,
    KeyH: 11,
    KeyI: 12,
    KeyJ: 13,
    KeyK: 14,
    KeyL: 15,
    KeyM: 16,
    KeyN: 17,
    KeyO: 18,
    KeyP: 19,
    KeyQ: 20,
    KeyR: 21,
    KeyS: 22,
    KeyT: 23,
    KeyU: 24,
    KeyV: 25,
    KeyW: 26,
    KeyX: 27,
    KeyY: 28,
    KeyZ: 29,
    Digit1: 30,
    Digit2: 31,
    Digit3: 32,
    Digit4: 33,
    Digit5: 34,
    Digit6: 35,
    Digit7: 36,
    Digit8: 37,
    Digit9: 38,
    Digit0: 39,
    Enter: 40,
    Escape: 41,
    Backspace: 42,
    Tab: 43,
    Space: 44,
    Minus: 45,
    Equal: 46,
    BracketLeft: 47,
    BracketRight: 48,
    Backslash: 49,
    Semicolon: 51,
    Quote: 52,
    Backquote: 53,
    Comma: 54,
    Period: 55,
    Slash: 56,
    CapsLock: 57,
    F1: 58,
    F2: 59,
    F3: 60,
    F4: 61,
    F5: 62,
    F6: 63,
    F7: 64,
    F8: 65,
    F9: 66,
    F10: 67,
    F11: 68,
    F12: 69,
    PrintScreen: 70,
    ScrollLock: 71,
    Pause: 72,
    Insert: 73,
    Home: 74,
    PageUp: 75,
    Delete: 76,
    End: 77,
    PageDown: 78,
    ArrowRight: 79,
    ArrowLeft: 80,
    ArrowDown: 81,
    ArrowUp: 82,
    NumLock: 83,
    NumpadDivide: 84,
    NumpadMultiply: 85,
    NumpadEnter: 86,
    NumpadPlus: 87,
    NumpadMinus: 88,
    Numpad1: 89,
    Numpad2: 90,
    Numpad3: 91,
    Numpad4: 92,
    Numpad5: 93,
    Numpad6: 94,
    Numpad7: 95,
    Numpad8: 96,
    Numpad9: 97,
    Numpad0: 98,
    NumpadPeriod: 99,
    ContextMenu: 101,
    ControlLeft: 224,
    ShiftLeft: 225,
    AltLeft: 226,
    MetaLeft: 227,
    ControlRight: 228,
    ShiftRight: 229,
    AltRight: 230,
    MetaRight: 231
};

var FPS = 1 / 60; // 每秒60帧

// u
var browserWindow = "undefined" != typeof window && window === this ? this: "undefined" != typeof global && null != global ? global: this;
// v
var defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty: function(obj, prop, descriptor) {
    obj != Array.prototype && obj != Object.prototype && (obj[prop] = descriptor.value)
};

function iteratorNext(arr) {
    var index = 0;
    return function() {
        return index < arr.length ? {
            done: false,
            value: arr[index++]
        }: {
            done: true
        }
    }
}

function createArrayIterator(arr) {
    var symbol = "undefined" != typeof Symbol && Symbol.iterator && arr[Symbol.iterator];
    return symbol ? symbol.call(arr) : {
        next: iteratorNext(arr)
    }
}

// M
function clearEventListener(arr) {
    var iterator = createArrayIterator(arr);
    for (var item = iterator.next(); !item.done; item = iterator.next()) {
        item = item.value;
        item[0].removeEventListener(item[1], item[2]);
    }
}

// L
function addEventListenerToDom(dom, method, callback, _this) {
    callback = _this ? callback.bind(_this) : callback;
    dom.addEventListener(method, callback);
    return [dom, method, callback]
}

// T
function createArrayBuffer(a, b, c, d) {
    var buffer = new ArrayBuffer(13),
    dv = new DataView(buffer);
    dv.setInt32(0, b);
    dv.setInt32(4, c);
    dv.setInt32(8, d);
    dv.setInt8(12, a);
    return buffer;
}

/*****************Media****************/

function mediaPlay(media, rate) {
    media.playbackRate = rate;
    media.play().catch(function() {});
}

function Media(media, type, callback) {
    var _this = this;
    this.media = media; // 视频或音频控件 b
    this.l = true;
    this.type = type; // 媒体类型
    this.callback = callback; // s
    // f c
    this.mediaSource = this.sourceBuffer = null;
    this.isVideo = 'video/mp4; codecs="avc1.64001e"' === this.type; // o
    this.listeners = []; // g
    this.unit8arr = []; // j
    this.timer = null; // h

    // 延迟修复
    this.delayed = 0; // i
    // B
    this.delayedRepair = function() {
        if (_this.media.seekable && 0 < _this.media.seekable.length) {
            var endTime = _this.media.seekable.end(0); // 获取媒体最后时间点（单位：秒）
            var interval = endTime - _this.media.currentTime; // 媒体剩余时间（单位：秒）

            if (_this.isVideo) { // 视频延迟修复，保持60帧速率
            	// 延迟达到1.5帧以上累计一次，不足则归零
            	if (interval > 1.5 * FPS) {
            		_this.delayed =+ 1;
            	} else {
            		_this.delayed = 0;
            	}
            
            	if (_this.delayed > 60 && _this.media.playbackRate == 1) { 
            		// 1秒内一直延迟，修改播放速度

            		// 延迟3帧以上，10倍播放速度
            		// 延迟3帧以下，1.25倍播放速度
            		mediaPlay(_this.media, interval > 3 * FPS ? 10 : 1.25);
            	} else if (interval < FPS && _this.media.playbackRate != 1) { 
            		// 延迟修复后恢复播放速度
            		mediaPlay(_this.media, 1);
            	}
            } else if (interval > .1 * 3) {
            	// 延迟0.3秒以上，直接加载中
            	_this.media.currentTime = endTime + 1E3;
            } else if (interval > .1 * 1.5 && _this.media.playbackRate == 1) {
            	// 延迟0.15秒以上，10倍播放速度
            	mediaPlay(_this.media, 10);
            } else if (interval < .1 && _this.media.playbackRate == 10) {
            	// 延迟0.1秒以下，恢复正常速度
				mediaPlay(_this.media, 1);
            }
        }
    }
}

// m
Media.prototype.clean = function() {
    this.timer && clearInterval(this.timer);
    this.media.pause();
    clearEventListener(this.listeners);

    if (this.mediaSource) {
        if (this.sourceBuffer) {
            this.mediaSource.removeSourceBuffer(this.sourceBuffer);
            this.sourceBuffer = null;
        }

        this.mediaSource.endOfStream();
        URL.revokeObjectURL(this.media.src);
        this.mediaSource = null;
    }
    
    this.media.src = "";
    this.l = true;
    this.isVideo = 'video/mp4; codecs="avc1.64001e"' === this.type;
    this.listeners = [];
    this.unit8arr = [];
    this.timer = null;
    this.delayed = 0
};

Media.prototype.update = function() {
    if (0 < this.unit8arr.length && this.sourceBuffer && !this.sourceBuffer.updating)  {
        try {
            var a = this.unit8arr.shift();
            this.sourceBuffer.appendBuffer(a);
        } catch(e) {
            console.warn(e);
            this.clean();
            this.callback && this.callback();
        }
    }
};

/*****************Parsec****************/

// X
function sendMessage(signal, b) {
    // b
    signal.socket && (
        b = JSON.stringify(b), 
        signal.socket.readyState == WebSocket.OPEN ? signal.socket.send(b) : signal.messages.push(b) // h
    )
}

// Z
function updateStatus(parsec, status) {
    if (parsec.signal && parsec.status == STATUS.PARSEC_CONNECTING) {
        var signal = parsec.signal;
        sendMessage(signal, {
            action: "offer_cancel",
            version: 1,
            payload: {
                to: signal.peerID, // f
                attempt_id: signal.clientId, // g
            }
        })
    }

    if (parsec.signal) {
        parsec.signal.close(1E3);
        parsec.signal = null;
    }

    if (status != STATUS.PARSEC_OK) {
        if (parsec.rtc && parsec.status == STATUS.PARSEC_OK) {
            parsec.rtc.send(createArrayBuffer(10, 0, 0, 0), 0);
        }

        if (parsec.rtc) {
            parsec.rtc.close();
            parsec.rtc = null;
        }

        parsec.vMedia.clean(); 
        parsec.aMedia.clean();

        if (parsec.control) {
            parsec.control.m();
            parsec.control = null;
        }
    }

    parsec.status = status
}

function Parsec(video, audio, container) {
	var _this = this;
	this.status = STATUS.PARSEC_NOT_RUNNING;
	this.createTime = performance.now(); // o
	this.latency = { // s
        encodeLatency: 0,
        decodeLatency: 0,
        networkLatency: 0
    };
    this.f = [];
    // c 
    this.control = this.signal = this.rtc = null;
    this.listeners = []; // j
    this.clientId = ""; // i
	this.video = video;
	this.container = container; // u
    this.device = DEVICE.None; // g

    this.aMedia = new Media(audio, 'audio/mp4; codecs="opus"', null); // l
    this.vMedia = new Media(video, 'video/mp4; codecs="avc1.64001e"', function() { // h
        _this.rtc && _this.rtc.send(createArrayBuffer(13, 0, 0, 0), 0) // b
    });

    this.listeners.push(
    	addEventListenerToDom(window, "beforeunload", function() {
	        _this.destroy();
	        return null
	    }, null)
    );
}

Parsec.prototype.destroy = function() {
    clearEventListener(this.listeners);
    this.clientDisconnect()
};

Parsec.prototype.clientSendMessage = function(a) {
    this.rtc && this.status == STATUS.PARSEC_OK && this.rtc.send(deviceOperateInfo(a, this.video), 0)
};

Parsec.prototype.clientDisconnect = function() {
    updateStatus(this, STATUS.PARSEC_NOT_RUNNING);
};

Parsec.prototype.clientGetStatus = function() {
    return this.status
};

Parsec.prototype.Status = STATUS;

var U = {}, sa = 1;

function ta(a) {
    var b = sa++;
    U[b] = a;
    return b
}

// aa
function getSymNoDone(a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
    return c
}

function la(control, data, func) {
    control.container.style.cursor = data.cursor.hidden ? "none": "";
    control.o = data.cursor.relative;
    control.o ? control.container.requestPointerLock() : document.pointerLockElement && (control.h = !0, document.exitPointerLock());
    if (data.cursor.imageUpdate) {
        var buffer = func(data.key);
        // binary to ascii
        var ascii_code = btoa(String.fromCharCode.apply(String, buffer instanceof Array ? buffer : getSymNoDone(createArrayIterator(buffer))));
        var hotX = data.cursor.hotX;
        var hotY = data.cursor.hotY;
        if (!control.i[ascii_code]) {
            control.i[ascii_code] = "cursor-x-" + control.s;
            var g = document.createElement("style");
            g.type = "text/css";
            g.innerHTML = ".cursor-x-" + control.s+++" {cursor: url(data:image/png;base64," + (ascii_code + ") " + hotX + " " + hotY + ", auto;}");
            document.querySelector("head").appendChild(g);
            control.j.push(g)
        }
        control.g && control.container.classList.remove(control.g);
        control.container.classList.add(control.i[ascii_code]);
        control.g = control.i[ascii_code]
    }
}

Parsec.prototype.clientConnect = async function(sessionID, peerID, secret) {
    var _this = this;

    if (_this.status != STATUS.PARSEC_NOT_RUNNING) {
        return;
    }

    _this.status = STATUS.PARSEC_CONNECTING;
    U = {};
    sa = 1;
    _this.aMedia.clean();
    _this.vMedia.clean();
    _this.f = [];
    _this.clientId = createClientId();
    _this.signal = new Signal(_this.clientId, function(l) {
        updateStatus(_this, l)
    });

    var onicecandidate = function(ip, port, sync, from_stun, lan) {
        if (_this.signal) {
            var signal = _this.signal;

            sendMessage(signal, {
                action: "candex",
                version: 1,
                payload: {
                    to: signal.peerID,
                    attempt_id: signal.clientId,
                    data: {
                        ver_data: 1,
                        ip: ip,
                        port: port,
                        lan: lan, // bool
                        from_stun: from_stun, // bool
                        sync: sync
                    }
                }
            })
        }
    };
    _this.rtc = new RTC(onicecandidate);

    // h
    var openCallback = function() {
        _this.listeners.push(
            addEventListenerToDom(document, "visibilitychange", function() {
                if (document.hidden) {
                    _this.vMedia.clean();

                    if (_this.rtc) _this.rtc.send(createArrayBuffer(19, 0, 0, 0), 0);
                } else {
                    if (_this.rtc) _this.rtc.send(createArrayBuffer(13, 0, 0, 0), 0);
                }
            }, null)
        );

        var width = window.screen.width, // l
            height = window.screen.height; // q

        if (800 > width || 600 > height || 1920 < width || 1080 < height) {
            width = 1920,
            height = 1080;
        }
        
        _this.rtc && _this.rtc.send(screenInfo(width, height), 0);

        updateStatus(_this, STATUS.PARSEC_OK)
    };
    createChannel(_this.rtc, "control", 0, openCallback, function(l) {
        _this.createTime = performance.now();

        var dv = new DataView(l.data);
        var q = {
            w: dv.getInt32(0),
            A: dv.getInt32(4),
            Z: dv.getInt32(8),
            type: dv.getInt8(12) // 操作标识
        };
        switch (q.type) {
            case 10: // 当前状态
                _this.status = q.w;
                break;
            case 21: // 延迟状态
                _this.latency = {
                    encodeLatency: parseFloat(q.A) / 1E3,
                    decodeLatency: 0,
                    networkLatency: 0
                };
                break;
            case 20:
                if (!(_this.device & DEVICE.Gamepad)) {
                    _this.f.push({
                        type: 2, // 数据类型
                        gamepadID: q.w,
                        motorBig: q.A,
                        motorSmall: q.Z
                    });
                }
                break;
            case 16:
                _this.f.push({
                    type: q.w ? 4 : 5 // 数据类型
                });
                break;
            case 17:
                _this.f.push(va(q, dv));
                break;
            case 9:
                if (_this.device & DEVICE.Mouse) {
                    if (_this.control) {
                        la(_this.control, ua(dv), function(t) {
                            return _this.getBuffer(t)
                        });
                    }
                } else {
                    _this.f.push(ua(dv));
                }
        }
    });
    createChannel(_this.rtc, "video", 1, null, function(l) {
        oa(_this.vMedia, l.data)
    });
    createChannel(_this.rtc, "audio", 2, null, function(l) {
        oa(_this.aMedia, l.data)
    });

    var creds = await getCreds(_this.rtc);
    // answer_relay
    var onAnswerRelay = function(ice_ufrag, ice_pwd, fingerprint) {
        _this.rtc && configRemoteCreds(_this.rtc, ice_ufrag, ice_pwd, fingerprint);
    };
    // candex_relay
    var onCandexRelay = function(ip, port, sync, from_stun) {
        _this.rtc && Aa(_this.rtc, ip, port, sync, from_stun);
    };
    _this.signal && createSignalSocket(_this.signal, sessionID, peerID, secret, creds, onAnswerRelay, onCandexRelay);
    
    if (!_this.control) {
        _this.control = new Control(_this.container, function(l) {
            _this.clientSendMessage(l);
        });

        _this.handleInput(_this.device);
    }
};

Parsec.prototype.Input = DEVICE;

Parsec.prototype.handleInput = function(device) {
    this.device = device;
    if (this.control) {
        var control = this.control;
        cleanControlListener(control);

        if (device & DEVICE.Gamepad) {
            control.gamepadListener = new GamepadListener(control.onGamePadButton.bind(control), control.onGamePadAxe.bind(control), 
                control.onGamePadOut.bind(control));
        } else if (device & DEVICE.Mouse) {
            control.listeners.push(addEventListenerToDom(control.container, "mousedown", control.onMouseDown, control));
            control.listeners.push(addEventListenerToDom(control.container, "mouseup", control.onMouseDown, control));
            control.listeners.push(addEventListenerToDom(control.container, "contextmenu", control.onContextMenu, control));
            control.listeners.push(addEventListenerToDom(control.container, "mousemove", control.onMouseMove, control));
            control.listeners.push(addEventListenerToDom(control.container, "wheel", control.onWheel, control));
            control.listeners.push(addEventListenerToDom(document, "pointerlockchange", control.onPointerLockChange, control));
        } else if (device & DEVICE.Keyboard) {
            control.listeners.push(addEventListenerToDom(window, "keyup", control.onKeydown, control));
            control.listeners.push(addEventListenerToDom(window, "keydown", control.onKeydown, control));
        }
    }
};

Parsec.prototype.getBuffer = function(a) {
    var b = U[a];
    undefined != b && delete U[a];
    return undefined == b ? null: b
};

// ma
function cleanControlListener(control) {
    clearEventListener(control.listeners);
    control.listeners = [];
    control.l && control.l.clear()
}

// ja
function GamepadListener(onbutton, onaxe, onout) {
    var _this = this;
    
    this.onButton = onbutton; // g
    this.onAxe = onaxe; // f
    this.onOut = onout; // h

    this.gamepads = {};
    this.timer = setInterval(function() { // c
        for (var gamepads = navigator.getGamepads(), h = 0; 4 > h; h++) 
            if (gamepads[h]) {
                var e = _this.gamepads[h];
                if (!e) {
                    e = _this.gamepads[h] = {
                        axes: [], // 坐标轴
                        buttons: [] // 按钮
                    }
                }

                for (var f = 0; f < gamepads[h].buttons.length; f++) {
                    var k = gamepads[h].buttons[f].value;

                    if (undefined !== e.buttons[f] && e.buttons[f] !== k) {
                        _this.onButton(h, f, k);
                    }

                    e.buttons[f] = k
                }

                for (f = 0; f < gamepads[h].axes.length; f++) {
                    k = gamepads[h].axes[f];
                    
                    if (.05 > Math.abs(k)) {
                        k = 0;
                    }

                    if (undefined !== e.axes[f] && e.axes[f] !== k) {
                        _this.onAxe(h, f, k);
                    }

                    e.axes[f] = k;
                }
            } else {
                _this.gamepads[h] && (delete _this.gamepads[h], _this.out(h))
            }
    }, 20);
}

// m
GamepadListener.prototype.clear = function() {
    clearInterval(this.timer)
};

// ka
function Control(container, sendMessage) {
    this.container = container; // b
    this.sendMessage = sendMessage; // f 给主机推送设备操作
    this.block = this.h = this.o = false;
    this.listeners = []; // c
    this.gamepadListener = null; // l
    this.i = {};
    this.g = null;
    this.s = 0;
    this.j = []
}

// C
Control.prototype.onGamePadAxe = function(gindex, index, value) {
    if (!this.block) {
        this.sendMessage({
            type: 6,
            axis: index,
            id: gindex,
            value: 0 < value ? 32767 * value: 32768 * value
        });
    }
};
// N
Control.prototype.onGamePadOut = function(index) {
    this.sendMessage({
        type: 7,
        id: index
    });
};
// M
Control.prototype.onGamePadButton = function(gindex, bindex, bvalue) {
    if (!this.block) {
        if (6 === bindex || 7 === bindex) {
            this.onGamePadAxe(gindex, bindex - 2, bvalue);
        } else {
            bindex = GAMEPAD_BUTTON[b];
            if (undefined !== bindex) {
                this.sendMessage({
                    type: 5,
                    button: bindex,
                    id: gindex,
                    pressed: bvalue ? true : false
                })
            }
        }
    }
};
// F
Control.prototype.onMouseDown = function(a) {
    if (!this.block) {
        var b = "mousedown" === a.type, // 判断按下触发还是释放触发的
            c = 0;

        if (!document.pointerLockElement && this.o) {
            a.target.requestPointerLock();
        }

        if (b && 0 === a.button && a.ctrlKey && a.shiftKey) {
            a.target.requestPointerLock();
        } else {
            switch (a.button) {
                case 0:
                    c = 1;
                    break;
                case 1:
                    c = 2;
                    break;
                case 2:
                    c = 3;
                    break;
                case 3:
                    c = 4;
                    break;
                case 4:
                    c = 5
            }

            this.sendMessage({
                type: 2,
                button: c,
                pressed: !!b // 转bool
            });
        }
    }
};
// L 右键
Control.prototype.onContextMenu = function(a) {
    a.preventDefault();
};
// O
Control.prototype.onMouseMove = function(a) {
    if (!this.block) {
        var b = 0, c;
        
        if (document.pointerLockElement) {
            b = 1;
            c = a.movementX;
            a = a.movementY;
        } else { 
            c = a.clientX;
            a = a.clientY;
        }

        this.sendMessage({
            type: 4,
            relative: !!b,  // 转bool
            x: c,
            y: a
        })
    }
};
// R 滚轮
Control.prototype.onWheel = function(a) {
    if (!this.block) {
        this.sendMessage({
            type: 3,
            x: a.deltaX / -100,
            y: a.deltaY / -100
        })
    }
};
// P 指针锁定状态改变
Control.prototype.onPointerLockChange = function() {
    if (!document.pointerLockElement && !this.h) {
        var a = {
            type: 1,
            code: KEYBOARD.Escape,
            mod: 0,
            pressed: true
        };
        
        this.sendMessage(a);

        a.pressed = false;
        this.sendMessage(a)
    }

    this.h = false
};
// D
Control.prototype.onKeydown = function(a) {
    if (!this.block) {
        var code = KEYBOARD[a.code];
        if (code) {
            a.preventDefault();
            
            var mod = 0;
            a.shiftKey && (mod |= 3);
            a.ctrlKey && (mod |= 192);
            a.altKey && (mod |= 768);
            a.metaKey && (mod |= 3072);
            a.getModifierState("NumLock") && (mod |= 4096);
            a.getModifierState("CapsLock") && (mod |= 8192);

            this.sendMessage({
                type: 1,
                code: code,
                mod: mod,
                pressed: "keydown" == a.type
            })
        }
    }
};
Control.prototype.m = function() {
    ma(this);
    var a = document.querySelector("head");
    if (this.j) for (var b = r(this.j), c = b.next(); ! c.done; c = b.next()) a.removeChild(c.value);
    this.g && this.b.classList.remove(this.g);
    this.b.style.cursor = "";
    document.pointerLockElement && (this.h = !0, document.exitPointerLock())
};

// Ba
function Signal(clientId, func) {
    this.func = func; // c
    this.clientId = clientId; // g
    this.peerID = ""; // f
    this.socket = null; // b
    this.messages = []; // h
    this.i = this.j = false;
    this.timeout = null
}

Signal.prototype.close = function(a) {
    this.i = true;

    if (this.rtc) {
        this.rtc.close(a);
        this.rtc = null;
    }

    if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
    }
};

// ra
function deviceOperateInfo(a, media) {
    switch (a.type) {
        case 4: // mousemove
            if (!a.relative) { // 非1:1
                var vwidth = media.videoWidth, // c
                    vheight = media.videoHeight, // d
                    owidth = media.offsetWidth, // g
                    oheight = media.offsetHeight, // h
                    ratio = Math.min(owidth / vwidth, oheight / vheight); // e

                var width = vwidth * ratio; // b
                var height = vheight * ratio; // e
                
                var offsetX = Math.round(vwidth / width * (a.x - Math.max((owidth - width) / 2, 0))); // g
                if (offsetX === vwidth - 1) {
                    offsetX = vwidth;
                } else if (offsetX > vwidth) {
                    offsetX = vwidth;
                } else if (offsetX < 0) {
                    offsetX = 0;
                }
                a.x = offsetX;

                var offsetY = Math.round(vheight / height * (a.y - Math.max((oheight - height) / 2, 0))); // c
                if (offsetY === vheight - 1) {
                    offsetY = vheight;
                } else if (offsetY > vheight) {
                    offsetY = vheight;
                } else if (0 > offsetY) {
                    offsetY = 0;
                }
                a.y = offsetY;
            }

            return createArrayBuffer(3, a.relative ? 1 : 0, a.x, a.y);
        case 2:
            return createArrayBuffer(1, a.button, a.pressed ? 1 : 0, 0);
        case 1:
            return createArrayBuffer(0, a.code, a.mod, a.pressed ? 1 : 0);
        case 3:
            return createArrayBuffer(2, a.x, a.y, 0);
        case 5:
            return createArrayBuffer(4, a.button, a.pressed ? 1 : 0, a.id);
        case 6:
            return createArrayBuffer(5, a.axis, a.value, a.id);
        case 7:
            return createArrayBuffer(6, 0, 0, a.id);
        case 9:
            return createArrayBuffer(24, 0, 0, 0)
    }
}

// 数据序列化
function ua(dv) {
    var b = dv.getInt16(32),
    c = dv.getInt32(16),
    d = 0 < c ? new Uint8Array(dv.buffer, 34, c - 1) : null;
    d = d ? ta(d) : 0;
    return {
        type: 1, // 数据类型
        cursor: {
            size: c,
            positionX: dv.getInt16(24),
            positionY: dv.getInt16(26),
            width: dv.getInt16(20),
            height: dv.getInt16(22),
            hotX: dv.getInt16(28),
            hotY: dv.getInt16(30),
            modeUpdate: true,
            imageUpdate: 0 < d,
            relative: !!(b & 256),
            hidden: !!(b & 512),
            png: true
        },
        key: d
    };
}

function va(a, b) {
    var key = ta(new Uint8Array(b.buffer, 13, a.w));

    return {
        type: 3, // 数据类型
        id: a.A,
        key: key
    }
}

function wa() {
    var a = new Uint8Array(16);
    crypto.getRandomValues(a);
    return a.map(function(b) {
        return b % 10
    }).join("")
}

// V
function RTC(func) {
    var _this = this;
    this.func = func; // l
    this.i = false;
    this.ice_ufrag = ""; // j
    this.h = false;
    this.rtcPeerConnection = this.sdp = null;
    this.channels = {}; // c [RTCDataChannel]
    this.stuns = []; // g
    this.rtcSessionDescription = null; // f RTCSessionDescription

    this.rtcPeerConnection = new RTCPeerConnection({ // b
        iceServers: [{
            urls: "stun:stun.parsec.gg:3478"
        }]
    });
    // 只要本地代理ICE 需要通过信令服务器传递信息给其他对等端时就会触发
    this.rtcPeerConnection.onicecandidate = function(c) {
        if (c.candidate) { // Send the candidate to the remote peer
            c = c.candidate.candidate.replace("candidate:", "").split(" ");
            /*
            [0 '2395300328',1 '1',2 'udp',3 '2113937151',4 ip,5 port,6 'typ',7 'srflx'/'host',8 'generation',9 '0',10 'ufrag',11 ice_ufrag,
            12 'network-cost',13 '50']
            */
            if ("udp" === c[2].toLowerCase()) {
                // ip, port, sync, from_stun, lan
                _this.func(c[4], parseInt(c[5], 10), false, "srflx" === c[7], "host" === c[7]);
            }
        }
    }
}

RTC.prototype.close = function() {
    for (var a = r(Object.entries(this.c)), b = a.next(); ! b.done; b = a.next()) b.value[1].close();
    this.rtcPeerConnection.close()
};

RTC.prototype.send = function(data, index) {
    "open" == this.channels[index].readyState && this.channels[index].send(data)
};

// pa
function stringToBuffer(a, string) {
    var buffer = new ArrayBuffer(13 + string.length + 1),
    d = string.length + 1,
    dv = new DataView(buffer);
    dv.setInt32(0, d);
    dv.setInt32(4, 0);
    dv.setInt32(8, 0);
    dv.setInt8(12, a); // 操作标识 11屏幕尺寸信息
    arr1 = (new TextEncoder).encode(string);
    arr2 = new Int8Array(buffer, 13);
    for (var g = 0; g < string.length; g++) arr2[g] = arr1[g];
    return buffer;
}

// qa
function screenInfo(width, height) {
    var data = JSON.stringify({
        _version: 1,
        _max_w: 6E4,
        _max_h: 6E4,
        _flags: 0,
        resolutionX: width,
        resolutionY: height,
        refreshRate: 60,
        mediaContainer: 2
    });

    return stringToBuffer(11, data);
}

// na
function initMedia(media) {
    media.mediaSource = new MediaSource;
    media.media.src = URL.createObjectURL(media.mediaSource);
    media.media.load();
    media.listeners.push(
        addEventListenerToDom(media.media, "error", function() {
            console.error(media.media.error.message)
        }, null)
    );
    media.listeners.push(
        addEventListenerToDom(media.mediaSource, "sourceopen", function() {
            media.sourceBuffer = media.mediaSource.addSourceBuffer(media.type);
            media.sourceBuffer.mode = "sequence";
            media.listeners.push(addEventListenerToDom(media.sourceBuffer, "update", media.update, media));
            media.media.play().catch(function() {});
            media.timer = setInterval(media.delayedRepair, 1)
        },null)
    );
}

function G(generator, promis, c) {
    generator.b = c;

    return {
        value: promis
    }
}

function oa(media, data) {
    var arr = new Uint8Array(data);
    if ('audio/mp4; codecs="opus"' === media.type && media.l) {
        media.l = false;
        initMedia(media);
    }

    if ('video/mp4; codecs="avc1.64001e"' === media.type && 102 === arr[4]) {
        media.clean();
        initMedia(media);
        media.isVideo = false;
    }

    if (!media.isVideo) {
        media.unit8arr.push(arr);
        media.update();
    }
}

async function getCreds(rtc) {
    rtc.rtcSessionDescription = await rtc.rtcPeerConnection.createOffer();
    for (var d = rtc.rtcSessionDescription.sdp.split("\n"), sdp = {}, h = 0; h < d.length; h++) {
        var e = d[h].split("="), f = e[0];
        e = e[1];

        if (f) {
            if ("a" === f) {
                sdp.a || (sdp.a = {});
                f = e.split(/:(.+)/);
                sdp.a[f[0]] = f[1];
            } else {
                sdp[f] = e;
            }
        }
    }
    rtc.sdp = sdp;

    return {
        ice_ufrag: rtc.sdp.a["ice-ufrag"],
        ice_pwd: rtc.sdp.a["ice-pwd"],
        fingerprint: rtc.sdp.a.fingerprint
    };
}

// W
function createChannel(rtc, label, index, onopen, onmessage) {
    rtc.channels[index] = rtc.rtcPeerConnection.createDataChannel(label, {
        negotiated: true,
        id: index
    });
    rtc.channels[index].binaryType = "arraybuffer";
    rtc.channels[index].onopen = onopen;
    rtc.channels[index].onmessage = onmessage;
}

// ya
function addIceCandidateToRTC(rtc) {
    for (; 0 < rtc.stuns.length;) {
        var b = rtc.stuns.shift();
        rtc.rtcPeerConnection.addIceCandidate(new RTCIceCandidate({
            candidate: "candidate:2395300328 1 udp 2113937151 " + b.ip + " " + 
                (b.port + " typ " + (b.from_stun ? "srflx": "host") + " generation 0 ufrag " + rtc.ice_ufrag + " network-cost 50"),
            sdpMid: rtc.sdp.a.mid,
            sdpMLineIndex: 0
        }))
    }
}

async function configRemoteCreds(rtc, ice_ufrag, ice_pwd, fingerprint) {
    if (!rtc.rtcSessionDescription) throw "Offer is not set";
    if (rtc.h) return;

    rtc.ice_ufrag = ice_ufrag;
    await rtc.rtcPeerConnection.setLocalDescription(rtc.rtcSessionDescription);
    var mid = rtc.sdp.a.mid;
    var sdpstr = "v=0\r\no=- " + 
        (wa() + " 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE ") + 
        (mid + "\r\na=msid-semantic: WMS *\r\nm=application 9 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\nb=AS:30\r\na=ice-ufrag:") + 
        (ice_ufrag + "\r\na=ice-pwd:") + 
        (ice_pwd + "\r\na=ice-options:trickle\r\na=fingerprint:") + 
        (fingerprint + "\r\na=setup:active\r\na=mid:") + 
        (mid + "\r\na=sendrecv\r\na=sctpmap:5000 webrtc-datachannel 256\r\na=max-message-size:1073741823\r\n");
    await rtc.rtcPeerConnection.setRemoteDescription(
        new RTCSessionDescription({
            type: "answer",
            sdp: sdpstr
        })
    ).catch(function (e) {
        console.log(e);
    });
    rtc.i && addIceCandidateToRTC(rtc);
    rtc.h = true;
}

function Aa(rtc, ip, port, sync, from_stun) {
    if (sync) {
        rtc.i = true;
        setTimeout(function() {
            rtc.func("1.2.3.4", 1234, true, false, false)
        }, 500);
    } else {
        rtc.stuns.push({
            ip: ip.replace("::ffff:", ""),
            port: port,
            from_stun: from_stun
        });
    }

    rtc.h && rtc.i && addIceCandidateToRTC(rtc);
};

// Ca
function createSignalSocket(signal, sessionID, peerID, secret, creds, onAnswerRelay, onCandexRelay) {
    signal.socket = new WebSocket("wss://kessel-ws.parsecgaming.com:443/?session_id=" + sessionID + "&role=client&version=1&sdk_version=0");
    signal.peerID = peerID; // f
    signal.socket.onclose = function() {
        signal.i || signal.func(STATUS.WS_ERR_CLOSE)
    };
    signal.socket.onerror = function() {
        signal.func(STATUS.WS_ERR_CONNECT)
    };
    signal.socket.onopen = function() {
        for (; 0 < signal.messages.length;) signal.socket.send(signal.messages.shift());

        sendMessage(signal, {
            action: "offer",
            version: 1,
            payload: {
                to: signal.peerID,
                attempt_id: signal.clientId,
                secret: secret ? secret : "",
                data: {
                    ver_data: 1,
                    creds: creds,
                    mode: 2,
                    versions: {
                        p2p: 1,
                        bud: 1,
                        init: 1,
                        video: 1,
                        audio: 1,
                        control: 1
                    }
                }
            }
        });

        signal.timeout = setTimeout(function() {
            signal.func(STATUS.CONNECT_WRN_APPROVAL)
        }, 3E4);
    };
    signal.socket.onmessage = function(f) {
        f = JSON.parse(f.data);
        switch (f.action) {
            case "answer_relay": // 答案回复
                signal.j = true;
                
                if (!f.payload.approved) { // 认证失败
                    signal.func(STATUS.CONNECT_WRN_DECLINED);
                    break
                }
                
                signal.timeout && clearTimeout(signal.timeout);
                signal.timeout = setTimeout(function() {
                    signal.func(STATUS.NAT_ERR_WEBRTC)
                }, 1E4); // 10秒无信息则断开

                var t_creds = f.payload.data.creds;
                onAnswerRelay(t_creds.ice_ufrag, t_creds.ice_pwd, t_creds.fingerprint);
                break;
            case "candex_relay": // 糖果回复
                f = f.payload.data;
                onCandexRelay(f.ip, f.port, f.sync, f.from_stun);
                break;
            case "close":
                var k = STATUS.WS_ERR_CLOSE;
                switch (f.payload.reason) {
                    case "HOST_NOT_FOUND":
                        k = STATUS.CONNECT_WRN_PEER_GONE;
                        break;
                    case "USER_UNCONFIRMED":
                        k = STATUS.CONNECT_WRN_UNCONFIRMED
                }
                signal.func(k)
        }
    }
}

function createClientId() {
    for (var a = [], b = new Uint8Array(4), c = 0; 6 > c; c++)  {
        crypto.getRandomValues(b); // 生成随机数给b
        a.push(
            Array.from(b)
                .map(function(d) {
                    return d.toString(16).padStart(2, "0");
                })
                .join("")
        );
    }

    return a.join("-");
}