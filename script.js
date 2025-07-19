document.addEventListener('DOMContentLoaded',()=>{
    const productList = document.getElementById('products-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartTotal = document.getElementById('cart-total');
    const totalPrice = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    const products = [
        {id:1,name:'product1',price:29.99},
        {id:2,name:'product2',price:49.99},
        {id:3,name:'product3',price:9.99},
    ];
    const cart =  JSON.parse(localStorage.getItem("items")) || [];
     renderCart();
    products.forEach(product=>{
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name}-$${product.price.toFixed(2)}</span> 
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const productId = parseInt( e.target.getAttribute('data-id'));
            const product = products.find(p=> p.id === productId);
            addToCart(product);
            console.log(product);
        }
    });
    function addToCart(product){
        cart.push(product);
        renderCart();
        saveItems();
    }
    function renderCart(){
        cartItems.innerText = "";
        let pricetotal = 0;

        if(cart.length>0){
            emptyCart.classList.add('hidden');
            cartTotal.classList.remove('hidden');
            cart.forEach((item,index)=>{
                pricetotal += item.price; 
                const CartItem = document.createElement('div');
                CartItem.innerHTML = `<span>${item.name} - $${item.price.toFixed(2)}</span>
                <button data-index ="${index}">delete</button>`;
                CartItem.classList.add('decorate');
                CartItem.querySelector('button').addEventListener('click',(e)=>{
                    const itemIndex = parseInt(e.target.getAttribute('data-index'));
                    pricetotal -= cart[itemIndex].price;
                    totalPrice.textContent = `$${pricetotal.toFixed(2)}`;

                    cart.splice(itemIndex,1);
                    renderCart();
                    saveItems();
                });
                totalPrice.textContent = `$${pricetotal.toFixed(2)}`;
                cartItems.appendChild(CartItem);
            });
          
        }else{
            emptyCart.classList.remove('hidden');
            totalPrice.textContent = `$0.00`;

        }
    }
    checkoutBtn.addEventListener('click',()=>{
        cart.length=0;
        alert('checkout successfully');
        renderCart();
        saveItems();
    })

    function saveItems(){
        localStorage.setItem("items",JSON.stringify(cart));
    } 
   
});
