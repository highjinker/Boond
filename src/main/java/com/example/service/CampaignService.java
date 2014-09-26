package com.example.service;

import java.util.List;

import com.example.model.Campaign;

public interface CampaignService {
	
	 public List<Campaign> listCampaign();
	 
	 public Campaign getCampaign(String name);
	 
	 /*
	  * Get all the campaign details based on campaign id
	  */
	 public List<Campaign> getCampaignDetails(Integer id);
	 
	 /*
	  * Get the donation raised so far for the campaign
	  */	 
	 public Campaign getDonationRaised(Integer id);

}
