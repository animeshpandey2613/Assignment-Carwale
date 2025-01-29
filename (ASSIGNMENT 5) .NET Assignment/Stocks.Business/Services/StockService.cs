using System.Collections;
using Org.BouncyCastle.Asn1.Misc;
using Stocks.DataAccess.Entities;
using Stocks.DataAccess.Repositories;

namespace Stocks.API.Services{
    public class StockServices:IStockServices{
        public readonly IStockRepository _repostiory;
        public StockServices(IStockRepository repository){
            _repostiory = repository;
        }
        public async Task<IEnumerable<StockEntity>> GetAllStockAsync(FilterEntity Filters){
           return await _repostiory.GetAllAsync(Filters);
        }
        public async Task<StockEntity?> GetStockByIdAsync(int Id){
           return await _repostiory.GetByIdAsync(Id);
        }
        public async Task CreateStockAsync(StockEntity stock){
            await _repostiory.CreateAsync(stock);
        }
        public async Task UpdateStockAsync(StockEntity Stock){
            await _repostiory.UpdateAsync(Stock);
        }
        public async Task DeleteStockAsync(int Id){
            await _repostiory.DeleteAsync(Id);
        }
        public bool CheckIsValueForMoney(StockEntity Stock){
            if(Stock.Price <200000 && Stock.Distance < 10000) return true;
            return false;
        }
    }
}