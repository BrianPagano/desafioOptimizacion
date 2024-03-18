const ProductRepository = require ('../repositories/product.repository')
const productReposity = new ProductRepository()

const getProductByID = async pid => {
    try {
      const findID = await productReposity.getProductByID(pid)
      return findID
    } catch (error) {
        throw error
      } 
  }

const addProduct = async product => {
 try {
      const result = await productReposity.addProduct(product) 
      return result
  } catch (error) {
      throw error
    }  
}

const updateProduct = async productUpdated => {
  try {
       await productReposity.updateProduct(productUpdated) 
   } catch (error) {
       throw error
     }  
 }

 const deleteProduct = async pid => {
  try {
       const result = await productReposity.deleteProduct(pid) 
       return result
   } catch (error) {
       throw error
     }  
 }
 
 const updateStock = async productsInStock => {
  try {
      const result = await productReposity.updateStock(productsInStock) 
      return result
  } catch (error) {
      throw error
    }  
 }
 
  module.exports = {
    getProductByID, addProduct, updateProduct, deleteProduct, updateStock
  }