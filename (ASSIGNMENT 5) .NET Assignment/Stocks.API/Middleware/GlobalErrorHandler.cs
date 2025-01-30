using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using MySql.Data.MySqlClient;
using Mysqlx;
using AutoMapper;
using MySqlX.XDevAPI.Common;
using System.Data;

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

            }catch(Exception ex){
                _logger.LogError(ex, "Internal Error");
                await HandleExceptionAsync(context, ex);
            }
        }
        private static async Task HandleExceptionAsync(HttpContext context, Exception e){
            context.Response.ContentType = "application/json";
            object response;
            switch(e){
            case ValidationException:
                context.Response.StatusCode = 400;
                response = new {
                    Status = "Error",
                    StatusCode = context.Response.StatusCode,
                    Message = "Validation Exception!",
                    Details = e.Message
                };
                break;
            case KeyNotFoundException:
                context.Response.StatusCode = 404;
                response = new {
                    Status= "Error",
                    StatusCode = context.Response.StatusCode,
                    Message = "KeyNotFoundException",
                    Details = e.Message
                };
                break;
            case ArgumentException:
                context.Response.StatusCode = 400;
                response = new {
                    Status= "Error",
                    StatusCode = context.Response.StatusCode,
                    Message = "Argument Exception",
                    Details = e.Message
                };
                break;
            case NullReferenceException:
                context.Response.StatusCode = 400;
                response = new{
                    Status = "Error",
                    StatusCode = context.Response.StatusCode,
                    Message="Null Reference Exception",
                    Details = e.Message
                };
                break;
            default:
                context.Response.StatusCode = 500;
                response = new {
                    Status = "Error",
                    StatusCode = context.Response.StatusCode,
                    Message = "Internal Server Error",
                    Details = e.Message
                };
                break;
            
            }
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}
}