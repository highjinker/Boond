package com.example.service;

import java.util.List;

import com.example.model.UserAccount;
import com.example.model.UserAccountMetadata;

public interface UserService {
	
	/*
	 * Gets the user Account details based on the user account id
	 */
	public UserAccount getUserAccountDetails(Integer id);

	public UserAccount addUserAccountIfNotPresent(UserAccount ua) throws Exception;
	
	public void addUserMetadataIfNotPresent(List<UserAccountMetadata> uam);

}
