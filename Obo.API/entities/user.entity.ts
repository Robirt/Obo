import { RoleEntity } from "./role.entity";

/**
 * User Entity.
 */
export class UserEntity {

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
     * Hash.
     */
    public hash: string = '';

    /**
     * Salt.
     */
    public salt: string = '';

    /**
     * Role.
     */
    public role: RoleEntity = new RoleEntity();

    /**
     * Role Id.
     */
    public roleId: string = '';

}
