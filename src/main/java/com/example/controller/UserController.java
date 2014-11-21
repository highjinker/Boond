package com.example.controller;

import java.util.List;

import org.jboss.netty.handler.codec.http.HttpResponseStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.model.ServiceResponse;
import com.example.model.UserAccount;
import com.example.model.UserAccountMetadata;
import com.example.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping("/{id} ")
	public @ResponseBody UserAccount getUser(@PathVariable("id") Integer id, ModelMap map) {
		UserAccount user = userService.getUserAccountDetails(id);
		String output;
		if(user == null){
			output = "No User found with userId: "+ id;
		}else{
			output = user.getFirstName() + " " + user.getLastName() + " " + user.getUserIdentifier() + " " + user.getLastUpdatedDate();
		}
		map.addAttribute("message", output);
		return user;
	}
	
	@RequestMapping(value="/addUser", consumes="application/json", produces="application/json")
	public @ResponseBody ServiceResponse addUser(@RequestBody UserAccount ua){
		System.out.println("Got request" + ua);
		ServiceResponse serviceResponse = new ServiceResponse();
		try{
			ua = userService.addUserAccountIfNotPresent(ua);
			serviceResponse.setStatus(HttpResponseStatus.OK.getCode());
			serviceResponse.setResponse(ua);
		} catch (Exception e) {
			e.printStackTrace();
			serviceResponse.setStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR.getCode());
			serviceResponse.setMessage(e.getMessage());
			serviceResponse.setResponse(ua);
		}
		System.out.println("processsed request" + ua);
		return serviceResponse;
	}
	
	@RequestMapping(value="/addUserMetadata", consumes="application/json")
	public void ServiceResponse(@RequestBody List<UserAccountMetadata> uam) {
		System.out.println("Got request" + uam);
		userService.addUserMetadataIfNotPresent(uam);
		System.out.println("processsed request" + uam);
	}
}
