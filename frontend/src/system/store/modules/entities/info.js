export function infoEntity({message, errorMessage}){
    return {
        message, 
        errorMessage,
        copyWith: function({message, errorMessage}){
            const copy = {
                message: message ? message : this.message,
                errorMessage: errorMessage ? errorMessage : this.errorMessage
            }
            return new infoEntity(...copy)
        }
    }
}