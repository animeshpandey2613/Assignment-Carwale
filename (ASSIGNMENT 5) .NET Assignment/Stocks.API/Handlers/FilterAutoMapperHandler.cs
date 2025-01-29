using System.Collections.Generic;
using AutoMapper;
using Stocks.API.Dtos;
using Stocks.DataAccess.Entities;

namespace Stocks.API.Handlers{
    public class FilterAutoMapperHandler:Profile{
        public FilterAutoMapperHandler(){
            CreateMap<FilterDto, FilterEntity>().ForMember((item)=>item.FuelType, opt=>opt.MapFrom(src=>ExtractFuels(src.FuelType)))
            .ForMember((item)=>item.MinBudget, opt=>opt.MapFrom(src=>ExtractMinBudget(src.Budget)))
            .ForMember((item)=>item.MaxBudget, opt=>opt.MapFrom(src=>ExtractMaxBudget(src.Budget))).ReverseMap();
        }

        public IEnumerable<FuelType>? ExtractFuels(string? FuelString){
            if(FuelString == null) return null;
            List<FuelType> Fuels = new();
            string [] FuelStringArr = FuelString.Split('+');
            foreach(string t in FuelStringArr){
                Fuels.Add((FuelType)Convert.ToInt16(t));
            }
            return Fuels;
        }

        public int ExtractMinBudget(string? Budget){
            if(Budget == null) return 0;
            return Math.Max(Convert.ToInt32(Budget.Split("-")[0]), 0)*100000;
        }
        public int ExtractMaxBudget(string? Budget){
            if(Budget == null) return 2100000;
            return Math.Min(Convert.ToInt32(Budget.Split("-")[1]), 21)*100000;
        }

    }
}