import { NextFunction, Request, Response } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import { Exception, ExceptionType } from "../models/exception.model";
import { OpenApiRequestHandler } from "express-openapi-validator/dist/framework/types";
import path from "path";

const rootPath = path.resolve(__dirname, "../../");
export const openApiValidator = (
  coreVersion: string = ""
): OpenApiRequestHandler[] => {
  const apiSpecPath = coreVersion
    ? `schemas/core_${coreVersion}.yaml`
    : `schemas/core.yaml`;

  console.log(
    "\n\n",
    apiSpecPath,
    "\n\n",
    {
      apiSpec: apiSpecPath,
      validateRequests: true,
      validateResponses: false,
      $refParser: {
        mode: "dereference"
      }
    },
    "\n\n"
  );
  return OpenApiValidator.middleware({
    apiSpec: apiSpecPath,
    validateRequests: true,
    validateResponses: false,
    $refParser: {
      mode: "dereference"
    }
  });
};

export const schemaErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Exception) {
    next(err);
  } else {
    const errorData = new Exception(
      ExceptionType.OpenApiSchema_ParsingError,
      "OpenApiValidator Error",
      err.status,
      err
    );
    next(errorData);
  }
};

// const openApiValidatorMiddleware = [...openApiValidator, schemaErrorHandler];
// export default openApiValidatorMiddleware;
