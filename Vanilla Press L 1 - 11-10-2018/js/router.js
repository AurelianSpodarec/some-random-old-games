/**
 * Router file for managing url changes
 */

/**
 * The main router object.
 *
 */

var router = {};

router.init = function() {

  router.loadContent();
  router.listenPageChange();

};

/**
 * Gets the slug from the URL
 *
 */
router.getSlug = function() {

  slug = window.location.hash;

  if( "" === slug ) {

    return null;

  } else {

    return slug.substr( 1 );

  }

};

/**
 * Gets the slug from the URL
 *
 * @return slug {string} Slug from URL
 */
router.listenPageChange = function() {

  window.addEventListener( 'hashchange', router.loadContent, false );

}

/**
 * Determines whether to load blog posts
 * or single post
 *
 */

router.loadContent = function() {

  var slug = router.getSlug();

  view.clearContent();

  if( null === slug ) {

    view.loadBlogPosts();

  } else {

    view.loadBlogPost( slug );

  }

}
