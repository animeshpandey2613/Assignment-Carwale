using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Stocks.DataAccess.Entities{
 public record FilterEntity
 {

    public List<FuelType> FuelType { get; init; }

    public int MinBudget { get; init; }
    public int MaxBudget { get; init; }

 }

 public enum FuelType{
    Petrol = 1,
    Diesel,
    CNG,
    Electric,
    Hybrid
 }
}