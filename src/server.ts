import { apps, app, firestore, initializeApp } from 'firebase-admin';
import { Server as NodeServer, ServerConfig } from '@inpassor/node-server';

export class Server extends NodeServer {
    public firebaseApp: app.App;
    public firestore: firestore.Firestore;

    constructor(public config: ServerConfig = {}) {
        super(config);
        if (!apps.length) {
            this.firebaseApp = initializeApp({
                projectId: process.env.GCLOUD_PROJECT,
            });
            this.firestore = this.firebaseApp.firestore();
        } else {
            this.firebaseApp = app();
            this.firestore = firestore(this.firebaseApp);
        }
    }
}
