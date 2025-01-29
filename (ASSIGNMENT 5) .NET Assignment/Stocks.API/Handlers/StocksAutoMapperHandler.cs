using AutoMapper;
using Stocks.API.Dtos;
using Stocks.API.Services;
using Stocks.DataAccess.Entities;

namespace Stocks.API.Handlers{
    public class StocksAutoMapperHandler:Profile{
        public StocksAutoMapperHandler(){
            CreateMap<StockEntity, GetDto>().ForMember((item)=>item.CarName, opt=>opt.MapFrom(src=>src.Year +" "+ src.MakeName +" "+ src.ModelName))
            .ForMember((item)=>item.FormattedPrice, opt=>opt.MapFrom(src=>$"Rs.{src.Price/100000.0} Lacs"))
            .ForMember((item)=>item.Distance, opt=>opt.MapFrom(src=>$"{src.Distance} Kms"))
            .ForMember((item)=>item.IsValueForMoney, opt=>opt.Ignore()).ReverseMap();
            CreateMap<CreateDto, StockEntity>().ReverseMap();
            CreateMap<UpdateDto, StockEntity>().ReverseMap();
        }
    }
}