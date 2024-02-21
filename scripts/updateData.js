// const IndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

function updateDatabase(cartItems, dbName='ProductsDB', version=1, tableName='allProducts') {

    let success = false
    const request = indexedDB.open(dbName, version);
    var returnResult = []
    console.log('function started');
    
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
      const transaction = db.transaction(tableName, 'readwrite')
      const products = transaction.objectStore(tableName)
      
      
      $.each(cartItems, function(i, value) {

        let getItem = products.get(value.id)

        getItem.onsuccess = function(event) {
          let item = event.target.result
          item.quantityAvailable = parseInt(item.quantityAvailable) - parseInt(value.quantity)

          let updateItem = products.put(item)

          updateItem.onsuccess = (event) => {
            console.log('Updated successfully')
          }
          updateItem.onerror = (event) => {
            console.log('error encounted', event.target.error)
          }
        }
        getItem.onerror = (event) => {
          console.log('error encounted', event.target.error)
        }
      })
      
      // namerequest.onsuccess = function(event) {
      //   const cursor = event.target.result;
      //   if (cursor) {
      //     let cursoreName = cursor.value.name.toLowerCase()
      //     if (cursoreName.includes(partialName)) {
      //       returnResult.push(cursor.value)
      //     }
      //     cursor.continue()
      //   }
      // }
      // namerequest.onerror = (error) => {
      //   console.log('name request error', error.target.value)
      // }
      // console.log('on success completed')
      
    }
    
    request.onerror = function(e) {
      console.error('there was an error openning the database', e.target.value)
      // console.error(e)
    }
    console.log('function completed')
    
    return success
  // })

}
