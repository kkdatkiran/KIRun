(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    394: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, "setupMode", function () {
          return Jt;
        });
      var r,
        i = n(192),
        o = (function () {
          function e(e) {
            var t = this;
            (this._defaults = e),
              (this._worker = null),
              (this._idleCheckInterval = setInterval(function () {
                return t._checkIfIdle();
              }, 3e4)),
              (this._lastUsedTime = 0),
              (this._configChangeListener = this._defaults.onDidChange(function () {
                return t._stopWorker();
              }));
          }
          return (
            (e.prototype._stopWorker = function () {
              this._worker && (this._worker.dispose(), (this._worker = null)), (this._client = null);
            }),
            (e.prototype.dispose = function () {
              clearInterval(this._idleCheckInterval), this._configChangeListener.dispose(), this._stopWorker();
            }),
            (e.prototype._checkIfIdle = function () {
              this._worker && Date.now() - this._lastUsedTime > 12e4 && this._stopWorker();
            }),
            (e.prototype._getClient = function () {
              return (
                (this._lastUsedTime = Date.now()),
                this._client ||
                  ((this._worker = i.editor.createWebWorker({
                    moduleId: "vs/language/json/jsonWorker",
                    label: this._defaults.languageId,
                    createData: {
                      languageSettings: this._defaults.diagnosticsOptions,
                      languageId: this._defaults.languageId,
                      enableSchemaRequest: this._defaults.diagnosticsOptions.enableSchemaRequest,
                    },
                  })),
                  (this._client = this._worker.getProxy())),
                this._client
              );
            }),
            (e.prototype.getLanguageServiceWorker = function () {
              for (var e, t = this, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
              return this._getClient()
                .then(function (t) {
                  e = t;
                })
                .then(function (e) {
                  return t._worker.withSyncedResources(n);
                })
                .then(function (t) {
                  return e;
                });
            }),
            e
          );
        })();
      function a(e, t) {
        void 0 === t && (t = !1);
        var n = e.length,
          r = 0,
          i = "",
          o = 0,
          a = 16,
          l = 0,
          f = 0,
          h = 0,
          p = 0,
          d = 0;
        function m(t, n) {
          for (var i = 0, o = 0; i < t || !n; ) {
            var a = e.charCodeAt(r);
            if (a >= 48 && a <= 57) o = 16 * o + a - 48;
            else if (a >= 65 && a <= 70) o = 16 * o + a - 65 + 10;
            else {
              if (!(a >= 97 && a <= 102)) break;
              o = 16 * o + a - 97 + 10;
            }
            r++, i++;
          }
          return i < t && (o = -1), o;
        }
        function g() {
          if (((i = ""), (d = 0), (o = r), (f = l), (p = h), r >= n)) return (o = n), (a = 17);
          var t = e.charCodeAt(r);
          if (s(t)) {
            do {
              r++, (i += String.fromCharCode(t)), (t = e.charCodeAt(r));
            } while (s(t));
            return (a = 15);
          }
          if (u(t))
            return (
              r++, (i += String.fromCharCode(t)), 13 === t && 10 === e.charCodeAt(r) && (r++, (i += "\n")), l++, (h = r), (a = 14)
            );
          switch (t) {
            case 123:
              return r++, (a = 1);
            case 125:
              return r++, (a = 2);
            case 91:
              return r++, (a = 3);
            case 93:
              return r++, (a = 4);
            case 58:
              return r++, (a = 6);
            case 44:
              return r++, (a = 5);
            case 34:
              return (
                r++,
                (i = (function () {
                  for (var t = "", i = r; ; ) {
                    if (r >= n) {
                      (t += e.substring(i, r)), (d = 2);
                      break;
                    }
                    var o = e.charCodeAt(r);
                    if (34 === o) {
                      (t += e.substring(i, r)), r++;
                      break;
                    }
                    if (92 !== o) {
                      if (o >= 0 && o <= 31) {
                        if (u(o)) {
                          (t += e.substring(i, r)), (d = 2);
                          break;
                        }
                        d = 6;
                      }
                      r++;
                    } else {
                      if (((t += e.substring(i, r)), ++r >= n)) {
                        d = 2;
                        break;
                      }
                      switch (e.charCodeAt(r++)) {
                        case 34:
                          t += '"';
                          break;
                        case 92:
                          t += "\\";
                          break;
                        case 47:
                          t += "/";
                          break;
                        case 98:
                          t += "\b";
                          break;
                        case 102:
                          t += "\f";
                          break;
                        case 110:
                          t += "\n";
                          break;
                        case 114:
                          t += "\r";
                          break;
                        case 116:
                          t += "\t";
                          break;
                        case 117:
                          var a = m(4, !0);
                          a >= 0 ? (t += String.fromCharCode(a)) : (d = 4);
                          break;
                        default:
                          d = 5;
                      }
                      i = r;
                    }
                  }
                  return t;
                })()),
                (a = 10)
              );
            case 47:
              var g = r - 1;
              if (47 === e.charCodeAt(r + 1)) {
                for (r += 2; r < n && !u(e.charCodeAt(r)); ) r++;
                return (i = e.substring(g, r)), (a = 12);
              }
              if (42 === e.charCodeAt(r + 1)) {
                r += 2;
                for (var y = n - 1, b = !1; r < y; ) {
                  var x = e.charCodeAt(r);
                  if (42 === x && 47 === e.charCodeAt(r + 1)) {
                    (r += 2), (b = !0);
                    break;
                  }
                  r++, u(x) && (13 === x && 10 === e.charCodeAt(r) && r++, l++, (h = r));
                }
                return b || (r++, (d = 1)), (i = e.substring(g, r)), (a = 13);
              }
              return (i += String.fromCharCode(t)), r++, (a = 16);
            case 45:
              if (((i += String.fromCharCode(t)), ++r === n || !c(e.charCodeAt(r)))) return (a = 16);
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              return (
                (i += (function () {
                  var t = r;
                  if (48 === e.charCodeAt(r)) r++;
                  else for (r++; r < e.length && c(e.charCodeAt(r)); ) r++;
                  if (r < e.length && 46 === e.charCodeAt(r)) {
                    if (!(++r < e.length && c(e.charCodeAt(r)))) return (d = 3), e.substring(t, r);
                    for (r++; r < e.length && c(e.charCodeAt(r)); ) r++;
                  }
                  var n = r;
                  if (r < e.length && (69 === e.charCodeAt(r) || 101 === e.charCodeAt(r)))
                    if (
                      (((++r < e.length && 43 === e.charCodeAt(r)) || 45 === e.charCodeAt(r)) && r++,
                      r < e.length && c(e.charCodeAt(r)))
                    ) {
                      for (r++; r < e.length && c(e.charCodeAt(r)); ) r++;
                      n = r;
                    } else d = 3;
                  return e.substring(t, n);
                })()),
                (a = 11)
              );
            default:
              for (; r < n && v(t); ) r++, (t = e.charCodeAt(r));
              if (o !== r) {
                switch ((i = e.substring(o, r))) {
                  case "true":
                    return (a = 8);
                  case "false":
                    return (a = 9);
                  case "null":
                    return (a = 7);
                }
                return (a = 16);
              }
              return (i += String.fromCharCode(t)), r++, (a = 16);
          }
        }
        function v(e) {
          if (s(e) || u(e)) return !1;
          switch (e) {
            case 125:
            case 93:
            case 123:
            case 91:
            case 34:
            case 58:
            case 44:
            case 47:
              return !1;
          }
          return !0;
        }
        return {
          setPosition: function (e) {
            (r = e), (i = ""), (o = 0), (a = 16), (d = 0);
          },
          getPosition: function () {
            return r;
          },
          scan: t
            ? function () {
                var e;
                do {
                  e = g();
                } while (e >= 12 && e <= 15);
                return e;
              }
            : g,
          getToken: function () {
            return a;
          },
          getTokenValue: function () {
            return i;
          },
          getTokenOffset: function () {
            return o;
          },
          getTokenLength: function () {
            return r - o;
          },
          getTokenStartLine: function () {
            return f;
          },
          getTokenStartCharacter: function () {
            return o - p;
          },
          getTokenError: function () {
            return d;
          },
        };
      }
      function s(e) {
        return (
          32 === e ||
          9 === e ||
          11 === e ||
          12 === e ||
          160 === e ||
          5760 === e ||
          (e >= 8192 && e <= 8203) ||
          8239 === e ||
          8287 === e ||
          12288 === e ||
          65279 === e
        );
      }
      function u(e) {
        return 10 === e || 13 === e || 8232 === e || 8233 === e;
      }
      function c(e) {
        return e >= 48 && e <= 57;
      }
      function l(e, t, n) {
        void 0 === n && (n = r.DEFAULT);
        var i = a(e, !1);
        function o(e) {
          return e
            ? function () {
                return e(i.getTokenOffset(), i.getTokenLength(), i.getTokenStartLine(), i.getTokenStartCharacter());
              }
            : function () {
                return !0;
              };
        }
        function s(e) {
          return e
            ? function (t) {
                return e(t, i.getTokenOffset(), i.getTokenLength(), i.getTokenStartLine(), i.getTokenStartCharacter());
              }
            : function () {
                return !0;
              };
        }
        var u = o(t.onObjectBegin),
          c = s(t.onObjectProperty),
          l = o(t.onObjectEnd),
          f = o(t.onArrayBegin),
          h = o(t.onArrayEnd),
          p = s(t.onLiteralValue),
          d = s(t.onSeparator),
          m = o(t.onComment),
          g = s(t.onError),
          v = n && n.disallowComments,
          y = n && n.allowTrailingComma;
        function b() {
          for (;;) {
            var e = i.scan();
            switch (i.getTokenError()) {
              case 4:
                x(14);
                break;
              case 5:
                x(15);
                break;
              case 3:
                x(13);
                break;
              case 1:
                v || x(11);
                break;
              case 2:
                x(12);
                break;
              case 6:
                x(16);
            }
            switch (e) {
              case 12:
              case 13:
                v ? x(10) : m();
                break;
              case 16:
                x(1);
                break;
              case 15:
              case 14:
                break;
              default:
                return e;
            }
          }
        }
        function x(e, t, n) {
          if ((void 0 === t && (t = []), void 0 === n && (n = []), g(e), t.length + n.length > 0))
            for (var r = i.getToken(); 17 !== r; ) {
              if (-1 !== t.indexOf(r)) {
                b();
                break;
              }
              if (-1 !== n.indexOf(r)) break;
              r = b();
            }
        }
        function A(e) {
          var t = i.getTokenValue();
          return e ? p(t) : c(t), b(), !0;
        }
        function S() {
          switch (i.getToken()) {
            case 3:
              return (function () {
                f(), b();
                for (var e = !1; 4 !== i.getToken() && 17 !== i.getToken(); ) {
                  if (5 === i.getToken()) {
                    if ((e || x(4, [], []), d(","), b(), 4 === i.getToken() && y)) break;
                  } else e && x(6, [], []);
                  S() || x(4, [], [4, 5]), (e = !0);
                }
                return h(), 4 !== i.getToken() ? x(8, [4], []) : b(), !0;
              })();
            case 1:
              return (function () {
                u(), b();
                for (var e = !1; 2 !== i.getToken() && 17 !== i.getToken(); ) {
                  if (5 === i.getToken()) {
                    if ((e || x(4, [], []), d(","), b(), 2 === i.getToken() && y)) break;
                  } else e && x(6, [], []);
                  (10 !== i.getToken()
                    ? (x(3, [], [2, 5]), 0)
                    : (A(!1), 6 === i.getToken() ? (d(":"), b(), S() || x(4, [], [2, 5])) : x(5, [], [2, 5]), 1)) ||
                    x(4, [], [2, 5]),
                    (e = !0);
                }
                return l(), 2 !== i.getToken() ? x(7, [2], []) : b(), !0;
              })();
            case 10:
              return A(!0);
            default:
              return (function () {
                switch (i.getToken()) {
                  case 11:
                    var e = i.getTokenValue(),
                      t = Number(e);
                    isNaN(t) && (x(2), (t = 0)), p(t);
                    break;
                  case 7:
                    p(null);
                    break;
                  case 8:
                    p(!0);
                    break;
                  case 9:
                    p(!1);
                    break;
                  default:
                    return !1;
                }
                return b(), !0;
              })();
          }
        }
        return (
          b(),
          17 === i.getToken()
            ? !!n.allowEmptyContent || (x(4, [], []), !1)
            : S()
            ? (17 !== i.getToken() && x(9, [], []), !0)
            : (x(4, [], []), !1)
        );
      }
      !(function (e) {
        e.DEFAULT = { allowTrailingComma: !1 };
      })(r || (r = {}));
      var f,
        h,
        p,
        d,
        m,
        g,
        v,
        y,
        b,
        x,
        A,
        S,
        C,
        k,
        w,
        I,
        E,
        T,
        j,
        O,
        _,
        M,
        P,
        V,
        N,
        F,
        R = a,
        $ = function (e, t, n) {
          void 0 === t && (t = []), void 0 === n && (n = r.DEFAULT);
          var i = null,
            o = [],
            a = [];
          function s(e) {
            Array.isArray(o) ? o.push(e) : null !== i && (o[i] = e);
          }
          return (
            l(
              e,
              {
                onObjectBegin: function () {
                  var e = {};
                  s(e), a.push(o), (o = e), (i = null);
                },
                onObjectProperty: function (e) {
                  i = e;
                },
                onObjectEnd: function () {
                  o = a.pop();
                },
                onArrayBegin: function () {
                  var e = [];
                  s(e), a.push(o), (o = e), (i = null);
                },
                onArrayEnd: function () {
                  o = a.pop();
                },
                onLiteralValue: s,
                onError: function (e, n, r) {
                  t.push({ error: e, offset: n, length: r });
                },
              },
              n
            ),
            o[0]
          );
        },
        L = function e(t, n, r) {
          if (
            (void 0 === r && (r = !1),
            (function (e, t, n) {
              return void 0 === n && (n = !1), (t >= e.offset && t < e.offset + e.length) || (n && t === e.offset + e.length);
            })(t, n, r))
          ) {
            var i = t.children;
            if (Array.isArray(i))
              for (var o = 0; o < i.length && i[o].offset <= n; o++) {
                var a = e(i[o], n, r);
                if (a) return a;
              }
            return t;
          }
        },
        D = function e(t) {
          if (!t.parent || !t.parent.children) return [];
          var n = e(t.parent);
          if ("property" === t.parent.type) {
            var r = t.parent.children[0].value;
            n.push(r);
          } else if ("array" === t.parent.type) {
            var i = t.parent.children.indexOf(t);
            -1 !== i && n.push(i);
          }
          return n;
        },
        U = function e(t) {
          switch (t.type) {
            case "array":
              return t.children.map(e);
            case "object":
              for (var n = Object.create(null), r = 0, i = t.children; r < i.length; r++) {
                var o = i[r],
                  a = o.children[1];
                a && (n[o.children[0].value] = e(a));
              }
              return n;
            case "null":
            case "string":
            case "number":
            case "boolean":
              return t.value;
            default:
              return;
          }
        };
      function W(e, t) {
        if (e === t) return !0;
        if (null == e || null == t) return !1;
        if (typeof e != typeof t) return !1;
        if ("object" != typeof e) return !1;
        if (Array.isArray(e) !== Array.isArray(t)) return !1;
        var n, r;
        if (Array.isArray(e)) {
          if (e.length !== t.length) return !1;
          for (n = 0; n < e.length; n++) if (!W(e[n], t[n])) return !1;
        } else {
          var i = [];
          for (r in e) i.push(r);
          i.sort();
          var o = [];
          for (r in t) o.push(r);
          if ((o.sort(), !W(i, o))) return !1;
          for (n = 0; n < i.length; n++) if (!W(e[i[n]], t[i[n]])) return !1;
        }
        return !0;
      }
      function q(e) {
        return "number" == typeof e;
      }
      function B(e) {
        return void 0 !== e;
      }
      function K(e) {
        return "boolean" == typeof e;
      }
      !(function (e) {
        (e.MIN_VALUE = -2147483648), (e.MAX_VALUE = 2147483647);
      })(f || (f = {})),
        (function (e) {
          (e.MIN_VALUE = 0), (e.MAX_VALUE = 2147483647);
        })(h || (h = {})),
        (function (e) {
          (e.create = function (e, t) {
            return (
              e === Number.MAX_VALUE && (e = h.MAX_VALUE), t === Number.MAX_VALUE && (t = h.MAX_VALUE), { line: e, character: t }
            );
          }),
            (e.is = function (e) {
              var t = e;
              return we.objectLiteral(t) && we.uinteger(t.line) && we.uinteger(t.character);
            });
        })(p || (p = {})),
        (function (e) {
          (e.create = function (e, t, n, r) {
            if (we.uinteger(e) && we.uinteger(t) && we.uinteger(n) && we.uinteger(r))
              return { start: p.create(e, t), end: p.create(n, r) };
            if (p.is(e) && p.is(t)) return { start: e, end: t };
            throw new Error("Range#create called with invalid arguments[" + e + ", " + t + ", " + n + ", " + r + "]");
          }),
            (e.is = function (e) {
              var t = e;
              return we.objectLiteral(t) && p.is(t.start) && p.is(t.end);
            });
        })(d || (d = {})),
        (function (e) {
          (e.create = function (e, t) {
            return { uri: e, range: t };
          }),
            (e.is = function (e) {
              var t = e;
              return we.defined(t) && d.is(t.range) && (we.string(t.uri) || we.undefined(t.uri));
            });
        })(m || (m = {})),
        (function (e) {
          (e.create = function (e, t, n, r) {
            return { targetUri: e, targetRange: t, targetSelectionRange: n, originSelectionRange: r };
          }),
            (e.is = function (e) {
              var t = e;
              return (
                we.defined(t) &&
                d.is(t.targetRange) &&
                we.string(t.targetUri) &&
                (d.is(t.targetSelectionRange) || we.undefined(t.targetSelectionRange)) &&
                (d.is(t.originSelectionRange) || we.undefined(t.originSelectionRange))
              );
            });
        })(g || (g = {})),
        (function (e) {
          (e.create = function (e, t, n, r) {
            return { red: e, green: t, blue: n, alpha: r };
          }),
            (e.is = function (e) {
              var t = e;
              return (
                we.numberRange(t.red, 0, 1) &&
                we.numberRange(t.green, 0, 1) &&
                we.numberRange(t.blue, 0, 1) &&
                we.numberRange(t.alpha, 0, 1)
              );
            });
        })(v || (v = {})),
        (function (e) {
          (e.create = function (e, t) {
            return { range: e, color: t };
          }),
            (e.is = function (e) {
              var t = e;
              return d.is(t.range) && v.is(t.color);
            });
        })(y || (y = {})),
        (function (e) {
          (e.create = function (e, t, n) {
            return { label: e, textEdit: t, additionalTextEdits: n };
          }),
            (e.is = function (e) {
              var t = e;
              return (
                we.string(t.label) &&
                (we.undefined(t.textEdit) || T.is(t)) &&
                (we.undefined(t.additionalTextEdits) || we.typedArray(t.additionalTextEdits, T.is))
              );
            });
        })(b || (b = {})),
        (function (e) {
          (e.Comment = "comment"), (e.Imports = "imports"), (e.Region = "region");
        })(x || (x = {})),
        (function (e) {
          (e.create = function (e, t, n, r, i) {
            var o = { startLine: e, endLine: t };
            return (
              we.defined(n) && (o.startCharacter = n), we.defined(r) && (o.endCharacter = r), we.defined(i) && (o.kind = i), o
            );
          }),
            (e.is = function (e) {
              var t = e;
              return (
                we.uinteger(t.startLine) &&
                we.uinteger(t.startLine) &&
                (we.undefined(t.startCharacter) || we.uinteger(t.startCharacter)) &&
                (we.undefined(t.endCharacter) || we.uinteger(t.endCharacter)) &&
                (we.undefined(t.kind) || we.string(t.kind))
              );
            });
        })(A || (A = {})),
        (function (e) {
          (e.create = function (e, t) {
            return { location: e, message: t };
          }),
            (e.is = function (e) {
              var t = e;
              return we.defined(t) && m.is(t.location) && we.string(t.message);
            });
        })(S || (S = {})),
        (function (e) {
          (e.Error = 1), (e.Warning = 2), (e.Information = 3), (e.Hint = 4);
        })(C || (C = {})),
        (function (e) {
          (e.Unnecessary = 1), (e.Deprecated = 2);
        })(k || (k = {})),
        (function (e) {
          e.is = function (e) {
            var t = e;
            return null != t && we.string(t.href);
          };
        })(w || (w = {})),
        (function (e) {
          (e.create = function (e, t, n, r, i, o) {
            var a = { range: e, message: t };
            return (
              we.defined(n) && (a.severity = n),
              we.defined(r) && (a.code = r),
              we.defined(i) && (a.source = i),
              we.defined(o) && (a.relatedInformation = o),
              a
            );
          }),
            (e.is = function (e) {
              var t,
                n = e;
              return (
                we.defined(n) &&
                d.is(n.range) &&
                we.string(n.message) &&
                (we.number(n.severity) || we.undefined(n.severity)) &&
                (we.integer(n.code) || we.string(n.code) || we.undefined(n.code)) &&
                (we.undefined(n.codeDescription) ||
                  we.string(null === (t = n.codeDescription) || void 0 === t ? void 0 : t.href)) &&
                (we.string(n.source) || we.undefined(n.source)) &&
                (we.undefined(n.relatedInformation) || we.typedArray(n.relatedInformation, S.is))
              );
            });
        })(I || (I = {})),
        (function (e) {
          (e.create = function (e, t) {
            for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
            var i = { title: e, command: t };
            return we.defined(n) && n.length > 0 && (i.arguments = n), i;
          }),
            (e.is = function (e) {
              var t = e;
              return we.defined(t) && we.string(t.title) && we.string(t.command);
            });
        })(E || (E = {})),
        (function (e) {
          (e.replace = function (e, t) {
            return { range: e, newText: t };
          }),
            (e.insert = function (e, t) {
              return { range: { start: e, end: e }, newText: t };
            }),
            (e.del = function (e) {
              return { range: e, newText: "" };
            }),
            (e.is = function (e) {
              var t = e;
              return we.objectLiteral(t) && we.string(t.newText) && d.is(t.range);
            });
        })(T || (T = {})),
        (function (e) {
          (e.create = function (e, t, n) {
            var r = { label: e };
            return void 0 !== t && (r.needsConfirmation = t), void 0 !== n && (r.description = n), r;
          }),
            (e.is = function (e) {
              var t = e;
              return (
                void 0 !== t &&
                we.objectLiteral(t) &&
                we.string(t.label) &&
                (we.boolean(t.needsConfirmation) || void 0 === t.needsConfirmation) &&
                (we.string(t.description) || void 0 === t.description)
              );
            });
        })(j || (j = {})),
        (function (e) {
          e.is = function (e) {
            return "string" == typeof e;
          };
        })(O || (O = {})),
        (function (e) {
          (e.replace = function (e, t, n) {
            return { range: e, newText: t, annotationId: n };
          }),
            (e.insert = function (e, t, n) {
              return { range: { start: e, end: e }, newText: t, annotationId: n };
            }),
            (e.del = function (e, t) {
              return { range: e, newText: "", annotationId: t };
            }),
            (e.is = function (e) {
              var t = e;
              return T.is(t) && (j.is(t.annotationId) || O.is(t.annotationId));
            });
        })(_ || (_ = {})),
        (function (e) {
          (e.create = function (e, t) {
            return { textDocument: e, edits: t };
          }),
            (e.is = function (e) {
              var t = e;
              return we.defined(t) && H.is(t.textDocument) && Array.isArray(t.edits);
            });
        })(M || (M = {})),
        (function (e) {
          (e.create = function (e, t, n) {
            var r = { kind: "create", uri: e };
            return (
              void 0 === t || (void 0 === t.overwrite && void 0 === t.ignoreIfExists) || (r.options = t),
              void 0 !== n && (r.annotationId = n),
              r
            );
          }),
            (e.is = function (e) {
              var t = e;
              return (
                t &&
                "create" === t.kind &&
                we.string(t.uri) &&
                (void 0 === t.options ||
                  ((void 0 === t.options.overwrite || we.boolean(t.options.overwrite)) &&
                    (void 0 === t.options.ignoreIfExists || we.boolean(t.options.ignoreIfExists)))) &&
                (void 0 === t.annotationId || O.is(t.annotationId))
              );
            });
        })(P || (P = {})),
        (function (e) {
          (e.create = function (e, t, n, r) {
            var i = { kind: "rename", oldUri: e, newUri: t };
            return (
              void 0 === n || (void 0 === n.overwrite && void 0 === n.ignoreIfExists) || (i.options = n),
              void 0 !== r && (i.annotationId = r),
              i
            );
          }),
            (e.is = function (e) {
              var t = e;
              return (
                t &&
                "rename" === t.kind &&
                we.string(t.oldUri) &&
                we.string(t.newUri) &&
                (void 0 === t.options ||
                  ((void 0 === t.options.overwrite || we.boolean(t.options.overwrite)) &&
                    (void 0 === t.options.ignoreIfExists || we.boolean(t.options.ignoreIfExists)))) &&
                (void 0 === t.annotationId || O.is(t.annotationId))
              );
            });
        })(V || (V = {})),
        (function (e) {
          (e.create = function (e, t, n) {
            var r = { kind: "delete", uri: e };
            return (
              void 0 === t || (void 0 === t.recursive && void 0 === t.ignoreIfNotExists) || (r.options = t),
              void 0 !== n && (r.annotationId = n),
              r
            );
          }),
            (e.is = function (e) {
              var t = e;
              return (
                t &&
                "delete" === t.kind &&
                we.string(t.uri) &&
                (void 0 === t.options ||
                  ((void 0 === t.options.recursive || we.boolean(t.options.recursive)) &&
                    (void 0 === t.options.ignoreIfNotExists || we.boolean(t.options.ignoreIfNotExists)))) &&
                (void 0 === t.annotationId || O.is(t.annotationId))
              );
            });
        })(N || (N = {})),
        (function (e) {
          e.is = function (e) {
            var t = e;
            return (
              t &&
              (void 0 !== t.changes || void 0 !== t.documentChanges) &&
              (void 0 === t.documentChanges ||
                t.documentChanges.every(function (e) {
                  return we.string(e.kind) ? P.is(e) || V.is(e) || N.is(e) : M.is(e);
                }))
            );
          };
        })(F || (F = {}));
      var J,
        z,
        H,
        G,
        X,
        Z,
        Q,
        Y,
        ee,
        te,
        ne,
        re,
        ie,
        oe,
        ae,
        se,
        ue,
        ce,
        le,
        fe,
        he,
        pe,
        de,
        me,
        ge,
        ve,
        ye,
        be,
        xe,
        Ae,
        Se = (function () {
          function e(e, t) {
            (this.edits = e), (this.changeAnnotations = t);
          }
          return (
            (e.prototype.insert = function (e, t, n) {
              var r, i;
              if (
                (void 0 === n
                  ? (r = T.insert(e, t))
                  : O.is(n)
                  ? ((i = n), (r = _.insert(e, t, n)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (i = this.changeAnnotations.manage(n)),
                    (r = _.insert(e, t, i))),
                this.edits.push(r),
                void 0 !== i)
              )
                return i;
            }),
            (e.prototype.replace = function (e, t, n) {
              var r, i;
              if (
                (void 0 === n
                  ? (r = T.replace(e, t))
                  : O.is(n)
                  ? ((i = n), (r = _.replace(e, t, n)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (i = this.changeAnnotations.manage(n)),
                    (r = _.replace(e, t, i))),
                this.edits.push(r),
                void 0 !== i)
              )
                return i;
            }),
            (e.prototype.delete = function (e, t) {
              var n, r;
              if (
                (void 0 === t
                  ? (n = T.del(e))
                  : O.is(t)
                  ? ((r = t), (n = _.del(e, t)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (r = this.changeAnnotations.manage(t)),
                    (n = _.del(e, r))),
                this.edits.push(n),
                void 0 !== r)
              )
                return r;
            }),
            (e.prototype.add = function (e) {
              this.edits.push(e);
            }),
            (e.prototype.all = function () {
              return this.edits;
            }),
            (e.prototype.clear = function () {
              this.edits.splice(0, this.edits.length);
            }),
            (e.prototype.assertChangeAnnotations = function (e) {
              if (void 0 === e) throw new Error("Text edit change is not configured to manage change annotations.");
            }),
            e
          );
        })(),
        Ce = (function () {
          function e(e) {
            (this._annotations = void 0 === e ? Object.create(null) : e), (this._counter = 0), (this._size = 0);
          }
          return (
            (e.prototype.all = function () {
              return this._annotations;
            }),
            Object.defineProperty(e.prototype, "size", {
              get: function () {
                return this._size;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.manage = function (e, t) {
              var n;
              if ((O.is(e) ? (n = e) : ((n = this.nextId()), (t = e)), void 0 !== this._annotations[n]))
                throw new Error("Id " + n + " is already in use.");
              if (void 0 === t) throw new Error("No annotation provided for id " + n);
              return (this._annotations[n] = t), this._size++, n;
            }),
            (e.prototype.nextId = function () {
              return this._counter++, this._counter.toString();
            }),
            e
          );
        })();
      !(function () {
        function e(e) {
          var t = this;
          (this._textEditChanges = Object.create(null)),
            void 0 !== e
              ? ((this._workspaceEdit = e),
                e.documentChanges
                  ? ((this._changeAnnotations = new Ce(e.changeAnnotations)),
                    (e.changeAnnotations = this._changeAnnotations.all()),
                    e.documentChanges.forEach(function (e) {
                      if (M.is(e)) {
                        var n = new Se(e.edits, t._changeAnnotations);
                        t._textEditChanges[e.textDocument.uri] = n;
                      }
                    }))
                  : e.changes &&
                    Object.keys(e.changes).forEach(function (n) {
                      var r = new Se(e.changes[n]);
                      t._textEditChanges[n] = r;
                    }))
              : (this._workspaceEdit = {});
        }
        Object.defineProperty(e.prototype, "edit", {
          get: function () {
            return (
              this.initDocumentChanges(),
              void 0 !== this._changeAnnotations &&
                (0 === this._changeAnnotations.size
                  ? (this._workspaceEdit.changeAnnotations = void 0)
                  : (this._workspaceEdit.changeAnnotations = this._changeAnnotations.all())),
              this._workspaceEdit
            );
          },
          enumerable: !1,
          configurable: !0,
        }),
          (e.prototype.getTextEditChange = function (e) {
            if (H.is(e)) {
              if ((this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges))
                throw new Error("Workspace edit is not configured for document changes.");
              var t = { uri: e.uri, version: e.version };
              if (!(r = this._textEditChanges[t.uri])) {
                var n = { textDocument: t, edits: (i = []) };
                this._workspaceEdit.documentChanges.push(n),
                  (r = new Se(i, this._changeAnnotations)),
                  (this._textEditChanges[t.uri] = r);
              }
              return r;
            }
            if ((this.initChanges(), void 0 === this._workspaceEdit.changes))
              throw new Error("Workspace edit is not configured for normal text edit changes.");
            var r;
            if (!(r = this._textEditChanges[e])) {
              var i = [];
              (this._workspaceEdit.changes[e] = i), (r = new Se(i)), (this._textEditChanges[e] = r);
            }
            return r;
          }),
          (e.prototype.initDocumentChanges = function () {
            void 0 === this._workspaceEdit.documentChanges &&
              void 0 === this._workspaceEdit.changes &&
              ((this._changeAnnotations = new Ce()),
              (this._workspaceEdit.documentChanges = []),
              (this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()));
          }),
          (e.prototype.initChanges = function () {
            void 0 === this._workspaceEdit.documentChanges &&
              void 0 === this._workspaceEdit.changes &&
              (this._workspaceEdit.changes = Object.create(null));
          }),
          (e.prototype.createFile = function (e, t, n) {
            if ((this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges))
              throw new Error("Workspace edit is not configured for document changes.");
            var r, i, o;
            if (
              (j.is(t) || O.is(t) ? (r = t) : (n = t),
              void 0 === r
                ? (i = P.create(e, n))
                : ((o = O.is(r) ? r : this._changeAnnotations.manage(r)), (i = P.create(e, n, o))),
              this._workspaceEdit.documentChanges.push(i),
              void 0 !== o)
            )
              return o;
          }),
          (e.prototype.renameFile = function (e, t, n, r) {
            if ((this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges))
              throw new Error("Workspace edit is not configured for document changes.");
            var i, o, a;
            if (
              (j.is(n) || O.is(n) ? (i = n) : (r = n),
              void 0 === i
                ? (o = V.create(e, t, r))
                : ((a = O.is(i) ? i : this._changeAnnotations.manage(i)), (o = V.create(e, t, r, a))),
              this._workspaceEdit.documentChanges.push(o),
              void 0 !== a)
            )
              return a;
          }),
          (e.prototype.deleteFile = function (e, t, n) {
            if ((this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges))
              throw new Error("Workspace edit is not configured for document changes.");
            var r, i, o;
            if (
              (j.is(t) || O.is(t) ? (r = t) : (n = t),
              void 0 === r
                ? (i = N.create(e, n))
                : ((o = O.is(r) ? r : this._changeAnnotations.manage(r)), (i = N.create(e, n, o))),
              this._workspaceEdit.documentChanges.push(i),
              void 0 !== o)
            )
              return o;
          });
      })();
      !(function (e) {
        (e.create = function (e) {
          return { uri: e };
        }),
          (e.is = function (e) {
            var t = e;
            return we.defined(t) && we.string(t.uri);
          });
      })(J || (J = {})),
        (function (e) {
          (e.create = function (e, t) {
            return { uri: e, version: t };
          }),
            (e.is = function (e) {
              var t = e;
              return we.defined(t) && we.string(t.uri) && we.integer(t.version);
            });
        })(z || (z = {})),
        (function (e) {
          (e.create = function (e, t) {
            return { uri: e, version: t };
          }),
            (e.is = function (e) {
              var t = e;
              return we.defined(t) && we.string(t.uri) && (null === t.version || we.integer(t.version));
            });
        })(H || (H = {})),
        (function (e) {
          (e.create = function (e, t, n, r) {
            return { uri: e, languageId: t, version: n, text: r };
          }),
            (e.is = function (e) {
              var t = e;
              return we.defined(t) && we.string(t.uri) && we.string(t.languageId) && we.integer(t.version) && we.string(t.text);
            });
        })(G || (G = {})),
        (function (e) {
          (e.PlainText = "plaintext"), (e.Markdown = "markdown");
        })(X || (X = {})),
        (function (e) {
          e.is = function (t) {
            var n = t;
            return n === e.PlainText || n === e.Markdown;
          };
        })(X || (X = {})),
        (function (e) {
          e.is = function (e) {
            var t = e;
            return we.objectLiteral(e) && X.is(t.kind) && we.string(t.value);
          };
        })(Z || (Z = {})),
        (function (e) {
          (e.Text = 1),
            (e.Method = 2),
            (e.Function = 3),
            (e.Constructor = 4),
            (e.Field = 5),
            (e.Variable = 6),
            (e.Class = 7),
            (e.Interface = 8),
            (e.Module = 9),
            (e.Property = 10),
            (e.Unit = 11),
            (e.Value = 12),
            (e.Enum = 13),
            (e.Keyword = 14),
            (e.Snippet = 15),
            (e.Color = 16),
            (e.File = 17),
            (e.Reference = 18),
            (e.Folder = 19),
            (e.EnumMember = 20),
            (e.Constant = 21),
            (e.Struct = 22),
            (e.Event = 23),
            (e.Operator = 24),
            (e.TypeParameter = 25);
        })(Q || (Q = {})),
        (function (e) {
          (e.PlainText = 1), (e.Snippet = 2);
        })(Y || (Y = {})),
        (function (e) {
          e.Deprecated = 1;
        })(ee || (ee = {})),
        (function (e) {
          (e.create = function (e, t, n) {
            return { newText: e, insert: t, replace: n };
          }),
            (e.is = function (e) {
              var t = e;
              return t && we.string(t.newText) && d.is(t.insert) && d.is(t.replace);
            });
        })(te || (te = {})),
        (function (e) {
          (e.asIs = 1), (e.adjustIndentation = 2);
        })(ne || (ne = {})),
        (function (e) {
          e.create = function (e) {
            return { label: e };
          };
        })(re || (re = {})),
        (function (e) {
          e.create = function (e, t) {
            return { items: e || [], isIncomplete: !!t };
          };
        })(ie || (ie = {})),
        (function (e) {
          (e.fromPlainText = function (e) {
            return e.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
          }),
            (e.is = function (e) {
              var t = e;
              return we.string(t) || (we.objectLiteral(t) && we.string(t.language) && we.string(t.value));
            });
        })(oe || (oe = {})),
        (function (e) {
          e.is = function (e) {
            var t = e;
            return (
              !!t &&
              we.objectLiteral(t) &&
              (Z.is(t.contents) || oe.is(t.contents) || we.typedArray(t.contents, oe.is)) &&
              (void 0 === e.range || d.is(e.range))
            );
          };
        })(ae || (ae = {})),
        (function (e) {
          e.create = function (e, t) {
            return t ? { label: e, documentation: t } : { label: e };
          };
        })(se || (se = {})),
        (function (e) {
          e.create = function (e, t) {
            for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
            var i = { label: e };
            return we.defined(t) && (i.documentation = t), we.defined(n) ? (i.parameters = n) : (i.parameters = []), i;
          };
        })(ue || (ue = {})),
        (function (e) {
          (e.Text = 1), (e.Read = 2), (e.Write = 3);
        })(ce || (ce = {})),
        (function (e) {
          e.create = function (e, t) {
            var n = { range: e };
            return we.number(t) && (n.kind = t), n;
          };
        })(le || (le = {})),
        (function (e) {
          (e.File = 1),
            (e.Module = 2),
            (e.Namespace = 3),
            (e.Package = 4),
            (e.Class = 5),
            (e.Method = 6),
            (e.Property = 7),
            (e.Field = 8),
            (e.Constructor = 9),
            (e.Enum = 10),
            (e.Interface = 11),
            (e.Function = 12),
            (e.Variable = 13),
            (e.Constant = 14),
            (e.String = 15),
            (e.Number = 16),
            (e.Boolean = 17),
            (e.Array = 18),
            (e.Object = 19),
            (e.Key = 20),
            (e.Null = 21),
            (e.EnumMember = 22),
            (e.Struct = 23),
            (e.Event = 24),
            (e.Operator = 25),
            (e.TypeParameter = 26);
        })(fe || (fe = {})),
        (function (e) {
          e.Deprecated = 1;
        })(he || (he = {})),
        (function (e) {
          e.create = function (e, t, n, r, i) {
            var o = { name: e, kind: t, location: { uri: r, range: n } };
            return i && (o.containerName = i), o;
          };
        })(pe || (pe = {})),
        (function (e) {
          (e.create = function (e, t, n, r, i, o) {
            var a = { name: e, detail: t, kind: n, range: r, selectionRange: i };
            return void 0 !== o && (a.children = o), a;
          }),
            (e.is = function (e) {
              var t = e;
              return (
                t &&
                we.string(t.name) &&
                we.number(t.kind) &&
                d.is(t.range) &&
                d.is(t.selectionRange) &&
                (void 0 === t.detail || we.string(t.detail)) &&
                (void 0 === t.deprecated || we.boolean(t.deprecated)) &&
                (void 0 === t.children || Array.isArray(t.children)) &&
                (void 0 === t.tags || Array.isArray(t.tags))
              );
            });
        })(de || (de = {})),
        (function (e) {
          (e.Empty = ""),
            (e.QuickFix = "quickfix"),
            (e.Refactor = "refactor"),
            (e.RefactorExtract = "refactor.extract"),
            (e.RefactorInline = "refactor.inline"),
            (e.RefactorRewrite = "refactor.rewrite"),
            (e.Source = "source"),
            (e.SourceOrganizeImports = "source.organizeImports"),
            (e.SourceFixAll = "source.fixAll");
        })(me || (me = {})),
        (function (e) {
          (e.create = function (e, t) {
            var n = { diagnostics: e };
            return null != t && (n.only = t), n;
          }),
            (e.is = function (e) {
              var t = e;
              return (
                we.defined(t) && we.typedArray(t.diagnostics, I.is) && (void 0 === t.only || we.typedArray(t.only, we.string))
              );
            });
        })(ge || (ge = {})),
        (function (e) {
          (e.create = function (e, t, n) {
            var r = { title: e },
              i = !0;
            return (
              "string" == typeof t ? ((i = !1), (r.kind = t)) : E.is(t) ? (r.command = t) : (r.edit = t),
              i && void 0 !== n && (r.kind = n),
              r
            );
          }),
            (e.is = function (e) {
              var t = e;
              return (
                t &&
                we.string(t.title) &&
                (void 0 === t.diagnostics || we.typedArray(t.diagnostics, I.is)) &&
                (void 0 === t.kind || we.string(t.kind)) &&
                (void 0 !== t.edit || void 0 !== t.command) &&
                (void 0 === t.command || E.is(t.command)) &&
                (void 0 === t.isPreferred || we.boolean(t.isPreferred)) &&
                (void 0 === t.edit || F.is(t.edit))
              );
            });
        })(ve || (ve = {})),
        (function (e) {
          (e.create = function (e, t) {
            var n = { range: e };
            return we.defined(t) && (n.data = t), n;
          }),
            (e.is = function (e) {
              var t = e;
              return we.defined(t) && d.is(t.range) && (we.undefined(t.command) || E.is(t.command));
            });
        })(ye || (ye = {})),
        (function (e) {
          (e.create = function (e, t) {
            return { tabSize: e, insertSpaces: t };
          }),
            (e.is = function (e) {
              var t = e;
              return we.defined(t) && we.uinteger(t.tabSize) && we.boolean(t.insertSpaces);
            });
        })(be || (be = {})),
        (function (e) {
          (e.create = function (e, t, n) {
            return { range: e, target: t, data: n };
          }),
            (e.is = function (e) {
              var t = e;
              return we.defined(t) && d.is(t.range) && (we.undefined(t.target) || we.string(t.target));
            });
        })(xe || (xe = {})),
        (function (e) {
          (e.create = function (e, t) {
            return { range: e, parent: t };
          }),
            (e.is = function (t) {
              var n = t;
              return void 0 !== n && d.is(n.range) && (void 0 === n.parent || e.is(n.parent));
            });
        })(Ae || (Ae = {}));
      var ke;
      !(function (e) {
        (e.create = function (e, t, n, r) {
          return new Ie(e, t, n, r);
        }),
          (e.is = function (e) {
            var t = e;
            return !!(
              we.defined(t) &&
              we.string(t.uri) &&
              (we.undefined(t.languageId) || we.string(t.languageId)) &&
              we.uinteger(t.lineCount) &&
              we.func(t.getText) &&
              we.func(t.positionAt) &&
              we.func(t.offsetAt)
            );
          }),
          (e.applyEdits = function (e, t) {
            for (
              var n = e.getText(),
                r = (function e(t, n) {
                  if (t.length <= 1) return t;
                  var r = (t.length / 2) | 0,
                    i = t.slice(0, r),
                    o = t.slice(r);
                  e(i, n), e(o, n);
                  var a = 0,
                    s = 0,
                    u = 0;
                  for (; a < i.length && s < o.length; ) {
                    var c = n(i[a], o[s]);
                    t[u++] = c <= 0 ? i[a++] : o[s++];
                  }
                  for (; a < i.length; ) t[u++] = i[a++];
                  for (; s < o.length; ) t[u++] = o[s++];
                  return t;
                })(t, function (e, t) {
                  var n = e.range.start.line - t.range.start.line;
                  return 0 === n ? e.range.start.character - t.range.start.character : n;
                }),
                i = n.length,
                o = r.length - 1;
              o >= 0;
              o--
            ) {
              var a = r[o],
                s = e.offsetAt(a.range.start),
                u = e.offsetAt(a.range.end);
              if (!(u <= i)) throw new Error("Overlapping edit");
              (n = n.substring(0, s) + a.newText + n.substring(u, n.length)), (i = s);
            }
            return n;
          });
      })(ke || (ke = {}));
      var we,
        Ie = (function () {
          function e(e, t, n, r) {
            (this._uri = e), (this._languageId = t), (this._version = n), (this._content = r), (this._lineOffsets = void 0);
          }
          return (
            Object.defineProperty(e.prototype, "uri", {
              get: function () {
                return this._uri;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "languageId", {
              get: function () {
                return this._languageId;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "version", {
              get: function () {
                return this._version;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.getText = function (e) {
              if (e) {
                var t = this.offsetAt(e.start),
                  n = this.offsetAt(e.end);
                return this._content.substring(t, n);
              }
              return this._content;
            }),
            (e.prototype.update = function (e, t) {
              (this._content = e.text), (this._version = t), (this._lineOffsets = void 0);
            }),
            (e.prototype.getLineOffsets = function () {
              if (void 0 === this._lineOffsets) {
                for (var e = [], t = this._content, n = !0, r = 0; r < t.length; r++) {
                  n && (e.push(r), (n = !1));
                  var i = t.charAt(r);
                  (n = "\r" === i || "\n" === i), "\r" === i && r + 1 < t.length && "\n" === t.charAt(r + 1) && r++;
                }
                n && t.length > 0 && e.push(t.length), (this._lineOffsets = e);
              }
              return this._lineOffsets;
            }),
            (e.prototype.positionAt = function (e) {
              e = Math.max(Math.min(e, this._content.length), 0);
              var t = this.getLineOffsets(),
                n = 0,
                r = t.length;
              if (0 === r) return p.create(0, e);
              for (; n < r; ) {
                var i = Math.floor((n + r) / 2);
                t[i] > e ? (r = i) : (n = i + 1);
              }
              var o = n - 1;
              return p.create(o, e - t[o]);
            }),
            (e.prototype.offsetAt = function (e) {
              var t = this.getLineOffsets();
              if (e.line >= t.length) return this._content.length;
              if (e.line < 0) return 0;
              var n = t[e.line],
                r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
              return Math.max(Math.min(n + e.character, r), n);
            }),
            Object.defineProperty(e.prototype, "lineCount", {
              get: function () {
                return this.getLineOffsets().length;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })();
      !(function (e) {
        var t = Object.prototype.toString;
        (e.defined = function (e) {
          return void 0 !== e;
        }),
          (e.undefined = function (e) {
            return void 0 === e;
          }),
          (e.boolean = function (e) {
            return !0 === e || !1 === e;
          }),
          (e.string = function (e) {
            return "[object String]" === t.call(e);
          }),
          (e.number = function (e) {
            return "[object Number]" === t.call(e);
          }),
          (e.numberRange = function (e, n, r) {
            return "[object Number]" === t.call(e) && n <= e && e <= r;
          }),
          (e.integer = function (e) {
            return "[object Number]" === t.call(e) && -2147483648 <= e && e <= 2147483647;
          }),
          (e.uinteger = function (e) {
            return "[object Number]" === t.call(e) && 0 <= e && e <= 2147483647;
          }),
          (e.func = function (e) {
            return "[object Function]" === t.call(e);
          }),
          (e.objectLiteral = function (e) {
            return null !== e && "object" == typeof e;
          }),
          (e.typedArray = function (e, t) {
            return Array.isArray(e) && e.every(t);
          });
      })(we || (we = {}));
      var Ee,
        Te,
        je,
        Oe = (function () {
          function e(e, t, n, r) {
            (this._uri = e), (this._languageId = t), (this._version = n), (this._content = r), (this._lineOffsets = void 0);
          }
          return (
            Object.defineProperty(e.prototype, "uri", {
              get: function () {
                return this._uri;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "languageId", {
              get: function () {
                return this._languageId;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "version", {
              get: function () {
                return this._version;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.getText = function (e) {
              if (e) {
                var t = this.offsetAt(e.start),
                  n = this.offsetAt(e.end);
                return this._content.substring(t, n);
              }
              return this._content;
            }),
            (e.prototype.update = function (t, n) {
              for (var r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                if (e.isIncremental(o)) {
                  var a = Me(o.range),
                    s = this.offsetAt(a.start),
                    u = this.offsetAt(a.end);
                  this._content = this._content.substring(0, s) + o.text + this._content.substring(u, this._content.length);
                  var c = Math.max(a.start.line, 0),
                    l = Math.max(a.end.line, 0),
                    f = this._lineOffsets,
                    h = _e(o.text, !1, s);
                  if (l - c === h.length) for (var p = 0, d = h.length; p < d; p++) f[p + c + 1] = h[p];
                  else
                    h.length < 1e4
                      ? f.splice.apply(f, [c + 1, l - c].concat(h))
                      : (this._lineOffsets = f = f.slice(0, c + 1).concat(h, f.slice(l + 1)));
                  var m = o.text.length - (u - s);
                  if (0 !== m) for (p = c + 1 + h.length, d = f.length; p < d; p++) f[p] = f[p] + m;
                } else {
                  if (!e.isFull(o)) throw new Error("Unknown change event received");
                  (this._content = o.text), (this._lineOffsets = void 0);
                }
              }
              this._version = n;
            }),
            (e.prototype.getLineOffsets = function () {
              return void 0 === this._lineOffsets && (this._lineOffsets = _e(this._content, !0)), this._lineOffsets;
            }),
            (e.prototype.positionAt = function (e) {
              e = Math.max(Math.min(e, this._content.length), 0);
              var t = this.getLineOffsets(),
                n = 0,
                r = t.length;
              if (0 === r) return { line: 0, character: e };
              for (; n < r; ) {
                var i = Math.floor((n + r) / 2);
                t[i] > e ? (r = i) : (n = i + 1);
              }
              var o = n - 1;
              return { line: o, character: e - t[o] };
            }),
            (e.prototype.offsetAt = function (e) {
              var t = this.getLineOffsets();
              if (e.line >= t.length) return this._content.length;
              if (e.line < 0) return 0;
              var n = t[e.line],
                r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
              return Math.max(Math.min(n + e.character, r), n);
            }),
            Object.defineProperty(e.prototype, "lineCount", {
              get: function () {
                return this.getLineOffsets().length;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.isIncremental = function (e) {
              var t = e;
              return (
                null != t &&
                "string" == typeof t.text &&
                void 0 !== t.range &&
                (void 0 === t.rangeLength || "number" == typeof t.rangeLength)
              );
            }),
            (e.isFull = function (e) {
              var t = e;
              return null != t && "string" == typeof t.text && void 0 === t.range && void 0 === t.rangeLength;
            }),
            e
          );
        })();
      function _e(e, t, n) {
        void 0 === n && (n = 0);
        for (var r = t ? [n] : [], i = 0; i < e.length; i++) {
          var o = e.charCodeAt(i);
          (13 !== o && 10 !== o) || (13 === o && i + 1 < e.length && 10 === e.charCodeAt(i + 1) && i++, r.push(n + i + 1));
        }
        return r;
      }
      function Me(e) {
        var t = e.start,
          n = e.end;
        return t.line > n.line || (t.line === n.line && t.character > n.character) ? { start: n, end: t } : e;
      }
      function Pe(e) {
        var t = Me(e.range);
        return t !== e.range ? { newText: e.newText, range: t } : e;
      }
      function Ve(e, t) {
        return 0 === t.length
          ? e
          : e.replace(/\{(\d+)\}/g, function (e, n) {
              var r = n[0];
              return void 0 !== t[r] ? t[r] : e;
            });
      }
      function Ne(e, t) {
        for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
        return Ve(t, n);
      }
      function Fe(e) {
        return Ne;
      }
      !(function (e) {
        (e.create = function (e, t, n, r) {
          return new Oe(e, t, n, r);
        }),
          (e.update = function (e, t, n) {
            if (e instanceof Oe) return e.update(t, n), e;
            throw new Error("TextDocument.update: document must be created by TextDocument.create");
          }),
          (e.applyEdits = function (e, t) {
            for (
              var n = e.getText(),
                r = 0,
                i = [],
                o = 0,
                a = (function e(t, n) {
                  if (t.length <= 1) return t;
                  var r = (t.length / 2) | 0,
                    i = t.slice(0, r),
                    o = t.slice(r);
                  e(i, n), e(o, n);
                  var a = 0,
                    s = 0,
                    u = 0;
                  for (; a < i.length && s < o.length; ) {
                    var c = n(i[a], o[s]);
                    t[u++] = c <= 0 ? i[a++] : o[s++];
                  }
                  for (; a < i.length; ) t[u++] = i[a++];
                  for (; s < o.length; ) t[u++] = o[s++];
                  return t;
                })(t.map(Pe), function (e, t) {
                  var n = e.range.start.line - t.range.start.line;
                  return 0 === n ? e.range.start.character - t.range.start.character : n;
                });
              o < a.length;
              o++
            ) {
              var s = a[o],
                u = e.offsetAt(s.range.start);
              if (u < r) throw new Error("Overlapping edit");
              u > r && i.push(n.substring(r, u)), s.newText.length && i.push(s.newText), (r = e.offsetAt(s.range.end));
            }
            return i.push(n.substr(r)), i.join("");
          });
      })(Ee || (Ee = {})),
        (function (e) {
          (e[(e.Undefined = 0)] = "Undefined"),
            (e[(e.EnumValueMismatch = 1)] = "EnumValueMismatch"),
            (e[(e.Deprecated = 2)] = "Deprecated"),
            (e[(e.UnexpectedEndOfComment = 257)] = "UnexpectedEndOfComment"),
            (e[(e.UnexpectedEndOfString = 258)] = "UnexpectedEndOfString"),
            (e[(e.UnexpectedEndOfNumber = 259)] = "UnexpectedEndOfNumber"),
            (e[(e.InvalidUnicode = 260)] = "InvalidUnicode"),
            (e[(e.InvalidEscapeCharacter = 261)] = "InvalidEscapeCharacter"),
            (e[(e.InvalidCharacter = 262)] = "InvalidCharacter"),
            (e[(e.PropertyExpected = 513)] = "PropertyExpected"),
            (e[(e.CommaExpected = 514)] = "CommaExpected"),
            (e[(e.ColonExpected = 515)] = "ColonExpected"),
            (e[(e.ValueExpected = 516)] = "ValueExpected"),
            (e[(e.CommaOrCloseBacketExpected = 517)] = "CommaOrCloseBacketExpected"),
            (e[(e.CommaOrCloseBraceExpected = 518)] = "CommaOrCloseBraceExpected"),
            (e[(e.TrailingComma = 519)] = "TrailingComma"),
            (e[(e.DuplicateKey = 520)] = "DuplicateKey"),
            (e[(e.CommentNotPermitted = 521)] = "CommentNotPermitted"),
            (e[(e.SchemaResolveError = 768)] = "SchemaResolveError");
        })(Te || (Te = {})),
        ((je || (je = {})).LATEST = {
          textDocument: {
            completion: { completionItem: { documentationFormat: [X.Markdown, X.PlainText], commitCharactersSupport: !0 } },
          },
        });
      var Re,
        $e,
        Le =
          ((Re = function (e, t) {
            return (Re =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              })(e, t);
          }),
          function (e, t) {
            function n() {
              this.constructor = e;
            }
            Re(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
          }),
        De = Fe(),
        Ue = {
          "color-hex": {
            errorMessage: De("colorHexFormatWarning", "Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."),
            pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/,
          },
          "date-time": {
            errorMessage: De("dateTimeFormatWarning", "String is not a RFC3339 date-time."),
            pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i,
          },
          date: {
            errorMessage: De("dateFormatWarning", "String is not a RFC3339 date."),
            pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i,
          },
          time: {
            errorMessage: De("timeFormatWarning", "String is not a RFC3339 time."),
            pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i,
          },
          email: {
            errorMessage: De("emailFormatWarning", "String is not an e-mail address."),
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          },
        },
        We = (function () {
          function e(e, t, n) {
            void 0 === n && (n = 0), (this.offset = t), (this.length = n), (this.parent = e);
          }
          return (
            Object.defineProperty(e.prototype, "children", {
              get: function () {
                return [];
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.toString = function () {
              return (
                "type: " +
                this.type +
                " (" +
                this.offset +
                "/" +
                this.length +
                ")" +
                (this.parent ? " parent: {" + this.parent.toString() + "}" : "")
              );
            }),
            e
          );
        })();
      (function (e) {
        function t(t, n) {
          var r = e.call(this, t, n) || this;
          return (r.type = "null"), (r.value = null), r;
        }
        Le(t, e);
      })(We),
        (function (e) {
          function t(t, n, r) {
            var i = e.call(this, t, r) || this;
            return (i.type = "boolean"), (i.value = n), i;
          }
          Le(t, e);
        })(We),
        (function (e) {
          function t(t, n) {
            var r = e.call(this, t, n) || this;
            return (r.type = "array"), (r.items = []), r;
          }
          Le(t, e),
            Object.defineProperty(t.prototype, "children", {
              get: function () {
                return this.items;
              },
              enumerable: !1,
              configurable: !0,
            });
        })(We),
        (function (e) {
          function t(t, n) {
            var r = e.call(this, t, n) || this;
            return (r.type = "number"), (r.isInteger = !0), (r.value = Number.NaN), r;
          }
          Le(t, e);
        })(We),
        (function (e) {
          function t(t, n, r) {
            var i = e.call(this, t, n, r) || this;
            return (i.type = "string"), (i.value = ""), i;
          }
          Le(t, e);
        })(We),
        (function (e) {
          function t(t, n, r) {
            var i = e.call(this, t, n) || this;
            return (i.type = "property"), (i.colonOffset = -1), (i.keyNode = r), i;
          }
          Le(t, e),
            Object.defineProperty(t.prototype, "children", {
              get: function () {
                return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
              },
              enumerable: !1,
              configurable: !0,
            });
        })(We),
        (function (e) {
          function t(t, n) {
            var r = e.call(this, t, n) || this;
            return (r.type = "object"), (r.properties = []), r;
          }
          Le(t, e),
            Object.defineProperty(t.prototype, "children", {
              get: function () {
                return this.properties;
              },
              enumerable: !1,
              configurable: !0,
            });
        })(We);
      function qe(e) {
        return K(e) ? (e ? {} : { not: {} }) : e;
      }
      !(function (e) {
        (e[(e.Key = 0)] = "Key"), (e[(e.Enum = 1)] = "Enum");
      })($e || ($e = {}));
      var Be = (function () {
          function e(e, t) {
            void 0 === e && (e = -1), (this.focusOffset = e), (this.exclude = t), (this.schemas = []);
          }
          return (
            (e.prototype.add = function (e) {
              this.schemas.push(e);
            }),
            (e.prototype.merge = function (e) {
              Array.prototype.push.apply(this.schemas, e.schemas);
            }),
            (e.prototype.include = function (e) {
              return (-1 === this.focusOffset || Ge(e, this.focusOffset)) && e !== this.exclude;
            }),
            (e.prototype.newSub = function () {
              return new e(-1, this.exclude);
            }),
            e
          );
        })(),
        Ke = (function () {
          function e() {}
          return (
            Object.defineProperty(e.prototype, "schemas", {
              get: function () {
                return [];
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.add = function (e) {}),
            (e.prototype.merge = function (e) {}),
            (e.prototype.include = function (e) {
              return !0;
            }),
            (e.prototype.newSub = function () {
              return this;
            }),
            (e.instance = new e()),
            e
          );
        })(),
        Je = (function () {
          function e() {
            (this.problems = []),
              (this.propertiesMatches = 0),
              (this.propertiesValueMatches = 0),
              (this.primaryValueMatches = 0),
              (this.enumValueMatch = !1),
              (this.enumValues = void 0);
          }
          return (
            (e.prototype.hasProblems = function () {
              return !!this.problems.length;
            }),
            (e.prototype.mergeAll = function (e) {
              for (var t = 0, n = e; t < n.length; t++) {
                var r = n[t];
                this.merge(r);
              }
            }),
            (e.prototype.merge = function (e) {
              this.problems = this.problems.concat(e.problems);
            }),
            (e.prototype.mergeEnumValues = function (e) {
              if (!this.enumValueMatch && !e.enumValueMatch && this.enumValues && e.enumValues) {
                this.enumValues = this.enumValues.concat(e.enumValues);
                for (var t = 0, n = this.problems; t < n.length; t++) {
                  var r = n[t];
                  r.code === Te.EnumValueMismatch &&
                    (r.message = De(
                      "enumWarning",
                      "Value is not accepted. Valid values: {0}.",
                      this.enumValues
                        .map(function (e) {
                          return JSON.stringify(e);
                        })
                        .join(", ")
                    ));
                }
              }
            }),
            (e.prototype.mergePropertyMatch = function (e) {
              this.merge(e),
                this.propertiesMatches++,
                (e.enumValueMatch || (!e.hasProblems() && e.propertiesMatches)) && this.propertiesValueMatches++,
                e.enumValueMatch && e.enumValues && 1 === e.enumValues.length && this.primaryValueMatches++;
            }),
            (e.prototype.compare = function (e) {
              var t = this.hasProblems();
              return t !== e.hasProblems()
                ? t
                  ? -1
                  : 1
                : this.enumValueMatch !== e.enumValueMatch
                ? e.enumValueMatch
                  ? -1
                  : 1
                : this.primaryValueMatches !== e.primaryValueMatches
                ? this.primaryValueMatches - e.primaryValueMatches
                : this.propertiesValueMatches !== e.propertiesValueMatches
                ? this.propertiesValueMatches - e.propertiesValueMatches
                : this.propertiesMatches - e.propertiesMatches;
            }),
            e
          );
        })();
      function ze(e) {
        return U(e);
      }
      function He(e) {
        return D(e);
      }
      function Ge(e, t, n) {
        return void 0 === n && (n = !1), (t >= e.offset && t < e.offset + e.length) || (n && t === e.offset + e.length);
      }
      !(function () {
        function e(e, t, n) {
          void 0 === t && (t = []), void 0 === n && (n = []), (this.root = e), (this.syntaxErrors = t), (this.comments = n);
        }
        (e.prototype.getNodeFromOffset = function (e, t) {
          if ((void 0 === t && (t = !1), this.root)) return L(this.root, e, t);
        }),
          (e.prototype.visit = function (e) {
            if (this.root) {
              var t = function (n) {
                var r = e(n),
                  i = n.children;
                if (Array.isArray(i)) for (var o = 0; o < i.length && r; o++) r = t(i[o]);
                return r;
              };
              t(this.root);
            }
          }),
          (e.prototype.validate = function (e, t, n) {
            if ((void 0 === n && (n = C.Warning), this.root && t)) {
              var r = new Je();
              return (
                Xe(this.root, t, r, Ke.instance),
                r.problems.map(function (t) {
                  var r,
                    i = d.create(e.positionAt(t.location.offset), e.positionAt(t.location.offset + t.location.length));
                  return I.create(i, t.message, null !== (r = t.severity) && void 0 !== r ? r : n, t.code);
                })
              );
            }
          }),
          (e.prototype.getMatchingSchemas = function (e, t, n) {
            void 0 === t && (t = -1);
            var r = new Be(t, n);
            return this.root && e && Xe(this.root, e, new Je(), r), r.schemas;
          });
      })();
      function Xe(e, t, n, r) {
        if (e && r.include(e)) {
          var i = e;
          switch (i.type) {
            case "object":
              !(function (e, t, n, r) {
                for (var i = Object.create(null), o = [], a = 0, s = e.properties; a < s.length; a++) {
                  var u = (y = s[a]).keyNode.value;
                  (i[u] = y.valueNode), o.push(u);
                }
                if (Array.isArray(t.required))
                  for (var c = 0, l = t.required; c < l.length; c++) {
                    var f = l[c];
                    if (!i[f]) {
                      var h = e.parent && "property" === e.parent.type && e.parent.keyNode,
                        p = h ? { offset: h.offset, length: h.length } : { offset: e.offset, length: 1 };
                      n.problems.push({ location: p, message: De("MissingRequiredPropWarning", 'Missing property "{0}".', f) });
                    }
                  }
                var d = function (e) {
                  for (var t = o.indexOf(e); t >= 0; ) o.splice(t, 1), (t = o.indexOf(e));
                };
                if (t.properties)
                  for (var m = 0, g = Object.keys(t.properties); m < g.length; m++) {
                    f = g[m];
                    d(f);
                    var v = t.properties[f];
                    if ((O = i[f]))
                      if (K(v))
                        if (v) n.propertiesMatches++, n.propertiesValueMatches++;
                        else {
                          var y = O.parent;
                          n.problems.push({
                            location: { offset: y.keyNode.offset, length: y.keyNode.length },
                            message: t.errorMessage || De("DisallowedExtraPropWarning", "Property {0} is not allowed.", f),
                          });
                        }
                      else {
                        var b = new Je();
                        Xe(O, v, b, r), n.mergePropertyMatch(b);
                      }
                  }
                if (t.patternProperties)
                  for (var x = 0, A = Object.keys(t.patternProperties); x < A.length; x++)
                    for (var S = A[x], C = new RegExp(S), k = 0, w = o.slice(0); k < w.length; k++) {
                      f = w[k];
                      if (C.test(f))
                        if ((d(f), (O = i[f])))
                          if (K((v = t.patternProperties[S])))
                            if (v) n.propertiesMatches++, n.propertiesValueMatches++;
                            else {
                              y = O.parent;
                              n.problems.push({
                                location: { offset: y.keyNode.offset, length: y.keyNode.length },
                                message: t.errorMessage || De("DisallowedExtraPropWarning", "Property {0} is not allowed.", f),
                              });
                            }
                          else {
                            b = new Je();
                            Xe(O, v, b, r), n.mergePropertyMatch(b);
                          }
                    }
                if ("object" == typeof t.additionalProperties)
                  for (var I = 0, E = o; I < E.length; I++) {
                    f = E[I];
                    if ((O = i[f])) {
                      b = new Je();
                      Xe(O, t.additionalProperties, b, r), n.mergePropertyMatch(b);
                    }
                  }
                else if (!1 === t.additionalProperties && o.length > 0)
                  for (var T = 0, j = o; T < j.length; T++) {
                    var O;
                    f = j[T];
                    if ((O = i[f])) {
                      y = O.parent;
                      n.problems.push({
                        location: { offset: y.keyNode.offset, length: y.keyNode.length },
                        message: t.errorMessage || De("DisallowedExtraPropWarning", "Property {0} is not allowed.", f),
                      });
                    }
                  }
                q(t.maxProperties) &&
                  e.properties.length > t.maxProperties &&
                  n.problems.push({
                    location: { offset: e.offset, length: e.length },
                    message: De("MaxPropWarning", "Object has more properties than limit of {0}.", t.maxProperties),
                  });
                q(t.minProperties) &&
                  e.properties.length < t.minProperties &&
                  n.problems.push({
                    location: { offset: e.offset, length: e.length },
                    message: De("MinPropWarning", "Object has fewer properties than the required number of {0}", t.minProperties),
                  });
                if (t.dependencies)
                  for (var _ = 0, M = Object.keys(t.dependencies); _ < M.length; _++) {
                    u = M[_];
                    if (i[u]) {
                      var P = t.dependencies[u];
                      if (Array.isArray(P))
                        for (var V = 0, N = P; V < N.length; V++) {
                          var F = N[V];
                          i[F]
                            ? n.propertiesValueMatches++
                            : n.problems.push({
                                location: { offset: e.offset, length: e.length },
                                message: De(
                                  "RequiredDependentPropWarning",
                                  "Object is missing property {0} required by property {1}.",
                                  F,
                                  u
                                ),
                              });
                        }
                      else if ((v = qe(P))) {
                        b = new Je();
                        Xe(e, v, b, r), n.mergePropertyMatch(b);
                      }
                    }
                  }
                var R = qe(t.propertyNames);
                if (R)
                  for (var $ = 0, L = e.properties; $ < L.length; $++) {
                    var D = L[$];
                    (u = D.keyNode) && Xe(u, R, n, Ke.instance);
                  }
              })(i, t, n, r);
              break;
            case "array":
              !(function (e, t, n, r) {
                if (Array.isArray(t.items)) {
                  for (var i = t.items, o = 0; o < i.length; o++) {
                    var a = qe(i[o]),
                      s = new Je();
                    (h = e.items[o])
                      ? (Xe(h, a, s, r), n.mergePropertyMatch(s))
                      : e.items.length >= i.length && n.propertiesValueMatches++;
                  }
                  if (e.items.length > i.length)
                    if ("object" == typeof t.additionalItems)
                      for (var u = i.length; u < e.items.length; u++) {
                        s = new Je();
                        Xe(e.items[u], t.additionalItems, s, r), n.mergePropertyMatch(s);
                      }
                    else
                      !1 === t.additionalItems &&
                        n.problems.push({
                          location: { offset: e.offset, length: e.length },
                          message: De(
                            "additionalItemsWarning",
                            "Array has too many items according to schema. Expected {0} or fewer.",
                            i.length
                          ),
                        });
                } else {
                  var c = qe(t.items);
                  if (c)
                    for (var l = 0, f = e.items; l < f.length; l++) {
                      var h = f[l];
                      s = new Je();
                      Xe(h, c, s, r), n.mergePropertyMatch(s);
                    }
                }
                var p = qe(t.contains);
                if (p) {
                  e.items.some(function (e) {
                    var t = new Je();
                    return Xe(e, p, t, Ke.instance), !t.hasProblems();
                  }) ||
                    n.problems.push({
                      location: { offset: e.offset, length: e.length },
                      message: t.errorMessage || De("requiredItemMissingWarning", "Array does not contain required item."),
                    });
                }
                q(t.minItems) &&
                  e.items.length < t.minItems &&
                  n.problems.push({
                    location: { offset: e.offset, length: e.length },
                    message: De("minItemsWarning", "Array has too few items. Expected {0} or more.", t.minItems),
                  });
                q(t.maxItems) &&
                  e.items.length > t.maxItems &&
                  n.problems.push({
                    location: { offset: e.offset, length: e.length },
                    message: De("maxItemsWarning", "Array has too many items. Expected {0} or fewer.", t.maxItems),
                  });
                if (!0 === t.uniqueItems) {
                  var d = ze(e);
                  d.some(function (e, t) {
                    return t !== d.lastIndexOf(e);
                  }) &&
                    n.problems.push({
                      location: { offset: e.offset, length: e.length },
                      message: De("uniqueItemsWarning", "Array has duplicate items."),
                    });
                }
              })(i, t, n, r);
              break;
            case "string":
              !(function (e, t, n, r) {
                q(t.minLength) &&
                  e.value.length < t.minLength &&
                  n.problems.push({
                    location: { offset: e.offset, length: e.length },
                    message: De("minLengthWarning", "String is shorter than the minimum length of {0}.", t.minLength),
                  });
                q(t.maxLength) &&
                  e.value.length > t.maxLength &&
                  n.problems.push({
                    location: { offset: e.offset, length: e.length },
                    message: De("maxLengthWarning", "String is longer than the maximum length of {0}.", t.maxLength),
                  });
                if (((i = t.pattern), "string" == typeof i)) {
                  new RegExp(t.pattern).test(e.value) ||
                    n.problems.push({
                      location: { offset: e.offset, length: e.length },
                      message:
                        t.patternErrorMessage ||
                        t.errorMessage ||
                        De("patternWarning", 'String does not match the pattern of "{0}".', t.pattern),
                    });
                }
                var i;
                if (t.format)
                  switch (t.format) {
                    case "uri":
                    case "uri-reference":
                      var o = void 0;
                      if (e.value) {
                        var a = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(e.value);
                        a
                          ? a[2] || "uri" !== t.format || (o = De("uriSchemeMissing", "URI with a scheme is expected."))
                          : (o = De("uriMissing", "URI is expected."));
                      } else o = De("uriEmpty", "URI expected.");
                      o &&
                        n.problems.push({
                          location: { offset: e.offset, length: e.length },
                          message:
                            t.patternErrorMessage || t.errorMessage || De("uriFormatWarning", "String is not a URI: {0}", o),
                        });
                      break;
                    case "color-hex":
                    case "date-time":
                    case "date":
                    case "time":
                    case "email":
                      var s = Ue[t.format];
                      (e.value && s.pattern.exec(e.value)) ||
                        n.problems.push({
                          location: { offset: e.offset, length: e.length },
                          message: t.patternErrorMessage || t.errorMessage || s.errorMessage,
                        });
                  }
              })(i, t, n);
              break;
            case "number":
              !(function (e, t, n, r) {
                var i = e.value;
                function o(e) {
                  var t,
                    n = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(e.toString());
                  return (
                    n && {
                      value: Number(n[1] + (n[2] || "")),
                      multiplier: ((null === (t = n[2]) || void 0 === t ? void 0 : t.length) || 0) - (parseInt(n[3]) || 0),
                    }
                  );
                }
                if (q(t.multipleOf)) {
                  var a = -1;
                  if (Number.isInteger(t.multipleOf)) a = i % t.multipleOf;
                  else {
                    var s = o(t.multipleOf),
                      u = o(i);
                    if (s && u) {
                      var c = Math.pow(10, Math.abs(u.multiplier - s.multiplier));
                      u.multiplier < s.multiplier ? (u.value *= c) : (s.value *= c), (a = u.value % s.value);
                    }
                  }
                  0 !== a &&
                    n.problems.push({
                      location: { offset: e.offset, length: e.length },
                      message: De("multipleOfWarning", "Value is not divisible by {0}.", t.multipleOf),
                    });
                }
                function l(e, t) {
                  return q(t) ? t : K(t) && t ? e : void 0;
                }
                function f(e, t) {
                  if (!K(t) || !t) return e;
                }
                var h = l(t.minimum, t.exclusiveMinimum);
                q(h) &&
                  i <= h &&
                  n.problems.push({
                    location: { offset: e.offset, length: e.length },
                    message: De("exclusiveMinimumWarning", "Value is below the exclusive minimum of {0}.", h),
                  });
                var p = l(t.maximum, t.exclusiveMaximum);
                q(p) &&
                  i >= p &&
                  n.problems.push({
                    location: { offset: e.offset, length: e.length },
                    message: De("exclusiveMaximumWarning", "Value is above the exclusive maximum of {0}.", p),
                  });
                var d = f(t.minimum, t.exclusiveMinimum);
                q(d) &&
                  i < d &&
                  n.problems.push({
                    location: { offset: e.offset, length: e.length },
                    message: De("minimumWarning", "Value is below the minimum of {0}.", d),
                  });
                var m = f(t.maximum, t.exclusiveMaximum);
                q(m) &&
                  i > m &&
                  n.problems.push({
                    location: { offset: e.offset, length: e.length },
                    message: De("maximumWarning", "Value is above the maximum of {0}.", m),
                  });
              })(i, t, n);
              break;
            case "property":
              return Xe(i.valueNode, t, n, r);
          }
          !(function () {
            function e(e) {
              return i.type === e || ("integer" === e && "number" === i.type && i.isInteger);
            }
            Array.isArray(t.type)
              ? t.type.some(e) ||
                n.problems.push({
                  location: { offset: i.offset, length: i.length },
                  message:
                    t.errorMessage || De("typeArrayMismatchWarning", "Incorrect type. Expected one of {0}.", t.type.join(", ")),
                })
              : t.type &&
                (e(t.type) ||
                  n.problems.push({
                    location: { offset: i.offset, length: i.length },
                    message: t.errorMessage || De("typeMismatchWarning", 'Incorrect type. Expected "{0}".', t.type),
                  }));
            if (Array.isArray(t.allOf))
              for (var o = 0, a = t.allOf; o < a.length; o++) {
                var s = a[o];
                Xe(i, qe(s), n, r);
              }
            var u = qe(t.not);
            if (u) {
              var c = new Je(),
                l = r.newSub();
              Xe(i, u, c, l),
                c.hasProblems() ||
                  n.problems.push({
                    location: { offset: i.offset, length: i.length },
                    message: De("notSchemaWarning", "Matches a schema that is not allowed."),
                  });
              for (var f = 0, h = l.schemas; f < h.length; f++) {
                var p = h[f];
                (p.inverted = !p.inverted), r.add(p);
              }
            }
            var d = function (e, t) {
              for (var o = [], a = void 0, s = 0, u = e; s < u.length; s++) {
                var c = qe(u[s]),
                  l = new Je(),
                  f = r.newSub();
                if ((Xe(i, c, l, f), l.hasProblems() || o.push(c), a))
                  if (t || l.hasProblems() || a.validationResult.hasProblems()) {
                    var h = l.compare(a.validationResult);
                    h > 0
                      ? (a = { schema: c, validationResult: l, matchingSchemas: f })
                      : 0 === h && (a.matchingSchemas.merge(f), a.validationResult.mergeEnumValues(l));
                  } else
                    a.matchingSchemas.merge(f),
                      (a.validationResult.propertiesMatches += l.propertiesMatches),
                      (a.validationResult.propertiesValueMatches += l.propertiesValueMatches);
                else a = { schema: c, validationResult: l, matchingSchemas: f };
              }
              return (
                o.length > 1 &&
                  t &&
                  n.problems.push({
                    location: { offset: i.offset, length: 1 },
                    message: De("oneOfWarning", "Matches multiple schemas when only one must validate."),
                  }),
                a &&
                  (n.merge(a.validationResult),
                  (n.propertiesMatches += a.validationResult.propertiesMatches),
                  (n.propertiesValueMatches += a.validationResult.propertiesValueMatches),
                  r.merge(a.matchingSchemas)),
                o.length
              );
            };
            Array.isArray(t.anyOf) && d(t.anyOf, !1);
            Array.isArray(t.oneOf) && d(t.oneOf, !0);
            var m = function (e) {
                var t = new Je(),
                  o = r.newSub();
                Xe(i, qe(e), t, o),
                  n.merge(t),
                  (n.propertiesMatches += t.propertiesMatches),
                  (n.propertiesValueMatches += t.propertiesValueMatches),
                  r.merge(o);
              },
              g = qe(t.if);
            g &&
              (function (e, t, n) {
                var o = qe(e),
                  a = new Je(),
                  s = r.newSub();
                Xe(i, o, a, s), r.merge(s), a.hasProblems() ? n && m(n) : t && m(t);
              })(g, qe(t.then), qe(t.else));
            if (Array.isArray(t.enum)) {
              for (var v = ze(i), y = !1, b = 0, x = t.enum; b < x.length; b++) {
                var A = x[b];
                if (W(v, A)) {
                  y = !0;
                  break;
                }
              }
              (n.enumValues = t.enum),
                (n.enumValueMatch = y),
                y ||
                  n.problems.push({
                    location: { offset: i.offset, length: i.length },
                    code: Te.EnumValueMismatch,
                    message:
                      t.errorMessage ||
                      De(
                        "enumWarning",
                        "Value is not accepted. Valid values: {0}.",
                        t.enum
                          .map(function (e) {
                            return JSON.stringify(e);
                          })
                          .join(", ")
                      ),
                  });
            }
            if (B(t.const)) {
              W((v = ze(i)), t.const)
                ? (n.enumValueMatch = !0)
                : (n.problems.push({
                    location: { offset: i.offset, length: i.length },
                    code: Te.EnumValueMismatch,
                    message: t.errorMessage || De("constWarning", "Value must be {0}.", JSON.stringify(t.const)),
                  }),
                  (n.enumValueMatch = !1)),
                (n.enumValues = [t.const]);
            }
            t.deprecationMessage &&
              i.parent &&
              n.problems.push({
                location: { offset: i.parent.offset, length: i.parent.length },
                severity: C.Warning,
                message: t.deprecationMessage,
                code: Te.Deprecated,
              });
          })(),
            r.add({ node: i, schema: t });
        }
      }
      function Ze(e, t) {
        var n = e.length - t.length;
        return n > 0 ? e.lastIndexOf(t) === n : 0 === n && e === t;
      }
      function Qe(e) {
        return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&").replace(/[\*]/g, ".*");
      }
      var Ye = Fe();
      (function () {
        function e(e, t, n, r) {
          void 0 === t && (t = []),
            void 0 === n && (n = Promise),
            void 0 === r && (r = {}),
            (this.schemaService = e),
            (this.contributions = t),
            (this.promiseConstructor = n),
            (this.clientCapabilities = r);
        }
        (e.prototype.doResolve = function (e) {
          for (var t = this.contributions.length - 1; t >= 0; t--) {
            var n = this.contributions[t].resolveCompletion;
            if (n) {
              var r = n(e);
              if (r) return r;
            }
          }
          return this.promiseConstructor.resolve(e);
        }),
          (e.prototype.doComplete = function (e, t, n) {
            var r = this,
              i = { items: [], isIncomplete: !1 },
              o = e.getText(),
              a = e.offsetAt(t),
              s = n.getNodeFromOffset(a, !0);
            if (this.isInComment(e, s ? s.offset : 0, a)) return Promise.resolve(i);
            if (s && a === s.offset + s.length && a > 0) {
              var u = o[a - 1];
              (("object" === s.type && "}" === u) || ("array" === s.type && "]" === u)) && (s = s.parent);
            }
            var c,
              l = this.getCurrentWord(e, a);
            if (!s || ("string" !== s.type && "number" !== s.type && "boolean" !== s.type && "null" !== s.type)) {
              var f = a - l.length;
              f > 0 && '"' === o[f - 1] && f--, (c = d.create(e.positionAt(f), t));
            } else c = d.create(e.positionAt(s.offset), e.positionAt(s.offset + s.length));
            var h = {},
              p = {
                add: function (e) {
                  var t = e.label,
                    n = h[t];
                  if (n) n.documentation || (n.documentation = e.documentation), n.detail || (n.detail = e.detail);
                  else {
                    if ((t = t.replace(/[\n]/g, "↵")).length > 60) {
                      var r = t.substr(0, 57).trim() + "...";
                      h[r] || (t = r);
                    }
                    c && void 0 !== e.insertText && (e.textEdit = T.replace(c, e.insertText)),
                      (e.label = t),
                      (h[t] = e),
                      i.items.push(e);
                  }
                },
                setAsIncomplete: function () {
                  i.isIncomplete = !0;
                },
                error: function (e) {
                  console.error(e);
                },
                log: function (e) {
                  console.log(e);
                },
                getNumberOfProposals: function () {
                  return i.items.length;
                },
              };
            return this.schemaService.getSchemaForResource(e.uri, n).then(function (t) {
              var u = [],
                f = !0,
                d = "",
                m = void 0;
              if (s && "string" === s.type) {
                var g = s.parent;
                g &&
                  "property" === g.type &&
                  g.keyNode === s &&
                  ((f = !g.valueNode), (m = g), (d = o.substr(s.offset + 1, s.length - 2)), g && (s = g.parent));
              }
              if (s && "object" === s.type) {
                if (s.offset === a) return i;
                s.properties.forEach(function (e) {
                  (m && m === e) || (h[e.keyNode.value] = re.create("__"));
                });
                var v = "";
                f && (v = r.evaluateSeparatorAfter(e, e.offsetAt(c.end))),
                  t ? r.getPropertyCompletions(t, n, s, f, v, p) : r.getSchemaLessPropertyCompletions(n, s, d, p);
                var y = He(s);
                r.contributions.forEach(function (t) {
                  var n = t.collectPropertyCompletions(e.uri, y, l, f, "" === v, p);
                  n && u.push(n);
                }),
                  !t &&
                    l.length > 0 &&
                    '"' !== o.charAt(a - l.length - 1) &&
                    (p.add({
                      kind: Q.Property,
                      label: r.getLabelForValue(l),
                      insertText: r.getInsertTextForProperty(l, void 0, !1, v),
                      insertTextFormat: Y.Snippet,
                      documentation: "",
                    }),
                    p.setAsIncomplete());
              }
              var b = {};
              return (
                t ? r.getValueCompletions(t, n, s, a, e, p, b) : r.getSchemaLessValueCompletions(n, s, a, e, p),
                r.contributions.length > 0 && r.getContributedValueCompletions(n, s, a, e, p, u),
                r.promiseConstructor.all(u).then(function () {
                  if (0 === p.getNumberOfProposals()) {
                    var t = a;
                    !s ||
                      ("string" !== s.type && "number" !== s.type && "boolean" !== s.type && "null" !== s.type) ||
                      (t = s.offset + s.length);
                    var n = r.evaluateSeparatorAfter(e, t);
                    r.addFillerValueCompletions(b, n, p);
                  }
                  return i;
                })
              );
            });
          }),
          (e.prototype.getPropertyCompletions = function (e, t, n, r, i, o) {
            var a = this;
            t.getMatchingSchemas(e.schema, n.offset).forEach(function (e) {
              if (e.node === n && !e.inverted) {
                var t = e.schema.properties;
                t &&
                  Object.keys(t).forEach(function (e) {
                    var n = t[e];
                    if ("object" == typeof n && !n.deprecationMessage && !n.doNotSuggest) {
                      var s = {
                        kind: Q.Property,
                        label: e,
                        insertText: a.getInsertTextForProperty(e, n, r, i),
                        insertTextFormat: Y.Snippet,
                        filterText: a.getFilterTextForValue(e),
                        documentation: a.fromMarkup(n.markdownDescription) || n.description || "",
                      };
                      void 0 !== n.suggestSortText && (s.sortText = n.suggestSortText),
                        s.insertText &&
                          Ze(s.insertText, "$1" + i) &&
                          (s.command = { title: "Suggest", command: "editor.action.triggerSuggest" }),
                        o.add(s);
                    }
                  });
                var s = e.schema.propertyNames;
                if ("object" == typeof s && !s.deprecationMessage && !s.doNotSuggest) {
                  var u = function (e, t) {
                    void 0 === t && (t = void 0);
                    var n = {
                      kind: Q.Property,
                      label: e,
                      insertText: a.getInsertTextForProperty(e, void 0, r, i),
                      insertTextFormat: Y.Snippet,
                      filterText: a.getFilterTextForValue(e),
                      documentation: t || a.fromMarkup(s.markdownDescription) || s.description || "",
                    };
                    void 0 !== s.suggestSortText && (n.sortText = s.suggestSortText),
                      n.insertText &&
                        Ze(n.insertText, "$1" + i) &&
                        (n.command = { title: "Suggest", command: "editor.action.triggerSuggest" }),
                      o.add(n);
                  };
                  if (s.enum)
                    for (var c = 0; c < s.enum.length; c++) {
                      var l = void 0;
                      s.markdownEnumDescriptions && c < s.markdownEnumDescriptions.length
                        ? (l = a.fromMarkup(s.markdownEnumDescriptions[c]))
                        : s.enumDescriptions && c < s.enumDescriptions.length && (l = s.enumDescriptions[c]),
                        u(s.enum[c], l);
                    }
                  s.const && u(s.const);
                }
              }
            });
          }),
          (e.prototype.getSchemaLessPropertyCompletions = function (e, t, n, r) {
            var i = this,
              o = function (e) {
                e.properties.forEach(function (e) {
                  var t = e.keyNode.value;
                  r.add({
                    kind: Q.Property,
                    label: t,
                    insertText: i.getInsertTextForValue(t, ""),
                    insertTextFormat: Y.Snippet,
                    filterText: i.getFilterTextForValue(t),
                    documentation: "",
                  });
                });
              };
            if (t.parent)
              if ("property" === t.parent.type) {
                var a = t.parent.keyNode.value;
                e.visit(function (e) {
                  return (
                    "property" === e.type &&
                      e !== t.parent &&
                      e.keyNode.value === a &&
                      e.valueNode &&
                      "object" === e.valueNode.type &&
                      o(e.valueNode),
                    !0
                  );
                });
              } else
                "array" === t.parent.type &&
                  t.parent.items.forEach(function (e) {
                    "object" === e.type && e !== t && o(e);
                  });
            else
              "object" === t.type &&
                r.add({
                  kind: Q.Property,
                  label: "$schema",
                  insertText: this.getInsertTextForProperty("$schema", void 0, !0, ""),
                  insertTextFormat: Y.Snippet,
                  documentation: "",
                  filterText: this.getFilterTextForValue("$schema"),
                });
          }),
          (e.prototype.getSchemaLessValueCompletions = function (e, t, n, r, i) {
            var o = this,
              a = n;
            if (
              (!t ||
                ("string" !== t.type && "number" !== t.type && "boolean" !== t.type && "null" !== t.type) ||
                ((a = t.offset + t.length), (t = t.parent)),
              !t)
            )
              return (
                i.add({
                  kind: this.getSuggestionKind("object"),
                  label: "Empty object",
                  insertText: this.getInsertTextForValue({}, ""),
                  insertTextFormat: Y.Snippet,
                  documentation: "",
                }),
                void i.add({
                  kind: this.getSuggestionKind("array"),
                  label: "Empty array",
                  insertText: this.getInsertTextForValue([], ""),
                  insertTextFormat: Y.Snippet,
                  documentation: "",
                })
              );
            var s = this.evaluateSeparatorAfter(r, a),
              u = function (e) {
                e.parent &&
                  !Ge(e.parent, n, !0) &&
                  i.add({
                    kind: o.getSuggestionKind(e.type),
                    label: o.getLabelTextForMatchingNode(e, r),
                    insertText: o.getInsertTextForMatchingNode(e, r, s),
                    insertTextFormat: Y.Snippet,
                    documentation: "",
                  }),
                  "boolean" === e.type && o.addBooleanValueCompletion(!e.value, s, i);
              };
            if ("property" === t.type && n > (t.colonOffset || 0)) {
              var c = t.valueNode;
              if (c && (n > c.offset + c.length || "object" === c.type || "array" === c.type)) return;
              var l = t.keyNode.value;
              e.visit(function (e) {
                return "property" === e.type && e.keyNode.value === l && e.valueNode && u(e.valueNode), !0;
              }),
                "$schema" === l && t.parent && !t.parent.parent && this.addDollarSchemaCompletions(s, i);
            }
            if ("array" === t.type)
              if (t.parent && "property" === t.parent.type) {
                var f = t.parent.keyNode.value;
                e.visit(function (e) {
                  return (
                    "property" === e.type &&
                      e.keyNode.value === f &&
                      e.valueNode &&
                      "array" === e.valueNode.type &&
                      e.valueNode.items.forEach(u),
                    !0
                  );
                });
              } else t.items.forEach(u);
          }),
          (e.prototype.getValueCompletions = function (e, t, n, r, i, o, a) {
            var s = r,
              u = void 0,
              c = void 0;
            if (
              (!n ||
                ("string" !== n.type && "number" !== n.type && "boolean" !== n.type && "null" !== n.type) ||
                ((s = n.offset + n.length), (c = n), (n = n.parent)),
              n)
            ) {
              if ("property" === n.type && r > (n.colonOffset || 0)) {
                var l = n.valueNode;
                if (l && r > l.offset + l.length) return;
                (u = n.keyNode.value), (n = n.parent);
              }
              if (n && (void 0 !== u || "array" === n.type)) {
                for (
                  var f = this.evaluateSeparatorAfter(i, s), h = 0, p = t.getMatchingSchemas(e.schema, n.offset, c);
                  h < p.length;
                  h++
                ) {
                  var d = p[h];
                  if (d.node === n && !d.inverted && d.schema) {
                    if ("array" === n.type && d.schema.items)
                      if (Array.isArray(d.schema.items)) {
                        var m = this.findItemAtOffset(n, i, r);
                        m < d.schema.items.length && this.addSchemaValueCompletions(d.schema.items[m], f, o, a);
                      } else this.addSchemaValueCompletions(d.schema.items, f, o, a);
                    if (void 0 !== u) {
                      var g = !1;
                      if (d.schema.properties)
                        (x = d.schema.properties[u]) && ((g = !0), this.addSchemaValueCompletions(x, f, o, a));
                      if (d.schema.patternProperties && !g)
                        for (var v = 0, y = Object.keys(d.schema.patternProperties); v < y.length; v++) {
                          var b = y[v];
                          if (new RegExp(b).test(u)) {
                            g = !0;
                            var x = d.schema.patternProperties[b];
                            this.addSchemaValueCompletions(x, f, o, a);
                          }
                        }
                      if (d.schema.additionalProperties && !g) {
                        x = d.schema.additionalProperties;
                        this.addSchemaValueCompletions(x, f, o, a);
                      }
                    }
                  }
                }
                "$schema" !== u || n.parent || this.addDollarSchemaCompletions(f, o),
                  a.boolean && (this.addBooleanValueCompletion(!0, f, o), this.addBooleanValueCompletion(!1, f, o)),
                  a.null && this.addNullValueCompletion(f, o);
              }
            } else this.addSchemaValueCompletions(e.schema, "", o, a);
          }),
          (e.prototype.getContributedValueCompletions = function (e, t, n, r, i, o) {
            if (t) {
              if (
                (("string" !== t.type && "number" !== t.type && "boolean" !== t.type && "null" !== t.type) || (t = t.parent),
                t && "property" === t.type && n > (t.colonOffset || 0))
              ) {
                var a = t.keyNode.value,
                  s = t.valueNode;
                if ((!s || n <= s.offset + s.length) && t.parent) {
                  var u = He(t.parent);
                  this.contributions.forEach(function (e) {
                    var t = e.collectValueCompletions(r.uri, u, a, i);
                    t && o.push(t);
                  });
                }
              }
            } else
              this.contributions.forEach(function (e) {
                var t = e.collectDefaultCompletions(r.uri, i);
                t && o.push(t);
              });
          }),
          (e.prototype.addSchemaValueCompletions = function (e, t, n, r) {
            var i = this;
            "object" == typeof e &&
              (this.addEnumValueCompletions(e, t, n),
              this.addDefaultValueCompletions(e, t, n),
              this.collectTypes(e, r),
              Array.isArray(e.allOf) &&
                e.allOf.forEach(function (e) {
                  return i.addSchemaValueCompletions(e, t, n, r);
                }),
              Array.isArray(e.anyOf) &&
                e.anyOf.forEach(function (e) {
                  return i.addSchemaValueCompletions(e, t, n, r);
                }),
              Array.isArray(e.oneOf) &&
                e.oneOf.forEach(function (e) {
                  return i.addSchemaValueCompletions(e, t, n, r);
                }));
          }),
          (e.prototype.addDefaultValueCompletions = function (e, t, n, r) {
            var i = this;
            void 0 === r && (r = 0);
            var o = !1;
            if (B(e.default)) {
              for (var a = e.type, s = e.default, u = r; u > 0; u--) (s = [s]), (a = "array");
              n.add({
                kind: this.getSuggestionKind(a),
                label: this.getLabelForValue(s),
                insertText: this.getInsertTextForValue(s, t),
                insertTextFormat: Y.Snippet,
                detail: Ye("json.suggest.default", "Default value"),
              }),
                (o = !0);
            }
            Array.isArray(e.examples) &&
              e.examples.forEach(function (a) {
                for (var s = e.type, u = a, c = r; c > 0; c--) (u = [u]), (s = "array");
                n.add({
                  kind: i.getSuggestionKind(s),
                  label: i.getLabelForValue(u),
                  insertText: i.getInsertTextForValue(u, t),
                  insertTextFormat: Y.Snippet,
                }),
                  (o = !0);
              }),
              Array.isArray(e.defaultSnippets) &&
                e.defaultSnippets.forEach(function (a) {
                  var s,
                    u,
                    c = e.type,
                    l = a.body,
                    f = a.label;
                  if (B(l)) {
                    e.type;
                    for (var h = r; h > 0; h--) (l = [l]), "array";
                    (s = i.getInsertTextForSnippetValue(l, t)),
                      (u = i.getFilterTextForSnippetValue(l)),
                      (f = f || i.getLabelForSnippetValue(l));
                  } else {
                    if ("string" != typeof a.bodyText) return;
                    var p = "",
                      d = "",
                      m = "";
                    for (h = r; h > 0; h--) (p = p + m + "[\n"), (d = d + "\n" + m + "]"), (m += "\t"), (c = "array");
                    (s = p + m + a.bodyText.split("\n").join("\n" + m) + d + t), (f = f || s), (u = s.replace(/[\n]/g, ""));
                  }
                  n.add({
                    kind: i.getSuggestionKind(c),
                    label: f,
                    documentation: i.fromMarkup(a.markdownDescription) || a.description,
                    insertText: s,
                    insertTextFormat: Y.Snippet,
                    filterText: u,
                  }),
                    (o = !0);
                }),
              !o &&
                "object" == typeof e.items &&
                !Array.isArray(e.items) &&
                r < 5 &&
                this.addDefaultValueCompletions(e.items, t, n, r + 1);
          }),
          (e.prototype.addEnumValueCompletions = function (e, t, n) {
            if (
              (B(e.const) &&
                n.add({
                  kind: this.getSuggestionKind(e.type),
                  label: this.getLabelForValue(e.const),
                  insertText: this.getInsertTextForValue(e.const, t),
                  insertTextFormat: Y.Snippet,
                  documentation: this.fromMarkup(e.markdownDescription) || e.description,
                }),
              Array.isArray(e.enum))
            )
              for (var r = 0, i = e.enum.length; r < i; r++) {
                var o = e.enum[r],
                  a = this.fromMarkup(e.markdownDescription) || e.description;
                e.markdownEnumDescriptions && r < e.markdownEnumDescriptions.length && this.doesSupportMarkdown()
                  ? (a = this.fromMarkup(e.markdownEnumDescriptions[r]))
                  : e.enumDescriptions && r < e.enumDescriptions.length && (a = e.enumDescriptions[r]),
                  n.add({
                    kind: this.getSuggestionKind(e.type),
                    label: this.getLabelForValue(o),
                    insertText: this.getInsertTextForValue(o, t),
                    insertTextFormat: Y.Snippet,
                    documentation: a,
                  });
              }
          }),
          (e.prototype.collectTypes = function (e, t) {
            if (!Array.isArray(e.enum) && !B(e.const)) {
              var n = e.type;
              Array.isArray(n)
                ? n.forEach(function (e) {
                    return (t[e] = !0);
                  })
                : n && (t[n] = !0);
            }
          }),
          (e.prototype.addFillerValueCompletions = function (e, t, n) {
            e.object &&
              n.add({
                kind: this.getSuggestionKind("object"),
                label: "{}",
                insertText: this.getInsertTextForGuessedValue({}, t),
                insertTextFormat: Y.Snippet,
                detail: Ye("defaults.object", "New object"),
                documentation: "",
              }),
              e.array &&
                n.add({
                  kind: this.getSuggestionKind("array"),
                  label: "[]",
                  insertText: this.getInsertTextForGuessedValue([], t),
                  insertTextFormat: Y.Snippet,
                  detail: Ye("defaults.array", "New array"),
                  documentation: "",
                });
          }),
          (e.prototype.addBooleanValueCompletion = function (e, t, n) {
            n.add({
              kind: this.getSuggestionKind("boolean"),
              label: e ? "true" : "false",
              insertText: this.getInsertTextForValue(e, t),
              insertTextFormat: Y.Snippet,
              documentation: "",
            });
          }),
          (e.prototype.addNullValueCompletion = function (e, t) {
            t.add({
              kind: this.getSuggestionKind("null"),
              label: "null",
              insertText: "null" + e,
              insertTextFormat: Y.Snippet,
              documentation: "",
            });
          }),
          (e.prototype.addDollarSchemaCompletions = function (e, t) {
            var n = this;
            this.schemaService
              .getRegisteredSchemaIds(function (e) {
                return "http" === e || "https" === e;
              })
              .forEach(function (r) {
                return t.add({
                  kind: Q.Module,
                  label: n.getLabelForValue(r),
                  filterText: n.getFilterTextForValue(r),
                  insertText: n.getInsertTextForValue(r, e),
                  insertTextFormat: Y.Snippet,
                  documentation: "",
                });
              });
          }),
          (e.prototype.getLabelForValue = function (e) {
            return JSON.stringify(e);
          }),
          (e.prototype.getFilterTextForValue = function (e) {
            return JSON.stringify(e);
          }),
          (e.prototype.getFilterTextForSnippetValue = function (e) {
            return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
          }),
          (e.prototype.getLabelForSnippetValue = function (e) {
            return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
          }),
          (e.prototype.getInsertTextForPlainText = function (e) {
            return e.replace(/[\\\$\}]/g, "\\$&");
          }),
          (e.prototype.getInsertTextForValue = function (e, t) {
            var n = JSON.stringify(e, null, "\t");
            return "{}" === n ? "{$1}" + t : "[]" === n ? "[$1]" + t : this.getInsertTextForPlainText(n + t);
          }),
          (e.prototype.getInsertTextForSnippetValue = function (e, t) {
            return (
              (function e(t, n, r) {
                if (null !== t && "object" == typeof t) {
                  var i = n + "\t";
                  if (Array.isArray(t)) {
                    if (0 === t.length) return "[]";
                    for (var o = "[\n", a = 0; a < t.length; a++)
                      (o += i + e(t[a], i, r)), a < t.length - 1 && (o += ","), (o += "\n");
                    return (o += n + "]");
                  }
                  var s = Object.keys(t);
                  if (0 === s.length) return "{}";
                  for (o = "{\n", a = 0; a < s.length; a++) {
                    var u = s[a];
                    (o += i + JSON.stringify(u) + ": " + e(t[u], i, r)), a < s.length - 1 && (o += ","), (o += "\n");
                  }
                  return (o += n + "}");
                }
                return r(t);
              })(e, "", function (e) {
                return "string" == typeof e && "^" === e[0] ? e.substr(1) : JSON.stringify(e);
              }) + t
            );
          }),
          (e.prototype.getInsertTextForGuessedValue = function (e, t) {
            switch (typeof e) {
              case "object":
                return null === e ? "${1:null}" + t : this.getInsertTextForValue(e, t);
              case "string":
                var n = JSON.stringify(e);
                return (n = n.substr(1, n.length - 2)), '"${1:' + (n = this.getInsertTextForPlainText(n)) + '}"' + t;
              case "number":
              case "boolean":
                return "${1:" + JSON.stringify(e) + "}" + t;
            }
            return this.getInsertTextForValue(e, t);
          }),
          (e.prototype.getSuggestionKind = function (e) {
            if (Array.isArray(e)) {
              var t = e;
              e = t.length > 0 ? t[0] : void 0;
            }
            if (!e) return Q.Value;
            switch (e) {
              case "string":
                return Q.Value;
              case "object":
                return Q.Module;
              case "property":
                return Q.Property;
              default:
                return Q.Value;
            }
          }),
          (e.prototype.getLabelTextForMatchingNode = function (e, t) {
            switch (e.type) {
              case "array":
                return "[]";
              case "object":
                return "{}";
              default:
                return t.getText().substr(e.offset, e.length);
            }
          }),
          (e.prototype.getInsertTextForMatchingNode = function (e, t, n) {
            switch (e.type) {
              case "array":
                return this.getInsertTextForValue([], n);
              case "object":
                return this.getInsertTextForValue({}, n);
              default:
                var r = t.getText().substr(e.offset, e.length) + n;
                return this.getInsertTextForPlainText(r);
            }
          }),
          (e.prototype.getInsertTextForProperty = function (e, t, n, r) {
            var i = this.getInsertTextForValue(e, "");
            if (!n) return i;
            var o,
              a = i + ": ",
              s = 0;
            if (t) {
              if (Array.isArray(t.defaultSnippets)) {
                if (1 === t.defaultSnippets.length) {
                  var u = t.defaultSnippets[0].body;
                  B(u) && (o = this.getInsertTextForSnippetValue(u, ""));
                }
                s += t.defaultSnippets.length;
              }
              if (
                (t.enum &&
                  (o || 1 !== t.enum.length || (o = this.getInsertTextForGuessedValue(t.enum[0], "")), (s += t.enum.length)),
                B(t.default) && (o || (o = this.getInsertTextForGuessedValue(t.default, "")), s++),
                Array.isArray(t.examples) &&
                  t.examples.length &&
                  (o || (o = this.getInsertTextForGuessedValue(t.examples[0], "")), (s += t.examples.length)),
                0 === s)
              ) {
                var c = Array.isArray(t.type) ? t.type[0] : t.type;
                switch ((c || (t.properties ? (c = "object") : t.items && (c = "array")), c)) {
                  case "boolean":
                    o = "$1";
                    break;
                  case "string":
                    o = '"$1"';
                    break;
                  case "object":
                    o = "{$1}";
                    break;
                  case "array":
                    o = "[$1]";
                    break;
                  case "number":
                  case "integer":
                    o = "${1:0}";
                    break;
                  case "null":
                    o = "${1:null}";
                    break;
                  default:
                    return i;
                }
              }
            }
            return (!o || s > 1) && (o = "$1"), a + o + r;
          }),
          (e.prototype.getCurrentWord = function (e, t) {
            for (var n = t - 1, r = e.getText(); n >= 0 && -1 === ' \t\n\r\v":{[,]}'.indexOf(r.charAt(n)); ) n--;
            return r.substring(n + 1, t);
          }),
          (e.prototype.evaluateSeparatorAfter = function (e, t) {
            var n = R(e.getText(), !0);
            switch ((n.setPosition(t), n.scan())) {
              case 5:
              case 2:
              case 4:
              case 17:
                return "";
              default:
                return ",";
            }
          }),
          (e.prototype.findItemAtOffset = function (e, t, n) {
            for (var r = R(t.getText(), !0), i = e.items, o = i.length - 1; o >= 0; o--) {
              var a = i[o];
              if (n > a.offset + a.length)
                return (
                  r.setPosition(a.offset + a.length), 5 === r.scan() && n >= r.getTokenOffset() + r.getTokenLength() ? o + 1 : o
                );
              if (n >= a.offset) return o;
            }
            return 0;
          }),
          (e.prototype.isInComment = function (e, t, n) {
            var r = R(e.getText(), !1);
            r.setPosition(t);
            for (var i = r.scan(); 17 !== i && r.getTokenOffset() + r.getTokenLength() < n; ) i = r.scan();
            return (12 === i || 13 === i) && r.getTokenOffset() <= n;
          }),
          (e.prototype.fromMarkup = function (e) {
            if (e && this.doesSupportMarkdown()) return { kind: X.Markdown, value: e };
          }),
          (e.prototype.doesSupportMarkdown = function () {
            if (!B(this.supportsMarkdown)) {
              var e = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
              this.supportsMarkdown =
                e &&
                e.completionItem &&
                Array.isArray(e.completionItem.documentationFormat) &&
                -1 !== e.completionItem.documentationFormat.indexOf(X.Markdown);
            }
            return this.supportsMarkdown;
          }),
          (e.prototype.doesSupportsCommitCharacters = function () {
            if (!B(this.supportsCommitCharacters)) {
              var e = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
              this.supportsCommitCharacters = e && e.completionItem && !!e.completionItem.commitCharactersSupport;
            }
            return this.supportsCommitCharacters;
          });
      })(),
        (function () {
          function e(e, t, n) {
            void 0 === t && (t = []), (this.schemaService = e), (this.contributions = t), (this.promise = n || Promise);
          }
          e.prototype.doHover = function (e, t, n) {
            var r = e.offsetAt(t),
              i = n.getNodeFromOffset(r);
            if (!i || (("object" === i.type || "array" === i.type) && r > i.offset + 1 && r < i.offset + i.length - 1))
              return this.promise.resolve(null);
            var o = i;
            if ("string" === i.type) {
              var a = i.parent;
              if (a && "property" === a.type && a.keyNode === i && !(i = a.valueNode)) return this.promise.resolve(null);
            }
            for (
              var s = d.create(e.positionAt(o.offset), e.positionAt(o.offset + o.length)),
                u = function (e) {
                  return { contents: e, range: s };
                },
                c = He(i),
                l = this.contributions.length - 1;
              l >= 0;
              l--
            ) {
              var f = this.contributions[l].getInfoContribution(e.uri, c);
              if (f)
                return f.then(function (e) {
                  return u(e);
                });
            }
            return this.schemaService.getSchemaForResource(e.uri, n).then(function (e) {
              if (e && i) {
                var t = n.getMatchingSchemas(e.schema, i.offset),
                  r = void 0,
                  o = void 0,
                  a = void 0,
                  s = void 0;
                t.every(function (e) {
                  if (
                    e.node === i &&
                    !e.inverted &&
                    e.schema &&
                    ((r = r || e.schema.title),
                    (o = o || e.schema.markdownDescription || et(e.schema.description)),
                    e.schema.enum)
                  ) {
                    var t = e.schema.enum.indexOf(ze(i));
                    e.schema.markdownEnumDescriptions
                      ? (a = e.schema.markdownEnumDescriptions[t])
                      : e.schema.enumDescriptions && (a = et(e.schema.enumDescriptions[t])),
                      a && "string" != typeof (s = e.schema.enum[t]) && (s = JSON.stringify(s));
                  }
                  return !0;
                });
                var c = "";
                return (
                  r && (c = et(r)),
                  o && (c.length > 0 && (c += "\n\n"), (c += o)),
                  a &&
                    (c.length > 0 && (c += "\n\n"),
                    (c +=
                      "`" +
                      (function (e) {
                        if (-1 !== e.indexOf("`")) return "`` " + e + " ``";
                        return e;
                      })(s) +
                      "`: " +
                      a)),
                  u([c])
                );
              }
              return null;
            });
          };
        })();
      function et(e) {
        if (e) return e.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, "$1\n\n$3").replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
      }
      var tt = n(395),
        nt = Fe(),
        rt = (function () {
          function e(e, t) {
            (this.patternRegExps = []), (this.isInclude = []);
            try {
              for (var n = 0, r = e; n < r.length; n++) {
                var i = r[n],
                  o = "!" !== i[0];
                o || (i = i.substring(1)), this.patternRegExps.push(new RegExp(Qe(i) + "$")), this.isInclude.push(o);
              }
              this.uris = t;
            } catch (e) {
              (this.patternRegExps.length = 0), (this.isInclude.length = 0), (this.uris = []);
            }
          }
          return (
            (e.prototype.matchesPattern = function (e) {
              for (var t = !1, n = 0; n < this.patternRegExps.length; n++) {
                this.patternRegExps[n].test(e) && (t = this.isInclude[n]);
              }
              return t;
            }),
            (e.prototype.getURIs = function () {
              return this.uris;
            }),
            e
          );
        })(),
        it = (function () {
          function e(e, t, n) {
            (this.service = e),
              (this.url = t),
              (this.dependencies = {}),
              n && (this.unresolvedSchema = this.service.promise.resolve(new ot(n)));
          }
          return (
            (e.prototype.getUnresolvedSchema = function () {
              return this.unresolvedSchema || (this.unresolvedSchema = this.service.loadSchema(this.url)), this.unresolvedSchema;
            }),
            (e.prototype.getResolvedSchema = function () {
              var e = this;
              return (
                this.resolvedSchema ||
                  (this.resolvedSchema = this.getUnresolvedSchema().then(function (t) {
                    return e.service.resolveSchemaContent(t, e.url, e.dependencies);
                  })),
                this.resolvedSchema
              );
            }),
            (e.prototype.clearSchema = function () {
              (this.resolvedSchema = void 0), (this.unresolvedSchema = void 0), (this.dependencies = {});
            }),
            e
          );
        })(),
        ot = function (e, t) {
          void 0 === t && (t = []), (this.schema = e), (this.errors = t);
        },
        at = (function () {
          function e(e, t) {
            void 0 === t && (t = []), (this.schema = e), (this.errors = t);
          }
          return (
            (e.prototype.getSection = function (e) {
              var t = this.getSectionRecursive(e, this.schema);
              if (t) return qe(t);
            }),
            (e.prototype.getSectionRecursive = function (e, t) {
              if (!t || "boolean" == typeof t || 0 === e.length) return t;
              var n = e.shift();
              if (t.properties && (t.properties[n], 1)) return this.getSectionRecursive(e, t.properties[n]);
              if (t.patternProperties)
                for (var r = 0, i = Object.keys(t.patternProperties); r < i.length; r++) {
                  var o = i[r];
                  if (new RegExp(o).test(n)) return this.getSectionRecursive(e, t.patternProperties[o]);
                }
              else {
                if ("object" == typeof t.additionalProperties) return this.getSectionRecursive(e, t.additionalProperties);
                if (n.match("[0-9]+"))
                  if (Array.isArray(t.items)) {
                    var a = parseInt(n, 10);
                    if (!isNaN(a) && t.items[a]) return this.getSectionRecursive(e, t.items[a]);
                  } else if (t.items) return this.getSectionRecursive(e, t.items);
              }
            }),
            e
          );
        })(),
        st =
          ((function () {
            function e(e, t, n) {
              (this.contextService = t),
                (this.requestService = e),
                (this.promiseConstructor = n || Promise),
                (this.callOnDispose = []),
                (this.contributionSchemas = {}),
                (this.contributionAssociations = []),
                (this.schemasById = {}),
                (this.filePatternAssociations = []),
                (this.registeredSchemasIds = {});
            }
            (e.prototype.getRegisteredSchemaIds = function (e) {
              return Object.keys(this.registeredSchemasIds).filter(function (t) {
                var n = tt.a.parse(t).scheme;
                return "schemaservice" !== n && (!e || e(n));
              });
            }),
              Object.defineProperty(e.prototype, "promise", {
                get: function () {
                  return this.promiseConstructor;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (e.prototype.dispose = function () {
                for (; this.callOnDispose.length > 0; ) this.callOnDispose.pop()();
              }),
              (e.prototype.onResourceChange = function (e) {
                for (
                  var t = this,
                    n = !1,
                    r = [(e = ut(e))],
                    i = Object.keys(this.schemasById).map(function (e) {
                      return t.schemasById[e];
                    });
                  r.length;

                )
                  for (var o = r.pop(), a = 0; a < i.length; a++) {
                    var s = i[a];
                    s &&
                      (s.url === o || s.dependencies[o]) &&
                      (s.url !== o && r.push(s.url), s.clearSchema(), (i[a] = void 0), (n = !0));
                  }
                return n;
              }),
              (e.prototype.setSchemaContributions = function (e) {
                if (e.schemas) {
                  var t = e.schemas;
                  for (var n in t) {
                    var r = ut(n);
                    this.contributionSchemas[r] = this.addSchemaHandle(r, t[n]);
                  }
                }
                if (Array.isArray(e.schemaAssociations))
                  for (var i = 0, o = e.schemaAssociations; i < o.length; i++) {
                    var a = o[i],
                      s = a.uris.map(ut),
                      u = this.addFilePatternAssociation(a.pattern, s);
                    this.contributionAssociations.push(u);
                  }
              }),
              (e.prototype.addSchemaHandle = function (e, t) {
                var n = new it(this, e, t);
                return (this.schemasById[e] = n), n;
              }),
              (e.prototype.getOrAddSchemaHandle = function (e, t) {
                return this.schemasById[e] || this.addSchemaHandle(e, t);
              }),
              (e.prototype.addFilePatternAssociation = function (e, t) {
                var n = new rt(e, t);
                return this.filePatternAssociations.push(n), n;
              }),
              (e.prototype.registerExternalSchema = function (e, t, n) {
                var r = ut(e);
                return (
                  (this.registeredSchemasIds[r] = !0),
                  (this.cachedSchemaForResource = void 0),
                  t && this.addFilePatternAssociation(t, [e]),
                  n ? this.addSchemaHandle(r, n) : this.getOrAddSchemaHandle(r)
                );
              }),
              (e.prototype.clearExternalSchemas = function () {
                for (var e in ((this.schemasById = {}),
                (this.filePatternAssociations = []),
                (this.registeredSchemasIds = {}),
                (this.cachedSchemaForResource = void 0),
                this.contributionSchemas))
                  (this.schemasById[e] = this.contributionSchemas[e]), (this.registeredSchemasIds[e] = !0);
                for (var t = 0, n = this.contributionAssociations; t < n.length; t++) {
                  var r = n[t];
                  this.filePatternAssociations.push(r);
                }
              }),
              (e.prototype.getResolvedSchema = function (e) {
                var t = ut(e),
                  n = this.schemasById[t];
                return n ? n.getResolvedSchema() : this.promise.resolve(void 0);
              }),
              (e.prototype.loadSchema = function (e) {
                if (!this.requestService) {
                  var t = nt(
                    "json.schema.norequestservice",
                    "Unable to load schema from '{0}'. No schema request service available",
                    ct(e)
                  );
                  return this.promise.resolve(new ot({}, [t]));
                }
                return this.requestService(e).then(
                  function (t) {
                    if (!t) {
                      var n = nt("json.schema.nocontent", "Unable to load schema from '{0}': No content.", ct(e));
                      return new ot({}, [n]);
                    }
                    var r,
                      i = [];
                    r = $(t, i);
                    var o = i.length
                      ? [
                          nt(
                            "json.schema.invalidFormat",
                            "Unable to parse content from '{0}': Parse error at offset {1}.",
                            ct(e),
                            i[0].offset
                          ),
                        ]
                      : [];
                    return new ot(r, o);
                  },
                  function (t) {
                    var n = t.toString(),
                      r = t.toString().split("Error: ");
                    return (
                      r.length > 1 && (n = r[1]),
                      Ze(n, ".") && (n = n.substr(0, n.length - 1)),
                      new ot({}, [nt("json.schema.nocontent", "Unable to load schema from '{0}': {1}.", ct(e), n)])
                    );
                  }
                );
              }),
              (e.prototype.resolveSchemaContent = function (e, t, n) {
                var r = this,
                  i = e.errors.slice(0),
                  o = e.schema;
                if (o.$schema) {
                  var a = ut(o.$schema);
                  if ("http://json-schema.org/draft-03/schema" === a)
                    return this.promise.resolve(
                      new at({}, [nt("json.schema.draft03.notsupported", "Draft-03 schemas are not supported.")])
                    );
                  "https://json-schema.org/draft/2019-09/schema" === a &&
                    i.push(nt("json.schema.draft201909.notsupported", "Draft 2019-09 schemas are not yet fully supported."));
                }
                var s = this.contextService,
                  u = function (e, t, n, r) {
                    var o = r ? decodeURIComponent(r) : void 0,
                      a = (function (e, t) {
                        if (!t) return e;
                        var n = e;
                        return (
                          "/" === t[0] && (t = t.substr(1)),
                          t.split("/").some(function (e) {
                            return !(n = n[e]);
                          }),
                          n
                        );
                      })(t, o);
                    if (a) for (var s in a) a.hasOwnProperty(s) && !e.hasOwnProperty(s) && (e[s] = a[s]);
                    else i.push(nt("json.schema.invalidref", "$ref '{0}' in '{1}' can not be resolved.", o, n));
                  },
                  c = function (e, t, n, o, a) {
                    s && !/^\w+:\/\/.*/.test(t) && (t = s.resolveRelativePath(t, o)), (t = ut(t));
                    var c = r.getOrAddSchemaHandle(t);
                    return c.getUnresolvedSchema().then(function (r) {
                      if (((a[t] = !0), r.errors.length)) {
                        var o = n ? t + "#" + n : t;
                        i.push(nt("json.schema.problemloadingref", "Problems loading reference '{0}': {1}", o, r.errors[0]));
                      }
                      return u(e, r.schema, t, n), l(e, r.schema, t, c.dependencies);
                    });
                  },
                  l = function (e, t, n, i) {
                    if (!e || "object" != typeof e) return Promise.resolve(null);
                    for (
                      var o = [e],
                        a = [],
                        s = [],
                        l = function (e) {
                          for (var r = []; e.$ref; ) {
                            var a = e.$ref,
                              l = a.split("#", 2);
                            if ((delete e.$ref, l[0].length > 0)) return void s.push(c(e, l[0], l[1], n, i));
                            -1 === r.indexOf(a) && (u(e, t, n, l[1]), r.push(a));
                          }
                          !(function () {
                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                            for (var n = 0, r = e; n < r.length; n++) {
                              var i = r[n];
                              "object" == typeof i && o.push(i);
                            }
                          })(
                            e.items,
                            e.additionalItems,
                            e.additionalProperties,
                            e.not,
                            e.contains,
                            e.propertyNames,
                            e.if,
                            e.then,
                            e.else
                          ),
                            (function () {
                              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                              for (var n = 0, r = e; n < r.length; n++) {
                                var i = r[n];
                                if ("object" == typeof i)
                                  for (var a in i) {
                                    var s = a,
                                      u = i[s];
                                    "object" == typeof u && o.push(u);
                                  }
                              }
                            })(e.definitions, e.properties, e.patternProperties, e.dependencies),
                            (function () {
                              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                              for (var n = 0, r = e; n < r.length; n++) {
                                var i = r[n];
                                if (Array.isArray(i))
                                  for (var a = 0, s = i; a < s.length; a++) {
                                    var u = s[a];
                                    "object" == typeof u && o.push(u);
                                  }
                              }
                            })(e.anyOf, e.allOf, e.oneOf, e.items);
                        };
                      o.length;

                    ) {
                      var f = o.pop();
                      a.indexOf(f) >= 0 || (a.push(f), l(f));
                    }
                    return r.promise.all(s);
                  };
                return l(o, o, t, n).then(function (e) {
                  return new at(o, i);
                });
              }),
              (e.prototype.getSchemaForResource = function (e, t) {
                if (t && t.root && "object" === t.root.type) {
                  var n = t.root.properties.filter(function (e) {
                    return "$schema" === e.keyNode.value && e.valueNode && "string" === e.valueNode.type;
                  });
                  if (n.length > 0) {
                    var r = n[0].valueNode;
                    if (r && "string" === r.type) {
                      var i = ze(r);
                      if (
                        (i &&
                          (function (e, t) {
                            if (e.length < t.length) return !1;
                            for (var n = 0; n < t.length; n++) if (e[n] !== t[n]) return !1;
                            return !0;
                          })(i, ".") &&
                          this.contextService &&
                          (i = this.contextService.resolveRelativePath(i, e)),
                        i)
                      ) {
                        var o = ut(i);
                        return this.getOrAddSchemaHandle(o).getResolvedSchema();
                      }
                    }
                  }
                }
                if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === e)
                  return this.cachedSchemaForResource.resolvedSchema;
                for (
                  var a = Object.create(null),
                    s = [],
                    u = (function (e) {
                      try {
                        return tt.a.parse(e).with({ fragment: null, query: null }).toString();
                      } catch (t) {
                        return e;
                      }
                    })(e),
                    c = 0,
                    l = this.filePatternAssociations;
                  c < l.length;
                  c++
                ) {
                  var f = l[c];
                  if (f.matchesPattern(u))
                    for (var h = 0, p = f.getURIs(); h < p.length; h++) {
                      var d = p[h];
                      a[d] || (s.push(d), (a[d] = !0));
                    }
                }
                var m = s.length > 0 ? this.createCombinedSchema(e, s).getResolvedSchema() : this.promise.resolve(void 0);
                return (this.cachedSchemaForResource = { resource: e, resolvedSchema: m }), m;
              }),
              (e.prototype.createCombinedSchema = function (e, t) {
                if (1 === t.length) return this.getOrAddSchemaHandle(t[0]);
                var n = "schemaservice://combinedSchema/" + encodeURIComponent(e),
                  r = {
                    allOf: t.map(function (e) {
                      return { $ref: e };
                    }),
                  };
                return this.addSchemaHandle(n, r);
              }),
              (e.prototype.getMatchingSchemas = function (e, t, n) {
                if (n) {
                  var r = n.id || "schemaservice://untitled/matchingSchemas/" + st++;
                  return this.resolveSchemaContent(new ot(n), r, {}).then(function (e) {
                    return t.getMatchingSchemas(e.schema).filter(function (e) {
                      return !e.inverted;
                    });
                  });
                }
                return this.getSchemaForResource(e.uri, t).then(function (e) {
                  return e
                    ? t.getMatchingSchemas(e.schema).filter(function (e) {
                        return !e.inverted;
                      })
                    : [];
                });
              });
          })(),
          0);
      function ut(e) {
        try {
          return tt.a.parse(e).toString();
        } catch (t) {
          return e;
        }
      }
      function ct(e) {
        try {
          var t = tt.a.parse(e);
          if ("file" === t.scheme) return t.fsPath;
        } catch (e) {}
        return e;
      }
      var lt = Fe(),
        ft =
          ((function () {
            function e(e, t) {
              (this.jsonSchemaService = e), (this.promise = t), (this.validationEnabled = !0);
            }
            (e.prototype.configure = function (e) {
              e && ((this.validationEnabled = !1 !== e.validate), (this.commentSeverity = e.allowComments ? void 0 : C.Error));
            }),
              (e.prototype.doValidation = function (e, t, n, r) {
                var i = this;
                if (!this.validationEnabled) return this.promise.resolve([]);
                var o = [],
                  a = {},
                  s = function (e) {
                    var t = e.range.start.line + " " + e.range.start.character + " " + e.message;
                    a[t] || ((a[t] = !0), o.push(e));
                  },
                  u = function (r) {
                    var a = n ? ht(n.trailingCommas) : C.Error,
                      u = n ? ht(n.comments) : i.commentSeverity,
                      c = (null == n ? void 0 : n.schemaValidation) ? ht(n.schemaValidation) : C.Warning,
                      l = (null == n ? void 0 : n.schemaRequest) ? ht(n.schemaRequest) : C.Warning;
                    if (r) {
                      if (r.errors.length && t.root && l) {
                        var f = t.root,
                          h = "object" === f.type ? f.properties[0] : void 0;
                        if (h && "$schema" === h.keyNode.value) {
                          var p = h.valueNode || h,
                            m = d.create(e.positionAt(p.offset), e.positionAt(p.offset + p.length));
                          s(I.create(m, r.errors[0], l, Te.SchemaResolveError));
                        } else {
                          m = d.create(e.positionAt(f.offset), e.positionAt(f.offset + 1));
                          s(I.create(m, r.errors[0], l, Te.SchemaResolveError));
                        }
                      } else if (c) {
                        var g = t.validate(e, r.schema, c);
                        g && g.forEach(s);
                      }
                      (function e(t) {
                        if (t && "object" == typeof t) {
                          if (K(t.allowComments)) return t.allowComments;
                          if (t.allOf)
                            for (var n = 0, r = t.allOf; n < r.length; n++) {
                              var i = r[n],
                                o = e(i);
                              if (K(o)) return o;
                            }
                        }
                        return;
                      })(r.schema) && (u = void 0),
                        (function e(t) {
                          if (t && "object" == typeof t) {
                            if (K(t.allowTrailingCommas)) return t.allowTrailingCommas;
                            var n = t;
                            if (K(n.allowsTrailingCommas)) return n.allowsTrailingCommas;
                            if (t.allOf)
                              for (var r = 0, i = t.allOf; r < i.length; r++) {
                                var o = i[r],
                                  a = e(o);
                                if (K(a)) return a;
                              }
                          }
                          return;
                        })(r.schema) && (a = void 0);
                    }
                    for (var v = 0, y = t.syntaxErrors; v < y.length; v++) {
                      var b = y[v];
                      if (b.code === Te.TrailingComma) {
                        if ("number" != typeof a) continue;
                        b.severity = a;
                      }
                      s(b);
                    }
                    if ("number" == typeof u) {
                      var x = lt("InvalidCommentToken", "Comments are not permitted in JSON.");
                      t.comments.forEach(function (e) {
                        s(I.create(e, x, u, Te.CommentNotPermitted));
                      });
                    }
                    return o;
                  };
                if (r) {
                  var c = r.id || "schemaservice://untitled/" + ft++;
                  return this.jsonSchemaService.resolveSchemaContent(new ot(r), c, {}).then(function (e) {
                    return u(e);
                  });
                }
                return this.jsonSchemaService.getSchemaForResource(e.uri, t).then(function (e) {
                  return u(e);
                });
              });
          })(),
          0);
      function ht(e) {
        switch (e) {
          case "error":
            return C.Error;
          case "warning":
            return C.Warning;
          case "ignore":
            return;
        }
      }
      function pt(e) {
        return e < 48 ? 0 : e <= 57 ? e - 48 : (e < 97 && (e += 32), e >= 97 && e <= 102 ? e - 97 + 10 : 0);
      }
      function dt(e) {
        if ("#" === e[0])
          switch (e.length) {
            case 4:
              return {
                red: (17 * pt(e.charCodeAt(1))) / 255,
                green: (17 * pt(e.charCodeAt(2))) / 255,
                blue: (17 * pt(e.charCodeAt(3))) / 255,
                alpha: 1,
              };
            case 5:
              return {
                red: (17 * pt(e.charCodeAt(1))) / 255,
                green: (17 * pt(e.charCodeAt(2))) / 255,
                blue: (17 * pt(e.charCodeAt(3))) / 255,
                alpha: (17 * pt(e.charCodeAt(4))) / 255,
              };
            case 7:
              return {
                red: (16 * pt(e.charCodeAt(1)) + pt(e.charCodeAt(2))) / 255,
                green: (16 * pt(e.charCodeAt(3)) + pt(e.charCodeAt(4))) / 255,
                blue: (16 * pt(e.charCodeAt(5)) + pt(e.charCodeAt(6))) / 255,
                alpha: 1,
              };
            case 9:
              return {
                red: (16 * pt(e.charCodeAt(1)) + pt(e.charCodeAt(2))) / 255,
                green: (16 * pt(e.charCodeAt(3)) + pt(e.charCodeAt(4))) / 255,
                blue: (16 * pt(e.charCodeAt(5)) + pt(e.charCodeAt(6))) / 255,
                alpha: (16 * pt(e.charCodeAt(7)) + pt(e.charCodeAt(8))) / 255,
              };
          }
      }
      !(function () {
        function e(e) {
          this.schemaService = e;
        }
        (e.prototype.findDocumentSymbols = function (e, t, n) {
          var r = this;
          void 0 === n && (n = { resultLimit: Number.MAX_VALUE });
          var i = t.root;
          if (!i) return [];
          var o = n.resultLimit || Number.MAX_VALUE,
            a = e.uri;
          if (
            ("vscode://defaultsettings/keybindings.json" === a || Ze(a.toLowerCase(), "/user/keybindings.json")) &&
            "array" === i.type
          ) {
            for (var s = [], u = 0, c = i.items; u < c.length; u++) {
              var l = c[u];
              if ("object" === l.type)
                for (var f = 0, h = l.properties; f < h.length; f++) {
                  var p = h[f];
                  if ("key" === p.keyNode.value && p.valueNode) {
                    var d = m.create(e.uri, mt(e, l));
                    if ((s.push({ name: ze(p.valueNode), kind: fe.Function, location: d }), --o <= 0))
                      return n && n.onResultLimitExceeded && n.onResultLimitExceeded(a), s;
                  }
                }
            }
            return s;
          }
          for (
            var g = [{ node: i, containerName: "" }],
              v = 0,
              y = !1,
              b = [],
              x = function (t, n) {
                "array" === t.type
                  ? t.items.forEach(function (e) {
                      e && g.push({ node: e, containerName: n });
                    })
                  : "object" === t.type &&
                    t.properties.forEach(function (t) {
                      var i = t.valueNode;
                      if (i)
                        if (o > 0) {
                          o--;
                          var a = m.create(e.uri, mt(e, t)),
                            s = n ? n + "." + t.keyNode.value : t.keyNode.value;
                          b.push({ name: r.getKeyLabel(t), kind: r.getSymbolKind(i.type), location: a, containerName: n }),
                            g.push({ node: i, containerName: s });
                        } else y = !0;
                    });
              };
            v < g.length;

          ) {
            var A = g[v++];
            x(A.node, A.containerName);
          }
          return y && n && n.onResultLimitExceeded && n.onResultLimitExceeded(a), b;
        }),
          (e.prototype.findDocumentSymbols2 = function (e, t, n) {
            var r = this;
            void 0 === n && (n = { resultLimit: Number.MAX_VALUE });
            var i = t.root;
            if (!i) return [];
            var o = n.resultLimit || Number.MAX_VALUE,
              a = e.uri;
            if (
              ("vscode://defaultsettings/keybindings.json" === a || Ze(a.toLowerCase(), "/user/keybindings.json")) &&
              "array" === i.type
            ) {
              for (var s = [], u = 0, c = i.items; u < c.length; u++) {
                var l = c[u];
                if ("object" === l.type)
                  for (var f = 0, h = l.properties; f < h.length; f++) {
                    var p = h[f];
                    if ("key" === p.keyNode.value && p.valueNode) {
                      var d = mt(e, l),
                        m = mt(e, p.keyNode);
                      if ((s.push({ name: ze(p.valueNode), kind: fe.Function, range: d, selectionRange: m }), --o <= 0))
                        return n && n.onResultLimitExceeded && n.onResultLimitExceeded(a), s;
                    }
                  }
              }
              return s;
            }
            for (
              var g = [],
                v = [{ node: i, result: g }],
                y = 0,
                b = !1,
                x = function (t, n) {
                  "array" === t.type
                    ? t.items.forEach(function (t, i) {
                        if (t)
                          if (o > 0) {
                            o--;
                            var a = mt(e, t),
                              s = a,
                              u = { name: String(i), kind: r.getSymbolKind(t.type), range: a, selectionRange: s, children: [] };
                            n.push(u), v.push({ result: u.children, node: t });
                          } else b = !0;
                      })
                    : "object" === t.type &&
                      t.properties.forEach(function (t) {
                        var i = t.valueNode;
                        if (i)
                          if (o > 0) {
                            o--;
                            var a = mt(e, t),
                              s = mt(e, t.keyNode),
                              u = [],
                              c = {
                                name: r.getKeyLabel(t),
                                kind: r.getSymbolKind(i.type),
                                range: a,
                                selectionRange: s,
                                children: u,
                                detail: r.getDetail(i),
                              };
                            n.push(c), v.push({ result: u, node: i });
                          } else b = !0;
                      });
                };
              y < v.length;

            ) {
              var A = v[y++];
              x(A.node, A.result);
            }
            return b && n && n.onResultLimitExceeded && n.onResultLimitExceeded(a), g;
          }),
          (e.prototype.getSymbolKind = function (e) {
            switch (e) {
              case "object":
                return fe.Module;
              case "string":
                return fe.String;
              case "number":
                return fe.Number;
              case "array":
                return fe.Array;
              case "boolean":
                return fe.Boolean;
              default:
                return fe.Variable;
            }
          }),
          (e.prototype.getKeyLabel = function (e) {
            var t = e.keyNode.value;
            return t && (t = t.replace(/[\n]/g, "↵")), t && t.trim() ? t : '"' + t + '"';
          }),
          (e.prototype.getDetail = function (e) {
            if (e)
              return "boolean" === e.type || "number" === e.type || "null" === e.type || "string" === e.type
                ? String(e.value)
                : "array" === e.type
                ? e.children.length
                  ? void 0
                  : "[]"
                : "object" === e.type
                ? e.children.length
                  ? void 0
                  : "{}"
                : void 0;
          }),
          (e.prototype.findDocumentColors = function (e, t, n) {
            return this.schemaService.getSchemaForResource(e.uri, t).then(function (r) {
              var i = [];
              if (r)
                for (
                  var o = n && "number" == typeof n.resultLimit ? n.resultLimit : Number.MAX_VALUE,
                    a = {},
                    s = 0,
                    u = t.getMatchingSchemas(r.schema);
                  s < u.length;
                  s++
                ) {
                  var c = u[s];
                  if (
                    !c.inverted &&
                    c.schema &&
                    ("color" === c.schema.format || "color-hex" === c.schema.format) &&
                    c.node &&
                    "string" === c.node.type
                  ) {
                    var l = String(c.node.offset);
                    if (!a[l]) {
                      var f = dt(ze(c.node));
                      if (f) {
                        var h = mt(e, c.node);
                        i.push({ color: f, range: h });
                      }
                      if (((a[l] = !0), --o <= 0)) return n && n.onResultLimitExceeded && n.onResultLimitExceeded(e.uri), i;
                    }
                  }
                }
              return i;
            });
          }),
          (e.prototype.getColorPresentations = function (e, t, n, r) {
            var i,
              o = [],
              a = Math.round(255 * n.red),
              s = Math.round(255 * n.green),
              u = Math.round(255 * n.blue);
            function c(e) {
              var t = e.toString(16);
              return 2 !== t.length ? "0" + t : t;
            }
            return (
              (i = 1 === n.alpha ? "#" + c(a) + c(s) + c(u) : "#" + c(a) + c(s) + c(u) + c(Math.round(255 * n.alpha))),
              o.push({ label: i, textEdit: T.replace(r, JSON.stringify(i)) }),
              o
            );
          });
      })();
      function mt(e, t) {
        return d.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length));
      }
      var gt = Fe(),
        vt = {
          schemaAssociations: [],
          schemas: {
            "http://json-schema.org/schema#": { $ref: "http://json-schema.org/draft-07/schema#" },
            "http://json-schema.org/draft-04/schema#": {
              title: gt("schema.json", "Describes a JSON file using a schema. See json-schema.org for more info."),
              $schema: "http://json-schema.org/draft-04/schema#",
              definitions: {
                schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } },
                positiveInteger: { type: "integer", minimum: 0 },
                positiveIntegerDefault0: { allOf: [{ $ref: "#/definitions/positiveInteger" }, { default: 0 }] },
                simpleTypes: { type: "string", enum: ["array", "boolean", "integer", "null", "number", "object", "string"] },
                stringArray: { type: "array", items: { type: "string" }, minItems: 1, uniqueItems: !0 },
              },
              type: "object",
              properties: {
                id: { type: "string", format: "uri" },
                $schema: { type: "string", format: "uri" },
                title: { type: "string" },
                description: { type: "string" },
                default: {},
                multipleOf: { type: "number", minimum: 0, exclusiveMinimum: !0 },
                maximum: { type: "number" },
                exclusiveMaximum: { type: "boolean", default: !1 },
                minimum: { type: "number" },
                exclusiveMinimum: { type: "boolean", default: !1 },
                maxLength: { allOf: [{ $ref: "#/definitions/positiveInteger" }] },
                minLength: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] },
                pattern: { type: "string", format: "regex" },
                additionalItems: { anyOf: [{ type: "boolean" }, { $ref: "#" }], default: {} },
                items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: {} },
                maxItems: { allOf: [{ $ref: "#/definitions/positiveInteger" }] },
                minItems: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] },
                uniqueItems: { type: "boolean", default: !1 },
                maxProperties: { allOf: [{ $ref: "#/definitions/positiveInteger" }] },
                minProperties: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] },
                required: { allOf: [{ $ref: "#/definitions/stringArray" }] },
                additionalProperties: { anyOf: [{ type: "boolean" }, { $ref: "#" }], default: {} },
                definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} },
                properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} },
                patternProperties: { type: "object", additionalProperties: { $ref: "#" }, default: {} },
                dependencies: {
                  type: "object",
                  additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] },
                },
                enum: { type: "array", minItems: 1, uniqueItems: !0 },
                type: {
                  anyOf: [
                    { $ref: "#/definitions/simpleTypes" },
                    { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 },
                  ],
                },
                format: {
                  anyOf: [
                    { type: "string", enum: ["date-time", "uri", "email", "hostname", "ipv4", "ipv6", "regex"] },
                    { type: "string" },
                  ],
                },
                allOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] },
                anyOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] },
                oneOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] },
                not: { allOf: [{ $ref: "#" }] },
              },
              dependencies: { exclusiveMaximum: ["maximum"], exclusiveMinimum: ["minimum"] },
              default: {},
            },
            "http://json-schema.org/draft-07/schema#": {
              title: gt("schema.json", "Describes a JSON file using a schema. See json-schema.org for more info."),
              definitions: {
                schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } },
                nonNegativeInteger: { type: "integer", minimum: 0 },
                nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] },
                simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] },
                stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] },
              },
              type: ["object", "boolean"],
              properties: {
                $id: { type: "string", format: "uri-reference" },
                $schema: { type: "string", format: "uri" },
                $ref: { type: "string", format: "uri-reference" },
                $comment: { type: "string" },
                title: { type: "string" },
                description: { type: "string" },
                default: !0,
                readOnly: { type: "boolean", default: !1 },
                examples: { type: "array", items: !0 },
                multipleOf: { type: "number", exclusiveMinimum: 0 },
                maximum: { type: "number" },
                exclusiveMaximum: { type: "number" },
                minimum: { type: "number" },
                exclusiveMinimum: { type: "number" },
                maxLength: { $ref: "#/definitions/nonNegativeInteger" },
                minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
                pattern: { type: "string", format: "regex" },
                additionalItems: { $ref: "#" },
                items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 },
                maxItems: { $ref: "#/definitions/nonNegativeInteger" },
                minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
                uniqueItems: { type: "boolean", default: !1 },
                contains: { $ref: "#" },
                maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
                minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
                required: { $ref: "#/definitions/stringArray" },
                additionalProperties: { $ref: "#" },
                definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} },
                properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} },
                patternProperties: {
                  type: "object",
                  additionalProperties: { $ref: "#" },
                  propertyNames: { format: "regex" },
                  default: {},
                },
                dependencies: {
                  type: "object",
                  additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] },
                },
                propertyNames: { $ref: "#" },
                const: !0,
                enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 },
                type: {
                  anyOf: [
                    { $ref: "#/definitions/simpleTypes" },
                    { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 },
                  ],
                },
                format: { type: "string" },
                contentMediaType: { type: "string" },
                contentEncoding: { type: "string" },
                if: { $ref: "#" },
                then: { $ref: "#" },
                else: { $ref: "#" },
                allOf: { $ref: "#/definitions/schemaArray" },
                anyOf: { $ref: "#/definitions/schemaArray" },
                oneOf: { $ref: "#/definitions/schemaArray" },
                not: { $ref: "#" },
              },
              default: !0,
            },
          },
        },
        yt = {
          id: gt("schema.json.id", "A unique identifier for the schema."),
          $schema: gt("schema.json.$schema", "The schema to verify this document against."),
          title: gt("schema.json.title", "A descriptive title of the element."),
          description: gt("schema.json.description", "A long description of the element. Used in hover menus and suggestions."),
          default: gt("schema.json.default", "A default value. Used by suggestions."),
          multipleOf: gt(
            "schema.json.multipleOf",
            "A number that should cleanly divide the current value (i.e. have no remainder)."
          ),
          maximum: gt("schema.json.maximum", "The maximum numerical value, inclusive by default."),
          exclusiveMaximum: gt("schema.json.exclusiveMaximum", "Makes the maximum property exclusive."),
          minimum: gt("schema.json.minimum", "The minimum numerical value, inclusive by default."),
          exclusiveMinimum: gt("schema.json.exclusiveMininum", "Makes the minimum property exclusive."),
          maxLength: gt("schema.json.maxLength", "The maximum length of a string."),
          minLength: gt("schema.json.minLength", "The minimum length of a string."),
          pattern: gt("schema.json.pattern", "A regular expression to match the string against. It is not implicitly anchored."),
          additionalItems: gt(
            "schema.json.additionalItems",
            "For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."
          ),
          items: gt(
            "schema.json.items",
            "For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."
          ),
          maxItems: gt("schema.json.maxItems", "The maximum number of items that can be inside an array. Inclusive."),
          minItems: gt("schema.json.minItems", "The minimum number of items that can be inside an array. Inclusive."),
          uniqueItems: gt("schema.json.uniqueItems", "If all of the items in the array must be unique. Defaults to false."),
          maxProperties: gt("schema.json.maxProperties", "The maximum number of properties an object can have. Inclusive."),
          minProperties: gt("schema.json.minProperties", "The minimum number of properties an object can have. Inclusive."),
          required: gt(
            "schema.json.required",
            "An array of strings that lists the names of all properties required on this object."
          ),
          additionalProperties: gt(
            "schema.json.additionalProperties",
            "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."
          ),
          definitions: gt(
            "schema.json.definitions",
            "Not used for validation. Place subschemas here that you wish to reference inline with $ref."
          ),
          properties: gt("schema.json.properties", "A map of property names to schemas for each property."),
          patternProperties: gt(
            "schema.json.patternProperties",
            "A map of regular expressions on property names to schemas for matching properties."
          ),
          dependencies: gt(
            "schema.json.dependencies",
            "A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."
          ),
          enum: gt("schema.json.enum", "The set of literal values that are valid."),
          type: gt(
            "schema.json.type",
            "Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."
          ),
          format: gt("schema.json.format", "Describes the format expected for the value."),
          allOf: gt("schema.json.allOf", "An array of schemas, all of which must match."),
          anyOf: gt("schema.json.anyOf", "An array of schemas, where at least one must match."),
          oneOf: gt("schema.json.oneOf", "An array of schemas, exactly one of which must match."),
          not: gt("schema.json.not", "A schema which must not match."),
          $id: gt("schema.json.$id", "A unique identifier for the schema."),
          $ref: gt("schema.json.$ref", "Reference a definition hosted on any location."),
          $comment: gt("schema.json.$comment", "Comments from schema authors to readers or maintainers of the schema."),
          readOnly: gt(
            "schema.json.readOnly",
            "Indicates that the value of the instance is managed exclusively by the owning authority."
          ),
          examples: gt(
            "schema.json.examples",
            "Sample JSON values associated with a particular schema, for the purpose of illustrating usage."
          ),
          contains: gt(
            "schema.json.contains",
            'An array instance is valid against "contains" if at least one of its elements is valid against the given schema.'
          ),
          propertyNames: gt(
            "schema.json.propertyNames",
            "If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."
          ),
          const: gt(
            "schema.json.const",
            "An instance validates successfully against this keyword if its value is equal to the value of the keyword."
          ),
          contentMediaType: gt("schema.json.contentMediaType", "Describes the media type of a string property."),
          contentEncoding: gt("schema.json.contentEncoding", "Describes the content encoding of a string property."),
          if: gt(
            "schema.json.if",
            'The validation outcome of the "if" subschema controls which of the "then" or "else" keywords are evaluated.'
          ),
          then: gt("schema.json.then", 'The "if" subschema is used for validation when the "if" subschema succeeds.'),
          else: gt("schema.json.else", 'The "else" subschema is used for validation when the "if" subschema fails.'),
        };
      for (var bt in vt.schemas) {
        var xt = vt.schemas[bt];
        for (var At in xt.properties) {
          var St = xt.properties[At];
          "boolean" == typeof St && (St = xt.properties[At] = {});
          var Ct = yt[At];
          Ct ? (St.description = Ct) : console.log(At + ": localize('schema.json." + At + '\', "")');
        }
      }
      var kt = (function () {
        function e(e, t, n) {
          var r = this;
          (this._languageId = e), (this._worker = t), (this._disposables = []), (this._listener = Object.create(null));
          var o = function (e) {
              var t,
                n = e.getModeId();
              n === r._languageId &&
                ((r._listener[e.uri.toString()] = e.onDidChangeContent(function () {
                  clearTimeout(t),
                    (t = setTimeout(function () {
                      return r._doValidate(e.uri, n);
                    }, 500));
                })),
                r._doValidate(e.uri, n));
            },
            a = function (e) {
              i.editor.setModelMarkers(e, r._languageId, []);
              var t = e.uri.toString(),
                n = r._listener[t];
              n && (n.dispose(), delete r._listener[t]);
            };
          this._disposables.push(i.editor.onDidCreateModel(o)),
            this._disposables.push(
              i.editor.onWillDisposeModel(function (e) {
                a(e), r._resetSchema(e.uri);
              })
            ),
            this._disposables.push(
              i.editor.onDidChangeModelLanguage(function (e) {
                a(e.model), o(e.model), r._resetSchema(e.model.uri);
              })
            ),
            this._disposables.push(
              n.onDidChange(function (e) {
                i.editor.getModels().forEach(function (e) {
                  e.getModeId() === r._languageId && (a(e), o(e));
                });
              })
            ),
            this._disposables.push({
              dispose: function () {
                for (var e in (i.editor.getModels().forEach(a), r._listener)) r._listener[e].dispose();
              },
            }),
            i.editor.getModels().forEach(o);
        }
        return (
          (e.prototype.dispose = function () {
            this._disposables.forEach(function (e) {
              return e && e.dispose();
            }),
              (this._disposables = []);
          }),
          (e.prototype._resetSchema = function (e) {
            this._worker().then(function (t) {
              t.resetSchema(e.toString());
            });
          }),
          (e.prototype._doValidate = function (e, t) {
            this._worker(e)
              .then(function (n) {
                return n.doValidation(e.toString()).then(function (n) {
                  var r = n.map(function (e) {
                      return (
                        (n = "number" == typeof (t = e).code ? String(t.code) : t.code),
                        {
                          severity: wt(t.severity),
                          startLineNumber: t.range.start.line + 1,
                          startColumn: t.range.start.character + 1,
                          endLineNumber: t.range.end.line + 1,
                          endColumn: t.range.end.character + 1,
                          message: t.message,
                          code: n,
                          source: t.source,
                        }
                      );
                      var t, n;
                    }),
                    o = i.editor.getModel(e);
                  o && o.getModeId() === t && i.editor.setModelMarkers(o, t, r);
                });
              })
              .then(void 0, function (e) {
                console.error(e);
              });
          }),
          e
        );
      })();
      function wt(e) {
        switch (e) {
          case C.Error:
            return i.MarkerSeverity.Error;
          case C.Warning:
            return i.MarkerSeverity.Warning;
          case C.Information:
            return i.MarkerSeverity.Info;
          case C.Hint:
            return i.MarkerSeverity.Hint;
          default:
            return i.MarkerSeverity.Info;
        }
      }
      function It(e) {
        if (e) return { character: e.column - 1, line: e.lineNumber - 1 };
      }
      function Et(e) {
        if (e)
          return {
            start: { line: e.startLineNumber - 1, character: e.startColumn - 1 },
            end: { line: e.endLineNumber - 1, character: e.endColumn - 1 },
          };
      }
      function Tt(e) {
        if (e) return new i.Range(e.start.line + 1, e.start.character + 1, e.end.line + 1, e.end.character + 1);
      }
      function jt(e) {
        var t = i.languages.CompletionItemKind;
        switch (e) {
          case Q.Text:
            return t.Text;
          case Q.Method:
            return t.Method;
          case Q.Function:
            return t.Function;
          case Q.Constructor:
            return t.Constructor;
          case Q.Field:
            return t.Field;
          case Q.Variable:
            return t.Variable;
          case Q.Class:
            return t.Class;
          case Q.Interface:
            return t.Interface;
          case Q.Module:
            return t.Module;
          case Q.Property:
            return t.Property;
          case Q.Unit:
            return t.Unit;
          case Q.Value:
            return t.Value;
          case Q.Enum:
            return t.Enum;
          case Q.Keyword:
            return t.Keyword;
          case Q.Snippet:
            return t.Snippet;
          case Q.Color:
            return t.Color;
          case Q.File:
            return t.File;
          case Q.Reference:
            return t.Reference;
        }
        return t.Property;
      }
      function Ot(e) {
        if (e) return { range: Tt(e.range), text: e.newText };
      }
      var _t = (function () {
        function e(e) {
          this._worker = e;
        }
        return (
          Object.defineProperty(e.prototype, "triggerCharacters", {
            get: function () {
              return [" ", ":"];
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.provideCompletionItems = function (e, t, n, r) {
            var o = e.uri;
            return this._worker(o)
              .then(function (e) {
                return e.doComplete(o.toString(), It(t));
              })
              .then(function (n) {
                if (n) {
                  var r = e.getWordUntilPosition(t),
                    o = new i.Range(t.lineNumber, r.startColumn, t.lineNumber, r.endColumn),
                    a = n.items.map(function (e) {
                      var t,
                        n = {
                          label: e.label,
                          insertText: e.insertText || e.label,
                          sortText: e.sortText,
                          filterText: e.filterText,
                          documentation: e.documentation,
                          detail: e.detail,
                          range: o,
                          kind: jt(e.kind),
                        };
                      return (
                        e.textEdit &&
                          (void 0 !== (t = e.textEdit).insert && void 0 !== t.replace
                            ? (n.range = { insert: Tt(e.textEdit.insert), replace: Tt(e.textEdit.replace) })
                            : (n.range = Tt(e.textEdit.range)),
                          (n.insertText = e.textEdit.newText)),
                        e.additionalTextEdits && (n.additionalTextEdits = e.additionalTextEdits.map(Ot)),
                        e.insertTextFormat === Y.Snippet &&
                          (n.insertTextRules = i.languages.CompletionItemInsertTextRule.InsertAsSnippet),
                        n
                      );
                    });
                  return { isIncomplete: n.isIncomplete, suggestions: a };
                }
              });
          }),
          e
        );
      })();
      function Mt(e) {
        return "string" == typeof e
          ? { value: e }
          : (t = e) && "object" == typeof t && "string" == typeof t.kind
          ? "plaintext" === e.kind
            ? { value: e.value.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&") }
            : { value: e.value }
          : { value: "```" + e.language + "\n" + e.value + "\n```\n" };
        var t;
      }
      function Pt(e) {
        if (e) return Array.isArray(e) ? e.map(Mt) : [Mt(e)];
      }
      var Vt = (function () {
        function e(e) {
          this._worker = e;
        }
        return (
          (e.prototype.provideHover = function (e, t, n) {
            var r = e.uri;
            return this._worker(r)
              .then(function (e) {
                return e.doHover(r.toString(), It(t));
              })
              .then(function (e) {
                if (e) return { range: Tt(e.range), contents: Pt(e.contents) };
              });
          }),
          e
        );
      })();
      function Nt(e) {
        var t = i.languages.SymbolKind;
        switch (e) {
          case fe.File:
            return t.Array;
          case fe.Module:
            return t.Module;
          case fe.Namespace:
            return t.Namespace;
          case fe.Package:
            return t.Package;
          case fe.Class:
            return t.Class;
          case fe.Method:
            return t.Method;
          case fe.Property:
            return t.Property;
          case fe.Field:
            return t.Field;
          case fe.Constructor:
            return t.Constructor;
          case fe.Enum:
            return t.Enum;
          case fe.Interface:
            return t.Interface;
          case fe.Function:
            return t.Function;
          case fe.Variable:
            return t.Variable;
          case fe.Constant:
            return t.Constant;
          case fe.String:
            return t.String;
          case fe.Number:
            return t.Number;
          case fe.Boolean:
            return t.Boolean;
          case fe.Array:
            return t.Array;
        }
        return t.Function;
      }
      var Ft = (function () {
        function e(e) {
          this._worker = e;
        }
        return (
          (e.prototype.provideDocumentSymbols = function (e, t) {
            var n = e.uri;
            return this._worker(n)
              .then(function (e) {
                return e.findDocumentSymbols(n.toString());
              })
              .then(function (e) {
                if (e)
                  return e.map(function (e) {
                    return {
                      name: e.name,
                      detail: "",
                      containerName: e.containerName,
                      kind: Nt(e.kind),
                      range: Tt(e.location.range),
                      selectionRange: Tt(e.location.range),
                      tags: [],
                    };
                  });
              });
          }),
          e
        );
      })();
      function Rt(e) {
        return { tabSize: e.tabSize, insertSpaces: e.insertSpaces };
      }
      var $t = (function () {
          function e(e) {
            this._worker = e;
          }
          return (
            (e.prototype.provideDocumentFormattingEdits = function (e, t, n) {
              var r = e.uri;
              return this._worker(r).then(function (e) {
                return e.format(r.toString(), null, Rt(t)).then(function (e) {
                  if (e && 0 !== e.length) return e.map(Ot);
                });
              });
            }),
            e
          );
        })(),
        Lt = (function () {
          function e(e) {
            this._worker = e;
          }
          return (
            (e.prototype.provideDocumentRangeFormattingEdits = function (e, t, n, r) {
              var i = e.uri;
              return this._worker(i).then(function (e) {
                return e.format(i.toString(), Et(t), Rt(n)).then(function (e) {
                  if (e && 0 !== e.length) return e.map(Ot);
                });
              });
            }),
            e
          );
        })(),
        Dt = (function () {
          function e(e) {
            this._worker = e;
          }
          return (
            (e.prototype.provideDocumentColors = function (e, t) {
              var n = e.uri;
              return this._worker(n)
                .then(function (e) {
                  return e.findDocumentColors(n.toString());
                })
                .then(function (e) {
                  if (e)
                    return e.map(function (e) {
                      return { color: e.color, range: Tt(e.range) };
                    });
                });
            }),
            (e.prototype.provideColorPresentations = function (e, t, n) {
              var r = e.uri;
              return this._worker(r)
                .then(function (e) {
                  return e.getColorPresentations(r.toString(), t.color, Et(t.range));
                })
                .then(function (e) {
                  if (e)
                    return e.map(function (e) {
                      var t = { label: e.label };
                      return (
                        e.textEdit && (t.textEdit = Ot(e.textEdit)),
                        e.additionalTextEdits && (t.additionalTextEdits = e.additionalTextEdits.map(Ot)),
                        t
                      );
                    });
                });
            }),
            e
          );
        })(),
        Ut = (function () {
          function e(e) {
            this._worker = e;
          }
          return (
            (e.prototype.provideFoldingRanges = function (e, t, n) {
              var r = e.uri;
              return this._worker(r)
                .then(function (e) {
                  return e.getFoldingRanges(r.toString(), t);
                })
                .then(function (e) {
                  if (e)
                    return e.map(function (e) {
                      var t = { start: e.startLine + 1, end: e.endLine + 1 };
                      return (
                        void 0 !== e.kind &&
                          (t.kind = (function (e) {
                            switch (e) {
                              case x.Comment:
                                return i.languages.FoldingRangeKind.Comment;
                              case x.Imports:
                                return i.languages.FoldingRangeKind.Imports;
                              case x.Region:
                                return i.languages.FoldingRangeKind.Region;
                            }
                            return;
                          })(e.kind)),
                        t
                      );
                    });
                });
            }),
            e
          );
        })();
      var Wt = (function () {
        function e(e) {
          this._worker = e;
        }
        return (
          (e.prototype.provideSelectionRanges = function (e, t, n) {
            var r = e.uri;
            return this._worker(r)
              .then(function (e) {
                return e.getSelectionRanges(r.toString(), t.map(It));
              })
              .then(function (e) {
                if (e)
                  return e.map(function (e) {
                    for (var t = []; e; ) t.push({ range: Tt(e.range) }), (e = e.parent);
                    return t;
                  });
              });
          }),
          e
        );
      })();
      function qt(e) {
        return {
          getInitialState: function () {
            return new Kt(null, null, !1, null);
          },
          tokenize: function (t, n, r, i) {
            return (function (e, t, n, r, i) {
              void 0 === r && (r = 0);
              var o = 0,
                a = !1;
              switch (n.scanError) {
                case 2:
                  (t = '"' + t), (o = 1);
                  break;
                case 1:
                  (t = "/*" + t), (o = 2);
              }
              var s = R(t),
                u = n.lastWasColon,
                c = n.parents,
                l = { tokens: [], endState: n.clone() };
              for (;;) {
                var f = r + s.getPosition(),
                  h = "",
                  p = s.scan();
                if (17 === p) break;
                if (f === r + s.getPosition())
                  throw new Error("Scanner did not advance, next 3 characters are: " + t.substr(s.getPosition(), 3));
                switch ((a && (f -= o), (a = o > 0), p)) {
                  case 1:
                    (c = Bt.push(c, 0)), (h = "delimiter.bracket.json"), (u = !1);
                    break;
                  case 2:
                    (c = Bt.pop(c)), (h = "delimiter.bracket.json"), (u = !1);
                    break;
                  case 3:
                    (c = Bt.push(c, 1)), (h = "delimiter.array.json"), (u = !1);
                    break;
                  case 4:
                    (c = Bt.pop(c)), (h = "delimiter.array.json"), (u = !1);
                    break;
                  case 6:
                    (h = "delimiter.colon.json"), (u = !0);
                    break;
                  case 5:
                    (h = "delimiter.comma.json"), (u = !1);
                    break;
                  case 8:
                  case 9:
                  case 7:
                    (h = "keyword.json"), (u = !1);
                    break;
                  case 10:
                    var d = 1 === (c ? c.type : 0);
                    (h = u || d ? "string.value.json" : "string.key.json"), (u = !1);
                    break;
                  case 11:
                    (h = "number.json"), (u = !1);
                }
                if (e)
                  switch (p) {
                    case 12:
                      h = "comment.line.json";
                      break;
                    case 13:
                      h = "comment.block.json";
                  }
                (l.endState = new Kt(n.getStateData(), s.getTokenError(), u, c)), l.tokens.push({ startIndex: f, scopes: h });
              }
              return l;
            })(e, t, n, r);
          },
        };
      }
      var Bt = (function () {
          function e(e, t) {
            (this.parent = e), (this.type = t);
          }
          return (
            (e.pop = function (e) {
              return e ? e.parent : null;
            }),
            (e.push = function (t, n) {
              return new e(t, n);
            }),
            (e.equals = function (e, t) {
              if (!e && !t) return !0;
              if (!e || !t) return !1;
              for (; e && t; ) {
                if (e === t) return !0;
                if (e.type !== t.type) return !1;
                (e = e.parent), (t = t.parent);
              }
              return !0;
            }),
            e
          );
        })(),
        Kt = (function () {
          function e(e, t, n, r) {
            (this._state = e), (this.scanError = t), (this.lastWasColon = n), (this.parents = r);
          }
          return (
            (e.prototype.clone = function () {
              return new e(this._state, this.scanError, this.lastWasColon, this.parents);
            }),
            (e.prototype.equals = function (t) {
              return (
                t === this ||
                (!!(t && t instanceof e) &&
                  this.scanError === t.scanError &&
                  this.lastWasColon === t.lastWasColon &&
                  Bt.equals(this.parents, t.parents))
              );
            }),
            (e.prototype.getStateData = function () {
              return this._state;
            }),
            (e.prototype.setStateData = function (e) {
              this._state = e;
            }),
            e
          );
        })();
      function Jt(e) {
        var t = [],
          n = [],
          r = new o(e);
        t.push(r);
        var a = function () {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
          return r.getLanguageServiceWorker.apply(r, e);
        };
        function s() {
          var t = e.languageId,
            r = e.modeConfiguration;
          Ht(n),
            r.documentFormattingEdits && n.push(i.languages.registerDocumentFormattingEditProvider(t, new $t(a))),
            r.documentRangeFormattingEdits && n.push(i.languages.registerDocumentRangeFormattingEditProvider(t, new Lt(a))),
            r.completionItems && n.push(i.languages.registerCompletionItemProvider(t, new _t(a))),
            r.hovers && n.push(i.languages.registerHoverProvider(t, new Vt(a))),
            r.documentSymbols && n.push(i.languages.registerDocumentSymbolProvider(t, new Ft(a))),
            r.tokens && n.push(i.languages.setTokensProvider(t, qt(!0))),
            r.colors && n.push(i.languages.registerColorProvider(t, new Dt(a))),
            r.foldingRanges && n.push(i.languages.registerFoldingRangeProvider(t, new Ut(a))),
            r.diagnostics && n.push(new kt(t, a, e)),
            r.selectionRanges && n.push(i.languages.registerSelectionRangeProvider(t, new Wt(a)));
        }
        s(), t.push(i.languages.setLanguageConfiguration(e.languageId, Gt));
        var u = e.modeConfiguration;
        return (
          e.onDidChange(function (e) {
            e.modeConfiguration !== u && ((u = e.modeConfiguration), s());
          }),
          t.push(zt(n)),
          zt(t)
        );
      }
      function zt(e) {
        return {
          dispose: function () {
            return Ht(e);
          },
        };
      }
      function Ht(e) {
        for (; e.length; ) e.pop().dispose();
      }
      var Gt = {
        wordPattern: /(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,
        comments: { lineComment: "//", blockComment: ["/*", "*/"] },
        brackets: [
          ["{", "}"],
          ["[", "]"],
        ],
        autoClosingPairs: [
          { open: "{", close: "}", notIn: ["string"] },
          { open: "[", close: "]", notIn: ["string"] },
          { open: '"', close: '"', notIn: ["string"] },
        ],
      };
    },
    395: function (e, t, n) {
      "use strict";
      (function (e) {
        var r;
        n.d(t, "a", function () {
          return i;
        }),
          (r = (() => {
            var t = {
                470: (t) => {
                  function n(e) {
                    if ("string" != typeof e) throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
                  }
                  function r(e, t) {
                    for (var n, r = "", i = 0, o = -1, a = 0, s = 0; s <= e.length; ++s) {
                      if (s < e.length) n = e.charCodeAt(s);
                      else {
                        if (47 === n) break;
                        n = 47;
                      }
                      if (47 === n) {
                        if (o === s - 1 || 1 === a);
                        else if (o !== s - 1 && 2 === a) {
                          if (r.length < 2 || 2 !== i || 46 !== r.charCodeAt(r.length - 1) || 46 !== r.charCodeAt(r.length - 2))
                            if (r.length > 2) {
                              var u = r.lastIndexOf("/");
                              if (u !== r.length - 1) {
                                -1 === u ? ((r = ""), (i = 0)) : (i = (r = r.slice(0, u)).length - 1 - r.lastIndexOf("/")),
                                  (o = s),
                                  (a = 0);
                                continue;
                              }
                            } else if (2 === r.length || 1 === r.length) {
                              (r = ""), (i = 0), (o = s), (a = 0);
                              continue;
                            }
                          t && (r.length > 0 ? (r += "/..") : (r = ".."), (i = 2));
                        } else r.length > 0 ? (r += "/" + e.slice(o + 1, s)) : (r = e.slice(o + 1, s)), (i = s - o - 1);
                        (o = s), (a = 0);
                      } else 46 === n && -1 !== a ? ++a : (a = -1);
                    }
                    return r;
                  }
                  var i = {
                    resolve: function () {
                      for (var t, i = "", o = !1, a = arguments.length - 1; a >= -1 && !o; a--) {
                        var s;
                        a >= 0 ? (s = arguments[a]) : (void 0 === t && (t = e.cwd()), (s = t)),
                          n(s),
                          0 !== s.length && ((i = s + "/" + i), (o = 47 === s.charCodeAt(0)));
                      }
                      return (i = r(i, !o)), o ? (i.length > 0 ? "/" + i : "/") : i.length > 0 ? i : ".";
                    },
                    normalize: function (e) {
                      if ((n(e), 0 === e.length)) return ".";
                      var t = 47 === e.charCodeAt(0),
                        i = 47 === e.charCodeAt(e.length - 1);
                      return 0 !== (e = r(e, !t)).length || t || (e = "."), e.length > 0 && i && (e += "/"), t ? "/" + e : e;
                    },
                    isAbsolute: function (e) {
                      return n(e), e.length > 0 && 47 === e.charCodeAt(0);
                    },
                    join: function () {
                      if (0 === arguments.length) return ".";
                      for (var e, t = 0; t < arguments.length; ++t) {
                        var r = arguments[t];
                        n(r), r.length > 0 && (void 0 === e ? (e = r) : (e += "/" + r));
                      }
                      return void 0 === e ? "." : i.normalize(e);
                    },
                    relative: function (e, t) {
                      if ((n(e), n(t), e === t)) return "";
                      if ((e = i.resolve(e)) === (t = i.resolve(t))) return "";
                      for (var r = 1; r < e.length && 47 === e.charCodeAt(r); ++r);
                      for (var o = e.length, a = o - r, s = 1; s < t.length && 47 === t.charCodeAt(s); ++s);
                      for (var u = t.length - s, c = a < u ? a : u, l = -1, f = 0; f <= c; ++f) {
                        if (f === c) {
                          if (u > c) {
                            if (47 === t.charCodeAt(s + f)) return t.slice(s + f + 1);
                            if (0 === f) return t.slice(s + f);
                          } else a > c && (47 === e.charCodeAt(r + f) ? (l = f) : 0 === f && (l = 0));
                          break;
                        }
                        var h = e.charCodeAt(r + f);
                        if (h !== t.charCodeAt(s + f)) break;
                        47 === h && (l = f);
                      }
                      var p = "";
                      for (f = r + l + 1; f <= o; ++f)
                        (f !== o && 47 !== e.charCodeAt(f)) || (0 === p.length ? (p += "..") : (p += "/.."));
                      return p.length > 0 ? p + t.slice(s + l) : ((s += l), 47 === t.charCodeAt(s) && ++s, t.slice(s));
                    },
                    _makeLong: function (e) {
                      return e;
                    },
                    dirname: function (e) {
                      if ((n(e), 0 === e.length)) return ".";
                      for (var t = e.charCodeAt(0), r = 47 === t, i = -1, o = !0, a = e.length - 1; a >= 1; --a)
                        if (47 === (t = e.charCodeAt(a))) {
                          if (!o) {
                            i = a;
                            break;
                          }
                        } else o = !1;
                      return -1 === i ? (r ? "/" : ".") : r && 1 === i ? "//" : e.slice(0, i);
                    },
                    basename: function (e, t) {
                      if (void 0 !== t && "string" != typeof t) throw new TypeError('"ext" argument must be a string');
                      n(e);
                      var r,
                        i = 0,
                        o = -1,
                        a = !0;
                      if (void 0 !== t && t.length > 0 && t.length <= e.length) {
                        if (t.length === e.length && t === e) return "";
                        var s = t.length - 1,
                          u = -1;
                        for (r = e.length - 1; r >= 0; --r) {
                          var c = e.charCodeAt(r);
                          if (47 === c) {
                            if (!a) {
                              i = r + 1;
                              break;
                            }
                          } else
                            -1 === u && ((a = !1), (u = r + 1)),
                              s >= 0 && (c === t.charCodeAt(s) ? -1 == --s && (o = r) : ((s = -1), (o = u)));
                        }
                        return i === o ? (o = u) : -1 === o && (o = e.length), e.slice(i, o);
                      }
                      for (r = e.length - 1; r >= 0; --r)
                        if (47 === e.charCodeAt(r)) {
                          if (!a) {
                            i = r + 1;
                            break;
                          }
                        } else -1 === o && ((a = !1), (o = r + 1));
                      return -1 === o ? "" : e.slice(i, o);
                    },
                    extname: function (e) {
                      n(e);
                      for (var t = -1, r = 0, i = -1, o = !0, a = 0, s = e.length - 1; s >= 0; --s) {
                        var u = e.charCodeAt(s);
                        if (47 !== u)
                          -1 === i && ((o = !1), (i = s + 1)),
                            46 === u ? (-1 === t ? (t = s) : 1 !== a && (a = 1)) : -1 !== t && (a = -1);
                        else if (!o) {
                          r = s + 1;
                          break;
                        }
                      }
                      return -1 === t || -1 === i || 0 === a || (1 === a && t === i - 1 && t === r + 1) ? "" : e.slice(t, i);
                    },
                    format: function (e) {
                      if (null === e || "object" != typeof e)
                        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
                      return (function (e, t) {
                        var n = t.dir || t.root,
                          r = t.base || (t.name || "") + (t.ext || "");
                        return n ? (n === t.root ? n + r : n + "/" + r) : r;
                      })(0, e);
                    },
                    parse: function (e) {
                      n(e);
                      var t = { root: "", dir: "", base: "", ext: "", name: "" };
                      if (0 === e.length) return t;
                      var r,
                        i = e.charCodeAt(0),
                        o = 47 === i;
                      o ? ((t.root = "/"), (r = 1)) : (r = 0);
                      for (var a = -1, s = 0, u = -1, c = !0, l = e.length - 1, f = 0; l >= r; --l)
                        if (47 !== (i = e.charCodeAt(l)))
                          -1 === u && ((c = !1), (u = l + 1)),
                            46 === i ? (-1 === a ? (a = l) : 1 !== f && (f = 1)) : -1 !== a && (f = -1);
                        else if (!c) {
                          s = l + 1;
                          break;
                        }
                      return (
                        -1 === a || -1 === u || 0 === f || (1 === f && a === u - 1 && a === s + 1)
                          ? -1 !== u && (t.base = t.name = 0 === s && o ? e.slice(1, u) : e.slice(s, u))
                          : (0 === s && o
                              ? ((t.name = e.slice(1, a)), (t.base = e.slice(1, u)))
                              : ((t.name = e.slice(s, a)), (t.base = e.slice(s, u))),
                            (t.ext = e.slice(a, u))),
                        s > 0 ? (t.dir = e.slice(0, s - 1)) : o && (t.dir = "/"),
                        t
                      );
                    },
                    sep: "/",
                    delimiter: ":",
                    win32: null,
                    posix: null,
                  };
                  (i.posix = i), (t.exports = i);
                },
                447: (t, n, r) => {
                  var i;
                  if ((r.r(n), r.d(n, { URI: () => m, Utils: () => w }), "object" == typeof e)) i = "win32" === e.platform;
                  else if ("object" == typeof navigator) {
                    var o = navigator.userAgent;
                    i = o.indexOf("Windows") >= 0;
                  }
                  var a,
                    s,
                    u =
                      ((a = function (e, t) {
                        return (a =
                          Object.setPrototypeOf ||
                          ({ __proto__: [] } instanceof Array &&
                            function (e, t) {
                              e.__proto__ = t;
                            }) ||
                          function (e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                          })(e, t);
                      }),
                      function (e, t) {
                        function n() {
                          this.constructor = e;
                        }
                        a(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
                      }),
                    c = /^\w[\w\d+.-]*$/,
                    l = /^\//,
                    f = /^\/\//,
                    h = "",
                    p = "/",
                    d = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
                    m = (function () {
                      function e(e, t, n, r, i, o) {
                        void 0 === o && (o = !1),
                          "object" == typeof e
                            ? ((this.scheme = e.scheme || h),
                              (this.authority = e.authority || h),
                              (this.path = e.path || h),
                              (this.query = e.query || h),
                              (this.fragment = e.fragment || h))
                            : ((this.scheme = (function (e, t) {
                                return e || t ? e : "file";
                              })(e, o)),
                              (this.authority = t || h),
                              (this.path = (function (e, t) {
                                switch (e) {
                                  case "https":
                                  case "http":
                                  case "file":
                                    t ? t[0] !== p && (t = p + t) : (t = p);
                                }
                                return t;
                              })(this.scheme, n || h)),
                              (this.query = r || h),
                              (this.fragment = i || h),
                              (function (e, t) {
                                if (!e.scheme && t)
                                  throw new Error(
                                    '[UriError]: Scheme is missing: {scheme: "", authority: "' +
                                      e.authority +
                                      '", path: "' +
                                      e.path +
                                      '", query: "' +
                                      e.query +
                                      '", fragment: "' +
                                      e.fragment +
                                      '"}'
                                  );
                                if (e.scheme && !c.test(e.scheme))
                                  throw new Error("[UriError]: Scheme contains illegal characters.");
                                if (e.path)
                                  if (e.authority) {
                                    if (!l.test(e.path))
                                      throw new Error(
                                        '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
                                      );
                                  } else if (f.test(e.path))
                                    throw new Error(
                                      '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
                                    );
                              })(this, o));
                      }
                      return (
                        (e.isUri = function (t) {
                          return (
                            t instanceof e ||
                            (!!t &&
                              "string" == typeof t.authority &&
                              "string" == typeof t.fragment &&
                              "string" == typeof t.path &&
                              "string" == typeof t.query &&
                              "string" == typeof t.scheme &&
                              "function" == typeof t.fsPath &&
                              "function" == typeof t.with &&
                              "function" == typeof t.toString)
                          );
                        }),
                        Object.defineProperty(e.prototype, "fsPath", {
                          get: function () {
                            return A(this, !1);
                          },
                          enumerable: !1,
                          configurable: !0,
                        }),
                        (e.prototype.with = function (e) {
                          if (!e) return this;
                          var t = e.scheme,
                            n = e.authority,
                            r = e.path,
                            i = e.query,
                            o = e.fragment;
                          return (
                            void 0 === t ? (t = this.scheme) : null === t && (t = h),
                            void 0 === n ? (n = this.authority) : null === n && (n = h),
                            void 0 === r ? (r = this.path) : null === r && (r = h),
                            void 0 === i ? (i = this.query) : null === i && (i = h),
                            void 0 === o ? (o = this.fragment) : null === o && (o = h),
                            t === this.scheme &&
                            n === this.authority &&
                            r === this.path &&
                            i === this.query &&
                            o === this.fragment
                              ? this
                              : new v(t, n, r, i, o)
                          );
                        }),
                        (e.parse = function (e, t) {
                          void 0 === t && (t = !1);
                          var n = d.exec(e);
                          return n
                            ? new v(n[2] || h, k(n[4] || h), k(n[5] || h), k(n[7] || h), k(n[9] || h), t)
                            : new v(h, h, h, h, h);
                        }),
                        (e.file = function (e) {
                          var t = h;
                          if ((i && (e = e.replace(/\\/g, p)), e[0] === p && e[1] === p)) {
                            var n = e.indexOf(p, 2);
                            -1 === n ? ((t = e.substring(2)), (e = p)) : ((t = e.substring(2, n)), (e = e.substring(n) || p));
                          }
                          return new v("file", t, e, h, h);
                        }),
                        (e.from = function (e) {
                          return new v(e.scheme, e.authority, e.path, e.query, e.fragment);
                        }),
                        (e.prototype.toString = function (e) {
                          return void 0 === e && (e = !1), S(this, e);
                        }),
                        (e.prototype.toJSON = function () {
                          return this;
                        }),
                        (e.revive = function (t) {
                          if (t) {
                            if (t instanceof e) return t;
                            var n = new v(t);
                            return (n._formatted = t.external), (n._fsPath = t._sep === g ? t.fsPath : null), n;
                          }
                          return t;
                        }),
                        e
                      );
                    })(),
                    g = i ? 1 : void 0,
                    v = (function (e) {
                      function t() {
                        var t = (null !== e && e.apply(this, arguments)) || this;
                        return (t._formatted = null), (t._fsPath = null), t;
                      }
                      return (
                        u(t, e),
                        Object.defineProperty(t.prototype, "fsPath", {
                          get: function () {
                            return this._fsPath || (this._fsPath = A(this, !1)), this._fsPath;
                          },
                          enumerable: !1,
                          configurable: !0,
                        }),
                        (t.prototype.toString = function (e) {
                          return (
                            void 0 === e && (e = !1),
                            e ? S(this, !0) : (this._formatted || (this._formatted = S(this, !1)), this._formatted)
                          );
                        }),
                        (t.prototype.toJSON = function () {
                          var e = { $mid: 1 };
                          return (
                            this._fsPath && ((e.fsPath = this._fsPath), (e._sep = g)),
                            this._formatted && (e.external = this._formatted),
                            this.path && (e.path = this.path),
                            this.scheme && (e.scheme = this.scheme),
                            this.authority && (e.authority = this.authority),
                            this.query && (e.query = this.query),
                            this.fragment && (e.fragment = this.fragment),
                            e
                          );
                        }),
                        t
                      );
                    })(m),
                    y =
                      (((s = {})[58] = "%3A"),
                      (s[47] = "%2F"),
                      (s[63] = "%3F"),
                      (s[35] = "%23"),
                      (s[91] = "%5B"),
                      (s[93] = "%5D"),
                      (s[64] = "%40"),
                      (s[33] = "%21"),
                      (s[36] = "%24"),
                      (s[38] = "%26"),
                      (s[39] = "%27"),
                      (s[40] = "%28"),
                      (s[41] = "%29"),
                      (s[42] = "%2A"),
                      (s[43] = "%2B"),
                      (s[44] = "%2C"),
                      (s[59] = "%3B"),
                      (s[61] = "%3D"),
                      (s[32] = "%20"),
                      s);
                  function b(e, t) {
                    for (var n = void 0, r = -1, i = 0; i < e.length; i++) {
                      var o = e.charCodeAt(i);
                      if (
                        (o >= 97 && o <= 122) ||
                        (o >= 65 && o <= 90) ||
                        (o >= 48 && o <= 57) ||
                        45 === o ||
                        46 === o ||
                        95 === o ||
                        126 === o ||
                        (t && 47 === o)
                      )
                        -1 !== r && ((n += encodeURIComponent(e.substring(r, i))), (r = -1)), void 0 !== n && (n += e.charAt(i));
                      else {
                        void 0 === n && (n = e.substr(0, i));
                        var a = y[o];
                        void 0 !== a
                          ? (-1 !== r && ((n += encodeURIComponent(e.substring(r, i))), (r = -1)), (n += a))
                          : -1 === r && (r = i);
                      }
                    }
                    return -1 !== r && (n += encodeURIComponent(e.substring(r))), void 0 !== n ? n : e;
                  }
                  function x(e) {
                    for (var t = void 0, n = 0; n < e.length; n++) {
                      var r = e.charCodeAt(n);
                      35 === r || 63 === r ? (void 0 === t && (t = e.substr(0, n)), (t += y[r])) : void 0 !== t && (t += e[n]);
                    }
                    return void 0 !== t ? t : e;
                  }
                  function A(e, t) {
                    var n;
                    return (
                      (n =
                        e.authority && e.path.length > 1 && "file" === e.scheme
                          ? "//" + e.authority + e.path
                          : 47 === e.path.charCodeAt(0) &&
                            ((e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90) ||
                              (e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122)) &&
                            58 === e.path.charCodeAt(2)
                          ? t
                            ? e.path.substr(1)
                            : e.path[1].toLowerCase() + e.path.substr(2)
                          : e.path),
                      i && (n = n.replace(/\//g, "\\")),
                      n
                    );
                  }
                  function S(e, t) {
                    var n = t ? x : b,
                      r = "",
                      i = e.scheme,
                      o = e.authority,
                      a = e.path,
                      s = e.query,
                      u = e.fragment;
                    if ((i && ((r += i), (r += ":")), (o || "file" === i) && ((r += p), (r += p)), o)) {
                      var c = o.indexOf("@");
                      if (-1 !== c) {
                        var l = o.substr(0, c);
                        (o = o.substr(c + 1)),
                          -1 === (c = l.indexOf(":"))
                            ? (r += n(l, !1))
                            : ((r += n(l.substr(0, c), !1)), (r += ":"), (r += n(l.substr(c + 1), !1))),
                          (r += "@");
                      }
                      -1 === (c = (o = o.toLowerCase()).indexOf(":"))
                        ? (r += n(o, !1))
                        : ((r += n(o.substr(0, c), !1)), (r += o.substr(c)));
                    }
                    if (a) {
                      if (a.length >= 3 && 47 === a.charCodeAt(0) && 58 === a.charCodeAt(2))
                        (f = a.charCodeAt(1)) >= 65 && f <= 90 && (a = "/" + String.fromCharCode(f + 32) + ":" + a.substr(3));
                      else if (a.length >= 2 && 58 === a.charCodeAt(1)) {
                        var f;
                        (f = a.charCodeAt(0)) >= 65 && f <= 90 && (a = String.fromCharCode(f + 32) + ":" + a.substr(2));
                      }
                      r += n(a, !0);
                    }
                    return s && ((r += "?"), (r += n(s, !1))), u && ((r += "#"), (r += t ? u : b(u, !1))), r;
                  }
                  var C = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
                  function k(e) {
                    return e.match(C)
                      ? e.replace(C, function (e) {
                          return (function e(t) {
                            try {
                              return decodeURIComponent(t);
                            } catch (n) {
                              return t.length > 3 ? t.substr(0, 3) + e(t.substr(3)) : t;
                            }
                          })(e);
                        })
                      : e;
                  }
                  var w,
                    I = r(470),
                    E = function () {
                      for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
                      var r = Array(e),
                        i = 0;
                      for (t = 0; t < n; t++) for (var o = arguments[t], a = 0, s = o.length; a < s; a++, i++) r[i] = o[a];
                      return r;
                    },
                    T = I.posix || I;
                  !(function (e) {
                    (e.joinPath = function (e) {
                      for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                      return e.with({ path: T.join.apply(T, E([e.path], t)) });
                    }),
                      (e.resolvePath = function (e) {
                        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                        var r = e.path || "/";
                        return e.with({ path: T.resolve.apply(T, E([r], t)) });
                      }),
                      (e.dirname = function (e) {
                        var t = T.dirname(e.path);
                        return 1 === t.length && 46 === t.charCodeAt(0) ? e : e.with({ path: t });
                      }),
                      (e.basename = function (e) {
                        return T.basename(e.path);
                      }),
                      (e.extname = function (e) {
                        return T.extname(e.path);
                      });
                  })(w || (w = {}));
                },
              },
              n = {};
            function r(e) {
              if (n[e]) return n[e].exports;
              var i = (n[e] = { exports: {} });
              return t[e](i, i.exports, r), i.exports;
            }
            return (
              (r.d = (e, t) => {
                for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
              }),
              (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
              (r.r = (e) => {
                "undefined" != typeof Symbol &&
                  Symbol.toStringTag &&
                  Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
                  Object.defineProperty(e, "__esModule", { value: !0 });
              }),
              r(447)
            );
          })());
        const { URI: i, Utils: o } = r;
      }.call(this, n(205)));
    },
  },
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy9qc29uYy1wYXJzZXIvaW1wbC9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vd29ya2VyTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy9qc29uYy1wYXJzZXIvaW1wbC9zY2FubmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL2pzb25jLXBhcnNlci9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci10eXBlcy9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL3ZzY29kZS1qc29uLWxhbmd1YWdlc2VydmljZS91dGlscy9vYmplY3RzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL3ZzY29kZS1sYW5ndWFnZXNlcnZlci10ZXh0ZG9jdW1lbnQvbGliL2VzbS9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL3ZzY29kZS1qc29uLWxhbmd1YWdlc2VydmljZS9qc29uTGFuZ3VhZ2VUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9maWxsZXJzL3ZzY29kZS1ubHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vX2RlcHMvdnNjb2RlLWpzb24tbGFuZ3VhZ2VzZXJ2aWNlL3BhcnNlci9qc29uUGFyc2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL3ZzY29kZS1qc29uLWxhbmd1YWdlc2VydmljZS91dGlscy9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL3ZzY29kZS1qc29uLWxhbmd1YWdlc2VydmljZS9zZXJ2aWNlcy9qc29uQ29tcGxldGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy92c2NvZGUtanNvbi1sYW5ndWFnZXNlcnZpY2UvdXRpbHMvanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy92c2NvZGUtanNvbi1sYW5ndWFnZXNlcnZpY2Uvc2VydmljZXMvanNvbkhvdmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL19kZXBzL3ZzY29kZS1qc29uLWxhbmd1YWdlc2VydmljZS9zZXJ2aWNlcy9qc29uU2NoZW1hU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy92c2NvZGUtanNvbi1sYW5ndWFnZXNlcnZpY2Uvc2VydmljZXMvanNvblZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vX2RlcHMvdnNjb2RlLWpzb24tbGFuZ3VhZ2VzZXJ2aWNlL3V0aWxzL2NvbG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy92c2NvZGUtanNvbi1sYW5ndWFnZXNlcnZpY2Uvc2VydmljZXMvanNvbkRvY3VtZW50U3ltYm9scy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy92c2NvZGUtanNvbi1sYW5ndWFnZXNlcnZpY2Uvc2VydmljZXMvY29uZmlndXJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9sYW5ndWFnZUZlYXR1cmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL3Rva2VuaXphdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9qc29uTW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9fZGVwcy92c2NvZGUtdXJpL2luZGV4LmpzIl0sIm5hbWVzIjpbIlBhcnNlT3B0aW9ucyIsIldvcmtlck1hbmFnZXIiLCJkZWZhdWx0cyIsIl90aGlzIiwidGhpcyIsIl9kZWZhdWx0cyIsIl93b3JrZXIiLCJfaWRsZUNoZWNrSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsIl9jaGVja0lmSWRsZSIsIl9sYXN0VXNlZFRpbWUiLCJfY29uZmlnQ2hhbmdlTGlzdGVuZXIiLCJvbkRpZENoYW5nZSIsIl9zdG9wV29ya2VyIiwicHJvdG90eXBlIiwiZGlzcG9zZSIsIl9jbGllbnQiLCJjbGVhckludGVydmFsIiwiRGF0ZSIsIm5vdyIsIl9nZXRDbGllbnQiLCJjcmVhdGVXZWJXb3JrZXIiLCJtb2R1bGVJZCIsImxhYmVsIiwibGFuZ3VhZ2VJZCIsImNyZWF0ZURhdGEiLCJsYW5ndWFnZVNldHRpbmdzIiwiZGlhZ25vc3RpY3NPcHRpb25zIiwiZW5hYmxlU2NoZW1hUmVxdWVzdCIsImdldFByb3h5IiwiZ2V0TGFuZ3VhZ2VTZXJ2aWNlV29ya2VyIiwicmVzb3VyY2VzIiwiX2kiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ0aGVuIiwiY2xpZW50IiwiXyIsIndpdGhTeW5jZWRSZXNvdXJjZXMiLCJjcmVhdGVTY2FubmVyIiwidGV4dCIsImlnbm9yZVRyaXZpYSIsImxlbiIsInBvcyIsInZhbHVlIiwidG9rZW5PZmZzZXQiLCJ0b2tlbiIsImxpbmVOdW1iZXIiLCJsaW5lU3RhcnRPZmZzZXQiLCJ0b2tlbkxpbmVTdGFydE9mZnNldCIsInByZXZUb2tlbkxpbmVTdGFydE9mZnNldCIsInNjYW5FcnJvciIsInNjYW5IZXhEaWdpdHMiLCJjb3VudCIsImV4YWN0IiwiZGlnaXRzIiwiY2giLCJjaGFyQ29kZUF0Iiwic2Nhbk5leHQiLCJjb2RlIiwiaXNXaGl0ZVNwYWNlIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiaXNMaW5lQnJlYWsiLCJyZXN1bHQiLCJzdGFydCIsInN1YnN0cmluZyIsImNoMyIsInNjYW5TdHJpbmciLCJzYWZlTGVuZ3RoIiwiY29tbWVudENsb3NlZCIsImlzRGlnaXQiLCJlbmQiLCJzY2FuTnVtYmVyIiwiaXNVbmtub3duQ29udGVudENoYXJhY3RlciIsInNldFBvc2l0aW9uIiwibmV3UG9zaXRpb24iLCJnZXRQb3NpdGlvbiIsInNjYW4iLCJnZXRUb2tlbiIsImdldFRva2VuVmFsdWUiLCJnZXRUb2tlbk9mZnNldCIsImdldFRva2VuTGVuZ3RoIiwiZ2V0VG9rZW5TdGFydExpbmUiLCJnZXRUb2tlblN0YXJ0Q2hhcmFjdGVyIiwiZ2V0VG9rZW5FcnJvciIsInZpc2l0IiwidmlzaXRvciIsIm9wdGlvbnMiLCJERUZBVUxUIiwiX3NjYW5uZXIiLCJ0b05vQXJnVmlzaXQiLCJ2aXNpdEZ1bmN0aW9uIiwidG9PbmVBcmdWaXNpdCIsImFyZyIsIm9uT2JqZWN0QmVnaW4iLCJvbk9iamVjdFByb3BlcnR5Iiwib25PYmplY3RFbmQiLCJvbkFycmF5QmVnaW4iLCJvbkFycmF5RW5kIiwib25MaXRlcmFsVmFsdWUiLCJvblNlcGFyYXRvciIsIm9uQ29tbWVudCIsIm9uRXJyb3IiLCJkaXNhbGxvd0NvbW1lbnRzIiwiYWxsb3dUcmFpbGluZ0NvbW1hIiwiaGFuZGxlRXJyb3IiLCJlcnJvciIsInNraXBVbnRpbEFmdGVyIiwic2tpcFVudGlsIiwiaW5kZXhPZiIsInBhcnNlU3RyaW5nIiwiaXNWYWx1ZSIsInBhcnNlVmFsdWUiLCJuZWVkc0NvbW1hIiwicGFyc2VBcnJheSIsInBhcnNlT2JqZWN0IiwidG9rZW5WYWx1ZSIsIk51bWJlciIsImlzTmFOIiwicGFyc2VMaXRlcmFsIiwiYWxsb3dFbXB0eUNvbnRlbnQiLCJpbnRlZ2VyIiwidWludGVnZXIiLCJQb3NpdGlvbiIsIlJhbmdlIiwiTG9jYXRpb24iLCJMb2NhdGlvbkxpbmsiLCJDb2xvciIsIkNvbG9ySW5mb3JtYXRpb24iLCJDb2xvclByZXNlbnRhdGlvbiIsIkZvbGRpbmdSYW5nZUtpbmQiLCJGb2xkaW5nUmFuZ2UiLCJEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uIiwiRGlhZ25vc3RpY1NldmVyaXR5IiwiRGlhZ25vc3RpY1RhZyIsIkNvZGVEZXNjcmlwdGlvbiIsIkRpYWdub3N0aWMiLCJDb21tYW5kIiwiVGV4dEVkaXQiLCJDaGFuZ2VBbm5vdGF0aW9uIiwiQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIiLCJBbm5vdGF0ZWRUZXh0RWRpdCIsIlRleHREb2N1bWVudEVkaXQiLCJDcmVhdGVGaWxlIiwiUmVuYW1lRmlsZSIsIkRlbGV0ZUZpbGUiLCJXb3Jrc3BhY2VFZGl0IiwiZXJyb3JzIiwiY3VycmVudFByb3BlcnR5IiwiY3VycmVudFBhcmVudCIsInByZXZpb3VzUGFyZW50cyIsIm9uVmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwib2JqZWN0IiwibmFtZSIsInBvcCIsImFycmF5Iiwib2Zmc2V0IiwiZmluZE5vZGVBdE9mZnNldCIsIm5vZGUiLCJpbmNsdWRlUmlnaHRCb3VuZCIsImNvbnRhaW5zIiwiY2hpbGRyZW4iLCJpIiwiaXRlbSIsImdldE5vZGVQYXRoIiwicGFyZW50IiwicGF0aCIsInR5cGUiLCJrZXkiLCJpbmRleCIsImdldE5vZGVWYWx1ZSIsIm1hcCIsIm9iaiIsIk9iamVjdCIsImNyZWF0ZSIsIl9hIiwicHJvcCIsInZhbHVlTm9kZSIsImVxdWFscyIsIm9uZSIsIm90aGVyIiwib25lS2V5cyIsInNvcnQiLCJvdGhlcktleXMiLCJpc051bWJlciIsInZhbCIsImlzRGVmaW5lZCIsImlzQm9vbGVhbiIsIk1JTl9WQUxVRSIsIk1BWF9WQUxVRSIsImxpbmUiLCJjaGFyYWN0ZXIiLCJpcyIsImNhbmRpZGF0ZSIsIklzIiwib2JqZWN0TGl0ZXJhbCIsInR3byIsInRocmVlIiwiZm91ciIsIkVycm9yIiwidXJpIiwicmFuZ2UiLCJkZWZpbmVkIiwic3RyaW5nIiwidW5kZWZpbmVkIiwidGFyZ2V0VXJpIiwidGFyZ2V0UmFuZ2UiLCJ0YXJnZXRTZWxlY3Rpb25SYW5nZSIsIm9yaWdpblNlbGVjdGlvblJhbmdlIiwicmVkIiwiZ3JlZW4iLCJibHVlIiwiYWxwaGEiLCJudW1iZXJSYW5nZSIsImNvbG9yIiwidGV4dEVkaXQiLCJhZGRpdGlvbmFsVGV4dEVkaXRzIiwidHlwZWRBcnJheSIsInN0YXJ0TGluZSIsImVuZExpbmUiLCJzdGFydENoYXJhY3RlciIsImVuZENoYXJhY3RlciIsImtpbmQiLCJsb2NhdGlvbiIsIm1lc3NhZ2UiLCJXYXJuaW5nIiwiSW5mb3JtYXRpb24iLCJIaW50IiwiVW5uZWNlc3NhcnkiLCJEZXByZWNhdGVkIiwiaHJlZiIsInNldmVyaXR5Iiwic291cmNlIiwicmVsYXRlZEluZm9ybWF0aW9uIiwibnVtYmVyIiwiY29kZURlc2NyaXB0aW9uIiwidGl0bGUiLCJjb21tYW5kIiwiYXJncyIsInJlcGxhY2UiLCJuZXdUZXh0IiwiaW5zZXJ0IiwicG9zaXRpb24iLCJkZWwiLCJuZWVkc0NvbmZpcm1hdGlvbiIsImRlc2NyaXB0aW9uIiwiYm9vbGVhbiIsImFubm90YXRpb24iLCJhbm5vdGF0aW9uSWQiLCJ0ZXh0RG9jdW1lbnQiLCJlZGl0cyIsIk9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllciIsIm92ZXJ3cml0ZSIsImlnbm9yZUlmRXhpc3RzIiwib2xkVXJpIiwibmV3VXJpIiwicmVjdXJzaXZlIiwiaWdub3JlSWZOb3RFeGlzdHMiLCJjaGFuZ2VzIiwiZG9jdW1lbnRDaGFuZ2VzIiwiZXZlcnkiLCJjaGFuZ2UiLCJUZXh0RG9jdW1lbnRJZGVudGlmaWVyIiwiVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllciIsIlRleHREb2N1bWVudEl0ZW0iLCJNYXJrdXBLaW5kIiwiTWFya3VwQ29udGVudCIsIkNvbXBsZXRpb25JdGVtS2luZCIsIkluc2VydFRleHRGb3JtYXQiLCJDb21wbGV0aW9uSXRlbVRhZyIsIkluc2VydFJlcGxhY2VFZGl0IiwiSW5zZXJ0VGV4dE1vZGUiLCJDb21wbGV0aW9uSXRlbSIsIkNvbXBsZXRpb25MaXN0IiwiTWFya2VkU3RyaW5nIiwiSG92ZXIiLCJQYXJhbWV0ZXJJbmZvcm1hdGlvbiIsIlNpZ25hdHVyZUluZm9ybWF0aW9uIiwiRG9jdW1lbnRIaWdobGlnaHRLaW5kIiwiRG9jdW1lbnRIaWdobGlnaHQiLCJTeW1ib2xLaW5kIiwiU3ltYm9sVGFnIiwiU3ltYm9sSW5mb3JtYXRpb24iLCJEb2N1bWVudFN5bWJvbCIsIkNvZGVBY3Rpb25LaW5kIiwiQ29kZUFjdGlvbkNvbnRleHQiLCJDb2RlQWN0aW9uIiwiQ29kZUxlbnMiLCJGb3JtYXR0aW5nT3B0aW9ucyIsIkRvY3VtZW50TGluayIsIlNlbGVjdGlvblJhbmdlIiwiVGV4dEVkaXRDaGFuZ2VJbXBsIiwiY2hhbmdlQW5ub3RhdGlvbnMiLCJlZGl0IiwiaWQiLCJhc3NlcnRDaGFuZ2VBbm5vdGF0aW9ucyIsIm1hbmFnZSIsImRlbGV0ZSIsImFkZCIsImFsbCIsImNsZWFyIiwic3BsaWNlIiwiQ2hhbmdlQW5ub3RhdGlvbnMiLCJhbm5vdGF0aW9ucyIsIl9hbm5vdGF0aW9ucyIsIl9jb3VudGVyIiwiX3NpemUiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJpZE9yQW5ub3RhdGlvbiIsIm5leHRJZCIsInRvU3RyaW5nIiwiV29ya3NwYWNlQ2hhbmdlIiwid29ya3NwYWNlRWRpdCIsIl90ZXh0RWRpdENoYW5nZXMiLCJfd29ya3NwYWNlRWRpdCIsIl9jaGFuZ2VBbm5vdGF0aW9ucyIsImZvckVhY2giLCJ0ZXh0RWRpdENoYW5nZSIsImtleXMiLCJpbml0RG9jdW1lbnRDaGFuZ2VzIiwic2l6ZSIsImdldFRleHRFZGl0Q2hhbmdlIiwidmVyc2lvbiIsInRleHREb2N1bWVudEVkaXQiLCJpbml0Q2hhbmdlcyIsImNyZWF0ZUZpbGUiLCJvcHRpb25zT3JBbm5vdGF0aW9uIiwib3BlcmF0aW9uIiwicmVuYW1lRmlsZSIsImRlbGV0ZUZpbGUiLCJQbGFpblRleHQiLCJNYXJrZG93biIsIlRleHQiLCJNZXRob2QiLCJGdW5jdGlvbiIsIkNvbnN0cnVjdG9yIiwiRmllbGQiLCJWYXJpYWJsZSIsIkNsYXNzIiwiSW50ZXJmYWNlIiwiTW9kdWxlIiwiUHJvcGVydHkiLCJVbml0IiwiVmFsdWUiLCJFbnVtIiwiS2V5d29yZCIsIlNuaXBwZXQiLCJGaWxlIiwiUmVmZXJlbmNlIiwiRm9sZGVyIiwiRW51bU1lbWJlciIsIkNvbnN0YW50IiwiU3RydWN0IiwiRXZlbnQiLCJPcGVyYXRvciIsIlR5cGVQYXJhbWV0ZXIiLCJhc0lzIiwiYWRqdXN0SW5kZW50YXRpb24iLCJpdGVtcyIsImlzSW5jb21wbGV0ZSIsImZyb21QbGFpblRleHQiLCJwbGFpblRleHQiLCJsYW5ndWFnZSIsImNvbnRlbnRzIiwiZG9jdW1lbnRhdGlvbiIsInBhcmFtZXRlcnMiLCJSZWFkIiwiV3JpdGUiLCJOYW1lc3BhY2UiLCJQYWNrYWdlIiwiQm9vbGVhbiIsIktleSIsIk51bGwiLCJjb250YWluZXJOYW1lIiwiZGV0YWlsIiwic2VsZWN0aW9uUmFuZ2UiLCJkZXByZWNhdGVkIiwidGFncyIsIkVtcHR5IiwiUXVpY2tGaXgiLCJSZWZhY3RvciIsIlJlZmFjdG9yRXh0cmFjdCIsIlJlZmFjdG9ySW5saW5lIiwiUmVmYWN0b3JSZXdyaXRlIiwiU291cmNlIiwiU291cmNlT3JnYW5pemVJbXBvcnRzIiwiU291cmNlRml4QWxsIiwiZGlhZ25vc3RpY3MiLCJvbmx5Iiwia2luZE9yQ29tbWFuZE9yRWRpdCIsImNoZWNrS2luZCIsImlzUHJlZmVycmVkIiwiZGF0YSIsInRhYlNpemUiLCJpbnNlcnRTcGFjZXMiLCJ0YXJnZXQiLCJUZXh0RG9jdW1lbnQiLCJjb250ZW50IiwiRnVsbFRleHREb2N1bWVudCIsImxpbmVDb3VudCIsImZ1bmMiLCJnZXRUZXh0IiwicG9zaXRpb25BdCIsIm9mZnNldEF0IiwiYXBwbHlFZGl0cyIsImRvY3VtZW50Iiwic29ydGVkRWRpdHMiLCJtZXJnZVNvcnQiLCJjb21wYXJlIiwicCIsImxlZnQiLCJzbGljZSIsInJpZ2h0IiwibGVmdElkeCIsInJpZ2h0SWR4IiwicmV0IiwiYSIsImIiLCJkaWZmIiwibGFzdE1vZGlmaWVkT2Zmc2V0IiwiZSIsInN0YXJ0T2Zmc2V0IiwiZW5kT2Zmc2V0IiwiX3VyaSIsIl9sYW5ndWFnZUlkIiwiX3ZlcnNpb24iLCJfY29udGVudCIsIl9saW5lT2Zmc2V0cyIsInVwZGF0ZSIsImV2ZW50IiwiZ2V0TGluZU9mZnNldHMiLCJsaW5lT2Zmc2V0cyIsImlzTGluZVN0YXJ0IiwiY2hhckF0IiwiTWF0aCIsIm1heCIsIm1pbiIsImxvdyIsImhpZ2giLCJtaWQiLCJmbG9vciIsImxpbmVPZmZzZXQiLCJuZXh0TGluZU9mZnNldCIsImNhbGwiLCJjaGVjayIsIkVycm9yQ29kZSIsImNoYW5nZXNfMSIsImlzSW5jcmVtZW50YWwiLCJnZXRXZWxsZm9ybWVkUmFuZ2UiLCJhZGRlZExpbmVPZmZzZXRzIiwiY29tcHV0ZUxpbmVPZmZzZXRzIiwiYXBwbHkiLCJjb25jYXQiLCJpc0Z1bGwiLCJyYW5nZUxlbmd0aCIsImlzQXRMaW5lU3RhcnQiLCJ0ZXh0T2Zmc2V0IiwiZ2V0V2VsbGZvcm1lZEVkaXQiLCJtYXRjaCIsInJlc3QiLCJsb2NhbGl6ZSIsImxvYWRNZXNzYWdlQnVuZGxlIiwiZmlsZSIsInNwYW5zIiwic29ydGVkRWRpdHNfMSIsInN1YnN0ciIsImpvaW4iLCJMQVRFU1QiLCJjb21wbGV0aW9uIiwiY29tcGxldGlvbkl0ZW0iLCJkb2N1bWVudGF0aW9uRm9ybWF0IiwiY29tbWl0Q2hhcmFjdGVyc1N1cHBvcnQiLCJleHRlbmRTdGF0aWNzIiwiRW51bU1hdGNoIiwiX19leHRlbmRzIiwiZCIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiaGFzT3duUHJvcGVydHkiLCJfXyIsImNvbnN0cnVjdG9yIiwiZm9ybWF0cyIsImVycm9yTWVzc2FnZSIsInBhdHRlcm4iLCJBU1ROb2RlSW1wbCIsIl9zdXBlciIsIk51bGxBU1ROb2RlSW1wbCIsIkJvb2xlYW5BU1ROb2RlSW1wbCIsImJvb2xWYWx1ZSIsIkFycmF5QVNUTm9kZUltcGwiLCJOdW1iZXJBU1ROb2RlSW1wbCIsImlzSW50ZWdlciIsIk5hTiIsIlN0cmluZ0FTVE5vZGVJbXBsIiwiUHJvcGVydHlBU1ROb2RlSW1wbCIsImtleU5vZGUiLCJjb2xvbk9mZnNldCIsIk9iamVjdEFTVE5vZGVJbXBsIiwicHJvcGVydGllcyIsImFzU2NoZW1hIiwic2NoZW1hIiwiU2NoZW1hQ29sbGVjdG9yIiwiZm9jdXNPZmZzZXQiLCJleGNsdWRlIiwic2NoZW1hcyIsIm1lcmdlIiwiaW5jbHVkZSIsIm5ld1N1YiIsIk5vT3BTY2hlbWFDb2xsZWN0b3IiLCJpbnN0YW5jZSIsIlZhbGlkYXRpb25SZXN1bHQiLCJwcm9ibGVtcyIsInByb3BlcnRpZXNNYXRjaGVzIiwicHJvcGVydGllc1ZhbHVlTWF0Y2hlcyIsInByaW1hcnlWYWx1ZU1hdGNoZXMiLCJlbnVtVmFsdWVNYXRjaCIsImVudW1WYWx1ZXMiLCJoYXNQcm9ibGVtcyIsIm1lcmdlQWxsIiwidmFsaWRhdGlvblJlc3VsdHMiLCJ2YWxpZGF0aW9uUmVzdWx0c18xIiwidmFsaWRhdGlvblJlc3VsdCIsIm1lcmdlRW51bVZhbHVlcyIsIkVudW1WYWx1ZU1pc21hdGNoIiwidiIsIkpTT04iLCJzdHJpbmdpZnkiLCJtZXJnZVByb3BlcnR5TWF0Y2giLCJwcm9wZXJ0eVZhbGlkYXRpb25SZXN1bHQiLCJKU09ORG9jdW1lbnQiLCJyb290Iiwic3ludGF4RXJyb3JzIiwiY29tbWVudHMiLCJnZXROb2RlRnJvbU9mZnNldCIsImRvVmlzaXRfMSIsImN0biIsInZhbGlkYXRlIiwiZ2V0TWF0Y2hpbmdTY2hlbWFzIiwibWF0Y2hpbmdTY2hlbWFzIiwibiIsInNlZW5LZXlzIiwidW5wcm9jZXNzZWRQcm9wZXJ0aWVzIiwicHJvcGVydHlOb2RlIiwicmVxdWlyZWQiLCJfYiIsIl9jIiwicHJvcGVydHlOYW1lIiwicHJvcGVydHlQcm9jZXNzZWQiLCJfZCIsIl9lIiwicHJvcGVydHlTY2hlbWEiLCJjaGlsZCIsInBhdHRlcm5Qcm9wZXJ0aWVzIiwiX2YiLCJfZyIsInByb3BlcnR5UGF0dGVybiIsInJlZ2V4IiwiUmVnRXhwIiwiX2giLCJfaiIsInRlc3QiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsIl9rIiwidW5wcm9jZXNzZWRQcm9wZXJ0aWVzXzEiLCJfbCIsInVucHJvY2Vzc2VkUHJvcGVydGllc18yIiwibWF4UHJvcGVydGllcyIsIm1pblByb3BlcnRpZXMiLCJkZXBlbmRlbmNpZXMiLCJfbSIsIl9vIiwicHJvcGVydHlEZXAiLCJfcCIsInByb3BlcnR5RGVwXzEiLCJyZXF1aXJlZFByb3AiLCJwcm9wZXJ0eU5hbWVzIiwiX3EiLCJfciIsImYiLCJfdmFsaWRhdGVPYmplY3ROb2RlIiwic3ViU2NoZW1hcyIsInN1YlNjaGVtYSIsIml0ZW1WYWxpZGF0aW9uUmVzdWx0IiwiYWRkaXRpb25hbEl0ZW1zIiwiaXRlbVNjaGVtYSIsImNvbnRhaW5zU2NoZW1hIiwic29tZSIsIm1pbkl0ZW1zIiwibWF4SXRlbXMiLCJ1bmlxdWVJdGVtcyIsInZhbHVlc18xIiwibGFzdEluZGV4T2YiLCJfdmFsaWRhdGVBcnJheU5vZGUiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJwYXR0ZXJuRXJyb3JNZXNzYWdlIiwiZm9ybWF0IiwiZXhlYyIsIl92YWxpZGF0ZVN0cmluZ05vZGUiLCJub3JtYWxpemVGbG9hdHMiLCJmbG9hdCIsInBhcnRzIiwibXVsdGlwbGllciIsInBhcnNlSW50IiwibXVsdGlwbGVPZiIsInJlbWFpbmRlciIsIm5vcm1NdWx0aXBsZU9mIiwibm9ybVZhbHVlIiwicG93IiwiYWJzIiwiZ2V0RXhjbHVzaXZlTGltaXQiLCJsaW1pdCIsImV4Y2x1c2l2ZSIsImdldExpbWl0IiwiZXhjbHVzaXZlTWluaW11bSIsIm1pbmltdW0iLCJleGNsdXNpdmVNYXhpbXVtIiwibWF4aW11bSIsIl92YWxpZGF0ZU51bWJlck5vZGUiLCJtYXRjaGVzVHlwZSIsImFsbE9mIiwic3ViU2NoZW1hUmVmIiwibm90U2NoZW1hIiwibm90Iiwic3ViVmFsaWRhdGlvblJlc3VsdCIsInN1Yk1hdGNoaW5nU2NoZW1hcyIsIm1zIiwiaW52ZXJ0ZWQiLCJ0ZXN0QWx0ZXJuYXRpdmVzIiwiYWx0ZXJuYXRpdmVzIiwibWF4T25lTWF0Y2giLCJtYXRjaGVzIiwiYmVzdE1hdGNoIiwiYWx0ZXJuYXRpdmVzXzEiLCJjb21wYXJlUmVzdWx0IiwiYW55T2YiLCJvbmVPZiIsInRlc3RCcmFuY2giLCJpZlNjaGVtYSIsImlmIiwidGhlblNjaGVtYSIsImVsc2VTY2hlbWEiLCJ0ZXN0Q29uZGl0aW9uIiwiZWxzZSIsImVudW0iLCJjb25zdCIsImRlcHJlY2F0aW9uTWVzc2FnZSIsIl92YWxpZGF0ZU5vZGUiLCJlbmRzV2l0aCIsImhheXN0YWNrIiwibmVlZGxlIiwiY29udmVydFNpbXBsZTJSZWdFeHBQYXR0ZXJuIiwiSlNPTkNvbXBsZXRpb24iLCJzY2hlbWFTZXJ2aWNlIiwiY29udHJpYnV0aW9ucyIsInByb21pc2VDb25zdHJ1Y3RvciIsImNsaWVudENhcGFiaWxpdGllcyIsIlByb21pc2UiLCJkb1Jlc29sdmUiLCJyZXNvbHZlQ29tcGxldGlvbiIsInJlc29sdmVyIiwicmVzb2x2ZSIsImRvQ29tcGxldGUiLCJkb2MiLCJpc0luQ29tbWVudCIsIm92ZXJ3cml0ZVJhbmdlIiwiY3VycmVudFdvcmQiLCJnZXRDdXJyZW50V29yZCIsIm92ZXJ3cml0ZVN0YXJ0IiwicHJvcG9zZWQiLCJjb2xsZWN0b3IiLCJzdWdnZXN0aW9uIiwiZXhpc3RpbmciLCJzaG9ydGVuZGVkTGFiZWwiLCJ0cmltIiwiaW5zZXJ0VGV4dCIsInNldEFzSW5jb21wbGV0ZSIsImNvbnNvbGUiLCJsb2ciLCJnZXROdW1iZXJPZlByb3Bvc2FscyIsImdldFNjaGVtYUZvclJlc291cmNlIiwiY29sbGVjdGlvblByb21pc2VzIiwiYWRkVmFsdWUiLCJjdXJyZW50S2V5Iiwic2VwYXJhdG9yQWZ0ZXJfMSIsImV2YWx1YXRlU2VwYXJhdG9yQWZ0ZXIiLCJnZXRQcm9wZXJ0eUNvbXBsZXRpb25zIiwiZ2V0U2NoZW1hTGVzc1Byb3BlcnR5Q29tcGxldGlvbnMiLCJsb2NhdGlvbl8xIiwiY29udHJpYnV0aW9uIiwiY29sbGVjdFByb21pc2UiLCJjb2xsZWN0UHJvcGVydHlDb21wbGV0aW9ucyIsImdldExhYmVsRm9yVmFsdWUiLCJnZXRJbnNlcnRUZXh0Rm9yUHJvcGVydHkiLCJpbnNlcnRUZXh0Rm9ybWF0IiwidHlwZXMiLCJnZXRWYWx1ZUNvbXBsZXRpb25zIiwiZ2V0U2NoZW1hTGVzc1ZhbHVlQ29tcGxldGlvbnMiLCJnZXRDb250cmlidXRlZFZhbHVlQ29tcGxldGlvbnMiLCJvZmZzZXRGb3JTZXBhcmF0b3IiLCJzZXBhcmF0b3JBZnRlciIsImFkZEZpbGxlclZhbHVlQ29tcGxldGlvbnMiLCJzIiwic2NoZW1hUHJvcGVydGllc18xIiwiZG9Ob3RTdWdnZXN0IiwicHJvcG9zYWwiLCJmaWx0ZXJUZXh0IiwiZ2V0RmlsdGVyVGV4dEZvclZhbHVlIiwiZnJvbU1hcmt1cCIsIm1hcmtkb3duRGVzY3JpcHRpb24iLCJzdWdnZXN0U29ydFRleHQiLCJzb3J0VGV4dCIsInNjaGVtYVByb3BlcnR5TmFtZXNfMSIsInByb3BlcnR5TmFtZUNvbXBsZXRpb25JdGVtIiwiZW51bURlc2NyaXB0aW9uIiwibWFya2Rvd25FbnVtRGVzY3JpcHRpb25zIiwiZW51bURlc2NyaXB0aW9ucyIsImNvbGxlY3RDb21wbGV0aW9uc0ZvclNpbWlsYXJPYmplY3QiLCJnZXRJbnNlcnRUZXh0Rm9yVmFsdWUiLCJwYXJlbnRLZXlfMSIsImdldFN1Z2dlc3Rpb25LaW5kIiwiY29sbGVjdFN1Z2dlc3Rpb25zRm9yVmFsdWVzIiwiZ2V0TGFiZWxUZXh0Rm9yTWF0Y2hpbmdOb2RlIiwiZ2V0SW5zZXJ0VGV4dEZvck1hdGNoaW5nTm9kZSIsImFkZEJvb2xlYW5WYWx1ZUNvbXBsZXRpb24iLCJwYXJlbnRLZXlfMiIsImFkZERvbGxhclNjaGVtYUNvbXBsZXRpb25zIiwicGFyZW50S2V5XzMiLCJwYXJlbnRLZXkiLCJ2YWx1ZU5vZGVfMSIsIm1hdGNoaW5nU2NoZW1hc18xIiwiZmluZEl0ZW1BdE9mZnNldCIsImFkZFNjaGVtYVZhbHVlQ29tcGxldGlvbnMiLCJwcm9wZXJ0eU1hdGNoZWQiLCJhZGROdWxsVmFsdWVDb21wbGV0aW9uIiwicGFyZW50S2V5XzQiLCJsb2NhdGlvbl8yIiwiY29sbGVjdFZhbHVlQ29tcGxldGlvbnMiLCJjb2xsZWN0RGVmYXVsdENvbXBsZXRpb25zIiwiYWRkRW51bVZhbHVlQ29tcGxldGlvbnMiLCJhZGREZWZhdWx0VmFsdWVDb21wbGV0aW9ucyIsImNvbGxlY3RUeXBlcyIsImFycmF5RGVwdGgiLCJoYXNQcm9wb3NhbHMiLCJkZWZhdWx0IiwiZXhhbXBsZXMiLCJleGFtcGxlIiwiZGVmYXVsdFNuaXBwZXRzIiwiYm9keSIsImdldEluc2VydFRleHRGb3JTbmlwcGV0VmFsdWUiLCJnZXRGaWx0ZXJUZXh0Rm9yU25pcHBldFZhbHVlIiwiZ2V0TGFiZWxGb3JTbmlwcGV0VmFsdWUiLCJib2R5VGV4dCIsInByZWZpeCIsInN1ZmZpeCIsImluZGVudCIsInNwbGl0IiwiZW5tIiwiZG9lc1N1cHBvcnRNYXJrZG93biIsInQiLCJnZXRJbnNlcnRUZXh0Rm9yR3Vlc3NlZFZhbHVlIiwiZ2V0UmVnaXN0ZXJlZFNjaGVtYUlkcyIsInNjaGVtYUlkIiwiZ2V0SW5zZXJ0VGV4dEZvclBsYWluVGV4dCIsInN0cmluZ2lmeU9iamVjdCIsInN0cmluZ2lmeUxpdGVyYWwiLCJuZXdJbmRlbnQiLCJzbmlwcGV0VmFsdWUiLCJwcm9wZXJ0eVRleHQiLCJyZXN1bHRUZXh0IiwiblZhbHVlUHJvcG9zYWxzIiwic2Nhbm5lciIsIm1hcmt1cFN0cmluZyIsInN1cHBvcnRzTWFya2Rvd24iLCJkb2VzU3VwcG9ydHNDb21taXRDaGFyYWN0ZXJzIiwic3VwcG9ydHNDb21taXRDaGFyYWN0ZXJzIiwiSlNPTkhvdmVyIiwicHJvbWlzZSIsImRvSG92ZXIiLCJob3ZlclJhbmdlTm9kZSIsImhvdmVyUmFuZ2UiLCJjcmVhdGVIb3ZlciIsImdldEluZm9Db250cmlidXRpb24iLCJodG1sQ29udGVudCIsInRpdGxlXzEiLCJtYXJrZG93bkRlc2NyaXB0aW9uXzEiLCJtYXJrZG93bkVudW1WYWx1ZURlc2NyaXB0aW9uXzEiLCJlbnVtVmFsdWVfMSIsInRvTWFya2Rvd24iLCJpZHgiLCJ0b01hcmtkb3duQ29kZUJsb2NrIiwicGxhaW4iLCJGaWxlUGF0dGVybkFzc29jaWF0aW9uIiwidXJpcyIsInBhdHRlcm5SZWdFeHBzIiwiaXNJbmNsdWRlIiwicGF0dGVybl8xIiwibWF0Y2hlc1BhdHRlcm4iLCJmaWxlTmFtZSIsImdldFVSSXMiLCJTY2hlbWFIYW5kbGUiLCJzZXJ2aWNlIiwidXJsIiwidW5yZXNvbHZlZFNjaGVtYUNvbnRlbnQiLCJ1bnJlc29sdmVkU2NoZW1hIiwiVW5yZXNvbHZlZFNjaGVtYSIsImdldFVucmVzb2x2ZWRTY2hlbWEiLCJsb2FkU2NoZW1hIiwiZ2V0UmVzb2x2ZWRTY2hlbWEiLCJyZXNvbHZlZFNjaGVtYSIsInVucmVzb2x2ZWQiLCJyZXNvbHZlU2NoZW1hQ29udGVudCIsImNsZWFyU2NoZW1hIiwiUmVzb2x2ZWRTY2hlbWEiLCJnZXRTZWN0aW9uIiwic2NoZW1hUmVmIiwiZ2V0U2VjdGlvblJlY3Vyc2l2ZSIsIm5leHQiLCJzaGlmdCIsImlkQ291bnRlciIsIkpTT05TY2hlbWFTZXJ2aWNlIiwicmVxdWVzdFNlcnZpY2UiLCJjb250ZXh0U2VydmljZSIsImNhbGxPbkRpc3Bvc2UiLCJjb250cmlidXRpb25TY2hlbWFzIiwiY29udHJpYnV0aW9uQXNzb2NpYXRpb25zIiwic2NoZW1hc0J5SWQiLCJmaWxlUGF0dGVybkFzc29jaWF0aW9ucyIsInJlZ2lzdGVyZWRTY2hlbWFzSWRzIiwiZmlsdGVyIiwic2NoZW1lIiwicGFyc2UiLCJvblJlc291cmNlQ2hhbmdlIiwiaGFzQ2hhbmdlcyIsInRvV2FsayIsIm5vcm1hbGl6ZUlkIiwiY3VyciIsImhhbmRsZSIsInNldFNjaGVtYUNvbnRyaWJ1dGlvbnMiLCJzY2hlbWFDb250cmlidXRpb25zIiwibm9ybWFsaXplZElkIiwiYWRkU2NoZW1hSGFuZGxlIiwic2NoZW1hQXNzb2NpYXRpb25zIiwic2NoZW1hQXNzb2NpYXRpb25zXzEiLCJzY2hlbWFBc3NvY2lhdGlvbiIsImFzc29jaWF0aW9uIiwiYWRkRmlsZVBhdHRlcm5Bc3NvY2lhdGlvbiIsInNjaGVtYUhhbmRsZSIsImdldE9yQWRkU2NoZW1hSGFuZGxlIiwiZnBhIiwicmVnaXN0ZXJFeHRlcm5hbFNjaGVtYSIsImZpbGVQYXR0ZXJucyIsImNhY2hlZFNjaGVtYUZvclJlc291cmNlIiwiY2xlYXJFeHRlcm5hbFNjaGVtYXMiLCJjb250cmlidXRpb25Bc3NvY2lhdGlvbiIsInRvRGlzcGxheVN0cmluZyIsInNjaGVtYUNvbnRlbnQiLCJqc29uRXJyb3JzIiwiZXJyb3JTcGxpdCIsInNjaGVtYVRvUmVzb2x2ZSIsInNjaGVtYVVSTCIsInJlc29sdmVFcnJvcnMiLCIkc2NoZW1hIiwic291cmNlUm9vdCIsInNvdXJjZVVSSSIsInJlZlNlZ21lbnQiLCJkZWNvZGVVUklDb21wb25lbnQiLCJzZWN0aW9uIiwiY3VycmVudCIsInBhcnQiLCJmaW5kU2VjdGlvbiIsInJlc29sdmVFeHRlcm5hbExpbmsiLCJwYXJlbnRTY2hlbWFVUkwiLCJwYXJlbnRTY2hlbWFEZXBlbmRlbmNpZXMiLCJyZXNvbHZlUmVsYXRpdmVQYXRoIiwicmVmZXJlbmNlZEhhbmRsZSIsImxvYyIsInJlc29sdmVSZWZzIiwicGFyZW50U2NoZW1hIiwic2VlbiIsIm9wZW5Qcm9taXNlcyIsImhhbmRsZVJlZiIsInNlZW5SZWZzIiwiJHJlZiIsInJlZiIsInNlZ21lbnRzIiwiZW50cmllcyIsImVudHJpZXNfMSIsImVudHJ5IiwiY29sbGVjdEVudHJpZXMiLCJtYXBzIiwibWFwc18xIiwiayIsImNvbGxlY3RNYXBFbnRyaWVzIiwiZGVmaW5pdGlvbnMiLCJhcnJheXMiLCJhcnJheXNfMSIsImFycmF5XzEiLCJjb2xsZWN0QXJyYXlFbnRyaWVzIiwicmVzb3VyY2UiLCJzY2hlbWFQcm9wZXJ0aWVzIiwic2NoZW1lSWQiLCJub3JtYWxpemVkUmVzb3VyY2UiLCJ3aXRoIiwiZnJhZ21lbnQiLCJxdWVyeSIsIm5vcm1hbGl6ZVJlc291cmNlRm9yTWF0Y2hpbmciLCJjcmVhdGVDb21iaW5lZFNjaGVtYSIsInNjaGVtYUlkcyIsImNvbWJpbmVkU2NoZW1hSWQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJjb21iaW5lZFNjaGVtYSIsImpzb25Eb2N1bWVudCIsImZzUGF0aCIsIkpTT05WYWxpZGF0aW9uIiwianNvblNjaGVtYVNlcnZpY2UiLCJ2YWxpZGF0aW9uRW5hYmxlZCIsImNvbmZpZ3VyZSIsInJhdyIsImNvbW1lbnRTZXZlcml0eSIsImFsbG93Q29tbWVudHMiLCJkb1ZhbGlkYXRpb24iLCJkb2N1bWVudFNldHRpbmdzIiwiYWRkZWQiLCJhZGRQcm9ibGVtIiwicHJvYmxlbSIsInNpZ25hdHVyZSIsImdldERpYWdub3N0aWNzIiwidHJhaWxpbmdDb21tYVNldmVyaXR5IiwidG9EaWFnbm9zdGljU2V2ZXJpdHkiLCJ0cmFpbGluZ0NvbW1hcyIsInNjaGVtYVZhbGlkYXRpb24iLCJzY2hlbWFSZXF1ZXN0IiwiYXN0Um9vdCIsInByb3BlcnR5IiwiU2NoZW1hUmVzb2x2ZUVycm9yIiwic2VtYW50aWNFcnJvcnMiLCJzY2hlbWFBbGxvd3NDb21tZW50cyIsImFsbG93Iiwic2NoZW1hQWxsb3dzVHJhaWxpbmdDb21tYXMiLCJhbGxvd1RyYWlsaW5nQ29tbWFzIiwiZGVwclNjaGVtYVJlZiIsIlRyYWlsaW5nQ29tbWEiLCJtZXNzYWdlXzEiLCJjIiwiQ29tbWVudE5vdFBlcm1pdHRlZCIsInNldmVyaXR5TGV2ZWwiLCJoZXhEaWdpdCIsImNoYXJDb2RlIiwiY29sb3JGcm9tSGV4IiwiSlNPTkRvY3VtZW50U3ltYm9scyIsImZpbmREb2N1bWVudFN5bWJvbHMiLCJjb250ZXh0IiwicmVzdWx0TGltaXQiLCJyZXNvdXJjZVN0cmluZyIsInRvTG93ZXJDYXNlIiwicmVzdWx0XzEiLCJnZXRSYW5nZSIsIm9uUmVzdWx0TGltaXRFeGNlZWRlZCIsInRvVmlzaXQiLCJuZXh0VG9WaXNpdCIsImxpbWl0RXhjZWVkZWQiLCJjb2xsZWN0T3V0bGluZUVudHJpZXMiLCJjaGlsZENvbnRhaW5lck5hbWUiLCJnZXRLZXlMYWJlbCIsImdldFN5bWJvbEtpbmQiLCJmaW5kRG9jdW1lbnRTeW1ib2xzMiIsInJlc3VsdF8yIiwic3ltYm9sIiwiZ2V0RGV0YWlsIiwibm9kZVR5cGUiLCJmaW5kRG9jdW1lbnRDb2xvcnMiLCJ2aXNpdGVkTm9kZSIsIm5vZGVJZCIsImdldENvbG9yUHJlc2VudGF0aW9ucyIsInJlZDI1NiIsInJvdW5kIiwiZ3JlZW4yNTYiLCJibHVlMjU2IiwidG9Ud29EaWdpdEhleCIsInIiLCJkZXNjcmlwdGlvbnMiLCIkaWQiLCIkY29tbWVudCIsInJlYWRPbmx5IiwiY29udGVudE1lZGlhVHlwZSIsImNvbnRlbnRFbmNvZGluZyIsInNjaGVtYU5hbWUiLCJwcm9wZXJ0eU9iamVjdCIsIkRpYWdub3N0aWNzQWRhcHRlciIsIl9kaXNwb3NhYmxlcyIsIl9saXN0ZW5lciIsIm9uTW9kZWxBZGQiLCJtb2RlbCIsIm1vZGVJZCIsImdldE1vZGVJZCIsIm9uRGlkQ2hhbmdlQ29udGVudCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJfZG9WYWxpZGF0ZSIsIm9uTW9kZWxSZW1vdmVkIiwic2V0TW9kZWxNYXJrZXJzIiwidXJpU3RyIiwibGlzdGVuZXIiLCJvbkRpZENyZWF0ZU1vZGVsIiwib25XaWxsRGlzcG9zZU1vZGVsIiwiX3Jlc2V0U2NoZW1hIiwib25EaWRDaGFuZ2VNb2RlbExhbmd1YWdlIiwiZ2V0TW9kZWxzIiwid29ya2VyIiwicmVzZXRTY2hlbWEiLCJtYXJrZXJzIiwiZGlhZyIsInRvU2V2ZXJpdHkiLCJzdGFydExpbmVOdW1iZXIiLCJzdGFydENvbHVtbiIsImVuZExpbmVOdW1iZXIiLCJlbmRDb2x1bW4iLCJnZXRNb2RlbCIsImVyciIsImxzU2V2ZXJpdHkiLCJJbmZvIiwiZnJvbVBvc2l0aW9uIiwiY29sdW1uIiwiZnJvbVJhbmdlIiwidG9SYW5nZSIsInRvQ29tcGxldGlvbkl0ZW1LaW5kIiwibUl0ZW1LaW5kIiwidG9UZXh0RWRpdCIsIkNvbXBsZXRpb25BZGFwdGVyIiwicHJvdmlkZUNvbXBsZXRpb25JdGVtcyIsImluZm8iLCJ3b3JkSW5mbyIsImdldFdvcmRVbnRpbFBvc2l0aW9uIiwid29yZFJhbmdlIiwiaW5zZXJ0VGV4dFJ1bGVzIiwiQ29tcGxldGlvbkl0ZW1JbnNlcnRUZXh0UnVsZSIsIkluc2VydEFzU25pcHBldCIsInN1Z2dlc3Rpb25zIiwidG9NYXJrZG93blN0cmluZyIsInRoaW5nIiwidG9NYXJrZWRTdHJpbmdBcnJheSIsIkhvdmVyQWRhcHRlciIsInByb3ZpZGVIb3ZlciIsInRvU3ltYm9sS2luZCIsIm1LaW5kIiwiRG9jdW1lbnRTeW1ib2xBZGFwdGVyIiwicHJvdmlkZURvY3VtZW50U3ltYm9scyIsImZyb21Gb3JtYXR0aW5nT3B0aW9ucyIsIkRvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlciIsInByb3ZpZGVEb2N1bWVudEZvcm1hdHRpbmdFZGl0cyIsIkRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyIiwicHJvdmlkZURvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdHMiLCJEb2N1bWVudENvbG9yQWRhcHRlciIsInByb3ZpZGVEb2N1bWVudENvbG9ycyIsImluZm9zIiwicHJvdmlkZUNvbG9yUHJlc2VudGF0aW9ucyIsInByZXNlbnRhdGlvbnMiLCJwcmVzZW50YXRpb24iLCJGb2xkaW5nUmFuZ2VBZGFwdGVyIiwicHJvdmlkZUZvbGRpbmdSYW5nZXMiLCJnZXRGb2xkaW5nUmFuZ2VzIiwicmFuZ2VzIiwiQ29tbWVudCIsIkltcG9ydHMiLCJSZWdpb24iLCJ0b0ZvbGRpbmdSYW5nZUtpbmQiLCJTZWxlY3Rpb25SYW5nZUFkYXB0ZXIiLCJwcm92aWRlU2VsZWN0aW9uUmFuZ2VzIiwicG9zaXRpb25zIiwiZ2V0U2VsZWN0aW9uUmFuZ2VzIiwic2VsZWN0aW9uUmFuZ2VzIiwiY3JlYXRlVG9rZW5pemF0aW9uU3VwcG9ydCIsInN1cHBvcnRDb21tZW50cyIsImdldEluaXRpYWxTdGF0ZSIsIkpTT05TdGF0ZSIsInRva2VuaXplIiwic3RhdGUiLCJvZmZzZXREZWx0YSIsInN0b3BBdE9mZnNldCIsIm51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzIiwiYWRqdXN0T2Zmc2V0IiwibGFzdFdhc0NvbG9uIiwicGFyZW50cyIsInRva2VucyIsImVuZFN0YXRlIiwiY2xvbmUiLCJQYXJlbnRzU3RhY2siLCJpbkFycmF5IiwiZ2V0U3RhdGVEYXRhIiwic3RhcnRJbmRleCIsInNjb3BlcyIsIl9zdGF0ZSIsInNldFN0YXRlRGF0YSIsInNldHVwTW9kZSIsImRpc3Bvc2FibGVzIiwicHJvdmlkZXJzIiwicmVnaXN0ZXJQcm92aWRlcnMiLCJtb2RlQ29uZmlndXJhdGlvbiIsImRpc3Bvc2VBbGwiLCJkb2N1bWVudEZvcm1hdHRpbmdFZGl0cyIsInJlZ2lzdGVyRG9jdW1lbnRGb3JtYXR0aW5nRWRpdFByb3ZpZGVyIiwiZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0cyIsInJlZ2lzdGVyRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0UHJvdmlkZXIiLCJjb21wbGV0aW9uSXRlbXMiLCJyZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIiLCJob3ZlcnMiLCJyZWdpc3RlckhvdmVyUHJvdmlkZXIiLCJkb2N1bWVudFN5bWJvbHMiLCJyZWdpc3RlckRvY3VtZW50U3ltYm9sUHJvdmlkZXIiLCJzZXRUb2tlbnNQcm92aWRlciIsImNvbG9ycyIsInJlZ2lzdGVyQ29sb3JQcm92aWRlciIsImZvbGRpbmdSYW5nZXMiLCJyZWdpc3RlckZvbGRpbmdSYW5nZVByb3ZpZGVyIiwicmVnaXN0ZXJTZWxlY3Rpb25SYW5nZVByb3ZpZGVyIiwic2V0TGFuZ3VhZ2VDb25maWd1cmF0aW9uIiwicmljaEVkaXRDb25maWd1cmF0aW9uIiwibmV3RGVmYXVsdHMiLCJhc0Rpc3Bvc2FibGUiLCJ3b3JkUGF0dGVybiIsImxpbmVDb21tZW50IiwiYmxvY2tDb21tZW50IiwiYnJhY2tldHMiLCJhdXRvQ2xvc2luZ1BhaXJzIiwib3BlbiIsImNsb3NlIiwibm90SW4iLCJMSUIiLCI0NzAiLCJUeXBlRXJyb3IiLCJvIiwiaCIsInByb2Nlc3MiLCJjd2QiLCJub3JtYWxpemUiLCJpc0Fic29sdXRlIiwicmVsYXRpdmUiLCJ1IiwibCIsIl9tYWtlTG9uZyIsImRpcm5hbWUiLCJiYXNlbmFtZSIsImV4dG5hbWUiLCJkaXIiLCJiYXNlIiwiZXh0Iiwic2VwIiwiZGVsaW1pdGVyIiwid2luMzIiLCJwb3NpeCIsImV4cG9ydHMiLCI0NDciLCJVUkkiLCJnIiwiVXRpbHMiLCJPIiwicGxhdGZvcm0iLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJhdXRob3JpdHkiLCJpc1VyaSIsIkMiLCJ4IiwiZnJvbSIsIkEiLCJ0b0pTT04iLCJyZXZpdmUiLCJfZm9ybWF0dGVkIiwiZXh0ZXJuYWwiLCJfZnNQYXRoIiwiX3NlcCIsIiRtaWQiLCJtIiwieSIsInciLCJQIiwiaiIsIlUiLCJqb2luUGF0aCIsInJlc29sdmVQYXRoIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciXSwibWFwcGluZ3MiOiJnSkFNSUEsRSxTQ0FBLEVBQStCLFdBQy9CLFNBQVNDLEVBQWNDLEdBQ25CLElBQUlDLEVBQVFDLEtBQ1pBLEtBQUtDLFVBQVlILEVBQ2pCRSxLQUFLRSxRQUFVLEtBQ2ZGLEtBQUtHLG1CQUFxQkMsYUFBWSxXQUFjLE9BQU9MLEVBQU1NLGlCQUFtQixLQUNwRkwsS0FBS00sY0FBZ0IsRUFDckJOLEtBQUtPLHNCQUF3QlAsS0FBS0MsVUFBVU8sYUFBWSxXQUFjLE9BQU9ULEVBQU1VLGlCQXlEdkYsT0F2REFaLEVBQWNhLFVBQVVELFlBQWMsV0FDOUJULEtBQUtFLFVBQ0xGLEtBQUtFLFFBQVFTLFVBQ2JYLEtBQUtFLFFBQVUsTUFFbkJGLEtBQUtZLFFBQVUsTUFFbkJmLEVBQWNhLFVBQVVDLFFBQVUsV0FDOUJFLGNBQWNiLEtBQUtHLG9CQUNuQkgsS0FBS08sc0JBQXNCSSxVQUMzQlgsS0FBS1MsZUFFVFosRUFBY2EsVUFBVUwsYUFBZSxXQUM5QkwsS0FBS0UsVUFHb0JZLEtBQUtDLE1BQVFmLEtBQUtNLGNBMUIvQixNQTRCYk4sS0FBS1MsZ0JBR2JaLEVBQWNhLFVBQVVNLFdBQWEsV0FnQmpDLE9BZkFoQixLQUFLTSxjQUFnQlEsS0FBS0MsTUFDckJmLEtBQUtZLFVBQ05aLEtBQUtFLFFBQVUsU0FBT2UsZ0JBQWdCLENBRWxDQyxTQUFVLDhCQUNWQyxNQUFPbkIsS0FBS0MsVUFBVW1CLFdBRXRCQyxXQUFZLENBQ1JDLGlC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QUFPb2xCLEVBQUVnWSxRQUFRLFNBQVNoWSxHQUFHLE9BQU9tYSxFQUFFbkMsUUFBUWhZLEVBQUVwbEIsT0FBdGYsQ0FBOGZpK0IsSUFBSUEsRUFBRSxPQUFPaHVCLEVBQUUsR0FBRyxTQUFTZ2pCLEVBQUV6YixHQUFHLEdBQUd2SCxFQUFFdUgsR0FBRyxPQUFPdkgsRUFBRXVILEdBQUdvbUIsUUFBUSxJQUFJcEIsRUFBRXZzQixFQUFFdUgsR0FBRyxDQUFDb21CLFFBQVEsSUFBSSxPQUFPeFksRUFBRTVOLEdBQUdnbEIsRUFBRUEsRUFBRW9CLFFBQVEzSyxHQUFHdUosRUFBRW9CLFFBQVEsT0FBTzNLLEVBQUV6ZixFQUFFLENBQUM0UixFQUFFblYsS0FBSyxJQUFJLElBQUl1SCxLQUFLdkgsRUFBRWdqQixFQUFFdUosRUFBRXZzQixFQUFFdUgsS0FBS3liLEVBQUV1SixFQUFFcFgsRUFBRTVOLElBQUlqWCxPQUFPc0ksZUFBZXVjLEVBQUU1TixFQUFFLENBQUN6TyxZQUFXLEVBQUdELElBQUltSCxFQUFFdUgsTUFBTXliLEVBQUV1SixFQUFFLENBQUNwWCxFQUFFblYsSUFBSTFQLE9BQU9uSyxVQUFVdWQsZUFBZW5DLEtBQUs0VCxFQUFFblYsR0FBR2dqQixFQUFFQSxFQUFFN04sSUFBSSxvQkFBb0JzYSxRQUFRQSxPQUFPQyxhQUFhcC9CLE9BQU9zSSxlQUFldWMsRUFBRXNhLE9BQU9DLFlBQVksQ0FBQ3puQyxNQUFNLFdBQVdxSSxPQUFPc0ksZUFBZXVjLEVBQUUsYUFBYSxDQUFDbHRCLE9BQU0sS0FBTSs2QixFQUFFLE1BQXB4VyxHQUFveVcsTUFBSyxJQUFDNkssRUFBRyxNQUFDRSxHQUFPM0IsSSIsImZpbGUiOiIxLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHsgY3JlYXRlU2Nhbm5lciB9IGZyb20gJy4vc2Nhbm5lci5qcyc7XG52YXIgUGFyc2VPcHRpb25zO1xuKGZ1bmN0aW9uIChQYXJzZU9wdGlvbnMpIHtcbiAgICBQYXJzZU9wdGlvbnMuREVGQVVMVCA9IHtcbiAgICAgICAgYWxsb3dUcmFpbGluZ0NvbW1hOiBmYWxzZVxuICAgIH07XG59KShQYXJzZU9wdGlvbnMgfHwgKFBhcnNlT3B0aW9ucyA9IHt9KSk7XG4vKipcbiAqIEZvciBhIGdpdmVuIG9mZnNldCwgZXZhbHVhdGUgdGhlIGxvY2F0aW9uIGluIHRoZSBKU09OIGRvY3VtZW50LiBFYWNoIHNlZ21lbnQgaW4gdGhlIGxvY2F0aW9uIHBhdGggaXMgZWl0aGVyIGEgcHJvcGVydHkgbmFtZSBvciBhbiBhcnJheSBpbmRleC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2F0aW9uKHRleHQsIHBvc2l0aW9uKSB7XG4gICAgdmFyIHNlZ21lbnRzID0gW107IC8vIHN0cmluZ3Mgb3IgbnVtYmVyc1xuICAgIHZhciBlYXJseVJldHVybkV4Y2VwdGlvbiA9IG5ldyBPYmplY3QoKTtcbiAgICB2YXIgcHJldmlvdXNOb2RlID0gdW5kZWZpbmVkO1xuICAgIHZhciBwcmV2aW91c05vZGVJbnN0ID0ge1xuICAgICAgICB2YWx1ZToge30sXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbGVuZ3RoOiAwLFxuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgcGFyZW50OiB1bmRlZmluZWRcbiAgICB9O1xuICAgIHZhciBpc0F0UHJvcGVydHlLZXkgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBzZXRQcmV2aW91c05vZGUodmFsdWUsIG9mZnNldCwgbGVuZ3RoLCB0eXBlKSB7XG4gICAgICAgIHByZXZpb3VzTm9kZUluc3QudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcHJldmlvdXNOb2RlSW5zdC5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIHByZXZpb3VzTm9kZUluc3QubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBwcmV2aW91c05vZGVJbnN0LnR5cGUgPSB0eXBlO1xuICAgICAgICBwcmV2aW91c05vZGVJbnN0LmNvbG9uT2Zmc2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICBwcmV2aW91c05vZGUgPSBwcmV2aW91c05vZGVJbnN0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2aXNpdCh0ZXh0LCB7XG4gICAgICAgICAgICBvbk9iamVjdEJlZ2luOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgaXNBdFByb3BlcnR5S2V5ID0gcG9zaXRpb24gPiBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucHVzaCgnJyk7IC8vIHB1c2ggYSBwbGFjZWhvbGRlciAod2lsbCBiZSByZXBsYWNlZClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbk9iamVjdFByb3BlcnR5OiBmdW5jdGlvbiAobmFtZSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZWFybHlSZXR1cm5FeGNlcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFByZXZpb3VzTm9kZShuYW1lLCBvZmZzZXQsIGxlbmd0aCwgJ3Byb3BlcnR5Jyk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMV0gPSBuYW1lO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8PSBvZmZzZXQgKyBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZWFybHlSZXR1cm5FeGNlcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uT2JqZWN0RW5kOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucG9wKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25BcnJheUJlZ2luOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucHVzaCgwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkFycmF5RW5kOiBmdW5jdGlvbiAob2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVhcmx5UmV0dXJuRXhjZXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucG9wKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25MaXRlcmFsVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZWFybHlSZXR1cm5FeGNlcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFByZXZpb3VzTm9kZSh2YWx1ZSwgb2Zmc2V0LCBsZW5ndGgsIGdldE5vZGVUeXBlKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IG9mZnNldCArIGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlYXJseVJldHVybkV4Y2VwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TZXBhcmF0b3I6IGZ1bmN0aW9uIChzZXAsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlYXJseVJldHVybkV4Y2VwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlcCA9PT0gJzonICYmIHByZXZpb3VzTm9kZSAmJiBwcmV2aW91c05vZGUudHlwZSA9PT0gJ3Byb3BlcnR5Jykge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUuY29sb25PZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlzQXRQcm9wZXJ0eUtleSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlcCA9PT0gJywnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0ID0gc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbGFzdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdID0gbGFzdCArIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0F0UHJvcGVydHlLZXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMV0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c05vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUgIT09IGVhcmx5UmV0dXJuRXhjZXB0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHBhdGg6IHNlZ21lbnRzLFxuICAgICAgICBwcmV2aW91c05vZGU6IHByZXZpb3VzTm9kZSxcbiAgICAgICAgaXNBdFByb3BlcnR5S2V5OiBpc0F0UHJvcGVydHlLZXksXG4gICAgICAgIG1hdGNoZXM6IGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICAgICAgICB2YXIgayA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgayA8IHBhdHRlcm4ubGVuZ3RoICYmIGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuW2tdID09PSBzZWdtZW50c1tpXSB8fCBwYXR0ZXJuW2tdID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICAgICAgaysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwYXR0ZXJuW2tdICE9PSAnKionKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gayA9PT0gcGF0dGVybi5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHRleHQgYW5kIHJldHVybnMgdGhlIG9iamVjdCB0aGUgSlNPTiBjb250ZW50IHJlcHJlc2VudHMuIE9uIGludmFsaWQgaW5wdXQsIHRoZSBwYXJzZXIgdHJpZXMgdG8gYmUgYXMgZmF1bHQgdG9sZXJhbnQgYXMgcG9zc2libGUsIGJ1dCBzdGlsbCByZXR1cm4gYSByZXN1bHQuXG4gKiBUaGVyZWZvcmUgYWx3YXlzIGNoZWNrIHRoZSBlcnJvcnMgbGlzdCB0byBmaW5kIG91dCBpZiB0aGUgaW5wdXQgd2FzIHZhbGlkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UodGV4dCwgZXJyb3JzLCBvcHRpb25zKSB7XG4gICAgaWYgKGVycm9ycyA9PT0gdm9pZCAwKSB7IGVycm9ycyA9IFtdOyB9XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0gUGFyc2VPcHRpb25zLkRFRkFVTFQ7IH1cbiAgICB2YXIgY3VycmVudFByb3BlcnR5ID0gbnVsbDtcbiAgICB2YXIgY3VycmVudFBhcmVudCA9IFtdO1xuICAgIHZhciBwcmV2aW91c1BhcmVudHMgPSBbXTtcbiAgICBmdW5jdGlvbiBvblZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRQYXJlbnQpKSB7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRQcm9wZXJ0eSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudFtjdXJyZW50UHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHZpc2l0b3IgPSB7XG4gICAgICAgIG9uT2JqZWN0QmVnaW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgICAgIG9uVmFsdWUob2JqZWN0KTtcbiAgICAgICAgICAgIHByZXZpb3VzUGFyZW50cy5wdXNoKGN1cnJlbnRQYXJlbnQpO1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IG9iamVjdDtcbiAgICAgICAgICAgIGN1cnJlbnRQcm9wZXJ0eSA9IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIG9uT2JqZWN0UHJvcGVydHk6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBjdXJyZW50UHJvcGVydHkgPSBuYW1lO1xuICAgICAgICB9LFxuICAgICAgICBvbk9iamVjdEVuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IHByZXZpb3VzUGFyZW50cy5wb3AoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25BcnJheUJlZ2luOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgICAgIG9uVmFsdWUoYXJyYXkpO1xuICAgICAgICAgICAgcHJldmlvdXNQYXJlbnRzLnB1c2goY3VycmVudFBhcmVudCk7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50ID0gYXJyYXk7XG4gICAgICAgICAgICBjdXJyZW50UHJvcGVydHkgPSBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBvbkFycmF5RW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50ID0gcHJldmlvdXNQYXJlbnRzLnBvcCgpO1xuICAgICAgICB9LFxuICAgICAgICBvbkxpdGVyYWxWYWx1ZTogb25WYWx1ZSxcbiAgICAgICAgb25FcnJvcjogZnVuY3Rpb24gKGVycm9yLCBvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgICAgICAgZXJyb3JzLnB1c2goeyBlcnJvcjogZXJyb3IsIG9mZnNldDogb2Zmc2V0LCBsZW5ndGg6IGxlbmd0aCB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmlzaXQodGV4dCwgdmlzaXRvciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGN1cnJlbnRQYXJlbnRbMF07XG59XG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gdGV4dCBhbmQgcmV0dXJucyBhIHRyZWUgcmVwcmVzZW50YXRpb24gdGhlIEpTT04gY29udGVudC4gT24gaW52YWxpZCBpbnB1dCwgdGhlIHBhcnNlciB0cmllcyB0byBiZSBhcyBmYXVsdCB0b2xlcmFudCBhcyBwb3NzaWJsZSwgYnV0IHN0aWxsIHJldHVybiBhIHJlc3VsdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHJlZSh0ZXh0LCBlcnJvcnMsIG9wdGlvbnMpIHtcbiAgICBpZiAoZXJyb3JzID09PSB2b2lkIDApIHsgZXJyb3JzID0gW107IH1cbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSBQYXJzZU9wdGlvbnMuREVGQVVMVDsgfVxuICAgIHZhciBjdXJyZW50UGFyZW50ID0geyB0eXBlOiAnYXJyYXknLCBvZmZzZXQ6IC0xLCBsZW5ndGg6IC0xLCBjaGlsZHJlbjogW10sIHBhcmVudDogdW5kZWZpbmVkIH07IC8vIGFydGlmaWNpYWwgcm9vdFxuICAgIGZ1bmN0aW9uIGVuc3VyZVByb3BlcnR5Q29tcGxldGUoZW5kT2Zmc2V0KSB7XG4gICAgICAgIGlmIChjdXJyZW50UGFyZW50LnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQubGVuZ3RoID0gZW5kT2Zmc2V0IC0gY3VycmVudFBhcmVudC5vZmZzZXQ7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudC5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25WYWx1ZSh2YWx1ZU5vZGUpIHtcbiAgICAgICAgY3VycmVudFBhcmVudC5jaGlsZHJlbi5wdXNoKHZhbHVlTm9kZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZU5vZGU7XG4gICAgfVxuICAgIHZhciB2aXNpdG9yID0ge1xuICAgICAgICBvbk9iamVjdEJlZ2luOiBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50ID0gb25WYWx1ZSh7IHR5cGU6ICdvYmplY3QnLCBvZmZzZXQ6IG9mZnNldCwgbGVuZ3RoOiAtMSwgcGFyZW50OiBjdXJyZW50UGFyZW50LCBjaGlsZHJlbjogW10gfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uT2JqZWN0UHJvcGVydHk6IGZ1bmN0aW9uIChuYW1lLCBvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IG9uVmFsdWUoeyB0eXBlOiAncHJvcGVydHknLCBvZmZzZXQ6IG9mZnNldCwgbGVuZ3RoOiAtMSwgcGFyZW50OiBjdXJyZW50UGFyZW50LCBjaGlsZHJlbjogW10gfSk7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50LmNoaWxkcmVuLnB1c2goeyB0eXBlOiAnc3RyaW5nJywgdmFsdWU6IG5hbWUsIG9mZnNldDogb2Zmc2V0LCBsZW5ndGg6IGxlbmd0aCwgcGFyZW50OiBjdXJyZW50UGFyZW50IH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbk9iamVjdEVuZDogZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBlbnN1cmVQcm9wZXJ0eUNvbXBsZXRlKG9mZnNldCArIGxlbmd0aCk7IC8vIGluIGNhc2Ugb2YgYSBtaXNzaW5nIHZhbHVlIGZvciBhIHByb3BlcnR5OiBtYWtlIHN1cmUgcHJvcGVydHkgaXMgY29tcGxldGVcbiAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQubGVuZ3RoID0gb2Zmc2V0ICsgbGVuZ3RoIC0gY3VycmVudFBhcmVudC5vZmZzZXQ7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50ID0gY3VycmVudFBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICBlbnN1cmVQcm9wZXJ0eUNvbXBsZXRlKG9mZnNldCArIGxlbmd0aCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQXJyYXlCZWdpbjogZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50ID0gb25WYWx1ZSh7IHR5cGU6ICdhcnJheScsIG9mZnNldDogb2Zmc2V0LCBsZW5ndGg6IC0xLCBwYXJlbnQ6IGN1cnJlbnRQYXJlbnQsIGNoaWxkcmVuOiBbXSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25BcnJheUVuZDogZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyZW50UGFyZW50Lmxlbmd0aCA9IG9mZnNldCArIGxlbmd0aCAtIGN1cnJlbnRQYXJlbnQub2Zmc2V0O1xuICAgICAgICAgICAgY3VycmVudFBhcmVudCA9IGN1cnJlbnRQYXJlbnQucGFyZW50O1xuICAgICAgICAgICAgZW5zdXJlUHJvcGVydHlDb21wbGV0ZShvZmZzZXQgKyBsZW5ndGgpO1xuICAgICAgICB9LFxuICAgICAgICBvbkxpdGVyYWxWYWx1ZTogZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgICAgICAgb25WYWx1ZSh7IHR5cGU6IGdldE5vZGVUeXBlKHZhbHVlKSwgb2Zmc2V0OiBvZmZzZXQsIGxlbmd0aDogbGVuZ3RoLCBwYXJlbnQ6IGN1cnJlbnRQYXJlbnQsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIGVuc3VyZVByb3BlcnR5Q29tcGxldGUob2Zmc2V0ICsgbGVuZ3RoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXBhcmF0b3I6IGZ1bmN0aW9uIChzZXAsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFBhcmVudC50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlcCA9PT0gJzonKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQYXJlbnQuY29sb25PZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlcCA9PT0gJywnKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuc3VyZVByb3BlcnR5Q29tcGxldGUob2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uRXJyb3I6IGZ1bmN0aW9uIChlcnJvciwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHsgZXJyb3I6IGVycm9yLCBvZmZzZXQ6IG9mZnNldCwgbGVuZ3RoOiBsZW5ndGggfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZpc2l0KHRleHQsIHZpc2l0b3IsIG9wdGlvbnMpO1xuICAgIHZhciByZXN1bHQgPSBjdXJyZW50UGFyZW50LmNoaWxkcmVuWzBdO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgZGVsZXRlIHJlc3VsdC5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEZpbmRzIHRoZSBub2RlIGF0IHRoZSBnaXZlbiBwYXRoIGluIGEgSlNPTiBET00uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZUF0TG9jYXRpb24ocm9vdCwgcGF0aCkge1xuICAgIGlmICghcm9vdCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgbm9kZSA9IHJvb3Q7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBwYXRoXzEgPSBwYXRoOyBfaSA8IHBhdGhfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIHNlZ21lbnQgPSBwYXRoXzFbX2ldO1xuICAgICAgICBpZiAodHlwZW9mIHNlZ21lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnb2JqZWN0JyB8fCAhQXJyYXkuaXNBcnJheShub2RlLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgX2IgPSBub2RlLmNoaWxkcmVuOyBfYSA8IF9iLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5vZGUgPSBfYltfYV07XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcGVydHlOb2RlLmNoaWxkcmVuKSAmJiBwcm9wZXJ0eU5vZGUuY2hpbGRyZW5bMF0udmFsdWUgPT09IHNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHByb3BlcnR5Tm9kZS5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHNlZ21lbnQ7XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnYXJyYXknIHx8IGluZGV4IDwgMCB8fCAhQXJyYXkuaXNBcnJheShub2RlLmNoaWxkcmVuKSB8fCBpbmRleCA+PSBub2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlID0gbm9kZS5jaGlsZHJlbltpbmRleF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG4vKipcbiAqIEdldHMgdGhlIEpTT04gcGF0aCBvZiB0aGUgZ2l2ZW4gSlNPTiBET00gbm9kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZVBhdGgobm9kZSkge1xuICAgIGlmICghbm9kZS5wYXJlbnQgfHwgIW5vZGUucGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgdmFyIHBhdGggPSBnZXROb2RlUGF0aChub2RlLnBhcmVudCk7XG4gICAgaWYgKG5vZGUucGFyZW50LnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcbiAgICAgICAgdmFyIGtleSA9IG5vZGUucGFyZW50LmNoaWxkcmVuWzBdLnZhbHVlO1xuICAgICAgICBwYXRoLnB1c2goa2V5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZS5wYXJlbnQudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICB2YXIgaW5kZXggPSBub2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBwYXRoLnB1c2goaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xufVxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIEphdmFTY3JpcHQgb2JqZWN0IG9mIHRoZSBnaXZlbiBKU09OIERPTSBub2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROb2RlVmFsdWUobm9kZSkge1xuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuLm1hcChnZXROb2RlVmFsdWUpO1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gbm9kZS5jaGlsZHJlbjsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVOb2RlID0gcHJvcC5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtwcm9wLmNoaWxkcmVuWzBdLnZhbHVlXSA9IGdldE5vZGVWYWx1ZSh2YWx1ZU5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIGNhc2UgJ251bGwnOlxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgIHJldHVybiBub2RlLnZhbHVlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMobm9kZSwgb2Zmc2V0LCBpbmNsdWRlUmlnaHRCb3VuZCkge1xuICAgIGlmIChpbmNsdWRlUmlnaHRCb3VuZCA9PT0gdm9pZCAwKSB7IGluY2x1ZGVSaWdodEJvdW5kID0gZmFsc2U7IH1cbiAgICByZXR1cm4gKG9mZnNldCA+PSBub2RlLm9mZnNldCAmJiBvZmZzZXQgPCAobm9kZS5vZmZzZXQgKyBub2RlLmxlbmd0aCkpIHx8IGluY2x1ZGVSaWdodEJvdW5kICYmIChvZmZzZXQgPT09IChub2RlLm9mZnNldCArIG5vZGUubGVuZ3RoKSk7XG59XG4vKipcbiAqIEZpbmRzIHRoZSBtb3N0IGlubmVyIG5vZGUgYXQgdGhlIGdpdmVuIG9mZnNldC4gSWYgaW5jbHVkZVJpZ2h0Qm91bmQgaXMgc2V0LCBhbHNvIGZpbmRzIG5vZGVzIHRoYXQgZW5kIGF0IHRoZSBnaXZlbiBvZmZzZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZUF0T2Zmc2V0KG5vZGUsIG9mZnNldCwgaW5jbHVkZVJpZ2h0Qm91bmQpIHtcbiAgICBpZiAoaW5jbHVkZVJpZ2h0Qm91bmQgPT09IHZvaWQgMCkgeyBpbmNsdWRlUmlnaHRCb3VuZCA9IGZhbHNlOyB9XG4gICAgaWYgKGNvbnRhaW5zKG5vZGUsIG9mZnNldCwgaW5jbHVkZVJpZ2h0Qm91bmQpKSB7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGggJiYgY2hpbGRyZW5baV0ub2Zmc2V0IDw9IG9mZnNldDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBmaW5kTm9kZUF0T2Zmc2V0KGNoaWxkcmVuW2ldLCBvZmZzZXQsIGluY2x1ZGVSaWdodEJvdW5kKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gdGV4dCBhbmQgaW52b2tlcyB0aGUgdmlzaXRvciBmdW5jdGlvbnMgZm9yIGVhY2ggb2JqZWN0LCBhcnJheSBhbmQgbGl0ZXJhbCByZWFjaGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmlzaXQodGV4dCwgdmlzaXRvciwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IFBhcnNlT3B0aW9ucy5ERUZBVUxUOyB9XG4gICAgdmFyIF9zY2FubmVyID0gY3JlYXRlU2Nhbm5lcih0ZXh0LCBmYWxzZSk7XG4gICAgZnVuY3Rpb24gdG9Ob0FyZ1Zpc2l0KHZpc2l0RnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHZpc2l0RnVuY3Rpb24gPyBmdW5jdGlvbiAoKSB7IHJldHVybiB2aXNpdEZ1bmN0aW9uKF9zY2FubmVyLmdldFRva2VuT2Zmc2V0KCksIF9zY2FubmVyLmdldFRva2VuTGVuZ3RoKCksIF9zY2FubmVyLmdldFRva2VuU3RhcnRMaW5lKCksIF9zY2FubmVyLmdldFRva2VuU3RhcnRDaGFyYWN0ZXIoKSk7IH0gOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b09uZUFyZ1Zpc2l0KHZpc2l0RnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHZpc2l0RnVuY3Rpb24gPyBmdW5jdGlvbiAoYXJnKSB7IHJldHVybiB2aXNpdEZ1bmN0aW9uKGFyZywgX3NjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSwgX3NjYW5uZXIuZ2V0VG9rZW5MZW5ndGgoKSwgX3NjYW5uZXIuZ2V0VG9rZW5TdGFydExpbmUoKSwgX3NjYW5uZXIuZ2V0VG9rZW5TdGFydENoYXJhY3RlcigpKTsgfSA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH07XG4gICAgfVxuICAgIHZhciBvbk9iamVjdEJlZ2luID0gdG9Ob0FyZ1Zpc2l0KHZpc2l0b3Iub25PYmplY3RCZWdpbiksIG9uT2JqZWN0UHJvcGVydHkgPSB0b09uZUFyZ1Zpc2l0KHZpc2l0b3Iub25PYmplY3RQcm9wZXJ0eSksIG9uT2JqZWN0RW5kID0gdG9Ob0FyZ1Zpc2l0KHZpc2l0b3Iub25PYmplY3RFbmQpLCBvbkFycmF5QmVnaW4gPSB0b05vQXJnVmlzaXQodmlzaXRvci5vbkFycmF5QmVnaW4pLCBvbkFycmF5RW5kID0gdG9Ob0FyZ1Zpc2l0KHZpc2l0b3Iub25BcnJheUVuZCksIG9uTGl0ZXJhbFZhbHVlID0gdG9PbmVBcmdWaXNpdCh2aXNpdG9yLm9uTGl0ZXJhbFZhbHVlKSwgb25TZXBhcmF0b3IgPSB0b09uZUFyZ1Zpc2l0KHZpc2l0b3Iub25TZXBhcmF0b3IpLCBvbkNvbW1lbnQgPSB0b05vQXJnVmlzaXQodmlzaXRvci5vbkNvbW1lbnQpLCBvbkVycm9yID0gdG9PbmVBcmdWaXNpdCh2aXNpdG9yLm9uRXJyb3IpO1xuICAgIHZhciBkaXNhbGxvd0NvbW1lbnRzID0gb3B0aW9ucyAmJiBvcHRpb25zLmRpc2FsbG93Q29tbWVudHM7XG4gICAgdmFyIGFsbG93VHJhaWxpbmdDb21tYSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd1RyYWlsaW5nQ29tbWE7XG4gICAgZnVuY3Rpb24gc2Nhbk5leHQoKSB7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBfc2Nhbm5lci5zY2FuKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKF9zY2FubmVyLmdldFRva2VuRXJyb3IoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgNCAvKiBJbnZhbGlkVW5pY29kZSAqLzpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoMTQgLyogSW52YWxpZFVuaWNvZGUgKi8pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDUgLyogSW52YWxpZEVzY2FwZUNoYXJhY3RlciAqLzpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoMTUgLyogSW52YWxpZEVzY2FwZUNoYXJhY3RlciAqLyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMyAvKiBVbmV4cGVjdGVkRW5kT2ZOdW1iZXIgKi86XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDEzIC8qIFVuZXhwZWN0ZWRFbmRPZk51bWJlciAqLyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMSAvKiBVbmV4cGVjdGVkRW5kT2ZDb21tZW50ICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc2FsbG93Q29tbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDExIC8qIFVuZXhwZWN0ZWRFbmRPZkNvbW1lbnQgKi8pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMiAvKiBVbmV4cGVjdGVkRW5kT2ZTdHJpbmcgKi86XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDEyIC8qIFVuZXhwZWN0ZWRFbmRPZlN0cmluZyAqLyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNiAvKiBJbnZhbGlkQ2hhcmFjdGVyICovOlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigxNiAvKiBJbnZhbGlkQ2hhcmFjdGVyICovKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxMiAvKiBMaW5lQ29tbWVudFRyaXZpYSAqLzpcbiAgICAgICAgICAgICAgICBjYXNlIDEzIC8qIEJsb2NrQ29tbWVudFRyaXZpYSAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FsbG93Q29tbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDEwIC8qIEludmFsaWRDb21tZW50VG9rZW4gKi8pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21tZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxNiAvKiBVbmtub3duICovOlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigxIC8qIEludmFsaWRTeW1ib2wgKi8pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE1IC8qIFRyaXZpYSAqLzpcbiAgICAgICAgICAgICAgICBjYXNlIDE0IC8qIExpbmVCcmVha1RyaXZpYSAqLzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yLCBza2lwVW50aWxBZnRlciwgc2tpcFVudGlsKSB7XG4gICAgICAgIGlmIChza2lwVW50aWxBZnRlciA9PT0gdm9pZCAwKSB7IHNraXBVbnRpbEFmdGVyID0gW107IH1cbiAgICAgICAgaWYgKHNraXBVbnRpbCA9PT0gdm9pZCAwKSB7IHNraXBVbnRpbCA9IFtdOyB9XG4gICAgICAgIG9uRXJyb3IoZXJyb3IpO1xuICAgICAgICBpZiAoc2tpcFVudGlsQWZ0ZXIubGVuZ3RoICsgc2tpcFVudGlsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IF9zY2FubmVyLmdldFRva2VuKCk7XG4gICAgICAgICAgICB3aGlsZSAodG9rZW4gIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgICAgIGlmIChza2lwVW50aWxBZnRlci5pbmRleE9mKHRva2VuKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nhbk5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNraXBVbnRpbC5pbmRleE9mKHRva2VuKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRva2VuID0gc2Nhbk5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZVN0cmluZyhpc1ZhbHVlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IF9zY2FubmVyLmdldFRva2VuVmFsdWUoKTtcbiAgICAgICAgaWYgKGlzVmFsdWUpIHtcbiAgICAgICAgICAgIG9uTGl0ZXJhbFZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9uT2JqZWN0UHJvcGVydHkodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHNjYW5OZXh0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZUxpdGVyYWwoKSB7XG4gICAgICAgIHN3aXRjaCAoX3NjYW5uZXIuZ2V0VG9rZW4oKSkge1xuICAgICAgICAgICAgY2FzZSAxMSAvKiBOdW1lcmljTGl0ZXJhbCAqLzpcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5WYWx1ZSA9IF9zY2FubmVyLmdldFRva2VuVmFsdWUoKTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBOdW1iZXIodG9rZW5WYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcigyIC8qIEludmFsaWROdW1iZXJGb3JtYXQgKi8pO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uTGl0ZXJhbFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNyAvKiBOdWxsS2V5d29yZCAqLzpcbiAgICAgICAgICAgICAgICBvbkxpdGVyYWxWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOCAvKiBUcnVlS2V5d29yZCAqLzpcbiAgICAgICAgICAgICAgICBvbkxpdGVyYWxWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOSAvKiBGYWxzZUtleXdvcmQgKi86XG4gICAgICAgICAgICAgICAgb25MaXRlcmFsVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2Nhbk5leHQoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlUHJvcGVydHkoKSB7XG4gICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSAxMCAvKiBTdHJpbmdMaXRlcmFsICovKSB7XG4gICAgICAgICAgICBoYW5kbGVFcnJvcigzIC8qIFByb3BlcnR5TmFtZUV4cGVjdGVkICovLCBbXSwgWzIgLyogQ2xvc2VCcmFjZVRva2VuICovLCA1IC8qIENvbW1hVG9rZW4gKi9dKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwYXJzZVN0cmluZyhmYWxzZSk7XG4gICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpID09PSA2IC8qIENvbG9uVG9rZW4gKi8pIHtcbiAgICAgICAgICAgIG9uU2VwYXJhdG9yKCc6Jyk7XG4gICAgICAgICAgICBzY2FuTmV4dCgpOyAvLyBjb25zdW1lIGNvbG9uXG4gICAgICAgICAgICBpZiAoIXBhcnNlVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDQgLyogVmFsdWVFeHBlY3RlZCAqLywgW10sIFsyIC8qIENsb3NlQnJhY2VUb2tlbiAqLywgNSAvKiBDb21tYVRva2VuICovXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVFcnJvcig1IC8qIENvbG9uRXhwZWN0ZWQgKi8sIFtdLCBbMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi8sIDUgLyogQ29tbWFUb2tlbiAqL10pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZU9iamVjdCgpIHtcbiAgICAgICAgb25PYmplY3RCZWdpbigpO1xuICAgICAgICBzY2FuTmV4dCgpOyAvLyBjb25zdW1lIG9wZW4gYnJhY2VcbiAgICAgICAgdmFyIG5lZWRzQ29tbWEgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKF9zY2FubmVyLmdldFRva2VuKCkgIT09IDIgLyogQ2xvc2VCcmFjZVRva2VuICovICYmIF9zY2FubmVyLmdldFRva2VuKCkgIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgaWYgKF9zY2FubmVyLmdldFRva2VuKCkgPT09IDUgLyogQ29tbWFUb2tlbiAqLykge1xuICAgICAgICAgICAgICAgIGlmICghbmVlZHNDb21tYSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcig0IC8qIFZhbHVlRXhwZWN0ZWQgKi8sIFtdLCBbXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uU2VwYXJhdG9yKCcsJyk7XG4gICAgICAgICAgICAgICAgc2Nhbk5leHQoKTsgLy8gY29uc3VtZSBjb21tYVxuICAgICAgICAgICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpID09PSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLyAmJiBhbGxvd1RyYWlsaW5nQ29tbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmVlZHNDb21tYSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKDYgLyogQ29tbWFFeHBlY3RlZCAqLywgW10sIFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcGFyc2VQcm9wZXJ0eSgpKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoNCAvKiBWYWx1ZUV4cGVjdGVkICovLCBbXSwgWzIgLyogQ2xvc2VCcmFjZVRva2VuICovLCA1IC8qIENvbW1hVG9rZW4gKi9dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5lZWRzQ29tbWEgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG9uT2JqZWN0RW5kKCk7XG4gICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLykge1xuICAgICAgICAgICAgaGFuZGxlRXJyb3IoNyAvKiBDbG9zZUJyYWNlRXhwZWN0ZWQgKi8sIFsyIC8qIENsb3NlQnJhY2VUb2tlbiAqL10sIFtdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjYW5OZXh0KCk7IC8vIGNvbnN1bWUgY2xvc2UgYnJhY2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VBcnJheSgpIHtcbiAgICAgICAgb25BcnJheUJlZ2luKCk7XG4gICAgICAgIHNjYW5OZXh0KCk7IC8vIGNvbnN1bWUgb3BlbiBicmFja2V0XG4gICAgICAgIHZhciBuZWVkc0NvbW1hID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSA0IC8qIENsb3NlQnJhY2tldFRva2VuICovICYmIF9zY2FubmVyLmdldFRva2VuKCkgIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgaWYgKF9zY2FubmVyLmdldFRva2VuKCkgPT09IDUgLyogQ29tbWFUb2tlbiAqLykge1xuICAgICAgICAgICAgICAgIGlmICghbmVlZHNDb21tYSkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcig0IC8qIFZhbHVlRXhwZWN0ZWQgKi8sIFtdLCBbXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uU2VwYXJhdG9yKCcsJyk7XG4gICAgICAgICAgICAgICAgc2Nhbk5leHQoKTsgLy8gY29uc3VtZSBjb21tYVxuICAgICAgICAgICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpID09PSA0IC8qIENsb3NlQnJhY2tldFRva2VuICovICYmIGFsbG93VHJhaWxpbmdDb21tYSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZWVkc0NvbW1hKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoNiAvKiBDb21tYUV4cGVjdGVkICovLCBbXSwgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwYXJzZVZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcig0IC8qIFZhbHVlRXhwZWN0ZWQgKi8sIFtdLCBbNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqLywgNSAvKiBDb21tYVRva2VuICovXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZWVkc0NvbW1hID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBvbkFycmF5RW5kKCk7XG4gICAgICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSA0IC8qIENsb3NlQnJhY2tldFRva2VuICovKSB7XG4gICAgICAgICAgICBoYW5kbGVFcnJvcig4IC8qIENsb3NlQnJhY2tldEV4cGVjdGVkICovLCBbNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqL10sIFtdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjYW5OZXh0KCk7IC8vIGNvbnN1bWUgY2xvc2UgYnJhY2tldFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZVZhbHVlKCkge1xuICAgICAgICBzd2l0Y2ggKF9zY2FubmVyLmdldFRva2VuKCkpIHtcbiAgICAgICAgICAgIGNhc2UgMyAvKiBPcGVuQnJhY2tldFRva2VuICovOlxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUFycmF5KCk7XG4gICAgICAgICAgICBjYXNlIDEgLyogT3BlbkJyYWNlVG9rZW4gKi86XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlT2JqZWN0KCk7XG4gICAgICAgICAgICBjYXNlIDEwIC8qIFN0cmluZ0xpdGVyYWwgKi86XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlU3RyaW5nKHRydWUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VMaXRlcmFsKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2Nhbk5leHQoKTtcbiAgICBpZiAoX3NjYW5uZXIuZ2V0VG9rZW4oKSA9PT0gMTcgLyogRU9GICovKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFsbG93RW1wdHlDb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVFcnJvcig0IC8qIFZhbHVlRXhwZWN0ZWQgKi8sIFtdLCBbXSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFwYXJzZVZhbHVlKCkpIHtcbiAgICAgICAgaGFuZGxlRXJyb3IoNCAvKiBWYWx1ZUV4cGVjdGVkICovLCBbXSwgW10pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChfc2Nhbm5lci5nZXRUb2tlbigpICE9PSAxNyAvKiBFT0YgKi8pIHtcbiAgICAgICAgaGFuZGxlRXJyb3IoOSAvKiBFbmRPZkZpbGVFeHBlY3RlZCAqLywgW10sIFtdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4vKipcbiAqIFRha2VzIEpTT04gd2l0aCBKYXZhU2NyaXB0LXN0eWxlIGNvbW1lbnRzIGFuZCByZW1vdmVcbiAqIHRoZW0uIE9wdGlvbmFsbHkgcmVwbGFjZXMgZXZlcnkgbm9uZS1uZXdsaW5lIGNoYXJhY3RlclxuICogb2YgY29tbWVudHMgd2l0aCBhIHJlcGxhY2VDaGFyYWN0ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwQ29tbWVudHModGV4dCwgcmVwbGFjZUNoKSB7XG4gICAgdmFyIF9zY2FubmVyID0gY3JlYXRlU2Nhbm5lcih0ZXh0KSwgcGFydHMgPSBbXSwga2luZCwgb2Zmc2V0ID0gMCwgcG9zO1xuICAgIGRvIHtcbiAgICAgICAgcG9zID0gX3NjYW5uZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAga2luZCA9IF9zY2FubmVyLnNjYW4oKTtcbiAgICAgICAgc3dpdGNoIChraW5kKSB7XG4gICAgICAgICAgICBjYXNlIDEyIC8qIExpbmVDb21tZW50VHJpdmlhICovOlxuICAgICAgICAgICAgY2FzZSAxMyAvKiBCbG9ja0NvbW1lbnRUcml2aWEgKi86XG4gICAgICAgICAgICBjYXNlIDE3IC8qIEVPRiAqLzpcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ICE9PSBwb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaCh0ZXh0LnN1YnN0cmluZyhvZmZzZXQsIHBvcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVwbGFjZUNoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaChfc2Nhbm5lci5nZXRUb2tlblZhbHVlKCkucmVwbGFjZSgvW15cXHJcXG5dL2csIHJlcGxhY2VDaCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBfc2Nhbm5lci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSB3aGlsZSAoa2luZCAhPT0gMTcgLyogRU9GICovKTtcbiAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZVR5cGUodmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICBjYXNlICdib29sZWFuJzogcmV0dXJuICdib29sZWFuJztcbiAgICAgICAgY2FzZSAnbnVtYmVyJzogcmV0dXJuICdudW1iZXInO1xuICAgICAgICBjYXNlICdzdHJpbmcnOiByZXR1cm4gJ3N0cmluZyc7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2FycmF5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiByZXR1cm4gJ251bGwnO1xuICAgIH1cbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgeyBlZGl0b3IgfSBmcm9tICcuL2ZpbGxlcnMvbW9uYWNvLWVkaXRvci1jb3JlLmpzJztcclxudmFyIFNUT1BfV0hFTl9JRExFX0ZPUiA9IDIgKiA2MCAqIDEwMDA7IC8vIDJtaW5cclxudmFyIFdvcmtlck1hbmFnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXb3JrZXJNYW5hZ2VyKGRlZmF1bHRzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xyXG4gICAgICAgIHRoaXMuX3dvcmtlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faWRsZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fY2hlY2tJZklkbGUoKTsgfSwgMzAgKiAxMDAwKTtcclxuICAgICAgICB0aGlzLl9sYXN0VXNlZFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZ0NoYW5nZUxpc3RlbmVyID0gdGhpcy5fZGVmYXVsdHMub25EaWRDaGFuZ2UoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3N0b3BXb3JrZXIoKTsgfSk7XHJcbiAgICB9XHJcbiAgICBXb3JrZXJNYW5hZ2VyLnByb3RvdHlwZS5fc3RvcFdvcmtlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fd29ya2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dvcmtlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3dvcmtlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NsaWVudCA9IG51bGw7XHJcbiAgICB9O1xyXG4gICAgV29ya2VyTWFuYWdlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX2lkbGVDaGVja0ludGVydmFsKTtcclxuICAgICAgICB0aGlzLl9jb25maWdDaGFuZ2VMaXN0ZW5lci5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5fc3RvcFdvcmtlcigpO1xyXG4gICAgfTtcclxuICAgIFdvcmtlck1hbmFnZXIucHJvdG90eXBlLl9jaGVja0lmSWRsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3dvcmtlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0aW1lUGFzc2VkU2luY2VMYXN0VXNlZCA9IERhdGUubm93KCkgLSB0aGlzLl9sYXN0VXNlZFRpbWU7XHJcbiAgICAgICAgaWYgKHRpbWVQYXNzZWRTaW5jZUxhc3RVc2VkID4gU1RPUF9XSEVOX0lETEVfRk9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BXb3JrZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgV29ya2VyTWFuYWdlci5wcm90b3R5cGUuX2dldENsaWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9sYXN0VXNlZFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmICghdGhpcy5fY2xpZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dvcmtlciA9IGVkaXRvci5jcmVhdGVXZWJXb3JrZXIoe1xyXG4gICAgICAgICAgICAgICAgLy8gbW9kdWxlIHRoYXQgZXhwb3J0cyB0aGUgY3JlYXRlKCkgbWV0aG9kIGFuZCByZXR1cm5zIGEgYEpTT05Xb3JrZXJgIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICBtb2R1bGVJZDogJ3ZzL2xhbmd1YWdlL2pzb24vanNvbldvcmtlcicsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5fZGVmYXVsdHMubGFuZ3VhZ2VJZCxcclxuICAgICAgICAgICAgICAgIC8vIHBhc3NlZCBpbiB0byB0aGUgY3JlYXRlKCkgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VTZXR0aW5nczogdGhpcy5fZGVmYXVsdHMuZGlhZ25vc3RpY3NPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlSWQ6IHRoaXMuX2RlZmF1bHRzLmxhbmd1YWdlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlU2NoZW1hUmVxdWVzdDogdGhpcy5fZGVmYXVsdHMuZGlhZ25vc3RpY3NPcHRpb25zLmVuYWJsZVNjaGVtYVJlcXVlc3RcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWVudCA9IHRoaXMuX3dvcmtlci5nZXRQcm94eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fY2xpZW50O1xyXG4gICAgfTtcclxuICAgIFdvcmtlck1hbmFnZXIucHJvdG90eXBlLmdldExhbmd1YWdlU2VydmljZVdvcmtlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciByZXNvdXJjZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICByZXNvdXJjZXNbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIF9jbGllbnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENsaWVudCgpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChjbGllbnQpIHtcclxuICAgICAgICAgICAgX2NsaWVudCA9IGNsaWVudDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoXykge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuX3dvcmtlci53aXRoU3luY2VkUmVzb3VyY2VzKHJlc291cmNlcyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKF8pIHsgcmV0dXJuIF9jbGllbnQ7IH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBXb3JrZXJNYW5hZ2VyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBXb3JrZXJNYW5hZ2VyIH07XHJcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDcmVhdGVzIGEgSlNPTiBzY2FubmVyIG9uIHRoZSBnaXZlbiB0ZXh0LlxuICogSWYgaWdub3JlVHJpdmlhIGlzIHNldCwgd2hpdGVzcGFjZXMgb3IgY29tbWVudHMgYXJlIGlnbm9yZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTY2FubmVyKHRleHQsIGlnbm9yZVRyaXZpYSkge1xuICAgIGlmIChpZ25vcmVUcml2aWEgPT09IHZvaWQgMCkgeyBpZ25vcmVUcml2aWEgPSBmYWxzZTsgfVxuICAgIHZhciBsZW4gPSB0ZXh0Lmxlbmd0aDtcbiAgICB2YXIgcG9zID0gMCwgdmFsdWUgPSAnJywgdG9rZW5PZmZzZXQgPSAwLCB0b2tlbiA9IDE2IC8qIFVua25vd24gKi8sIGxpbmVOdW1iZXIgPSAwLCBsaW5lU3RhcnRPZmZzZXQgPSAwLCB0b2tlbkxpbmVTdGFydE9mZnNldCA9IDAsIHByZXZUb2tlbkxpbmVTdGFydE9mZnNldCA9IDAsIHNjYW5FcnJvciA9IDAgLyogTm9uZSAqLztcbiAgICBmdW5jdGlvbiBzY2FuSGV4RGlnaXRzKGNvdW50LCBleGFjdCkge1xuICAgICAgICB2YXIgZGlnaXRzID0gMDtcbiAgICAgICAgdmFyIHZhbHVlID0gMDtcbiAgICAgICAgd2hpbGUgKGRpZ2l0cyA8IGNvdW50IHx8ICFleGFjdCkge1xuICAgICAgICAgICAgdmFyIGNoID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgICAgICBpZiAoY2ggPj0gNDggLyogXzAgKi8gJiYgY2ggPD0gNTcgLyogXzkgKi8pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICogMTYgKyBjaCAtIDQ4IC8qIF8wICovO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPj0gNjUgLyogQSAqLyAmJiBjaCA8PSA3MCAvKiBGICovKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAqIDE2ICsgY2ggLSA2NSAvKiBBICovICsgMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA+PSA5NyAvKiBhICovICYmIGNoIDw9IDEwMiAvKiBmICovKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAqIDE2ICsgY2ggLSA5NyAvKiBhICovICsgMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgZGlnaXRzKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpZ2l0cyA8IGNvdW50KSB7XG4gICAgICAgICAgICB2YWx1ZSA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0UG9zaXRpb24obmV3UG9zaXRpb24pIHtcbiAgICAgICAgcG9zID0gbmV3UG9zaXRpb247XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgICAgIHRva2VuT2Zmc2V0ID0gMDtcbiAgICAgICAgdG9rZW4gPSAxNiAvKiBVbmtub3duICovO1xuICAgICAgICBzY2FuRXJyb3IgPSAwIC8qIE5vbmUgKi87XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjYW5OdW1iZXIoKSB7XG4gICAgICAgIHZhciBzdGFydCA9IHBvcztcbiAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChwb3MpID09PSA0OCAvKiBfMCAqLykge1xuICAgICAgICAgICAgcG9zKys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIHdoaWxlIChwb3MgPCB0ZXh0Lmxlbmd0aCAmJiBpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwb3MgPCB0ZXh0Lmxlbmd0aCAmJiB0ZXh0LmNoYXJDb2RlQXQocG9zKSA9PT0gNDYgLyogZG90ICovKSB7XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIGlmIChwb3MgPCB0ZXh0Lmxlbmd0aCAmJiBpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHdoaWxlIChwb3MgPCB0ZXh0Lmxlbmd0aCAmJiBpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY2FuRXJyb3IgPSAzIC8qIFVuZXhwZWN0ZWRFbmRPZk51bWJlciAqLztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVuZCA9IHBvcztcbiAgICAgICAgaWYgKHBvcyA8IHRleHQubGVuZ3RoICYmICh0ZXh0LmNoYXJDb2RlQXQocG9zKSA9PT0gNjkgLyogRSAqLyB8fCB0ZXh0LmNoYXJDb2RlQXQocG9zKSA9PT0gMTAxIC8qIGUgKi8pKSB7XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIGlmIChwb3MgPCB0ZXh0Lmxlbmd0aCAmJiB0ZXh0LmNoYXJDb2RlQXQocG9zKSA9PT0gNDMgLyogcGx1cyAqLyB8fCB0ZXh0LmNoYXJDb2RlQXQocG9zKSA9PT0gNDUgLyogbWludXMgKi8pIHtcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwb3MgPCB0ZXh0Lmxlbmd0aCAmJiBpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHdoaWxlIChwb3MgPCB0ZXh0Lmxlbmd0aCAmJiBpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZW5kID0gcG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NhbkVycm9yID0gMyAvKiBVbmV4cGVjdGVkRW5kT2ZOdW1iZXIgKi87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzY2FuU3RyaW5nKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gJycsIHN0YXJ0ID0gcG9zO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHBvcyA+PSBsZW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIHBvcyk7XG4gICAgICAgICAgICAgICAgc2NhbkVycm9yID0gMiAvKiBVbmV4cGVjdGVkRW5kT2ZTdHJpbmcgKi87XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2ggPSB0ZXh0LmNoYXJDb2RlQXQocG9zKTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gMzQgLyogZG91YmxlUXVvdGUgKi8pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIHBvcyk7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2ggPT09IDkyIC8qIGJhY2tzbGFzaCAqLykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcG9zKTtcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICBpZiAocG9zID49IGxlbikge1xuICAgICAgICAgICAgICAgICAgICBzY2FuRXJyb3IgPSAyIC8qIFVuZXhwZWN0ZWRFbmRPZlN0cmluZyAqLztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjaDIgPSB0ZXh0LmNoYXJDb2RlQXQocG9zKyspO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2gyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzQgLyogZG91YmxlUXVvdGUgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTIgLyogYmFja3NsYXNoICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICdcXFxcJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ3IC8qIHNsYXNoICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICcvJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk4IC8qIGIgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcYic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDIgLyogZiAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxmJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExMCAvKiBuICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE0IC8qIHIgKi86XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xccic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTYgLyogdCAqLzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnXFx0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExNyAvKiB1ICovOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoMyA9IHNjYW5IZXhEaWdpdHMoNCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2gzID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaDMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbkVycm9yID0gNCAvKiBJbnZhbGlkVW5pY29kZSAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbkVycm9yID0gNSAvKiBJbnZhbGlkRXNjYXBlQ2hhcmFjdGVyICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFydCA9IHBvcztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaCA+PSAwICYmIGNoIDw9IDB4MWYpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNMaW5lQnJlYWsoY2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0ZXh0LnN1YnN0cmluZyhzdGFydCwgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgc2NhbkVycm9yID0gMiAvKiBVbmV4cGVjdGVkRW5kT2ZTdHJpbmcgKi87XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2NhbkVycm9yID0gNiAvKiBJbnZhbGlkQ2hhcmFjdGVyICovO1xuICAgICAgICAgICAgICAgICAgICAvLyBtYXJrIGFzIGVycm9yIGJ1dCBjb250aW51ZSB3aXRoIHN0cmluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvcysrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjYW5OZXh0KCkge1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgICBzY2FuRXJyb3IgPSAwIC8qIE5vbmUgKi87XG4gICAgICAgIHRva2VuT2Zmc2V0ID0gcG9zO1xuICAgICAgICBsaW5lU3RhcnRPZmZzZXQgPSBsaW5lTnVtYmVyO1xuICAgICAgICBwcmV2VG9rZW5MaW5lU3RhcnRPZmZzZXQgPSB0b2tlbkxpbmVTdGFydE9mZnNldDtcbiAgICAgICAgaWYgKHBvcyA+PSBsZW4pIHtcbiAgICAgICAgICAgIC8vIGF0IHRoZSBlbmRcbiAgICAgICAgICAgIHRva2VuT2Zmc2V0ID0gbGVuO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gMTcgLyogRU9GICovO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb2RlID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgIC8vIHRyaXZpYTogd2hpdGVzcGFjZVxuICAgICAgICBpZiAoaXNXaGl0ZVNwYWNlKGNvZGUpKSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgICAgICAgICBjb2RlID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgICAgICB9IHdoaWxlIChpc1doaXRlU3BhY2UoY29kZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gMTUgLyogVHJpdmlhICovO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRyaXZpYTogbmV3bGluZXNcbiAgICAgICAgaWYgKGlzTGluZUJyZWFrKGNvZGUpKSB7XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIHZhbHVlICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gMTMgLyogY2FycmlhZ2VSZXR1cm4gKi8gJiYgdGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDEwIC8qIGxpbmVGZWVkICovKSB7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gJ1xcbic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW5lTnVtYmVyKys7XG4gICAgICAgICAgICB0b2tlbkxpbmVTdGFydE9mZnNldCA9IHBvcztcbiAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDE0IC8qIExpbmVCcmVha1RyaXZpYSAqLztcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgICAgICAgIC8vIHRva2VuczogW117fTosXG4gICAgICAgICAgICBjYXNlIDEyMyAvKiBvcGVuQnJhY2UgKi86XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gMSAvKiBPcGVuQnJhY2VUb2tlbiAqLztcbiAgICAgICAgICAgIGNhc2UgMTI1IC8qIGNsb3NlQnJhY2UgKi86XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi87XG4gICAgICAgICAgICBjYXNlIDkxIC8qIG9wZW5CcmFja2V0ICovOlxuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDMgLyogT3BlbkJyYWNrZXRUb2tlbiAqLztcbiAgICAgICAgICAgIGNhc2UgOTMgLyogY2xvc2VCcmFja2V0ICovOlxuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDQgLyogQ2xvc2VCcmFja2V0VG9rZW4gKi87XG4gICAgICAgICAgICBjYXNlIDU4IC8qIGNvbG9uICovOlxuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDYgLyogQ29sb25Ub2tlbiAqLztcbiAgICAgICAgICAgIGNhc2UgNDQgLyogY29tbWEgKi86XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuID0gNSAvKiBDb21tYVRva2VuICovO1xuICAgICAgICAgICAgLy8gc3RyaW5nc1xuICAgICAgICAgICAgY2FzZSAzNCAvKiBkb3VibGVRdW90ZSAqLzpcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHNjYW5TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxMCAvKiBTdHJpbmdMaXRlcmFsICovO1xuICAgICAgICAgICAgLy8gY29tbWVudHNcbiAgICAgICAgICAgIGNhc2UgNDcgLyogc2xhc2ggKi86XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gcG9zIC0gMTtcbiAgICAgICAgICAgICAgICAvLyBTaW5nbGUtbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChwb3MgKyAxKSA9PT0gNDcgLyogc2xhc2ggKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zICs9IDI7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0xpbmVCcmVhayh0ZXh0LmNoYXJDb2RlQXQocG9zKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDEyIC8qIExpbmVDb21tZW50VHJpdmlhICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBNdWx0aS1saW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KHBvcyArIDEpID09PSA0MiAvKiBhc3RlcmlzayAqLykge1xuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhZmVMZW5ndGggPSBsZW4gLSAxOyAvLyBGb3IgbG9va2FoZWFkLlxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWVudENsb3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocG9zIDwgc2FmZUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2ggPT09IDQyIC8qIGFzdGVyaXNrICovICYmIHRleHQuY2hhckNvZGVBdChwb3MgKyAxKSA9PT0gNDcgLyogc2xhc2ggKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50Q2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTGluZUJyZWFrKGNoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gMTMgLyogY2FycmlhZ2VSZXR1cm4gKi8gJiYgdGV4dC5jaGFyQ29kZUF0KHBvcykgPT09IDEwIC8qIGxpbmVGZWVkICovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5MaW5lU3RhcnRPZmZzZXQgPSBwb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb21tZW50Q2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYW5FcnJvciA9IDEgLyogVW5leHBlY3RlZEVuZE9mQ29tbWVudCAqLztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0LCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxMyAvKiBCbG9ja0NvbW1lbnRUcml2aWEgKi87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGp1c3QgYSBzaW5nbGUgc2xhc2hcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbiA9IDE2IC8qIFVua25vd24gKi87XG4gICAgICAgICAgICAvLyBudW1iZXJzXG4gICAgICAgICAgICBjYXNlIDQ1IC8qIG1pbnVzICovOlxuICAgICAgICAgICAgICAgIHZhbHVlICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA9PT0gbGVuIHx8ICFpc0RpZ2l0KHRleHQuY2hhckNvZGVBdChwb3MpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNiAvKiBVbmtub3duICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvdW5kIGEgbWludXMsIGZvbGxvd2VkIGJ5IGEgbnVtYmVyIHNvXG4gICAgICAgICAgICAvLyB3ZSBmYWxsIHRocm91Z2ggdG8gcHJvY2VlZCB3aXRoIHNjYW5uaW5nXG4gICAgICAgICAgICAvLyBudW1iZXJzXG4gICAgICAgICAgICBjYXNlIDQ4IC8qIF8wICovOlxuICAgICAgICAgICAgY2FzZSA0OSAvKiBfMSAqLzpcbiAgICAgICAgICAgIGNhc2UgNTAgLyogXzIgKi86XG4gICAgICAgICAgICBjYXNlIDUxIC8qIF8zICovOlxuICAgICAgICAgICAgY2FzZSA1MiAvKiBfNCAqLzpcbiAgICAgICAgICAgIGNhc2UgNTMgLyogXzUgKi86XG4gICAgICAgICAgICBjYXNlIDU0IC8qIF82ICovOlxuICAgICAgICAgICAgY2FzZSA1NSAvKiBfNyAqLzpcbiAgICAgICAgICAgIGNhc2UgNTYgLyogXzggKi86XG4gICAgICAgICAgICBjYXNlIDU3IC8qIF85ICovOlxuICAgICAgICAgICAgICAgIHZhbHVlICs9IHNjYW5OdW1iZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxMSAvKiBOdW1lcmljTGl0ZXJhbCAqLztcbiAgICAgICAgICAgIC8vIGxpdGVyYWxzIGFuZCB1bmtub3duIHN5bWJvbHNcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gaXMgYSBsaXRlcmFsPyBSZWFkIHRoZSBmdWxsIHdvcmQuXG4gICAgICAgICAgICAgICAgd2hpbGUgKHBvcyA8IGxlbiAmJiBpc1Vua25vd25Db250ZW50Q2hhcmFjdGVyKGNvZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgICAgICBjb2RlID0gdGV4dC5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b2tlbk9mZnNldCAhPT0gcG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGV4dC5zdWJzdHJpbmcodG9rZW5PZmZzZXQsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGtleXdvcmRzOiB0cnVlLCBmYWxzZSwgbnVsbFxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0cnVlJzogcmV0dXJuIHRva2VuID0gOCAvKiBUcnVlS2V5d29yZCAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzogcmV0dXJuIHRva2VuID0gOSAvKiBGYWxzZUtleXdvcmQgKi87XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudWxsJzogcmV0dXJuIHRva2VuID0gNyAvKiBOdWxsS2V5d29yZCAqLztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNiAvKiBVbmtub3duICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4gPSAxNiAvKiBVbmtub3duICovO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzVW5rbm93bkNvbnRlbnRDaGFyYWN0ZXIoY29kZSkge1xuICAgICAgICBpZiAoaXNXaGl0ZVNwYWNlKGNvZGUpIHx8IGlzTGluZUJyZWFrKGNvZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDEyNSAvKiBjbG9zZUJyYWNlICovOlxuICAgICAgICAgICAgY2FzZSA5MyAvKiBjbG9zZUJyYWNrZXQgKi86XG4gICAgICAgICAgICBjYXNlIDEyMyAvKiBvcGVuQnJhY2UgKi86XG4gICAgICAgICAgICBjYXNlIDkxIC8qIG9wZW5CcmFja2V0ICovOlxuICAgICAgICAgICAgY2FzZSAzNCAvKiBkb3VibGVRdW90ZSAqLzpcbiAgICAgICAgICAgIGNhc2UgNTggLyogY29sb24gKi86XG4gICAgICAgICAgICBjYXNlIDQ0IC8qIGNvbW1hICovOlxuICAgICAgICAgICAgY2FzZSA0NyAvKiBzbGFzaCAqLzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjYW5OZXh0Tm9uVHJpdmlhKCkge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICByZXN1bHQgPSBzY2FuTmV4dCgpO1xuICAgICAgICB9IHdoaWxlIChyZXN1bHQgPj0gMTIgLyogTGluZUNvbW1lbnRUcml2aWEgKi8gJiYgcmVzdWx0IDw9IDE1IC8qIFRyaXZpYSAqLyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHNldFBvc2l0aW9uOiBzZXRQb3NpdGlvbixcbiAgICAgICAgZ2V0UG9zaXRpb246IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvczsgfSxcbiAgICAgICAgc2NhbjogaWdub3JlVHJpdmlhID8gc2Nhbk5leHROb25Ucml2aWEgOiBzY2FuTmV4dCxcbiAgICAgICAgZ2V0VG9rZW46IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRva2VuOyB9LFxuICAgICAgICBnZXRUb2tlblZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfSxcbiAgICAgICAgZ2V0VG9rZW5PZmZzZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRva2VuT2Zmc2V0OyB9LFxuICAgICAgICBnZXRUb2tlbkxlbmd0aDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9zIC0gdG9rZW5PZmZzZXQ7IH0sXG4gICAgICAgIGdldFRva2VuU3RhcnRMaW5lOiBmdW5jdGlvbiAoKSB7IHJldHVybiBsaW5lU3RhcnRPZmZzZXQ7IH0sXG4gICAgICAgIGdldFRva2VuU3RhcnRDaGFyYWN0ZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRva2VuT2Zmc2V0IC0gcHJldlRva2VuTGluZVN0YXJ0T2Zmc2V0OyB9LFxuICAgICAgICBnZXRUb2tlbkVycm9yOiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2FuRXJyb3I7IH0sXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGlzV2hpdGVTcGFjZShjaCkge1xuICAgIHJldHVybiBjaCA9PT0gMzIgLyogc3BhY2UgKi8gfHwgY2ggPT09IDkgLyogdGFiICovIHx8IGNoID09PSAxMSAvKiB2ZXJ0aWNhbFRhYiAqLyB8fCBjaCA9PT0gMTIgLyogZm9ybUZlZWQgKi8gfHxcbiAgICAgICAgY2ggPT09IDE2MCAvKiBub25CcmVha2luZ1NwYWNlICovIHx8IGNoID09PSA1NzYwIC8qIG9naGFtICovIHx8IGNoID49IDgxOTIgLyogZW5RdWFkICovICYmIGNoIDw9IDgyMDMgLyogemVyb1dpZHRoU3BhY2UgKi8gfHxcbiAgICAgICAgY2ggPT09IDgyMzkgLyogbmFycm93Tm9CcmVha1NwYWNlICovIHx8IGNoID09PSA4Mjg3IC8qIG1hdGhlbWF0aWNhbFNwYWNlICovIHx8IGNoID09PSAxMjI4OCAvKiBpZGVvZ3JhcGhpY1NwYWNlICovIHx8IGNoID09PSA2NTI3OSAvKiBieXRlT3JkZXJNYXJrICovO1xufVxuZnVuY3Rpb24gaXNMaW5lQnJlYWsoY2gpIHtcbiAgICByZXR1cm4gY2ggPT09IDEwIC8qIGxpbmVGZWVkICovIHx8IGNoID09PSAxMyAvKiBjYXJyaWFnZVJldHVybiAqLyB8fCBjaCA9PT0gODIzMiAvKiBsaW5lU2VwYXJhdG9yICovIHx8IGNoID09PSA4MjMzIC8qIHBhcmFncmFwaFNlcGFyYXRvciAqLztcbn1cbmZ1bmN0aW9uIGlzRGlnaXQoY2gpIHtcbiAgICByZXR1cm4gY2ggPj0gNDggLyogXzAgKi8gJiYgY2ggPD0gNTcgLyogXzkgKi87XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCAqIGFzIGZvcm1hdHRlciBmcm9tICcuL2ltcGwvZm9ybWF0LmpzJztcbmltcG9ydCAqIGFzIGVkaXQgZnJvbSAnLi9pbXBsL2VkaXQuanMnO1xuaW1wb3J0ICogYXMgc2Nhbm5lciBmcm9tICcuL2ltcGwvc2Nhbm5lci5qcyc7XG5pbXBvcnQgKiBhcyBwYXJzZXIgZnJvbSAnLi9pbXBsL3BhcnNlci5qcyc7XG4vKipcbiAqIENyZWF0ZXMgYSBKU09OIHNjYW5uZXIgb24gdGhlIGdpdmVuIHRleHQuXG4gKiBJZiBpZ25vcmVUcml2aWEgaXMgc2V0LCB3aGl0ZXNwYWNlcyBvciBjb21tZW50cyBhcmUgaWdub3JlZC5cbiAqL1xuZXhwb3J0IHZhciBjcmVhdGVTY2FubmVyID0gc2Nhbm5lci5jcmVhdGVTY2FubmVyO1xuLyoqXG4gKiBGb3IgYSBnaXZlbiBvZmZzZXQsIGV2YWx1YXRlIHRoZSBsb2NhdGlvbiBpbiB0aGUgSlNPTiBkb2N1bWVudC4gRWFjaCBzZWdtZW50IGluIHRoZSBsb2NhdGlvbiBwYXRoIGlzIGVpdGhlciBhIHByb3BlcnR5IG5hbWUgb3IgYW4gYXJyYXkgaW5kZXguXG4gKi9cbmV4cG9ydCB2YXIgZ2V0TG9jYXRpb24gPSBwYXJzZXIuZ2V0TG9jYXRpb247XG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gdGV4dCBhbmQgcmV0dXJucyB0aGUgb2JqZWN0IHRoZSBKU09OIGNvbnRlbnQgcmVwcmVzZW50cy4gT24gaW52YWxpZCBpbnB1dCwgdGhlIHBhcnNlciB0cmllcyB0byBiZSBhcyBmYXVsdCB0b2xlcmFudCBhcyBwb3NzaWJsZSwgYnV0IHN0aWxsIHJldHVybiBhIHJlc3VsdC5cbiAqIFRoZXJlZm9yZSwgYWx3YXlzIGNoZWNrIHRoZSBlcnJvcnMgbGlzdCB0byBmaW5kIG91dCBpZiB0aGUgaW5wdXQgd2FzIHZhbGlkLlxuICovXG5leHBvcnQgdmFyIHBhcnNlID0gcGFyc2VyLnBhcnNlO1xuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIHRleHQgYW5kIHJldHVybnMgYSB0cmVlIHJlcHJlc2VudGF0aW9uIHRoZSBKU09OIGNvbnRlbnQuIE9uIGludmFsaWQgaW5wdXQsIHRoZSBwYXJzZXIgdHJpZXMgdG8gYmUgYXMgZmF1bHQgdG9sZXJhbnQgYXMgcG9zc2libGUsIGJ1dCBzdGlsbCByZXR1cm4gYSByZXN1bHQuXG4gKi9cbmV4cG9ydCB2YXIgcGFyc2VUcmVlID0gcGFyc2VyLnBhcnNlVHJlZTtcbi8qKlxuICogRmluZHMgdGhlIG5vZGUgYXQgdGhlIGdpdmVuIHBhdGggaW4gYSBKU09OIERPTS5cbiAqL1xuZXhwb3J0IHZhciBmaW5kTm9kZUF0TG9jYXRpb24gPSBwYXJzZXIuZmluZE5vZGVBdExvY2F0aW9uO1xuLyoqXG4gKiBGaW5kcyB0aGUgaW5uZXJtb3N0IG5vZGUgYXQgdGhlIGdpdmVuIG9mZnNldC4gSWYgaW5jbHVkZVJpZ2h0Qm91bmQgaXMgc2V0LCBhbHNvIGZpbmRzIG5vZGVzIHRoYXQgZW5kIGF0IHRoZSBnaXZlbiBvZmZzZXQuXG4gKi9cbmV4cG9ydCB2YXIgZmluZE5vZGVBdE9mZnNldCA9IHBhcnNlci5maW5kTm9kZUF0T2Zmc2V0O1xuLyoqXG4gKiBHZXRzIHRoZSBKU09OIHBhdGggb2YgdGhlIGdpdmVuIEpTT04gRE9NIG5vZGVcbiAqL1xuZXhwb3J0IHZhciBnZXROb2RlUGF0aCA9IHBhcnNlci5nZXROb2RlUGF0aDtcbi8qKlxuICogRXZhbHVhdGVzIHRoZSBKYXZhU2NyaXB0IG9iamVjdCBvZiB0aGUgZ2l2ZW4gSlNPTiBET00gbm9kZVxuICovXG5leHBvcnQgdmFyIGdldE5vZGVWYWx1ZSA9IHBhcnNlci5nZXROb2RlVmFsdWU7XG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gdGV4dCBhbmQgaW52b2tlcyB0aGUgdmlzaXRvciBmdW5jdGlvbnMgZm9yIGVhY2ggb2JqZWN0LCBhcnJheSBhbmQgbGl0ZXJhbCByZWFjaGVkLlxuICovXG5leHBvcnQgdmFyIHZpc2l0ID0gcGFyc2VyLnZpc2l0O1xuLyoqXG4gKiBUYWtlcyBKU09OIHdpdGggSmF2YVNjcmlwdC1zdHlsZSBjb21tZW50cyBhbmQgcmVtb3ZlXG4gKiB0aGVtLiBPcHRpb25hbGx5IHJlcGxhY2VzIGV2ZXJ5IG5vbmUtbmV3bGluZSBjaGFyYWN0ZXJcbiAqIG9mIGNvbW1lbnRzIHdpdGggYSByZXBsYWNlQ2hhcmFjdGVyXG4gKi9cbmV4cG9ydCB2YXIgc3RyaXBDb21tZW50cyA9IHBhcnNlci5zdHJpcENvbW1lbnRzO1xuZXhwb3J0IGZ1bmN0aW9uIHByaW50UGFyc2VFcnJvckNvZGUoY29kZSkge1xuICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICBjYXNlIDEgLyogSW52YWxpZFN5bWJvbCAqLzogcmV0dXJuICdJbnZhbGlkU3ltYm9sJztcbiAgICAgICAgY2FzZSAyIC8qIEludmFsaWROdW1iZXJGb3JtYXQgKi86IHJldHVybiAnSW52YWxpZE51bWJlckZvcm1hdCc7XG4gICAgICAgIGNhc2UgMyAvKiBQcm9wZXJ0eU5hbWVFeHBlY3RlZCAqLzogcmV0dXJuICdQcm9wZXJ0eU5hbWVFeHBlY3RlZCc7XG4gICAgICAgIGNhc2UgNCAvKiBWYWx1ZUV4cGVjdGVkICovOiByZXR1cm4gJ1ZhbHVlRXhwZWN0ZWQnO1xuICAgICAgICBjYXNlIDUgLyogQ29sb25FeHBlY3RlZCAqLzogcmV0dXJuICdDb2xvbkV4cGVjdGVkJztcbiAgICAgICAgY2FzZSA2IC8qIENvbW1hRXhwZWN0ZWQgKi86IHJldHVybiAnQ29tbWFFeHBlY3RlZCc7XG4gICAgICAgIGNhc2UgNyAvKiBDbG9zZUJyYWNlRXhwZWN0ZWQgKi86IHJldHVybiAnQ2xvc2VCcmFjZUV4cGVjdGVkJztcbiAgICAgICAgY2FzZSA4IC8qIENsb3NlQnJhY2tldEV4cGVjdGVkICovOiByZXR1cm4gJ0Nsb3NlQnJhY2tldEV4cGVjdGVkJztcbiAgICAgICAgY2FzZSA5IC8qIEVuZE9mRmlsZUV4cGVjdGVkICovOiByZXR1cm4gJ0VuZE9mRmlsZUV4cGVjdGVkJztcbiAgICAgICAgY2FzZSAxMCAvKiBJbnZhbGlkQ29tbWVudFRva2VuICovOiByZXR1cm4gJ0ludmFsaWRDb21tZW50VG9rZW4nO1xuICAgICAgICBjYXNlIDExIC8qIFVuZXhwZWN0ZWRFbmRPZkNvbW1lbnQgKi86IHJldHVybiAnVW5leHBlY3RlZEVuZE9mQ29tbWVudCc7XG4gICAgICAgIGNhc2UgMTIgLyogVW5leHBlY3RlZEVuZE9mU3RyaW5nICovOiByZXR1cm4gJ1VuZXhwZWN0ZWRFbmRPZlN0cmluZyc7XG4gICAgICAgIGNhc2UgMTMgLyogVW5leHBlY3RlZEVuZE9mTnVtYmVyICovOiByZXR1cm4gJ1VuZXhwZWN0ZWRFbmRPZk51bWJlcic7XG4gICAgICAgIGNhc2UgMTQgLyogSW52YWxpZFVuaWNvZGUgKi86IHJldHVybiAnSW52YWxpZFVuaWNvZGUnO1xuICAgICAgICBjYXNlIDE1IC8qIEludmFsaWRFc2NhcGVDaGFyYWN0ZXIgKi86IHJldHVybiAnSW52YWxpZEVzY2FwZUNoYXJhY3Rlcic7XG4gICAgICAgIGNhc2UgMTYgLyogSW52YWxpZENoYXJhY3RlciAqLzogcmV0dXJuICdJbnZhbGlkQ2hhcmFjdGVyJztcbiAgICB9XG4gICAgcmV0dXJuICc8dW5rbm93biBQYXJzZUVycm9yQ29kZT4nO1xufVxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZWRpdHMgbmVlZGVkIHRvIGZvcm1hdCBhIEpTT04gZG9jdW1lbnQuXG4gKlxuICogQHBhcmFtIGRvY3VtZW50VGV4dCBUaGUgaW5wdXQgdGV4dFxuICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSB0byBmb3JtYXQgb3IgYHVuZGVmaW5lZGAgdG8gZm9ybWF0IHRoZSBmdWxsIGNvbnRlbnRcbiAqIEBwYXJhbSBvcHRpb25zIFRoZSBmb3JtYXR0aW5nIG9wdGlvbnNcbiAqIEByZXR1cm5zIEEgbGlzdCBvZiBlZGl0IG9wZXJhdGlvbnMgZGVzY3JpYmluZyB0aGUgZm9ybWF0dGluZyBjaGFuZ2VzIHRvIHRoZSBvcmlnaW5hbCBkb2N1bWVudC4gRWRpdHMgY2FuIGJlIGVpdGhlciBpbnNlcnRzLCByZXBsYWNlbWVudHMgb3JcbiAqIHJlbW92YWxzIG9mIHRleHQgc2VnbWVudHMuIEFsbCBvZmZzZXRzIHJlZmVyIHRvIHRoZSBvcmlnaW5hbCBzdGF0ZSBvZiB0aGUgZG9jdW1lbnQuIE5vIHR3byBlZGl0cyBtdXN0IGNoYW5nZSBvciByZW1vdmUgdGhlIHNhbWUgcmFuZ2Ugb2ZcbiAqIHRleHQgaW4gdGhlIG9yaWdpbmFsIGRvY3VtZW50LiBIb3dldmVyLCBtdWx0aXBsZSBlZGl0cyBjYW4gaGF2ZVxuICogdGhlIHNhbWUgb2Zmc2V0LCBmb3IgZXhhbXBsZSBtdWx0aXBsZSBpbnNlcnRzLCBvciBhbiBpbnNlcnQgZm9sbG93ZWQgYnkgYSByZW1vdmUgb3IgcmVwbGFjZS4gVGhlIG9yZGVyIGluIHRoZSBhcnJheSBkZWZpbmVzIHdoaWNoIGVkaXQgaXMgYXBwbGllZCBmaXJzdC5cbiAqIFRvIGFwcGx5IGVkaXRzIHRvIGFuIGlucHV0LCB5b3UgY2FuIHVzZSBgYXBwbHlFZGl0c2AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoZG9jdW1lbnRUZXh0LCByYW5nZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBmb3JtYXR0ZXIuZm9ybWF0KGRvY3VtZW50VGV4dCwgcmFuZ2UsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZWRpdHMgbmVlZGVkIHRvIG1vZGlmeSBhIHZhbHVlIGluIHRoZSBKU09OIGRvY3VtZW50LlxuICpcbiAqIEBwYXJhbSBkb2N1bWVudFRleHQgVGhlIGlucHV0IHRleHRcbiAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIG9mIHRoZSB2YWx1ZSB0byBjaGFuZ2UuIFRoZSBwYXRoIHJlcHJlc2VudHMgZWl0aGVyIHRvIHRoZSBkb2N1bWVudCByb290LCBhIHByb3BlcnR5IG9yIGFuIGFycmF5IGl0ZW0uXG4gKiBJZiB0aGUgcGF0aCBwb2ludHMgdG8gYW4gbm9uLWV4aXN0aW5nIHByb3BlcnR5IG9yIGl0ZW0sIGl0IHdpbGwgYmUgY3JlYXRlZC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgbmV3IHZhbHVlIGZvciB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IG9yIGl0ZW0uIElmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsXG4gKiB0aGUgcHJvcGVydHkgb3IgaXRlbSB3aWxsIGJlIHJlbW92ZWQuXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zXG4gKiBAcmV0dXJucyBBIGxpc3Qgb2YgZWRpdCBvcGVyYXRpb25zIGRlc2NyaWJpbmcgdGhlIGZvcm1hdHRpbmcgY2hhbmdlcyB0byB0aGUgb3JpZ2luYWwgZG9jdW1lbnQuIEVkaXRzIGNhbiBiZSBlaXRoZXIgaW5zZXJ0cywgcmVwbGFjZW1lbnRzIG9yXG4gKiByZW1vdmFscyBvZiB0ZXh0IHNlZ21lbnRzLiBBbGwgb2Zmc2V0cyByZWZlciB0byB0aGUgb3JpZ2luYWwgc3RhdGUgb2YgdGhlIGRvY3VtZW50LiBObyB0d28gZWRpdHMgbXVzdCBjaGFuZ2Ugb3IgcmVtb3ZlIHRoZSBzYW1lIHJhbmdlIG9mXG4gKiB0ZXh0IGluIHRoZSBvcmlnaW5hbCBkb2N1bWVudC4gSG93ZXZlciwgbXVsdGlwbGUgZWRpdHMgY2FuIGhhdmVcbiAqIHRoZSBzYW1lIG9mZnNldCwgZm9yIGV4YW1wbGUgbXVsdGlwbGUgaW5zZXJ0cywgb3IgYW4gaW5zZXJ0IGZvbGxvd2VkIGJ5IGEgcmVtb3ZlIG9yIHJlcGxhY2UuIFRoZSBvcmRlciBpbiB0aGUgYXJyYXkgZGVmaW5lcyB3aGljaCBlZGl0IGlzIGFwcGxpZWQgZmlyc3QuXG4gKiBUbyBhcHBseSBlZGl0cyB0byBhbiBpbnB1dCwgeW91IGNhbiB1c2UgYGFwcGx5RWRpdHNgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbW9kaWZ5KHRleHQsIHBhdGgsIHZhbHVlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGVkaXQuc2V0UHJvcGVydHkodGV4dCwgcGF0aCwgdmFsdWUsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBBcHBsaWVzIGVkaXRzIHRvIGEgaW5wdXQgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlFZGl0cyh0ZXh0LCBlZGl0cykge1xuICAgIGZvciAodmFyIGkgPSBlZGl0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB0ZXh0ID0gZWRpdC5hcHBseUVkaXQodGV4dCwgZWRpdHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbn1cbiIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgaW50ZWdlcjtcbihmdW5jdGlvbiAoaW50ZWdlcikge1xuICAgIGludGVnZXIuTUlOX1ZBTFVFID0gLTIxNDc0ODM2NDg7XG4gICAgaW50ZWdlci5NQVhfVkFMVUUgPSAyMTQ3NDgzNjQ3O1xufSkoaW50ZWdlciB8fCAoaW50ZWdlciA9IHt9KSk7XG5leHBvcnQgdmFyIHVpbnRlZ2VyO1xuKGZ1bmN0aW9uICh1aW50ZWdlcikge1xuICAgIHVpbnRlZ2VyLk1JTl9WQUxVRSA9IDA7XG4gICAgdWludGVnZXIuTUFYX1ZBTFVFID0gMjE0NzQ4MzY0Nztcbn0pKHVpbnRlZ2VyIHx8ICh1aW50ZWdlciA9IHt9KSk7XG4vKipcbiAqIFRoZSBQb3NpdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIFtQb3NpdGlvbl0oI1Bvc2l0aW9uKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBQb3NpdGlvbjtcbihmdW5jdGlvbiAoUG9zaXRpb24pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFBvc2l0aW9uIGxpdGVyYWwgZnJvbSB0aGUgZ2l2ZW4gbGluZSBhbmQgY2hhcmFjdGVyLlxuICAgICAqIEBwYXJhbSBsaW5lIFRoZSBwb3NpdGlvbidzIGxpbmUuXG4gICAgICogQHBhcmFtIGNoYXJhY3RlciBUaGUgcG9zaXRpb24ncyBjaGFyYWN0ZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGxpbmUsIGNoYXJhY3Rlcikge1xuICAgICAgICBpZiAobGluZSA9PT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICAgICAgbGluZSA9IHVpbnRlZ2VyLk1BWF9WQUxVRTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhcmFjdGVyID09PSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSB1aW50ZWdlci5NQVhfVkFMVUU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgbGluZTogbGluZSwgY2hhcmFjdGVyOiBjaGFyYWN0ZXIgfTtcbiAgICB9XG4gICAgUG9zaXRpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbUG9zaXRpb25dKCNQb3NpdGlvbikgaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy51aW50ZWdlcihjYW5kaWRhdGUubGluZSkgJiYgSXMudWludGVnZXIoY2FuZGlkYXRlLmNoYXJhY3Rlcik7XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzID0gaXM7XG59KShQb3NpdGlvbiB8fCAoUG9zaXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgUmFuZ2UgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbUmFuZ2VdKCNSYW5nZSkgbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgUmFuZ2U7XG4oZnVuY3Rpb24gKFJhbmdlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKG9uZSwgdHdvLCB0aHJlZSwgZm91cikge1xuICAgICAgICBpZiAoSXMudWludGVnZXIob25lKSAmJiBJcy51aW50ZWdlcih0d28pICYmIElzLnVpbnRlZ2VyKHRocmVlKSAmJiBJcy51aW50ZWdlcihmb3VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IFBvc2l0aW9uLmNyZWF0ZShvbmUsIHR3byksIGVuZDogUG9zaXRpb24uY3JlYXRlKHRocmVlLCBmb3VyKSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFBvc2l0aW9uLmlzKG9uZSkgJiYgUG9zaXRpb24uaXModHdvKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IG9uZSwgZW5kOiB0d28gfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJhbmdlI2NyZWF0ZSBjYWxsZWQgd2l0aCBpbnZhbGlkIGFyZ3VtZW50c1tcIiArIG9uZSArIFwiLCBcIiArIHR3byArIFwiLCBcIiArIHRocmVlICsgXCIsIFwiICsgZm91ciArIFwiXVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSYW5nZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtSYW5nZV0oI1JhbmdlKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIFBvc2l0aW9uLmlzKGNhbmRpZGF0ZS5zdGFydCkgJiYgUG9zaXRpb24uaXMoY2FuZGlkYXRlLmVuZCk7XG4gICAgfVxuICAgIFJhbmdlLmlzID0gaXM7XG59KShSYW5nZSB8fCAoUmFuZ2UgPSB7fSkpO1xuLyoqXG4gKiBUaGUgTG9jYXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbTG9jYXRpb25dKCNMb2NhdGlvbikgbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgTG9jYXRpb247XG4oZnVuY3Rpb24gKExvY2F0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIExvY2F0aW9uIGxpdGVyYWwuXG4gICAgICogQHBhcmFtIHVyaSBUaGUgbG9jYXRpb24ncyB1cmkuXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSBsb2NhdGlvbidzIHJhbmdlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIHJhbmdlKSB7XG4gICAgICAgIHJldHVybiB7IHVyaTogdXJpLCByYW5nZTogcmFuZ2UgfTtcbiAgICB9XG4gICAgTG9jYXRpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbTG9jYXRpb25dKCNMb2NhdGlvbikgaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpICYmIChJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS51cmkpKTtcbiAgICB9XG4gICAgTG9jYXRpb24uaXMgPSBpcztcbn0pKExvY2F0aW9uIHx8IChMb2NhdGlvbiA9IHt9KSk7XG4vKipcbiAqIFRoZSBMb2NhdGlvbkxpbmsgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbTG9jYXRpb25MaW5rXSgjTG9jYXRpb25MaW5rKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBMb2NhdGlvbkxpbms7XG4oZnVuY3Rpb24gKExvY2F0aW9uTGluaykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBMb2NhdGlvbkxpbmsgbGl0ZXJhbC5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0VXJpIFRoZSBkZWZpbml0aW9uJ3MgdXJpLlxuICAgICAqIEBwYXJhbSB0YXJnZXRSYW5nZSBUaGUgZnVsbCByYW5nZSBvZiB0aGUgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0U2VsZWN0aW9uUmFuZ2UgVGhlIHNwYW4gb2YgdGhlIHN5bWJvbCBkZWZpbml0aW9uIGF0IHRoZSB0YXJnZXQuXG4gICAgICogQHBhcmFtIG9yaWdpblNlbGVjdGlvblJhbmdlIFRoZSBzcGFuIG9mIHRoZSBzeW1ib2wgYmVpbmcgZGVmaW5lZCBpbiB0aGUgb3JpZ2luYXRpbmcgc291cmNlIGZpbGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRhcmdldFVyaSwgdGFyZ2V0UmFuZ2UsIHRhcmdldFNlbGVjdGlvblJhbmdlLCBvcmlnaW5TZWxlY3Rpb25SYW5nZSkge1xuICAgICAgICByZXR1cm4geyB0YXJnZXRVcmk6IHRhcmdldFVyaSwgdGFyZ2V0UmFuZ2U6IHRhcmdldFJhbmdlLCB0YXJnZXRTZWxlY3Rpb25SYW5nZTogdGFyZ2V0U2VsZWN0aW9uUmFuZ2UsIG9yaWdpblNlbGVjdGlvblJhbmdlOiBvcmlnaW5TZWxlY3Rpb25SYW5nZSB9O1xuICAgIH1cbiAgICBMb2NhdGlvbkxpbmsuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbTG9jYXRpb25MaW5rXSgjTG9jYXRpb25MaW5rKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS50YXJnZXRSYW5nZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50YXJnZXRVcmkpXG4gICAgICAgICAgICAmJiAoUmFuZ2UuaXMoY2FuZGlkYXRlLnRhcmdldFNlbGVjdGlvblJhbmdlKSB8fCBJcy51bmRlZmluZWQoY2FuZGlkYXRlLnRhcmdldFNlbGVjdGlvblJhbmdlKSlcbiAgICAgICAgICAgICYmIChSYW5nZS5pcyhjYW5kaWRhdGUub3JpZ2luU2VsZWN0aW9uUmFuZ2UpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUub3JpZ2luU2VsZWN0aW9uUmFuZ2UpKTtcbiAgICB9XG4gICAgTG9jYXRpb25MaW5rLmlzID0gaXM7XG59KShMb2NhdGlvbkxpbmsgfHwgKExvY2F0aW9uTGluayA9IHt9KSk7XG4vKipcbiAqIFRoZSBDb2xvciBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIFtDb2xvcl0oI0NvbG9yKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBDb2xvcjtcbihmdW5jdGlvbiAoQ29sb3IpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IENvbG9yIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZWQ6IHJlZCxcbiAgICAgICAgICAgIGdyZWVuOiBncmVlbixcbiAgICAgICAgICAgIGJsdWU6IGJsdWUsXG4gICAgICAgICAgICBhbHBoYTogYWxwaGEsXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbG9yLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0NvbG9yXSgjQ29sb3IpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5udW1iZXJSYW5nZShjYW5kaWRhdGUucmVkLCAwLCAxKVxuICAgICAgICAgICAgJiYgSXMubnVtYmVyUmFuZ2UoY2FuZGlkYXRlLmdyZWVuLCAwLCAxKVxuICAgICAgICAgICAgJiYgSXMubnVtYmVyUmFuZ2UoY2FuZGlkYXRlLmJsdWUsIDAsIDEpXG4gICAgICAgICAgICAmJiBJcy5udW1iZXJSYW5nZShjYW5kaWRhdGUuYWxwaGEsIDAsIDEpO1xuICAgIH1cbiAgICBDb2xvci5pcyA9IGlzO1xufSkoQ29sb3IgfHwgKENvbG9yID0ge30pKTtcbi8qKlxuICogVGhlIENvbG9ySW5mb3JtYXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbQ29sb3JJbmZvcm1hdGlvbl0oI0NvbG9ySW5mb3JtYXRpb24pIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIENvbG9ySW5mb3JtYXRpb247XG4oZnVuY3Rpb24gKENvbG9ySW5mb3JtYXRpb24pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IENvbG9ySW5mb3JtYXRpb24gbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIGNvbG9yKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbG9ySW5mb3JtYXRpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbQ29sb3JJbmZvcm1hdGlvbl0oI0NvbG9ySW5mb3JtYXRpb24pIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpICYmIENvbG9yLmlzKGNhbmRpZGF0ZS5jb2xvcik7XG4gICAgfVxuICAgIENvbG9ySW5mb3JtYXRpb24uaXMgPSBpcztcbn0pKENvbG9ySW5mb3JtYXRpb24gfHwgKENvbG9ySW5mb3JtYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgQ29sb3IgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbQ29sb3JQcmVzZW50YXRpb25dKCNDb2xvclByZXNlbnRhdGlvbikgbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29sb3JQcmVzZW50YXRpb247XG4oZnVuY3Rpb24gKENvbG9yUHJlc2VudGF0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb2xvckluZm9ybWF0aW9uIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGxhYmVsLCB0ZXh0RWRpdCwgYWRkaXRpb25hbFRleHRFZGl0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgdGV4dEVkaXQ6IHRleHRFZGl0LFxuICAgICAgICAgICAgYWRkaXRpb25hbFRleHRFZGl0czogYWRkaXRpb25hbFRleHRFZGl0cyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ29sb3JQcmVzZW50YXRpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbQ29sb3JJbmZvcm1hdGlvbl0oI0NvbG9ySW5mb3JtYXRpb24pIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhYmVsKVxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUudGV4dEVkaXQpIHx8IFRleHRFZGl0LmlzKGNhbmRpZGF0ZSkpXG4gICAgICAgICAgICAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5hZGRpdGlvbmFsVGV4dEVkaXRzKSB8fCBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5hZGRpdGlvbmFsVGV4dEVkaXRzLCBUZXh0RWRpdC5pcykpO1xuICAgIH1cbiAgICBDb2xvclByZXNlbnRhdGlvbi5pcyA9IGlzO1xufSkoQ29sb3JQcmVzZW50YXRpb24gfHwgKENvbG9yUHJlc2VudGF0aW9uID0ge30pKTtcbi8qKlxuICogRW51bSBvZiBrbm93biByYW5nZSBraW5kc1xuICovXG5leHBvcnQgdmFyIEZvbGRpbmdSYW5nZUtpbmQ7XG4oZnVuY3Rpb24gKEZvbGRpbmdSYW5nZUtpbmQpIHtcbiAgICAvKipcbiAgICAgKiBGb2xkaW5nIHJhbmdlIGZvciBhIGNvbW1lbnRcbiAgICAgKi9cbiAgICBGb2xkaW5nUmFuZ2VLaW5kW1wiQ29tbWVudFwiXSA9IFwiY29tbWVudFwiO1xuICAgIC8qKlxuICAgICAqIEZvbGRpbmcgcmFuZ2UgZm9yIGEgaW1wb3J0cyBvciBpbmNsdWRlc1xuICAgICAqL1xuICAgIEZvbGRpbmdSYW5nZUtpbmRbXCJJbXBvcnRzXCJdID0gXCJpbXBvcnRzXCI7XG4gICAgLyoqXG4gICAgICogRm9sZGluZyByYW5nZSBmb3IgYSByZWdpb24gKGUuZy4gYCNyZWdpb25gKVxuICAgICAqL1xuICAgIEZvbGRpbmdSYW5nZUtpbmRbXCJSZWdpb25cIl0gPSBcInJlZ2lvblwiO1xufSkoRm9sZGluZ1JhbmdlS2luZCB8fCAoRm9sZGluZ1JhbmdlS2luZCA9IHt9KSk7XG4vKipcbiAqIFRoZSBmb2xkaW5nIHJhbmdlIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW0ZvbGRpbmdSYW5nZV0oI0ZvbGRpbmdSYW5nZSkgbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgRm9sZGluZ1JhbmdlO1xuKGZ1bmN0aW9uIChGb2xkaW5nUmFuZ2UpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEZvbGRpbmdSYW5nZSBsaXRlcmFsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShzdGFydExpbmUsIGVuZExpbmUsIHN0YXJ0Q2hhcmFjdGVyLCBlbmRDaGFyYWN0ZXIsIGtpbmQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHN0YXJ0TGluZTogc3RhcnRMaW5lLFxuICAgICAgICAgICAgZW5kTGluZTogZW5kTGluZVxuICAgICAgICB9O1xuICAgICAgICBpZiAoSXMuZGVmaW5lZChzdGFydENoYXJhY3RlcikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydENoYXJhY3RlciA9IHN0YXJ0Q2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGVuZENoYXJhY3RlcikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmRDaGFyYWN0ZXIgPSBlbmRDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzLmRlZmluZWQoa2luZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5raW5kID0ga2luZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBGb2xkaW5nUmFuZ2UuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbRm9sZGluZ1JhbmdlXSgjRm9sZGluZ1JhbmdlKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMudWludGVnZXIoY2FuZGlkYXRlLnN0YXJ0TGluZSkgJiYgSXMudWludGVnZXIoY2FuZGlkYXRlLnN0YXJ0TGluZSlcbiAgICAgICAgICAgICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLnN0YXJ0Q2hhcmFjdGVyKSB8fCBJcy51aW50ZWdlcihjYW5kaWRhdGUuc3RhcnRDaGFyYWN0ZXIpKVxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUuZW5kQ2hhcmFjdGVyKSB8fCBJcy51aW50ZWdlcihjYW5kaWRhdGUuZW5kQ2hhcmFjdGVyKSlcbiAgICAgICAgICAgICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmtpbmQpIHx8IElzLnN0cmluZyhjYW5kaWRhdGUua2luZCkpO1xuICAgIH1cbiAgICBGb2xkaW5nUmFuZ2UuaXMgPSBpcztcbn0pKEZvbGRpbmdSYW5nZSB8fCAoRm9sZGluZ1JhbmdlID0ge30pKTtcbi8qKlxuICogVGhlIERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbl0oI0RpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24pIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb247XG4oZnVuY3Rpb24gKERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24gbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUobG9jYXRpb24sIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbi5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtEaWFnbm9zdGljUmVsYXRlZEluZm9ybWF0aW9uXSgjRGlhZ25vc3RpY1JlbGF0ZWRJbmZvcm1hdGlvbikgaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBMb2NhdGlvbi5pcyhjYW5kaWRhdGUubG9jYXRpb24pICYmIElzLnN0cmluZyhjYW5kaWRhdGUubWVzc2FnZSk7XG4gICAgfVxuICAgIERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24uaXMgPSBpcztcbn0pKERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24gfHwgKERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBUaGUgZGlhZ25vc3RpYydzIHNldmVyaXR5LlxuICovXG5leHBvcnQgdmFyIERpYWdub3N0aWNTZXZlcml0eTtcbihmdW5jdGlvbiAoRGlhZ25vc3RpY1NldmVyaXR5KSB7XG4gICAgLyoqXG4gICAgICogUmVwb3J0cyBhbiBlcnJvci5cbiAgICAgKi9cbiAgICBEaWFnbm9zdGljU2V2ZXJpdHkuRXJyb3IgPSAxO1xuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgYSB3YXJuaW5nLlxuICAgICAqL1xuICAgIERpYWdub3N0aWNTZXZlcml0eS5XYXJuaW5nID0gMjtcbiAgICAvKipcbiAgICAgKiBSZXBvcnRzIGFuIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIERpYWdub3N0aWNTZXZlcml0eS5JbmZvcm1hdGlvbiA9IDM7XG4gICAgLyoqXG4gICAgICogUmVwb3J0cyBhIGhpbnQuXG4gICAgICovXG4gICAgRGlhZ25vc3RpY1NldmVyaXR5LkhpbnQgPSA0O1xufSkoRGlhZ25vc3RpY1NldmVyaXR5IHx8IChEaWFnbm9zdGljU2V2ZXJpdHkgPSB7fSkpO1xuLyoqXG4gKiBUaGUgZGlhZ25vc3RpYyB0YWdzLlxuICpcbiAqIEBzaW5jZSAzLjE1LjBcbiAqL1xuZXhwb3J0IHZhciBEaWFnbm9zdGljVGFnO1xuKGZ1bmN0aW9uIChEaWFnbm9zdGljVGFnKSB7XG4gICAgLyoqXG4gICAgICogVW51c2VkIG9yIHVubmVjZXNzYXJ5IGNvZGUuXG4gICAgICpcbiAgICAgKiBDbGllbnRzIGFyZSBhbGxvd2VkIHRvIHJlbmRlciBkaWFnbm9zdGljcyB3aXRoIHRoaXMgdGFnIGZhZGVkIG91dCBpbnN0ZWFkIG9mIGhhdmluZ1xuICAgICAqIGFuIGVycm9yIHNxdWlnZ2xlLlxuICAgICAqL1xuICAgIERpYWdub3N0aWNUYWcuVW5uZWNlc3NhcnkgPSAxO1xuICAgIC8qKlxuICAgICAqIERlcHJlY2F0ZWQgb3Igb2Jzb2xldGUgY29kZS5cbiAgICAgKlxuICAgICAqIENsaWVudHMgYXJlIGFsbG93ZWQgdG8gcmVuZGVyZWQgZGlhZ25vc3RpY3Mgd2l0aCB0aGlzIHRhZyBzdHJpa2UgdGhyb3VnaC5cbiAgICAgKi9cbiAgICBEaWFnbm9zdGljVGFnLkRlcHJlY2F0ZWQgPSAyO1xufSkoRGlhZ25vc3RpY1RhZyB8fCAoRGlhZ25vc3RpY1RhZyA9IHt9KSk7XG4vKipcbiAqIFRoZSBDb2RlRGVzY3JpcHRpb24gbmFtZXNwYWNlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0byBkZWFsIHdpdGggZGVzY3JpcHRpb25zIGZvciBkaWFnbm9zdGljIGNvZGVzLlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xuZXhwb3J0IHZhciBDb2RlRGVzY3JpcHRpb247XG4oZnVuY3Rpb24gKENvZGVEZXNjcmlwdGlvbikge1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAhPT0gdW5kZWZpbmVkICYmIGNhbmRpZGF0ZSAhPT0gbnVsbCAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmhyZWYpO1xuICAgIH1cbiAgICBDb2RlRGVzY3JpcHRpb24uaXMgPSBpcztcbn0pKENvZGVEZXNjcmlwdGlvbiB8fCAoQ29kZURlc2NyaXB0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIERpYWdub3N0aWMgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgdG8gd29yayB3aXRoXG4gKiBbRGlhZ25vc3RpY10oI0RpYWdub3N0aWMpIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIERpYWdub3N0aWM7XG4oZnVuY3Rpb24gKERpYWdub3N0aWMpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IERpYWdub3N0aWMgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIG1lc3NhZ2UsIHNldmVyaXR5LCBjb2RlLCBzb3VyY2UsIHJlbGF0ZWRJbmZvcm1hdGlvbikge1xuICAgICAgICB2YXIgcmVzdWx0ID0geyByYW5nZTogcmFuZ2UsIG1lc3NhZ2U6IG1lc3NhZ2UgfTtcbiAgICAgICAgaWYgKElzLmRlZmluZWQoc2V2ZXJpdHkpKSB7XG4gICAgICAgICAgICByZXN1bHQuc2V2ZXJpdHkgPSBzZXZlcml0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXMuZGVmaW5lZChjb2RlKSkge1xuICAgICAgICAgICAgcmVzdWx0LmNvZGUgPSBjb2RlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzLmRlZmluZWQocmVsYXRlZEluZm9ybWF0aW9uKSkge1xuICAgICAgICAgICAgcmVzdWx0LnJlbGF0ZWRJbmZvcm1hdGlvbiA9IHJlbGF0ZWRJbmZvcm1hdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBEaWFnbm9zdGljLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0RpYWdub3N0aWNdKCNEaWFnbm9zdGljKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSlcbiAgICAgICAgICAgICYmIElzLnN0cmluZyhjYW5kaWRhdGUubWVzc2FnZSlcbiAgICAgICAgICAgICYmIChJcy5udW1iZXIoY2FuZGlkYXRlLnNldmVyaXR5KSB8fCBJcy51bmRlZmluZWQoY2FuZGlkYXRlLnNldmVyaXR5KSlcbiAgICAgICAgICAgICYmIChJcy5pbnRlZ2VyKGNhbmRpZGF0ZS5jb2RlKSB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLmNvZGUpIHx8IElzLnVuZGVmaW5lZChjYW5kaWRhdGUuY29kZSkpXG4gICAgICAgICAgICAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5jb2RlRGVzY3JpcHRpb24pIHx8IChJcy5zdHJpbmcoKF9hID0gY2FuZGlkYXRlLmNvZGVEZXNjcmlwdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhyZWYpKSlcbiAgICAgICAgICAgICYmIChJcy5zdHJpbmcoY2FuZGlkYXRlLnNvdXJjZSkgfHwgSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS5zb3VyY2UpKVxuICAgICAgICAgICAgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUucmVsYXRlZEluZm9ybWF0aW9uKSB8fCBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5yZWxhdGVkSW5mb3JtYXRpb24sIERpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb24uaXMpKTtcbiAgICB9XG4gICAgRGlhZ25vc3RpYy5pcyA9IGlzO1xufSkoRGlhZ25vc3RpYyB8fCAoRGlhZ25vc3RpYyA9IHt9KSk7XG4vKipcbiAqIFRoZSBDb21tYW5kIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW0NvbW1hbmRdKCNDb21tYW5kKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBDb21tYW5kO1xuKGZ1bmN0aW9uIChDb21tYW5kKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb21tYW5kIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRpdGxlLCBjb21tYW5kKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB7IHRpdGxlOiB0aXRsZSwgY29tbWFuZDogY29tbWFuZCB9O1xuICAgICAgICBpZiAoSXMuZGVmaW5lZChhcmdzKSAmJiBhcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdC5hcmd1bWVudHMgPSBhcmdzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIENvbW1hbmQuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbQ29tbWFuZF0oI0NvbW1hbmQpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50aXRsZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS5jb21tYW5kKTtcbiAgICB9XG4gICAgQ29tbWFuZC5pcyA9IGlzO1xufSkoQ29tbWFuZCB8fCAoQ29tbWFuZCA9IHt9KSk7XG4vKipcbiAqIFRoZSBUZXh0RWRpdCBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9uIHRvIGNyZWF0ZSByZXBsYWNlLFxuICogaW5zZXJ0IGFuZCBkZWxldGUgZWRpdHMgbW9yZSBlYXNpbHkuXG4gKi9cbmV4cG9ydCB2YXIgVGV4dEVkaXQ7XG4oZnVuY3Rpb24gKFRleHRFZGl0KSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHJlcGxhY2UgdGV4dCBlZGl0LlxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGV4dCB0byBiZSByZXBsYWNlZC5cbiAgICAgKiBAcGFyYW0gbmV3VGV4dCBUaGUgbmV3IHRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVwbGFjZShyYW5nZSwgbmV3VGV4dCkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogcmFuZ2UsIG5ld1RleHQ6IG5ld1RleHQgfTtcbiAgICB9XG4gICAgVGV4dEVkaXQucmVwbGFjZSA9IHJlcGxhY2U7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGluc2VydCB0ZXh0IGVkaXQuXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiB0byBpbnNlcnQgdGhlIHRleHQgYXQuXG4gICAgICogQHBhcmFtIG5ld1RleHQgVGhlIHRleHQgdG8gYmUgaW5zZXJ0ZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5zZXJ0KHBvc2l0aW9uLCBuZXdUZXh0KSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlOiB7IHN0YXJ0OiBwb3NpdGlvbiwgZW5kOiBwb3NpdGlvbiB9LCBuZXdUZXh0OiBuZXdUZXh0IH07XG4gICAgfVxuICAgIFRleHRFZGl0Lmluc2VydCA9IGluc2VydDtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGVsZXRlIHRleHQgZWRpdC5cbiAgICAgKiBAcGFyYW0gcmFuZ2UgVGhlIHJhbmdlIG9mIHRleHQgdG8gYmUgZGVsZXRlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWwocmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHJhbmdlLCBuZXdUZXh0OiAnJyB9O1xuICAgIH1cbiAgICBUZXh0RWRpdC5kZWwgPSBkZWw7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpXG4gICAgICAgICAgICAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm5ld1RleHQpXG4gICAgICAgICAgICAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpO1xuICAgIH1cbiAgICBUZXh0RWRpdC5pcyA9IGlzO1xufSkoVGV4dEVkaXQgfHwgKFRleHRFZGl0ID0ge30pKTtcbmV4cG9ydCB2YXIgQ2hhbmdlQW5ub3RhdGlvbjtcbihmdW5jdGlvbiAoQ2hhbmdlQW5ub3RhdGlvbikge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShsYWJlbCwgbmVlZHNDb25maXJtYXRpb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7IGxhYmVsOiBsYWJlbCB9O1xuICAgICAgICBpZiAobmVlZHNDb25maXJtYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0Lm5lZWRzQ29uZmlybWF0aW9uID0gbmVlZHNDb25maXJtYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIENoYW5nZUFubm90YXRpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAhPT0gdW5kZWZpbmVkICYmIElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhYmVsKSAmJlxuICAgICAgICAgICAgKElzLmJvb2xlYW4oY2FuZGlkYXRlLm5lZWRzQ29uZmlybWF0aW9uKSB8fCBjYW5kaWRhdGUubmVlZHNDb25maXJtYXRpb24gPT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgIChJcy5zdHJpbmcoY2FuZGlkYXRlLmRlc2NyaXB0aW9uKSB8fCBjYW5kaWRhdGUuZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIENoYW5nZUFubm90YXRpb24uaXMgPSBpcztcbn0pKENoYW5nZUFubm90YXRpb24gfHwgKENoYW5nZUFubm90YXRpb24gPSB7fSkpO1xuZXhwb3J0IHZhciBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllcjtcbihmdW5jdGlvbiAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIpIHtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0eXBlb2YgY2FuZGlkYXRlID09PSAnc3RyaW5nJztcbiAgICB9XG4gICAgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMgPSBpcztcbn0pKENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyIHx8IChDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllciA9IHt9KSk7XG5leHBvcnQgdmFyIEFubm90YXRlZFRleHRFZGl0O1xuKGZ1bmN0aW9uIChBbm5vdGF0ZWRUZXh0RWRpdCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYW5ub3RhdGVkIHJlcGxhY2UgdGV4dCBlZGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSBvZiB0ZXh0IHRvIGJlIHJlcGxhY2VkLlxuICAgICAqIEBwYXJhbSBuZXdUZXh0IFRoZSBuZXcgdGV4dC5cbiAgICAgKiBAcGFyYW0gYW5ub3RhdGlvbiBUaGUgYW5ub3RhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXBsYWNlKHJhbmdlLCBuZXdUZXh0LCBhbm5vdGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlOiByYW5nZSwgbmV3VGV4dDogbmV3VGV4dCwgYW5ub3RhdGlvbklkOiBhbm5vdGF0aW9uIH07XG4gICAgfVxuICAgIEFubm90YXRlZFRleHRFZGl0LnJlcGxhY2UgPSByZXBsYWNlO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYW5ub3RhdGVkIGluc2VydCB0ZXh0IGVkaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHBvc2l0aW9uIHRvIGluc2VydCB0aGUgdGV4dCBhdC5cbiAgICAgKiBAcGFyYW0gbmV3VGV4dCBUaGUgdGV4dCB0byBiZSBpbnNlcnRlZC5cbiAgICAgKiBAcGFyYW0gYW5ub3RhdGlvbiBUaGUgYW5ub3RhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnNlcnQocG9zaXRpb24sIG5ld1RleHQsIGFubm90YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHsgc3RhcnQ6IHBvc2l0aW9uLCBlbmQ6IHBvc2l0aW9uIH0sIG5ld1RleHQ6IG5ld1RleHQsIGFubm90YXRpb25JZDogYW5ub3RhdGlvbiB9O1xuICAgIH1cbiAgICBBbm5vdGF0ZWRUZXh0RWRpdC5pbnNlcnQgPSBpbnNlcnQ7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhbm5vdGF0ZWQgZGVsZXRlIHRleHQgZWRpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByYW5nZSBUaGUgcmFuZ2Ugb2YgdGV4dCB0byBiZSBkZWxldGVkLlxuICAgICAqIEBwYXJhbSBhbm5vdGF0aW9uIFRoZSBhbm5vdGF0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRlbChyYW5nZSwgYW5ub3RhdGlvbikge1xuICAgICAgICByZXR1cm4geyByYW5nZTogcmFuZ2UsIG5ld1RleHQ6ICcnLCBhbm5vdGF0aW9uSWQ6IGFubm90YXRpb24gfTtcbiAgICB9XG4gICAgQW5ub3RhdGVkVGV4dEVkaXQuZGVsID0gZGVsO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIFRleHRFZGl0LmlzKGNhbmRpZGF0ZSkgJiYgKENoYW5nZUFubm90YXRpb24uaXMoY2FuZGlkYXRlLmFubm90YXRpb25JZCkgfHwgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoY2FuZGlkYXRlLmFubm90YXRpb25JZCkpO1xuICAgIH1cbiAgICBBbm5vdGF0ZWRUZXh0RWRpdC5pcyA9IGlzO1xufSkoQW5ub3RhdGVkVGV4dEVkaXQgfHwgKEFubm90YXRlZFRleHRFZGl0ID0ge30pKTtcbi8qKlxuICogVGhlIFRleHREb2N1bWVudEVkaXQgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGVcbiAqIGFuIGVkaXQgdGhhdCBtYW5pcHVsYXRlcyBhIHRleHQgZG9jdW1lbnQuXG4gKi9cbmV4cG9ydCB2YXIgVGV4dERvY3VtZW50RWRpdDtcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50RWRpdCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgYFRleHREb2N1bWVudEVkaXRgXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRleHREb2N1bWVudCwgZWRpdHMpIHtcbiAgICAgICAgcmV0dXJuIHsgdGV4dERvY3VtZW50OiB0ZXh0RG9jdW1lbnQsIGVkaXRzOiBlZGl0cyB9O1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnRFZGl0LmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICYmIE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5pcyhjYW5kaWRhdGUudGV4dERvY3VtZW50KVxuICAgICAgICAgICAgJiYgQXJyYXkuaXNBcnJheShjYW5kaWRhdGUuZWRpdHMpO1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnRFZGl0LmlzID0gaXM7XG59KShUZXh0RG9jdW1lbnRFZGl0IHx8IChUZXh0RG9jdW1lbnRFZGl0ID0ge30pKTtcbmV4cG9ydCB2YXIgQ3JlYXRlRmlsZTtcbihmdW5jdGlvbiAoQ3JlYXRlRmlsZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIG9wdGlvbnMsIGFubm90YXRpb24pIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGtpbmQ6ICdjcmVhdGUnLFxuICAgICAgICAgICAgdXJpOiB1cmlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiAob3B0aW9ucy5vdmVyd3JpdGUgIT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmlnbm9yZUlmRXhpc3RzICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICByZXN1bHQub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFubm90YXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmFubm90YXRpb25JZCA9IGFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgQ3JlYXRlRmlsZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIGNhbmRpZGF0ZS5raW5kID09PSAnY3JlYXRlJyAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgJiYgKGNhbmRpZGF0ZS5vcHRpb25zID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICgoY2FuZGlkYXRlLm9wdGlvbnMub3ZlcndyaXRlID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5vdmVyd3JpdGUpKSAmJiAoY2FuZGlkYXRlLm9wdGlvbnMuaWdub3JlSWZFeGlzdHMgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmRXhpc3RzKSkpKSAmJiAoY2FuZGlkYXRlLmFubm90YXRpb25JZCA9PT0gdW5kZWZpbmVkIHx8IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQpKTtcbiAgICB9XG4gICAgQ3JlYXRlRmlsZS5pcyA9IGlzO1xufSkoQ3JlYXRlRmlsZSB8fCAoQ3JlYXRlRmlsZSA9IHt9KSk7XG5leHBvcnQgdmFyIFJlbmFtZUZpbGU7XG4oZnVuY3Rpb24gKFJlbmFtZUZpbGUpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUob2xkVXJpLCBuZXdVcmksIG9wdGlvbnMsIGFubm90YXRpb24pIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGtpbmQ6ICdyZW5hbWUnLFxuICAgICAgICAgICAgb2xkVXJpOiBvbGRVcmksXG4gICAgICAgICAgICBuZXdVcmk6IG5ld1VyaVxuICAgICAgICB9O1xuICAgICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIChvcHRpb25zLm92ZXJ3cml0ZSAhPT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuaWdub3JlSWZFeGlzdHMgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5ub3RhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQuYW5ub3RhdGlvbklkID0gYW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBSZW5hbWVGaWxlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUgJiYgY2FuZGlkYXRlLmtpbmQgPT09ICdyZW5hbWUnICYmIElzLnN0cmluZyhjYW5kaWRhdGUub2xkVXJpKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLm5ld1VyaSkgJiYgKGNhbmRpZGF0ZS5vcHRpb25zID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICgoY2FuZGlkYXRlLm9wdGlvbnMub3ZlcndyaXRlID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5vdmVyd3JpdGUpKSAmJiAoY2FuZGlkYXRlLm9wdGlvbnMuaWdub3JlSWZFeGlzdHMgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmRXhpc3RzKSkpKSAmJiAoY2FuZGlkYXRlLmFubm90YXRpb25JZCA9PT0gdW5kZWZpbmVkIHx8IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQpKTtcbiAgICB9XG4gICAgUmVuYW1lRmlsZS5pcyA9IGlzO1xufSkoUmVuYW1lRmlsZSB8fCAoUmVuYW1lRmlsZSA9IHt9KSk7XG5leHBvcnQgdmFyIERlbGV0ZUZpbGU7XG4oZnVuY3Rpb24gKERlbGV0ZUZpbGUpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCBvcHRpb25zLCBhbm5vdGF0aW9uKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBraW5kOiAnZGVsZXRlJyxcbiAgICAgICAgICAgIHVyaTogdXJpXG4gICAgICAgIH07XG4gICAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgKG9wdGlvbnMucmVjdXJzaXZlICE9PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5pZ25vcmVJZk5vdEV4aXN0cyAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmVzdWx0Lm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbm5vdGF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5hbm5vdGF0aW9uSWQgPSBhbm5vdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIERlbGV0ZUZpbGUuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBjYW5kaWRhdGUua2luZCA9PT0gJ2RlbGV0ZScgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIChjYW5kaWRhdGUub3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAoKGNhbmRpZGF0ZS5vcHRpb25zLnJlY3Vyc2l2ZSA9PT0gdW5kZWZpbmVkIHx8IElzLmJvb2xlYW4oY2FuZGlkYXRlLm9wdGlvbnMucmVjdXJzaXZlKSkgJiYgKGNhbmRpZGF0ZS5vcHRpb25zLmlnbm9yZUlmTm90RXhpc3RzID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUub3B0aW9ucy5pZ25vcmVJZk5vdEV4aXN0cykpKSkgJiYgKGNhbmRpZGF0ZS5hbm5vdGF0aW9uSWQgPT09IHVuZGVmaW5lZCB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhjYW5kaWRhdGUuYW5ub3RhdGlvbklkKSk7XG4gICAgfVxuICAgIERlbGV0ZUZpbGUuaXMgPSBpcztcbn0pKERlbGV0ZUZpbGUgfHwgKERlbGV0ZUZpbGUgPSB7fSkpO1xuZXhwb3J0IHZhciBXb3Jrc3BhY2VFZGl0O1xuKGZ1bmN0aW9uIChXb3Jrc3BhY2VFZGl0KSB7XG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmNoYW5nZXMgIT09IHVuZGVmaW5lZCB8fCBjYW5kaWRhdGUuZG9jdW1lbnRDaGFuZ2VzICE9PSB1bmRlZmluZWQpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmRvY3VtZW50Q2hhbmdlcyA9PT0gdW5kZWZpbmVkIHx8IGNhbmRpZGF0ZS5kb2N1bWVudENoYW5nZXMuZXZlcnkoZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChJcy5zdHJpbmcoY2hhbmdlLmtpbmQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDcmVhdGVGaWxlLmlzKGNoYW5nZSkgfHwgUmVuYW1lRmlsZS5pcyhjaGFuZ2UpIHx8IERlbGV0ZUZpbGUuaXMoY2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUZXh0RG9jdW1lbnRFZGl0LmlzKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgIH1cbiAgICBXb3Jrc3BhY2VFZGl0LmlzID0gaXM7XG59KShXb3Jrc3BhY2VFZGl0IHx8IChXb3Jrc3BhY2VFZGl0ID0ge30pKTtcbnZhciBUZXh0RWRpdENoYW5nZUltcGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGV4dEVkaXRDaGFuZ2VJbXBsKGVkaXRzLCBjaGFuZ2VBbm5vdGF0aW9ucykge1xuICAgICAgICB0aGlzLmVkaXRzID0gZWRpdHM7XG4gICAgICAgIHRoaXMuY2hhbmdlQW5ub3RhdGlvbnMgPSBjaGFuZ2VBbm5vdGF0aW9ucztcbiAgICB9XG4gICAgVGV4dEVkaXRDaGFuZ2VJbXBsLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAocG9zaXRpb24sIG5ld1RleHQsIGFubm90YXRpb24pIHtcbiAgICAgICAgdmFyIGVkaXQ7XG4gICAgICAgIHZhciBpZDtcbiAgICAgICAgaWYgKGFubm90YXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZWRpdCA9IFRleHRFZGl0Lmluc2VydChwb3NpdGlvbiwgbmV3VGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoYW5ub3RhdGlvbikpIHtcbiAgICAgICAgICAgIGlkID0gYW5ub3RhdGlvbjtcbiAgICAgICAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5pbnNlcnQocG9zaXRpb24sIG5ld1RleHQsIGFubm90YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hc3NlcnRDaGFuZ2VBbm5vdGF0aW9ucyh0aGlzLmNoYW5nZUFubm90YXRpb25zKTtcbiAgICAgICAgICAgIGlkID0gdGhpcy5jaGFuZ2VBbm5vdGF0aW9ucy5tYW5hZ2UoYW5ub3RhdGlvbik7XG4gICAgICAgICAgICBlZGl0ID0gQW5ub3RhdGVkVGV4dEVkaXQuaW5zZXJ0KHBvc2l0aW9uLCBuZXdUZXh0LCBpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lZGl0cy5wdXNoKGVkaXQpO1xuICAgICAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUZXh0RWRpdENoYW5nZUltcGwucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAocmFuZ2UsIG5ld1RleHQsIGFubm90YXRpb24pIHtcbiAgICAgICAgdmFyIGVkaXQ7XG4gICAgICAgIHZhciBpZDtcbiAgICAgICAgaWYgKGFubm90YXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZWRpdCA9IFRleHRFZGl0LnJlcGxhY2UocmFuZ2UsIG5ld1RleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGFubm90YXRpb24pKSB7XG4gICAgICAgICAgICBpZCA9IGFubm90YXRpb247XG4gICAgICAgICAgICBlZGl0ID0gQW5ub3RhdGVkVGV4dEVkaXQucmVwbGFjZShyYW5nZSwgbmV3VGV4dCwgYW5ub3RhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFzc2VydENoYW5nZUFubm90YXRpb25zKHRoaXMuY2hhbmdlQW5ub3RhdGlvbnMpO1xuICAgICAgICAgICAgaWQgPSB0aGlzLmNoYW5nZUFubm90YXRpb25zLm1hbmFnZShhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5yZXBsYWNlKHJhbmdlLCBuZXdUZXh0LCBpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lZGl0cy5wdXNoKGVkaXQpO1xuICAgICAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUZXh0RWRpdENoYW5nZUltcGwucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChyYW5nZSwgYW5ub3RhdGlvbikge1xuICAgICAgICB2YXIgZWRpdDtcbiAgICAgICAgdmFyIGlkO1xuICAgICAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlZGl0ID0gVGV4dEVkaXQuZGVsKHJhbmdlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhhbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgaWQgPSBhbm5vdGF0aW9uO1xuICAgICAgICAgICAgZWRpdCA9IEFubm90YXRlZFRleHRFZGl0LmRlbChyYW5nZSwgYW5ub3RhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFzc2VydENoYW5nZUFubm90YXRpb25zKHRoaXMuY2hhbmdlQW5ub3RhdGlvbnMpO1xuICAgICAgICAgICAgaWQgPSB0aGlzLmNoYW5nZUFubm90YXRpb25zLm1hbmFnZShhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIGVkaXQgPSBBbm5vdGF0ZWRUZXh0RWRpdC5kZWwocmFuZ2UsIGlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVkaXRzLnB1c2goZWRpdCk7XG4gICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRleHRFZGl0Q2hhbmdlSW1wbC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVkaXQpIHtcbiAgICAgICAgdGhpcy5lZGl0cy5wdXNoKGVkaXQpO1xuICAgIH07XG4gICAgVGV4dEVkaXRDaGFuZ2VJbXBsLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRzO1xuICAgIH07XG4gICAgVGV4dEVkaXRDaGFuZ2VJbXBsLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lZGl0cy5zcGxpY2UoMCwgdGhpcy5lZGl0cy5sZW5ndGgpO1xuICAgIH07XG4gICAgVGV4dEVkaXRDaGFuZ2VJbXBsLnByb3RvdHlwZS5hc3NlcnRDaGFuZ2VBbm5vdGF0aW9ucyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGV4dCBlZGl0IGNoYW5nZSBpcyBub3QgY29uZmlndXJlZCB0byBtYW5hZ2UgY2hhbmdlIGFubm90YXRpb25zLlwiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRleHRFZGl0Q2hhbmdlSW1wbDtcbn0oKSk7XG4vKipcbiAqIEEgaGVscGVyIGNsYXNzXG4gKi9cbnZhciBDaGFuZ2VBbm5vdGF0aW9ucyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaGFuZ2VBbm5vdGF0aW9ucyhhbm5vdGF0aW9ucykge1xuICAgICAgICB0aGlzLl9hbm5vdGF0aW9ucyA9IGFubm90YXRpb25zID09PSB1bmRlZmluZWQgPyBPYmplY3QuY3JlYXRlKG51bGwpIDogYW5ub3RhdGlvbnM7XG4gICAgICAgIHRoaXMuX2NvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLl9zaXplID0gMDtcbiAgICB9XG4gICAgQ2hhbmdlQW5ub3RhdGlvbnMucHJvdG90eXBlLmFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fubm90YXRpb25zO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENoYW5nZUFubm90YXRpb25zLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIENoYW5nZUFubm90YXRpb25zLnByb3RvdHlwZS5tYW5hZ2UgPSBmdW5jdGlvbiAoaWRPckFubm90YXRpb24sIGFubm90YXRpb24pIHtcbiAgICAgICAgdmFyIGlkO1xuICAgICAgICBpZiAoQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMoaWRPckFubm90YXRpb24pKSB7XG4gICAgICAgICAgICBpZCA9IGlkT3JBbm5vdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWQgPSB0aGlzLm5leHRJZCgpO1xuICAgICAgICAgICAgYW5ub3RhdGlvbiA9IGlkT3JBbm5vdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hbm5vdGF0aW9uc1tpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWQgXCIgKyBpZCArIFwiIGlzIGFscmVhZHkgaW4gdXNlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBhbm5vdGF0aW9uIHByb3ZpZGVkIGZvciBpZCBcIiArIGlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbm5vdGF0aW9uc1tpZF0gPSBhbm5vdGF0aW9uO1xuICAgICAgICB0aGlzLl9zaXplKys7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuICAgIENoYW5nZUFubm90YXRpb25zLnByb3RvdHlwZS5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvdW50ZXIrKztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50ZXIudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIHJldHVybiBDaGFuZ2VBbm5vdGF0aW9ucztcbn0oKSk7XG4vKipcbiAqIEEgd29ya3NwYWNlIGNoYW5nZSBoZWxwcyBjb25zdHJ1Y3RpbmcgY2hhbmdlcyB0byBhIHdvcmtzcGFjZS5cbiAqL1xudmFyIFdvcmtzcGFjZUNoYW5nZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXb3Jrc3BhY2VDaGFuZ2Uod29ya3NwYWNlRWRpdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl90ZXh0RWRpdENoYW5nZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBpZiAod29ya3NwYWNlRWRpdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0ID0gd29ya3NwYWNlRWRpdDtcbiAgICAgICAgICAgIGlmICh3b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUFubm90YXRpb25zID0gbmV3IENoYW5nZUFubm90YXRpb25zKHdvcmtzcGFjZUVkaXQuY2hhbmdlQW5ub3RhdGlvbnMpO1xuICAgICAgICAgICAgICAgIHdvcmtzcGFjZUVkaXQuY2hhbmdlQW5ub3RhdGlvbnMgPSB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5hbGwoKTtcbiAgICAgICAgICAgICAgICB3b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFRleHREb2N1bWVudEVkaXQuaXMoY2hhbmdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRFZGl0Q2hhbmdlID0gbmV3IFRleHRFZGl0Q2hhbmdlSW1wbChjaGFuZ2UuZWRpdHMsIF90aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW2NoYW5nZS50ZXh0RG9jdW1lbnQudXJpXSA9IHRleHRFZGl0Q2hhbmdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh3b3Jrc3BhY2VFZGl0LmNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh3b3Jrc3BhY2VFZGl0LmNoYW5nZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dEVkaXRDaGFuZ2UgPSBuZXcgVGV4dEVkaXRDaGFuZ2VJbXBsKHdvcmtzcGFjZUVkaXQuY2hhbmdlc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RleHRFZGl0Q2hhbmdlc1trZXldID0gdGV4dEVkaXRDaGFuZ2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0ID0ge307XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdvcmtzcGFjZUNoYW5nZS5wcm90b3R5cGUsIFwiZWRpdFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSB1bmRlcmx5aW5nIFtXb3Jrc3BhY2VFZGl0XSgjV29ya3NwYWNlRWRpdCkgbGl0ZXJhbFxuICAgICAgICAgKiB1c2UgdG8gYmUgcmV0dXJuZWQgZnJvbSBhIHdvcmtzcGFjZSBlZGl0IG9wZXJhdGlvbiBsaWtlIHJlbmFtZS5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RG9jdW1lbnRDaGFuZ2VzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2hhbmdlQW5ub3RhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuY2hhbmdlQW5ub3RhdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmNoYW5nZUFubm90YXRpb25zID0gdGhpcy5fY2hhbmdlQW5ub3RhdGlvbnMuYWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtzcGFjZUVkaXQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBXb3Jrc3BhY2VDaGFuZ2UucHJvdG90eXBlLmdldFRleHRFZGl0Q2hhbmdlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmlzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERvY3VtZW50Q2hhbmdlcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBkb2N1bWVudCBjaGFuZ2VzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRleHREb2N1bWVudCA9IHsgdXJpOiBrZXkudXJpLCB2ZXJzaW9uOiBrZXkudmVyc2lvbiB9O1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX3RleHRFZGl0Q2hhbmdlc1t0ZXh0RG9jdW1lbnQudXJpXTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGVkaXRzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIHRleHREb2N1bWVudEVkaXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHREb2N1bWVudDogdGV4dERvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICBlZGl0czogZWRpdHNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLnB1c2godGV4dERvY3VtZW50RWRpdCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFRleHRFZGl0Q2hhbmdlSW1wbChlZGl0cywgdGhpcy5fY2hhbmdlQW5ub3RhdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHRFZGl0Q2hhbmdlc1t0ZXh0RG9jdW1lbnQudXJpXSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluaXRDaGFuZ2VzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBub3JtYWwgdGV4dCBlZGl0IGNoYW5nZXMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW2tleV07XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHZhciBlZGl0cyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuY2hhbmdlc1trZXldID0gZWRpdHM7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFRleHRFZGl0Q2hhbmdlSW1wbChlZGl0cyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dEVkaXRDaGFuZ2VzW2tleV0gPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBXb3Jrc3BhY2VDaGFuZ2UucHJvdG90eXBlLmluaXREb2N1bWVudENoYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcyA9PT0gdW5kZWZpbmVkICYmIHRoaXMuX3dvcmtzcGFjZUVkaXQuY2hhbmdlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucyA9IG5ldyBDaGFuZ2VBbm5vdGF0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuY2hhbmdlQW5ub3RhdGlvbnMgPSB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5hbGwoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgV29ya3NwYWNlQ2hhbmdlLnByb3RvdHlwZS5pbml0Q2hhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzID09PSB1bmRlZmluZWQgJiYgdGhpcy5fd29ya3NwYWNlRWRpdC5jaGFuZ2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuY2hhbmdlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFdvcmtzcGFjZUNoYW5nZS5wcm90b3R5cGUuY3JlYXRlRmlsZSA9IGZ1bmN0aW9uICh1cmksIG9wdGlvbnNPckFubm90YXRpb24sIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0RG9jdW1lbnRDaGFuZ2VzKCk7XG4gICAgICAgIGlmICh0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtzcGFjZSBlZGl0IGlzIG5vdCBjb25maWd1cmVkIGZvciBkb2N1bWVudCBjaGFuZ2VzLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbm5vdGF0aW9uO1xuICAgICAgICBpZiAoQ2hhbmdlQW5ub3RhdGlvbi5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSB8fCBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhvcHRpb25zT3JBbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgYW5ub3RhdGlvbiA9IG9wdGlvbnNPckFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9uc09yQW5ub3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3BlcmF0aW9uO1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIGlmIChhbm5vdGF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbiA9IENyZWF0ZUZpbGUuY3JlYXRlKHVyaSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZCA9IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGFubm90YXRpb24pID8gYW5ub3RhdGlvbiA6IHRoaXMuX2NoYW5nZUFubm90YXRpb25zLm1hbmFnZShhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIG9wZXJhdGlvbiA9IENyZWF0ZUZpbGUuY3JlYXRlKHVyaSwgb3B0aW9ucywgaWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dvcmtzcGFjZUVkaXQuZG9jdW1lbnRDaGFuZ2VzLnB1c2gob3BlcmF0aW9uKTtcbiAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgV29ya3NwYWNlQ2hhbmdlLnByb3RvdHlwZS5yZW5hbWVGaWxlID0gZnVuY3Rpb24gKG9sZFVyaSwgbmV3VXJpLCBvcHRpb25zT3JBbm5vdGF0aW9uLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaW5pdERvY3VtZW50Q2hhbmdlcygpO1xuICAgICAgICBpZiAodGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXb3Jrc3BhY2UgZWRpdCBpcyBub3QgY29uZmlndXJlZCBmb3IgZG9jdW1lbnQgY2hhbmdlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYW5ub3RhdGlvbjtcbiAgICAgICAgaWYgKENoYW5nZUFubm90YXRpb24uaXMob3B0aW9uc09yQW5ub3RhdGlvbikgfHwgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMob3B0aW9uc09yQW5ub3RhdGlvbikpIHtcbiAgICAgICAgICAgIGFubm90YXRpb24gPSBvcHRpb25zT3JBbm5vdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnNPckFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wZXJhdGlvbjtcbiAgICAgICAgdmFyIGlkO1xuICAgICAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcGVyYXRpb24gPSBSZW5hbWVGaWxlLmNyZWF0ZShvbGRVcmksIG5ld1VyaSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZCA9IENoYW5nZUFubm90YXRpb25JZGVudGlmaWVyLmlzKGFubm90YXRpb24pID8gYW5ub3RhdGlvbiA6IHRoaXMuX2NoYW5nZUFubm90YXRpb25zLm1hbmFnZShhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIG9wZXJhdGlvbiA9IFJlbmFtZUZpbGUuY3JlYXRlKG9sZFVyaSwgbmV3VXJpLCBvcHRpb25zLCBpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMucHVzaChvcGVyYXRpb24pO1xuICAgICAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBXb3Jrc3BhY2VDaGFuZ2UucHJvdG90eXBlLmRlbGV0ZUZpbGUgPSBmdW5jdGlvbiAodXJpLCBvcHRpb25zT3JBbm5vdGF0aW9uLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaW5pdERvY3VtZW50Q2hhbmdlcygpO1xuICAgICAgICBpZiAodGhpcy5fd29ya3NwYWNlRWRpdC5kb2N1bWVudENoYW5nZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXb3Jrc3BhY2UgZWRpdCBpcyBub3QgY29uZmlndXJlZCBmb3IgZG9jdW1lbnQgY2hhbmdlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYW5ub3RhdGlvbjtcbiAgICAgICAgaWYgKENoYW5nZUFubm90YXRpb24uaXMob3B0aW9uc09yQW5ub3RhdGlvbikgfHwgQ2hhbmdlQW5ub3RhdGlvbklkZW50aWZpZXIuaXMob3B0aW9uc09yQW5ub3RhdGlvbikpIHtcbiAgICAgICAgICAgIGFubm90YXRpb24gPSBvcHRpb25zT3JBbm5vdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnNPckFubm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wZXJhdGlvbjtcbiAgICAgICAgdmFyIGlkO1xuICAgICAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcGVyYXRpb24gPSBEZWxldGVGaWxlLmNyZWF0ZSh1cmksIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWQgPSBDaGFuZ2VBbm5vdGF0aW9uSWRlbnRpZmllci5pcyhhbm5vdGF0aW9uKSA/IGFubm90YXRpb24gOiB0aGlzLl9jaGFuZ2VBbm5vdGF0aW9ucy5tYW5hZ2UoYW5ub3RhdGlvbik7XG4gICAgICAgICAgICBvcGVyYXRpb24gPSBEZWxldGVGaWxlLmNyZWF0ZSh1cmksIG9wdGlvbnMsIGlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl93b3Jrc3BhY2VFZGl0LmRvY3VtZW50Q2hhbmdlcy5wdXNoKG9wZXJhdGlvbik7XG4gICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBXb3Jrc3BhY2VDaGFuZ2U7XG59KCkpO1xuZXhwb3J0IHsgV29ya3NwYWNlQ2hhbmdlIH07XG4vKipcbiAqIFRoZSBUZXh0RG9jdW1lbnRJZGVudGlmaWVyIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW1RleHREb2N1bWVudElkZW50aWZpZXJdKCNUZXh0RG9jdW1lbnRJZGVudGlmaWVyKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBUZXh0RG9jdW1lbnRJZGVudGlmaWVyO1xuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnRJZGVudGlmaWVyKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBUZXh0RG9jdW1lbnRJZGVudGlmaWVyIGxpdGVyYWwuXG4gICAgICogQHBhcmFtIHVyaSBUaGUgZG9jdW1lbnQncyB1cmkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHVyaSkge1xuICAgICAgICByZXR1cm4geyB1cmk6IHVyaSB9O1xuICAgIH1cbiAgICBUZXh0RG9jdW1lbnRJZGVudGlmaWVyLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW1RleHREb2N1bWVudElkZW50aWZpZXJdKCNUZXh0RG9jdW1lbnRJZGVudGlmaWVyKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnN0cmluZyhjYW5kaWRhdGUudXJpKTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50SWRlbnRpZmllci5pcyA9IGlzO1xufSkoVGV4dERvY3VtZW50SWRlbnRpZmllciB8fCAoVGV4dERvY3VtZW50SWRlbnRpZmllciA9IHt9KSk7XG4vKipcbiAqIFRoZSBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW1ZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXJdKCNWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyO1xuKGZ1bmN0aW9uIChWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIGxpdGVyYWwuXG4gICAgICogQHBhcmFtIHVyaSBUaGUgZG9jdW1lbnQncyB1cmkuXG4gICAgICogQHBhcmFtIHVyaSBUaGUgZG9jdW1lbnQncyB0ZXh0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIHZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIHsgdXJpOiB1cmksIHZlcnNpb246IHZlcnNpb24gfTtcbiAgICB9XG4gICAgVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyXSgjVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllcikgaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgJiYgSXMuaW50ZWdlcihjYW5kaWRhdGUudmVyc2lvbik7XG4gICAgfVxuICAgIFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIuaXMgPSBpcztcbn0pKFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgfHwgKFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgPSB7fSkpO1xuLyoqXG4gKiBUaGUgT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW09wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllcl0oI09wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllcikgbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyO1xuKGZ1bmN0aW9uIChPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllciBsaXRlcmFsLlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGRvY3VtZW50J3MgdXJpLlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGRvY3VtZW50J3MgdGV4dC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCB2ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiB7IHVyaTogdXJpLCB2ZXJzaW9uOiB2ZXJzaW9uIH07XG4gICAgfVxuICAgIE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXJdKCNPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIChjYW5kaWRhdGUudmVyc2lvbiA9PT0gbnVsbCB8fCBJcy5pbnRlZ2VyKGNhbmRpZGF0ZS52ZXJzaW9uKSk7XG4gICAgfVxuICAgIE9wdGlvbmFsVmVyc2lvbmVkVGV4dERvY3VtZW50SWRlbnRpZmllci5pcyA9IGlzO1xufSkoT3B0aW9uYWxWZXJzaW9uZWRUZXh0RG9jdW1lbnRJZGVudGlmaWVyIHx8IChPcHRpb25hbFZlcnNpb25lZFRleHREb2N1bWVudElkZW50aWZpZXIgPSB7fSkpO1xuLyoqXG4gKiBUaGUgVGV4dERvY3VtZW50SXRlbSBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIFtUZXh0RG9jdW1lbnRJdGVtXSgjVGV4dERvY3VtZW50SXRlbSkgbGl0ZXJhbHMuXG4gKi9cbmV4cG9ydCB2YXIgVGV4dERvY3VtZW50SXRlbTtcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50SXRlbSkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgVGV4dERvY3VtZW50SXRlbSBsaXRlcmFsLlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGRvY3VtZW50J3MgdXJpLlxuICAgICAqIEBwYXJhbSBsYW5ndWFnZUlkIFRoZSBkb2N1bWVudCdzIGxhbmd1YWdlIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHZlcnNpb24gVGhlIGRvY3VtZW50J3MgdmVyc2lvbiBudW1iZXIuXG4gICAgICogQHBhcmFtIHRleHQgVGhlIGRvY3VtZW50J3MgdGV4dC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUodXJpLCBsYW5ndWFnZUlkLCB2ZXJzaW9uLCB0ZXh0KSB7XG4gICAgICAgIHJldHVybiB7IHVyaTogdXJpLCBsYW5ndWFnZUlkOiBsYW5ndWFnZUlkLCB2ZXJzaW9uOiB2ZXJzaW9uLCB0ZXh0OiB0ZXh0IH07XG4gICAgfVxuICAgIFRleHREb2N1bWVudEl0ZW0uY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbVGV4dERvY3VtZW50SXRlbV0oI1RleHREb2N1bWVudEl0ZW0pIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS51cmkpICYmIElzLnN0cmluZyhjYW5kaWRhdGUubGFuZ3VhZ2VJZCkgJiYgSXMuaW50ZWdlcihjYW5kaWRhdGUudmVyc2lvbikgJiYgSXMuc3RyaW5nKGNhbmRpZGF0ZS50ZXh0KTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50SXRlbS5pcyA9IGlzO1xufSkoVGV4dERvY3VtZW50SXRlbSB8fCAoVGV4dERvY3VtZW50SXRlbSA9IHt9KSk7XG4vKipcbiAqIERlc2NyaWJlcyB0aGUgY29udGVudCB0eXBlIHRoYXQgYSBjbGllbnQgc3VwcG9ydHMgaW4gdmFyaW91c1xuICogcmVzdWx0IGxpdGVyYWxzIGxpa2UgYEhvdmVyYCwgYFBhcmFtZXRlckluZm9gIG9yIGBDb21wbGV0aW9uSXRlbWAuXG4gKlxuICogUGxlYXNlIG5vdGUgdGhhdCBgTWFya3VwS2luZHNgIG11c3Qgbm90IHN0YXJ0IHdpdGggYSBgJGAuIFRoaXMga2luZHNcbiAqIGFyZSByZXNlcnZlZCBmb3IgaW50ZXJuYWwgdXNhZ2UuXG4gKi9cbmV4cG9ydCB2YXIgTWFya3VwS2luZDtcbihmdW5jdGlvbiAoTWFya3VwS2luZCkge1xuICAgIC8qKlxuICAgICAqIFBsYWluIHRleHQgaXMgc3VwcG9ydGVkIGFzIGEgY29udGVudCBmb3JtYXRcbiAgICAgKi9cbiAgICBNYXJrdXBLaW5kLlBsYWluVGV4dCA9ICdwbGFpbnRleHQnO1xuICAgIC8qKlxuICAgICAqIE1hcmtkb3duIGlzIHN1cHBvcnRlZCBhcyBhIGNvbnRlbnQgZm9ybWF0XG4gICAgICovXG4gICAgTWFya3VwS2luZC5NYXJrZG93biA9ICdtYXJrZG93bic7XG59KShNYXJrdXBLaW5kIHx8IChNYXJrdXBLaW5kID0ge30pKTtcbihmdW5jdGlvbiAoTWFya3VwS2luZCkge1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIHZhbHVlIG9mIHRoZSBbTWFya3VwS2luZF0oI01hcmt1cEtpbmQpIHR5cGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlID09PSBNYXJrdXBLaW5kLlBsYWluVGV4dCB8fCBjYW5kaWRhdGUgPT09IE1hcmt1cEtpbmQuTWFya2Rvd247XG4gICAgfVxuICAgIE1hcmt1cEtpbmQuaXMgPSBpcztcbn0pKE1hcmt1cEtpbmQgfHwgKE1hcmt1cEtpbmQgPSB7fSkpO1xuZXhwb3J0IHZhciBNYXJrdXBDb250ZW50O1xuKGZ1bmN0aW9uIChNYXJrdXBDb250ZW50KSB7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGNvbmZvcm1zIHRvIHRoZSBbTWFya3VwQ29udGVudF0oI01hcmt1cENvbnRlbnQpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5vYmplY3RMaXRlcmFsKHZhbHVlKSAmJiBNYXJrdXBLaW5kLmlzKGNhbmRpZGF0ZS5raW5kKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnZhbHVlKTtcbiAgICB9XG4gICAgTWFya3VwQ29udGVudC5pcyA9IGlzO1xufSkoTWFya3VwQ29udGVudCB8fCAoTWFya3VwQ29udGVudCA9IHt9KSk7XG4vKipcbiAqIFRoZSBraW5kIG9mIGEgY29tcGxldGlvbiBlbnRyeS5cbiAqL1xuZXhwb3J0IHZhciBDb21wbGV0aW9uSXRlbUtpbmQ7XG4oZnVuY3Rpb24gKENvbXBsZXRpb25JdGVtS2luZCkge1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5UZXh0ID0gMTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuTWV0aG9kID0gMjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRnVuY3Rpb24gPSAzO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5Db25zdHJ1Y3RvciA9IDQ7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkZpZWxkID0gNTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuVmFyaWFibGUgPSA2O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5DbGFzcyA9IDc7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkludGVyZmFjZSA9IDg7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLk1vZHVsZSA9IDk7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlByb3BlcnR5ID0gMTA7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlVuaXQgPSAxMTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuVmFsdWUgPSAxMjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRW51bSA9IDEzO1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkID0gMTQ7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlNuaXBwZXQgPSAxNTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuQ29sb3IgPSAxNjtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRmlsZSA9IDE3O1xuICAgIENvbXBsZXRpb25JdGVtS2luZC5SZWZlcmVuY2UgPSAxODtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuRm9sZGVyID0gMTk7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkVudW1NZW1iZXIgPSAyMDtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuQ29uc3RhbnQgPSAyMTtcbiAgICBDb21wbGV0aW9uSXRlbUtpbmQuU3RydWN0ID0gMjI7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLkV2ZW50ID0gMjM7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLk9wZXJhdG9yID0gMjQ7XG4gICAgQ29tcGxldGlvbkl0ZW1LaW5kLlR5cGVQYXJhbWV0ZXIgPSAyNTtcbn0pKENvbXBsZXRpb25JdGVtS2luZCB8fCAoQ29tcGxldGlvbkl0ZW1LaW5kID0ge30pKTtcbi8qKlxuICogRGVmaW5lcyB3aGV0aGVyIHRoZSBpbnNlcnQgdGV4dCBpbiBhIGNvbXBsZXRpb24gaXRlbSBzaG91bGQgYmUgaW50ZXJwcmV0ZWQgYXNcbiAqIHBsYWluIHRleHQgb3IgYSBzbmlwcGV0LlxuICovXG5leHBvcnQgdmFyIEluc2VydFRleHRGb3JtYXQ7XG4oZnVuY3Rpb24gKEluc2VydFRleHRGb3JtYXQpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgcHJpbWFyeSB0ZXh0IHRvIGJlIGluc2VydGVkIGlzIHRyZWF0ZWQgYXMgYSBwbGFpbiBzdHJpbmcuXG4gICAgICovXG4gICAgSW5zZXJ0VGV4dEZvcm1hdC5QbGFpblRleHQgPSAxO1xuICAgIC8qKlxuICAgICAqIFRoZSBwcmltYXJ5IHRleHQgdG8gYmUgaW5zZXJ0ZWQgaXMgdHJlYXRlZCBhcyBhIHNuaXBwZXQuXG4gICAgICpcbiAgICAgKiBBIHNuaXBwZXQgY2FuIGRlZmluZSB0YWIgc3RvcHMgYW5kIHBsYWNlaG9sZGVycyB3aXRoIGAkMWAsIGAkMmBcbiAgICAgKiBhbmQgYCR7Mzpmb299YC4gYCQwYCBkZWZpbmVzIHRoZSBmaW5hbCB0YWIgc3RvcCwgaXQgZGVmYXVsdHMgdG9cbiAgICAgKiB0aGUgZW5kIG9mIHRoZSBzbmlwcGV0LiBQbGFjZWhvbGRlcnMgd2l0aCBlcXVhbCBpZGVudGlmaWVycyBhcmUgbGlua2VkLFxuICAgICAqIHRoYXQgaXMgdHlwaW5nIGluIG9uZSB3aWxsIHVwZGF0ZSBvdGhlcnMgdG9vLlxuICAgICAqXG4gICAgICogU2VlIGFsc286IGh0dHBzOi8vbWljcm9zb2Z0LmdpdGh1Yi5pby9sYW5ndWFnZS1zZXJ2ZXItcHJvdG9jb2wvc3BlY2lmaWNhdGlvbnMvc3BlY2lmaWNhdGlvbi1jdXJyZW50LyNzbmlwcGV0X3N5bnRheFxuICAgICAqL1xuICAgIEluc2VydFRleHRGb3JtYXQuU25pcHBldCA9IDI7XG59KShJbnNlcnRUZXh0Rm9ybWF0IHx8IChJbnNlcnRUZXh0Rm9ybWF0ID0ge30pKTtcbi8qKlxuICogQ29tcGxldGlvbiBpdGVtIHRhZ3MgYXJlIGV4dHJhIGFubm90YXRpb25zIHRoYXQgdHdlYWsgdGhlIHJlbmRlcmluZyBvZiBhIGNvbXBsZXRpb25cbiAqIGl0ZW0uXG4gKlxuICogQHNpbmNlIDMuMTUuMFxuICovXG5leHBvcnQgdmFyIENvbXBsZXRpb25JdGVtVGFnO1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uSXRlbVRhZykge1xuICAgIC8qKlxuICAgICAqIFJlbmRlciBhIGNvbXBsZXRpb24gYXMgb2Jzb2xldGUsIHVzdWFsbHkgdXNpbmcgYSBzdHJpa2Utb3V0LlxuICAgICAqL1xuICAgIENvbXBsZXRpb25JdGVtVGFnLkRlcHJlY2F0ZWQgPSAxO1xufSkoQ29tcGxldGlvbkl0ZW1UYWcgfHwgKENvbXBsZXRpb25JdGVtVGFnID0ge30pKTtcbi8qKlxuICogVGhlIEluc2VydFJlcGxhY2VFZGl0IG5hbWVzcGFjZSBwcm92aWRlcyBmdW5jdGlvbnMgdG8gZGVhbCB3aXRoIGluc2VydCAvIHJlcGxhY2UgZWRpdHMuXG4gKlxuICogQHNpbmNlIDMuMTYuMFxuICovXG5leHBvcnQgdmFyIEluc2VydFJlcGxhY2VFZGl0O1xuKGZ1bmN0aW9uIChJbnNlcnRSZXBsYWNlRWRpdCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zZXJ0IC8gcmVwbGFjZSBlZGl0XG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKG5ld1RleHQsIGluc2VydCwgcmVwbGFjZSkge1xuICAgICAgICByZXR1cm4geyBuZXdUZXh0OiBuZXdUZXh0LCBpbnNlcnQ6IGluc2VydCwgcmVwbGFjZTogcmVwbGFjZSB9O1xuICAgIH1cbiAgICBJbnNlcnRSZXBsYWNlRWRpdC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtJbnNlcnRSZXBsYWNlRWRpdF0oI0luc2VydFJlcGxhY2VFZGl0KSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmIElzLnN0cmluZyhjYW5kaWRhdGUubmV3VGV4dCkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLmluc2VydCkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJlcGxhY2UpO1xuICAgIH1cbiAgICBJbnNlcnRSZXBsYWNlRWRpdC5pcyA9IGlzO1xufSkoSW5zZXJ0UmVwbGFjZUVkaXQgfHwgKEluc2VydFJlcGxhY2VFZGl0ID0ge30pKTtcbi8qKlxuICogSG93IHdoaXRlc3BhY2UgYW5kIGluZGVudGF0aW9uIGlzIGhhbmRsZWQgZHVyaW5nIGNvbXBsZXRpb25cbiAqIGl0ZW0gaW5zZXJ0aW9uLlxuICpcbiAqIEBzaW5jZSAzLjE2LjBcbiAqL1xuZXhwb3J0IHZhciBJbnNlcnRUZXh0TW9kZTtcbihmdW5jdGlvbiAoSW5zZXJ0VGV4dE1vZGUpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgaW5zZXJ0aW9uIG9yIHJlcGxhY2Ugc3RyaW5ncyBpcyB0YWtlbiBhcyBpdCBpcy4gSWYgdGhlXG4gICAgICogdmFsdWUgaXMgbXVsdGkgbGluZSB0aGUgbGluZXMgYmVsb3cgdGhlIGN1cnNvciB3aWxsIGJlXG4gICAgICogaW5zZXJ0ZWQgdXNpbmcgdGhlIGluZGVudGF0aW9uIGRlZmluZWQgaW4gdGhlIHN0cmluZyB2YWx1ZS5cbiAgICAgKiBUaGUgY2xpZW50IHdpbGwgbm90IGFwcGx5IGFueSBraW5kIG9mIGFkanVzdG1lbnRzIHRvIHRoZVxuICAgICAqIHN0cmluZy5cbiAgICAgKi9cbiAgICBJbnNlcnRUZXh0TW9kZS5hc0lzID0gMTtcbiAgICAvKipcbiAgICAgKiBUaGUgZWRpdG9yIGFkanVzdHMgbGVhZGluZyB3aGl0ZXNwYWNlIG9mIG5ldyBsaW5lcyBzbyB0aGF0XG4gICAgICogdGhleSBtYXRjaCB0aGUgaW5kZW50YXRpb24gdXAgdG8gdGhlIGN1cnNvciBvZiB0aGUgbGluZSBmb3JcbiAgICAgKiB3aGljaCB0aGUgaXRlbSBpcyBhY2NlcHRlZC5cbiAgICAgKlxuICAgICAqIENvbnNpZGVyIGEgbGluZSBsaWtlIHRoaXM6IDwydGFicz48Y3Vyc29yPjwzdGFicz5mb28uIEFjY2VwdGluZyBhXG4gICAgICogbXVsdGkgbGluZSBjb21wbGV0aW9uIGl0ZW0gaXMgaW5kZW50ZWQgdXNpbmcgMiB0YWJzIGFuZCBhbGxcbiAgICAgKiBmb2xsb3dpbmcgbGluZXMgaW5zZXJ0ZWQgd2lsbCBiZSBpbmRlbnRlZCB1c2luZyAyIHRhYnMgYXMgd2VsbC5cbiAgICAgKi9cbiAgICBJbnNlcnRUZXh0TW9kZS5hZGp1c3RJbmRlbnRhdGlvbiA9IDI7XG59KShJbnNlcnRUZXh0TW9kZSB8fCAoSW5zZXJ0VGV4dE1vZGUgPSB7fSkpO1xuLyoqXG4gKiBUaGUgQ29tcGxldGlvbkl0ZW0gbmFtZXNwYWNlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0byBkZWFsIHdpdGhcbiAqIGNvbXBsZXRpb24gaXRlbXMuXG4gKi9cbmV4cG9ydCB2YXIgQ29tcGxldGlvbkl0ZW07XG4oZnVuY3Rpb24gKENvbXBsZXRpb25JdGVtKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29tcGxldGlvbiBpdGVtIGFuZCBzZWVkIGl0IHdpdGggYSBsYWJlbC5cbiAgICAgKiBAcGFyYW0gbGFiZWwgVGhlIGNvbXBsZXRpb24gaXRlbSdzIGxhYmVsXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGxhYmVsKSB7XG4gICAgICAgIHJldHVybiB7IGxhYmVsOiBsYWJlbCB9O1xuICAgIH1cbiAgICBDb21wbGV0aW9uSXRlbS5jcmVhdGUgPSBjcmVhdGU7XG59KShDb21wbGV0aW9uSXRlbSB8fCAoQ29tcGxldGlvbkl0ZW0gPSB7fSkpO1xuLyoqXG4gKiBUaGUgQ29tcGxldGlvbkxpc3QgbmFtZXNwYWNlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0byBkZWFsIHdpdGhcbiAqIGNvbXBsZXRpb24gbGlzdHMuXG4gKi9cbmV4cG9ydCB2YXIgQ29tcGxldGlvbkxpc3Q7XG4oZnVuY3Rpb24gKENvbXBsZXRpb25MaXN0KSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb21wbGV0aW9uIGxpc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXRlbXMgVGhlIGNvbXBsZXRpb24gaXRlbXMuXG4gICAgICogQHBhcmFtIGlzSW5jb21wbGV0ZSBUaGUgbGlzdCBpcyBub3QgY29tcGxldGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKGl0ZW1zLCBpc0luY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIHsgaXRlbXM6IGl0ZW1zID8gaXRlbXMgOiBbXSwgaXNJbmNvbXBsZXRlOiAhIWlzSW5jb21wbGV0ZSB9O1xuICAgIH1cbiAgICBDb21wbGV0aW9uTGlzdC5jcmVhdGUgPSBjcmVhdGU7XG59KShDb21wbGV0aW9uTGlzdCB8fCAoQ29tcGxldGlvbkxpc3QgPSB7fSkpO1xuZXhwb3J0IHZhciBNYXJrZWRTdHJpbmc7XG4oZnVuY3Rpb24gKE1hcmtlZFN0cmluZykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXJrZWQgc3RyaW5nIGZyb20gcGxhaW4gdGV4dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwbGFpblRleHQgVGhlIHBsYWluIHRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZnJvbVBsYWluVGV4dChwbGFpblRleHQpIHtcbiAgICAgICAgcmV0dXJuIHBsYWluVGV4dC5yZXBsYWNlKC9bXFxcXGAqX3t9W1xcXSgpIytcXC0uIV0vZywgJ1xcXFwkJicpOyAvLyBlc2NhcGUgbWFya2Rvd24gc3ludGF4IHRva2VuczogaHR0cDovL2RhcmluZ2ZpcmViYWxsLm5ldC9wcm9qZWN0cy9tYXJrZG93bi9zeW50YXgjYmFja3NsYXNoXG4gICAgfVxuICAgIE1hcmtlZFN0cmluZy5mcm9tUGxhaW5UZXh0ID0gZnJvbVBsYWluVGV4dDtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgY29uZm9ybXMgdG8gdGhlIFtNYXJrZWRTdHJpbmddKCNNYXJrZWRTdHJpbmcpIHR5cGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuc3RyaW5nKGNhbmRpZGF0ZSkgfHwgKElzLm9iamVjdExpdGVyYWwoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLmxhbmd1YWdlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnZhbHVlKSk7XG4gICAgfVxuICAgIE1hcmtlZFN0cmluZy5pcyA9IGlzO1xufSkoTWFya2VkU3RyaW5nIHx8IChNYXJrZWRTdHJpbmcgPSB7fSkpO1xuZXhwb3J0IHZhciBIb3ZlcjtcbihmdW5jdGlvbiAoSG92ZXIpIHtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgY29uZm9ybXMgdG8gdGhlIFtIb3Zlcl0oI0hvdmVyKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gISFjYW5kaWRhdGUgJiYgSXMub2JqZWN0TGl0ZXJhbChjYW5kaWRhdGUpICYmIChNYXJrdXBDb250ZW50LmlzKGNhbmRpZGF0ZS5jb250ZW50cykgfHxcbiAgICAgICAgICAgIE1hcmtlZFN0cmluZy5pcyhjYW5kaWRhdGUuY29udGVudHMpIHx8XG4gICAgICAgICAgICBJcy50eXBlZEFycmF5KGNhbmRpZGF0ZS5jb250ZW50cywgTWFya2VkU3RyaW5nLmlzKSkgJiYgKHZhbHVlLnJhbmdlID09PSB1bmRlZmluZWQgfHwgUmFuZ2UuaXModmFsdWUucmFuZ2UpKTtcbiAgICB9XG4gICAgSG92ZXIuaXMgPSBpcztcbn0pKEhvdmVyIHx8IChIb3ZlciA9IHt9KSk7XG4vKipcbiAqIFRoZSBQYXJhbWV0ZXJJbmZvcm1hdGlvbiBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIFtQYXJhbWV0ZXJJbmZvcm1hdGlvbl0oI1BhcmFtZXRlckluZm9ybWF0aW9uKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBQYXJhbWV0ZXJJbmZvcm1hdGlvbjtcbihmdW5jdGlvbiAoUGFyYW1ldGVySW5mb3JtYXRpb24pIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHBhcmFtZXRlciBpbmZvcm1hdGlvbiBsaXRlcmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhYmVsIEEgbGFiZWwgc3RyaW5nLlxuICAgICAqIEBwYXJhbSBkb2N1bWVudGF0aW9uIEEgZG9jIHN0cmluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUobGFiZWwsIGRvY3VtZW50YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50YXRpb24gPyB7IGxhYmVsOiBsYWJlbCwgZG9jdW1lbnRhdGlvbjogZG9jdW1lbnRhdGlvbiB9IDogeyBsYWJlbDogbGFiZWwgfTtcbiAgICB9XG4gICAgUGFyYW1ldGVySW5mb3JtYXRpb24uY3JlYXRlID0gY3JlYXRlO1xufSkoUGFyYW1ldGVySW5mb3JtYXRpb24gfHwgKFBhcmFtZXRlckluZm9ybWF0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIFNpZ25hdHVyZUluZm9ybWF0aW9uIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW1NpZ25hdHVyZUluZm9ybWF0aW9uXSgjU2lnbmF0dXJlSW5mb3JtYXRpb24pIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIFNpZ25hdHVyZUluZm9ybWF0aW9uO1xuKGZ1bmN0aW9uIChTaWduYXR1cmVJbmZvcm1hdGlvbikge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShsYWJlbCwgZG9jdW1lbnRhdGlvbikge1xuICAgICAgICB2YXIgcGFyYW1ldGVycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgcGFyYW1ldGVyc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0geyBsYWJlbDogbGFiZWwgfTtcbiAgICAgICAgaWYgKElzLmRlZmluZWQoZG9jdW1lbnRhdGlvbikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5kb2N1bWVudGF0aW9uID0gZG9jdW1lbnRhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXMuZGVmaW5lZChwYXJhbWV0ZXJzKSkge1xuICAgICAgICAgICAgcmVzdWx0LnBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnBhcmFtZXRlcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBTaWduYXR1cmVJbmZvcm1hdGlvbi5jcmVhdGUgPSBjcmVhdGU7XG59KShTaWduYXR1cmVJbmZvcm1hdGlvbiB8fCAoU2lnbmF0dXJlSW5mb3JtYXRpb24gPSB7fSkpO1xuLyoqXG4gKiBBIGRvY3VtZW50IGhpZ2hsaWdodCBraW5kLlxuICovXG5leHBvcnQgdmFyIERvY3VtZW50SGlnaGxpZ2h0S2luZDtcbihmdW5jdGlvbiAoRG9jdW1lbnRIaWdobGlnaHRLaW5kKSB7XG4gICAgLyoqXG4gICAgICogQSB0ZXh0dWFsIG9jY3VycmVuY2UuXG4gICAgICovXG4gICAgRG9jdW1lbnRIaWdobGlnaHRLaW5kLlRleHQgPSAxO1xuICAgIC8qKlxuICAgICAqIFJlYWQtYWNjZXNzIG9mIGEgc3ltYm9sLCBsaWtlIHJlYWRpbmcgYSB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBEb2N1bWVudEhpZ2hsaWdodEtpbmQuUmVhZCA9IDI7XG4gICAgLyoqXG4gICAgICogV3JpdGUtYWNjZXNzIG9mIGEgc3ltYm9sLCBsaWtlIHdyaXRpbmcgdG8gYSB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBEb2N1bWVudEhpZ2hsaWdodEtpbmQuV3JpdGUgPSAzO1xufSkoRG9jdW1lbnRIaWdobGlnaHRLaW5kIHx8IChEb2N1bWVudEhpZ2hsaWdodEtpbmQgPSB7fSkpO1xuLyoqXG4gKiBEb2N1bWVudEhpZ2hsaWdodCBuYW1lc3BhY2UgdG8gcHJvdmlkZSBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW0RvY3VtZW50SGlnaGxpZ2h0XSgjRG9jdW1lbnRIaWdobGlnaHQpIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIERvY3VtZW50SGlnaGxpZ2h0O1xuKGZ1bmN0aW9uIChEb2N1bWVudEhpZ2hsaWdodCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIERvY3VtZW50SGlnaGxpZ2h0IG9iamVjdC5cbiAgICAgKiBAcGFyYW0gcmFuZ2UgVGhlIHJhbmdlIHRoZSBoaWdobGlnaHQgYXBwbGllcyB0by5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIGtpbmQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHsgcmFuZ2U6IHJhbmdlIH07XG4gICAgICAgIGlmIChJcy5udW1iZXIoa2luZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5raW5kID0ga2luZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBEb2N1bWVudEhpZ2hsaWdodC5jcmVhdGUgPSBjcmVhdGU7XG59KShEb2N1bWVudEhpZ2hsaWdodCB8fCAoRG9jdW1lbnRIaWdobGlnaHQgPSB7fSkpO1xuLyoqXG4gKiBBIHN5bWJvbCBraW5kLlxuICovXG5leHBvcnQgdmFyIFN5bWJvbEtpbmQ7XG4oZnVuY3Rpb24gKFN5bWJvbEtpbmQpIHtcbiAgICBTeW1ib2xLaW5kLkZpbGUgPSAxO1xuICAgIFN5bWJvbEtpbmQuTW9kdWxlID0gMjtcbiAgICBTeW1ib2xLaW5kLk5hbWVzcGFjZSA9IDM7XG4gICAgU3ltYm9sS2luZC5QYWNrYWdlID0gNDtcbiAgICBTeW1ib2xLaW5kLkNsYXNzID0gNTtcbiAgICBTeW1ib2xLaW5kLk1ldGhvZCA9IDY7XG4gICAgU3ltYm9sS2luZC5Qcm9wZXJ0eSA9IDc7XG4gICAgU3ltYm9sS2luZC5GaWVsZCA9IDg7XG4gICAgU3ltYm9sS2luZC5Db25zdHJ1Y3RvciA9IDk7XG4gICAgU3ltYm9sS2luZC5FbnVtID0gMTA7XG4gICAgU3ltYm9sS2luZC5JbnRlcmZhY2UgPSAxMTtcbiAgICBTeW1ib2xLaW5kLkZ1bmN0aW9uID0gMTI7XG4gICAgU3ltYm9sS2luZC5WYXJpYWJsZSA9IDEzO1xuICAgIFN5bWJvbEtpbmQuQ29uc3RhbnQgPSAxNDtcbiAgICBTeW1ib2xLaW5kLlN0cmluZyA9IDE1O1xuICAgIFN5bWJvbEtpbmQuTnVtYmVyID0gMTY7XG4gICAgU3ltYm9sS2luZC5Cb29sZWFuID0gMTc7XG4gICAgU3ltYm9sS2luZC5BcnJheSA9IDE4O1xuICAgIFN5bWJvbEtpbmQuT2JqZWN0ID0gMTk7XG4gICAgU3ltYm9sS2luZC5LZXkgPSAyMDtcbiAgICBTeW1ib2xLaW5kLk51bGwgPSAyMTtcbiAgICBTeW1ib2xLaW5kLkVudW1NZW1iZXIgPSAyMjtcbiAgICBTeW1ib2xLaW5kLlN0cnVjdCA9IDIzO1xuICAgIFN5bWJvbEtpbmQuRXZlbnQgPSAyNDtcbiAgICBTeW1ib2xLaW5kLk9wZXJhdG9yID0gMjU7XG4gICAgU3ltYm9sS2luZC5UeXBlUGFyYW1ldGVyID0gMjY7XG59KShTeW1ib2xLaW5kIHx8IChTeW1ib2xLaW5kID0ge30pKTtcbi8qKlxuICogU3ltYm9sIHRhZ3MgYXJlIGV4dHJhIGFubm90YXRpb25zIHRoYXQgdHdlYWsgdGhlIHJlbmRlcmluZyBvZiBhIHN5bWJvbC5cbiAqIEBzaW5jZSAzLjE2XG4gKi9cbmV4cG9ydCB2YXIgU3ltYm9sVGFnO1xuKGZ1bmN0aW9uIChTeW1ib2xUYWcpIHtcbiAgICAvKipcbiAgICAgKiBSZW5kZXIgYSBzeW1ib2wgYXMgb2Jzb2xldGUsIHVzdWFsbHkgdXNpbmcgYSBzdHJpa2Utb3V0LlxuICAgICAqL1xuICAgIFN5bWJvbFRhZy5EZXByZWNhdGVkID0gMTtcbn0pKFN5bWJvbFRhZyB8fCAoU3ltYm9sVGFnID0ge30pKTtcbmV4cG9ydCB2YXIgU3ltYm9sSW5mb3JtYXRpb247XG4oZnVuY3Rpb24gKFN5bWJvbEluZm9ybWF0aW9uKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzeW1ib2wgaW5mb3JtYXRpb24gbGl0ZXJhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzeW1ib2wuXG4gICAgICogQHBhcmFtIGtpbmQgVGhlIGtpbmQgb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gcmFuZ2UgVGhlIHJhbmdlIG9mIHRoZSBsb2NhdGlvbiBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIHJlc291cmNlIG9mIHRoZSBsb2NhdGlvbiBvZiBzeW1ib2wsIGRlZmF1bHRzIHRvIHRoZSBjdXJyZW50IGRvY3VtZW50LlxuICAgICAqIEBwYXJhbSBjb250YWluZXJOYW1lIFRoZSBuYW1lIG9mIHRoZSBzeW1ib2wgY29udGFpbmluZyB0aGUgc3ltYm9sLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShuYW1lLCBraW5kLCByYW5nZSwgdXJpLCBjb250YWluZXJOYW1lKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAga2luZDoga2luZCxcbiAgICAgICAgICAgIGxvY2F0aW9uOiB7IHVyaTogdXJpLCByYW5nZTogcmFuZ2UgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoY29udGFpbmVyTmFtZSkge1xuICAgICAgICAgICAgcmVzdWx0LmNvbnRhaW5lck5hbWUgPSBjb250YWluZXJOYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIFN5bWJvbEluZm9ybWF0aW9uLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKFN5bWJvbEluZm9ybWF0aW9uIHx8IChTeW1ib2xJbmZvcm1hdGlvbiA9IHt9KSk7XG5leHBvcnQgdmFyIERvY3VtZW50U3ltYm9sO1xuKGZ1bmN0aW9uIChEb2N1bWVudFN5bWJvbCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgc3ltYm9sIGluZm9ybWF0aW9uIGxpdGVyYWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSBkZXRhaWwgVGhlIGRldGFpbCBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSBraW5kIFRoZSBraW5kIG9mIHRoZSBzeW1ib2wuXG4gICAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSBvZiB0aGUgc3ltYm9sLlxuICAgICAqIEBwYXJhbSBzZWxlY3Rpb25SYW5nZSBUaGUgc2VsZWN0aW9uUmFuZ2Ugb2YgdGhlIHN5bWJvbC5cbiAgICAgKiBAcGFyYW0gY2hpbGRyZW4gQ2hpbGRyZW4gb2YgdGhlIHN5bWJvbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUobmFtZSwgZGV0YWlsLCBraW5kLCByYW5nZSwgc2VsZWN0aW9uUmFuZ2UsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgZGV0YWlsOiBkZXRhaWwsXG4gICAgICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgc2VsZWN0aW9uUmFuZ2U6IHNlbGVjdGlvblJhbmdlXG4gICAgICAgIH07XG4gICAgICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBEb2N1bWVudFN5bWJvbC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtEb2N1bWVudFN5bWJvbF0oI0RvY3VtZW50U3ltYm9sKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlICYmXG4gICAgICAgICAgICBJcy5zdHJpbmcoY2FuZGlkYXRlLm5hbWUpICYmIElzLm51bWJlcihjYW5kaWRhdGUua2luZCkgJiZcbiAgICAgICAgICAgIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnNlbGVjdGlvblJhbmdlKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5kZXRhaWwgPT09IHVuZGVmaW5lZCB8fCBJcy5zdHJpbmcoY2FuZGlkYXRlLmRldGFpbCkpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmRlcHJlY2F0ZWQgPT09IHVuZGVmaW5lZCB8fCBJcy5ib29sZWFuKGNhbmRpZGF0ZS5kZXByZWNhdGVkKSkgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUuY2hpbGRyZW4gPT09IHVuZGVmaW5lZCB8fCBBcnJheS5pc0FycmF5KGNhbmRpZGF0ZS5jaGlsZHJlbikpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLnRhZ3MgPT09IHVuZGVmaW5lZCB8fCBBcnJheS5pc0FycmF5KGNhbmRpZGF0ZS50YWdzKSk7XG4gICAgfVxuICAgIERvY3VtZW50U3ltYm9sLmlzID0gaXM7XG59KShEb2N1bWVudFN5bWJvbCB8fCAoRG9jdW1lbnRTeW1ib2wgPSB7fSkpO1xuLyoqXG4gKiBBIHNldCBvZiBwcmVkZWZpbmVkIGNvZGUgYWN0aW9uIGtpbmRzXG4gKi9cbmV4cG9ydCB2YXIgQ29kZUFjdGlvbktpbmQ7XG4oZnVuY3Rpb24gKENvZGVBY3Rpb25LaW5kKSB7XG4gICAgLyoqXG4gICAgICogRW1wdHkga2luZC5cbiAgICAgKi9cbiAgICBDb2RlQWN0aW9uS2luZC5FbXB0eSA9ICcnO1xuICAgIC8qKlxuICAgICAqIEJhc2Uga2luZCBmb3IgcXVpY2tmaXggYWN0aW9uczogJ3F1aWNrZml4J1xuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLlF1aWNrRml4ID0gJ3F1aWNrZml4JztcbiAgICAvKipcbiAgICAgKiBCYXNlIGtpbmQgZm9yIHJlZmFjdG9yaW5nIGFjdGlvbnM6ICdyZWZhY3RvcidcbiAgICAgKi9cbiAgICBDb2RlQWN0aW9uS2luZC5SZWZhY3RvciA9ICdyZWZhY3Rvcic7XG4gICAgLyoqXG4gICAgICogQmFzZSBraW5kIGZvciByZWZhY3RvcmluZyBleHRyYWN0aW9uIGFjdGlvbnM6ICdyZWZhY3Rvci5leHRyYWN0J1xuICAgICAqXG4gICAgICogRXhhbXBsZSBleHRyYWN0IGFjdGlvbnM6XG4gICAgICpcbiAgICAgKiAtIEV4dHJhY3QgbWV0aG9kXG4gICAgICogLSBFeHRyYWN0IGZ1bmN0aW9uXG4gICAgICogLSBFeHRyYWN0IHZhcmlhYmxlXG4gICAgICogLSBFeHRyYWN0IGludGVyZmFjZSBmcm9tIGNsYXNzXG4gICAgICogLSAuLi5cbiAgICAgKi9cbiAgICBDb2RlQWN0aW9uS2luZC5SZWZhY3RvckV4dHJhY3QgPSAncmVmYWN0b3IuZXh0cmFjdCc7XG4gICAgLyoqXG4gICAgICogQmFzZSBraW5kIGZvciByZWZhY3RvcmluZyBpbmxpbmUgYWN0aW9uczogJ3JlZmFjdG9yLmlubGluZSdcbiAgICAgKlxuICAgICAqIEV4YW1wbGUgaW5saW5lIGFjdGlvbnM6XG4gICAgICpcbiAgICAgKiAtIElubGluZSBmdW5jdGlvblxuICAgICAqIC0gSW5saW5lIHZhcmlhYmxlXG4gICAgICogLSBJbmxpbmUgY29uc3RhbnRcbiAgICAgKiAtIC4uLlxuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLlJlZmFjdG9ySW5saW5lID0gJ3JlZmFjdG9yLmlubGluZSc7XG4gICAgLyoqXG4gICAgICogQmFzZSBraW5kIGZvciByZWZhY3RvcmluZyByZXdyaXRlIGFjdGlvbnM6ICdyZWZhY3Rvci5yZXdyaXRlJ1xuICAgICAqXG4gICAgICogRXhhbXBsZSByZXdyaXRlIGFjdGlvbnM6XG4gICAgICpcbiAgICAgKiAtIENvbnZlcnQgSmF2YVNjcmlwdCBmdW5jdGlvbiB0byBjbGFzc1xuICAgICAqIC0gQWRkIG9yIHJlbW92ZSBwYXJhbWV0ZXJcbiAgICAgKiAtIEVuY2Fwc3VsYXRlIGZpZWxkXG4gICAgICogLSBNYWtlIG1ldGhvZCBzdGF0aWNcbiAgICAgKiAtIE1vdmUgbWV0aG9kIHRvIGJhc2UgY2xhc3NcbiAgICAgKiAtIC4uLlxuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLlJlZmFjdG9yUmV3cml0ZSA9ICdyZWZhY3Rvci5yZXdyaXRlJztcbiAgICAvKipcbiAgICAgKiBCYXNlIGtpbmQgZm9yIHNvdXJjZSBhY3Rpb25zOiBgc291cmNlYFxuICAgICAqXG4gICAgICogU291cmNlIGNvZGUgYWN0aW9ucyBhcHBseSB0byB0aGUgZW50aXJlIGZpbGUuXG4gICAgICovXG4gICAgQ29kZUFjdGlvbktpbmQuU291cmNlID0gJ3NvdXJjZSc7XG4gICAgLyoqXG4gICAgICogQmFzZSBraW5kIGZvciBhbiBvcmdhbml6ZSBpbXBvcnRzIHNvdXJjZSBhY3Rpb246IGBzb3VyY2Uub3JnYW5pemVJbXBvcnRzYFxuICAgICAqL1xuICAgIENvZGVBY3Rpb25LaW5kLlNvdXJjZU9yZ2FuaXplSW1wb3J0cyA9ICdzb3VyY2Uub3JnYW5pemVJbXBvcnRzJztcbiAgICAvKipcbiAgICAgKiBCYXNlIGtpbmQgZm9yIGF1dG8tZml4IHNvdXJjZSBhY3Rpb25zOiBgc291cmNlLmZpeEFsbGAuXG4gICAgICpcbiAgICAgKiBGaXggYWxsIGFjdGlvbnMgYXV0b21hdGljYWxseSBmaXggZXJyb3JzIHRoYXQgaGF2ZSBhIGNsZWFyIGZpeCB0aGF0IGRvIG5vdCByZXF1aXJlIHVzZXIgaW5wdXQuXG4gICAgICogVGhleSBzaG91bGQgbm90IHN1cHByZXNzIGVycm9ycyBvciBwZXJmb3JtIHVuc2FmZSBmaXhlcyBzdWNoIGFzIGdlbmVyYXRpbmcgbmV3IHR5cGVzIG9yIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAc2luY2UgMy4xNS4wXG4gICAgICovXG4gICAgQ29kZUFjdGlvbktpbmQuU291cmNlRml4QWxsID0gJ3NvdXJjZS5maXhBbGwnO1xufSkoQ29kZUFjdGlvbktpbmQgfHwgKENvZGVBY3Rpb25LaW5kID0ge30pKTtcbi8qKlxuICogVGhlIENvZGVBY3Rpb25Db250ZXh0IG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW0NvZGVBY3Rpb25Db250ZXh0XSgjQ29kZUFjdGlvbkNvbnRleHQpIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIENvZGVBY3Rpb25Db250ZXh0O1xuKGZ1bmN0aW9uIChDb2RlQWN0aW9uQ29udGV4dCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29kZUFjdGlvbkNvbnRleHQgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUoZGlhZ25vc3RpY3MsIG9ubHkpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHsgZGlhZ25vc3RpY3M6IGRpYWdub3N0aWNzIH07XG4gICAgICAgIGlmIChvbmx5ICE9PSB1bmRlZmluZWQgJiYgb25seSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzdWx0Lm9ubHkgPSBvbmx5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIENvZGVBY3Rpb25Db250ZXh0LmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gbGl0ZXJhbCBjb25mb3JtcyB0byB0aGUgW0NvZGVBY3Rpb25Db250ZXh0XSgjQ29kZUFjdGlvbkNvbnRleHQpIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgSXMudHlwZWRBcnJheShjYW5kaWRhdGUuZGlhZ25vc3RpY3MsIERpYWdub3N0aWMuaXMpICYmIChjYW5kaWRhdGUub25seSA9PT0gdW5kZWZpbmVkIHx8IElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLm9ubHksIElzLnN0cmluZykpO1xuICAgIH1cbiAgICBDb2RlQWN0aW9uQ29udGV4dC5pcyA9IGlzO1xufSkoQ29kZUFjdGlvbkNvbnRleHQgfHwgKENvZGVBY3Rpb25Db250ZXh0ID0ge30pKTtcbmV4cG9ydCB2YXIgQ29kZUFjdGlvbjtcbihmdW5jdGlvbiAoQ29kZUFjdGlvbikge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh0aXRsZSwga2luZE9yQ29tbWFuZE9yRWRpdCwga2luZCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0geyB0aXRsZTogdGl0bGUgfTtcbiAgICAgICAgdmFyIGNoZWNrS2luZCA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2Yga2luZE9yQ29tbWFuZE9yRWRpdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNoZWNrS2luZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmVzdWx0LmtpbmQgPSBraW5kT3JDb21tYW5kT3JFZGl0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKENvbW1hbmQuaXMoa2luZE9yQ29tbWFuZE9yRWRpdCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jb21tYW5kID0ga2luZE9yQ29tbWFuZE9yRWRpdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5lZGl0ID0ga2luZE9yQ29tbWFuZE9yRWRpdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hlY2tLaW5kICYmIGtpbmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmtpbmQgPSBraW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIENvZGVBY3Rpb24uY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnRpdGxlKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5kaWFnbm9zdGljcyA9PT0gdW5kZWZpbmVkIHx8IElzLnR5cGVkQXJyYXkoY2FuZGlkYXRlLmRpYWdub3N0aWNzLCBEaWFnbm9zdGljLmlzKSkgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUua2luZCA9PT0gdW5kZWZpbmVkIHx8IElzLnN0cmluZyhjYW5kaWRhdGUua2luZCkpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmVkaXQgIT09IHVuZGVmaW5lZCB8fCBjYW5kaWRhdGUuY29tbWFuZCAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5jb21tYW5kID09PSB1bmRlZmluZWQgfHwgQ29tbWFuZC5pcyhjYW5kaWRhdGUuY29tbWFuZCkpICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmlzUHJlZmVycmVkID09PSB1bmRlZmluZWQgfHwgSXMuYm9vbGVhbihjYW5kaWRhdGUuaXNQcmVmZXJyZWQpKSAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5lZGl0ID09PSB1bmRlZmluZWQgfHwgV29ya3NwYWNlRWRpdC5pcyhjYW5kaWRhdGUuZWRpdCkpO1xuICAgIH1cbiAgICBDb2RlQWN0aW9uLmlzID0gaXM7XG59KShDb2RlQWN0aW9uIHx8IChDb2RlQWN0aW9uID0ge30pKTtcbi8qKlxuICogVGhlIENvZGVMZW5zIG5hbWVzcGFjZSBwcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIHRvIHdvcmsgd2l0aFxuICogW0NvZGVMZW5zXSgjQ29kZUxlbnMpIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIENvZGVMZW5zO1xuKGZ1bmN0aW9uIChDb2RlTGVucykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ29kZUxlbnMgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHsgcmFuZ2U6IHJhbmdlIH07XG4gICAgICAgIGlmIChJcy5kZWZpbmVkKGRhdGEpKSB7XG4gICAgICAgICAgICByZXN1bHQuZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgQ29kZUxlbnMuY3JlYXRlID0gY3JlYXRlO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBsaXRlcmFsIGNvbmZvcm1zIHRvIHRoZSBbQ29kZUxlbnNdKCNDb2RlTGVucykgaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBSYW5nZS5pcyhjYW5kaWRhdGUucmFuZ2UpICYmIChJcy51bmRlZmluZWQoY2FuZGlkYXRlLmNvbW1hbmQpIHx8IENvbW1hbmQuaXMoY2FuZGlkYXRlLmNvbW1hbmQpKTtcbiAgICB9XG4gICAgQ29kZUxlbnMuaXMgPSBpcztcbn0pKENvZGVMZW5zIHx8IChDb2RlTGVucyA9IHt9KSk7XG4vKipcbiAqIFRoZSBGb3JtYXR0aW5nT3B0aW9ucyBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIFtGb3JtYXR0aW5nT3B0aW9uc10oI0Zvcm1hdHRpbmdPcHRpb25zKSBsaXRlcmFscy5cbiAqL1xuZXhwb3J0IHZhciBGb3JtYXR0aW5nT3B0aW9ucztcbihmdW5jdGlvbiAoRm9ybWF0dGluZ09wdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEZvcm1hdHRpbmdPcHRpb25zIGxpdGVyYWwuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRhYlNpemUsIGluc2VydFNwYWNlcykge1xuICAgICAgICByZXR1cm4geyB0YWJTaXplOiB0YWJTaXplLCBpbnNlcnRTcGFjZXM6IGluc2VydFNwYWNlcyB9O1xuICAgIH1cbiAgICBGb3JtYXR0aW5nT3B0aW9ucy5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtGb3JtYXR0aW5nT3B0aW9uc10oI0Zvcm1hdHRpbmdPcHRpb25zKSBpbnRlcmZhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXModmFsdWUpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gSXMuZGVmaW5lZChjYW5kaWRhdGUpICYmIElzLnVpbnRlZ2VyKGNhbmRpZGF0ZS50YWJTaXplKSAmJiBJcy5ib29sZWFuKGNhbmRpZGF0ZS5pbnNlcnRTcGFjZXMpO1xuICAgIH1cbiAgICBGb3JtYXR0aW5nT3B0aW9ucy5pcyA9IGlzO1xufSkoRm9ybWF0dGluZ09wdGlvbnMgfHwgKEZvcm1hdHRpbmdPcHRpb25zID0ge30pKTtcbi8qKlxuICogVGhlIERvY3VtZW50TGluayBuYW1lc3BhY2UgcHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyB0byB3b3JrIHdpdGhcbiAqIFtEb2N1bWVudExpbmtdKCNEb2N1bWVudExpbmspIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIERvY3VtZW50TGluaztcbihmdW5jdGlvbiAoRG9jdW1lbnRMaW5rKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBEb2N1bWVudExpbmsgbGl0ZXJhbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGUocmFuZ2UsIHRhcmdldCwgZGF0YSkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogcmFuZ2UsIHRhcmdldDogdGFyZ2V0LCBkYXRhOiBkYXRhIH07XG4gICAgfVxuICAgIERvY3VtZW50TGluay5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtEb2N1bWVudExpbmtdKCNEb2N1bWVudExpbmspIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyh2YWx1ZSkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBJcy5kZWZpbmVkKGNhbmRpZGF0ZSkgJiYgUmFuZ2UuaXMoY2FuZGlkYXRlLnJhbmdlKSAmJiAoSXMudW5kZWZpbmVkKGNhbmRpZGF0ZS50YXJnZXQpIHx8IElzLnN0cmluZyhjYW5kaWRhdGUudGFyZ2V0KSk7XG4gICAgfVxuICAgIERvY3VtZW50TGluay5pcyA9IGlzO1xufSkoRG9jdW1lbnRMaW5rIHx8IChEb2N1bWVudExpbmsgPSB7fSkpO1xuLyoqXG4gKiBUaGUgU2VsZWN0aW9uUmFuZ2UgbmFtZXNwYWNlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbiB0byB3b3JrIHdpdGhcbiAqIFNlbGVjdGlvblJhbmdlIGxpdGVyYWxzLlxuICovXG5leHBvcnQgdmFyIFNlbGVjdGlvblJhbmdlO1xuKGZ1bmN0aW9uIChTZWxlY3Rpb25SYW5nZSkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgU2VsZWN0aW9uUmFuZ2VcbiAgICAgKiBAcGFyYW0gcmFuZ2UgdGhlIHJhbmdlLlxuICAgICAqIEBwYXJhbSBwYXJlbnQgYW4gb3B0aW9uYWwgcGFyZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShyYW5nZSwgcGFyZW50KSB7XG4gICAgICAgIHJldHVybiB7IHJhbmdlOiByYW5nZSwgcGFyZW50OiBwYXJlbnQgfTtcbiAgICB9XG4gICAgU2VsZWN0aW9uUmFuZ2UuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAhPT0gdW5kZWZpbmVkICYmIFJhbmdlLmlzKGNhbmRpZGF0ZS5yYW5nZSkgJiYgKGNhbmRpZGF0ZS5wYXJlbnQgPT09IHVuZGVmaW5lZCB8fCBTZWxlY3Rpb25SYW5nZS5pcyhjYW5kaWRhdGUucGFyZW50KSk7XG4gICAgfVxuICAgIFNlbGVjdGlvblJhbmdlLmlzID0gaXM7XG59KShTZWxlY3Rpb25SYW5nZSB8fCAoU2VsZWN0aW9uUmFuZ2UgPSB7fSkpO1xuZXhwb3J0IHZhciBFT0wgPSBbJ1xcbicsICdcXHJcXG4nLCAnXFxyJ107XG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSB0aGUgdGV4dCBkb2N1bWVudCBmcm9tIHRoZSBuZXcgdnNjb2RlLWxhbmd1YWdlc2VydmVyLXRleHRkb2N1bWVudCBwYWNrYWdlLlxuICovXG5leHBvcnQgdmFyIFRleHREb2N1bWVudDtcbihmdW5jdGlvbiAoVGV4dERvY3VtZW50KSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBJVGV4dERvY3VtZW50IGxpdGVyYWwgZnJvbSB0aGUgZ2l2ZW4gdXJpIGFuZCBjb250ZW50LlxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGRvY3VtZW50J3MgdXJpLlxuICAgICAqIEBwYXJhbSBsYW5ndWFnZUlkICBUaGUgZG9jdW1lbnQncyBsYW5ndWFnZSBJZC5cbiAgICAgKiBAcGFyYW0gY29udGVudCBUaGUgZG9jdW1lbnQncyBjb250ZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIGxhbmd1YWdlSWQsIHZlcnNpb24sIGNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdWxsVGV4dERvY3VtZW50KHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgY29udGVudCk7XG4gICAgfVxuICAgIFRleHREb2N1bWVudC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGxpdGVyYWwgY29uZm9ybXMgdG8gdGhlIFtJVGV4dERvY3VtZW50XSgjSVRleHREb2N1bWVudCkgaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKHZhbHVlKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIElzLmRlZmluZWQoY2FuZGlkYXRlKSAmJiBJcy5zdHJpbmcoY2FuZGlkYXRlLnVyaSkgJiYgKElzLnVuZGVmaW5lZChjYW5kaWRhdGUubGFuZ3VhZ2VJZCkgfHwgSXMuc3RyaW5nKGNhbmRpZGF0ZS5sYW5ndWFnZUlkKSkgJiYgSXMudWludGVnZXIoY2FuZGlkYXRlLmxpbmVDb3VudClcbiAgICAgICAgICAgICYmIElzLmZ1bmMoY2FuZGlkYXRlLmdldFRleHQpICYmIElzLmZ1bmMoY2FuZGlkYXRlLnBvc2l0aW9uQXQpICYmIElzLmZ1bmMoY2FuZGlkYXRlLm9mZnNldEF0KSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50LmlzID0gaXM7XG4gICAgZnVuY3Rpb24gYXBwbHlFZGl0cyhkb2N1bWVudCwgZWRpdHMpIHtcbiAgICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5nZXRUZXh0KCk7XG4gICAgICAgIHZhciBzb3J0ZWRFZGl0cyA9IG1lcmdlU29ydChlZGl0cywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHZhciBkaWZmID0gYS5yYW5nZS5zdGFydC5saW5lIC0gYi5yYW5nZS5zdGFydC5saW5lO1xuICAgICAgICAgICAgaWYgKGRpZmYgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5yYW5nZS5zdGFydC5jaGFyYWN0ZXIgLSBiLnJhbmdlLnN0YXJ0LmNoYXJhY3RlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkaWZmO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGxhc3RNb2RpZmllZE9mZnNldCA9IHRleHQubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gc29ydGVkRWRpdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBlID0gc29ydGVkRWRpdHNbaV07XG4gICAgICAgICAgICB2YXIgc3RhcnRPZmZzZXQgPSBkb2N1bWVudC5vZmZzZXRBdChlLnJhbmdlLnN0YXJ0KTtcbiAgICAgICAgICAgIHZhciBlbmRPZmZzZXQgPSBkb2N1bWVudC5vZmZzZXRBdChlLnJhbmdlLmVuZCk7XG4gICAgICAgICAgICBpZiAoZW5kT2Zmc2V0IDw9IGxhc3RNb2RpZmllZE9mZnNldCkge1xuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBzdGFydE9mZnNldCkgKyBlLm5ld1RleHQgKyB0ZXh0LnN1YnN0cmluZyhlbmRPZmZzZXQsIHRleHQubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3ZlcmxhcHBpbmcgZWRpdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdE1vZGlmaWVkT2Zmc2V0ID0gc3RhcnRPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICAgIFRleHREb2N1bWVudC5hcHBseUVkaXRzID0gYXBwbHlFZGl0cztcbiAgICBmdW5jdGlvbiBtZXJnZVNvcnQoZGF0YSwgY29tcGFyZSkge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgLy8gc29ydGVkXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcCA9IChkYXRhLmxlbmd0aCAvIDIpIHwgMDtcbiAgICAgICAgdmFyIGxlZnQgPSBkYXRhLnNsaWNlKDAsIHApO1xuICAgICAgICB2YXIgcmlnaHQgPSBkYXRhLnNsaWNlKHApO1xuICAgICAgICBtZXJnZVNvcnQobGVmdCwgY29tcGFyZSk7XG4gICAgICAgIG1lcmdlU29ydChyaWdodCwgY29tcGFyZSk7XG4gICAgICAgIHZhciBsZWZ0SWR4ID0gMDtcbiAgICAgICAgdmFyIHJpZ2h0SWR4ID0gMDtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAobGVmdElkeCA8IGxlZnQubGVuZ3RoICYmIHJpZ2h0SWR4IDwgcmlnaHQubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gY29tcGFyZShsZWZ0W2xlZnRJZHhdLCByaWdodFtyaWdodElkeF0pO1xuICAgICAgICAgICAgaWYgKHJldCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gc21hbGxlcl9lcXVhbCAtPiB0YWtlIGxlZnQgdG8gcHJlc2VydmUgb3JkZXJcbiAgICAgICAgICAgICAgICBkYXRhW2krK10gPSBsZWZ0W2xlZnRJZHgrK107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBncmVhdGVyIC0+IHRha2UgcmlnaHRcbiAgICAgICAgICAgICAgICBkYXRhW2krK10gPSByaWdodFtyaWdodElkeCsrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAobGVmdElkeCA8IGxlZnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBkYXRhW2krK10gPSBsZWZ0W2xlZnRJZHgrK107XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHJpZ2h0SWR4IDwgcmlnaHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBkYXRhW2krK10gPSByaWdodFtyaWdodElkeCsrXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG59KShUZXh0RG9jdW1lbnQgfHwgKFRleHREb2N1bWVudCA9IHt9KSk7XG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSB0aGUgdGV4dCBkb2N1bWVudCBmcm9tIHRoZSBuZXcgdnNjb2RlLWxhbmd1YWdlc2VydmVyLXRleHRkb2N1bWVudCBwYWNrYWdlLlxuICovXG52YXIgRnVsbFRleHREb2N1bWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGdWxsVGV4dERvY3VtZW50KHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgY29udGVudCkge1xuICAgICAgICB0aGlzLl91cmkgPSB1cmk7XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlSWQgPSBsYW5ndWFnZUlkO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuX2xpbmVPZmZzZXRzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUsIFwidXJpXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLCBcImxhbmd1YWdlSWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZUlkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLCBcInZlcnNpb25cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMub2Zmc2V0QXQocmFuZ2Uuc3RhcnQpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMub2Zmc2V0QXQocmFuZ2UuZW5kKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICB9O1xuICAgIEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChldmVudCwgdmVyc2lvbikge1xuICAgICAgICB0aGlzLl9jb250ZW50ID0gZXZlbnQudGV4dDtcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuX2xpbmVPZmZzZXRzID0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUuZ2V0TGluZU9mZnNldHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9saW5lT2Zmc2V0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbGluZU9mZnNldHMgPSBbXTtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gdGhpcy5fY29udGVudDtcbiAgICAgICAgICAgIHZhciBpc0xpbmVTdGFydCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNMaW5lU3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZU9mZnNldHMucHVzaChpKTtcbiAgICAgICAgICAgICAgICAgICAgaXNMaW5lU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGNoID0gdGV4dC5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaXNMaW5lU3RhcnQgPSAoY2ggPT09ICdcXHInIHx8IGNoID09PSAnXFxuJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoID09PSAnXFxyJyAmJiBpICsgMSA8IHRleHQubGVuZ3RoICYmIHRleHQuY2hhckF0KGkgKyAxKSA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0xpbmVTdGFydCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lT2Zmc2V0cy5wdXNoKHRleHQubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xpbmVPZmZzZXRzID0gbGluZU9mZnNldHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVPZmZzZXRzO1xuICAgIH07XG4gICAgRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUucG9zaXRpb25BdCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgb2Zmc2V0ID0gTWF0aC5tYXgoTWF0aC5taW4ob2Zmc2V0LCB0aGlzLl9jb250ZW50Lmxlbmd0aCksIDApO1xuICAgICAgICB2YXIgbGluZU9mZnNldHMgPSB0aGlzLmdldExpbmVPZmZzZXRzKCk7XG4gICAgICAgIHZhciBsb3cgPSAwLCBoaWdoID0gbGluZU9mZnNldHMubGVuZ3RoO1xuICAgICAgICBpZiAoaGlnaCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmNyZWF0ZSgwLCBvZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICAgICAgICB2YXIgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKTtcbiAgICAgICAgICAgIGlmIChsaW5lT2Zmc2V0c1ttaWRdID4gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvdyA9IG1pZCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG93IGlzIHRoZSBsZWFzdCB4IGZvciB3aGljaCB0aGUgbGluZSBvZmZzZXQgaXMgbGFyZ2VyIHRoYW4gdGhlIGN1cnJlbnQgb2Zmc2V0XG4gICAgICAgIC8vIG9yIGFycmF5Lmxlbmd0aCBpZiBubyBsaW5lIG9mZnNldCBpcyBsYXJnZXIgdGhhbiB0aGUgY3VycmVudCBvZmZzZXRcbiAgICAgICAgdmFyIGxpbmUgPSBsb3cgLSAxO1xuICAgICAgICByZXR1cm4gUG9zaXRpb24uY3JlYXRlKGxpbmUsIG9mZnNldCAtIGxpbmVPZmZzZXRzW2xpbmVdKTtcbiAgICB9O1xuICAgIEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLm9mZnNldEF0ID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBsaW5lT2Zmc2V0cyA9IHRoaXMuZ2V0TGluZU9mZnNldHMoKTtcbiAgICAgICAgaWYgKHBvc2l0aW9uLmxpbmUgPj0gbGluZU9mZnNldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zaXRpb24ubGluZSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lT2Zmc2V0ID0gbGluZU9mZnNldHNbcG9zaXRpb24ubGluZV07XG4gICAgICAgIHZhciBuZXh0TGluZU9mZnNldCA9IChwb3NpdGlvbi5saW5lICsgMSA8IGxpbmVPZmZzZXRzLmxlbmd0aCkgPyBsaW5lT2Zmc2V0c1twb3NpdGlvbi5saW5lICsgMV0gOiB0aGlzLl9jb250ZW50Lmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGxpbmVPZmZzZXQgKyBwb3NpdGlvbi5jaGFyYWN0ZXIsIG5leHRMaW5lT2Zmc2V0KSwgbGluZU9mZnNldCk7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUsIFwibGluZUNvdW50XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRMaW5lT2Zmc2V0cygpLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBGdWxsVGV4dERvY3VtZW50O1xufSgpKTtcbnZhciBJcztcbihmdW5jdGlvbiAoSXMpIHtcbiAgICB2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICAgIGZ1bmN0aW9uIGRlZmluZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIElzLmRlZmluZWQgPSBkZWZpbmVkO1xuICAgIGZ1bmN0aW9uIHVuZGVmaW5lZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbiAgICB9XG4gICAgSXMudW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGZ1bmN0aW9uIGJvb2xlYW4odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZTtcbiAgICB9XG4gICAgSXMuYm9vbGVhbiA9IGJvb2xlYW47XG4gICAgZnVuY3Rpb24gc3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gICAgfVxuICAgIElzLnN0cmluZyA9IHN0cmluZztcbiAgICBmdW5jdGlvbiBudW1iZXIodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBOdW1iZXJdJztcbiAgICB9XG4gICAgSXMubnVtYmVyID0gbnVtYmVyO1xuICAgIGZ1bmN0aW9uIG51bWJlclJhbmdlKHZhbHVlLCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmIG1pbiA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSBtYXg7XG4gICAgfVxuICAgIElzLm51bWJlclJhbmdlID0gbnVtYmVyUmFuZ2U7XG4gICAgZnVuY3Rpb24gaW50ZWdlcih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmIC0yMTQ3NDgzNjQ4IDw9IHZhbHVlICYmIHZhbHVlIDw9IDIxNDc0ODM2NDc7XG4gICAgfVxuICAgIElzLmludGVnZXIgPSBpbnRlZ2VyO1xuICAgIGZ1bmN0aW9uIHVpbnRlZ2VyKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgTnVtYmVyXScgJiYgMCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSAyMTQ3NDgzNjQ3O1xuICAgIH1cbiAgICBJcy51aW50ZWdlciA9IHVpbnRlZ2VyO1xuICAgIGZ1bmN0aW9uIGZ1bmModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH1cbiAgICBJcy5mdW5jID0gZnVuYztcbiAgICBmdW5jdGlvbiBvYmplY3RMaXRlcmFsKHZhbHVlKSB7XG4gICAgICAgIC8vIFN0cmljdGx5IHNwZWFraW5nIGNsYXNzIGluc3RhbmNlcyBwYXNzIHRoaXMgY2hlY2sgYXMgd2VsbC4gU2luY2UgdGhlIExTUFxuICAgICAgICAvLyBkb2Vzbid0IHVzZSBjbGFzc2VzIHdlIGlnbm9yZSB0aGlzIGZvciBub3cuIElmIHdlIGRvIHdlIG5lZWQgdG8gYWRkIHNvbWV0aGluZ1xuICAgICAgICAvLyBsaWtlIHRoaXM6IGBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0LmdldFByb3RvdHlwZU9mKHgpKSA9PT0gbnVsbGBcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCc7XG4gICAgfVxuICAgIElzLm9iamVjdExpdGVyYWwgPSBvYmplY3RMaXRlcmFsO1xuICAgIGZ1bmN0aW9uIHR5cGVkQXJyYXkodmFsdWUsIGNoZWNrKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeShjaGVjayk7XG4gICAgfVxuICAgIElzLnR5cGVkQXJyYXkgPSB0eXBlZEFycmF5O1xufSkoSXMgfHwgKElzID0ge30pKTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhvbmUsIG90aGVyKSB7XG4gICAgaWYgKG9uZSA9PT0gb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvbmUgPT09IG51bGwgfHwgb25lID09PSB1bmRlZmluZWQgfHwgb3RoZXIgPT09IG51bGwgfHwgb3RoZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb25lICE9PSB0eXBlb2Ygb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9uZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoKEFycmF5LmlzQXJyYXkob25lKSkgIT09IChBcnJheS5pc0FycmF5KG90aGVyKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgaSwga2V5O1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9uZSkpIHtcbiAgICAgICAgaWYgKG9uZS5sZW5ndGggIT09IG90aGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghZXF1YWxzKG9uZVtpXSwgb3RoZXJbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgb25lS2V5cyA9IFtdO1xuICAgICAgICBmb3IgKGtleSBpbiBvbmUpIHtcbiAgICAgICAgICAgIG9uZUtleXMucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIG9uZUtleXMuc29ydCgpO1xuICAgICAgICB2YXIgb3RoZXJLZXlzID0gW107XG4gICAgICAgIGZvciAoa2V5IGluIG90aGVyKSB7XG4gICAgICAgICAgICBvdGhlcktleXMucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIG90aGVyS2V5cy5zb3J0KCk7XG4gICAgICAgIGlmICghZXF1YWxzKG9uZUtleXMsIG90aGVyS2V5cykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb25lS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCFlcXVhbHMob25lW29uZUtleXNbaV1dLCBvdGhlcltvbmVLZXlzW2ldXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRGVmaW5lZCh2YWwpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnYm9vbGVhbic7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIEZ1bGxUZXh0RG9jdW1lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRnVsbFRleHREb2N1bWVudCh1cmksIGxhbmd1YWdlSWQsIHZlcnNpb24sIGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5fdXJpID0gdXJpO1xuICAgICAgICB0aGlzLl9sYW5ndWFnZUlkID0gbGFuZ3VhZ2VJZDtcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLCBcInVyaVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VyaTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLCBcImxhbmd1YWdlSWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZUlkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUsIFwidmVyc2lvblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnNpb247XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLmdldFRleHQgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLm9mZnNldEF0KHJhbmdlLnN0YXJ0KTtcbiAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLm9mZnNldEF0KHJhbmdlLmVuZCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudC5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgfTtcbiAgICBGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoY2hhbmdlcywgdmVyc2lvbikge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGNoYW5nZXNfMSA9IGNoYW5nZXM7IF9pIDwgY2hhbmdlc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGNoYW5nZXNfMVtfaV07XG4gICAgICAgICAgICBpZiAoRnVsbFRleHREb2N1bWVudC5pc0luY3JlbWVudGFsKGNoYW5nZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBtYWtlcyBzdXJlIHN0YXJ0IGlzIGJlZm9yZSBlbmRcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBnZXRXZWxsZm9ybWVkUmFuZ2UoY2hhbmdlLnJhbmdlKTtcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgY29udGVudFxuICAgICAgICAgICAgICAgIHZhciBzdGFydE9mZnNldCA9IHRoaXMub2Zmc2V0QXQocmFuZ2Uuc3RhcnQpO1xuICAgICAgICAgICAgICAgIHZhciBlbmRPZmZzZXQgPSB0aGlzLm9mZnNldEF0KHJhbmdlLmVuZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IHRoaXMuX2NvbnRlbnQuc3Vic3RyaW5nKDAsIHN0YXJ0T2Zmc2V0KSArIGNoYW5nZS50ZXh0ICsgdGhpcy5fY29udGVudC5zdWJzdHJpbmcoZW5kT2Zmc2V0LCB0aGlzLl9jb250ZW50Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBvZmZzZXRzXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0TGluZSA9IE1hdGgubWF4KHJhbmdlLnN0YXJ0LmxpbmUsIDApO1xuICAgICAgICAgICAgICAgIHZhciBlbmRMaW5lID0gTWF0aC5tYXgocmFuZ2UuZW5kLmxpbmUsIDApO1xuICAgICAgICAgICAgICAgIHZhciBsaW5lT2Zmc2V0cyA9IHRoaXMuX2xpbmVPZmZzZXRzO1xuICAgICAgICAgICAgICAgIHZhciBhZGRlZExpbmVPZmZzZXRzID0gY29tcHV0ZUxpbmVPZmZzZXRzKGNoYW5nZS50ZXh0LCBmYWxzZSwgc3RhcnRPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGlmIChlbmRMaW5lIC0gc3RhcnRMaW5lID09PSBhZGRlZExpbmVPZmZzZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYWRkZWRMaW5lT2Zmc2V0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZU9mZnNldHNbaSArIHN0YXJ0TGluZSArIDFdID0gYWRkZWRMaW5lT2Zmc2V0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkZGVkTGluZU9mZnNldHMubGVuZ3RoIDwgMTAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVPZmZzZXRzLnNwbGljZS5hcHBseShsaW5lT2Zmc2V0cywgW3N0YXJ0TGluZSArIDEsIGVuZExpbmUgLSBzdGFydExpbmVdLmNvbmNhdChhZGRlZExpbmVPZmZzZXRzKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vIGF2b2lkIHRvbyBtYW55IGFyZ3VtZW50cyBmb3Igc3BsaWNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9saW5lT2Zmc2V0cyA9IGxpbmVPZmZzZXRzID0gbGluZU9mZnNldHMuc2xpY2UoMCwgc3RhcnRMaW5lICsgMSkuY29uY2F0KGFkZGVkTGluZU9mZnNldHMsIGxpbmVPZmZzZXRzLnNsaWNlKGVuZExpbmUgKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGRpZmYgPSBjaGFuZ2UudGV4dC5sZW5ndGggLSAoZW5kT2Zmc2V0IC0gc3RhcnRPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGlmIChkaWZmICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydExpbmUgKyAxICsgYWRkZWRMaW5lT2Zmc2V0cy5sZW5ndGgsIGxlbiA9IGxpbmVPZmZzZXRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lT2Zmc2V0c1tpXSA9IGxpbmVPZmZzZXRzW2ldICsgZGlmZjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKEZ1bGxUZXh0RG9jdW1lbnQuaXNGdWxsKGNoYW5nZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gY2hhbmdlLnRleHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZU9mZnNldHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gY2hhbmdlIGV2ZW50IHJlY2VpdmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IHZlcnNpb247XG4gICAgfTtcbiAgICBGdWxsVGV4dERvY3VtZW50LnByb3RvdHlwZS5nZXRMaW5lT2Zmc2V0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpbmVPZmZzZXRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbmVPZmZzZXRzID0gY29tcHV0ZUxpbmVPZmZzZXRzKHRoaXMuX2NvbnRlbnQsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lT2Zmc2V0cztcbiAgICB9O1xuICAgIEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLnBvc2l0aW9uQXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IE1hdGgubWF4KE1hdGgubWluKG9mZnNldCwgdGhpcy5fY29udGVudC5sZW5ndGgpLCAwKTtcbiAgICAgICAgdmFyIGxpbmVPZmZzZXRzID0gdGhpcy5nZXRMaW5lT2Zmc2V0cygpO1xuICAgICAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGxpbmVPZmZzZXRzLmxlbmd0aDtcbiAgICAgICAgaWYgKGhpZ2ggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7IGxpbmU6IDAsIGNoYXJhY3Rlcjogb2Zmc2V0IH07XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgICAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xuICAgICAgICAgICAgaWYgKGxpbmVPZmZzZXRzW21pZF0gPiBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBoaWdoID0gbWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbG93ID0gbWlkICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBsb3cgaXMgdGhlIGxlYXN0IHggZm9yIHdoaWNoIHRoZSBsaW5lIG9mZnNldCBpcyBsYXJnZXIgdGhhbiB0aGUgY3VycmVudCBvZmZzZXRcbiAgICAgICAgLy8gb3IgYXJyYXkubGVuZ3RoIGlmIG5vIGxpbmUgb2Zmc2V0IGlzIGxhcmdlciB0aGFuIHRoZSBjdXJyZW50IG9mZnNldFxuICAgICAgICB2YXIgbGluZSA9IGxvdyAtIDE7XG4gICAgICAgIHJldHVybiB7IGxpbmU6IGxpbmUsIGNoYXJhY3Rlcjogb2Zmc2V0IC0gbGluZU9mZnNldHNbbGluZV0gfTtcbiAgICB9O1xuICAgIEZ1bGxUZXh0RG9jdW1lbnQucHJvdG90eXBlLm9mZnNldEF0ID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBsaW5lT2Zmc2V0cyA9IHRoaXMuZ2V0TGluZU9mZnNldHMoKTtcbiAgICAgICAgaWYgKHBvc2l0aW9uLmxpbmUgPj0gbGluZU9mZnNldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9zaXRpb24ubGluZSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lT2Zmc2V0ID0gbGluZU9mZnNldHNbcG9zaXRpb24ubGluZV07XG4gICAgICAgIHZhciBuZXh0TGluZU9mZnNldCA9IChwb3NpdGlvbi5saW5lICsgMSA8IGxpbmVPZmZzZXRzLmxlbmd0aCkgPyBsaW5lT2Zmc2V0c1twb3NpdGlvbi5saW5lICsgMV0gOiB0aGlzLl9jb250ZW50Lmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGxpbmVPZmZzZXQgKyBwb3NpdGlvbi5jaGFyYWN0ZXIsIG5leHRMaW5lT2Zmc2V0KSwgbGluZU9mZnNldCk7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVsbFRleHREb2N1bWVudC5wcm90b3R5cGUsIFwibGluZUNvdW50XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRMaW5lT2Zmc2V0cygpLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgRnVsbFRleHREb2N1bWVudC5pc0luY3JlbWVudGFsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSBldmVudDtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAhPT0gdW5kZWZpbmVkICYmIGNhbmRpZGF0ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgdHlwZW9mIGNhbmRpZGF0ZS50ZXh0ID09PSAnc3RyaW5nJyAmJiBjYW5kaWRhdGUucmFuZ2UgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5yYW5nZUxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBjYW5kaWRhdGUucmFuZ2VMZW5ndGggPT09ICdudW1iZXInKTtcbiAgICB9O1xuICAgIEZ1bGxUZXh0RG9jdW1lbnQuaXNGdWxsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSBldmVudDtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZSAhPT0gdW5kZWZpbmVkICYmIGNhbmRpZGF0ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgdHlwZW9mIGNhbmRpZGF0ZS50ZXh0ID09PSAnc3RyaW5nJyAmJiBjYW5kaWRhdGUucmFuZ2UgPT09IHVuZGVmaW5lZCAmJiBjYW5kaWRhdGUucmFuZ2VMZW5ndGggPT09IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIHJldHVybiBGdWxsVGV4dERvY3VtZW50O1xufSgpKTtcbmV4cG9ydCB2YXIgVGV4dERvY3VtZW50O1xuKGZ1bmN0aW9uIChUZXh0RG9jdW1lbnQpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHRleHQgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdXJpIFRoZSBkb2N1bWVudCdzIHVyaS5cbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VJZCAgVGhlIGRvY3VtZW50J3MgbGFuZ3VhZ2UgSWQuXG4gICAgICogQHBhcmFtIHZlcnNpb24gVGhlIGRvY3VtZW50J3MgaW5pdGlhbCB2ZXJzaW9uIG51bWJlci5cbiAgICAgKiBAcGFyYW0gY29udGVudCBUaGUgZG9jdW1lbnQncyBjb250ZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmksIGxhbmd1YWdlSWQsIHZlcnNpb24sIGNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdWxsVGV4dERvY3VtZW50KHVyaSwgbGFuZ3VhZ2VJZCwgdmVyc2lvbiwgY29udGVudCk7XG4gICAgfVxuICAgIFRleHREb2N1bWVudC5jcmVhdGUgPSBjcmVhdGU7XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBhIFRleHREb2N1bWVudCBieSBtb2RpZmluZyBpdHMgY29udGVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkb2N1bWVudCB0aGUgZG9jdW1lbnQgdG8gdXBkYXRlLiBPbmx5IGRvY3VtZW50cyBjcmVhdGVkIGJ5IFRleHREb2N1bWVudC5jcmVhdGUgYXJlIHZhbGlkIGlucHV0cy5cbiAgICAgKiBAcGFyYW0gY2hhbmdlcyB0aGUgY2hhbmdlcyB0byBhcHBseSB0byB0aGUgZG9jdW1lbnQuXG4gICAgICogQHJldHVybnMgVGhlIHVwZGF0ZWQgVGV4dERvY3VtZW50LiBOb3RlOiBUaGF0J3MgdGhlIHNhbWUgZG9jdW1lbnQgaW5zdGFuY2UgcGFzc2VkIGluIGFzIGZpcnN0IHBhcmFtZXRlci5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZShkb2N1bWVudCwgY2hhbmdlcywgdmVyc2lvbikge1xuICAgICAgICBpZiAoZG9jdW1lbnQgaW5zdGFuY2VvZiBGdWxsVGV4dERvY3VtZW50KSB7XG4gICAgICAgICAgICBkb2N1bWVudC51cGRhdGUoY2hhbmdlcywgdmVyc2lvbik7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RleHREb2N1bWVudC51cGRhdGU6IGRvY3VtZW50IG11c3QgYmUgY3JlYXRlZCBieSBUZXh0RG9jdW1lbnQuY3JlYXRlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgVGV4dERvY3VtZW50LnVwZGF0ZSA9IHVwZGF0ZTtcbiAgICBmdW5jdGlvbiBhcHBseUVkaXRzKGRvY3VtZW50LCBlZGl0cykge1xuICAgICAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmdldFRleHQoKTtcbiAgICAgICAgdmFyIHNvcnRlZEVkaXRzID0gbWVyZ2VTb3J0KGVkaXRzLm1hcChnZXRXZWxsZm9ybWVkRWRpdCksIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgZGlmZiA9IGEucmFuZ2Uuc3RhcnQubGluZSAtIGIucmFuZ2Uuc3RhcnQubGluZTtcbiAgICAgICAgICAgIGlmIChkaWZmID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEucmFuZ2Uuc3RhcnQuY2hhcmFjdGVyIC0gYi5yYW5nZS5zdGFydC5jaGFyYWN0ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGlmZjtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBsYXN0TW9kaWZpZWRPZmZzZXQgPSAwO1xuICAgICAgICB2YXIgc3BhbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBzb3J0ZWRFZGl0c18xID0gc29ydGVkRWRpdHM7IF9pIDwgc29ydGVkRWRpdHNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBlID0gc29ydGVkRWRpdHNfMVtfaV07XG4gICAgICAgICAgICB2YXIgc3RhcnRPZmZzZXQgPSBkb2N1bWVudC5vZmZzZXRBdChlLnJhbmdlLnN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChzdGFydE9mZnNldCA8IGxhc3RNb2RpZmllZE9mZnNldCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3ZlcmxhcHBpbmcgZWRpdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhcnRPZmZzZXQgPiBsYXN0TW9kaWZpZWRPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBzcGFucy5wdXNoKHRleHQuc3Vic3RyaW5nKGxhc3RNb2RpZmllZE9mZnNldCwgc3RhcnRPZmZzZXQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlLm5ld1RleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3BhbnMucHVzaChlLm5ld1RleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdE1vZGlmaWVkT2Zmc2V0ID0gZG9jdW1lbnQub2Zmc2V0QXQoZS5yYW5nZS5lbmQpO1xuICAgICAgICB9XG4gICAgICAgIHNwYW5zLnB1c2godGV4dC5zdWJzdHIobGFzdE1vZGlmaWVkT2Zmc2V0KSk7XG4gICAgICAgIHJldHVybiBzcGFucy5qb2luKCcnKTtcbiAgICB9XG4gICAgVGV4dERvY3VtZW50LmFwcGx5RWRpdHMgPSBhcHBseUVkaXRzO1xufSkoVGV4dERvY3VtZW50IHx8IChUZXh0RG9jdW1lbnQgPSB7fSkpO1xuZnVuY3Rpb24gbWVyZ2VTb3J0KGRhdGEsIGNvbXBhcmUpIHtcbiAgICBpZiAoZGF0YS5sZW5ndGggPD0gMSkge1xuICAgICAgICAvLyBzb3J0ZWRcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHZhciBwID0gKGRhdGEubGVuZ3RoIC8gMikgfCAwO1xuICAgIHZhciBsZWZ0ID0gZGF0YS5zbGljZSgwLCBwKTtcbiAgICB2YXIgcmlnaHQgPSBkYXRhLnNsaWNlKHApO1xuICAgIG1lcmdlU29ydChsZWZ0LCBjb21wYXJlKTtcbiAgICBtZXJnZVNvcnQocmlnaHQsIGNvbXBhcmUpO1xuICAgIHZhciBsZWZ0SWR4ID0gMDtcbiAgICB2YXIgcmlnaHRJZHggPSAwO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAobGVmdElkeCA8IGxlZnQubGVuZ3RoICYmIHJpZ2h0SWR4IDwgcmlnaHQubGVuZ3RoKSB7XG4gICAgICAgIHZhciByZXQgPSBjb21wYXJlKGxlZnRbbGVmdElkeF0sIHJpZ2h0W3JpZ2h0SWR4XSk7XG4gICAgICAgIGlmIChyZXQgPD0gMCkge1xuICAgICAgICAgICAgLy8gc21hbGxlcl9lcXVhbCAtPiB0YWtlIGxlZnQgdG8gcHJlc2VydmUgb3JkZXJcbiAgICAgICAgICAgIGRhdGFbaSsrXSA9IGxlZnRbbGVmdElkeCsrXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGdyZWF0ZXIgLT4gdGFrZSByaWdodFxuICAgICAgICAgICAgZGF0YVtpKytdID0gcmlnaHRbcmlnaHRJZHgrK107XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKGxlZnRJZHggPCBsZWZ0Lmxlbmd0aCkge1xuICAgICAgICBkYXRhW2krK10gPSBsZWZ0W2xlZnRJZHgrK107XG4gICAgfVxuICAgIHdoaWxlIChyaWdodElkeCA8IHJpZ2h0Lmxlbmd0aCkge1xuICAgICAgICBkYXRhW2krK10gPSByaWdodFtyaWdodElkeCsrXTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG5mdW5jdGlvbiBjb21wdXRlTGluZU9mZnNldHModGV4dCwgaXNBdExpbmVTdGFydCwgdGV4dE9mZnNldCkge1xuICAgIGlmICh0ZXh0T2Zmc2V0ID09PSB2b2lkIDApIHsgdGV4dE9mZnNldCA9IDA7IH1cbiAgICB2YXIgcmVzdWx0ID0gaXNBdExpbmVTdGFydCA/IFt0ZXh0T2Zmc2V0XSA6IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2ggPSB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjaCA9PT0gMTMgLyogQ2FycmlhZ2VSZXR1cm4gKi8gfHwgY2ggPT09IDEwIC8qIExpbmVGZWVkICovKSB7XG4gICAgICAgICAgICBpZiAoY2ggPT09IDEzIC8qIENhcnJpYWdlUmV0dXJuICovICYmIGkgKyAxIDwgdGV4dC5sZW5ndGggJiYgdGV4dC5jaGFyQ29kZUF0KGkgKyAxKSA9PT0gMTAgLyogTGluZUZlZWQgKi8pIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0ZXh0T2Zmc2V0ICsgaSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZXRXZWxsZm9ybWVkUmFuZ2UocmFuZ2UpIHtcbiAgICB2YXIgc3RhcnQgPSByYW5nZS5zdGFydDtcbiAgICB2YXIgZW5kID0gcmFuZ2UuZW5kO1xuICAgIGlmIChzdGFydC5saW5lID4gZW5kLmxpbmUgfHwgKHN0YXJ0LmxpbmUgPT09IGVuZC5saW5lICYmIHN0YXJ0LmNoYXJhY3RlciA+IGVuZC5jaGFyYWN0ZXIpKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBlbmQsIGVuZDogc3RhcnQgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJhbmdlO1xufVxuZnVuY3Rpb24gZ2V0V2VsbGZvcm1lZEVkaXQodGV4dEVkaXQpIHtcbiAgICB2YXIgcmFuZ2UgPSBnZXRXZWxsZm9ybWVkUmFuZ2UodGV4dEVkaXQucmFuZ2UpO1xuICAgIGlmIChyYW5nZSAhPT0gdGV4dEVkaXQucmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIHsgbmV3VGV4dDogdGV4dEVkaXQubmV3VGV4dCwgcmFuZ2U6IHJhbmdlIH07XG4gICAgfVxuICAgIHJldHVybiB0ZXh0RWRpdDtcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgUmFuZ2UsIFRleHRFZGl0LCBDb2xvciwgQ29sb3JJbmZvcm1hdGlvbiwgQ29sb3JQcmVzZW50YXRpb24sIEZvbGRpbmdSYW5nZSwgRm9sZGluZ1JhbmdlS2luZCwgTWFya3VwS2luZCwgU2VsZWN0aW9uUmFuZ2UsIERpYWdub3N0aWMsIERpYWdub3N0aWNTZXZlcml0eSwgQ29tcGxldGlvbkl0ZW0sIENvbXBsZXRpb25JdGVtS2luZCwgQ29tcGxldGlvbkxpc3QsIFBvc2l0aW9uLCBJbnNlcnRUZXh0Rm9ybWF0LCBNYXJrdXBDb250ZW50LCBTeW1ib2xJbmZvcm1hdGlvbiwgU3ltYm9sS2luZCwgRG9jdW1lbnRTeW1ib2wsIExvY2F0aW9uLCBIb3ZlciwgTWFya2VkU3RyaW5nIH0gZnJvbSAnLi8uLi92c2NvZGUtbGFuZ3VhZ2VzZXJ2ZXItdHlwZXMvbWFpbi5qcyc7XG5pbXBvcnQgeyBUZXh0RG9jdW1lbnQgfSBmcm9tICcuLy4uL3ZzY29kZS1sYW5ndWFnZXNlcnZlci10ZXh0ZG9jdW1lbnQvbGliL2VzbS9tYWluLmpzJztcbmV4cG9ydCB7IFRleHREb2N1bWVudCwgUmFuZ2UsIFRleHRFZGl0LCBDb2xvciwgQ29sb3JJbmZvcm1hdGlvbiwgQ29sb3JQcmVzZW50YXRpb24sIEZvbGRpbmdSYW5nZSwgRm9sZGluZ1JhbmdlS2luZCwgU2VsZWN0aW9uUmFuZ2UsIERpYWdub3N0aWMsIERpYWdub3N0aWNTZXZlcml0eSwgQ29tcGxldGlvbkl0ZW0sIENvbXBsZXRpb25JdGVtS2luZCwgQ29tcGxldGlvbkxpc3QsIFBvc2l0aW9uLCBJbnNlcnRUZXh0Rm9ybWF0LCBNYXJrdXBDb250ZW50LCBNYXJrdXBLaW5kLCBTeW1ib2xJbmZvcm1hdGlvbiwgU3ltYm9sS2luZCwgRG9jdW1lbnRTeW1ib2wsIExvY2F0aW9uLCBIb3ZlciwgTWFya2VkU3RyaW5nIH07XG4vKipcbiAqIEVycm9yIGNvZGVzIHVzZWQgYnkgZGlhZ25vc3RpY3NcbiAqL1xuZXhwb3J0IHZhciBFcnJvckNvZGU7XG4oZnVuY3Rpb24gKEVycm9yQ29kZSkge1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJVbmRlZmluZWRcIl0gPSAwXSA9IFwiVW5kZWZpbmVkXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkVudW1WYWx1ZU1pc21hdGNoXCJdID0gMV0gPSBcIkVudW1WYWx1ZU1pc21hdGNoXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkRlcHJlY2F0ZWRcIl0gPSAyXSA9IFwiRGVwcmVjYXRlZFwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJVbmV4cGVjdGVkRW5kT2ZDb21tZW50XCJdID0gMjU3XSA9IFwiVW5leHBlY3RlZEVuZE9mQ29tbWVudFwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJVbmV4cGVjdGVkRW5kT2ZTdHJpbmdcIl0gPSAyNThdID0gXCJVbmV4cGVjdGVkRW5kT2ZTdHJpbmdcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiVW5leHBlY3RlZEVuZE9mTnVtYmVyXCJdID0gMjU5XSA9IFwiVW5leHBlY3RlZEVuZE9mTnVtYmVyXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkludmFsaWRVbmljb2RlXCJdID0gMjYwXSA9IFwiSW52YWxpZFVuaWNvZGVcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiSW52YWxpZEVzY2FwZUNoYXJhY3RlclwiXSA9IDI2MV0gPSBcIkludmFsaWRFc2NhcGVDaGFyYWN0ZXJcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiSW52YWxpZENoYXJhY3RlclwiXSA9IDI2Ml0gPSBcIkludmFsaWRDaGFyYWN0ZXJcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiUHJvcGVydHlFeHBlY3RlZFwiXSA9IDUxM10gPSBcIlByb3BlcnR5RXhwZWN0ZWRcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQ29tbWFFeHBlY3RlZFwiXSA9IDUxNF0gPSBcIkNvbW1hRXhwZWN0ZWRcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQ29sb25FeHBlY3RlZFwiXSA9IDUxNV0gPSBcIkNvbG9uRXhwZWN0ZWRcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiVmFsdWVFeHBlY3RlZFwiXSA9IDUxNl0gPSBcIlZhbHVlRXhwZWN0ZWRcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQ29tbWFPckNsb3NlQmFja2V0RXhwZWN0ZWRcIl0gPSA1MTddID0gXCJDb21tYU9yQ2xvc2VCYWNrZXRFeHBlY3RlZFwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJDb21tYU9yQ2xvc2VCcmFjZUV4cGVjdGVkXCJdID0gNTE4XSA9IFwiQ29tbWFPckNsb3NlQnJhY2VFeHBlY3RlZFwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJUcmFpbGluZ0NvbW1hXCJdID0gNTE5XSA9IFwiVHJhaWxpbmdDb21tYVwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJEdXBsaWNhdGVLZXlcIl0gPSA1MjBdID0gXCJEdXBsaWNhdGVLZXlcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQ29tbWVudE5vdFBlcm1pdHRlZFwiXSA9IDUyMV0gPSBcIkNvbW1lbnROb3RQZXJtaXR0ZWRcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiU2NoZW1hUmVzb2x2ZUVycm9yXCJdID0gNzY4XSA9IFwiU2NoZW1hUmVzb2x2ZUVycm9yXCI7XG59KShFcnJvckNvZGUgfHwgKEVycm9yQ29kZSA9IHt9KSk7XG5leHBvcnQgdmFyIENsaWVudENhcGFiaWxpdGllcztcbihmdW5jdGlvbiAoQ2xpZW50Q2FwYWJpbGl0aWVzKSB7XG4gICAgQ2xpZW50Q2FwYWJpbGl0aWVzLkxBVEVTVCA9IHtcbiAgICAgICAgdGV4dERvY3VtZW50OiB7XG4gICAgICAgICAgICBjb21wbGV0aW9uOiB7XG4gICAgICAgICAgICAgICAgY29tcGxldGlvbkl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRhdGlvbkZvcm1hdDogW01hcmt1cEtpbmQuTWFya2Rvd24sIE1hcmt1cEtpbmQuUGxhaW5UZXh0XSxcbiAgICAgICAgICAgICAgICAgICAgY29tbWl0Q2hhcmFjdGVyc1N1cHBvcnQ6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSkoQ2xpZW50Q2FwYWJpbGl0aWVzIHx8IChDbGllbnRDYXBhYmlsaXRpZXMgPSB7fSkpO1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmZ1bmN0aW9uIGZvcm1hdChtZXNzYWdlLCBhcmdzKSB7XHJcbiAgICB2YXIgcmVzdWx0O1xyXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gbWVzc2FnZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdCA9IG1lc3NhZ2UucmVwbGFjZSgvXFx7KFxcZCspXFx9L2csIGZ1bmN0aW9uIChtYXRjaCwgcmVzdCkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSByZXN0WzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3NbaW5kZXhdICE9PSAndW5kZWZpbmVkJyA/IGFyZ3NbaW5kZXhdIDogbWF0Y2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbmZ1bmN0aW9uIGxvY2FsaXplKGtleSwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgYXJnc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtYXQobWVzc2FnZSwgYXJncyk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRNZXNzYWdlQnVuZGxlKGZpbGUpIHtcclxuICAgIHJldHVybiBsb2NhbGl6ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnKG9wdCkge1xyXG4gICAgcmV0dXJuIGxvYWRNZXNzYWdlQnVuZGxlO1xyXG59XHJcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCAqIGFzIEpzb24gZnJvbSAnLi8uLi8uLi9qc29uYy1wYXJzZXIvbWFpbi5qcyc7XG5pbXBvcnQgeyBpc051bWJlciwgZXF1YWxzLCBpc0Jvb2xlYW4sIGlzU3RyaW5nLCBpc0RlZmluZWQgfSBmcm9tICcuLi91dGlscy9vYmplY3RzLmpzJztcbmltcG9ydCB7IEVycm9yQ29kZSwgRGlhZ25vc3RpYywgRGlhZ25vc3RpY1NldmVyaXR5LCBSYW5nZSB9IGZyb20gJy4uL2pzb25MYW5ndWFnZVR5cGVzLmpzJztcbmltcG9ydCAqIGFzIG5scyBmcm9tICcuLy4uLy4uLy4uL2ZpbGxlcnMvdnNjb2RlLW5scy5qcyc7XG52YXIgbG9jYWxpemUgPSBubHMubG9hZE1lc3NhZ2VCdW5kbGUoKTtcbnZhciBmb3JtYXRzID0ge1xuICAgICdjb2xvci1oZXgnOiB7IGVycm9yTWVzc2FnZTogbG9jYWxpemUoJ2NvbG9ySGV4Rm9ybWF0V2FybmluZycsICdJbnZhbGlkIGNvbG9yIGZvcm1hdC4gVXNlICNSR0IsICNSR0JBLCAjUlJHR0JCIG9yICNSUkdHQkJBQS4nKSwgcGF0dGVybjogL14jKFswLTlBLUZhLWZdezMsNH18KFswLTlBLUZhLWZdezJ9KXszLDR9KSQvIH0sXG4gICAgJ2RhdGUtdGltZSc6IHsgZXJyb3JNZXNzYWdlOiBsb2NhbGl6ZSgnZGF0ZVRpbWVGb3JtYXRXYXJuaW5nJywgJ1N0cmluZyBpcyBub3QgYSBSRkMzMzM5IGRhdGUtdGltZS4nKSwgcGF0dGVybjogL14oXFxkezR9KS0oMFsxLTldfDFbMC0yXSktKDBbMS05XXxbMTJdWzAtOV18M1swMV0pVChbMDFdWzAtOV18MlswLTNdKTooWzAtNV1bMC05XSk6KFswLTVdWzAtOV18NjApKFxcLlswLTldKyk/KFp8KFxcK3wtKShbMDFdWzAtOV18MlswLTNdKTooWzAtNV1bMC05XSkpJC9pIH0sXG4gICAgJ2RhdGUnOiB7IGVycm9yTWVzc2FnZTogbG9jYWxpemUoJ2RhdGVGb3JtYXRXYXJuaW5nJywgJ1N0cmluZyBpcyBub3QgYSBSRkMzMzM5IGRhdGUuJyksIHBhdHRlcm46IC9eKFxcZHs0fSktKDBbMS05XXwxWzAtMl0pLSgwWzEtOV18WzEyXVswLTldfDNbMDFdKSQvaSB9LFxuICAgICd0aW1lJzogeyBlcnJvck1lc3NhZ2U6IGxvY2FsaXplKCd0aW1lRm9ybWF0V2FybmluZycsICdTdHJpbmcgaXMgbm90IGEgUkZDMzMzOSB0aW1lLicpLCBwYXR0ZXJuOiAvXihbMDFdWzAtOV18MlswLTNdKTooWzAtNV1bMC05XSk6KFswLTVdWzAtOV18NjApKFxcLlswLTldKyk/KFp8KFxcK3wtKShbMDFdWzAtOV18MlswLTNdKTooWzAtNV1bMC05XSkpJC9pIH0sXG4gICAgJ2VtYWlsJzogeyBlcnJvck1lc3NhZ2U6IGxvY2FsaXplKCdlbWFpbEZvcm1hdFdhcm5pbmcnLCAnU3RyaW5nIGlzIG5vdCBhbiBlLW1haWwgYWRkcmVzcy4nKSwgcGF0dGVybjogL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8gfVxufTtcbnZhciBBU1ROb2RlSW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBU1ROb2RlSW1wbChwYXJlbnQsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChsZW5ndGggPT09IHZvaWQgMCkgeyBsZW5ndGggPSAwOyB9XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBU1ROb2RlSW1wbC5wcm90b3R5cGUsIFwiY2hpbGRyZW5cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEFTVE5vZGVJbXBsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICd0eXBlOiAnICsgdGhpcy50eXBlICsgJyAoJyArIHRoaXMub2Zmc2V0ICsgJy8nICsgdGhpcy5sZW5ndGggKyAnKScgKyAodGhpcy5wYXJlbnQgPyAnIHBhcmVudDogeycgKyB0aGlzLnBhcmVudC50b1N0cmluZygpICsgJ30nIDogJycpO1xuICAgIH07XG4gICAgcmV0dXJuIEFTVE5vZGVJbXBsO1xufSgpKTtcbmV4cG9ydCB7IEFTVE5vZGVJbXBsIH07XG52YXIgTnVsbEFTVE5vZGVJbXBsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhOdWxsQVNUTm9kZUltcGwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTnVsbEFTVE5vZGVJbXBsKHBhcmVudCwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHBhcmVudCwgb2Zmc2V0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50eXBlID0gJ251bGwnO1xuICAgICAgICBfdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE51bGxBU1ROb2RlSW1wbDtcbn0oQVNUTm9kZUltcGwpKTtcbmV4cG9ydCB7IE51bGxBU1ROb2RlSW1wbCB9O1xudmFyIEJvb2xlYW5BU1ROb2RlSW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm9vbGVhbkFTVE5vZGVJbXBsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJvb2xlYW5BU1ROb2RlSW1wbChwYXJlbnQsIGJvb2xWYWx1ZSwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHBhcmVudCwgb2Zmc2V0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50eXBlID0gJ2Jvb2xlYW4nO1xuICAgICAgICBfdGhpcy52YWx1ZSA9IGJvb2xWYWx1ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQm9vbGVhbkFTVE5vZGVJbXBsO1xufShBU1ROb2RlSW1wbCkpO1xuZXhwb3J0IHsgQm9vbGVhbkFTVE5vZGVJbXBsIH07XG52YXIgQXJyYXlBU1ROb2RlSW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXJyYXlBU1ROb2RlSW1wbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBcnJheUFTVE5vZGVJbXBsKHBhcmVudCwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHBhcmVudCwgb2Zmc2V0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50eXBlID0gJ2FycmF5JztcbiAgICAgICAgX3RoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXlBU1ROb2RlSW1wbC5wcm90b3R5cGUsIFwiY2hpbGRyZW5cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIEFycmF5QVNUTm9kZUltcGw7XG59KEFTVE5vZGVJbXBsKSk7XG5leHBvcnQgeyBBcnJheUFTVE5vZGVJbXBsIH07XG52YXIgTnVtYmVyQVNUTm9kZUltcGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE51bWJlckFTVE5vZGVJbXBsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE51bWJlckFTVE5vZGVJbXBsKHBhcmVudCwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHBhcmVudCwgb2Zmc2V0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50eXBlID0gJ251bWJlcic7XG4gICAgICAgIF90aGlzLmlzSW50ZWdlciA9IHRydWU7XG4gICAgICAgIF90aGlzLnZhbHVlID0gTnVtYmVyLk5hTjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTnVtYmVyQVNUTm9kZUltcGw7XG59KEFTVE5vZGVJbXBsKSk7XG5leHBvcnQgeyBOdW1iZXJBU1ROb2RlSW1wbCB9O1xudmFyIFN0cmluZ0FTVE5vZGVJbXBsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdHJpbmdBU1ROb2RlSW1wbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdHJpbmdBU1ROb2RlSW1wbChwYXJlbnQsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHBhcmVudCwgb2Zmc2V0LCBsZW5ndGgpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnR5cGUgPSAnc3RyaW5nJztcbiAgICAgICAgX3RoaXMudmFsdWUgPSAnJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nQVNUTm9kZUltcGw7XG59KEFTVE5vZGVJbXBsKSk7XG5leHBvcnQgeyBTdHJpbmdBU1ROb2RlSW1wbCB9O1xudmFyIFByb3BlcnR5QVNUTm9kZUltcGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFByb3BlcnR5QVNUTm9kZUltcGwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUHJvcGVydHlBU1ROb2RlSW1wbChwYXJlbnQsIG9mZnNldCwga2V5Tm9kZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBwYXJlbnQsIG9mZnNldCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudHlwZSA9ICdwcm9wZXJ0eSc7XG4gICAgICAgIF90aGlzLmNvbG9uT2Zmc2V0ID0gLTE7XG4gICAgICAgIF90aGlzLmtleU5vZGUgPSBrZXlOb2RlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcm9wZXJ0eUFTVE5vZGVJbXBsLnByb3RvdHlwZSwgXCJjaGlsZHJlblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVOb2RlID8gW3RoaXMua2V5Tm9kZSwgdGhpcy52YWx1ZU5vZGVdIDogW3RoaXMua2V5Tm9kZV07XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvcGVydHlBU1ROb2RlSW1wbDtcbn0oQVNUTm9kZUltcGwpKTtcbmV4cG9ydCB7IFByb3BlcnR5QVNUTm9kZUltcGwgfTtcbnZhciBPYmplY3RBU1ROb2RlSW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoT2JqZWN0QVNUTm9kZUltcGwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT2JqZWN0QVNUTm9kZUltcGwocGFyZW50LCBvZmZzZXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcGFyZW50LCBvZmZzZXQpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnR5cGUgPSAnb2JqZWN0JztcbiAgICAgICAgX3RoaXMucHJvcGVydGllcyA9IFtdO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3RBU1ROb2RlSW1wbC5wcm90b3R5cGUsIFwiY2hpbGRyZW5cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gT2JqZWN0QVNUTm9kZUltcGw7XG59KEFTVE5vZGVJbXBsKSk7XG5leHBvcnQgeyBPYmplY3RBU1ROb2RlSW1wbCB9O1xuZXhwb3J0IGZ1bmN0aW9uIGFzU2NoZW1hKHNjaGVtYSkge1xuICAgIGlmIChpc0Jvb2xlYW4oc2NoZW1hKSkge1xuICAgICAgICByZXR1cm4gc2NoZW1hID8ge30gOiB7IFwibm90XCI6IHt9IH07XG4gICAgfVxuICAgIHJldHVybiBzY2hlbWE7XG59XG5leHBvcnQgdmFyIEVudW1NYXRjaDtcbihmdW5jdGlvbiAoRW51bU1hdGNoKSB7XG4gICAgRW51bU1hdGNoW0VudW1NYXRjaFtcIktleVwiXSA9IDBdID0gXCJLZXlcIjtcbiAgICBFbnVtTWF0Y2hbRW51bU1hdGNoW1wiRW51bVwiXSA9IDFdID0gXCJFbnVtXCI7XG59KShFbnVtTWF0Y2ggfHwgKEVudW1NYXRjaCA9IHt9KSk7XG52YXIgU2NoZW1hQ29sbGVjdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjaGVtYUNvbGxlY3Rvcihmb2N1c09mZnNldCwgZXhjbHVkZSkge1xuICAgICAgICBpZiAoZm9jdXNPZmZzZXQgPT09IHZvaWQgMCkgeyBmb2N1c09mZnNldCA9IC0xOyB9XG4gICAgICAgIHRoaXMuZm9jdXNPZmZzZXQgPSBmb2N1c09mZnNldDtcbiAgICAgICAgdGhpcy5leGNsdWRlID0gZXhjbHVkZTtcbiAgICAgICAgdGhpcy5zY2hlbWFzID0gW107XG4gICAgfVxuICAgIFNjaGVtYUNvbGxlY3Rvci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgICB0aGlzLnNjaGVtYXMucHVzaChzY2hlbWEpO1xuICAgIH07XG4gICAgU2NoZW1hQ29sbGVjdG9yLnByb3RvdHlwZS5tZXJnZSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLnNjaGVtYXMsIG90aGVyLnNjaGVtYXMpO1xuICAgIH07XG4gICAgU2NoZW1hQ29sbGVjdG9yLnByb3RvdHlwZS5pbmNsdWRlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmZvY3VzT2Zmc2V0ID09PSAtMSB8fCBjb250YWlucyhub2RlLCB0aGlzLmZvY3VzT2Zmc2V0KSkgJiYgKG5vZGUgIT09IHRoaXMuZXhjbHVkZSk7XG4gICAgfTtcbiAgICBTY2hlbWFDb2xsZWN0b3IucHJvdG90eXBlLm5ld1N1YiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTY2hlbWFDb2xsZWN0b3IoLTEsIHRoaXMuZXhjbHVkZSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2NoZW1hQ29sbGVjdG9yO1xufSgpKTtcbnZhciBOb09wU2NoZW1hQ29sbGVjdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5vT3BTY2hlbWFDb2xsZWN0b3IoKSB7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOb09wU2NoZW1hQ29sbGVjdG9yLnByb3RvdHlwZSwgXCJzY2hlbWFzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE5vT3BTY2hlbWFDb2xsZWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChzY2hlbWEpIHsgfTtcbiAgICBOb09wU2NoZW1hQ29sbGVjdG9yLnByb3RvdHlwZS5tZXJnZSA9IGZ1bmN0aW9uIChvdGhlcikgeyB9O1xuICAgIE5vT3BTY2hlbWFDb2xsZWN0b3IucHJvdG90eXBlLmluY2x1ZGUgPSBmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgICBOb09wU2NoZW1hQ29sbGVjdG9yLnByb3RvdHlwZS5uZXdTdWIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuICAgIE5vT3BTY2hlbWFDb2xsZWN0b3IuaW5zdGFuY2UgPSBuZXcgTm9PcFNjaGVtYUNvbGxlY3RvcigpO1xuICAgIHJldHVybiBOb09wU2NoZW1hQ29sbGVjdG9yO1xufSgpKTtcbnZhciBWYWxpZGF0aW9uUmVzdWx0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFZhbGlkYXRpb25SZXN1bHQoKSB7XG4gICAgICAgIHRoaXMucHJvYmxlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzTWF0Y2hlcyA9IDA7XG4gICAgICAgIHRoaXMucHJvcGVydGllc1ZhbHVlTWF0Y2hlcyA9IDA7XG4gICAgICAgIHRoaXMucHJpbWFyeVZhbHVlTWF0Y2hlcyA9IDA7XG4gICAgICAgIHRoaXMuZW51bVZhbHVlTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbnVtVmFsdWVzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBWYWxpZGF0aW9uUmVzdWx0LnByb3RvdHlwZS5oYXNQcm9ibGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5wcm9ibGVtcy5sZW5ndGg7XG4gICAgfTtcbiAgICBWYWxpZGF0aW9uUmVzdWx0LnByb3RvdHlwZS5tZXJnZUFsbCA9IGZ1bmN0aW9uICh2YWxpZGF0aW9uUmVzdWx0cykge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHZhbGlkYXRpb25SZXN1bHRzXzEgPSB2YWxpZGF0aW9uUmVzdWx0czsgX2kgPCB2YWxpZGF0aW9uUmVzdWx0c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIHZhbGlkYXRpb25SZXN1bHQgPSB2YWxpZGF0aW9uUmVzdWx0c18xW19pXTtcbiAgICAgICAgICAgIHRoaXMubWVyZ2UodmFsaWRhdGlvblJlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFZhbGlkYXRpb25SZXN1bHQucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24gKHZhbGlkYXRpb25SZXN1bHQpIHtcbiAgICAgICAgdGhpcy5wcm9ibGVtcyA9IHRoaXMucHJvYmxlbXMuY29uY2F0KHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMpO1xuICAgIH07XG4gICAgVmFsaWRhdGlvblJlc3VsdC5wcm90b3R5cGUubWVyZ2VFbnVtVmFsdWVzID0gZnVuY3Rpb24gKHZhbGlkYXRpb25SZXN1bHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVudW1WYWx1ZU1hdGNoICYmICF2YWxpZGF0aW9uUmVzdWx0LmVudW1WYWx1ZU1hdGNoICYmIHRoaXMuZW51bVZhbHVlcyAmJiB2YWxpZGF0aW9uUmVzdWx0LmVudW1WYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZW51bVZhbHVlcyA9IHRoaXMuZW51bVZhbHVlcy5jb25jYXQodmFsaWRhdGlvblJlc3VsdC5lbnVtVmFsdWVzKTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnByb2JsZW1zOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gRXJyb3JDb2RlLkVudW1WYWx1ZU1pc21hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBsb2NhbGl6ZSgnZW51bVdhcm5pbmcnLCAnVmFsdWUgaXMgbm90IGFjY2VwdGVkLiBWYWxpZCB2YWx1ZXM6IHswfS4nLCB0aGlzLmVudW1WYWx1ZXMubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTsgfSkuam9pbignLCAnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBWYWxpZGF0aW9uUmVzdWx0LnByb3RvdHlwZS5tZXJnZVByb3BlcnR5TWF0Y2ggPSBmdW5jdGlvbiAocHJvcGVydHlWYWxpZGF0aW9uUmVzdWx0KSB7XG4gICAgICAgIHRoaXMubWVyZ2UocHJvcGVydHlWYWxpZGF0aW9uUmVzdWx0KTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzTWF0Y2hlcysrO1xuICAgICAgICBpZiAocHJvcGVydHlWYWxpZGF0aW9uUmVzdWx0LmVudW1WYWx1ZU1hdGNoIHx8ICFwcm9wZXJ0eVZhbGlkYXRpb25SZXN1bHQuaGFzUHJvYmxlbXMoKSAmJiBwcm9wZXJ0eVZhbGlkYXRpb25SZXN1bHQucHJvcGVydGllc01hdGNoZXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllc1ZhbHVlTWF0Y2hlcysrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wZXJ0eVZhbGlkYXRpb25SZXN1bHQuZW51bVZhbHVlTWF0Y2ggJiYgcHJvcGVydHlWYWxpZGF0aW9uUmVzdWx0LmVudW1WYWx1ZXMgJiYgcHJvcGVydHlWYWxpZGF0aW9uUmVzdWx0LmVudW1WYWx1ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnByaW1hcnlWYWx1ZU1hdGNoZXMrKztcbiAgICAgICAgfVxuICAgIH07XG4gICAgVmFsaWRhdGlvblJlc3VsdC5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICB2YXIgaGFzUHJvYmxlbXMgPSB0aGlzLmhhc1Byb2JsZW1zKCk7XG4gICAgICAgIGlmIChoYXNQcm9ibGVtcyAhPT0gb3RoZXIuaGFzUHJvYmxlbXMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhc1Byb2JsZW1zID8gLTEgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVudW1WYWx1ZU1hdGNoICE9PSBvdGhlci5lbnVtVmFsdWVNYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG90aGVyLmVudW1WYWx1ZU1hdGNoID8gLTEgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByaW1hcnlWYWx1ZU1hdGNoZXMgIT09IG90aGVyLnByaW1hcnlWYWx1ZU1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByaW1hcnlWYWx1ZU1hdGNoZXMgLSBvdGhlci5wcmltYXJ5VmFsdWVNYXRjaGVzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXNWYWx1ZU1hdGNoZXMgIT09IG90aGVyLnByb3BlcnRpZXNWYWx1ZU1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXNWYWx1ZU1hdGNoZXMgLSBvdGhlci5wcm9wZXJ0aWVzVmFsdWVNYXRjaGVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXNNYXRjaGVzIC0gb3RoZXIucHJvcGVydGllc01hdGNoZXM7XG4gICAgfTtcbiAgICByZXR1cm4gVmFsaWRhdGlvblJlc3VsdDtcbn0oKSk7XG5leHBvcnQgeyBWYWxpZGF0aW9uUmVzdWx0IH07XG5leHBvcnQgZnVuY3Rpb24gbmV3SlNPTkRvY3VtZW50KHJvb3QsIGRpYWdub3N0aWNzKSB7XG4gICAgaWYgKGRpYWdub3N0aWNzID09PSB2b2lkIDApIHsgZGlhZ25vc3RpY3MgPSBbXTsgfVxuICAgIHJldHVybiBuZXcgSlNPTkRvY3VtZW50KHJvb3QsIGRpYWdub3N0aWNzLCBbXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZVZhbHVlKG5vZGUpIHtcbiAgICByZXR1cm4gSnNvbi5nZXROb2RlVmFsdWUobm9kZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZVBhdGgobm9kZSkge1xuICAgIHJldHVybiBKc29uLmdldE5vZGVQYXRoKG5vZGUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zKG5vZGUsIG9mZnNldCwgaW5jbHVkZVJpZ2h0Qm91bmQpIHtcbiAgICBpZiAoaW5jbHVkZVJpZ2h0Qm91bmQgPT09IHZvaWQgMCkgeyBpbmNsdWRlUmlnaHRCb3VuZCA9IGZhbHNlOyB9XG4gICAgcmV0dXJuIG9mZnNldCA+PSBub2RlLm9mZnNldCAmJiBvZmZzZXQgPCAobm9kZS5vZmZzZXQgKyBub2RlLmxlbmd0aCkgfHwgaW5jbHVkZVJpZ2h0Qm91bmQgJiYgb2Zmc2V0ID09PSAobm9kZS5vZmZzZXQgKyBub2RlLmxlbmd0aCk7XG59XG52YXIgSlNPTkRvY3VtZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEpTT05Eb2N1bWVudChyb290LCBzeW50YXhFcnJvcnMsIGNvbW1lbnRzKSB7XG4gICAgICAgIGlmIChzeW50YXhFcnJvcnMgPT09IHZvaWQgMCkgeyBzeW50YXhFcnJvcnMgPSBbXTsgfVxuICAgICAgICBpZiAoY29tbWVudHMgPT09IHZvaWQgMCkgeyBjb21tZW50cyA9IFtdOyB9XG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgIHRoaXMuc3ludGF4RXJyb3JzID0gc3ludGF4RXJyb3JzO1xuICAgICAgICB0aGlzLmNvbW1lbnRzID0gY29tbWVudHM7XG4gICAgfVxuICAgIEpTT05Eb2N1bWVudC5wcm90b3R5cGUuZ2V0Tm9kZUZyb21PZmZzZXQgPSBmdW5jdGlvbiAob2Zmc2V0LCBpbmNsdWRlUmlnaHRCb3VuZCkge1xuICAgICAgICBpZiAoaW5jbHVkZVJpZ2h0Qm91bmQgPT09IHZvaWQgMCkgeyBpbmNsdWRlUmlnaHRCb3VuZCA9IGZhbHNlOyB9XG4gICAgICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgICAgICAgIHJldHVybiBKc29uLmZpbmROb2RlQXRPZmZzZXQodGhpcy5yb290LCBvZmZzZXQsIGluY2x1ZGVSaWdodEJvdW5kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgSlNPTkRvY3VtZW50LnByb3RvdHlwZS52aXNpdCA9IGZ1bmN0aW9uICh2aXNpdG9yKSB7XG4gICAgICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgICAgICAgIHZhciBkb1Zpc2l0XzEgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBjdG4gPSB2aXNpdG9yKG5vZGUpO1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoICYmIGN0bjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdG4gPSBkb1Zpc2l0XzEoY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjdG47XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZG9WaXNpdF8xKHRoaXMucm9vdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEpTT05Eb2N1bWVudC5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiAodGV4dERvY3VtZW50LCBzY2hlbWEsIHNldmVyaXR5KSB7XG4gICAgICAgIGlmIChzZXZlcml0eSA9PT0gdm9pZCAwKSB7IHNldmVyaXR5ID0gRGlhZ25vc3RpY1NldmVyaXR5Lldhcm5pbmc7IH1cbiAgICAgICAgaWYgKHRoaXMucm9vdCAmJiBzY2hlbWEpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZGF0aW9uUmVzdWx0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHQoKTtcbiAgICAgICAgICAgIHZhbGlkYXRlKHRoaXMucm9vdCwgc2NoZW1hLCB2YWxpZGF0aW9uUmVzdWx0LCBOb09wU2NoZW1hQ29sbGVjdG9yLmluc3RhbmNlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0aW9uUmVzdWx0LnByb2JsZW1zLm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBSYW5nZS5jcmVhdGUodGV4dERvY3VtZW50LnBvc2l0aW9uQXQocC5sb2NhdGlvbi5vZmZzZXQpLCB0ZXh0RG9jdW1lbnQucG9zaXRpb25BdChwLmxvY2F0aW9uLm9mZnNldCArIHAubG9jYXRpb24ubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERpYWdub3N0aWMuY3JlYXRlKHJhbmdlLCBwLm1lc3NhZ2UsIChfYSA9IHAuc2V2ZXJpdHkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHNldmVyaXR5LCBwLmNvZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIEpTT05Eb2N1bWVudC5wcm90b3R5cGUuZ2V0TWF0Y2hpbmdTY2hlbWFzID0gZnVuY3Rpb24gKHNjaGVtYSwgZm9jdXNPZmZzZXQsIGV4Y2x1ZGUpIHtcbiAgICAgICAgaWYgKGZvY3VzT2Zmc2V0ID09PSB2b2lkIDApIHsgZm9jdXNPZmZzZXQgPSAtMTsgfVxuICAgICAgICB2YXIgbWF0Y2hpbmdTY2hlbWFzID0gbmV3IFNjaGVtYUNvbGxlY3Rvcihmb2N1c09mZnNldCwgZXhjbHVkZSk7XG4gICAgICAgIGlmICh0aGlzLnJvb3QgJiYgc2NoZW1hKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZSh0aGlzLnJvb3QsIHNjaGVtYSwgbmV3IFZhbGlkYXRpb25SZXN1bHQoKSwgbWF0Y2hpbmdTY2hlbWFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2hpbmdTY2hlbWFzLnNjaGVtYXM7XG4gICAgfTtcbiAgICByZXR1cm4gSlNPTkRvY3VtZW50O1xufSgpKTtcbmV4cG9ydCB7IEpTT05Eb2N1bWVudCB9O1xuZnVuY3Rpb24gdmFsaWRhdGUobiwgc2NoZW1hLCB2YWxpZGF0aW9uUmVzdWx0LCBtYXRjaGluZ1NjaGVtYXMpIHtcbiAgICBpZiAoIW4gfHwgIW1hdGNoaW5nU2NoZW1hcy5pbmNsdWRlKG4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG5vZGUgPSBuO1xuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICBfdmFsaWRhdGVPYmplY3ROb2RlKG5vZGUsIHNjaGVtYSwgdmFsaWRhdGlvblJlc3VsdCwgbWF0Y2hpbmdTY2hlbWFzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICBfdmFsaWRhdGVBcnJheU5vZGUobm9kZSwgc2NoZW1hLCB2YWxpZGF0aW9uUmVzdWx0LCBtYXRjaGluZ1NjaGVtYXMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICBfdmFsaWRhdGVTdHJpbmdOb2RlKG5vZGUsIHNjaGVtYSwgdmFsaWRhdGlvblJlc3VsdCwgbWF0Y2hpbmdTY2hlbWFzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgX3ZhbGlkYXRlTnVtYmVyTm9kZShub2RlLCBzY2hlbWEsIHZhbGlkYXRpb25SZXN1bHQsIG1hdGNoaW5nU2NoZW1hcyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHJvcGVydHknOlxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRlKG5vZGUudmFsdWVOb2RlLCBzY2hlbWEsIHZhbGlkYXRpb25SZXN1bHQsIG1hdGNoaW5nU2NoZW1hcyk7XG4gICAgfVxuICAgIF92YWxpZGF0ZU5vZGUoKTtcbiAgICBtYXRjaGluZ1NjaGVtYXMuYWRkKHsgbm9kZTogbm9kZSwgc2NoZW1hOiBzY2hlbWEgfSk7XG4gICAgZnVuY3Rpb24gX3ZhbGlkYXRlTm9kZSgpIHtcbiAgICAgICAgZnVuY3Rpb24gbWF0Y2hlc1R5cGUodHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUudHlwZSA9PT0gdHlwZSB8fCAodHlwZSA9PT0gJ2ludGVnZXInICYmIG5vZGUudHlwZSA9PT0gJ251bWJlcicgJiYgbm9kZS5pc0ludGVnZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS50eXBlKSkge1xuICAgICAgICAgICAgaWYgKCFzY2hlbWEudHlwZS5zb21lKG1hdGNoZXNUeXBlKSkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7IG9mZnNldDogbm9kZS5vZmZzZXQsIGxlbmd0aDogbm9kZS5sZW5ndGggfSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogc2NoZW1hLmVycm9yTWVzc2FnZSB8fCBsb2NhbGl6ZSgndHlwZUFycmF5TWlzbWF0Y2hXYXJuaW5nJywgJ0luY29ycmVjdCB0eXBlLiBFeHBlY3RlZCBvbmUgb2YgezB9LicsIHNjaGVtYS50eXBlLmpvaW4oJywgJykpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2NoZW1hLnR5cGUpIHtcbiAgICAgICAgICAgIGlmICghbWF0Y2hlc1R5cGUoc2NoZW1hLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBub2RlLm9mZnNldCwgbGVuZ3RoOiBub2RlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBzY2hlbWEuZXJyb3JNZXNzYWdlIHx8IGxvY2FsaXplKCd0eXBlTWlzbWF0Y2hXYXJuaW5nJywgJ0luY29ycmVjdCB0eXBlLiBFeHBlY3RlZCBcInswfVwiLicsIHNjaGVtYS50eXBlKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5hbGxPZikpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBzY2hlbWEuYWxsT2Y7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YlNjaGVtYVJlZiA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZShub2RlLCBhc1NjaGVtYShzdWJTY2hlbWFSZWYpLCB2YWxpZGF0aW9uUmVzdWx0LCBtYXRjaGluZ1NjaGVtYXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBub3RTY2hlbWEgPSBhc1NjaGVtYShzY2hlbWEubm90KTtcbiAgICAgICAgaWYgKG5vdFNjaGVtYSkge1xuICAgICAgICAgICAgdmFyIHN1YlZhbGlkYXRpb25SZXN1bHQgPSBuZXcgVmFsaWRhdGlvblJlc3VsdCgpO1xuICAgICAgICAgICAgdmFyIHN1Yk1hdGNoaW5nU2NoZW1hcyA9IG1hdGNoaW5nU2NoZW1hcy5uZXdTdWIoKTtcbiAgICAgICAgICAgIHZhbGlkYXRlKG5vZGUsIG5vdFNjaGVtYSwgc3ViVmFsaWRhdGlvblJlc3VsdCwgc3ViTWF0Y2hpbmdTY2hlbWFzKTtcbiAgICAgICAgICAgIGlmICghc3ViVmFsaWRhdGlvblJlc3VsdC5oYXNQcm9ibGVtcygpKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBub2RlLm9mZnNldCwgbGVuZ3RoOiBub2RlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBsb2NhbGl6ZSgnbm90U2NoZW1hV2FybmluZycsIFwiTWF0Y2hlcyBhIHNjaGVtYSB0aGF0IGlzIG5vdCBhbGxvd2VkLlwiKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IHN1Yk1hdGNoaW5nU2NoZW1hcy5zY2hlbWFzOyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgIHZhciBtcyA9IF9jW19iXTtcbiAgICAgICAgICAgICAgICBtcy5pbnZlcnRlZCA9ICFtcy5pbnZlcnRlZDtcbiAgICAgICAgICAgICAgICBtYXRjaGluZ1NjaGVtYXMuYWRkKG1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgdGVzdEFsdGVybmF0aXZlcyA9IGZ1bmN0aW9uIChhbHRlcm5hdGl2ZXMsIG1heE9uZU1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgLy8gcmVtZW1iZXIgdGhlIGJlc3QgbWF0Y2ggdGhhdCBpcyB1c2VkIGZvciBlcnJvciBtZXNzYWdlc1xuICAgICAgICAgICAgdmFyIGJlc3RNYXRjaCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgYWx0ZXJuYXRpdmVzXzEgPSBhbHRlcm5hdGl2ZXM7IF9pIDwgYWx0ZXJuYXRpdmVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YlNjaGVtYVJlZiA9IGFsdGVybmF0aXZlc18xW19pXTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViU2NoZW1hID0gYXNTY2hlbWEoc3ViU2NoZW1hUmVmKTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViVmFsaWRhdGlvblJlc3VsdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgdmFyIHN1Yk1hdGNoaW5nU2NoZW1hcyA9IG1hdGNoaW5nU2NoZW1hcy5uZXdTdWIoKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZShub2RlLCBzdWJTY2hlbWEsIHN1YlZhbGlkYXRpb25SZXN1bHQsIHN1Yk1hdGNoaW5nU2NoZW1hcyk7XG4gICAgICAgICAgICAgICAgaWYgKCFzdWJWYWxpZGF0aW9uUmVzdWx0Lmhhc1Byb2JsZW1zKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKHN1YlNjaGVtYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghYmVzdE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaCA9IHsgc2NoZW1hOiBzdWJTY2hlbWEsIHZhbGlkYXRpb25SZXN1bHQ6IHN1YlZhbGlkYXRpb25SZXN1bHQsIG1hdGNoaW5nU2NoZW1hczogc3ViTWF0Y2hpbmdTY2hlbWFzIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1heE9uZU1hdGNoICYmICFzdWJWYWxpZGF0aW9uUmVzdWx0Lmhhc1Byb2JsZW1zKCkgJiYgIWJlc3RNYXRjaC52YWxpZGF0aW9uUmVzdWx0Lmhhc1Byb2JsZW1zKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vIGVycm9ycywgYm90aCBhcmUgZXF1YWxseSBnb29kIG1hdGNoZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC5tYXRjaGluZ1NjaGVtYXMubWVyZ2Uoc3ViTWF0Y2hpbmdTY2hlbWFzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaC52YWxpZGF0aW9uUmVzdWx0LnByb3BlcnRpZXNNYXRjaGVzICs9IHN1YlZhbGlkYXRpb25SZXN1bHQucHJvcGVydGllc01hdGNoZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2gudmFsaWRhdGlvblJlc3VsdC5wcm9wZXJ0aWVzVmFsdWVNYXRjaGVzICs9IHN1YlZhbGlkYXRpb25SZXN1bHQucHJvcGVydGllc1ZhbHVlTWF0Y2hlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wYXJlUmVzdWx0ID0gc3ViVmFsaWRhdGlvblJlc3VsdC5jb21wYXJlKGJlc3RNYXRjaC52YWxpZGF0aW9uUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlUmVzdWx0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG91ciBub2RlIGlzIHRoZSBiZXN0IG1hdGNoaW5nIHNvIGZhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNYXRjaCA9IHsgc2NoZW1hOiBzdWJTY2hlbWEsIHZhbGlkYXRpb25SZXN1bHQ6IHN1YlZhbGlkYXRpb25SZXN1bHQsIG1hdGNoaW5nU2NoZW1hczogc3ViTWF0Y2hpbmdTY2hlbWFzIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb21wYXJlUmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlcmUncyBhbHJlYWR5IGEgYmVzdCBtYXRjaGluZyBidXQgd2UgYXJlIGFzIGdvb2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2gubWF0Y2hpbmdTY2hlbWFzLm1lcmdlKHN1Yk1hdGNoaW5nU2NoZW1hcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoLnZhbGlkYXRpb25SZXN1bHQubWVyZ2VFbnVtVmFsdWVzKHN1YlZhbGlkYXRpb25SZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID4gMSAmJiBtYXhPbmVNYXRjaCkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7IG9mZnNldDogbm9kZS5vZmZzZXQsIGxlbmd0aDogMSB9LFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBsb2NhbGl6ZSgnb25lT2ZXYXJuaW5nJywgXCJNYXRjaGVzIG11bHRpcGxlIHNjaGVtYXMgd2hlbiBvbmx5IG9uZSBtdXN0IHZhbGlkYXRlLlwiKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJlc3RNYXRjaCkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQubWVyZ2UoYmVzdE1hdGNoLnZhbGlkYXRpb25SZXN1bHQpO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvcGVydGllc01hdGNoZXMgKz0gYmVzdE1hdGNoLnZhbGlkYXRpb25SZXN1bHQucHJvcGVydGllc01hdGNoZXM7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9wZXJ0aWVzVmFsdWVNYXRjaGVzICs9IGJlc3RNYXRjaC52YWxpZGF0aW9uUmVzdWx0LnByb3BlcnRpZXNWYWx1ZU1hdGNoZXM7XG4gICAgICAgICAgICAgICAgbWF0Y2hpbmdTY2hlbWFzLm1lcmdlKGJlc3RNYXRjaC5tYXRjaGluZ1NjaGVtYXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuYW55T2YpKSB7XG4gICAgICAgICAgICB0ZXN0QWx0ZXJuYXRpdmVzKHNjaGVtYS5hbnlPZiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5vbmVPZikpIHtcbiAgICAgICAgICAgIHRlc3RBbHRlcm5hdGl2ZXMoc2NoZW1hLm9uZU9mLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGVzdEJyYW5jaCA9IGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgICAgICAgIHZhciBzdWJWYWxpZGF0aW9uUmVzdWx0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHQoKTtcbiAgICAgICAgICAgIHZhciBzdWJNYXRjaGluZ1NjaGVtYXMgPSBtYXRjaGluZ1NjaGVtYXMubmV3U3ViKCk7XG4gICAgICAgICAgICB2YWxpZGF0ZShub2RlLCBhc1NjaGVtYShzY2hlbWEpLCBzdWJWYWxpZGF0aW9uUmVzdWx0LCBzdWJNYXRjaGluZ1NjaGVtYXMpO1xuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5tZXJnZShzdWJWYWxpZGF0aW9uUmVzdWx0KTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvcGVydGllc01hdGNoZXMgKz0gc3ViVmFsaWRhdGlvblJlc3VsdC5wcm9wZXJ0aWVzTWF0Y2hlcztcbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvcGVydGllc1ZhbHVlTWF0Y2hlcyArPSBzdWJWYWxpZGF0aW9uUmVzdWx0LnByb3BlcnRpZXNWYWx1ZU1hdGNoZXM7XG4gICAgICAgICAgICBtYXRjaGluZ1NjaGVtYXMubWVyZ2Uoc3ViTWF0Y2hpbmdTY2hlbWFzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRlc3RDb25kaXRpb24gPSBmdW5jdGlvbiAoaWZTY2hlbWEsIHRoZW5TY2hlbWEsIGVsc2VTY2hlbWEpIHtcbiAgICAgICAgICAgIHZhciBzdWJTY2hlbWEgPSBhc1NjaGVtYShpZlNjaGVtYSk7XG4gICAgICAgICAgICB2YXIgc3ViVmFsaWRhdGlvblJlc3VsdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0KCk7XG4gICAgICAgICAgICB2YXIgc3ViTWF0Y2hpbmdTY2hlbWFzID0gbWF0Y2hpbmdTY2hlbWFzLm5ld1N1YigpO1xuICAgICAgICAgICAgdmFsaWRhdGUobm9kZSwgc3ViU2NoZW1hLCBzdWJWYWxpZGF0aW9uUmVzdWx0LCBzdWJNYXRjaGluZ1NjaGVtYXMpO1xuICAgICAgICAgICAgbWF0Y2hpbmdTY2hlbWFzLm1lcmdlKHN1Yk1hdGNoaW5nU2NoZW1hcyk7XG4gICAgICAgICAgICBpZiAoIXN1YlZhbGlkYXRpb25SZXN1bHQuaGFzUHJvYmxlbXMoKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGVuU2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3RCcmFuY2godGhlblNjaGVtYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWxzZVNjaGVtYSkge1xuICAgICAgICAgICAgICAgIHRlc3RCcmFuY2goZWxzZVNjaGVtYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBpZlNjaGVtYSA9IGFzU2NoZW1hKHNjaGVtYS5pZik7XG4gICAgICAgIGlmIChpZlNjaGVtYSkge1xuICAgICAgICAgICAgdGVzdENvbmRpdGlvbihpZlNjaGVtYSwgYXNTY2hlbWEoc2NoZW1hLnRoZW4pLCBhc1NjaGVtYShzY2hlbWEuZWxzZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IGdldE5vZGVWYWx1ZShub2RlKTtcbiAgICAgICAgICAgIHZhciBlbnVtVmFsdWVNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yICh2YXIgX2QgPSAwLCBfZSA9IHNjaGVtYS5lbnVtOyBfZCA8IF9lLmxlbmd0aDsgX2QrKykge1xuICAgICAgICAgICAgICAgIHZhciBlID0gX2VbX2RdO1xuICAgICAgICAgICAgICAgIGlmIChlcXVhbHModmFsLCBlKSkge1xuICAgICAgICAgICAgICAgICAgICBlbnVtVmFsdWVNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQuZW51bVZhbHVlcyA9IHNjaGVtYS5lbnVtO1xuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5lbnVtVmFsdWVNYXRjaCA9IGVudW1WYWx1ZU1hdGNoO1xuICAgICAgICAgICAgaWYgKCFlbnVtVmFsdWVNYXRjaCkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7IG9mZnNldDogbm9kZS5vZmZzZXQsIGxlbmd0aDogbm9kZS5sZW5ndGggfSxcbiAgICAgICAgICAgICAgICAgICAgY29kZTogRXJyb3JDb2RlLkVudW1WYWx1ZU1pc21hdGNoLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBzY2hlbWEuZXJyb3JNZXNzYWdlIHx8IGxvY2FsaXplKCdlbnVtV2FybmluZycsICdWYWx1ZSBpcyBub3QgYWNjZXB0ZWQuIFZhbGlkIHZhbHVlczogezB9LicsIHNjaGVtYS5lbnVtLm1hcChmdW5jdGlvbiAodikgeyByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7IH0pLmpvaW4oJywgJykpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGVmaW5lZChzY2hlbWEuY29uc3QpKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gZ2V0Tm9kZVZhbHVlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKCFlcXVhbHModmFsLCBzY2hlbWEuY29uc3QpKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBub2RlLm9mZnNldCwgbGVuZ3RoOiBub2RlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgICAgICBjb2RlOiBFcnJvckNvZGUuRW51bVZhbHVlTWlzbWF0Y2gsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHNjaGVtYS5lcnJvck1lc3NhZ2UgfHwgbG9jYWxpemUoJ2NvbnN0V2FybmluZycsICdWYWx1ZSBtdXN0IGJlIHswfS4nLCBKU09OLnN0cmluZ2lmeShzY2hlbWEuY29uc3QpKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQuZW51bVZhbHVlTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQuZW51bVZhbHVlTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5lbnVtVmFsdWVzID0gW3NjaGVtYS5jb25zdF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5kZXByZWNhdGlvbk1lc3NhZ2UgJiYgbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBub2RlLnBhcmVudC5vZmZzZXQsIGxlbmd0aDogbm9kZS5wYXJlbnQubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgc2V2ZXJpdHk6IERpYWdub3N0aWNTZXZlcml0eS5XYXJuaW5nLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHNjaGVtYS5kZXByZWNhdGlvbk1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgY29kZTogRXJyb3JDb2RlLkRlcHJlY2F0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIF92YWxpZGF0ZU51bWJlck5vZGUobm9kZSwgc2NoZW1hLCB2YWxpZGF0aW9uUmVzdWx0LCBtYXRjaGluZ1NjaGVtYXMpIHtcbiAgICAgICAgdmFyIHZhbCA9IG5vZGUudmFsdWU7XG4gICAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUZsb2F0cyhmbG9hdCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gL14oLT9cXGQrKSg/OlxcLihcXGQrKSk/KD86ZShbLStdXFxkKykpPyQvLmV4ZWMoZmxvYXQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICByZXR1cm4gcGFydHMgJiYge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBOdW1iZXIocGFydHNbMV0gKyAocGFydHNbMl0gfHwgJycpKSxcbiAgICAgICAgICAgICAgICBtdWx0aXBsaWVyOiAoKChfYSA9IHBhcnRzWzJdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB8fCAwKSAtIChwYXJzZUludChwYXJ0c1szXSkgfHwgMClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICBpZiAoaXNOdW1iZXIoc2NoZW1hLm11bHRpcGxlT2YpKSB7XG4gICAgICAgICAgICB2YXIgcmVtYWluZGVyID0gLTE7XG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihzY2hlbWEubXVsdGlwbGVPZikpIHtcbiAgICAgICAgICAgICAgICByZW1haW5kZXIgPSB2YWwgJSBzY2hlbWEubXVsdGlwbGVPZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBub3JtTXVsdGlwbGVPZiA9IG5vcm1hbGl6ZUZsb2F0cyhzY2hlbWEubXVsdGlwbGVPZik7XG4gICAgICAgICAgICAgICAgdmFyIG5vcm1WYWx1ZSA9IG5vcm1hbGl6ZUZsb2F0cyh2YWwpO1xuICAgICAgICAgICAgICAgIGlmIChub3JtTXVsdGlwbGVPZiAmJiBub3JtVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgTWF0aC5hYnMobm9ybVZhbHVlLm11bHRpcGxpZXIgLSBub3JtTXVsdGlwbGVPZi5tdWx0aXBsaWVyKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3JtVmFsdWUubXVsdGlwbGllciA8IG5vcm1NdWx0aXBsZU9mLm11bHRpcGxpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1WYWx1ZS52YWx1ZSAqPSBtdWx0aXBsaWVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybU11bHRpcGxlT2YudmFsdWUgKj0gbXVsdGlwbGllcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZW1haW5kZXIgPSBub3JtVmFsdWUudmFsdWUgJSBub3JtTXVsdGlwbGVPZi52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVtYWluZGVyICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBub2RlLm9mZnNldCwgbGVuZ3RoOiBub2RlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBsb2NhbGl6ZSgnbXVsdGlwbGVPZldhcm5pbmcnLCAnVmFsdWUgaXMgbm90IGRpdmlzaWJsZSBieSB7MH0uJywgc2NoZW1hLm11bHRpcGxlT2YpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0RXhjbHVzaXZlTGltaXQobGltaXQsIGV4Y2x1c2l2ZSkge1xuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGV4Y2x1c2l2ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhjbHVzaXZlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQm9vbGVhbihleGNsdXNpdmUpICYmIGV4Y2x1c2l2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaW1pdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0TGltaXQobGltaXQsIGV4Y2x1c2l2ZSkge1xuICAgICAgICAgICAgaWYgKCFpc0Jvb2xlYW4oZXhjbHVzaXZlKSB8fCAhZXhjbHVzaXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbWl0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXhjbHVzaXZlTWluaW11bSA9IGdldEV4Y2x1c2l2ZUxpbWl0KHNjaGVtYS5taW5pbXVtLCBzY2hlbWEuZXhjbHVzaXZlTWluaW11bSk7XG4gICAgICAgIGlmIChpc051bWJlcihleGNsdXNpdmVNaW5pbXVtKSAmJiB2YWwgPD0gZXhjbHVzaXZlTWluaW11bSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogeyBvZmZzZXQ6IG5vZGUub2Zmc2V0LCBsZW5ndGg6IG5vZGUubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbG9jYWxpemUoJ2V4Y2x1c2l2ZU1pbmltdW1XYXJuaW5nJywgJ1ZhbHVlIGlzIGJlbG93IHRoZSBleGNsdXNpdmUgbWluaW11bSBvZiB7MH0uJywgZXhjbHVzaXZlTWluaW11bSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBleGNsdXNpdmVNYXhpbXVtID0gZ2V0RXhjbHVzaXZlTGltaXQoc2NoZW1hLm1heGltdW0sIHNjaGVtYS5leGNsdXNpdmVNYXhpbXVtKTtcbiAgICAgICAgaWYgKGlzTnVtYmVyKGV4Y2x1c2l2ZU1heGltdW0pICYmIHZhbCA+PSBleGNsdXNpdmVNYXhpbXVtKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0LnByb2JsZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7IG9mZnNldDogbm9kZS5vZmZzZXQsIGxlbmd0aDogbm9kZS5sZW5ndGggfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBsb2NhbGl6ZSgnZXhjbHVzaXZlTWF4aW11bVdhcm5pbmcnLCAnVmFsdWUgaXMgYWJvdmUgdGhlIGV4Y2x1c2l2ZSBtYXhpbXVtIG9mIHswfS4nLCBleGNsdXNpdmVNYXhpbXVtKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1pbmltdW0gPSBnZXRMaW1pdChzY2hlbWEubWluaW11bSwgc2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0pO1xuICAgICAgICBpZiAoaXNOdW1iZXIobWluaW11bSkgJiYgdmFsIDwgbWluaW11bSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogeyBvZmZzZXQ6IG5vZGUub2Zmc2V0LCBsZW5ndGg6IG5vZGUubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbG9jYWxpemUoJ21pbmltdW1XYXJuaW5nJywgJ1ZhbHVlIGlzIGJlbG93IHRoZSBtaW5pbXVtIG9mIHswfS4nLCBtaW5pbXVtKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1heGltdW0gPSBnZXRMaW1pdChzY2hlbWEubWF4aW11bSwgc2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0pO1xuICAgICAgICBpZiAoaXNOdW1iZXIobWF4aW11bSkgJiYgdmFsID4gbWF4aW11bSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogeyBvZmZzZXQ6IG5vZGUub2Zmc2V0LCBsZW5ndGg6IG5vZGUubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbG9jYWxpemUoJ21heGltdW1XYXJuaW5nJywgJ1ZhbHVlIGlzIGFib3ZlIHRoZSBtYXhpbXVtIG9mIHswfS4nLCBtYXhpbXVtKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gX3ZhbGlkYXRlU3RyaW5nTm9kZShub2RlLCBzY2hlbWEsIHZhbGlkYXRpb25SZXN1bHQsIG1hdGNoaW5nU2NoZW1hcykge1xuICAgICAgICBpZiAoaXNOdW1iZXIoc2NoZW1hLm1pbkxlbmd0aCkgJiYgbm9kZS52YWx1ZS5sZW5ndGggPCBzY2hlbWEubWluTGVuZ3RoKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0LnByb2JsZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7IG9mZnNldDogbm9kZS5vZmZzZXQsIGxlbmd0aDogbm9kZS5sZW5ndGggfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBsb2NhbGl6ZSgnbWluTGVuZ3RoV2FybmluZycsICdTdHJpbmcgaXMgc2hvcnRlciB0aGFuIHRoZSBtaW5pbXVtIGxlbmd0aCBvZiB7MH0uJywgc2NoZW1hLm1pbkxlbmd0aClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc051bWJlcihzY2hlbWEubWF4TGVuZ3RoKSAmJiBub2RlLnZhbHVlLmxlbmd0aCA+IHNjaGVtYS5tYXhMZW5ndGgpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBub2RlLm9mZnNldCwgbGVuZ3RoOiBub2RlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGxvY2FsaXplKCdtYXhMZW5ndGhXYXJuaW5nJywgJ1N0cmluZyBpcyBsb25nZXIgdGhhbiB0aGUgbWF4aW11bSBsZW5ndGggb2YgezB9LicsIHNjaGVtYS5tYXhMZW5ndGgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTdHJpbmcoc2NoZW1hLnBhdHRlcm4pKSB7XG4gICAgICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHNjaGVtYS5wYXR0ZXJuKTtcbiAgICAgICAgICAgIGlmICghcmVnZXgudGVzdChub2RlLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7IG9mZnNldDogbm9kZS5vZmZzZXQsIGxlbmd0aDogbm9kZS5sZW5ndGggfSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogc2NoZW1hLnBhdHRlcm5FcnJvck1lc3NhZ2UgfHwgc2NoZW1hLmVycm9yTWVzc2FnZSB8fCBsb2NhbGl6ZSgncGF0dGVybldhcm5pbmcnLCAnU3RyaW5nIGRvZXMgbm90IG1hdGNoIHRoZSBwYXR0ZXJuIG9mIFwiezB9XCIuJywgc2NoZW1hLnBhdHRlcm4pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5mb3JtYXQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2NoZW1hLmZvcm1hdCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VyaSc6XG4gICAgICAgICAgICAgICAgY2FzZSAndXJpLXJlZmVyZW5jZSc6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5vZGUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBsb2NhbGl6ZSgndXJpRW1wdHknLCAnVVJJIGV4cGVjdGVkLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gL14oKFteOi8/I10rPyk6KT8oXFwvXFwvKFteLz8jXSopKT8oW14/I10qKShcXD8oW14jXSopKT8oIyguKikpPy8uZXhlYyhub2RlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGxvY2FsaXplKCd1cmlNaXNzaW5nJywgJ1VSSSBpcyBleHBlY3RlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIW1hdGNoWzJdICYmIHNjaGVtYS5mb3JtYXQgPT09ICd1cmknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGxvY2FsaXplKCd1cmlTY2hlbWVNaXNzaW5nJywgJ1VSSSB3aXRoIGEgc2NoZW1lIGlzIGV4cGVjdGVkLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0LnByb2JsZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogeyBvZmZzZXQ6IG5vZGUub2Zmc2V0LCBsZW5ndGg6IG5vZGUubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHNjaGVtYS5wYXR0ZXJuRXJyb3JNZXNzYWdlIHx8IHNjaGVtYS5lcnJvck1lc3NhZ2UgfHwgbG9jYWxpemUoJ3VyaUZvcm1hdFdhcm5pbmcnLCAnU3RyaW5nIGlzIG5vdCBhIFVSSTogezB9JywgZXJyb3JNZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yLWhleCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF0ZS10aW1lJzpcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICAgICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3JtYXQgPSBmb3JtYXRzW3NjaGVtYS5mb3JtYXRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW5vZGUudmFsdWUgfHwgIWZvcm1hdC5wYXR0ZXJuLmV4ZWMobm9kZS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBub2RlLm9mZnNldCwgbGVuZ3RoOiBub2RlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHNjaGVtYS5wYXR0ZXJuRXJyb3JNZXNzYWdlIHx8IHNjaGVtYS5lcnJvck1lc3NhZ2UgfHwgZm9ybWF0LmVycm9yTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIF92YWxpZGF0ZUFycmF5Tm9kZShub2RlLCBzY2hlbWEsIHZhbGlkYXRpb25SZXN1bHQsIG1hdGNoaW5nU2NoZW1hcykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgICB2YXIgc3ViU2NoZW1hcyA9IHNjaGVtYS5pdGVtcztcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBzdWJTY2hlbWFzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIHZhciBzdWJTY2hlbWFSZWYgPSBzdWJTY2hlbWFzW2luZGV4XTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViU2NoZW1hID0gYXNTY2hlbWEoc3ViU2NoZW1hUmVmKTtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbGlkYXRpb25SZXN1bHQgPSBuZXcgVmFsaWRhdGlvblJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbm9kZS5pdGVtc1tpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGUoaXRlbSwgc3ViU2NoZW1hLCBpdGVtVmFsaWRhdGlvblJlc3VsdCwgbWF0Y2hpbmdTY2hlbWFzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5tZXJnZVByb3BlcnR5TWF0Y2goaXRlbVZhbGlkYXRpb25SZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChub2RlLml0ZW1zLmxlbmd0aCA+PSBzdWJTY2hlbWFzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0LnByb3BlcnRpZXNWYWx1ZU1hdGNoZXMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5pdGVtcy5sZW5ndGggPiBzdWJTY2hlbWFzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN1YlNjaGVtYXMubGVuZ3RoOyBpIDwgbm9kZS5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWxpZGF0aW9uUmVzdWx0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlKG5vZGUuaXRlbXNbaV0sIHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMsIGl0ZW1WYWxpZGF0aW9uUmVzdWx0LCBtYXRjaGluZ1NjaGVtYXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5tZXJnZVByb3BlcnR5TWF0Y2goaXRlbVZhbGlkYXRpb25SZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogeyBvZmZzZXQ6IG5vZGUub2Zmc2V0LCBsZW5ndGg6IG5vZGUubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBsb2NhbGl6ZSgnYWRkaXRpb25hbEl0ZW1zV2FybmluZycsICdBcnJheSBoYXMgdG9vIG1hbnkgaXRlbXMgYWNjb3JkaW5nIHRvIHNjaGVtYS4gRXhwZWN0ZWQgezB9IG9yIGZld2VyLicsIHN1YlNjaGVtYXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgaXRlbVNjaGVtYSA9IGFzU2NoZW1hKHNjaGVtYS5pdGVtcyk7XG4gICAgICAgICAgICBpZiAoaXRlbVNjaGVtYSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBub2RlLml0ZW1zOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWxpZGF0aW9uUmVzdWx0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGUoaXRlbSwgaXRlbVNjaGVtYSwgaXRlbVZhbGlkYXRpb25SZXN1bHQsIG1hdGNoaW5nU2NoZW1hcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQubWVyZ2VQcm9wZXJ0eU1hdGNoKGl0ZW1WYWxpZGF0aW9uUmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRhaW5zU2NoZW1hID0gYXNTY2hlbWEoc2NoZW1hLmNvbnRhaW5zKTtcbiAgICAgICAgaWYgKGNvbnRhaW5zU2NoZW1hKSB7XG4gICAgICAgICAgICB2YXIgZG9lc0NvbnRhaW4gPSBub2RlLml0ZW1zLnNvbWUoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbGlkYXRpb25SZXN1bHQgPSBuZXcgVmFsaWRhdGlvblJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlKGl0ZW0sIGNvbnRhaW5zU2NoZW1hLCBpdGVtVmFsaWRhdGlvblJlc3VsdCwgTm9PcFNjaGVtYUNvbGxlY3Rvci5pbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFpdGVtVmFsaWRhdGlvblJlc3VsdC5oYXNQcm9ibGVtcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWRvZXNDb250YWluKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBub2RlLm9mZnNldCwgbGVuZ3RoOiBub2RlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBzY2hlbWEuZXJyb3JNZXNzYWdlIHx8IGxvY2FsaXplKCdyZXF1aXJlZEl0ZW1NaXNzaW5nV2FybmluZycsICdBcnJheSBkb2VzIG5vdCBjb250YWluIHJlcXVpcmVkIGl0ZW0uJylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNOdW1iZXIoc2NoZW1hLm1pbkl0ZW1zKSAmJiBub2RlLml0ZW1zLmxlbmd0aCA8IHNjaGVtYS5taW5JdGVtcykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogeyBvZmZzZXQ6IG5vZGUub2Zmc2V0LCBsZW5ndGg6IG5vZGUubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbG9jYWxpemUoJ21pbkl0ZW1zV2FybmluZycsICdBcnJheSBoYXMgdG9vIGZldyBpdGVtcy4gRXhwZWN0ZWQgezB9IG9yIG1vcmUuJywgc2NoZW1hLm1pbkl0ZW1zKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTnVtYmVyKHNjaGVtYS5tYXhJdGVtcykgJiYgbm9kZS5pdGVtcy5sZW5ndGggPiBzY2hlbWEubWF4SXRlbXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBub2RlLm9mZnNldCwgbGVuZ3RoOiBub2RlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGxvY2FsaXplKCdtYXhJdGVtc1dhcm5pbmcnLCAnQXJyYXkgaGFzIHRvbyBtYW55IGl0ZW1zLiBFeHBlY3RlZCB7MH0gb3IgZmV3ZXIuJywgc2NoZW1hLm1heEl0ZW1zKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS51bmlxdWVJdGVtcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlc18xID0gZ2V0Tm9kZVZhbHVlKG5vZGUpO1xuICAgICAgICAgICAgdmFyIGR1cGxpY2F0ZXMgPSB2YWx1ZXNfMS5zb21lKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggIT09IHZhbHVlc18xLmxhc3RJbmRleE9mKHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGR1cGxpY2F0ZXMpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0LnByb2JsZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogeyBvZmZzZXQ6IG5vZGUub2Zmc2V0LCBsZW5ndGg6IG5vZGUubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGxvY2FsaXplKCd1bmlxdWVJdGVtc1dhcm5pbmcnLCAnQXJyYXkgaGFzIGR1cGxpY2F0ZSBpdGVtcy4nKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIF92YWxpZGF0ZU9iamVjdE5vZGUobm9kZSwgc2NoZW1hLCB2YWxpZGF0aW9uUmVzdWx0LCBtYXRjaGluZ1NjaGVtYXMpIHtcbiAgICAgICAgdmFyIHNlZW5LZXlzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIHVucHJvY2Vzc2VkUHJvcGVydGllcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gbm9kZS5wcm9wZXJ0aWVzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIHByb3BlcnR5Tm9kZSA9IF9hW19pXTtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwcm9wZXJ0eU5vZGUua2V5Tm9kZS52YWx1ZTtcbiAgICAgICAgICAgIHNlZW5LZXlzW2tleV0gPSBwcm9wZXJ0eU5vZGUudmFsdWVOb2RlO1xuICAgICAgICAgICAgdW5wcm9jZXNzZWRQcm9wZXJ0aWVzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gc2NoZW1hLnJlcXVpcmVkOyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBfY1tfYl07XG4gICAgICAgICAgICAgICAgaWYgKCFzZWVuS2V5c1twcm9wZXJ0eU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXlOb2RlID0gbm9kZS5wYXJlbnQgJiYgbm9kZS5wYXJlbnQudHlwZSA9PT0gJ3Byb3BlcnR5JyAmJiBub2RlLnBhcmVudC5rZXlOb2RlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBrZXlOb2RlID8geyBvZmZzZXQ6IGtleU5vZGUub2Zmc2V0LCBsZW5ndGg6IGtleU5vZGUubGVuZ3RoIH0gOiB7IG9mZnNldDogbm9kZS5vZmZzZXQsIGxlbmd0aDogMSB9O1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0LnByb2JsZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbG9jYWxpemUoJ01pc3NpbmdSZXF1aXJlZFByb3BXYXJuaW5nJywgJ01pc3NpbmcgcHJvcGVydHkgXCJ7MH1cIi4nLCBwcm9wZXJ0eU5hbWUpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJvcGVydHlQcm9jZXNzZWQgPSBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdW5wcm9jZXNzZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcCk7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHVucHJvY2Vzc2VkUHJvcGVydGllcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gdW5wcm9jZXNzZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICAgICAgZm9yICh2YXIgX2QgPSAwLCBfZSA9IE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzKTsgX2QgPCBfZS5sZW5ndGg7IF9kKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gX2VbX2RdO1xuICAgICAgICAgICAgICAgIHByb3BlcnR5UHJvY2Vzc2VkKHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5U2NoZW1hID0gc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBzZWVuS2V5c1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNCb29sZWFuKHByb3BlcnR5U2NoZW1hKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eVNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5vZGUgPSBjaGlsZC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBwcm9wZXJ0eU5vZGUua2V5Tm9kZS5vZmZzZXQsIGxlbmd0aDogcHJvcGVydHlOb2RlLmtleU5vZGUubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHNjaGVtYS5lcnJvck1lc3NhZ2UgfHwgbG9jYWxpemUoJ0Rpc2FsbG93ZWRFeHRyYVByb3BXYXJuaW5nJywgJ1Byb3BlcnR5IHswfSBpcyBub3QgYWxsb3dlZC4nLCBwcm9wZXJ0eU5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0LnByb3BlcnRpZXNNYXRjaGVzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9wZXJ0aWVzVmFsdWVNYXRjaGVzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlWYWxpZGF0aW9uUmVzdWx0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlKGNoaWxkLCBwcm9wZXJ0eVNjaGVtYSwgcHJvcGVydHlWYWxpZGF0aW9uUmVzdWx0LCBtYXRjaGluZ1NjaGVtYXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5tZXJnZVByb3BlcnR5TWF0Y2gocHJvcGVydHlWYWxpZGF0aW9uUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NoZW1hLnBhdHRlcm5Qcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfZiA9IDAsIF9nID0gT2JqZWN0LmtleXMoc2NoZW1hLnBhdHRlcm5Qcm9wZXJ0aWVzKTsgX2YgPCBfZy5sZW5ndGg7IF9mKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlQYXR0ZXJuID0gX2dbX2ZdO1xuICAgICAgICAgICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAocHJvcGVydHlQYXR0ZXJuKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaCA9IDAsIF9qID0gdW5wcm9jZXNzZWRQcm9wZXJ0aWVzLnNsaWNlKDApOyBfaCA8IF9qLmxlbmd0aDsgX2grKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gX2pbX2hdO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVnZXgudGVzdChwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVByb2Nlc3NlZChwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gc2VlbktleXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eVNjaGVtYSA9IHNjaGVtYS5wYXR0ZXJuUHJvcGVydGllc1twcm9wZXJ0eVBhdHRlcm5dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Jvb2xlYW4ocHJvcGVydHlTY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJvcGVydHlTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5vZGUgPSBjaGlsZC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0LnByb2JsZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7IG9mZnNldDogcHJvcGVydHlOb2RlLmtleU5vZGUub2Zmc2V0LCBsZW5ndGg6IHByb3BlcnR5Tm9kZS5rZXlOb2RlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHNjaGVtYS5lcnJvck1lc3NhZ2UgfHwgbG9jYWxpemUoJ0Rpc2FsbG93ZWRFeHRyYVByb3BXYXJuaW5nJywgJ1Byb3BlcnR5IHswfSBpcyBub3QgYWxsb3dlZC4nLCBwcm9wZXJ0eU5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvcGVydGllc01hdGNoZXMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvcGVydGllc1ZhbHVlTWF0Y2hlcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlWYWxpZGF0aW9uUmVzdWx0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGUoY2hpbGQsIHByb3BlcnR5U2NoZW1hLCBwcm9wZXJ0eVZhbGlkYXRpb25SZXN1bHQsIG1hdGNoaW5nU2NoZW1hcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQubWVyZ2VQcm9wZXJ0eU1hdGNoKHByb3BlcnR5VmFsaWRhdGlvblJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yICh2YXIgX2sgPSAwLCB1bnByb2Nlc3NlZFByb3BlcnRpZXNfMSA9IHVucHJvY2Vzc2VkUHJvcGVydGllczsgX2sgPCB1bnByb2Nlc3NlZFByb3BlcnRpZXNfMS5sZW5ndGg7IF9rKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gdW5wcm9jZXNzZWRQcm9wZXJ0aWVzXzFbX2tdO1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IHNlZW5LZXlzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eVZhbGlkYXRpb25SZXN1bHQgPSBuZXcgVmFsaWRhdGlvblJlc3VsdCgpO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZShjaGlsZCwgc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLCBwcm9wZXJ0eVZhbGlkYXRpb25SZXN1bHQsIG1hdGNoaW5nU2NoZW1hcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQubWVyZ2VQcm9wZXJ0eU1hdGNoKHByb3BlcnR5VmFsaWRhdGlvblJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICh1bnByb2Nlc3NlZFByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9sID0gMCwgdW5wcm9jZXNzZWRQcm9wZXJ0aWVzXzIgPSB1bnByb2Nlc3NlZFByb3BlcnRpZXM7IF9sIDwgdW5wcm9jZXNzZWRQcm9wZXJ0aWVzXzIubGVuZ3RoOyBfbCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSB1bnByb2Nlc3NlZFByb3BlcnRpZXNfMltfbF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IHNlZW5LZXlzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5Tm9kZSA9IGNoaWxkLnBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQucHJvYmxlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBwcm9wZXJ0eU5vZGUua2V5Tm9kZS5vZmZzZXQsIGxlbmd0aDogcHJvcGVydHlOb2RlLmtleU5vZGUubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogc2NoZW1hLmVycm9yTWVzc2FnZSB8fCBsb2NhbGl6ZSgnRGlzYWxsb3dlZEV4dHJhUHJvcFdhcm5pbmcnLCAnUHJvcGVydHkgezB9IGlzIG5vdCBhbGxvd2VkLicsIHByb3BlcnR5TmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc051bWJlcihzY2hlbWEubWF4UHJvcGVydGllcykpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnByb3BlcnRpZXMubGVuZ3RoID4gc2NoZW1hLm1heFByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0LnByb2JsZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogeyBvZmZzZXQ6IG5vZGUub2Zmc2V0LCBsZW5ndGg6IG5vZGUubGVuZ3RoIH0sXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGxvY2FsaXplKCdNYXhQcm9wV2FybmluZycsICdPYmplY3QgaGFzIG1vcmUgcHJvcGVydGllcyB0aGFuIGxpbWl0IG9mIHswfS4nLCBzY2hlbWEubWF4UHJvcGVydGllcylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNOdW1iZXIoc2NoZW1hLm1pblByb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5wcm9wZXJ0aWVzLmxlbmd0aCA8IHNjaGVtYS5taW5Qcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHsgb2Zmc2V0OiBub2RlLm9mZnNldCwgbGVuZ3RoOiBub2RlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBsb2NhbGl6ZSgnTWluUHJvcFdhcm5pbmcnLCAnT2JqZWN0IGhhcyBmZXdlciBwcm9wZXJ0aWVzIHRoYW4gdGhlIHJlcXVpcmVkIG51bWJlciBvZiB7MH0nLCBzY2hlbWEubWluUHJvcGVydGllcylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NoZW1hLmRlcGVuZGVuY2llcykge1xuICAgICAgICAgICAgZm9yICh2YXIgX20gPSAwLCBfbyA9IE9iamVjdC5rZXlzKHNjaGVtYS5kZXBlbmRlbmNpZXMpOyBfbSA8IF9vLmxlbmd0aDsgX20rKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBfb1tfbV07XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBzZWVuS2V5c1trZXldO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eURlcCA9IHNjaGVtYS5kZXBlbmRlbmNpZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcGVydHlEZXApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfcCA9IDAsIHByb3BlcnR5RGVwXzEgPSBwcm9wZXJ0eURlcDsgX3AgPCBwcm9wZXJ0eURlcF8xLmxlbmd0aDsgX3ArKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZFByb3AgPSBwcm9wZXJ0eURlcF8xW19wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZW5LZXlzW3JlcXVpcmVkUHJvcF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9ibGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7IG9mZnNldDogbm9kZS5vZmZzZXQsIGxlbmd0aDogbm9kZS5sZW5ndGggfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGxvY2FsaXplKCdSZXF1aXJlZERlcGVuZGVudFByb3BXYXJuaW5nJywgJ09iamVjdCBpcyBtaXNzaW5nIHByb3BlcnR5IHswfSByZXF1aXJlZCBieSBwcm9wZXJ0eSB7MX0uJywgcmVxdWlyZWRQcm9wLCBrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdC5wcm9wZXJ0aWVzVmFsdWVNYXRjaGVzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5U2NoZW1hID0gYXNTY2hlbWEocHJvcGVydHlEZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5U2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5VmFsaWRhdGlvblJlc3VsdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGUobm9kZSwgcHJvcGVydHlTY2hlbWEsIHByb3BlcnR5VmFsaWRhdGlvblJlc3VsdCwgbWF0Y2hpbmdTY2hlbWFzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0Lm1lcmdlUHJvcGVydHlNYXRjaChwcm9wZXJ0eVZhbGlkYXRpb25SZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBwcm9wZXJ0eU5hbWVzID0gYXNTY2hlbWEoc2NoZW1hLnByb3BlcnR5TmFtZXMpO1xuICAgICAgICBpZiAocHJvcGVydHlOYW1lcykge1xuICAgICAgICAgICAgZm9yICh2YXIgX3EgPSAwLCBfciA9IG5vZGUucHJvcGVydGllczsgX3EgPCBfci5sZW5ndGg7IF9xKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZiA9IF9yW19xXTtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZi5rZXlOb2RlO1xuICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGUoa2V5LCBwcm9wZXJ0eU5hbWVzLCB2YWxpZGF0aW9uUmVzdWx0LCBOb09wU2NoZW1hQ29sbGVjdG9yLmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2UodGV4dERvY3VtZW50LCBjb25maWcpIHtcbiAgICB2YXIgcHJvYmxlbXMgPSBbXTtcbiAgICB2YXIgbGFzdFByb2JsZW1PZmZzZXQgPSAtMTtcbiAgICB2YXIgdGV4dCA9IHRleHREb2N1bWVudC5nZXRUZXh0KCk7XG4gICAgdmFyIHNjYW5uZXIgPSBKc29uLmNyZWF0ZVNjYW5uZXIodGV4dCwgZmFsc2UpO1xuICAgIHZhciBjb21tZW50UmFuZ2VzID0gY29uZmlnICYmIGNvbmZpZy5jb2xsZWN0Q29tbWVudHMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBmdW5jdGlvbiBfc2Nhbk5leHQoKSB7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW5fMSA9IHNjYW5uZXIuc2NhbigpO1xuICAgICAgICAgICAgX2NoZWNrU2NhbkVycm9yKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRva2VuXzEpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDEyIC8qIExpbmVDb21tZW50VHJpdmlhICovOlxuICAgICAgICAgICAgICAgIGNhc2UgMTMgLyogQmxvY2tDb21tZW50VHJpdmlhICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb21tZW50UmFuZ2VzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudFJhbmdlcy5wdXNoKFJhbmdlLmNyZWF0ZSh0ZXh0RG9jdW1lbnQucG9zaXRpb25BdChzY2FubmVyLmdldFRva2VuT2Zmc2V0KCkpLCB0ZXh0RG9jdW1lbnQucG9zaXRpb25BdChzY2FubmVyLmdldFRva2VuT2Zmc2V0KCkgKyBzY2FubmVyLmdldFRva2VuTGVuZ3RoKCkpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxNSAvKiBUcml2aWEgKi86XG4gICAgICAgICAgICAgICAgY2FzZSAxNCAvKiBMaW5lQnJlYWtUcml2aWEgKi86XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbl8xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9hY2NlcHQodG9rZW4pIHtcbiAgICAgICAgaWYgKHNjYW5uZXIuZ2V0VG9rZW4oKSA9PT0gdG9rZW4pIHtcbiAgICAgICAgICAgIF9zY2FuTmV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfZXJyb3JBdFJhbmdlKG1lc3NhZ2UsIGNvZGUsIHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQsIHNldmVyaXR5KSB7XG4gICAgICAgIGlmIChzZXZlcml0eSA9PT0gdm9pZCAwKSB7IHNldmVyaXR5ID0gRGlhZ25vc3RpY1NldmVyaXR5LkVycm9yOyB9XG4gICAgICAgIGlmIChwcm9ibGVtcy5sZW5ndGggPT09IDAgfHwgc3RhcnRPZmZzZXQgIT09IGxhc3RQcm9ibGVtT2Zmc2V0KSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBSYW5nZS5jcmVhdGUodGV4dERvY3VtZW50LnBvc2l0aW9uQXQoc3RhcnRPZmZzZXQpLCB0ZXh0RG9jdW1lbnQucG9zaXRpb25BdChlbmRPZmZzZXQpKTtcbiAgICAgICAgICAgIHByb2JsZW1zLnB1c2goRGlhZ25vc3RpYy5jcmVhdGUocmFuZ2UsIG1lc3NhZ2UsIHNldmVyaXR5LCBjb2RlLCB0ZXh0RG9jdW1lbnQubGFuZ3VhZ2VJZCkpO1xuICAgICAgICAgICAgbGFzdFByb2JsZW1PZmZzZXQgPSBzdGFydE9mZnNldDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBfZXJyb3IobWVzc2FnZSwgY29kZSwgbm9kZSwgc2tpcFVudGlsQWZ0ZXIsIHNraXBVbnRpbCkge1xuICAgICAgICBpZiAobm9kZSA9PT0gdm9pZCAwKSB7IG5vZGUgPSB1bmRlZmluZWQ7IH1cbiAgICAgICAgaWYgKHNraXBVbnRpbEFmdGVyID09PSB2b2lkIDApIHsgc2tpcFVudGlsQWZ0ZXIgPSBbXTsgfVxuICAgICAgICBpZiAoc2tpcFVudGlsID09PSB2b2lkIDApIHsgc2tpcFVudGlsID0gW107IH1cbiAgICAgICAgdmFyIHN0YXJ0ID0gc2Nhbm5lci5nZXRUb2tlbk9mZnNldCgpO1xuICAgICAgICB2YXIgZW5kID0gc2Nhbm5lci5nZXRUb2tlbk9mZnNldCgpICsgc2Nhbm5lci5nZXRUb2tlbkxlbmd0aCgpO1xuICAgICAgICBpZiAoc3RhcnQgPT09IGVuZCAmJiBzdGFydCA+IDApIHtcbiAgICAgICAgICAgIHN0YXJ0LS07XG4gICAgICAgICAgICB3aGlsZSAoc3RhcnQgPiAwICYmIC9cXHMvLnRlc3QodGV4dC5jaGFyQXQoc3RhcnQpKSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmQgPSBzdGFydCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgX2Vycm9yQXRSYW5nZShtZXNzYWdlLCBjb2RlLCBzdGFydCwgZW5kKTtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIF9maW5hbGl6ZShub2RlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNraXBVbnRpbEFmdGVyLmxlbmd0aCArIHNraXBVbnRpbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW5fMiA9IHNjYW5uZXIuZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbl8yICE9PSAxNyAvKiBFT0YgKi8pIHtcbiAgICAgICAgICAgICAgICBpZiAoc2tpcFVudGlsQWZ0ZXIuaW5kZXhPZih0b2tlbl8yKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NjYW5OZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChza2lwVW50aWwuaW5kZXhPZih0b2tlbl8yKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRva2VuXzIgPSBfc2Nhbk5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX2NoZWNrU2NhbkVycm9yKCkge1xuICAgICAgICBzd2l0Y2ggKHNjYW5uZXIuZ2V0VG9rZW5FcnJvcigpKSB7XG4gICAgICAgICAgICBjYXNlIDQgLyogSW52YWxpZFVuaWNvZGUgKi86XG4gICAgICAgICAgICAgICAgX2Vycm9yKGxvY2FsaXplKCdJbnZhbGlkVW5pY29kZScsICdJbnZhbGlkIHVuaWNvZGUgc2VxdWVuY2UgaW4gc3RyaW5nLicpLCBFcnJvckNvZGUuSW52YWxpZFVuaWNvZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgY2FzZSA1IC8qIEludmFsaWRFc2NhcGVDaGFyYWN0ZXIgKi86XG4gICAgICAgICAgICAgICAgX2Vycm9yKGxvY2FsaXplKCdJbnZhbGlkRXNjYXBlQ2hhcmFjdGVyJywgJ0ludmFsaWQgZXNjYXBlIGNoYXJhY3RlciBpbiBzdHJpbmcuJyksIEVycm9yQ29kZS5JbnZhbGlkRXNjYXBlQ2hhcmFjdGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhc2UgMyAvKiBVbmV4cGVjdGVkRW5kT2ZOdW1iZXIgKi86XG4gICAgICAgICAgICAgICAgX2Vycm9yKGxvY2FsaXplKCdVbmV4cGVjdGVkRW5kT2ZOdW1iZXInLCAnVW5leHBlY3RlZCBlbmQgb2YgbnVtYmVyLicpLCBFcnJvckNvZGUuVW5leHBlY3RlZEVuZE9mTnVtYmVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhc2UgMSAvKiBVbmV4cGVjdGVkRW5kT2ZDb21tZW50ICovOlxuICAgICAgICAgICAgICAgIF9lcnJvcihsb2NhbGl6ZSgnVW5leHBlY3RlZEVuZE9mQ29tbWVudCcsICdVbmV4cGVjdGVkIGVuZCBvZiBjb21tZW50LicpLCBFcnJvckNvZGUuVW5leHBlY3RlZEVuZE9mQ29tbWVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjYXNlIDIgLyogVW5leHBlY3RlZEVuZE9mU3RyaW5nICovOlxuICAgICAgICAgICAgICAgIF9lcnJvcihsb2NhbGl6ZSgnVW5leHBlY3RlZEVuZE9mU3RyaW5nJywgJ1VuZXhwZWN0ZWQgZW5kIG9mIHN0cmluZy4nKSwgRXJyb3JDb2RlLlVuZXhwZWN0ZWRFbmRPZlN0cmluZyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjYXNlIDYgLyogSW52YWxpZENoYXJhY3RlciAqLzpcbiAgICAgICAgICAgICAgICBfZXJyb3IobG9jYWxpemUoJ0ludmFsaWRDaGFyYWN0ZXInLCAnSW52YWxpZCBjaGFyYWN0ZXJzIGluIHN0cmluZy4gQ29udHJvbCBjaGFyYWN0ZXJzIG11c3QgYmUgZXNjYXBlZC4nKSwgRXJyb3JDb2RlLkludmFsaWRDaGFyYWN0ZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX2ZpbmFsaXplKG5vZGUsIHNjYW5OZXh0KSB7XG4gICAgICAgIG5vZGUubGVuZ3RoID0gc2Nhbm5lci5nZXRUb2tlbk9mZnNldCgpICsgc2Nhbm5lci5nZXRUb2tlbkxlbmd0aCgpIC0gbm9kZS5vZmZzZXQ7XG4gICAgICAgIGlmIChzY2FuTmV4dCkge1xuICAgICAgICAgICAgX3NjYW5OZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9wYXJzZUFycmF5KHBhcmVudCkge1xuICAgICAgICBpZiAoc2Nhbm5lci5nZXRUb2tlbigpICE9PSAzIC8qIE9wZW5CcmFja2V0VG9rZW4gKi8pIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgQXJyYXlBU1ROb2RlSW1wbChwYXJlbnQsIHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSk7XG4gICAgICAgIF9zY2FuTmV4dCgpOyAvLyBjb25zdW1lIE9wZW5CcmFja2V0VG9rZW5cbiAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgdmFyIG5lZWRzQ29tbWEgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHNjYW5uZXIuZ2V0VG9rZW4oKSAhPT0gNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqLyAmJiBzY2FubmVyLmdldFRva2VuKCkgIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgaWYgKHNjYW5uZXIuZ2V0VG9rZW4oKSA9PT0gNSAvKiBDb21tYVRva2VuICovKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuZWVkc0NvbW1hKSB7XG4gICAgICAgICAgICAgICAgICAgIF9lcnJvcihsb2NhbGl6ZSgnVmFsdWVFeHBlY3RlZCcsICdWYWx1ZSBleHBlY3RlZCcpLCBFcnJvckNvZGUuVmFsdWVFeHBlY3RlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjb21tYU9mZnNldCA9IHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKTtcbiAgICAgICAgICAgICAgICBfc2Nhbk5leHQoKTsgLy8gY29uc3VtZSBjb21tYVxuICAgICAgICAgICAgICAgIGlmIChzY2FubmVyLmdldFRva2VuKCkgPT09IDQgLyogQ2xvc2VCcmFja2V0VG9rZW4gKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lZWRzQ29tbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvckF0UmFuZ2UobG9jYWxpemUoJ1RyYWlsaW5nQ29tbWEnLCAnVHJhaWxpbmcgY29tbWEnKSwgRXJyb3JDb2RlLlRyYWlsaW5nQ29tbWEsIGNvbW1hT2Zmc2V0LCBjb21tYU9mZnNldCArIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5lZWRzQ29tbWEpIHtcbiAgICAgICAgICAgICAgICBfZXJyb3IobG9jYWxpemUoJ0V4cGVjdGVkQ29tbWEnLCAnRXhwZWN0ZWQgY29tbWEnKSwgRXJyb3JDb2RlLkNvbW1hRXhwZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBfcGFyc2VWYWx1ZShub2RlKTtcbiAgICAgICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgICAgIF9lcnJvcihsb2NhbGl6ZSgnUHJvcGVydHlFeHBlY3RlZCcsICdWYWx1ZSBleHBlY3RlZCcpLCBFcnJvckNvZGUuVmFsdWVFeHBlY3RlZCwgdW5kZWZpbmVkLCBbXSwgWzQgLyogQ2xvc2VCcmFja2V0VG9rZW4gKi8sIDUgLyogQ29tbWFUb2tlbiAqL10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmVlZHNDb21tYSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjYW5uZXIuZ2V0VG9rZW4oKSAhPT0gNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqLykge1xuICAgICAgICAgICAgcmV0dXJuIF9lcnJvcihsb2NhbGl6ZSgnRXhwZWN0ZWRDbG9zZUJyYWNrZXQnLCAnRXhwZWN0ZWQgY29tbWEgb3IgY2xvc2luZyBicmFja2V0JyksIEVycm9yQ29kZS5Db21tYU9yQ2xvc2VCYWNrZXRFeHBlY3RlZCwgbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9maW5hbGl6ZShub2RlLCB0cnVlKTtcbiAgICB9XG4gICAgdmFyIGtleVBsYWNlaG9sZGVyID0gbmV3IFN0cmluZ0FTVE5vZGVJbXBsKHVuZGVmaW5lZCwgMCwgMCk7XG4gICAgZnVuY3Rpb24gX3BhcnNlUHJvcGVydHkocGFyZW50LCBrZXlzU2Vlbikge1xuICAgICAgICB2YXIgbm9kZSA9IG5ldyBQcm9wZXJ0eUFTVE5vZGVJbXBsKHBhcmVudCwgc2Nhbm5lci5nZXRUb2tlbk9mZnNldCgpLCBrZXlQbGFjZWhvbGRlcik7XG4gICAgICAgIHZhciBrZXkgPSBfcGFyc2VTdHJpbmcobm9kZSk7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICBpZiAoc2Nhbm5lci5nZXRUb2tlbigpID09PSAxNiAvKiBVbmtub3duICovKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2l2ZSBhIG1vcmUgaGVscGZ1bCBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICAgICAgX2Vycm9yKGxvY2FsaXplKCdEb3VibGVRdW90ZXNFeHBlY3RlZCcsICdQcm9wZXJ0eSBrZXlzIG11c3QgYmUgZG91YmxlcXVvdGVkJyksIEVycm9yQ29kZS5VbmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHZhciBrZXlOb2RlID0gbmV3IFN0cmluZ0FTVE5vZGVJbXBsKG5vZGUsIHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSwgc2Nhbm5lci5nZXRUb2tlbkxlbmd0aCgpKTtcbiAgICAgICAgICAgICAgICBrZXlOb2RlLnZhbHVlID0gc2Nhbm5lci5nZXRUb2tlblZhbHVlKCk7XG4gICAgICAgICAgICAgICAga2V5ID0ga2V5Tm9kZTtcbiAgICAgICAgICAgICAgICBfc2Nhbk5leHQoKTsgLy8gY29uc3VtZSBVbmtub3duXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5vZGUua2V5Tm9kZSA9IGtleTtcbiAgICAgICAgdmFyIHNlZW4gPSBrZXlzU2VlbltrZXkudmFsdWVdO1xuICAgICAgICBpZiAoc2Vlbikge1xuICAgICAgICAgICAgX2Vycm9yQXRSYW5nZShsb2NhbGl6ZSgnRHVwbGljYXRlS2V5V2FybmluZycsIFwiRHVwbGljYXRlIG9iamVjdCBrZXlcIiksIEVycm9yQ29kZS5EdXBsaWNhdGVLZXksIG5vZGUua2V5Tm9kZS5vZmZzZXQsIG5vZGUua2V5Tm9kZS5vZmZzZXQgKyBub2RlLmtleU5vZGUubGVuZ3RoLCBEaWFnbm9zdGljU2V2ZXJpdHkuV2FybmluZyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlZW4gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgX2Vycm9yQXRSYW5nZShsb2NhbGl6ZSgnRHVwbGljYXRlS2V5V2FybmluZycsIFwiRHVwbGljYXRlIG9iamVjdCBrZXlcIiksIEVycm9yQ29kZS5EdXBsaWNhdGVLZXksIHNlZW4ua2V5Tm9kZS5vZmZzZXQsIHNlZW4ua2V5Tm9kZS5vZmZzZXQgKyBzZWVuLmtleU5vZGUubGVuZ3RoLCBEaWFnbm9zdGljU2V2ZXJpdHkuV2FybmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlzU2VlbltrZXkudmFsdWVdID0gdHJ1ZTsgLy8gaWYgdGhlIHNhbWUga2V5IGlzIGR1cGxpY2F0ZSBhZ2FpbiwgYXZvaWQgZHVwbGljYXRlIGVycm9yIHJlcG9ydGluZ1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAga2V5c1NlZW5ba2V5LnZhbHVlXSA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjYW5uZXIuZ2V0VG9rZW4oKSA9PT0gNiAvKiBDb2xvblRva2VuICovKSB7XG4gICAgICAgICAgICBub2RlLmNvbG9uT2Zmc2V0ID0gc2Nhbm5lci5nZXRUb2tlbk9mZnNldCgpO1xuICAgICAgICAgICAgX3NjYW5OZXh0KCk7IC8vIGNvbnN1bWUgQ29sb25Ub2tlblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX2Vycm9yKGxvY2FsaXplKCdDb2xvbkV4cGVjdGVkJywgJ0NvbG9uIGV4cGVjdGVkJyksIEVycm9yQ29kZS5Db2xvbkV4cGVjdGVkKTtcbiAgICAgICAgICAgIGlmIChzY2FubmVyLmdldFRva2VuKCkgPT09IDEwIC8qIFN0cmluZ0xpdGVyYWwgKi8gJiYgdGV4dERvY3VtZW50LnBvc2l0aW9uQXQoa2V5Lm9mZnNldCArIGtleS5sZW5ndGgpLmxpbmUgPCB0ZXh0RG9jdW1lbnQucG9zaXRpb25BdChzY2FubmVyLmdldFRva2VuT2Zmc2V0KCkpLmxpbmUpIHtcbiAgICAgICAgICAgICAgICBub2RlLmxlbmd0aCA9IGtleS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlID0gX3BhcnNlVmFsdWUobm9kZSk7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBfZXJyb3IobG9jYWxpemUoJ1ZhbHVlRXhwZWN0ZWQnLCAnVmFsdWUgZXhwZWN0ZWQnKSwgRXJyb3JDb2RlLlZhbHVlRXhwZWN0ZWQsIG5vZGUsIFtdLCBbMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi8sIDUgLyogQ29tbWFUb2tlbiAqL10pO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUudmFsdWVOb2RlID0gdmFsdWU7XG4gICAgICAgIG5vZGUubGVuZ3RoID0gdmFsdWUub2Zmc2V0ICsgdmFsdWUubGVuZ3RoIC0gbm9kZS5vZmZzZXQ7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfcGFyc2VPYmplY3QocGFyZW50KSB7XG4gICAgICAgIGlmIChzY2FubmVyLmdldFRva2VuKCkgIT09IDEgLyogT3BlbkJyYWNlVG9rZW4gKi8pIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgT2JqZWN0QVNUTm9kZUltcGwocGFyZW50LCBzY2FubmVyLmdldFRva2VuT2Zmc2V0KCkpO1xuICAgICAgICB2YXIga2V5c1NlZW4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBfc2Nhbk5leHQoKTsgLy8gY29uc3VtZSBPcGVuQnJhY2VUb2tlblxuICAgICAgICB2YXIgbmVlZHNDb21tYSA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoc2Nhbm5lci5nZXRUb2tlbigpICE9PSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLyAmJiBzY2FubmVyLmdldFRva2VuKCkgIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgaWYgKHNjYW5uZXIuZ2V0VG9rZW4oKSA9PT0gNSAvKiBDb21tYVRva2VuICovKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuZWVkc0NvbW1hKSB7XG4gICAgICAgICAgICAgICAgICAgIF9lcnJvcihsb2NhbGl6ZSgnUHJvcGVydHlFeHBlY3RlZCcsICdQcm9wZXJ0eSBleHBlY3RlZCcpLCBFcnJvckNvZGUuUHJvcGVydHlFeHBlY3RlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjb21tYU9mZnNldCA9IHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKTtcbiAgICAgICAgICAgICAgICBfc2Nhbk5leHQoKTsgLy8gY29uc3VtZSBjb21tYVxuICAgICAgICAgICAgICAgIGlmIChzY2FubmVyLmdldFRva2VuKCkgPT09IDIgLyogQ2xvc2VCcmFjZVRva2VuICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWVkc0NvbW1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JBdFJhbmdlKGxvY2FsaXplKCdUcmFpbGluZ0NvbW1hJywgJ1RyYWlsaW5nIGNvbW1hJyksIEVycm9yQ29kZS5UcmFpbGluZ0NvbW1hLCBjb21tYU9mZnNldCwgY29tbWFPZmZzZXQgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZWVkc0NvbW1hKSB7XG4gICAgICAgICAgICAgICAgX2Vycm9yKGxvY2FsaXplKCdFeHBlY3RlZENvbW1hJywgJ0V4cGVjdGVkIGNvbW1hJyksIEVycm9yQ29kZS5Db21tYUV4cGVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IF9wYXJzZVByb3BlcnR5KG5vZGUsIGtleXNTZWVuKTtcbiAgICAgICAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICBfZXJyb3IobG9jYWxpemUoJ1Byb3BlcnR5RXhwZWN0ZWQnLCAnUHJvcGVydHkgZXhwZWN0ZWQnKSwgRXJyb3JDb2RlLlByb3BlcnR5RXhwZWN0ZWQsIHVuZGVmaW5lZCwgW10sIFsyIC8qIENsb3NlQnJhY2VUb2tlbiAqLywgNSAvKiBDb21tYVRva2VuICovXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnByb3BlcnRpZXMucHVzaChwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZWVkc0NvbW1hID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Nhbm5lci5nZXRUb2tlbigpICE9PSAyIC8qIENsb3NlQnJhY2VUb2tlbiAqLykge1xuICAgICAgICAgICAgcmV0dXJuIF9lcnJvcihsb2NhbGl6ZSgnRXhwZWN0ZWRDbG9zZUJyYWNlJywgJ0V4cGVjdGVkIGNvbW1hIG9yIGNsb3NpbmcgYnJhY2UnKSwgRXJyb3JDb2RlLkNvbW1hT3JDbG9zZUJyYWNlRXhwZWN0ZWQsIG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfZmluYWxpemUobm9kZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9wYXJzZVN0cmluZyhwYXJlbnQpIHtcbiAgICAgICAgaWYgKHNjYW5uZXIuZ2V0VG9rZW4oKSAhPT0gMTAgLyogU3RyaW5nTGl0ZXJhbCAqLykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9kZSA9IG5ldyBTdHJpbmdBU1ROb2RlSW1wbChwYXJlbnQsIHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSk7XG4gICAgICAgIG5vZGUudmFsdWUgPSBzY2FubmVyLmdldFRva2VuVmFsdWUoKTtcbiAgICAgICAgcmV0dXJuIF9maW5hbGl6ZShub2RlLCB0cnVlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX3BhcnNlTnVtYmVyKHBhcmVudCkge1xuICAgICAgICBpZiAoc2Nhbm5lci5nZXRUb2tlbigpICE9PSAxMSAvKiBOdW1lcmljTGl0ZXJhbCAqLykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9kZSA9IG5ldyBOdW1iZXJBU1ROb2RlSW1wbChwYXJlbnQsIHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSk7XG4gICAgICAgIGlmIChzY2FubmVyLmdldFRva2VuRXJyb3IoKSA9PT0gMCAvKiBOb25lICovKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW5WYWx1ZSA9IHNjYW5uZXIuZ2V0VG9rZW5WYWx1ZSgpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgbnVtYmVyVmFsdWUgPSBKU09OLnBhcnNlKHRva2VuVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghaXNOdW1iZXIobnVtYmVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZXJyb3IobG9jYWxpemUoJ0ludmFsaWROdW1iZXJGb3JtYXQnLCAnSW52YWxpZCBudW1iZXIgZm9ybWF0LicpLCBFcnJvckNvZGUuVW5kZWZpbmVkLCBub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZS52YWx1ZSA9IG51bWJlclZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2Vycm9yKGxvY2FsaXplKCdJbnZhbGlkTnVtYmVyRm9ybWF0JywgJ0ludmFsaWQgbnVtYmVyIGZvcm1hdC4nKSwgRXJyb3JDb2RlLlVuZGVmaW5lZCwgbm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLmlzSW50ZWdlciA9IHRva2VuVmFsdWUuaW5kZXhPZignLicpID09PSAtMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2ZpbmFsaXplKG5vZGUsIHRydWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfcGFyc2VMaXRlcmFsKHBhcmVudCkge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgc3dpdGNoIChzY2FubmVyLmdldFRva2VuKCkpIHtcbiAgICAgICAgICAgIGNhc2UgNyAvKiBOdWxsS2V5d29yZCAqLzpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2ZpbmFsaXplKG5ldyBOdWxsQVNUTm9kZUltcGwocGFyZW50LCBzY2FubmVyLmdldFRva2VuT2Zmc2V0KCkpLCB0cnVlKTtcbiAgICAgICAgICAgIGNhc2UgOCAvKiBUcnVlS2V5d29yZCAqLzpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2ZpbmFsaXplKG5ldyBCb29sZWFuQVNUTm9kZUltcGwocGFyZW50LCB0cnVlLCBzY2FubmVyLmdldFRva2VuT2Zmc2V0KCkpLCB0cnVlKTtcbiAgICAgICAgICAgIGNhc2UgOSAvKiBGYWxzZUtleXdvcmQgKi86XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9maW5hbGl6ZShuZXcgQm9vbGVhbkFTVE5vZGVJbXBsKHBhcmVudCwgZmFsc2UsIHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSksIHRydWUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9wYXJzZVZhbHVlKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gX3BhcnNlQXJyYXkocGFyZW50KSB8fCBfcGFyc2VPYmplY3QocGFyZW50KSB8fCBfcGFyc2VTdHJpbmcocGFyZW50KSB8fCBfcGFyc2VOdW1iZXIocGFyZW50KSB8fCBfcGFyc2VMaXRlcmFsKHBhcmVudCk7XG4gICAgfVxuICAgIHZhciBfcm9vdCA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdG9rZW4gPSBfc2Nhbk5leHQoKTtcbiAgICBpZiAodG9rZW4gIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICBfcm9vdCA9IF9wYXJzZVZhbHVlKF9yb290KTtcbiAgICAgICAgaWYgKCFfcm9vdCkge1xuICAgICAgICAgICAgX2Vycm9yKGxvY2FsaXplKCdJbnZhbGlkIHN5bWJvbCcsICdFeHBlY3RlZCBhIEpTT04gb2JqZWN0LCBhcnJheSBvciBsaXRlcmFsLicpLCBFcnJvckNvZGUuVW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzY2FubmVyLmdldFRva2VuKCkgIT09IDE3IC8qIEVPRiAqLykge1xuICAgICAgICAgICAgX2Vycm9yKGxvY2FsaXplKCdFbmQgb2YgZmlsZSBleHBlY3RlZCcsICdFbmQgb2YgZmlsZSBleHBlY3RlZC4nKSwgRXJyb3JDb2RlLlVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBKU09ORG9jdW1lbnQoX3Jvb3QsIHByb2JsZW1zLCBjb21tZW50UmFuZ2VzKTtcbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgIGlmIChoYXlzdGFjay5sZW5ndGggPCBuZWVkbGUubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWVkbGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGhheXN0YWNrW2ldICE9PSBuZWVkbGVbaV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBoYXlzdGFjayBlbmRzIHdpdGggbmVlZGxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5kc1dpdGgoaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgIHZhciBkaWZmID0gaGF5c3RhY2subGVuZ3RoIC0gbmVlZGxlLmxlbmd0aDtcbiAgICBpZiAoZGlmZiA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhheXN0YWNrLmxhc3RJbmRleE9mKG5lZWRsZSkgPT09IGRpZmY7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRpZmYgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGhheXN0YWNrID09PSBuZWVkbGU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRTaW1wbGUyUmVnRXhwUGF0dGVybihwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvW1xcLVxcXFxcXHtcXH1cXCtcXD9cXHxcXF5cXCRcXC5cXCxcXFtcXF1cXChcXClcXCNcXHNdL2csICdcXFxcJCYnKS5yZXBsYWNlKC9bXFwqXS9nLCAnLionKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXQodmFsdWUsIGNvdW50KSB7XG4gICAgdmFyIHMgPSAnJztcbiAgICB3aGlsZSAoY291bnQgPiAwKSB7XG4gICAgICAgIGlmICgoY291bnQgJiAxKSA9PT0gMSkge1xuICAgICAgICAgICAgcyArPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgY291bnQgPSBjb3VudCA+Pj4gMTtcbiAgICB9XG4gICAgcmV0dXJuIHM7XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCAqIGFzIFBhcnNlciBmcm9tICcuLi9wYXJzZXIvanNvblBhcnNlci5qcyc7XG5pbXBvcnQgKiBhcyBKc29uIGZyb20gJy4vLi4vLi4vanNvbmMtcGFyc2VyL21haW4uanMnO1xuaW1wb3J0IHsgc3RyaW5naWZ5T2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMvanNvbi5qcyc7XG5pbXBvcnQgeyBlbmRzV2l0aCB9IGZyb20gJy4uL3V0aWxzL3N0cmluZ3MuanMnO1xuaW1wb3J0IHsgaXNEZWZpbmVkIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0cy5qcyc7XG5pbXBvcnQgeyBDb21wbGV0aW9uSXRlbSwgQ29tcGxldGlvbkl0ZW1LaW5kLCBSYW5nZSwgVGV4dEVkaXQsIEluc2VydFRleHRGb3JtYXQsIE1hcmt1cEtpbmQgfSBmcm9tICcuLi9qc29uTGFuZ3VhZ2VUeXBlcy5qcyc7XG5pbXBvcnQgKiBhcyBubHMgZnJvbSAnLi8uLi8uLi8uLi9maWxsZXJzL3ZzY29kZS1ubHMuanMnO1xudmFyIGxvY2FsaXplID0gbmxzLmxvYWRNZXNzYWdlQnVuZGxlKCk7XG52YXIgdmFsdWVDb21taXRDaGFyYWN0ZXJzID0gWycsJywgJ30nLCAnXSddO1xudmFyIHByb3BlcnR5Q29tbWl0Q2hhcmFjdGVycyA9IFsnOiddO1xudmFyIEpTT05Db21wbGV0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEpTT05Db21wbGV0aW9uKHNjaGVtYVNlcnZpY2UsIGNvbnRyaWJ1dGlvbnMsIHByb21pc2VDb25zdHJ1Y3RvciwgY2xpZW50Q2FwYWJpbGl0aWVzKSB7XG4gICAgICAgIGlmIChjb250cmlidXRpb25zID09PSB2b2lkIDApIHsgY29udHJpYnV0aW9ucyA9IFtdOyB9XG4gICAgICAgIGlmIChwcm9taXNlQ29uc3RydWN0b3IgPT09IHZvaWQgMCkgeyBwcm9taXNlQ29uc3RydWN0b3IgPSBQcm9taXNlOyB9XG4gICAgICAgIGlmIChjbGllbnRDYXBhYmlsaXRpZXMgPT09IHZvaWQgMCkgeyBjbGllbnRDYXBhYmlsaXRpZXMgPSB7fTsgfVxuICAgICAgICB0aGlzLnNjaGVtYVNlcnZpY2UgPSBzY2hlbWFTZXJ2aWNlO1xuICAgICAgICB0aGlzLmNvbnRyaWJ1dGlvbnMgPSBjb250cmlidXRpb25zO1xuICAgICAgICB0aGlzLnByb21pc2VDb25zdHJ1Y3RvciA9IHByb21pc2VDb25zdHJ1Y3RvcjtcbiAgICAgICAgdGhpcy5jbGllbnRDYXBhYmlsaXRpZXMgPSBjbGllbnRDYXBhYmlsaXRpZXM7XG4gICAgfVxuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5kb1Jlc29sdmUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5jb250cmlidXRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgcmVzb2x2ZUNvbXBsZXRpb24gPSB0aGlzLmNvbnRyaWJ1dGlvbnNbaV0ucmVzb2x2ZUNvbXBsZXRpb247XG4gICAgICAgICAgICBpZiAocmVzb2x2ZUNvbXBsZXRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSByZXNvbHZlQ29tcGxldGlvbihpdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlQ29uc3RydWN0b3IucmVzb2x2ZShpdGVtKTtcbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5kb0NvbXBsZXRlID0gZnVuY3Rpb24gKGRvY3VtZW50LCBwb3NpdGlvbiwgZG9jKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICBpc0luY29tcGxldGU6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuZ2V0VGV4dCgpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gZG9jdW1lbnQub2Zmc2V0QXQocG9zaXRpb24pO1xuICAgICAgICB2YXIgbm9kZSA9IGRvYy5nZXROb2RlRnJvbU9mZnNldChvZmZzZXQsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5pc0luQ29tbWVudChkb2N1bWVudCwgbm9kZSA/IG5vZGUub2Zmc2V0IDogMCwgb2Zmc2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlICYmIChvZmZzZXQgPT09IG5vZGUub2Zmc2V0ICsgbm9kZS5sZW5ndGgpICYmIG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHRleHRbb2Zmc2V0IC0gMV07XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnb2JqZWN0JyAmJiBjaCA9PT0gJ30nIHx8IG5vZGUudHlwZSA9PT0gJ2FycmF5JyAmJiBjaCA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgLy8gYWZ0ZXIgXSBvciB9XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50V29yZCA9IHRoaXMuZ2V0Q3VycmVudFdvcmQoZG9jdW1lbnQsIG9mZnNldCk7XG4gICAgICAgIHZhciBvdmVyd3JpdGVSYW5nZTtcbiAgICAgICAgaWYgKG5vZGUgJiYgKG5vZGUudHlwZSA9PT0gJ3N0cmluZycgfHwgbm9kZS50eXBlID09PSAnbnVtYmVyJyB8fCBub2RlLnR5cGUgPT09ICdib29sZWFuJyB8fCBub2RlLnR5cGUgPT09ICdudWxsJykpIHtcbiAgICAgICAgICAgIG92ZXJ3cml0ZVJhbmdlID0gUmFuZ2UuY3JlYXRlKGRvY3VtZW50LnBvc2l0aW9uQXQobm9kZS5vZmZzZXQpLCBkb2N1bWVudC5wb3NpdGlvbkF0KG5vZGUub2Zmc2V0ICsgbm9kZS5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBvdmVyd3JpdGVTdGFydCA9IG9mZnNldCAtIGN1cnJlbnRXb3JkLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChvdmVyd3JpdGVTdGFydCA+IDAgJiYgdGV4dFtvdmVyd3JpdGVTdGFydCAtIDFdID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgb3ZlcndyaXRlU3RhcnQtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG92ZXJ3cml0ZVJhbmdlID0gUmFuZ2UuY3JlYXRlKGRvY3VtZW50LnBvc2l0aW9uQXQob3ZlcndyaXRlU3RhcnQpLCBwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1cHBvcnRzQ29tbWl0Q2hhcmFjdGVycyA9IGZhbHNlOyAvL3RoaXMuZG9lc1N1cHBvcnRzQ29tbWl0Q2hhcmFjdGVycygpOyBkaXNhYmxlZCBmb3Igbm93LCB3YWl0aW5nIGZvciBuZXcgQVBJOiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L3ZzY29kZS9pc3N1ZXMvNDI1NDRcbiAgICAgICAgdmFyIHByb3Bvc2VkID0ge307XG4gICAgICAgIHZhciBjb2xsZWN0b3IgPSB7XG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIChzdWdnZXN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gc3VnZ2VzdGlvbi5sYWJlbDtcbiAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmcgPSBwcm9wb3NlZFtsYWJlbF07XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZykge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IGxhYmVsLnJlcGxhY2UoL1tcXG5dL2csICfihrUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsLmxlbmd0aCA+IDYwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2hvcnRlbmRlZExhYmVsID0gbGFiZWwuc3Vic3RyKDAsIDU3KS50cmltKCkgKyAnLi4uJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJvcG9zZWRbc2hvcnRlbmRlZExhYmVsXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gc2hvcnRlbmRlZExhYmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdmVyd3JpdGVSYW5nZSAmJiBzdWdnZXN0aW9uLmluc2VydFRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbi50ZXh0RWRpdCA9IFRleHRFZGl0LnJlcGxhY2Uob3ZlcndyaXRlUmFuZ2UsIHN1Z2dlc3Rpb24uaW5zZXJ0VGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRzQ29tbWl0Q2hhcmFjdGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbi5jb21taXRDaGFyYWN0ZXJzID0gc3VnZ2VzdGlvbi5raW5kID09PSBDb21wbGV0aW9uSXRlbUtpbmQuUHJvcGVydHkgPyBwcm9wZXJ0eUNvbW1pdENoYXJhY3RlcnMgOiB2YWx1ZUNvbW1pdENoYXJhY3RlcnM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbi5sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgICAgICAgICAgICBwcm9wb3NlZFtsYWJlbF0gPSBzdWdnZXN0aW9uO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuaXRlbXMucHVzaChzdWdnZXN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXhpc3RpbmcuZG9jdW1lbnRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcuZG9jdW1lbnRhdGlvbiA9IHN1Z2dlc3Rpb24uZG9jdW1lbnRhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcuZGV0YWlsID0gc3VnZ2VzdGlvbi5kZXRhaWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0QXNJbmNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmlzSW5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb2c6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TnVtYmVyT2ZQcm9wb3NhbHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hU2VydmljZS5nZXRTY2hlbWFGb3JSZXNvdXJjZShkb2N1bWVudC51cmksIGRvYykudGhlbihmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICAgICAgICB2YXIgY29sbGVjdGlvblByb21pc2VzID0gW107XG4gICAgICAgICAgICB2YXIgYWRkVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRLZXkgPSAnJztcbiAgICAgICAgICAgIHZhciBjdXJyZW50UHJvcGVydHkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQudHlwZSA9PT0gJ3Byb3BlcnR5JyAmJiBwYXJlbnQua2V5Tm9kZSA9PT0gbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVmFsdWUgPSAhcGFyZW50LnZhbHVlTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9wZXJ0eSA9IHBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRLZXkgPSB0ZXh0LnN1YnN0cihub2RlLm9mZnNldCArIDEsIG5vZGUubGVuZ3RoIC0gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBwcm9wb3NhbHMgZm9yIHByb3BlcnRpZXNcbiAgICAgICAgICAgIGlmIChub2RlICYmIG5vZGUudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBzdWdnZXN0IGtleXMgd2hlbiB0aGUgY3Vyc29yIGlzIGp1c3QgYmVmb3JlIHRoZSBvcGVuaW5nIGN1cmx5IGJyYWNlXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUub2Zmc2V0ID09PSBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZG9uJ3Qgc3VnZ2VzdCBwcm9wZXJ0aWVzIHRoYXQgYXJlIGFscmVhZHkgcHJlc2VudFxuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0gbm9kZS5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRQcm9wZXJ0eSB8fCBjdXJyZW50UHJvcGVydHkgIT09IHApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3Bvc2VkW3Aua2V5Tm9kZS52YWx1ZV0gPSBDb21wbGV0aW9uSXRlbS5jcmVhdGUoJ19fJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgc2VwYXJhdG9yQWZ0ZXJfMSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChhZGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3JBZnRlcl8xID0gX3RoaXMuZXZhbHVhdGVTZXBhcmF0b3JBZnRlcihkb2N1bWVudCwgZG9jdW1lbnQub2Zmc2V0QXQob3ZlcndyaXRlUmFuZ2UuZW5kKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvcGVydHkgcHJvcG9zYWxzIHdpdGggc2NoZW1hXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmdldFByb3BlcnR5Q29tcGxldGlvbnMoc2NoZW1hLCBkb2MsIG5vZGUsIGFkZFZhbHVlLCBzZXBhcmF0b3JBZnRlcl8xLCBjb2xsZWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvcGVydHkgcHJvcG9zYWxzIHdpdGhvdXQgc2NoZW1hXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmdldFNjaGVtYUxlc3NQcm9wZXJ0eUNvbXBsZXRpb25zKGRvYywgbm9kZSwgY3VycmVudEtleSwgY29sbGVjdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uXzEgPSBQYXJzZXIuZ2V0Tm9kZVBhdGgobm9kZSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuY29udHJpYnV0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChjb250cmlidXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxlY3RQcm9taXNlID0gY29udHJpYnV0aW9uLmNvbGxlY3RQcm9wZXJ0eUNvbXBsZXRpb25zKGRvY3VtZW50LnVyaSwgbG9jYXRpb25fMSwgY3VycmVudFdvcmQsIGFkZFZhbHVlLCBzZXBhcmF0b3JBZnRlcl8xID09PSAnJywgY29sbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbGxlY3RQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uUHJvbWlzZXMucHVzaChjb2xsZWN0UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoKCFzY2hlbWEgJiYgY3VycmVudFdvcmQubGVuZ3RoID4gMCAmJiB0ZXh0LmNoYXJBdChvZmZzZXQgLSBjdXJyZW50V29yZC5sZW5ndGggLSAxKSAhPT0gJ1wiJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBraW5kOiBDb21wbGV0aW9uSXRlbUtpbmQuUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogX3RoaXMuZ2V0TGFiZWxGb3JWYWx1ZShjdXJyZW50V29yZCksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0OiBfdGhpcy5nZXRJbnNlcnRUZXh0Rm9yUHJvcGVydHkoY3VycmVudFdvcmQsIHVuZGVmaW5lZCwgZmFsc2UsIHNlcGFyYXRvckFmdGVyXzEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0VGV4dEZvcm1hdDogSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0LCBkb2N1bWVudGF0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rvci5zZXRBc0luY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBwcm9wb3NhbHMgZm9yIHZhbHVlc1xuICAgICAgICAgICAgdmFyIHR5cGVzID0ge307XG4gICAgICAgICAgICBpZiAoc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgLy8gdmFsdWUgcHJvcG9zYWxzIHdpdGggc2NoZW1hXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0VmFsdWVDb21wbGV0aW9ucyhzY2hlbWEsIGRvYywgbm9kZSwgb2Zmc2V0LCBkb2N1bWVudCwgY29sbGVjdG9yLCB0eXBlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB2YWx1ZSBwcm9wb3NhbHMgd2l0aG91dCBzY2hlbWFcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRTY2hlbWFMZXNzVmFsdWVDb21wbGV0aW9ucyhkb2MsIG5vZGUsIG9mZnNldCwgZG9jdW1lbnQsIGNvbGxlY3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMuY29udHJpYnV0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0Q29udHJpYnV0ZWRWYWx1ZUNvbXBsZXRpb25zKGRvYywgbm9kZSwgb2Zmc2V0LCBkb2N1bWVudCwgY29sbGVjdG9yLCBjb2xsZWN0aW9uUHJvbWlzZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnByb21pc2VDb25zdHJ1Y3Rvci5hbGwoY29sbGVjdGlvblByb21pc2VzKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sbGVjdG9yLmdldE51bWJlck9mUHJvcG9zYWxzKCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldEZvclNlcGFyYXRvciA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgJiYgKG5vZGUudHlwZSA9PT0gJ3N0cmluZycgfHwgbm9kZS50eXBlID09PSAnbnVtYmVyJyB8fCBub2RlLnR5cGUgPT09ICdib29sZWFuJyB8fCBub2RlLnR5cGUgPT09ICdudWxsJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldEZvclNlcGFyYXRvciA9IG5vZGUub2Zmc2V0ICsgbm9kZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlcGFyYXRvckFmdGVyID0gX3RoaXMuZXZhbHVhdGVTZXBhcmF0b3JBZnRlcihkb2N1bWVudCwgb2Zmc2V0Rm9yU2VwYXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkRmlsbGVyVmFsdWVDb21wbGV0aW9ucyh0eXBlcywgc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZ2V0UHJvcGVydHlDb21wbGV0aW9ucyA9IGZ1bmN0aW9uIChzY2hlbWEsIGRvYywgbm9kZSwgYWRkVmFsdWUsIHNlcGFyYXRvckFmdGVyLCBjb2xsZWN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG1hdGNoaW5nU2NoZW1hcyA9IGRvYy5nZXRNYXRjaGluZ1NjaGVtYXMoc2NoZW1hLnNjaGVtYSwgbm9kZS5vZmZzZXQpO1xuICAgICAgICBtYXRjaGluZ1NjaGVtYXMuZm9yRWFjaChmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgaWYgKHMubm9kZSA9PT0gbm9kZSAmJiAhcy5pbnZlcnRlZCkge1xuICAgICAgICAgICAgICAgIHZhciBzY2hlbWFQcm9wZXJ0aWVzXzEgPSBzLnNjaGVtYS5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgICAgIGlmIChzY2hlbWFQcm9wZXJ0aWVzXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoc2NoZW1hUHJvcGVydGllc18xKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eVNjaGVtYSA9IHNjaGVtYVByb3BlcnRpZXNfMVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eVNjaGVtYSA9PT0gJ29iamVjdCcgJiYgIXByb3BlcnR5U2NoZW1hLmRlcHJlY2F0aW9uTWVzc2FnZSAmJiAhcHJvcGVydHlTY2hlbWEuZG9Ob3RTdWdnZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3Bvc2FsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kOiBDb21wbGV0aW9uSXRlbUtpbmQuUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydFRleHQ6IF90aGlzLmdldEluc2VydFRleHRGb3JQcm9wZXJ0eShrZXksIHByb3BlcnR5U2NoZW1hLCBhZGRWYWx1ZSwgc2VwYXJhdG9yQWZ0ZXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0Rm9ybWF0OiBJbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclRleHQ6IF90aGlzLmdldEZpbHRlclRleHRGb3JWYWx1ZShrZXkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudGF0aW9uOiBfdGhpcy5mcm9tTWFya3VwKHByb3BlcnR5U2NoZW1hLm1hcmtkb3duRGVzY3JpcHRpb24pIHx8IHByb3BlcnR5U2NoZW1hLmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5U2NoZW1hLnN1Z2dlc3RTb3J0VGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3Bvc2FsLnNvcnRUZXh0ID0gcHJvcGVydHlTY2hlbWEuc3VnZ2VzdFNvcnRUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcG9zYWwuaW5zZXJ0VGV4dCAmJiBlbmRzV2l0aChwcm9wb3NhbC5pbnNlcnRUZXh0LCBcIiQxXCIgKyBzZXBhcmF0b3JBZnRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcG9zYWwuY29tbWFuZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VnZ2VzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAnZWRpdG9yLmFjdGlvbi50cmlnZ2VyU3VnZ2VzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdG9yLmFkZChwcm9wb3NhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2NoZW1hUHJvcGVydHlOYW1lc18xID0gcy5zY2hlbWEucHJvcGVydHlOYW1lcztcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNjaGVtYVByb3BlcnR5TmFtZXNfMSA9PT0gJ29iamVjdCcgJiYgIXNjaGVtYVByb3BlcnR5TmFtZXNfMS5kZXByZWNhdGlvbk1lc3NhZ2UgJiYgIXNjaGVtYVByb3BlcnR5TmFtZXNfMS5kb05vdFN1Z2dlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5TmFtZUNvbXBsZXRpb25JdGVtID0gZnVuY3Rpb24gKG5hbWUsIGVudW1EZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudW1EZXNjcmlwdGlvbiA9PT0gdm9pZCAwKSB7IGVudW1EZXNjcmlwdGlvbiA9IHVuZGVmaW5lZDsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3Bvc2FsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQ6IENvbXBsZXRpb25JdGVtS2luZC5Qcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0OiBfdGhpcy5nZXRJbnNlcnRUZXh0Rm9yUHJvcGVydHkobmFtZSwgdW5kZWZpbmVkLCBhZGRWYWx1ZSwgc2VwYXJhdG9yQWZ0ZXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydFRleHRGb3JtYXQ6IEluc2VydFRleHRGb3JtYXQuU25pcHBldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0OiBfdGhpcy5nZXRGaWx0ZXJUZXh0Rm9yVmFsdWUobmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogZW51bURlc2NyaXB0aW9uIHx8IF90aGlzLmZyb21NYXJrdXAoc2NoZW1hUHJvcGVydHlOYW1lc18xLm1hcmtkb3duRGVzY3JpcHRpb24pIHx8IHNjaGVtYVByb3BlcnR5TmFtZXNfMS5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hUHJvcGVydHlOYW1lc18xLnN1Z2dlc3RTb3J0VGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcG9zYWwuc29ydFRleHQgPSBzY2hlbWFQcm9wZXJ0eU5hbWVzXzEuc3VnZ2VzdFNvcnRUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3Bvc2FsLmluc2VydFRleHQgJiYgZW5kc1dpdGgocHJvcG9zYWwuaW5zZXJ0VGV4dCwgXCIkMVwiICsgc2VwYXJhdG9yQWZ0ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcG9zYWwuY29tbWFuZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTdWdnZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ2VkaXRvci5hY3Rpb24udHJpZ2dlclN1Z2dlc3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rvci5hZGQocHJvcG9zYWwpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hUHJvcGVydHlOYW1lc18xLmVudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NoZW1hUHJvcGVydHlOYW1lc18xLmVudW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW51bURlc2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWFQcm9wZXJ0eU5hbWVzXzEubWFya2Rvd25FbnVtRGVzY3JpcHRpb25zICYmIGkgPCBzY2hlbWFQcm9wZXJ0eU5hbWVzXzEubWFya2Rvd25FbnVtRGVzY3JpcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnVtRGVzY3JpcHRpb24gPSBfdGhpcy5mcm9tTWFya3VwKHNjaGVtYVByb3BlcnR5TmFtZXNfMS5tYXJrZG93bkVudW1EZXNjcmlwdGlvbnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzY2hlbWFQcm9wZXJ0eU5hbWVzXzEuZW51bURlc2NyaXB0aW9ucyAmJiBpIDwgc2NoZW1hUHJvcGVydHlOYW1lc18xLmVudW1EZXNjcmlwdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1EZXNjcmlwdGlvbiA9IHNjaGVtYVByb3BlcnR5TmFtZXNfMS5lbnVtRGVzY3JpcHRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWVDb21wbGV0aW9uSXRlbShzY2hlbWFQcm9wZXJ0eU5hbWVzXzEuZW51bVtpXSwgZW51bURlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hUHJvcGVydHlOYW1lc18xLmNvbnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWVDb21wbGV0aW9uSXRlbShzY2hlbWFQcm9wZXJ0eU5hbWVzXzEuY29uc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5nZXRTY2hlbWFMZXNzUHJvcGVydHlDb21wbGV0aW9ucyA9IGZ1bmN0aW9uIChkb2MsIG5vZGUsIGN1cnJlbnRLZXksIGNvbGxlY3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY29sbGVjdENvbXBsZXRpb25zRm9yU2ltaWxhck9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIG9iai5wcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gcC5rZXlOb2RlLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rvci5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBraW5kOiBDb21wbGV0aW9uSXRlbUtpbmQuUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBrZXksXG4gICAgICAgICAgICAgICAgICAgIGluc2VydFRleHQ6IF90aGlzLmdldEluc2VydFRleHRGb3JWYWx1ZShrZXksICcnKSxcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0VGV4dEZvcm1hdDogSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0LFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0OiBfdGhpcy5nZXRGaWx0ZXJUZXh0Rm9yVmFsdWUoa2V5KSxcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnBhcmVudC50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIG9iamVjdCBpcyBhIHByb3BlcnR5IHZhbHVlLCBjaGVjayB0aGUgdHJlZSBmb3Igb3RoZXIgb2JqZWN0cyB0aGF0IGhhbmcgdW5kZXIgYSBwcm9wZXJ0eSBvZiB0aGUgc2FtZSBuYW1lXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudEtleV8xID0gbm9kZS5wYXJlbnQua2V5Tm9kZS52YWx1ZTtcbiAgICAgICAgICAgICAgICBkb2MudmlzaXQoZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4udHlwZSA9PT0gJ3Byb3BlcnR5JyAmJiBuICE9PSBub2RlLnBhcmVudCAmJiBuLmtleU5vZGUudmFsdWUgPT09IHBhcmVudEtleV8xICYmIG4udmFsdWVOb2RlICYmIG4udmFsdWVOb2RlLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0Q29tcGxldGlvbnNGb3JTaW1pbGFyT2JqZWN0KG4udmFsdWVOb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUucGFyZW50LnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgb2JqZWN0IGlzIGluIGFuIGFycmF5LCB1c2UgYWxsIG90aGVyIGFycmF5IGVsZW1lbnRzIGFzIHNpbWlsYXIgb2JqZWN0c1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50Lml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4udHlwZSA9PT0gJ29iamVjdCcgJiYgbiAhPT0gbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdENvbXBsZXRpb25zRm9yU2ltaWxhck9iamVjdChuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbGxlY3Rvci5hZGQoe1xuICAgICAgICAgICAgICAgIGtpbmQ6IENvbXBsZXRpb25JdGVtS2luZC5Qcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBsYWJlbDogJyRzY2hlbWEnLFxuICAgICAgICAgICAgICAgIGluc2VydFRleHQ6IHRoaXMuZ2V0SW5zZXJ0VGV4dEZvclByb3BlcnR5KCckc2NoZW1hJywgdW5kZWZpbmVkLCB0cnVlLCAnJyksXG4gICAgICAgICAgICAgICAgaW5zZXJ0VGV4dEZvcm1hdDogSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0LCBkb2N1bWVudGF0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0OiB0aGlzLmdldEZpbHRlclRleHRGb3JWYWx1ZShcIiRzY2hlbWFcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZ2V0U2NoZW1hTGVzc1ZhbHVlQ29tcGxldGlvbnMgPSBmdW5jdGlvbiAoZG9jLCBub2RlLCBvZmZzZXQsIGRvY3VtZW50LCBjb2xsZWN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG9mZnNldEZvclNlcGFyYXRvciA9IG9mZnNldDtcbiAgICAgICAgaWYgKG5vZGUgJiYgKG5vZGUudHlwZSA9PT0gJ3N0cmluZycgfHwgbm9kZS50eXBlID09PSAnbnVtYmVyJyB8fCBub2RlLnR5cGUgPT09ICdib29sZWFuJyB8fCBub2RlLnR5cGUgPT09ICdudWxsJykpIHtcbiAgICAgICAgICAgIG9mZnNldEZvclNlcGFyYXRvciA9IG5vZGUub2Zmc2V0ICsgbm9kZS5sZW5ndGg7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICBjb2xsZWN0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBraW5kOiB0aGlzLmdldFN1Z2dlc3Rpb25LaW5kKCdvYmplY3QnKSxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0VtcHR5IG9iamVjdCcsXG4gICAgICAgICAgICAgICAgaW5zZXJ0VGV4dDogdGhpcy5nZXRJbnNlcnRUZXh0Rm9yVmFsdWUoe30sICcnKSxcbiAgICAgICAgICAgICAgICBpbnNlcnRUZXh0Rm9ybWF0OiBJbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXQsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29sbGVjdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAga2luZDogdGhpcy5nZXRTdWdnZXN0aW9uS2luZCgnYXJyYXknKSxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0VtcHR5IGFycmF5JyxcbiAgICAgICAgICAgICAgICBpbnNlcnRUZXh0OiB0aGlzLmdldEluc2VydFRleHRGb3JWYWx1ZShbXSwgJycpLFxuICAgICAgICAgICAgICAgIGluc2VydFRleHRGb3JtYXQ6IEluc2VydFRleHRGb3JtYXQuU25pcHBldCxcbiAgICAgICAgICAgICAgICBkb2N1bWVudGF0aW9uOiAnJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlcGFyYXRvckFmdGVyID0gdGhpcy5ldmFsdWF0ZVNlcGFyYXRvckFmdGVyKGRvY3VtZW50LCBvZmZzZXRGb3JTZXBhcmF0b3IpO1xuICAgICAgICB2YXIgY29sbGVjdFN1Z2dlc3Rpb25zRm9yVmFsdWVzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUucGFyZW50ICYmICFQYXJzZXIuY29udGFpbnModmFsdWUucGFyZW50LCBvZmZzZXQsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgY29sbGVjdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6IF90aGlzLmdldFN1Z2dlc3Rpb25LaW5kKHZhbHVlLnR5cGUpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogX3RoaXMuZ2V0TGFiZWxUZXh0Rm9yTWF0Y2hpbmdOb2RlKHZhbHVlLCBkb2N1bWVudCksXG4gICAgICAgICAgICAgICAgICAgIGluc2VydFRleHQ6IF90aGlzLmdldEluc2VydFRleHRGb3JNYXRjaGluZ05vZGUodmFsdWUsIGRvY3VtZW50LCBzZXBhcmF0b3JBZnRlciksXG4gICAgICAgICAgICAgICAgICAgIGluc2VydFRleHRGb3JtYXQ6IEluc2VydFRleHRGb3JtYXQuU25pcHBldCwgZG9jdW1lbnRhdGlvbjogJydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hZGRCb29sZWFuVmFsdWVDb21wbGV0aW9uKCF2YWx1ZS52YWx1ZSwgc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiAobm9kZS5jb2xvbk9mZnNldCB8fCAwKSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZU5vZGUgPSBub2RlLnZhbHVlTm9kZTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVOb2RlICYmIChvZmZzZXQgPiAodmFsdWVOb2RlLm9mZnNldCArIHZhbHVlTm9kZS5sZW5ndGgpIHx8IHZhbHVlTm9kZS50eXBlID09PSAnb2JqZWN0JyB8fCB2YWx1ZU5vZGUudHlwZSA9PT0gJ2FycmF5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzdWdnZXN0IHZhbHVlcyBhdCB0aGUgc2FtZSBrZXlcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50S2V5XzIgPSBub2RlLmtleU5vZGUudmFsdWU7XG4gICAgICAgICAgICAgICAgZG9jLnZpc2l0KGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuLnR5cGUgPT09ICdwcm9wZXJ0eScgJiYgbi5rZXlOb2RlLnZhbHVlID09PSBwYXJlbnRLZXlfMiAmJiBuLnZhbHVlTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdFN1Z2dlc3Rpb25zRm9yVmFsdWVzKG4udmFsdWVOb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50S2V5XzIgPT09ICckc2NoZW1hJyAmJiBub2RlLnBhcmVudCAmJiAhbm9kZS5wYXJlbnQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRG9sbGFyU2NoZW1hQ29tcGxldGlvbnMoc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnBhcmVudCAmJiBub2RlLnBhcmVudC50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICAgICAgLy8gc3VnZ2VzdCBpdGVtcyBvZiBhbiBhcnJheSBhdCB0aGUgc2FtZSBrZXlcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50S2V5XzMgPSBub2RlLnBhcmVudC5rZXlOb2RlLnZhbHVlO1xuICAgICAgICAgICAgICAgIGRvYy52aXNpdChmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobi50eXBlID09PSAncHJvcGVydHknICYmIG4ua2V5Tm9kZS52YWx1ZSA9PT0gcGFyZW50S2V5XzMgJiYgbi52YWx1ZU5vZGUgJiYgbi52YWx1ZU5vZGUudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbi52YWx1ZU5vZGUuaXRlbXMuZm9yRWFjaChjb2xsZWN0U3VnZ2VzdGlvbnNGb3JWYWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc3VnZ2VzdCBpdGVtcyBpbiB0aGUgc2FtZSBhcnJheVxuICAgICAgICAgICAgICAgIG5vZGUuaXRlbXMuZm9yRWFjaChjb2xsZWN0U3VnZ2VzdGlvbnNGb3JWYWx1ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZ2V0VmFsdWVDb21wbGV0aW9ucyA9IGZ1bmN0aW9uIChzY2hlbWEsIGRvYywgbm9kZSwgb2Zmc2V0LCBkb2N1bWVudCwgY29sbGVjdG9yLCB0eXBlcykge1xuICAgICAgICB2YXIgb2Zmc2V0Rm9yU2VwYXJhdG9yID0gb2Zmc2V0O1xuICAgICAgICB2YXIgcGFyZW50S2V5ID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgdmFsdWVOb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAobm9kZSAmJiAobm9kZS50eXBlID09PSAnc3RyaW5nJyB8fCBub2RlLnR5cGUgPT09ICdudW1iZXInIHx8IG5vZGUudHlwZSA9PT0gJ2Jvb2xlYW4nIHx8IG5vZGUudHlwZSA9PT0gJ251bGwnKSkge1xuICAgICAgICAgICAgb2Zmc2V0Rm9yU2VwYXJhdG9yID0gbm9kZS5vZmZzZXQgKyBub2RlLmxlbmd0aDtcbiAgICAgICAgICAgIHZhbHVlTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFNjaGVtYVZhbHVlQ29tcGxldGlvbnMoc2NoZW1hLnNjaGVtYSwgJycsIGNvbGxlY3RvciwgdHlwZXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICgobm9kZS50eXBlID09PSAncHJvcGVydHknKSAmJiBvZmZzZXQgPiAobm9kZS5jb2xvbk9mZnNldCB8fCAwKSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlTm9kZV8xID0gbm9kZS52YWx1ZU5vZGU7XG4gICAgICAgICAgICBpZiAodmFsdWVOb2RlXzEgJiYgb2Zmc2V0ID4gKHZhbHVlTm9kZV8xLm9mZnNldCArIHZhbHVlTm9kZV8xLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHdlIGFyZSBwYXN0IHRoZSB2YWx1ZSBub2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnRLZXkgPSBub2RlLmtleU5vZGUudmFsdWU7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgJiYgKHBhcmVudEtleSAhPT0gdW5kZWZpbmVkIHx8IG5vZGUudHlwZSA9PT0gJ2FycmF5JykpIHtcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3JBZnRlciA9IHRoaXMuZXZhbHVhdGVTZXBhcmF0b3JBZnRlcihkb2N1bWVudCwgb2Zmc2V0Rm9yU2VwYXJhdG9yKTtcbiAgICAgICAgICAgIHZhciBtYXRjaGluZ1NjaGVtYXMgPSBkb2MuZ2V0TWF0Y2hpbmdTY2hlbWFzKHNjaGVtYS5zY2hlbWEsIG5vZGUub2Zmc2V0LCB2YWx1ZU5vZGUpO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBtYXRjaGluZ1NjaGVtYXNfMSA9IG1hdGNoaW5nU2NoZW1hczsgX2kgPCBtYXRjaGluZ1NjaGVtYXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG1hdGNoaW5nU2NoZW1hc18xW19pXTtcbiAgICAgICAgICAgICAgICBpZiAocy5ub2RlID09PSBub2RlICYmICFzLmludmVydGVkICYmIHMuc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdhcnJheScgJiYgcy5zY2hlbWEuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHMuc2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZmluZEl0ZW1BdE9mZnNldChub2RlLCBkb2N1bWVudCwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBzLnNjaGVtYS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTY2hlbWFWYWx1ZUNvbXBsZXRpb25zKHMuc2NoZW1hLml0ZW1zW2luZGV4XSwgc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3RvciwgdHlwZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NoZW1hVmFsdWVDb21wbGV0aW9ucyhzLnNjaGVtYS5pdGVtcywgc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3RvciwgdHlwZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5TWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuc2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlTY2hlbWEgPSBzLnNjaGVtYS5wcm9wZXJ0aWVzW3BhcmVudEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5U2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NoZW1hVmFsdWVDb21wbGV0aW9ucyhwcm9wZXJ0eVNjaGVtYSwgc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3RvciwgdHlwZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcyAmJiAhcHJvcGVydHlNYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBfYiA9IE9iamVjdC5rZXlzKHMuc2NoZW1hLnBhdHRlcm5Qcm9wZXJ0aWVzKTsgX2EgPCBfYi5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSBfYltfYV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAocGF0dGVybik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdleC50ZXN0KHBhcmVudEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlTY2hlbWEgPSBzLnNjaGVtYS5wYXR0ZXJuUHJvcGVydGllc1twYXR0ZXJuXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NoZW1hVmFsdWVDb21wbGV0aW9ucyhwcm9wZXJ0eVNjaGVtYSwgc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3RvciwgdHlwZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICYmICFwcm9wZXJ0eU1hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlTY2hlbWEgPSBzLnNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNjaGVtYVZhbHVlQ29tcGxldGlvbnMocHJvcGVydHlTY2hlbWEsIHNlcGFyYXRvckFmdGVyLCBjb2xsZWN0b3IsIHR5cGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnRLZXkgPT09ICckc2NoZW1hJyAmJiAhbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZERvbGxhclNjaGVtYUNvbXBsZXRpb25zKHNlcGFyYXRvckFmdGVyLCBjb2xsZWN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVzWydib29sZWFuJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJvb2xlYW5WYWx1ZUNvbXBsZXRpb24odHJ1ZSwgc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3Rvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCb29sZWFuVmFsdWVDb21wbGV0aW9uKGZhbHNlLCBzZXBhcmF0b3JBZnRlciwgY29sbGVjdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlc1snbnVsbCddKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGROdWxsVmFsdWVDb21wbGV0aW9uKHNlcGFyYXRvckFmdGVyLCBjb2xsZWN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZ2V0Q29udHJpYnV0ZWRWYWx1ZUNvbXBsZXRpb25zID0gZnVuY3Rpb24gKGRvYywgbm9kZSwgb2Zmc2V0LCBkb2N1bWVudCwgY29sbGVjdG9yLCBjb2xsZWN0aW9uUHJvbWlzZXMpIHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyaWJ1dGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoY29udHJpYnV0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbGxlY3RQcm9taXNlID0gY29udHJpYnV0aW9uLmNvbGxlY3REZWZhdWx0Q29tcGxldGlvbnMoZG9jdW1lbnQudXJpLCBjb2xsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGlmIChjb2xsZWN0UHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uUHJvbWlzZXMucHVzaChjb2xsZWN0UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnc3RyaW5nJyB8fCBub2RlLnR5cGUgPT09ICdudW1iZXInIHx8IG5vZGUudHlwZSA9PT0gJ2Jvb2xlYW4nIHx8IG5vZGUudHlwZSA9PT0gJ251bGwnKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUgJiYgKG5vZGUudHlwZSA9PT0gJ3Byb3BlcnR5JykgJiYgb2Zmc2V0ID4gKG5vZGUuY29sb25PZmZzZXQgfHwgMCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50S2V5XzQgPSBub2RlLmtleU5vZGUudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlTm9kZSA9IG5vZGUudmFsdWVOb2RlO1xuICAgICAgICAgICAgICAgIGlmICgoIXZhbHVlTm9kZSB8fCBvZmZzZXQgPD0gKHZhbHVlTm9kZS5vZmZzZXQgKyB2YWx1ZU5vZGUubGVuZ3RoKSkgJiYgbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uXzIgPSBQYXJzZXIuZ2V0Tm9kZVBhdGgobm9kZS5wYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyaWJ1dGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoY29udHJpYnV0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGVjdFByb21pc2UgPSBjb250cmlidXRpb24uY29sbGVjdFZhbHVlQ29tcGxldGlvbnMoZG9jdW1lbnQudXJpLCBsb2NhdGlvbl8yLCBwYXJlbnRLZXlfNCwgY29sbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xsZWN0UHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25Qcm9taXNlcy5wdXNoKGNvbGxlY3RQcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuYWRkU2NoZW1hVmFsdWVDb21wbGV0aW9ucyA9IGZ1bmN0aW9uIChzY2hlbWEsIHNlcGFyYXRvckFmdGVyLCBjb2xsZWN0b3IsIHR5cGVzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5hZGRFbnVtVmFsdWVDb21wbGV0aW9ucyhzY2hlbWEsIHNlcGFyYXRvckFmdGVyLCBjb2xsZWN0b3IpO1xuICAgICAgICAgICAgdGhpcy5hZGREZWZhdWx0VmFsdWVDb21wbGV0aW9ucyhzY2hlbWEsIHNlcGFyYXRvckFmdGVyLCBjb2xsZWN0b3IpO1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0VHlwZXMoc2NoZW1hLCB0eXBlcyk7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuYWxsT2YpKSB7XG4gICAgICAgICAgICAgICAgc2NoZW1hLmFsbE9mLmZvckVhY2goZnVuY3Rpb24gKHMpIHsgcmV0dXJuIF90aGlzLmFkZFNjaGVtYVZhbHVlQ29tcGxldGlvbnMocywgc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3RvciwgdHlwZXMpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5hbnlPZikpIHtcbiAgICAgICAgICAgICAgICBzY2hlbWEuYW55T2YuZm9yRWFjaChmdW5jdGlvbiAocykgeyByZXR1cm4gX3RoaXMuYWRkU2NoZW1hVmFsdWVDb21wbGV0aW9ucyhzLCBzZXBhcmF0b3JBZnRlciwgY29sbGVjdG9yLCB0eXBlcyk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLm9uZU9mKSkge1xuICAgICAgICAgICAgICAgIHNjaGVtYS5vbmVPZi5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7IHJldHVybiBfdGhpcy5hZGRTY2hlbWFWYWx1ZUNvbXBsZXRpb25zKHMsIHNlcGFyYXRvckFmdGVyLCBjb2xsZWN0b3IsIHR5cGVzKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5hZGREZWZhdWx0VmFsdWVDb21wbGV0aW9ucyA9IGZ1bmN0aW9uIChzY2hlbWEsIHNlcGFyYXRvckFmdGVyLCBjb2xsZWN0b3IsIGFycmF5RGVwdGgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGFycmF5RGVwdGggPT09IHZvaWQgMCkgeyBhcnJheURlcHRoID0gMDsgfVxuICAgICAgICB2YXIgaGFzUHJvcG9zYWxzID0gZmFsc2U7XG4gICAgICAgIGlmIChpc0RlZmluZWQoc2NoZW1hLmRlZmF1bHQpKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IHNjaGVtYS50eXBlO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gc2NoZW1hLmRlZmF1bHQ7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gYXJyYXlEZXB0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgICAgICAgICAgICB0eXBlID0gJ2FycmF5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbGxlY3Rvci5hZGQoe1xuICAgICAgICAgICAgICAgIGtpbmQ6IHRoaXMuZ2V0U3VnZ2VzdGlvbktpbmQodHlwZSksXG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMuZ2V0TGFiZWxGb3JWYWx1ZSh2YWx1ZSksXG4gICAgICAgICAgICAgICAgaW5zZXJ0VGV4dDogdGhpcy5nZXRJbnNlcnRUZXh0Rm9yVmFsdWUodmFsdWUsIHNlcGFyYXRvckFmdGVyKSxcbiAgICAgICAgICAgICAgICBpbnNlcnRUZXh0Rm9ybWF0OiBJbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXQsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiBsb2NhbGl6ZSgnanNvbi5zdWdnZXN0LmRlZmF1bHQnLCAnRGVmYXVsdCB2YWx1ZScpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGhhc1Byb3Bvc2FscyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLmV4YW1wbGVzKSkge1xuICAgICAgICAgICAgc2NoZW1hLmV4YW1wbGVzLmZvckVhY2goZnVuY3Rpb24gKGV4YW1wbGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHNjaGVtYS50eXBlO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGV4YW1wbGU7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGFycmF5RGVwdGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ2FycmF5JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sbGVjdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6IF90aGlzLmdldFN1Z2dlc3Rpb25LaW5kKHR5cGUpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogX3RoaXMuZ2V0TGFiZWxGb3JWYWx1ZSh2YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIGluc2VydFRleHQ6IF90aGlzLmdldEluc2VydFRleHRGb3JWYWx1ZSh2YWx1ZSwgc2VwYXJhdG9yQWZ0ZXIpLFxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0Rm9ybWF0OiBJbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBoYXNQcm9wb3NhbHMgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLmRlZmF1bHRTbmlwcGV0cykpIHtcbiAgICAgICAgICAgIHNjaGVtYS5kZWZhdWx0U25pcHBldHMuZm9yRWFjaChmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gc2NoZW1hLnR5cGU7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcy5ib2R5O1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHMubGFiZWw7XG4gICAgICAgICAgICAgICAgdmFyIGluc2VydFRleHQ7XG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlclRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGVfMSA9IHNjaGVtYS50eXBlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gYXJyYXlEZXB0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZV8xID0gJ2FycmF5JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0ID0gX3RoaXMuZ2V0SW5zZXJ0VGV4dEZvclNuaXBwZXRWYWx1ZSh2YWx1ZSwgc2VwYXJhdG9yQWZ0ZXIpO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0ID0gX3RoaXMuZ2V0RmlsdGVyVGV4dEZvclNuaXBwZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gbGFiZWwgfHwgX3RoaXMuZ2V0TGFiZWxGb3JTbmlwcGV0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygcy5ib2R5VGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZWZpeCA9ICcnLCBzdWZmaXggPSAnJywgaW5kZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBhcnJheURlcHRoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXggPSBwcmVmaXggKyBpbmRlbnQgKyAnW1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWZmaXggPSBzdWZmaXggKyAnXFxuJyArIGluZGVudCArICddJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGVudCArPSAnXFx0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnYXJyYXknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluc2VydFRleHQgPSBwcmVmaXggKyBpbmRlbnQgKyBzLmJvZHlUZXh0LnNwbGl0KCdcXG4nKS5qb2luKCdcXG4nICsgaW5kZW50KSArIHN1ZmZpeCArIHNlcGFyYXRvckFmdGVyO1xuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IGxhYmVsIHx8IGluc2VydFRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0ID0gaW5zZXJ0VGV4dC5yZXBsYWNlKC9bXFxuXS9nLCAnJyk7IC8vIHJlbW92ZSBuZXcgbGluZXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sbGVjdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6IF90aGlzLmdldFN1Z2dlc3Rpb25LaW5kKHR5cGUpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50YXRpb246IF90aGlzLmZyb21NYXJrdXAocy5tYXJrZG93bkRlc2NyaXB0aW9uKSB8fCBzLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0OiBpbnNlcnRUZXh0LFxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0Rm9ybWF0OiBJbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXQsXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclRleHQ6IGZpbHRlclRleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBoYXNQcm9wb3NhbHMgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoYXNQcm9wb3NhbHMgJiYgdHlwZW9mIHNjaGVtYS5pdGVtcyA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSAmJiBhcnJheURlcHRoIDwgNSAvKiBiZXdhcmUgb2YgcmVjdXJzaW9uICovKSB7XG4gICAgICAgICAgICB0aGlzLmFkZERlZmF1bHRWYWx1ZUNvbXBsZXRpb25zKHNjaGVtYS5pdGVtcywgc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3RvciwgYXJyYXlEZXB0aCArIDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuYWRkRW51bVZhbHVlQ29tcGxldGlvbnMgPSBmdW5jdGlvbiAoc2NoZW1hLCBzZXBhcmF0b3JBZnRlciwgY29sbGVjdG9yKSB7XG4gICAgICAgIGlmIChpc0RlZmluZWQoc2NoZW1hLmNvbnN0KSkge1xuICAgICAgICAgICAgY29sbGVjdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAga2luZDogdGhpcy5nZXRTdWdnZXN0aW9uS2luZChzY2hlbWEudHlwZSksXG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMuZ2V0TGFiZWxGb3JWYWx1ZShzY2hlbWEuY29uc3QpLFxuICAgICAgICAgICAgICAgIGluc2VydFRleHQ6IHRoaXMuZ2V0SW5zZXJ0VGV4dEZvclZhbHVlKHNjaGVtYS5jb25zdCwgc2VwYXJhdG9yQWZ0ZXIpLFxuICAgICAgICAgICAgICAgIGluc2VydFRleHRGb3JtYXQ6IEluc2VydFRleHRGb3JtYXQuU25pcHBldCxcbiAgICAgICAgICAgICAgICBkb2N1bWVudGF0aW9uOiB0aGlzLmZyb21NYXJrdXAoc2NoZW1hLm1hcmtkb3duRGVzY3JpcHRpb24pIHx8IHNjaGVtYS5kZXNjcmlwdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLmVudW0pKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gc2NoZW1hLmVudW0ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5tID0gc2NoZW1hLmVudW1baV07XG4gICAgICAgICAgICAgICAgdmFyIGRvY3VtZW50YXRpb24gPSB0aGlzLmZyb21NYXJrdXAoc2NoZW1hLm1hcmtkb3duRGVzY3JpcHRpb24pIHx8IHNjaGVtYS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoc2NoZW1hLm1hcmtkb3duRW51bURlc2NyaXB0aW9ucyAmJiBpIDwgc2NoZW1hLm1hcmtkb3duRW51bURlc2NyaXB0aW9ucy5sZW5ndGggJiYgdGhpcy5kb2VzU3VwcG9ydE1hcmtkb3duKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRhdGlvbiA9IHRoaXMuZnJvbU1hcmt1cChzY2hlbWEubWFya2Rvd25FbnVtRGVzY3JpcHRpb25zW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NoZW1hLmVudW1EZXNjcmlwdGlvbnMgJiYgaSA8IHNjaGVtYS5lbnVtRGVzY3JpcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudGF0aW9uID0gc2NoZW1hLmVudW1EZXNjcmlwdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbGxlY3Rvci5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBraW5kOiB0aGlzLmdldFN1Z2dlc3Rpb25LaW5kKHNjaGVtYS50eXBlKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMuZ2V0TGFiZWxGb3JWYWx1ZShlbm0pLFxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0OiB0aGlzLmdldEluc2VydFRleHRGb3JWYWx1ZShlbm0sIHNlcGFyYXRvckFmdGVyKSxcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0VGV4dEZvcm1hdDogSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0LFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudGF0aW9uOiBkb2N1bWVudGF0aW9uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5jb2xsZWN0VHlwZXMgPSBmdW5jdGlvbiAoc2NoZW1hLCB0eXBlcykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkgfHwgaXNEZWZpbmVkKHNjaGVtYS5jb25zdCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHlwZSA9IHNjaGVtYS50eXBlO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgICAgICAgICAgdHlwZS5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7IHJldHVybiB0eXBlc1t0XSA9IHRydWU7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIHR5cGVzW3R5cGVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgSlNPTkNvbXBsZXRpb24ucHJvdG90eXBlLmFkZEZpbGxlclZhbHVlQ29tcGxldGlvbnMgPSBmdW5jdGlvbiAodHlwZXMsIHNlcGFyYXRvckFmdGVyLCBjb2xsZWN0b3IpIHtcbiAgICAgICAgaWYgKHR5cGVzWydvYmplY3QnXSkge1xuICAgICAgICAgICAgY29sbGVjdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAga2luZDogdGhpcy5nZXRTdWdnZXN0aW9uS2luZCgnb2JqZWN0JyksXG4gICAgICAgICAgICAgICAgbGFiZWw6ICd7fScsXG4gICAgICAgICAgICAgICAgaW5zZXJ0VGV4dDogdGhpcy5nZXRJbnNlcnRUZXh0Rm9yR3Vlc3NlZFZhbHVlKHt9LCBzZXBhcmF0b3JBZnRlciksXG4gICAgICAgICAgICAgICAgaW5zZXJ0VGV4dEZvcm1hdDogSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0LFxuICAgICAgICAgICAgICAgIGRldGFpbDogbG9jYWxpemUoJ2RlZmF1bHRzLm9iamVjdCcsICdOZXcgb2JqZWN0JyksXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlc1snYXJyYXknXSkge1xuICAgICAgICAgICAgY29sbGVjdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAga2luZDogdGhpcy5nZXRTdWdnZXN0aW9uS2luZCgnYXJyYXknKSxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1tdJyxcbiAgICAgICAgICAgICAgICBpbnNlcnRUZXh0OiB0aGlzLmdldEluc2VydFRleHRGb3JHdWVzc2VkVmFsdWUoW10sIHNlcGFyYXRvckFmdGVyKSxcbiAgICAgICAgICAgICAgICBpbnNlcnRUZXh0Rm9ybWF0OiBJbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXQsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiBsb2NhbGl6ZSgnZGVmYXVsdHMuYXJyYXknLCAnTmV3IGFycmF5JyksXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuYWRkQm9vbGVhblZhbHVlQ29tcGxldGlvbiA9IGZ1bmN0aW9uICh2YWx1ZSwgc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3Rvcikge1xuICAgICAgICBjb2xsZWN0b3IuYWRkKHtcbiAgICAgICAgICAgIGtpbmQ6IHRoaXMuZ2V0U3VnZ2VzdGlvbktpbmQoJ2Jvb2xlYW4nKSxcbiAgICAgICAgICAgIGxhYmVsOiB2YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB0aGlzLmdldEluc2VydFRleHRGb3JWYWx1ZSh2YWx1ZSwgc2VwYXJhdG9yQWZ0ZXIpLFxuICAgICAgICAgICAgaW5zZXJ0VGV4dEZvcm1hdDogSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0LFxuICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJydcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuYWRkTnVsbFZhbHVlQ29tcGxldGlvbiA9IGZ1bmN0aW9uIChzZXBhcmF0b3JBZnRlciwgY29sbGVjdG9yKSB7XG4gICAgICAgIGNvbGxlY3Rvci5hZGQoe1xuICAgICAgICAgICAga2luZDogdGhpcy5nZXRTdWdnZXN0aW9uS2luZCgnbnVsbCcpLFxuICAgICAgICAgICAgbGFiZWw6ICdudWxsJyxcbiAgICAgICAgICAgIGluc2VydFRleHQ6ICdudWxsJyArIHNlcGFyYXRvckFmdGVyLFxuICAgICAgICAgICAgaW5zZXJ0VGV4dEZvcm1hdDogSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0LFxuICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJydcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuYWRkRG9sbGFyU2NoZW1hQ29tcGxldGlvbnMgPSBmdW5jdGlvbiAoc2VwYXJhdG9yQWZ0ZXIsIGNvbGxlY3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc2NoZW1hSWRzID0gdGhpcy5zY2hlbWFTZXJ2aWNlLmdldFJlZ2lzdGVyZWRTY2hlbWFJZHMoZnVuY3Rpb24gKHNjaGVtYSkgeyByZXR1cm4gc2NoZW1hID09PSAnaHR0cCcgfHwgc2NoZW1hID09PSAnaHR0cHMnOyB9KTtcbiAgICAgICAgc2NoZW1hSWRzLmZvckVhY2goZnVuY3Rpb24gKHNjaGVtYUlkKSB7IHJldHVybiBjb2xsZWN0b3IuYWRkKHtcbiAgICAgICAgICAgIGtpbmQ6IENvbXBsZXRpb25JdGVtS2luZC5Nb2R1bGUsXG4gICAgICAgICAgICBsYWJlbDogX3RoaXMuZ2V0TGFiZWxGb3JWYWx1ZShzY2hlbWFJZCksXG4gICAgICAgICAgICBmaWx0ZXJUZXh0OiBfdGhpcy5nZXRGaWx0ZXJUZXh0Rm9yVmFsdWUoc2NoZW1hSWQpLFxuICAgICAgICAgICAgaW5zZXJ0VGV4dDogX3RoaXMuZ2V0SW5zZXJ0VGV4dEZvclZhbHVlKHNjaGVtYUlkLCBzZXBhcmF0b3JBZnRlciksXG4gICAgICAgICAgICBpbnNlcnRUZXh0Rm9ybWF0OiBJbnNlcnRUZXh0Rm9ybWF0LlNuaXBwZXQsIGRvY3VtZW50YXRpb246ICcnXG4gICAgICAgIH0pOyB9KTtcbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5nZXRMYWJlbEZvclZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZ2V0RmlsdGVyVGV4dEZvclZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZ2V0RmlsdGVyVGV4dEZvclNuaXBwZXRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL1xcJFxce1xcZCs6KFtefV0rKVxcfXxcXCRcXGQrL2csICckMScpO1xuICAgIH07XG4gICAgSlNPTkNvbXBsZXRpb24ucHJvdG90eXBlLmdldExhYmVsRm9yU25pcHBldFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBsYWJlbCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGxhYmVsLnJlcGxhY2UoL1xcJFxce1xcZCs6KFtefV0rKVxcfXxcXCRcXGQrL2csICckMScpO1xuICAgIH07XG4gICAgSlNPTkNvbXBsZXRpb24ucHJvdG90eXBlLmdldEluc2VydFRleHRGb3JQbGFpblRleHQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bXFxcXFxcJFxcfV0vZywgJ1xcXFwkJicpOyAvLyBlc2NhcGUgJCwgXFwgYW5kIH0gXG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZ2V0SW5zZXJ0VGV4dEZvclZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBzZXBhcmF0b3JBZnRlcikge1xuICAgICAgICB2YXIgdGV4dCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCAnXFx0Jyk7XG4gICAgICAgIGlmICh0ZXh0ID09PSAne30nKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3skMX0nICsgc2VwYXJhdG9yQWZ0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGV4dCA9PT0gJ1tdJykge1xuICAgICAgICAgICAgcmV0dXJuICdbJDFdJyArIHNlcGFyYXRvckFmdGVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldEluc2VydFRleHRGb3JQbGFpblRleHQodGV4dCArIHNlcGFyYXRvckFmdGVyKTtcbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5nZXRJbnNlcnRUZXh0Rm9yU25pcHBldFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBzZXBhcmF0b3JBZnRlcikge1xuICAgICAgICB2YXIgcmVwbGFjZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlWzBdID09PSAnXicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnN1YnN0cigxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc3RyaW5naWZ5T2JqZWN0KHZhbHVlLCAnJywgcmVwbGFjZXIpICsgc2VwYXJhdG9yQWZ0ZXI7XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZ2V0SW5zZXJ0VGV4dEZvckd1ZXNzZWRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgc2VwYXJhdG9yQWZ0ZXIpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJHsxOm51bGx9JyArIHNlcGFyYXRvckFmdGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJbnNlcnRUZXh0Rm9yVmFsdWUodmFsdWUsIHNlcGFyYXRvckFmdGVyKTtcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgdmFyIHNuaXBwZXRWYWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzbmlwcGV0VmFsdWUgPSBzbmlwcGV0VmFsdWUuc3Vic3RyKDEsIHNuaXBwZXRWYWx1ZS5sZW5ndGggLSAyKTsgLy8gcmVtb3ZlIHF1b3Rlc1xuICAgICAgICAgICAgICAgIHNuaXBwZXRWYWx1ZSA9IHRoaXMuZ2V0SW5zZXJ0VGV4dEZvclBsYWluVGV4dChzbmlwcGV0VmFsdWUpOyAvLyBlc2NhcGUgXFwgYW5kIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJ1wiJHsxOicgKyBzbmlwcGV0VmFsdWUgKyAnfVwiJyArIHNlcGFyYXRvckFmdGVyO1xuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgIHJldHVybiAnJHsxOicgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKyAnfScgKyBzZXBhcmF0b3JBZnRlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJbnNlcnRUZXh0Rm9yVmFsdWUodmFsdWUsIHNlcGFyYXRvckFmdGVyKTtcbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5nZXRTdWdnZXN0aW9uS2luZCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSB0eXBlO1xuICAgICAgICAgICAgdHlwZSA9IGFycmF5Lmxlbmd0aCA+IDAgPyBhcnJheVswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBDb21wbGV0aW9uSXRlbUtpbmQuVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOiByZXR1cm4gQ29tcGxldGlvbkl0ZW1LaW5kLlZhbHVlO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzogcmV0dXJuIENvbXBsZXRpb25JdGVtS2luZC5Nb2R1bGU7XG4gICAgICAgICAgICBjYXNlICdwcm9wZXJ0eSc6IHJldHVybiBDb21wbGV0aW9uSXRlbUtpbmQuUHJvcGVydHk7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gQ29tcGxldGlvbkl0ZW1LaW5kLlZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZ2V0TGFiZWxUZXh0Rm9yTWF0Y2hpbmdOb2RlID0gZnVuY3Rpb24gKG5vZGUsIGRvY3VtZW50KSB7XG4gICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdbXSc7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgIHJldHVybiAne30nO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGRvY3VtZW50LmdldFRleHQoKS5zdWJzdHIobm9kZS5vZmZzZXQsIG5vZGUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgSlNPTkNvbXBsZXRpb24ucHJvdG90eXBlLmdldEluc2VydFRleHRGb3JNYXRjaGluZ05vZGUgPSBmdW5jdGlvbiAobm9kZSwgZG9jdW1lbnQsIHNlcGFyYXRvckFmdGVyKSB7XG4gICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW5zZXJ0VGV4dEZvclZhbHVlKFtdLCBzZXBhcmF0b3JBZnRlcik7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEluc2VydFRleHRGb3JWYWx1ZSh7fSwgc2VwYXJhdG9yQWZ0ZXIpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGRvY3VtZW50LmdldFRleHQoKS5zdWJzdHIobm9kZS5vZmZzZXQsIG5vZGUubGVuZ3RoKSArIHNlcGFyYXRvckFmdGVyO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEluc2VydFRleHRGb3JQbGFpblRleHQoY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5nZXRJbnNlcnRUZXh0Rm9yUHJvcGVydHkgPSBmdW5jdGlvbiAoa2V5LCBwcm9wZXJ0eVNjaGVtYSwgYWRkVmFsdWUsIHNlcGFyYXRvckFmdGVyKSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eVRleHQgPSB0aGlzLmdldEluc2VydFRleHRGb3JWYWx1ZShrZXksICcnKTtcbiAgICAgICAgaWYgKCFhZGRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5VGV4dDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0VGV4dCA9IHByb3BlcnR5VGV4dCArICc6ICc7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgdmFyIG5WYWx1ZVByb3Bvc2FscyA9IDA7XG4gICAgICAgIGlmIChwcm9wZXJ0eVNjaGVtYSkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcGVydHlTY2hlbWEuZGVmYXVsdFNuaXBwZXRzKSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eVNjaGVtYS5kZWZhdWx0U25pcHBldHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBib2R5ID0gcHJvcGVydHlTY2hlbWEuZGVmYXVsdFNuaXBwZXRzWzBdLmJvZHk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RlZmluZWQoYm9keSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5nZXRJbnNlcnRUZXh0Rm9yU25pcHBldFZhbHVlKGJvZHksICcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuVmFsdWVQcm9wb3NhbHMgKz0gcHJvcGVydHlTY2hlbWEuZGVmYXVsdFNuaXBwZXRzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eVNjaGVtYS5lbnVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSAmJiBwcm9wZXJ0eVNjaGVtYS5lbnVtLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0SW5zZXJ0VGV4dEZvckd1ZXNzZWRWYWx1ZShwcm9wZXJ0eVNjaGVtYS5lbnVtWzBdLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5WYWx1ZVByb3Bvc2FscyArPSBwcm9wZXJ0eVNjaGVtYS5lbnVtLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0RlZmluZWQocHJvcGVydHlTY2hlbWEuZGVmYXVsdCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5nZXRJbnNlcnRUZXh0Rm9yR3Vlc3NlZFZhbHVlKHByb3BlcnR5U2NoZW1hLmRlZmF1bHQsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgblZhbHVlUHJvcG9zYWxzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wZXJ0eVNjaGVtYS5leGFtcGxlcykgJiYgcHJvcGVydHlTY2hlbWEuZXhhbXBsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0SW5zZXJ0VGV4dEZvckd1ZXNzZWRWYWx1ZShwcm9wZXJ0eVNjaGVtYS5leGFtcGxlc1swXSwgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuVmFsdWVQcm9wb3NhbHMgKz0gcHJvcGVydHlTY2hlbWEuZXhhbXBsZXMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5WYWx1ZVByb3Bvc2FscyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gQXJyYXkuaXNBcnJheShwcm9wZXJ0eVNjaGVtYS50eXBlKSA/IHByb3BlcnR5U2NoZW1hLnR5cGVbMF0gOiBwcm9wZXJ0eVNjaGVtYS50eXBlO1xuICAgICAgICAgICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHlTY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdvYmplY3QnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb3BlcnR5U2NoZW1hLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ2FycmF5JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICckMSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJ1wiJDFcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJ3skMX0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJ1skMV0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ludGVnZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAnJHsxOjB9JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdudWxsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJyR7MTpudWxsfSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eVRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsdWUgfHwgblZhbHVlUHJvcG9zYWxzID4gMSkge1xuICAgICAgICAgICAgdmFsdWUgPSAnJDEnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRUZXh0ICsgdmFsdWUgKyBzZXBhcmF0b3JBZnRlcjtcbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5nZXRDdXJyZW50V29yZCA9IGZ1bmN0aW9uIChkb2N1bWVudCwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBpID0gb2Zmc2V0IC0gMTtcbiAgICAgICAgdmFyIHRleHQgPSBkb2N1bWVudC5nZXRUZXh0KCk7XG4gICAgICAgIHdoaWxlIChpID49IDAgJiYgJyBcXHRcXG5cXHJcXHZcIjp7WyxdfScuaW5kZXhPZih0ZXh0LmNoYXJBdChpKSkgPT09IC0xKSB7XG4gICAgICAgICAgICBpLS07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQuc3Vic3RyaW5nKGkgKyAxLCBvZmZzZXQpO1xuICAgIH07XG4gICAgSlNPTkNvbXBsZXRpb24ucHJvdG90eXBlLmV2YWx1YXRlU2VwYXJhdG9yQWZ0ZXIgPSBmdW5jdGlvbiAoZG9jdW1lbnQsIG9mZnNldCkge1xuICAgICAgICB2YXIgc2Nhbm5lciA9IEpzb24uY3JlYXRlU2Nhbm5lcihkb2N1bWVudC5nZXRUZXh0KCksIHRydWUpO1xuICAgICAgICBzY2FubmVyLnNldFBvc2l0aW9uKG9mZnNldCk7XG4gICAgICAgIHZhciB0b2tlbiA9IHNjYW5uZXIuc2NhbigpO1xuICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAgICAgICBjYXNlIDUgLyogQ29tbWFUb2tlbiAqLzpcbiAgICAgICAgICAgIGNhc2UgMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi86XG4gICAgICAgICAgICBjYXNlIDQgLyogQ2xvc2VCcmFja2V0VG9rZW4gKi86XG4gICAgICAgICAgICBjYXNlIDE3IC8qIEVPRiAqLzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnLCc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5maW5kSXRlbUF0T2Zmc2V0ID0gZnVuY3Rpb24gKG5vZGUsIGRvY3VtZW50LCBvZmZzZXQpIHtcbiAgICAgICAgdmFyIHNjYW5uZXIgPSBKc29uLmNyZWF0ZVNjYW5uZXIoZG9jdW1lbnQuZ2V0VGV4dCgpLCB0cnVlKTtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5pdGVtcztcbiAgICAgICAgZm9yICh2YXIgaSA9IGNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiBjaGlsZC5vZmZzZXQgKyBjaGlsZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzY2FubmVyLnNldFBvc2l0aW9uKGNoaWxkLm9mZnNldCArIGNoaWxkLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VuID0gc2Nhbm5lci5zY2FuKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuID09PSA1IC8qIENvbW1hVG9rZW4gKi8gJiYgb2Zmc2V0ID49IHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSArIHNjYW5uZXIuZ2V0VG9rZW5MZW5ndGgoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2Zmc2V0ID49IGNoaWxkLm9mZnNldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgSlNPTkNvbXBsZXRpb24ucHJvdG90eXBlLmlzSW5Db21tZW50ID0gZnVuY3Rpb24gKGRvY3VtZW50LCBzdGFydCwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBzY2FubmVyID0gSnNvbi5jcmVhdGVTY2FubmVyKGRvY3VtZW50LmdldFRleHQoKSwgZmFsc2UpO1xuICAgICAgICBzY2FubmVyLnNldFBvc2l0aW9uKHN0YXJ0KTtcbiAgICAgICAgdmFyIHRva2VuID0gc2Nhbm5lci5zY2FuKCk7XG4gICAgICAgIHdoaWxlICh0b2tlbiAhPT0gMTcgLyogRU9GICovICYmIChzY2FubmVyLmdldFRva2VuT2Zmc2V0KCkgKyBzY2FubmVyLmdldFRva2VuTGVuZ3RoKCkgPCBvZmZzZXQpKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHNjYW5uZXIuc2NhbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodG9rZW4gPT09IDEyIC8qIExpbmVDb21tZW50VHJpdmlhICovIHx8IHRva2VuID09PSAxMyAvKiBCbG9ja0NvbW1lbnRUcml2aWEgKi8pICYmIHNjYW5uZXIuZ2V0VG9rZW5PZmZzZXQoKSA8PSBvZmZzZXQ7XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZnJvbU1hcmt1cCA9IGZ1bmN0aW9uIChtYXJrdXBTdHJpbmcpIHtcbiAgICAgICAgaWYgKG1hcmt1cFN0cmluZyAmJiB0aGlzLmRvZXNTdXBwb3J0TWFya2Rvd24oKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBraW5kOiBNYXJrdXBLaW5kLk1hcmtkb3duLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBtYXJrdXBTdHJpbmdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIEpTT05Db21wbGV0aW9uLnByb3RvdHlwZS5kb2VzU3VwcG9ydE1hcmtkb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWlzRGVmaW5lZCh0aGlzLnN1cHBvcnRzTWFya2Rvd24pKSB7XG4gICAgICAgICAgICB2YXIgY29tcGxldGlvbiA9IHRoaXMuY2xpZW50Q2FwYWJpbGl0aWVzLnRleHREb2N1bWVudCAmJiB0aGlzLmNsaWVudENhcGFiaWxpdGllcy50ZXh0RG9jdW1lbnQuY29tcGxldGlvbjtcbiAgICAgICAgICAgIHRoaXMuc3VwcG9ydHNNYXJrZG93biA9IGNvbXBsZXRpb24gJiYgY29tcGxldGlvbi5jb21wbGV0aW9uSXRlbSAmJiBBcnJheS5pc0FycmF5KGNvbXBsZXRpb24uY29tcGxldGlvbkl0ZW0uZG9jdW1lbnRhdGlvbkZvcm1hdCkgJiYgY29tcGxldGlvbi5jb21wbGV0aW9uSXRlbS5kb2N1bWVudGF0aW9uRm9ybWF0LmluZGV4T2YoTWFya3VwS2luZC5NYXJrZG93bikgIT09IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN1cHBvcnRzTWFya2Rvd247XG4gICAgfTtcbiAgICBKU09OQ29tcGxldGlvbi5wcm90b3R5cGUuZG9lc1N1cHBvcnRzQ29tbWl0Q2hhcmFjdGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpc0RlZmluZWQodGhpcy5zdXBwb3J0c0NvbW1pdENoYXJhY3RlcnMpKSB7XG4gICAgICAgICAgICB2YXIgY29tcGxldGlvbiA9IHRoaXMuY2xpZW50Q2FwYWJpbGl0aWVzLnRleHREb2N1bWVudCAmJiB0aGlzLmNsaWVudENhcGFiaWxpdGllcy50ZXh0RG9jdW1lbnQuY29tcGxldGlvbjtcbiAgICAgICAgICAgIHRoaXMuc3VwcG9ydHNDb21taXRDaGFyYWN0ZXJzID0gY29tcGxldGlvbiAmJiBjb21wbGV0aW9uLmNvbXBsZXRpb25JdGVtICYmICEhY29tcGxldGlvbi5jb21wbGV0aW9uSXRlbS5jb21taXRDaGFyYWN0ZXJzU3VwcG9ydDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdXBwb3J0c0NvbW1pdENoYXJhY3RlcnM7XG4gICAgfTtcbiAgICByZXR1cm4gSlNPTkNvbXBsZXRpb247XG59KCkpO1xuZXhwb3J0IHsgSlNPTkNvbXBsZXRpb24gfTtcbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeU9iamVjdChvYmosIGluZGVudCwgc3RyaW5naWZ5TGl0ZXJhbCkge1xuICAgIGlmIChvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIG5ld0luZGVudCA9IGluZGVudCArICdcXHQnO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBpZiAob2JqLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnW10nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICdbXFxuJztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IG5ld0luZGVudCArIHN0cmluZ2lmeU9iamVjdChvYmpbaV0sIG5ld0luZGVudCwgc3RyaW5naWZ5TGl0ZXJhbCk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBvYmoubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJywnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcbic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gaW5kZW50ICsgJ10nO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAne30nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICd7XFxuJztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBuZXdJbmRlbnQgKyBKU09OLnN0cmluZ2lmeShrZXkpICsgJzogJyArIHN0cmluZ2lmeU9iamVjdChvYmpba2V5XSwgbmV3SW5kZW50LCBzdHJpbmdpZnlMaXRlcmFsKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IGtleXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gJywnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcbic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gaW5kZW50ICsgJ30nO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyaW5naWZ5TGl0ZXJhbChvYmopO1xufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgKiBhcyBQYXJzZXIgZnJvbSAnLi4vcGFyc2VyL2pzb25QYXJzZXIuanMnO1xuaW1wb3J0IHsgUmFuZ2UgfSBmcm9tICcuLi9qc29uTGFuZ3VhZ2VUeXBlcy5qcyc7XG52YXIgSlNPTkhvdmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEpTT05Ib3ZlcihzY2hlbWFTZXJ2aWNlLCBjb250cmlidXRpb25zLCBwcm9taXNlQ29uc3RydWN0b3IpIHtcbiAgICAgICAgaWYgKGNvbnRyaWJ1dGlvbnMgPT09IHZvaWQgMCkgeyBjb250cmlidXRpb25zID0gW107IH1cbiAgICAgICAgdGhpcy5zY2hlbWFTZXJ2aWNlID0gc2NoZW1hU2VydmljZTtcbiAgICAgICAgdGhpcy5jb250cmlidXRpb25zID0gY29udHJpYnV0aW9ucztcbiAgICAgICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZUNvbnN0cnVjdG9yIHx8IFByb21pc2U7XG4gICAgfVxuICAgIEpTT05Ib3Zlci5wcm90b3R5cGUuZG9Ib3ZlciA9IGZ1bmN0aW9uIChkb2N1bWVudCwgcG9zaXRpb24sIGRvYykge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gZG9jdW1lbnQub2Zmc2V0QXQocG9zaXRpb24pO1xuICAgICAgICB2YXIgbm9kZSA9IGRvYy5nZXROb2RlRnJvbU9mZnNldChvZmZzZXQpO1xuICAgICAgICBpZiAoIW5vZGUgfHwgKG5vZGUudHlwZSA9PT0gJ29iamVjdCcgfHwgbm9kZS50eXBlID09PSAnYXJyYXknKSAmJiBvZmZzZXQgPiBub2RlLm9mZnNldCArIDEgJiYgb2Zmc2V0IDwgbm9kZS5vZmZzZXQgKyBub2RlLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaG92ZXJSYW5nZU5vZGUgPSBub2RlO1xuICAgICAgICAvLyB1c2UgdGhlIHByb3BlcnR5IGRlc2NyaXB0aW9uIHdoZW4gaG92ZXJpbmcgb3ZlciBhbiBvYmplY3Qga2V5XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgICAgICBpZiAocGFyZW50ICYmIHBhcmVudC50eXBlID09PSAncHJvcGVydHknICYmIHBhcmVudC5rZXlOb2RlID09PSBub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHBhcmVudC52YWx1ZU5vZGU7XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhvdmVyUmFuZ2UgPSBSYW5nZS5jcmVhdGUoZG9jdW1lbnQucG9zaXRpb25BdChob3ZlclJhbmdlTm9kZS5vZmZzZXQpLCBkb2N1bWVudC5wb3NpdGlvbkF0KGhvdmVyUmFuZ2VOb2RlLm9mZnNldCArIGhvdmVyUmFuZ2VOb2RlLmxlbmd0aCkpO1xuICAgICAgICB2YXIgY3JlYXRlSG92ZXIgPSBmdW5jdGlvbiAoY29udGVudHMpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgY29udGVudHM6IGNvbnRlbnRzLFxuICAgICAgICAgICAgICAgIHJhbmdlOiBob3ZlclJhbmdlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gUGFyc2VyLmdldE5vZGVQYXRoKG5vZGUpO1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5jb250cmlidXRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgY29udHJpYnV0aW9uID0gdGhpcy5jb250cmlidXRpb25zW2ldO1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBjb250cmlidXRpb24uZ2V0SW5mb0NvbnRyaWJ1dGlvbihkb2N1bWVudC51cmksIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbiAoaHRtbENvbnRlbnQpIHsgcmV0dXJuIGNyZWF0ZUhvdmVyKGh0bWxDb250ZW50KTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hU2VydmljZS5nZXRTY2hlbWFGb3JSZXNvdXJjZShkb2N1bWVudC51cmksIGRvYykudGhlbihmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgICAgICAgICBpZiAoc2NoZW1hICYmIG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hpbmdTY2hlbWFzID0gZG9jLmdldE1hdGNoaW5nU2NoZW1hcyhzY2hlbWEuc2NoZW1hLCBub2RlLm9mZnNldCk7XG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlXzEgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdmFyIG1hcmtkb3duRGVzY3JpcHRpb25fMSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB2YXIgbWFya2Rvd25FbnVtVmFsdWVEZXNjcmlwdGlvbl8xID0gdW5kZWZpbmVkLCBlbnVtVmFsdWVfMSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBtYXRjaGluZ1NjaGVtYXMuZXZlcnkoZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMubm9kZSA9PT0gbm9kZSAmJiAhcy5pbnZlcnRlZCAmJiBzLnNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVfMSA9IHRpdGxlXzEgfHwgcy5zY2hlbWEudGl0bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZG93bkRlc2NyaXB0aW9uXzEgPSBtYXJrZG93bkRlc2NyaXB0aW9uXzEgfHwgcy5zY2hlbWEubWFya2Rvd25EZXNjcmlwdGlvbiB8fCB0b01hcmtkb3duKHMuc2NoZW1hLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnNjaGVtYS5lbnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkeCA9IHMuc2NoZW1hLmVudW0uaW5kZXhPZihQYXJzZXIuZ2V0Tm9kZVZhbHVlKG5vZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5zY2hlbWEubWFya2Rvd25FbnVtRGVzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtkb3duRW51bVZhbHVlRGVzY3JpcHRpb25fMSA9IHMuc2NoZW1hLm1hcmtkb3duRW51bURlc2NyaXB0aW9uc1tpZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnNjaGVtYS5lbnVtRGVzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtkb3duRW51bVZhbHVlRGVzY3JpcHRpb25fMSA9IHRvTWFya2Rvd24ocy5zY2hlbWEuZW51bURlc2NyaXB0aW9uc1tpZHhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtkb3duRW51bVZhbHVlRGVzY3JpcHRpb25fMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnVtVmFsdWVfMSA9IHMuc2NoZW1hLmVudW1baWR4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnVtVmFsdWVfMSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1WYWx1ZV8xID0gSlNPTi5zdHJpbmdpZnkoZW51bVZhbHVlXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAodGl0bGVfMSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0b01hcmtkb3duKHRpdGxlXzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWFya2Rvd25EZXNjcmlwdGlvbl8xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxuXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IG1hcmtkb3duRGVzY3JpcHRpb25fMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1hcmtkb3duRW51bVZhbHVlRGVzY3JpcHRpb25fMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcblxcblwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcImBcIiArIHRvTWFya2Rvd25Db2RlQmxvY2soZW51bVZhbHVlXzEpICsgXCJgOiBcIiArIG1hcmtkb3duRW51bVZhbHVlRGVzY3JpcHRpb25fMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUhvdmVyKFtyZXN1bHRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBKU09OSG92ZXI7XG59KCkpO1xuZXhwb3J0IHsgSlNPTkhvdmVyIH07XG5mdW5jdGlvbiB0b01hcmtkb3duKHBsYWluKSB7XG4gICAgaWYgKHBsYWluKSB7XG4gICAgICAgIHZhciByZXMgPSBwbGFpbi5yZXBsYWNlKC8oW15cXG5cXHJdKShcXHI/XFxuKShbXlxcblxccl0pL2dtLCAnJDFcXG5cXG4kMycpOyAvLyBzaW5nbGUgbmV3IGxpbmVzIHRvIFxcblxcbiAoTWFya2Rvd24gcGFyYWdyYXBoKVxuICAgICAgICByZXR1cm4gcmVzLnJlcGxhY2UoL1tcXFxcYCpfe31bXFxdKCkjK1xcLS4hXS9nLCBcIlxcXFwkJlwiKTsgLy8gZXNjYXBlIG1hcmtkb3duIHN5bnRheCB0b2tlbnM6IGh0dHA6Ly9kYXJpbmdmaXJlYmFsbC5uZXQvcHJvamVjdHMvbWFya2Rvd24vc3ludGF4I2JhY2tzbGFzaFxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gdG9NYXJrZG93bkNvZGVCbG9jayhjb250ZW50KSB7XG4gICAgLy8gc2VlIGh0dHBzOi8vZGFyaW5nZmlyZWJhbGwubmV0L3Byb2plY3RzL21hcmtkb3duL3N5bnRheCNwcmVjb2RlXG4gICAgaWYgKGNvbnRlbnQuaW5kZXhPZignYCcpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gJ2BgICcgKyBjb250ZW50ICsgJyBgYCc7XG4gICAgfVxuICAgIHJldHVybiBjb250ZW50O1xufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgKiBhcyBKc29uIGZyb20gJy4vLi4vLi4vanNvbmMtcGFyc2VyL21haW4uanMnO1xuaW1wb3J0IHsgVVJJIH0gZnJvbSAnLi8uLi8uLi92c2NvZGUtdXJpL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIFN0cmluZ3MgZnJvbSAnLi4vdXRpbHMvc3RyaW5ncy5qcyc7XG5pbXBvcnQgKiBhcyBQYXJzZXIgZnJvbSAnLi4vcGFyc2VyL2pzb25QYXJzZXIuanMnO1xuaW1wb3J0ICogYXMgbmxzIGZyb20gJy4vLi4vLi4vLi4vZmlsbGVycy92c2NvZGUtbmxzLmpzJztcbnZhciBsb2NhbGl6ZSA9IG5scy5sb2FkTWVzc2FnZUJ1bmRsZSgpO1xudmFyIEZpbGVQYXR0ZXJuQXNzb2NpYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmlsZVBhdHRlcm5Bc3NvY2lhdGlvbihwYXR0ZXJuLCB1cmlzKSB7XG4gICAgICAgIHRoaXMucGF0dGVyblJlZ0V4cHMgPSBbXTtcbiAgICAgICAgdGhpcy5pc0luY2x1ZGUgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgcGF0dGVybl8xID0gcGF0dGVybjsgX2kgPCBwYXR0ZXJuXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBwYXR0ZXJuXzFbX2ldO1xuICAgICAgICAgICAgICAgIHZhciBpbmNsdWRlID0gcFswXSAhPT0gJyEnO1xuICAgICAgICAgICAgICAgIGlmICghaW5jbHVkZSkge1xuICAgICAgICAgICAgICAgICAgICBwID0gcC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucGF0dGVyblJlZ0V4cHMucHVzaChuZXcgUmVnRXhwKFN0cmluZ3MuY29udmVydFNpbXBsZTJSZWdFeHBQYXR0ZXJuKHApICsgJyQnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0luY2x1ZGUucHVzaChpbmNsdWRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXJpcyA9IHVyaXM7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIGludmFsaWQgcGF0dGVyblxuICAgICAgICAgICAgdGhpcy5wYXR0ZXJuUmVnRXhwcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy5pc0luY2x1ZGUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMudXJpcyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIEZpbGVQYXR0ZXJuQXNzb2NpYXRpb24ucHJvdG90eXBlLm1hdGNoZXNQYXR0ZXJuID0gZnVuY3Rpb24gKGZpbGVOYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGF0dGVyblJlZ0V4cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByZWdFeHAgPSB0aGlzLnBhdHRlcm5SZWdFeHBzW2ldO1xuICAgICAgICAgICAgaWYgKHJlZ0V4cC50ZXN0KGZpbGVOYW1lKSkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gdGhpcy5pc0luY2x1ZGVbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH07XG4gICAgRmlsZVBhdHRlcm5Bc3NvY2lhdGlvbi5wcm90b3R5cGUuZ2V0VVJJcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJpcztcbiAgICB9O1xuICAgIHJldHVybiBGaWxlUGF0dGVybkFzc29jaWF0aW9uO1xufSgpKTtcbnZhciBTY2hlbWFIYW5kbGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2NoZW1hSGFuZGxlKHNlcnZpY2UsIHVybCwgdW5yZXNvbHZlZFNjaGVtYUNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gc2VydmljZTtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuZGVwZW5kZW5jaWVzID0ge307XG4gICAgICAgIGlmICh1bnJlc29sdmVkU2NoZW1hQ29udGVudCkge1xuICAgICAgICAgICAgdGhpcy51bnJlc29sdmVkU2NoZW1hID0gdGhpcy5zZXJ2aWNlLnByb21pc2UucmVzb2x2ZShuZXcgVW5yZXNvbHZlZFNjaGVtYSh1bnJlc29sdmVkU2NoZW1hQ29udGVudCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFNjaGVtYUhhbmRsZS5wcm90b3R5cGUuZ2V0VW5yZXNvbHZlZFNjaGVtYSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVucmVzb2x2ZWRTY2hlbWEpIHtcbiAgICAgICAgICAgIHRoaXMudW5yZXNvbHZlZFNjaGVtYSA9IHRoaXMuc2VydmljZS5sb2FkU2NoZW1hKHRoaXMudXJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51bnJlc29sdmVkU2NoZW1hO1xuICAgIH07XG4gICAgU2NoZW1hSGFuZGxlLnByb3RvdHlwZS5nZXRSZXNvbHZlZFNjaGVtYSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLnJlc29sdmVkU2NoZW1hKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVkU2NoZW1hID0gdGhpcy5nZXRVbnJlc29sdmVkU2NoZW1hKCkudGhlbihmdW5jdGlvbiAodW5yZXNvbHZlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5zZXJ2aWNlLnJlc29sdmVTY2hlbWFDb250ZW50KHVucmVzb2x2ZWQsIF90aGlzLnVybCwgX3RoaXMuZGVwZW5kZW5jaWVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVkU2NoZW1hO1xuICAgIH07XG4gICAgU2NoZW1hSGFuZGxlLnByb3RvdHlwZS5jbGVhclNjaGVtYSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlZFNjaGVtYSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51bnJlc29sdmVkU2NoZW1hID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRlcGVuZGVuY2llcyA9IHt9O1xuICAgIH07XG4gICAgcmV0dXJuIFNjaGVtYUhhbmRsZTtcbn0oKSk7XG52YXIgVW5yZXNvbHZlZFNjaGVtYSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVbnJlc29sdmVkU2NoZW1hKHNjaGVtYSwgZXJyb3JzKSB7XG4gICAgICAgIGlmIChlcnJvcnMgPT09IHZvaWQgMCkgeyBlcnJvcnMgPSBbXTsgfVxuICAgICAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgfVxuICAgIHJldHVybiBVbnJlc29sdmVkU2NoZW1hO1xufSgpKTtcbmV4cG9ydCB7IFVucmVzb2x2ZWRTY2hlbWEgfTtcbnZhciBSZXNvbHZlZFNjaGVtYSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZXNvbHZlZFNjaGVtYShzY2hlbWEsIGVycm9ycykge1xuICAgICAgICBpZiAoZXJyb3JzID09PSB2b2lkIDApIHsgZXJyb3JzID0gW107IH1cbiAgICAgICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgIH1cbiAgICBSZXNvbHZlZFNjaGVtYS5wcm90b3R5cGUuZ2V0U2VjdGlvbiA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHZhciBzY2hlbWFSZWYgPSB0aGlzLmdldFNlY3Rpb25SZWN1cnNpdmUocGF0aCwgdGhpcy5zY2hlbWEpO1xuICAgICAgICBpZiAoc2NoZW1hUmVmKSB7XG4gICAgICAgICAgICByZXR1cm4gUGFyc2VyLmFzU2NoZW1hKHNjaGVtYVJlZik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIFJlc29sdmVkU2NoZW1hLnByb3RvdHlwZS5nZXRTZWN0aW9uUmVjdXJzaXZlID0gZnVuY3Rpb24gKHBhdGgsIHNjaGVtYSkge1xuICAgICAgICBpZiAoIXNjaGVtYSB8fCB0eXBlb2Ygc2NoZW1hID09PSAnYm9vbGVhbicgfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5leHQgPSBwYXRoLnNoaWZ0KCk7XG4gICAgICAgIGlmIChzY2hlbWEucHJvcGVydGllcyAmJiB0eXBlb2Ygc2NoZW1hLnByb3BlcnRpZXNbbmV4dF0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFNlY3Rpb25SZWN1cnNpdmUocGF0aCwgc2NoZW1hLnByb3BlcnRpZXNbbmV4dF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcykge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5rZXlzKHNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChwYXR0ZXJuKTtcbiAgICAgICAgICAgICAgICBpZiAocmVnZXgudGVzdChuZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTZWN0aW9uUmVjdXJzaXZlKHBhdGgsIHNjaGVtYS5wYXR0ZXJuUHJvcGVydGllc1twYXR0ZXJuXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTZWN0aW9uUmVjdXJzaXZlKHBhdGgsIHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV4dC5tYXRjaCgnWzAtOV0rJykpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChuZXh0LCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihpbmRleCkgJiYgc2NoZW1hLml0ZW1zW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTZWN0aW9uUmVjdXJzaXZlKHBhdGgsIHNjaGVtYS5pdGVtc1tpbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNjaGVtYS5pdGVtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFNlY3Rpb25SZWN1cnNpdmUocGF0aCwgc2NoZW1hLml0ZW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgcmV0dXJuIFJlc29sdmVkU2NoZW1hO1xufSgpKTtcbmV4cG9ydCB7IFJlc29sdmVkU2NoZW1hIH07XG52YXIgSlNPTlNjaGVtYVNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSlNPTlNjaGVtYVNlcnZpY2UocmVxdWVzdFNlcnZpY2UsIGNvbnRleHRTZXJ2aWNlLCBwcm9taXNlQ29uc3RydWN0b3IpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0U2VydmljZSA9IGNvbnRleHRTZXJ2aWNlO1xuICAgICAgICB0aGlzLnJlcXVlc3RTZXJ2aWNlID0gcmVxdWVzdFNlcnZpY2U7XG4gICAgICAgIHRoaXMucHJvbWlzZUNvbnN0cnVjdG9yID0gcHJvbWlzZUNvbnN0cnVjdG9yIHx8IFByb21pc2U7XG4gICAgICAgIHRoaXMuY2FsbE9uRGlzcG9zZSA9IFtdO1xuICAgICAgICB0aGlzLmNvbnRyaWJ1dGlvblNjaGVtYXMgPSB7fTtcbiAgICAgICAgdGhpcy5jb250cmlidXRpb25Bc3NvY2lhdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5zY2hlbWFzQnlJZCA9IHt9O1xuICAgICAgICB0aGlzLmZpbGVQYXR0ZXJuQXNzb2NpYXRpb25zID0gW107XG4gICAgICAgIHRoaXMucmVnaXN0ZXJlZFNjaGVtYXNJZHMgPSB7fTtcbiAgICB9XG4gICAgSlNPTlNjaGVtYVNlcnZpY2UucHJvdG90eXBlLmdldFJlZ2lzdGVyZWRTY2hlbWFJZHMgPSBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnJlZ2lzdGVyZWRTY2hlbWFzSWRzKS5maWx0ZXIoZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICB2YXIgc2NoZW1lID0gVVJJLnBhcnNlKGlkKS5zY2hlbWU7XG4gICAgICAgICAgICByZXR1cm4gc2NoZW1lICE9PSAnc2NoZW1hc2VydmljZScgJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNjaGVtZSkpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShKU09OU2NoZW1hU2VydmljZS5wcm90b3R5cGUsIFwicHJvbWlzZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZUNvbnN0cnVjdG9yO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgSlNPTlNjaGVtYVNlcnZpY2UucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLmNhbGxPbkRpc3Bvc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsT25EaXNwb3NlLnBvcCgpKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEpTT05TY2hlbWFTZXJ2aWNlLnByb3RvdHlwZS5vblJlc291cmNlQ2hhbmdlID0gZnVuY3Rpb24gKHVyaSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgaGFzQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgICB1cmkgPSBub3JtYWxpemVJZCh1cmkpO1xuICAgICAgICB2YXIgdG9XYWxrID0gW3VyaV07XG4gICAgICAgIHZhciBhbGwgPSBPYmplY3Qua2V5cyh0aGlzLnNjaGVtYXNCeUlkKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gX3RoaXMuc2NoZW1hc0J5SWRba2V5XTsgfSk7XG4gICAgICAgIHdoaWxlICh0b1dhbGsubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IHRvV2Fsay5wb3AoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGFsbFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlICYmIChoYW5kbGUudXJsID09PSBjdXJyIHx8IGhhbmRsZS5kZXBlbmRlbmNpZXNbY3Vycl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGUudXJsICE9PSBjdXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1dhbGsucHVzaChoYW5kbGUudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuY2xlYXJTY2hlbWEoKTtcbiAgICAgICAgICAgICAgICAgICAgYWxsW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBoYXNDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhc0NoYW5nZXM7XG4gICAgfTtcbiAgICBKU09OU2NoZW1hU2VydmljZS5wcm90b3R5cGUuc2V0U2NoZW1hQ29udHJpYnV0aW9ucyA9IGZ1bmN0aW9uIChzY2hlbWFDb250cmlidXRpb25zKSB7XG4gICAgICAgIGlmIChzY2hlbWFDb250cmlidXRpb25zLnNjaGVtYXMpIHtcbiAgICAgICAgICAgIHZhciBzY2hlbWFzID0gc2NoZW1hQ29udHJpYnV0aW9ucy5zY2hlbWFzO1xuICAgICAgICAgICAgZm9yICh2YXIgaWQgaW4gc2NoZW1hcykge1xuICAgICAgICAgICAgICAgIHZhciBub3JtYWxpemVkSWQgPSBub3JtYWxpemVJZChpZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cmlidXRpb25TY2hlbWFzW25vcm1hbGl6ZWRJZF0gPSB0aGlzLmFkZFNjaGVtYUhhbmRsZShub3JtYWxpemVkSWQsIHNjaGVtYXNbaWRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWFDb250cmlidXRpb25zLnNjaGVtYUFzc29jaWF0aW9ucykpIHtcbiAgICAgICAgICAgIHZhciBzY2hlbWFBc3NvY2lhdGlvbnMgPSBzY2hlbWFDb250cmlidXRpb25zLnNjaGVtYUFzc29jaWF0aW9ucztcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgc2NoZW1hQXNzb2NpYXRpb25zXzEgPSBzY2hlbWFBc3NvY2lhdGlvbnM7IF9pIDwgc2NoZW1hQXNzb2NpYXRpb25zXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjaGVtYUFzc29jaWF0aW9uID0gc2NoZW1hQXNzb2NpYXRpb25zXzFbX2ldO1xuICAgICAgICAgICAgICAgIHZhciB1cmlzID0gc2NoZW1hQXNzb2NpYXRpb24udXJpcy5tYXAobm9ybWFsaXplSWQpO1xuICAgICAgICAgICAgICAgIHZhciBhc3NvY2lhdGlvbiA9IHRoaXMuYWRkRmlsZVBhdHRlcm5Bc3NvY2lhdGlvbihzY2hlbWFBc3NvY2lhdGlvbi5wYXR0ZXJuLCB1cmlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyaWJ1dGlvbkFzc29jaWF0aW9ucy5wdXNoKGFzc29jaWF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgSlNPTlNjaGVtYVNlcnZpY2UucHJvdG90eXBlLmFkZFNjaGVtYUhhbmRsZSA9IGZ1bmN0aW9uIChpZCwgdW5yZXNvbHZlZFNjaGVtYUNvbnRlbnQpIHtcbiAgICAgICAgdmFyIHNjaGVtYUhhbmRsZSA9IG5ldyBTY2hlbWFIYW5kbGUodGhpcywgaWQsIHVucmVzb2x2ZWRTY2hlbWFDb250ZW50KTtcbiAgICAgICAgdGhpcy5zY2hlbWFzQnlJZFtpZF0gPSBzY2hlbWFIYW5kbGU7XG4gICAgICAgIHJldHVybiBzY2hlbWFIYW5kbGU7XG4gICAgfTtcbiAgICBKU09OU2NoZW1hU2VydmljZS5wcm90b3R5cGUuZ2V0T3JBZGRTY2hlbWFIYW5kbGUgPSBmdW5jdGlvbiAoaWQsIHVucmVzb2x2ZWRTY2hlbWFDb250ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjaGVtYXNCeUlkW2lkXSB8fCB0aGlzLmFkZFNjaGVtYUhhbmRsZShpZCwgdW5yZXNvbHZlZFNjaGVtYUNvbnRlbnQpO1xuICAgIH07XG4gICAgSlNPTlNjaGVtYVNlcnZpY2UucHJvdG90eXBlLmFkZEZpbGVQYXR0ZXJuQXNzb2NpYXRpb24gPSBmdW5jdGlvbiAocGF0dGVybiwgdXJpcykge1xuICAgICAgICB2YXIgZnBhID0gbmV3IEZpbGVQYXR0ZXJuQXNzb2NpYXRpb24ocGF0dGVybiwgdXJpcyk7XG4gICAgICAgIHRoaXMuZmlsZVBhdHRlcm5Bc3NvY2lhdGlvbnMucHVzaChmcGEpO1xuICAgICAgICByZXR1cm4gZnBhO1xuICAgIH07XG4gICAgSlNPTlNjaGVtYVNlcnZpY2UucHJvdG90eXBlLnJlZ2lzdGVyRXh0ZXJuYWxTY2hlbWEgPSBmdW5jdGlvbiAodXJpLCBmaWxlUGF0dGVybnMsIHVucmVzb2x2ZWRTY2hlbWFDb250ZW50KSB7XG4gICAgICAgIHZhciBpZCA9IG5vcm1hbGl6ZUlkKHVyaSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJlZFNjaGVtYXNJZHNbaWRdID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYWNoZWRTY2hlbWFGb3JSZXNvdXJjZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGZpbGVQYXR0ZXJucykge1xuICAgICAgICAgICAgdGhpcy5hZGRGaWxlUGF0dGVybkFzc29jaWF0aW9uKGZpbGVQYXR0ZXJucywgW3VyaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bnJlc29sdmVkU2NoZW1hQ29udGVudCA/IHRoaXMuYWRkU2NoZW1hSGFuZGxlKGlkLCB1bnJlc29sdmVkU2NoZW1hQ29udGVudCkgOiB0aGlzLmdldE9yQWRkU2NoZW1hSGFuZGxlKGlkKTtcbiAgICB9O1xuICAgIEpTT05TY2hlbWFTZXJ2aWNlLnByb3RvdHlwZS5jbGVhckV4dGVybmFsU2NoZW1hcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zY2hlbWFzQnlJZCA9IHt9O1xuICAgICAgICB0aGlzLmZpbGVQYXR0ZXJuQXNzb2NpYXRpb25zID0gW107XG4gICAgICAgIHRoaXMucmVnaXN0ZXJlZFNjaGVtYXNJZHMgPSB7fTtcbiAgICAgICAgdGhpcy5jYWNoZWRTY2hlbWFGb3JSZXNvdXJjZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5jb250cmlidXRpb25TY2hlbWFzKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVtYXNCeUlkW2lkXSA9IHRoaXMuY29udHJpYnV0aW9uU2NoZW1hc1tpZF07XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyZWRTY2hlbWFzSWRzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuY29udHJpYnV0aW9uQXNzb2NpYXRpb25zOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGNvbnRyaWJ1dGlvbkFzc29jaWF0aW9uID0gX2FbX2ldO1xuICAgICAgICAgICAgdGhpcy5maWxlUGF0dGVybkFzc29jaWF0aW9ucy5wdXNoKGNvbnRyaWJ1dGlvbkFzc29jaWF0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgSlNPTlNjaGVtYVNlcnZpY2UucHJvdG90eXBlLmdldFJlc29sdmVkU2NoZW1hID0gZnVuY3Rpb24gKHNjaGVtYUlkKSB7XG4gICAgICAgIHZhciBpZCA9IG5vcm1hbGl6ZUlkKHNjaGVtYUlkKTtcbiAgICAgICAgdmFyIHNjaGVtYUhhbmRsZSA9IHRoaXMuc2NoZW1hc0J5SWRbaWRdO1xuICAgICAgICBpZiAoc2NoZW1hSGFuZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZW1hSGFuZGxlLmdldFJlc29sdmVkU2NoZW1hKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgfTtcbiAgICBKU09OU2NoZW1hU2VydmljZS5wcm90b3R5cGUubG9hZFNjaGVtYSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlcXVlc3RTZXJ2aWNlKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gbG9jYWxpemUoJ2pzb24uc2NoZW1hLm5vcmVxdWVzdHNlcnZpY2UnLCAnVW5hYmxlIHRvIGxvYWQgc2NoZW1hIGZyb20gXFwnezB9XFwnLiBObyBzY2hlbWEgcmVxdWVzdCBzZXJ2aWNlIGF2YWlsYWJsZScsIHRvRGlzcGxheVN0cmluZyh1cmwpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21pc2UucmVzb2x2ZShuZXcgVW5yZXNvbHZlZFNjaGVtYSh7fSwgW2Vycm9yTWVzc2FnZV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0U2VydmljZSh1cmwpLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmICghY29udGVudCkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBsb2NhbGl6ZSgnanNvbi5zY2hlbWEubm9jb250ZW50JywgJ1VuYWJsZSB0byBsb2FkIHNjaGVtYSBmcm9tIFxcJ3swfVxcJzogTm8gY29udGVudC4nLCB0b0Rpc3BsYXlTdHJpbmcodXJsKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVbnJlc29sdmVkU2NoZW1hKHt9LCBbZXJyb3JNZXNzYWdlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2NoZW1hQ29udGVudCA9IHt9O1xuICAgICAgICAgICAgdmFyIGpzb25FcnJvcnMgPSBbXTtcbiAgICAgICAgICAgIHNjaGVtYUNvbnRlbnQgPSBKc29uLnBhcnNlKGNvbnRlbnQsIGpzb25FcnJvcnMpO1xuICAgICAgICAgICAgdmFyIGVycm9ycyA9IGpzb25FcnJvcnMubGVuZ3RoID8gW2xvY2FsaXplKCdqc29uLnNjaGVtYS5pbnZhbGlkRm9ybWF0JywgJ1VuYWJsZSB0byBwYXJzZSBjb250ZW50IGZyb20gXFwnezB9XFwnOiBQYXJzZSBlcnJvciBhdCBvZmZzZXQgezF9LicsIHRvRGlzcGxheVN0cmluZyh1cmwpLCBqc29uRXJyb3JzWzBdLm9mZnNldCldIDogW107XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVucmVzb2x2ZWRTY2hlbWEoc2NoZW1hQ29udGVudCwgZXJyb3JzKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHZhciBlcnJvclNwbGl0ID0gZXJyb3IudG9TdHJpbmcoKS5zcGxpdCgnRXJyb3I6ICcpO1xuICAgICAgICAgICAgaWYgKGVycm9yU3BsaXQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIC8vIG1vcmUgY29uY2lzZSBlcnJvciBtZXNzYWdlLCBVUkwgYW5kIGNvbnRleHQgYXJlIGF0dGFjaGVkIGJ5IGNhbGxlciBhbnl3YXlzXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JTcGxpdFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChTdHJpbmdzLmVuZHNXaXRoKGVycm9yTWVzc2FnZSwgJy4nKSkge1xuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZS5zdWJzdHIoMCwgZXJyb3JNZXNzYWdlLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVbnJlc29sdmVkU2NoZW1hKHt9LCBbbG9jYWxpemUoJ2pzb24uc2NoZW1hLm5vY29udGVudCcsICdVbmFibGUgdG8gbG9hZCBzY2hlbWEgZnJvbSBcXCd7MH1cXCc6IHsxfS4nLCB0b0Rpc3BsYXlTdHJpbmcodXJsKSwgZXJyb3JNZXNzYWdlKV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEpTT05TY2hlbWFTZXJ2aWNlLnByb3RvdHlwZS5yZXNvbHZlU2NoZW1hQ29udGVudCA9IGZ1bmN0aW9uIChzY2hlbWFUb1Jlc29sdmUsIHNjaGVtYVVSTCwgZGVwZW5kZW5jaWVzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZXNvbHZlRXJyb3JzID0gc2NoZW1hVG9SZXNvbHZlLmVycm9ycy5zbGljZSgwKTtcbiAgICAgICAgdmFyIHNjaGVtYSA9IHNjaGVtYVRvUmVzb2x2ZS5zY2hlbWE7XG4gICAgICAgIGlmIChzY2hlbWEuJHNjaGVtYSkge1xuICAgICAgICAgICAgdmFyIGlkID0gbm9ybWFsaXplSWQoc2NoZW1hLiRzY2hlbWEpO1xuICAgICAgICAgICAgaWYgKGlkID09PSAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wMy9zY2hlbWEnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZS5yZXNvbHZlKG5ldyBSZXNvbHZlZFNjaGVtYSh7fSwgW2xvY2FsaXplKCdqc29uLnNjaGVtYS5kcmFmdDAzLm5vdHN1cHBvcnRlZCcsIFwiRHJhZnQtMDMgc2NoZW1hcyBhcmUgbm90IHN1cHBvcnRlZC5cIildKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpZCA9PT0gJ2h0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvc2NoZW1hJykge1xuICAgICAgICAgICAgICAgIHJlc29sdmVFcnJvcnMucHVzaChsb2NhbGl6ZSgnanNvbi5zY2hlbWEuZHJhZnQyMDE5MDkubm90c3VwcG9ydGVkJywgXCJEcmFmdCAyMDE5LTA5IHNjaGVtYXMgYXJlIG5vdCB5ZXQgZnVsbHkgc3VwcG9ydGVkLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRleHRTZXJ2aWNlID0gdGhpcy5jb250ZXh0U2VydmljZTtcbiAgICAgICAgdmFyIGZpbmRTZWN0aW9uID0gZnVuY3Rpb24gKHNjaGVtYSwgcGF0aCkge1xuICAgICAgICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gc2NoZW1hO1xuICAgICAgICAgICAgaWYgKHBhdGhbMF0gPT09ICcvJykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cigxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhdGguc3BsaXQoJy8nKS5zb21lKGZ1bmN0aW9uIChwYXJ0KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcGFydF07XG4gICAgICAgICAgICAgICAgcmV0dXJuICFjdXJyZW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG1lcmdlID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlUm9vdCwgc291cmNlVVJJLCByZWZTZWdtZW50KSB7XG4gICAgICAgICAgICB2YXIgcGF0aCA9IHJlZlNlZ21lbnQgPyBkZWNvZGVVUklDb21wb25lbnQocmVmU2VnbWVudCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgc2VjdGlvbiA9IGZpbmRTZWN0aW9uKHNvdXJjZVJvb3QsIHBhdGgpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VjdGlvbi5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICF0YXJnZXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzZWN0aW9uW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlRXJyb3JzLnB1c2gobG9jYWxpemUoJ2pzb24uc2NoZW1hLmludmFsaWRyZWYnLCAnJHJlZiBcXCd7MH1cXCcgaW4gXFwnezF9XFwnIGNhbiBub3QgYmUgcmVzb2x2ZWQuJywgcGF0aCwgc291cmNlVVJJKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXNvbHZlRXh0ZXJuYWxMaW5rID0gZnVuY3Rpb24gKG5vZGUsIHVyaSwgcmVmU2VnbWVudCwgcGFyZW50U2NoZW1hVVJMLCBwYXJlbnRTY2hlbWFEZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0U2VydmljZSAmJiAhL15cXHcrOlxcL1xcLy4qLy50ZXN0KHVyaSkpIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBjb250ZXh0U2VydmljZS5yZXNvbHZlUmVsYXRpdmVQYXRoKHVyaSwgcGFyZW50U2NoZW1hVVJMKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVyaSA9IG5vcm1hbGl6ZUlkKHVyaSk7XG4gICAgICAgICAgICB2YXIgcmVmZXJlbmNlZEhhbmRsZSA9IF90aGlzLmdldE9yQWRkU2NoZW1hSGFuZGxlKHVyaSk7XG4gICAgICAgICAgICByZXR1cm4gcmVmZXJlbmNlZEhhbmRsZS5nZXRVbnJlc29sdmVkU2NoZW1hKCkudGhlbihmdW5jdGlvbiAodW5yZXNvbHZlZFNjaGVtYSkge1xuICAgICAgICAgICAgICAgIHBhcmVudFNjaGVtYURlcGVuZGVuY2llc1t1cmldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodW5yZXNvbHZlZFNjaGVtYS5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2MgPSByZWZTZWdtZW50ID8gdXJpICsgJyMnICsgcmVmU2VnbWVudCA6IHVyaTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUVycm9ycy5wdXNoKGxvY2FsaXplKCdqc29uLnNjaGVtYS5wcm9ibGVtbG9hZGluZ3JlZicsICdQcm9ibGVtcyBsb2FkaW5nIHJlZmVyZW5jZSBcXCd7MH1cXCc6IHsxfScsIGxvYywgdW5yZXNvbHZlZFNjaGVtYS5lcnJvcnNbMF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWVyZ2Uobm9kZSwgdW5yZXNvbHZlZFNjaGVtYS5zY2hlbWEsIHVyaSwgcmVmU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVSZWZzKG5vZGUsIHVucmVzb2x2ZWRTY2hlbWEuc2NoZW1hLCB1cmksIHJlZmVyZW5jZWRIYW5kbGUuZGVwZW5kZW5jaWVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcmVzb2x2ZVJlZnMgPSBmdW5jdGlvbiAobm9kZSwgcGFyZW50U2NoZW1hLCBwYXJlbnRTY2hlbWFVUkwsIHBhcmVudFNjaGVtYURlcGVuZGVuY2llcykge1xuICAgICAgICAgICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdG9XYWxrID0gW25vZGVdO1xuICAgICAgICAgICAgdmFyIHNlZW4gPSBbXTtcbiAgICAgICAgICAgIHZhciBvcGVuUHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBjb2xsZWN0RW50cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZW50cmllcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJpZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBlbnRyaWVzXzEgPSBlbnRyaWVzOyBfYSA8IGVudHJpZXNfMS5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllc18xW19hXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvV2Fsay5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY29sbGVjdE1hcEVudHJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hcHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICBtYXBzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgbWFwc18xID0gbWFwczsgX2EgPCBtYXBzXzEubGVuZ3RoOyBfYSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXAgPSBtYXBzXzFbX2FdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1hcCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgaW4gbWFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gbWFwW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9XYWxrLnB1c2goZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY29sbGVjdEFycmF5RW50cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXlzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgYXJyYXlzXzEgPSBhcnJheXM7IF9hIDwgYXJyYXlzXzEubGVuZ3RoOyBfYSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IGFycmF5c18xW19hXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IDAsIGFycmF5XzEgPSBhcnJheTsgX2IgPCBhcnJheV8xLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IGFycmF5XzFbX2JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50cnkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvV2Fsay5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGhhbmRsZVJlZiA9IGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZW5SZWZzID0gW107XG4gICAgICAgICAgICAgICAgd2hpbGUgKG5leHQuJHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gbmV4dC4kcmVmO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VnbWVudHMgPSByZWYuc3BsaXQoJyMnLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG5leHQuJHJlZjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlZ21lbnRzWzBdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5Qcm9taXNlcy5wdXNoKHJlc29sdmVFeHRlcm5hbExpbmsobmV4dCwgc2VnbWVudHNbMF0sIHNlZ21lbnRzWzFdLCBwYXJlbnRTY2hlbWFVUkwsIHBhcmVudFNjaGVtYURlcGVuZGVuY2llcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlZW5SZWZzLmluZGV4T2YocmVmKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXJnZShuZXh0LCBwYXJlbnRTY2hlbWEsIHBhcmVudFNjaGVtYVVSTCwgc2VnbWVudHNbMV0pOyAvLyBjYW4gc2V0IG5leHQuJHJlZiBhZ2FpbiwgdXNlIHNlZW5SZWZzIHRvIGF2b2lkIGNpcmNsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZW5SZWZzLnB1c2gocmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2xsZWN0RW50cmllcyhuZXh0Lml0ZW1zLCBuZXh0LmFkZGl0aW9uYWxJdGVtcywgbmV4dC5hZGRpdGlvbmFsUHJvcGVydGllcywgbmV4dC5ub3QsIG5leHQuY29udGFpbnMsIG5leHQucHJvcGVydHlOYW1lcywgbmV4dC5pZiwgbmV4dC50aGVuLCBuZXh0LmVsc2UpO1xuICAgICAgICAgICAgICAgIGNvbGxlY3RNYXBFbnRyaWVzKG5leHQuZGVmaW5pdGlvbnMsIG5leHQucHJvcGVydGllcywgbmV4dC5wYXR0ZXJuUHJvcGVydGllcywgbmV4dC5kZXBlbmRlbmNpZXMpO1xuICAgICAgICAgICAgICAgIGNvbGxlY3RBcnJheUVudHJpZXMobmV4dC5hbnlPZiwgbmV4dC5hbGxPZiwgbmV4dC5vbmVPZiwgbmV4dC5pdGVtcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2hpbGUgKHRvV2Fsay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHRvV2Fsay5wb3AoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vlbi5pbmRleE9mKG5leHQpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlZW4ucHVzaChuZXh0KTtcbiAgICAgICAgICAgICAgICBoYW5kbGVSZWYobmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvbWlzZS5hbGwob3BlblByb21pc2VzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVSZWZzKHNjaGVtYSwgc2NoZW1hLCBzY2hlbWFVUkwsIGRlcGVuZGVuY2llcykudGhlbihmdW5jdGlvbiAoXykgeyByZXR1cm4gbmV3IFJlc29sdmVkU2NoZW1hKHNjaGVtYSwgcmVzb2x2ZUVycm9ycyk7IH0pO1xuICAgIH07XG4gICAgSlNPTlNjaGVtYVNlcnZpY2UucHJvdG90eXBlLmdldFNjaGVtYUZvclJlc291cmNlID0gZnVuY3Rpb24gKHJlc291cmNlLCBkb2N1bWVudCkge1xuICAgICAgICAvLyBmaXJzdCB1c2UgJHNjaGVtYSBpZiBwcmVzZW50XG4gICAgICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5yb290ICYmIGRvY3VtZW50LnJvb3QudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhciBzY2hlbWFQcm9wZXJ0aWVzID0gZG9jdW1lbnQucm9vdC5wcm9wZXJ0aWVzLmZpbHRlcihmdW5jdGlvbiAocCkgeyByZXR1cm4gKHAua2V5Tm9kZS52YWx1ZSA9PT0gJyRzY2hlbWEnKSAmJiBwLnZhbHVlTm9kZSAmJiBwLnZhbHVlTm9kZS50eXBlID09PSAnc3RyaW5nJzsgfSk7XG4gICAgICAgICAgICBpZiAoc2NoZW1hUHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlTm9kZSA9IHNjaGVtYVByb3BlcnRpZXNbMF0udmFsdWVOb2RlO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZU5vZGUgJiYgdmFsdWVOb2RlLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY2hlbWVJZCA9IFBhcnNlci5nZXROb2RlVmFsdWUodmFsdWVOb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjaGVtZUlkICYmIFN0cmluZ3Muc3RhcnRzV2l0aChzY2hlbWVJZCwgJy4nKSAmJiB0aGlzLmNvbnRleHRTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWVJZCA9IHRoaXMuY29udGV4dFNlcnZpY2UucmVzb2x2ZVJlbGF0aXZlUGF0aChzY2hlbWVJZCwgcmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gbm9ybWFsaXplSWQoc2NoZW1lSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3JBZGRTY2hlbWFIYW5kbGUoaWQpLmdldFJlc29sdmVkU2NoZW1hKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVkU2NoZW1hRm9yUmVzb3VyY2UgJiYgdGhpcy5jYWNoZWRTY2hlbWFGb3JSZXNvdXJjZS5yZXNvdXJjZSA9PT0gcmVzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZFNjaGVtYUZvclJlc291cmNlLnJlc29sdmVkU2NoZW1hO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWVuID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIHNjaGVtYXMgPSBbXTtcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWRSZXNvdXJjZSA9IG5vcm1hbGl6ZVJlc291cmNlRm9yTWF0Y2hpbmcocmVzb3VyY2UpO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5maWxlUGF0dGVybkFzc29jaWF0aW9uczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IF9hW19pXTtcbiAgICAgICAgICAgIGlmIChlbnRyeS5tYXRjaGVzUGF0dGVybihub3JtYWxpemVkUmVzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IGVudHJ5LmdldFVSSXMoKTsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjaGVtYUlkID0gX2NbX2JdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZW5bc2NoZW1hSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFzLnB1c2goc2NoZW1hSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VlbltzY2hlbWFJZF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciByZXNvbHZlZFNjaGVtYSA9IHNjaGVtYXMubGVuZ3RoID4gMCA/IHRoaXMuY3JlYXRlQ29tYmluZWRTY2hlbWEocmVzb3VyY2UsIHNjaGVtYXMpLmdldFJlc29sdmVkU2NoZW1hKCkgOiB0aGlzLnByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLmNhY2hlZFNjaGVtYUZvclJlc291cmNlID0geyByZXNvdXJjZTogcmVzb3VyY2UsIHJlc29sdmVkU2NoZW1hOiByZXNvbHZlZFNjaGVtYSB9O1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWRTY2hlbWE7XG4gICAgfTtcbiAgICBKU09OU2NoZW1hU2VydmljZS5wcm90b3R5cGUuY3JlYXRlQ29tYmluZWRTY2hlbWEgPSBmdW5jdGlvbiAocmVzb3VyY2UsIHNjaGVtYUlkcykge1xuICAgICAgICBpZiAoc2NoZW1hSWRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3JBZGRTY2hlbWFIYW5kbGUoc2NoZW1hSWRzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjb21iaW5lZFNjaGVtYUlkID0gJ3NjaGVtYXNlcnZpY2U6Ly9jb21iaW5lZFNjaGVtYS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlc291cmNlKTtcbiAgICAgICAgICAgIHZhciBjb21iaW5lZFNjaGVtYSA9IHtcbiAgICAgICAgICAgICAgICBhbGxPZjogc2NoZW1hSWRzLm1hcChmdW5jdGlvbiAoc2NoZW1hSWQpIHsgcmV0dXJuICh7ICRyZWY6IHNjaGVtYUlkIH0pOyB9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFNjaGVtYUhhbmRsZShjb21iaW5lZFNjaGVtYUlkLCBjb21iaW5lZFNjaGVtYSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEpTT05TY2hlbWFTZXJ2aWNlLnByb3RvdHlwZS5nZXRNYXRjaGluZ1NjaGVtYXMgPSBmdW5jdGlvbiAoZG9jdW1lbnQsIGpzb25Eb2N1bWVudCwgc2NoZW1hKSB7XG4gICAgICAgIGlmIChzY2hlbWEpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IHNjaGVtYS5pZCB8fCAoJ3NjaGVtYXNlcnZpY2U6Ly91bnRpdGxlZC9tYXRjaGluZ1NjaGVtYXMvJyArIGlkQ291bnRlcisrKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVTY2hlbWFDb250ZW50KG5ldyBVbnJlc29sdmVkU2NoZW1hKHNjaGVtYSksIGlkLCB7fSkudGhlbihmdW5jdGlvbiAocmVzb2x2ZWRTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ganNvbkRvY3VtZW50LmdldE1hdGNoaW5nU2NoZW1hcyhyZXNvbHZlZFNjaGVtYS5zY2hlbWEpLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gIXMuaW52ZXJ0ZWQ7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2NoZW1hRm9yUmVzb3VyY2UoZG9jdW1lbnQudXJpLCBqc29uRG9jdW1lbnQpLnRoZW4oZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgICAgICAgaWYgKHNjaGVtYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBqc29uRG9jdW1lbnQuZ2V0TWF0Y2hpbmdTY2hlbWFzKHNjaGVtYS5zY2hlbWEpLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gIXMuaW52ZXJ0ZWQ7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBKU09OU2NoZW1hU2VydmljZTtcbn0oKSk7XG5leHBvcnQgeyBKU09OU2NoZW1hU2VydmljZSB9O1xudmFyIGlkQ291bnRlciA9IDA7XG5mdW5jdGlvbiBub3JtYWxpemVJZChpZCkge1xuICAgIC8vIHJlbW92ZSB0cmFpbGluZyAnIycsIG5vcm1hbGl6ZSBkcml2ZSBjYXBpdGFsaXphdGlvblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBVUkkucGFyc2UoaWQpLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG59XG5mdW5jdGlvbiBub3JtYWxpemVSZXNvdXJjZUZvck1hdGNoaW5nKHJlc291cmNlKSB7XG4gICAgLy8gcmVtb3ZlIHF1ZXJ1ZXMgYW5kIGZyYWdtZW50cywgbm9ybWFsaXplIGRyaXZlIGNhcGl0YWxpemF0aW9uXG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIFVSSS5wYXJzZShyZXNvdXJjZSkud2l0aCh7IGZyYWdtZW50OiBudWxsLCBxdWVyeTogbnVsbCB9KS50b1N0cmluZygpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG4gICAgfVxufVxuZnVuY3Rpb24gdG9EaXNwbGF5U3RyaW5nKHVybCkge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciB1cmkgPSBVUkkucGFyc2UodXJsKTtcbiAgICAgICAgaWYgKHVyaS5zY2hlbWUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgcmV0dXJuIHVyaS5mc1BhdGg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaWdub3JlXG4gICAgfVxuICAgIHJldHVybiB1cmw7XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IFVucmVzb2x2ZWRTY2hlbWEgfSBmcm9tICcuL2pzb25TY2hlbWFTZXJ2aWNlLmpzJztcbmltcG9ydCB7IEVycm9yQ29kZSwgRGlhZ25vc3RpYywgRGlhZ25vc3RpY1NldmVyaXR5LCBSYW5nZSB9IGZyb20gJy4uL2pzb25MYW5ndWFnZVR5cGVzLmpzJztcbmltcG9ydCAqIGFzIG5scyBmcm9tICcuLy4uLy4uLy4uL2ZpbGxlcnMvdnNjb2RlLW5scy5qcyc7XG5pbXBvcnQgeyBpc0Jvb2xlYW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RzLmpzJztcbnZhciBsb2NhbGl6ZSA9IG5scy5sb2FkTWVzc2FnZUJ1bmRsZSgpO1xudmFyIEpTT05WYWxpZGF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEpTT05WYWxpZGF0aW9uKGpzb25TY2hlbWFTZXJ2aWNlLCBwcm9taXNlQ29uc3RydWN0b3IpIHtcbiAgICAgICAgdGhpcy5qc29uU2NoZW1hU2VydmljZSA9IGpzb25TY2hlbWFTZXJ2aWNlO1xuICAgICAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlQ29uc3RydWN0b3I7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBKU09OVmFsaWRhdGlvbi5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHJhdykge1xuICAgICAgICBpZiAocmF3KSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb25FbmFibGVkID0gcmF3LnZhbGlkYXRlICE9PSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudFNldmVyaXR5ID0gcmF3LmFsbG93Q29tbWVudHMgPyB1bmRlZmluZWQgOiBEaWFnbm9zdGljU2V2ZXJpdHkuRXJyb3I7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEpTT05WYWxpZGF0aW9uLnByb3RvdHlwZS5kb1ZhbGlkYXRpb24gPSBmdW5jdGlvbiAodGV4dERvY3VtZW50LCBqc29uRG9jdW1lbnQsIGRvY3VtZW50U2V0dGluZ3MsIHNjaGVtYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGlvbkVuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpYWdub3N0aWNzID0gW107XG4gICAgICAgIHZhciBhZGRlZCA9IHt9O1xuICAgICAgICB2YXIgYWRkUHJvYmxlbSA9IGZ1bmN0aW9uIChwcm9ibGVtKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgZHVwbGljYXRlZCBtZXNzYWdlc1xuICAgICAgICAgICAgdmFyIHNpZ25hdHVyZSA9IHByb2JsZW0ucmFuZ2Uuc3RhcnQubGluZSArICcgJyArIHByb2JsZW0ucmFuZ2Uuc3RhcnQuY2hhcmFjdGVyICsgJyAnICsgcHJvYmxlbS5tZXNzYWdlO1xuICAgICAgICAgICAgaWYgKCFhZGRlZFtzaWduYXR1cmVdKSB7XG4gICAgICAgICAgICAgICAgYWRkZWRbc2lnbmF0dXJlXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGlhZ25vc3RpY3MucHVzaChwcm9ibGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldERpYWdub3N0aWNzID0gZnVuY3Rpb24gKHNjaGVtYSkge1xuICAgICAgICAgICAgdmFyIHRyYWlsaW5nQ29tbWFTZXZlcml0eSA9IGRvY3VtZW50U2V0dGluZ3MgPyB0b0RpYWdub3N0aWNTZXZlcml0eShkb2N1bWVudFNldHRpbmdzLnRyYWlsaW5nQ29tbWFzKSA6IERpYWdub3N0aWNTZXZlcml0eS5FcnJvcjtcbiAgICAgICAgICAgIHZhciBjb21tZW50U2V2ZXJpdHkgPSBkb2N1bWVudFNldHRpbmdzID8gdG9EaWFnbm9zdGljU2V2ZXJpdHkoZG9jdW1lbnRTZXR0aW5ncy5jb21tZW50cykgOiBfdGhpcy5jb21tZW50U2V2ZXJpdHk7XG4gICAgICAgICAgICB2YXIgc2NoZW1hVmFsaWRhdGlvbiA9IChkb2N1bWVudFNldHRpbmdzID09PSBudWxsIHx8IGRvY3VtZW50U2V0dGluZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRvY3VtZW50U2V0dGluZ3Muc2NoZW1hVmFsaWRhdGlvbikgPyB0b0RpYWdub3N0aWNTZXZlcml0eShkb2N1bWVudFNldHRpbmdzLnNjaGVtYVZhbGlkYXRpb24pIDogRGlhZ25vc3RpY1NldmVyaXR5Lldhcm5pbmc7XG4gICAgICAgICAgICB2YXIgc2NoZW1hUmVxdWVzdCA9IChkb2N1bWVudFNldHRpbmdzID09PSBudWxsIHx8IGRvY3VtZW50U2V0dGluZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRvY3VtZW50U2V0dGluZ3Muc2NoZW1hUmVxdWVzdCkgPyB0b0RpYWdub3N0aWNTZXZlcml0eShkb2N1bWVudFNldHRpbmdzLnNjaGVtYVJlcXVlc3QpIDogRGlhZ25vc3RpY1NldmVyaXR5Lldhcm5pbmc7XG4gICAgICAgICAgICBpZiAoc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjaGVtYS5lcnJvcnMubGVuZ3RoICYmIGpzb25Eb2N1bWVudC5yb290ICYmIHNjaGVtYVJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFzdFJvb3QgPSBqc29uRG9jdW1lbnQucm9vdDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gYXN0Um9vdC50eXBlID09PSAnb2JqZWN0JyA/IGFzdFJvb3QucHJvcGVydGllc1swXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5ICYmIHByb3BlcnR5LmtleU5vZGUudmFsdWUgPT09ICckc2NoZW1hJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBwcm9wZXJ0eS52YWx1ZU5vZGUgfHwgcHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBSYW5nZS5jcmVhdGUodGV4dERvY3VtZW50LnBvc2l0aW9uQXQobm9kZS5vZmZzZXQpLCB0ZXh0RG9jdW1lbnQucG9zaXRpb25BdChub2RlLm9mZnNldCArIG5vZGUubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRQcm9ibGVtKERpYWdub3N0aWMuY3JlYXRlKHJhbmdlLCBzY2hlbWEuZXJyb3JzWzBdLCBzY2hlbWFSZXF1ZXN0LCBFcnJvckNvZGUuU2NoZW1hUmVzb2x2ZUVycm9yKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBSYW5nZS5jcmVhdGUodGV4dERvY3VtZW50LnBvc2l0aW9uQXQoYXN0Um9vdC5vZmZzZXQpLCB0ZXh0RG9jdW1lbnQucG9zaXRpb25BdChhc3RSb290Lm9mZnNldCArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFByb2JsZW0oRGlhZ25vc3RpYy5jcmVhdGUocmFuZ2UsIHNjaGVtYS5lcnJvcnNbMF0sIHNjaGVtYVJlcXVlc3QsIEVycm9yQ29kZS5TY2hlbWFSZXNvbHZlRXJyb3IpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzY2hlbWFWYWxpZGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW1hbnRpY0Vycm9ycyA9IGpzb25Eb2N1bWVudC52YWxpZGF0ZSh0ZXh0RG9jdW1lbnQsIHNjaGVtYS5zY2hlbWEsIHNjaGVtYVZhbGlkYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VtYW50aWNFcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbWFudGljRXJyb3JzLmZvckVhY2goYWRkUHJvYmxlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNjaGVtYUFsbG93c0NvbW1lbnRzKHNjaGVtYS5zY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRTZXZlcml0eSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNjaGVtYUFsbG93c1RyYWlsaW5nQ29tbWFzKHNjaGVtYS5zY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWlsaW5nQ29tbWFTZXZlcml0eSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0ganNvbkRvY3VtZW50LnN5bnRheEVycm9yczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICBpZiAocC5jb2RlID09PSBFcnJvckNvZGUuVHJhaWxpbmdDb21tYSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRyYWlsaW5nQ29tbWFTZXZlcml0eSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHAuc2V2ZXJpdHkgPSB0cmFpbGluZ0NvbW1hU2V2ZXJpdHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFkZFByb2JsZW0ocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbW1lbnRTZXZlcml0eSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZV8xID0gbG9jYWxpemUoJ0ludmFsaWRDb21tZW50VG9rZW4nLCAnQ29tbWVudHMgYXJlIG5vdCBwZXJtaXR0ZWQgaW4gSlNPTi4nKTtcbiAgICAgICAgICAgICAgICBqc29uRG9jdW1lbnQuY29tbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgICAgICBhZGRQcm9ibGVtKERpYWdub3N0aWMuY3JlYXRlKGMsIG1lc3NhZ2VfMSwgY29tbWVudFNldmVyaXR5LCBFcnJvckNvZGUuQ29tbWVudE5vdFBlcm1pdHRlZCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRpYWdub3N0aWNzO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoc2NoZW1hKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSBzY2hlbWEuaWQgfHwgKCdzY2hlbWFzZXJ2aWNlOi8vdW50aXRsZWQvJyArIGlkQ291bnRlcisrKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmpzb25TY2hlbWFTZXJ2aWNlLnJlc29sdmVTY2hlbWFDb250ZW50KG5ldyBVbnJlc29sdmVkU2NoZW1hKHNjaGVtYSksIGlkLCB7fSkudGhlbihmdW5jdGlvbiAocmVzb2x2ZWRTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGlhZ25vc3RpY3MocmVzb2x2ZWRTY2hlbWEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuanNvblNjaGVtYVNlcnZpY2UuZ2V0U2NoZW1hRm9yUmVzb3VyY2UodGV4dERvY3VtZW50LnVyaSwganNvbkRvY3VtZW50KS50aGVuKGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXREaWFnbm9zdGljcyhzY2hlbWEpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBKU09OVmFsaWRhdGlvbjtcbn0oKSk7XG5leHBvcnQgeyBKU09OVmFsaWRhdGlvbiB9O1xudmFyIGlkQ291bnRlciA9IDA7XG5mdW5jdGlvbiBzY2hlbWFBbGxvd3NDb21tZW50cyhzY2hlbWFSZWYpIHtcbiAgICBpZiAoc2NoZW1hUmVmICYmIHR5cGVvZiBzY2hlbWFSZWYgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc0Jvb2xlYW4oc2NoZW1hUmVmLmFsbG93Q29tbWVudHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZW1hUmVmLmFsbG93Q29tbWVudHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYVJlZi5hbGxPZikge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHNjaGVtYVJlZi5hbGxPZjsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NoZW1hID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIHZhciBhbGxvdyA9IHNjaGVtYUFsbG93c0NvbW1lbnRzKHNjaGVtYSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQm9vbGVhbihhbGxvdykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsbG93O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gc2NoZW1hQWxsb3dzVHJhaWxpbmdDb21tYXMoc2NoZW1hUmVmKSB7XG4gICAgaWYgKHNjaGVtYVJlZiAmJiB0eXBlb2Ygc2NoZW1hUmVmID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNCb29sZWFuKHNjaGVtYVJlZi5hbGxvd1RyYWlsaW5nQ29tbWFzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYVJlZi5hbGxvd1RyYWlsaW5nQ29tbWFzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZXByU2NoZW1hUmVmID0gc2NoZW1hUmVmO1xuICAgICAgICBpZiAoaXNCb29sZWFuKGRlcHJTY2hlbWFSZWZbJ2FsbG93c1RyYWlsaW5nQ29tbWFzJ10pKSB7IC8vIGRlcHJlY2F0ZWRcbiAgICAgICAgICAgIHJldHVybiBkZXByU2NoZW1hUmVmWydhbGxvd3NUcmFpbGluZ0NvbW1hcyddO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2hlbWFSZWYuYWxsT2YpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBzY2hlbWFSZWYuYWxsT2Y7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjaGVtYSA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3cgPSBzY2hlbWFBbGxvd3NUcmFpbGluZ0NvbW1hcyhzY2hlbWEpO1xuICAgICAgICAgICAgICAgIGlmIChpc0Jvb2xlYW4oYWxsb3cpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGxvdztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIHRvRGlhZ25vc3RpY1NldmVyaXR5KHNldmVyaXR5TGV2ZWwpIHtcbiAgICBzd2l0Y2ggKHNldmVyaXR5TGV2ZWwpIHtcbiAgICAgICAgY2FzZSAnZXJyb3InOiByZXR1cm4gRGlhZ25vc3RpY1NldmVyaXR5LkVycm9yO1xuICAgICAgICBjYXNlICd3YXJuaW5nJzogcmV0dXJuIERpYWdub3N0aWNTZXZlcml0eS5XYXJuaW5nO1xuICAgICAgICBjYXNlICdpZ25vcmUnOiByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG52YXIgRGlnaXQwID0gNDg7XG52YXIgRGlnaXQ5ID0gNTc7XG52YXIgQSA9IDY1O1xudmFyIGEgPSA5NztcbnZhciBmID0gMTAyO1xuZXhwb3J0IGZ1bmN0aW9uIGhleERpZ2l0KGNoYXJDb2RlKSB7XG4gICAgaWYgKGNoYXJDb2RlIDwgRGlnaXQwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoY2hhckNvZGUgPD0gRGlnaXQ5KSB7XG4gICAgICAgIHJldHVybiBjaGFyQ29kZSAtIERpZ2l0MDtcbiAgICB9XG4gICAgaWYgKGNoYXJDb2RlIDwgYSkge1xuICAgICAgICBjaGFyQ29kZSArPSAoYSAtIEEpO1xuICAgIH1cbiAgICBpZiAoY2hhckNvZGUgPj0gYSAmJiBjaGFyQ29kZSA8PSBmKSB7XG4gICAgICAgIHJldHVybiBjaGFyQ29kZSAtIGEgKyAxMDtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG5leHBvcnQgZnVuY3Rpb24gY29sb3JGcm9tSGV4KHRleHQpIHtcbiAgICBpZiAodGV4dFswXSAhPT0gJyMnKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHN3aXRjaCAodGV4dC5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZWQ6IChoZXhEaWdpdCh0ZXh0LmNoYXJDb2RlQXQoMSkpICogMHgxMSkgLyAyNTUuMCxcbiAgICAgICAgICAgICAgICBncmVlbjogKGhleERpZ2l0KHRleHQuY2hhckNvZGVBdCgyKSkgKiAweDExKSAvIDI1NS4wLFxuICAgICAgICAgICAgICAgIGJsdWU6IChoZXhEaWdpdCh0ZXh0LmNoYXJDb2RlQXQoMykpICogMHgxMSkgLyAyNTUuMCxcbiAgICAgICAgICAgICAgICBhbHBoYTogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZWQ6IChoZXhEaWdpdCh0ZXh0LmNoYXJDb2RlQXQoMSkpICogMHgxMSkgLyAyNTUuMCxcbiAgICAgICAgICAgICAgICBncmVlbjogKGhleERpZ2l0KHRleHQuY2hhckNvZGVBdCgyKSkgKiAweDExKSAvIDI1NS4wLFxuICAgICAgICAgICAgICAgIGJsdWU6IChoZXhEaWdpdCh0ZXh0LmNoYXJDb2RlQXQoMykpICogMHgxMSkgLyAyNTUuMCxcbiAgICAgICAgICAgICAgICBhbHBoYTogKGhleERpZ2l0KHRleHQuY2hhckNvZGVBdCg0KSkgKiAweDExKSAvIDI1NS4wLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZWQ6IChoZXhEaWdpdCh0ZXh0LmNoYXJDb2RlQXQoMSkpICogMHgxMCArIGhleERpZ2l0KHRleHQuY2hhckNvZGVBdCgyKSkpIC8gMjU1LjAsXG4gICAgICAgICAgICAgICAgZ3JlZW46IChoZXhEaWdpdCh0ZXh0LmNoYXJDb2RlQXQoMykpICogMHgxMCArIGhleERpZ2l0KHRleHQuY2hhckNvZGVBdCg0KSkpIC8gMjU1LjAsXG4gICAgICAgICAgICAgICAgYmx1ZTogKGhleERpZ2l0KHRleHQuY2hhckNvZGVBdCg1KSkgKiAweDEwICsgaGV4RGlnaXQodGV4dC5jaGFyQ29kZUF0KDYpKSkgLyAyNTUuMCxcbiAgICAgICAgICAgICAgICBhbHBoYTogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZWQ6IChoZXhEaWdpdCh0ZXh0LmNoYXJDb2RlQXQoMSkpICogMHgxMCArIGhleERpZ2l0KHRleHQuY2hhckNvZGVBdCgyKSkpIC8gMjU1LjAsXG4gICAgICAgICAgICAgICAgZ3JlZW46IChoZXhEaWdpdCh0ZXh0LmNoYXJDb2RlQXQoMykpICogMHgxMCArIGhleERpZ2l0KHRleHQuY2hhckNvZGVBdCg0KSkpIC8gMjU1LjAsXG4gICAgICAgICAgICAgICAgYmx1ZTogKGhleERpZ2l0KHRleHQuY2hhckNvZGVBdCg1KSkgKiAweDEwICsgaGV4RGlnaXQodGV4dC5jaGFyQ29kZUF0KDYpKSkgLyAyNTUuMCxcbiAgICAgICAgICAgICAgICBhbHBoYTogKGhleERpZ2l0KHRleHQuY2hhckNvZGVBdCg3KSkgKiAweDEwICsgaGV4RGlnaXQodGV4dC5jaGFyQ29kZUF0KDgpKSkgLyAyNTUuMFxuICAgICAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb2xvckZyb20yNTZSR0IocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpIHtcbiAgICBpZiAoYWxwaGEgPT09IHZvaWQgMCkgeyBhbHBoYSA9IDEuMDsgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlZDogcmVkIC8gMjU1LjAsXG4gICAgICAgIGdyZWVuOiBncmVlbiAvIDI1NS4wLFxuICAgICAgICBibHVlOiBibHVlIC8gMjU1LjAsXG4gICAgICAgIGFscGhhOiBhbHBoYVxuICAgIH07XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCAqIGFzIFBhcnNlciBmcm9tICcuLi9wYXJzZXIvanNvblBhcnNlci5qcyc7XG5pbXBvcnQgKiBhcyBTdHJpbmdzIGZyb20gJy4uL3V0aWxzL3N0cmluZ3MuanMnO1xuaW1wb3J0IHsgY29sb3JGcm9tSGV4IH0gZnJvbSAnLi4vdXRpbHMvY29sb3JzLmpzJztcbmltcG9ydCB7IFJhbmdlLCBUZXh0RWRpdCwgU3ltYm9sS2luZCwgTG9jYXRpb24gfSBmcm9tIFwiLi4vanNvbkxhbmd1YWdlVHlwZXMuanNcIjtcbnZhciBKU09ORG9jdW1lbnRTeW1ib2xzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEpTT05Eb2N1bWVudFN5bWJvbHMoc2NoZW1hU2VydmljZSkge1xuICAgICAgICB0aGlzLnNjaGVtYVNlcnZpY2UgPSBzY2hlbWFTZXJ2aWNlO1xuICAgIH1cbiAgICBKU09ORG9jdW1lbnRTeW1ib2xzLnByb3RvdHlwZS5maW5kRG9jdW1lbnRTeW1ib2xzID0gZnVuY3Rpb24gKGRvY3VtZW50LCBkb2MsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGNvbnRleHQgPT09IHZvaWQgMCkgeyBjb250ZXh0ID0geyByZXN1bHRMaW1pdDogTnVtYmVyLk1BWF9WQUxVRSB9OyB9XG4gICAgICAgIHZhciByb290ID0gZG9jLnJvb3Q7XG4gICAgICAgIGlmICghcm9vdCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW1pdCA9IGNvbnRleHQucmVzdWx0TGltaXQgfHwgTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgLy8gc3BlY2lhbCBoYW5kbGluZyBmb3Iga2V5IGJpbmRpbmdzXG4gICAgICAgIHZhciByZXNvdXJjZVN0cmluZyA9IGRvY3VtZW50LnVyaTtcbiAgICAgICAgaWYgKChyZXNvdXJjZVN0cmluZyA9PT0gJ3ZzY29kZTovL2RlZmF1bHRzZXR0aW5ncy9rZXliaW5kaW5ncy5qc29uJykgfHwgU3RyaW5ncy5lbmRzV2l0aChyZXNvdXJjZVN0cmluZy50b0xvd2VyQ2FzZSgpLCAnL3VzZXIva2V5YmluZGluZ3MuanNvbicpKSB7XG4gICAgICAgICAgICBpZiAocm9vdC50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdF8xID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHJvb3QuaXRlbXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IGl0ZW0ucHJvcGVydGllczsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBfY1tfYl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5LmtleU5vZGUudmFsdWUgPT09ICdrZXknICYmIHByb3BlcnR5LnZhbHVlTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBMb2NhdGlvbi5jcmVhdGUoZG9jdW1lbnQudXJpLCBnZXRSYW5nZShkb2N1bWVudCwgaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRfMS5wdXNoKHsgbmFtZTogUGFyc2VyLmdldE5vZGVWYWx1ZShwcm9wZXJ0eS52YWx1ZU5vZGUpLCBraW5kOiBTeW1ib2xLaW5kLkZ1bmN0aW9uLCBsb2NhdGlvbjogbG9jYXRpb24gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0LS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW1pdCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Lm9uUmVzdWx0TGltaXRFeGNlZWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQub25SZXN1bHRMaW1pdEV4Y2VlZGVkKHJlc291cmNlU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0XzE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvVmlzaXQgPSBbXG4gICAgICAgICAgICB7IG5vZGU6IHJvb3QsIGNvbnRhaW5lck5hbWU6ICcnIH1cbiAgICAgICAgXTtcbiAgICAgICAgdmFyIG5leHRUb1Zpc2l0ID0gMDtcbiAgICAgICAgdmFyIGxpbWl0RXhjZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB2YXIgY29sbGVjdE91dGxpbmVFbnRyaWVzID0gZnVuY3Rpb24gKG5vZGUsIGNvbnRhaW5lck5hbWUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICBub2RlLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvVmlzaXQucHVzaCh7IG5vZGU6IG5vZGUsIGNvbnRhaW5lck5hbWU6IGNvbnRhaW5lck5hbWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBub2RlLnByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlTm9kZSA9IHByb3BlcnR5LnZhbHVlTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbWl0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0LS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gTG9jYXRpb24uY3JlYXRlKGRvY3VtZW50LnVyaSwgZ2V0UmFuZ2UoZG9jdW1lbnQsIHByb3BlcnR5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkQ29udGFpbmVyTmFtZSA9IGNvbnRhaW5lck5hbWUgPyBjb250YWluZXJOYW1lICsgJy4nICsgcHJvcGVydHkua2V5Tm9kZS52YWx1ZSA6IHByb3BlcnR5LmtleU5vZGUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goeyBuYW1lOiBfdGhpcy5nZXRLZXlMYWJlbChwcm9wZXJ0eSksIGtpbmQ6IF90aGlzLmdldFN5bWJvbEtpbmQodmFsdWVOb2RlLnR5cGUpLCBsb2NhdGlvbjogbG9jYXRpb24sIGNvbnRhaW5lck5hbWU6IGNvbnRhaW5lck5hbWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9WaXNpdC5wdXNoKHsgbm9kZTogdmFsdWVOb2RlLCBjb250YWluZXJOYW1lOiBjaGlsZENvbnRhaW5lck5hbWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW1pdEV4Y2VlZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBicmVhdGggZmlyc3QgdHJhdmVyc2FsXG4gICAgICAgIHdoaWxlIChuZXh0VG9WaXNpdCA8IHRvVmlzaXQubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IHRvVmlzaXRbbmV4dFRvVmlzaXQrK107XG4gICAgICAgICAgICBjb2xsZWN0T3V0bGluZUVudHJpZXMobmV4dC5ub2RlLCBuZXh0LmNvbnRhaW5lck5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW1pdEV4Y2VlZGVkICYmIGNvbnRleHQgJiYgY29udGV4dC5vblJlc3VsdExpbWl0RXhjZWVkZWQpIHtcbiAgICAgICAgICAgIGNvbnRleHQub25SZXN1bHRMaW1pdEV4Y2VlZGVkKHJlc291cmNlU3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgSlNPTkRvY3VtZW50U3ltYm9scy5wcm90b3R5cGUuZmluZERvY3VtZW50U3ltYm9sczIgPSBmdW5jdGlvbiAoZG9jdW1lbnQsIGRvYywgY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoY29udGV4dCA9PT0gdm9pZCAwKSB7IGNvbnRleHQgPSB7IHJlc3VsdExpbWl0OiBOdW1iZXIuTUFYX1ZBTFVFIH07IH1cbiAgICAgICAgdmFyIHJvb3QgPSBkb2Mucm9vdDtcbiAgICAgICAgaWYgKCFyb290KSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbWl0ID0gY29udGV4dC5yZXN1bHRMaW1pdCB8fCBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAvLyBzcGVjaWFsIGhhbmRsaW5nIGZvciBrZXkgYmluZGluZ3NcbiAgICAgICAgdmFyIHJlc291cmNlU3RyaW5nID0gZG9jdW1lbnQudXJpO1xuICAgICAgICBpZiAoKHJlc291cmNlU3RyaW5nID09PSAndnNjb2RlOi8vZGVmYXVsdHNldHRpbmdzL2tleWJpbmRpbmdzLmpzb24nKSB8fCBTdHJpbmdzLmVuZHNXaXRoKHJlc291cmNlU3RyaW5nLnRvTG93ZXJDYXNlKCksICcvdXNlci9rZXliaW5kaW5ncy5qc29uJykpIHtcbiAgICAgICAgICAgIGlmIChyb290LnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0XzIgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gcm9vdC5pdGVtczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gaXRlbS5wcm9wZXJ0aWVzOyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IF9jW19iXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkua2V5Tm9kZS52YWx1ZSA9PT0gJ2tleScgJiYgcHJvcGVydHkudmFsdWVOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IGdldFJhbmdlKGRvY3VtZW50LCBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvblJhbmdlID0gZ2V0UmFuZ2UoZG9jdW1lbnQsIHByb3BlcnR5LmtleU5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRfMi5wdXNoKHsgbmFtZTogUGFyc2VyLmdldE5vZGVWYWx1ZShwcm9wZXJ0eS52YWx1ZU5vZGUpLCBraW5kOiBTeW1ib2xLaW5kLkZ1bmN0aW9uLCByYW5nZTogcmFuZ2UsIHNlbGVjdGlvblJhbmdlOiBzZWxlY3Rpb25SYW5nZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbWl0IDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQub25SZXN1bHRMaW1pdEV4Y2VlZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5vblJlc3VsdExpbWl0RXhjZWVkZWQocmVzb3VyY2VTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdF8yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRfMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciB0b1Zpc2l0ID0gW1xuICAgICAgICAgICAgeyBub2RlOiByb290LCByZXN1bHQ6IHJlc3VsdCB9XG4gICAgICAgIF07XG4gICAgICAgIHZhciBuZXh0VG9WaXNpdCA9IDA7XG4gICAgICAgIHZhciBsaW1pdEV4Y2VlZGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBjb2xsZWN0T3V0bGluZUVudHJpZXMgPSBmdW5jdGlvbiAobm9kZSwgcmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbWl0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0LS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gZ2V0UmFuZ2UoZG9jdW1lbnQsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb25SYW5nZSA9IHJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gU3RyaW5nKGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ltYm9sID0geyBuYW1lOiBuYW1lLCBraW5kOiBfdGhpcy5nZXRTeW1ib2xLaW5kKG5vZGUudHlwZSksIHJhbmdlOiByYW5nZSwgc2VsZWN0aW9uUmFuZ2U6IHNlbGVjdGlvblJhbmdlLCBjaGlsZHJlbjogW10gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzeW1ib2wpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvVmlzaXQucHVzaCh7IHJlc3VsdDogc3ltYm9sLmNoaWxkcmVuLCBub2RlOiBub2RlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGltaXRFeGNlZWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBub2RlLnByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlTm9kZSA9IHByb3BlcnR5LnZhbHVlTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbWl0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0LS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gZ2V0UmFuZ2UoZG9jdW1lbnQsIHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uUmFuZ2UgPSBnZXRSYW5nZShkb2N1bWVudCwgcHJvcGVydHkua2V5Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN5bWJvbCA9IHsgbmFtZTogX3RoaXMuZ2V0S2V5TGFiZWwocHJvcGVydHkpLCBraW5kOiBfdGhpcy5nZXRTeW1ib2xLaW5kKHZhbHVlTm9kZS50eXBlKSwgcmFuZ2U6IHJhbmdlLCBzZWxlY3Rpb25SYW5nZTogc2VsZWN0aW9uUmFuZ2UsIGNoaWxkcmVuOiBjaGlsZHJlbiwgZGV0YWlsOiBfdGhpcy5nZXREZXRhaWwodmFsdWVOb2RlKSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHN5bWJvbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9WaXNpdC5wdXNoKHsgcmVzdWx0OiBjaGlsZHJlbiwgbm9kZTogdmFsdWVOb2RlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGltaXRFeGNlZWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gYnJlYXRoIGZpcnN0IHRyYXZlcnNhbFxuICAgICAgICB3aGlsZSAobmV4dFRvVmlzaXQgPCB0b1Zpc2l0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIG5leHQgPSB0b1Zpc2l0W25leHRUb1Zpc2l0KytdO1xuICAgICAgICAgICAgY29sbGVjdE91dGxpbmVFbnRyaWVzKG5leHQubm9kZSwgbmV4dC5yZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW1pdEV4Y2VlZGVkICYmIGNvbnRleHQgJiYgY29udGV4dC5vblJlc3VsdExpbWl0RXhjZWVkZWQpIHtcbiAgICAgICAgICAgIGNvbnRleHQub25SZXN1bHRMaW1pdEV4Y2VlZGVkKHJlc291cmNlU3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgSlNPTkRvY3VtZW50U3ltYm9scy5wcm90b3R5cGUuZ2V0U3ltYm9sS2luZCA9IGZ1bmN0aW9uIChub2RlVHlwZSkge1xuICAgICAgICBzd2l0Y2ggKG5vZGVUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgIHJldHVybiBTeW1ib2xLaW5kLk1vZHVsZTtcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN5bWJvbEtpbmQuU3RyaW5nO1xuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gU3ltYm9sS2luZC5OdW1iZXI7XG4gICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN5bWJvbEtpbmQuQXJyYXk7XG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gU3ltYm9sS2luZC5Cb29sZWFuO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gJ251bGwnXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN5bWJvbEtpbmQuVmFyaWFibGU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEpTT05Eb2N1bWVudFN5bWJvbHMucHJvdG90eXBlLmdldEtleUxhYmVsID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgIHZhciBuYW1lID0gcHJvcGVydHkua2V5Tm9kZS52YWx1ZTtcbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXG5dL2csICfihrUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZSAmJiBuYW1lLnRyaW0oKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXFxcIlwiICsgbmFtZSArIFwiXFxcIlwiO1xuICAgIH07XG4gICAgSlNPTkRvY3VtZW50U3ltYm9scy5wcm90b3R5cGUuZ2V0RGV0YWlsID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdib29sZWFuJyB8fCBub2RlLnR5cGUgPT09ICdudW1iZXInIHx8IG5vZGUudHlwZSA9PT0gJ251bGwnIHx8IG5vZGUudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcobm9kZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID8gdW5kZWZpbmVkIDogJ1tdJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5jaGlsZHJlbi5sZW5ndGggPyB1bmRlZmluZWQgOiAne30nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBKU09ORG9jdW1lbnRTeW1ib2xzLnByb3RvdHlwZS5maW5kRG9jdW1lbnRDb2xvcnMgPSBmdW5jdGlvbiAoZG9jdW1lbnQsIGRvYywgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2hlbWFTZXJ2aWNlLmdldFNjaGVtYUZvclJlc291cmNlKGRvY3VtZW50LnVyaSwgZG9jKS50aGVuKGZ1bmN0aW9uIChzY2hlbWEpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGlmIChzY2hlbWEpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGltaXQgPSBjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0LnJlc3VsdExpbWl0ID09PSAnbnVtYmVyJyA/IGNvbnRleHQucmVzdWx0TGltaXQgOiBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaGluZ1NjaGVtYXMgPSBkb2MuZ2V0TWF0Y2hpbmdTY2hlbWFzKHNjaGVtYS5zY2hlbWEpO1xuICAgICAgICAgICAgICAgIHZhciB2aXNpdGVkTm9kZSA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgbWF0Y2hpbmdTY2hlbWFzXzEgPSBtYXRjaGluZ1NjaGVtYXM7IF9pIDwgbWF0Y2hpbmdTY2hlbWFzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzID0gbWF0Y2hpbmdTY2hlbWFzXzFbX2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXMuaW52ZXJ0ZWQgJiYgcy5zY2hlbWEgJiYgKHMuc2NoZW1hLmZvcm1hdCA9PT0gJ2NvbG9yJyB8fCBzLnNjaGVtYS5mb3JtYXQgPT09ICdjb2xvci1oZXgnKSAmJiBzLm5vZGUgJiYgcy5ub2RlLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZUlkID0gU3RyaW5nKHMubm9kZS5vZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aXNpdGVkTm9kZVtub2RlSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JGcm9tSGV4KFBhcnNlci5nZXROb2RlVmFsdWUocy5ub2RlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IGdldFJhbmdlKGRvY3VtZW50LCBzLm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7IGNvbG9yOiBjb2xvciwgcmFuZ2U6IHJhbmdlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkTm9kZVtub2RlSWRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW1pdC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW1pdCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQub25SZXN1bHRMaW1pdEV4Y2VlZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm9uUmVzdWx0TGltaXRFeGNlZWRlZChkb2N1bWVudC51cmkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBKU09ORG9jdW1lbnRTeW1ib2xzLnByb3RvdHlwZS5nZXRDb2xvclByZXNlbnRhdGlvbnMgPSBmdW5jdGlvbiAoZG9jdW1lbnQsIGRvYywgY29sb3IsIHJhbmdlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdmFyIHJlZDI1NiA9IE1hdGgucm91bmQoY29sb3IucmVkICogMjU1KSwgZ3JlZW4yNTYgPSBNYXRoLnJvdW5kKGNvbG9yLmdyZWVuICogMjU1KSwgYmx1ZTI1NiA9IE1hdGgucm91bmQoY29sb3IuYmx1ZSAqIDI1NSk7XG4gICAgICAgIGZ1bmN0aW9uIHRvVHdvRGlnaXRIZXgobikge1xuICAgICAgICAgICAgdmFyIHIgPSBuLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIHJldHVybiByLmxlbmd0aCAhPT0gMiA/ICcwJyArIHIgOiByO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYWJlbDtcbiAgICAgICAgaWYgKGNvbG9yLmFscGhhID09PSAxKSB7XG4gICAgICAgICAgICBsYWJlbCA9IFwiI1wiICsgdG9Ud29EaWdpdEhleChyZWQyNTYpICsgdG9Ud29EaWdpdEhleChncmVlbjI1NikgKyB0b1R3b0RpZ2l0SGV4KGJsdWUyNTYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGFiZWwgPSBcIiNcIiArIHRvVHdvRGlnaXRIZXgocmVkMjU2KSArIHRvVHdvRGlnaXRIZXgoZ3JlZW4yNTYpICsgdG9Ud29EaWdpdEhleChibHVlMjU2KSArIHRvVHdvRGlnaXRIZXgoTWF0aC5yb3VuZChjb2xvci5hbHBoYSAqIDI1NSkpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKHsgbGFiZWw6IGxhYmVsLCB0ZXh0RWRpdDogVGV4dEVkaXQucmVwbGFjZShyYW5nZSwgSlNPTi5zdHJpbmdpZnkobGFiZWwpKSB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiBKU09ORG9jdW1lbnRTeW1ib2xzO1xufSgpKTtcbmV4cG9ydCB7IEpTT05Eb2N1bWVudFN5bWJvbHMgfTtcbmZ1bmN0aW9uIGdldFJhbmdlKGRvY3VtZW50LCBub2RlKSB7XG4gICAgcmV0dXJuIFJhbmdlLmNyZWF0ZShkb2N1bWVudC5wb3NpdGlvbkF0KG5vZGUub2Zmc2V0KSwgZG9jdW1lbnQucG9zaXRpb25BdChub2RlLm9mZnNldCArIG5vZGUubGVuZ3RoKSk7XG59XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCAqIGFzIG5scyBmcm9tICcuLy4uLy4uLy4uL2ZpbGxlcnMvdnNjb2RlLW5scy5qcyc7XG52YXIgbG9jYWxpemUgPSBubHMubG9hZE1lc3NhZ2VCdW5kbGUoKTtcbmV4cG9ydCB2YXIgc2NoZW1hQ29udHJpYnV0aW9ucyA9IHtcbiAgICBzY2hlbWFBc3NvY2lhdGlvbnM6IFtdLFxuICAgIHNjaGVtYXM6IHtcbiAgICAgICAgLy8gcmVmZXIgdG8gdGhlIGxhdGVzdCBzY2hlbWFcbiAgICAgICAgJ2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvc2NoZW1hIyc6IHtcbiAgICAgICAgICAgICRyZWY6ICdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSMnXG4gICAgICAgIH0sXG4gICAgICAgIC8vIGJ1bmRsZSB0aGUgc2NoZW1hLXNjaGVtYSB0byBpbmNsdWRlIChsb2NhbGl6ZWQpIGRlc2NyaXB0aW9uc1xuICAgICAgICAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNC9zY2hlbWEjJzoge1xuICAgICAgICAgICAgJ3RpdGxlJzogbG9jYWxpemUoJ3NjaGVtYS5qc29uJywgJ0Rlc2NyaWJlcyBhIEpTT04gZmlsZSB1c2luZyBhIHNjaGVtYS4gU2VlIGpzb24tc2NoZW1hLm9yZyBmb3IgbW9yZSBpbmZvLicpLFxuICAgICAgICAgICAgJyRzY2hlbWEnOiAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNC9zY2hlbWEjJyxcbiAgICAgICAgICAgICdkZWZpbml0aW9ucyc6IHtcbiAgICAgICAgICAgICAgICAnc2NoZW1hQXJyYXknOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ21pbkl0ZW1zJzogMSxcbiAgICAgICAgICAgICAgICAgICAgJ2l0ZW1zJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyRyZWYnOiAnIydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3Bvc2l0aXZlSW50ZWdlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnaW50ZWdlcicsXG4gICAgICAgICAgICAgICAgICAgICdtaW5pbXVtJzogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3Bvc2l0aXZlSW50ZWdlckRlZmF1bHQwJzoge1xuICAgICAgICAgICAgICAgICAgICAnYWxsT2YnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9wb3NpdGl2ZUludGVnZXInXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogMFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnc2ltcGxlVHlwZXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICdlbnVtJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2FycmF5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdib29sZWFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbnRlZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdudWxsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdudW1iZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnc3RyaW5nQXJyYXknOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ2l0ZW1zJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbWluSXRlbXMnOiAxLFxuICAgICAgICAgICAgICAgICAgICAndW5pcXVlSXRlbXMnOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICd0eXBlJzogJ29iamVjdCcsXG4gICAgICAgICAgICAncHJvcGVydGllcyc6IHtcbiAgICAgICAgICAgICAgICAnaWQnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICdmb3JtYXQnOiAndXJpJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJyRzY2hlbWEnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICdmb3JtYXQnOiAndXJpJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ3N0cmluZydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdkZWZhdWx0Jzoge30sXG4gICAgICAgICAgICAgICAgJ211bHRpcGxlT2YnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgICAgICdtaW5pbXVtJzogMCxcbiAgICAgICAgICAgICAgICAgICAgJ2V4Y2x1c2l2ZU1pbmltdW0nOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbWF4aW11bSc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnbnVtYmVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2V4Y2x1c2l2ZU1heGltdW0nOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbWluaW11bSc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnbnVtYmVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2V4Y2x1c2l2ZU1pbmltdW0nOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbWF4TGVuZ3RoJzoge1xuICAgICAgICAgICAgICAgICAgICAnYWxsT2YnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9wb3NpdGl2ZUludGVnZXInXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdtaW5MZW5ndGgnOiB7XG4gICAgICAgICAgICAgICAgICAgICdhbGxPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJHJlZic6ICcjL2RlZmluaXRpb25zL3Bvc2l0aXZlSW50ZWdlckRlZmF1bHQwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAncGF0dGVybic6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Zvcm1hdCc6ICdyZWdleCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdhZGRpdGlvbmFsSXRlbXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICdhbnlPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdib29sZWFuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJHJlZic6ICcjJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IHt9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnaXRlbXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICdhbnlPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJHJlZic6ICcjJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJHJlZic6ICcjL2RlZmluaXRpb25zL3NjaGVtYUFycmF5J1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IHt9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbWF4SXRlbXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICdhbGxPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJHJlZic6ICcjL2RlZmluaXRpb25zL3Bvc2l0aXZlSW50ZWdlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ21pbkl0ZW1zJzoge1xuICAgICAgICAgICAgICAgICAgICAnYWxsT2YnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9wb3NpdGl2ZUludGVnZXJEZWZhdWx0MCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3VuaXF1ZUl0ZW1zJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdib29sZWFuJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ21heFByb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICdhbGxPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJHJlZic6ICcjL2RlZmluaXRpb25zL3Bvc2l0aXZlSW50ZWdlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ21pblByb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICdhbGxPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJHJlZic6ICcjL2RlZmluaXRpb25zL3Bvc2l0aXZlSW50ZWdlckRlZmF1bHQwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAncmVxdWlyZWQnOiB7XG4gICAgICAgICAgICAgICAgICAgICdhbGxPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJHJlZic6ICcjL2RlZmluaXRpb25zL3N0cmluZ0FycmF5J1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnYWRkaXRpb25hbFByb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICdhbnlPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdib29sZWFuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJHJlZic6ICcjJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IHt9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZGVmaW5pdGlvbnMnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICckcmVmJzogJyMnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0Jzoge31cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdwcm9wZXJ0aWVzJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICAnYWRkaXRpb25hbFByb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnJHJlZic6ICcjJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IHt9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAncGF0dGVyblByb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICckcmVmJzogJyMnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0Jzoge31cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdkZXBlbmRlbmNpZXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbnlPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICckcmVmJzogJyMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICckcmVmJzogJyMvZGVmaW5pdGlvbnMvc3RyaW5nQXJyYXknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZW51bSc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnYXJyYXknLFxuICAgICAgICAgICAgICAgICAgICAnbWluSXRlbXMnOiAxLFxuICAgICAgICAgICAgICAgICAgICAndW5pcXVlSXRlbXMnOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAndHlwZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2FueU9mJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICckcmVmJzogJyMvZGVmaW5pdGlvbnMvc2ltcGxlVHlwZXMnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaXRlbXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICckcmVmJzogJyMvZGVmaW5pdGlvbnMvc2ltcGxlVHlwZXMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWluSXRlbXMnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1bmlxdWVJdGVtcyc6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2Zvcm1hdCc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2FueU9mJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2VudW0nOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRlLXRpbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndXJpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2VtYWlsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hvc3RuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lwdjQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaXB2NicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZWdleCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2FsbE9mJzoge1xuICAgICAgICAgICAgICAgICAgICAnYWxsT2YnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9zY2hlbWFBcnJheSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2FueU9mJzoge1xuICAgICAgICAgICAgICAgICAgICAnYWxsT2YnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9zY2hlbWFBcnJheSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ29uZU9mJzoge1xuICAgICAgICAgICAgICAgICAgICAnYWxsT2YnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9zY2hlbWFBcnJheSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ25vdCc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2FsbE9mJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICckcmVmJzogJyMnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2RlcGVuZGVuY2llcyc6IHtcbiAgICAgICAgICAgICAgICAnZXhjbHVzaXZlTWF4aW11bSc6IFtcbiAgICAgICAgICAgICAgICAgICAgJ21heGltdW0nXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAnZXhjbHVzaXZlTWluaW11bSc6IFtcbiAgICAgICAgICAgICAgICAgICAgJ21pbmltdW0nXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdkZWZhdWx0Jzoge31cbiAgICAgICAgfSxcbiAgICAgICAgJ2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hIyc6IHtcbiAgICAgICAgICAgICd0aXRsZSc6IGxvY2FsaXplKCdzY2hlbWEuanNvbicsICdEZXNjcmliZXMgYSBKU09OIGZpbGUgdXNpbmcgYSBzY2hlbWEuIFNlZSBqc29uLXNjaGVtYS5vcmcgZm9yIG1vcmUgaW5mby4nKSxcbiAgICAgICAgICAgICdkZWZpbml0aW9ucyc6IHtcbiAgICAgICAgICAgICAgICAnc2NoZW1hQXJyYXknOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ21pbkl0ZW1zJzogMSxcbiAgICAgICAgICAgICAgICAgICAgJ2l0ZW1zJzogeyAnJHJlZic6ICcjJyB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbm9uTmVnYXRpdmVJbnRlZ2VyJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgJ21pbmltdW0nOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbm9uTmVnYXRpdmVJbnRlZ2VyRGVmYXVsdDAnOiB7XG4gICAgICAgICAgICAgICAgICAgICdhbGxPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9ub25OZWdhdGl2ZUludGVnZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICdkZWZhdWx0JzogMCB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdzaW1wbGVUeXBlcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2VudW0nOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnYXJyYXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ludGVnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ251bGwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ251bWJlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdzdHJpbmdBcnJheSc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnYXJyYXknLFxuICAgICAgICAgICAgICAgICAgICAnaXRlbXMnOiB7ICd0eXBlJzogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgJ3VuaXF1ZUl0ZW1zJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAndHlwZSc6IFsnb2JqZWN0JywgJ2Jvb2xlYW4nXSxcbiAgICAgICAgICAgICdwcm9wZXJ0aWVzJzoge1xuICAgICAgICAgICAgICAgICckaWQnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICdmb3JtYXQnOiAndXJpLXJlZmVyZW5jZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICckc2NoZW1hJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAnZm9ybWF0JzogJ3VyaSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICckcmVmJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAnZm9ybWF0JzogJ3VyaS1yZWZlcmVuY2UnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnJGNvbW1lbnQnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ3N0cmluZydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0aXRsZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3JlYWRPbmx5Jzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdib29sZWFuJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2V4YW1wbGVzJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdhcnJheScsXG4gICAgICAgICAgICAgICAgICAgICdpdGVtcyc6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdtdWx0aXBsZU9mJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICAgICAnZXhjbHVzaXZlTWluaW11bSc6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdtYXhpbXVtJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdudW1iZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZXhjbHVzaXZlTWF4aW11bSc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnbnVtYmVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ21pbmltdW0nOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ251bWJlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdleGNsdXNpdmVNaW5pbXVtJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdudW1iZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnbWF4TGVuZ3RoJzogeyAnJHJlZic6ICcjL2RlZmluaXRpb25zL25vbk5lZ2F0aXZlSW50ZWdlcicgfSxcbiAgICAgICAgICAgICAgICAnbWluTGVuZ3RoJzogeyAnJHJlZic6ICcjL2RlZmluaXRpb25zL25vbk5lZ2F0aXZlSW50ZWdlckRlZmF1bHQwJyB9LFxuICAgICAgICAgICAgICAgICdwYXR0ZXJuJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAnZm9ybWF0JzogJ3JlZ2V4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2FkZGl0aW9uYWxJdGVtcyc6IHsgJyRyZWYnOiAnIycgfSxcbiAgICAgICAgICAgICAgICAnaXRlbXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICdhbnlPZic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgJyRyZWYnOiAnIycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9zY2hlbWFBcnJheScgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdtYXhJdGVtcyc6IHsgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9ub25OZWdhdGl2ZUludGVnZXInIH0sXG4gICAgICAgICAgICAgICAgJ21pbkl0ZW1zJzogeyAnJHJlZic6ICcjL2RlZmluaXRpb25zL25vbk5lZ2F0aXZlSW50ZWdlckRlZmF1bHQwJyB9LFxuICAgICAgICAgICAgICAgICd1bmlxdWVJdGVtcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnYm9vbGVhbicsXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjb250YWlucyc6IHsgJyRyZWYnOiAnIycgfSxcbiAgICAgICAgICAgICAgICAnbWF4UHJvcGVydGllcyc6IHsgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9ub25OZWdhdGl2ZUludGVnZXInIH0sXG4gICAgICAgICAgICAgICAgJ21pblByb3BlcnRpZXMnOiB7ICckcmVmJzogJyMvZGVmaW5pdGlvbnMvbm9uTmVnYXRpdmVJbnRlZ2VyRGVmYXVsdDAnIH0sXG4gICAgICAgICAgICAgICAgJ3JlcXVpcmVkJzogeyAnJHJlZic6ICcjL2RlZmluaXRpb25zL3N0cmluZ0FycmF5JyB9LFxuICAgICAgICAgICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcyc6IHsgJyRyZWYnOiAnIycgfSxcbiAgICAgICAgICAgICAgICAnZGVmaW5pdGlvbnMnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcyc6IHsgJyRyZWYnOiAnIycgfSxcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiB7fVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcyc6IHsgJyRyZWYnOiAnIycgfSxcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiB7fVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3BhdHRlcm5Qcm9wZXJ0aWVzJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICAnYWRkaXRpb25hbFByb3BlcnRpZXMnOiB7ICckcmVmJzogJyMnIH0sXG4gICAgICAgICAgICAgICAgICAgICdwcm9wZXJ0eU5hbWVzJzogeyAnZm9ybWF0JzogJ3JlZ2V4JyB9LFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IHt9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZGVwZW5kZW5jaWVzJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICAnYWRkaXRpb25hbFByb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnYW55T2YnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyAnJHJlZic6ICcjJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9zdHJpbmdBcnJheScgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAncHJvcGVydHlOYW1lcyc6IHsgJyRyZWYnOiAnIycgfSxcbiAgICAgICAgICAgICAgICAnY29uc3QnOiB0cnVlLFxuICAgICAgICAgICAgICAgICdlbnVtJzoge1xuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdhcnJheScsXG4gICAgICAgICAgICAgICAgICAgICdpdGVtcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICdtaW5JdGVtcyc6IDEsXG4gICAgICAgICAgICAgICAgICAgICd1bmlxdWVJdGVtcyc6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0eXBlJzoge1xuICAgICAgICAgICAgICAgICAgICAnYW55T2YnOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICckcmVmJzogJyMvZGVmaW5pdGlvbnMvc2ltcGxlVHlwZXMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnYXJyYXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpdGVtcyc6IHsgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9zaW1wbGVUeXBlcycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWluSXRlbXMnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1bmlxdWVJdGVtcyc6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2Zvcm1hdCc6IHsgJ3R5cGUnOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICdjb250ZW50TWVkaWFUeXBlJzogeyAndHlwZSc6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRFbmNvZGluZyc6IHsgJ3R5cGUnOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgICdpZic6IHsgJyRyZWYnOiAnIycgfSxcbiAgICAgICAgICAgICAgICAndGhlbic6IHsgJyRyZWYnOiAnIycgfSxcbiAgICAgICAgICAgICAgICAnZWxzZSc6IHsgJyRyZWYnOiAnIycgfSxcbiAgICAgICAgICAgICAgICAnYWxsT2YnOiB7ICckcmVmJzogJyMvZGVmaW5pdGlvbnMvc2NoZW1hQXJyYXknIH0sXG4gICAgICAgICAgICAgICAgJ2FueU9mJzogeyAnJHJlZic6ICcjL2RlZmluaXRpb25zL3NjaGVtYUFycmF5JyB9LFxuICAgICAgICAgICAgICAgICdvbmVPZic6IHsgJyRyZWYnOiAnIy9kZWZpbml0aW9ucy9zY2hlbWFBcnJheScgfSxcbiAgICAgICAgICAgICAgICAnbm90JzogeyAnJHJlZic6ICcjJyB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2RlZmF1bHQnOiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG59O1xudmFyIGRlc2NyaXB0aW9ucyA9IHtcbiAgICBpZDogbG9jYWxpemUoJ3NjaGVtYS5qc29uLmlkJywgXCJBIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgc2NoZW1hLlwiKSxcbiAgICAkc2NoZW1hOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uJHNjaGVtYScsIFwiVGhlIHNjaGVtYSB0byB2ZXJpZnkgdGhpcyBkb2N1bWVudCBhZ2FpbnN0LlwiKSxcbiAgICB0aXRsZTogbG9jYWxpemUoJ3NjaGVtYS5qc29uLnRpdGxlJywgXCJBIGRlc2NyaXB0aXZlIHRpdGxlIG9mIHRoZSBlbGVtZW50LlwiKSxcbiAgICBkZXNjcmlwdGlvbjogbG9jYWxpemUoJ3NjaGVtYS5qc29uLmRlc2NyaXB0aW9uJywgXCJBIGxvbmcgZGVzY3JpcHRpb24gb2YgdGhlIGVsZW1lbnQuIFVzZWQgaW4gaG92ZXIgbWVudXMgYW5kIHN1Z2dlc3Rpb25zLlwiKSxcbiAgICBkZWZhdWx0OiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uZGVmYXVsdCcsIFwiQSBkZWZhdWx0IHZhbHVlLiBVc2VkIGJ5IHN1Z2dlc3Rpb25zLlwiKSxcbiAgICBtdWx0aXBsZU9mOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24ubXVsdGlwbGVPZicsIFwiQSBudW1iZXIgdGhhdCBzaG91bGQgY2xlYW5seSBkaXZpZGUgdGhlIGN1cnJlbnQgdmFsdWUgKGkuZS4gaGF2ZSBubyByZW1haW5kZXIpLlwiKSxcbiAgICBtYXhpbXVtOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24ubWF4aW11bScsIFwiVGhlIG1heGltdW0gbnVtZXJpY2FsIHZhbHVlLCBpbmNsdXNpdmUgYnkgZGVmYXVsdC5cIiksXG4gICAgZXhjbHVzaXZlTWF4aW11bTogbG9jYWxpemUoJ3NjaGVtYS5qc29uLmV4Y2x1c2l2ZU1heGltdW0nLCBcIk1ha2VzIHRoZSBtYXhpbXVtIHByb3BlcnR5IGV4Y2x1c2l2ZS5cIiksXG4gICAgbWluaW11bTogbG9jYWxpemUoJ3NjaGVtYS5qc29uLm1pbmltdW0nLCBcIlRoZSBtaW5pbXVtIG51bWVyaWNhbCB2YWx1ZSwgaW5jbHVzaXZlIGJ5IGRlZmF1bHQuXCIpLFxuICAgIGV4Y2x1c2l2ZU1pbmltdW06IGxvY2FsaXplKCdzY2hlbWEuanNvbi5leGNsdXNpdmVNaW5pbnVtJywgXCJNYWtlcyB0aGUgbWluaW11bSBwcm9wZXJ0eSBleGNsdXNpdmUuXCIpLFxuICAgIG1heExlbmd0aDogbG9jYWxpemUoJ3NjaGVtYS5qc29uLm1heExlbmd0aCcsIFwiVGhlIG1heGltdW0gbGVuZ3RoIG9mIGEgc3RyaW5nLlwiKSxcbiAgICBtaW5MZW5ndGg6IGxvY2FsaXplKCdzY2hlbWEuanNvbi5taW5MZW5ndGgnLCBcIlRoZSBtaW5pbXVtIGxlbmd0aCBvZiBhIHN0cmluZy5cIiksXG4gICAgcGF0dGVybjogbG9jYWxpemUoJ3NjaGVtYS5qc29uLnBhdHRlcm4nLCBcIkEgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIHRoZSBzdHJpbmcgYWdhaW5zdC4gSXQgaXMgbm90IGltcGxpY2l0bHkgYW5jaG9yZWQuXCIpLFxuICAgIGFkZGl0aW9uYWxJdGVtczogbG9jYWxpemUoJ3NjaGVtYS5qc29uLmFkZGl0aW9uYWxJdGVtcycsIFwiRm9yIGFycmF5cywgb25seSB3aGVuIGl0ZW1zIGlzIHNldCBhcyBhbiBhcnJheS4gSWYgaXQgaXMgYSBzY2hlbWEsIHRoZW4gdGhpcyBzY2hlbWEgdmFsaWRhdGVzIGl0ZW1zIGFmdGVyIHRoZSBvbmVzIHNwZWNpZmllZCBieSB0aGUgaXRlbXMgYXJyYXkuIElmIGl0IGlzIGZhbHNlLCB0aGVuIGFkZGl0aW9uYWwgaXRlbXMgd2lsbCBjYXVzZSB2YWxpZGF0aW9uIHRvIGZhaWwuXCIpLFxuICAgIGl0ZW1zOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uaXRlbXMnLCBcIkZvciBhcnJheXMuIENhbiBlaXRoZXIgYmUgYSBzY2hlbWEgdG8gdmFsaWRhdGUgZXZlcnkgZWxlbWVudCBhZ2FpbnN0IG9yIGFuIGFycmF5IG9mIHNjaGVtYXMgdG8gdmFsaWRhdGUgZWFjaCBpdGVtIGFnYWluc3QgaW4gb3JkZXIgKHRoZSBmaXJzdCBzY2hlbWEgd2lsbCB2YWxpZGF0ZSB0aGUgZmlyc3QgZWxlbWVudCwgdGhlIHNlY29uZCBzY2hlbWEgd2lsbCB2YWxpZGF0ZSB0aGUgc2Vjb25kIGVsZW1lbnQsIGFuZCBzbyBvbi5cIiksXG4gICAgbWF4SXRlbXM6IGxvY2FsaXplKCdzY2hlbWEuanNvbi5tYXhJdGVtcycsIFwiVGhlIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIHRoYXQgY2FuIGJlIGluc2lkZSBhbiBhcnJheS4gSW5jbHVzaXZlLlwiKSxcbiAgICBtaW5JdGVtczogbG9jYWxpemUoJ3NjaGVtYS5qc29uLm1pbkl0ZW1zJywgXCJUaGUgbWluaW11bSBudW1iZXIgb2YgaXRlbXMgdGhhdCBjYW4gYmUgaW5zaWRlIGFuIGFycmF5LiBJbmNsdXNpdmUuXCIpLFxuICAgIHVuaXF1ZUl0ZW1zOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24udW5pcXVlSXRlbXMnLCBcIklmIGFsbCBvZiB0aGUgaXRlbXMgaW4gdGhlIGFycmF5IG11c3QgYmUgdW5pcXVlLiBEZWZhdWx0cyB0byBmYWxzZS5cIiksXG4gICAgbWF4UHJvcGVydGllczogbG9jYWxpemUoJ3NjaGVtYS5qc29uLm1heFByb3BlcnRpZXMnLCBcIlRoZSBtYXhpbXVtIG51bWJlciBvZiBwcm9wZXJ0aWVzIGFuIG9iamVjdCBjYW4gaGF2ZS4gSW5jbHVzaXZlLlwiKSxcbiAgICBtaW5Qcm9wZXJ0aWVzOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24ubWluUHJvcGVydGllcycsIFwiVGhlIG1pbmltdW0gbnVtYmVyIG9mIHByb3BlcnRpZXMgYW4gb2JqZWN0IGNhbiBoYXZlLiBJbmNsdXNpdmUuXCIpLFxuICAgIHJlcXVpcmVkOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24ucmVxdWlyZWQnLCBcIkFuIGFycmF5IG9mIHN0cmluZ3MgdGhhdCBsaXN0cyB0aGUgbmFtZXMgb2YgYWxsIHByb3BlcnRpZXMgcmVxdWlyZWQgb24gdGhpcyBvYmplY3QuXCIpLFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uYWRkaXRpb25hbFByb3BlcnRpZXMnLCBcIkVpdGhlciBhIHNjaGVtYSBvciBhIGJvb2xlYW4uIElmIGEgc2NoZW1hLCB0aGVuIHVzZWQgdG8gdmFsaWRhdGUgYWxsIHByb3BlcnRpZXMgbm90IG1hdGNoZWQgYnkgJ3Byb3BlcnRpZXMnIG9yICdwYXR0ZXJuUHJvcGVydGllcycuIElmIGZhbHNlLCB0aGVuIGFueSBwcm9wZXJ0aWVzIG5vdCBtYXRjaGVkIGJ5IGVpdGhlciB3aWxsIGNhdXNlIHRoaXMgc2NoZW1hIHRvIGZhaWwuXCIpLFxuICAgIGRlZmluaXRpb25zOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uZGVmaW5pdGlvbnMnLCBcIk5vdCB1c2VkIGZvciB2YWxpZGF0aW9uLiBQbGFjZSBzdWJzY2hlbWFzIGhlcmUgdGhhdCB5b3Ugd2lzaCB0byByZWZlcmVuY2UgaW5saW5lIHdpdGggJHJlZi5cIiksXG4gICAgcHJvcGVydGllczogbG9jYWxpemUoJ3NjaGVtYS5qc29uLnByb3BlcnRpZXMnLCBcIkEgbWFwIG9mIHByb3BlcnR5IG5hbWVzIHRvIHNjaGVtYXMgZm9yIGVhY2ggcHJvcGVydHkuXCIpLFxuICAgIHBhdHRlcm5Qcm9wZXJ0aWVzOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24ucGF0dGVyblByb3BlcnRpZXMnLCBcIkEgbWFwIG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgb24gcHJvcGVydHkgbmFtZXMgdG8gc2NoZW1hcyBmb3IgbWF0Y2hpbmcgcHJvcGVydGllcy5cIiksXG4gICAgZGVwZW5kZW5jaWVzOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uZGVwZW5kZW5jaWVzJywgXCJBIG1hcCBvZiBwcm9wZXJ0eSBuYW1lcyB0byBlaXRoZXIgYW4gYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgb3IgYSBzY2hlbWEuIEFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIG1lYW5zIHRoZSBwcm9wZXJ0eSBuYW1lZCBpbiB0aGUga2V5IGRlcGVuZHMgb24gdGhlIHByb3BlcnRpZXMgaW4gdGhlIGFycmF5IGJlaW5nIHByZXNlbnQgaW4gdGhlIG9iamVjdCBpbiBvcmRlciB0byBiZSB2YWxpZC4gSWYgdGhlIHZhbHVlIGlzIGEgc2NoZW1hLCB0aGVuIHRoZSBzY2hlbWEgaXMgb25seSBhcHBsaWVkIHRvIHRoZSBvYmplY3QgaWYgdGhlIHByb3BlcnR5IGluIHRoZSBrZXkgZXhpc3RzIG9uIHRoZSBvYmplY3QuXCIpLFxuICAgIGVudW06IGxvY2FsaXplKCdzY2hlbWEuanNvbi5lbnVtJywgXCJUaGUgc2V0IG9mIGxpdGVyYWwgdmFsdWVzIHRoYXQgYXJlIHZhbGlkLlwiKSxcbiAgICB0eXBlOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24udHlwZScsIFwiRWl0aGVyIGEgc3RyaW5nIG9mIG9uZSBvZiB0aGUgYmFzaWMgc2NoZW1hIHR5cGVzIChudW1iZXIsIGludGVnZXIsIG51bGwsIGFycmF5LCBvYmplY3QsIGJvb2xlYW4sIHN0cmluZykgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncyBzcGVjaWZ5aW5nIGEgc3Vic2V0IG9mIHRob3NlIHR5cGVzLlwiKSxcbiAgICBmb3JtYXQ6IGxvY2FsaXplKCdzY2hlbWEuanNvbi5mb3JtYXQnLCBcIkRlc2NyaWJlcyB0aGUgZm9ybWF0IGV4cGVjdGVkIGZvciB0aGUgdmFsdWUuXCIpLFxuICAgIGFsbE9mOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uYWxsT2YnLCBcIkFuIGFycmF5IG9mIHNjaGVtYXMsIGFsbCBvZiB3aGljaCBtdXN0IG1hdGNoLlwiKSxcbiAgICBhbnlPZjogbG9jYWxpemUoJ3NjaGVtYS5qc29uLmFueU9mJywgXCJBbiBhcnJheSBvZiBzY2hlbWFzLCB3aGVyZSBhdCBsZWFzdCBvbmUgbXVzdCBtYXRjaC5cIiksXG4gICAgb25lT2Y6IGxvY2FsaXplKCdzY2hlbWEuanNvbi5vbmVPZicsIFwiQW4gYXJyYXkgb2Ygc2NoZW1hcywgZXhhY3RseSBvbmUgb2Ygd2hpY2ggbXVzdCBtYXRjaC5cIiksXG4gICAgbm90OiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24ubm90JywgXCJBIHNjaGVtYSB3aGljaCBtdXN0IG5vdCBtYXRjaC5cIiksXG4gICAgJGlkOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uJGlkJywgXCJBIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgc2NoZW1hLlwiKSxcbiAgICAkcmVmOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uJHJlZicsIFwiUmVmZXJlbmNlIGEgZGVmaW5pdGlvbiBob3N0ZWQgb24gYW55IGxvY2F0aW9uLlwiKSxcbiAgICAkY29tbWVudDogbG9jYWxpemUoJ3NjaGVtYS5qc29uLiRjb21tZW50JywgXCJDb21tZW50cyBmcm9tIHNjaGVtYSBhdXRob3JzIHRvIHJlYWRlcnMgb3IgbWFpbnRhaW5lcnMgb2YgdGhlIHNjaGVtYS5cIiksXG4gICAgcmVhZE9ubHk6IGxvY2FsaXplKCdzY2hlbWEuanNvbi5yZWFkT25seScsIFwiSW5kaWNhdGVzIHRoYXQgdGhlIHZhbHVlIG9mIHRoZSBpbnN0YW5jZSBpcyBtYW5hZ2VkIGV4Y2x1c2l2ZWx5IGJ5IHRoZSBvd25pbmcgYXV0aG9yaXR5LlwiKSxcbiAgICBleGFtcGxlczogbG9jYWxpemUoJ3NjaGVtYS5qc29uLmV4YW1wbGVzJywgXCJTYW1wbGUgSlNPTiB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgcGFydGljdWxhciBzY2hlbWEsIGZvciB0aGUgcHVycG9zZSBvZiBpbGx1c3RyYXRpbmcgdXNhZ2UuXCIpLFxuICAgIGNvbnRhaW5zOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uY29udGFpbnMnLCBcIkFuIGFycmF5IGluc3RhbmNlIGlzIHZhbGlkIGFnYWluc3QgXFxcImNvbnRhaW5zXFxcIiBpZiBhdCBsZWFzdCBvbmUgb2YgaXRzIGVsZW1lbnRzIGlzIHZhbGlkIGFnYWluc3QgdGhlIGdpdmVuIHNjaGVtYS5cIiksXG4gICAgcHJvcGVydHlOYW1lczogbG9jYWxpemUoJ3NjaGVtYS5qc29uLnByb3BlcnR5TmFtZXMnLCBcIklmIHRoZSBpbnN0YW5jZSBpcyBhbiBvYmplY3QsIHRoaXMga2V5d29yZCB2YWxpZGF0ZXMgaWYgZXZlcnkgcHJvcGVydHkgbmFtZSBpbiB0aGUgaW5zdGFuY2UgdmFsaWRhdGVzIGFnYWluc3QgdGhlIHByb3ZpZGVkIHNjaGVtYS5cIiksXG4gICAgY29uc3Q6IGxvY2FsaXplKCdzY2hlbWEuanNvbi5jb25zdCcsIFwiQW4gaW5zdGFuY2UgdmFsaWRhdGVzIHN1Y2Nlc3NmdWxseSBhZ2FpbnN0IHRoaXMga2V5d29yZCBpZiBpdHMgdmFsdWUgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIHRoZSBrZXl3b3JkLlwiKSxcbiAgICBjb250ZW50TWVkaWFUeXBlOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uY29udGVudE1lZGlhVHlwZScsIFwiRGVzY3JpYmVzIHRoZSBtZWRpYSB0eXBlIG9mIGEgc3RyaW5nIHByb3BlcnR5LlwiKSxcbiAgICBjb250ZW50RW5jb2Rpbmc6IGxvY2FsaXplKCdzY2hlbWEuanNvbi5jb250ZW50RW5jb2RpbmcnLCBcIkRlc2NyaWJlcyB0aGUgY29udGVudCBlbmNvZGluZyBvZiBhIHN0cmluZyBwcm9wZXJ0eS5cIiksXG4gICAgaWY6IGxvY2FsaXplKCdzY2hlbWEuanNvbi5pZicsIFwiVGhlIHZhbGlkYXRpb24gb3V0Y29tZSBvZiB0aGUgXFxcImlmXFxcIiBzdWJzY2hlbWEgY29udHJvbHMgd2hpY2ggb2YgdGhlIFxcXCJ0aGVuXFxcIiBvciBcXFwiZWxzZVxcXCIga2V5d29yZHMgYXJlIGV2YWx1YXRlZC5cIiksXG4gICAgdGhlbjogbG9jYWxpemUoJ3NjaGVtYS5qc29uLnRoZW4nLCBcIlRoZSBcXFwiaWZcXFwiIHN1YnNjaGVtYSBpcyB1c2VkIGZvciB2YWxpZGF0aW9uIHdoZW4gdGhlIFxcXCJpZlxcXCIgc3Vic2NoZW1hIHN1Y2NlZWRzLlwiKSxcbiAgICBlbHNlOiBsb2NhbGl6ZSgnc2NoZW1hLmpzb24uZWxzZScsIFwiVGhlIFxcXCJlbHNlXFxcIiBzdWJzY2hlbWEgaXMgdXNlZCBmb3IgdmFsaWRhdGlvbiB3aGVuIHRoZSBcXFwiaWZcXFwiIHN1YnNjaGVtYSBmYWlscy5cIilcbn07XG5mb3IgKHZhciBzY2hlbWFOYW1lIGluIHNjaGVtYUNvbnRyaWJ1dGlvbnMuc2NoZW1hcykge1xuICAgIHZhciBzY2hlbWEgPSBzY2hlbWFDb250cmlidXRpb25zLnNjaGVtYXNbc2NoZW1hTmFtZV07XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gc2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgdmFyIHByb3BlcnR5T2JqZWN0ID0gc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5T2JqZWN0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHByb3BlcnR5T2JqZWN0ID0gc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHldID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zW3Byb3BlcnR5XTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eU9iamVjdFsnZGVzY3JpcHRpb24nXSA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvcGVydHkgKyBcIjogbG9jYWxpemUoJ3NjaGVtYS5qc29uLlwiICsgcHJvcGVydHkgKyBcIicsIFxcXCJcXFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgeyBVcmksIFJhbmdlLCBlZGl0b3IsIGxhbmd1YWdlcywgTWFya2VyU2V2ZXJpdHkgfSBmcm9tICcuL2ZpbGxlcnMvbW9uYWNvLWVkaXRvci1jb3JlLmpzJztcclxuaW1wb3J0ICogYXMganNvblNlcnZpY2UgZnJvbSAnLi9fZGVwcy92c2NvZGUtanNvbi1sYW5ndWFnZXNlcnZpY2UvanNvbkxhbmd1YWdlU2VydmljZS5qcyc7XHJcbi8vIC0tLSBkaWFnbm9zdGljcyAtLS0gLS0tXHJcbnZhciBEaWFnbm9zdGljc0FkYXB0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBEaWFnbm9zdGljc0FkYXB0ZXIoX2xhbmd1YWdlSWQsIF93b3JrZXIsIGRlZmF1bHRzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLl9sYW5ndWFnZUlkID0gX2xhbmd1YWdlSWQ7XHJcbiAgICAgICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcclxuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVyID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICB2YXIgb25Nb2RlbEFkZCA9IGZ1bmN0aW9uIChtb2RlbCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZUlkID0gbW9kZWwuZ2V0TW9kZUlkKCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RlSWQgIT09IF90aGlzLl9sYW5ndWFnZUlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGhhbmRsZTtcclxuICAgICAgICAgICAgX3RoaXMuX2xpc3RlbmVyW21vZGVsLnVyaS50b1N0cmluZygpXSA9IG1vZGVsLm9uRGlkQ2hhbmdlQ29udGVudChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcclxuICAgICAgICAgICAgICAgIGhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2RvVmFsaWRhdGUobW9kZWwudXJpLCBtb2RlSWQpOyB9LCA1MDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgX3RoaXMuX2RvVmFsaWRhdGUobW9kZWwudXJpLCBtb2RlSWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIG9uTW9kZWxSZW1vdmVkID0gZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAgICAgICAgIGVkaXRvci5zZXRNb2RlbE1hcmtlcnMobW9kZWwsIF90aGlzLl9sYW5ndWFnZUlkLCBbXSk7XHJcbiAgICAgICAgICAgIHZhciB1cmlTdHIgPSBtb2RlbC51cmkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gX3RoaXMuX2xpc3RlbmVyW3VyaVN0cl07XHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLl9saXN0ZW5lclt1cmlTdHJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKGVkaXRvci5vbkRpZENyZWF0ZU1vZGVsKG9uTW9kZWxBZGQpKTtcclxuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcy5wdXNoKGVkaXRvci5vbldpbGxEaXNwb3NlTW9kZWwoZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAgICAgICAgIG9uTW9kZWxSZW1vdmVkKG1vZGVsKTtcclxuICAgICAgICAgICAgX3RoaXMuX3Jlc2V0U2NoZW1hKG1vZGVsLnVyaSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLnB1c2goZWRpdG9yLm9uRGlkQ2hhbmdlTW9kZWxMYW5ndWFnZShmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgb25Nb2RlbFJlbW92ZWQoZXZlbnQubW9kZWwpO1xyXG4gICAgICAgICAgICBvbk1vZGVsQWRkKGV2ZW50Lm1vZGVsKTtcclxuICAgICAgICAgICAgX3RoaXMuX3Jlc2V0U2NoZW1hKGV2ZW50Lm1vZGVsLnVyaSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2FibGVzLnB1c2goZGVmYXVsdHMub25EaWRDaGFuZ2UoZnVuY3Rpb24gKF8pIHtcclxuICAgICAgICAgICAgZWRpdG9yLmdldE1vZGVscygpLmZvckVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwuZ2V0TW9kZUlkKCkgPT09IF90aGlzLl9sYW5ndWFnZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Nb2RlbFJlbW92ZWQobW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uTW9kZWxBZGQobW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5fZGlzcG9zYWJsZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRvci5nZXRNb2RlbHMoKS5mb3JFYWNoKG9uTW9kZWxSZW1vdmVkKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBfdGhpcy5fbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fbGlzdGVuZXJba2V5XS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBlZGl0b3IuZ2V0TW9kZWxzKCkuZm9yRWFjaChvbk1vZGVsQWRkKTtcclxuICAgIH1cclxuICAgIERpYWdub3N0aWNzQWRhcHRlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkICYmIGQuZGlzcG9zZSgpOyB9KTtcclxuICAgICAgICB0aGlzLl9kaXNwb3NhYmxlcyA9IFtdO1xyXG4gICAgfTtcclxuICAgIERpYWdub3N0aWNzQWRhcHRlci5wcm90b3R5cGUuX3Jlc2V0U2NoZW1hID0gZnVuY3Rpb24gKHJlc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5fd29ya2VyKCkudGhlbihmdW5jdGlvbiAod29ya2VyKSB7XHJcbiAgICAgICAgICAgIHdvcmtlci5yZXNldFNjaGVtYShyZXNvdXJjZS50b1N0cmluZygpKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBEaWFnbm9zdGljc0FkYXB0ZXIucHJvdG90eXBlLl9kb1ZhbGlkYXRlID0gZnVuY3Rpb24gKHJlc291cmNlLCBsYW5ndWFnZUlkKSB7XHJcbiAgICAgICAgdGhpcy5fd29ya2VyKHJlc291cmNlKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAod29ya2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIuZG9WYWxpZGF0aW9uKHJlc291cmNlLnRvU3RyaW5nKCkpLnRoZW4oZnVuY3Rpb24gKGRpYWdub3N0aWNzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFya2VycyA9IGRpYWdub3N0aWNzLm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4gdG9EaWFnbm9zdGljcyhyZXNvdXJjZSwgZCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gZWRpdG9yLmdldE1vZGVsKHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC5nZXRNb2RlSWQoKSA9PT0gbGFuZ3VhZ2VJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci5zZXRNb2RlbE1hcmtlcnMobW9kZWwsIGxhbmd1YWdlSWQsIG1hcmtlcnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih1bmRlZmluZWQsIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBEaWFnbm9zdGljc0FkYXB0ZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IERpYWdub3N0aWNzQWRhcHRlciB9O1xyXG5mdW5jdGlvbiB0b1NldmVyaXR5KGxzU2V2ZXJpdHkpIHtcclxuICAgIHN3aXRjaCAobHNTZXZlcml0eSkge1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuRGlhZ25vc3RpY1NldmVyaXR5LkVycm9yOlxyXG4gICAgICAgICAgICByZXR1cm4gTWFya2VyU2V2ZXJpdHkuRXJyb3I7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5EaWFnbm9zdGljU2V2ZXJpdHkuV2FybmluZzpcclxuICAgICAgICAgICAgcmV0dXJuIE1hcmtlclNldmVyaXR5Lldhcm5pbmc7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5EaWFnbm9zdGljU2V2ZXJpdHkuSW5mb3JtYXRpb246XHJcbiAgICAgICAgICAgIHJldHVybiBNYXJrZXJTZXZlcml0eS5JbmZvO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuRGlhZ25vc3RpY1NldmVyaXR5LkhpbnQ6XHJcbiAgICAgICAgICAgIHJldHVybiBNYXJrZXJTZXZlcml0eS5IaW50O1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBNYXJrZXJTZXZlcml0eS5JbmZvO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHRvRGlhZ25vc3RpY3MocmVzb3VyY2UsIGRpYWcpIHtcclxuICAgIHZhciBjb2RlID0gdHlwZW9mIGRpYWcuY29kZSA9PT0gJ251bWJlcicgPyBTdHJpbmcoZGlhZy5jb2RlKSA6IGRpYWcuY29kZTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2V2ZXJpdHk6IHRvU2V2ZXJpdHkoZGlhZy5zZXZlcml0eSksXHJcbiAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiBkaWFnLnJhbmdlLnN0YXJ0LmxpbmUgKyAxLFxyXG4gICAgICAgIHN0YXJ0Q29sdW1uOiBkaWFnLnJhbmdlLnN0YXJ0LmNoYXJhY3RlciArIDEsXHJcbiAgICAgICAgZW5kTGluZU51bWJlcjogZGlhZy5yYW5nZS5lbmQubGluZSArIDEsXHJcbiAgICAgICAgZW5kQ29sdW1uOiBkaWFnLnJhbmdlLmVuZC5jaGFyYWN0ZXIgKyAxLFxyXG4gICAgICAgIG1lc3NhZ2U6IGRpYWcubWVzc2FnZSxcclxuICAgICAgICBjb2RlOiBjb2RlLFxyXG4gICAgICAgIHNvdXJjZTogZGlhZy5zb3VyY2VcclxuICAgIH07XHJcbn1cclxuLy8gLS0tIGNvbXBsZXRpb24gLS0tLS0tXHJcbmZ1bmN0aW9uIGZyb21Qb3NpdGlvbihwb3NpdGlvbikge1xyXG4gICAgaWYgKCFwb3NpdGlvbikge1xyXG4gICAgICAgIHJldHVybiB2b2lkIDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBjaGFyYWN0ZXI6IHBvc2l0aW9uLmNvbHVtbiAtIDEsIGxpbmU6IHBvc2l0aW9uLmxpbmVOdW1iZXIgLSAxIH07XHJcbn1cclxuZnVuY3Rpb24gZnJvbVJhbmdlKHJhbmdlKSB7XHJcbiAgICBpZiAoIXJhbmdlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgICAgbGluZTogcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyIC0gMSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyOiByYW5nZS5zdGFydENvbHVtbiAtIDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuZDogeyBsaW5lOiByYW5nZS5lbmRMaW5lTnVtYmVyIC0gMSwgY2hhcmFjdGVyOiByYW5nZS5lbmRDb2x1bW4gLSAxIH1cclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gdG9SYW5nZShyYW5nZSkge1xyXG4gICAgaWYgKCFyYW5nZSkge1xyXG4gICAgICAgIHJldHVybiB2b2lkIDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLnN0YXJ0LmxpbmUgKyAxLCByYW5nZS5zdGFydC5jaGFyYWN0ZXIgKyAxLCByYW5nZS5lbmQubGluZSArIDEsIHJhbmdlLmVuZC5jaGFyYWN0ZXIgKyAxKTtcclxufVxyXG5mdW5jdGlvbiBpc0luc2VydFJlcGxhY2VFZGl0KGVkaXQpIHtcclxuICAgIHJldHVybiAodHlwZW9mIGVkaXQuaW5zZXJ0ICE9PSAndW5kZWZpbmVkJyAmJlxyXG4gICAgICAgIHR5cGVvZiBlZGl0LnJlcGxhY2UgIT09ICd1bmRlZmluZWQnKTtcclxufVxyXG5mdW5jdGlvbiB0b0NvbXBsZXRpb25JdGVtS2luZChraW5kKSB7XHJcbiAgICB2YXIgbUl0ZW1LaW5kID0gbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZDtcclxuICAgIHN3aXRjaCAoa2luZCkge1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLlRleHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBtSXRlbUtpbmQuVGV4dDtcclxuICAgICAgICBjYXNlIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5NZXRob2Q6XHJcbiAgICAgICAgICAgIHJldHVybiBtSXRlbUtpbmQuTWV0aG9kO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uOlxyXG4gICAgICAgICAgICByZXR1cm4gbUl0ZW1LaW5kLkZ1bmN0aW9uO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLkNvbnN0cnVjdG9yOlxyXG4gICAgICAgICAgICByZXR1cm4gbUl0ZW1LaW5kLkNvbnN0cnVjdG9yO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLkZpZWxkOlxyXG4gICAgICAgICAgICByZXR1cm4gbUl0ZW1LaW5kLkZpZWxkO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLlZhcmlhYmxlOlxyXG4gICAgICAgICAgICByZXR1cm4gbUl0ZW1LaW5kLlZhcmlhYmxlO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLkNsYXNzOlxyXG4gICAgICAgICAgICByZXR1cm4gbUl0ZW1LaW5kLkNsYXNzO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLkludGVyZmFjZTpcclxuICAgICAgICAgICAgcmV0dXJuIG1JdGVtS2luZC5JbnRlcmZhY2U7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5Db21wbGV0aW9uSXRlbUtpbmQuTW9kdWxlOlxyXG4gICAgICAgICAgICByZXR1cm4gbUl0ZW1LaW5kLk1vZHVsZTtcclxuICAgICAgICBjYXNlIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5Qcm9wZXJ0eTpcclxuICAgICAgICAgICAgcmV0dXJuIG1JdGVtS2luZC5Qcm9wZXJ0eTtcclxuICAgICAgICBjYXNlIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5Vbml0OlxyXG4gICAgICAgICAgICByZXR1cm4gbUl0ZW1LaW5kLlVuaXQ7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5Db21wbGV0aW9uSXRlbUtpbmQuVmFsdWU6XHJcbiAgICAgICAgICAgIHJldHVybiBtSXRlbUtpbmQuVmFsdWU7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5Db21wbGV0aW9uSXRlbUtpbmQuRW51bTpcclxuICAgICAgICAgICAgcmV0dXJuIG1JdGVtS2luZC5FbnVtO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQ6XHJcbiAgICAgICAgICAgIHJldHVybiBtSXRlbUtpbmQuS2V5d29yZDtcclxuICAgICAgICBjYXNlIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5TbmlwcGV0OlxyXG4gICAgICAgICAgICByZXR1cm4gbUl0ZW1LaW5kLlNuaXBwZXQ7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5Db21wbGV0aW9uSXRlbUtpbmQuQ29sb3I6XHJcbiAgICAgICAgICAgIHJldHVybiBtSXRlbUtpbmQuQ29sb3I7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5Db21wbGV0aW9uSXRlbUtpbmQuRmlsZTpcclxuICAgICAgICAgICAgcmV0dXJuIG1JdGVtS2luZC5GaWxlO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLlJlZmVyZW5jZTpcclxuICAgICAgICAgICAgcmV0dXJuIG1JdGVtS2luZC5SZWZlcmVuY2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbUl0ZW1LaW5kLlByb3BlcnR5O1xyXG59XHJcbmZ1bmN0aW9uIGZyb21Db21wbGV0aW9uSXRlbUtpbmQoa2luZCkge1xyXG4gICAgdmFyIG1JdGVtS2luZCA9IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQ7XHJcbiAgICBzd2l0Y2ggKGtpbmQpIHtcclxuICAgICAgICBjYXNlIG1JdGVtS2luZC5UZXh0OlxyXG4gICAgICAgICAgICByZXR1cm4ganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLlRleHQ7XHJcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuTWV0aG9kOlxyXG4gICAgICAgICAgICByZXR1cm4ganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLk1ldGhvZDtcclxuICAgICAgICBjYXNlIG1JdGVtS2luZC5GdW5jdGlvbjpcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5GdW5jdGlvbjtcclxuICAgICAgICBjYXNlIG1JdGVtS2luZC5Db25zdHJ1Y3RvcjpcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5Db25zdHJ1Y3RvcjtcclxuICAgICAgICBjYXNlIG1JdGVtS2luZC5GaWVsZDpcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5GaWVsZDtcclxuICAgICAgICBjYXNlIG1JdGVtS2luZC5WYXJpYWJsZTpcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5WYXJpYWJsZTtcclxuICAgICAgICBjYXNlIG1JdGVtS2luZC5DbGFzczpcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5DbGFzcztcclxuICAgICAgICBjYXNlIG1JdGVtS2luZC5JbnRlcmZhY2U6XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uU2VydmljZS5Db21wbGV0aW9uSXRlbUtpbmQuSW50ZXJmYWNlO1xyXG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLk1vZHVsZTpcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5Nb2R1bGU7XHJcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuUHJvcGVydHk6XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uU2VydmljZS5Db21wbGV0aW9uSXRlbUtpbmQuUHJvcGVydHk7XHJcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuVW5pdDpcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5Vbml0O1xyXG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLlZhbHVlOlxyXG4gICAgICAgICAgICByZXR1cm4ganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLlZhbHVlO1xyXG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLkVudW06XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uU2VydmljZS5Db21wbGV0aW9uSXRlbUtpbmQuRW51bTtcclxuICAgICAgICBjYXNlIG1JdGVtS2luZC5LZXl3b3JkOlxyXG4gICAgICAgICAgICByZXR1cm4ganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQ7XHJcbiAgICAgICAgY2FzZSBtSXRlbUtpbmQuU25pcHBldDpcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5TbmlwcGV0O1xyXG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLkNvbG9yOlxyXG4gICAgICAgICAgICByZXR1cm4ganNvblNlcnZpY2UuQ29tcGxldGlvbkl0ZW1LaW5kLkNvbG9yO1xyXG4gICAgICAgIGNhc2UgbUl0ZW1LaW5kLkZpbGU6XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uU2VydmljZS5Db21wbGV0aW9uSXRlbUtpbmQuRmlsZTtcclxuICAgICAgICBjYXNlIG1JdGVtS2luZC5SZWZlcmVuY2U6XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uU2VydmljZS5Db21wbGV0aW9uSXRlbUtpbmQuUmVmZXJlbmNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGpzb25TZXJ2aWNlLkNvbXBsZXRpb25JdGVtS2luZC5Qcm9wZXJ0eTtcclxufVxyXG5mdW5jdGlvbiB0b1RleHRFZGl0KHRleHRFZGl0KSB7XHJcbiAgICBpZiAoIXRleHRFZGl0KSB7XHJcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmFuZ2U6IHRvUmFuZ2UodGV4dEVkaXQucmFuZ2UpLFxyXG4gICAgICAgIHRleHQ6IHRleHRFZGl0Lm5ld1RleHRcclxuICAgIH07XHJcbn1cclxudmFyIENvbXBsZXRpb25BZGFwdGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ29tcGxldGlvbkFkYXB0ZXIoX3dvcmtlcikge1xyXG4gICAgICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcGxldGlvbkFkYXB0ZXIucHJvdG90eXBlLCBcInRyaWdnZXJDaGFyYWN0ZXJzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFsnICcsICc6J107XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgQ29tcGxldGlvbkFkYXB0ZXIucHJvdG90eXBlLnByb3ZpZGVDb21wbGV0aW9uSXRlbXMgPSBmdW5jdGlvbiAobW9kZWwsIHBvc2l0aW9uLCBjb250ZXh0LCB0b2tlbikge1xyXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAod29ya2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIuZG9Db21wbGV0ZShyZXNvdXJjZS50b1N0cmluZygpLCBmcm9tUG9zaXRpb24ocG9zaXRpb24pKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgICAgICAgICBpZiAoIWluZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgd29yZEluZm8gPSBtb2RlbC5nZXRXb3JkVW50aWxQb3NpdGlvbihwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHZhciB3b3JkUmFuZ2UgPSBuZXcgUmFuZ2UocG9zaXRpb24ubGluZU51bWJlciwgd29yZEluZm8uc3RhcnRDb2x1bW4sIHBvc2l0aW9uLmxpbmVOdW1iZXIsIHdvcmRJbmZvLmVuZENvbHVtbik7XHJcbiAgICAgICAgICAgIHZhciBpdGVtcyA9IGluZm8uaXRlbXMubWFwKGZ1bmN0aW9uIChlbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGVudHJ5LmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGluc2VydFRleHQ6IGVudHJ5Lmluc2VydFRleHQgfHwgZW50cnkubGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydFRleHQ6IGVudHJ5LnNvcnRUZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclRleHQ6IGVudHJ5LmZpbHRlclRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogZW50cnkuZG9jdW1lbnRhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGVudHJ5LmRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICByYW5nZTogd29yZFJhbmdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6IHRvQ29tcGxldGlvbkl0ZW1LaW5kKGVudHJ5LmtpbmQpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LnRleHRFZGl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5zZXJ0UmVwbGFjZUVkaXQoZW50cnkudGV4dEVkaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucmFuZ2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnQ6IHRvUmFuZ2UoZW50cnkudGV4dEVkaXQuaW5zZXJ0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2U6IHRvUmFuZ2UoZW50cnkudGV4dEVkaXQucmVwbGFjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucmFuZ2UgPSB0b1JhbmdlKGVudHJ5LnRleHRFZGl0LnJhbmdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pbnNlcnRUZXh0ID0gZW50cnkudGV4dEVkaXQubmV3VGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5hZGRpdGlvbmFsVGV4dEVkaXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRpdGlvbmFsVGV4dEVkaXRzID0gZW50cnkuYWRkaXRpb25hbFRleHRFZGl0cy5tYXAodG9UZXh0RWRpdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaW5zZXJ0VGV4dEZvcm1hdCA9PT0ganNvblNlcnZpY2UuSW5zZXJ0VGV4dEZvcm1hdC5TbmlwcGV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pbnNlcnRUZXh0UnVsZXMgPSBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1JbnNlcnRUZXh0UnVsZS5JbnNlcnRBc1NuaXBwZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpc0luY29tcGxldGU6IGluZm8uaXNJbmNvbXBsZXRlLFxyXG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IGl0ZW1zXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENvbXBsZXRpb25BZGFwdGVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBDb21wbGV0aW9uQWRhcHRlciB9O1xyXG5mdW5jdGlvbiBpc01hcmt1cENvbnRlbnQodGhpbmcpIHtcclxuICAgIHJldHVybiAodGhpbmcgJiZcclxuICAgICAgICB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgdHlwZW9mIHRoaW5nLmtpbmQgPT09ICdzdHJpbmcnKTtcclxufVxyXG5mdW5jdGlvbiB0b01hcmtkb3duU3RyaW5nKGVudHJ5KSB7XHJcbiAgICBpZiAodHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBlbnRyeVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAoaXNNYXJrdXBDb250ZW50KGVudHJ5KSkge1xyXG4gICAgICAgIGlmIChlbnRyeS5raW5kID09PSAncGxhaW50ZXh0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGVudHJ5LnZhbHVlLnJlcGxhY2UoL1tcXFxcYCpfe31bXFxdKCkjK1xcLS4hXS9nLCAnXFxcXCQmJylcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IGVudHJ5LnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB7IHZhbHVlOiAnYGBgJyArIGVudHJ5Lmxhbmd1YWdlICsgJ1xcbicgKyBlbnRyeS52YWx1ZSArICdcXG5gYGBcXG4nIH07XHJcbn1cclxuZnVuY3Rpb24gdG9NYXJrZWRTdHJpbmdBcnJheShjb250ZW50cykge1xyXG4gICAgaWYgKCFjb250ZW50cykge1xyXG4gICAgICAgIHJldHVybiB2b2lkIDA7XHJcbiAgICB9XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50cykpIHtcclxuICAgICAgICByZXR1cm4gY29udGVudHMubWFwKHRvTWFya2Rvd25TdHJpbmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt0b01hcmtkb3duU3RyaW5nKGNvbnRlbnRzKV07XHJcbn1cclxuLy8gLS0tIGhvdmVyIC0tLS0tLVxyXG52YXIgSG92ZXJBZGFwdGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSG92ZXJBZGFwdGVyKF93b3JrZXIpIHtcclxuICAgICAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xyXG4gICAgfVxyXG4gICAgSG92ZXJBZGFwdGVyLnByb3RvdHlwZS5wcm92aWRlSG92ZXIgPSBmdW5jdGlvbiAobW9kZWwsIHBvc2l0aW9uLCB0b2tlbikge1xyXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAod29ya2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXIuZG9Ib3ZlcihyZXNvdXJjZS50b1N0cmluZygpLCBmcm9tUG9zaXRpb24ocG9zaXRpb24pKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgICAgICAgICBpZiAoIWluZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRvUmFuZ2UoaW5mby5yYW5nZSksXHJcbiAgICAgICAgICAgICAgICBjb250ZW50czogdG9NYXJrZWRTdHJpbmdBcnJheShpbmZvLmNvbnRlbnRzKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIb3ZlckFkYXB0ZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEhvdmVyQWRhcHRlciB9O1xyXG4vLyAtLS0gZGVmaW5pdGlvbiAtLS0tLS1cclxuZnVuY3Rpb24gdG9Mb2NhdGlvbihsb2NhdGlvbikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB1cmk6IFVyaS5wYXJzZShsb2NhdGlvbi51cmkpLFxyXG4gICAgICAgIHJhbmdlOiB0b1JhbmdlKGxvY2F0aW9uLnJhbmdlKVxyXG4gICAgfTtcclxufVxyXG4vLyAtLS0gZG9jdW1lbnQgc3ltYm9scyAtLS0tLS1cclxuZnVuY3Rpb24gdG9TeW1ib2xLaW5kKGtpbmQpIHtcclxuICAgIHZhciBtS2luZCA9IGxhbmd1YWdlcy5TeW1ib2xLaW5kO1xyXG4gICAgc3dpdGNoIChraW5kKSB7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5TeW1ib2xLaW5kLkZpbGU6XHJcbiAgICAgICAgICAgIHJldHVybiBtS2luZC5BcnJheTtcclxuICAgICAgICBjYXNlIGpzb25TZXJ2aWNlLlN5bWJvbEtpbmQuTW9kdWxlOlxyXG4gICAgICAgICAgICByZXR1cm4gbUtpbmQuTW9kdWxlO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuU3ltYm9sS2luZC5OYW1lc3BhY2U6XHJcbiAgICAgICAgICAgIHJldHVybiBtS2luZC5OYW1lc3BhY2U7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5TeW1ib2xLaW5kLlBhY2thZ2U6XHJcbiAgICAgICAgICAgIHJldHVybiBtS2luZC5QYWNrYWdlO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuU3ltYm9sS2luZC5DbGFzczpcclxuICAgICAgICAgICAgcmV0dXJuIG1LaW5kLkNsYXNzO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuU3ltYm9sS2luZC5NZXRob2Q6XHJcbiAgICAgICAgICAgIHJldHVybiBtS2luZC5NZXRob2Q7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5TeW1ib2xLaW5kLlByb3BlcnR5OlxyXG4gICAgICAgICAgICByZXR1cm4gbUtpbmQuUHJvcGVydHk7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5TeW1ib2xLaW5kLkZpZWxkOlxyXG4gICAgICAgICAgICByZXR1cm4gbUtpbmQuRmllbGQ7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5TeW1ib2xLaW5kLkNvbnN0cnVjdG9yOlxyXG4gICAgICAgICAgICByZXR1cm4gbUtpbmQuQ29uc3RydWN0b3I7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5TeW1ib2xLaW5kLkVudW06XHJcbiAgICAgICAgICAgIHJldHVybiBtS2luZC5FbnVtO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuU3ltYm9sS2luZC5JbnRlcmZhY2U6XHJcbiAgICAgICAgICAgIHJldHVybiBtS2luZC5JbnRlcmZhY2U7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5TeW1ib2xLaW5kLkZ1bmN0aW9uOlxyXG4gICAgICAgICAgICByZXR1cm4gbUtpbmQuRnVuY3Rpb247XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5TeW1ib2xLaW5kLlZhcmlhYmxlOlxyXG4gICAgICAgICAgICByZXR1cm4gbUtpbmQuVmFyaWFibGU7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5TeW1ib2xLaW5kLkNvbnN0YW50OlxyXG4gICAgICAgICAgICByZXR1cm4gbUtpbmQuQ29uc3RhbnQ7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5TeW1ib2xLaW5kLlN0cmluZzpcclxuICAgICAgICAgICAgcmV0dXJuIG1LaW5kLlN0cmluZztcclxuICAgICAgICBjYXNlIGpzb25TZXJ2aWNlLlN5bWJvbEtpbmQuTnVtYmVyOlxyXG4gICAgICAgICAgICByZXR1cm4gbUtpbmQuTnVtYmVyO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuU3ltYm9sS2luZC5Cb29sZWFuOlxyXG4gICAgICAgICAgICByZXR1cm4gbUtpbmQuQm9vbGVhbjtcclxuICAgICAgICBjYXNlIGpzb25TZXJ2aWNlLlN5bWJvbEtpbmQuQXJyYXk6XHJcbiAgICAgICAgICAgIHJldHVybiBtS2luZC5BcnJheTtcclxuICAgIH1cclxuICAgIHJldHVybiBtS2luZC5GdW5jdGlvbjtcclxufVxyXG52YXIgRG9jdW1lbnRTeW1ib2xBZGFwdGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRG9jdW1lbnRTeW1ib2xBZGFwdGVyKF93b3JrZXIpIHtcclxuICAgICAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xyXG4gICAgfVxyXG4gICAgRG9jdW1lbnRTeW1ib2xBZGFwdGVyLnByb3RvdHlwZS5wcm92aWRlRG9jdW1lbnRTeW1ib2xzID0gZnVuY3Rpb24gKG1vZGVsLCB0b2tlbikge1xyXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAod29ya2VyKSB7IHJldHVybiB3b3JrZXIuZmluZERvY3VtZW50U3ltYm9scyhyZXNvdXJjZS50b1N0cmluZygpKTsgfSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICghaXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiAoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgZGV0YWlsOiAnJyxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lck5hbWU6IGl0ZW0uY29udGFpbmVyTmFtZSxcclxuICAgICAgICAgICAgICAgIGtpbmQ6IHRvU3ltYm9sS2luZChpdGVtLmtpbmQpLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRvUmFuZ2UoaXRlbS5sb2NhdGlvbi5yYW5nZSksXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25SYW5nZTogdG9SYW5nZShpdGVtLmxvY2F0aW9uLnJhbmdlKSxcclxuICAgICAgICAgICAgICAgIHRhZ3M6IFtdXHJcbiAgICAgICAgICAgIH0pOyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRG9jdW1lbnRTeW1ib2xBZGFwdGVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBEb2N1bWVudFN5bWJvbEFkYXB0ZXIgfTtcclxuZnVuY3Rpb24gZnJvbUZvcm1hdHRpbmdPcHRpb25zKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFiU2l6ZTogb3B0aW9ucy50YWJTaXplLFxyXG4gICAgICAgIGluc2VydFNwYWNlczogb3B0aW9ucy5pbnNlcnRTcGFjZXNcclxuICAgIH07XHJcbn1cclxudmFyIERvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlcihfd29ya2VyKSB7XHJcbiAgICAgICAgdGhpcy5fd29ya2VyID0gX3dvcmtlcjtcclxuICAgIH1cclxuICAgIERvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlci5wcm90b3R5cGUucHJvdmlkZURvY3VtZW50Rm9ybWF0dGluZ0VkaXRzID0gZnVuY3Rpb24gKG1vZGVsLCBvcHRpb25zLCB0b2tlbikge1xyXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKS50aGVuKGZ1bmN0aW9uICh3b3JrZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdvcmtlclxyXG4gICAgICAgICAgICAgICAgLmZvcm1hdChyZXNvdXJjZS50b1N0cmluZygpLCBudWxsLCBmcm9tRm9ybWF0dGluZ09wdGlvbnMob3B0aW9ucykpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZWRpdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZWRpdHMgfHwgZWRpdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVkaXRzLm1hcCh0b1RleHRFZGl0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlcjtcclxufSgpKTtcclxuZXhwb3J0IHsgRG9jdW1lbnRGb3JtYXR0aW5nRWRpdFByb3ZpZGVyIH07XHJcbnZhciBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRQcm92aWRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyKF93b3JrZXIpIHtcclxuICAgICAgICB0aGlzLl93b3JrZXIgPSBfd29ya2VyO1xyXG4gICAgfVxyXG4gICAgRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0UHJvdmlkZXIucHJvdG90eXBlLnByb3ZpZGVEb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRzID0gZnVuY3Rpb24gKG1vZGVsLCByYW5nZSwgb3B0aW9ucywgdG9rZW4pIHtcclxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBtb2RlbC51cmk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSkudGhlbihmdW5jdGlvbiAod29ya2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXJcclxuICAgICAgICAgICAgICAgIC5mb3JtYXQocmVzb3VyY2UudG9TdHJpbmcoKSwgZnJvbVJhbmdlKHJhbmdlKSwgZnJvbUZvcm1hdHRpbmdPcHRpb25zKG9wdGlvbnMpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGVkaXRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVkaXRzIHx8IGVkaXRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBlZGl0cy5tYXAodG9UZXh0RWRpdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBEb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRQcm92aWRlcjtcclxufSgpKTtcclxuZXhwb3J0IHsgRG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0UHJvdmlkZXIgfTtcclxudmFyIERvY3VtZW50Q29sb3JBZGFwdGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRG9jdW1lbnRDb2xvckFkYXB0ZXIoX3dvcmtlcikge1xyXG4gICAgICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XHJcbiAgICB9XHJcbiAgICBEb2N1bWVudENvbG9yQWRhcHRlci5wcm90b3R5cGUucHJvdmlkZURvY3VtZW50Q29sb3JzID0gZnVuY3Rpb24gKG1vZGVsLCB0b2tlbikge1xyXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG1vZGVsLnVyaTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd29ya2VyKHJlc291cmNlKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAod29ya2VyKSB7IHJldHVybiB3b3JrZXIuZmluZERvY3VtZW50Q29sb3JzKHJlc291cmNlLnRvU3RyaW5nKCkpOyB9KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5mb3MpIHtcclxuICAgICAgICAgICAgaWYgKCFpbmZvcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuICh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogaXRlbS5jb2xvcixcclxuICAgICAgICAgICAgICAgIHJhbmdlOiB0b1JhbmdlKGl0ZW0ucmFuZ2UpXHJcbiAgICAgICAgICAgIH0pOyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBEb2N1bWVudENvbG9yQWRhcHRlci5wcm90b3R5cGUucHJvdmlkZUNvbG9yUHJlc2VudGF0aW9ucyA9IGZ1bmN0aW9uIChtb2RlbCwgaW5mbywgdG9rZW4pIHtcclxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBtb2RlbC51cmk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHdvcmtlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gd29ya2VyLmdldENvbG9yUHJlc2VudGF0aW9ucyhyZXNvdXJjZS50b1N0cmluZygpLCBpbmZvLmNvbG9yLCBmcm9tUmFuZ2UoaW5mby5yYW5nZSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwcmVzZW50YXRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICghcHJlc2VudGF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcmVzZW50YXRpb25zLm1hcChmdW5jdGlvbiAocHJlc2VudGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogcHJlc2VudGF0aW9uLmxhYmVsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXNlbnRhdGlvbi50ZXh0RWRpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udGV4dEVkaXQgPSB0b1RleHRFZGl0KHByZXNlbnRhdGlvbi50ZXh0RWRpdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocHJlc2VudGF0aW9uLmFkZGl0aW9uYWxUZXh0RWRpdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZGl0aW9uYWxUZXh0RWRpdHMgPSBwcmVzZW50YXRpb24uYWRkaXRpb25hbFRleHRFZGl0cy5tYXAodG9UZXh0RWRpdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERvY3VtZW50Q29sb3JBZGFwdGVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBEb2N1bWVudENvbG9yQWRhcHRlciB9O1xyXG52YXIgRm9sZGluZ1JhbmdlQWRhcHRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEZvbGRpbmdSYW5nZUFkYXB0ZXIoX3dvcmtlcikge1xyXG4gICAgICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XHJcbiAgICB9XHJcbiAgICBGb2xkaW5nUmFuZ2VBZGFwdGVyLnByb3RvdHlwZS5wcm92aWRlRm9sZGluZ1JhbmdlcyA9IGZ1bmN0aW9uIChtb2RlbCwgY29udGV4dCwgdG9rZW4pIHtcclxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBtb2RlbC51cmk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHdvcmtlcikgeyByZXR1cm4gd29ya2VyLmdldEZvbGRpbmdSYW5nZXMocmVzb3VyY2UudG9TdHJpbmcoKSwgY29udGV4dCk7IH0pXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyYW5nZXMpIHtcclxuICAgICAgICAgICAgaWYgKCFyYW5nZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VzLm1hcChmdW5jdGlvbiAocmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHJhbmdlLnN0YXJ0TGluZSArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiByYW5nZS5lbmRMaW5lICsgMVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmFuZ2Uua2luZCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQua2luZCA9IHRvRm9sZGluZ1JhbmdlS2luZChyYW5nZS5raW5kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBGb2xkaW5nUmFuZ2VBZGFwdGVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBGb2xkaW5nUmFuZ2VBZGFwdGVyIH07XHJcbmZ1bmN0aW9uIHRvRm9sZGluZ1JhbmdlS2luZChraW5kKSB7XHJcbiAgICBzd2l0Y2ggKGtpbmQpIHtcclxuICAgICAgICBjYXNlIGpzb25TZXJ2aWNlLkZvbGRpbmdSYW5nZUtpbmQuQ29tbWVudDpcclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlcy5Gb2xkaW5nUmFuZ2VLaW5kLkNvbW1lbnQ7XHJcbiAgICAgICAgY2FzZSBqc29uU2VydmljZS5Gb2xkaW5nUmFuZ2VLaW5kLkltcG9ydHM6XHJcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZXMuRm9sZGluZ1JhbmdlS2luZC5JbXBvcnRzO1xyXG4gICAgICAgIGNhc2UganNvblNlcnZpY2UuRm9sZGluZ1JhbmdlS2luZC5SZWdpb246XHJcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZXMuRm9sZGluZ1JhbmdlS2luZC5SZWdpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdm9pZCAwO1xyXG59XHJcbnZhciBTZWxlY3Rpb25SYW5nZUFkYXB0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTZWxlY3Rpb25SYW5nZUFkYXB0ZXIoX3dvcmtlcikge1xyXG4gICAgICAgIHRoaXMuX3dvcmtlciA9IF93b3JrZXI7XHJcbiAgICB9XHJcbiAgICBTZWxlY3Rpb25SYW5nZUFkYXB0ZXIucHJvdG90eXBlLnByb3ZpZGVTZWxlY3Rpb25SYW5nZXMgPSBmdW5jdGlvbiAobW9kZWwsIHBvc2l0aW9ucywgdG9rZW4pIHtcclxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBtb2RlbC51cmk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtlcihyZXNvdXJjZSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHdvcmtlcikgeyByZXR1cm4gd29ya2VyLmdldFNlbGVjdGlvblJhbmdlcyhyZXNvdXJjZS50b1N0cmluZygpLCBwb3NpdGlvbnMubWFwKGZyb21Qb3NpdGlvbikpOyB9KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoc2VsZWN0aW9uUmFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VsZWN0aW9uUmFuZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvblJhbmdlcy5tYXAoZnVuY3Rpb24gKHNlbGVjdGlvblJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoc2VsZWN0aW9uUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7IHJhbmdlOiB0b1JhbmdlKHNlbGVjdGlvblJhbmdlLnJhbmdlKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25SYW5nZSA9IHNlbGVjdGlvblJhbmdlLnBhcmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTZWxlY3Rpb25SYW5nZUFkYXB0ZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFNlbGVjdGlvblJhbmdlQWRhcHRlciB9O1xyXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuaW1wb3J0ICogYXMganNvbiBmcm9tICcuL19kZXBzL2pzb25jLXBhcnNlci9tYWluLmpzJztcclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRva2VuaXphdGlvblN1cHBvcnQoc3VwcG9ydENvbW1lbnRzKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEpTT05TdGF0ZShudWxsLCBudWxsLCBmYWxzZSwgbnVsbCk7IH0sXHJcbiAgICAgICAgdG9rZW5pemU6IGZ1bmN0aW9uIChsaW5lLCBzdGF0ZSwgb2Zmc2V0RGVsdGEsIHN0b3BBdE9mZnNldCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdG9rZW5pemUoc3VwcG9ydENvbW1lbnRzLCBsaW5lLCBzdGF0ZSwgb2Zmc2V0RGVsdGEsIHN0b3BBdE9mZnNldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5leHBvcnQgdmFyIFRPS0VOX0RFTElNX09CSkVDVCA9ICdkZWxpbWl0ZXIuYnJhY2tldC5qc29uJztcclxuZXhwb3J0IHZhciBUT0tFTl9ERUxJTV9BUlJBWSA9ICdkZWxpbWl0ZXIuYXJyYXkuanNvbic7XHJcbmV4cG9ydCB2YXIgVE9LRU5fREVMSU1fQ09MT04gPSAnZGVsaW1pdGVyLmNvbG9uLmpzb24nO1xyXG5leHBvcnQgdmFyIFRPS0VOX0RFTElNX0NPTU1BID0gJ2RlbGltaXRlci5jb21tYS5qc29uJztcclxuZXhwb3J0IHZhciBUT0tFTl9WQUxVRV9CT09MRUFOID0gJ2tleXdvcmQuanNvbic7XHJcbmV4cG9ydCB2YXIgVE9LRU5fVkFMVUVfTlVMTCA9ICdrZXl3b3JkLmpzb24nO1xyXG5leHBvcnQgdmFyIFRPS0VOX1ZBTFVFX1NUUklORyA9ICdzdHJpbmcudmFsdWUuanNvbic7XHJcbmV4cG9ydCB2YXIgVE9LRU5fVkFMVUVfTlVNQkVSID0gJ251bWJlci5qc29uJztcclxuZXhwb3J0IHZhciBUT0tFTl9QUk9QRVJUWV9OQU1FID0gJ3N0cmluZy5rZXkuanNvbic7XHJcbmV4cG9ydCB2YXIgVE9LRU5fQ09NTUVOVF9CTE9DSyA9ICdjb21tZW50LmJsb2NrLmpzb24nO1xyXG5leHBvcnQgdmFyIFRPS0VOX0NPTU1FTlRfTElORSA9ICdjb21tZW50LmxpbmUuanNvbic7XHJcbnZhciBQYXJlbnRzU3RhY2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQYXJlbnRzU3RhY2socGFyZW50LCB0eXBlKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxuICAgIFBhcmVudHNTdGFjay5wb3AgPSBmdW5jdGlvbiAocGFyZW50cykge1xyXG4gICAgICAgIGlmIChwYXJlbnRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRzLnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgUGFyZW50c1N0YWNrLnB1c2ggPSBmdW5jdGlvbiAocGFyZW50cywgdHlwZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUGFyZW50c1N0YWNrKHBhcmVudHMsIHR5cGUpO1xyXG4gICAgfTtcclxuICAgIFBhcmVudHNTdGFjay5lcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIGlmICghYSAmJiAhYikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhIHx8ICFiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKGEgJiYgYikge1xyXG4gICAgICAgICAgICBpZiAoYSA9PT0gYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGEudHlwZSAhPT0gYi50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYSA9IGEucGFyZW50O1xyXG4gICAgICAgICAgICBiID0gYi5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBQYXJlbnRzU3RhY2s7XHJcbn0oKSk7XHJcbnZhciBKU09OU3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBKU09OU3RhdGUoc3RhdGUsIHNjYW5FcnJvciwgbGFzdFdhc0NvbG9uLCBwYXJlbnRzKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLnNjYW5FcnJvciA9IHNjYW5FcnJvcjtcclxuICAgICAgICB0aGlzLmxhc3RXYXNDb2xvbiA9IGxhc3RXYXNDb2xvbjtcclxuICAgICAgICB0aGlzLnBhcmVudHMgPSBwYXJlbnRzO1xyXG4gICAgfVxyXG4gICAgSlNPTlN0YXRlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEpTT05TdGF0ZSh0aGlzLl9zdGF0ZSwgdGhpcy5zY2FuRXJyb3IsIHRoaXMubGFzdFdhc0NvbG9uLCB0aGlzLnBhcmVudHMpO1xyXG4gICAgfTtcclxuICAgIEpTT05TdGF0ZS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyKSB7XHJcbiAgICAgICAgaWYgKG90aGVyID09PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW90aGVyIHx8ICEob3RoZXIgaW5zdGFuY2VvZiBKU09OU3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnNjYW5FcnJvciA9PT0gb3RoZXIuc2NhbkVycm9yICYmXHJcbiAgICAgICAgICAgIHRoaXMubGFzdFdhc0NvbG9uID09PSBvdGhlci5sYXN0V2FzQ29sb24gJiZcclxuICAgICAgICAgICAgUGFyZW50c1N0YWNrLmVxdWFscyh0aGlzLnBhcmVudHMsIG90aGVyLnBhcmVudHMpKTtcclxuICAgIH07XHJcbiAgICBKU09OU3RhdGUucHJvdG90eXBlLmdldFN0YXRlRGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XHJcbiAgICB9O1xyXG4gICAgSlNPTlN0YXRlLnByb3RvdHlwZS5zZXRTdGF0ZURhdGEgPSBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBKU09OU3RhdGU7XHJcbn0oKSk7XHJcbmZ1bmN0aW9uIHRva2VuaXplKGNvbW1lbnRzLCBsaW5lLCBzdGF0ZSwgb2Zmc2V0RGVsdGEsIHN0b3BBdE9mZnNldCkge1xyXG4gICAgaWYgKG9mZnNldERlbHRhID09PSB2b2lkIDApIHsgb2Zmc2V0RGVsdGEgPSAwOyB9XHJcbiAgICAvLyBoYW5kbGUgbXVsdGlsaW5lIHN0cmluZ3MgYW5kIGJsb2NrIGNvbW1lbnRzXHJcbiAgICB2YXIgbnVtYmVyT2ZJbnNlcnRlZENoYXJhY3RlcnMgPSAwO1xyXG4gICAgdmFyIGFkanVzdE9mZnNldCA9IGZhbHNlO1xyXG4gICAgc3dpdGNoIChzdGF0ZS5zY2FuRXJyb3IpIHtcclxuICAgICAgICBjYXNlIDIgLyogVW5leHBlY3RlZEVuZE9mU3RyaW5nICovOlxyXG4gICAgICAgICAgICBsaW5lID0gJ1wiJyArIGxpbmU7XHJcbiAgICAgICAgICAgIG51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzID0gMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxIC8qIFVuZXhwZWN0ZWRFbmRPZkNvbW1lbnQgKi86XHJcbiAgICAgICAgICAgIGxpbmUgPSAnLyonICsgbGluZTtcclxuICAgICAgICAgICAgbnVtYmVyT2ZJbnNlcnRlZENoYXJhY3RlcnMgPSAyO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHZhciBzY2FubmVyID0ganNvbi5jcmVhdGVTY2FubmVyKGxpbmUpO1xyXG4gICAgdmFyIGxhc3RXYXNDb2xvbiA9IHN0YXRlLmxhc3RXYXNDb2xvbjtcclxuICAgIHZhciBwYXJlbnRzID0gc3RhdGUucGFyZW50cztcclxuICAgIHZhciByZXQgPSB7XHJcbiAgICAgICAgdG9rZW5zOiBbXSxcclxuICAgICAgICBlbmRTdGF0ZTogc3RhdGUuY2xvbmUoKVxyXG4gICAgfTtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IG9mZnNldERlbHRhICsgc2Nhbm5lci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHZhciB0eXBlID0gJyc7XHJcbiAgICAgICAgdmFyIGtpbmQgPSBzY2FubmVyLnNjYW4oKTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gMTcgLyogRU9GICovKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDaGVjayB0aGF0IHRoZSBzY2FubmVyIGhhcyBhZHZhbmNlZFxyXG4gICAgICAgIGlmIChvZmZzZXQgPT09IG9mZnNldERlbHRhICsgc2Nhbm5lci5nZXRQb3NpdGlvbigpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2Nhbm5lciBkaWQgbm90IGFkdmFuY2UsIG5leHQgMyBjaGFyYWN0ZXJzIGFyZTogJyArIGxpbmUuc3Vic3RyKHNjYW5uZXIuZ2V0UG9zaXRpb24oKSwgMykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBJbiBjYXNlIHdlIGluc2VydGVkIC8qIG9yIFwiIGNoYXJhY3Rlciwgd2UgbmVlZCB0b1xyXG4gICAgICAgIC8vIGFkanVzdCB0aGUgb2Zmc2V0IG9mIGFsbCB0b2tlbnMgKGV4Y2VwdCB0aGUgZmlyc3QpXHJcbiAgICAgICAgaWYgKGFkanVzdE9mZnNldCkge1xyXG4gICAgICAgICAgICBvZmZzZXQgLT0gbnVtYmVyT2ZJbnNlcnRlZENoYXJhY3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFkanVzdE9mZnNldCA9IG51bWJlck9mSW5zZXJ0ZWRDaGFyYWN0ZXJzID4gMDtcclxuICAgICAgICAvLyBicmFja2V0cyBhbmQgdHlwZVxyXG4gICAgICAgIHN3aXRjaCAoa2luZCkge1xyXG4gICAgICAgICAgICBjYXNlIDEgLyogT3BlbkJyYWNlVG9rZW4gKi86XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRzID0gUGFyZW50c1N0YWNrLnB1c2gocGFyZW50cywgMCAvKiBPYmplY3QgKi8pO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0RFTElNX09CSkVDVDtcclxuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMiAvKiBDbG9zZUJyYWNlVG9rZW4gKi86XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRzID0gUGFyZW50c1N0YWNrLnBvcChwYXJlbnRzKTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9ERUxJTV9PQkpFQ1Q7XHJcbiAgICAgICAgICAgICAgICBsYXN0V2FzQ29sb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMgLyogT3BlbkJyYWNrZXRUb2tlbiAqLzpcclxuICAgICAgICAgICAgICAgIHBhcmVudHMgPSBQYXJlbnRzU3RhY2sucHVzaChwYXJlbnRzLCAxIC8qIEFycmF5ICovKTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9ERUxJTV9BUlJBWTtcclxuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNCAvKiBDbG9zZUJyYWNrZXRUb2tlbiAqLzpcclxuICAgICAgICAgICAgICAgIHBhcmVudHMgPSBQYXJlbnRzU3RhY2sucG9wKHBhcmVudHMpO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0RFTElNX0FSUkFZO1xyXG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2IC8qIENvbG9uVG9rZW4gKi86XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fREVMSU1fQ09MT047XHJcbiAgICAgICAgICAgICAgICBsYXN0V2FzQ29sb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNSAvKiBDb21tYVRva2VuICovOlxyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0RFTElNX0NPTU1BO1xyXG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA4IC8qIFRydWVLZXl3b3JkICovOlxyXG4gICAgICAgICAgICBjYXNlIDkgLyogRmFsc2VLZXl3b3JkICovOlxyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFRPS0VOX1ZBTFVFX0JPT0xFQU47XHJcbiAgICAgICAgICAgICAgICBsYXN0V2FzQ29sb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDcgLyogTnVsbEtleXdvcmQgKi86XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fVkFMVUVfTlVMTDtcclxuICAgICAgICAgICAgICAgIGxhc3RXYXNDb2xvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTAgLyogU3RyaW5nTGl0ZXJhbCAqLzpcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50UGFyZW50ID0gcGFyZW50cyA/IHBhcmVudHMudHlwZSA6IDAgLyogT2JqZWN0ICovO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluQXJyYXkgPSBjdXJyZW50UGFyZW50ID09PSAxIC8qIEFycmF5ICovO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uIHx8IGluQXJyYXkgPyBUT0tFTl9WQUxVRV9TVFJJTkcgOiBUT0tFTl9QUk9QRVJUWV9OQU1FO1xyXG4gICAgICAgICAgICAgICAgbGFzdFdhc0NvbG9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMSAvKiBOdW1lcmljTGl0ZXJhbCAqLzpcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9WQUxVRV9OVU1CRVI7XHJcbiAgICAgICAgICAgICAgICBsYXN0V2FzQ29sb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb21tZW50cywgaWZmIGVuYWJsZWRcclxuICAgICAgICBpZiAoY29tbWVudHMpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChraW5kKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEyIC8qIExpbmVDb21tZW50VHJpdmlhICovOlxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9DT01NRU5UX0xJTkU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEzIC8qIEJsb2NrQ29tbWVudFRyaXZpYSAqLzpcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVE9LRU5fQ09NTUVOVF9CTE9DSztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXQuZW5kU3RhdGUgPSBuZXcgSlNPTlN0YXRlKHN0YXRlLmdldFN0YXRlRGF0YSgpLCBzY2FubmVyLmdldFRva2VuRXJyb3IoKSwgbGFzdFdhc0NvbG9uLCBwYXJlbnRzKTtcclxuICAgICAgICByZXQudG9rZW5zLnB1c2goe1xyXG4gICAgICAgICAgICBzdGFydEluZGV4OiBvZmZzZXQsXHJcbiAgICAgICAgICAgIHNjb3BlczogdHlwZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuaW1wb3J0IHsgV29ya2VyTWFuYWdlciB9IGZyb20gJy4vd29ya2VyTWFuYWdlci5qcyc7XHJcbmltcG9ydCAqIGFzIGxhbmd1YWdlRmVhdHVyZXMgZnJvbSAnLi9sYW5ndWFnZUZlYXR1cmVzLmpzJztcclxuaW1wb3J0IHsgY3JlYXRlVG9rZW5pemF0aW9uU3VwcG9ydCB9IGZyb20gJy4vdG9rZW5pemF0aW9uLmpzJztcclxuaW1wb3J0IHsgbGFuZ3VhZ2VzIH0gZnJvbSAnLi9maWxsZXJzL21vbmFjby1lZGl0b3ItY29yZS5qcyc7XHJcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cE1vZGUoZGVmYXVsdHMpIHtcclxuICAgIHZhciBkaXNwb3NhYmxlcyA9IFtdO1xyXG4gICAgdmFyIHByb3ZpZGVycyA9IFtdO1xyXG4gICAgdmFyIGNsaWVudCA9IG5ldyBXb3JrZXJNYW5hZ2VyKGRlZmF1bHRzKTtcclxuICAgIGRpc3Bvc2FibGVzLnB1c2goY2xpZW50KTtcclxuICAgIHZhciB3b3JrZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHVyaXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB1cmlzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjbGllbnQuZ2V0TGFuZ3VhZ2VTZXJ2aWNlV29ya2VyLmFwcGx5KGNsaWVudCwgdXJpcyk7XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJQcm92aWRlcnMoKSB7XHJcbiAgICAgICAgdmFyIGxhbmd1YWdlSWQgPSBkZWZhdWx0cy5sYW5ndWFnZUlkLCBtb2RlQ29uZmlndXJhdGlvbiA9IGRlZmF1bHRzLm1vZGVDb25maWd1cmF0aW9uO1xyXG4gICAgICAgIGRpc3Bvc2VBbGwocHJvdmlkZXJzKTtcclxuICAgICAgICBpZiAobW9kZUNvbmZpZ3VyYXRpb24uZG9jdW1lbnRGb3JtYXR0aW5nRWRpdHMpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXJzLnB1c2gobGFuZ3VhZ2VzLnJlZ2lzdGVyRG9jdW1lbnRGb3JtYXR0aW5nRWRpdFByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBsYW5ndWFnZUZlYXR1cmVzLkRvY3VtZW50Rm9ybWF0dGluZ0VkaXRQcm92aWRlcih3b3JrZXIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbi5kb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRzKSB7XHJcbiAgICAgICAgICAgIHByb3ZpZGVycy5wdXNoKGxhbmd1YWdlcy5yZWdpc3RlckRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBsYW5ndWFnZUZlYXR1cmVzLkRvY3VtZW50UmFuZ2VGb3JtYXR0aW5nRWRpdFByb3ZpZGVyKHdvcmtlcikpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vZGVDb25maWd1cmF0aW9uLmNvbXBsZXRpb25JdGVtcykge1xyXG4gICAgICAgICAgICBwcm92aWRlcnMucHVzaChsYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBsYW5ndWFnZUZlYXR1cmVzLkNvbXBsZXRpb25BZGFwdGVyKHdvcmtlcikpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vZGVDb25maWd1cmF0aW9uLmhvdmVycykge1xyXG4gICAgICAgICAgICBwcm92aWRlcnMucHVzaChsYW5ndWFnZXMucmVnaXN0ZXJIb3ZlclByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBsYW5ndWFnZUZlYXR1cmVzLkhvdmVyQWRhcHRlcih3b3JrZXIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbi5kb2N1bWVudFN5bWJvbHMpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXJzLnB1c2gobGFuZ3VhZ2VzLnJlZ2lzdGVyRG9jdW1lbnRTeW1ib2xQcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgbGFuZ3VhZ2VGZWF0dXJlcy5Eb2N1bWVudFN5bWJvbEFkYXB0ZXIod29ya2VyKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobW9kZUNvbmZpZ3VyYXRpb24udG9rZW5zKSB7XHJcbiAgICAgICAgICAgIHByb3ZpZGVycy5wdXNoKGxhbmd1YWdlcy5zZXRUb2tlbnNQcm92aWRlcihsYW5ndWFnZUlkLCBjcmVhdGVUb2tlbml6YXRpb25TdXBwb3J0KHRydWUpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbi5jb2xvcnMpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXJzLnB1c2gobGFuZ3VhZ2VzLnJlZ2lzdGVyQ29sb3JQcm92aWRlcihsYW5ndWFnZUlkLCBuZXcgbGFuZ3VhZ2VGZWF0dXJlcy5Eb2N1bWVudENvbG9yQWRhcHRlcih3b3JrZXIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb2RlQ29uZmlndXJhdGlvbi5mb2xkaW5nUmFuZ2VzKSB7XHJcbiAgICAgICAgICAgIHByb3ZpZGVycy5wdXNoKGxhbmd1YWdlcy5yZWdpc3RlckZvbGRpbmdSYW5nZVByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBsYW5ndWFnZUZlYXR1cmVzLkZvbGRpbmdSYW5nZUFkYXB0ZXIod29ya2VyKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobW9kZUNvbmZpZ3VyYXRpb24uZGlhZ25vc3RpY3MpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXJzLnB1c2gobmV3IGxhbmd1YWdlRmVhdHVyZXMuRGlhZ25vc3RpY3NBZGFwdGVyKGxhbmd1YWdlSWQsIHdvcmtlciwgZGVmYXVsdHMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vZGVDb25maWd1cmF0aW9uLnNlbGVjdGlvblJhbmdlcykge1xyXG4gICAgICAgICAgICBwcm92aWRlcnMucHVzaChsYW5ndWFnZXMucmVnaXN0ZXJTZWxlY3Rpb25SYW5nZVByb3ZpZGVyKGxhbmd1YWdlSWQsIG5ldyBsYW5ndWFnZUZlYXR1cmVzLlNlbGVjdGlvblJhbmdlQWRhcHRlcih3b3JrZXIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJQcm92aWRlcnMoKTtcclxuICAgIGRpc3Bvc2FibGVzLnB1c2gobGFuZ3VhZ2VzLnNldExhbmd1YWdlQ29uZmlndXJhdGlvbihkZWZhdWx0cy5sYW5ndWFnZUlkLCByaWNoRWRpdENvbmZpZ3VyYXRpb24pKTtcclxuICAgIHZhciBtb2RlQ29uZmlndXJhdGlvbiA9IGRlZmF1bHRzLm1vZGVDb25maWd1cmF0aW9uO1xyXG4gICAgZGVmYXVsdHMub25EaWRDaGFuZ2UoZnVuY3Rpb24gKG5ld0RlZmF1bHRzKSB7XHJcbiAgICAgICAgaWYgKG5ld0RlZmF1bHRzLm1vZGVDb25maWd1cmF0aW9uICE9PSBtb2RlQ29uZmlndXJhdGlvbikge1xyXG4gICAgICAgICAgICBtb2RlQ29uZmlndXJhdGlvbiA9IG5ld0RlZmF1bHRzLm1vZGVDb25maWd1cmF0aW9uO1xyXG4gICAgICAgICAgICByZWdpc3RlclByb3ZpZGVycygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgZGlzcG9zYWJsZXMucHVzaChhc0Rpc3Bvc2FibGUocHJvdmlkZXJzKSk7XHJcbiAgICByZXR1cm4gYXNEaXNwb3NhYmxlKGRpc3Bvc2FibGVzKTtcclxufVxyXG5mdW5jdGlvbiBhc0Rpc3Bvc2FibGUoZGlzcG9zYWJsZXMpIHtcclxuICAgIHJldHVybiB7IGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRpc3Bvc2VBbGwoZGlzcG9zYWJsZXMpOyB9IH07XHJcbn1cclxuZnVuY3Rpb24gZGlzcG9zZUFsbChkaXNwb3NhYmxlcykge1xyXG4gICAgd2hpbGUgKGRpc3Bvc2FibGVzLmxlbmd0aCkge1xyXG4gICAgICAgIGRpc3Bvc2FibGVzLnBvcCgpLmRpc3Bvc2UoKTtcclxuICAgIH1cclxufVxyXG52YXIgcmljaEVkaXRDb25maWd1cmF0aW9uID0ge1xyXG4gICAgd29yZFBhdHRlcm46IC8oLT9cXGQqXFwuXFxkXFx3Kil8KFteXFxbXFx7XFxdXFx9XFw6XFxcIlxcLFxcc10rKS9nLFxyXG4gICAgY29tbWVudHM6IHtcclxuICAgICAgICBsaW5lQ29tbWVudDogJy8vJyxcclxuICAgICAgICBibG9ja0NvbW1lbnQ6IFsnLyonLCAnKi8nXVxyXG4gICAgfSxcclxuICAgIGJyYWNrZXRzOiBbXHJcbiAgICAgICAgWyd7JywgJ30nXSxcclxuICAgICAgICBbJ1snLCAnXSddXHJcbiAgICBdLFxyXG4gICAgYXV0b0Nsb3NpbmdQYWlyczogW1xyXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nLCBub3RJbjogWydzdHJpbmcnXSB9LFxyXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nLCBub3RJbjogWydzdHJpbmcnXSB9LFxyXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicsIG5vdEluOiBbJ3N0cmluZyddIH1cclxuICAgIF1cclxufTtcclxuIiwidmFyIExJQjtMSUI9KCgpPT57XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9ezQ3MDp0PT57ZnVuY3Rpb24gZSh0KXtpZihcInN0cmluZ1wiIT10eXBlb2YgdCl0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGF0aCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCBcIitKU09OLnN0cmluZ2lmeSh0KSl9ZnVuY3Rpb24gcih0LGUpe2Zvcih2YXIgcixuPVwiXCIsbz0wLGk9LTEsYT0wLGg9MDtoPD10Lmxlbmd0aDsrK2gpe2lmKGg8dC5sZW5ndGgpcj10LmNoYXJDb2RlQXQoaCk7ZWxzZXtpZig0Nz09PXIpYnJlYWs7cj00N31pZig0Nz09PXIpe2lmKGk9PT1oLTF8fDE9PT1hKTtlbHNlIGlmKGkhPT1oLTEmJjI9PT1hKXtpZihuLmxlbmd0aDwyfHwyIT09b3x8NDYhPT1uLmNoYXJDb2RlQXQobi5sZW5ndGgtMSl8fDQ2IT09bi5jaGFyQ29kZUF0KG4ubGVuZ3RoLTIpKWlmKG4ubGVuZ3RoPjIpe3ZhciBzPW4ubGFzdEluZGV4T2YoXCIvXCIpO2lmKHMhPT1uLmxlbmd0aC0xKXstMT09PXM/KG49XCJcIixvPTApOm89KG49bi5zbGljZSgwLHMpKS5sZW5ndGgtMS1uLmxhc3RJbmRleE9mKFwiL1wiKSxpPWgsYT0wO2NvbnRpbnVlfX1lbHNlIGlmKDI9PT1uLmxlbmd0aHx8MT09PW4ubGVuZ3RoKXtuPVwiXCIsbz0wLGk9aCxhPTA7Y29udGludWV9ZSYmKG4ubGVuZ3RoPjA/bis9XCIvLi5cIjpuPVwiLi5cIixvPTIpfWVsc2Ugbi5sZW5ndGg+MD9uKz1cIi9cIit0LnNsaWNlKGkrMSxoKTpuPXQuc2xpY2UoaSsxLGgpLG89aC1pLTE7aT1oLGE9MH1lbHNlIDQ2PT09ciYmLTEhPT1hPysrYTphPS0xfXJldHVybiBufXZhciBuPXtyZXNvbHZlOmZ1bmN0aW9uKCl7Zm9yKHZhciB0LG49XCJcIixvPSExLGk9YXJndW1lbnRzLmxlbmd0aC0xO2k+PS0xJiYhbztpLS0pe3ZhciBhO2k+PTA/YT1hcmd1bWVudHNbaV06KHZvaWQgMD09PXQmJih0PXByb2Nlc3MuY3dkKCkpLGE9dCksZShhKSwwIT09YS5sZW5ndGgmJihuPWErXCIvXCIrbixvPTQ3PT09YS5jaGFyQ29kZUF0KDApKX1yZXR1cm4gbj1yKG4sIW8pLG8/bi5sZW5ndGg+MD9cIi9cIituOlwiL1wiOm4ubGVuZ3RoPjA/bjpcIi5cIn0sbm9ybWFsaXplOmZ1bmN0aW9uKHQpe2lmKGUodCksMD09PXQubGVuZ3RoKXJldHVyblwiLlwiO3ZhciBuPTQ3PT09dC5jaGFyQ29kZUF0KDApLG89NDc9PT10LmNoYXJDb2RlQXQodC5sZW5ndGgtMSk7cmV0dXJuIDAhPT0odD1yKHQsIW4pKS5sZW5ndGh8fG58fCh0PVwiLlwiKSx0Lmxlbmd0aD4wJiZvJiYodCs9XCIvXCIpLG4/XCIvXCIrdDp0fSxpc0Fic29sdXRlOmZ1bmN0aW9uKHQpe3JldHVybiBlKHQpLHQubGVuZ3RoPjAmJjQ3PT09dC5jaGFyQ29kZUF0KDApfSxqb2luOmZ1bmN0aW9uKCl7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuXCIuXCI7Zm9yKHZhciB0LHI9MDtyPGFyZ3VtZW50cy5sZW5ndGg7KytyKXt2YXIgbz1hcmd1bWVudHNbcl07ZShvKSxvLmxlbmd0aD4wJiYodm9pZCAwPT09dD90PW86dCs9XCIvXCIrbyl9cmV0dXJuIHZvaWQgMD09PXQ/XCIuXCI6bi5ub3JtYWxpemUodCl9LHJlbGF0aXZlOmZ1bmN0aW9uKHQscil7aWYoZSh0KSxlKHIpLHQ9PT1yKXJldHVyblwiXCI7aWYoKHQ9bi5yZXNvbHZlKHQpKT09PShyPW4ucmVzb2x2ZShyKSkpcmV0dXJuXCJcIjtmb3IodmFyIG89MTtvPHQubGVuZ3RoJiY0Nz09PXQuY2hhckNvZGVBdChvKTsrK28pO2Zvcih2YXIgaT10Lmxlbmd0aCxhPWktbyxoPTE7aDxyLmxlbmd0aCYmNDc9PT1yLmNoYXJDb2RlQXQoaCk7KytoKTtmb3IodmFyIHM9ci5sZW5ndGgtaCxmPWE8cz9hOnMsdT0tMSxjPTA7Yzw9ZjsrK2Mpe2lmKGM9PT1mKXtpZihzPmYpe2lmKDQ3PT09ci5jaGFyQ29kZUF0KGgrYykpcmV0dXJuIHIuc2xpY2UoaCtjKzEpO2lmKDA9PT1jKXJldHVybiByLnNsaWNlKGgrYyl9ZWxzZSBhPmYmJig0Nz09PXQuY2hhckNvZGVBdChvK2MpP3U9YzowPT09YyYmKHU9MCkpO2JyZWFrfXZhciBsPXQuY2hhckNvZGVBdChvK2MpO2lmKGwhPT1yLmNoYXJDb2RlQXQoaCtjKSlicmVhazs0Nz09PWwmJih1PWMpfXZhciBwPVwiXCI7Zm9yKGM9byt1KzE7Yzw9aTsrK2MpYyE9PWkmJjQ3IT09dC5jaGFyQ29kZUF0KGMpfHwoMD09PXAubGVuZ3RoP3ArPVwiLi5cIjpwKz1cIi8uLlwiKTtyZXR1cm4gcC5sZW5ndGg+MD9wK3Iuc2xpY2UoaCt1KTooaCs9dSw0Nz09PXIuY2hhckNvZGVBdChoKSYmKytoLHIuc2xpY2UoaCkpfSxfbWFrZUxvbmc6ZnVuY3Rpb24odCl7cmV0dXJuIHR9LGRpcm5hbWU6ZnVuY3Rpb24odCl7aWYoZSh0KSwwPT09dC5sZW5ndGgpcmV0dXJuXCIuXCI7Zm9yKHZhciByPXQuY2hhckNvZGVBdCgwKSxuPTQ3PT09cixvPS0xLGk9ITAsYT10Lmxlbmd0aC0xO2E+PTE7LS1hKWlmKDQ3PT09KHI9dC5jaGFyQ29kZUF0KGEpKSl7aWYoIWkpe289YTticmVha319ZWxzZSBpPSExO3JldHVybi0xPT09bz9uP1wiL1wiOlwiLlwiOm4mJjE9PT1vP1wiLy9cIjp0LnNsaWNlKDAsbyl9LGJhc2VuYW1lOmZ1bmN0aW9uKHQscil7aWYodm9pZCAwIT09ciYmXCJzdHJpbmdcIiE9dHlwZW9mIHIpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJleHRcIiBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJyk7ZSh0KTt2YXIgbixvPTAsaT0tMSxhPSEwO2lmKHZvaWQgMCE9PXImJnIubGVuZ3RoPjAmJnIubGVuZ3RoPD10Lmxlbmd0aCl7aWYoci5sZW5ndGg9PT10Lmxlbmd0aCYmcj09PXQpcmV0dXJuXCJcIjt2YXIgaD1yLmxlbmd0aC0xLHM9LTE7Zm9yKG49dC5sZW5ndGgtMTtuPj0wOy0tbil7dmFyIGY9dC5jaGFyQ29kZUF0KG4pO2lmKDQ3PT09Zil7aWYoIWEpe289bisxO2JyZWFrfX1lbHNlLTE9PT1zJiYoYT0hMSxzPW4rMSksaD49MCYmKGY9PT1yLmNoYXJDb2RlQXQoaCk/LTE9PS0taCYmKGk9bik6KGg9LTEsaT1zKSl9cmV0dXJuIG89PT1pP2k9czotMT09PWkmJihpPXQubGVuZ3RoKSx0LnNsaWNlKG8saSl9Zm9yKG49dC5sZW5ndGgtMTtuPj0wOy0tbilpZig0Nz09PXQuY2hhckNvZGVBdChuKSl7aWYoIWEpe289bisxO2JyZWFrfX1lbHNlLTE9PT1pJiYoYT0hMSxpPW4rMSk7cmV0dXJuLTE9PT1pP1wiXCI6dC5zbGljZShvLGkpfSxleHRuYW1lOmZ1bmN0aW9uKHQpe2UodCk7Zm9yKHZhciByPS0xLG49MCxvPS0xLGk9ITAsYT0wLGg9dC5sZW5ndGgtMTtoPj0wOy0taCl7dmFyIHM9dC5jaGFyQ29kZUF0KGgpO2lmKDQ3IT09cyktMT09PW8mJihpPSExLG89aCsxKSw0Nj09PXM/LTE9PT1yP3I9aDoxIT09YSYmKGE9MSk6LTEhPT1yJiYoYT0tMSk7ZWxzZSBpZighaSl7bj1oKzE7YnJlYWt9fXJldHVybi0xPT09cnx8LTE9PT1vfHwwPT09YXx8MT09PWEmJnI9PT1vLTEmJnI9PT1uKzE/XCJcIjp0LnNsaWNlKHIsbyl9LGZvcm1hdDpmdW5jdGlvbih0KXtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwicGF0aE9iamVjdFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyt0eXBlb2YgdCk7cmV0dXJuIGZ1bmN0aW9uKHQsZSl7dmFyIHI9ZS5kaXJ8fGUucm9vdCxuPWUuYmFzZXx8KGUubmFtZXx8XCJcIikrKGUuZXh0fHxcIlwiKTtyZXR1cm4gcj9yPT09ZS5yb290P3IrbjpyK1wiL1wiK246bn0oMCx0KX0scGFyc2U6ZnVuY3Rpb24odCl7ZSh0KTt2YXIgcj17cm9vdDpcIlwiLGRpcjpcIlwiLGJhc2U6XCJcIixleHQ6XCJcIixuYW1lOlwiXCJ9O2lmKDA9PT10Lmxlbmd0aClyZXR1cm4gcjt2YXIgbixvPXQuY2hhckNvZGVBdCgwKSxpPTQ3PT09bztpPyhyLnJvb3Q9XCIvXCIsbj0xKTpuPTA7Zm9yKHZhciBhPS0xLGg9MCxzPS0xLGY9ITAsdT10Lmxlbmd0aC0xLGM9MDt1Pj1uOy0tdSlpZig0NyE9PShvPXQuY2hhckNvZGVBdCh1KSkpLTE9PT1zJiYoZj0hMSxzPXUrMSksNDY9PT1vPy0xPT09YT9hPXU6MSE9PWMmJihjPTEpOi0xIT09YSYmKGM9LTEpO2Vsc2UgaWYoIWYpe2g9dSsxO2JyZWFrfXJldHVybi0xPT09YXx8LTE9PT1zfHwwPT09Y3x8MT09PWMmJmE9PT1zLTEmJmE9PT1oKzE/LTEhPT1zJiYoci5iYXNlPXIubmFtZT0wPT09aCYmaT90LnNsaWNlKDEscyk6dC5zbGljZShoLHMpKTooMD09PWgmJmk/KHIubmFtZT10LnNsaWNlKDEsYSksci5iYXNlPXQuc2xpY2UoMSxzKSk6KHIubmFtZT10LnNsaWNlKGgsYSksci5iYXNlPXQuc2xpY2UoaCxzKSksci5leHQ9dC5zbGljZShhLHMpKSxoPjA/ci5kaXI9dC5zbGljZSgwLGgtMSk6aSYmKHIuZGlyPVwiL1wiKSxyfSxzZXA6XCIvXCIsZGVsaW1pdGVyOlwiOlwiLHdpbjMyOm51bGwscG9zaXg6bnVsbH07bi5wb3NpeD1uLHQuZXhwb3J0cz1ufSw0NDc6KHQsZSxyKT0+e3ZhciBuO2lmKHIucihlKSxyLmQoZSx7VVJJOigpPT5nLFV0aWxzOigpPT5PfSksXCJvYmplY3RcIj09dHlwZW9mIHByb2Nlc3Mpbj1cIndpbjMyXCI9PT1wcm9jZXNzLnBsYXRmb3JtO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIG5hdmlnYXRvcil7dmFyIG89bmF2aWdhdG9yLnVzZXJBZ2VudDtuPW8uaW5kZXhPZihcIldpbmRvd3NcIik+PTB9dmFyIGksYSxoPShpPWZ1bmN0aW9uKHQsZSl7cmV0dXJuKGk9T2JqZWN0LnNldFByb3RvdHlwZU9mfHx7X19wcm90b19fOltdfWluc3RhbmNlb2YgQXJyYXkmJmZ1bmN0aW9uKHQsZSl7dC5fX3Byb3RvX189ZX18fGZ1bmN0aW9uKHQsZSl7Zm9yKHZhciByIGluIGUpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUscikmJih0W3JdPWVbcl0pfSkodCxlKX0sZnVuY3Rpb24odCxlKXtmdW5jdGlvbiByKCl7dGhpcy5jb25zdHJ1Y3Rvcj10fWkodCxlKSx0LnByb3RvdHlwZT1udWxsPT09ZT9PYmplY3QuY3JlYXRlKGUpOihyLnByb3RvdHlwZT1lLnByb3RvdHlwZSxuZXcgcil9KSxzPS9eXFx3W1xcd1xcZCsuLV0qJC8sZj0vXlxcLy8sdT0vXlxcL1xcLy8sYz1cIlwiLGw9XCIvXCIscD0vXigoW146Lz8jXSs/KTopPyhcXC9cXC8oW14vPyNdKikpPyhbXj8jXSopKFxcPyhbXiNdKikpPygjKC4qKSk/LyxnPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LGUscixuLG8saSl7dm9pZCAwPT09aSYmKGk9ITEpLFwib2JqZWN0XCI9PXR5cGVvZiB0Pyh0aGlzLnNjaGVtZT10LnNjaGVtZXx8Yyx0aGlzLmF1dGhvcml0eT10LmF1dGhvcml0eXx8Yyx0aGlzLnBhdGg9dC5wYXRofHxjLHRoaXMucXVlcnk9dC5xdWVyeXx8Yyx0aGlzLmZyYWdtZW50PXQuZnJhZ21lbnR8fGMpOih0aGlzLnNjaGVtZT1mdW5jdGlvbih0LGUpe3JldHVybiB0fHxlP3Q6XCJmaWxlXCJ9KHQsaSksdGhpcy5hdXRob3JpdHk9ZXx8Yyx0aGlzLnBhdGg9ZnVuY3Rpb24odCxlKXtzd2l0Y2godCl7Y2FzZVwiaHR0cHNcIjpjYXNlXCJodHRwXCI6Y2FzZVwiZmlsZVwiOmU/ZVswXSE9PWwmJihlPWwrZSk6ZT1sfXJldHVybiBlfSh0aGlzLnNjaGVtZSxyfHxjKSx0aGlzLnF1ZXJ5PW58fGMsdGhpcy5mcmFnbWVudD1vfHxjLGZ1bmN0aW9uKHQsZSl7aWYoIXQuc2NoZW1lJiZlKXRocm93IG5ldyBFcnJvcignW1VyaUVycm9yXTogU2NoZW1lIGlzIG1pc3Npbmc6IHtzY2hlbWU6IFwiXCIsIGF1dGhvcml0eTogXCInK3QuYXV0aG9yaXR5KydcIiwgcGF0aDogXCInK3QucGF0aCsnXCIsIHF1ZXJ5OiBcIicrdC5xdWVyeSsnXCIsIGZyYWdtZW50OiBcIicrdC5mcmFnbWVudCsnXCJ9Jyk7aWYodC5zY2hlbWUmJiFzLnRlc3QodC5zY2hlbWUpKXRocm93IG5ldyBFcnJvcihcIltVcmlFcnJvcl06IFNjaGVtZSBjb250YWlucyBpbGxlZ2FsIGNoYXJhY3RlcnMuXCIpO2lmKHQucGF0aClpZih0LmF1dGhvcml0eSl7aWYoIWYudGVzdCh0LnBhdGgpKXRocm93IG5ldyBFcnJvcignW1VyaUVycm9yXTogSWYgYSBVUkkgY29udGFpbnMgYW4gYXV0aG9yaXR5IGNvbXBvbmVudCwgdGhlbiB0aGUgcGF0aCBjb21wb25lbnQgbXVzdCBlaXRoZXIgYmUgZW1wdHkgb3IgYmVnaW4gd2l0aCBhIHNsYXNoIChcIi9cIikgY2hhcmFjdGVyJyl9ZWxzZSBpZih1LnRlc3QodC5wYXRoKSl0aHJvdyBuZXcgRXJyb3IoJ1tVcmlFcnJvcl06IElmIGEgVVJJIGRvZXMgbm90IGNvbnRhaW4gYW4gYXV0aG9yaXR5IGNvbXBvbmVudCwgdGhlbiB0aGUgcGF0aCBjYW5ub3QgYmVnaW4gd2l0aCB0d28gc2xhc2ggY2hhcmFjdGVycyAoXCIvL1wiKScpfSh0aGlzLGkpKX1yZXR1cm4gdC5pc1VyaT1mdW5jdGlvbihlKXtyZXR1cm4gZSBpbnN0YW5jZW9mIHR8fCEhZSYmXCJzdHJpbmdcIj09dHlwZW9mIGUuYXV0aG9yaXR5JiZcInN0cmluZ1wiPT10eXBlb2YgZS5mcmFnbWVudCYmXCJzdHJpbmdcIj09dHlwZW9mIGUucGF0aCYmXCJzdHJpbmdcIj09dHlwZW9mIGUucXVlcnkmJlwic3RyaW5nXCI9PXR5cGVvZiBlLnNjaGVtZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5mc1BhdGgmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUud2l0aCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS50b1N0cmluZ30sT2JqZWN0LmRlZmluZVByb3BlcnR5KHQucHJvdG90eXBlLFwiZnNQYXRoXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBDKHRoaXMsITEpfSxlbnVtZXJhYmxlOiExLGNvbmZpZ3VyYWJsZTohMH0pLHQucHJvdG90eXBlLndpdGg9ZnVuY3Rpb24odCl7aWYoIXQpcmV0dXJuIHRoaXM7dmFyIGU9dC5zY2hlbWUscj10LmF1dGhvcml0eSxuPXQucGF0aCxvPXQucXVlcnksaT10LmZyYWdtZW50O3JldHVybiB2b2lkIDA9PT1lP2U9dGhpcy5zY2hlbWU6bnVsbD09PWUmJihlPWMpLHZvaWQgMD09PXI/cj10aGlzLmF1dGhvcml0eTpudWxsPT09ciYmKHI9Yyksdm9pZCAwPT09bj9uPXRoaXMucGF0aDpudWxsPT09biYmKG49Yyksdm9pZCAwPT09bz9vPXRoaXMucXVlcnk6bnVsbD09PW8mJihvPWMpLHZvaWQgMD09PWk/aT10aGlzLmZyYWdtZW50Om51bGw9PT1pJiYoaT1jKSxlPT09dGhpcy5zY2hlbWUmJnI9PT10aGlzLmF1dGhvcml0eSYmbj09PXRoaXMucGF0aCYmbz09PXRoaXMucXVlcnkmJmk9PT10aGlzLmZyYWdtZW50P3RoaXM6bmV3IHYoZSxyLG4sbyxpKX0sdC5wYXJzZT1mdW5jdGlvbih0LGUpe3ZvaWQgMD09PWUmJihlPSExKTt2YXIgcj1wLmV4ZWModCk7cmV0dXJuIHI/bmV3IHYoclsyXXx8Yyx4KHJbNF18fGMpLHgocls1XXx8YykseChyWzddfHxjKSx4KHJbOV18fGMpLGUpOm5ldyB2KGMsYyxjLGMsYyl9LHQuZmlsZT1mdW5jdGlvbih0KXt2YXIgZT1jO2lmKG4mJih0PXQucmVwbGFjZSgvXFxcXC9nLGwpKSx0WzBdPT09bCYmdFsxXT09PWwpe3ZhciByPXQuaW5kZXhPZihsLDIpOy0xPT09cj8oZT10LnN1YnN0cmluZygyKSx0PWwpOihlPXQuc3Vic3RyaW5nKDIsciksdD10LnN1YnN0cmluZyhyKXx8bCl9cmV0dXJuIG5ldyB2KFwiZmlsZVwiLGUsdCxjLGMpfSx0LmZyb209ZnVuY3Rpb24odCl7cmV0dXJuIG5ldyB2KHQuc2NoZW1lLHQuYXV0aG9yaXR5LHQucGF0aCx0LnF1ZXJ5LHQuZnJhZ21lbnQpfSx0LnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbih0KXtyZXR1cm4gdm9pZCAwPT09dCYmKHQ9ITEpLEEodGhpcyx0KX0sdC5wcm90b3R5cGUudG9KU09OPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9LHQucmV2aXZlPWZ1bmN0aW9uKGUpe2lmKGUpe2lmKGUgaW5zdGFuY2VvZiB0KXJldHVybiBlO3ZhciByPW5ldyB2KGUpO3JldHVybiByLl9mb3JtYXR0ZWQ9ZS5leHRlcm5hbCxyLl9mc1BhdGg9ZS5fc2VwPT09ZD9lLmZzUGF0aDpudWxsLHJ9cmV0dXJuIGV9LHR9KCksZD1uPzE6dm9pZCAwLHY9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSgpe3ZhciBlPW51bGwhPT10JiZ0LmFwcGx5KHRoaXMsYXJndW1lbnRzKXx8dGhpcztyZXR1cm4gZS5fZm9ybWF0dGVkPW51bGwsZS5fZnNQYXRoPW51bGwsZX1yZXR1cm4gaChlLHQpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLnByb3RvdHlwZSxcImZzUGF0aFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZnNQYXRofHwodGhpcy5fZnNQYXRoPUModGhpcywhMSkpLHRoaXMuX2ZzUGF0aH0sZW51bWVyYWJsZTohMSxjb25maWd1cmFibGU6ITB9KSxlLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbih0KXtyZXR1cm4gdm9pZCAwPT09dCYmKHQ9ITEpLHQ/QSh0aGlzLCEwKToodGhpcy5fZm9ybWF0dGVkfHwodGhpcy5fZm9ybWF0dGVkPUEodGhpcywhMSkpLHRoaXMuX2Zvcm1hdHRlZCl9LGUucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3ZhciB0PXskbWlkOjF9O3JldHVybiB0aGlzLl9mc1BhdGgmJih0LmZzUGF0aD10aGlzLl9mc1BhdGgsdC5fc2VwPWQpLHRoaXMuX2Zvcm1hdHRlZCYmKHQuZXh0ZXJuYWw9dGhpcy5fZm9ybWF0dGVkKSx0aGlzLnBhdGgmJih0LnBhdGg9dGhpcy5wYXRoKSx0aGlzLnNjaGVtZSYmKHQuc2NoZW1lPXRoaXMuc2NoZW1lKSx0aGlzLmF1dGhvcml0eSYmKHQuYXV0aG9yaXR5PXRoaXMuYXV0aG9yaXR5KSx0aGlzLnF1ZXJ5JiYodC5xdWVyeT10aGlzLnF1ZXJ5KSx0aGlzLmZyYWdtZW50JiYodC5mcmFnbWVudD10aGlzLmZyYWdtZW50KSx0fSxlfShnKSxtPSgoYT17fSlbNThdPVwiJTNBXCIsYVs0N109XCIlMkZcIixhWzYzXT1cIiUzRlwiLGFbMzVdPVwiJTIzXCIsYVs5MV09XCIlNUJcIixhWzkzXT1cIiU1RFwiLGFbNjRdPVwiJTQwXCIsYVszM109XCIlMjFcIixhWzM2XT1cIiUyNFwiLGFbMzhdPVwiJTI2XCIsYVszOV09XCIlMjdcIixhWzQwXT1cIiUyOFwiLGFbNDFdPVwiJTI5XCIsYVs0Ml09XCIlMkFcIixhWzQzXT1cIiUyQlwiLGFbNDRdPVwiJTJDXCIsYVs1OV09XCIlM0JcIixhWzYxXT1cIiUzRFwiLGFbMzJdPVwiJTIwXCIsYSk7ZnVuY3Rpb24geSh0LGUpe2Zvcih2YXIgcj12b2lkIDAsbj0tMSxvPTA7bzx0Lmxlbmd0aDtvKyspe3ZhciBpPXQuY2hhckNvZGVBdChvKTtpZihpPj05NyYmaTw9MTIyfHxpPj02NSYmaTw9OTB8fGk+PTQ4JiZpPD01N3x8NDU9PT1pfHw0Nj09PWl8fDk1PT09aXx8MTI2PT09aXx8ZSYmNDc9PT1pKS0xIT09biYmKHIrPWVuY29kZVVSSUNvbXBvbmVudCh0LnN1YnN0cmluZyhuLG8pKSxuPS0xKSx2b2lkIDAhPT1yJiYocis9dC5jaGFyQXQobykpO2Vsc2V7dm9pZCAwPT09ciYmKHI9dC5zdWJzdHIoMCxvKSk7dmFyIGE9bVtpXTt2b2lkIDAhPT1hPygtMSE9PW4mJihyKz1lbmNvZGVVUklDb21wb25lbnQodC5zdWJzdHJpbmcobixvKSksbj0tMSkscis9YSk6LTE9PT1uJiYobj1vKX19cmV0dXJuLTEhPT1uJiYocis9ZW5jb2RlVVJJQ29tcG9uZW50KHQuc3Vic3RyaW5nKG4pKSksdm9pZCAwIT09cj9yOnR9ZnVuY3Rpb24gYih0KXtmb3IodmFyIGU9dm9pZCAwLHI9MDtyPHQubGVuZ3RoO3IrKyl7dmFyIG49dC5jaGFyQ29kZUF0KHIpOzM1PT09bnx8NjM9PT1uPyh2b2lkIDA9PT1lJiYoZT10LnN1YnN0cigwLHIpKSxlKz1tW25dKTp2b2lkIDAhPT1lJiYoZSs9dFtyXSl9cmV0dXJuIHZvaWQgMCE9PWU/ZTp0fWZ1bmN0aW9uIEModCxlKXt2YXIgcjtyZXR1cm4gcj10LmF1dGhvcml0eSYmdC5wYXRoLmxlbmd0aD4xJiZcImZpbGVcIj09PXQuc2NoZW1lP1wiLy9cIit0LmF1dGhvcml0eSt0LnBhdGg6NDc9PT10LnBhdGguY2hhckNvZGVBdCgwKSYmKHQucGF0aC5jaGFyQ29kZUF0KDEpPj02NSYmdC5wYXRoLmNoYXJDb2RlQXQoMSk8PTkwfHx0LnBhdGguY2hhckNvZGVBdCgxKT49OTcmJnQucGF0aC5jaGFyQ29kZUF0KDEpPD0xMjIpJiY1OD09PXQucGF0aC5jaGFyQ29kZUF0KDIpP2U/dC5wYXRoLnN1YnN0cigxKTp0LnBhdGhbMV0udG9Mb3dlckNhc2UoKSt0LnBhdGguc3Vic3RyKDIpOnQucGF0aCxuJiYocj1yLnJlcGxhY2UoL1xcLy9nLFwiXFxcXFwiKSkscn1mdW5jdGlvbiBBKHQsZSl7dmFyIHI9ZT9iOnksbj1cIlwiLG89dC5zY2hlbWUsaT10LmF1dGhvcml0eSxhPXQucGF0aCxoPXQucXVlcnkscz10LmZyYWdtZW50O2lmKG8mJihuKz1vLG4rPVwiOlwiKSwoaXx8XCJmaWxlXCI9PT1vKSYmKG4rPWwsbis9bCksaSl7dmFyIGY9aS5pbmRleE9mKFwiQFwiKTtpZigtMSE9PWYpe3ZhciB1PWkuc3Vic3RyKDAsZik7aT1pLnN1YnN0cihmKzEpLC0xPT09KGY9dS5pbmRleE9mKFwiOlwiKSk/bis9cih1LCExKToobis9cih1LnN1YnN0cigwLGYpLCExKSxuKz1cIjpcIixuKz1yKHUuc3Vic3RyKGYrMSksITEpKSxuKz1cIkBcIn0tMT09PShmPShpPWkudG9Mb3dlckNhc2UoKSkuaW5kZXhPZihcIjpcIikpP24rPXIoaSwhMSk6KG4rPXIoaS5zdWJzdHIoMCxmKSwhMSksbis9aS5zdWJzdHIoZikpfWlmKGEpe2lmKGEubGVuZ3RoPj0zJiY0Nz09PWEuY2hhckNvZGVBdCgwKSYmNTg9PT1hLmNoYXJDb2RlQXQoMikpKGM9YS5jaGFyQ29kZUF0KDEpKT49NjUmJmM8PTkwJiYoYT1cIi9cIitTdHJpbmcuZnJvbUNoYXJDb2RlKGMrMzIpK1wiOlwiK2Euc3Vic3RyKDMpKTtlbHNlIGlmKGEubGVuZ3RoPj0yJiY1OD09PWEuY2hhckNvZGVBdCgxKSl7dmFyIGM7KGM9YS5jaGFyQ29kZUF0KDApKT49NjUmJmM8PTkwJiYoYT1TdHJpbmcuZnJvbUNoYXJDb2RlKGMrMzIpK1wiOlwiK2Euc3Vic3RyKDIpKX1uKz1yKGEsITApfXJldHVybiBoJiYobis9XCI/XCIsbis9cihoLCExKSkscyYmKG4rPVwiI1wiLG4rPWU/czp5KHMsITEpKSxufWZ1bmN0aW9uIHcodCl7dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQodCl9Y2F0Y2goZSl7cmV0dXJuIHQubGVuZ3RoPjM/dC5zdWJzdHIoMCwzKSt3KHQuc3Vic3RyKDMpKTp0fX12YXIgXz0vKCVbMC05QS1aYS16XVswLTlBLVphLXpdKSsvZztmdW5jdGlvbiB4KHQpe3JldHVybiB0Lm1hdGNoKF8pP3QucmVwbGFjZShfLChmdW5jdGlvbih0KXtyZXR1cm4gdyh0KX0pKTp0fXZhciBPLFA9cig0NzApLGo9ZnVuY3Rpb24oKXtmb3IodmFyIHQ9MCxlPTAscj1hcmd1bWVudHMubGVuZ3RoO2U8cjtlKyspdCs9YXJndW1lbnRzW2VdLmxlbmd0aDt2YXIgbj1BcnJheSh0KSxvPTA7Zm9yKGU9MDtlPHI7ZSsrKWZvcih2YXIgaT1hcmd1bWVudHNbZV0sYT0wLGg9aS5sZW5ndGg7YTxoO2ErKyxvKyspbltvXT1pW2FdO3JldHVybiBufSxVPVAucG9zaXh8fFA7IWZ1bmN0aW9uKHQpe3Quam9pblBhdGg9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPVtdLHI9MTtyPGFyZ3VtZW50cy5sZW5ndGg7cisrKWVbci0xXT1hcmd1bWVudHNbcl07cmV0dXJuIHQud2l0aCh7cGF0aDpVLmpvaW4uYXBwbHkoVSxqKFt0LnBhdGhdLGUpKX0pfSx0LnJlc29sdmVQYXRoPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZT1bXSxyPTE7cjxhcmd1bWVudHMubGVuZ3RoO3IrKyllW3ItMV09YXJndW1lbnRzW3JdO3ZhciBuPXQucGF0aHx8XCIvXCI7cmV0dXJuIHQud2l0aCh7cGF0aDpVLnJlc29sdmUuYXBwbHkoVSxqKFtuXSxlKSl9KX0sdC5kaXJuYW1lPWZ1bmN0aW9uKHQpe3ZhciBlPVUuZGlybmFtZSh0LnBhdGgpO3JldHVybiAxPT09ZS5sZW5ndGgmJjQ2PT09ZS5jaGFyQ29kZUF0KDApP3Q6dC53aXRoKHtwYXRoOmV9KX0sdC5iYXNlbmFtZT1mdW5jdGlvbih0KXtyZXR1cm4gVS5iYXNlbmFtZSh0LnBhdGgpfSx0LmV4dG5hbWU9ZnVuY3Rpb24odCl7cmV0dXJuIFUuZXh0bmFtZSh0LnBhdGgpfX0oT3x8KE89e30pKX19LGU9e307ZnVuY3Rpb24gcihuKXtpZihlW25dKXJldHVybiBlW25dLmV4cG9ydHM7dmFyIG89ZVtuXT17ZXhwb3J0czp7fX07cmV0dXJuIHRbbl0obyxvLmV4cG9ydHMsciksby5leHBvcnRzfXJldHVybiByLmQ9KHQsZSk9Pntmb3IodmFyIG4gaW4gZSlyLm8oZSxuKSYmIXIubyh0LG4pJiZPYmplY3QuZGVmaW5lUHJvcGVydHkodCxuLHtlbnVtZXJhYmxlOiEwLGdldDplW25dfSl9LHIubz0odCxlKT0+T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsZSksci5yPXQ9PntcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSxyKDQ0Nyl9KSgpO2V4cG9ydCBjb25zdHtVUkksVXRpbHN9PUxJQjtcbiJdLCJzb3VyY2VSb290IjoiIn0=
