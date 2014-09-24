package com.example.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaQuery;

import org.springframework.stereotype.Service;

import com.example.model.Campaign;

@Service
public class CampaignServiceImpl implements CampaignService {
	
	@PersistenceContext
    EntityManager em;

	@Override
	public List<Campaign> listCampaign() {
		
		CriteriaQuery<Campaign> c = em.getCriteriaBuilder().createQuery(Campaign.class);
        c.from(Campaign.class);
        return em.createQuery(c).getResultList();
	}

	@Override
	public Campaign getCampaign(String name) {
		Query query = em.createQuery("SELECT c FROM Campaign c where c.key = 'name' and c.value = :value");
		query.setParameter("value", name);
		List<Campaign> list = query.getResultList();
		System.out.println(list.get(0).getValue());
		if(list!=null && !list.isEmpty()){
			return list.get(0);
		}
		return null;
	}

}
