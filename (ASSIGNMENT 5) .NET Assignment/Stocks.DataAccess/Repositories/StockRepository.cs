using Stocks.DataAccess.Entities;
using Microsoft.Extensions.Configuration;
using System.Data;
using MySql.Data.MySqlClient;
using Dapper;
namespace Stocks.DataAccess.Repositories
{
    public class StockRepository : IStockRepository
    {
        private readonly IConfiguration _config;
        private readonly string? _connectionString;
        public StockRepository(IConfiguration config){
            _config = config;
            _connectionString = _config.GetConnectionString("Default");
        }

        public IDbConnection GetConnection(){
            return new MySqlConnection(_connectionString);
        }
        public async Task<IEnumerable<StockEntity>> GetAllAsync(FilterEntity filter)
        {
            Console.WriteLine(filter.FuelType);
            using var connection = GetConnection();
             var query = @"select Id, MakeName, Year, ModelName, Price, Distance, Fuel 
                  from Car where Price > @MinBudget and Price < @MaxBudget";
            if(filter.FuelType.Count != 0){
                query += " and Fuel in @FuelArray";
            }
            var StockList = await connection.QueryAsync<StockEntity>(query, new 
            {
                FuelArray = filter.FuelType.Select(f => f.ToString()).ToArray(),
                filter.MinBudget,
                filter.MaxBudget
            });
            return StockList;
        }

        public async Task<StockEntity?> GetByIdAsync(int id)
        {
            using var connection = GetConnection();
            string query = @"select Id, MakeName, Year, ModelName, Price, Distance, Fuel from Car where Id = @id";
            var car = await connection.QueryFirstOrDefaultAsync<StockEntity>(query,new {id});
            return car;
        }
        public async Task CreateAsync(StockEntity stock)
        {
            using var connection = GetConnection();
            string query = @"INSERT INTO Car (MakeName, Year, ModelName, Price, Distance, Fuel)
            VALUES(@MakeName, @Year, @ModelName, @Price, @Distance, @Fuel)";
            var car = await connection.QueryFirstOrDefaultAsync<StockEntity>(query,new {
                stock.Distance,
                stock.Fuel,
                stock.MakeName,
                stock.Price,
                stock.ModelName,
                stock.Year
            });
        }

        public async Task DeleteAsync(int id)
        {
            using var connection = GetConnection();
            string query = @"delete from Car where Id = @id";
            await connection.ExecuteAsync(query,new { id });
        }

        public async Task UpdateAsync(StockEntity stock)
        {
            using var connection = GetConnection();
            string query = @"update Car set MakeName = @MakeName, Year = @Year, 
                ModelName = @ModelName, Price = @Price, Distance = @Distance, Fuel = @Fuel
                where Id = @Id";
            await connection.ExecuteAsync(query, new {
                stock.Distance,
                stock.Fuel,
                stock.MakeName,
                stock.Price,
                stock.ModelName,
                stock.Year,
                stock.Id
            });
        }
    }
}