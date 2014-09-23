package com.example.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Campaign {
	
	@Id
    @GeneratedValue
    private Integer id;
	
	private Integer campaignid;
	
	private String key;
	
	private String value;

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

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
