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
     * Creates User.
     * @param request Request.
     * @param response Response.
     */
    public async createUserAsync(request: any, response: any): Promise<void> {
        await this.usersService.createUserAsync(request.body);
        response.sendStatus(201);
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
     * Deletes User.
     * @param request Request.
     * @param response Response.
     */
    public async deleteUserAsync(request: any, response: any): Promise<void> {
        await this.usersService.deleteUserAsync(request.params.id);
        response.sendStatus(204);
    }

}
