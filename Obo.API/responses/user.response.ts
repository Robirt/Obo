import { RoleEntity } from "../entities/role.entity";

/**
 * User Response.
 */
export class UserResponse {

    /**
     * Id.
     */
    public id: string = '';

    /**
     * User Name.
     */
    public userName: string = '';

    /**
     * Email.
     */
    public email: string = '';

    /**
     * Role.
     */
    public role?: RoleEntity;

}
