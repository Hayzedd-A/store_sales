const IndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
const request = indexedDB.open('ProductsDB', 1);

request.onupgradeneeded = (e) => {
    const db = e.target.result
    const objectStore = db.createObjectStore("allProducts", { keyPath: 'id'})
    objectStore.createIndex('nameIndex', 'name', {unique: true})
    objectStore.createIndex('priceIndex', 'price', {unique: false})
    objectStore.createIndex('quantityIndex', 'quantityAvailable',{nique: false})
    objectStore.createIndex('imageIndex', 'imageLink', {unique: false})

    console.log('on upgrade completed')
}

request.onsuccess = (e) => {
  const db = request.result
  const transaction = db.transaction("allProducts", 'readwrite')
  const products = transaction.objectStore("allProducts")

  const data = [  
    // {
    //     id: "p102",
    //     name: "Retro Style Alarm Clock",
    //     price: 9.1,
    //     quantityAvailable: 12,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p103",
    //     name: "Stainless Steel Water Bottle",
    //     price: 1.66,
    //     quantityAvailable: 34,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p104",
    //     name: "Bamboo Cutting Board Set",
    //     price: 2.94,
    //     quantityAvailable: 12,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p105",
    //     name: "Aromatherapy Essential Oil Diffuser",
    //     price: 9.12,
    //     quantityAvailable: 10,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p106",
    //     name: "Portable Bluetooth Speaker",
    //     price: 6.99,
    //     quantityAvailable: 27,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p107",
    //     name: "Reusable Silicone Food Storage Bags",
    //     price: 6.4,
    //     quantityAvailable: 57,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p108",
    //     name: "Handcrafted Ceramic Mug",
    //     price: 9.89,
    //     quantityAvailable: 13,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p109",
    //     name: "Foldable Laptop Stand",
    //     price: 8.65,
    //     quantityAvailable: 44,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p110",
    //     name: "Organic Cotton Bath Towel Set",
    //     price: 3.28,
    //     quantityAvailable: 24,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p111",
    //     name: "Miniature Succulent Plant Collection",
    //     price: 7.46,
    //     quantityAvailable: 54,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p112",
    //     name: "Eco-Friendly Bamboo Toothbrush Set",
    //     price: 3.45,
    //     quantityAvailable: 11,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p113",
    //     name: "Himalayan Salt Lamp",
    //     price: 9.17,
    //     quantityAvailable: 17,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p114",
    //     name: "Leather Journal Notebook",
    //     price: 6.94,
    //     quantityAvailable: 32,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p115",
    //     name: "Stainless Steel Cocktail Shaker Set",
    //     price: 8.59,
    //     quantityAvailable: 52,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p116",
    //     name: "Vintage Style Desk Lamp",
    //     price: 7.28,
    //     quantityAvailable: 35,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p117",
    //     name: "versace Style bed Lamp",
    //     price: 6.01,
    //     quantityAvailable: 10,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p118",
    //     name: "Glass Tea Infuser Bottle",
    //     price: 4.28,
    //     quantityAvailable: 9,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p119",
    //     name: "plastic Tea Infuser Bottle",
    //     price: 32.1,
    //     quantityAvailable: 32,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // },
    // {
    //     id: "p120",
    //     name: "Silicone Baking Mat Set",
    //     price: 70,
    //     quantityAvailable: 44,
    //     imageLink: "https://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpghttps://shoponclick.ng/wp-content/uploads/2020/06/McVities-Digestive-Wheat-Biscuit-100g-100x100.jpg"
    // }
  ]

$.each(data, function(v, value) {
  console.log(value.id, value.name)
  
  const putting = products.put(value)

  putting.onsuccess = () => {
    console.log('submitted')
  }

  putting.onerror = (e) => {
    console.log(e.target.error)
    }
  })

}

request.onerror = function(e) {
    console.error('there was an error')
    console.error(e)
}


