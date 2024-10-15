export const IsPercentage = (val:string) => {
    if (val.endsWith("%")) {
        return true
    }
    
}

export const IsPosOrNeg = (val:string) => {
    if (val.startsWith("+")) {
        return "pos"
    } else if(val.startsWith("-")) {
        return "neg"
    }else{
        return "pos"
    }
}

export const IsGreaterThan100 = (val:string) => {
    if (parseInt(val.replace("%", "")) > 100 ){
        return true
    }else{
        return false
    }
}