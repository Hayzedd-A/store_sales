const IndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

function getDatabaseItems(partialName, dbName='ProductsDB', version=1, tableName='allProducts') {
 
    const request = indexedDB.open(dbName, version);
    let returnResult = []
    
    request.onupgradeneeded = (e) => {
      const db = e.target.result
      const objectStore = db.createObjectStore(tableName, { keyPath: 'id'})
      objectStore.createIndex('nameIndex', 'name', {unique: true})
      objectStore.createIndex('priceIndex', 'price', {unique: false})
      objectStore.createIndex('quantityIndex', 'quantityAvailable',{nique: false})
      objectStore.createIndex('imageIndex', 'imageLink', {unique: false})
      
      console.log('on upgrade completed')
    }
    
    request.onsuccess = (e) => {
      const db = request.result
      const transaction = db.transaction(tableName, 'readonly')
      const products = transaction.objectStore(tableName)
      const nameIndex = products.index('nameIndex')
      // const priceIndex = products.index('priceIndex')
      // const quantityIndex = products.index('quantity')
      // const imageIndex = products.index('imageLink')
      
      
      
      partialName = partialName.toLowerCase();
      
      
      const namerequest = nameIndex.openCursor();
      namerequest.onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
          let cursoreName = cursor.value.name.toLowerCase()
          if (cursoreName.includes(partialName)) {
            value = cursor.value
            createSalesProduct(value.id, value.name, value.price, value.quantityAvailable)
          }
          cursor.continue()
        }
      }
      namerequest.onerror = (error) => {
        console.log('name request error', error.target.value)
      }      
    }
    
    request.onerror = function(e) {
      console.error('there was an error openning the database', e.target.value)

    }
    return returnResult

}
