webpackJsonp([4],{181:function(t,e,n){function r(t){n(263)}var a=n(25)(n(224),n(291),r,"data-v-8ab20ca6",null);t.exports=a.exports},183:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"buttongroup",props:["items","title","active","disabled"],data:function(){return{nowActive:""}},computed:{},methods:{change:function(t){this.$emit("change",t)}},mounted:function(){},beforeCreate:function(){}}},184:function(t,e,n){e=t.exports=n(161)(!0),e.push([t.i,".my-buttongroup[data-v-598ca610]{background-color:#fff;padding:8px}.menu-btn[data-v-598ca610]{margin-left:0;margin-right:0;min-width:75px;height:50px;margin:0;font-size:16px;border-radius:0;color:#aaa;border-style:solid;border-width:0 0 2px;border-color:transparent}.menu-active[data-v-598ca610]{color:#000;border-style:solid;border-width:0 0 2px;border-color:#000}","",{version:3,sources:["E:/program/tujingwang1/program/src/components/Buttongroup.vue"],names:[],mappings:"AACA,iCAEM,sBAAuB,AACvB,WAAa,CAClB,AAYD,2BACM,cAAiB,AACjB,eAAkB,AAClB,eAAgB,AAChB,YAAa,AACb,SAAY,AACZ,eAAgB,AAChB,gBAAmB,AAEnB,WAAe,AACf,mBAAmB,AAAC,qBAA8B,AAAC,wBAA+B,CACvF,AASD,8BACM,WAAY,AACZ,mBAAmB,AAAC,qBAA8B,AAAC,iBAAmB,CAC3E",file:"Buttongroup.vue",sourcesContent:["\n.my-buttongroup[data-v-598ca610] {\n\n      background-color: #fff;\n      padding: 8px;\n}\n\n  /* .menuButton {\n      height:50px;\n      padding:0px 35px;\n  } */\n\n  /* .md-body-2 {\n      font-size: 15px;\n      font-weight: 300;\n      letter-spacing: .01em;\n  } */\n.menu-btn[data-v-598ca610] {\n      margin-left: 0px;\n      margin-right: 0px;\n      min-width: 75px;\n      height: 50px;\n      margin: 0px;\n      font-size: 16px;\n      border-radius: 0px;\n    \n      color: #aaaaaa;\n      border-style:solid; border-width: 0px 0px 2px 0px; border-color: rgba(0, 0, 0, 0);\n}\n\n  /* .menu-btn-o {\n      color: #999;\n      height: 50px;\n      min-width: 64px;\n      margin: 0px;\n      border-radius: 0px;\n  } */\n.menu-active[data-v-598ca610] {\n      color: #000;\n      border-style:solid; border-width: 0px 0px 2px 0px; border-color: #000;\n}\n  \n  /* .menu-btn:hover {\n      color: #ffffff;\n      background-color: rgba(99, 99, 99, 0.3)  !important;\n  } */\n\n  /* .menu-btn-o:hover {\n      color: #ffffff;\n  } */\n\n\n  /* .btn--flat {\n      border-radius: 0px;\n  } */\n\n  /* .btn--flat:hover {\n      color: #fff;\n      background-color:black  !important;\n  } */\n\n  /* .md-button-toggle > .md-button:not([disabled]) {\n      color: rgba(0, 0, 0, 0.99);\n  }\n\n  .md-theme-default.md-button-toggle .md-toggle {\n      color: rgba(255, 255, 255, 1);\n      background-color: rgba(0, 0, 0, .77);\n  } */\n\n\n\n"],sourceRoot:""}])},185:function(t,e,n){var r=n(184);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(162)("7902d17d",r,!0,{})},186:function(t,e,n){function r(t){n(185)}var a=n(25)(n(183),n(187),r,"data-v-598ca610",null);t.exports=a.exports},187:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"my-buttongroup"},[n("v-layout",{attrs:{row:"","align-center":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-layout",{attrs:{"justify-center":"","align-content-space-between":"","align-center":""}},t._l(t.items,function(e){return n("v-btn",t._b({key:e.name,staticClass:"menu-btn body-1",class:{"menu-active":e.url===t.active},attrs:{flat:"",small:""},on:{click:function(n){t.change(e.url)}}},"v-btn",{disabled:t.disabled},!1),[t._v("\n                    "+t._s(e.name)+"\n                ")])}))],1)],1)],1)},staticRenderFns:[]}},199:function(t,e,n){t.exports=n.p+"static/img/working1.a0d34a0.jpg"},224:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(11),a=n.n(r),o=n(10),i=n.n(o),s=n(186),c=n.n(s);e.default={name:"projects",components:{buttongroup:c.a},props:[],data:function(){return{text:"center",icon:"justify",toggle_none:null,toggle_one:0,toggle_exclusive:2,toggle_multiple:[0,1,2],workingImage:n(199),items:[{name:"全部",url:"/all"},{name:"完成",url:"/finish"},{name:"未完成",url:"/unfinished"}],active:"",currentPage:1}},computed:{projectList:function(){var t=this.$store.state.project.listData;for(var e in t)1!==t[e].isFinish||!t[e].image[0].picture||(t[e].workingImage=this.$store.state.ossFile.readClient.signatureUrl(t[e].image[0].picture.object,{expires:600,process:"image/resize,w_132"}));return t},projectCount:function(){return this.$store.state.project.listCount},getProjectsLoading:function(){return this.$store.state.project.getProjectsLoading}},methods:{test:function(){console.log(1)},toTask:function(){this.$router.push("/publish/task")},createTime:function(t){var e=(new Date,new Date(1e3*parseInt(t.substr(0,8),16)));return e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate()},change:function(t){console.log(t),this.$router.replace({name:t})},getProjects:function(t){var e=this;return i()(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e.active!==t&&(e.currentPage=1,e.active=t),n.next=3,e.$store.dispatch("getRenderProjects",{pageSize:18,currentPage:e.currentPage,state:t.slice(1)});case 3:case"end":return n.stop()}},n,e)}))()},deleteProject:function(t){var e=this;return i()(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$store.dispatch("deleteProject",t);case 2:return n.next=4,e.$store.dispatch("getProjects",{pageSize:18,currentPage:e.currentPage,state:e.active.slice(1)});case 4:case"end":return n.stop()}},n,e)}))()},editProject:function(t){var e=this;return i()(a.a.mark(function n(){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e.$store.state.router.replace({name:"work",params:{pid:t}});case 1:case"end":return n.stop()}},n,e)}))()}},mounted:function(){var t=this;return i()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("getAllWriteAndReadProjectStsToken",{});case 2:t.getProjects(t.items[0].url);case 3:case"end":return e.stop()}},e,t)}))()},beforeCreate:function(){}}},241:function(t,e,n){e=t.exports=n(161)(!0),e.push([t.i,".projects[data-v-8ab20ca6]{background-color:#f4f4f4;position:absolute;width:100%;min-width:1280px;z-index:3}.container.fluid[data-v-8ab20ca6]{max-width:1320px;overflow:visible}.card__title[data-v-8ab20ca6]{padding:4px 8px 4px 10px}.card__actions[data-v-8ab20ca6]{border-style:solid;border-width:1px 0 0;border-color:#ddd;padding:4px 8px 4px 6px}.my-btn[data-v-8ab20ca6]{margin-left:0;margin-right:0;min-width:0}.my-a[data-v-8ab20ca6]{text-decoration:none}","",{version:3,sources:["E:/program/tujingwang1/program/src/components/publish/Works.vue"],names:[],mappings:"AACA,2BAGI,yBAAqC,AACrC,kBAAmB,AAAC,WAAY,AAAC,iBAAkB,AAAC,SAAU,CACjE,AACD,kCACI,iBAAkB,AAClB,gBAAkB,CACrB,AACD,8BACI,wBAA0B,CAC7B,AACD,gCACI,mBAAoB,AACpB,qBAA8B,AAC9B,kBAAmB,AACnB,uBAAyB,CAC5B,AACD,yBACI,cAAiB,AACjB,eAAkB,AAClB,WAAe,CAClB,AACD,uBACI,oBAAsB,CACzB",file:"Works.vue",sourcesContent:["\n.projects[data-v-8ab20ca6] {\n\n    min-width: 1280px;\n    background-color: rgb(244, 244, 244);\n    position: absolute; width: 100%; min-width: 1280px; z-index:3;\n}\n.container.fluid[data-v-8ab20ca6] {\n    max-width: 1320px;\n    overflow: visible;\n}\n.card__title[data-v-8ab20ca6] {\n    padding: 4px 8px 4px 10px;\n}\n.card__actions[data-v-8ab20ca6] {\n    border-style: solid;\n    border-width: 1px 0px 0px 0px;\n    border-color: #ddd;\n    padding: 4px 8px 4px 6px;\n}\n.my-btn[data-v-8ab20ca6] {\n    margin-left: 0px;\n    margin-right: 0px;\n    min-width: 0px;\n}\n.my-a[data-v-8ab20ca6] {\n    text-decoration: none;\n}\n"],sourceRoot:""}])},263:function(t,e,n){var r=n(241);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(162)("7c499579",r,!0,{})},291:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"projects"},[n("div",{staticStyle:{"background-color":"#fff"}},[n("v-layout",{staticStyle:{height:"100%"},attrs:{"align-center":""}},[n("v-flex",{attrs:{xs1:""}},[n("v-btn",{attrs:{flat:"",icon:"",color:"yellow"},on:{click:function(e){t.change("/")}}},[n("v-icon",[t._v("arrow_back")])],1)],1),t._v(" "),n("v-layout",{attrs:{"justify-center":""}},[n("span",{staticClass:"subheading"},[t._v("我的任务")])]),t._v(" "),n("v-flex",{attrs:{xs1:""}})],1)],1),t._v(" "),n("div",{staticStyle:{overflow:"auto"}},[n("v-container",{attrs:{"grid-list-lg":"",fluid:""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{staticClass:"py-2",attrs:{xs12:""}},[n("v-card",{attrs:{flat:""}},[n("v-card-title",{staticStyle:{padding:"0px 16px"}},[n("buttongroup",{attrs:{title:"",items:t.items,active:t.active,disabled:this.$store.state.appLoading},on:{change:t.getProjects}})],1)],1)],1),t._v(" "),t._l(t.projectList,function(e){return n("v-flex",{key:e._id,attrs:{xs2:""}},[n("v-card",{attrs:{hover:"",flat:""}},[n("v-card-media",{staticClass:"white--text",attrs:{height:"200px",src:1!==e.isFinish||!e.image[0].picture?t.workingImage:e.workingImage},on:{click:function(n){t.editProject(e._id)}}},[n("v-container",{attrs:{"fill-height":"",fluid:""}},[n("v-layout",{attrs:{"fill-height":""}},[n("v-flex",{attrs:{xs12:""}},[n("span",{staticClass:"title"},[t._v(t._s(e.name))]),n("br"),t._v(" "),e.isFinish?n("span",{staticClass:"body-2 green--text"},[t._v("完成")]):n("span",{staticClass:"body-2 "},[t._v("制作中")])])],1)],1)],1)],1)],1)}),t._v(" "),t.projectCount>1?n("v-flex",{staticClass:"py-2",attrs:{xs12:""}},[n("v-card",[n("v-card-title",{staticStyle:{padding:"0px 16px"}},[n("div",{staticClass:"text-xs-center",staticStyle:{width:"100%"}},[n("v-pagination",t._b({attrs:{length:t.projectCount,"total-visible":7},on:{input:function(e){t.getProjects(t.active)}},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}},"v-pagination",{disabled:t.getProjectsLoading},!1))],1)])],1)],1):t._e()],2)],1)],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=4.015ee4ab5b8ac96f9743.js.map