var ProjectClass = require("./m_project.js");
ProjectClass = new ProjectClass();
var Project = ProjectClass.getProject();

//file
const fs = require('../file_modules/file_tool.js');

//创建项目
exports.m_createProject= function(data, fu){
	ProjectClass.createProject(data)
	.then((res)=> {
		fu(res);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});

}

//查询今天项目
exports.m_readTodayProject = function(data,fu){

}

//项目查询
exports.m_queryProject = (data, fu)=> {
	let whereStr = {};
	let result = {
		projects:{},
		count:0,
	};
	if(data.imageState){
		if(data.imageState === "结算"){
			whereStr = {"child_p.image.state": {$gte: 4 }};
		}
		if(data.imageState === "未开始"){
			whereStr["child_p.image.state"] = 0;
		}
		if(data.imageState === "模型完成"){
			whereStr["child_p.image.state"] = 1;
		}
		if(data.imageState === "小图完成"){
			whereStr["child_p.image.state"] = 2;
		}
		if(data.imageState === "渲染完成"){
			whereStr = {"child_p.image.state": {$gte: 3 }};
		}
	}
	if(data.id){
		whereStr._id = data.id;
	}
	if(data.pname != ""){
		whereStr.pname = {$regex: data.pname};
	}
	if(data.customer != ""){
		whereStr.customer = {$regex: data.customer};
	}
	if(data.mname != ""){
		whereStr["child_p.mname"] = data.mname;
	}
	if(data.rname != ""){
		whereStr["child_p.rname"] = data.rname;
	}
	if(data.service != ""){
		whereStr.service = {$regex: data.service};
	}
	if(data.time[0] != null){
		whereStr.cpt = {};
		whereStr.cpt["$gte"] = data.time[0];
		whereStr.cpt["$lte"] = data.time[1];
	}
	console.log(whereStr);
	ProjectClass.findProjectData(whereStr, 16, data.currentPage, {'cpt':-1})
	.then((res)=> {
		result.projects = res;
		return ProjectClass.projectCount(whereStr);
	})
	.then((res)=> {
		result.count = Math.ceil(res/16);
		fu(result);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});
}

//根据id查询项目
exports.m_queryId = (id, fu)=> {
	ProjectClass.findParentProject(id)
	.then((res)=> {
		fu(res);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	})
}

//主项目数据更新
exports.m_updateParentProject = (data,fu)=> {
	ProjectClass.findParentProject(data._id)
	.then((res)=>{
		return ProjectClass.updateParentProject(data, res);
	})
	.then((res)=>{
		fu(res);
	})
	.catch((err)=>{
		console.log(err);
		fu({err: -1, message: err});
	});
}

//子项目数据更新
exports.m_updateChildProject = (data, fu)=> {
	ProjectClass.findParentProject(data.parentId)
	.then((res)=> {
		return ProjectClass.updateChildProject(data.childData, res);
	})
	.then((res)=> {
		fu(res);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});
}

//删除child_p子项目
exports.m_deleteChildProject = (data,fu)=> {
	//用于保存修改后的数据文档
	let result = {};
	//需要删除文件的路径
	let filePath = './public/projects/'+ data.parentId +'/'+ data.childId;

	ProjectClass.findParentProject(data.parentId)
	.then((res)=> {
		return ProjectClass.deleteChildProject(data.childId,res);
	})
	.then((res)=> {
		result = res;
		return fs.deleteAllFile(filePath);
	})
	.then(()=> {
		fu(result); 
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1,message: err}); 
	});
}

//添加child_p子项目
exports.m_addChildProject = (data, fu)=> {
	ProjectClass.findParentProject(data.parentId)
	.then((res)=> {
		return ProjectClass.addChildProject(data.childData, res);
	})
	.then((res)=> {
		fu(res); 
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err}); 
	});
}

//删除referent文档以及文件
exports.m_deleteRrferenceFile = (data, fu)=> {
	//用于保存修改后的数据文档
	let result = {};
	//需要删除文件的路径
	let filePath = './public/projects/'+ data.parentId +'/reference/'+ data.name;

	ProjectClass.findParentProject(data.parentId)
	.then((res)=> {
		return ProjectClass.deleteReferenceFile(data.childId, res);
	})
	.then((res)=> {
		result = res;
		return fs.fileDelete(filePath);
	})
	.then(()=> {
		fu(result);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});
}

//删除child_d.files文档以及文件
exports.m_deleteChild_pFile = (data, fu)=> {
	//需要删除文件的路径
	let filePath = './public/projects/'+ data.projectId +'/'+ data.child_pId+'/'+ data.fileType +'/'+ data.name;

	ProjectClass.findParentProject(data.projectId)
	.then((res)=> {
		return ProjectClass.deleteChild_pFile(data.child_pId, data.filesId, data.fileType, res);
	})
	.then((res)=> {
		return fs.fileDelete(filePath);
	})
	.then(()=> {
		fu({ok: 1});
	})
	.catch((err)=>{
		console.log(err);
		fu({err: -1, message: err});
	});
}

//image小图完成
exports.m_initialImage = (data, fu)=> {
	ProjectClass.findParentProject(data.parentId)
	.then((res)=> {
		return ProjectClass.initialImage(data.child_pId, data.index, res);
	})
	.then((res)=> {
		fu(res);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});

}

//image渲染完成
exports.m_successImage = (data, fu)=> {
	ProjectClass.findParentProject(data.parentId)
	.then((res)=> {
		return ProjectClass.successImage(data.child_pId, data.index, res);
	})
	.then((res)=> {
		fu(res);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});

}

//image项目结算
exports.m_settlementImage = (data, fu)=> {
	ProjectClass.findParentProject(data.parentId)
	.then((res)=> {
		return ProjectClass.settlementImage(data.child_pId, data.index, res, data.settlement);
	})
	.then((res)=> {
		fu(res);
	})
	.catch((err)=> {
		console.log(err);
		fu({err: -1, message: err});
	});
}

//////////////////////////////////////////
///
///
///财务接口
///
///
//////////////////////////////////////////