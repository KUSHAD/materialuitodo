# Mui-Todo

A modern Todo App Made Using React , Material-ui and uses Firebase Hosting , Firebase Firestore , Firebase storage , Firebase Real time Database and Firebase Authentication

### Technologies used

1. React
2. Firebase-Firestore
3. Firebase-Realtime-Database
4. Firebase-Storage
5. Firebase-Authentication
6. Firebase-hosting

### Live Demo

Check it live <a href="https://mui-todo.web.app" target="_blank">https://mui-todo.web.app</a>

### Firebase Rules To Use

#### (Without These The App Will Not Work)

<a name="firestore-rules">

##### Firebase-Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
    allow read , write , update , delete : if request.auth.uid != null
    }
  }
}
```

</a>

<a name="storage-rules">

##### Firebase-Storage

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write,update,delete: if request.auth.uid != null;
    }
  }
}
```

</a>

<a name="rtdb-rules">

##### Firebase-Realtime-Database

```json
{
	"rules": {
		".read": "auth.uid != null",
		".write": "auth.uid != null"
	}
}
```

</a>

### To Get Started

1. First Clone My Repository

```bash
	git clone https://github.com/KUSHAD/materialuitodo/
```

2. Go To <a href="https://console.firebase.google.com" target="_blank"> Firebase Console </a>

   > Create A New Firebase Project
   >
   > > Go To Authentication
   > >
   > > > Go To Sign-In Method
   > > >
   > > > > Click on Enable
   > > > > Go To Firestore
   > > > > Click On Create Database
   > > > > Click On ` Start In Test Mode` Click on Ok
   > > > >
   > > > > > Now When The Database Opens Go To Rules tab and paste <a href="#firestore-rules">this</a>
   > > > > >
   > > > > > > Click on Publish
   > > > > > > Go To Realtime Database
   > > > > > > Click on Create Database
   > > > > > > Click On ` Start In Test Mode` Then Click on Ok
   > > > > > > Now When The Database Opens Go To Rules tab and paste <a href="#rtdb-rules">this</a>
   > > > > > >
   > > > > > > > Click on Publish
   > > > > > > > Go To Storage
   > > > > > > > Click on Enable
   > > > > > > > Now When The Interface Opens Go To Rules tab and paste <a href="#storage-rules">this</a>
   > > > > > > > Click on Publish
   > > > > > > > Go To Project Overview
   > > > > > > > Click on add a Web App
   > > > > > > > Write Your App Name
   > > > > > > > Copy The Firebase Configs

3. Open This Repository in your favourite code editor
4. Rename src/environment/environment.example.js to src/environment/environment.js and paste your configs under `environment.firebase`
5. Run `yarn` or `npm install`
6. After Installation run `npm start`
