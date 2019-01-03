# Wordpress setup for custom theme development on local env

First of all, sorry if this doc is not fully clear, I dont have much time to do it, just wanted to share this awesome setup with awesome wordpress developers. This is perfect for people who create custom design wordpress websites. I've been using similar config for years and after reading @alialla 's post (https://css-tricks.com/gulp-for-wordpress-initial-setup/), i decided to rewrite it and mix it with his.

This is gulp config which runs task automation for compiling scss, optimising images, svg tooling, compiling javascript, autoprefixer, autoreload with watchForChanges, browserSync wuth autoinject css...

After cloning the repo, follow the steps.
1. Run `npm init` - Keep in mind that project name should be the same as your theme name (Unless you want to change paths yourself)
2. Finish wordpress installation (wp-config.php).
3. All you should change is `proxy` value in `gulpconfig.json`
4. Run `npm start` for dev and `npm build` for prod


TODO: 
1. Get rid of `.babelrc` file
2. Write better documentation
3. Send suggestion

Feel free to write me at twitter @st3f4ns .
