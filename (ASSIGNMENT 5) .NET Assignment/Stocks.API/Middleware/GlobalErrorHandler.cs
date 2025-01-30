using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using MySql.Data.MySqlClient;
using Mysqlx;
using AutoMapper;
using Utils;

namespace Stocks.API.ErrorHandling{
    public class GlobalErrorHandler{
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalErrorHandler> _logger;

        public GlobalErrorHandler(RequestDelegate next, ILogger<GlobalErrorHandler> logger){
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context){
            try{
                await _next(context);

            }catch(ValidationException ex){
                _logger.LogError(ex,"Validation Error Occoured!!");
                await HandleValidationExceptionAsync(context, ex);
            }catch(MySqlException ex){
                _logger.LogError(ex,"MySqlException Occoured!!");
                if(ex.Message.Contains("check_fuel"))
                await HandleFuelConstraintException(context, ex);
            }catch(CustomException ex){
                _logger.LogError(ex, "Internal Error");
                await HandleCustomException(context, ex);
            }catch(AutoMapperMappingException ex){
                _logger.LogError(ex, "AutoMapper Mapping Error!!");
                if (ex.InnerException is CustomException customEx){
                    await HandleCustomException(context, customEx);
                    return;
                }
                await HandleAnonymousException(context, ex);
            }catch(Exception ex){
                _logger.LogError(ex, "Internal Error");
                await HandleAnonymousException(context, ex);
            }
        }

        private static Task HandleValidationExceptionAsync(HttpContext context, Exception e){
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 400;
            var Response=new {
                Status="Error",
                StatusCode = context.Response.StatusCode,
                Message = "Validation Failed!",
                Details = e.Message
            };
            return context.Response.WriteAsync(JsonSerializer.Serialize(Response));
        }
        private static Task HandleFuelConstraintException(HttpContext context, Exception e){
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 400;
            var Response=new {
                Status="Error",
                StatusCode = context.Response.StatusCode,
                Message = "Incorrect fuel type!!",
                Details = "Please enter a valid fuel type. The permitted fuel values are 'Petrol', 'Deisel', 'CNG, 'Elcetric', and 'Hybrid'"
            };
            return context.Response.WriteAsync(JsonSerializer.Serialize(Response));
        }
        private static Task HandleCustomException(HttpContext context, CustomException e){
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 400;
            var Response=new {
                Status="Error",
                StatusCode = context.Response.StatusCode,
                Message = e.Message,
                Details = e.Details,
            };
            return context.Response.WriteAsync(JsonSerializer.Serialize(Response));
        }
        private static Task HandleAnonymousException(HttpContext context, Exception e){
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;
            var Response=new {
                Status="Error",
                StatusCode = context.Response.StatusCode,
                Message = "Internal Server Error",
                Details = "Something Went Wrong, Please try after some time!"
            };
            return context.Response.WriteAsync(JsonSerializer.Serialize(Response));
        }
    }
}