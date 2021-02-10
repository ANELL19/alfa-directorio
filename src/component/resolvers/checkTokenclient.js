export default ()=>{
    if(localStorage.getItem("TokenClient")){
        return true

    }else{
        return false

    }
}