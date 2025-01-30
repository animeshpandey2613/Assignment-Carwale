using System.Collections.Generic;
using AutoMapper;
using Stocks.API.Dtos;
using Stocks.DataAccess.Entities;
using Utils;

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
                if(!int.TryParse(t, out int number) || number > 5)
                throw new CustomException("Invalid Fuel Index!", "Please give numbers between 1 to 5, Insert '+' for multiple index", 400);
                Fuels.Add((FuelType)number);
            }
            return Fuels;
        }

        public int ExtractMinBudget(string? Budget){
            if(Budget == null) return 0;
            if(!Budget.Contains('-'))
            throw new CustomException("Invalid Budget Type", "Please give the budget in the format- 'MinBudget-MaxBudget'");
            return Math.Max(Convert.ToInt32(Budget.Split("-")[0]), 0)*100000;
        }
        public int ExtractMaxBudget(string? Budget){
            if(Budget == null) return 2100000;
            return Math.Min(Convert.ToInt32(Budget.Split("-")[1]), 21)*100000;
        }

    }
}