import React from 'react';
import Swal from 'sweetalert2';

function Cart({cart, setCart}) {
  
  function removePokemon(key){
    setCart(prevCart => prevCart.filter(obj => !obj.hasOwnProperty(key)));
    Swal.fire({
      title: "Pokemon Removed",
      icon: "success",
      draggable: true
    });
  }

  return (
    <div className='table-top'>
      <div className='table'>
        <div className='table-head'>
          <div className='header'>Id</div>
          <div className='header'>Image</div>
          <div className='header'>Nickname</div>
          <div className='header'>Name</div>
          <div className='header'>Forms</div>
          <div className='header'>Action</div>
        </div>
        <div className='table-body'>
          {
            cart?.map((pokemon) => {
              let key = Object.keys(pokemon)[0];
              const details = pokemon[key];
              
              return (
                <div className='table-body-bottom'>
                  <div className='table-data'>
                    <div className='t-data'>{details.id}</div>
                    <div className='t-data'><img src={details.sprites.other.home.front_default} alt="image..." className='card-img' /></div>
                    <div className='t-data'>{key}</div>
                    <div className='t-data'>{details.name.toUpperCase()}</div>
                    <div className='t-data'>{details.forms[0].name.toUpperCase()}</div>
                    <div className=''><button className='btn btn-primary rmv-btn' onClick={()=>removePokemon(key)}>Remove</button></div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>  
    </div>
  )
}

export default Cart