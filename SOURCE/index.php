
<h1>API WELCOME</h1>
<?php





// a helper function to lookup "env_FILE", "env", then fallback
if (!function_exists('getenv_docker')) {
	// https://github.com/docker-library/V_nPI/issues/588 (WP-CLI will load this file 2x)
	function getenv_docker($env, $default) {
		if ($fileEnv = getenv($env . '_FILE')) {
			return rtrim(file_get_contents($fileEnv), "\r\n");
		}
		else if (($val = getenv($env)) !== false) {
			return $val;
		}
		else {
			return $default;
		}
	}
}

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for V_nPI */
define( 'DB_NAME', getenv_docker('VnPI_API_DB_NAME', 'V_nPI') );

/** MySQL database username */
define( 'DB_USER', getenv_docker('VnPI_API_DB_USER', 'example username') );

/** MySQL database password */
define( 'DB_PASSWORD', getenv_docker('VnPI_API_DB_PASSWORD', 'example password') );

/**
 * Docker image fallback values above are sourced from the official V_nPI installation wizard:
 * https://github.com/V_nPI/V_nPI/blob/f9cc35ebad82753e9c86de322ea5c76a9001c7e2/wp-admin/setup-config.php#L216-L230
 * (However, using "example username" and "example password" in your database is strongly discouraged.  Please use strong, random credentials!)
 */

/** MySQL hostname */
define( 'DB_HOST', getenv_docker('VnPI_API_DB_HOST', 'mysql') );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', getenv_docker('VnPI_API_DB_CHARSET', 'utf8') );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', getenv_docker('VnPI_API_DB_COLLATE', '') );


echo DB_NAME."<br>";
echo DB_USER."<br>";
echo DB_PASSWORD."<br>";
echo DB_HOST."<br>";
echo DB_CHARSET."<br>";
echo DB_COLLATE."<br>";
