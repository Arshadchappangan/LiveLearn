export class ApiResponse {
    static success(data: unknown, message: string = "Success") {
        return {
            success: true,
            message,
            data
        }
    }

    static error(message: string = "Error") {
        return {
            success: false,
            message
        }
    }       
}