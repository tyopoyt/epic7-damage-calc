const URLs = {
  calculator: [
    'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js',
    'data/constants.js',
    'lang.js',
    'damage-calculator/compare.js',
    'form.js',
    'data/heroes.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.18/dist/js/bootstrap-select.min.js',
    'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/js/all.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'data/artifacts.js',
    'query-params.js',
    'damage-calculator/calculator.js'
  ],
  effectiveness: [
    'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.18/dist/js/bootstrap-select.min.js',
    'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/js/all.min.js',
    '../lang.js',
    '../query-params.js',
    'effectiveness.js',
    '../form.js'
  ],
  'speed-tuner':  [
    'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.18/dist/js/bootstrap-select.min.js',
    'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/js/all.min.js',
    '../lang.js',
    '../query-params.js',
    'speed-tuner.js',
    '../form.js'
  ],
  'ehp-calculator': [
    'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.18/dist/js/bootstrap-select.min.js',
    'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/js/all.min.js',
    '../lang.js',
    '../query-params.js',
    'ehp-calculator.js',
    '../form.js'
  ]
};


// This function is called from html
/* eslint-disable no-unused-vars */
async function loadScripts(page, localized = false, index = 0){
  if(index >= URLs[page].length) {
    buildInitialForm();
    loadQueryParams();
    return false;
  }
 
  var el = document.createElement('script');
  el.onload = function(){
    loadScripts(page, localized, index + 1);
  };
  let source = URLs[page][index];
  if (!URLs[page][index].startsWith('http') && localized) {
    if (page === 'calculator') {
      source = '../' + source;
    } else if (source.startsWith(page)) {
      source = `../${page}/` + source;
    }
  }
  el.src =  source;
  document.body.appendChild(el);
}