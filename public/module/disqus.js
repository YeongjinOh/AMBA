/**
 * Created by JiSoo on 2016-10-12.
 */

(function () {
    module.disqus = {
        load: function (sector, title) {
            return $('<script></script>').attr('type', 'text/javascript').text("\n" +
                "var disqus_config = function () {" + "\n" +
                "   this.page.identifier = amba;" + "\n" +
                "   this.page.url = '//amba.com/unique-path-" + sector + "/';" + "\n" +
                "   this.page.title = '" + title + "';" + "\n" +
                "};" + "\n" +
                "(function() {" + "\n" +
                "   var d = document, s = d.createElement('script');" + "\n" +
                "   s.src = '//amba.disqus.com/embed.js';" + "\n" +
                "   s.setAttribute('data-timestamp', +new Date());" + "\n" +
                "   (d.head || d.body).appendChild(s);" + "\n" +
                "})();"
            );
        }
    }
})();