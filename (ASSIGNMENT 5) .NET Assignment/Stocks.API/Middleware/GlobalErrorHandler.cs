using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Mysqlx;

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
                _logger.LogError(ex,"Unhandled Error Occoured!!");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception e){
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
    }
}