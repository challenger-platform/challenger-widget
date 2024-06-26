# Challenger static widget example
This example shows how to implement Challenger widget on the client side. The widget could be built to display user data in a mobile app natively rather than using WebView. For this purpose the Challenger API is used to request raw user data from the server.

## Important!
All the logic and the design of the widget is provided here for testing and workflow demonstration purposes. **Production ready design and layout is implemented according business demands**.

## Usage
Please use Challenger API ([PHP](https://github.com/challenger-platform/challenger-api-client-php#performance-widgets), [Java](https://github.com/challenger-platform/challenger-api-client-java#performance-widgets), [C#](https://github.com/challenger-platform/challenger-api-client-csharp#performance-widgets)) manuals to get secure user payload string with `getEncryptedData()` (instead `getWidgetHtml()`) method.

## API

Authenticate and get information about the user. It could be used to indicate user performance in a native widget of a mobile app or other channels.

### GET `/api/widget/authenticateUser`
Params:
* data - result of API lib's `getEncryptedData()` method.

Returns: JSON array with `status: ok` and `user: {}` parameters containing user information. Or `status: error` if requested user does not exist.

> **NB**: in customized versions this method could take additional parameters and return additional information. Please refer to specific deployment documentation.

## Opening Challenger dashboard

This method could be used to open both an external browser or a WebView within the mobile application.

### GET `/loginUserByExternalId`
Params:
* data - result of API lib's `getEncryptedData()` method.
* redirect_path - (optional) the path where user should be redirected after successful login. If not set the user will be redirected to dashboard. Example: "prizes/1/1"

## Demo example

To use predefined HTML example, feel free to load HTML for the widget. For example:
```
https://localhost/widget.html?data=...&host=...
```

where `data` is a result of getEncryptedData() method from Challenger API and `host` is hostname of Challenger deployment.

> This is just a suggested option. In your specific use case you may use API calls below in any preferable way.
