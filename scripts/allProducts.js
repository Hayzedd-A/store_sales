function printAllProducts (idName, name, price, quantity) {

    $product = $('<tr>', {
        class: 'product',
        id: idName
    })
    .append(
        $('<td>', {
            class: 'icon'
        }).append($('<img>', {
            loading: 'lazy',
            src: '../icons/biscuit.jpeg',
            alt: 'image-icon'
        }))
    )
    .append(
        $('<td>', {
            class: 'name',
            text: name
        }))
    .append(
        $('<td>', {
            class: 'quantity',
            text: quantity
        }))
    .append(
        $('<td>', {
            class: 'price',
            text: price
        }))


    $('tbody').append($product)
}

const IndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

function getDatabaseItems(dbName='ProductsDB', version=1, tableName='allProducts') {
 
    const request = indexedDB.open(dbName, version);
    let returnResult = []

    
    request.onsuccess = (e) => {
      const db = request.result
      const transaction = db.transaction(tableName, 'readonly')
      const products = transaction.objectStore(tableName)
      const nameIndex = products.index('nameIndex')
      // const priceIndex = products.index('priceIndex')
      // const quantityIndex = products.index('quantity')
      // const imageIndex = products.index('imageLink')
      
      let allProducts = products.getAll()

      allProducts.onsuccess = (result) => {
        let allProduct = result.target.result
        console.log(allProduct)
        $.each(allProduct, function(i, product) {
            printAllProducts(product.id, product.name, product.price, product.quantityAvailable)

        })
      }
      
    //   partialName = partialName.toLowerCase();
      
      
    //   const namerequest = nameIndex.openCursor();
    //   namerequest.onsuccess = function(event) {
    //     const cursor = event.target.result;
    //     if (cursor) {
    //       let cursoreName = cursor.value.name.toLowerCase()
    //       if (cursoreName.includes(partialName)) {
    //         value = cursor.value
    //         createSalesProduct(value.id, value.name, value.price, value.quantityAvailable)
    //       }
    //       cursor.continue()
    //     }
    //   }
    //   namerequest.onerror = (error) => {
    //     console.log('name request error', error.target.value)
    //   }      
    }
    
    request.onerror = function(e) {
      console.error('there was an error openning the database', e.target.value)

    }
    return returnResult

}
getDatabaseItems()