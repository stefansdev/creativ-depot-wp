<?php
// db local
define('DB_NAME', 'creativdepotwp');
define('DB_USER', 'root');
define('DB_PASSWORD', 'localhost');
define('DB_HOST', '127.0.0.1');

// other static db stuff
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

// salt keys - change once hosting changed (or not)
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');


$table_prefix  = 'wp_';

// debug mode
define('WP_DEBUG', true);
// enables uploading via wp-admin (for mac users with proper custom local setup)
define('FS_METHOD', 'direct');

if (!defined('ABSPATH'))
    define('ABSPATH', dirname(__FILE__) . '/');

require_once(ABSPATH . 'wp-settings.php');
