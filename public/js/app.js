let token = 'APP_USR-484452126434281-022418-b31c5d304dcc66db9034b963dad75b59__C_J__-303765493';
let indexCat = '';
/* SubCate */
$.ajax({
  url: 'https://api.mercadolibre.com/categories/MPE1039',
  method: 'GET',
  contenType: 'application/json',
  crossOrigin: true,
  success: function(data) {
    console.log(data.children_categories);
    let subCategories = data.children_categories;
    /* $.each(subCategories, function(i, data) {
      let output = `<li id="${data.id}" class="category"><a href="#" data-id="${data.id}">${data.name}</a></li>`;
      $('#data-categories').append(output);
    }); */
    generateAllCategoriesHTML(subCategories);
    $(window).trigger('hashchange');
  },
  error: function(request) {}
});


function generateAllProductsHTML(data) {
  var list = $('.products-list');

  var theTemplateScript = $('#products-template').html();
  // Compile the template​
  var theTemplate = Handlebars.compile(theTemplateScript);
  list.append(theTemplate(data));
  // Each products has a data-index attribute.
  // On click change the url hash to open up a preview for this product only.
  // Remember: every hashchange triggers the render function.
  list.find('li').on('click', function(e) {
    e.preventDefault();
    var productIndex = $(this).data('index');
    window.location.hash = 'product/' + productIndex;
  });
}
function singleProductsHTML() {

}
function generateAllCategoriesHTML(data) {
  let listCategory = $('.category-list');
  let theTemplateScriptC = $('#categories-template').html();
  var theTemplate = Handlebars.compile(theTemplateScriptC);
  listCategory.append(theTemplate(data));

  listCategory.find('a').on('click', function(event) {
    console.log(event.target);
    console.log($(this).attr('data-index'));
    indexCat = $(this).attr('data-index');
    $('.card-deck').empty();
    /* Seleccionando Subcategoria */
    $.ajax({
      url: 'https://api.mercadolibre.com/sites/MPE/search?category=' + indexCat + '',
      method: 'GET',
      contenType: 'application/json',
      crossOrigin: true,
      success: function(data) {
        console.log(data);
        console.log(data.results);
        let products = data.results;
        generateAllProductsHTML(products);
        $(window).trigger('hashchange');

        addProductsCar();
      },
      error: function(request) {}
    });
  });
}


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

$(document).ready(function() {
  $('.event-photo').click(function(error) {
    error.preventDefault();
    $('#imagen').addClass('d-none');
    $('#box-template-data').removeClass('d-none');
  });
});


// NOTA: para poder pagar a travez de paypal ingrese
// correo: anacarlavegam-buyer@gmail.com
// contraseña: mujerlunabella1


// const begin = () => {
//   console.log('hola mundo');
//   let categories = [];
//   let subCategories = [];
//   let idCategoriePeruCameras = 'MPE1039';
//   let idSubCategories = '';
  
//   const api = {
//     urlCamares: `https://api.mercadolibre.com/categories/${idCategoriePeruCameras}`,
//     // urlSubCategories: `http://cors.io/?http://https://api.mercadolibre.com${subCategories[i]}`
//   };

//   const uploadCategorieCameras = () =>{
//     $.getJSON(api.urlCamares, function(response) {
//       categories = response.children_categories;
//       // almaceno en el array los id de cada subcategoria   
//       categories.forEach(function(id, i) {
//         subCategories.push(categories[i].id);
//       });
//       console.log(subCategories);
//       uploadSubcategories();
//       categories.forEach(viewCategorie);
//     });
//   };

//   const uploadSubcategories = () => {
//     for (let i in categories) {
//       $.getJSON(`https://api.mercadolibre.com/sites/MPE/search?category=${subCategories[i]}`, function(response2) {
//         console.log(response2.results);
//         $('#results-search').on('click', function() {
        
//         });
//       });
//     };
//   };

//   const viewCategorie = (data, childrenCategories) => {
//     console.log(data.name);
//     // for (let i in childrenCategories) {
//     //   console.log(childrenCategories[i].name);
//     //   const templateSubcategorie = `<li><a href="">${childrenCategories[i].name}</a></li>`;
//     //   $('#containerSubcategorie').append(templateSubcategorie);
//     // }
    

//     const templateCategorie = `<div class="card" id="results-search">
//                               <div class="card-header" id="headingOne">
//                                 <h5 class="mb-0 text-center">
//                                   <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//                                     ${data.name}
//                                   </button>
//                                 </h5>
//                               </div>
//                               <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
//                                 <div class="card-body p-0">
//                                   <ul class="list-group" >
                                    
//                                   </ul>
//                                 </div>
//                               </div>
//                             </div>`;
//     $('#containerCategorie').append(templateCategorie);
//   };

//   // const viewSubcategorie = () => {
//   //   const templateSubcategorie = `<li class="list-group-item"><a href="">${dat.children_categories[i]}</a></li>`;
//   //   $('#containerSubcategorie').append(templateSubcategorie);
//   // };
 
  
//   uploadCategorieCameras();
// };
// $(document).ready(begin);


