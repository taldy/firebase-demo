# firebase-demo

1. Create new project in [Firebase Console](https://console.firebase.google.com/ "Firebase Console")

2. Create new Web App in your project ([doc](https://firebase.google.com/docs/web/setup?authuser=1#register-app "doc"))

3. Enable Firebase services in Firebase Console
  * Configure Auth Providers
  * Create Firestore DB ([doc](https://firebase.google.com/docs/firestore/quickstart?authuser=1#create "doc"))
  * Create Realtime Database (for benchmark page)
  * Enable Hosting
  * Enable Cloud Functions

4. Copy `src/firebase/default.settings.json` to `src/firebase/settings.json` and put your just created App configuration inside.

5. Install packages 
```
npm install -g firebase-tools
npm install
```

6. Attach your project to Firebase, run in project folder
```
firebase login
``` 

7. Run project locally with 
```
npm start
```

8. Deploy to server with 
```
npm run deploy
```


------------

Based on [Firebase](https://firebase.google.com/ "Firebase") and [Vue](https://vuejs.org/ "Vue").
Made for [Ardas](https://ardas-it.com/ "Ardas").
