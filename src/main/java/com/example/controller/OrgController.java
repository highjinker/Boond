package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.model.Organization;
import com.example.service.OrganizationService;


@Controller
@RequestMapping("/org")
public class OrgController {

	@Autowired
	private OrganizationService orgService;

	@RequestMapping("/{id} ")
	public @ResponseBody Organization getOrgDetails(@PathVariable("id") int id, ModelMap map) {
		Organization org = orgService.getOrgDetails(id);
		String output;
		if(org == null){
			output = "No organization found with orgId: "+ id;
			map.addAttribute("message", output);
			
		}
		return org;

	}
}
