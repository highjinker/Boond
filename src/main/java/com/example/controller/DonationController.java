package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.model.Donors;
import com.example.service.DonationService;

@Controller
@RequestMapping("/karma")
public class DonationController {
	
	@Autowired
	private DonationService donationService;
	
	@RequestMapping(value="/recentdonors", method=RequestMethod.GET)
	public String getRecentDonors(@RequestParam("campaignId")int campaignId, @RequestParam("count")int count, ModelMap model){
	List<Donors> donorList = donationService.getRecentDonors(campaignId, count);
	String output;
	if(donorList == null || donorList.isEmpty()){
		output = "No donors found with campaignId: "+ campaignId;
	}else{
		output = ""+donorList.size();
	}
	
	model.put("message", output);
	return "test";
	}

}
