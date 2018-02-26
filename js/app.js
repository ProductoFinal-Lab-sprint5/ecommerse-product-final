
//
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
      /* $.each(subCategories, function(i, data) {
      let output = `<li id="${data.id}" class="category"><a href="#" data-id="${data.id}">${data.name}</a></li>`;
      $('#data-categories').append(output);
    }); */
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
    // Each products has a data-index attribute.
    // On click change the url hash to open up a preview for this product only.
    // Remember: every hashchange triggers the render function.
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
          //$(window).trigger('hashchange');
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
  // These are called on page load
  // An event handler with calls the render function on every hashchange.
  // The render function will show the appropriate content of out page.
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

      // Single Products page.
      '#product': function() {
        // Get the index of which product we want to show and call the appropriate function.
        index = url.split('#product/')[1].trim();

        renderSingleProductPage(index, products);
      },
		

    };

    // Execute the needed function depending on the url keyword (stored in temp).
    if (map[temp]) {
      map[temp]();
    }
    // If the keyword isn't listed in the above - render the error page.
    else {
      renderErrorPage();
    }
  }

	
  // This function receives an object containing all the product we want to show.
  function renderProductsPage(data) {
    let page = $('.all-products'),
      allProducts = $('.all-products .products-list > li');

    // Hide all the products in the products list.
    allProducts.addClass('hidden');

    // Iterate over all of the products.
    // If their ID is somewhere in the data object remove the hidden class to reveal them.
    allProducts.each(function() {
      let that = $(this);
      console.log(that);
      data.forEach(function(item) {
        if (that.data('index') == item.id) {
          that.removeClass('hidden');
        }
      });
    });

    // Show the page itself.
    // (the render function hides all pages so we need to show the one we want).
    page.addClass('visible');
  }


  // Opens up a preview for one of the products.
  // Its parameters are an index from the hash and the products object.
  function renderSingleProductPage(index, data) {
    let page = $('.single-product'),
      container = $('.preview-large');
    
    // Find the wanted product by iterating the data object and searching for the chosen index.
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
          
          /* container.find('p').text(datad[0].url); */
          /*  container.find('p').text(item.description); */
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

  // Get the filters object, turn it into a string and write it into the hash.
  function createQueryHash(filters) {
    // Here we check if filters isn't empty.
    if (!$.isEmptyObject(filters)) {
      // Stringify the object via JSON.stringify and write it after the '#filter' keyword.
      window.location.hash = '#filter/' + JSON.stringify(filters);
    } else {
      // If it's empty change the hash to '#' (the homepage).
      window.location.hash = '#';
    }
  }
});