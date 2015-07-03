!function(t){"function"==typeof define&&define.amd?define("datepicker",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(t){return"number"==typeof t}function i(t){return"undefined"==typeof t}function a(t,i){var a=[];return e(i)&&a.push(i),a.slice.apply(t,a)}function n(t){return t%4===0&&t%100!==0||t%400===0}function r(t,e){return[31,n(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function o(t){var e,i,a=t.match(/[.\/\-\s].*?/)||"/",n=t.split(/\W+/);if(!n||0===n.length)throw new Error("Invalid date format.");for(t={separator:a[0],parts:n},i=0,e=n.length;e>i;i++)switch(n[i]){case"dd":case"d":t.day=!0;break;case"mm":case"m":t.month=!0;break;case"yyyy":case"yy":t.year=!0}return t}function s(t,e){var i,a,n,r,o,s,c;if(i="string"==typeof t&&t?t.split(e.separator):[],a=e.parts.length,t=new Date,n=t.getFullYear(),r=t.getDate(),o=t.getMonth(),i.length===a)for(c=0;a>c;c++)switch(s=parseInt(i[c],10)||1,e.parts[c]){case"dd":case"d":r=s;break;case"mm":case"m":o=s-1;break;case"yy":n=2e3+s;break;case"yyyy":n=s}return new Date(n,o,r,0,0,0,0)}function c(t,e){var i,a={d:t.getDate(),m:t.getMonth()+1,yy:t.getFullYear().toString().substring(2),yyyy:t.getFullYear()},n=[],r=e.parts.length;for(a.dd=(a.d<10?"0":"")+a.d,a.mm=(a.m<10?"0":"")+a.m,i=0;r>i;i++)n.push(a[e.parts[i]]);return n.join(e.separator)}var l=t(window),d=t(document),h=function(e,i){this.$element=t(e),this.options=t.extend({},h.DEFAULTS,t.isPlainObject(i)&&i),this.visible=!1,this.isInput=!1,this.isInline=!1,this.init()};h.prototype={constructor:h,init:function(){var e,i=this.$element,a=this.options;this.$trigger=t(a.trigger||i),this.$picker=e=t(a.template),this.$years=e.find('[data-type="years picker"]'),this.$months=e.find('[data-type="months picker"]'),this.$days=e.find('[data-type="days picker"]'),this.isInput=i.is("input")||i.is("textarea"),this.isInline=a.inline&&(a.container||!this.isInput),this.isInline?(e.find(".datepicker-arrow").hide(),t(a.container||i).append(e)):(t(a.container||"body").append(e),this.place(),e.hide()),a.date&&i.data("date",a.date),this.format=o(a.dateFormat),this.fillWeek(),this.bind(),this.update(),this.isInline&&this.show()},bind:function(){var e=this.$element,i=this.options;this.$picker.on("click",t.proxy(this.click,this)),this.isInline||(this.isInput&&(e.on("keyup",t.proxy(this.update,this)),i.trigger||e.on("focus",t.proxy(this.show,this))),this.$trigger.on("click",t.proxy(this.show,this)))},showView:function(t){var e=this.format;if(e.year||e.month||e.day)switch(t){case 2:case"years":this.$months.hide(),this.$days.hide(),e.year?(this.fillYears(),this.$years.show()):this.showView(0);break;case 1:case"months":this.$years.hide(),this.$days.hide(),e.month?(this.fillMonths(),this.$months.show()):this.showView(2);break;default:this.$years.hide(),this.$months.hide(),e.day?(this.fillDays(),this.$days.show()):this.showView(1)}},hideView:function(){this.options.autoClose&&this.hide()},place:function(){var t=this.$trigger,e=t.offset();this.$picker.css({position:"absolute",top:e.top+t.outerHeight(),left:e.left,zIndex:this.options.zIndex})},show:function(){this.visible||(this.visible=!0,this.$picker.show(),this.isInline||(l.on("resize",t.proxy(this.place,this)),d.on("click",t.proxy(function(t){t.target!==this.$element[0]&&this.hide()},this))),this.showView(this.options.viewStart))},hide:function(){this.visible&&(this.visible=!1,this.$picker.hide(),this.isInline||(l.off("resize",this.place),d.off("click",this.hide)))},update:function(){var t=this.$element,e=t.data("date")||(this.isInput?t.prop("value"):t.text());this.date=e=s(e,this.format),this.viewDate=new Date(e.getFullYear(),e.getMonth(),e.getDate()),this.fillAll()},change:function(){var t=this.$element,e=c(this.date,this.format);this.isInput?t.prop("value",e):this.isInline||t.text(e),t.data("date",e).trigger("change")},getMonthByNumber:function(t,i){var a=this.options,n=i?a.monthsShort:a.months;return n[e(t)?t:this.date.getMonth()]},getDayByNumber:function(t,i,a){var n=this.options,r=a?n.daysMin:i?n.daysShort:n.days;return r[e(t)?t:this.date.getDay()]},getDate:function(t){return t?c(this.date,this.format):new Date(this.date)},template:function(e){var i=this.options,a={text:"",type:"",selected:!1,disabled:!1};return t.extend(a,e),["<"+i.itemTag+" ",a.selected?'class="'+i.selectedClass+'"':a.disabled?'class="'+i.disabledClass+'"':"",a.type?' data-type="'+a.type+'"':"",">",a.text,"</"+i.itemTag+">"].join("")},fillAll:function(){this.fillYears(),this.fillMonths(),this.fillDays()},fillYears:function(){var t,e,i="",a=[],n=this.options.yearSuffix||"",r=this.date.getFullYear(),o=this.viewDate.getFullYear();for(i=o-5+n+" - "+(o+6)+n,e=-5;7>e;e++)t=o+e===r,a.push(this.template({text:o+e,type:t?"year selected":"year",selected:t,disabled:-5===e||6===e}));this.$picker.find('[data-type="years current"]').html(i),this.$picker.find('[data-type="years"]').empty().html(a.join(""))},fillMonths:function(){var t,e,i="",a=[],n=this.options.monthsShort,r=this.date.getFullYear(),o=this.date.getMonth(),s=this.viewDate.getFullYear();for(i=s.toString()+this.options.yearSuffix||"",e=0;12>e;e++)t=s===r&&e===o,a.push(this.template({text:n[e],type:t?"month selected":"month",selected:t}));this.$picker.find('[data-type="year current"]').html(i),this.$picker.find('[data-type="months"]').empty().html(a.join(""))},fillWeek:function(){var e,i=this.options,a=[],n=i.daysMin,r=parseInt(i.weekStart,10)%7;for(n=t.merge(n.slice(r),n.slice(0,r)),e=0;7>e;e++)a.push(this.template({text:n[e]}));this.$picker.find('[data-type="week"]').html(a.join(""))},fillDays:function(){var e,i,a,n,o,s,c="",l=[],d=[],h=[],p=[],u=this.options.monthsShort,f=this.options.yearSuffix||"",m=this.date.getFullYear(),y=this.date.getMonth(),g=this.date.getDate(),v=this.viewDate.getFullYear(),k=this.viewDate.getMonth(),w=parseInt(this.options.weekStart,10)%7;for(c=this.options.showMonthAfterYear?v+f+" "+u[k]:u[k]+" "+v+f,a=0===k?r(v-1,11):r(v,k-1),o=1;a>=o;o++)d.push(this.template({text:o,type:"day prev",disabled:!0}));for(n=new Date(v,k,1,0,0,0,0),s=(7+(n.getDay()-w))%7,s=s>0?s:7,d=d.slice(a-s),a=11===k?r(v+1,0):r(v,k+1),o=1;a>=o;o++)p.push(this.template({text:o,type:"day next",disabled:!0}));for(a=r(v,k),n=new Date(v,k,a,0,0,0,0),s=(7-(n.getDay()+1-w))%7,s=s>=42-(d.length+a)?s:s+7,p=p.slice(0,s),o=1;a>=o;o++)e=v===m&&k===y&&o===g,i=this.options.isDisabled(new Date(v,k,o)),h.push(this.template({text:o,type:i?"day disabled":e?"day selected":"day",selected:e,disabled:i}));t.merge(l,d),t.merge(l,h),t.merge(l,p),this.$picker.find('[data-type="month current"]').html(c),this.$picker.find('[data-type="days"]').empty().html(l.join(""))},click:function(e){var i,a,n,r,o,s=t(e.target),c=/^\d{2,4}$/,l=!1;if(e.stopPropagation(),e.preventDefault(),0!==s.length)switch(i=this.viewDate.getFullYear(),a=this.viewDate.getMonth(),n=this.viewDate.getDate(),o=s.data().type){case"years prev":case"years next":i="years prev"===o?i-10:i+10,r=s.text(),l=c.test(r),l&&(i=parseInt(r,10),this.date=new Date(i,a,Math.min(n,28),0,0,0,0)),this.viewDate=new Date(i,a,Math.min(n,28),0,0,0,0),this.fillYears(),l&&(this.showView(1),this.change());break;case"year prev":case"year next":i="year prev"===o?i-1:i+1,this.viewDate=new Date(i,a,Math.min(n,28),0,0,0,0),this.fillMonths();break;case"year current":this.format.year&&this.showView(2);break;case"year selected":this.format.month?this.showView(1):this.hideView();break;case"year":i=parseInt(s.text(),10),this.date=new Date(i,a,Math.min(n,28),0,0,0,0),this.viewDate=new Date(i,a,Math.min(n,28),0,0,0,0),this.format.month?this.showView(1):this.hideView(),this.change();break;case"month prev":case"month next":a="month prev"===o?a-1:"month next"===o?a+1:a,this.viewDate=new Date(i,a,Math.min(n,28),0,0,0,0),this.fillDays();break;case"month current":this.format.month&&this.showView(1);break;case"month selected":this.format.day?this.showView(0):this.hideView();break;case"month":a=s.parent().children().index(s),this.date=new Date(i,a,Math.min(n,28),0,0,0,0),this.viewDate=new Date(i,a,Math.min(n,28),0,0,0,0),this.format.day?this.showView(0):this.hideView(),this.change();break;case"day prev":case"day next":case"day":a="day prev"===o?a-1:"day next"===o?a+1:a,n=parseInt(s.text(),10),this.date=new Date(i,a,n,0,0,0,0),this.viewDate=new Date(i,a,n,0,0,0,0),this.fillDays(),"day"===o&&this.hideView(),this.change();break;case"day selected":this.hideView(),this.change();break;case"day disabled":this.hideView()}}},h.DEFAULTS={date:!1,dateFormat:"mm/dd/yyyy",disabledClass:"disabled",selectedClass:"selected",autoClose:!1,inline:!1,trigger:!1,container:!1,showMonthAfterYear:!1,zIndex:1,viewStart:0,weekStart:0,yearSuffix:"",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],itemTag:"li",template:'<div class="datepicker-container" data-type="datepicker"><div class="datepicker-arrow"></div><div class="datepicker-content"><div class="content-years" data-type="years picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="years prev">&lsaquo;</li><li class="col-5" data-type="years current"></li><li class="datepicker-next" data-type="years next">&rsaquo;</li></ul><ul class="datepicker-years" data-type="years"></ul></div><div class="content-months" data-type="months picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="year prev">&lsaquo;</li><li class="col-5" data-type="year current"></li><li class="datepicker-next" data-type="year next">&rsaquo;</li></ul><ul class="datepicker-months" data-type="months"></ul></div><div class="content-days" data-type="days picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="month prev">&lsaquo;</li><li class="col-5" data-type="month current"></li><li class="datepicker-next" data-type="month next">&rsaquo;</li></ul><ul class="datepicker-week" data-type="week"></ul><ul class="datepicker-days" data-type="days"></ul></div></div></div>',isDisabled:function(){return!1}},h.setDefaults=function(e){t.extend(h.DEFAULTS,e)},h.other=t.fn.datepicker,t.fn.datepicker=function(e){var n,r=a(arguments,1);return this.each(function(){var i,a=t(this),o=a.data("datepicker");o||a.data("datepicker",o=new h(this,e)),"string"==typeof e&&t.isFunction(i=o[e])&&(n=i.apply(o,r))}),i(n)?this:n},t.fn.datepicker.Constructor=h,t.fn.datepicker.setDefaults=h.setDefaults,t.fn.datepicker.noConflict=function(){return t.fn.datepicker=h.other,this}}),function(t){"function"==typeof define&&define.amd?define("qor-comparator",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,a){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,a),this.init()};return e.prototype={constructor:e,init:function(){t.fn.modal&&(this.$modal=t(e.TEMPLATE.replace(/\{\{key\}\}/g,Date.now())).appendTo("body"),this.$modal.modal(this.options))},show:function(){this.$modal.modal("show")}},e.DEFAULTS={keyboard:!0,backdrop:!0,remote:!1,show:!0},e.TEMPLATE='<div class="modal fade qor-comparator-modal" id="qorComparatorModal{{key}}" aria-labelledby="qorComparatorModalLabel{{key}}" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="qorComparatorModalLabel{{key}}">Diff</h5></div><div class="modal-body"></div></div></div></div>',e.plugin=function(i){var a,n=[].slice.call(arguments,1);return this.each(function(){var r,o=t(this),s=o.data("qor.comparator");s?i="show":o.data("qor.comparator",s=new e(this,i)),"string"==typeof i&&t.isFunction(r=s[i])&&(a=r.apply(s,n))}),"undefined"==typeof a?this:a},t(function(){t.fn.modal&&t(document).on("click.qor.comparator.initiator",'[data-toggle="qor.comparator"]',function(i){var a=t(this);i.preventDefault(),e.plugin.call(a,a.data())})}),e}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(t){return"string"==typeof t&&(t=t.charAt(0).toUpperCase()+t.substr(1)),t}function i(e){var i,a={};if(t.isPlainObject(e))for(i in e)e.hasOwnProperty(i)&&(a[String(i).toLowerCase()]=e[i]);return a}function a(i){var a,n={};if(t.isPlainObject(i))for(a in i)i.hasOwnProperty(a)&&(n[e(a)]=i[a]);return n}function n(i,a){var n=String(a),r=n.toLowerCase(),o=n.toUpperCase(),s=e(n);return t.isPlainObject(i)?i[r]||i[s]||i[o]:void 0}var r=window.URL||window.webkitURL,o="qor.cropper",s="change."+o,c="click."+o,l="shown.bs.modal",d="hidden.bs.modal",h=/x|y|width|height/,p=function(e,i){this.$element=t(e),this.options=t.extend(!0,{},p.DEFAULTS,i),this.data=null,this.init()};return p.prototype={constructor:p,init:function(){var e,i,a=this.$element,n=this.options,r=a.closest(n.parent);r.length||(r=a.parent()),this.$parent=r,this.$output=e=r.find(n.output),this.$list=r.find(n.list),this.$modal=r.find(n.modal);try{i=JSON.parse(t.trim(e.val()))}catch(o){}this.data=t.extend(i||{},n.data),this.build(),this.bind()},build:function(){var t,e=this.$list;e.find("li").append(p.TOGGLE),t=e.find("img"),t.wrap(p.CANVAS),this.center(t)},bind:function(){this.$element.on(s,t.proxy(this.read,this)),this.$list.on(c,t.proxy(this.click,this)),this.$modal.on(l,t.proxy(this.start,this)).on(d,t.proxy(this.stop,this))},unbind:function(){this.$element.off(s,this.read),this.$list.off(c,this.click),this.$modal.off(l,this.start).on(d,this.stop)},click:function(e){var i,a=e.target;e.target!==this.$list[0]&&(i=t(a),i.is("img")||(i=i.closest("li").find("img")),this.$target=i,this.$modal.modal("show"))},read:function(){var t,e=this.$element.prop("files");e&&e.length&&(t=e[0],this.data[this.options.key]={},this.$output.val(JSON.stringify(this.data)),/^image\/\w+$/.test(t.type)&&r?this.load(r.createObjectURL(t)):this.$list.empty().text(t.name))},load:function(t){var e,i=this.$list;i.find("ul").length||(i.html(p.TEMPLATE),this.build()),e=i.find("img"),e.attr("src",t).data("originalUrl",t),this.center(e,!0)},start:function(){var e=this.options,r=this.$modal,o=this.$target,s=o.data(),c=s.sizeName||"original",l=s.sizeResolution,d=t("<img>").attr("src",s.originalUrl),p=l?n(l,"width")/n(l,"height"):0/0,u=this.data,f=this;u[e.key]||(u[e.key]={}),r.find(".modal-body").html(d),d.cropper({aspectRatio:p,data:i(u[e.key][c]),background:!1,zoomable:!1,rotatable:!1,checkImageOrigin:!1,built:function(){r.find(e.save).one("click",function(){var i,n={};t.each(d.cropper("getData"),function(t,e){h.test(t)&&(n[t]=Math.round(e))}),u[e.key][c]=a(n),f.imageData=d.cropper("getImageData"),f.cropData=n;try{i=d.cropper("getCroppedCanvas").toDataURL()}catch(o){}f.output(i),r.modal("hide")})}})},stop:function(){this.$modal.find(".modal-body > img").cropper("destroy").remove()},output:function(t){var e=this.$target;t?this.center(e.attr("src",t)):this.preview(e),this.autoCrop(t),this.$output.val(JSON.stringify(this.data))},preview:function(e){var i,a=e.parent(),n=a.parent(),r=Math.max(n.width(),160),o=Math.max(n.height(),160),s=this.imageData,c=t.extend({},this.cropData),l=c.width/c.height,d=r,h=o;o*l>r?h=d/l:d=h*l,i=c.width/d,t.each(c,function(t,e){c[t]=e/i}),a.css({width:c.width,height:c.height}),e.css({width:s.naturalWidth/i,height:s.naturalHeight/i,maxWidth:"none",maxHeight:"none",marginLeft:-c.x,marginTop:-c.y}),this.center(e)},center:function(e,i){e.each(function(){var e=t(this),a=e.parent(),n=a.parent(),r=function(){var t=n.height(),e=a.height(),i="auto";t>e&&(i=(t-e)/2),a.css("margin-top",i)};i&&a.removeAttr("style"),this.complete?r.call(this):this.onload=r})},autoCrop:function(e){var i=t.extend({},this.cropData),r=i.width/i.height,o=this.data[this.options.key],s=this;this.$list.find("img").not(this.$target).each(function(){var c=t(this),l=c.data(),d=l.sizeName,h=l.sizeResolution,p=h?n(h,"width")/n(h,"height"):0/0;d&&p&&p===r&&!o[d]&&(o[d]=a(i),e?s.center(c.attr("src",e)):s.preview(c))})},destroy:function(){this.unbind(),this.$element.removeData(o)}},p.DEFAULTS={parent:!1,output:!1,list:!1,modal:".qor-cropper-modal",save:".qor-cropper-save",key:"data",data:null},p.TOGGLE='<div class="qor-cropper-toggle"></div>',p.CANVAS='<div class="qor-cropper-canvas"></div>',p.TEMPLATE="<ul><li><img></li></ul>",p.plugin=function(e){return this.each(function(){var i,a=t(this),n=a.data(o);if(!n){if(!t.fn.cropper)return;a.data(o,n=new p(this,e))}"string"==typeof e&&t.isFunction(i=n[e])&&i.apply(n)})},t(function(){var e=".qor-file-input",i={parent:".form-group",output:".qor-file-options",list:".qor-file-list",key:"CropOptions",data:{Crop:!0}};t(document).on("click.qor.cropper.initiator",e,function(){p.plugin.call(t(this),i)}).on("renew.qor.initiator",function(a){var n=t(e,a.target);n.length&&p.plugin.call(n,i)}).triggerHandler("renew.qor.initiator")}),p}),function(t){"function"==typeof define&&define.amd?define("qor-datepicker",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,a){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,a),this.date=null,this.formatDate=null,this.built=!1,this.init()};return e.prototype={init:function(){t.fn.datepicker&&(this.$element.on("click",t.proxy(this.show,this)),this.options.show&&this.show())},build:function(){var i,a,n,r,o,s=this;this.built||(this.$modal=i=t(e.TEMPLATE).appendTo("body"),a=i.find(".qor-datepicker-year"),n=i.find(".qor-datepicker-month"),r=i.find(".qor-datepicker-week"),o=i.find(".qor-datepicker-day"),i.find(".qor-datepicker-embedded").on("change",function(){var e,i=t(this);s.date=e=i.datepicker("getDate"),s.formatDate=i.datepicker("getDate",!0),a.text(e.getFullYear()),n.text(String(i.datepicker("getMonthByNumber",e.getMonth(),!0)).toUpperCase()),r.text(i.datepicker("getDayByNumber",e.getDay())),o.text(e.getDate())}).datepicker({date:this.$element.val(),dateFormat:"yyyy-mm-dd",inline:!0}).triggerHandler("change"),i.find(".qor-datepicker-save").on("click",t.proxy(this.pick,this)),this.built=!0)},show:function(){this.built||this.build(),this.$modal.modal("show")},pick:function(){this.$element.val(this.formatDate),this.$modal.modal("hide")}},e.DEFAULTS={show:!0},e.TEMPLATE='<div class="modal fade qor-datepicker-modal" id="qorDatepickerModal" tabindex="-1" role="dialog" aria-labelledby="qorDatepickerModalLabel" aria-hidden="true"><div class="modal-dialog qor-datepicker"><div class="modal-content"><div class="modal-header sr-only"><h5 class="modal-title" id="qorDatepickerModalLabel">Pick a date</h5></div><div class="modal-body"><div class="qor-datepicker-picked"><div class="qor-datepicker-week"></div><div class="qor-datepicker-month"></div><div class="qor-datepicker-day"></div><div class="qor-datepicker-year"></div></div><div class="qor-datepicker-embedded"></div></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-datepicker-save">OK</button></div></div></div></div>',e.plugin=function(i){var a,n=[].slice.call(arguments,1);return this.each(function(){var r,o=t(this),s=o.data("qor.datepicker");s?i="show":o.data("qor.datepicker",s=new e(this,i)),"string"==typeof i&&t.isFunction(r=s[i])&&(a=r.apply(s,n))}),"undefined"==typeof a?this:a},t(function(){t.fn.datepicker&&(t(document).on("click.qor.datepicker.initiator",'[data-toggle="qor.datepicker"]',function(){var i=t(this);e.plugin.call(i,i.data())}),t(document).on("click.datepicker.initiator",'[data-toggle="datepicker"]',function(){var e=t(this);e.data("datepicker")||e.datepicker({autoClose:!0}),e.datepicker("show")}))}),e}),function(t){"function"==typeof define&&define.amd?define("qor-filter",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(e,n){var r,o=a.search;return t.isArray(e)&&(r=i(o),t.each(e,function(e,i){e=t.inArray(i,r),-1===e?r.push(i):n&&r.splice(e,1)}),o="?"+r.join("&")),o}function i(t){var e=[];return t&&t.indexOf("?")>-1&&(t=t.split("?")[1],t&&t.indexOf("#")>-1&&(t=t.split("#")[0]),t&&(e=t.split("&"))),e}var a=window.location,n=function(e,i){this.$element=t(e),this.options=t.extend({},n.DEFAULTS,i),this.init()};return n.prototype={constructor:n,init:function(){var t=this.$element,e=this.options,i=t.find(e.toggle);i.length&&(this.$toggle=i,this.parse(),this.bind())},bind:function(){this.$element.on("click",this.options.toggle,t.proxy(this.toggle,this))},parse:function(){var e=this.options,n=i(a.search);this.$toggle.each(function(){var a=t(this);t.each(i(a.attr("href")),function(i,r){var o=t.inArray(r,n)>-1;return a.toggleClass(e.activeClass,o),o?!1:void 0})})},toggle:function(n){var r,o=t(n.target),s=i(n.target.href);n.preventDefault(),r=o.hasClass(this.options.activeClass)?e(s,!0):e(s),a.search=r}},n.DEFAULTS={toggle:!1,activeClass:"active"},n.plugin=function(e){return this.each(function(){var i=t(this);i.data("qor.filter")||i.data("qor.filter",new n(this,e))})},t(function(){t(document).on("renew.qor.initiator",function(e){var i=t(".qor-label-group",e.target);i.length&&n.plugin.call(i,{toggle:".qor-label"})}).triggerHandler("renew.qor.initiator")}),n}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(e){var i=[];return t.isPlainObject(e)&&t.each(e,function(){i.push(arguments[1])}),i.join()}function i(t){var e=t&&t.split(",");return t=null,e&&4===e.length&&(t={x:Number(e[0]),y:Number(e[1]),width:Number(e[2]),height:Number(e[3])}),t}function a(t){return"string"==typeof t&&(t=t.charAt(0).toUpperCase()+t.substr(1)),t}function n(e){var i,n={};if(t.isPlainObject(e))for(i in e)e.hasOwnProperty(i)&&(n[a(i)]=e[i]);return n}var r="qor.redactor",o="click."+r,s="focus."+r,c="blur."+r,l="imageupload."+r,d="imagedelete."+r,h=/x|y|width|height/,p=function(e,i){this.$element=t(e),this.options=t.extend(!0,{},p.DEFAULTS,i),this.init()};return p.prototype={constructor:p,init:function(){var e=this,i=this.$element,a=this.options,n=i.closest(a.parent),r=t.proxy(this.click,this);n.length||(n=i.parent()),this.$button=t(p.BUTTON),this.$modal=n.find(a.modal),i.on(l,function(e,i){t(i).on(o,r)}).on(d,function(e,i){t(i).off(o,r)}).on(s,function(t){n.find("img").off(o,r).on(o,r)}).on(c,function(t){n.find("img").off(o,r)}),t("body").on(o,function(){e.$button.off(o).detach()})},click:function(e){var i=this,a=t(e.target);e.stopPropagation(),setTimeout(function(){i.$button.insertBefore(a).off(o).one(o,function(){i.crop(a)})},1)},crop:function(a){var r=this.options,o=a.attr("src"),s=o,c=t("<img>"),l=this.$modal;t.isFunction(r.replace)&&(s=r.replace(s)),c.attr("src",s),l.one("shown.bs.modal",function(){c.cropper({data:i(a.attr("data-crop-options")),background:!1,zoomable:!1,rotatable:!1,checkImageOrigin:!1,built:function(){l.find(r.save).one("click",function(){var i={};t.each(c.cropper("getData"),function(t,e){h.test(t)&&(i[t]=Math.round(e))}),t.ajax(r.remote,{type:"POST",contentType:"application/json",data:JSON.stringify({Url:o,CropOptions:{original:n(i)},Crop:!0}),dataType:"json",success:function(n){t.isPlainObject(n)&&n.url&&(a.attr("src",n.url).attr("data-crop-options",e(i)).removeAttr("style").removeAttr("rel"),t.isFunction(r.complete)&&r.complete(),l.modal("hide"))}})})}})}).one("hidden.bs.modal",function(){c.cropper("destroy").remove()}).modal("show").find(".modal-body").append(c)}},p.DEFAULTS={remote:!1,toggle:!1,parent:!1,modal:".qor-cropper-modal",save:".qor-cropper-save",replace:null,complete:null},p.BUTTON='<span class="redactor-image-cropper">Crop</span>',p.plugin=function(){return this.each(function(){var e,i=t(this);if(!i.data(r)){if(!t.fn.redactor)return;i.data(r,!0),e=i.data(),i.redactor({imageUpload:e.uploadUrl,fileUpload:e.uploadUrl,initCallback:function(){i.data(r,new p(i,{remote:e.cropUrl,toggle:".redactor-image-cropper",parent:".form-group",replace:function(t){return t.replace(/\.\w+$/,function(t){return".original"+t})},complete:t.proxy(function(){this.code.sync()},this)}))},focusCallback:function(){i.triggerHandler(s)},blurCallback:function(){i.triggerHandler(c)},imageUploadCallback:function(){i.triggerHandler(l,arguments[0])},imageDeleteCallback:function(){i.triggerHandler(d,arguments[1])}})}})},t(function(){t(document).on("renew.qor.initiator",function(e){var i=t(".qor-textarea",e.target);i.length&&p.plugin.call(i)}).triggerHandler("renew.qor.initiator")}),p}),function(t){"function"==typeof define&&define.amd?define("qor-replicator",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,a){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,a),this.index=0,this.init()};return e.prototype={constructor:e,init:function(){var t,e=this.$element,i=this.options,a=e.find(i.itemClass);a.length&&(t=a.filter(i.newClass),t.length||(t=a.last()),this.$template=t,this.template=t.clone().removeClass("hide").prop("outerHTML"),this.parse(),this.bind())},parse:function(){var t=0;this.template=this.template.replace(/(\w+)\="(\S*\[\d+\]\S*)"/g,function(e,i,a){return a=a.replace(/^(\S*)\[(\d+)\]([^\[\]]*)$/,function(e,n,r,o){return e===a?("name"===i&&(t=r),n+"[{{index}}]"+o):void 0}),i+'="'+a+'"'}),this.index=parseFloat(t)},bind:function(){var e=this.$element,i=this.options;e.on("click",i.addClass,t.proxy(this.add,this)),e.on("click",i.delClass,t.proxy(this.del,this))},add:function(e){var i,a=this.$template;return a.hasClass("hide")?void a.removeClass("hide"):(i=t(e.target).closest(this.options.addClass),void(i.length&&i.before(this.template.replace(/\{\{index\}\}/g,++this.index))))},del:function(e){var i,a=this.options,n=t(e.target).closest(a.itemClass);n.is(a.newClass)?n.remove():(n.children(":visible").addClass("hidden").hide(),i=t(a.alertTemplate.replace("{{name}}",this.parseName(n))),i.find(a.undoClass).one("click",function(){i.remove(),n.children(".hidden").removeClass("hidden").show()}),n.append(i))},parseName:function(t){var e=t.find("input[name]").attr("name");return e?e.replace(/[^\[\]]+$/,""):void 0}},e.DEFAULTS={itemClass:"",newClass:"",addClass:"",delClass:"",alertTemplate:""},e.plugin=function(i){return this.each(function(){var a=t(this);a.data("qor.replicator")||a.data("qor.replicator",new e(this,i))})},t(function(){var i=".qor-collection-group",a={itemClass:".qor-collection",newClass:".qor-collection-new",addClass:".qor-collection-add",delClass:".qor-collection-del",undoClass:".qor-collection-undo",alertTemplate:'<div class="alert alert-danger"><input type="hidden" name="{{name}}._destroy" value="1"><a href="javascript:void(0);" class="alert-link qor-collection-undo">Undo Delete</a></div>'};t(document).on("click.qor.replicator.initiator",i,function(){e.plugin.call(t(this),a)}).on("renew.qor.initiator",function(n){var r=t(i,n.target);r.length&&e.plugin.call(r,a)}).triggerHandler("renew.qor.initiator")}),e}),function(t){"function"==typeof define&&define.amd?define("qor-selector",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(){var e=t(this);e.prop("multiple")||e.find("option[selected]").length||e.prepend('<option value="" selected></option>'),e.chosen()}t(function(){t.fn.chosen&&t(document).on("renew.qor.initiator",function(i){var a=t('select[data-toggle="qor.selector"]',i.target);a.length&&e.call(a)}).triggerHandler("renew.qor.initiator")})}),function(t){"function"==typeof define&&define.amd?define("qor-widgets",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e={};return e.init=function(){this.confirm(),this.checkAll(),this.tooltip()},e.confirm=function(){t(document).on("click.qor.confirmer","[data-confirm]",function(e){var i,a=t(this),n=a.data();n.confirm&&(window.confirm(n.confirm)?/DELETE/i.test(n.method)&&(e.preventDefault(),i=n.url||a.attr("href"),n=t.extend({},n,{_method:"DELETE"}),t.post(i,n,function(){window.location.reload()})):e.preventDefault())})},e.checkAll=function(){t(".qor-check-all").each(function(){var e=t(this);e.attr("title","Check all").tooltip().on("click",function(){this.disabled||t(this).attr("data-original-title",this.checked?"Uncheck all":"Check all").closest("table").find(":checkbox:not(.qor-check-all)").prop("checked",this.checked)}),this.checked&&e.triggerHandler("click")})},e.tooltip=function(){t('[data-toggle="tooltip"]').tooltip()},t(function(){e.init()}),e});