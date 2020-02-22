# Firebase application

[![](https://img.shields.io/npm/v/@inpassor/firebase-application.svg?style=flat)](https://www.npmjs.com/package/@inpassor/firebase-application)
[![](https://img.shields.io/github/license/Inpassor/ts-firebase-application.svg?style=flat-square)](https://github.com/Inpassor/ts-firebase-application/blob/master/LICENSE)
![](https://img.shields.io/npm/dt/@inpassor/firebase-application.svg?style=flat-square)

This library is a handy wrapper for [@inpassor/node-server](https://github.com/Inpassor/ts-node-server).

It provides a single function **firebaseApplication** creating a Firebase Cloud function:
```
firebaseApplication: (
   getConfig: ServerConfig | Promise<ServerConfig>,
   runtimeOptions?: RuntimeOptions,
) => HttpsFunction
```

## Installation
```bash
npm install @inpassor/firebase-application --save
```

## Usage
```typescript
import { firebaseApplication, Component, ServerConfig } from '@inpassor/firebase-application';

class DemoComponent extends Component {
    public get(): void {
        console.log(this.request.params);
        // You can use here:
        // this.app.firebaseApp
        // this.app.firestore
        this.send(200, 'This is the DemoComponent GET action');
    }
}

const config: ServerConfig = {
    headers: {
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'content-type, authorization',
    },
    sameOrigin: true,
    routes: [
        {
            path: 'demo</arg|?>',
            component: DemoComponent,
        },
    ],
};

export const firebaseFunction = firebaseApplication(config, {
    timeoutSeconds: 10,
    memory: '128MB',
});
```

## Asynchronous Server config
```typescript
import { firebaseApplication, ServerConfig } from '@inpassor/firebase-application';

// Some asynchronous get config function
const getConfig = (): Promise<ServerConfig> => {
    const config: ServerConfig = {}; // define your own ServerConfig here
    return Promise.resolve(config);
};

export const firebaseFunction = firebaseApplication(getConfig(), {
    timeoutSeconds: 10,
    memory: '128MB',
});
```
