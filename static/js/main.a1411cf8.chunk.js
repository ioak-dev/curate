(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{61:function(e,t,a){e.exports=a.p+"static/media/placeholder-white.a3c6036a.svg"},62:function(e,t,a){e.exports=a.p+"static/media/placeholder-white2.ef310ed4.svg"},63:function(e,t,a){e.exports=a.p+"static/media/placeholder-black2.af4a349c.svg"},76:function(e,t,a){e.exports=a(98)},81:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){},89:function(e,t,a){},97:function(e,t,a){},98:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(8),o=a.n(i),r=(a(81),a(11)),c=a(12),s=a(14),u=a(13),m=a(15),h=a(27),d=a(24),p=a(33),g=a(60),b=a(49),E={isAuth:!1,firstname:"",lastname:""},v=Object(p.c)({authorization:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_AUTH":return console.log("GET_AUTH reducer"),Object(b.a)({},e);case"ADD_AUTH":return console.log("ADD_AUTH reducer"),Object(b.a)({},e,t.payload);case"REMOVE_AUTH":return console.log("REMOVE_AUTH reducer"),Object(b.a)({},e,{isAuth:!1,firstname:"",lastname:""});default:return e}}}),f=[g.a],A=Object(p.e)(v,{},Object(p.d)(p.a.apply(void 0,f))),O=(a(86),a(32)),j=function(){return function(e){e({type:"GET_AUTH"})}},k=function(e){return function(t){t({type:"ADD_AUTH",payload:e})}},N=function(){return function(e){e({type:"REMOVE_AUTH"})}},C=a(31),y=(a(87),a(25)),w=a(61),z=a.n(w),D=a(62),_=a.n(D),U=a(63),T=a.n(U),W=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).logout=function(){a.props.removeAuth(),a.props.cookies.remove("isAuth")},a.state={visible:!1,mobilemenu:"hide"},a.toggleMenu=a.toggleMenu.bind(Object(O.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"toggleMenu",value:function(e){this.state.visible,this.setState({visible:!this.state.visible}),e.stopPropagation()}},{key:"render",value:function(){return l.a.createElement("div",{className:"nav"},l.a.createElement("div",{className:this.props.transparent?"navbar transparent":"navbar"},l.a.createElement("div",{className:"logo"},l.a.createElement("img",{src:_.a,alt:"IOAK logo"})),l.a.createElement("div",{className:"leftnav"},this.props.authorization.isAuth&&l.a.createElement(l.a.Fragment,null,l.a.createElement(y.a,{to:"/bookmarks",className:"navitem",activeClassName:"active"},"Bookmarks"),l.a.createElement(y.a,{to:"/notes",className:"navitem",activeClassName:"active"},"Notes"))),l.a.createElement("div",{className:"rightlogo"},l.a.createElement("div",{className:"logo"},l.a.createElement("img",{src:z.a,alt:"IOAK logo"}))),l.a.createElement("div",{className:"rightnav"},l.a.createElement("div",{className:"auth"},this.props.authorization.isAuth&&l.a.createElement("div",{className:"label"},this.props.authorization.firstname),!this.props.authorization.isAuth&&l.a.createElement("div",{className:"label"},"Log In"),!this.props.authorization.isAuth&&l.a.createElement(y.a,{to:"/login",className:"navitem",activeClassName:"active"},l.a.createElement("i",{className:"material-icons"},"fingerprint")),this.props.authorization.isAuth&&l.a.createElement("button",{className:"icon primary",onClick:this.logout},l.a.createElement("i",{className:"material-icons"},"power_settings_new"))),l.a.createElement("div",{className:"mobilemenu",onMouseUp:this.toggleMenu},l.a.createElement("i",{className:"material-icons"},"menu")))),l.a.createElement("div",{className:"mobilenav"},l.a.createElement("div",{className:this.state.visible?"slider show":"slider hide",onClick:this.toggleMenu},l.a.createElement("div",{className:this.state.visible?"":"hidetext",onClick:this.toggleMenu},l.a.createElement("div",{className:"header"},l.a.createElement("div",{className:"logo"},l.a.createElement("img",{src:T.a,alt:"IOAK logo"})),l.a.createElement("div",{className:"authheader"},this.props.authorization.isAuth&&l.a.createElement("div",{className:"label"},"Log Out"),!this.props.authorization.isAuth&&l.a.createElement("div",{className:"label"},"Log In"),!this.props.authorization.isAuth&&l.a.createElement(y.a,{to:"/login",className:"navitem",activeClassName:"active"},l.a.createElement("i",{className:"material-icons"},"fingerprint")),this.props.authorization.isAuth&&l.a.createElement("button",{className:"icon primary",onClick:this.logout},l.a.createElement("i",{className:"material-icons"},"power_settings_new")))),l.a.createElement("hr",null),this.props.authorization.isAuth&&l.a.createElement(l.a.Fragment,null,l.a.createElement(y.a,{to:"/bookmarks",className:"navitem",activeClassName:"active"},l.a.createElement("p",null,l.a.createElement("i",{className:"material-icons"},"bookmarks"),"Bookmarks")),l.a.createElement("br",null),l.a.createElement(y.a,{to:"/notes",className:"navitem",activeClassName:"active"},l.a.createElement("p",null,l.a.createElement("i",{className:"material-icons"},"note"),"Notes")))),l.a.createElement("div",{className:this.state.visible?"mobilefooter":"hidetext"},this.props.authorization.isAuth&&l.a.createElement("div",null,l.a.createElement("i",{className:"material-icons"},"account_circle"),this.props.authorization.firstname)))))}}]),t}(n.Component),M=Object(d.b)(function(e){return{authorization:e.authorization}},{getAuth:j,addAuth:k,removeAuth:N})(Object(C.b)(W)),R=(a(89),function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_FILENAME:"Production",REACT_APP_SERVICE_URL:"http://localhost:8080"}))}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(M,null),l.a.createElement("div",{className:"home"},l.a.createElement("div",{className:"container"})))}}]),t}(l.a.Component)),I=a(42),S=function(e){function t(e){return Object(r.a)(this,t),Object(s.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h1",null,this.props.url),l.a.createElement("p",null,this.props.tags))}}]),t}(n.Component),B=a(138),P=a(135),F=a(133),H=a(134),L=a(132),x=a(136),K=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={items:[],showAddDialog:!1},a.toggleAddDialog=a.toggleAddDialog.bind(Object(O.a)(a)),a.addBookmark=a.addBookmark.bind(Object(O.a)(a)),a.handleChange=a.handleChange.bind(Object(O.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this;fetch("https://jsonplaceholder.typicode.com/posts").then(function(e){return e.json()}).then(function(t){return e.setState({items:t})})}},{key:"toggleAddDialog",value:function(){this.setState({showAddDialog:!this.state.showAddDialog})}},{key:"addBookmark",value:function(){console.log(this.state)}},{key:"handleChange",value:function(e){this.setState(Object(I.a)({},e.currentTarget.name,e.currentTarget.value))}},{key:"render",value:function(){var e=this,t=this.state.items.map(function(e){return l.a.createElement("div",{key:e.id},l.a.createElement(S,{url:e.title,tags:e.body}),l.a.createElement("br",null))});return l.a.createElement(l.a.Fragment,null,l.a.createElement(M,null),l.a.createElement("div",{className:"boxed"},l.a.createElement("button",{onClick:this.toggleAddDialog,className:"primary block"},l.a.createElement("i",{className:"material-icons"},"add"),"Add New Bookmark"),l.a.createElement(B.a,{open:this.state.showAddDialog,onClose:this.toggleAddDialog,"aria-labelledby":"form-dialog-title"},l.a.createElement(L.a,{id:"form-dialog-title"},"New Bookmark"),l.a.createElement(F.a,null,l.a.createElement(H.a,null,"Provide details to create new bookmark. Use tags for better categorization"),l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"Title",margin:"normal",fullWidth:!0,variant:"outlined",name:"title",onChange:function(t){return e.handleChange(t)}}),l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"URL",margin:"normal",name:"url",fullWidth:!0,variant:"outlined",onChange:function(t){return e.handleChange(t)}}),l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"Description",margin:"normal",fullWidth:!0,variant:"outlined",name:"description",multiline:!0,rows:"5",onChange:function(t){return e.handleChange(t)}}),l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"Tags",margin:"normal",fullWidth:!0,name:"tags",variant:"outlined",onChange:function(t){return e.handleChange(t)}})),l.a.createElement(P.a,null,l.a.createElement("button",{onClick:this.toggleAddDialog,className:"primary"},"Cancel"),l.a.createElement("button",{onClick:this.addBookmark,className:"primary block"},"Add"))),t))}}]),t}(n.Component),V=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(M,null),l.a.createElement("div",null,l.a.createElement(K,null)))}}]),t}(l.a.Component),G=a(67),J=(a(97),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).login=function(){a.success()},a.success=function(){a.props.addAuth({isAuth:!0,firstname:"Arun Kumar",lastname:"Selvaraj"}),a.props.cookies.set("isAuth",!0),a.props.history.push("/")},a.toggle=function(){a.setState({newuser:!a.state.newuser})},a.state={newuser:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement(M,null),l.a.createElement("div",{className:"login"},!this.state.newuser&&l.a.createElement("div",{className:"container"},l.a.createElement("h1",null,"Log In"),l.a.createElement("div",{className:"form"},l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"Username",margin:"normal",fullWidth:!0,variant:"standard",name:"title",onChange:function(t){return e.handleChange(t)}}),l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"Password",margin:"normal",fullWidth:!0,variant:"standard",name:"title",onChange:function(t){return e.handleChange(t)}})),l.a.createElement("br",null),l.a.createElement("button",{className:"primary block",onClick:this.login},"Sign In"),l.a.createElement("br",null),l.a.createElement("br",null),"Don't have an account? \xa0 ",l.a.createElement("button",{className:"secondary",onClick:this.toggle},"Sign Up")),this.state.newuser&&l.a.createElement("div",{className:"container"},l.a.createElement("h1",null,"Sign Up"),l.a.createElement("div",{className:"form"},l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"First name",margin:"normal",fullWidth:!0,variant:"standard",name:"title",onChange:function(t){return e.handleChange(t)}}),l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"Last name",margin:"normal",fullWidth:!0,variant:"standard",name:"title",onChange:function(t){return e.handleChange(t)}}),l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"Username",margin:"normal",fullWidth:!0,variant:"standard",name:"title",onChange:function(t){return e.handleChange(t)}}),l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"Password",margin:"normal",fullWidth:!0,variant:"standard",name:"title",onChange:function(t){return e.handleChange(t)}}),l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"Repeat Password",margin:"normal",fullWidth:!0,variant:"standard",name:"title",onChange:function(t){return e.handleChange(t)}}),l.a.createElement(x.a,{id:"outlined-uncontrolled",label:"Email",margin:"normal",fullWidth:!0,variant:"standard",name:"title",onChange:function(t){return e.handleChange(t)}})),l.a.createElement("br",null),l.a.createElement("button",{className:"primary block",onClick:this.login},"Create account"),l.a.createElement("br",null),l.a.createElement("br",null),"Already have a account? \xa0 ",l.a.createElement("button",{className:"secondary",onClick:this.toggle},"Sign In"))))}}]),t}(n.Component)),$=Object(d.b)(function(e){return{authorization:e.authorization}},{getAuth:j,addAuth:k,removeAuth:N})(Object(C.b)(J)),q=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){this.props.getAuth()}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,this.props.authorization.isAuth&&l.a.createElement(h.Route,{path:this.props.path,component:this.props.component}),!this.props.authorization.isAuth&&l.a.createElement(h.Redirect,{to:{pathname:"/home"}}))}}]),t}(n.Component),Q=Object(d.b)(function(e){return{authorization:e.authorization}},{getAuth:j})(q),X=function(e){function t(e){return Object(r.a)(this,t),Object(s.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){!this.props.authorization.isAuth&&this.props.cookies.get("isAuth")&&this.props.addAuth({isAuth:!0,firstname:"Arun Kumar",lastname:"Selvaraj"}),this.props.getAuth()}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null)}}]),t}(n.Component),Y=Object(d.b)(function(e){return{authorization:e.authorization}},{getAuth:j,addAuth:k,removeAuth:N})(Object(C.b)(X)),Z=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(d.a,{store:A},l.a.createElement("div",{className:"App"},l.a.createElement(G.HashRouter,null,l.a.createElement(Y,null),l.a.createElement("div",{className:"body"},l.a.createElement("div",{className:"content"},l.a.createElement(h.Route,{exact:!0,path:"/",component:R}),l.a.createElement(h.Route,{path:"/home",component:R}),l.a.createElement(h.Route,{path:"/login",component:$}),l.a.createElement(Q,{path:"/bookmarks",component:K}),l.a.createElement(Q,{path:"/notes",component:V}))))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(C.a,null,l.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[76,1,2]]]);
//# sourceMappingURL=main.a1411cf8.chunk.js.map