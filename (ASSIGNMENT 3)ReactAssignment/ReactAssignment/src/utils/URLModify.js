const urlModify=(url, state)=>{
    const filterStatus = [false, false];
    let newURL = url;
    if(state.fuel.length>0){
        filterStatus[0] = true;
        newURL = newURL + `?fuel=${state.fuel.join('+')}`;
    }
    if(state.budget.min !== 0 || state.budget.max !== 1000){
        if(filterStatus[0] == false){
            newURL = newURL + `?budget=${state.budget.min}-${state.budget.max}`;
        } else {
            newURL = newURL + `&budget=${state.budget.min}-${state.budget.max}`;
        }
    }
    return newURL;
}

export default urlModify;