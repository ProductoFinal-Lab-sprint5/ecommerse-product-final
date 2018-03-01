const begin = () => {
  let categories = [];
  let subCategories = [];
  
  const uploadCategorieCameras = () =>{
    $.getJSON('https://api.mercadolibre.com/sites/MPE/categories', function(response) {
      response.forEach((name, i) => {
        categories = response[i].name;
        console.log(categories);
      });

      console.log(response)
      
      // categories.forEach(function(id, i) {
      //   subCategories.push(categories[i].id);
      // });
      // console.log(subCategories);
      // uploadSubcategories();
      // categories.forEach(viewCategorie);
    });
  };

  const uploadSubcategories = () => {
    for (let i in categories) {
      $.getJSON(`https://api.mercadolibre.com/sites/MPE/search?category=${subCategories[i]}`, function(response2) {
        console.log(response2.results);
        $('#results-search').on('click', function() {
        
        });
      });
    };
  };

  const viewCategorie = (data, childrenCategories) => {
    console.log(data.name);
    // for (let i in childrenCategories) {
    //   console.log(childrenCategories[i].name);
    //   const templateSubcategorie = `<li><a href="">${childrenCategories[i].name}</a></li>`;
    //   $('#containerSubcategorie').append(templateSubcategorie);
    // }
    

    const templateCategorie = `<div class="card" id="results-search">
                              <div class="card-header" id="headingOne">
                                <h5 class="mb-0 text-center">
                                  <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    ${data.name}
                                  </button>
                                </h5>
                              </div>
                              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body p-0">
                                  <ul class="list-group" >
                                    
                                  </ul>
                                </div>
                              </div>
                            </div>`;
    $('#containerCategorie').append(templateCategorie);
  };

  // const viewSubcategorie = () => {
  //   const templateSubcategorie = `<li class="list-group-item"><a href="">${dat.children_categories[i]}</a></li>`;
  //   $('#containerSubcategorie').append(templateSubcategorie);
  // };
 
  
  uploadCategorieCameras();
};
$(document).ready(begin);


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

  $('.producto').click(function(e) {
    e.stopPropagation();
    paypal.minicart.cart.add({
      business: 'anacarlavegam-facilitator@gmail.com',
      item_name: $(this).attr('titulo'),
      amount: $(this).attr('precio'),
      currency_code: 'USD',
    });
  });
}

// $(document).ready(function() {
//   $('.event-photo').click(function(error) {
//     error.preventDefault();
//     $('#imagen').addClass('d-none');
//     $('#box-template-data').removeClass('d-none');
//   });
// });


// NOTA: para poder pagar a travez de paypal ingrese
// correo: anacarlavegam-buyer@gmail.com
// contraseña: mujerlunabella1