
$(function() {
  // Variable que almacena el token de mercado libre
  let token = 'APP_USR-484452126434281-022418-b31c5d304dcc66db9034b963dad75b59__C_J__-303765493';
  let indexCat = '';
  let subCategories = '';
  let productIndex = '';
  let products, description, index;
  /* Obteniene las SubCategorias */
  $.ajax({
    url: 'https://api.mercadolibre.com/categories/MPE1039',
    method: 'GET',
    contenType: 'application/json',
    crossOrigin: true,
    success: function(data) {
      console.log(data.children_categories);
      subCategories = data.children_categories;
      generateAllCategoriesHTML(subCategories);
      $(window).trigger('hashchange');
    },
    error: function(request) {}
  });

  // Genera todos  los productos de la categoria seleccionada en el DOM
  function generateAllProductsHTML(data) {
    let list = $('.products-list');
    let theTemplateScript = $('#products-template').html();
    let theTemplate = Handlebars.compile(theTemplateScript);
    list.append(theTemplate(data));
    // Al hacer click obtiene el atributo index para cambiar el url
    list.find('li').on('click', function(e) {
      e.preventDefault();
      productIndex = $(this).data('index');
      window.location.hash = 'product/' + productIndex;
      console.log(productIndex);
      // generateSingleProductsHTML(productIndex);
    });    
  }
  // Genera todas las Categorias en el DOM 
  function generateAllCategoriesHTML(data) {
    let listCategory = $('.category-list');
    let theTemplateScriptC = $('#categories-template').html();
    let theTemplate = Handlebars.compile(theTemplateScriptC);
    listCategory.append(theTemplate(data));
  
    listCategory.find('li').on('click', function(event) {
      console.log(event.target);
      console.log($(this).attr('data-id'));
      indexCat = $(this).attr('data-id');
      $('.card-deck').empty();
      /* Mostrando data de la subcategoria  seleccionada*/
      $.ajax({
        url: 'https://api.mercadolibre.com/sites/MPE/search?category=' + indexCat + '',
        method: 'GET',
        contenType: 'application/json',
        crossOrigin: true,
        success: function(data) {
          console.log(data);
          console.log(data.results);
          products = data.results;
          generateAllProductsHTML(products);
          $(window).trigger('hashchange');
        },
        error: function(request) {}
      });
    });
  }
  // Genera descripcion del producto Seleccionado en el DOM
  function generateSingleProductsHTML(idItem) {
    console.log(idItem);
    $.ajax({
      url: 'https://api.mercadolibre.com/items/' + idItem + '/descriptions',
      method: 'GET',
      contenType: 'application/json',
      crossOrigin: true,
      success: function(data) {
        console.log(data[0].plain_text);
      },
      error: function(request) {
        console.log('no recibe argumento')
        ;
      }
    });
  }
  

  // Funcionalidad SPA
  // Pagina de un solo producto
  let singleProductPage = $('.single-product');

  singleProductPage.on('click', function(e) {
    if (singleProductPage.hasClass('visible')) {
      let clicked = $(e.target);

      // Si se hace clic en el botón de cerrar o en el fondo, vaya a la página anterior.
      if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
        // Cambia a la ultima vista de productos
        window.location.hash = '#';
      }
    }
  });
  // en el evento hashchange muestra el contenido
  $(window).on('hashchange', function() {
    render(decodeURI(window.location.hash));
  });


  // Navegacion

  function render(url) {
    // Obtiene la palabra clave de la url
    let temp = url.split('/')[0];

    // Ocultar la página que se muestra actualmente.
    $('.main-content .page').removeClass('visible');


    let	map = {

      // The "Homepage".
      '': function() {
        // Muestra todos los productos    

        renderProductsPage(subCategories);
      },

      // Pagina de un solo producto
      '#product': function() {
        // Obtiene el indicae del producto que va a mostrar
        index = url.split('#product/')[1].trim();

        renderSingleProductPage(index, products);
      },
		

    };

    // Ejecute la función necesaria según la palabra clave url (almacenada en temp).
    if (map[temp]) {
      map[temp]();
    }
    // visualiza la página de error
    else {
      renderErrorPage();
    }
  }

	
  // Funcion que obtendra el producto a mostrar
  function renderProductsPage(data) {
    let page = $('.all-products'),
      allProducts = $('.all-products .products-list > li');

    // Oculta todos los productos en la lista de productos.
    allProducts.addClass('hidden');
    // Iterando para ocultar todos los productos
    allProducts.each(function() {
      let that = $(this);
      console.log(that);
      data.forEach(function(item) {
        if (that.data('index') == item.id) {
          that.removeClass('hidden');
        }
      });
    });

    // Muestra la pagina
    // (la función de renderizado oculta todas las páginas, así que tenemos que mostrar la que queremos).
    page.addClass('visible');
  }

  // Función que obtiene los datos para la página que muestra solo un producto
  function renderSingleProductPage(index, data) {
    let page = $('.single-product'),
      container = $('.preview-large');
    
    // Busca el indice y compara para la muestra de datos
    if (data.length) {
      data.forEach(function(item) {
        if (item.id == index) {
          $.ajax({
            url: 'https://api.mercadolibre.com/items/' + index + '/descriptions',
            method: 'GET',
            contenType: 'application/json',
            crossOrigin: true,
            success: function(datad) {
              // console.log(datad[0].plain_text);
              container.find('#description').attr('src', datad[0].snapshot.url);
            },
            error: function(request) {
              console.log('no recibe argumento');
            }
          });
          console.log(item.id, index);
          // Populate '.preview-large' with the chosen product's data.
          container.find('h3').text(item.title);
          container.find('#img-item').attr('src', item.thumbnail);
        }
      });
    }

  
    page.addClass('visible');
  }


  // Muestra pagina d error
  function renderErrorPage() {
    let page = $('.error');
    page.addClass('visible');
  }
    
   
  // Eventos para agregar productos al carrito
});