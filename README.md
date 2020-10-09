# Challenger static widget example
This example shows how to implement Challenger widget on client side. Widget's HTML could be loaded statically and use API calls to Challenger server to display client progress and other data.

## Important!
All the logic and the design of the widget is provided here for testing and workflow demonstration purposes. **Production ready design and layout is implemented according business demands**.

## Usage
1. Please use Challenger API ([PHP](https://github.com/challenger-platform/challenger-api-client-php), [Java](https://github.com/challenger-platform/challenger-api-client-java), [C#](https://github.com/challenger-platform/challenger-api-client-csharp)) manuals to get secure user payload string with `getEncryptedData()` (instead `getWidgetHtml()`) method.
2. Set up iFrame in the HTML for the widget:
```
<iframe src="widget.html?data=replace-this-value&host=demo.challengerplatform.com"
   width="322" height="170" style="border:none;"></iframe>
```
where `data` is a result of getEncryptedData() method from Challenger API and `host` is hostname of Challenger deployment.

## API
Internally this code uses methods:

### GET `/api/widget/authenticateUser`
Params:
* data - result of API lib's `getEncryptedData()` method.

Returns: JSON array with `status = ok` and `user` parameters containing user information. Or `status = error` if user does not exist.

### GET `/api/widget/getUserPoints`
Returns: number of points collected by the user. Returns result only if `authenticateUser` passes successfully.

### GET `/api/widget/getUserNotCollectedPoints`
Returns: number of points not collected yet by user. Returns result only if `authenticateUser` passes successfully.

### GET `/api/widget/getUserChallengesQuantity`
Returns: number of challenges currently available for the user. Returns result only if `authenticateUser` passes successfully.

## Opening Challenger
### GET `/login-user-by-external-id`
Params:
* data - result of API lib's `getEncryptedData()` method.
* redirect_path - (optional) the path where user should be redirected after successful login. Example: "prizes/1/1"
