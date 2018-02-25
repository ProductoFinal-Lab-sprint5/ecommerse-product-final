const begin = () => {
  console.log('hola mundo');
  let categories = [];
  let subCategories = [];
  let idCategoriePeruCameras = 'MPE1039';
  let idSubCategories = '';
  
  const api = {
    urlCamares: `https://api.mercadolibre.com/categories/${idCategoriePeruCameras}`,
    // urlSubCategories: `http://cors.io/?http://https://api.mercadolibre.com${subCategories[i]}`
  };

  const uploadCategorieCameras = () =>{
    $.getJSON(api.urlCamares, function(response) {
      categories = response.children_categories;
      // almaceno en el array los id de cada subcategoria   
      categories.forEach(function(id, i) {
        subCategories.push(categories[i].id);
      });
      console.log(subCategories);
      uploadSubcategories();
      // categories.forEach(viewCategorie);
    });
  };

  const uploadSubcategories = () => {
    for (let i in categories) {
      $.getJSON(`https://api.mercadolibre.com//categories/${subCategories[i]}`, function(response2) {
        subcategoriesChildren = response2.children_categories;
        console.log(response2);
        console.log(subcategoriesChildren);
        viewCategorie(response2, subcategoriesChildren);
      });
    };
  };

  const viewCategorie = (data, childrenCategories) => {
    console.log(data.name);
    for (let i in childrenCategories) {
      console.log(childrenCategories[i].name);
      const templateSubcategorie = `<li><a href="">${childrenCategories[i].name}</a></li>`;
      $('#containerSubcategorie').append(templateSubcategorie);
    }
    

    const templateCategorie = `<div class="card">
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
