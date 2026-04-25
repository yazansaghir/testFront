const { ZodError } = require("zod");

const validate = (schema) => (req, _res, next) => {
  try {
    const parsed = schema.parse({
      params: req.params,
      query: req.query,
      body: req.body,
    });

    req.params = parsed.params || req.params;
    req.query = parsed.query || req.query;
    req.body = parsed.body || req.body;

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next({
        statusCode: 400,
        message: "Validation failed",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    next(error);
  }
};

module.exports = validate;
