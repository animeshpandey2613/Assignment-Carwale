using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stocks.API.Dtos;
using Stocks.API.Services;
using Stocks.DataAccess.Entities;
using Stocks.DataAccess.Repositories;
using Utils;

namespace Stocks.API.Controllers{
        [ApiController]
        [Route("api/[Controller]")]
    public class StockController:ControllerBase{
        private readonly IMapper _mapper;
        private readonly IStockServices _services;
        public StockController(IMapper mapper, IStockServices services){
            _mapper = mapper;
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ViewAllStocks([FromQuery] FilterDto filters){
            var filterEntity = _mapper.Map<FilterDto, FilterEntity>(filters);
            var stockEntities = await _services.GetAllStockAsync(filterEntity);
            List<GetDto> DtoList = new();
            foreach (var entity in stockEntities){
            var Dto = _mapper.Map<StockEntity, GetDto>(entity);
            Dto.IsValueForMoney = _services.CheckIsValueForMoney(entity);
            DtoList.Add(Dto);
            }
            return Ok(DtoList);
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> ViewStocksById(int Id){
            var stockEntity = await _services.GetStockByIdAsync(Id);
            var Dto = _mapper.Map<StockEntity, GetDto>(stockEntity);
            return Ok(Dto);
        }
        [HttpPost]
        public async Task CreateStocks([FromBody] CreateDto stockDto){
            var stockEntity = _mapper.Map<CreateDto, StockEntity>(stockDto);
            await _services.CreateStockAsync(stockEntity);
        }
        [HttpPatch]
        public async Task UpdateStocks([FromBody] UpdateDto stockDto){
            if(stockDto.Id <= 0)
            throw new CustomException("Stock Id not Available!", "Please provide the Stock Id of the stock you want to update.", 400);
            var stockEntity = _mapper.Map<UpdateDto, StockEntity>(stockDto);
            await _services.UpdateStockAsync(stockEntity);
        }
        [HttpDelete]
        public async Task DeleteStocks(int Id){
            if(Id == 0)
            throw new CustomException("Stock Id not Available!", "Please provide the Stock Id of the stock you want to delete.", 400);
            await _services.DeleteStockAsync(Id);
        }
    }
}