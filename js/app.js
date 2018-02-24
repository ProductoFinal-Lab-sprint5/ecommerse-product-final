
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
})
//Devuelve información sobre la categoría.
$.get('https://api.mercadolibre.com/categories/MPE1648',function(data){
  console.log(data)
  //console.log(data.children_categories);
})

$.get('https://api.mercadolibre.com/items/MPE122443?access_token=APP_USR-484452126434281-022416-234e7181c72c5181d4083a302cbdde5b__F_M__-303765493',function(data){
  console.log(data)
  //console.log(data.children_categories);
})