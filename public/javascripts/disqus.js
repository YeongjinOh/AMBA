/**
 * Created by JiSoo on 2016-10-12.
 */

var disqus_config = function () {
    this.page.identifier = amba;
    this.page.url = '//amba.com/unique-path-' + sector + '/';
    this.page.title = title;
};

(function() {
    var d = document, s = d.createElement('script');
    s.src = '//amba.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();