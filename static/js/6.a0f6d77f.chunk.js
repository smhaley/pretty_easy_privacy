(this["webpackJsonppretty-easy-privacy"]=this["webpackJsonppretty-easy-privacy"]||[]).push([[6],{228:function(e,t,a){"use strict";var r=a(46),n=a(28),c=a(0),o=a.n(c),l=a(174),i=a(83),s=a.n(i),u=a(224),m=a(209),p=a(177),d=a(222),b=a(80),y=a(32),f=Object(l.a)((function(e){return{result:{padding:"10px"},button:{margin:"5px"},copy:{textAlign:"right"}}}));t.a=function(e){var t=f(),a=Object(y.a)(),l=Object(c.useState)({open:!1,vertical:"bottom",horizontal:"left"}),i=Object(n.a)(l,2),g=i[0],E=i[1],v=g.vertical,h=g.horizontal,j=g.open,O=e.id,x=e.val;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:t.copy},o.a.createElement(u.a,{title:"Copy"},o.a.createElement(m.a,{"aria-label":"Copy",onClick:function(){E(Object(r.a)(Object(r.a)({},g),{},{open:!0})),Object(b.a)(O)}},o.a.createElement(s.a,null)))),o.a.createElement(p.a,{className:t.result},o.a.createElement("pre",{className:a.pre,id:O},x)),o.a.createElement(d.a,{anchorOrigin:{vertical:v,horizontal:h},open:j,onClose:function(){E(Object(r.a)(Object(r.a)({},g),{},{open:!1}))},message:"Copied to clipboard",key:v+h}))}},229:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r={vertical:"bottom",horizontal:"left"}},230:function(e,t,a){"use strict";var r=a(0),n=a.n(r),c=a(174),o=a(244),l=a.n(o),i=a(279),s=a(209),u=a(219),m=a(268),p=a(282),d=a(280),b=Object(c.a)((function(e){return{hidden:{visibility:"hidden",width:"1px"},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12},helpText:{marginLeft:e.spacing(2)}}}));t.a=function(e){var t=b(),a=e.inId,r=e.fileMetaData&&n.a.createElement("div",null,n.a.createElement(i.a,null,"Selected: ".concat(e.fileMetaData.name)),n.a.createElement(s.a,{onClick:e.handleDelete},n.a.createElement(l.a,null)));return n.a.createElement(u.a,null,n.a.createElement(m.a,{onClick:function(){return document.getElementById(a).click()},variant:"outlined",color:"secondary",disabled:e.uploading},e.uploading&&n.a.createElement(p.a,{size:24,color:"secondary",className:t.buttonProgress}),e.label),n.a.createElement("input",{id:a,type:"file",className:t.hidden,onChange:e.readFile}),r,e.formByteInputError&&n.a.createElement("div",{className:t.helpText},n.a.createElement(d.a,{error:!0},e.errMessage?e.errMessage:"File Required")))}},234:function(e,t,a){"use strict";a.d(t,"a",(function(){return b}));var r=a(28),n=a(0),c=a.n(n),o=a(5),l=a(174),i=a(284),s=a(269),u=a(176),m=Object(o.a)({root:{borderBottom:"1px solid #e8e8e8"}})(i.a),p=Object(o.a)((function(e){return{root:{textTransform:"none",minWidth:72,fontWeight:e.typography.fontWeightRegular,marginRight:e.spacing(4),fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),"&:hover":{opacity:1},"&$selected":{fontWeight:e.typography.fontWeightMedium}},selected:{}}}))((function(e){return c.a.createElement(s.a,Object.assign({disableRipple:!0},e))})),d=Object(l.a)((function(e){return{root:{flexGrow:1},padding:{padding:e.spacing(2)},demo1:{backgroundColor:e.palette.background.paper},demo2:{backgroundColor:"#2e1534"}}}));function b(e){var t=d(),a=c.a.useState(0),n=Object(r.a)(a,2),o=n[0],l=n[1];return c.a.createElement("div",{className:t.root},c.a.createElement(m,{value:o,onChange:function(t,a){l(a),e.handleType(a)},"aria-label":"ant example"},c.a.createElement(p,{label:"Passphrase"}),c.a.createElement(p,{label:"Key Pair"})),c.a.createElement(u.a,{className:t.padding}))}},239:function(e,t,a){"use strict";var r=a(22),n=a.n(r),c=a(46),o=a(82),l=a(28),i=a(20),s=a(0),u=a.n(s),m=a(174),p=a(286),d=a(229),b=a(230),y=a(32),f=a(80),g=a(231),E=a(274),v=a(222),h=a(219),j=a(176),O=a(277),x=a(293),k=a(283),S=a(287),w=a(279),T=a(268),I=a(282),N=Object(m.a)((function(e){return{buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12},main:Object(i.a)({padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{padding:e.spacing(2)})}}));t.a=function(e){var t,a=N(),r=Object(y.a)(),i=e.privateKey,m=e.encrypt,C={err:!1,key:!1,message:!1},P=Object(s.useState)(f.m),B=Object(l.a)(P,2),D=B[0],R=B[1],M=Object(s.useState)(),F=Object(l.a)(M,2),K=F[0],A=F[1],L=Object(s.useState)("byte"),H=Object(l.a)(L,2),q=H[0],W=H[1],z=Object(s.useState)(C),G=Object(l.a)(z,2),U=G[0],_=G[1],J=Object(s.useState)(C),V=Object(l.a)(J,2),$=V[0],Q=V[1],X=Object(s.useState)(),Y=Object(l.a)(X,2),Z=Y[0],ee=Y[1],te=Object(s.useState)(!1),ae=Object(l.a)(te,2),re=ae[0],ne=ae[1],ce=Object(s.useState)(""),oe=Object(l.a)(ce,2),le=oe[0],ie=oe[1],se=Object(s.useState)(!1),ue=Object(l.a)(se,2),me=ue[0],pe=ue[1],de=function(e,t){"clickaway"!==t&&R(f.m)};t="text"===q?u.a.createElement(E.a,{helperText:U.err&&U.message,className:a.textBox,fullWidth:!0,error:U.err,id:"outlined-multiline-static-rsa-key",label:"RSA Key Input",multiline:!0,rows:10,onChange:function(e){A(e.target.value)},variant:"outlined"}):u.a.createElement(b.a,{formByteInputError:$.err,errMessage:$.err.message,fileMetaData:Z,label:"Key Browse",buttonLabel:"key browse",handleDelete:function(){A(void 0),ee(void 0)},readFile:function(e){console.log("FIRE");var t=e.target.files[0];if(t){var a=new FileReader;pe(!0),a.readAsText(t),a.onloadend=function(){ee({name:t.name,type:t.type.replace("/","_")}),A(a.result),pe(!1)},a.onerror=function(){A(void 0),pe(!1)}}},uploading:me,inId:"keyIn"});var be=function(){var t=Object(o.a)(n.a.mark((function t(a){var r,o,l,s;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),R(f.m),_(C),Q(C),ne(!1),r=!1,""===le&&(ne(!0),r=!0),K&&""!==K){t.next=9;break}"text"===q?_(Object(c.a)(Object(c.a)({},U),{},{err:!0,message:"Key Text Required"})):Q(Object(c.a)(Object(c.a)({},$),{},{err:!0,message:"Key File Required"})),r=!0,t.next=24;break;case 9:if(!i){t.next=18;break}return t.next=12,fe(K,le);case 12:l=t.sent,o=l.key,r=l.error,t.next=24;break;case 18:return t.next=20,ye(K);case 20:s=t.sent,o=s.key,r=s.error;case 24:e.handleKeyEncrypt(o,r);case 25:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),ye=function(){var e=Object(o.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.key.readArmored(t);case 2:if(a=e.sent.keys[0]){e.next=8;break}return R(f.i),e.abrupt("return",{key:void 0,error:!0});case 8:return e.abrupt("return",{key:a,error:!1});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),fe=function(){var e=Object(o.a)(n.a.mark((function e(t,a){var r,c,o,i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.key.readArmored(t);case 3:return c=e.sent,o=Object(l.a)(c.keys,1),i=o[0],e.next=8,i.decrypt(a);case 8:return r=[i],e.abrupt("return",{key:r,error:!1});case 12:return e.prev=12,e.t0=e.catch(0),"Nothing to decrypt in a public key"===e.t0.message&&R(f.l),"Incorrect key passphrase"===e.t0.message&&R(f.k),"privateKey is undefined"===e.t0.message&&R(f.i),"Cannot read property 'decrypt' of undefined"===e.t0.message&&R(f.i),e.abrupt("return",{key:void 0,error:!0});case 19:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t,a){return e.apply(this,arguments)}}();return u.a.createElement("div",{className:a.main},D.show&&u.a.createElement(v.a,{anchorOrigin:d.a,open:D.show,autoHideDuration:1e4,onClose:de},u.a.createElement(p.a,{onClose:de,severity:D.severity},D.message)),u.a.createElement(h.a,null,u.a.createElement(h.a,null,u.a.createElement(j.a,{variant:"h2",className:r.subHeadingBold,gutterBottom:!0},u.a.createElement("b",null,"Key Input")),u.a.createElement(O.a,{component:"fieldset"},u.a.createElement(x.a,{row:!0,"aria-label":"position",name:"position",value:q,defaultValue:"top",onChange:function(e){W(e.target.value)}},u.a.createElement(k.a,{value:"byte",control:u.a.createElement(S.a,{color:"secondary"}),label:"Import from file",labelPlacement:"end"}),u.a.createElement(k.a,{value:"text",control:u.a.createElement(S.a,{color:"primary"}),label:"Paste in text",labelPlacement:"end"})))),u.a.createElement(h.a,null,u.a.createElement(w.a,{component:"legend"}),u.a.createElement(h.a,{mt:2},t)),i&&u.a.createElement(h.a,{pt:3},u.a.createElement(E.a,{required:!0,helperText:re&&"Passphrase Required!",onChange:function(e){return ie(e.target.value)},error:re,id:"pw-in private key",type:"password",label:"Private Key Passphrase",variant:"outlined"})),u.a.createElement(h.a,{pt:3},u.a.createElement(T.a,{variant:"contained",color:"primary",onClick:be,disabled:e.loading},m?"Encrypt":"Decrypt",e.loading&&u.a.createElement(I.a,{size:24,color:"primary",className:a.buttonProgress})))))}},256:function(e,t,a){"use strict";var r=a(2),n=a(8),c=a(1),o=a(0),l=(a(3),a(4)),i=a(5),s=a(205),u=o.forwardRef((function(e,t){var a,n=e.classes,i=e.className,u=e.component,m=void 0===u?"li":u,p=e.disableGutters,d=void 0!==p&&p,b=e.ListItemClasses,y=e.role,f=void 0===y?"menuitem":y,g=e.selected,E=e.tabIndex,v=Object(r.a)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(a=void 0!==E?E:-1),o.createElement(s.a,Object(c.a)({button:!0,role:f,tabIndex:a,component:m,selected:g,disableGutters:d,classes:Object(c.a)({dense:n.dense},b),className:Object(l.a)(n.root,i,g&&n.selected,!d&&n.gutters),ref:t},v))}));t.a=Object(i.a)((function(e){return{root:Object(c.a)({},e.typography.body1,Object(n.a)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:Object(c.a)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(u)},289:function(e,t,a){"use strict";a.r(t);var r=a(22),n=a.n(r),c=a(82),o=a(28),l=a(0),i=a.n(l),s=a(222),u=a(219),m=a(176),p=a(20),d=a(174),b=a(268),y=a(228),f=a(80),g=a(32),E=Object(d.a)((function(e){return{main:Object(p.a)({padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{padding:e.spacing(2)}),button:{margin:"5px"}}})),v=function(e){var t=E(),a=Object(g.a)(),r=e.outbound,n=Object(l.useState)(!1),c=Object(o.a)(n,2),s=c[0],p=c[1],d=r.outbound.length>1e4||"byte"===r.type;return i.a.createElement("div",{className:t.main},i.a.createElement(u.a,{pt:2},i.a.createElement(m.a,{variant:"h2",className:a.subHeadingBold,gutterBottom:!0},"Decrypted Data:"),i.a.createElement(u.a,{mb:2,pr:4},i.a.createElement(b.a,{disabled:d,onClick:function(){return p(!s)},variant:"outlined",color:"secondary",className:t.button},s?"Hide":"In Browser"),i.a.createElement(b.a,{onClick:function(){return function(e){var t,a=document.createElement("a");t="byte"===r.type?new Blob([e.outbound]):new Blob([e.outbound],{type:f.j[e.ext]}),a.href=URL.createObjectURL(t),a.download="pep_output_"+a.href.split("/")[3].split("-")[0]+"."+e.ext,a.click(),a.remove()}(r)},variant:"outlined",color:"secondary",className:t.button},"Download"),s&&i.a.createElement(y.a,{val:r.outbound,id:"encryptedResult"})),i.a.createElement(u.a,null,i.a.createElement(b.a,{onClick:e.reset,variant:"contained",className:t.button,color:"primary"},"New Decryption"))))},h=a(234),j=a(46),O=a(239),x=a(230),k=a(274),S=a(277),w=a(293),T=a(283),I=a(287),N=a(278),C=a(285),P=a(256),B=a(280),D=a(282),R=Object(d.a)((function(e){return{textBox:{maxWidth:"700px"},select:{maxWidth:"200px"},dropSelect:{width:"100%"},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12},main:{padding:e.spacing(2)},submit:{paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}}})),M=function(e){var t,a=R(),r={formTextInputError:!1,formByteInputError:!1,passPhraseMissingError:!1,fileTypeErr:!1,fileExtErr:!1},n=Object(l.useState)("byte"),c=Object(o.a)(n,2),s=c[0],m=c[1],p=Object(l.useState)(""),d=Object(o.a)(p,2),y=d[0],f=d[1],g=Object(l.useState)(r),E=Object(o.a)(g,2),v=E[0],h=E[1],M=Object(l.useState)(""),F=Object(o.a)(M,2),K=F[0],A=F[1],L=Object(l.useState)(""),H=Object(o.a)(L,2),q=H[0],W=H[1],z=Object(l.useState)(""),G=Object(o.a)(z,2),U=G[0],_=G[1],J=Object(l.useState)(),V=Object(o.a)(J,2),$=V[0],Q=V[1],X=Object(l.useState)(!1),Y=Object(o.a)(X,2),Z=Y[0],ee=Y[1];t="text"===s?i.a.createElement(k.a,{helperText:v.formTextInputError&&"Please Select a file object!",className:a.textBox,fullWidth:!0,error:v.formTextInputError,id:"outlined-multiline-static",label:"Enter something like: -----BEGIN PGP MESSAGE-----",multiline:!0,rows:10,onChange:function(e){f(e.target.value)},variant:"outlined"}):i.a.createElement(x.a,{fileMetaData:$,formByteInputError:v.formByteInputError,readFile:function(e){var t=e.target.files[0];if(t){var a=new FileReader;ee(!0),a.readAsText(t);var r={name:t.name,type:t.type.replace("/","_")};a.onloadend=function(){Q(r),f(a.result),ee(!1)},a.onerror=function(){f(void 0),ee(!1)}}},handleDelete:function(){f(void 0),Q(void 0)},label:"Browse for Encrypted File",uploading:Z,errMessage:"Text File Required",inId:"decIn"});var te=function(t){t&&t.preventDefault(),h(r);var a=!1,n=!1,c=!1,o=!1,l=!1,i=!1;return"text"!==s||y&&""!==y?"byte"!==s||y&&""!==y||(i=!0,a=!0):(n=!0,i=!0),""===q?(o=!0,i=!0):"text"===q&&""===U&&(l=!0,i=!0),0===e.encType&&""===K?(c=!0,i=!0):0===e.encType&&!1===i&&ae(K),h({formTextInputError:n,formByteInputError:a,passPhraseMissingError:c,fileTypeErr:o,fileExtErr:l}),i},ae=function(t){var a,r;0===e.encType?a=t:r=t,e.byteDecrypt(a,r,y,{fileType:q,ext:U})};return i.a.createElement("form",{onSubmit:function(e){return te(e)}},i.a.createElement("div",{className:a.main},i.a.createElement(u.a,{pb:2},i.a.createElement("ol",null,i.a.createElement("li",null,"Simply supply your encrypted file or text."),i.a.createElement("li",null,"Select the expected output format."),i.a.createElement("li",null,0===e.encType?"Supply your passphrase.":"Supply your private key and passphrase."),i.a.createElement("li",null," Decrypt.")),i.a.createElement(S.a,{component:"fieldset"},i.a.createElement(w.a,{row:!0,"aria-label":"position",name:"position",value:s,defaultValue:"top",onChange:function(e){h(Object(j.a)(Object(j.a)({},v),{},{formTextInputError:!1,formByteInputError:!1})),m(e.target.value)}},i.a.createElement(T.a,{value:"byte",control:i.a.createElement(I.a,{color:"secondary"}),label:"Load my data",labelPlacement:"end"}),i.a.createElement(T.a,{value:"text",control:i.a.createElement(I.a,{color:"primary"}),label:"Paste my data",labelPlacement:"end"})))),i.a.createElement(u.a,{pb:4},t),i.a.createElement(u.a,{pb:2,className:a.select},i.a.createElement(S.a,{variant:"outlined",className:a.dropSelect,error:!!v.fileTypeErr},i.a.createElement(N.a,{id:"demo-simple-select-outlined-label"},"File Type"),i.a.createElement(C.a,{required:!0,className:a.select,labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:U,onChange:function(e){var t=e.target.value;_(t),W("txt"===t||"csv"===t?"text":"byte")},label:"Text FIle Type"},i.a.createElement(P.a,{value:"txt"},".txt"),i.a.createElement(P.a,{value:"csv"},".csv"),i.a.createElement(P.a,{value:"byte"},"Something Else")),v.fileTypeErr&&i.a.createElement(B.a,null,"Please enter the format of the decrypted file")))),0===e.encType?i.a.createElement("div",{className:a.submit},i.a.createElement(u.a,null,i.a.createElement(k.a,{required:!0,helperText:v.passPhraseMissingError&&"PassPhrase Required!",onChange:function(e){A(e.target.value)},error:v.passPhraseMissingError,id:"pw-in",type:"password",label:"Passphrase",variant:"outlined",className:a.select})),i.a.createElement(u.a,{pt:3},i.a.createElement(b.a,{type:"submit",onClick:te,variant:"contained",color:"primary",disabled:e.loading},"Decrypt",e.loading&&i.a.createElement(D.a,{size:24,color:"primary",className:a.buttonProgress})))):i.a.createElement(O.a,{loading:e.loader,privateKey:!0,encrypt:!1,handleKeyEncrypt:function(e,t){te()||t||ae(e)}}))},F=a(286),K=a(229),A=a(231);t.default=function(){var e=Object(g.a)(),t=Object(l.useState)(!1),a=Object(o.a)(t,2),r=a[0],p=a[1],d=Object(l.useState)(!1),b=Object(o.a)(d,2),y=b[0],E=b[1],j=Object(l.useState)(0),O=Object(o.a)(j,2),x=O[0],k=O[1],S=Object(l.useState)(f.m),w=Object(o.a)(S,2),T=w[0],I=w[1],N=Object(l.useState)(),C=Object(o.a)(N,2),P=C[0],B=C[1],D=function(e,t){"clickaway"!==t&&I(f.m)},R=function(){var e=Object(c.a)(n.a.mark((function e(t,a,r,c){var o,l,i,s,u;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E(!0),I(f.m),e.prev=2,e.next=5,A.message.readArmored(r);case 5:e.t0=e.sent,o={message:e.t0},e.next=14;break;case 9:return e.prev=9,e.t1=e.catch(2),l="Misformed armored text"===e.t1.message||"String contains an invalid character"===e.t1.message,I(!0===l?f.b:f.c),e.abrupt("return");case 14:return a?o.privateKeys=a:o.passwords=[t],"byte"===c.fileType&&(o.format="binary"),e.prev=16,e.next=19,Object(A.decrypt)(o);case 19:return i=e.sent,s=i.data,e.next=23,f.h(s,c);case 23:u=e.sent,B({outbound:s,ext:u,type:c.fileType}),L(),e.next=33;break;case 28:return e.prev=28,e.t2=e.catch(16),e.t2.message.includes("Error decrypting message")&&I(f.d),E(!1),e.abrupt("return");case 33:case"end":return e.stop()}}),e,null,[[2,9],[16,28]])})));return function(t,a,r,n){return e.apply(this,arguments)}}(),L=function(){p(!0),E(!1),I(f.e)},H=i.a.createElement(M,{byteDecrypt:R,encType:x,loader:y});return i.a.createElement(i.a.Fragment,null,T.show&&i.a.createElement(s.a,{anchorOrigin:K.a,open:T.show,autoHideDuration:1e4,onClose:D},i.a.createElement(F.a,{onClose:D,severity:T.severity},T.message)),i.a.createElement(u.a,{p:2},i.a.createElement("div",{className:e.header},!r&&i.a.createElement(h.a,{handleType:function(e){k(e)}}),i.a.createElement(m.a,{className:e.heading,variant:"h1",gutterBottom:!0},0===x?"Passphrase Based Decryption":"Key Based Decryption"),i.a.createElement(m.a,{className:e.subHeading,variant:"h2",gutterBottom:!0},0===x?"Symmetric":"Asymmetric")),r?i.a.createElement(v,{reset:function(){p(!1),I(f.m)},outbound:P}):H))}}}]);
//# sourceMappingURL=6.a0f6d77f.chunk.js.map