Shopify.CustomOptionSelectors = function(domIdPrefix, options) {
  this.selectorDivClass = 'selector-wrapper';
  this.selectorClass = 'single-option-selector';
  this.variantIdFieldIdSuffix = '-variant-id';
  this.variantIdField = null;
  this.historyState = null;
  this.selectors = [];
  this.domIdPrefix = domIdPrefix;
  this.product = new Shopify.Product(options.product);
  this.onVariantSelected = Shopify.isDefined(options.onVariantSelected)
    ? options.onVariantSelected
    : function() {};
  this.replaceSelector(domIdPrefix);
  this.initDropdown();

  if (options.enableHistoryState) {
    this.historyState = new Shopify.CustomOptionSelectors.HistoryState(this);
  }
};

Shopify.CustomOptionSelectors.prototype.initDropdown = function() {
  var options = {
    initialLoad: true,
  };

  if (!this.selectVariantFromDropdown(options)) {
    var that = this;

    setTimeout(function() {
      that.selectVariantFromParams(t) ||
        that.fireOnChangeForFirstDropdown.call(that, options);
    });
  }
};

Shopify.CustomOptionSelectors.prototype.fireOnChangeForFirstDropdown = function(
  onChange,
) {
  this.selectors[0].element.onchange(onChange);
};

Shopify.CustomOptionSelectors.prototype.selectVariantFromParamsOrDropdown = function(
  t,
) {
  this.selectVariantFromParams(t) || this.selectVariantFromDropdown(t);
};

Shopify.CustomOptionSelectors.prototype.replaceSelector = function(id) {
  var element = document.getElementById(id);
  var parent = element.parentNode;

  Shopify.each(this.buildSelectors(), function(t) {
    parent.insertBefore(t, element);
  });

  element.style.display = 'none';

  this.variantIdField = element;
};

Shopify.CustomOptionSelectors.prototype.selectVariantFromDropdown = function(
  options,
) {
  var selectedValue = document.getElementById(this.domIdPrefix).querySelector('[selected]') || document.getElementById(this.domIdPrefix).querySelector('[selected="selected"]')

  if (!selectedValue) {
    return false;
  }

  return this.selectVariant(selectedValue.value, options);
};

Shopify.CustomOptionSelectors.prototype.selectVariantFromParams = function(t) {
  var e = Shopify.urlParam('variant');
  return this.selectVariant(e, t);
};

Shopify.CustomOptionSelectors.prototype.selectVariant = function(variantId, e) {
  var variant = this.product.getVariantById(variantId);

  if (variant == null) {
    return false;
  }

  for (var i = 0; i < this.selectors.length; i++) {
    var r = this.selectors[i].element;
    var n = variant[r.getAttribute('data-option')];

    if (n != null && this.optionExistInSelect(r, n)) {
      r.value = n;
    }
  }

  if (typeof jQuery != 'undefined') {
    jQuery(this.selectors[0].element).trigger('change', e);
  } else {
    this.selectors[0].element.onchange(e);
  }

  return true;
};

Shopify.CustomOptionSelectors.prototype.optionExistInSelect = function(
  element,
  value,
) {
  for (var o = 0; o < element.options.length; o++) {
    if (element.options[o].value == value) {
      return true;
    }
  }

  return false;
};

Shopify.CustomOptionSelectors.prototype.insertSelectors = function(t, e) {
  if (Shopify.isDefined(e)) {
    if (this.setMessageElement(e)) {
      this.domIdPrefix = 'product-' + this.product.id + '-variant-selector';
    }
  }

  var container = document.getElementById(t);

  Shopify.each(this.buildSelectors(), function(t) {
    container.appendChild(t);
  });
};

Shopify.CustomOptionSelectors.prototype.buildSelectors = function() {
  for (var t = 0; t < this.product.optionNames().length; t++) {
    var selector = new Shopify.SingleOptionSelector(
      this,
      t,
      this.product.optionNames()[t],
      this.product.optionValues(t),
    );

    selector.element.disabled = false;
    this.selectors.push(selector);
  }

  var i = this.selectorDivClass;
  var r = this.product.optionNames();

  return Shopify.map(this.selectors, function(t) {
    var container = document.createElement('div');

    if ((container.setAttribute('class', i), 1 < r.length)) {
      var o = document.createElement('label');

      o.htmlFor = t.element.id;
      o.innerHTML = t.name;

      container.appendChild(o);
    }

    container.appendChild(t.element);

    return container;
  });
};

Shopify.CustomOptionSelectors.prototype.selectedValues = function() {
  for (var t = [], e = 0; e < this.selectors.length; e++) {
    var o = this.selectors[e].element.value;

    t.push(o);
  }

  return t;
};

Shopify.CustomOptionSelectors.prototype.updateSelectors = function(t, e) {
  var o = this.selectedValues();
  var i = this.product.getVariant(o);

  if (i) {
    this.variantIdField.disabled = false;
    this.variantIdField.value = i.id;
  } else {
    this.variantIdField.disabled = true;
  }

  this.onVariantSelected(i, this, e);

  if (null != this.historyState) {
    this.historyState.onVariantChange(i, this, e);
  }
};

Shopify.CustomOptionSelectorsFromDOM = function(t, e) {
  var o = e.optionNames || [];
  var i = e.priceFieldExists || true;
  var r = e.delimiter || '/';
  var n = this.createProductFromSelector(t, o, i, r);

  e.product = n;

  Shopify.CustomOptionSelectorsFromDOM.baseConstructor.call(this, t, e);
};

Shopify.extend(
  Shopify.CustomOptionSelectorsFromDOM,
  Shopify.CustomOptionSelectors,
);

Shopify.CustomOptionSelectorsFromDOM.prototype.createProductFromSelector = function(
  t,
  n,
  a,
  s,
) {
  if (!Shopify.isDefined(a)) {
    a = true;
  }

  if (!Shopify.isDefined(s)) {
    s = '/';
  }

  var e = document.getElementById(t);
  var o = e.childNodes;
  var p = (e.parentNode, n.length);
  var l = [];

  Shopify.each(o, function(t) {
    if (1 == t.nodeType && 'option' == t.tagName.toLowerCase()) {
      var e = t.innerHTML.split(new RegExp('\\s*\\' + s + '\\s*'));

      if (n.length == 0) {
        p = e.length - (a ? 1 : 0);
      }

      var o = e.slice(0, p);
      var i = a ? e[p] : '';

      t.getAttribute('value');

      var r = {
        available: !t.disabled,
        id: parseFloat(t.value),
        price: i,
        option1: o[0],
        option2: o[1],
        option3: o[2],
      };

      l.push(r);
    }
  });

  var i = {
    variants: l,
  };

  if (0 == n.length) {
    i.options = [];

    for (var r = 0; r < p; r++) {
      i.options[r] = 'option ' + (r + 1);
    }
  } else {
    i.options = n;
  }

  return i;
};

Shopify.SingleOptionSelector = function(selectors, index, name, values) {
  this.multiSelector = selectors;
  this.values = values;
  this.index = index;
  this.name = name;
  this.element = document.createElement('select');

  for (var r = 0; r < values.length; r++) {
    var option = document.createElement('option');

    option.value = values[r];
    option.innerHTML = values[r];

    this.element.appendChild(option);
  }

  this.element.setAttribute('class', this.multiSelector.selectorClass);
  this.element.setAttribute('data-option', 'option' + (index + 1));
  this.element.id = selectors.domIdPrefix + '-option-' + index;
  this.element.onchange = function(t, e) {
    e = e || {};
    selectors.updateSelectors(index, e);
  };

  return true;
};

Shopify.CustomOptionSelectors.HistoryState = function(t) {
  if (this.browserSupports()) {
    this.register(t);
  }
};

Shopify.CustomOptionSelectors.HistoryState.prototype.register = function(selectors) {
  window.addEventListener('popstate', function() {
    selectors.selectVariantFromParamsOrDropdown({
      popStateCall: true,
    });
  });
};

Shopify.CustomOptionSelectors.HistoryState.prototype.onVariantChange = function(
  t,
  e,
  o,
) {
  this.browserSupports() &&
    (!t ||
      o.initialLoad ||
      o.popStateCall ||
      Shopify.setParam('variant', t.id));
};

Shopify.CustomOptionSelectors.HistoryState.prototype.browserSupports = function() {
  return window.history && window.history.replaceState;
};
