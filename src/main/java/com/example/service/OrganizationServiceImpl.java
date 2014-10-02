package com.example.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.example.model.Organization;

@Service
public class OrganizationServiceImpl implements OrganizationService {

	@PersistenceContext
	EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public Organization getOrgDetails(int id) {

		Query query = em.createQuery("SELECT o FROM Organization o where o.id = :id");
		query.setParameter("id", id);
		List<Organization> orgList = query.getResultList();
		if(orgList!=null && !(orgList.isEmpty())){
			return orgList.get(0);
		}

		return null;
	}

}


