using System.Data;
using Stocks.DataAccess.Entities;

namespace Stocks.DataAccess.Repositories{
    public interface IStockRepository{
        public Task<IEnumerable<StockEntity>> GetAllAsync(FilterEntity Filter);
        public Task<StockEntity?> GetByIdAsync(int id);
        public Task CreateAsync(StockEntity car);
        public Task UpdateAsync(StockEntity car);
        public Task DeleteAsync(int id);

    }
}