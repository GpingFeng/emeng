package com.huiming.emeng.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.huiming.emeng.annotation.MappingDescription;
import com.huiming.emeng.serviceImpl.FileuploadServiceImpl;

@Controller
public class FileuploadController {
	
	@Autowired
	private FileuploadServiceImpl fileuplaodservice;
	
	@Autowired
	private FileuploadServiceImpl fileuploadServiceImpl;
	/**
	 * 鐓х墖鏂囦欢涓婁紶
	 * @param request
	 * @param description
	 * @param file
	 * @return
	 * @throws Exception
	 */
   @SuppressWarnings("rawtypes")
   @RequestMapping("picupload")
   @MappingDescription("鏂囦欢涓婁紶鎺ュ彛")
   @ResponseBody
   public Object upload(HttpServletRequest request,
		   @RequestParam("files") MultipartFile[] files)throws Exception
   {
	   
	    List src = new ArrayList();

	     src = fileuplaodservice.upload(request, files);
	     Map<Object, Object>  map = new HashMap<>();
	     map.put("respondate", src);
	     map.put("code", "0");
	     map.put("msg", "涓婁紶鎴愬姛");
	     Object object = JSON.toJSON(src);
	   return object;
   }
	/**
	 * 鏂囦欢涓嬭浇
	 * @param request
	 * @param filename
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("download1")
	public ResponseEntity<byte[]> download(HttpServletRequest request,
			@RequestParam("filename") String filename,
			Model model)throws Exception
	{
		//涓嬭浇鏂囦欢璺緞
		String path = request.getServletContext().getRealPath("/images/");
		File file = new File(path+File.separator+filename);
		HttpHeaders headers = new HttpHeaders();
		//涓嬭浇鏄剧ず鏂囦欢鐨勫ご鏂囦欢鍚嶏紝瑙ｅ喅涓枃涔辩爜闂
		String downfileName = new String(filename.getBytes("UTF-8"),"iso-8859-1");
		//閫氱煡娴忚鍣ㄤ竴attachment鐨勶紙涓嬭浇鏂瑰紡锛夋墦寮�
		headers.setContentDispositionFormData("attachment", downfileName);
		//application/octet-stream浜岃繘鍒跺叚鏁版嵁锛堟渶甯歌鐨勬枃浠朵笅杞�)
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		//201 HttpStatus.CREATED
		
		 return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),    
	                headers, HttpStatus.CREATED);
	}
	
	@RequestMapping("meetingupload")
	@MappingDescription("娣诲姞浼氳闄勪欢")
	@ResponseBody
	public Object insert(HttpServletRequest request,
			@RequestParam("annex1") MultipartFile annex) throws Exception{
				
		Map<String, String> respondate=new HashMap<>();
		
		if(!annex.isEmpty()){
			String path = request.getServletContext().getRealPath("/meetings/");
			String fileName=annex.getOriginalFilename();
			File filepath = new File(path, fileName);
			if(!filepath.getParentFile().exists()){
				   filepath.getParentFile().mkdirs();
			   }
			@SuppressWarnings("deprecation")
			long str2 = Date.parse((new Date()).toString());
			String[] fStrings = fileName.split("\\.");   
			   String str = fStrings[0]+str2+"."+fStrings[1];
			   
			annex.transferTo(new File(path+File.separator+str)); 
			
			respondate.put("annex","http://localhost:8080/emeng/meetings/"+str);
		}
		
		Object object = JSON.toJSON(respondate);
		return object;
	}
	
	   @RequestMapping("addVideoLink")
	   @MappingDescription("瑙嗛涓婁紶")
	   @ResponseBody
	   public Object addVideoLink(HttpServletRequest request,
			   @RequestParam("linklink") MultipartFile link)throws Exception
	   {   
		   if(!link.isEmpty()){
		       Map<String, String> respondate=new HashMap<>();
			   respondate.put("linkName",fileuploadServiceImpl.addVideoLink(request, link).get("linkName"));
			   respondate.put("link",fileuploadServiceImpl.addVideoLink(request, link).get("link"));
		       return respondate;
		   }
		    return null;
		  

	   }

	   @RequestMapping("addpic")
	   @MappingDescription("瑙嗛鐓х墖涓婁紶")
	   @ResponseBody
	   public Object addVideopic(HttpServletRequest request,
			   @RequestParam("picpic") MultipartFile pic)throws Exception
	   {   
		   if(!pic.isEmpty()){
			 Map< String, String> respondate = new HashMap<>();
			   respondate.put("pic",fileuploadServiceImpl.addVideoPic(request, pic));
			   return respondate;
		   }
		  return null;

	   }
	
	
}
