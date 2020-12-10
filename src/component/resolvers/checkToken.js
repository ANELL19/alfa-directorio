export default ()=>{
    if(localStorage.getItem("Token")){
        return true

    }else{
        return false

    }
}