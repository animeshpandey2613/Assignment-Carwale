const urlModify=(url, state)=>{
    const filterStatus = [false, false];
    let newURL = url;
    console.log(state);
    if(state.fuel.length>0){
        filterStatus[0] = true;
        newURL = newURL + `?fuel=${state.fuel.join('+')}`;
    }
    if(state.minBudget !== 0 || state.maxBudget !== 1000){
        if(filterStatus[0] == false){
            newURL = newURL + `?budget=${state.minBudget}-${state.maxBudget}`;
        } else {
            newURL = newURL + `&budget=${state.minBudget}-${state.maxBudget}`;
        }
    }
    console.log(newURL)
    return newURL;
}

export default urlModify;