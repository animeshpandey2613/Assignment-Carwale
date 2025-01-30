using System.ComponentModel.DataAnnotations;
using Stocks.DataAccess.Entities;
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
        [Required]
        public string? MakeName{get; set;}
        [Required]
        public string? ModelName{get; set;}
        [Required]
        [Range(0, 2025)]
        public int Year{get; set;}
        [Required]
        [Range(0, 2100000)]
        public int Price{get; set;}
        [Required]
        public int Distance{get; set;}
        [Required]

        public FuelType Fuel{get; set;}

        
    }
    public class UpdateDto{
        [Required]
        public int Id {get; set;}
        [Required]
        public string? MakeName{get; set;}
        [Required]
        public string? ModelName{get; set;}
        [Required]
        public int Year{get; set;}
        [Required]
        public int Price{get; set;}
        [Required]
        public int Distance{get; set;}
        [Required]
        public FuelType Fuel{get; set;}
    }
}
