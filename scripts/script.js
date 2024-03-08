let checkoutAmount = 0;
let cartItems = [];

let myModal = new bootstrap.Modal("#myModal");

let modalItems = (checkoutName, checkoutQuantity, checkoutAmount) => {
  let $checkoutTR = $("<tr>")
    .append($("<td>").text(checkoutName))
    .append($("<td>").text(checkoutQuantity))
    .append($("<td>").text(checkoutAmount));

  $("#myModal tbody").append($checkoutTR);
};

function createSalesProduct(idName, name, price, quantity) {
  let disable = false;
  if (!quantity) {
    disable = true;
  }
  $product = $("<div>", {
    class: "product",
    id: idName,
  })
    .append(
      $("<div>", {
        class: "icon",
      }).append(
        $("<img>", {
          loading: "lazy",
          src: "icons/biscuit.jpeg",
          alt: "image-icon",
        })
      )
    )
    .append(
      $("<div>", {
        class: "details",
      })
        .append(
          $("<div>", {
            class: "name",
            text: name,
          })
        )
        .append(
          $("<div>", {
            class: "price_availability",
          })
            .append(
              $("<div>", {
                class: "naira price",
                text: price,
              })
            )
            .append(
              $("<div>", {
                class: "availability",
              })
                .append(
                  $("<span>", { id: "quantityAvailable", text: quantity })
                )
                .append($("<span>").text("  quantity available"))
            )
        )
    )
    .append(
      $("<div>", {
        class: "quantity",
      })
        .append($("<button>", { class: "minus", text: "-" }))
        .append(
          $("<span>", { class: "number" }).append(
            $("<input>", {
              id: "saleQuantity",
              type: "number",
              value: 1,
            })
          )
        )
        .append($("<button>", { class: "plus", text: "+" }))
    )
    .append(
      $("<div>", { class: "add" }).append(
        $("<button>", {
          id: idName,
          class: "add",
          text: "ADD",
          disabled: disable,
        })
      )
    );

  $(".productList.sales").append($product);
}

function createCartProduct(idName, name, quantity, price, total) {
  $tr = $("<tr>", { id: idName })
    .append($("<td>").text(name))
    .append($("<td>", { id: "quantityPurchase", text: quantity }))
    .append($("<td>", { class: "naira", text: price }))
    .append($("<td>", { class: "naira", text: total }))
    .append(
      $("<td>", { class: "action" })
        // .append($('<button>', {id: 'edit', text: 'Edit'}))
        .append($("<button>", { id: "delete", text: "Delete" }))
    );
  $(".checkout tbody").append($tr);
}

function searchDatabase(searchValue) {
  $(".productList.sales > *").remove();
  getDatabaseItems(searchValue);
}

$(".productList.sales").on("click", "button.add", function () {
  let id = $(this).attr("id");
  let name = $(`#${id} .name`).text();
  let quantity = $(`#${id} #saleQuantity`).val();
  let price = $(`#${id} .price`).text();
  let quantityAvailable = $(`#${id} #quantityAvailable`).text();
  let totalAmount = parseFloat(parseInt(quantity) * parseFloat(price)).toFixed(
    2
  );

  productItem = {
    id: id,
    name: name,
    quantity: quantity,
    price: price,
    totalAmount: totalAmount,
  };
  let idExists = cartItems.some(function (item) {
    return item.id === id;
  });
  if (!idExists) {
    cartItems.push(productItem);
    $("tbody tr").remove();
    $.each(cartItems, function (i, value) {
      createCartProduct(
        value.id,
        value.name,
        value.quantity,
        value.price,
        value.totalAmount
      );
    });
  } else {
    let index = cartItems.findIndex((item) => item.id === id);
    let oldQuantity = cartItems[index].quantity;
    let finalQuantity = parseInt(oldQuantity) + parseInt(quantity);
    let oldAmount = cartItems[index].totalAmount;
    console.log(oldAmount, typeof oldAmount, totalAmount, typeof totalAmount);
    let finalTotalAmount = parseFloat(
      parseFloat(oldAmount) + parseFloat(totalAmount)
    ).toFixed(2);
    cartItems[index].quantity = finalQuantity;
    cartItems[index].totalAmount = finalTotalAmount;
    $("tbody tr").remove();
    $.each(cartItems, function (i, value) {
      createCartProduct(
        value.id,
        value.name,
        value.quantity,
        value.price,
        value.totalAmount
      );
    });
  }

  if (parseInt(quantity) <= parseInt(quantityAvailable)) {
    console.log();
    updateCheckoutTotal();
  } else $(this).attr("disabled", true);

  console.log(cartItems);
});

let updateCheckoutTotal = () => {
  checkoutAmount = 0;
  $.each(cartItems, function (i, value) {
    checkoutAmount += parseFloat(value.totalAmount);
  });
  $("#checkoutTotal").text(checkoutAmount.toFixed(2));
};

$(".productList.sales").on("click", "button", function () {
  productInstance = $(this).closest(".product");
  let quantityInput = productInstance.find("input");
  let quantityAvailable = parseInt(
    productInstance.find("#quantityAvailable").text()
  );
  var quantityInputVal = parseInt(quantityInput.val());

  if ($(this).hasClass("plus")) {
    if (quantityAvailable > quantityInputVal) {
      quantityInput.val(quantityInputVal + 1);
    } else {
      productInstance.find("button#add").prop("disabled");
    }
  }
  if ($(this).hasClass("minus")) {
    if (quantityInputVal <= 1) {
      quantityInput.val(1);
    } else quantityInput.val(quantityInputVal - 1);
  }
});

$("#search").on("keyup", function (e) {
  if ($(this).val() && (e.keyCode === 13 || $(this).val().length >= 3)) {
    searchDatabase($(this).val());
  } else {
    $(".productList.sales > *").remove();
  }
});

$(".search span.icon").click(function () {
  if ($("#search").val()) searchDatabase($("#search").val());
});

$("#myModal").on("hidden.bs.modal", function () {
  location.reload();
});

$("tbody").on("click", "#delete", function () {
  let trow = $(this).closest("tr");
  let id = trow.attr("id");
  cartItems = cartItems.filter((item) => item.id !== id);
  trow.remove();
  updateCheckoutTotal();
});

$(".payment #checkout").click(function () {
  if (cartItems.length) {
    updateDatabase(cartItems);
    $.each(cartItems, function (i, value) {
      modalItems(value.name, value.quantity, value.totalAmount);
    });

    $("#modalTotalAmount").text(checkoutAmount.toFixed(2));

    myModal.show();
  }
});
