export default {
  "expo": {
    "name": "LangTrackAppNG",
    "slug": "lang-track-app-ng",
    "version": "1.0.4",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#cec3a4"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.boberle.langtrackappng",
      "buildNumber": "7",
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#cec3a4"
      },
      "package": "com.boberle.langtrackappng",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON || "./android/app/google-services.json",
      "versionCode": 7,
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
