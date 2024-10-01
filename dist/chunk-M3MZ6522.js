import {
  __commonJS,
  __require,
  tailwind_config_default
} from "./chunk-VI5LTKKI.js";

// node_modules/postcss-import/lib/join-media.js
var require_join_media = __commonJS({
  "node_modules/postcss-import/lib/join-media.js"(exports, module) {
    "use strict";
    var startsWithKeywordRegexp = /^(all|not|only|print|screen)/i;
    module.exports = function(parentMedia, childMedia) {
      if (!parentMedia.length && childMedia.length) return childMedia;
      if (parentMedia.length && !childMedia.length) return parentMedia;
      if (!parentMedia.length && !childMedia.length) return [];
      const media = [];
      parentMedia.forEach((parentItem) => {
        const parentItemStartsWithKeyword = startsWithKeywordRegexp.test(parentItem);
        childMedia.forEach((childItem) => {
          const childItemStartsWithKeyword = startsWithKeywordRegexp.test(childItem);
          if (parentItem !== childItem) {
            if (childItemStartsWithKeyword && !parentItemStartsWithKeyword) {
              media.push(`${childItem} and ${parentItem}`);
            } else {
              media.push(`${parentItem} and ${childItem}`);
            }
          }
        });
      });
      return media;
    };
  }
});

// node_modules/postcss-import/lib/join-layer.js
var require_join_layer = __commonJS({
  "node_modules/postcss-import/lib/join-layer.js"(exports, module) {
    "use strict";
    module.exports = function(parentLayer, childLayer) {
      if (!parentLayer.length && childLayer.length) return childLayer;
      if (parentLayer.length && !childLayer.length) return parentLayer;
      if (!parentLayer.length && !childLayer.length) return [];
      return parentLayer.concat(childLayer);
    };
  }
});

// node_modules/resolve/lib/homedir.js
var require_homedir = __commonJS({
  "node_modules/resolve/lib/homedir.js"(exports, module) {
    "use strict";
    var os = __require("os");
    module.exports = os.homedir || function homedir() {
      var home = process.env.HOME;
      var user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
      if (process.platform === "win32") {
        return process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
      }
      if (process.platform === "darwin") {
        return home || (user ? "/Users/" + user : null);
      }
      if (process.platform === "linux") {
        return home || (process.getuid() === 0 ? "/root" : user ? "/home/" + user : null);
      }
      return home || null;
    };
  }
});

// node_modules/resolve/lib/caller.js
var require_caller = __commonJS({
  "node_modules/resolve/lib/caller.js"(exports, module) {
    "use strict";
    module.exports = function() {
      var origPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack2) {
        return stack2;
      };
      var stack = new Error().stack;
      Error.prepareStackTrace = origPrepareStackTrace;
      return stack[2].getFileName();
    };
  }
});

// node_modules/resolve/node_modules/path-parse/index.js
var require_path_parse = __commonJS({
  "node_modules/resolve/node_modules/path-parse/index.js"(exports, module) {
    "use strict";
    var isWindows = process.platform === "win32";
    var splitWindowsRe = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/;
    var win32 = {};
    function win32SplitPath(filename) {
      return splitWindowsRe.exec(filename).slice(1);
    }
    win32.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = win32SplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    var splitPathRe = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/;
    var posix = {};
    function posixSplitPath(filename) {
      return splitPathRe.exec(filename).slice(1);
    }
    posix.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = posixSplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    if (isWindows)
      module.exports = win32.parse;
    else
      module.exports = posix.parse;
    module.exports.posix = posix.parse;
    module.exports.win32 = win32.parse;
  }
});

// node_modules/resolve/lib/node-modules-paths.js
var require_node_modules_paths = __commonJS({
  "node_modules/resolve/lib/node-modules-paths.js"(exports, module) {
    "use strict";
    var path3 = __require("path");
    var parse = path3.parse || require_path_parse();
    var getNodeModulesDirs = function getNodeModulesDirs2(absoluteStart, modules) {
      var prefix = "/";
      if (/^([A-Za-z]:)/.test(absoluteStart)) {
        prefix = "";
      } else if (/^\\\\/.test(absoluteStart)) {
        prefix = "\\\\";
      }
      var paths = [absoluteStart];
      var parsed = parse(absoluteStart);
      while (parsed.dir !== paths[paths.length - 1]) {
        paths.push(parsed.dir);
        parsed = parse(parsed.dir);
      }
      return paths.reduce(function(dirs, aPath) {
        return dirs.concat(modules.map(function(moduleDir) {
          return path3.resolve(prefix, aPath, moduleDir);
        }));
      }, []);
    };
    module.exports = function nodeModulesPaths(start, opts, request) {
      var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : ["node_modules"];
      if (opts && typeof opts.paths === "function") {
        return opts.paths(
          request,
          start,
          function() {
            return getNodeModulesDirs(start, modules);
          },
          opts
        );
      }
      var dirs = getNodeModulesDirs(start, modules);
      return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
    };
  }
});

// node_modules/resolve/lib/normalize-options.js
var require_normalize_options = __commonJS({
  "node_modules/resolve/lib/normalize-options.js"(exports, module) {
    "use strict";
    module.exports = function(x, opts) {
      return opts || {};
    };
  }
});

// node_modules/resolve/node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/resolve/node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/resolve/node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/resolve/node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/resolve/node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/resolve/node_modules/hasown/index.js"(exports, module) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/resolve/node_modules/is-core-module/core.json
var require_core = __commonJS({
  "node_modules/resolve/node_modules/is-core-module/core.json"(exports, module) {
    module.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      "node:sea": [">= 20.12 && < 21", ">= 21.7"],
      smalloc: ">= 0.11.5 && < 3",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "test/reporters": ">= 19.9 && < 20.2",
      "node:test/reporters": [">= 18.17 && < 19", ">= 19.9", ">= 20"],
      "test/mock_loader": ">= 22.3 && < 22.7",
      "node:test/mock_loader": ">= 22.3 && < 22.7",
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: [">= 13.4 && < 13.5", ">= 18.17 && < 19", ">= 20"],
      "node:wasi": [">= 18.17 && < 19", ">= 20"],
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// node_modules/resolve/node_modules/is-core-module/index.js
var require_is_core_module = __commonJS({
  "node_modules/resolve/node_modules/is-core-module/index.js"(exports, module) {
    "use strict";
    var hasOwn = require_hasown();
    function specifierIncluded(current, specifier) {
      var nodeParts = current.split(".");
      var parts = specifier.split(" ");
      var op = parts.length > 1 ? parts[0] : "=";
      var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split(".");
      for (var i = 0; i < 3; ++i) {
        var cur = parseInt(nodeParts[i] || 0, 10);
        var ver = parseInt(versionParts[i] || 0, 10);
        if (cur === ver) {
          continue;
        }
        if (op === "<") {
          return cur < ver;
        }
        if (op === ">=") {
          return cur >= ver;
        }
        return false;
      }
      return op === ">=";
    }
    function matchesRange(current, range) {
      var specifiers = range.split(/ ?&& ?/);
      if (specifiers.length === 0) {
        return false;
      }
      for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(current, specifiers[i])) {
          return false;
        }
      }
      return true;
    }
    function versionIncluded(nodeVersion, specifierValue) {
      if (typeof specifierValue === "boolean") {
        return specifierValue;
      }
      var current = typeof nodeVersion === "undefined" ? process.versions && process.versions.node : nodeVersion;
      if (typeof current !== "string") {
        throw new TypeError(typeof nodeVersion === "undefined" ? "Unable to determine current node version" : "If provided, a valid node version is required");
      }
      if (specifierValue && typeof specifierValue === "object") {
        for (var i = 0; i < specifierValue.length; ++i) {
          if (matchesRange(current, specifierValue[i])) {
            return true;
          }
        }
        return false;
      }
      return matchesRange(current, specifierValue);
    }
    var data = require_core();
    module.exports = function isCore(x, nodeVersion) {
      return hasOwn(data, x) && versionIncluded(nodeVersion, data[x]);
    };
  }
});

// node_modules/resolve/lib/async.js
var require_async = __commonJS({
  "node_modules/resolve/lib/async.js"(exports, module) {
    "use strict";
    var fs2 = __require("fs");
    var getHomedir = require_homedir();
    var path3 = __require("path");
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var isCore = require_is_core_module();
    var realpathFS = process.platform !== "win32" && fs2.realpath && typeof fs2.realpath.native === "function" ? fs2.realpath.native : fs2.realpath;
    var homedir = getHomedir();
    var defaultPaths = function() {
      return [
        path3.join(homedir, ".node_modules"),
        path3.join(homedir, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file, cb) {
      fs2.stat(file, function(err, stat) {
        if (!err) {
          return cb(null, stat.isFile() || stat.isFIFO());
        }
        if (err.code === "ENOENT" || err.code === "ENOTDIR") return cb(null, false);
        return cb(err);
      });
    };
    var defaultIsDir = function isDirectory(dir, cb) {
      fs2.stat(dir, function(err, stat) {
        if (!err) {
          return cb(null, stat.isDirectory());
        }
        if (err.code === "ENOENT" || err.code === "ENOTDIR") return cb(null, false);
        return cb(err);
      });
    };
    var defaultRealpath = function realpath(x, cb) {
      realpathFS(x, function(realpathErr, realPath) {
        if (realpathErr && realpathErr.code !== "ENOENT") cb(realpathErr);
        else cb(null, realpathErr ? x : realPath);
      });
    };
    var maybeRealpath = function maybeRealpath2(realpath, x, opts, cb) {
      if (opts && opts.preserveSymlinks === false) {
        realpath(x, cb);
      } else {
        cb(null, x);
      }
    };
    var defaultReadPackage = function defaultReadPackage2(readFile, pkgfile, cb) {
      readFile(pkgfile, function(readFileErr, body) {
        if (readFileErr) cb(readFileErr);
        else {
          try {
            var pkg = JSON.parse(body);
            cb(null, pkg);
          } catch (jsonErr) {
            cb(null);
          }
        }
      });
    };
    var getPackageCandidates = function getPackageCandidates2(x, start, opts) {
      var dirs = nodeModulesPaths(start, opts, x);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path3.join(dirs[i], x);
      }
      return dirs;
    };
    module.exports = function resolve(x, options, callback) {
      var cb = callback;
      var opts = options;
      if (typeof options === "function") {
        cb = opts;
        opts = {};
      }
      if (typeof x !== "string") {
        var err = new TypeError("Path must be a string.");
        return process.nextTick(function() {
          cb(err);
        });
      }
      opts = normalizeOptions(x, opts);
      var isFile = opts.isFile || defaultIsFile;
      var isDirectory = opts.isDirectory || defaultIsDir;
      var readFile = opts.readFile || fs2.readFile;
      var realpath = opts.realpath || defaultRealpath;
      var readPackage = opts.readPackage || defaultReadPackage;
      if (opts.readFile && opts.readPackage) {
        var conflictErr = new TypeError("`readFile` and `readPackage` are mutually exclusive.");
        return process.nextTick(function() {
          cb(conflictErr);
        });
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path3.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = path3.resolve(basedir);
      maybeRealpath(
        realpath,
        absoluteStart,
        opts,
        function(err2, realStart) {
          if (err2) cb(err2);
          else init(realStart);
        }
      );
      var res;
      function init(basedir2) {
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
          res = path3.resolve(basedir2, x);
          if (x === "." || x === ".." || x.slice(-1) === "/") res += "/";
          if (/\/$/.test(x) && res === basedir2) {
            loadAsDirectory(res, opts.package, onfile);
          } else loadAsFile(res, opts.package, onfile);
        } else if (includeCoreModules && isCore(x)) {
          return cb(null, x);
        } else loadNodeModules(x, basedir2, function(err2, n, pkg) {
          if (err2) cb(err2);
          else if (n) {
            return maybeRealpath(realpath, n, opts, function(err3, realN) {
              if (err3) {
                cb(err3);
              } else {
                cb(null, realN, pkg);
              }
            });
          } else {
            var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
            moduleError.code = "MODULE_NOT_FOUND";
            cb(moduleError);
          }
        });
      }
      function onfile(err2, m, pkg) {
        if (err2) cb(err2);
        else if (m) cb(null, m, pkg);
        else loadAsDirectory(res, function(err3, d, pkg2) {
          if (err3) cb(err3);
          else if (d) {
            maybeRealpath(realpath, d, opts, function(err4, realD) {
              if (err4) {
                cb(err4);
              } else {
                cb(null, realD, pkg2);
              }
            });
          } else {
            var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
            moduleError.code = "MODULE_NOT_FOUND";
            cb(moduleError);
          }
        });
      }
      function loadAsFile(x2, thePackage, callback2) {
        var loadAsFilePackage = thePackage;
        var cb2 = callback2;
        if (typeof loadAsFilePackage === "function") {
          cb2 = loadAsFilePackage;
          loadAsFilePackage = void 0;
        }
        var exts = [""].concat(extensions);
        load(exts, x2, loadAsFilePackage);
        function load(exts2, x3, loadPackage) {
          if (exts2.length === 0) return cb2(null, void 0, loadPackage);
          var file = x3 + exts2[0];
          var pkg = loadPackage;
          if (pkg) onpkg(null, pkg);
          else loadpkg(path3.dirname(file), onpkg);
          function onpkg(err2, pkg_, dir) {
            pkg = pkg_;
            if (err2) return cb2(err2);
            if (dir && pkg && opts.pathFilter) {
              var rfile = path3.relative(dir, file);
              var rel = rfile.slice(0, rfile.length - exts2[0].length);
              var r = opts.pathFilter(pkg, x3, rel);
              if (r) return load(
                [""].concat(extensions.slice()),
                path3.resolve(dir, r),
                pkg
              );
            }
            isFile(file, onex);
          }
          function onex(err2, ex) {
            if (err2) return cb2(err2);
            if (ex) return cb2(null, file, pkg);
            load(exts2.slice(1), x3, pkg);
          }
        }
      }
      function loadpkg(dir, cb2) {
        if (dir === "" || dir === "/") return cb2(null);
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return cb2(null);
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir)) return cb2(null);
        maybeRealpath(realpath, dir, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr) return loadpkg(path3.dirname(dir), cb2);
          var pkgfile = path3.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (!ex) return loadpkg(path3.dirname(dir), cb2);
            readPackage(readFile, pkgfile, function(err3, pkgParam) {
              if (err3) cb2(err3);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter) {
                pkg = opts.packageFilter(pkg, pkgfile);
              }
              cb2(null, pkg, dir);
            });
          });
        });
      }
      function loadAsDirectory(x2, loadAsDirectoryPackage, callback2) {
        var cb2 = callback2;
        var fpkg = loadAsDirectoryPackage;
        if (typeof fpkg === "function") {
          cb2 = fpkg;
          fpkg = opts.package;
        }
        maybeRealpath(realpath, x2, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr) return cb2(unwrapErr);
          var pkgfile = path3.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (err2) return cb2(err2);
            if (!ex) return loadAsFile(path3.join(x2, "index"), fpkg, cb2);
            readPackage(readFile, pkgfile, function(err3, pkgParam) {
              if (err3) return cb2(err3);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter) {
                pkg = opts.packageFilter(pkg, pkgfile);
              }
              if (pkg && pkg.main) {
                if (typeof pkg.main !== "string") {
                  var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
                  mainError.code = "INVALID_PACKAGE_MAIN";
                  return cb2(mainError);
                }
                if (pkg.main === "." || pkg.main === "./") {
                  pkg.main = "index";
                }
                loadAsFile(path3.resolve(x2, pkg.main), pkg, function(err4, m, pkg2) {
                  if (err4) return cb2(err4);
                  if (m) return cb2(null, m, pkg2);
                  if (!pkg2) return loadAsFile(path3.join(x2, "index"), pkg2, cb2);
                  var dir = path3.resolve(x2, pkg2.main);
                  loadAsDirectory(dir, pkg2, function(err5, n, pkg3) {
                    if (err5) return cb2(err5);
                    if (n) return cb2(null, n, pkg3);
                    loadAsFile(path3.join(x2, "index"), pkg3, cb2);
                  });
                });
                return;
              }
              loadAsFile(path3.join(x2, "/index"), pkg, cb2);
            });
          });
        });
      }
      function processDirs(cb2, dirs) {
        if (dirs.length === 0) return cb2(null, void 0);
        var dir = dirs[0];
        isDirectory(path3.dirname(dir), isdir);
        function isdir(err2, isdir2) {
          if (err2) return cb2(err2);
          if (!isdir2) return processDirs(cb2, dirs.slice(1));
          loadAsFile(dir, opts.package, onfile2);
        }
        function onfile2(err2, m, pkg) {
          if (err2) return cb2(err2);
          if (m) return cb2(null, m, pkg);
          loadAsDirectory(dir, opts.package, ondir);
        }
        function ondir(err2, n, pkg) {
          if (err2) return cb2(err2);
          if (n) return cb2(null, n, pkg);
          processDirs(cb2, dirs.slice(1));
        }
      }
      function loadNodeModules(x2, start, cb2) {
        var thunk = function() {
          return getPackageCandidates(x2, start, opts);
        };
        processDirs(
          cb2,
          packageIterator ? packageIterator(x2, start, thunk, opts) : thunk()
        );
      }
    };
  }
});

// node_modules/resolve/lib/core.json
var require_core2 = __commonJS({
  "node_modules/resolve/lib/core.json"(exports, module) {
    module.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      smalloc: ">= 0.11.5 && < 3",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "test/reporters": ">= 19.9 && < 20.2",
      "node:test/reporters": [">= 18.17 && < 19", ">= 19.9", ">= 20"],
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: [">= 13.4 && < 13.5", ">= 18.17 && < 19", ">= 20"],
      "node:wasi": [">= 18.17 && < 19", ">= 20"],
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// node_modules/resolve/lib/core.js
var require_core3 = __commonJS({
  "node_modules/resolve/lib/core.js"(exports, module) {
    "use strict";
    var isCoreModule = require_is_core_module();
    var data = require_core2();
    var core = {};
    for (mod in data) {
      if (Object.prototype.hasOwnProperty.call(data, mod)) {
        core[mod] = isCoreModule(mod);
      }
    }
    var mod;
    module.exports = core;
  }
});

// node_modules/resolve/lib/is-core.js
var require_is_core = __commonJS({
  "node_modules/resolve/lib/is-core.js"(exports, module) {
    "use strict";
    var isCoreModule = require_is_core_module();
    module.exports = function isCore(x) {
      return isCoreModule(x);
    };
  }
});

// node_modules/resolve/lib/sync.js
var require_sync = __commonJS({
  "node_modules/resolve/lib/sync.js"(exports, module) {
    "use strict";
    var isCore = require_is_core_module();
    var fs2 = __require("fs");
    var path3 = __require("path");
    var getHomedir = require_homedir();
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var realpathFS = process.platform !== "win32" && fs2.realpathSync && typeof fs2.realpathSync.native === "function" ? fs2.realpathSync.native : fs2.realpathSync;
    var homedir = getHomedir();
    var defaultPaths = function() {
      return [
        path3.join(homedir, ".node_modules"),
        path3.join(homedir, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file) {
      try {
        var stat = fs2.statSync(file, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR")) return false;
        throw e;
      }
      return !!stat && (stat.isFile() || stat.isFIFO());
    };
    var defaultIsDir = function isDirectory(dir) {
      try {
        var stat = fs2.statSync(dir, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR")) return false;
        throw e;
      }
      return !!stat && stat.isDirectory();
    };
    var defaultRealpathSync = function realpathSync(x) {
      try {
        return realpathFS(x);
      } catch (realpathErr) {
        if (realpathErr.code !== "ENOENT") {
          throw realpathErr;
        }
      }
      return x;
    };
    var maybeRealpathSync = function maybeRealpathSync2(realpathSync, x, opts) {
      if (opts && opts.preserveSymlinks === false) {
        return realpathSync(x);
      }
      return x;
    };
    var defaultReadPackageSync = function defaultReadPackageSync2(readFileSync, pkgfile) {
      var body = readFileSync(pkgfile);
      try {
        var pkg = JSON.parse(body);
        return pkg;
      } catch (jsonErr) {
      }
    };
    var getPackageCandidates = function getPackageCandidates2(x, start, opts) {
      var dirs = nodeModulesPaths(start, opts, x);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path3.join(dirs[i], x);
      }
      return dirs;
    };
    module.exports = function resolveSync(x, options) {
      if (typeof x !== "string") {
        throw new TypeError("Path must be a string.");
      }
      var opts = normalizeOptions(x, options);
      var isFile = opts.isFile || defaultIsFile;
      var readFileSync = opts.readFileSync || fs2.readFileSync;
      var isDirectory = opts.isDirectory || defaultIsDir;
      var realpathSync = opts.realpathSync || defaultRealpathSync;
      var readPackageSync = opts.readPackageSync || defaultReadPackageSync;
      if (opts.readFileSync && opts.readPackageSync) {
        throw new TypeError("`readFileSync` and `readPackageSync` are mutually exclusive.");
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path3.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = maybeRealpathSync(realpathSync, path3.resolve(basedir), opts);
      if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
        var res = path3.resolve(absoluteStart, x);
        if (x === "." || x === ".." || x.slice(-1) === "/") res += "/";
        var m = loadAsFileSync(res) || loadAsDirectorySync(res);
        if (m) return maybeRealpathSync(realpathSync, m, opts);
      } else if (includeCoreModules && isCore(x)) {
        return x;
      } else {
        var n = loadNodeModulesSync(x, absoluteStart);
        if (n) return maybeRealpathSync(realpathSync, n, opts);
      }
      var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
      err.code = "MODULE_NOT_FOUND";
      throw err;
      function loadAsFileSync(x2) {
        var pkg = loadpkg(path3.dirname(x2));
        if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
          var rfile = path3.relative(pkg.dir, x2);
          var r = opts.pathFilter(pkg.pkg, x2, rfile);
          if (r) {
            x2 = path3.resolve(pkg.dir, r);
          }
        }
        if (isFile(x2)) {
          return x2;
        }
        for (var i = 0; i < extensions.length; i++) {
          var file = x2 + extensions[i];
          if (isFile(file)) {
            return file;
          }
        }
      }
      function loadpkg(dir) {
        if (dir === "" || dir === "/") return;
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return;
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir)) return;
        var pkgfile = path3.join(maybeRealpathSync(realpathSync, dir, opts), "package.json");
        if (!isFile(pkgfile)) {
          return loadpkg(path3.dirname(dir));
        }
        var pkg = readPackageSync(readFileSync, pkgfile);
        if (pkg && opts.packageFilter) {
          pkg = opts.packageFilter(
            pkg,
            /*pkgfile,*/
            dir
          );
        }
        return { pkg, dir };
      }
      function loadAsDirectorySync(x2) {
        var pkgfile = path3.join(maybeRealpathSync(realpathSync, x2, opts), "/package.json");
        if (isFile(pkgfile)) {
          try {
            var pkg = readPackageSync(readFileSync, pkgfile);
          } catch (e) {
          }
          if (pkg && opts.packageFilter) {
            pkg = opts.packageFilter(
              pkg,
              /*pkgfile,*/
              x2
            );
          }
          if (pkg && pkg.main) {
            if (typeof pkg.main !== "string") {
              var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
              mainError.code = "INVALID_PACKAGE_MAIN";
              throw mainError;
            }
            if (pkg.main === "." || pkg.main === "./") {
              pkg.main = "index";
            }
            try {
              var m2 = loadAsFileSync(path3.resolve(x2, pkg.main));
              if (m2) return m2;
              var n2 = loadAsDirectorySync(path3.resolve(x2, pkg.main));
              if (n2) return n2;
            } catch (e) {
            }
          }
        }
        return loadAsFileSync(path3.join(x2, "/index"));
      }
      function loadNodeModulesSync(x2, start) {
        var thunk = function() {
          return getPackageCandidates(x2, start, opts);
        };
        var dirs = packageIterator ? packageIterator(x2, start, thunk, opts) : thunk();
        for (var i = 0; i < dirs.length; i++) {
          var dir = dirs[i];
          if (isDirectory(path3.dirname(dir))) {
            var m2 = loadAsFileSync(dir);
            if (m2) return m2;
            var n2 = loadAsDirectorySync(dir);
            if (n2) return n2;
          }
        }
      }
    };
  }
});

// node_modules/resolve/index.js
var require_resolve = __commonJS({
  "node_modules/resolve/index.js"(exports, module) {
    "use strict";
    var async = require_async();
    async.core = require_core3();
    async.isCore = require_is_core();
    async.sync = require_sync();
    module.exports = async;
  }
});

// node_modules/postcss-import/lib/resolve-id.js
var require_resolve_id = __commonJS({
  "node_modules/postcss-import/lib/resolve-id.js"(exports, module) {
    "use strict";
    var resolve = require_resolve();
    var moduleDirectories = ["web_modules", "node_modules"];
    function resolveModule(id, opts) {
      return new Promise((res, rej) => {
        resolve(id, opts, (err, path3) => err ? rej(err) : res(path3));
      });
    }
    module.exports = function(id, base, options) {
      const paths = options.path;
      const resolveOpts = {
        basedir: base,
        moduleDirectory: moduleDirectories.concat(options.addModulesDirectories),
        paths,
        extensions: [".css"],
        packageFilter: function processPackage(pkg) {
          if (pkg.style) pkg.main = pkg.style;
          else if (!pkg.main || !/\.css$/.test(pkg.main)) pkg.main = "index.css";
          return pkg;
        },
        preserveSymlinks: false
      };
      return resolveModule(`./${id}`, resolveOpts).catch(() => resolveModule(id, resolveOpts)).catch(() => {
        if (paths.indexOf(base) === -1) paths.unshift(base);
        throw new Error(
          `Failed to find '${id}'
  in [
    ${paths.join(",\n        ")}
  ]`
        );
      });
    };
  }
});

// node_modules/postcss-import/node_modules/pify/index.js
var require_pify = __commonJS({
  "node_modules/postcss-import/node_modules/pify/index.js"(exports, module) {
    "use strict";
    var processFn = function(fn, P, opts) {
      return function() {
        var that = this;
        var args = new Array(arguments.length);
        for (var i = 0; i < arguments.length; i++) {
          args[i] = arguments[i];
        }
        return new P(function(resolve, reject) {
          args.push(function(err, result) {
            if (err) {
              reject(err);
            } else if (opts.multiArgs) {
              var results = new Array(arguments.length - 1);
              for (var i2 = 1; i2 < arguments.length; i2++) {
                results[i2 - 1] = arguments[i2];
              }
              resolve(results);
            } else {
              resolve(result);
            }
          });
          fn.apply(that, args);
        });
      };
    };
    var pify = module.exports = function(obj, P, opts) {
      if (typeof P !== "function") {
        opts = P;
        P = Promise;
      }
      opts = opts || {};
      opts.exclude = opts.exclude || [/.+Sync$/];
      var filter = function(key) {
        var match = function(pattern) {
          return typeof pattern === "string" ? key === pattern : pattern.test(key);
        };
        return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
      };
      var ret = typeof obj === "function" ? function() {
        if (opts.excludeMain) {
          return obj.apply(this, arguments);
        }
        return processFn(obj, P, opts).apply(this, arguments);
      } : {};
      return Object.keys(obj).reduce(function(ret2, key) {
        var x = obj[key];
        ret2[key] = typeof x === "function" && filter(key) ? processFn(x, P, opts) : x;
        return ret2;
      }, ret);
    };
    pify.all = pify;
  }
});

// node_modules/postcss-import/node_modules/read-cache/index.js
var require_read_cache = __commonJS({
  "node_modules/postcss-import/node_modules/read-cache/index.js"(exports, module) {
    "use strict";
    var fs2 = __require("fs");
    var path3 = __require("path");
    var pify = require_pify();
    var stat = pify(fs2.stat);
    var readFile = pify(fs2.readFile);
    var resolve = path3.resolve;
    var cache = /* @__PURE__ */ Object.create(null);
    function convert(content, encoding) {
      if (Buffer.isEncoding(encoding)) {
        return content.toString(encoding);
      }
      return content;
    }
    module.exports = function(path4, encoding) {
      path4 = resolve(path4);
      return stat(path4).then(function(stats) {
        var item = cache[path4];
        if (item && item.mtime.getTime() === stats.mtime.getTime()) {
          return convert(item.content, encoding);
        }
        return readFile(path4).then(function(data) {
          cache[path4] = {
            mtime: stats.mtime,
            content: data
          };
          return convert(data, encoding);
        });
      }).catch(function(err) {
        cache[path4] = null;
        return Promise.reject(err);
      });
    };
    module.exports.sync = function(path4, encoding) {
      path4 = resolve(path4);
      try {
        var stats = fs2.statSync(path4);
        var item = cache[path4];
        if (item && item.mtime.getTime() === stats.mtime.getTime()) {
          return convert(item.content, encoding);
        }
        var data = fs2.readFileSync(path4);
        cache[path4] = {
          mtime: stats.mtime,
          content: data
        };
        return convert(data, encoding);
      } catch (err) {
        cache[path4] = null;
        throw err;
      }
    };
    module.exports.get = function(path4, encoding) {
      path4 = resolve(path4);
      if (cache[path4]) {
        return convert(cache[path4].content, encoding);
      }
      return null;
    };
    module.exports.clear = function() {
      cache = /* @__PURE__ */ Object.create(null);
    };
  }
});

// node_modules/postcss-import/lib/data-url.js
var require_data_url = __commonJS({
  "node_modules/postcss-import/lib/data-url.js"(exports, module) {
    "use strict";
    var dataURLRegexp = /^data:text\/css;base64,/i;
    function isValid(url) {
      return dataURLRegexp.test(url);
    }
    function contents(url) {
      return Buffer.from(url.slice(21), "base64").toString();
    }
    module.exports = {
      isValid,
      contents
    };
  }
});

// node_modules/postcss-import/lib/load-content.js
var require_load_content = __commonJS({
  "node_modules/postcss-import/lib/load-content.js"(exports, module) {
    "use strict";
    var readCache = require_read_cache();
    var dataURL = require_data_url();
    module.exports = (filename) => {
      if (dataURL.isValid(filename)) {
        return dataURL.contents(filename);
      }
      return readCache(filename, "utf-8");
    };
  }
});

// node_modules/sugarss/stringifier.js
var require_stringifier = __commonJS({
  "node_modules/sugarss/stringifier.js"(exports, module) {
    "use strict";
    var DEFAULT_RAWS = {
      colon: ": ",
      indent: "  ",
      commentLeft: " ",
      commentRight: " "
    };
    module.exports = class Stringifier {
      constructor(builder) {
        this.builder = builder;
      }
      stringify(node, semicolon) {
        this[node.type](node, semicolon);
      }
      root(node) {
        this.body(node);
        if (node.raws.after) this.builder(node.raws.after);
      }
      comment(node) {
        let left = DEFAULT_RAWS.commentLeft;
        let right = DEFAULT_RAWS.commentRight;
        if (this.has(node.raws.left)) left = node.raws.left;
        if (node.raws.inline) {
          if (this.has(node.raws.inlineRight)) {
            right = node.raws.inlineRight;
          } else {
            right = "";
          }
          if (node.raws.extraIndent) {
            this.builder(node.raws.extraIndent);
          }
          this.builder("//" + left + node.text + right, node);
        } else {
          if (this.has(node.raws.right)) right = node.raws.right;
          this.builder("/*" + left + node.text + right + "*/", node);
        }
      }
      decl(node) {
        let between = node.raws.between || DEFAULT_RAWS.colon;
        let string = node.prop + between + this.rawValue(node, "value");
        if (node.important) {
          string += node.raws.important || " !important";
        }
        this.builder(string, node);
      }
      rule(node) {
        this.block(node, this.rawValue(node, "selector"));
      }
      atrule(node) {
        let name = "@" + node.name;
        let params = node.params ? this.rawValue(node, "params") : "";
        if (this.has(node.raws.afterName)) {
          name += node.raws.afterName;
        } else if (params) {
          name += " ";
        }
        this.block(node, name + params);
      }
      body(node) {
        let indent = node.root().raws.indent || DEFAULT_RAWS.indent;
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i];
          let before = child.raws.before.replace(/[^\n]*$/, "") + this.indent(node, indent);
          if (child.type === "comment" && !child.raws.before.includes("\n")) {
            before = child.raws.before;
          }
          if (before) this.builder(before);
          this.stringify(child);
        }
      }
      block(node, start) {
        let between = node.raws.sssBetween || "";
        this.builder(start + between, node, "start");
        if (this.has(node.nodes)) this.body(node);
      }
      indent(node, step) {
        let result = "";
        while (node.parent) {
          result += step;
          node = node.parent;
        }
        return result;
      }
      has(value) {
        return typeof value !== "undefined";
      }
      rawValue(node, prop) {
        let value = node[prop];
        let raw = node.raws[prop];
        if (raw && raw.value === value) {
          return raw.sss || raw.raw;
        } else {
          return value;
        }
      }
    };
  }
});

// node_modules/sugarss/stringify.js
var require_stringify = __commonJS({
  "node_modules/sugarss/stringify.js"(exports, module) {
    "use strict";
    var Stringifier = require_stringifier();
    module.exports = function stringify(node, builder) {
      let str = new Stringifier(builder);
      str.stringify(node);
    };
  }
});

// node_modules/sugarss/preprocess.js
var require_preprocess = __commonJS({
  "node_modules/sugarss/preprocess.js"(exports, module) {
    "use strict";
    function indentError(input, l, p) {
      throw input.error("Mixed tabs and spaces are not allowed", l, p + 1);
    }
    module.exports = function preprocess(input, lines) {
      let indentType;
      let prevNumber = 0;
      let parts = lines.map((line) => {
        let lastComma = false;
        let comment = false;
        let number = prevNumber + 1;
        let atrule = false;
        let indent = "";
        let tokens = [];
        let colon = false;
        if (line.length > 0) {
          if (line[0][0] === "space") {
            indent = line[0][1];
            tokens = line.slice(1);
          } else {
            indent = "";
            tokens = line;
          }
          if (!indentType && indent.length) {
            indentType = indent[0] === " " ? "space" : "tab";
          }
          if (indentType === "space") {
            if (indent.includes("	")) {
              indentError(input, number, indent.indexOf("	"));
            }
          } else if (indentType === "tab") {
            if (indent.includes(" ")) {
              indentError(input, number, indent.indexOf(" "));
            }
          }
          if (tokens.length) {
            for (let i = tokens.length - 1; i >= 0; i--) {
              let type = tokens[i][0];
              if (type === ",") {
                lastComma = true;
                break;
              } else if (type === "space") {
                continue;
              } else if (type === "comment") {
                continue;
              } else if (type === "newline") {
                continue;
              } else {
                break;
              }
            }
            comment = tokens[0][0] === "comment";
            atrule = tokens[0][0] === "at-word";
            let brackets = 0;
            for (let i = 0; i < tokens.length - 1; i++) {
              let type = tokens[i][0];
              let next = tokens[i + 1][0];
              if (type === "(") {
                brackets += 1;
              } else if (type === ")") {
                brackets -= 1;
              } else if (type === ":" && brackets === 0 && (next === "space" || next === "newline")) {
                colon = true;
              }
            }
          }
          let last = tokens[tokens.length - 1];
          if (last && last[0] === "newline") prevNumber = last[2];
        }
        return {
          number,
          indent,
          colon,
          tokens,
          atrule,
          comment,
          lastComma,
          before: ""
        };
      });
      parts = parts.reduceRight(
        (all, i) => {
          if (!i.tokens.length || i.tokens.every((j) => j[0] === "newline")) {
            let prev = all[0];
            let before = i.indent + i.tokens.map((j) => j[1]).join("");
            prev.before = before + prev.before;
          } else {
            all.unshift(i);
          }
          return all;
        },
        [{ end: true, before: "" }]
      );
      parts.forEach((part, i) => {
        if (i === 0) return;
        let prev = parts[i - 1];
        let last = prev.tokens[prev.tokens.length - 1];
        if (last && last[0] === "newline") {
          part.before = last[1] + part.before;
          prev.tokens.pop();
        }
      });
      return parts;
    };
  }
});

// node_modules/sugarss/tokenize.js
var require_tokenize = __commonJS({
  "node_modules/sugarss/tokenize.js"(exports, module) {
    "use strict";
    var SINGLE_QUOTE = "'".charCodeAt(0);
    var DOUBLE_QUOTE = '"'.charCodeAt(0);
    var BACKSLASH = "\\".charCodeAt(0);
    var SLASH = "/".charCodeAt(0);
    var NEWLINE = "\n".charCodeAt(0);
    var SPACE = " ".charCodeAt(0);
    var FEED = "\f".charCodeAt(0);
    var TAB = "	".charCodeAt(0);
    var CR = "\r".charCodeAt(0);
    var OPEN_PARENTHESES = "(".charCodeAt(0);
    var CLOSE_PARENTHESES = ")".charCodeAt(0);
    var OPEN_CURLY = "{".charCodeAt(0);
    var CLOSE_CURLY = "}".charCodeAt(0);
    var SEMICOLON = ";".charCodeAt(0);
    var ASTERICK = "*".charCodeAt(0);
    var COLON = ":".charCodeAt(0);
    var AT = "@".charCodeAt(0);
    var COMMA = ",".charCodeAt(0);
    var RE_AT_END = /[\t\n\f\r "'()/;\\{]/g;
    var RE_NEW_LINE = /[\n\f\r]/g;
    var RE_WORD_END = /[\t\n\f\r !"'(),:;@\\{}]|\/(?=\*)/g;
    var RE_BAD_BRACKET = /.[\n"'(/\\]/;
    module.exports = function tokenize(input) {
      let tokens = [];
      let css = input.css.valueOf();
      let code, next, quote, lines, last, content, escape, nextLine, nextOffset, escaped, escapePos, prev, n;
      let length = css.length;
      let offset = -1;
      let line = 1;
      let pos = 0;
      function unclosed(what) {
        throw input.error("Unclosed " + what, line, pos - offset);
      }
      while (pos < length) {
        code = css.charCodeAt(pos);
        if (code === NEWLINE || code === FEED || code === CR && css.charCodeAt(pos + 1) !== NEWLINE) {
          offset = pos;
          line += 1;
        }
        switch (code) {
          case CR:
            if (css.charCodeAt(pos + 1) === NEWLINE) {
              offset = pos;
              line += 1;
              pos += 1;
              tokens.push(["newline", "\r\n", line - 1]);
            } else {
              tokens.push(["newline", "\r", line - 1]);
            }
            break;
          case FEED:
          case NEWLINE:
            tokens.push(["newline", css.slice(pos, pos + 1), line - 1]);
            break;
          case SPACE:
          case TAB:
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === SPACE || code === TAB);
            tokens.push(["space", css.slice(pos, next)]);
            pos = next - 1;
            break;
          case OPEN_CURLY:
            tokens.push(["{", "{", line, pos - offset]);
            break;
          case CLOSE_CURLY:
            tokens.push(["}", "}", line, pos - offset]);
            break;
          case COLON:
            tokens.push([":", ":", line, pos - offset]);
            break;
          case SEMICOLON:
            tokens.push([";", ";", line, pos - offset]);
            break;
          case COMMA:
            tokens.push([",", ",", line, pos - offset]);
            break;
          case OPEN_PARENTHESES:
            prev = tokens.length ? tokens[tokens.length - 1][1] : "";
            n = css.charCodeAt(pos + 1);
            if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
              next = pos;
              do {
                escaped = false;
                next = css.indexOf(")", next + 1);
                if (next === -1) unclosed("bracket");
                escapePos = next;
                while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                  escapePos -= 1;
                  escaped = !escaped;
                }
              } while (escaped);
              tokens.push([
                "brackets",
                css.slice(pos, next + 1),
                line,
                pos - offset,
                line,
                next - offset
              ]);
              pos = next;
            } else {
              next = css.indexOf(")", pos + 1);
              content = css.slice(pos, next + 1);
              if (next === -1 || RE_BAD_BRACKET.test(content)) {
                tokens.push(["(", "(", line, pos - offset]);
              } else {
                tokens.push([
                  "brackets",
                  content,
                  line,
                  pos - offset,
                  line,
                  next - offset
                ]);
                pos = next;
              }
            }
            break;
          case CLOSE_PARENTHESES:
            tokens.push([")", ")", line, pos - offset]);
            break;
          case SINGLE_QUOTE:
          case DOUBLE_QUOTE:
            quote = code === SINGLE_QUOTE ? "'" : '"';
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) unclosed("quote");
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            content = css.slice(pos, next + 1);
            lines = content.split("\n");
            last = lines.length - 1;
            if (last > 0) {
              nextLine = line + last;
              nextOffset = next - lines[last].length;
            } else {
              nextLine = line;
              nextOffset = offset;
            }
            tokens.push([
              "string",
              css.slice(pos, next + 1),
              line,
              pos - offset,
              nextLine,
              next - nextOffset
            ]);
            offset = nextOffset;
            line = nextLine;
            pos = next;
            break;
          case AT:
            RE_AT_END.lastIndex = pos + 1;
            RE_AT_END.test(css);
            if (RE_AT_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_AT_END.lastIndex - 2;
            }
            tokens.push([
              "at-word",
              css.slice(pos, next + 1),
              line,
              pos - offset,
              line,
              next - offset
            ]);
            pos = next;
            break;
          case BACKSLASH:
            next = pos;
            escape = true;
            nextLine = line;
            while (css.charCodeAt(next + 1) === BACKSLASH) {
              next += 1;
              escape = !escape;
            }
            code = css.charCodeAt(next + 1);
            if (escape) {
              if (code === CR && css.charCodeAt(next + 2) === NEWLINE) {
                next += 2;
                nextLine += 1;
                nextOffset = next;
              } else if (code === CR || code === NEWLINE || code === FEED) {
                next += 1;
                nextLine += 1;
                nextOffset = next;
              } else {
                next += 1;
              }
            }
            tokens.push([
              "word",
              css.slice(pos, next + 1),
              line,
              pos - offset,
              line,
              next - offset
            ]);
            if (nextLine !== line) {
              line = nextLine;
              offset = nextOffset;
            }
            pos = next;
            break;
          default:
            n = css.charCodeAt(pos + 1);
            if (code === SLASH && n === ASTERICK) {
              next = css.indexOf("*/", pos + 2) + 1;
              if (next === 0) unclosed("comment");
              content = css.slice(pos, next + 1);
              lines = content.split("\n");
              last = lines.length - 1;
              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }
              tokens.push([
                "comment",
                content,
                line,
                pos - offset,
                nextLine,
                next - nextOffset
              ]);
              offset = nextOffset;
              line = nextLine;
              pos = next;
            } else if (code === SLASH && n === SLASH) {
              RE_NEW_LINE.lastIndex = pos + 1;
              RE_NEW_LINE.test(css);
              if (RE_NEW_LINE.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_NEW_LINE.lastIndex - 2;
              }
              content = css.slice(pos, next + 1);
              tokens.push([
                "comment",
                content,
                line,
                pos - offset,
                line,
                next - offset,
                "inline"
              ]);
              pos = next;
            } else {
              RE_WORD_END.lastIndex = pos + 1;
              RE_WORD_END.test(css);
              if (RE_WORD_END.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_WORD_END.lastIndex - 2;
              }
              tokens.push([
                "word",
                css.slice(pos, next + 1),
                line,
                pos - offset,
                line,
                next - offset
              ]);
              pos = next;
            }
            break;
        }
        pos++;
      }
      return tokens;
    };
  }
});

// node_modules/sugarss/parser.js
var require_parser = __commonJS({
  "node_modules/sugarss/parser.js"(exports, module) {
    "use strict";
    var { Declaration, Comment, AtRule, Rule, Root } = __require("postcss");
    module.exports = class Parser {
      constructor(input) {
        this.input = input;
        this.pos = 0;
        this.root = new Root();
        this.current = this.root;
        this.spaces = "";
        this.extraIndent = false;
        this.prevIndent = void 0;
        this.step = void 0;
        this.root.source = { input, start: { line: 1, column: 1 } };
      }
      loop() {
        let part;
        while (this.pos < this.parts.length) {
          part = this.parts[this.pos];
          if (part.comment) {
            this.comment(part);
          } else if (part.atrule) {
            this.atrule(part);
          } else if (part.colon) {
            let next = this.nextNonComment(this.pos);
            if (next.end || next.atrule) {
              this.decl(part);
            } else {
              let moreIndent = next.indent.length > part.indent.length;
              if (!moreIndent) {
                this.decl(part);
              } else if (moreIndent && next.colon) {
                this.rule(part);
              } else if (moreIndent && !next.colon) {
                this.decl(part);
              }
            }
          } else if (part.end) {
            this.root.raws.after = part.before;
          } else {
            this.rule(part);
          }
          this.pos += 1;
        }
        for (let i = this.tokens.length - 1; i >= 0; i--) {
          if (this.tokens[i].length > 3) {
            let last = this.tokens[i];
            this.root.source.end = {
              line: last[4] || last[2],
              column: last[5] || last[3]
            };
            break;
          }
        }
      }
      comment(part) {
        let token = part.tokens[0];
        let node = new Comment();
        this.init(node, part);
        node.source.end = { line: token[4], column: token[5] };
        this.commentText(node, token);
      }
      atrule(part) {
        let atword = part.tokens[0];
        let params = part.tokens.slice(1);
        let node = new AtRule();
        node.name = atword[1].slice(1);
        this.init(node, part);
        if (node.name === "") this.unnamedAtrule(atword);
        while (!part.end && part.lastComma) {
          this.pos += 1;
          part = this.parts[this.pos];
          params.push(["space", part.before + part.indent]);
          params = params.concat(part.tokens);
        }
        node.raws.afterName = this.firstSpaces(params);
        this.keepTrailingSpace(node, params);
        this.checkSemicolon(params);
        this.checkCurly(params);
        this.raw(node, "params", params, atword);
      }
      decl(part) {
        let node = new Declaration();
        this.init(node, part);
        let between = "";
        let colon = 0;
        let value = [];
        let prop = "";
        for (let i = 0; i < part.tokens.length; i++) {
          let token = part.tokens[i];
          if (token[0] === ":") {
            between += token[1];
            colon = token;
            value = part.tokens.slice(i + 1);
            break;
          } else if (token[0] === "comment" || token[0] === "space") {
            between += token[1];
          } else if (between !== "") {
            this.badProp(token);
          } else {
            prop += token[1];
          }
        }
        if (prop === "") this.unnamedDecl(part.tokens[0]);
        node.prop = prop;
        let next = this.parts[this.pos + 1];
        while (!next.end && !next.atrule && !next.colon && next.indent.length > part.indent.length) {
          value.push(["space", next.before + next.indent]);
          value = value.concat(next.tokens);
          this.pos += 1;
          next = this.parts[this.pos + 1];
        }
        let last = value[value.length - 1];
        if (last && last[0] === "comment") {
          value.pop();
          let comment = new Comment();
          this.current.push(comment);
          comment.source = {
            input: this.input,
            start: { line: last[2], column: last[3] },
            end: { line: last[4], column: last[5] }
          };
          let prev = value[value.length - 1];
          if (prev && prev[0] === "space") {
            value.pop();
            comment.raws.before = prev[1];
          }
          this.commentText(comment, last);
        }
        for (let i = value.length - 1; i > 0; i--) {
          let t = value[i][0];
          if (t === "word" && value[i][1] === "!important") {
            node.important = true;
            if (i > 0 && value[i - 1][0] === "space") {
              node.raws.important = value[i - 1][1] + "!important";
              value.splice(i - 1, 2);
            } else {
              node.raws.important = "!important";
              value.splice(i, 1);
            }
            break;
          } else if (t !== "space" && t !== "newline" && t !== "comment") {
            break;
          }
        }
        node.raws.between = between + this.firstSpaces(value);
        this.checkSemicolon(value);
        this.raw(node, "value", value, colon);
      }
      rule(part) {
        let node = new Rule();
        this.init(node, part);
        let selector = part.tokens;
        let next = this.parts[this.pos + 1];
        while (!next.end && next.indent.length === part.indent.length) {
          selector.push(["space", next.before + next.indent]);
          selector = selector.concat(next.tokens);
          this.pos += 1;
          next = this.parts[this.pos + 1];
        }
        this.keepTrailingSpace(node, selector);
        this.checkCurly(selector);
        this.raw(node, "selector", selector);
      }
      /* Helpers */
      indent(part) {
        let indent = part.indent.length;
        let isPrev = typeof this.prevIndent !== "undefined";
        if (!isPrev && indent) this.indentedFirstLine(part);
        if (!this.step && indent) {
          this.step = indent;
          this.root.raws.indent = part.indent;
        }
        if (isPrev && this.prevIndent !== indent) {
          let diff = indent - this.prevIndent;
          if (diff > 0) {
            if (diff !== this.step) {
              this.wrongIndent(this.prevIndent + this.step, indent, part);
            } else if (this.current.last.push) {
              this.current = this.current.last;
            } else {
              this.extraIndent = "";
              for (let i = 0; i < diff; i++) {
                this.extraIndent += " ";
              }
            }
          } else if (diff % this.step !== 0) {
            let m = indent + diff % this.step;
            this.wrongIndent(`${m} or ${m + this.step}`, indent, part);
          } else {
            for (let i = 0; i < -diff / this.step; i++) {
              this.current = this.current.parent;
            }
          }
        }
        this.prevIndent = indent;
      }
      init(node, part) {
        this.indent(part);
        if (!this.current.nodes) this.current.nodes = [];
        this.current.push(node);
        node.raws.before = part.before + part.indent;
        if (this.extraIndent) {
          node.raws.extraIndent = this.extraIndent;
          this.extraIndent = false;
        }
        node.source = {
          start: { line: part.tokens[0][2], column: part.tokens[0][3] },
          input: this.input
        };
      }
      checkCurly(tokens) {
        for (let token of tokens) {
          if (token[0] === "{") {
            this.error("Unnecessary curly bracket", token[2], token[3]);
          }
        }
      }
      checkSemicolon(tokens) {
        for (let token of tokens) {
          if (token[0] === ";") {
            this.error("Unnecessary semicolon", token[2], token[3]);
          }
        }
      }
      keepTrailingSpace(node, tokens) {
        let lastSpace = tokens[tokens.length - 1];
        if (lastSpace && lastSpace[0] === "space") {
          tokens.pop();
          node.raws.sssBetween = lastSpace[1];
        }
      }
      firstSpaces(tokens) {
        let result = "";
        for (let i = 0; i < tokens.length; i++) {
          if (tokens[i][0] === "space" || tokens[i][0] === "newline") {
            result += tokens.shift()[1];
            i -= 1;
          } else {
            break;
          }
        }
        return result;
      }
      raw(node, prop, tokens, altLast) {
        let token, type;
        let length = tokens.length;
        let value = "";
        let clean = true;
        for (let i = 0; i < length; i += 1) {
          token = tokens[i];
          type = token[0];
          if (type === "comment" || type === "space" && i === length - 1) {
            clean = false;
          } else {
            value += token[1];
          }
        }
        if (!clean) {
          let sss = tokens.reduce((all, i) => all + i[1], "");
          let raw = tokens.reduce((all, i) => {
            if (i[0] === "comment" && i[6] === "inline") {
              return all + "/* " + i[1].slice(2).trim() + " */";
            } else {
              return all + i[1];
            }
          }, "");
          node.raws[prop] = { value, raw };
          if (sss !== raw) node.raws[prop].sss = sss;
        }
        node[prop] = value;
        let last;
        for (let i = tokens.length - 1; i >= 0; i--) {
          if (tokens[i].length > 2) {
            last = tokens[i];
            break;
          }
        }
        if (!last) last = altLast;
        node.source.end = {
          line: last[4] || last[2],
          column: last[5] || last[3]
        };
      }
      nextNonComment(pos) {
        let next = pos;
        let part;
        while (next < this.parts.length) {
          next += 1;
          part = this.parts[next];
          if (part.end || !part.comment) break;
        }
        return part;
      }
      commentText(node, token) {
        let text = token[1];
        if (token[6] === "inline") {
          node.raws.inline = true;
          text = text.slice(2);
        } else {
          text = text.slice(2, -2);
        }
        let match = text.match(/^(\s*)([^]*\S)(\s*)\n?$/);
        if (match) {
          node.text = match[2];
          node.raws.left = match[1];
          node.raws.inlineRight = match[3];
        } else {
          node.text = "";
          node.raws.left = "";
          node.raws.inlineRight = "";
        }
      }
      // Errors
      error(msg, line, column) {
        throw this.input.error(msg, line, column);
      }
      unnamedAtrule(token) {
        this.error("At-rule without name", token[2], token[3]);
      }
      unnamedDecl(token) {
        this.error("Declaration without name", token[2], token[3]);
      }
      indentedFirstLine(part) {
        this.error("First line should not have indent", part.number, 1);
      }
      wrongIndent(expected, real, part) {
        let msg = `Expected ${expected} indent, but get ${real}`;
        this.error(msg, part.number, 1);
      }
      badProp(token) {
        this.error("Unexpected separator in property", token[2], token[3]);
      }
    };
  }
});

// node_modules/sugarss/liner.js
var require_liner = __commonJS({
  "node_modules/sugarss/liner.js"(exports, module) {
    "use strict";
    module.exports = function liner(tokens) {
      let line = [];
      let result = [line];
      let brackets = 0;
      for (let token of tokens) {
        line.push(token);
        if (token[0] === "(") {
          brackets += 1;
        } else if (token[0] === ")") {
          brackets -= 1;
        } else if (token[0] === "newline" && brackets === 0) {
          line = [];
          result.push(line);
        }
      }
      return result;
    };
  }
});

// node_modules/sugarss/parse.js
var require_parse = __commonJS({
  "node_modules/sugarss/parse.js"(exports, module) {
    "use strict";
    var { Input } = __require("postcss");
    var preprocess = require_preprocess();
    var tokenizer = require_tokenize();
    var Parser = require_parser();
    var liner = require_liner();
    module.exports = function parse(source, opts) {
      let input = new Input(source, opts);
      let parser = new Parser(input);
      parser.tokens = tokenizer(input);
      parser.parts = preprocess(input, liner(parser.tokens));
      parser.loop();
      return parser.root;
    };
  }
});

// node_modules/sugarss/index.js
var require_sugarss = __commonJS({
  "node_modules/sugarss/index.js"(exports, module) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    module.exports = { stringify, parse };
  }
});

// node_modules/postcss-import/lib/process-content.js
var require_process_content = __commonJS({
  "node_modules/postcss-import/lib/process-content.js"(exports, module) {
    "use strict";
    var path3 = __require("path");
    var sugarss;
    module.exports = function processContent(result, content, filename, options, postcss2) {
      const { plugins } = options;
      const ext = path3.extname(filename);
      const parserList = [];
      if (ext === ".sss") {
        if (!sugarss) {
          try {
            sugarss = require_sugarss();
          } catch {
          }
        }
        if (sugarss)
          return runPostcss(postcss2, content, filename, plugins, [sugarss]);
      }
      if (result.opts.syntax?.parse) {
        parserList.push(result.opts.syntax.parse);
      }
      if (result.opts.parser) parserList.push(result.opts.parser);
      parserList.push(null);
      return runPostcss(postcss2, content, filename, plugins, parserList);
    };
    function runPostcss(postcss2, content, filename, plugins, parsers, index) {
      if (!index) index = 0;
      return postcss2(plugins).process(content, {
        from: filename,
        parser: parsers[index]
      }).catch((err) => {
        index++;
        if (index === parsers.length) throw err;
        return runPostcss(postcss2, content, filename, plugins, parsers, index);
      });
    }
  }
});

// node_modules/postcss-value-parser/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/postcss-value-parser/lib/parse.js"(exports, module) {
    "use strict";
    var openParentheses = "(".charCodeAt(0);
    var closeParentheses = ")".charCodeAt(0);
    var singleQuote = "'".charCodeAt(0);
    var doubleQuote = '"'.charCodeAt(0);
    var backslash = "\\".charCodeAt(0);
    var slash = "/".charCodeAt(0);
    var comma = ",".charCodeAt(0);
    var colon = ":".charCodeAt(0);
    var star = "*".charCodeAt(0);
    var uLower = "u".charCodeAt(0);
    var uUpper = "U".charCodeAt(0);
    var plus = "+".charCodeAt(0);
    var isUnicodeRange = /^[a-f0-9?-]+$/i;
    module.exports = function(input) {
      var tokens = [];
      var value = input;
      var next, quote, prev, token, escape, escapePos, whitespacePos, parenthesesOpenPos;
      var pos = 0;
      var code = value.charCodeAt(pos);
      var max = value.length;
      var stack = [{ nodes: tokens }];
      var balanced = 0;
      var parent;
      var name = "";
      var before = "";
      var after = "";
      while (pos < max) {
        if (code <= 32) {
          next = pos;
          do {
            next += 1;
            code = value.charCodeAt(next);
          } while (code <= 32);
          token = value.slice(pos, next);
          prev = tokens[tokens.length - 1];
          if (code === closeParentheses && balanced) {
            after = token;
          } else if (prev && prev.type === "div") {
            prev.after = token;
            prev.sourceEndIndex += token.length;
          } else if (code === comma || code === colon || code === slash && value.charCodeAt(next + 1) !== star && (!parent || parent && parent.type === "function" && parent.value !== "calc")) {
            before = token;
          } else {
            tokens.push({
              type: "space",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          }
          pos = next;
        } else if (code === singleQuote || code === doubleQuote) {
          next = pos;
          quote = code === singleQuote ? "'" : '"';
          token = {
            type: "string",
            sourceIndex: pos,
            quote
          };
          do {
            escape = false;
            next = value.indexOf(quote, next + 1);
            if (~next) {
              escapePos = next;
              while (value.charCodeAt(escapePos - 1) === backslash) {
                escapePos -= 1;
                escape = !escape;
              }
            } else {
              value += quote;
              next = value.length - 1;
              token.unclosed = true;
            }
          } while (escape);
          token.value = value.slice(pos + 1, next);
          token.sourceEndIndex = token.unclosed ? next : next + 1;
          tokens.push(token);
          pos = next + 1;
          code = value.charCodeAt(pos);
        } else if (code === slash && value.charCodeAt(pos + 1) === star) {
          next = value.indexOf("*/", pos);
          token = {
            type: "comment",
            sourceIndex: pos,
            sourceEndIndex: next + 2
          };
          if (next === -1) {
            token.unclosed = true;
            next = value.length;
            token.sourceEndIndex = next;
          }
          token.value = value.slice(pos + 2, next);
          tokens.push(token);
          pos = next + 2;
          code = value.charCodeAt(pos);
        } else if ((code === slash || code === star) && parent && parent.type === "function" && parent.value === "calc") {
          token = value[pos];
          tokens.push({
            type: "word",
            sourceIndex: pos - before.length,
            sourceEndIndex: pos + token.length,
            value: token
          });
          pos += 1;
          code = value.charCodeAt(pos);
        } else if (code === slash || code === comma || code === colon) {
          token = value[pos];
          tokens.push({
            type: "div",
            sourceIndex: pos - before.length,
            sourceEndIndex: pos + token.length,
            value: token,
            before,
            after: ""
          });
          before = "";
          pos += 1;
          code = value.charCodeAt(pos);
        } else if (openParentheses === code) {
          next = pos;
          do {
            next += 1;
            code = value.charCodeAt(next);
          } while (code <= 32);
          parenthesesOpenPos = pos;
          token = {
            type: "function",
            sourceIndex: pos - name.length,
            value: name,
            before: value.slice(parenthesesOpenPos + 1, next)
          };
          pos = next;
          if (name === "url" && code !== singleQuote && code !== doubleQuote) {
            next -= 1;
            do {
              escape = false;
              next = value.indexOf(")", next + 1);
              if (~next) {
                escapePos = next;
                while (value.charCodeAt(escapePos - 1) === backslash) {
                  escapePos -= 1;
                  escape = !escape;
                }
              } else {
                value += ")";
                next = value.length - 1;
                token.unclosed = true;
              }
            } while (escape);
            whitespacePos = next;
            do {
              whitespacePos -= 1;
              code = value.charCodeAt(whitespacePos);
            } while (code <= 32);
            if (parenthesesOpenPos < whitespacePos) {
              if (pos !== whitespacePos + 1) {
                token.nodes = [
                  {
                    type: "word",
                    sourceIndex: pos,
                    sourceEndIndex: whitespacePos + 1,
                    value: value.slice(pos, whitespacePos + 1)
                  }
                ];
              } else {
                token.nodes = [];
              }
              if (token.unclosed && whitespacePos + 1 !== next) {
                token.after = "";
                token.nodes.push({
                  type: "space",
                  sourceIndex: whitespacePos + 1,
                  sourceEndIndex: next,
                  value: value.slice(whitespacePos + 1, next)
                });
              } else {
                token.after = value.slice(whitespacePos + 1, next);
                token.sourceEndIndex = next;
              }
            } else {
              token.after = "";
              token.nodes = [];
            }
            pos = next + 1;
            token.sourceEndIndex = token.unclosed ? next : pos;
            code = value.charCodeAt(pos);
            tokens.push(token);
          } else {
            balanced += 1;
            token.after = "";
            token.sourceEndIndex = pos + 1;
            tokens.push(token);
            stack.push(token);
            tokens = token.nodes = [];
            parent = token;
          }
          name = "";
        } else if (closeParentheses === code && balanced) {
          pos += 1;
          code = value.charCodeAt(pos);
          parent.after = after;
          parent.sourceEndIndex += after.length;
          after = "";
          balanced -= 1;
          stack[stack.length - 1].sourceEndIndex = pos;
          stack.pop();
          parent = stack[balanced];
          tokens = parent.nodes;
        } else {
          next = pos;
          do {
            if (code === backslash) {
              next += 1;
            }
            next += 1;
            code = value.charCodeAt(next);
          } while (next < max && !(code <= 32 || code === singleQuote || code === doubleQuote || code === comma || code === colon || code === slash || code === openParentheses || code === star && parent && parent.type === "function" && parent.value === "calc" || code === slash && parent.type === "function" && parent.value === "calc" || code === closeParentheses && balanced));
          token = value.slice(pos, next);
          if (openParentheses === code) {
            name = token;
          } else if ((uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) && plus === token.charCodeAt(1) && isUnicodeRange.test(token.slice(2))) {
            tokens.push({
              type: "unicode-range",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          } else {
            tokens.push({
              type: "word",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          }
          pos = next;
        }
      }
      for (pos = stack.length - 1; pos; pos -= 1) {
        stack[pos].unclosed = true;
        stack[pos].sourceEndIndex = value.length;
      }
      return stack[0].nodes;
    };
  }
});

// node_modules/postcss-value-parser/lib/walk.js
var require_walk = __commonJS({
  "node_modules/postcss-value-parser/lib/walk.js"(exports, module) {
    "use strict";
    module.exports = function walk(nodes, cb, bubble) {
      var i, max, node, result;
      for (i = 0, max = nodes.length; i < max; i += 1) {
        node = nodes[i];
        if (!bubble) {
          result = cb(node, i, nodes);
        }
        if (result !== false && node.type === "function" && Array.isArray(node.nodes)) {
          walk(node.nodes, cb, bubble);
        }
        if (bubble) {
          cb(node, i, nodes);
        }
      }
    };
  }
});

// node_modules/postcss-value-parser/lib/stringify.js
var require_stringify2 = __commonJS({
  "node_modules/postcss-value-parser/lib/stringify.js"(exports, module) {
    "use strict";
    function stringifyNode(node, custom) {
      var type = node.type;
      var value = node.value;
      var buf;
      var customResult;
      if (custom && (customResult = custom(node)) !== void 0) {
        return customResult;
      } else if (type === "word" || type === "space") {
        return value;
      } else if (type === "string") {
        buf = node.quote || "";
        return buf + value + (node.unclosed ? "" : buf);
      } else if (type === "comment") {
        return "/*" + value + (node.unclosed ? "" : "*/");
      } else if (type === "div") {
        return (node.before || "") + value + (node.after || "");
      } else if (Array.isArray(node.nodes)) {
        buf = stringify(node.nodes, custom);
        if (type !== "function") {
          return buf;
        }
        return value + "(" + (node.before || "") + buf + (node.after || "") + (node.unclosed ? "" : ")");
      }
      return value;
    }
    function stringify(nodes, custom) {
      var result, i;
      if (Array.isArray(nodes)) {
        result = "";
        for (i = nodes.length - 1; ~i; i -= 1) {
          result = stringifyNode(nodes[i], custom) + result;
        }
        return result;
      }
      return stringifyNode(nodes, custom);
    }
    module.exports = stringify;
  }
});

// node_modules/postcss-value-parser/lib/unit.js
var require_unit = __commonJS({
  "node_modules/postcss-value-parser/lib/unit.js"(exports, module) {
    "use strict";
    var minus = "-".charCodeAt(0);
    var plus = "+".charCodeAt(0);
    var dot = ".".charCodeAt(0);
    var exp = "e".charCodeAt(0);
    var EXP = "E".charCodeAt(0);
    function likeNumber(value) {
      var code = value.charCodeAt(0);
      var nextCode;
      if (code === plus || code === minus) {
        nextCode = value.charCodeAt(1);
        if (nextCode >= 48 && nextCode <= 57) {
          return true;
        }
        var nextNextCode = value.charCodeAt(2);
        if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) {
          return true;
        }
        return false;
      }
      if (code === dot) {
        nextCode = value.charCodeAt(1);
        if (nextCode >= 48 && nextCode <= 57) {
          return true;
        }
        return false;
      }
      if (code >= 48 && code <= 57) {
        return true;
      }
      return false;
    }
    module.exports = function(value) {
      var pos = 0;
      var length = value.length;
      var code;
      var nextCode;
      var nextNextCode;
      if (length === 0 || !likeNumber(value)) {
        return false;
      }
      code = value.charCodeAt(pos);
      if (code === plus || code === minus) {
        pos++;
      }
      while (pos < length) {
        code = value.charCodeAt(pos);
        if (code < 48 || code > 57) {
          break;
        }
        pos += 1;
      }
      code = value.charCodeAt(pos);
      nextCode = value.charCodeAt(pos + 1);
      if (code === dot && nextCode >= 48 && nextCode <= 57) {
        pos += 2;
        while (pos < length) {
          code = value.charCodeAt(pos);
          if (code < 48 || code > 57) {
            break;
          }
          pos += 1;
        }
      }
      code = value.charCodeAt(pos);
      nextCode = value.charCodeAt(pos + 1);
      nextNextCode = value.charCodeAt(pos + 2);
      if ((code === exp || code === EXP) && (nextCode >= 48 && nextCode <= 57 || (nextCode === plus || nextCode === minus) && nextNextCode >= 48 && nextNextCode <= 57)) {
        pos += nextCode === plus || nextCode === minus ? 3 : 2;
        while (pos < length) {
          code = value.charCodeAt(pos);
          if (code < 48 || code > 57) {
            break;
          }
          pos += 1;
        }
      }
      return {
        number: value.slice(0, pos),
        unit: value.slice(pos)
      };
    };
  }
});

// node_modules/postcss-value-parser/lib/index.js
var require_lib = __commonJS({
  "node_modules/postcss-value-parser/lib/index.js"(exports, module) {
    "use strict";
    var parse = require_parse2();
    var walk = require_walk();
    var stringify = require_stringify2();
    function ValueParser(value) {
      if (this instanceof ValueParser) {
        this.nodes = parse(value);
        return this;
      }
      return new ValueParser(value);
    }
    ValueParser.prototype.toString = function() {
      return Array.isArray(this.nodes) ? stringify(this.nodes) : "";
    };
    ValueParser.prototype.walk = function(cb, bubble) {
      walk(this.nodes, cb, bubble);
      return this;
    };
    ValueParser.unit = require_unit();
    ValueParser.walk = walk;
    ValueParser.stringify = stringify;
    module.exports = ValueParser;
  }
});

// node_modules/postcss-import/lib/parse-statements.js
var require_parse_statements = __commonJS({
  "node_modules/postcss-import/lib/parse-statements.js"(exports, module) {
    "use strict";
    var valueParser = require_lib();
    var { stringify } = valueParser;
    function split(params, start) {
      const list = [];
      const last = params.reduce((item, node, index) => {
        if (index < start) return "";
        if (node.type === "div" && node.value === ",") {
          list.push(item);
          return "";
        }
        return item + stringify(node);
      }, "");
      list.push(last);
      return list;
    }
    module.exports = function(result, styles) {
      const statements = [];
      let nodes = [];
      styles.each((node) => {
        let stmt;
        if (node.type === "atrule") {
          if (node.name === "import") stmt = parseImport(result, node);
          else if (node.name === "media") stmt = parseMedia(result, node);
          else if (node.name === "charset") stmt = parseCharset(result, node);
        }
        if (stmt) {
          if (nodes.length) {
            statements.push({
              type: "nodes",
              nodes,
              media: [],
              layer: []
            });
            nodes = [];
          }
          statements.push(stmt);
        } else nodes.push(node);
      });
      if (nodes.length) {
        statements.push({
          type: "nodes",
          nodes,
          media: [],
          layer: []
        });
      }
      return statements;
    };
    function parseMedia(result, atRule) {
      const params = valueParser(atRule.params).nodes;
      return {
        type: "media",
        node: atRule,
        media: split(params, 0),
        layer: []
      };
    }
    function parseCharset(result, atRule) {
      if (atRule.prev()) {
        return result.warn("@charset must precede all other statements", {
          node: atRule
        });
      }
      return {
        type: "charset",
        node: atRule,
        media: [],
        layer: []
      };
    }
    function parseImport(result, atRule) {
      let prev = atRule.prev();
      if (prev) {
        do {
          if (prev.type !== "comment" && (prev.type !== "atrule" || prev.name !== "import" && prev.name !== "charset" && !(prev.name === "layer" && !prev.nodes))) {
            return result.warn(
              "@import must precede all other statements (besides @charset or empty @layer)",
              { node: atRule }
            );
          }
          prev = prev.prev();
        } while (prev);
      }
      if (atRule.nodes) {
        return result.warn(
          "It looks like you didn't end your @import statement correctly. Child nodes are attached to it.",
          { node: atRule }
        );
      }
      const params = valueParser(atRule.params).nodes;
      const stmt = {
        type: "import",
        node: atRule,
        media: [],
        layer: []
      };
      if (!params.length || (params[0].type !== "string" || !params[0].value) && (params[0].type !== "function" || params[0].value !== "url" || !params[0].nodes.length || !params[0].nodes[0].value)) {
        return result.warn(`Unable to find uri in '${atRule.toString()}'`, {
          node: atRule
        });
      }
      if (params[0].type === "string") stmt.uri = params[0].value;
      else stmt.uri = params[0].nodes[0].value;
      stmt.fullUri = stringify(params[0]);
      let remainder = params;
      if (remainder.length > 2) {
        if ((remainder[2].type === "word" || remainder[2].type === "function") && remainder[2].value === "layer") {
          if (remainder[1].type !== "space") {
            return result.warn("Invalid import layer statement", { node: atRule });
          }
          if (remainder[2].nodes) {
            stmt.layer = [stringify(remainder[2].nodes)];
          } else {
            stmt.layer = [""];
          }
          remainder = remainder.slice(2);
        }
      }
      if (remainder.length > 2) {
        if (remainder[1].type !== "space") {
          return result.warn("Invalid import media statement", { node: atRule });
        }
        stmt.media = split(remainder, 2);
      }
      return stmt;
    }
  }
});

// node_modules/postcss-import/lib/assign-layer-names.js
var require_assign_layer_names = __commonJS({
  "node_modules/postcss-import/lib/assign-layer-names.js"(exports, module) {
    "use strict";
    module.exports = function(layer, node, state, options) {
      layer.forEach((layerPart, i) => {
        if (layerPart.trim() === "") {
          if (options.nameLayer) {
            layer[i] = options.nameLayer(state.anonymousLayerCounter++, state.rootFilename).toString();
          } else {
            throw node.error(
              `When using anonymous layers in @import you must also set the "nameLayer" plugin option`
            );
          }
        }
      });
    };
  }
});

// node_modules/postcss-import/index.js
var require_postcss_import = __commonJS({
  "node_modules/postcss-import/index.js"(exports, module) {
    "use strict";
    var path3 = __require("path");
    var joinMedia = require_join_media();
    var joinLayer = require_join_layer();
    var resolveId = require_resolve_id();
    var loadContent = require_load_content();
    var processContent = require_process_content();
    var parseStatements = require_parse_statements();
    var assignLayerNames = require_assign_layer_names();
    var dataURL = require_data_url();
    function AtImport(options) {
      options = {
        root: process.cwd(),
        path: [],
        skipDuplicates: true,
        resolve: resolveId,
        load: loadContent,
        plugins: [],
        addModulesDirectories: [],
        nameLayer: null,
        ...options
      };
      options.root = path3.resolve(options.root);
      if (typeof options.path === "string") options.path = [options.path];
      if (!Array.isArray(options.path)) options.path = [];
      options.path = options.path.map((p) => path3.resolve(options.root, p));
      return {
        postcssPlugin: "postcss-import",
        Once(styles, { result, atRule, postcss: postcss2 }) {
          const state = {
            importedFiles: {},
            hashFiles: {},
            rootFilename: null,
            anonymousLayerCounter: 0
          };
          if (styles.source?.input?.file) {
            state.rootFilename = styles.source.input.file;
            state.importedFiles[styles.source.input.file] = {};
          }
          if (options.plugins && !Array.isArray(options.plugins)) {
            throw new Error("plugins option must be an array");
          }
          if (options.nameLayer && typeof options.nameLayer !== "function") {
            throw new Error("nameLayer option must be a function");
          }
          return parseStyles(result, styles, options, state, [], []).then(
            (bundle) => {
              applyRaws(bundle);
              applyMedia(bundle);
              applyStyles(bundle, styles);
            }
          );
          function applyRaws(bundle) {
            bundle.forEach((stmt, index) => {
              if (index === 0) return;
              if (stmt.parent) {
                const { before } = stmt.parent.node.raws;
                if (stmt.type === "nodes") stmt.nodes[0].raws.before = before;
                else stmt.node.raws.before = before;
              } else if (stmt.type === "nodes") {
                stmt.nodes[0].raws.before = stmt.nodes[0].raws.before || "\n";
              }
            });
          }
          function applyMedia(bundle) {
            bundle.forEach((stmt) => {
              if (!stmt.media.length && !stmt.layer.length || stmt.type === "charset") {
                return;
              }
              if (stmt.layer.length > 1) {
                assignLayerNames(stmt.layer, stmt.node, state, options);
              }
              if (stmt.type === "import") {
                const parts = [stmt.fullUri];
                const media = stmt.media.join(", ");
                if (stmt.layer.length) {
                  const layerName = stmt.layer.join(".");
                  let layerParams = "layer";
                  if (layerName) {
                    layerParams = `layer(${layerName})`;
                  }
                  parts.push(layerParams);
                }
                if (media) {
                  parts.push(media);
                }
                stmt.node.params = parts.join(" ");
              } else if (stmt.type === "media") {
                if (stmt.layer.length) {
                  const layerNode = atRule({
                    name: "layer",
                    params: stmt.layer.join("."),
                    source: stmt.node.source
                  });
                  if (stmt.parentMedia?.length) {
                    const mediaNode = atRule({
                      name: "media",
                      params: stmt.parentMedia.join(", "),
                      source: stmt.node.source
                    });
                    mediaNode.append(layerNode);
                    layerNode.append(stmt.node);
                    stmt.node = mediaNode;
                  } else {
                    layerNode.append(stmt.node);
                    stmt.node = layerNode;
                  }
                } else {
                  stmt.node.params = stmt.media.join(", ");
                }
              } else {
                const { nodes } = stmt;
                const { parent } = nodes[0];
                let outerAtRule;
                let innerAtRule;
                if (stmt.media.length && stmt.layer.length) {
                  const mediaNode = atRule({
                    name: "media",
                    params: stmt.media.join(", "),
                    source: parent.source
                  });
                  const layerNode = atRule({
                    name: "layer",
                    params: stmt.layer.join("."),
                    source: parent.source
                  });
                  mediaNode.append(layerNode);
                  innerAtRule = layerNode;
                  outerAtRule = mediaNode;
                } else if (stmt.media.length) {
                  const mediaNode = atRule({
                    name: "media",
                    params: stmt.media.join(", "),
                    source: parent.source
                  });
                  innerAtRule = mediaNode;
                  outerAtRule = mediaNode;
                } else if (stmt.layer.length) {
                  const layerNode = atRule({
                    name: "layer",
                    params: stmt.layer.join("."),
                    source: parent.source
                  });
                  innerAtRule = layerNode;
                  outerAtRule = layerNode;
                }
                parent.insertBefore(nodes[0], outerAtRule);
                nodes.forEach((node) => {
                  node.parent = void 0;
                });
                nodes[0].raws.before = nodes[0].raws.before || "\n";
                innerAtRule.append(nodes);
                stmt.type = "media";
                stmt.node = outerAtRule;
                delete stmt.nodes;
              }
            });
          }
          function applyStyles(bundle, styles2) {
            styles2.nodes = [];
            bundle.forEach((stmt) => {
              if (["charset", "import", "media"].includes(stmt.type)) {
                stmt.node.parent = void 0;
                styles2.append(stmt.node);
              } else if (stmt.type === "nodes") {
                stmt.nodes.forEach((node) => {
                  node.parent = void 0;
                  styles2.append(node);
                });
              }
            });
          }
          function parseStyles(result2, styles2, options2, state2, media, layer) {
            const statements = parseStatements(result2, styles2);
            return Promise.resolve(statements).then((stmts) => {
              return stmts.reduce((promise, stmt) => {
                return promise.then(() => {
                  stmt.media = joinMedia(media, stmt.media || []);
                  stmt.parentMedia = media;
                  stmt.layer = joinLayer(layer, stmt.layer || []);
                  if (stmt.type !== "import" || /^(?:[a-z]+:)?\/\//i.test(stmt.uri)) {
                    return;
                  }
                  if (options2.filter && !options2.filter(stmt.uri)) {
                    return;
                  }
                  return resolveImportId(result2, stmt, options2, state2);
                });
              }, Promise.resolve());
            }).then(() => {
              let charset;
              const imports = [];
              const bundle = [];
              function handleCharset(stmt) {
                if (!charset) charset = stmt;
                else if (stmt.node.params.toLowerCase() !== charset.node.params.toLowerCase()) {
                  throw new Error(
                    `Incompatable @charset statements:
  ${stmt.node.params} specified in ${stmt.node.source.input.file}
  ${charset.node.params} specified in ${charset.node.source.input.file}`
                  );
                }
              }
              statements.forEach((stmt) => {
                if (stmt.type === "charset") handleCharset(stmt);
                else if (stmt.type === "import") {
                  if (stmt.children) {
                    stmt.children.forEach((child, index) => {
                      if (child.type === "import") imports.push(child);
                      else if (child.type === "charset") handleCharset(child);
                      else bundle.push(child);
                      if (index === 0) child.parent = stmt;
                    });
                  } else imports.push(stmt);
                } else if (stmt.type === "media" || stmt.type === "nodes") {
                  bundle.push(stmt);
                }
              });
              return charset ? [charset, ...imports.concat(bundle)] : imports.concat(bundle);
            });
          }
          function resolveImportId(result2, stmt, options2, state2) {
            if (dataURL.isValid(stmt.uri)) {
              return loadImportContent(result2, stmt, stmt.uri, options2, state2).then(
                (result3) => {
                  stmt.children = result3;
                }
              );
            }
            const atRule2 = stmt.node;
            let sourceFile;
            if (atRule2.source?.input?.file) {
              sourceFile = atRule2.source.input.file;
            }
            const base = sourceFile ? path3.dirname(atRule2.source.input.file) : options2.root;
            return Promise.resolve(options2.resolve(stmt.uri, base, options2)).then((paths) => {
              if (!Array.isArray(paths)) paths = [paths];
              return Promise.all(
                paths.map((file) => {
                  return !path3.isAbsolute(file) ? resolveId(file, base, options2) : file;
                })
              );
            }).then((resolved) => {
              resolved.forEach((file) => {
                result2.messages.push({
                  type: "dependency",
                  plugin: "postcss-import",
                  file,
                  parent: sourceFile
                });
              });
              return Promise.all(
                resolved.map((file) => {
                  return loadImportContent(result2, stmt, file, options2, state2);
                })
              );
            }).then((result3) => {
              stmt.children = result3.reduce((result4, statements) => {
                return statements ? result4.concat(statements) : result4;
              }, []);
            });
          }
          function loadImportContent(result2, stmt, filename, options2, state2) {
            const atRule2 = stmt.node;
            const { media, layer } = stmt;
            assignLayerNames(layer, atRule2, state2, options2);
            if (options2.skipDuplicates) {
              if (state2.importedFiles[filename]?.[media]?.[layer]) {
                return;
              }
              if (!state2.importedFiles[filename]) {
                state2.importedFiles[filename] = {};
              }
              if (!state2.importedFiles[filename][media]) {
                state2.importedFiles[filename][media] = {};
              }
              state2.importedFiles[filename][media][layer] = true;
            }
            return Promise.resolve(options2.load(filename, options2)).then(
              (content) => {
                if (content.trim() === "") {
                  result2.warn(`${filename} is empty`, { node: atRule2 });
                  return;
                }
                if (state2.hashFiles[content]?.[media]?.[layer]) {
                  return;
                }
                return processContent(
                  result2,
                  content,
                  filename,
                  options2,
                  postcss2
                ).then((importedResult) => {
                  const styles2 = importedResult.root;
                  result2.messages = result2.messages.concat(importedResult.messages);
                  if (options2.skipDuplicates) {
                    const hasImport = styles2.some((child) => {
                      return child.type === "atrule" && child.name === "import";
                    });
                    if (!hasImport) {
                      if (!state2.hashFiles[content]) {
                        state2.hashFiles[content] = {};
                      }
                      if (!state2.hashFiles[content][media]) {
                        state2.hashFiles[content][media] = {};
                      }
                      state2.hashFiles[content][media][layer] = true;
                    }
                  }
                  return parseStyles(result2, styles2, options2, state2, media, layer);
                });
              }
            );
          }
        }
      };
    }
    AtImport.postcss = true;
    module.exports = AtImport;
  }
});

// src/index.ts
import path2 from "node:path";
import fs from "node:fs";
import { fileURLToPath as fileURLToPath2 } from "node:url";
import merge from "lodash.merge";
import { createUnplugin } from "unplugin";

// src/core/configs/postcss.config.mjs
import path from "node:path";
import { fileURLToPath } from "node:url";
var dirname;
try {
  dirname = __dirname;
} catch (_) {
  console.log(import.meta.url);
  const filename = fileURLToPath(import.meta.url);
  dirname = path.dirname(filename);
}
var postcss_config_default = {
  plugins: {
    "postcss-import": {},
    "postcss-mixins": {},
    "tailwindcss/nesting": {},
    "tailwindcss": {
      config: path.resolve(`${dirname}/configs/tailwind.config.ts`)
    },
    "postcss-inline-svg": {},
    "postcss-hexrgba": {
      colorFunctionNotation: "modern",
      transformToBareValue: true
    },
    "cssnano": {
      preset: "default"
    }
  }
};

// src/index.ts
import postcss from "postcss";
import unpluginIcons from "unplugin-icons";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
var dirname2;
try {
  dirname2 = __dirname;
} catch (_) {
  const filename = fileURLToPath2(import.meta.url);
  dirname2 = path2.dirname(filename);
}
var MODULE_PATH = dirname2;
var MODULE_ALIAS = /(['"(])@kanton-basel-stadt\/designsystem/g;
var ICON_PATH_ALIAS = /(['"(])@kanton-basel-stadt\/designsystem\/icons\/symbol/g;
var ICON_PATH = "~icons/symbol";
var ASSETS_PATH = path2.resolve(`${dirname2}/assets/`);
var CONFIGS_PATH = path2.resolve(`${dirname2}/configs/`);
var unpluginIconsConfig = {
  customCollections: {
    symbol: FileSystemIconLoader(`${ASSETS_PATH}/symbols`)
  },
  compiler: "web-components",
  webComponents: {
    autoDefine: true
  }
};
var builtUnpluginIcons = unpluginIcons;
if ("default" in unpluginIcons)
  builtUnpluginIcons = unpluginIcons.default;
var unpluginFactory = (options, meta) => {
  if (options === void 0)
    options = {};
  function transform(code) {
    return code.replace(ICON_PATH_ALIAS, `$1${ICON_PATH}`).replace(MODULE_ALIAS, `$1${MODULE_PATH}`).replace(/dist\/dist/g, "dist").replace(/@@kanton-basel-stadt/g, "@kanton-basel-stadt");
  }
  const mergedUnpluginIconsConfig = merge(unpluginIconsConfig, options.iconOptions);
  if (mergedUnpluginIconsConfig.compiler !== "web-components")
    delete mergedUnpluginIconsConfig.webComponents;
  return [
    builtUnpluginIcons.raw(mergedUnpluginIconsConfig, meta),
    {
      name: "@kanton-basel-stadt/designsystem/transform-ids",
      enforce: "pre",
      transform,
      esbuild: {
        onLoadFilter: /\.(?!woff|woff2$)[^.]+$/i
      }
    },
    {
      name: "@kanton-basel-stadt/designsystem/postcss-tailwind",
      esbuild: {
        setup(build) {
          build.onTransform;
          build.onLoad({ filter: /\.woff2?$/i }, () => {
            return { loader: "copy" };
          });
          build.onLoad({ filter: /\.css$/i }, async (args) => {
            const contents = transform(fs.readFileSync(args.path, "utf-8"));
            const postcssImport = require_postcss_import();
            const postcssMixins = __require("postcss-mixins");
            const tailwindNesting = __require("tailwindcss/nesting");
            const tailwindcss = __require("tailwindcss");
            const postcssHexRgba = __require("postcss-hexrgba");
            const cssnano = __require("cssnano");
            const postcssInstance = postcss([
              postcssImport(),
              postcssMixins(),
              tailwindNesting(),
              tailwindcss({
                config: tailwind_config_default
              }),
              postcssHexRgba({
                colorFunctionNotation: "modern",
                transformToBareValue: true
              }),
              cssnano({
                preset: "default"
              })
            ]);
            const transformed = await postcssInstance.process(contents, {
              from: args.path,
              map: {
                absolute: true,
                from: args.path
              }
            });
            return { contents: transformed.content, loader: "css" };
          });
        }
      },
      webpack(compiler) {
        const MiniCssExtractPlugin = __require("mini-css-extract-plugin");
        if (compiler.options.mode === "production") {
          new MiniCssExtractPlugin({
            filename: "app.css"
          }).apply(compiler);
        }
        compiler.options.module.rules.unshift({
          test(value) {
            return value.endsWith(".css");
          },
          use: [
            compiler.options.mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: postcss_config_default
              }
            }
          ]
        });
      },
      rollup: {
        async options(rollupOptions) {
          const postcss2 = (await import("rollup-plugin-postcss")).default;
          if (!rollupOptions.plugins)
            rollupOptions.plugins = [];
          const postcssImport = require_postcss_import();
          const postcssMixins = __require("postcss-mixins");
          const tailwindNesting = __require("tailwindcss/nesting");
          const tailwindcss = __require("tailwindcss");
          const postcssHexRgba = __require("postcss-hexrgba");
          const cssnano = __require("cssnano");
          const url = __require("postcss-url");
          const plugins = [
            postcssImport(),
            postcssMixins(),
            tailwindNesting(),
            tailwindcss({
              config: tailwind_config_default
            }),
            postcssHexRgba({
              colorFunctionNotation: "modern",
              transformToBareValue: true
            }),
            cssnano({
              preset: "default"
            }),
            url({
              url: "copy",
              basePath: path2.resolve(`${ASSETS_PATH}/../../../../`),
              assetsPath: options.tailwindOptions?.targetDir || "dist",
              useHash: true,
              maxSize: Number.POSITIVE_INFINITY
            })
          ];
          if (Array.isArray(rollupOptions.plugins)) {
            rollupOptions.plugins.unshift(postcss2({
              to: options.tailwindOptions?.targetDir || "dist",
              plugins
            }));
          }
          return rollupOptions;
        }
      },
      vite: {
        config(config) {
          if (!config.css) {
            config.css = {};
          }
          config.css.postcss = CONFIGS_PATH;
        }
      }
    }
  ];
};
var unplugin = /* @__PURE__ */ createUnplugin(unpluginFactory);
var src_default = unplugin;

export {
  unpluginFactory,
  unplugin,
  src_default
};
