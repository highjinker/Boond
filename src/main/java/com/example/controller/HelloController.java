package com.example.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.service.CampaignService;

@Controller
@RequestMapping("/test")
public class HelloController{
	
	@Autowired
    private CampaignService campaignService;
 
   @RequestMapping("/")
   public String printHello(ModelMap model) {
      model.addAttribute("message", "Hello Spring MVC Framework!");

      return "test";
   }
   
   @RequestMapping(value = "/listcampaign", method = RequestMethod.GET)
   public String listCampaign(Map<String, Object> map) {
	   System.out.println(campaignService.listCampaign().get(0));

	   map.put("campaignList", campaignService.listCampaign());

	   return "test";
   }
   
   @RequestMapping("/get/{name}")
   public String deletePerson(@PathVariable("name") String name) {

       System.out.println(campaignService.getCampaign(name));

       return "test";
   }

}