$(() => {
    $('#userLogin').click(() => {
        window.location="./userLogin.html"
    })
    $('#vendors').click(() => {
        window.location="./vendors.html"
    })
    $('#products').click(() => {
        window.location="./products.html"
    })
    $('#loginUser').click(() => {
        $('#ProductCards').empty()
        $('#mainDiv').empty()
        const uname = $('#userName').val()

        if (uname == '')
            alert("Please enter a valid User name")
        else {
            $.get(
                `/userLogin/${uname}`,
                (data) => {
                    if (jQuery.isEmptyObject(data)) {
                        alert('InValid User Name')
                    } else {
                        $.get('/products', (products) => {
                            $('#ProductCards').empty()
/**  <div class="card mx-2 p-4" style="background-color: rgb(0,0,0,0.5);margin-bottom: 20px" *ngFor="let data of listdata">
        <img class="card-img-top" src={{data.Photo}} alt="Card image cap" style="width: 200px;height:150px">
        <div class="card-body">
          <h5 style="text-align: center" class="card-title">
            <b>{{data.BookName}}</b>
          </h5>
          <p style="text-align: center" class="card-text">By : {{data.AuthorName}}</p>
          <p style="text-align: center" class="card-text">Rs.{{data.Price}}</p>
          <p style="text-align: center" class="card-text">
            <button class="btn btn-primary" [id]="data.BookId" (click)="onclick($event)" style="width:130px;align-content:center;margin-right:5px">View Details</button>
            <button class="btn btn-bodorless" (click)="addtowishlist($event)" [name]="data.BookId" style="background-color: rgb(255,255,255,0.5)">
              <i  class="fas fa-bookmark fa-2x"></i>
            </button>
          </p>
        </div> */
                            for (let product of products) {
                                var brkElem = document.createElement("br")
                                var div = document.createElement("div")
                                div.setAttribute('class', " card m-2 p-4")
                              div.style.background="rgb(0,0,0,0.5)"
                               
                                button = document.createElement('input')
                                button.setAttribute('type', 'button')
                                button.setAttribute('id', product.id)
                                button.setAttribute('value', 'Add To Cart')
                                button.setAttribute('class', " btn btn-secondary btn-lg ")
                              
                                var brkElem1 = document.createElement("br")
                                var brkElem2 = document.createElement("br")
                                var brkElem3 = document.createElement("br")
                              
                                div.append(`Product Name: ${product.name}`)
                                div.append(brkElem)
                                div.append(`Quantity: ${product.quantity}`)
                                div.append(brkElem1)
                                div.append(`Vendor: ${product.vendor.name}`)
                                div.append(brkElem2)
                                div.append(`Price: Rs.${product.Price}`)
                                div.append(brkElem3)

                                var newdiv = document.createElement("div")
                                newdiv.append(button)
                                newdiv.setAttribute('class', "col m-3 p-3")
                                div.append(newdiv)
                                $("#ProductCards").append(div)
                                $('#' + product.id).click(() => {
                                    $.post(`/addToCart/${product.id}_${data[0].id}`)
                                })
                            }
                            var div = document.createElement("div")
                            div.setAttribute('class','row')
                            // var newdiv = document.createElement("div")
                            // newdiv.setAttribute('class',' text-center')


                            button2 = document.createElement('input')
                            button2.setAttribute('type', 'button')
                            button2.setAttribute('user_id', data[0].id)
                            // console.log(data[0].id)
                            button2.setAttribute('value', 'View Cart')
                            button2.setAttribute('class', "text-center btn btn-secondary btn-lg btn-block")
                            // newdiv.append(button2)
                            div.append(button2)
                            $('#mainDiv').append(div)
                            $(button2).click(() => {
                                console.log(`inside cart with user id: ${data[0].id}`)
                                $.get(`/addToCart/${data[0].id}`,
                                (cartItemsPerUser)=>{
                                    localStorage.setItem("allCartItems", JSON.stringify(cartItemsPerUser));  
                                    window.location.href = './cart.html'
                                }
                                )
                            })
                        })
                    }
                }
            )
            }
    })
})