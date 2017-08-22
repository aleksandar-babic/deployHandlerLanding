module.exports = {
  bundle: {
    main: {
      scripts: [
        './assets/js/core.min.js',
        './assets/js/script.js',
        './assets/js/thesaas.min.js',
        './assets/js/toastr.min.js'
      ],
      styles: './assets/css/*.css'
    }
  },
  copy: [
  	'./assets/img/*.{png,gif,ico}',
  	'./assets/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
  	'./index.html'
	]
};﻿
