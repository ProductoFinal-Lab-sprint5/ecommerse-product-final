/*
//Informacion del usuario
$.get('https://api.mercadolibre.com/users/303765493?access_token=APP_USR-484452126434281-022416-234e7181c72c5181d4083a302cbdde5b__F_M__-303765493', function(data){
  console.log(data);
});
//Información del sitio
$.get('https://api.mercadolibre.com/sites/MPE',function(data){
  console.log(data);
})
//Devuelve las categorías disponibles en el sitio.
$.get('https://api.mercadolibre.com/sites/MPE/categories',function(data){
  console.log(data);
})*/
// Devuelve información sobre la categoría.
$.get('https://api.mercadolibre.com/categories/MPE1039', function(data) {
  console.log(data);
  // console.log(data.children_categories);
});

$.get('https://api.mercadolibre.com/sites/MPE/search?category=MPE1039', function(data) {
  console.log(data);
  // console.log(data.children_categories);
});
let token = 'APP_USR-484452126434281-022418-b31c5d304dcc66db9034b963dad75b59__C_J__-303765493';

$.ajax({
  url: 'https://api.mercadolibre.com/sites/MPE/search?category=MPE4708',
  method: 'GET',
  contenType: 'application/json',
  crossOrigin: true,
  success: function(data) {
    console.log(data.results);
    let products=data.results;
    generateAllProductsHTML(products);
    $(window).trigger('hashchange');
  },
  fail: function(request) {}
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
function singleProductsHTML(){
  
}