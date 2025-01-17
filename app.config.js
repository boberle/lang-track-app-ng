export default {
  "expo": {
    "name": "lang-track-app-ng",
    "slug": "lang-track-app-ng",
    "version": "1.0.0-3",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.boberle.langtrackappng",
      "buildNumber": "3",
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.boberle.langtrackappng",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON || "./android/app/google-services.json",
      "versionCode": 3,
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "55e39e61-bff3-46a6-8723-b3e882653cf1"
      }
    },
    "owner": "boberle",
    "newArchEnabled": true
  }
}
