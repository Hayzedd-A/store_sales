
// Function to read and parse a CSV file
function readCSVFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = function(event) {
        const lines = event.target.result.split('\n').map(line => line.trim());
        const products = [];
  
        // Parse each line of the CSV file
        lines.forEach(line => {
          const [id, name, price, quantityAvailable, imageLink] = line.split(',');
          products.push({
            id: id.trim(),
            name: name.trim(),
            price: parseFloat(price.trim()),
            quantityAvailable: parseInt(quantityAvailable.trim()),
            imageLink: imageLink.trim()
          });
        });
  
        resolve(products);
      };
  
      reader.onerror = function(event) {
        reject(event.target.error);
      };
  
    //   reader.readAsText(file);
    });
}

// Function to populate IndexedDB with data from a CSV file
async function populateIndexedDB(file) {
    try {
        const products = await readCSVFile(file);
        const request = indexedDB.open('ProductsDB', 1);

        // Open a transaction to the IndexedDB
        request.onsuccess = (e) => {
            
            const transaction = db.transaction("allProducts", "readwrite");
            const objectStore = transaction.objectStore("products");

            // Put each product into the object store
            products.forEach(product => {
            const request = objectStore.put(product);
            request.onerror = function(event) {
                console.error("Error adding product:", event.target.error);
            };
            });

            transaction.oncomplete = function() {
            console.log("Products added to IndexedDB successfully!");
            };   
        }
    }   
    catch (error) {
            console.error("Error reading CSV file:", error);
    }
}

populateIndexedDB('products.csv')