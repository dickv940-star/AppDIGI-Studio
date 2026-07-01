/*
==================================
AppDIGI Studio Core
Version 1.0
==================================
*/

const AppDIGI = {

    version: "1.0.0",

    currentProduct: null,

    currentMarketplace: null,

    setProduct(product){

        this.currentProduct = product;

    },

    getProduct(){

        return this.currentProduct;

    }

};
