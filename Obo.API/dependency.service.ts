/**
 * Dependency Service.
 */
export class DependencyService {

    /**
     * Services.
     */
    private static services: Map<any, any> = new Map();

    /**
     * Adds Service.
     * @param serviceType Service Type.
     * @param service Service Instance.
     */
    public static addService<T>(serviceType: new (...args: any[]) => T, service: T): void {
        this.services.set(serviceType, service);
    }

    /**
     * Gets Service.
     * @param serviceType Service Type.
     * @returns Service Instance.
     */
    public static getService<T>(serviceType: new (...args: any[]) => T): T {
        const service = this.services.get(serviceType);
        if (service === undefined) throw new Error(`Service ${serviceType.name} is not registered.`);
        
        return service as T;
    }

}
