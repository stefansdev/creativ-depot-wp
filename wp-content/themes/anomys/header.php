<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>


	<header>
		<nav>
			<?php 
				$args_menu = array(
					'menu' => 'main-menu',
					'container' => '',	
				);

				wp_nav_menu($args_menu);
			?>
		</nav>
	</header>