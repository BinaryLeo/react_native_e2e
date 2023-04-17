
<div align="center" style="margin: 20px; text-align: center">
  <p>React Native E2E</p>
  <p> A react native application | project to explore E2E testing using Detox and Jest</p>
  <p>Follow the instructions below for a better experience.</p>
  
  [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](https://github.com/BinaryLeo/react_native_e2e/blob/main/LICENSE)
  ![GitHub last commit](https://img.shields.io/github/last-commit/BinaryLeo/react_native_e2e?style=flat-square)
  ![GitHub top language](https://img.shields.io/github/languages/top/BinaryLeo/react_native_e2e?style=flat-square)
  
</div>

<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-it-works">How it works</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-use">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>

</p>

## 🧪 technologies

* [Expo](https://expo.dev/) 
* [Yarn](https://github.com/BinaryLeo/react_feedback_widget_web/tree/main/web) 
* [Detox](https://wix.github.io/Detox/) 
* [Jest](https://jestjs.io/) 

## 💡 how it works
This is a common application in general but it is fully configured for E2E Testing, following the
simplified guide below.

## 💡 how to use

Requirements:
* [NodeJs](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/package/npm)
* [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
* [Detox](https://wix.github.io/Detox/) 
* [Jest](https://jestjs.io/) 


 Clone the repository.
- Open the project from your IDE.
- Follow the steps below:

```bash

# Add Detox CLI to the project

# npm install -g detox-cli
# yarn add detox -D

# npm install --save-dev jest
# yarn add jest -D

```

```bash

# Go to your project/android/build.gradle file.

allprojects {
    repositories {
				...
        maven {
            url "$rootDir/../node_modules/detox/Detox-android"
        }
    }
}
```

```bash

# Go to your project/android/build.gradle file.
android {
    defaultConfig {
				...
       // Dependencies.
        testBuildType System.getProperty('testBuildType', 'debug')
        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
    }
}
```

```bash
# In the same file add:
dependencies {
		// Dependencies.
    androidTestImplementation('com.wix:detox:+') { transitive = true }
    androidTestImplementation 'junit:junit:4.12'
}
```

```java

# Testing setup
# Now we'll create a file called DetoxTest.java in the following path android/app/src/androidTest/java/com/[nome_do_package]/DetoxTest.java

package com.package; // Change by your package name

import com.wix.detox.Detox;
import com.wix.detox.config.DetoxConfig;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;
import androidx.test.rule.ActivityTestRule;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class DetoxTest {
    @Rule
    public ActivityTestRule<MainActivity> mActivityRule = new ActivityTestRule<>(MainActivity.class, false, false);

    @Test
    public void runDetoxTests() {
        DetoxConfig detoxConfig = new DetoxConfig();
        detoxConfig.idlePolicyConfig.masterTimeoutSec = 90;
        detoxConfig.idlePolicyConfig.idleResourceTimeoutSec = 60;
        detoxConfig.rnContextLoadTimeoutSec = (com.package.BuildConfig.DEBUG ? 180 : 60);

        Detox.runTests(mActivityRule, detoxConfig);
    }
}
```
```bash
# Starting Detox
yarn detox init -r jest
```
```node
# Update the .detoxrc.json file

{
  "testRunner": "jest",
  "runnerConfig": "e2e/config.json",
  "configurations": {
    "android.emu.debug": {
      "type": "android.emulator",
      "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
      "build": "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
      "device": {
        "avdName": "Pixel_3a_API_29"
      }
    }
  }
}
```
```bash
#Generating the build for testing

# Android:
yarn detox build -c android.emu.debug

# iOS:
yarn detox build -c ios.sim.debug
```

```bash
# Running tests with Detox

Android:
detox test -c android.emu.debug

No iOS:
detox test -c ios.sim.debug
```

## 📄 License

This project was built under MIT. See the file [LICENSE](LICENSE) for more details.

---
