CREATE TABLE campaign(

id serial PRIMARY KEY,

campaignid integer NOT NULL,

key VARCHAR (255) UNIQUE NOT NULL,

value VARCHAR (10000) UNIQUE NOT NULL

);

-- UserAccountDetails Table

CREATE TABLE userAccount(
id serial PRIMARY KEY,
firstName VARCHAR (255) NOT NULL,
lastName VARCHAR (255) NOT NULL,
emailId VARCHAR (255) UNIQUE NOT NULL,
createdDate TIMESTAMP NOT NULL,
lastUpdatedDate TIMESTAMP NOT NULL
);

-- User Account Metadata Information like fbhandle, twitterHandle, Images, About , etc 
CREATE TABLE userAcountMetadata(
id serial PRIMARY KEY,
userAccountId integer NOT NULL,
key VARCHAR (255) UNIQUE NOT NULL,
value VARCHAR (10000) UNIQUE NOT NULL
);

--	Donation Details
CREATE TABLE donors(
id serial PRIMARY KEY,
campaignid integer NOT NULL,
userAccountId integer NOT NULL,
donationAmount float NOT NULL,
isDonationAnonymous boolean NOT NULL,
isDonationCompleted boolean NOT NULL,
createdDate TIMESTAMP NOT NULL,
lastUpdatedDate TIMESTAMP NOT NULL
);