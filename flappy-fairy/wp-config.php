<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_test' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '+nK#VeJ8x_-McU.N,m>0u]u7IsW%Y4S|w}|HKED/aXvLjnVccGDenZjG,3As*N|N' );
define( 'SECURE_AUTH_KEY',  '[or1|9$ $t{2J.P]fVYzH9exY^H)4RS3ptxFJ@/q1p$JS&Fx/n8VvcO~3`&)j;bu' );
define( 'LOGGED_IN_KEY',    ',d12diqeGqs?KqEf+EQTqeAa#|6ut3R-kZXqGNL~L<t+A)m2z<qUfgXmDknV7K;R' );
define( 'NONCE_KEY',        '8$eyJ#IV6LF8O->F`/8h?O=2hpF8~!L:pqh.CHz>g< sEbfW5_)4.<@fTroE>n`!' );
define( 'AUTH_SALT',        'r5K>(Ie2l{W5D[9{!*.d9m@ufYWASEcy{zSNoz]p=>7%v8c7*yAXxeLtfLzkFLjO' );
define( 'SECURE_AUTH_SALT', 'X1qxVecFNCQh/N<hf3z5O ?$rY67IB-^/b,9LI6(hPp/sfS}I/A<dcuIyU;}l#.U' );
define( 'LOGGED_IN_SALT',   '3g|t^Dl!rw >:1btiAO^gItM!IHsFf~Mo:4,Yt>3+VunTScH9+]-hpV*~Pelb*LP' );
define( 'NONCE_SALT',       'Ek_bE_rq2qF*h[r6a8%<X}uJB[_nl7Gv ?%{wBV`e.~ QhC^ ;4CN/n V=UpO+ =' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
