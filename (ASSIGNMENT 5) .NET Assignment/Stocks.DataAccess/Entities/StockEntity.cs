
using System.ComponentModel.DataAnnotations;
namespace Stocks.DataAccess.Entities{
    public record StockEntity{
        public int Id{get; init;}
        [Required]
        [MaxLength(200)]
        public string MakeName{get; init;}
        public int Year{get; init;}
        [Required]
        [MaxLength(200)]
        public string ModelName{get; init;}
        [Required]
        public int Price{get; init;}
        [Required]
        public int Distance{get; init;}
        [Required]
        [MaxLength(200)]
        public string Fuel{get; init;}


    }
}