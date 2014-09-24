package com.example.service;

import com.example.model.UserAccount;

public interface UserService {
	
	/*
	 * Gets the user Account details based on the user account id
	 */
	public UserAccount getUserAccountDetails(Integer id);

}
