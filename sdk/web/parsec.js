'use strict';
var m;
function n(a) {
    var b = 0;
    return function() {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        }: {
            done: !0
        }
    }
}
function r(a) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : {
        next: n(a)
    }
}
function aa(a) {
    for (var b, c = []; ! (b = a.next()).done;) c.push(b.value);
    return c
}
var u = "undefined" != typeof window && window === this ? this: "undefined" != typeof global && null != global ? global: this,
v = "function" == typeof Object.defineProperties ? Object.defineProperty: function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
};
function x(a, b) {
    if (b) {
        var c = u;
        a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var g = a[d];
            g in c || (c[g] = {});
            c = c[g]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && v(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
x("Promise",
function(a) {
    function b(e) {
        this.c = 0;
        this.h = void 0;
        this.b = [];
        var f = this.f();
        try {
            e(f.resolve, f.reject)
        } catch(k) {
            f.reject(k)
        }
    }
    function c() {
        this.b = null
    }
    function d(e) {
        return e instanceof b ? e: new b(function(f) {
            f(e)
        })
    }
    if (a) return a;
    c.prototype.c = function(e) {
        if (null == this.b) {
            this.b = [];
            var f = this;
            this.f(function() {
                f.h()
            })
        }
        this.b.push(e)
    };
    var g = u.setTimeout;
    c.prototype.f = function(e) {
        g(e, 0)
    };
    c.prototype.h = function() {
        for (; this.b && this.b.length;) {
            var e = this.b;
            this.b = [];
            for (var f = 0; f < e.length; ++f) {
                var k = e[f];
                e[f] = null;
                try {
                    k()
                } catch(p) {
                    this.g(p)
                }
            }
        }
        this.b = null
    };
    c.prototype.g = function(e) {
        this.f(function() {
            throw e;
        })
    };
    b.prototype.f = function() {
        function e(p) {
            return function(l) {
                k || (k = !0, p.call(f, l))
            }
        }
        var f = this,
        k = !1;
        return {
            resolve: e(this.s),
            reject: e(this.g)
        }
    };
    b.prototype.s = function(e) {
        if (e === this) this.g(new TypeError("A Promise cannot resolve to itself"));
        else if (e instanceof b) this.u(e);
        else {
            a: switch (typeof e) {
            case "object":
                var f = null != e;
                break a;
            case "function":
                f = !0;
                break a;
            default:
                f = !1
            }
            f ? this.o(e) : this.i(e)
        }
    };
    b.prototype.o = function(e) {
        var f = void 0;
        try {
            f = e.then
        } catch(k) {
            this.g(k);
            return
        }
        "function" == typeof f ? this.B(f, e) : this.i(e)
    };
    b.prototype.g = function(e) {
        this.j(2, e)
    };
    b.prototype.i = function(e) {
        this.j(1, e)
    };
    b.prototype.j = function(e, f) {
        if (0 != this.c) throw Error("Cannot settle(" + e + ", " + f + "): Promise already settled in state" + this.c);
        this.c = e;
        this.h = f;
        this.l()
    };
    b.prototype.l = function() {
        if (null != this.b) {
            for (var e = 0; e < this.b.length; ++e) h.c(this.b[e]);
            this.b = null
        }
    };
    var h = new c;
    b.prototype.u = function(e) {
        var f = this.f();
        e.v(f.resolve, f.reject)
    };
    b.prototype.B = function(e, f) {
        var k = this.f();
        try {
            e.call(f, k.resolve, k.reject)
        } catch(p) {
            k.reject(p)
        }
    };
    b.prototype.then = function(e, f) {
        function k(t, w) {
            return "function" == typeof t ?
            function(C) {
                try {
                    p(t(C))
                } catch(y) {
                    l(y)
                }
            }: w
        }
        var p, l, q = new b(function(t, w) {
            p = t;
            l = w
        });
        this.v(k(e, p), k(f, l));
        return q
    };
    b.prototype.
    catch = function(e) {
        return this.then(void 0, e)
    };
    b.prototype.v = function(e, f) {
        function k() {
            switch (p.c) {
            case 1:
                e(p.h);
                break;
            case 2:
                f(p.h);
                break;
            default:
                throw Error("Unexpected state: " + p.c);
            }
        }
        var p = this;
        null == this.b ? h.c(k) : this.b.push(k)
    };
    b.resolve = d;
    b.reject = function(e) {
        return new b(function(f, k) {
            k(e)
        })
    };
    b.race = function(e) {
        return new b(function(f, k) {
            for (var p = r(e), l = p.next(); ! l.done; l = p.next()) d(l.value).v(f, k)
        })
    };
    b.all = function(e) {
        var f = r(e),
        k = f.next();
        return k.done ? d([]) : new b(function(p, l) {
            function q(C) {
                return function(y) {
                    t[C] = y;
                    w--;
                    0 == w && p(t)
                }
            }
            var t = [],
            w = 0;
            do t.push(void 0),
            w++,
            d(k.value).v(q(t.length - 1), l),
            k = f.next();
            while (!k.done)
        })
    };
    return b
});
function z() {
    z = function() {};
    u.Symbol || (u.Symbol = ba)
}
function A(a, b) {
    this.b = a;
    v(this, "description", {
        configurable: !0,
        writable: !0,
        value: b
    })
}
A.prototype.toString = function() {
    return this.b
};
var ba = function() {
    function a(c) {
        if (this instanceof a) throw new TypeError("Symbol is not a constructor");
        return new A("jscomp_symbol_" + (c || "") + "_" + b++, c)
    }
    var b = 0;
    return a
} ();
function B() {
    z();
    var a = u.Symbol.iterator;
    a || (a = u.Symbol.iterator = u.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[a] && v(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return ca(n(this))
        }
    });
    B = function() {}
}
function ca(a) {
    B();
    a = {
        next: a
    };
    a[u.Symbol.iterator] = function() {
        return this
    };
    return a
}
function D() {
    this.g = !1;
    this.c = null;
    this.i = void 0;
    this.b = 1;
    this.l = this.h = 0;
    this.f = null
}
function E(a) {
    if (a.g) throw new TypeError("Generator is already running");
    a.g = !0
}
D.prototype.j = function(a) {
    this.i = a
};
function F(a, b) {
    a.f = {
        I: b,
        aa: !0
    };
    a.b = a.h || a.l
}
D.prototype.
return = function(a) {
    this.f = {
        return: a
    };
    this.b = this.l
};
function G(a, b, c) {
    a.b = c;
    return {
        value: b
    }
}
function da(a) {
    this.b = new D;
    this.c = a
}
function ea(a, b) {
    E(a.b);
    var c = a.b.c;
    if (c) return H(a, "return" in c ? c["return"] : function(d) {
        return {
            value: d,
            done: !0
        }
    },
    b, a.b.
    return);
    a.b.
    return (b);
    return I(a)
}
function H(a, b, c, d) {
    try {
        var g = b.call(a.b.c, c);
        if (! (g instanceof Object)) throw new TypeError("Iterator result " + g + " is not an object");
        if (!g.done) return a.b.g = !1,
        g;
        var h = g.value
    } catch(e) {
        return a.b.c = null,
        F(a.b, e),
        I(a)
    }
    a.b.c = null;
    d.call(a.b, h);
    return I(a)
}
function I(a) {
    for (; a.b.b;) try {
        var b = a.c(a.b);
        if (b) return a.b.g = !1,
        {
            value: b.value,
            done: !1
        }
    } catch(c) {
        a.b.i = void 0,
        F(a.b, c)
    }
    a.b.g = !1;
    if (a.b.f) {
        b = a.b.f;
        a.b.f = null;
        if (b.aa) throw b.I;
        return {
            value: b.
            return,
            done: !0
        }
    }
    return {
        value: void 0,
        done: !0
    }
}
function fa(a) {
    this.next = function(b) {
        E(a.b);
        a.b.c ? b = H(a, a.b.c.next, b, a.b.j) : (a.b.j(b), b = I(a));
        return b
    };
    this.
    throw = function(b) {
        E(a.b);
        a.b.c ? b = H(a, a.b.c["throw"], b, a.b.j) : (F(a.b, b), b = I(a));
        return b
    };
    this.
    return = function(b) {
        return ea(a, b)
    };
    B();
    this[Symbol.iterator] = function() {
        return this
    }
}
function ha(a) {
    function b(d) {
        return a.next(d)
    }
    function c(d) {
        return a.
        throw (d)
    }
    return new Promise(function(d, g) {
        function h(e) {
            e.done ? d(e.value) : Promise.resolve(e.value).then(b, c).then(h, g)
        }
        h(a.next())
    })
}
function J(a) {
    return ha(new fa(new da(a)))
}
x("Object.entries",
function(a) {
    return a ? a: function(b) {
        var c = [],
        d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
        return c
    }
});
x("Array.from",
function(a) {
    return a ? a: function(b, c, d) {
        c = null != c ? c: function(f) {
            return f
        };
        var g = [],
        h = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
        if ("function" == typeof h) {
            b = h.call(b);
            for (var e = 0; ! (h = b.next()).done;) g.push(c.call(d, h.value, e++))
        } else for (h = b.length, e = 0; e < h; e++) g.push(c.call(d, b[e], e));
        return g
    }
});
function K(a, b) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + b + " must not be null or undefined");
    return a + ""
}
x("String.prototype.repeat",
function(a) {
    return a ? a: function(b) {
        var c = K(this, "repeat");
        if (0 > b || 1342177279 < b) throw new RangeError("Invalid count value");
        b |= 0;
        for (var d = ""; b;) if (b & 1 && (d += c), b >>>= 1) c += c;
        return d
    }
});
x("String.prototype.padStart",
function(a) {
    return a ? a: function(b, c) {
        var d = K(this, "padStart");
        b -= d.length;
        c = void 0 !== c ? String(c) : " ";
        return (0 < b && c ? c.repeat(Math.ceil(b / c.length)).substring(0, b) : "") + d
    }
});
function L(a, b, c, d) {
    c = d ? c.bind(d) : c;
    a.addEventListener(b, c);
    return [a, b, c]
}
function M(a) {
    a = r(a);
    for (var b = a.next(); ! b.done; b = a.next()) b = b.value,
    b[0].removeEventListener(b[1], b[2])
};
var N = {
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
},
O = {
    All: 255,
    None: 0,
    Gamepad: 1,
    Mouse: 2,
    Keyboard: 4
},
P = {
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
},
ia = {
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
};
function ja(a, b, c) {
    var d = this;
    this.g = a;
    this.f = b;
    this.h = c;
    this.b = {};
    this.c = setInterval(function() {
        for (var g = navigator.getGamepads(), h = 0; 4 > h; h++) if (g[h]) {
            var e = d.b[h];
            e || (e = d.b[h] = {
                axes: [],
                buttons: []
            });
            for (var f = 0; f < g[h].buttons.length; f++) {
                var k = g[h].buttons[f].value;
                void 0 !== e.buttons[f] && e.buttons[f] !== k && d.g(h, f, k);
                e.buttons[f] = k
            }
            for (f = 0; f < g[h].axes.length; f++) k = g[h].axes[f],
            .05 > Math.abs(k) && (k = 0),
            void 0 !== e.axes[f] && e.axes[f] !== k && d.f(h, f, k),
            e.axes[f] = k
        } else d.b[h] && (delete d.b[h], d.h(h))
    },
    20)
}
ja.prototype.m = function() {
    clearInterval(this.c)
};
function ka(a, b) {
    this.b = a;
    this.f = b;
    this.block = this.h = this.o = !1;
    this.c = [];
    this.l = null;
    this.i = {};
    this.g = null;
    this.s = 0;
    this.j = []
}
m = ka.prototype;
m.F = function(a) {
    if (!this.block) {
        var b = "mousedown" === a.type,
        c = 0;
        document.pointerLockElement || this.o && a.target.requestPointerLock();
        if (b && 0 === a.button && a.ctrlKey && a.shiftKey) a.target.requestPointerLock();
        else {
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
            this.f({
                type: 2,
                button: c,
                pressed: !!b
            })
        }
    }
};
m.L = function(a) {
    a.preventDefault()
};
m.O = function(a) {
    if (!this.block) {
        var b = 0;
        if (document.pointerLockElement) {
            b = 1;
            var c = a.movementX;
            a = a.movementY
        } else c = a.clientX,
        a = a.clientY;
        this.f({
            type: 4,
            relative: !!b,
            x: c,
            y: a
        })
    }
};
m.R = function(a) {
    this.block || this.f({
        type: 3,
        x: a.deltaX / -100,
        y: a.deltaY / -100
    })
};
m.D = function(a) {
    if (!this.block) {
        var b = P[a.code];
        if (b) {
            a.preventDefault();
            var c = 0;
            a.shiftKey && (c |= 3);
            a.ctrlKey && (c |= 192);
            a.altKey && (c |= 768);
            a.metaKey && (c |= 3072);
            a.getModifierState("NumLock") && (c |= 4096);
            a.getModifierState("CapsLock") && (c |= 8192);
            this.f({
                type: 1,
                code: b,
                mod: c,
                pressed: "keydown" == a.type
            })
        }
    }
};
m.M = function(a, b, c) {
    this.block || (6 === b || 7 === b ? this.C(a, b - 2, c) : (b = ia[b], void 0 !== b && this.f({
        type: 5,
        button: b,
        id: a,
        pressed: c ? !0 : !1
    })))
};
m.C = function(a, b, c) {
    this.block || this.f({
        type: 6,
        axis: b,
        id: a,
        value: 0 < c ? 32767 * c: 32768 * c
    })
};
m.N = function(a) {
    this.f({
        type: 7,
        id: a
    })
};
m.P = function() {
    if (!document.pointerLockElement && !this.h) {
        var a = {
            type: 1,
            code: P.Escape,
            mod: 0,
            pressed: !0
        };
        this.f(a);
        a.pressed = !1;
        this.f(a)
    }
    this.h = !1
};
function la(a, b, c) {
    a.b.style.cursor = b.cursor.hidden ? "none": "";
    a.o = b.cursor.relative;
    a.o ? a.b.requestPointerLock() : document.pointerLockElement && (a.h = !0, document.exitPointerLock());
    if (b.cursor.imageUpdate) {
        c = c(b.key);
        c = btoa(String.fromCharCode.apply(String, c instanceof Array ? c: aa(r(c))));
        var d = b.cursor.hotX;
        b = b.cursor.hotY;
        if (!a.i[c]) {
            a.i[c] = "cursor-x-" + a.s;
            var g = document.createElement("style");
            g.type = "text/css";
            g.innerHTML = ".cursor-x-" + a.s+++" {cursor: url(data:image/png;base64," + (c + ") " + d + " " + b + ", auto;}");
            document.querySelector("head").appendChild(g);
            a.j.push(g)
        }
        a.g && a.b.classList.remove(a.g);
        a.b.classList.add(a.i[c]);
        a.g = a.i[c]
    }
}
function ma(a) {
    M(a.c);
    a.c = [];
    a.l && a.l.m()
}
m.m = function() {
    ma(this);
    var a = document.querySelector("head");
    if (this.j) for (var b = r(this.j), c = b.next(); ! c.done; c = b.next()) a.removeChild(c.value);
    this.g && this.b.classList.remove(this.g);
    this.b.style.cursor = "";
    document.pointerLockElement && (this.h = !0, document.exitPointerLock())
};
var Q = 1E3 / 60 / 1E3;
function R(a, b) {
    a.playbackRate = b;
    a.play().
    catch(function() {})
}
function S(a, b, c) {
    var d = this;
    this.b = a;
    this.l = !0;
    this.type = b;
    this.s = c;
    this.f = this.c = null;
    this.o = 'video/mp4; codecs="avc1.64001e"' === this.type;
    this.g = [];
    this.j = [];
    this.h = null;
    this.i = 0;
    this.B = function() {
        var g = d.b.seekable;
        if (g && 0 < g.length) {
            g = g.end(0);
            var h = g - d.b.currentTime;
            'video/mp4; codecs="avc1.64001e"' === d.type ? (d.i = h > 1.5 * Q ? d.i + 1 : 0, 60 < d.i && 1 == d.b.playbackRate ? R(d.b, h > 3 * Q ? 10 : 1.25) : h < Q && 1 != d.b.playbackRate && R(d.b, 1)) : h > .1 * 3 ? d.b.currentTime = g + 1E3: h > .1 * 1.5 && 1 == d.b.playbackRate ? R(d.b, 10) : .1 > h && 10 == d.b.playbackRate && R(d.b, 1)
        }
    }
}
S.prototype.u = function() {
    if (0 < this.j.length && this.c && !this.c.updating) try {
        var a = this.j.shift();
        this.c.appendBuffer(a)
    } catch(b) {
        console.warn(b),
        this.m(),
        this.s && this.s()
    }
};
function na(a) {
    a.f = new MediaSource;
    a.b.src = URL.createObjectURL(a.f);
    a.b.load();
    a.g.push(L(a.b, "error",
    function() {
        console.error(a.b.error.message)
    },
    null));
    a.g.push(L(a.f, "sourceopen",
    function() {
        a.c = a.f.addSourceBuffer(a.type);
        a.c.mode = "sequence";
        a.g.push(L(a.c, "update", a.u, a));
        a.b.play().
        catch(function() {});
        a.h = setInterval(a.B, 1)
    },
    null))
}
S.prototype.m = function() {
    this.h && clearInterval(this.h);
    this.b.pause();
    M(this.g);
    this.f && (this.c && (this.f.removeSourceBuffer(this.c), this.c = null), this.f.endOfStream(), URL.revokeObjectURL(this.b.src), this.f = null);
    this.b.src = "";
    this.l = !0;
    this.o = 'video/mp4; codecs="avc1.64001e"' === this.type;
    this.g = [];
    this.j = [];
    this.h = null;
    this.i = 0
};
function oa(a, b) {
    b = new Uint8Array(b);
    'audio/mp4; codecs="opus"' === a.type && a.l && (a.l = !1, na(a));
    'video/mp4; codecs="avc1.64001e"' === a.type && 102 === b[4] && (a.m(), na(a), a.o = !1);
    a.o || (a.j.push(b), a.u())
};
function T(a, b, c, d) {
    var g = new ArrayBuffer(13),
    h = new DataView(g);
    h.setInt32(0, b);
    h.setInt32(4, c);
    h.setInt32(8, d);
    h.setInt8(12, a);
    return g
}
function pa(a, b) {
    var c = new ArrayBuffer(13 + b.length + 1),
    d = b.length + 1,
    g = new DataView(c);
    g.setInt32(0, d);
    g.setInt32(4, 0);
    g.setInt32(8, 0);
    g.setInt8(12, a);
    a = (new TextEncoder).encode(b);
    d = new Int8Array(c, 13);
    for (g = 0; g < b.length; g++) d[g] = a[g];
    return c
}
function qa(a, b) {
    a = JSON.stringify({
        _version: 1,
        _max_w: 6E4,
        _max_h: 6E4,
        _flags: 0,
        resolutionX: a,
        resolutionY: b,
        refreshRate: 60,
        mediaContainer: 2
    });
    return pa(11, a)
}
function ra(a, b) {
    switch (a.type) {
    case 4:
        if (!a.relative) {
            var c = b.videoWidth,
            d = b.videoHeight,
            g = b.offsetWidth,
            h = b.offsetHeight,
            e = Math.min(g / c, h / d);
            b = c * e;
            e *= d;
            h = Math.max((h - e) / 2, 0);
            g = Math.round(c / b * (a.x - Math.max((g - b) / 2, 0)));
            g === c - 1 && (g = c);
            g > c && (g = c);
            0 > g && (g = 0);
            a.x = g;
            c = Math.round(d / e * (a.y - h));
            c === d - 1 && (c = d);
            c > d && (c = d);
            0 > c && (c = 0);
            a.y = c
        }
        return T(3, a.relative ? 1 : 0, a.x, a.y);
    case 2:
        return T(1, a.button, a.pressed ? 1 : 0, 0);
    case 1:
        return T(0, a.code, a.mod, a.pressed ? 1 : 0);
    case 3:
        return T(2, a.x, a.y, 0);
    case 5:
        return T(4, a.button, a.pressed ? 1 : 0, a.id);
    case 6:
        return T(5, a.axis, a.value, a.id);
    case 7:
        return T(6, 0, 0, a.id);
    case 9:
        return T(24, 0, 0, 0)
    }
}
var U = {},
sa = 1;
function ta(a) {
    var b = sa++;
    U[b] = a;
    return b
}
function ua(a) {
    var b = a.getInt16(32),
    c = a.getInt32(16),
    d = 0 < c ? new Uint8Array(a.buffer, 34, c - 1) : null;
    d = d ? ta(d) : 0;
    return {
        type: 1,
        cursor: {
            size: c,
            positionX: a.getInt16(24),
            positionY: a.getInt16(26),
            width: a.getInt16(20),
            height: a.getInt16(22),
            hotX: a.getInt16(28),
            hotY: a.getInt16(30),
            modeUpdate: !0,
            imageUpdate: 0 < d,
            relative: !!(b & 256),
            hidden: !!(b & 512),
            png: !0
        },
        key: d
    }
}
function va(a, b) {
    b = ta(new Uint8Array(b.buffer, 13, a.w));
    return {
        type: 3,
        id: a.A,
        key: b
    }
};
function wa() {
    var a = new Uint8Array(16);
    crypto.getRandomValues(a);
    return a.map(function(b) {
        return b % 10
    }).join("")
}
function V(a) {
    var b = this;
    this.l = a;
    this.i = !1;
    this.j = "";
    this.h = !1;
    this.b = this.sdp = null;
    this.c = {};
    this.g = [];
    this.f = null;
    this.b = new RTCPeerConnection({
        iceServers: [{
            urls: "stun:stun.parsec.gg:3478"
        }]
    });
    this.b.onicecandidate = function(c) {
        c.candidate && (c = c.candidate.candidate.replace("candidate:", "").split(" "), "udp" === c[2].toLowerCase() && b.l(c[4], parseInt(c[5], 10), !1, "srflx" === c[7], "host" === c[7]))
    }
}
V.prototype.close = function() {
    for (var a = r(Object.entries(this.c)), b = a.next(); ! b.done; b = a.next()) b.value[1].close();
    this.b.close()
};
function W(a, b, c, d, g) {
    a.c[c] = a.b.createDataChannel(b, {
        negotiated: !0,
        id: c
    });
    a.c[c].binaryType = "arraybuffer";
    a.c[c].onopen = d;
    a.c[c].onmessage = g
}
function xa(a) {
    var b;
    return J(function(c) {
        if (1 == c.b) return b = a,
        G(c, a.b.createOffer(), 2);
        b.f = c.i;
        for (var d = a.f.sdp.split("\n"), g = {},
        h = 0; h < d.length; h++) {
            var e = d[h].split("="),
            f = e[0];
            e = e[1];
            f && ("a" === f ? (g.a || (g.a = {}), f = e.split(/:(.+)/), g.a[f[0]] = f[1]) : g[f] = e)
        }
        a.sdp = g;
        return c.
        return ({
            ice_ufrag: a.sdp.a["ice-ufrag"],
            ice_pwd: a.sdp.a["ice-pwd"],
            fingerprint: a.sdp.a.fingerprint
        })
    })
}
V.prototype.send = function(a, b) {
    "open" == this.c[b].readyState && this.c[b].send(a)
};
function ya(a) {
    for (; 0 < a.g.length;) {
        var b = a.g.shift();
        a.b.addIceCandidate(new RTCIceCandidate({
            candidate: "candidate:2395300328 1 udp 2113937151 " + b.ip + " " + (b.port + " typ " + (b.from_stun ? "srflx": "host") + " generation 0 ufrag " + a.j + " network-cost 50"),
            sdpMid: a.sdp.a.mid,
            sdpMLineIndex: 0
        }))
    }
}
function za(a, b, c, d) {
    var g, h;
    J(function(e) {
        switch (e.b) {
        case 1:
            if (!a.f) throw "Offer is not set";
            if (a.h) {
                e.b = 0;
                break
            }
            a.j = b;
            return G(e, a.b.setLocalDescription(a.f), 3);
        case 3:
            e.h = 4;
            var f = a.sdp.a.mid;
            g = "v=0\r\no=- " + (wa() + " 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE ") + (f + "\r\na=msid-semantic: WMS *\r\nm=application 9 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\nb=AS:30\r\na=ice-ufrag:") + (b + "\r\na=ice-pwd:") + (c + "\r\na=ice-options:trickle\r\na=fingerprint:") + (d + "\r\na=setup:active\r\na=mid:") + (f + "\r\na=sendrecv\r\na=sctpmap:5000 webrtc-datachannel 256\r\na=max-message-size:1073741823\r\n");
            return G(e, a.b.setRemoteDescription(new RTCSessionDescription({
                type: "answer",
                sdp: g
            })), 6);
        case 6:
            e.b = 5;
            e.h = 0;
            break;
        case 4:
            e.h = 0,
            f = e.f.I,
            e.f = null,
            h = f,
            console.log(h);
        case 5:
            a.i && ya(a),
            a.h = !0,
            e.b = 0
        }
    })
}
function Aa(a, b, c, d, g) {
    d ? (a.i = !0, setTimeout(function() {
        a.l("1.2.3.4", 1234, !0, !1, !1)
    },
    500)) : a.g.push({
        ip: b.replace("::ffff:", ""),
        port: c,
        from_stun: g
    });
    a.h && a.i && ya(a)
};
function Ba(a, b) {
    this.c = b;
    this.g = a;
    this.f = "";
    this.b = null;
    this.h = [];
    this.i = this.j = !1;
    this.timeout = null
}
function Ca(a, b, c, d, g, h, e) {
    a.b = new WebSocket("wss://kessel-ws.parsecgaming.com:443/?session_id=" + b + "&role=client&version=1&sdk_version=0");
    a.f = c;
    a.b.onclose = function() {
        a.i || a.c(N.WS_ERR_CLOSE)
    };
    a.b.onerror = function() {
        a.c(N.WS_ERR_CONNECT)
    };
    a.b.onopen = function() {
        for (; 0 < a.h.length;) a.b.send(a.h.shift());
        X(a, {
            action: "offer",
            version: 1,
            payload: {
                to: a.f,
                attempt_id: a.g,
                secret: d ? d: "",
                data: {
                    ver_data: 1,
                    creds: g,
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
        a.timeout = setTimeout(function() {
            a.c(N.CONNECT_WRN_APPROVAL)
        },
        3E4)
    };
    a.b.onmessage = function(f) {
        f = JSON.parse(f.data);
        switch (f.action) {
        case "answer_relay":
            a.j = !0;
            if (!f.payload.approved) {
                a.c(N.CONNECT_WRN_DECLINED);
                break
            }
            a.timeout && clearTimeout(a.timeout);
            a.timeout = setTimeout(function() {
                a.c(N.NAT_ERR_WEBRTC)
            },
            1E4);
            f = f.payload.data.creds;
            h(f.ice_ufrag, f.ice_pwd, f.fingerprint);
            break;
        case "candex_relay":
            f = f.payload.data;
            e(f.ip, f.port, f.sync, f.from_stun);
            break;
        case "close":
            var k = N.WS_ERR_CLOSE;
            switch (f.payload.reason) {
            case "HOST_NOT_FOUND":
                k = N.CONNECT_WRN_PEER_GONE;
                break;
            case "USER_UNCONFIRMED":
                k = N.CONNECT_WRN_UNCONFIRMED
            }
            a.c(k)
        }
    }
}
function X(a, b) {
    a.b && (b = JSON.stringify(b), a.b.readyState == WebSocket.OPEN ? a.b.send(b) : a.h.push(b))
}
Ba.prototype.close = function(a) {
    this.i = !0;
    this.b && (this.b.close(a), this.b = null);
    this.timeout && (clearTimeout(this.timeout), this.timeout = null)
};
function Da() {
    for (var a = [], b = new Uint8Array(4), c = 0; 6 > c; c++) crypto.getRandomValues(b),
    a.push(Array.from(b).map(function(d) {
        return d.toString(16).padStart(2, "0")
    }).join(""));
    return a.join("-")
}
function Y(a, b, c) {
    var d = this;
    this.status = N.PARSEC_NOT_RUNNING;
    this.o = performance.now();
    this.s = {
        encodeLatency: 0,
        decodeLatency: 0,
        networkLatency: 0
    };
    this.f = [];
    this.c = this.signal = this.b = null;
    this.j = [];
    this.i = "";
    this.video = a;
    this.u = c;
    this.g = O.None;
    this.l = new S(b, 'audio/mp4; codecs="opus"', null);
    this.h = new S(a, 'video/mp4; codecs="avc1.64001e"',
    function() {
        d.b && d.b.send(T(13, 0, 0, 0), 0)
    });
    this.j.push(L(window, "beforeunload",
    function() {
        d.m();
        return null
    },
    null))
}
function Z(a, b) {
    if (a.signal && a.status == N.PARSEC_CONNECTING) {
        var c = a.signal;
        X(c, {
            action: "offer_cancel",
            version: 1,
            payload: {
                to: c.f,
                attempt_id: c.g
            }
        })
    }
    a.signal && (a.signal.close(1E3), a.signal = null);
    b != N.PARSEC_OK && (a.b && a.status == N.PARSEC_OK && a.b.send(T(10, 0, 0, 0), 0), a.b && (a.b.close(), a.b = null), a.h.m(), a.l.m(), a.c && (a.c.m(), a.c = null));
    a.status = b
}
m = Y.prototype;
m.m = function() {
    M(this.j);
    this.G()
};
m.ba = function() {};
m.$ = function() {
    return this.i
};
m.J = function(a) {
    var b = U[a];
    void 0 != b && delete U[a];
    return void 0 == b ? null: b
};
m.K = function(a) {
    this.g = a;
    if (this.c) {
        var b = this.c;
        ma(b);
        a & O.Gamepad && (b.l = new ja(b.M.bind(b), b.C.bind(b), b.N.bind(b)));
        a & O.Mouse && (b.c.push(L(b.b, "mousedown", b.F, b)), b.c.push(L(b.b, "mouseup", b.F, b)), b.c.push(L(b.b, "contextmenu", b.L, b)), b.c.push(L(b.b, "mousemove", b.O, b)), b.c.push(L(b.b, "wheel", b.R, b)), b.c.push(L(document, "pointerlockchange", b.P, b)));
        a & O.Keyboard && (b.c.push(L(window, "keyup", b.D, b)), b.c.push(L(window, "keydown", b.D, b)))
    }
};
m.T = function(a, b, c) {
    var d = this,
    g, h, e, f, k;
    return J(function(p) {
        if (1 == p.b) {
            if (d.status != N.PARSEC_NOT_RUNNING) return p.
            return ();
            d.status = N.PARSEC_CONNECTING;
            U = {};
            sa = 1;
            d.l.m();
            d.h.m();
            d.f = [];
            d.i = Da();
            d.signal = new Ba(d.i,
            function(l) {
                Z(d, l)
            });
            g = function(l, q, t, w, C) {
                if (d.signal) {
                    var y = d.signal;
                    X(y, {
                        action: "candex",
                        version: 1,
                        payload: {
                            to: y.f,
                            attempt_id: y.g,
                            data: {
                                ver_data: 1,
                                ip: l,
                                port: q,
                                lan: C,
                                from_stun: w,
                                sync: t
                            }
                        }
                    })
                }
            };
            h = function() {
                d.j.push(L(document, "visibilitychange",
                function() {
                    document.hidden ? (d.h.m(), d.b && d.b.send(T(19, 0, 0, 0), 0)) : d.b && d.b.send(T(13, 0, 0, 0), 0)
                },
                null));
                var l = window.screen.width,
                q = window.screen.height;
                if (800 > l || 600 > q || 1920 < l || 1080 < q) l = 1920,
                q = 1080;
                d.b && d.b.send(qa(l, q), 0);
                Z(d, N.PARSEC_OK)
            };
            d.b = new V(g);
            W(d.b, "control", 0, h,
            function(l) {
                d.o = performance.now();
                l = new DataView(l.data);
                var q = {
                    w: l.getInt32(0),
                    A: l.getInt32(4),
                    Z: l.getInt32(8),
                    type: l.getInt8(12)
                };
                switch (q.type) {
                case 10:
                    d.status = q.w;
                    break;
                case 21:
                    d.s = {
                        encodeLatency: parseFloat(q.A) / 1E3,
                        decodeLatency: 0,
                        networkLatency: 0
                    };
                    break;
                case 20:
                    d.g & O.Gamepad || d.f.push({
                        type: 2,
                        gamepadID: q.w,
                        motorBig: q.A,
                        motorSmall: q.Z
                    });
                    break;
                case 16:
                    d.f.push({
                        type:
                        q.w ? 4 : 5
                    });
                    break;
                case 17:
                    d.f.push(va(q, l));
                    break;
                case 9:
                    d.g & O.Mouse ? d.c && la(d.c, ua(l),
                    function(t) {
                        return d.J(t)
                    }) : d.f.push(ua(l))
                }
            });
            W(d.b, "video", 1, null,
            function(l) {
                oa(d.h, l.data)
            });
            W(d.b, "audio", 2, null,
            function(l) {
                oa(d.l, l.data)
            });
            return G(p, xa(d.b), 2)
        }
        e = p.i;
        f = function(l, q, t) {
            d.b && za(d.b, l, q, t)
        };
        k = function(l, q, t, w) {
            d.b && Aa(d.b, l, q, t, w)
        };
        d.signal && Ca(d.signal, a, b, c, e, f, k);
        d.c || (d.c = new ka(d.u,
        function(l) {
            d.H(l)
        }), d.K(d.g));
        p.b = 0
    })
};
m.V = function() {
    return this.status
};
m.G = function() {
    Z(this, N.PARSEC_NOT_RUNNING)
};
m.Y = function(a, b) {
    this.b && this.status == N.PARSEC_OK && this.b.send(pa(17, b), 0)
};
m.H = function(a) {
    this.b && this.status == N.PARSEC_OK && this.b.send(ra(a, this.video), 0)
};
m.X = function() {
    return this.f.shift()
};
m.U = function() {
    return this.s
};
m.W = function() {
    return this.status == N.PARSEC_OK && 5E3 < performance.now() - this.o
};
m.S = function(a) {
    this.c && (this.c.block = a)
};
Y.prototype.destroy = Y.prototype.m;
Y.prototype.setLogCallback = Y.prototype.ba;
Y.prototype.getAttemptID = Y.prototype.$;
Y.prototype.getBuffer = Y.prototype.J;
Y.prototype.handleInput = Y.prototype.K;
Y.prototype.clientConnect = Y.prototype.T;
Y.prototype.clientGetStatus = Y.prototype.V;
Y.prototype.clientDisconnect = Y.prototype.G;
Y.prototype.clientSendUserData = Y.prototype.Y;
Y.prototype.clientSendMessage = Y.prototype.H;
Y.prototype.clientPollEvents = Y.prototype.X;
Y.prototype.clientGetMetrics = Y.prototype.U;
Y.prototype.clientNetworkFailure = Y.prototype.W;
Y.prototype.clientBlockInput = Y.prototype.S;
Y.prototype.Input = O;
Y.prototype.Status = N;
window.Parsec = Y;