fis.config.merge({
    roadmap : {
        path : [
            {
                //readme.md文件不发布
                reg : /\/readme\.md$/i,
                release : false
            }
        ]
    },
    pack:{
        'pkg/main.js':'**.js',
        'pkg/main.css':['**.css','**.scss','**.less']
    }
});