var AB = {};
var module = {};

AB.random = function(max) {
	return parseInt(Math.random(max)*max);
};

/**
 * module명과 module이 정의된 javascript 파일 명이 같다고 가정합니다.
 * @author Yeongjin Oh
 */
AB.loadModule = function(name, callback) {
    if(module[name]) {
        callback(module[name]);
    } else {
        AB.loadScript('/module/'+name+'.js', function(){
            callback(module[name]);
        });
    }
}

AB.loadScript = function(url, callback, charset) {
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    if (charset != null) {
        script.charset = "utf-8";
    }
    var loaded = false;
    
    script.onreadystatechange= function () {
        if (this.readyState == 'loaded' || this.readyState == 'complete') {
            if (loaded) {
                return;
            }
            loaded = true;
            if(callback)
                callback();
        }
    }
    script.onload = function () {
        if(callback)
            callback();
    }
    script.src = url;
    head.appendChild(script);

};

AB.getParameter = function( name ) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href ); 
	if( results == null )    return undefined;
	else    return results[1];
}
