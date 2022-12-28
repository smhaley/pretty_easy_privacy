(this["webpackJsonppretty-easy-privacy"]=this["webpackJsonppretty-easy-privacy"]||[]).push([[7],{228:function(e,t,a){"use strict";var r=a(46),n=a(28),c=a(0),o=a.n(c),l=a(174),i=a(83),s=a.n(i),u=a(224),m=a(209),p=a(177),d=a(222),b=a(80),f=a(32),y=Object(l.a)((function(e){return{result:{padding:"10px"},button:{margin:"5px"},copy:{textAlign:"right"}}}));t.a=function(e){var t=y(),a=Object(f.a)(),l=Object(c.useState)({open:!1,vertical:"bottom",horizontal:"left"}),i=Object(n.a)(l,2),E=i[0],g=i[1],v=E.vertical,h=E.horizontal,j=E.open,O=e.id,x=e.val;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:t.copy},o.a.createElement(u.a,{title:"Copy"},o.a.createElement(m.a,{"aria-label":"Copy",onClick:function(){g(Object(r.a)(Object(r.a)({},E),{},{open:!0})),Object(b.a)(O)}},o.a.createElement(s.a,null)))),o.a.createElement(p.a,{className:t.result},o.a.createElement("pre",{className:a.pre,id:O},x)),o.a.createElement(d.a,{anchorOrigin:{vertical:v,horizontal:h},open:j,onClose:function(){g(Object(r.a)(Object(r.a)({},E),{},{open:!1}))},message:"Copied to clipboard",key:v+h}))}},229:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r={vertical:"bottom",horizontal:"left"}},230:function(e,t,a){"use strict";var r=a(0),n=a.n(r),c=a(174),o=a(244),l=a.n(o),i=a(279),s=a(209),u=a(219),m=a(268),p=a(282),d=a(280),b=Object(c.a)((function(e){return{hidden:{visibility:"hidden",width:"1px"},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12},helpText:{marginLeft:e.spacing(2)}}}));t.a=function(e){var t=b(),a=e.inId,r=e.fileMetaData&&n.a.createElement("div",null,n.a.createElement(i.a,null,"Selected: ".concat(e.fileMetaData.name)),n.a.createElement(s.a,{onClick:e.handleDelete},n.a.createElement(l.a,null)));return n.a.createElement(u.a,null,n.a.createElement(m.a,{onClick:function(){return document.getElementById(a).click()},variant:"outlined",color:"secondary",disabled:e.uploading},e.uploading&&n.a.createElement(p.a,{size:24,color:"secondary",className:t.buttonProgress}),e.label),n.a.createElement("input",{id:a,type:"file",className:t.hidden,onChange:e.readFile}),r,e.formByteInputError&&n.a.createElement("div",{className:t.helpText},n.a.createElement(d.a,{error:!0},e.errMessage?e.errMessage:"File Required")))}},234:function(e,t,a){"use strict";a.d(t,"a",(function(){return b}));var r=a(28),n=a(0),c=a.n(n),o=a(5),l=a(174),i=a(284),s=a(269),u=a(176),m=Object(o.a)({root:{borderBottom:"1px solid #e8e8e8"}})(i.a),p=Object(o.a)((function(e){return{root:{textTransform:"none",minWidth:72,fontWeight:e.typography.fontWeightRegular,marginRight:e.spacing(4),fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),"&:hover":{opacity:1},"&$selected":{fontWeight:e.typography.fontWeightMedium}},selected:{}}}))((function(e){return c.a.createElement(s.a,Object.assign({disableRipple:!0},e))})),d=Object(l.a)((function(e){return{root:{flexGrow:1},padding:{padding:e.spacing(2)},demo1:{backgroundColor:e.palette.background.paper},demo2:{backgroundColor:"#2e1534"}}}));function b(e){var t=d(),a=c.a.useState(0),n=Object(r.a)(a,2),o=n[0],l=n[1];return c.a.createElement("div",{className:t.root},c.a.createElement(m,{value:o,onChange:function(t,a){l(a),e.handleType(a)},"aria-label":"ant example"},c.a.createElement(p,{label:"Passphrase"}),c.a.createElement(p,{label:"Key Pair"})),c.a.createElement(u.a,{className:t.padding}))}},235:function(e,t,a){"use strict";var r=a(46),n=a(28),c=a(0),o=a.n(c),l=a(242),i=a.n(l),s=a(174),u=a(270),m=a(271),p=a(272),d=a(273),b=a(274),f=a(281),y=a(268),E=a(219),g=a(214),v=a(282),h=Object(s.a)((function(e){return{pwInput:{maxWidth:"225px"},pw:{color:"#777fa7",marginTop:"18px"},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}})),j=function(e){var t=Object(c.useState)(),a=Object(n.a)(t,2),r=a[0],l=a[1],i=e.open,s=e.confirmError?"Please Try Again":"Passphrase Confirmation";return o.a.createElement("div",null,o.a.createElement(u.a,{open:i,onClose:e.handleClose,"aria-labelledby":"form-dialog-title"},o.a.createElement(m.a,{id:"form-dialog-title"},"Passphrase Confirmation"),o.a.createElement(p.a,null,o.a.createElement(d.a,null,"Please re enter your passphrase below:"),o.a.createElement(b.a,{required:!0,autoFocus:!0,error:e.confirmError,onChange:function(e){l(e.target.value)},margin:"dense",id:"name",label:s,type:"password",fullWidth:!0})),o.a.createElement(f.a,null,o.a.createElement(y.a,{onClick:e.handleClose,color:"primary"},"Cancel"),o.a.createElement(y.a,{type:"submit",onClick:function(){return e.handleConfirm(r)},color:"primary"},e.buttonText))))};t.a=function(e){var t=h(),a=Object(c.useState)(""),l=Object(n.a)(a,2),s=l[0],u=l[1],m=Object(c.useState)({confirmError:!1,passPhraseMissingError:!1}),p=Object(n.a)(m,2),d=p[0],f=p[1],O=Object(c.useState)(!1),x=Object(n.a)(O,2),k=x[0],w=x[1],S=Object(c.useState)({score:null,resp:null}),C=Object(n.a)(S,2),T=C[0],P=C[1],N={0:"Very Bad \ud83d\udc4e",1:"Bad \ud83d\udc4e",2:"Weak \ud83d\ude10",3:"Good \ud83d\ude42",4:"Strong \ud83d\udd25\ud83d\udd25\ud83d\udd25"};return o.a.createElement(o.a.Fragment,null,o.a.createElement(E.a,null,o.a.createElement(g.a,{container:!0,spacing:1},o.a.createElement(g.a,{item:!0},o.a.createElement(b.a,{required:!0,disabled:e.loading,helperText:d.passPhraseMissingError&&"PassPhrase Required!",onChange:function(e){u(e.target.value);var t=i()(e.target.value);P({score:0===t.score?"1":t.score,resp:N[t.score]})},className:e.class,error:d.passPhraseMissingError,id:"pw-in",type:"password",label:"Passphrase",variant:"outlined"})),s.length>0&&o.a.createElement(g.a,{className:t.pw,item:!0},T.resp))),o.a.createElement(E.a,{pt:3},o.a.createElement(y.a,{type:"submit",variant:"contained",color:"primary",disabled:e.loading,onClick:function(t){t.preventDefault(),f({confirmError:!1,passPhraseMissingError:!1});var a=e.handleSubmit(t);s||f(Object(r.a)(Object(r.a)({},d),{},{passPhraseMissingError:!0})),s&&!a&&w(!0)}},e.mainButtonText,e.loading&&o.a.createElement(v.a,{size:24,color:"primary",className:t.buttonProgress}))),o.a.createElement(j,{open:k,buttonText:e.modalButtonText,handleClose:function(){return w(!1)},handleConfirm:function(t){t===s?(w(!1),e.handleConfirm(s)):f(Object(r.a)(Object(r.a)({},d),{},{confirmError:!0}))},confirmError:d.confirmError}))}},239:function(e,t,a){"use strict";var r=a(22),n=a.n(r),c=a(46),o=a(82),l=a(28),i=a(20),s=a(0),u=a.n(s),m=a(174),p=a(286),d=a(229),b=a(230),f=a(32),y=a(80),E=a(231),g=a(274),v=a(222),h=a(219),j=a(176),O=a(277),x=a(293),k=a(283),w=a(287),S=a(279),C=a(268),T=a(282),P=Object(m.a)((function(e){return{buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12},main:Object(i.a)({padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{padding:e.spacing(2)})}}));t.a=function(e){var t,a=P(),r=Object(f.a)(),i=e.privateKey,m=e.encrypt,N={err:!1,key:!1,message:!1},B=Object(s.useState)(y.m),I=Object(l.a)(B,2),R=I[0],F=I[1],D=Object(s.useState)(),K=Object(l.a)(D,2),M=K[0],A=K[1],W=Object(s.useState)("byte"),q=Object(l.a)(W,2),H=q[0],L=q[1],z=Object(s.useState)(N),U=Object(l.a)(z,2),J=U[0],V=U[1],G=Object(s.useState)(N),Y=Object(l.a)(G,2),_=Y[0],$=Y[1],Q=Object(s.useState)(),X=Object(l.a)(Q,2),Z=X[0],ee=X[1],te=Object(s.useState)(!1),ae=Object(l.a)(te,2),re=ae[0],ne=ae[1],ce=Object(s.useState)(""),oe=Object(l.a)(ce,2),le=oe[0],ie=oe[1],se=Object(s.useState)(!1),ue=Object(l.a)(se,2),me=ue[0],pe=ue[1],de=function(e,t){"clickaway"!==t&&F(y.m)};t="text"===H?u.a.createElement(g.a,{helperText:J.err&&J.message,className:a.textBox,fullWidth:!0,error:J.err,id:"outlined-multiline-static-rsa-key",label:"RSA Key Input",multiline:!0,rows:10,onChange:function(e){A(e.target.value)},variant:"outlined"}):u.a.createElement(b.a,{formByteInputError:_.err,errMessage:_.err.message,fileMetaData:Z,label:"Key Browse",buttonLabel:"key browse",handleDelete:function(){A(void 0),ee(void 0)},readFile:function(e){console.log("FIRE");var t=e.target.files[0];if(t){var a=new FileReader;pe(!0),a.readAsText(t),a.onloadend=function(){ee({name:t.name,type:t.type.replace("/","_")}),A(a.result),pe(!1)},a.onerror=function(){A(void 0),pe(!1)}}},uploading:me,inId:"keyIn"});var be=function(){var t=Object(o.a)(n.a.mark((function t(a){var r,o,l,s;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),F(y.m),V(N),$(N),ne(!1),r=!1,""===le&&(ne(!0),r=!0),M&&""!==M){t.next=9;break}"text"===H?V(Object(c.a)(Object(c.a)({},J),{},{err:!0,message:"Key Text Required"})):$(Object(c.a)(Object(c.a)({},_),{},{err:!0,message:"Key File Required"})),r=!0,t.next=24;break;case 9:if(!i){t.next=18;break}return t.next=12,ye(M,le);case 12:l=t.sent,o=l.key,r=l.error,t.next=24;break;case 18:return t.next=20,fe(M);case 20:s=t.sent,o=s.key,r=s.error;case 24:e.handleKeyEncrypt(o,r);case 25:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),fe=function(){var e=Object(o.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.key.readArmored(t);case 2:if(a=e.sent.keys[0]){e.next=8;break}return F(y.i),e.abrupt("return",{key:void 0,error:!0});case 8:return e.abrupt("return",{key:a,error:!1});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ye=function(){var e=Object(o.a)(n.a.mark((function e(t,a){var r,c,o,i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.key.readArmored(t);case 3:return c=e.sent,o=Object(l.a)(c.keys,1),i=o[0],e.next=8,i.decrypt(a);case 8:return r=[i],e.abrupt("return",{key:r,error:!1});case 12:return e.prev=12,e.t0=e.catch(0),"Nothing to decrypt in a public key"===e.t0.message&&F(y.l),"Incorrect key passphrase"===e.t0.message&&F(y.k),"privateKey is undefined"===e.t0.message&&F(y.i),"Cannot read property 'decrypt' of undefined"===e.t0.message&&F(y.i),e.abrupt("return",{key:void 0,error:!0});case 19:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t,a){return e.apply(this,arguments)}}();return u.a.createElement("div",{className:a.main},R.show&&u.a.createElement(v.a,{anchorOrigin:d.a,open:R.show,autoHideDuration:1e4,onClose:de},u.a.createElement(p.a,{onClose:de,severity:R.severity},R.message)),u.a.createElement(h.a,null,u.a.createElement(h.a,null,u.a.createElement(j.a,{variant:"h2",className:r.subHeadingBold,gutterBottom:!0},u.a.createElement("b",null,"Key Input")),u.a.createElement(O.a,{component:"fieldset"},u.a.createElement(x.a,{row:!0,"aria-label":"position",name:"position",value:H,defaultValue:"top",onChange:function(e){L(e.target.value)}},u.a.createElement(k.a,{value:"byte",control:u.a.createElement(w.a,{color:"secondary"}),label:"Import from file",labelPlacement:"end"}),u.a.createElement(k.a,{value:"text",control:u.a.createElement(w.a,{color:"primary"}),label:"Paste in text",labelPlacement:"end"})))),u.a.createElement(h.a,null,u.a.createElement(S.a,{component:"legend"}),u.a.createElement(h.a,{mt:2},t)),i&&u.a.createElement(h.a,{pt:3},u.a.createElement(g.a,{required:!0,helperText:re&&"Passphrase Required!",onChange:function(e){return ie(e.target.value)},error:re,id:"pw-in private key",type:"password",label:"Private Key Passphrase",variant:"outlined"})),u.a.createElement(h.a,{pt:3},u.a.createElement(C.a,{variant:"contained",color:"primary",onClick:be,disabled:e.loading},m?"Encrypt":"Decrypt",e.loading&&u.a.createElement(T.a,{size:24,color:"primary",className:a.buttonProgress})))))}},288:function(e,t,a){"use strict";a.r(t);var r=a(22),n=a.n(r),c=a(82),o=a(28),l=a(0),i=a.n(l),s=a(20),u=a(174),m=a(219),p=a(176),d=a(268),b=a(228),f=a(32),y=Object(u.a)((function(e){return{main:Object(s.a)({padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{padding:e.spacing(2)}),result:{maxHeight:"100px",maxWidth:"350px",overflowY:"scroll"},paper:{height:"100px",width:"350px"},button:{margin:"5px"}}})),E=function(e){var t=y(),a=Object(f.a)(),r=Object(l.useState)(!1),n=Object(o.a)(r,2),c=n[0],s=n[1],u=e.armorTxt,E=u.armorTxt.length>1e4;return i.a.createElement("div",{className:t.main},i.a.createElement(m.a,{pt:2},i.a.createElement(p.a,{className:a.resultH3,variant:"h3",gutterBottom:!0},"Encrypted Data:"),i.a.createElement(m.a,{m:1},"Your encrypted data is below",i.a.createElement("br",null),"It is recommended to download the file.",i.a.createElement("br",null)),i.a.createElement(m.a,{mb:2,mt:5,pr:4},i.a.createElement(d.a,{disabled:E,onClick:function(){return s(!c)},variant:"outlined",color:"secondary",className:t.button},c?"Hide":"In Browser"),i.a.createElement(d.a,{onClick:function(){return function(e){var t=document.createElement("a"),a=new Blob([e.armorTxt],{type:"text/plain"});t.href=URL.createObjectURL(a),t.download="".concat(t.href.split("/")[3],".asc"),t.click(),t.remove()}(u)},variant:"outlined",color:"secondary",className:t.button},"Download"),c&&i.a.createElement(b.a,{val:u.armorTxt,id:"encryptedResult"})),i.a.createElement(m.a,null,i.a.createElement(d.a,{onClick:e.reset,variant:"contained",className:t.button,color:"primary"}," ","New Encryption"," "))))},g=a(234),v=a(235),h=a(239),j=a(230),O=a(274),x=a(277),k=a(293),w=a(283),S=a(287),C=Object(u.a)((function(e){return{textBox:{maxWidth:"700px"},main:{padding:e.spacing(2)}}})),T=function(e){var t,a=C(),r=Object(l.useState)("byte"),n=Object(o.a)(r,2),c=n[0],s=n[1],u=Object(l.useState)(""),p=Object(o.a)(u,2),d=p[0],b=p[1],f=Object(l.useState)(!1),y=Object(o.a)(f,2),E=y[0],g=y[1],T=Object(l.useState)(!1),P=Object(o.a)(T,2),N=P[0],B=P[1],I=Object(l.useState)(),R=Object(o.a)(I,2),F=R[0],D=R[1],K=Object(l.useState)(),M=Object(o.a)(K,2),A=M[0],W=M[1],q=Object(l.useState)(!1),H=Object(o.a)(q,2),L=H[0],z=H[1];t="text"===c?i.a.createElement(O.a,{helperText:E&&"Please Select a file object!",className:a.textBox,fullWidth:!0,error:E,id:"outlined-multiline-static",label:"Text to Encrypt",multiline:!0,rows:10,onChange:function(e){b(e.target.value)},variant:"outlined"}):i.a.createElement(j.a,{fileMetaData:A,formByteInputError:N,readFile:function(e){var t=e.target.files[0];if(t){var a=new FileReader;a.readAsArrayBuffer(t),z(!0),a.onloadend=function(){D(new Uint8Array(a.result)),W({name:t.name,type:t.type.replace("/","_")}),z(!1)},a.onerror=function(){z(!1),D(void 0)}}},handleDelete:function(){D(void 0),W(void 0)},label:"Browse for File",uploading:L,inId:"encIn"});var U=function(){return g(!1),B(!1),"text"!==c||d&&""!==d?"byte"===c&&!F&&(B(!0),!0):(g(!0),!0)},J=function(t){var a,r;0===e.encType?a=t:r=t,"text"===c?e.handleEncrypt(a,r,d,"txt",!1):e.handleEncrypt(a,r,F,A.ext,!0)};return i.a.createElement("form",{onSubmit:function(e){return U()}},i.a.createElement("div",{className:a.main},i.a.createElement(m.a,{pt:2,pb:2},"To Encrypt, simply fill out this form.",i.a.createElement("br",null),0===e.encType?i.a.createElement("b",null,"Just don't lose your Passphrase!"):i.a.createElement("br",null)),i.a.createElement(m.a,{mb:2},i.a.createElement(x.a,{component:"fieldset"},i.a.createElement(k.a,{row:!0,"aria-label":"position",name:"position",value:c,defaultValue:"top",onChange:function(e){g(!1),B(!1),s(e.target.value)}},i.a.createElement(w.a,{value:"byte",control:i.a.createElement(S.a,{color:"secondary"}),label:"Load my secret",labelPlacement:"end"}),i.a.createElement(w.a,{value:"text",control:i.a.createElement(S.a,{color:"primary"}),label:"Type my secret",labelPlacement:"end"})))),i.a.createElement(m.a,{mb:2},t),0===e.encType&&i.a.createElement(m.a,{pt:2},i.a.createElement(v.a,{mainButtonText:"Encrypt",modalButtonText:"Submit",handleSubmit:U,handleConfirm:J,loading:e.loader}))),1===e.encType&&i.a.createElement(h.a,{loading:e.loader,privateKey:!1,encrypt:!0,handleKeyEncrypt:function(e,t){U()||t||J(e)}}))},P=a(286),N=a(80),B=a(229),I=a(222),R=a(231);t.default=function(){var e=Object(f.a)(),t=Object(l.useState)(!1),a=Object(o.a)(t,2),r=a[0],s=a[1],u=Object(l.useState)(!1),d=Object(o.a)(u,2),b=d[0],y=d[1],v=Object(l.useState)(0),h=Object(o.a)(v,2),j=h[0],O=h[1],x=Object(l.useState)(N.m),k=Object(o.a)(x,2),w=k[0],S=k[1],C=Object(l.useState)(),F=Object(o.a)(C,2),D=F[0],K=F[1],M=function(){var e=Object(c.a)(n.a.mark((function e(t,a,r,c,o){var l,i,s,u;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,y(!0),l=o?R.message.fromBinary(r):R.message.fromText(r),i={message:l,armor:!1},a?i.publicKeys=a:i.passwords=[t],e.next=7,Object(R.encrypt)(i);case 7:s=e.sent,u=s.message,o&&u.packets.write(),K({armorTxt:u.armor(),ext:c}),W(),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),S(N.f);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t,a,r,n,c){return e.apply(this,arguments)}}(),A=function(e,t){"clickaway"!==t&&S(N.m)},W=function(){S(N.g),s(!0),y(!1)},q=i.a.createElement(T,{handleEncrypt:M,encType:j,loader:b});return i.a.createElement(i.a.Fragment,null,w.show&&i.a.createElement(I.a,{anchorOrigin:B.a,open:w.show,autoHideDuration:1e4,onClose:A},i.a.createElement(P.a,{onClose:A,severity:w.severity},w.message)),i.a.createElement(m.a,{p:2},i.a.createElement("div",{className:e.header},!r&&i.a.createElement(g.a,{handleType:function(e){O(e)}}),i.a.createElement(p.a,{className:e.heading,variant:"h1",gutterBottom:!0},0===j?"Passphrase Based Encryption":"Key Encryption"),i.a.createElement(p.a,{className:e.subHeading,variant:"h2",gutterBottom:!0},0===j?"Symmetric":"Asymmetric")),r?i.a.createElement(E,{reset:function(){s(!1),S(N.m)},armorTxt:D}):q))}}}]);
//# sourceMappingURL=7.9d4adb2c.chunk.js.map