/**
 * Created by JiSoo on 2016-10-12.
 */

(function () {
    disqus_config = function () {
        this.page.identifier = 'amba';
        this.page.url = '//amba.com/unique-path-1/';
        this.page.title = 'amba';
    };
    (function() {
        var d = document, s = d.createElement('script');
        s.src = '//amba.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
})();