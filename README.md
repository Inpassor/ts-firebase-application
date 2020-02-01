# Firebase application

![](https://img.shields.io/npm/v/@inpassor/firebase-application.svg?style=flat)
![](https://img.shields.io/github/license/Inpassor/ts-firebase-application.svg?style=flat-square)
![](https://img.shields.io/npm/dt/@inpassor/firebase-application.svg?style=flat-square)

## Installation
```bash
npm install @inpassor/firebase-application --save
```

## Usage
```typescript
import { firebaseApplication } from '@inpassor/firebase-application';
import { ServerConfig, Component } from '@inpassor/node-server';
import { VALID_MEMORY_OPTIONS } from 'firebase-functions';

class DemoComponent extends Component {
    public get(): void {
        console.log(this.request.params);
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
            path: 'demo/:arg?',
            component: DemoComponent,
        },
    ],
};

export const firebaseFunction = firebaseApplication(config, {
    timeoutSeconds: 10,
    memory: VALID_MEMORY_OPTIONS['256MB'],
});
```
