webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Cover */\n.cover-container {\n  max-width: 42em;\n}\n.cover {\n  padding: 0 1.5rem;\n}\n.cover .btn-lg {\n  padding: .75rem 1.25rem;\n  font-weight: 700;\n}\n/* Footer */\n.mastfoot {\n  color: rgba(255, 255, 255, .5);\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"cover-container d-flex h-100 p-3 mx-auto flex-column text-center\">\n  <header [title]=\"title\"></header>\n  <main role=\"main\" class=\"inner cover\">\n    <app-transliterate></app-transliterate>\n  </main>\n  <footer class=\"mastfoot mt-auto\">\n    <div class=\"inner\">\n      <p>Cover template for <a href=\"https://getbootstrap.com/\">Bootstrap</a>.</p>\n    </div>\n  </footer>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'merlek.github.io';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transliterate_transliterate_component__ = __webpack_require__("../../../../../src/app/transliterate/transliterate.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__letter_service__ = __webpack_require__("../../../../../src/app/letter.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__transliterator_service__ = __webpack_require__("../../../../../src/app/transliterator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__transliterate_transliterate_component__["a" /* TransliterateComponent */],
                __WEBPACK_IMPORTED_MODULE_6__header_header_component__["a" /* HeaderComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_8__transliterator_service__["a" /* TransliteratorService */], __WEBPACK_IMPORTED_MODULE_7__letter_service__["a" /* LetterService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Header */\n.masthead {\n  margin-bottom: 2rem;\n}\n.masthead-brand {\n  margin-bottom: 0;\n  margin-right: 2rem;\n}\n.nav-masthead .nav-link {\n  padding: .25rem 0;\n  font-weight: 700;\n  color: rgba(255, 255, 255, .5);\n  background-color: transparent;\n  border-bottom: .25rem solid transparent;\n}\n.nav-masthead .nav-link:hover,\n.nav-masthead .nav-link:focus {\n  border-bottom-color: rgba(255, 255, 255, .25);\n}\n.nav-masthead .nav-link + .nav-link {\n  margin-left: 1rem;\n}\n.nav-masthead .active {\n  color: #fff;\n  border-bottom-color: #fff;\n}\n@media (min-width: 48em) {\n  .masthead-brand {\n    float: left;\n  }\n  .nav-masthead {\n    float: right;\n  }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"inner\">\n\t<h4 class=\"masthead-brand\">{{title}}</h4>\n\t<nav class=\"nav nav-masthead justify-content-center\">\n\t\t<a class=\"nav-link active\" href=\"#\">Home</a>\n\t\t<a class=\"nav-link\" href=\"#\">Contact</a>\n\t</nav>\n</div>"

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(),
        __metadata("design:type", String)
    ], HeaderComponent.prototype, "title", void 0);
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'header',
            template: __webpack_require__("../../../../../src/app/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/header/header.component.css")],
            host: { 'class': 'masthead mb-auto' }
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/letter.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LetterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__letters__ = __webpack_require__("../../../../../src/app/letters.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LetterService = /** @class */ (function () {
    function LetterService() {
    }
    LetterService.prototype.parse = function (allowEnglish, hebrew, endWord) {
        for (var prop in __WEBPACK_IMPORTED_MODULE_1__letters__["a" /* LETTERS */]) {
            var letterValue = __WEBPACK_IMPORTED_MODULE_1__letters__["a" /* LETTERS */][prop];
            if (hebrew === letterValue.hebrew) {
                if (!letterValue.endVowel || letterValue.endVowel && endWord) {
                    return letterValue;
                }
                else {
                    break;
                }
            }
        }
        if (allowEnglish) {
            return new __WEBPACK_IMPORTED_MODULE_1__letters__["b" /* Letter */]({
                name: hebrew,
                hebrew: hebrew,
                transliteration: hebrew
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1__letters__["a" /* LETTERS */].NULL;
        }
    };
    LetterService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], LetterService);
    return LetterService;
}());



/***/ }),

/***/ "../../../../../src/app/letters.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Letter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LETTERS; });
var Letter = /** @class */ (function () {
    function Letter(spec) {
        this.name = spec.name;
        this.hebrew = spec.hebrew;
        this.transliteration = spec.transliteration || null;
        this.endVowel = spec.endVowel || false;
        this.vowelType = spec.vowelType || null;
    }
    Letter.prototype.isSymbol = function () {
        return this.name == "ShewaSilent"
            || this.name == "Accent"
            || this.name == "Meteg"
            || this.name == "Maqqef"
            || this.name == "Dagesh"
            || this.name == "ShinDot"
            || this.name == "SinDot"
            || this.name == "SyllableMarker";
    };
    Letter.prototype.isConstonant = function () {
        return !this.isSymbol() && this.vowelType == null && !this.endVowel;
    };
    Letter.prototype.isVowel = function () {
        return !this.isSymbol() && (this.vowelType != null || this.endVowel);
    };
    return Letter;
}());

var LETTERS = {
    Alef: new Letter({ name: "Alef", hebrew: "א", transliteration: "ʾ" }),
    BetDagesh: new Letter({ name: "BetDagesh", hebrew: "בּ", transliteration: "b" }),
    BetDagesh2: new Letter({ name: "BetDagesh", hebrew: "בּ", transliteration: "b" }),
    Bet: new Letter({ name: "Bet", hebrew: "ב", transliteration: "ḇ" }),
    GimelDagesh: new Letter({ name: "GimelDagesh", hebrew: "גּ", transliteration: "g" }),
    Gimel: new Letter({ name: "Gimel", hebrew: "ג", transliteration: "ḡ" }),
    DaletDagesh: new Letter({ name: "DaletDagesh", hebrew: "דּ", transliteration: "d" }),
    Dalet: new Letter({ name: "Dalet", hebrew: "ד", transliteration: "ḏ" }),
    He: new Letter({ name: "He", hebrew: "ה", transliteration: "h" }),
    HeMappiq: new Letter({ name: "HeMappiq", hebrew: "הּ", transliteration: "h" }),
    Waw: new Letter({ name: "Waw", hebrew: "ו", transliteration: "w" }),
    Zayin: new Letter({ name: "Zayin", hebrew: "ז", transliteration: "z" }),
    Ḥet: new Letter({ name: "Ḥet", hebrew: "ח", transliteration: "ḥ" }),
    Tet: new Letter({ name: "Tet", hebrew: "ט", transliteration: "ṭ" }),
    Yod: new Letter({ name: "Yod", hebrew: "י", transliteration: "y" }),
    KafDagesh: new Letter({ name: "KafDagesh", hebrew: "כּ", transliteration: "k" }),
    Kaf: new Letter({ name: "Kaf", hebrew: "כ", transliteration: "ḵ" }),
    KafFinal: new Letter({ name: "KafFinal", hebrew: "ך", transliteration: "ḵ" }),
    Lamed: new Letter({ name: "Lamed", hebrew: "ל", transliteration: "l" }),
    Mem: new Letter({ name: "Mem", hebrew: "מ", transliteration: "m" }),
    MemFinal: new Letter({ name: "MemFinal", hebrew: "ם", transliteration: "m" }),
    Nun: new Letter({ name: "Nun", hebrew: "נ", transliteration: "n" }),
    NunFinal: new Letter({ name: "NunFinal", hebrew: "ן", transliteration: "n" }),
    Samek: new Letter({ name: "Samek", hebrew: "ס", transliteration: "s" }),
    Ayin: new Letter({ name: "Ayin", hebrew: "ע", transliteration: "ʿ" }),
    PeDagesh: new Letter({ name: "PeDagesh", hebrew: "פּ", transliteration: "p" }),
    Pe: new Letter({ name: "Pe", hebrew: "פ", transliteration: "p̄" }),
    PeFinal: new Letter({ name: "PeFinal", hebrew: "ף", transliteration: "p̄" }),
    Tsade: new Letter({ name: "Tsade", hebrew: "צ", transliteration: "ṣ" }),
    TsadeFinal: new Letter({ name: "TsadeFinal", hebrew: "ץ", transliteration: "ṣ" }),
    Qof: new Letter({ name: "Qof", hebrew: "ק", transliteration: "q" }),
    Resh: new Letter({ name: "Resh", hebrew: "ר", transliteration: "r" }),
    ShinDotless: new Letter({ name: "ShinDotless", hebrew: "ש" }),
    Sin: new Letter({ name: "Sin", hebrew: "שׂ", transliteration: "ś" }),
    Sin2: new Letter({ name: "Sin2", hebrew: "שׂ", transliteration: "ś" }),
    Shin: new Letter({ name: "Shin", hebrew: "שׁ", transliteration: "š" }),
    Shin2: new Letter({ name: "Shin2", hebrew: "שׁ", transliteration: "š" }),
    TawDagesh: new Letter({ name: "TawDagesh", hebrew: "תּ", transliteration: "t" }),
    TawDagesh2: new Letter({ name: "TawDagesh", hebrew: "תּ", transliteration: "t" }),
    Taw: new Letter({ name: "Taw", hebrew: "ת", transliteration: "ṯ" }),
    // === Vowels ===
    Qamets: new Letter({ name: "Qamets", hebrew: "ָ", transliteration: "ā", vowelType: "long" }),
    QametsHe: new Letter({ name: "QametsHe", hebrew: "ָה", transliteration: "â", endVowel: true }),
    Pathach: new Letter({ name: "Pathach", hebrew: "ַ", transliteration: "a", vowelType: "short" }),
    HatephPathach: new Letter({ name: "HatephPathach", hebrew: "ֲ", transliteration: "ǎ", vowelType: "reduced" }),
    Tsere: new Letter({ name: "Tsere", hebrew: "ֵ", transliteration: "ē", vowelType: "long" }),
    TsereHe: new Letter({ name: "TsereHe", hebrew: "ֵה", transliteration: "ê", endVowel: true }),
    TsereYod: new Letter({ name: "TsereYod", hebrew: "ֵי", transliteration: "ê", vowelType: "long" }),
    Seghol: new Letter({ name: "Seghol", hebrew: "ֶ", transliteration: "e", vowelType: "short" }),
    HatephSeghol: new Letter({ name: "HatephSeghol", hebrew: "ֱ", transliteration: "ě", vowelType: "reduced" }),
    SegholHe: new Letter({ name: "SegholHe", hebrew: "ֶה", transliteration: "ê", endVowel: true }),
    SegholYod: new Letter({ name: "SegholYod", hebrew: "ֶי", transliteration: "ê", vowelType: "long" }),
    Hireq: new Letter({ name: "Hireq", hebrew: "ִ", transliteration: "i", vowelType: "short" }),
    HireqYod: new Letter({ name: "HireqYod", hebrew: "ִי", transliteration: "î", vowelType: "short" }),
    Holem: new Letter({ name: "Holem", hebrew: "ֹ", transliteration: "ō", vowelType: "long" }),
    QametsHatuf: new Letter({ name: "QametsHatuf", hebrew: "ָ", transliteration: "o", vowelType: "short" }),
    HatephQamets: new Letter({ name: "HatephQamets", hebrew: "ֳ", transliteration: "ŏ", vowelType: "reduced" }),
    HolemHe: new Letter({ name: "HolemHe", hebrew: "ֹה", transliteration: "ô", endVowel: true }),
    HolemWaw: new Letter({ name: "HolemWaw", hebrew: "וֹ", transliteration: "ô", vowelType: "long" }),
    Qibbuts: new Letter({ name: "Qibbuts", hebrew: "ֻ", transliteration: "u", vowelType: "short" }),
    Shureq: new Letter({ name: "Shureq", hebrew: "וּ", transliteration: "û", vowelType: "short" }),
    // === Punctuation / Misc. ===
    Shewa: new Letter({ name: "Shewa", hebrew: "ְ", transliteration: "ə", vowelType: "reduced" }),
    ShewaSilent: new Letter({ name: "ShewaSilent", hebrew: "ְ", transliteration: "" }),
    Accent: new Letter({ name: "Accent", hebrew: "֫", transliteration: "" }),
    Meteg: new Letter({ name: "Meteg", hebrew: "ֽ", transliteration: "" }),
    Maqqef: new Letter({ name: "Maqqef", hebrew: "־", transliteration: "-" }),
    Dagesh: new Letter({ name: "Dagesh", hebrew: "ּ" }),
    ShinDot: new Letter({ name: "ShinDot", hebrew: "ׁ" }),
    SinDot: new Letter({ name: "SinDot", hebrew: "ׂ" }),
    SyllableMarker: new Letter({ name: "SyllableMarker", hebrew: "", transliteration: "-" }),
    NULL: new Letter({ name: "NULL" })
};


/***/ }),

/***/ "../../../../../src/app/transliterate/transliterate.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "textarea {\n\tfont-family: Cardo,Serif; font-size: 2em;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/transliterate/transliterate.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"container\"> -->\n\t<div class=\"row justify-content-md-center\">\n\t\t<h1>{{title}}</h1>\n\t</div>\n\t<div class=\"row\">{{info}}</div>\n\t<div class=\"row\">\n\t\t<div class=\"form-check\">\n\t\t\t<label class=\"form-check-label\">\n\t\t\t\t<input id=\"syllabify-checkbox\" class=\"form-check-input\" type=\"checkbox\" value=\"true\">\n\t\t\t\tSyllabify (experimental)\n\t\t\t</label>\n\t\t</div>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"input-group input-group\">\n\t\t\t<textarea #hebrewInput class=\"form-control\" id=\"hebrew-input\" rows=\"4\" placeholder=\"Hebrew\" dir=\"rtl\" (keyup)=\"update(hebrewInput.value)\" ></textarea>\n\t\t\t<!-- <button id=\"transliterate-btn\" type=\"submit\" class=\"btn btn-primary\">Submit</button> -->\n\t\t</div>\n\t\t<div class=\"input-group input-group\">\n\t\t\t<textarea [(ngModel)]=\"transliteratedText\" class=\"form-control\" id=\"transliterated\" rows=\"4\" placeholder=\"Transliteration\" readonly></textarea>\n\t\t</div>\n\t</div>\n<!-- </div> -->"

/***/ }),

/***/ "../../../../../src/app/transliterate/transliterate.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransliterateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transliterator_service__ = __webpack_require__("../../../../../src/app/transliterator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TransliterateComponent = /** @class */ (function () {
    function TransliterateComponent(translitService) {
        this.translitService = translitService;
        this.title = "Hebrew Transliterator";
        this.info = "Note: cannot identify Qamets Hatuf (e.g. ḥoḵmâ not ḥāḵəmâ).";
        this.hebrewText = "";
        this.transliteratedText = "";
    }
    TransliterateComponent.prototype.ngOnInit = function () { };
    TransliterateComponent.prototype.update = function (hebrew) {
        this.transliteratedText =
            this.translitService.transliterateWord(hebrew);
    };
    TransliterateComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-transliterate',
            template: __webpack_require__("../../../../../src/app/transliterate/transliterate.component.html"),
            styles: [__webpack_require__("../../../../../src/app/transliterate/transliterate.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__transliterator_service__["a" /* TransliteratorService */]])
    ], TransliterateComponent);
    return TransliterateComponent;
}());



/***/ }),

/***/ "../../../../../src/app/transliterator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransliteratorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__letter_service__ = __webpack_require__("../../../../../src/app/letter.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__letters__ = __webpack_require__("../../../../../src/app/letters.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TransliteratorService = /** @class */ (function () {
    function TransliteratorService(letterService) {
        this.letterService = letterService;
        this.DEBUG = false;
        this.SYLLABIFY = false;
    }
    TransliteratorService.prototype.transliterateList = function (words) {
        var transliteratedTerms = [];
        for (var i in words) {
            var word = words[i];
            var tWord = this.transliterateWord(word);
            transliteratedTerms.push(tWord);
        }
        for (var j in transliteratedTerms) {
            if (this.DEBUG)
                console.log(transliteratedTerms[j]);
        }
        return transliteratedTerms;
    };
    TransliteratorService.prototype.transliterateWord = function (hebrewWord) {
        if (this.DEBUG)
            console.log("transliterateWord: " + hebrewWord);
        var list = [];
        for (var i = 0; i < hebrewWord.length; i++) {
            list.push(this.letterService.parse(true, hebrewWord[i]));
        }
        if (this.DEBUG)
            console.log(list);
        list = this.reorder(list);
        list = this.simplify(list);
        list = this.simplify2(list);
        list = this.syllabify(list);
        return this.transliterate(list);
    };
    TransliteratorService.prototype.reorder = function (list) {
        if (this.DEBUG) {
            console.log("==REORDER==");
            console.log(this.textList(list));
        }
        var newList = [];
        var last = list[0];
        for (var i = 1; i < list.length; i++) {
            if (this.DEBUG) {
                console.log(i + ") newList: " + this.textList(newList));
            }
            var letter = list[i];
            if (this.DEBUG) {
                console.log("last: " + last.name);
                console.log("letter-" + i + ": " + letter.name);
            }
            if ((letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].SinDot || letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].ShinDot)
                && last != __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].ShinDotless) {
                var t = letter;
                letter = last;
                last = t;
            }
            if (letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].ShinDot && last != __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].ShinDotless) {
                letter = last;
                last = __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].SinDot;
            }
            if (letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Dagesh && last.isVowel()) {
                letter = last;
                last = __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Dagesh;
            }
            newList.push(last);
            last = letter;
        }
        newList.push(last);
        return newList;
    };
    TransliteratorService.prototype.simplify = function (list) {
        if (this.DEBUG) {
            console.log("==SIMPLIFY==");
            console.log(this.textList(list));
        }
        var newList = [];
        var last = list[0];
        for (var i = 1; i < list.length; i++) {
            if (this.DEBUG) {
                console.log(i + ") newList: " + this.textList(newList));
            }
            var letter = list[i];
            if (this.DEBUG) {
                console.log("last: " + last.name);
                console.log("letter-" + i + ": " + letter.name);
            }
            var combo = last.hebrew + letter.hebrew;
            var newLetter = this.letterService.parse(false, combo, i >= list.length - 1);
            if (this.DEBUG)
                console.log("newLetter: " + newLetter.name);
            if (newLetter != __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].NULL) {
                if (newLetter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].HolemWaw && newList.length > 1 && newList[newList.length - 1] == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Shewa) {
                    newList.push(last);
                    last = letter;
                }
                else {
                    last = newLetter;
                }
            }
            else {
                newList.push(last);
                last = letter;
            }
        }
        newList.push(last);
        return newList;
    };
    TransliteratorService.prototype.simplify2 = function (list) {
        if (this.DEBUG) {
            console.log("==SIMPLIFY2==");
            console.log(this.textList(list));
        }
        var newList = [];
        for (var i = 0; i < list.length; i++) {
            if (this.DEBUG) {
                console.log(i + ") newList: " + this.textList(newList));
            }
            var letter = list[i];
            if (this.DEBUG)
                console.log("letter-" + i + ": " + letter.name);
            if (letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Shewa &&
                (newList.length > 2 && "short" == (newList[newList.length - 2].vowelType)
                    || (i >= list.length - 1 && newList.length > 1))) {
                // check for Silent Shewa
                letter = __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].ShewaSilent;
            }
            else if (letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Dagesh) {
                // Dagesh Forte
                letter = newList[newList.length - 1];
                if (letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Alef || letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Ayin || letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].He || letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Ḥet) {
                    // guttural rejects
                    letter = __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].NULL;
                }
            }
            else if ((letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].BetDagesh || letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].GimelDagesh || letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].DaletDagesh
                || letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].KafDagesh || letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].PeDagesh || letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].TawDagesh)
                && newList.length > 1 && newList[newList.length - 1].isVowel()
                && newList[newList.length - 1] != __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Shewa) {
                // Dagesh Forte
                newList.push(letter);
            }
            if (i >= list.length - 1 && letter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Pathach) {
                // check for Furtive Pathach
                var previousLetter = newList[newList.length - 1];
                if (previousLetter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Ḥet || previousLetter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].Ayin || previousLetter == __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].HeMappiq) {
                    // Furtive Pathach !
                    newList.pop();
                    newList.push(letter, previousLetter);
                    letter = __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].NULL;
                }
            }
            if (letter && letter != __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].NULL && letter.transliteration)
                newList.push(letter);
        }
        return newList;
    };
    TransliteratorService.prototype.syllabify = function (list) {
        if (this.DEBUG) {
            console.log("==SYLLABIFY==");
            console.log(this.textList(list));
        }
        var newList = [];
        for (var i = 0; i < list.length; i++) {
            if (this.DEBUG) {
                console.log(i + ") newList: " + this.textList(newList));
            }
            var letter = list[i];
            if (this.DEBUG)
                console.log("letter-" + i + ": " + letter.name);
            if (letter.isConstonant() && newList.length > 0 && i < list.length - 1) {
                var next = list[++i];
                if (this.DEBUG)
                    console.log("next-" + i + ": " + next.name);
                if (next.isConstonant()) {
                    if (i < list.length - 1) {
                        newList.push(letter);
                        newList.push(__WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].SyllableMarker);
                        newList.push(next);
                    }
                    else {
                        newList.push(letter);
                        newList.push(next);
                    }
                }
                else {
                    newList.push(__WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].SyllableMarker);
                    newList.push(letter);
                    newList.push(next);
                }
            }
            else {
                newList.push(letter);
            }
        }
        return newList;
    };
    TransliteratorService.prototype.transliterate = function (list) {
        if (this.DEBUG)
            console.log("SYLLABIFY=" + this.SYLLABIFY);
        var word = "";
        for (var i = 0; i < list.length; i++) {
            var letter = list[i];
            if (this.SYLLABIFY || letter != __WEBPACK_IMPORTED_MODULE_2__letters__["a" /* LETTERS */].SyllableMarker) {
                if (this.DEBUG)
                    console.log(letter.name + " -> \"" + letter.transliteration + "\"");
                word += letter.transliteration;
            }
        }
        return word;
    };
    TransliteratorService.prototype.textList = function (list) {
        return list.map(function (l) { return l ? l.name : ''; }).join(", ");
    };
    TransliteratorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__letter_service__["a" /* LetterService */]])
    ], TransliteratorService);
    return TransliteratorService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map