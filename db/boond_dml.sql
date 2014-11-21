insert into userAccount (id, firstName,lastName,emailId,createdDate,lastUpdatedDate) values(1, 'Ankur','Bansal','aankur.bansal@gmail.com',now(),now());
insert into donors (id,campaignid,userAccountId,donationAmount,isDonationAnonymous,isDonationCompleted,createdDate,lastUpdatedDate) values(1,1,1,99,false,true,now(),now());
insert into donors (id,campaignid,userAccountId,donationAmount,isDonationAnonymous,isDonationCompleted,createdDate,lastUpdatedDate) values(2,1,2,79,false,true,now(),now());

SELECT * FROM Donors d, UserAccount a where d.campaignid = 1 and d.isDonationAnonymous = false and d.isDonationCompleted = true and d.userAccountId = a.id order by d.lastUpdatedDate DESC

SELECT * FROM Campaign c where c.campaignid = 1 and c.key = donationRaised;

insert into Campaign (id, campaignid, key, value) values(3, 1, 'donationRaised', 12.23);

insert into Campaign (id, campaignid, key, value) values(3, 1, 'description', 'Boond is a campaign launched to provide water in areas that lack it.');