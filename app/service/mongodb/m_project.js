const mongoose = require("./mongodb.js");
const schema = mongoose.Schema;

let project = {
    name: { type: String },      //项目名
    publisher: { type: String }, //发布人
    service: { type: String },   //客服
    manager: { type: String },   //项目管理人
    referenceFile: [            //参考文件
        { name:{ type: String }, url:{ type: String } }
    ],
    projectFile: [              //项目文件
        { name:{ type: String }, url:{ type: String } }
    ],
    image: [
        {
            state: { type: Number, default: 0 },
            style: { type: String },    //设计风格
            type: { type: Number },     //设计类型
            space: { type: String },    //设计空间
            imageType: { type: Number },//图片类型
            price: { type: Number },    //价格
            murl: { type: String },     //模型地址
            iurl: { type: String },     //图片地址
            productionsGroup: [
                { workType: { type: String}, userId: { type: String} }
            ]
        }
    ]
}

let projectSchema = new schema(project);
let Project = mongoose.model("Project",projectSchema);

function ProejctClass() {

    this.name = 'project_db';

}