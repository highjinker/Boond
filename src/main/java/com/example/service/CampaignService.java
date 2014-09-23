package com.example.service;

import java.util.List;

import com.example.model.Campaign;

public interface CampaignService {
	
	 public List<Campaign> listCampaign();
	 
	 public Campaign getCampaign(String name);

}
