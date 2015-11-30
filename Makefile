WEBPACK='node_modules/webpack/bin/webpack.js'
.PHONY: build

build:
	$(WEBPACK) -p
	mv build/android.css build/android.min.css
	mv build/ios.css build/ios.min.css
	$(WEBPACK)
	rm build/android.js
	rm build/ios.js
