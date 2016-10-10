<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'testwp');

/** Имя пользователя MySQL */
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', '');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8mb4');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '^I_;..tZsj?Ypf+7Ci,M9_>hQODz9#x0;.v<&&~Gxs4fm9gc-~733iTgf=zQm-8B');
define('SECURE_AUTH_KEY',  'SLj{+XRw/xx5~PU:1xooi&J,O7X.<;0$?zMe]%nWq9O;%T.>yskE}[~iw*M2bpaG');
define('LOGGED_IN_KEY',    'vSPS3h^L0{5.a|LvOUGV-XU9A6-4O^X6SZv7^p7_laNt=CtxeDIkNR_}sY>b5@-X');
define('NONCE_KEY',        '(Ez._E{:NM=8/[$Q-j ov[NP.#55@8H[q1>>u9#qGkvtTqY%^~/6-q9p.<H{:9Mw');
define('AUTH_SALT',        '|^Fc?N~Wd>[So#?/p2<O1wOiNtSq`cD&(j%sl#}%:o!i|F^fFPEW&^E #cYmvDeh');
define('SECURE_AUTH_SALT', '<#a2tO<kC%N`v#S=,Nrc&V+s:E5I=<cx?Q[!CU6s.RoqKvzpzwPfsm}-q9 g|[)_');
define('LOGGED_IN_SALT',   'uwoZPn H=.Vjp)teY<4 LD[1sWW@| V`t7{#9H(laj3yTw(MDY*l1v=2=CJ0zsTm');
define('NONCE_SALT',       'dT)nHXl}b.cvixK#B<6mxqzgk&G-~nQ*x|+|6PbokSW}]`R3o/$b&nRnX4UX)@6[');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 * 
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
