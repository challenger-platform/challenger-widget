# Challenger static widget example
This example shows how to implement Challenger widget on client side. Widget's HTML could be loaded statically and use API calls to Challenger server to display client progress and other data.

## Important!
All the logic and the design of the widget is provided here for testing and workflow demonstration purposes. **Production ready design and layout is implemented according business demands**. 

## Deployment
1. Please use Challenger API ([PHP](https://github.com/challenger-platform/challenger-api-client-php), [Java](https://github.com/challenger-platform/challenger-api-client-java), [C#](https://github.com/challenger-platform/challenger-api-client-csharp)) manuals to get secure user payload string with `getEncryptedData()` method.
2. Assign the returned value to `var encrypted_data` JS variable in index.html file.
3. Define challenger domain where API calls will be addressed `var challengerServer` in index.html file.

## Usage
Entry point is index.html file. Setup variables in:

```
<script>
  var encrypted_data = '{{ result of getEncryptedData() }}';
  var challengerServer = 'https://{{your challenger domain}}'
</script>
```

## API
Internally this code uses methods:

### GET `/api/widget/authenticateUser`
Param: data - result of API lib's `getEncryptedData()` method.

Returns: JSON array with `status = ok` and `user` parameters containing user information. Or `status = error` if user does not exist.

### GET `/api/widget/getUserPoints`
Returns: number of points collected by the user. Returns result only if `authenticateUser` passes successfully.

### GET `/api/widget/getUserNotCollectedPoints`
Returns: number of points not collected yet by user. Returns result only if `authenticateUser` passes successfully.

### GET `/api/widget/getUserChallengesQuantity`
Returns: number of challenges currently available for the user. Returns result only if `authenticateUser` passes successfully.



