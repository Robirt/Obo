import { UsersService } from "../services/users.service";

/**
 * Users Controller.
 */
export class UsersController {

    /**
     * Users Service.
     */
    private readonly usersService: UsersService;

    /**
     * Initializes a new instance of the {@link UsersController} class.
     * @param usersService Users Service.
     */
    public constructor(usersService: UsersService) {
        this.usersService = usersService;
    }
    
    /**
     * Gets Users.
     * @param request Request.
     * @param response Response.
     */
    public async getUsersAsync(request: any, response: any): Promise<void> {
        response.json(await this.usersService.getUsersAsync());
    }

    /**
     * Gets User by Id.
     * @param request Request.
     * @param response Response.
     */
    public async getUserByIdAsync(request: any, response: any): Promise<void> {
        response.json(await this.usersService.getUserByIdAsync(request.params.id));
    }

    /**
     * Signs up User.
     * @param request Request.
     * @param response Response.
     */
    public async signUpAsync(request: any, response: any): Promise<void> {
        try {
            response.status(200).json(await this.usersService.signUpAsync(request.body));
        }

        catch (error: any) {
            response.status(400).send(error.message);
        }
    }

    /**
     * Signs In User.
     * @param request Request.
     * @param response Response.
     */
    public async signInAsync(request: any, response: any): Promise<void> {
        try {
            response.status(200).json(await this.usersService.signInAsync(request.body));
        }

        catch (error: any) {
            response.status(400).send(error.message);
        }
    }

    /**
     * Updates User.
     * @param request Request.
     * @param response Response.
     */
    public async updateUserAsync(request: any, response: any): Promise<void> {
        await this.usersService.updateUserAsync(request.body);
        response.sendStatus(204);
    }

    /**
     * Updates User Password.
     * @param request Request.
     * @param response Response.
     */
    public async updateUserPasswordAsync(request: any, response: any): Promise<void> {
        try {
            await this.usersService.updateUserPasswordAsync(request.body);
            response.sendStatus(204);
        }

        catch (error: any) {
            response.status(400).send(error.message);
        }
    }

    /**
     * Deletes User.
     * @param request Request.
     * @param response Response.
     */
    public async deleteUserAsync(request: any, response: any): Promise<void> {
        await this.usersService.deleteUserAsync(request.params.id);
        response.sendStatus(204);
    }

}
