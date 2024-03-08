function printAllProducts(idName, name, price, quantity) {
  $product = $("<tr>", {
    class: "product",
    id: idName,
  })
    .append(
      $("<td>", {
        class: "icon",
      }).append(
        $("<img>", {
          loading: "lazy",
          src: "../icons/biscuit.jpeg",
          alt: "image-icon",
        })
      )
    )
    .append(
      $("<td>", {
        class: "name",
        text: name,
      })
    )
    .append(
      $("<td>", {
        class: "quantity",
        text: quantity,
      })
    )
    .append(
      $("<td>", {
        class: "price",
        text: price,
      })
    );

  $("tbody").append($product);
}

async function aCheckIfDatabaseExists(databaseName) {
  const databases = await indexedDB.databases();
  return databases.some(function (db) {
    return db.name === databaseName;
  });
}
function checkIfDatabaseExists(databaseName) {
  return indexedDB.databases().then(function (databases) {
    return databases.some(function (db) {
      return db.name === databaseName;
    });
  });
}

var databaseName = "ProductsDB";
checkIfDatabaseExists(databaseName)
  .then(function (exists) {
    if (exists) {
      console.log(databaseName + " exists");
      // Proceed with opening the database connection
      getDatabaseItems();
    } else {
      console.log(databaseName + " does not exist");
      // Handle the case where the database does not exist
      $(".loadDataPrompt").removeClass("hidden");
    }
  })
  .catch(function (error) {
    console.error("Error checking if database exists:", error);
  });

const IndexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

function getDatabaseItems(
  dbName = "ProductsDB",
  version = 1,
  tableName = "allProducts"
) {
  const request = indexedDB.open(dbName, version);
  let returnResult = [];

  request.onsuccess = (e) => {
    const db = request.result;
    const transaction = db.transaction(tableName, "readonly");
    const products = transaction.objectStore(tableName);
    const nameIndex = products.index("nameIndex");

    let allProducts = products.getAll();

    allProducts.onsuccess = (result) => {
      let allProduct = result.target.result;
      console.log(allProduct);
      $.each(allProduct, function (i, product) {
        printAllProducts(
          product.id,
          product.name,
          product.price,
          product.quantityAvailable
        );
      });
    };
  };

  request.onerror = function (e) {
    console.error("there was an error openning the database", e.target.value);
  };
  return returnResult;
}

$("button#addSample").click(function () {
  $(".loadDataPrompt").addClass("hidden");
  loadSampleData();
  getDatabaseItems();
});

$("button#addDataItem").click(function () {
  $(".loadDataPrompt").addClass("hidden");
});

$(".loadDataPrompt i").click(function () {
  $(".loadDataPrompt").addClass("hidden");
});
$(".loadDataPrompt").click(function (e) {
  if (!$(e.target).closest(".promptContainer").length) {
    $(".loadDataPrompt").addClass("hidden");
  }
});
