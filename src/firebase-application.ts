import { RuntimeOptions, VALID_MEMORY_OPTIONS, HttpsFunction, runWith } from 'firebase-functions';
import { ServerConfig, isServerConfig } from '@inpassor/node-server';
import { Server } from './server';

const defaultRuntimeOptions: RuntimeOptions = {
    timeoutSeconds: 10,
    memory: VALID_MEMORY_OPTIONS['128MB'],
};

export const firebaseApplication = (
    getConfig: ServerConfig | Promise<ServerConfig>,
    runtimeOptions: RuntimeOptions = defaultRuntimeOptions,
): HttpsFunction => {
    const onRequest = runWith(runtimeOptions).https.onRequest;
    if (isServerConfig(getConfig)) {
        const server = new Server(getConfig);
        return onRequest(server.handle.bind(server));
    }
    return onRequest(async (request, response) => {
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
