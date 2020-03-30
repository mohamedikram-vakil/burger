const updatedObject=(oldObject,updatedProperties)=>{
    return{
        ...oldObject,
        ...updatedProperties
    }
}
export default updatedObject