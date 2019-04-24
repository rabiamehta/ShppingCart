$(() => {
    $('#userLogin').click(() => {
        window.location="./userLogin.html"
    })
    $('#vendorss').click(() => {
        window.location="./vendors.html"
    })
    $('#products').click(() => {
        window.location="./products.html"
    })
    function refreshList() {
        $.get('/vendors', (data) => {
            $('#vendors').empty()

            for (let vendor of data) {

                optionn = document.createElement('option')
                optionn.setAttribute('value', vendor.id)
                optionn.textContent = vendor.name
                $('#vendors').append(
                    optionn
                )
            }
        })

        $.get('/products', (data) => {
           
            $('#productTable').empty()
           
            for (let product of data) {
                tableRow = document.createElement('tr')

                let name = document.createElement('td')
                name.textContent = product.name

                let prize = document.createElement('td')
                prize.textContent = product.Price

                let quantity = document.createElement('td')
                quantity.textContent = product.quantity

                let ven = document.createElement('td')
                ven.textContent = product.vendor.name
               
                let close = document.createElement('td')

                button = document.createElement('input')
                button.setAttribute('type', 'button')
                button.setAttribute('value', 'X')
                button.setAttribute('class','btn btn-outline-light')
                close.append(button)

                button.onclick = function (event) {
                    $.ajax({
                        url: '/products',
                        type: 'DELETE',
                        data: { id: product.id },
                        success: function (result) {
                            event.target.parentElement.parentElement.remove();
                        }
                    });

                }

                tableRow.append(name)
                tableRow.append(prize)
                tableRow.append(quantity)
                tableRow.append(ven)
                tableRow.append(close)

                $('#productTable').append(
                    tableRow
                )
            }
        })
    }

    refreshList();

    $('#addProduct').click(() => {
        $.post(
            '/products',
            {
                name: $('#productName').val(),
                Price: $('#price').val(),
                quantity: $('#quantity').val(),
                vendorId: $('#vendors').val()
            },
            (data) => {
                if (data.success) {
                    refreshList()
                    $('#productName').val(""),
                        $('#price').val(""),
                        $('#quantity').val(0)
                } else {
                    // console.log(data)
                    alert('Some Error Occurred')
                }
            }
        )
    })
    // module.exports=getVendorName()
})