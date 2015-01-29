inlineSlides = {
// CSS classes
slideClass : 'slides',
dynamicSlideClass : 'dynslides',
showClass : 'show',
slideCounterClass : 'slidecounter',
hideLinkClass : 'hide',
// Labels
// Forward and backward links, you can use any HTML here
forwardsLabel : '<img src="control_fastforward_blue.png" alt="next"> ',
backwardsLabel : '<img src="control_rewind_blue.png" alt="previous">',
// Counter text, # will be replaced by the current image count
// and % by the number of all pictures
counterLabel : '# of %',
init : function() {
if( !document.getElementById || !document.createTextNode ) {
return;
}
var uls = document.getElementsByTagName('ul');
for( var i = 0; i < uls.length; i++ ) {
if( !DOMhelp.cssjs('check', uls[i],inlineSlides.slideClass ) ) {
continue;
}
DOMhelp.cssjs('swap', uls[i], inlineSlides.slideClass, inlineSlides.dynamicSlideClass );
uls[i].currentSlide = 0;
inlineSlides.initSlideShow( uls[i] );
}
},
initSlideShow : function(lst ) {
var p, temp, count;
p = document.createElement('p');
DOMhelp.cssjs('add', p, inlineSlides.slideCounterClass );
lst.parentNode.insertBefore( p, lst.nextSibling );
lst.rew = DOMhelp.createLink('#', ' ' );
lst.rew.innerHTML = inlineSlides.backwardsLabel;
DOMhelp.addEvent(lst.rew, 'click', inlineSlides.showSlide, false );
DOMhelp.cssjs('add', lst.rew, inlineSlides.hideLinkClass );
p.appendChild(lst.rew );
lst.count = document.createElement('span');
temp = inlineSlides.counterLabel._
replace( /#/, lst.currentSlide + 1 );
temp = temp.replace( /%/, o.getElementsByTagName('li').length );
lst.count.appendChild( document.createTextNode( temp ) );
p.appendChild(lst.count );
lst.fwd=DOMhelp.createLink('#', ' ' );
lst.fwd.innerHTML = inlineSlides.forwardsLabel;
DOMhelp.addEvent(lst.fwd, 'click', inlineSlides.showSlide, false );
p.appendChild(lst.fwd );
temp = lst.getElementsByTagName('li')[ lst.currentSlide];
DOMhelp.cssjs('add', temp,inlineSlides.showClass );
lst.fwd.onclick = DOMhelp.safariClickFix;
lst.rew.onclick = DOMhelp.safariClickFix;
},
showSlide : function( e ) {
var action;
var t = DOMhelp.getTarget( e );
while( t.nodeName.toLowerCase() != 'a && t.nodeName.toLowerCase() != 'body' ) {
t = t.parentNode;
}
if( DOMhelp.cssjs('check', t,_inlineSlides.hideLinkClass ) ){
return;
}
var parentList = DOMhelp.closestSibling( t.parentNode, -1 );
var count = parentList.currentSlide;
var photoCount = parentList.getElementsByTagName('li').length-1;
var photo = parentList.getElementsByTagName('li' )[count];
DOMhelp.cssjs('remove', photo, inlineSlides.showClass );
count = ( t == parentList.fwd ) ? count + 1 : count - 1;
action = ( count > 0 ) ? 'remove' : 'add' ;
DOMhelp.cssjs( action, parentList.rew, inlineSlides.hideLinkClass );
action = ( count < photoCount ) ? 'remove' : 'add';
DOMhelp.cssjs( action, parentList.fwd,inlineSlides.hideLinkClass );
photo = parentList.getElementsByTagName('li')[count];
var counterText = parentList.count.firstChild
counterText.nodeValue = counterText.nodeValue.replace( /\d/, count + 1 );
parentList.currentSlide = count;
DOMhelp.cssjs('add', photo, inlineSlides.showClass );
DOMhelp.cancelClick( e );
}
}
DOMhelp.addEvent( window, 'load', inlineSlides.init, false );