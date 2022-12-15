import Card from './components/Card'; /*СОздаем отдельно компаненты к каждой части кода*/
import Header from './components/Header';
import Drawers from './components/Drawers';
import React from "react";
import axios from 'axios';



/*это начало всех действий, старт ВСЕГО*/
function App() {
  
  const [Items, setItems] = React.useState([]);               /*Items это код новых карточек на https://mockapi.io, мы загружаем с сервера с реактом*/
  const [cartOpened, setCartOpened] = React.useState(false);  /*Добавление cartOpened - корзину и открытие ее*/
  const [searchValue, setSerchValue] = React.useState('');    /*создаем поиск '' строка*/
  const [cartItems, setCartItems] = React.useState([]); 
  const [favorites, setFavorites] = React.useState([]);
  
  /*Добавление cartItems - из Itemz формируется корзина товаром*/
React.useEffect(() => {
  axios.get('https://638242b3281f14ffefa436f0.mockapi.io/Items').then((res) => {
    setItems(res.data);
    axios.get('https://638242b3281f14ffefa436f0.mockapi.io/Cart').then((res) => {
      setCartItems(res.data);
    });
  });
}, []);

const onAddToCart = (obj) => {
  axios.post('https://638242b3281f14ffefa436f0.mockapi.io/Cart', obj);
  setCartItems((prev) => [... prev, obj]);
};
const onRemoveItem = (id) => {
  axios.delete(`https://638242b3281f14ffefa436f0.mockapi.io/Cart${id}`);
  setCartItems((prev) => prev.filter((item) => item.id !== id));
};

     /*onAddToCart - доб в корзину товара*/
  



const onChangeSearchInput =(event) => {
  setSerchValue(event.target.value);

};

const onAddToFavorite = async (obj) => {
  try {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`https://638242b3281f14ffefa436f0.mockapi.io/favorites ${obj.id}`);
    } else {
      const { data } = await axios.post('/favorites', obj);
      setFavorites((prev) => [...prev, data]);
    }
  } catch (error) {
    alert('Не удалось добавить в фавориты');
  }
}; 



  return (
   <div className="wrapper clear"> 


  {cartOpened && <Drawers Itemz = {cartItems} onClose = {() => setCartOpened(false)} onRemove={onRemoveItem } />}  {/*клик, закрытие корзины на крестик. && это если левая часть положительная, то правая выполняется. Itemz = {cartItems}*/}
 
 
 
 <Header onClickCart = {() => setCartOpened(true)} /> {/*клик на корзину -  открывает ее*/}
    
   
 
    <div className="content p-30 ">
      <div className="d-flex align-center mb-10 justify-between">
      <h1> {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'} </h1>
      <div className="search-block">
        <img src="/img/search.svg" alt="Search" />
        <input className="pos-f" onChange={onChangeSearchInput} value={searchValue} placeholder= "Поиск..." /> 
        </div>
      </div>
      </div>
      
      
      <div className="d-flex flex-wrap"> 
      

      {/*С помощ функции мап мы превратили объекты в реактовские элементы, и можем менять кард при помощи title,price,imageUrl */}
{Items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))  /*toLowerCase - перевод в нижний регистр, includes - поиск по названию*/
.map((item) => ( 
         <Card 
         
         title={item.title}
         price= {item.price}                /*item - товары с ценой, на серваке*/
         imageUrl= {item.imageUrl} 
         onClickFavorite={()=>console.log('Добавили  в закладки')}
         onPlus={(obj) => onAddToCart(item)} /*onAddToCart - доб в корзину товара*/
         /> 
         

      ))} 


      </div>
      
      </div>
        
        
    
    
  
  );
}

export default App;