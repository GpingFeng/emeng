package com.huiming.emeng.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.huiming.emeng.annotation.MappingDescription;
import com.huiming.emeng.dto.Pager;
import com.huiming.emeng.model.Teacher;
import com.huiming.emeng.service.TeacherService;

@Controller
@RequestMapping("/teacher")
public class TeacherController {


	private String SUCCESS = "操作成功";
	private String FAIL = "操作失败";
	
	@Autowired
	private TeacherService teacherService;

	@RequestMapping("/getAllTeacherByPage")
	@MappingDescription("获取名师信息")
	@ResponseBody
	public Pager<Teacher> getAllTeacher(Integer currentPage, Integer pageSize) {
		return teacherService.selectAllTeacher(currentPage,pageSize);
	}

	@RequestMapping("/addTeacher")
	@MappingDescription("添加名师")
	@ResponseBody
	public String addTeacher(Teacher teacher) {
		if(teacherService.insertTeacher(teacher)!=0){
			return SUCCESS;
		}else{
			return FAIL;
		}
	}

	@RequestMapping("/updateTeacher")
	@MappingDescription("更新名师信息")
	@ResponseBody
	public String updateTeacher(Teacher teacher) {
		if(teacherService.updateTeacher(teacher)!=0){
			return SUCCESS;
		}else{
			return FAIL;
		}
	}

	@RequestMapping("/deleteTeacher")
	@MappingDescription("删除名师")
	@ResponseBody
	public String deleteTeacher(Integer id) {
		if(teacherService.deleteByPrimaryKey(id)!=0){
			return SUCCESS;
		}else{
			return FAIL;
		}
	}

	@RequestMapping("/selectAllSelective")
	@MappingDescription("分页查找名师信息")
	@ResponseBody
	public Pager<Teacher> selectAllSelective(Integer currentPage, Integer pageSize, Teacher teacher) {
		return teacherService.selectAllSelective(teacher, currentPage, pageSize);
	}

	@RequestMapping("/selectByPrimaryKey")
	@MappingDescription("根据id查找名师信息")
	@ResponseBody
	public Teacher selectByPrimaryKey(Teacher teacher) {
		return teacherService.selectByPrimaryKey(teacher);
	}
}
