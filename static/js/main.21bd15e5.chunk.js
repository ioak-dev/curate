(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{156:function(e,t,a){e.exports=a.p+"static/media/ioak_white.a3c6036a.svg"},157:function(e,t,a){e.exports=a.p+"static/media/curate_white.ef310ed4.svg"},158:function(e,t,a){e.exports=a.p+"static/media/curate_black.af4a349c.svg"},171:function(e,t,a){e.exports=a(318)},176:function(e,t,a){},181:function(e,t,a){},182:function(e,t,a){},183:function(e,t,a){},185:function(e,t,a){},193:function(e,t,a){},215:function(e,t){},217:function(e,t){},252:function(e,t){},253:function(e,t){},318:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(11),r=a.n(o),s=(a(176),a(14)),l=a(15),c=a(17),u=a(16),m=a(18),h=a(41),p=a(35),d=a(47),f=a(155),g=a(37),E={isAuth:!1,token:"",secret:"",firstname:"",lastname:""},v={notification:null,spinner:!1},b=Object(d.c)({authorization:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_AUTH":return console.log("GET_AUTH reducer"),Object(g.a)({},e);case"ADD_AUTH":return console.log("ADD_AUTH reducer"),Object(g.a)({},e,t.payload);case"REMOVE_AUTH":return console.log("REMOVE_AUTH reducer"),Object(g.a)({},e,{isAuth:!1,token:"",secret:"",firstname:"",lastname:""});default:return e}},notification:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_NOTIFICATION":return console.log("GET_NOTIFICATION reducer"),Object(g.a)({},e);case"ADD_NOTIFICATION":return console.log("ADD_NOTIFICATION reducer"),Object(g.a)({},e,t.payload);case"REMOVE_NOTIFICATION":return console.log("REMOVE_NOTIFICATION reducer"),Object(g.a)({},e,{notification:null});case"GET_SPINNER":return console.log("GET_SPINNER reducer"),Object(g.a)({},e);case"START_SPINNER":return console.log("START_SPINNER reducer"),Object(g.a)({},e,{spinner:!0});case"STOP_SPINNER":return console.log("STOP_SPINNER reducer"),Object(g.a)({},e,{spinner:!1});default:return e}}}),N=[f.a],O=Object(d.e)(b,{},Object(d.d)(d.a.apply(void 0,N))),k=(a(181),a(36)),A=function(){return function(e){e({type:"GET_AUTH"})}},j=function(e){return function(t){t({type:"ADD_AUTH",payload:e})}},y=function(){return function(e){e({type:"REMOVE_AUTH"})}},C=function(e,t,a){return function(n){n({type:"ADD_NOTIFICATION",payload:{notification:{type:e,message:t,timeout:a}}})}},I=function(){return function(e){e({type:"REMOVE_NOTIFICATION"})}},T=a(46),w=(a(182),function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.props.getNotifications(),this.props.getSpinner(),this.props.notification&&this.props.stopSpinner(),this.props.notification&&this.props.notification.timeout&&setTimeout(function(){e.props.removeNotification()},this.props.notification.timeout)}},{key:"componentWillReceiveProps",value:function(e){var t=this;e.notification&&this.props.stopSpinner(),e.notification&&e.notification.timeout&&setTimeout(function(){t.props.removeNotification()},e.notification.timeout)}},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,this.props.notification&&i.a.createElement("div",{className:"notification "+this.props.notification.type},i.a.createElement("div",{className:"message"},this.props.notification.message)),this.props.spinner&&i.a.createElement("div",{className:"lds-roller"},i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null)))}}]),t}(n.Component)),_=Object(p.b)(function(e){return{notification:e.notification.notification,spinner:e.notification.spinner}},{getSpinner:function(){return function(e){e({type:"GET_SPINNER"})}},stopSpinner:function(){return function(e){e({type:"STOP_SPINNER"})}},getNotifications:function(){return function(e){e({type:"GET_NOTIFICATION"})}},removeNotification:I})(w),S=(a(183),a(27)),P=a(156),R=a.n(P),U=a(157),z=a.n(U),D=a(158),F=a.n(D),M=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).logout=function(){a.props.removeAuth(),a.props.cookies.remove("isAuth"),a.props.cookies.remove("token"),a.props.cookies.remove("secret"),a.props.cookies.remove("firstname"),a.props.cookies.remove("lastname"),a.props.addNotification("success","You have been logged out",3e3)},a.state={visible:!1,mobilemenu:"hide"},a.toggleMenu=a.toggleMenu.bind(Object(k.a)(a)),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"toggleMenu",value:function(e){this.state.visible,this.setState({visible:!this.state.visible}),e.stopPropagation()}},{key:"render",value:function(){return i.a.createElement("div",{className:"nav"},i.a.createElement("div",{className:this.props.transparent?"navbar transparent":"navbar"},i.a.createElement("div",{className:"logo"},i.a.createElement("img",{src:z.a,alt:"IOAK logo"})),i.a.createElement("div",{className:"leftnav"},this.props.authorization.isAuth&&i.a.createElement(i.a.Fragment,null,i.a.createElement(S.a,{to:"/bookmarks",className:"navitem",activeClassName:"active"},"Bookmarks"),i.a.createElement(S.a,{to:"/notes",className:"navitem",activeClassName:"active"},"Notes"),i.a.createElement(S.a,{to:"/settings",className:"navitem",activeClassName:"active"},"Settings"),i.a.createElement(S.a,{to:"/help",className:"navitem",activeClassName:"active"},"Help"))),i.a.createElement("div",{className:"rightlogo"},i.a.createElement("div",{className:"logo"},i.a.createElement("img",{src:R.a,alt:"IOAK logo"}))),i.a.createElement("div",{className:"rightnav"},i.a.createElement("div",{className:"auth"},this.props.authorization.isAuth&&i.a.createElement("div",{className:"label"},this.props.authorization.firstname),!this.props.authorization.isAuth&&i.a.createElement("div",{className:"label"},"Log In"),!this.props.authorization.isAuth&&i.a.createElement(S.a,{to:"/login",className:"navitem",activeClassName:"active"},i.a.createElement("i",{className:"material-icons"},"fingerprint")),this.props.authorization.isAuth&&i.a.createElement("button",{className:"icon primary",onClick:this.logout},i.a.createElement("i",{className:"material-icons"},"power_settings_new"))),i.a.createElement("div",{className:"mobilemenu",onMouseUp:this.toggleMenu},i.a.createElement("i",{className:"material-icons"},"menu")))),i.a.createElement("div",{className:"mobilenav"},i.a.createElement("div",{className:this.state.visible?"slider show":"slider hide",onClick:this.toggleMenu},i.a.createElement("div",{className:this.state.visible?"":"hidetext",onClick:this.toggleMenu},i.a.createElement("div",{className:"header"},i.a.createElement("div",{className:"logo"},i.a.createElement("img",{src:F.a,alt:"IOAK logo"})),i.a.createElement("div",{className:"authheader"},this.props.authorization.isAuth&&i.a.createElement("div",{className:"label"},"Log Out"),!this.props.authorization.isAuth&&i.a.createElement("div",{className:"label"},"Log In"),!this.props.authorization.isAuth&&i.a.createElement(S.a,{to:"/login",className:"navitem",activeClassName:"active"},i.a.createElement("i",{className:"material-icons"},"fingerprint")),this.props.authorization.isAuth&&i.a.createElement("button",{className:"icon primary",onClick:this.logout},i.a.createElement("i",{className:"material-icons"},"power_settings_new")))),i.a.createElement("hr",null),this.props.authorization.isAuth&&i.a.createElement(i.a.Fragment,null,i.a.createElement(S.a,{to:"/bookmarks",className:"navitem",activeClassName:"active"},i.a.createElement("p",null,i.a.createElement("i",{className:"material-icons"},"bookmarks"),"Bookmarks")),i.a.createElement("br",null),i.a.createElement(S.a,{to:"/notes",className:"navitem",activeClassName:"active"},i.a.createElement("p",null,i.a.createElement("i",{className:"material-icons"},"note"),"Notes")),i.a.createElement("br",null),i.a.createElement(S.a,{to:"/settings",className:"navitem",activeClassName:"active"},i.a.createElement("p",null,i.a.createElement("i",{className:"material-icons"},"note"),"Settings")),i.a.createElement("br",null),i.a.createElement(S.a,{to:"/help",className:"navitem",activeClassName:"active"},i.a.createElement("p",null,i.a.createElement("i",{className:"material-icons"},"note"),"Help")))),i.a.createElement("div",{className:this.state.visible?"mobilefooter":"hidetext"},this.props.authorization.isAuth&&i.a.createElement("div",null,i.a.createElement("i",{className:"material-icons"},"account_circle"),this.props.authorization.firstname)))),i.a.createElement(_,null))}}]),t}(n.Component),G=Object(p.b)(function(e){return{authorization:e.authorization}},{getAuth:A,addAuth:j,removeAuth:y,addNotification:C})(Object(T.b)(M)),L=(a(185),function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(G,null),i.a.createElement("div",{className:"home"},i.a.createElement("div",{className:"container"})))}}]),t}(i.a.Component)),H=a(57),W=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("h1",null,this.props.url),i.a.createElement("p",null,this.props.tags))}}]),t}(n.Component),B=a(358),x=a(355),V=a(353),J=a(354),K=a(352),Y=a(356),$=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={items:[],showAddDialog:!1},a.toggleAddDialog=a.toggleAddDialog.bind(Object(k.a)(a)),a.addBookmark=a.addBookmark.bind(Object(k.a)(a)),a.handleChange=a.handleChange.bind(Object(k.a)(a)),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){var e=this;fetch("https://jsonplaceholder.typicode.com/posts").then(function(e){return e.json()}).then(function(t){return e.setState({items:t})})}},{key:"toggleAddDialog",value:function(){this.setState({showAddDialog:!this.state.showAddDialog})}},{key:"addBookmark",value:function(){console.log(this.state)}},{key:"handleChange",value:function(e){this.setState(Object(H.a)({},e.currentTarget.name,e.currentTarget.value))}},{key:"render",value:function(){var e=this,t=this.state.items.map(function(e){return i.a.createElement("div",{key:e.id},i.a.createElement(W,{url:e.title,tags:e.body}),i.a.createElement("br",null))});return i.a.createElement(i.a.Fragment,null,i.a.createElement(G,null),i.a.createElement("div",{className:"boxed"},i.a.createElement("button",{onClick:this.toggleAddDialog,className:"primary block"},i.a.createElement("i",{className:"material-icons"},"add"),"Add New Bookmark"),i.a.createElement(B.a,{open:this.state.showAddDialog,onClose:this.toggleAddDialog,"aria-labelledby":"form-dialog-title"},i.a.createElement(K.a,{id:"form-dialog-title"},"New Bookmark"),i.a.createElement(V.a,null,i.a.createElement(J.a,null,"Provide details to create new bookmark. Use tags for better categorization"),i.a.createElement(Y.a,{id:"outlined-uncontrolled",label:"Title",margin:"normal",fullWidth:!0,variant:"outlined",name:"title",onChange:function(t){return e.handleChange(t)}}),i.a.createElement(Y.a,{id:"outlined-uncontrolled",label:"URL",margin:"normal",name:"url",fullWidth:!0,variant:"outlined",onChange:function(t){return e.handleChange(t)}}),i.a.createElement(Y.a,{id:"outlined-uncontrolled",label:"Description",margin:"normal",fullWidth:!0,variant:"outlined",name:"description",multiline:!0,rows:"5",onChange:function(t){return e.handleChange(t)}}),i.a.createElement(Y.a,{id:"outlined-uncontrolled",label:"Tags",margin:"normal",fullWidth:!0,name:"tags",variant:"outlined",onChange:function(t){return e.handleChange(t)}})),i.a.createElement(x.a,null,i.a.createElement("button",{onClick:this.toggleAddDialog,className:"primary"},"Cancel"),i.a.createElement("button",{onClick:this.addBookmark,className:"primary block"},"Add"))),t))}}]),t}(n.Component),q=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(G,null),i.a.createElement("div",null,i.a.createElement($,null)))}}]),t}(i.a.Component),Q=a(162);a(193);var X=function(e){var t=e.id,a=e.label,n=e.value,o=e.handleChange,r=e.error,s=e.rows,l=e.multiline;return i.a.createElement(Y.a,{id:t,label:a,name:t,value:n,onChange:function(e){return o(e)},margin:"normal",variant:"standard",fullWidth:!0,error:r,multiline:l,rows:s})},Z=a(67),ee=a.n(Z),te=a(106),ae=a.n(te),ne=a(107),ie=a.n(ne),oe={API_URL_PRESIGNUP:"/auth/keys",API_URL_SIGNUP:"/auth/signup",API_URL_PRESIGNIN:"/auth/keys/",API_URL_SIGNIN:"/auth/signin"},re="https://curate-service.herokuapp.com";function se(e){return ee.a.get(re+oe.API_URL_PRESIGNIN+e.username).then(function(t){if(200===t.status){var a=(n=e.password,i=JSON.stringify(t.data),ae.a.decrypt(n,i));return ee.a.post(re+oe.API_URL_SIGNIN,{name:e.username,solution:a}).then(function(e){return Promise.resolve(e)})}var n,i}).catch(function(e){return"ccm: tag doesn't match"===e.message?Promise.resolve({status:401}):Promise.resolve(e.response)})}function le(e,t,a){var n={cipher:"aes",iter:"12000",ks:256,salt:ie.a.enc.Base64.stringify(ie.a.enc.Utf8.parse(a))};return ae.a.encrypt(e,t,n)}var ce=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).signin=function(){var e=Object(k.a)(a);a.props.removeNotification(),a.props.startSpinner(),a.state.username&&a.state.password?se({username:a.state.username,password:a.state.password}).then(function(t){200===t.status?(e.props.addNotification("success","Signed In successfully",3e3),e.success(t.data)):404===t.status?e.props.addNotification("error","User name does not exist",3e3):401===t.status?e.props.addNotification("error","Incorrect passphrase",3e3):e.props.addNotification("error","Unknown response from server. Please try again or at a later time",3e3)}).catch(function(t){e.props.addNotification("error","Unknown error. Please try again or at a later time",3e3)}):a.props.addNotification("error","Username/password cannot be empty",3e3)},a.signup=function(){var e,t=Object(k.a)(a);a.props.removeNotification(),a.props.startSpinner(),(e={username:a.state.username,firstname:a.state.firstname,lastname:a.state.lastname,password:a.state.password,email:a.state.email},ee.a.get(re+oe.API_URL_PRESIGNUP).then(function(t){if(200===t.status)return ee.a.post(re+oe.API_URL_SIGNUP,{username:e.username,firstname:e.firstname,lastname:e.lastname,email:e.email,problem:le(e.password,t.data.solution,t.data.salt),solution:t.data.solution}).then(function(e){return Promise.resolve(e.status)})})).then(function(e){200===e&&(t.props.addNotification("success","Your account has been created. You can login now",3e3),t.toggle())})},a.handleChange=function(e){a.setState(Object(H.a)({},e.currentTarget.name,e.currentTarget.value))},a.success=function(e){a.props.addAuth({isAuth:!0,token:e.token,secret:e.secret,firstname:e.firstname,lastname:e.lastname}),a.props.cookies.set("isAuth",!0),a.props.cookies.set("token",e.token),a.props.cookies.set("secret",e.secret),a.props.cookies.set("firstname",e.firstname),a.props.cookies.set("lastname",e.lastname),a.props.history.push("/bookmarks")},a.toggle=function(){a.setState({newuser:!a.state.newuser})},a.state={newuser:!1},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return i.a.createElement(i.a.Fragment,null,i.a.createElement(G,null),i.a.createElement("div",{className:"login"},!this.state.newuser&&i.a.createElement("div",{className:"container"},i.a.createElement("h1",null,"Log In"),i.a.createElement("div",{className:"form"},i.a.createElement(X,{label:"Username",id:"username",handleChange:function(t){return e.handleChange(t)}}),i.a.createElement(X,{label:"Password",id:"password",handleChange:function(t){return e.handleChange(t)}})),i.a.createElement("br",null),i.a.createElement("button",{className:"primary block",onClick:this.signin},"Sign In"),i.a.createElement("br",null),i.a.createElement("br",null),"Don't have an account? \xa0 ",i.a.createElement("button",{className:"secondary",onClick:this.toggle},"Sign Up")),this.state.newuser&&i.a.createElement("div",{className:"container"},i.a.createElement("h1",null,"Sign Up"),i.a.createElement("div",{className:"form"},i.a.createElement(X,{label:"First name",id:"firstname",handleChange:function(t){return e.handleChange(t)}}),i.a.createElement(X,{label:"Last name",id:"lastname",handleChange:function(t){return e.handleChange(t)}}),i.a.createElement(X,{label:"Username",id:"username",handleChange:function(t){return e.handleChange(t)}}),i.a.createElement(X,{label:"Password",id:"password",handleChange:function(t){return e.handleChange(t)}}),i.a.createElement(X,{label:"Email",id:"email",handleChange:function(t){return e.handleChange(t)}})),i.a.createElement("br",null),i.a.createElement("button",{className:"primary block",onClick:this.signup},"Create account"),i.a.createElement("br",null),i.a.createElement("br",null),"Already have a account? \xa0 ",i.a.createElement("button",{className:"secondary",onClick:this.toggle},"Sign In"))))}}]),t}(n.Component),ue=Object(p.b)(function(e){return{authorization:e.authorization}},{getAuth:A,addAuth:j,removeAuth:y,addNotification:C,removeNotification:I,startSpinner:function(){return function(e){e({type:"START_SPINNER"})}}})(Object(T.b)(ce)),me=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){this.props.getAuth()}},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,this.props.authorization.isAuth&&i.a.createElement(h.Route,{path:this.props.path,component:this.props.component}),!this.props.authorization.isAuth&&i.a.createElement(h.Redirect,{to:{pathname:"/home"}}))}}]),t}(n.Component),he=Object(p.b)(function(e){return{authorization:e.authorization}},{getAuth:A})(me),pe=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){!this.props.authorization.isAuth&&this.props.cookies.get("isAuth")&&this.props.addAuth({isAuth:!0,token:this.props.cookies.get("token"),secret:this.props.cookies.get("secret"),firstname:this.props.cookies.get("firstname"),lastname:this.props.cookies.get("lastname")}),this.props.getAuth()}},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null)}}]),t}(n.Component),de=Object(p.b)(function(e){return{authorization:e.authorization}},{getAuth:A,addAuth:j,removeAuth:y})(Object(T.b)(pe)),fe=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement(p.a,{store:O},i.a.createElement("div",{className:"App"},i.a.createElement(Q.HashRouter,null,i.a.createElement(de,null),i.a.createElement("div",{className:"body"},i.a.createElement("div",{className:"content"},i.a.createElement(h.Route,{exact:!0,path:"/",component:L}),i.a.createElement(h.Route,{path:"/home",component:L}),i.a.createElement(h.Route,{path:"/login",component:ue}),i.a.createElement(he,{path:"/bookmarks",component:$}),i.a.createElement(he,{path:"/notes",component:q}))))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(T.a,null,i.a.createElement(fe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[171,1,2]]]);
//# sourceMappingURL=main.21bd15e5.chunk.js.map