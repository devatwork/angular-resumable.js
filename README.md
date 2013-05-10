# angular-resumable.js [![Build Status](https://travis-ci.org/trilobyte/angular-resumable.js.png?branch=master)](https://travis-ci.org/trilobyte/angular-resumable.js)

A module which provides an integration [Resumable.js](https://github.com/23/resumable.js) with [Angular.js](https://github.com/angular/angular.js/). It handles the wrapping of events in `$scope.$apply` so you dont have to worry about it. It also provides a directive which allows you to create an upload ui quickly.

## What is Resumable.js

Resumable.js is a JavaScript library providing multiple simultaneous, stable and resumable uploads via the HTML5 File API.

Resumable.js does not have any external dependencies other the HTML5 File API. This is relied on for the ability to chunk files into smaller pieces. Currently, this means that support is limited to Firefox 4+, Chrome 11+ and Safari 6+.

## Dependencies

- Angular 1.0.6+
- Resumable.js

## Usage

```html
<!DOCTYPE html>
<html lang="en" ng-app="resumableJsDemoApp">
	<head>
		<meta charset="utf-8">
		<title>angular-resumable.js</title>
		<link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap.min.css" rel="stylesheet"/>
	</head>
	<body class="ng-cloak">
		<resumable-upload-form opts="{'target': 'TODO: insert resumable upload service endpoint here'}"></resumable-upload-form>

		<script src="../lib/resumable.js"></script>
		<script src="../lib/angular.js"></script>
		<script src="../src/angular-resumable.js-service.js"></script>    // implements the service which abstracts away the integration between angular and resumable.
		<script src="../src/angular-resumable.js-directives.js"></script> // provides the resumable-upload-form directive
		<script src="../src/angular-resumable.js-templates.js"></script>  // provides the template used by the resumable-upload-form directive
		<script>
			angular.module('resumableJsDemoApp', ['resumable.js-directives', 'resumable.js-templates']);
		</script>
	</body>
</html>
```

## resumableJsFactory service API

This service allows you to create an Resumable.js instance which is aware of Angular. The public api has one public method.

### create($scope, opts)

Creates a new `Resumable` object using the given `opts`, see [Resumable.js configuration](https://github.com/23/resumable.js#configuration) for details.

The `$scope` parameter is an Angular in which the Resumable events are executed. This `$scope` must contain all the UI bound to the `Resumable` object, otherwise your UI might not be updated.

This method returns a `Resumable` object which is aware of Angular. See the official documentation for details about it's API. [Resumable API](https://github.com/23/resumable.js#resumable).

### global configuration via options(opts)

You can provide a global default configuration shared by all created `Resumable` objects. You can do this on the configuration phase of your Angular application.

```js
angular.module('App', ['resumable.js-services'])
	.config(['resumableJsFactoryProvider', function(resumableJsFactoryProvider) {
		resumableJsFactoryProvider.options({
			// global options go here
		});
	}]);
```

See [Resumable.js configuration](https://github.com/23/resumable.js#configuration) for all options.

## resumableUploadForm directive

A simple directive which shows a Resumable powered upload form. It takes one attribute which specifies the configuration options passed to the `Resumable` object.

### Usage

```html
<resumable-upload-form opts="{'target': 'TODO: insert resumable upload service endpoint here'}"></resumable-upload-form>
```

## resumableUploadForm templates

TODO

## Copyright

Copyright © 2013 Bert Willems and contributors

## License

This project is licensed under [MIT](http://www.opensource.org/licenses/mit-license.php "Read more about the MIT license form"). Refer to license.txt for more information.
