using Moq;
using Stocks.API.Services;
using Stocks.DataAccess.Entities;
using Stocks.DataAccess.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;

namespace Stocks.Tests;

public class UnitTest1
{

    private readonly Mock<IStockRepository> _repositoryStub = new();
    private readonly Random rand = new();


    [Fact]
    public async Task GetAllStocksAsync_WithStoredStock_ReturnsExpectedStock()
    {
        //Arrange
         var expectedStockList = new List<StockEntity>
            {
                CreateNewStock(),
                CreateNewStock(),
                CreateNewStock(),
                CreateNewStock()
            };
        _repositoryStub.Setup(repo=>repo.GetAllAsync(It.IsAny<FilterEntity>()))
        .ReturnsAsync(expectedStockList);
        var services = new StockServices(_repositoryStub.Object);


        //Act
        var Result = await services.GetAllStockAsync(CreateNewFilter());

        //Assert
        
        var dto = Result;

        // Additional assertions can be added here if needed
        Result.Should().BeEquivalentTo(
            expectedStockList,
            Option=>Option.ComparingByMembers<StockEntity>()
        );
    }


    [Fact]
    public async Task GetStocksByIdAsync_WithId_ReturnsExpcetedStock()
    {
        //Arrange
         var expectedStock = CreateNewStock();
        _repositoryStub.Setup(repo=>repo.GetByIdAsync(It.IsAny<int>()))
        .ReturnsAsync(expectedStock);
        var services = new StockServices(_repositoryStub.Object);


        //Act
        var Result = await services.GetStockByIdAsync(rand.Next(50));

        //Assert
        
        var dto = Result;

        // Additional assertions can be added here if needed
        Result.Should().BeEquivalentTo(
            expectedStock,
            Option=>Option.ComparingByMembers<StockEntity>()
        );
    }
    private StockEntity CreateNewStock(){
        return new StockEntity{
            MakeName=Guid.NewGuid().ToString(),
            ModelName=Guid.NewGuid().ToString(),
            Distance=rand.Next(100),
            Id=rand.Next(100),
            Year=rand.Next(100),
            Price=rand.Next(100),
            Fuel=Convert.ToString((FuelType)rand.Next(7)) ?? string.Empty
        };
    }
    private FilterEntity CreateNewFilter(){
        return new FilterEntity{
            FuelType=new List<FuelType>{FuelType.Petrol, FuelType.Diesel, FuelType.Electric},
            MinBudget = rand.Next(21),
            MaxBudget = rand.Next(21)
        };
    }
}
