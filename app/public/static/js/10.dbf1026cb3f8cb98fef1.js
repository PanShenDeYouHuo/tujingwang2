webpackJsonp([10],{172:function(t,e,n){function a(t){n(248)}var i=n(25)(n(213),n(276),a,"data-v-02e3fc74",null);t.exports=i.exports},183:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"buttongroup",props:["items","title","active","disabled"],data:function(){return{nowActive:""}},computed:{},methods:{change:function(t){this.$emit("change",t)}},mounted:function(){},beforeCreate:function(){}}},184:function(t,e,n){e=t.exports=n(161)(!0),e.push([t.i,".my-buttongroup[data-v-598ca610]{background-color:#fff;padding:8px}.menu-btn[data-v-598ca610]{margin-left:0;margin-right:0;min-width:75px;height:50px;margin:0;font-size:16px;border-radius:0;color:#aaa;border-style:solid;border-width:0 0 2px;border-color:transparent}.menu-active[data-v-598ca610]{color:#000;border-style:solid;border-width:0 0 2px;border-color:#000}","",{version:3,sources:["E:/program/tujingwang1/program/src/components/Buttongroup.vue"],names:[],mappings:"AACA,iCAEM,sBAAuB,AACvB,WAAa,CAClB,AAYD,2BACM,cAAiB,AACjB,eAAkB,AAClB,eAAgB,AAChB,YAAa,AACb,SAAY,AACZ,eAAgB,AAChB,gBAAmB,AAEnB,WAAe,AACf,mBAAmB,AAAC,qBAA8B,AAAC,wBAA+B,CACvF,AASD,8BACM,WAAY,AACZ,mBAAmB,AAAC,qBAA8B,AAAC,iBAAmB,CAC3E",file:"Buttongroup.vue",sourcesContent:["\n.my-buttongroup[data-v-598ca610] {\n\n      background-color: #fff;\n      padding: 8px;\n}\n\n  /* .menuButton {\n      height:50px;\n      padding:0px 35px;\n  } */\n\n  /* .md-body-2 {\n      font-size: 15px;\n      font-weight: 300;\n      letter-spacing: .01em;\n  } */\n.menu-btn[data-v-598ca610] {\n      margin-left: 0px;\n      margin-right: 0px;\n      min-width: 75px;\n      height: 50px;\n      margin: 0px;\n      font-size: 16px;\n      border-radius: 0px;\n    \n      color: #aaaaaa;\n      border-style:solid; border-width: 0px 0px 2px 0px; border-color: rgba(0, 0, 0, 0);\n}\n\n  /* .menu-btn-o {\n      color: #999;\n      height: 50px;\n      min-width: 64px;\n      margin: 0px;\n      border-radius: 0px;\n  } */\n.menu-active[data-v-598ca610] {\n      color: #000;\n      border-style:solid; border-width: 0px 0px 2px 0px; border-color: #000;\n}\n  \n  /* .menu-btn:hover {\n      color: #ffffff;\n      background-color: rgba(99, 99, 99, 0.3)  !important;\n  } */\n\n  /* .menu-btn-o:hover {\n      color: #ffffff;\n  } */\n\n\n  /* .btn--flat {\n      border-radius: 0px;\n  } */\n\n  /* .btn--flat:hover {\n      color: #fff;\n      background-color:black  !important;\n  } */\n\n  /* .md-button-toggle > .md-button:not([disabled]) {\n      color: rgba(0, 0, 0, 0.99);\n  }\n\n  .md-theme-default.md-button-toggle .md-toggle {\n      color: rgba(255, 255, 255, 1);\n      background-color: rgba(0, 0, 0, .77);\n  } */\n\n\n\n"],sourceRoot:""}])},185:function(t,e,n){var a=n(184);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(162)("7902d17d",a,!0,{})},186:function(t,e,n){function a(t){n(185)}var i=n(25)(n(183),n(187),a,"data-v-598ca610",null);t.exports=i.exports},187:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"my-buttongroup"},[n("v-layout",{attrs:{row:"","align-center":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-layout",{attrs:{"justify-center":"","align-content-space-between":"","align-center":""}},t._l(t.items,function(e){return n("v-btn",t._b({key:e.name,staticClass:"menu-btn body-1",class:{"menu-active":e.url===t.active},attrs:{flat:"",small:""},on:{click:function(n){t.change(e.url)}}},"v-btn",{disabled:t.disabled},!1),[t._v("\n                    "+t._s(e.name)+"\n                ")])}))],1)],1)],1)},staticRenderFns:[]}},213:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(11),i=n.n(a),o=n(10),r=n.n(o),s=n(186),c=n.n(s);e.default={name:"authority",components:{buttongroup:c.a},props:[],data:function(){return{currentPage:1,items:[{name:"全部",router:"all",url:"/all"},{name:"财务",router:"financial",url:"/financial"},{name:"客服",router:"service",url:"/service"},{name:"渲染",router:"member",url:"/render"}],active:"",e11:[],staffMenu:[],people:[{name:"财务",description:"授权财务的权限",router:"financial"},{name:"客服",description:"授权客服的基本权限",router:"service"},{name:"客服经理",description:"授权客户经理处理客户的安排的权限",router:"customerManager"},{name:"渲染师",description:"授权渲染师的权限",router:"render"}]}},computed:{boss:function(){return this.$store.state.boss},appLoading:function(){return this.$store.state.appLoading}},methods:{quit:function(){this.$router.replace({name:"/"})},getStaffAccounts:function(t){this.active!==t&&(this.currentPage=1,this.active=t),this.$store.dispatch("getStaffAccounts",{pageSize:18,currentPage:this.currentPage,authority:t.slice(1)})},staffWechatReg:function(){var t=this.$store.state.socketClass.socket.id;window.open("https://open.weixin.qq.com/connect/qrconnect?appid=wx578ee588948c8fcc&redirect_uri=http://cloud.tujingwang.cn/user/staffWechatReg&response_type=code&scope=snsapi_login&state="+t+"#wechat_redirect")},cancel:function(t,e){if(this.e11.length){t.authority=[];for(var n in this.e11)t.authority[n]=this.e11[n]}else t.authority=[];this.staffMenu[e]=!1},open:function(t,e){this.staffMenu[e]=!0,this.e11=t},putAuthority:function(t,e){var n=this;return r()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,n.$store.dispatch("putAuthority",{_id:t._id,authority:t.authority});case 3:n.staffMenu[e]=!1,a.next=10;break;case 6:a.prev=6,a.t0=a.catch(0),cancel(t),console.log(a.t0);case 10:case"end":return a.stop()}},a,n,[[0,6]])}))()}},mounted:function(){var t=this;setTimeout(function(){t.getStaffAccounts(t.items[0].url)},300),this.$store.state.socketClass.socket.on("staffWechatRegSuccess",function(e){setTimeout(function(){t.$store.state.successSnackbar={state:!0,text:e}},800),t.getStaffAccounts(t.active)})},beforeCreate:function(){}}},226:function(t,e,n){e=t.exports=n(161)(!0),e.push([t.i,".authority[data-v-02e3fc74]{width:100%}.menu-active[data-v-02e3fc74]{background-color:#bbb}.hand[data-v-02e3fc74]{border-top-left-radius:40px;border-top-right-radius:40px}.my-btn[data-v-02e3fc74]{margin-left:0;margin-right:0;min-width:0}.card__actions[data-v-02e3fc74]{padding:4px 8px 4px 6px}","",{version:3,sources:["E:/program/tujingwang1/program/src/components/boss/Authority.vue"],names:[],mappings:"AACA,4BACI,UAAY,CACf,AACD,8BAEI,qBAAuB,CAC1B,AACD,uBACI,4BAA6B,AAC7B,4BAA8B,CACjC,AACD,yBACI,cAAiB,AACjB,eAAkB,AAClB,WAAe,CAClB,AACD,gCACI,uBAAyB,CAC5B",file:"Authority.vue",sourcesContent:["\n.authority[data-v-02e3fc74] {\n    width: 100%;\n}\n.menu-active[data-v-02e3fc74] {\n    /* color: red; */\n    background-color: #bbb;\n}\n.hand[data-v-02e3fc74] {\n    border-top-left-radius: 40px;\n    border-top-right-radius: 40px;\n}\n.my-btn[data-v-02e3fc74] {\n    margin-left: 0px;\n    margin-right: 0px;\n    min-width: 0px;\n}\n.card__actions[data-v-02e3fc74] {\n    padding: 4px 8px 4px 6px;\n}\n\n"],sourceRoot:""}])},248:function(t,e,n){var a=n(226);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(162)("6ddee3f8",a,!0,{})},276:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"authority"},[n("v-container",{staticStyle:{padding:"12px","padding-top":"16px"},attrs:{"grid-list-xl":"",fluid:""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-card",{attrs:{flat:""}},[n("v-card-title",{staticStyle:{padding:"0px 16px"}},[n("buttongroup",{attrs:{title:"",items:t.items,active:t.active,disabled:this.$store.state.appLoading},on:{change:t.getStaffAccounts}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{outline:"",color:"black"},on:{click:function(e){t.staffWechatReg()}}},[t._v("\n                                注册\n                            ")])],1)],1)],1),t._v(" "),t._l(t.boss.staffAccounts,function(e,a){return n("v-flex",{key:e._id,attrs:{xs2:""}},[n("v-card",{attrs:{flat:""}},[n("v-card-media",{attrs:{src:e.headimgurl.substr(0,e.headimgurl.length-3)+"0",height:"102px"},on:{click:function(t){}}}),t._v(" "),n("div",{staticClass:"caption",staticStyle:{"padding-top":"10px","padding-left":"10px"}},[n("span",{staticClass:"grey--text caption"},[t._v("姓名：")]),t._v(" "),2===e.realInformation.state?n("span",{staticStyle:{"font-weight":"bold"}},[t._v(t._s(e.realInformation.name))]):n("span",{staticClass:"red--text",staticStyle:{"font-weight":"bold"}},[t._v("未认证")])]),t._v(" "),n("div",{staticStyle:{"padding-top":"10px","padding-left":"10px"}},[n("span",{staticClass:"caption",staticStyle:{"font-weight":"bold","white-space":"nowrap",display:"inline-block",overflow:"hidden",width:"132px","text-overflow":"ellipsis"}},[n("span",{staticClass:"grey--text caption"},[t._v("昵称：")]),t._v("\n                                "+t._s(e.nickname)+"\n                            ")])]),t._v(" "),n("v-divider"),t._v(" "),n("v-card-actions",[n("v-menu",{attrs:{"offset-x":"","close-on-content-click":!1,"nudge-width":200,"max-width":"350"},model:{value:t.staffMenu[a],callback:function(e){t.$set(t.staffMenu,a,e)},expression:"staffMenu[index]"}},[n("v-btn",{staticClass:"my-btn text-xs-center",attrs:{slot:"activator",flat:"",small:""},on:{click:function(n){t.open(e.authority)}},slot:"activator"},[n("span",{staticClass:"grey--text caption"},[t._v("设置")])]),t._v(" "),t.staffMenu[a]?n("v-card",[n("v-list",[n("v-list-tile",{attrs:{avatar:""}},[n("v-list-tile-avatar",[n("img",{attrs:{src:e.headimgurl,alt:"John"}})]),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(e.nickname))])],1)],1)],1),t._v(" "),n("v-divider"),t._v(" "),n("v-layout",{attrs:{wrap:""}},[n("v-flex",{staticStyle:{padding:"12px"},attrs:{xs12:""}},[n("v-select",{attrs:{label:"权限",items:t.people,"item-text":"router","item-value":"router",multiple:"",chips:"","max-height":"auto",autocomplete:""},scopedSlots:t._u([{key:"selection",fn:function(e){return[n("v-chip",{key:JSON.stringify(e.item),staticClass:"chip--select-multi white--text",attrs:{close:"",selected:e.selected,color:"red"},on:{input:function(t){e.parent.selectItem(e.item)}}},[t._v("\n                                                    "+t._s(e.item.router)+"\n                                                    ")])]}},{key:"item",fn:function(e){return["object"!=typeof e.item?[n("v-list-tile-content",{domProps:{textContent:t._s(e.item)}})]:[n("v-list-tile-content",[n("v-list-tile-title",{domProps:{innerHTML:t._s(e.item.name)}}),t._v(" "),n("v-list-tile-sub-title",{domProps:{innerHTML:t._s(e.item.description)}})],1)]]}}]),model:{value:e.authority,callback:function(n){t.$set(e,"authority",n)},expression:"staff.authority"}})],1)],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{flat:"",small:"",disabled:t.appLoading},on:{click:function(n){t.cancel(e,a)}}},[t._v("取消")]),t._v(" "),n("v-btn",{attrs:{color:"primary",flat:"",small:"",disabled:t.appLoading,loading:t.appLoading},on:{click:function(n){t.putAuthority(e,a)}}},[t._v("保存")])],1)],1):t._e()],1)],1)],1)],1)}),t._v(" "),n("v-flex",{attrs:{xs12:""}},[n("v-card",[n("v-card-title",{staticStyle:{padding:"0px 16px"}},[n("div",{staticClass:"text-xs-center",staticStyle:{width:"100%"}},[n("v-pagination",t._b({attrs:{length:t.boss.staffAccountsCount,"total-visible":7},on:{input:function(e){t.getStaffAccounts(t.active)}},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}},"v-pagination",{disabled:t.boss.getStaffAccountsLoading},!1))],1)])],1)],1)],2)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=10.dbf1026cb3f8cb98fef1.js.map