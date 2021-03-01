export class BadRequestError extends Error {
    constructor(error) {
        console.log(error);
        if (error) {
            super(error.message);

            this.data = { error };
        }
        this.statusCode = 401;
    }
}

export class NotFoundError extends Error {
    constructor(error) {
        super(error.message);

        this.data = { error };
        this.statusCode = 404;
    }
}
