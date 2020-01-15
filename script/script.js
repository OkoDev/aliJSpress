document.addEventListener('DOMContentLoaded', () => {

    const search = document.querySelector('.search');
    const cardBtn = document.getElementById('card');
    const wishlistBtn = document.getElementById('wishlist');

    const goodsWrapper = document.querySelector('.goods-wrapper');



    const createCardGoods = (id, title, price, img) =>{
        const card = document.createElement('div');
        card.className ='card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                                <img class="card-img-top" src="${img}" alt="">
                                <button class="card-add-wishlist"
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

    goodsWrapper.appendChild(createCardGoods(1,'Дартс',2000, 'img/temp/Archer.jpg'));
    goodsWrapper.appendChild(createCardGoods(2,'Фламинго',3000, 'img/temp/Flamingo.jpg'));
    goodsWrapper.appendChild(createCardGoods(3,'Носки',500, 'img/temp/Socks.jpg'));
});