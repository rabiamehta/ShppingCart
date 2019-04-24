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
    function refreshList(){
        $.get('/vendors',(data) => {
            $('#vendorsList').empty()
        
            for(let vendor of data)
            {
              if(vendor!=" "||vendor!=null||vendor!=undefined){
                span1 =document.createElement('span')

                button = document.createElement('input')
                button.setAttribute('type','button')
                button.setAttribute('class','btn btn-outline-dark')
                button.style.marginLeft = "10px";
                button.setAttribute('value','X')
                span1.append(button)
                
                li = document.createElement('li')
                li.setAttribute( 'class',"list-group-item")
                li.append(vendor.name)
                li.append(button)
                li.style.width = "500px";
                li.style.marginLeft = "70px";
                $('#vendorsList').append(
                    li
                )
                button.onclick = function(event){
                    $.ajax({
                         url: '/vendors',
                        type: 'DELETE',
                        data:{id:vendor.id},
                        success: function(result) {
                        event.target.parentElement.remove();
                        }
                        });   
            
                }
            
            }
            else{
                alert("Please Enter a Valid vendor")
            }
        }
        })
    }

    refreshList()
    
    $('#addVendor').click(() => {
        $.post(
            '/vendors',
            {
                name: $('#vendorName').val()
            },
            (data) => {
                if(data.success ){
                    refreshList()
                    $('#vendorName').val("");
                }else{
                    console.log(data)
                    alert('Some Error Occurred')
                }
            }
        )
    })
})