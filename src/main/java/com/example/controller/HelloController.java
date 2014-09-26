package com.example.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.model.Campaign;
import com.example.service.CampaignService;

@Controller
@RequestMapping("/campaign")
public class HelloController{

	@Autowired
	private CampaignService campaignService;

	@RequestMapping("/")
	public String printHello(ModelMap model) {
		model.addAttribute("message", "Hello Spring MVC Framework!");

		return "test";
	}

	@RequestMapping(value = "/listcampaign", method = RequestMethod.GET)
	public @ResponseBody List<Campaign> listCampaign(Map<String, Object> map) {
		
		map.put("campaignList", campaignService.listCampaign());

		return campaignService.listCampaign();
	}

	@RequestMapping("/{name}")
	public  @ResponseBody  Campaign getCampaign(@PathVariable("name") String name) {

		System.out.println(campaignService.getCampaign(name));

		return campaignService.getCampaign(name);
	}
	
	@RequestMapping("/get/{id}")
	public  @ResponseBody  List<Campaign> getCampaignDetails(@PathVariable("id") Integer id) {
		return campaignService.getCampaignDetails(id);
	}
	
	@RequestMapping("/donationRaised/{id}")
	public  @ResponseBody Campaign  getDonationRaised(@PathVariable("id") Integer id) {
		return campaignService.getDonationRaised(id);
	}


}