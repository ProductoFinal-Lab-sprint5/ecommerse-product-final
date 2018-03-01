const begin = () =>{
  const uploadCategories = () =>{
    $.getJSON('https://api.mercadolibre.com/sites/MPE/categories', function(response) {
      let idCategories = [];
      for (let i in response) {
        idCategories = response[i].id;
        // console.log(idCategories);
      }
      response.forEach((elem, i) => {
        const templateCategories = `<a href="/${elem.id}" class="list-group-item list-group-item-action">${elem.name}</a>`;
        $('#list-categories').append(templateCategories);
      });
    });
  };

  const uploadList = (ctx) => {
    $('#box-cards').html('');
    $.getJSON(`https://api.mercadolibre.com/sites/MPE/search?category=${ctx.params.listCategorie}`, function(response) {
      let listCard = response.results;
      console.log(response.results);
      listCard.forEach((elem) => {
        const templateList = `<div class="text-center bg-light mb-3">
                                <img class="card-img-top img-card" src="${elem.thumbnail}" alt="Card image cap">
                                <div class="card-body">
                                  <p class="card-title">${elem.title}</p>
                                  <p class="card-title">S/. ${elem.price}</p>                                  
                                  <input class="product btn btn-primary" type="button" precio=${elem.price} titulo=${elem.listing_type_id} value="comprar"/>
                                </div>
                              </div>`;
        $('#box-cards').append(templateList);
      });
      addProductsCar();
    });
  };

  function addProductsCar() {
    paypal.minicart.render({
      strings: {
        button: 'Pagar'
        , buttonAlt: 'Total'
        , subtotal: 'Total:'
        , empty: 'No hay productos en el carrito'
      }
    });
    // Eventos para agregar productos al carrito
  
    $('.product').click(function(event) {
      event.stopPropagation();
      paypal.minicart.cart.add({
        business: 'anacarlavegam-facilitator@gmail.com',
        item_name: $(this).attr('titulo'),
        amount: $(this).attr('precio'),
        currency_code: 'USD',
      });
    });
  };
  
  page('/', uploadCategories);
  page('/:listCategorie', uploadList);
  // page('/:categories/:id', list);
  page();
  uploadList();
  uploadCategories();
};

$(document).ready(begin);