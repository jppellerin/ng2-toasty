System.registerDynamic("src/toasty.container", ["@angular/core", "@angular/common", "./toasty.utils", "./toasty.config", "./toasty.service", "./toasty.component"], true, function ($__require, exports, module) {
    // Copyright (C) 2016 Sergey Akopkokhyants
    // This project is licensed under the terms of the MIT license.
    // https://github.com/akserg/ng2-toasty
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var common_1 = $__require("@angular/common");
    var toasty_utils_1 = $__require("./toasty.utils");
    var toasty_config_1 = $__require("./toasty.config");
    var toasty_service_1 = $__require("./toasty.service");
    var toasty_component_1 = $__require("./toasty.component");
    /**
     * Toasty is container for Toast components
     */
    var Toasty = function () {
        function Toasty(config, toastyService) {
            this.config = config;
            this.toastyService = toastyService;
            // The storage for toasts.
            this.toasts = [];
        }
        /**
         * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
         * first time, and before any of its children have been checked. It is invoked only once when the
         * directive is instantiated.
         */
        Toasty.prototype.ngOnInit = function () {
            var _this = this;
            // We listen our service to recieve new toasts from it
            this.toastyService.getToasts().subscribe(function (toast) {
                // If we've gone over our limit, remove the earliest
                // one from the array
                if (_this.toasts.length >= _this.config.limit) {
                    _this.toasts.shift();
                }
                // Add toasty to array
                _this.toasts.push(toast);
                //
                // If there's a timeout individually or globally,
                // set the toast to timeout
                if (toast.timeout) {
                    _this._setTimeout(toast);
                }
            });
            // We listen clear all comes from service here.
            this.toastyService.getClear().subscribe(function (id) {
                if (id) {
                    _this.clear(id);
                }
                // Lets clear all toasts
                _this.clearAll();
            });
            if (this.position) {
                var notFound = true;
                for (var i = 0; i < Toasty.POSITIONS.length; i++) {
                    if (Toasty.POSITIONS[i] === this.position) {
                        notFound = false;
                        break;
                    }
                }
                if (notFound) {
                    // Position was wrong - clear it here to use the one from config.
                    this.position = this.config.position;
                }
            } else {
                this.position = this.config.position;
            }
            this.position = 'toasty-position-' + this.position;
        };
        /**
         * Event listener of 'closeToast' event comes from ToastyComponent.
         * This method removes ToastComponent assosiated with this Toast.
         */
        Toasty.prototype.closeToast = function (toast) {
            this.clear(toast.id);
        };
        /**
         * Clear individual toast by id
         * @param id is unique identifier of Toast
         */
        Toasty.prototype.clear = function (id) {
            var _this = this;
            if (id) {
                this.toasts.forEach(function (value, key) {
                    if (value.id === id) {
                        if (value.onRemove && toasty_utils_1.isFunction(value.onRemove)) {
                            value.onRemove.call(_this, value);
                        }
                        _this.toasts.splice(key, 1);
                    }
                });
            } else {
                throw new Error('Please provide id of Toast to close');
            }
        };
        /**
         * Clear all toasts
         */
        Toasty.prototype.clearAll = function () {
            var _this = this;
            this.toasts.forEach(function (value, key) {
                if (value.onRemove && toasty_utils_1.isFunction(value.onRemove)) {
                    value.onRemove.call(_this, value);
                }
            });
            this.toasts = [];
        };
        /**
         * Custom setTimeout function for specific setTimeouts on individual toasts.
         */
        Toasty.prototype._setTimeout = function (toast) {
            var _this = this;
            window.setTimeout(function () {
                _this.clear(toast.id);
            }, toast.timeout);
        };
        /**
         * Set of constants defins position of Toasty on the page.
         */
        Toasty.POSITIONS = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center'];
        __decorate([core_1.Input(), __metadata('design:type', String)], Toasty.prototype, "position", void 0);
        Toasty = __decorate([core_1.Component({
            selector: 'ng2-toasty',
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [common_1.CORE_DIRECTIVES, toasty_component_1.Toast],
            template: "\n    <div id=\"toasty\" [ngClass]=\"[position]\">\n        <ng2-toast *ngFor=\"let toast of toasts\" [toast]=\"toast\" (closeToast)=\"closeToast(toast)\"></ng2-toast>\n    </div>"
        }), __metadata('design:paramtypes', [toasty_config_1.ToastyConfig, toasty_service_1.ToastyService])], Toasty);
        return Toasty;
    }();
    exports.Toasty = Toasty;
    

    return module.exports;
});
System.registerDynamic("src/toasty.component", ["@angular/core", "@angular/common"], true, function ($__require, exports, module) {
    // Copyright (C) 2016 Sergey Akopkokhyants
    // This project is licensed under the terms of the MIT license.
    // https://github.com/akserg/ng2-toasty
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var common_1 = $__require("@angular/common");
    /**
     * A Toast component shows message with title and close button.
     */
    var Toast = function () {
        function Toast() {
            this.closeToastEvent = new core_1.EventEmitter();
        }
        /**
         * Event handler invokes when user clicks on close button.
         * This method emit new event into ToastyContainer to close it.
         */
        Toast.prototype.close = function ($event) {
            $event.preventDefault();
            this.closeToastEvent.next(this.toast);
        };
        __decorate([core_1.Input(), __metadata('design:type', Object)], Toast.prototype, "toast", void 0);
        __decorate([core_1.Output('closeToast'), __metadata('design:type', Object)], Toast.prototype, "closeToastEvent", void 0);
        Toast = __decorate([core_1.Component({
            selector: 'ng2-toast',
            directives: [common_1.CORE_DIRECTIVES],
            template: "\n        <div class=\"toast\" [ngClass]=\"[toast.type, toast.theme]\">\n            <div *ngIf=\"toast.showClose\" class=\"close-button\" (click)=\"close($event)\"></div>\n            <div *ngIf=\"toast.title || toast.msg\" class=\"toast-text\">\n                <span *ngIf=\"toast.title\" class=\"toast-title\">{{toast.title}}</span>\n                <br *ngIf=\"toast.title && toast.msg\" />\n                <span *ngIf=\"toast.msg\" class=\"toast-msg\">{{toast.msg}}</span>\n            </div>\n        </div>"
        }), __metadata('design:paramtypes', [])], Toast);
        return Toast;
    }();
    exports.Toast = Toast;
    

    return module.exports;
});
System.registerDynamic("src/toasty.config", ["@angular/core"], true, function ($__require, exports, module) {
    // Copyright (C) 2016 Sergey Akopkokhyants
    // This project is licensed under the terms of the MIT license.
    // https://github.com/akserg/ng2-toasty
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    /**
     * Default configuration foa all toats and toasty container
     */
    var ToastyConfig = function () {
        function ToastyConfig() {
            // Maximum number of toasties to show at once
            this.limit = 5;
            // Whether to show the 'X' icon to close the toast
            this.showClose = true;
            // The window position where the toast pops up. Possible values
            // bottom-right, bottom-left, top-right, top-left, top-center, bottom-center
            this.position = 'bottom-right';
            // How long (in miliseconds) the toasty shows before it's removed. Set to false to disable.
            this.timeout = 5000;
            // What theme to use. Possible values:
            // default, material or bootstrap
            this.theme = 'default';
        }
        ToastyConfig = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], ToastyConfig);
        return ToastyConfig;
    }();
    exports.ToastyConfig = ToastyConfig;
    

    return module.exports;
});
System.registerDynamic("src/toasty.service", ["@angular/core", "./toasty.utils", "rxjs/Observable", "./toasty.config"], true, function ($__require, exports, module) {
    // Copyright (C) 2016 Sergey Akopkokhyants
    // This project is licensed under the terms of the MIT license.
    // https://github.com/akserg/ng2-toasty
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var toasty_utils_1 = $__require("./toasty.utils");
    var Observable_1 = $__require("rxjs/Observable");
    var toasty_config_1 = $__require("./toasty.config");
    /**
     * Toasty service helps create different kinds of Toasts
     */
    var ToastyService = function () {
        function ToastyService(config) {
            var _this = this;
            this.config = config;
            // Init the counter
            this.uniqueCounter = 0;
            this.toastsObservable = new Observable_1.Observable(function (subscriber) {
                _this.toastsSubscriber = subscriber;
            });
            this.clearObservable = new Observable_1.Observable(function (subscriber) {
                _this.clearSubscriber = subscriber;
            });
        }
        /**
         * Get list of toats
         */
        ToastyService.prototype.getToasts = function () {
            return this.toastsObservable;
        };
        ToastyService.prototype.getClear = function () {
            return this.clearObservable;
        };
        /**
         * Create Toast of a default type
         */
        ToastyService.prototype.default = function (options) {
            this.add(options, 'default');
        };
        /**
         * Create Toast of default type
         * @param  {object} options Individual toasty config overrides
         */
        ToastyService.prototype.info = function (options) {
            this.add(options, 'info');
        };
        /**
         * Create Toast of success type
         * @param  {object} options Individual toasty config overrides
         */
        ToastyService.prototype.success = function (options) {
            this.add(options, 'success');
        };
        /**
         * Create Toast of wait type
         * @param  {object} options Individual toasty config overrides
         */
        ToastyService.prototype.wait = function (options) {
            this.add(options, 'wait');
        };
        /**
         * Create Toast of error type
         * @param  {object} options Individual toasty config overrides
         */
        ToastyService.prototype.error = function (options) {
            this.add(options, 'error');
        };
        /**
         * Create Toast of warning type
         * @param  {object} options Individual toasty config overrides
         */
        ToastyService.prototype.warning = function (options) {
            this.add(options, 'warning');
        };
        // Add a new toast item
        ToastyService.prototype.add = function (options, type) {
            var toastyOptions;
            if (toasty_utils_1.isString(options) && options !== '' || toasty_utils_1.isNumber(options)) {
                toastyOptions = {
                    title: options.toString()
                };
            } else {
                toastyOptions = options;
            }
            if (!toastyOptions || !toastyOptions.title && !toastyOptions.msg) {
                throw new Error('ng2-toasty: No toast title or message specified!');
            }
            type = type || 'default';
            // Set a unique counter for an id
            this.uniqueCounter++;
            // Set the local vs global config items
            var showClose = this._checkConfigItem(this.config, toastyOptions, 'showClose');
            // If we have a theme set, make sure it's a valid one
            var theme;
            if (toastyOptions.theme) {
                theme = ToastyService.THEMES.indexOf(toastyOptions.theme) > -1 ? toastyOptions.theme : this.config.theme;
            } else {
                theme = this.config.theme;
            }
            var toast = {
                id: this.uniqueCounter,
                title: toastyOptions.title,
                msg: toastyOptions.msg,
                showClose: showClose,
                type: 'toasty-type-' + type,
                theme: 'toasty-theme-' + theme,
                onAdd: toastyOptions.onAdd && toasty_utils_1.isFunction(toastyOptions.onAdd) ? toastyOptions.onAdd : null,
                onRemove: toastyOptions.onRemove && toasty_utils_1.isFunction(toastyOptions.onRemove) ? toastyOptions.onRemove : null
            };
            // If there's a timeout individually or globally, set the toast to timeout
            // Allows a caller to pass null/0 and override the default. Can also set the default to null/0 to turn off.
            toast.timeout = toastyOptions.hasOwnProperty('timeout') ? toastyOptions.timeout : this.config.timeout;
            // Push up a new toast item
            try {
                this.toastsSubscriber.next(toast);
                // If we have a onAdd function, call it here
                if (toastyOptions.onAdd && toasty_utils_1.isFunction(toastyOptions.onAdd)) {
                    toastyOptions.onAdd.call(this, toast);
                }
            } catch (e) {
                console.log(e);
                console.log('!!! Suggestion: Seems you forget add <ng2-toasty></ng2-toasty> into your html?');
            }
        };
        // Clear all toasts
        ToastyService.prototype.clearAll = function () {
            this.clearSubscriber.next(null);
        };
        // Clear the specific one
        ToastyService.prototype.clear = function (id) {
            this.clearSubscriber.next(id);
        };
        // Checks whether the local option is set, if not,
        // checks the global config
        ToastyService.prototype._checkConfigItem = function (config, options, property) {
            if (options[property] === false) {
                return false;
            } else if (!options[property]) {
                return config[property];
            } else {
                return true;
            }
        };
        // Allowed THEMES
        ToastyService.THEMES = ['default', 'material', 'bootstrap'];
        ToastyService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [toasty_config_1.ToastyConfig])], ToastyService);
        return ToastyService;
    }();
    exports.ToastyService = ToastyService;
    

    return module.exports;
});
System.registerDynamic("src/toasty.utils", [], true, function ($__require, exports, module) {
  "use strict";
  /**
   * Check and return true if an object is type of string
   */

  var define,
      global = this || self,
      GLOBAL = global;
  function isString(obj) {
    return typeof obj === "string";
  }
  exports.isString = isString;
  /**
   * Check and return true if an object is type of number
   */
  function isNumber(obj) {
    return typeof obj === "number";
  }
  exports.isNumber = isNumber;
  /**
   * Check and return true if an object is type of Function
   */
  function isFunction(obj) {
    return typeof obj === "function";
  }
  exports.isFunction = isFunction;
  

  return module.exports;
});
System.registerDynamic('ng2-toasty', ['./src/toasty.container', './src/toasty.component', './src/toasty.config', './src/toasty.service', './src/toasty.utils'], true, function ($__require, exports, module) {
    // Copyright (C) 2016 Sergey Akopkokhyants
    // This project is licensed under the terms of the MIT license.
    // https://github.com/akserg/ng2-toasty
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    var toasty_container_1 = $__require('./src/toasty.container');
    var toasty_component_1 = $__require('./src/toasty.component');
    var toasty_config_1 = $__require('./src/toasty.config');
    var toasty_service_1 = $__require('./src/toasty.service');
    __export($__require('./src/toasty.container'));
    __export($__require('./src/toasty.component'));
    __export($__require('./src/toasty.config'));
    __export($__require('./src/toasty.service'));
    __export($__require('./src/toasty.utils'));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        providers: [toasty_config_1.ToastyConfig, toasty_service_1.ToastyService],
        directives: [toasty_container_1.Toasty, toasty_component_1.Toast]
    };
    

    return module.exports;
});