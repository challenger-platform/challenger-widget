# Challenger static widget example
This example shows how to implement Challenger widget on client side. Widget's HTML could be loaded statically and use API calls to Challenger server to display client progress and other data.

## Deployment
1. Please use Challenger API (PHP, Java, C#) manuals to generate secure user call with `getEncryptedData()` method.
2. In this demo assign the returned value to `var encrypted_data` JS variable in index.html file.
3. Define challenger domain where API calls will be addressed `var challengerServer` in index.html file.

## Important
All the logic and the design of the widget is built for testing purposes. Production ready design and layout is to be implemented.
