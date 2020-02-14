# sample-todoapp
Demonstrate how to use TypeScript in an Angular-js application.

In order to build it:

npm i

npm run watch

The built files will be available in the dist folder.

**Note**:
Babel is configured using package.json BUT:
the preset @babel/typescript should add the @babel/plugin-transform-typescript. Instead I could see errors as it was not applied:
``` constructor(private a) would not work (this.a was not created)```
I added @babel/plugin-transform-typescript manually and it seems to be working.
