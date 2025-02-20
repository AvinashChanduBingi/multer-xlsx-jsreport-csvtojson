class CustomError extends Error
{
    constructor(message,status)
    {
        super(this.message)
        this.status = status;
    }
}
module.exports = CustomError