package com.example.service;

import java.util.List;

import com.example.model.Donors;

public interface DonationService {
	
	public List<Object[]> getRecentDonors(int campaignId,int count);

}
