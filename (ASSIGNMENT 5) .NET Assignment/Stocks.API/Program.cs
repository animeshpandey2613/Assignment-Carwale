using Stocks.API.Handlers;
using Stocks.API.Services;
using Stocks.DataAccess.Repositories;
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
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<IStockServices, StockServices>();
builder.Services.AddAutoMapper(typeof(StocksAutoMapperHandler), typeof(FilterAutoMapperHandler));
var app = builder.Build();

// Configure the HTTP request pipeline.

if(app.Environment.IsDevelopment()){
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.MapControllers();


app.Run();
