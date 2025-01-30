using System.ComponentModel.DataAnnotations;

namespace Stocks.API.Dtos{
    public class GetDto{
        public int Id{get; set;}
        public string? MakeName{get; set;}
        public string? ModelName{get; set;}
        public string? CarName{get; set;}
        public int Year{get; set;}
        public int Price{get; set;}
        public string? FormattedPrice{get; set;}
        public string? Distance{get; set;}
        public string? Fuel{get; set;}
        public bool IsValueForMoney{get; set;}
    }
    public class CreateDto{
        public string? MakeName{get; set;}
        public string? ModelName{get; set;}
        public int Year{get; set;}
        public int Price{get; set;}
        public int Distance{get; set;}
        public string? Fuel{get; set;}
    }
    public class UpdateDto{
        public int Id {get; set;}
        public string? MakeName{get; set;}
        public string? ModelName{get; set;}
        public int Year{get; set;}
        public int Price{get; set;}
        public int Distance{get; set;}
        public string? Fuel{get; set;}
    }
}