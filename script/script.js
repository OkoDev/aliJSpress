document.addEventListener('DOMContentLoaded', () => {

    const search = document.querySelector('.search'),
        cartBtn = document.getElementById('cart'),
        wishlistBtn = document.getElementById('wishlist'),
        goodsWrapper = document.querySelector('.goods-wrapper'),
        cart = document.querySelector('.cart'),
        category = document.querySelector('.category'),
        cardCounter = cartBtn.querySelector('.counter'),
        wishlistCounter = wishlistBtn.querySelector('.counter');

    const wishlist = [];
    const loading = () => {
        goodsWrapper.innerHTML =
            `<div id="spinner">
                <div class="spinner-loading">
                    <div>
                        <div>
                            <div></div>
                         </div>
                        <div>
                            <div></div>
                        </div>                      
                            <div>
                                <div></div>
                            </div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>`
    };

    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                                <img class="card-img-top" src="./${img}" alt="">
                                <button class="card-add-wishlist ${wishlist.includes(id) ? 'active' : ''}"
                                    data-goods-id = "${id}"></button>
                            </div>
                            <div class="card-body justify-content-between">
                                <a href="#" class="card-title">"${title}"</a>
                               <div class="card-price">${price} ₽</div>
                                <div>
                                    <button class="card-add-cart"
                                        data-goods-id = "${id}">Добавить в корзину</button>
                                </div>
                            </div>
                        </div>`;

        return card;
    };

    // goodsWrapper.appendChild(createCardGoods(1,'Дартс',2000, 'img/temp/Archer.jpg'));
    // goodsWrapper.appendChild(createCardGoods(2,'Фламинго',3000, 'img/temp/Flamingo.jpg'));
    // goodsWrapper.appendChild(createCardGoods(3,'Носки',500, 'img/temp/Socks.jpg'));

    const closeCart = event => {
        const target = event.target;

        if (target === cart ||
            target.classList.contains('cart-close') ||
            event.keyCode === 27) {
            cart.style.display = '';
            document.removeEventListener('keyup', closeCart); //stop listen keyCode
        }
        console.log(event.keyCode)
    };

    const openCart = event => {
        event.preventDefault();
        cart.style.display = `flex`;
        document.addEventListener('keyup', closeCart);
    };

    const getGoods = (handler, filter) => {
        loading();
        fetch('./db/db.json')
            .then(response => response.json())
            .then(filter)
            .then(handler);
    };

    const renderCard = goods => {
        goodsWrapper.textContent = '';

        if (goods.length){
            goods.forEach(({id, title, price, imgMin}) => {
                // const { id, title, price, imgMin } =item;// destruct
                goodsWrapper.append(createCardGoods(id, title, price, imgMin));
            });
        } else {
            goodsWrapper.textContent = '❌ Извините, мы не нашли товаров по Вашему запросу!';
        }
    };

    //filtering +Promise (filter) in getGoods
    const randomSort = goods => goods.sort(() => Math.random() - 0.5);

    getGoods(renderCard, randomSort);

    const choiceCategory = event => {
        event.preventDefault();
        const target = event.target;

        // TODO filtering

        // if (target.classList.contains('category-item')) {
        //     const category = target.dataset.category;
        //     getGoods(renderCard, goods => {
        //         const newGoods = goods.filter(item => {
        //             return item.category.includes(category);
        //         });
        //         return newGoods
        //     })
        // }
        if (target.classList.contains('category-item')) {
            const cat = target.dataset.category;
            console.log('category: ', cat);
            getGoods(renderCard, goods => goods
                .filter(item => item.category
                    .includes(cat)));
        }
    };

    const searchGoods = event => {
        event.preventDefault();

        const input = event.target.elements.searchGoods;
        const inputValue = input.value.trim();
        if (inputValue !== ''){
            // regexr.com
            const searchString = new RegExp(inputValue,'i')
            getGoods(renderCard, goods => goods.filter(item => searchString.test(item.title)));
        } else {
            search.classList.add('error');
            setTimeout(() => {
                search.classList.remove('error');
            }, 2000);
        }
        input.value = '';
    };

    const checkCount = () => {
            wishlistCounter.textContent = wishlist.length;
    };

    const storageQuery = (get) => {

        if (get) {
            return localStorage.getItem('wishlist');
        } else {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    };

    const toggleWishlist = (id, elem) => {
        if (wishlist.includes(id)){
            wishlist.splice(wishlist.indexOf(id),1);
            elem.classList.remove('active')
        } else {
            wishlist.push(id);
            elem.classList.add('active')
        }

        checkCount();
        storageQuery();
    };

    const handlerGoods = event => {
        const target = event.target;

        if (target.classList.contains('card-add-wishlist')){
            toggleWishlist(target.dataset.goodsId, target);
        }

    }

    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    category.addEventListener('click', choiceCategory);
    search.addEventListener('submit', searchGoods);
    goodsWrapper.addEventListener('click', handlerGoods);
});
