webpackJsonp([13],{167:function(t,n,e){function a(t){e(267)}var s=e(25)(e(209),e(294),a,"data-v-b825ae90",null);t.exports=s.exports},183:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"buttongroup",props:["items","title","active","disabled"],data:function(){return{nowActive:""}},computed:{},methods:{change:function(t){this.$emit("change",t)}},mounted:function(){},beforeCreate:function(){}}},184:function(t,n,e){n=t.exports=e(161)(!0),n.push([t.i,".my-buttongroup[data-v-598ca610]{background-color:#fff;padding:8px}.menu-btn[data-v-598ca610]{margin-left:0;margin-right:0;min-width:75px;height:50px;margin:0;font-size:16px;border-radius:0;padding-top:5px;color:#aaa;border-style:solid;border-width:0 0 2px;border-color:transparent}.menu-active[data-v-598ca610]{color:#000;border-style:solid;border-width:0 0 2px;border-color:#000}","",{version:3,sources:["E:/program/tujingwang1/program/src/components/Buttongroup.vue"],names:[],mappings:"AACA,iCAEM,sBAAuB,AACvB,WAAa,CAClB,AAYD,2BACM,cAAiB,AACjB,eAAkB,AAClB,eAAgB,AAChB,YAAa,AACb,SAAY,AACZ,eAAgB,AAChB,gBAAmB,AACnB,gBAAiB,AACjB,WAAe,AACf,mBAAmB,AAAC,qBAA8B,AAAC,wBAA+B,CACvF,AASD,8BACM,WAAY,AACZ,mBAAmB,AAAC,qBAA8B,AAAC,iBAAmB,CAC3E",file:"Buttongroup.vue",sourcesContent:["\n.my-buttongroup[data-v-598ca610] {\n\n      background-color: #fff;\n      padding: 8px;\n}\n\n  /* .menuButton {\n      height:50px;\n      padding:0px 35px;\n  } */\n\n  /* .md-body-2 {\n      font-size: 15px;\n      font-weight: 300;\n      letter-spacing: .01em;\n  } */\n.menu-btn[data-v-598ca610] {\n      margin-left: 0px;\n      margin-right: 0px;\n      min-width: 75px;\n      height: 50px;\n      margin: 0px;\n      font-size: 16px;\n      border-radius: 0px;\n      padding-top: 5px;\n      color: #aaaaaa;\n      border-style:solid; border-width: 0px 0px 2px 0px; border-color: rgba(0, 0, 0, 0);\n}\n\n  /* .menu-btn-o {\n      color: #999;\n      height: 50px;\n      min-width: 64px;\n      margin: 0px;\n      border-radius: 0px;\n  } */\n.menu-active[data-v-598ca610] {\n      color: #000;\n      border-style:solid; border-width: 0px 0px 2px 0px; border-color: #000;\n}\n  \n  /* .menu-btn:hover {\n      color: #ffffff;\n      background-color: rgba(99, 99, 99, 0.3)  !important;\n  } */\n\n  /* .menu-btn-o:hover {\n      color: #ffffff;\n  } */\n\n\n  /* .btn--flat {\n      border-radius: 0px;\n  } */\n\n  /* .btn--flat:hover {\n      color: #fff;\n      background-color:black  !important;\n  } */\n\n  /* .md-button-toggle > .md-button:not([disabled]) {\n      color: rgba(0, 0, 0, 0.99);\n  }\n\n  .md-theme-default.md-button-toggle .md-toggle {\n      color: rgba(255, 255, 255, 1);\n      background-color: rgba(0, 0, 0, .77);\n  } */\n\n\n\n"],sourceRoot:""}])},185:function(t,n,e){var a=e(184);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(162)("7902d17d",a,!0,{})},186:function(t,n,e){function a(t){e(185)}var s=e(25)(e(183),e(187),a,"data-v-598ca610",null);t.exports=s.exports},187:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"my-buttongroup"},[e("v-layout",{attrs:{row:"","align-center":""}},[e("v-flex",{attrs:{xs12:""}},[e("v-layout",{attrs:{"justify-center":"","align-content-space-between":"","align-center":""}},t._l(t.items,function(n){return e("v-btn",t._b({key:n.name,staticClass:"menu-btn body-1",class:{"menu-active":n.url===t.active},attrs:{flat:"",small:""},on:{click:function(e){t.change(n.url)}}},"v-btn",{disabled:t.disabled},!1),[t._v("\n                    "+t._s(n.name)+"\n                ")])}))],1)],1)],1)},staticRenderFns:[]}},209:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(186),s=e.n(a);n.default={name:"aam",components:{buttongroup:s.a},data:function(){return{ex11:!0,value:0,currentPage:1,active:"",items:[{name:"使用",router:"ok",url:"/ok"},{name:"禁用",router:"no",url:"/no"}],nproject:{dialog:!1,name:"",valid:!1,rules:[function(t){return!!t||"请填写任务名称"}]}}},computed:{admin:function(){return this.$store.state.admin}},methods:{quit:function(){this.$router.replace({name:"/"})},change:function(t){this.$router.replace({path:"/admin/"+t})},bossWechatReg:function(){var t=this.$store.state.socketClass.socket.id;window.open("https://open.weixin.qq.com/connect/qrconnect?appid=wx578ee588948c8fcc&redirect_uri=http://cloud.tujingwang.cn/user/bossWechatReg&response_type=code&scope=snsapi_login&state="+t+"#wechat_redirect")},getBossAccounts:function(t){this.active=t;var n=0;"/no"===t&&(n=1),this.$store.dispatch("getBossAccounts",{pageSize:18,currentPage:this.currentPage,isDisable:n})},openAuth:function(t){this.admin.bossAccount=this.admin.bossAccounts[t],this.ex11=!0,1===this.admin.bossAccounts[t].isDisable&&(this.ex11=!1),this.nproject.dialog=!0},putBossAccount:function(){var t=this,n=0;!1===this.ex11&&(n=1);var e=this.admin.bossAccount._id;this.$store.dispatch("putBossAccount",{_id:e,isDisable:n}).then(function(n){t.getBossAccounts(t.active),t.$store.dispatch("getBossAccountStatistics"),t.nproject.dialog=!1}).catch(function(t){console.log(t)})}},mounted:function(){var t=this;this.$store.dispatch("getBossAccountStatistics"),this.getBossAccounts(this.items[0].url),this.$store.state.socketClass.socket.on("bossWechatRegSuccess",function(n){setTimeout(function(){t.$store.state.successSnackbar={state:!0,text:n}},800),t.getBossAccounts(t.active),t.$store.dispatch("getBossAccountStatistics")})},beforeCreate:function(){}}},245:function(t,n,e){n=t.exports=e(161)(!0),n.push([t.i,".aam[data-v-b825ae90]{width:100%}.hand[data-v-b825ae90]{border-top-left-radius:40px;border-top-right-radius:40px}","",{version:3,sources:["E:/program/tujingwang1/program/src/components/admin/Aam.vue"],names:[],mappings:"AACA,sBACE,UAAW,CACZ,AACD,uBACE,4BAA6B,AAC7B,4BAA8B,CAC/B",file:"Aam.vue",sourcesContent:["\n.aam[data-v-b825ae90] {\n  width:100%;\n}\n.hand[data-v-b825ae90] {\n  border-top-left-radius: 40px;\n  border-top-right-radius: 40px;\n}\n\n\n"],sourceRoot:""}])},267:function(t,n,e){var a=e(245);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(162)("66a3290c",a,!0,{})},294:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"aam"},[e("v-container",{staticStyle:{padding:"12px","padding-top":"16px"},attrs:{"grid-list-xl":"",fluid:""}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs4:""}},[e("v-card",{staticClass:"text-xs-center",staticStyle:{padding:"20px"}},[e("div",{staticClass:"display-2",attrs:{color:"orange"}},[t._v(t._s(t.admin.totalAccount))]),t._v(" "),e("span",{staticClass:"caption grey--text"},[t._v("全  部")])])],1),t._v(" "),e("v-flex",{attrs:{xs4:""}},[e("v-card",{staticClass:"text-xs-center",staticStyle:{padding:"20px"}},[e("div",{staticClass:"display-2"},[t._v(t._s(t.admin.totalAccount-t.admin.disableAccount))]),t._v(" "),e("span",{staticClass:"caption grey--text"},[t._v("使  用")])])],1),t._v(" "),e("v-flex",{attrs:{xs4:""}},[e("v-card",{staticClass:"text-xs-center",staticStyle:{padding:"20px"}},[e("div",{staticClass:"display-2 red--text"},[t._v(t._s(t.admin.disableAccount))]),t._v(" "),e("span",{staticClass:"caption grey--text"},[t._v("禁 用")])])],1),t._v(" "),e("v-flex",{staticClass:"py-2",attrs:{xs12:""}},[e("v-card",[e("v-card-title",{staticStyle:{padding:"0px 16px"}},[e("buttongroup",{attrs:{title:"状态",items:t.items,active:t.active},on:{change:t.getBossAccounts}}),t._v(" "),e("v-spacer"),t._v(" "),e("v-btn",{attrs:{outline:"",color:"black"},on:{click:function(n){t.bossWechatReg()}}},[t._v("\n                  注册\n            ")])],1)],1)],1),t._v(" "),t._l(t.admin.bossAccounts,function(n,a){return e("v-flex",{key:n._id,attrs:{xs2:""}},[e("v-card",{staticClass:"text-xs-center",staticStyle:{height:"220px","padding-top":"40px"}},[e("v-btn",{staticClass:"hand",staticStyle:{height:"80px",width:"80px","min-width":"20px",margin:"0px",padding:"0px"},attrs:{flat:"",fab:""},on:{click:function(n){t.openAuth(a)}}},[e("v-avatar",{attrs:{size:"80px"}},[e("img",{attrs:{src:n.headimgurl,alt:"Avatar"}})])],1),t._v(" "),e("div",{staticClass:"body-1",staticStyle:{"padding-top":"10px","font-weight":"bold"}},[t._v(t._s(n.nickname))]),t._v(" "),e("span",{staticClass:"caption grey--text"},[t._v(t._s(n.city?n.city:"无")+" / "+t._s(n.province?n.province:"无")+" / "+t._s(n.country?n.country:"无"))])],1)],1)})],2)],1),t._v(" "),e("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:t.nproject.dialog,callback:function(n){t.$set(t.nproject,"dialog",n)},expression:"nproject.dialog"}},[e("v-card",[e("v-card-text",[e("v-container",{attrs:{"grid-list-md":""}},[e("v-layout",{attrs:{wrap:""}},[e("v-flex",{attrs:{xs12:""}},[e("v-subheader",[t._v("权限管理")]),t._v(" "),e("v-card",{attrs:{flat:""}},[e("v-card-text",[e("v-switch",{attrs:{color:"yellow",label:"基础系统: "+(t.ex11?"允许":"禁止")},model:{value:t.ex11,callback:function(n){t.ex11=n},expression:"ex11"}})],1)],1)],1)],1)],1)],1),t._v(" "),e("v-card-actions",[e("v-spacer"),t._v(" "),e("v-btn",{attrs:{small:"",flat:""},on:{click:function(n){t.nproject.dialog=!1}}},[t._v("取消")]),t._v(" "),e("v-btn",{attrs:{small:"",flat:"",loading:t.admin.putBossAccountLoading},on:{click:function(n){t.putBossAccount()}}},[t._v("保存")])],1)],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=13.c10f3f90c282a62cf36e.js.map