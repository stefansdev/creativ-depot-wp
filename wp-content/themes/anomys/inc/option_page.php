<?php
if( function_exists('acf_add_options_page') ) {

	// add parent
	$parent = acf_add_options_page(array(
		'page_title' 	=> 'General Settings',
		'menu_title' 	=> 'General Settings',
		'redirect' 		=> false
	));

    // add child 
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Social Networks',
		'menu_title'	=> 'Social Networks',
		'parent_slug' 	=> $parent['menu_slug'],
	));

}
?>
