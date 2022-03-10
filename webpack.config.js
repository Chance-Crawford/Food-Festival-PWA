// see google docs, PWA Notes, set up webpack.
// webpack automatically minimizes our js files on build.
const path = require("path");
// Because plugins are built into webpack, we need to be sure we're 
// bringing webpack's methods and properties into the config file.
const webpack = require("webpack");

module.exports = {
    // For a basic configuration, we need to provide webpack with three 
    // properties: entry, output, and mode. The first thing we want to 
    // declare is the entry property. The entry point is the root of the 
    // bundle and the beginning of the dependency graph, so give it the 
    // relative path to the client's code.
    entry: {
        // see google docs, PWA Notes, Add Multiple Entry Points to
        // webpack's Configuration
        // Now that we have successfully split our application into 
        // separate modules, our next step will be to add entry points 
        // in the webpack.config.js file so webpack will know where to 
        // start the the bundle of dependencies.
        // Now that we have our multiple entry points (js files)
        // dedicated to each 
        // webpage, the browser only needs to process the bundle that 
        // corresponds to the page being loaded.
        // But how does the page know which bundle is needed?
        // We need to update the <script> element of each HTML 
        // file to point to the correct bundle needed for that page.
        // Connecting our HTML page to the entry point JavaScript bundle 
        // is the only <script> element needed for that page. 
        // webpack will use the dependency graph to manage the other 
        // dependencies.
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
      },
    // webpack will next take the entry points we have provided, bundle 
    // that code, and output that bundled code to a folder that we specify. 
    // It is common and best practice to put your bundled code into a 
    // folder named dist, which is short for distribution.
    output: {
        path: path.resolve(__dirname, 'dist'),
        // Our build step will create a series of bundled files, one for 
        // each listing in the entry object. Change the filename attribute 
        // in the output object to filename: "[name].bundle.js".
        // The name of each attribute in the entry object will be used in 
        // place of [name] in each bundle.js file that is created. So, 
        // the bundle file for script.js will be app.bundle.js, etc.
        // with each using the key name from each key-value pair in the 
        // entry object for [name].
        filename: '[name].bundle.js'
    },
    // see google docs, PWA Notes, Optimize Images with webpack
    // for lowering the payload of images so they render faster to the 
    // page.
    module: {
        // This object will identify the type of files to pre-process 
        // using the test property to find a regular expression, or regex. 
        // In our case, we are trying to process any image file with the 
        // file extension of .jpg. We could expand this expression to also 
        // search for other image file extensions such as .png, .svg, or .gif.
        rules: [
          {
            test: /\.jpg$/i,
            // Within the same object as test, we will add another property 
            // called use where the actual loader is implemented.
            use: [
                {
                  loader: 'file-loader',
                  // The default behavior of file-loader is such that file 
                  // will be treated as an ES5 module. As a result, paths 
                  // to images might be formatted incorrectly.
                  options: {
                    esModule: false,
                    // returns the name of the file with the file extension.
                    name (file) {
                      return "[path][name].[ext]"
                    },
                    // a function that changes our assignment URL by replacing the 
                    // ../ from our require() statement in script.js with /assets/
                    publicPath: function(url) {
                      return url.replace("../", "/assets/")
                    }
                  }
                },
                // the first part of converting our image through webpack is 
                // complete. The last step will be to use a image optimizer 
                // loader, because file-loader only emitted our images without 
                // reducing the size. We can use a package from npm called 
                // image-webpack-loader to do that.
                // Install the image-webpack-loader package and then
                // add it to our use array by adding another object.
                // Make sure we keep track of the loader dependencies and 
                // ensure that file-loader processes the images first so 
                // that image-webpack-loader can optimize the emitted files.
                {
                    loader: 'image-webpack-loader'
                }
            ]
          }
        ]
    },
    // if we want webpack to now use the jQuery package we installed 
    // using npm i jquery, we need to use a plugin to let webpack know. 
    // Plugins play an important role in directing webpack what to do. Like 
    // all directions we've given webpack so far, we'll add the plugins to 
    // the webpack.config.js file. Above the mode property, add plugins as 
    // an array
    plugins: [
        // Inside the empty array, we need to tell webpack which plugin we 
        // want to use. We're going to use the providePlugin plugin to define 
        // the $ and jQuery variables to use the installed npm package. If 
        // we did not do this, the code would still not work even though we 
        // installed jQuery. Whenever you work with libraries that are 
        // dependent on the use of a global variable, just like jQuery is 
        // with $ and jQuery, you must tell webpack to make exceptions for 
        // these variables by using webpack.ProvidePlugin.
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // Bootstrap doesn't have any special variables that webpack 
        // doesn't understand, the only thing we need to do is require the 
        // package at the top of the script.js file.
    ],
    // The final piece of our basic setup will provide the mode in which 
    // we want webpack to run. By default, webpack wants to run in 
    // production mode. In this mode, webpack will minify our code for 
    // us automatically, along with some other nice additions. We want 
    // our code to run in development mode, so add the following code
    mode: 'development'
};