Mobile Application UI
======

Mobile CSS UI for hybrid application development

## What is it?

It is the minimalistic application mobile UI to use mainly in hybrid development.
But you can use it also on your mobile site.
The main idea is - use minimum as you can to simplify common wide used mobile elements.
Need more? Develop it yourself for your needs.

## Usage

Well, just clone the git repository, get android.css or ios.css from build directory and start mark up your html native looking page!
You can use also source code in your project. Just import into your less needed main.less file from src folder.
For example:

```less
@import 'src/android/main.less';
```

or

```less
@import 'src/ios/main.less';
```

## Building distribution

To build distribution for using as single css file in your project just run

```bash
make build
```

In build folder you will find android.css and ios.css and minimized versionf of it.
Also there is android.html and ios.html as example of mark up supported elements.
Just include CSS files in your project and start developing native looking app.
