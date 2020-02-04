import { apps, app, firestore, initializeApp } from 'firebase-admin';
import { RuntimeOptions, VALID_MEMORY_OPTIONS, HttpsFunction, runWith } from 'firebase-functions';
import { Server as NodeServer, ServerConfig, isServerConfig } from '@inpassor/node-server';

export type Server = NodeServer & {
    firebaseApp: app.App;
    firestore: firestore.Firestore;
};

const defaultRuntimeOptions: RuntimeOptions = {
    timeoutSeconds: 10,
    memory: VALID_MEMORY_OPTIONS['128MB'],
};

const createServer = (config: ServerConfig): Server => {
    const server = new NodeServer(config) as Server;
    if (!apps.length) {
        server.firebaseApp = initializeApp({
            projectId: process.env.GCLOUD_PROJECT,
        });
        server.firestore = server.firebaseApp.firestore();
    } else {
        server.firebaseApp = app();
        server.firestore = firestore(this.firebaseApp);
    }
    return server;
};

export const firebaseApplication = (
    getConfig: ServerConfig | Promise<ServerConfig>,
    runtimeOptions: RuntimeOptions = defaultRuntimeOptions,
): HttpsFunction => {
    const onRequest = runWith(runtimeOptions).https.onRequest;
    if (isServerConfig(getConfig)) {
        const server = createServer(getConfig);
        return onRequest(server.handle.bind(server));
    }
    return onRequest(async (request, response) => {
        await new Promise((resolve, reject) => {
            Promise.resolve(getConfig).then(
                (config): void => {
                    const server = createServer(config);
                    resolve(server.handle.call(server, request, response));
                },
                error => reject(error),
            );
        });
    });
};
