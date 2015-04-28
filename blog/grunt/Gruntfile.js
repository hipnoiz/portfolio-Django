module.exports = function(grunt) {
    var staticPath = '../static/blog/';
    var devPath = '../dev/';

    grunt.initConfig({
        staticPath: staticPath,
        devPath: devPath,
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            app: {
                options: {
                    // Replace all 'use strict' statements in the code with a single one at the top
                    banner: "(function($){"+
                    "  'use strict';" +
                    "",
                    footer: "}(jQuery));"
                },
                src: [ '<%= devPath  %>scripts/*.js' ],
                dest: '<%= staticPath  %>js/app.js'
            },

            libs: {
                options: {
                },
                src: [
                    '<%= staticPath  %>js/app.js',
                    '<%= devPath  %>scripts/libs/*.js'
                ],
                dest: '<%= staticPath  %>js/app.js'
            }
        },

        libsass: {
            options: {
                sourcemap: false,
                style: 'expanded'
            },
            files: {
                src: '<%= devPath  %>scss/style.scss',
                dest: '<%= staticPath  %>css/style.css'
            }
        },

        sprite:{
            all: {
                src: '<%= devPath  %>sprite/*.png',
                dest: '<%= staticPath  %>img/sprite.png',
                imgPath: '/static/img/sprite.png',
                destCss: '<%= devPath  %>scss/_sprite.scss'
            }
        },

        uglify: {
            options: {
                mangle: false,//nie zmienia nazw zmiennych
                preserveComments: true, //usuwa komentarze
                compress: {
                    drop_console: true//wyrzuca wszystkie console.*
                }
            },
            app: {
                src: '<%= staticPath  %>js/app.js',
                dest: '<%= staticPath  %>js/script.js'
            }
        },

        watch: {
            options: {
                spawn: false,
                debounceDelay: 150,
                atBegin: true
            },
            sass: {
                files: ['<%= devPath  %>scss/*.scss', '<%= devPath  %>scss/*/*.scss'],
                tasks: 'buildSass'
            },
            js: {
                files: ['<%= devPath  %>scripts/*.js', '<%= devPath  %>scripts/libs/*.js'],
                tasks: ['buildJS']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-libsass');

    grunt.registerTask( 'buildJS', [
        'concat:app',
        'concat:libs'
        //'uglify'
    ] );

    grunt.registerTask('buildSass', [
        'libsass'
    ]);

    grunt.registerTask('buildSprite', [
        'sprite'
    ]);

    grunt.registerTask('watchJS', [
        'watch:js'
    ]);

    grunt.registerTask('watchSass', [
        'watch:sass'
    ]);

};