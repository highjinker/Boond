package com.example.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Donors {
	
	@Id
    @GeneratedValue
	private Integer id;
	private Integer campaignid;
	private Integer userAccountId;
	private double donationAmount;
	private boolean isDonationAnonymous;   // User may want to be an anonymous donor.
	private boolean isDonationCompleted;  //After the bank Traction is completed
	private Date createdDate;  
	private Date lastUpdatedDate;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCampaignid() {
		return campaignid;
	}
	public void setCampaignid(Integer campaignid) {
		this.campaignid = campaignid;
	}
	public Integer getUserAccountId() {
		return userAccountId;
	}
	public void setUserAccountId(Integer userAccountId) {
		this.userAccountId = userAccountId;
	}
	public double getDonationAmount() {
		return donationAmount;
	}
	public void setDonationAmount(double donationAmount) {
		this.donationAmount = donationAmount;
	}
	public boolean isDonationAnonymous() {
		return isDonationAnonymous;
	}
	public void setDonationAnonymous(boolean isDonationAnonymous) {
		this.isDonationAnonymous = isDonationAnonymous;
	}
	public boolean isDonationCompleted() {
		return isDonationCompleted;
	}
	public void setDonationCompleted(boolean isDonationCompleted) {
		this.isDonationCompleted = isDonationCompleted;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getLastUpdatedDate() {
		return lastUpdatedDate;
	}
	public void setLastUpdatedDate(Date lastUpdatedDate) {
		this.lastUpdatedDate = lastUpdatedDate;
	}
	

}
