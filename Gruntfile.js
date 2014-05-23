var module;

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: true
            },
            all: ['jquery.wipe.js', 'Gruntfile.js']
        },
        jscs: {
            src: '*.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs-checker');
    grunt.registerTask('validate', ['jshint', 'jscs']);
};
