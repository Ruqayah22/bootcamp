import { Result } from 'express-validator';

export function formatBodyErrorsResponse(errors: Result) {
    return errors.array().map(err => {
        return { message: `${err.msg} in ${err.param}` }
    });
}