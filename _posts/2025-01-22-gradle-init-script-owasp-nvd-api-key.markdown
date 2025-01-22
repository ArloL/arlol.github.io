---
title: Gradle Init Script to set NVD API Key
description: A short and sweet gradle init script to globally set nvd.apiKey
---

This init.gradle script will allow you to globally set nvd.apiKey for the org.owasp.dependencycheck plugin.

```
allprojects {
    gradle.projectsEvaluated {
        if (plugins.hasPlugin("org.owasp.dependencycheck")) {
            dependencyCheck {
                if (!nvd.apiKey) {
                    nvd.apiKey = "<YOUR_KEY_HERE>"
                    logger.lifecycle("init.gradle script set NVD API Key")
                }
            }
        }
    }
}
```
