$(() => {
    $('#logOut').click(() => {
        window.location="./index.html"
    })
    var cartData = JSON.parse(localStorage.getItem("allCartItems"))
    console.log(cartData)
    $('#user').append(
        cartData[0].user.name
        )
    var totalQuantity = 0
    var totalPrice=0
    for (let item of cartData) {
        totalQuantity += item.quantity
        totalPrice+=item.product.Price
        console.log(item)
        createTableRows(item)
    }
    displayTotalQuantity(totalQuantity)
    displayTotalPrice(totalPrice,totalQuantity)

    function createTableRows(item) {
        $('#itemsAddedToCart').append(
            `<tr>
            <td>${item.product.name}</td>
            <td>${item.product.vendor.name}</td>
            <td>${item.quantity}</td>
            </tr>`
        )
    }
    function displayTotalQuantity(tq) {
        $('#totalQuant').append(
            `Total Products In Cart: ${tq}`
        )
    }
    function displayTotalPrice(tp,tq) {
        $('#totalPrice').append(
            `Total Price: ${tp*tq}`
        )
    }
})