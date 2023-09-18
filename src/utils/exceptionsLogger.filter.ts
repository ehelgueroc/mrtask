import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

// this filter could be used on:
// - all routes
// - as a filter on providers controller
// - bind the filter to each endpoint with @UseFilter
// but this is not the best approach. NestJS has a built-in Logger for this

// decorator to catch all exceptions
@Catch()
export class ExceptionLoggerFilter extends BaseExceptionFilter {
  // ArgumentsHost gives access to execution context
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('Exception thrown', exception);
    super.catch(exception, host);
  }
}
