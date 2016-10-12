/**
 * Created by JiSoo on 2016-10-12.
 */

/**
 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
 */

// var disqus_shortname = 'soma-amba';
//
// var disqus_config = function () {
//     this.page.url = 'http://soma-amba.com/unique-path-1.html';
//     this.page.identifier = 'ambaid1';
//     this.page.title = 'AMBA_DISQUS';
// };
//
// (function() {
//     var d = document, s = d.createElement('script');
//
//     s.src = '//soma-amba.disqus.com/embed.js';
//
//     s.setAttribute('data-timestamp', +new Date());
//     // (d.head[0] || d.body[0]).appendChild(s);
//     var root = div().append();
//     console.log(s);
// })();

// /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
// var disqus_shortname = 'example';
// var disqus_identifier = 'newid1';
// var disqus_url = 'http://example.com/unique-path-to-article-1/';
// var disqus_config = function () {
//     this.language = "en";
// };
// /* * * DON'T EDIT BELOW THIS LINE * * */
// (function() {
//     var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
//     dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
//     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
// })();

var root = div().append().size('100%', '100%').color('red');
var disqus = div().appendTo(root).displayBlock().size(800, 800).margin('auto').marginTop(100).color('white').disqus();