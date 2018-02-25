const begin = () => {
  console.log('hola mundo');
  let categories = [];
  let idCategoriePeruCameras = '/categories/MPE1039';
  let idSubCategories = '';
  
  const api = {
    urlCamares: `https://api.mercadolibre.com${idCategoriePeruCameras}`,
    urlSubCategories: `https://api.mercadolibre.com${idSubCategories}`
  };

  const uploadCategorieCameras = () =>{
    $.getJSON(api.urlCamares, function(response) {
      childrenCategories = response.children_categories;
      childrenCategories.forEach(viewCategorie);
      console.log(response);
      console.log(childrenCategories.id);
    });
  };



  //   /** insertar la información en una tabla de contenidos **/
  const viewCategorie = data => {
  // let contentCategorie = data.children_categories;
  //   let author = data.author_name;
  //   let id = data.id;
  //   let answers = data.responses_count;
  //   countThemes += 1;
  //   // console.log(contentTheme);
    console.log(data);
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
                                </div>
                              </div>
                            </div> `;
    $('#containerCategorie').append(templateCategorie);
  };
  // viewCategorie()
  uploadCategorieCameras();
};
$(document).ready(begin);
