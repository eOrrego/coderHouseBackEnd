// export default class customError extends Error {
//     constructor(message, status) {
//         super(message);
//         this.status = status;
//     }
// }

export default class customError {
    static createCustomError({ name, message, cause }) {
        const customError = new Error(message, { cause });
        customError.name = name;
        throw customError;
    }
}