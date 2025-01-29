using Stocks.DataAccess.Entities;

namespace Stocks.API.Services{
    public interface IStockServices{
        public Task<IEnumerable<StockEntity>> GetAllStockAsync(FilterEntity Filter);
        public Task<StockEntity?> GetStockByIdAsync(int Id);
        public Task CreateStockAsync(StockEntity stock);
        public Task UpdateStockAsync(StockEntity stock);
        public Task DeleteStockAsync(int Id);
        public bool CheckIsValueForMoney(StockEntity stock);
    }
}