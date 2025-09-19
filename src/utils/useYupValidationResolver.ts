import { useCallback } from "react";
import { ValidationError } from "yup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: unknown) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
        // @ts-expect-error errors is ValidationError
      } catch (errors: ValidationError) {
        return {
          values: {},
          errors: errors?.inner?.reduce(
            (
              allErrors: Record<string, unknown>,
              currentError: import("yup").ValidationError
            ) => ({
              ...allErrors,
              [currentError.path as string]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );
