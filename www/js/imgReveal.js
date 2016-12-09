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
    
    $item[0].addEventListener( 'click', function( event ) {        
      Instagram.share(event.target, "close2art", function (err) {
          var error = document.getElementById('error');
          if (err) {
              //alert("not shared: " + err);              
              error.innerHTML = err;
          } else {
              //alert("shared");
              error.innerHTML = "shared";
          }
      });    
    });
        
  });
  
  return this;
};