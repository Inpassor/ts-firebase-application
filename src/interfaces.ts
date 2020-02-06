import { app, firestore } from 'firebase-admin';
import {
    Server as NodeServer,
    ServerConfig as NodeServerConfig,
    Component as NodeServerComponent,
    Request as NodeServerRequest,
    Response as NodeServerResponse,
} from '@inpassor/node-server';

export type ServerConfig = NodeServerConfig;

export type Server = NodeServer & {
    firebaseApp: app.App;
    firestore: firestore.Firestore;
};

export type Request = NodeServerRequest & {
    app: Server;
};

export type Response = NodeServerResponse & {
    app: Server;
    request: Request;
};

export class Component extends NodeServerComponent {
    constructor(public app: Server, public request: Request, public response: Response) {
        super(app, request, response);
    }
}
