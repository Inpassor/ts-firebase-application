import { RuntimeOptions, VALID_MEMORY_OPTIONS, HttpsFunction, runWith } from 'firebase-functions';
import { Server, ServerConfig } from '@inpassor/node-server';

const defaultRuntimeOptions: RuntimeOptions = {
    timeoutSeconds: 10,
    memory: VALID_MEMORY_OPTIONS['256MB'],
};

export const firebaseApplication = (
    getConfig: ServerConfig | Promise<ServerConfig>,
    runtimeOptions: RuntimeOptions = defaultRuntimeOptions,
): HttpsFunction => {
    return runWith(runtimeOptions).https.onRequest(async (request, response) => {
        await new Promise((resolve, reject) => {
            Promise.resolve(getConfig).then(
                (config): void => {
                    const server = new Server(config);
                    resolve(server.handle.call(server, request, response));
                },
                error => reject(error),
            );
        });
    });
};

export const firebaseApp = (
    config: ServerConfig,
    runtimeOptions: RuntimeOptions = defaultRuntimeOptions,
): HttpsFunction => {
    const server = new Server(config);
    return runWith(runtimeOptions).https.onRequest(server.handle.bind(server));
};
