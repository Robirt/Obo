import { Application } from "./application";
import { environment } from "./environment";

/**
 * Program.
 */
async function program(): Promise<void> {

    if (!environment.production) process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

    try {
        const application: Application = new Application();
    
        application.configureServices();
        
        application.configureControllers();
        
        application.configureRouting();
        
        application.configureDatabase();
        
        application.run();
    }
    
    catch (error: any) {
        console.error(error);
    }
}

program();
