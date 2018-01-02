webpackJsonp([2],{"./app/components/H1/index.js":function(e,t,n){"use strict";var a=n("./node_modules/styled-components/dist/styled-components.es.js"),r=a.b.h1.withConfig({displayName:"H1__H1"})(["font-size: 2em;margin-bottom: 0.25em;"]);t.a=r},"./app/containers/FeaturePage/index.js":function(e,t,n){"use strict";function a(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function r(e){var t=e.data,n=t.allCountries,a=t.refetch,r=e.createCountry;return _("div",{},void 0,_("button",{onClick:function(){n=[],a(),r({variables:{name:"karel"+new Date}}).then(function(e){a()})}},void 0,"Refresh"),_("ul",{},void 0,n&&n.map(function(e){return _("li",{},e.id,_(w.Link,{to:"/admin/contry/"+e.id},void 0,e.name,e.cities.map(function(e){return _("i",{},void 0," ",e.name," ")})))})))}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n("./node_modules/react/react.js"),d=n.n(l),u=n("./node_modules/react-helmet/lib/Helmet.js"),c=n("./node_modules/react-intl/lib/index.es.js"),f=n("./app/components/H1/index.js"),p=Object(c.e)({header:{id:"boilerplate.containers.FeaturePage.header",defaultMessage:"Features"},scaffoldingHeader:{id:"boilerplate.containers.FeaturePage.scaffolding.header",defaultMessage:"Quick scaffolding"},scaffoldingMessage:{id:"boilerplate.containers.FeaturePage.scaffolding.message",defaultMessage:"Automate the creation of components, containers, routes, selectors\n  and sagas - and their tests - right from the CLI!"},feedbackHeader:{id:"boilerplate.containers.FeaturePage.feedback.header",defaultMessage:"Instant feedback"},feedbackMessage:{id:"boilerplate.containers.FeaturePage.feedback.message",defaultMessage:"\n      Enjoy the best DX and code your app at the speed of thought! Your\n    saved changes to the CSS and JS are reflected instantaneously\n    without refreshing the page. Preserve application state even when\n    you update something in the underlying code!\n    "},stateManagementHeader:{id:"boilerplate.containers.FeaturePage.state_management.header",defaultMessage:"Predictable state management"},stateManagementMessages:{id:"boilerplate.containers.FeaturePage.state_management.message",defaultMessage:"\n      Unidirectional data flow allows for change logging and time travel\n    debugging.\n    "},javascriptHeader:{id:"boilerplate.containers.FeaturePage.javascript.header",defaultMessage:"Next generation JavaScript"},javascriptMessage:{id:"boilerplate.containers.FeaturePage.javascript.message",defaultMessage:"Use template strings, object destructuring, arrow functions, JSX\n    syntax and more, today."},cssHeader:{id:"boilerplate.containers.FeaturePage.css.header",defaultMessage:"Features"},cssMessage:{id:"boilerplate.containers.FeaturePage.css.message",defaultMessage:"Next generation CSS"},routingHeader:{id:"boilerplate.containers.FeaturePage.routing.header",defaultMessage:"Industry-standard routing"},routingMessage:{id:"boilerplate.containers.FeaturePage.routing.message",defaultMessage:"\n      Write composable CSS that's co-located with your components for\n    complete modularity. Unique generated class names keep the\n    specificity low while eliminating style clashes. Ship only the\n    styles that are on the page for the best performance.\n    "},networkHeader:{id:"boilerplate.containers.FeaturePage.network.header",defaultMessage:"Offline-first"},networkMessage:{id:"boilerplate.containers.FeaturePage.network.message",defaultMessage:"\n      The next frontier in performant web apps: availability without a\n      network connection from the instant your users load the app.\n    "},intlHeader:{id:"boilerplate.containers.FeaturePage.internationalization.header",defaultMessage:"Complete i18n Standard Internationalization & Pluralization"},intlMessage:{id:"boilerplate.containers.FeaturePage.internationalization.message",defaultMessage:"Scalable apps need to support multiple languages, easily add and support multiple languages with `react-intl`."}}),m=n("./node_modules/styled-components/dist/styled-components.es.js"),g=m.b.ul.withConfig({displayName:"List__List"})(["font-family: Georgia, Times, 'Times New Roman', serif;padding-left: 1.75em;"]),h=g,b=(m.b.li.withConfig({displayName:"ListItem__ListItem"})(["margin: 1em 0;"]),m.b.p.withConfig({displayName:"ListItemTitle__ListItemTitle"})(["font-weight: bold;"]),n("./node_modules/react-apollo/react-apollo.browser.umd.js")),y=n("./node_modules/graphql-tag/src/index.js"),v=n.n(y),w=n("./node_modules/react-router-dom/index.js"),_=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,a,r){var o=t&&t.defaultProps,i=arguments.length-3;if(n||0===i||(n={}),n&&o)for(var s in o)void 0===n[s]&&(n[s]=o[s]);else n||(n=o||{});if(1===i)n.children=r;else if(i>1){for(var l=Array(i),d=0;d<i;d++)l[d]=arguments[d+3];n.children=l}return{$$typeof:e,type:t,key:void 0===a?null:""+a,ref:null,props:n,_owner:null}}}(),j=a(["\n    query allCountries {\n      allCountries(orderBy:name_ASC) {\n        id\n        name\n        cities(orderBy:name_ASC) {\n          name\n        }\n      }\n    }\n  "],["\n    query allCountries {\n      allCountries(orderBy:name_ASC) {\n        id\n        name\n        cities(orderBy:name_ASC) {\n          name\n        }\n      }\n    }\n  "]),P=a(["\n  mutation createCountry($name:String!) {\n    createCountry(name:$name) {\n      id\n      name\n      cities {\n        name\n      }\n    }\n  }\n"],["\n  mutation createCountry($name:String!) {\n    createCountry(name:$name) {\n      id\n      name\n      cities {\n        name\n      }\n    }\n  }\n"]),C=Object(b.compose)(Object(b.graphql)(v()(j)),Object(b.graphql)(v()(P),{name:"createCountry"}))(r),M=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,a,r){var o=t&&t.defaultProps,i=arguments.length-3;if(n||0===i||(n={}),n&&o)for(var s in o)void 0===n[s]&&(n[s]=o[s]);else n||(n=o||{});if(1===i)n.children=r;else if(i>1){for(var l=Array(i),d=0;d<i;d++)l[d]=arguments[d+3];n.children=l}return{$$typeof:e,type:t,key:void 0===a?null:""+a,ref:null,props:n,_owner:null}}}(),S=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),F=M(u.Helmet,{},void 0,M("title",{},void 0,"Feature Page"),M("meta",{name:"description",content:"Feature page of React.js Boilerplate application"})),k=M(h,{},void 0,M(C,{})),O=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),S(t,[{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){return M("div",{},void 0,F,M(f.a,{},void 0,"ahoj",d.a.createElement(c.a,p.header)),k)}}]),t}(d.a.Component);t.default=O}});