using Stocks.API.Handlers;
using Stocks.API.Services;
using Stocks.DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Stocks.API.ErrorHandling;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        // Throw a custom exception with validation details
        throw new ValidationException("Please ensure all required fields are filled out correctly.")
        {
            Data = { { "ModelState", context.ModelState } }
        };
    };
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<IStockServices, StockServices>();
builder.Services.AddAutoMapper(typeof(StocksAutoMapperHandler), typeof(FilterAutoMapperHandler));
var app = builder.Build();
app.UseMiddleware<GlobalErrorHandler>();

// Configure the HTTP request pipeline.

if(app.Environment.IsDevelopment()){
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.MapControllers();


app.Run();
