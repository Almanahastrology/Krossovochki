import React from "react";

function Drawers({ onClose, onRemove, Itemz = [] }) {
  
  
  return(
      <div className="overlay">
      <div className="drawer">
      <h2 className="d-flex justify-between mb-30">
        Корзина <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-cart.svg" />
        </h2> {/*закрываем по клику на крестик корзину onClose*/} 
        {Itemz.length > 0 ? (
          <div>
            <div className="Itemz">
              {Itemz.map((obj) => (
                <div className="cartItem d-flex align-center mb-20">
                 <img className="mr-20" 
        width={70} 
        height={70} 
        src= {obj.imageUrl} />
        <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-cart.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
        <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ <img src="/img/strelka.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div class="cartEmpty d-flex align-center justify-center flex-column flex">
            <img class="mb-20" width="120px" height="120px" src="/img/empty basket.svg" alt="Empty" />
            <h2>Корзина пустая</h2>
            <p class="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button onClick={onClose} class="greenButton">
              <img src="/img/arrow basket.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
        }
export default Drawers;