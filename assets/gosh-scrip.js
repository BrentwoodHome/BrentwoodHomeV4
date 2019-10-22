(function($) {


  jQuery( ".header-links .icons" ).append( '<i class="fa fa-user"></i>' );
  jQuery(".header-links .cusstom-link").hide();
  jQuery(".header-links .icons i").addClass("accordion-show");
  jQuery(".header-links .icons i").click(function(){
    if(jQuery(this).parent().next().is(":visible")){
      jQuery(this).addClass("accordion-show");
    }else{
      jQuery(this).removeClass("accordion-show");
    }
    jQuery(this).parent().next().toggle(400);
  });
  jQuery('#search-top .icon-search').click(function(){


    jQuery('#search-top .search-form .inputbox').focus().css("color","#000");
  });

  jQuery('#currencies-top .dropdown-currency').hide();
  jQuery('#currencies-top').hover(
    function () {
      jQuery(this).addClass('active').find('.dropdown-currency').stop().delay(200).slideDown();
    },
    function () {
      jQuery(this).removeClass('active').find('.dropdown-currency').stop().delay(200).slideUp();
    }
  );





  var switchImage = function(newImageSrc, newImage, mainImageDomEl) {
    jQuery(mainImageDomEl).attr('src', newImageSrc);
    if ($(window).width() > 782) {jQuery(mainImageDomEl).parent().trigger('zoom.destroy').zoom( { url: newImageSrc.replace('_master', '') } );}
    $(mainImageDomEl).parents('a').attr('href', newImageSrc);
  };

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })


  /*if ($("#filter-sidebar")) {
    History.Adapter.bind(window, "statechange", function() {
      var e = History.getState();
      if (!mt.isSidebarAjaxClick) {
        mt.sidebarParams();
        var n = mt.sidebarCreateUrl();
        mt.sidebarGetContent(n);

      }
      mt.isSidebarAjaxClick = false
    })
  }*/

  if (window.use_color_swatch) {
    $(".swatch :radio").change(function() {
      var t = $(this).closest(".swatch").attr("data-option-index");
      var n = $(this).val();
      $(this).closest("form").find(".single-option-selector").eq(t).val(n).trigger("change")
    });

    Shopify.optionsMap = {};
    Shopify.updateOptionsInSelector = function(t) {
      switch (t) {
        case 0:
          var n = "root";
          var r = $(".single-option-selector:eq(0)");
          break;
        case 1:
          var n = $(".single-option-selector:eq(0)").val();
          var r = $(".single-option-selector:eq(1)");
          break;
        case 2:
          var n = $(".single-option-selector:eq(0)").val();
          n += " / " + $(".single-option-selector:eq(1)").val();
          var r = $(".single-option-selector:eq(2)")
          }
      var i = r.val();
      r.empty();
      var s = Shopify.optionsMap[n];
      for (var o = 0; o < s.length; o++) {
        var u = s[o];
        var a = $("<option></option>").val(u).html(u);
        r.append(a)
      }
      $('.swatch[data-option-index="' + t + '"] .swatch-element').each(function() {
        if ($.inArray($(this).attr("data-value"), s) !== -1) {
          $(this).removeClass("soldout").show().find(":radio").removeAttr("disabled", "disabled").removeAttr("checked")
        } else {
          $(this).addClass("soldout").hide().find(":radio").removeAttr("checked").attr("disabled", "disabled")
        }
      });
      if ($.inArray(i, s) !== -1) {
        r.val(i)
      }
      r.trigger("change")
    };
    Shopify.linkOptionSelectors = function(mt) {
      for (var n = 0; n < mt.variants.length; n++) {
        var r = mt.variants[n];
        if (r.available) {
          Shopify.optionsMap["root"] = Shopify.optionsMap["root"] || [];
          Shopify.optionsMap["root"].push(r.option1);
          Shopify.optionsMap["root"] = Shopify.uniq(Shopify.optionsMap["root"]);
          if (mt.options.length > 1) {
            var i = r.option1;
            Shopify.optionsMap[i] = Shopify.optionsMap[i] || [];
            Shopify.optionsMap[i].push(r.option2);
            Shopify.optionsMap[i] = Shopify.uniq(Shopify.optionsMap[i])
          }
          if (mt.options.length === 3) {
            var i = r.option1 + " / " + r.option2;
            Shopify.optionsMap[i] = Shopify.optionsMap[i] || [];
            Shopify.optionsMap[i].push(r.option3);
            Shopify.optionsMap[i] = Shopify.uniq(Shopify.optionsMap[i])
          }
        }
      }
      Shopify.updateOptionsInSelector(0);
      if (mt.options.length > 1) Shopify.updateOptionsInSelector(1);
      if (mt.options.length === 3) Shopify.updateOptionsInSelector(2);
      $(".single-option-selector:eq(0)").change(function() {
        Shopify.updateOptionsInSelector(1);
        if (mt.options.length === 3) Shopify.updateOptionsInSelector(2);
        return true
      });
      $(".single-option-selector:eq(1)").change(function() {
        if (mt.options.length === 3) Shopify.updateOptionsInSelector(2);
        return true
      })
    }
  }

  $(document).ready(function() {
    mt.go()
  });
  $(window).resize(function() {
    mt.goResizeImage()
  });



  var mt = {
    atTimeout: null,
    isSidebarAjaxClick: false,
    go: function() {
      this.goResizeImage();

      this.goSidebar();
      this.goCloudzoom();
      this.goScrollTop();
      this.goDropDownCart();//add cart
      this.goAddToCart();
      this.goBox();
      this.goProductAddToCart();
      this.goWishlist();
      this.goProductWishlist();
      this.goRemoveWishlist();
    },
    sidebarMapTagEvents: function() {
      $(".sidebar-tag a, .sidebar-tag label").click(function(n) {
        var r = [];
        if (Shopify.queryParams.constraint) {
          r = Shopify.queryParams.constraint.split("+")
        }
        if (!window.enable_sidebar_multiple_choice && !$(this).prev().is(":checked")) {
          var i = $(this).parents(".sidebar-tag").find("input:checked");
          if (i.length > 0) {
            var s = i.val();
            if (s) {
              var o = r.indexOf(s);
              if (o >= 0) {
                r.splice(o, 1)
              }
            }
          }
        }
        var s = $(this).prev().val();
        if (s) {
          var o = r.indexOf(s);
          if (o >= 0) {
            r.splice(o, 1)
          } else {
            r.push(s)
          }
        }
        if (r.length) {
          Shopify.queryParams.constraint = r.join("+")
        } else {
          delete Shopify.queryParams.constraint
        }
        mt.sidebarAjaxClick();
        n.preventDefault()
      })
    },


    sidebarMapEvents: function() {
      mt.sidebarMapTagEvents();

    },

    //cart top

    checkItemsInDropdownCart: function() {
      if ($("#dropdown-cart .cart-list").children().length > 0) {
        $("#dropdown-cart .cart-empty").hide();
        $("#dropdown-cart .mini_cart_header").show()
      } else {
        $("#dropdown-cart .mini_cart_header").hide();
        $("#dropdown-cart .cart-empty").show()
      }
    },

    goDropDownCart: function() {
      $(".header-cart .top-cart").hover(
        function () {
          $(this).addClass("active").find("#dropdown-cart").stop().delay(200).slideDown();
        },
        function () {
          $(this).removeClass("active").find("#dropdown-cart").stop().delay(200).slideUp();
        }
      );
      mt.checkItemsInDropdownCart();
      $("#dropdown-cart .cart-empty a").click(function() {
        $("#dropdown-cart").slideUp("fast")
      });
      $("#dropdown-cart .btn-remove").click(function(n) {
        n.preventDefault();
        var cart = $(this).parents(".item").attr("id");
        cart = cart.match(/\d+/g);
        Shopify.removeItem(cart, function(e) {
          mt.doUpdateDropdownCart(e)
        })
      })
    },
    closeDropdownCart: function() {
      if ($("#dropdown-cart").is(":visible")) {
        $("#dropdown-cart").slideUp("fast")
      }
    },

    //end cart





    sidebarMapData: function(n) {
      var r = $(".col-main .products-grid");
      if (r.length == 0) {
        r = $(".col-main .product-list")
      }
      var i = $(n).find(".col-main .products-grid");
      if (i.length == 0) {
        i = $(n).find(".col-main .product-list")
      }
      if (i.length > 0 && i.hasClass("products-grid")) {
        if (window.product_image_resize) {
          i.find("img").fakecrop({
            fill: window.images_size.is_crop,
            widthSelector: ".products-grid .grid-item .product-image",
            ratioWrapper: window.images_size
          })
        }
      }
      r.replaceWith(i);

    /** Affirm Finance Pricing Load on Ajax Refresh KAM 2/1/2017 **/

    /*var _affirm_config = {
    public_api_key:  "HVHTFP3GXV9X8ZBN",
    script:          "//cdn.shopify.com/s/files/1/1507/2946/t/2/assets/affirm.js"
    };
    (function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};h.async=!0;h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,_affirm_config,"affirm","checkout","ui","script","ready");*/
    // Use your live public API Key and https://cdn1.affirm.com/js/v2/affirm.js script to point to Affirm production environment.

    /** Affirm Finance Pricing Load on Ajax Submit Refresh 2/1/2017 **/

      var s = $(".page-header");
      var o = $(n).find(".page-header");
      if (s.find("h2").text() != o.find("h2").text()) {
        s.find("h2").replaceWith(o.find("h2"));
        if (s.find(".rte").length) {
          if (o.find(".rte").length) {
            s.find(".rte").replaceWith(o.find(".rte"))
          } else {
            s.find(".rte").hide()
          }
        } else {
          if (o.find(".rte").length) {
            s.find("h2").after(o.find(".rte"))
          }
        }
      }
      $(".refined-widgets").replaceWith($(n).find(".refined-widgets"));
      $(".sidebar-block").replaceWith($(n).find(".sidebar-block"))
    },
    sidebarCreateUrl: function(t) {
      var n = $.param(Shopify.queryParams).replace(/%2B/g, "+");
      if (t) {
        if (n != "") return t + "?" + n;
        else return t
          }
      return location.pathname + "?" + n
    },
    sidebarAjaxClick: function(e) {
      delete Shopify.queryParams.page;
      var n = mt.sidebarCreateUrl(e);
      mt.isSidebarAjaxClick = true;
      History.pushState({
        param: Shopify.queryParams
      }, n, n);
      mt.sidebarGetContent(n)
    },
    sidebarGetContent: function(n) {
      $.ajax({
        type: "get",
        url: n,
        beforeSend: function() {
          mt.showLoading()
        },
        success: function(e) {
          mt.sidebarMapData(e);

          mt.sidebarMapTagEvents();
          mt.hideLoading();

          mt.goAddToCart();
          mt.goWishlist()
        },
        error: function(n, r) {
          mt.hideLoading();
          $(".loading").hide();
          $(".ajax-error-message").text($.parseJSON(n.responseText).description);
          mt.showBox(".ajax-error-cbox")
        }
      })
    },
    sidebarParams: function() {
      Shopify.queryParams = {};
      if (location.search.length) {
        for (var e, mt = 0, n = location.search.substr(1).split("&"); mt < n.length; mt++) {
          e = n[mt].split("=");
          if ($.length > 1) {
            Shopify.queryParams[decodeURIComponent(e[0])] = decodeURIComponent(e[1])
          }
        }
      }
    },

    goSidebar: function() {
      if ($("#filter-sidebar").length > 0) {
        mt.sidebarParams();
        mt.sidebarMapEvents()
      }
    },

    goWishlist: function() {
      $(".grid-item button.wishlist").click(function(n) {
        n.preventDefault();
        var r = $(this).parent();
        var i = r.parents(".grid-item");
        $.ajax({
          type: "POST",
          url: "/contact",
          data: r.serialize(),
          beforeSend: function() {
            mt.showLoading()
          },
          success: function(n) {
            mt.hideLoading();
            r.html('<a class="wishlist" href="/pages/wish-list" title="Go to wishlist"><span class="icon"></span><span>Go to wishlist</span></a>');
            $(".ajax-success-cbox").find(".show-wishlist").show();
            $(".ajax-success-cbox").find(".show-cart").hide();
            mt.showBox(".ajax-success-cbox")
          },
          error: function(n, r) {
            mt.hideLoading();
            $(".loading").hide();
            $(".ajax-error-message").text($.parseJSON(n.responseText).description);
            mt.showBox(".ajax-error-cbox")
          }
        })
      })
    },
    goProductWishlist: function() {
      $(".product button.wishlist").click(function(n) {
        n.preventDefault();
        var r = $(this).parent();
        var i = r.parents(".grid-item");
        $.ajax({
          type: "POST",
          url: "/contact",
          data: r.serialize(),
          beforeSend: function() {
            mt.showLoading()
          },
          success: function(n) {
            mt.hideLoading();
            r.html('<a class="wishlist" href="/pages/wish-list" title="Go to wishlist"><span class="icon"></span><span>Go to wishlist</span></a>');
            $(".ajax-success-cbox").find(".show-wishlist").show();
            $(".ajax-success-cbox").find(".show-cart").hide();
            mt.showBox(".ajax-success-cbox")
          },
          error: function(n, r) {
            mt.hideLoading();
            $(".loading").hide();
            $(".ajax-error-message").text($.parseJSON(n.responseText).description);
            mt.showBox(".ajax-error-cbox")
          }
        })
      })
    },
    goRemoveWishlist: function() {
      $(".btn-remove-wishlist").click(function(n) {
        var r = $(this).parents("tr");
        var i = r.find(".tag-id").val();
        var s = jQuery("#remove-wishlist-form");
        s.find("input[name='contact[tags]']").val("x" + i);
        $.ajax({
          type: "POST",
          url: "/contact",
          data: s.serialize(),
          beforeSend: function() {
            mt.showLoading()
          },
          success: function(e) {
            mt.hideLoading();
            r.fadeOut(1e3)
          },
          error: function(n, r) {
            mt.hideLoading();
            $(".loading-modal").hide();
            $(".ajax-error-message").text($.parseJSON(n.responseText).description);
            mt.showModal(".ajax-error-cbox")
          }
        })
      })
    },
    goResizeImage: function() {
      if (window.product_image_resize) {
        $(".products-grid .product-image img").fakecrop({
          fill: window.images_size.is_crop,
          widthSelector: ".products-grid .grid-item .product-image",
          ratioWrapper: window.images_size
        })
      }
    },



    showBox: function(n) {
      $(n).fadeIn(500);
      mt.atTimeout = setTimeout(function() {
        $(n).fadeOut(500)
      }, 5e3)
    },


    goBox: function() {
      $(".continue-shopping").click(function() {
        clearTimeout(mt.atTimeout);
        $(".ajax-success-cbox").fadeOut(500)
      });
      $(".close-cbox").click(function() {
        clearTimeout(mt.atTimeout);
        $(".ajax-success-cbox").fadeOut(500)
      })
    },

    goCloudzoom: function() {
      if ($("#product-featured-image").length > 0) {

        $("#product-featured-image").elevateZoom({
          gallery: "zt_list_product",
          zoomType	: "inner",
          onImageSwapComplete: function() {
            $(".gallery-images div").hide()
          },
          loadingIcon: window.loading_url
        });
        $("#product-featured-image").bind("click", function(typo) {
          var n = $("#product-featured-image").data("elevateZoom");
          $.fancybox(n.getGalleryList());
          return false
        })

      }
    },



    goScrollTop: function() {
      $("#back-top").click(function() {
        $("body,html").animate({
          scrollTop: 0
        }, 400);
        return false
      })
    },
    goProductAddToCart: function() {
      if ($("#product-add-to-cart").length > 0) {
        $("#product-add-to-cart").click(function(n) {
          n.preventDefault();
          if ($(this).attr("disabled") != "disabled") {
            if (!window.ajax_cart) {
              $(this).closest("form").submit()
            } else {
              var cart = $("#add-to-cart-form select[name=id]").val();
              if (!cart) {
                cart = $("#add-to-cart-form input[name=id]").val()
              }
              var i = $("#add-to-cart-form input[name=quantity]").val();
              if (!i) {
                i = 1
              }

              var o = $("#product-featured-image").attr("src");
              mt.doAjaxAddToCart(cart, i, o)
            }
          }
          return false
        })
      }
    },
    goAddToCart: function() {
      if ($(".add-to-cart-btn").length > 0) {
        $(".add-to-cart-btn").click(function(n) {
          n.preventDefault();
          if ($(this).attr("disabled") != "disabled") {
            var cart = $(this).parents(".product-item");
            var i = $(cart).attr("id");
            i = i.match(/\d+/g);
            if (!window.ajax_cart) {
              $("#product-actions-" + i).submit()
            } else {
              var s = $("#product-actions-" + i + " select[name=id]").val();
              if (!s) {
                s = $("#product-actions-" + i + " input[name=id]").val()
              }
              var o = $("#product-actions-" + i + " input[name=quantity]").val();
              if (!o) {
                o = 1
              }
              var u = $(cart).find(".product-title").text();
              mt.doAjaxAddToCart(s, o, u)
            }

          }
          return false
        })
      }
    },
    showLoading: function() {
      $(".loading").show()
    },
    hideLoading: function() {
      $(".loading").hide()
    },
    doAjaxAddToCart: function(n, r, i, s) {
      $.ajax({
        type: "post",
        url: "/cart/add.js",
        data: "quantity=" + r + "&id=" + n,
        dataType: "json",
        beforeSend: function() {
          mt.showLoading()
        },
        success: function(n) {
          mt.hideLoading();
          $(".ajax-success-cbox").find(".ajax-product-title").text(i);
          $(".ajax-success-cbox").find(".show-wishlist").hide();
          $(".ajax-success-cbox").find(".show-cart").show();
          mt.showBox(".ajax-success-cbox");
          mt.updateDropdownCart()
        },
        error: function(n, r) {
          mt.hideLoading();
          $(".ajax-error-message").text($.parseJSON(n.responseText).description);
          mt.showBox(".ajax-error-cbox")
        }
      })
    },

    updateDropdownCart: function() {
      Shopify.getCart(function(e) {
        mt.doUpdateDropdownCart(e)
      })
    },
    doUpdateDropdownCart: function(n) {
      $("#cart-count").text(n.item_count);
    },


    convertToSlug: function(e) {
      return $.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
    },



    //cart function



    updateDropdownCart: function() {
      Shopify.getCart(function(e) {
        mt.doUpdateDropdownCart(e)
      })
    },
    doUpdateDropdownCart: function(n) {
      var cart = '<li class="item" id="cart-item-{ID}"><a href="{URL}" title="{TITLE}" class="product-image"><img src="{IMAGE}" alt="{TITLE}"></a><div class="product-inner"><a href="javascript:void(0)" title="Remove Item" class="btn-remove"><i class="fa fa-times"></i></a><p class="product-name"><a href="{URL}">{TITLE}</a></p><div class="cart-collateral"><span class="price">{PRICE}</span>(x {QUANTITY})</div></div></li>';
      $("#cart-count").text(n.item_count);
      $("#dropdown-cart .summary .price").html(Shopify.formatMoney(n.total_price, window.money_format));
      $("#dropdown-cart .cart-list").html("");
      if (n.item_count > 0) {
        for (var i = 0; i < n.items.length; i++) {
          var s = cart;
          s = s.replace(/\{ID\}/g, n.items[i].id);
          s = s.replace(/\{URL\}/g, n.items[i].url);
          s = s.replace(/\{TITLE\}/g, n.items[i].title);
          s = s.replace(/\{QUANTITY\}/g, n.items[i].quantity);
          s = s.replace(/\{IMAGE\}/g, Shopify.resizeImage(n.items[i].image, "small"));
          s = s.replace(/\{PRICE\}/g, Shopify.formatMoney(n.items[i].price, window.money_format));
          $("#dropdown-cart .cart-list").append(s)
        }
        $("#dropdown-cart .btn-remove").click(function(n) {
          n.preventDefault();
          var cart = $(this).parents(".item").attr("id");
          cart = cart.match(/\d+/g);
          Shopify.removeItem(cart , function(e) {
            mt.doUpdateDropdownCart(e)
          })
        });
        if (mt.checkNeedToConvertCurrency()) {
          Currency.convertAll(window.shop_currency, jQuery("#currencies").val(), "#dropdown-cart span.money", "money_format")
        }
      }
      mt.checkItemsInDropdownCart()
    },
    checkNeedToConvertCurrency: function() {
      return window.show_multiple_currencies && Currency.currentCurrency != shopCurrency
    },

    //endcart

  }


  var switchImage = function(newImageSrc, newImage, mainImageDomEl) {
    jQuery(mainImageDomEl).attr('src', newImageSrc);

    if ($(window).width() > 782) {jQuery(mainImageDomEl).parent().trigger('zoom.destroy').zoom( { url: newImageSrc.replace('_master', '') } );}

    $(mainImageDomEl).parents('a').attr('href', newImageSrc);

  };

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })



  jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() > 200) {
      jQuery("#back-top").fadeIn()
    } else {
      jQuery("#back-top").fadeOut()
    }
  });
  jQuery( ".footer-top h3.module-title" ).append( '<i class="arrow_carrot-down"></i>' );
  jQuery(".footer-top .content").hide();
  jQuery(".footer-top h3.module-title i").addClass("accordion-show");
  jQuery(".footer-top h3.module-title i").click(function(){
    if(jQuery(this).parent().next().is(":visible")){
      jQuery(this).addClass("accordion-show");
    }else{
      jQuery(this).removeClass("accordion-show");
    }
    jQuery(this).parent().next().toggle(400);
  });

/*
 jQuery(window).load(function() {
   jQuery('.slide-des').height(jQuery('.flexslider .slides').height());

    window_height = $(window).height();
    window_heihgt_small=parseInt(window_height)-parseInt(20);
    window_heihgt_mini=parseInt(window_height)-parseInt(40);
     $('DIV#autoheight .block-item').each(function(){
    	$(this).height(window_height);
    });


    $('.block-1.block-item').height(window_heihgt_small);
    $('.block-top-2 .block-1.block-item').height(window_heihgt_mini);
    $('.block-top-3 .block-1.block-item').height(window_heihgt_mini);


   });
 jQuery(window).resize(function() {
   jQuery('.slide-des').height(jQuery('.flexslider .slides').height());

    window_height = $(window).height();
    window_heihgt_small=parseInt(window_height)-parseInt(20);
    window_heihgt_mini=parseInt(window_height)-parseInt(40);
     $('DIV#autoheight .block-item').each(function(){
    	$(this).height(window_height);
    });


    $('.block-1.block-item').height(window_heihgt_small);
    $('.block-top-2 .block-1.block-item').height(window_heihgt_mini);
    $('.block-top-3 .block-1.block-item').height(window_heihgt_mini);


   });
*/


  jQuery(document).ready(function($){
    $('.icon-search,.search-close').click(function(){
    	$('.wrap-show-search').toggleClass('open');
    });
  });
})(jQuery);
