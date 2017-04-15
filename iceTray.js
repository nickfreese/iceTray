var iceTray = function() {
    
    this.complete = false;

    this.failed = []; //log failed requesy keys here

    this.isImage = function checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) != null);
    };
    this.isScript = function checkURL(url) {
        return(url.match(/\.(js)$/) != null);
    };
    this.isCss = function checkURL(url) {
        return(url.match(/\.(css)$/) != null);
    };
    
    this.chain = function(key) {

        //check dependancies
        var skipRequest = false;
        if (this.failed !== []) {
            for (i = 0; i < this.failed.length; i++) {

                if (this.requests[key].dependencies !== undefined && this.requests[key].dependencies.includes(this.failed[i])) {
                    skipRequest = true;
                }

            }
        }
        //load ajax content
        if (skipRequest == false && this.requests[key].placement == undefined && !this.isImage(this.requests[key].url) && !this.isScript(this.requests[key].url) && !this.isCss(this.requests[key].url)) {
            var request = this.requests[key];
            var _this = this;
            //set method option  
            if (request.method == undefined) {
                request.method = 'GET';
            }
            //set datatype
            if (request.responseType == undefined) {
                request.responseType = "";
            }

            var promise = new Promise(function(resolve, reject) {

                var iceAjax = new XMLHttpRequest();
                iceAjax.responseType = request.responseType;
                iceAjax.open('GET', request.url);
                iceAjax.onload = function() {
                    if (iceAjax.status == 200) {
                        resolve(iceAjax.response); // we got data here, so resolve the Promise
                    } else {
                        reject(Error(iceAjax.statusText)); // status is not 200 OK, so reject
                    }
                }
                iceAjax.onerror = function() {
                    reject(Error('Error fetching data.')); // error occurred, reject the  Promise
                };

                iceAjax.send(); //send the request

            });

            promise.then(function(data) {
                _this.requests[key].response = data;
                if (_this.requests[key].callback !== undefined) {
                    _this.requests[key].callback(data);
                }

                key = key + 1;
                if (_this.requests[key] !== undefined) {
                    _this.chain(key);
                }
            }, function(error) {

                _this.failed.push(key);
                key = key + 1;
                if (_this.requests[key] !== undefined) {
                    _this.chain(key);
                }

            });
        }
        //load image
        else if(skipRequest == false && this.isImage(this.requests[key].url)){
            
            var _this = this;
            var img = document.createElement('img');
            img.onload = function(){
                _this.requests[key].response = img;
                _this.requests[key].callback();
                key = key + 1;
                if (_this.requests[key] !== undefined) {
                    _this.chain(key);
                }
            }
            img.src = this.requests[key].url;
            
        }
        //load script
        else if (skipRequest == false && this.isScript(this.requests[key].url) && this.requests[key].placement !== undefined) {
            var _this = this;
            var script = document.createElement('script');
            script.onload = function() {
                _this.requests[key].callback();
                key = key + 1;
                if (_this.requests[key] !== undefined) {
                    _this.chain(key);
                }
            };
            script.src = this.requests[key].url;
            _this.requests[key].placement.appendChild(script);
        }
        //load css
        else if (skipRequest == false && this.isCss(this.requests[key].url) && this.requests[key].placement !== undefined) {
            var _this = this;
            var css = document.createElement('link');

            css.onload = function() {
                _this.requests[key].callback();
                key = key + 1;
                if (_this.requests[key] !== undefined) {
                    _this.chain(key);
                }

            };
            css.type = "text/css";
            css.rel = "stylesheet";
            css.href = this.requests[key].url;
            _this.requests[key].placement.appendChild(css);
        }
        //skip and push to failed
        else {
            this.failed.push(key);
            key = key + 1;
            if (this.requests[key] !== undefined) {
                this.chain(key);
            }
        }
    };
};