<?php
if ( ! function_exists( 'theme_setup' ) ) :
	function theme_setup() {

		load_theme_textdomain( 'anomys', get_template_directory() . '/languages' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );

		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'anomys' ),
		) );

		add_image_size( 'example_size', 500, 500, true );
	}
endif;
add_action( 'after_setup_theme', 'theme_setup' );

function theme_scripts() {
	wp_enqueue_style( 'anomys-style', get_template_directory_uri() . '/dist/css/app.css' );
	wp_enqueue_script( 'anomys-js', get_template_directory_uri() . '/dist/js/app.js', array(), '2019011', true );

}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );

// include option pages
require get_template_directory() . '/inc/option_page.php';

// include custom post types
require get_template_directory() . '/inc/custom_post_types.php';
