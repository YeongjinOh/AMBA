var AB = {
    module: {}
};
var module = {};

AB.random = function (max) {
    return parseInt(Math.random(max) * max);
};

/**
 * module명과 module이 정의된 javascript 파일 명이 같다고 가정합니다.
 * @author Yeongjin Oh
 */
AB.loadModule = function (name, callback) {
    if (module[name]) {
        callback(module[name]);
    } else {
        AB.loadScript('/module/' + name + '.js', function () {
            callback(module[name]);
        });
    }
};

AB.loadScript = function (url, callback, charset) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (charset != null) {
        script.charset = "utf-8";
    }
    var loaded = false;

    script.onreadystatechange = function () {
        if (this.readyState == 'loaded' || this.readyState == 'complete') {
            if (loaded) {
                return;
            }
            loaded = true;
            if (callback)
                callback();
        }
    };

    /**
     * Ajax로 소스를 불러와서 eval함수로 실행. 그 return값을 변수로 넣어 콜백으로 보냄.
     */
    script.onload = function () {
        if (callback)
            callback();
    };
    script.src = url;
    head.appendChild(script);

};

function Uploader(cid, files) {
    if (arguments.length === 0) {
        return this;
    }
    else if (arguments.length === 1) {
        files = arguments[0];
    }

    if (!Array.isArray(files) && files instanceof File) {
        files = [files];
    }

    this.cid = cid;
    this.files = files;

    return this;
}

Uploader.prototype.progress = function(fn) {
    this.fnProgress = fn;
    return this;
};

Uploader.prototype.complete = function(fn) {
    this.fnComplete = fn;
    return this;
};

Uploader.prototype.action = function() {
    var that = this;
    var i;
    var formData = new FormData();
    for (i = 0; i < this.files.length; i++) {
        formData.append('amba_file', this.files[i]);
    }

    $.ajax({
        url: '/fileupload/put',
        data: formData,
        processData: false,
        contentType: false,
        type: 'post',
        success: function (data) {
            if (that.fnComplete)
                that.fnComplete(data);
            // alert('Success\n' + JSON.stringify(data));
        },
        xhr: function () {
            var xhr = new window.XMLHttpRequest();

            if (that.fnProgress) {
                // Upload progress
                xhr.upload.addEventListener('progress', function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        that.fnProgress(percentComplete);
                    }
                }, false);
            }

            // // Download progress
            // xhr.addEventListener("progress", function(evt){
            //     if (evt.lengthComputable) {
            //         var percentComplete = evt.loaded / evt.total;
            //         // Do something with download progress
            //         console.log(percentComplete);
            //     }
            // }, false);

            return xhr;
        }
    });

    return this;
};

AB.uploader = function(cid, files) {
    return new Uploader(cid, files);
};

AB.getParameter = function (name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)    return undefined;
    else    return results[1];
};

/**
 * find amba object by Id
 */
AB.find = function (id) {
    if (!id)
        return undefined;

    if (!id.startsWith('#') && !id.startsWith('.'))
        id = '#' + id;
    return $(id).data('div');
};