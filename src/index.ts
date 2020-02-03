import { RuntimeOptions, HttpsFunction, runWith } from 'firebase-functions';
import { Server, ServerConfig } from '@inpassor/node-server';

export const firebaseApplication = (
    getConfig: ServerConfig | Promise<ServerConfig>,
    runtimeOptions?: RuntimeOptions,
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

export const firebaseApp = (config: ServerConfig, runtimeOptions?: RuntimeOptions): HttpsFunction => {
    const server = new Server(config);
    return runWith(runtimeOptions).https.onRequest(server.handle.bind(server));
};

const config: ServerConfig = {};

export const firebaseFunction = firebaseApplication(config);
