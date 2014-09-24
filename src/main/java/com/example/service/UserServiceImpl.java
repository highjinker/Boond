package com.example.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.example.model.UserAccount;

@Service
public class UserServiceImpl implements UserService {
	
	@PersistenceContext
    EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public UserAccount getUserAccountDetails(Integer id) {
		if(id!=null){
			Query query = em.createQuery("SELECT u FROM UserAccount u where u.id = :id");
			query.setParameter("id", id);
			List<UserAccount> userAccountList = query.getResultList();
			if(userAccountList!=null && !(userAccountList.isEmpty())){
				return userAccountList.get(0);
			}
		}
		return null;
	}

}
