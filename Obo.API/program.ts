import { Application } from "./application";

/**
 * Program.
 */
async function program(): Promise<void> {

    try {
        const application: Application = new Application();
    
        application.configureServices();
        
        application.configureControllers();
        
        application.configureRouting();
        
        application.configureDatabase();

        application.configureAuthentication();

        application.configureAuthorization();
        
        application.run();
    }
    
    catch (error: any) {
        console.error(error);
    }
}

program();
