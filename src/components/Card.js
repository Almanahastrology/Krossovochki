import React from "react";

function Card({id, onFavorite, imageUrl, title, price, onPlus, favorited = false}) {  /*пропсы вытаскивают и создают возможноть менять данные/ isAdded - придуманное название переменной*/
   const [isAdded, setisAdded] = React.useState(false);
    /*использовали useState для создания клика по картинке, false и true это вкл-вкл иконки*/
   const [isFavorite, setIsFavorite] = React.useState(false);

   const onClickPlus = () => {
    onPlus(title, imageUrl, price); 
    setisAdded(!isAdded);
   }

   const onClickFavorite = () => {
    // onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

    return(
        <div className="card">
          <div className="favorite" onClick={onClickFavorite}>
         
<img src = {isFavorite ? "/img/fav liked.svg" : "/img/fav unliked.svg"} alt="Unliked"  />
</div>
  <img width={133} height={112} src={imageUrl} alt="Plus" />
 
  <h5>{title}</h5>
  
  <div className="d-flex justify-between align-center">
    <div className="">
      <span className="d-flex">Цена:</span> 
      <b>{price} руб.</b>
      
    </div>
  <img className="plus" onClick={onClickPlus} src={isAdded ? "img/green butt.svg"  : "/img/btn plus.svg"} alt="Plus" /> 
  {/*здесь мы говорим, если кликаем по кнопке, то показываем зеленую галку */} 
     
  </div>
</div>
    );
}
export default Card;