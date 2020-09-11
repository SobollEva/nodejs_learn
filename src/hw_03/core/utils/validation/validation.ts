
function    errorResponse(schemaErrors: any) {
        const errors = schemaErrors.map((error: any) => {
            let {path, message} = error;
            return {path, message};
        });
        return {
            status: 'error',
            errors
        }
    }

 function validationSchema(schema: any) {
        return (req: any, res: any, next: any) => {
            const result = schema.validate(req.body, {
                abortEarly: false,
                allowUnknown: false
            });
            if (result.error) {
                res.status(400).json(errorResponse(result.error.details))
            } else {
                next();
            }
        }
    }

module.exports = validationSchema;
