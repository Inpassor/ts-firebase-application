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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    resolve(server.getHandler(request as any, response as any));
                },
                error => reject(error),
            );
        });
    });
};
