package com.example.service;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.UserAccount;
import com.example.model.UserAccountMetadata;

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

	@Transactional
	@Override
	public UserAccount addUserAccountIfNotPresent(UserAccount ua) throws Exception{
		if(ua == null){
			String errMsg = "Null user object";
			System.out.println(errMsg);
			throw new Exception(errMsg);
		}
		UserAccount userInDB = getUserAccountByUserIdentifier(ua.getUserIdentifier());
		if( userInDB != null){
			String errMsg = "User Already exists";
			System.out.println(errMsg);
			throw new Exception(errMsg);
		}
		try {
			ua = em.merge(ua);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return ua;
	}

	public UserAccount getUserAccountByUserIdentifier(String userIdentifier) {
		if(userIdentifier != null){
			Query query = em.createQuery("SELECT u FROM UserAccount u where u.userIdentifier = :userIdentifier");
			query.setParameter("userIdentifier", userIdentifier);
			List<UserAccount> userAccountList = query.getResultList();
			if(userAccountList!=null && !(userAccountList.isEmpty())){
				return userAccountList.get(0);
			}
		}
		return null;
	}

	@Override
	public void addUserMetadataIfNotPresent(List<UserAccountMetadata> metadataList) {
		for(UserAccountMetadata uam: metadataList){
			try{
				em.persist(uam);
			} catch(EntityExistsException e){
				System.out.println("Object already exists. Not adding");
			}
		}
	}
}
