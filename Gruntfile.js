module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            build: {
                src: 'src/jquery.scroll_perf.js',
                dest: 'dist/jquery.scroll_perf.min.js'
            }
        },

        watch: {
            scripts: {
                files: ['src/jquery.scroll_perf.js'],
                tasks: ['build'],
                options: {
                    // nospawn: true
                }
            }
        },

        concat: {
            dist: {
                src: 'src/jquery.scroll_perf.js',
                dest: 'dist/jquery.scroll_perf.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('build', ['concat', 'uglify']);

};