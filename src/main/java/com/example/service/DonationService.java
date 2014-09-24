package com.example.service;

import java.util.List;

import com.example.model.Donors;

public interface DonationService {
	
	public List<Donors> getRecentDonors(int campaignId,int count);

}
