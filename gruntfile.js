module.exports = function (grunt) {
    const mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            website: {
                files: {
                    'web/styles/css/screen.css': 'src/styles/style.less'
                }
            }
        },
        cssmin: {
            website: {
                files: {
                    'web/styles/css/screen.css': 'web/styles/css/screen.css'
                }
            }
        },
        uglify: {
            website: {
                files: {
                    'web/js/bundle.js': [
                        'src/js/index.js'
                    ]
                }
            }
        },
        htmlmin: {
            website: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'web/index.html': 'src/index.html',
                }
            }
        },
        express: {
            server: {
                options: {
                    port: 2000,
                    bases: ['web']
                }
            }
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]
                },
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'web/assets/'
                }]
            }
        },
        watch: {
            htmlmin: {
                files: ['src/index.html'],
                tasks: ['htmlmin:website']
            },
            less: {
                files: ['src/styles/*.less'],
                tasks: ['less:website', 'cssmin:website'],
                options: {
                    spawn: false
                }
            },
            uglify: {
                files: ['src/js/*js'],
                tasks: ['uglify:website']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-imagemin');


    grunt.registerTask('default', ['express', 'imagemin', 'less:website', 'cssmin:website', 'uglify:website', 'htmlmin:website', 'watch']);
};