package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.model.UserAccount;
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
			output = user.getFirstName() + " " + user.getLastName() + " " + user.getEmailId() + " " + user.getLastUpdatedDate();
		}

		map.addAttribute("message", output);
		return user;
	}



}
