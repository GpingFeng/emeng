package com.huiming.emeng.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.huiming.emeng.common.CustomException;
import com.huiming.emeng.common.CustomException.UnauthorizedError;
import com.huiming.emeng.mapper.LessonMapper;
import com.huiming.emeng.model.Navigation;
import com.huiming.emeng.service.NavigationService;

/**
 * ����
 * 
 * @author Jack
 * @date 2017��5��15��
 */
@Controller
public class TestContoller {

	@Autowired
	private LessonMapper mapper;

	@Autowired
	private NavigationService navigationService;
	
	/**
	 * �������ݿ��������
	 * @return
	 */
	@RequestMapping("/test")
	
	public String test(ModelMap map) {

		//List<Navigation> navigationList = navigationService.selectAllNavigation();
		List<Navigation> navigationList = new ArrayList<Navigation>(); 
//		for (Navigation navigation : navigationList){
//			System.out.println(navigation);
//		}
		for(int i=0;i<5;i++){
			navigationList.add(new Navigation());
		}
		map.put("navigationList", navigationList);
//		return "success";
		return "WEB-INF/thinkEM/indexEM.html";
	}
	
	
	/**
	 * �����Զ����쳣
	 */
	@RequestMapping("testException")
	public String testException() {
		throw CustomException.genException(UnauthorizedError.class, "������Ϣ");
	}
	
	@RequestMapping("/test1")
	@ResponseBody
	public String test1() {
		return "fileupload";
	}
	
	
	@RequestMapping("/manageEmeng")
	public String manageEmeng() {
		return "indexEM";
	}
}
