package com.example.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.example.model.Donors;

@Service
public class DonationServiceImpl implements DonationService {

	@PersistenceContext
    EntityManager em;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Donors> getRecentDonors(int campaignId, int count) {
		if(campaignId>0){
			Query query = em.createQuery("SELECT d FROM Donors d where d.campaignid = :campaignId "
					+ "and d.isDonationAnonymous = false "
					+ "and d.isDonationCompleted = true "
					+ "order by d.lastUpdatedDate DESC");
			query.setParameter("campaignId", campaignId);
			query.setMaxResults(count);
			List<Donors> donorList = query.getResultList();
			if(donorList!=null && !(donorList.isEmpty())){
				return donorList;
			}
		}
		return null;
	}

}