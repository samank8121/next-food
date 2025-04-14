import { ZodError } from 'zod';

const errorProducer = (error: unknown, generalErrorMessage: string) => {
  if (error instanceof ZodError) {
    return {
      error: error.errors
        .map((e) => {
          return `${e.path[0]}: ${e.message}`;
        })
        .join(', '),
    };
  }
  return { error: generalErrorMessage };
};

export default errorProducer;
