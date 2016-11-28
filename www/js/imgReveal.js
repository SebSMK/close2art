$.fn.masonryImagesReveal = function( $items ) {
  var msnry = this.data('masonry');
  var itemSelector = msnry.options.itemSelector;
  // hide by default
  $items.hide();
  // append to container
  this.append( $items );
  $items.imagesLoaded().progress( function( imgLoad, image ) {
    // get item
    // image is imagesLoaded class, not <img>, <img> is image.img
    var $item = $( image.img ).parents( itemSelector );
    // un-hide item
    $item.show();
    // masonry does its thing
    msnry.appended( $item );
  });
  
  return this;
};

function getItem() {  
  var rando = Math.ceil( Math.random() * 1000 );
  // random parameter to prevent cached images
  var src = "http://demoapi.smk.dk:8088/api/images/rand/" + rando + "?size=medium";
  
  var aEl  = document.createElement("div"); 
  aEl.setAttribute("class", "grid-item");                   
  var img = document.createElement("img");
  img.setAttribute("class", "grid-item-content");
  img.setAttribute("src", src);            
  aEl.appendChild(img);                     
  
  var item = aEl.outerHTML;
  return item;
}

function getItems() {
  var items = '';
  for ( var i=0; i < 12; i++ ) {
    items += getItem();
  }
  // return jQuery object
  return $( items );
}