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
userIdentifier VARCHAR (255) UNIQUE NOT NULL,
createdDate TIMESTAMP DEFAULT current_timestamp,
lastUpdatedDate TIMESTAMP DEFAULT current_timestamp
);

CREATE UNIQUE INDEX EMAIL_ID_USER_ACC on userAccount (emailId);

-- User Account Metadata Information like fbhandle, twitterHandle, Images, About , etc 
CREATE TABLE userAccountMetadata(
id serial PRIMARY KEY,
userId integer NOT NULL,
key VARCHAR (255) NOT NULL,
value VARCHAR (10000) NOT NULL,
CONSTRAINT keyIDPair UNIQUE (userId, key)
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

CREATE TABLE organization(

id serial PRIMARY KEY,

orgId integer NOT NULL,

key VARCHAR (255) UNIQUE NOT NULL,

value VARCHAR (10000) UNIQUE NOT NULL

);




















CREATE TABLE emp (
	id serial PRIMARY KEY,
    empname text default 'A',
    creation_date timestamp not null default current_timestamp,
    last_date timestamp,
    last_user text
);

CREATE FUNCTION created_time_stamp() RETURNS trigger AS $created_time_stamp$
    BEGIN
    	NEW.createdDate := current_timestamp;
        NEW.lastUpdatedDate := current_timestamp;
        RETURN NEW;
    END;
$created_time_stamp$ LANGUAGE plpgsql;

CREATE FUNCTION updated_time_stamp() RETURNS trigger AS $updated_time_stamp$
    BEGIN
        NEW.lastUpdatedDate := current_timestamp;
        RETURN NEW;
    END;
$updated_time_stamp$ LANGUAGE plpgsql;

CREATE TRIGGER create_time_stamp_userAccount BEFORE INSERT ON userAccount
    FOR EACH ROW EXECUTE PROCEDURE created_time_stamp();
    
CREATE TRIGGER update_time_stamp_userAccount BEFORE UPDATE ON userAccount
    FOR EACH ROW EXECUTE PROCEDURE updated_time_stamp();