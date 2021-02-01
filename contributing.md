# To Contribute Follow These Rules

#### (Without following these rules your PR may be ignored)

1. Don't Change The Configs in .editorconfig , .firebaserc , firebase.json , manifest.json , .codesandbox
2. Your Whole App Code Will Be In src/App
3. To Add Assets such as images or audios or videos add them in src/assests
4. To Add apikey or to fetch data from endpoints add them in src/environment/environment.js like this

```javascript
export const environment = {
	param: value
};
```

5. Create New Screens in src/App/Screens/_YourScreenFolder_/_YourScreen.js_ and import them as

```javascript
	export {default as *YourScreen* } from './*YourScreenFolder*/*YourScreen.js*'
```

in src/App/Screens/index.js

6. Create New Components in src/App/Components/_YourComponentFolder_/_YourComponent.js_ and import them as

```javascript
	export {default as *YourComponent* } from './*YourComponentFolder*/*YourComponent.js*'
```

in src/App/Components/index.js

7. Create New Layouts in src/App/Layouts/_YourLayoutFolder_/_YourLayout.js_ and import them as

```javascript
	export {default as *YourLayout* } from './*YourLayoutFolder*/*YourLayout.js*'
```

in src/App/Layout/index.js

8. All files Should Have _.js , _.jsx or \_.json Extensions files in .ts or .tsx will be ignored
