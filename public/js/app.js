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
    // let
    let theTemplate = Handlebars.compile(theTemplateScript);
    list.append(theTemplate(data));
    list.find('img').on('click', function(e) {
      e.preventDefault();
      productIndex = $(this).data('index');
      window.location.hash = 'product/' + productIndex;
    });
  }
  // Genera todas las Categorias en el DOM
  function generateAllCategoriesHTML(data) {
    let listCategory = $('.category-list');
    let theTemplateScriptC = $('#categories-template').html();
    let theTemplate = Handlebars.compile(theTemplateScriptC);
    listCategory.append(theTemplate(data));

    listCategory.find('div').on('click', function(event) {
      indexCat = $(this).attr('data-id');
      $('.card-deck').empty();
      /* Mostrando data de la subcategoria  seleccionada*/
      $.ajax({
        url: 'https://api.mercadolibre.com/sites/MPE/search?category=' + indexCat + '',
        method: 'GET',
        contenType: 'application/json',
        crossOrigin: true,
        success: function(data) {
          products = data.results;
          generateAllProductsHTML(products);
          // $(window).trigger('hashchange');
        },
        error: function(request) {}
      });
    });
  }
  // Genera descripcion del producto Seleccionado en el DOM
  function generateSingleProductsHTML(idItem) {
    $.ajax({
      url: 'https://api.mercadolibre.com/items/' + idItem + '/descriptions',
      method: 'GET',
      contenType: 'application/json',
      crossOrigin: true,
      success: function(data) {

      },
      error: function(request) {
        console.log('no recibe argumento')
        ;
      }
    });
  }


  // Funcionalidad SPA
  // Single product page buttons
  let singleProductPage = $('.single-product');

  singleProductPage.on('click', function(e) {
    if (singleProductPage.hasClass('visible')) {
      let clicked = $(e.target);

      // If the close button or the background are clicked go to the previous page.
      if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
        // Change the url hash with the last used filters.
        window.location.hash = '#';
      }
    }
  });

  $(window).on('hashchange', function() {
    render(decodeURI(window.location.hash));
  });


  // Navigation

  function render(url) {
    // Get the keyword from the url.
    let temp = url.split('/')[0];

    // Hide whatever page is currently shown.
    $('.main-content .page').removeClass('visible');


    let	map = {

      // The "Homepage".
      '': function() {
        // show all the products

        renderProductsPage(subCategories);
      },

      '#product': function() {
        index = url.split('#product/')[1].trim();

        renderSingleProductPage(index, products);
      },


    };

    if (map[temp]) {
      map[temp]();
    } else {
      renderErrorPage();
    }
  }

  // This function receives an object containing all the product we want to show.
  function renderProductsPage(data) {
    let page = $('.all-products'),
      allProducts = $('.all-products .products-list > li');

    allProducts.addClass('hidden');

    allProducts.each(function() {
      let that = $(this);

      data.forEach(function(item) {
        if (that.data('index') == item.id) {
          that.removeClass('hidden');
        }
      });
    });


    page.addClass('visible');
  }


  function renderSingleProductPage(index, data) {
    let page = $('.single-product'),
      container = $('.preview-large');


    if (data.length) {
      data.forEach(function(item) {
        if (item.id == index) {
          $.ajax({
            url: 'https://api.mercadolibre.com/items/' + index + '/descriptions',
            method: 'GET',
            contenType: 'application/json',
            crossOrigin: true,
            success: function(datad) {
              container.find('#description').attr('src', datad[0].snapshot.url);
            },
            error: function(request) {
              console.log('no recibe argumento');
            }
          });

          container.find('h3').text(item.title);
          container.find('#img-item').attr('src', item.thumbnail);
        }
      });
    }

    // Show the page.
    page.addClass('visible');
  }
  // Shows the error page.
  function renderErrorPage() {
    let page = $('.error');
    page.addClass('visible');
  }


  /*  function addProductsCar() {
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
  } */
});


// NOTA: para poder pagar a travez de paypal ingrese
// correo: anacarlavegam-buyer@gmail.com
// contraseña: mujerlunabella1
