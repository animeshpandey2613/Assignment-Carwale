const SortData=(data)=>{
    console.log("without sort", data);
data.sort((a, b) => {
    console.log(a.priceNumeric, b.priceNumeric)
    return (a.priceNumeric-b.priceNumeric)
});
console.log("sorted",data);
}
export default SortData;