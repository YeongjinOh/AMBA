/**
 * Created by JiSoo on 2016-11-05.
 */

require(['ABSanimation'], function (ABSanimation) {

    var root = div().append().displayBlock().margin('auto').size(250, 600).color('#cccccc');
    // ABSanimation.init([], []); // slideQueue, animationQueue
    ABSanimation.init(root);
    ABSanimation.append();
});