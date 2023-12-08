/* Carlos Arévalo, Nov/2021
   David Ruiz, Dic/2021
   Miguel Bermudo & Agustín Borrego, Mar/2022
*/ 
-- si no funciona eliminad estas 2 primera lineas
CREATE OR REPLACE DATABASE IISSI_Friends;
USE IISSI_Friends;
-- Creación esquema
DROP TABLE IF EXISTS UserHobbies;
DROP TABLE IF EXISTS Hobbies;
DROP TABLE IF EXISTS Pictures;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS PostCodes;
DROP TABLE IF EXISTS Municipalities;
DROP TABLE IF EXISTS Provinces;
DROP TABLE If EXISTS Links;
DROP TABLE If EXISTS PreferenceCard;
DROP TABLE If EXISTS CardHobbies;
DROP TABLE If EXISTS Chats;
DROP TABLE If EXISTS  messages;

-- Creación tablas

-- Provincias
CREATE TABLE Provinces (
  	provinceId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	provinceName VARCHAR(64) NOT NULL /* Obligatorio */
);


-- Municipios de una provincia
CREATE TABLE Municipalities (
	municipalityId				INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  	provinceId   				INT NOT NULL, /* Obligatorio */
  	municipalityName  			VARCHAR(64) NOT NULL, /* Obligatorio */
  	FOREIGN KEY(provinceId) 	REFERENCES Provinces(provinceId)
);

-- Codigo postal
CREATE TABLE PostCodes (
	postcodeId		INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	municipalityId 	INT NOT NULL, /* Obligatorio */
	postcode		CHAR(5)	NOT NULL,
  	FOREIGN KEY(municipalityId) 	REFERENCES Municipalities(municipalityId)
);

-- Usuarios
CREATE TABLE Users (
  	userId				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username 			VARCHAR(128) NOT NULL, /*RN_1_0a*/
  	email 				VARCHAR(128) NOT NULL, /*RN_1_0a*/
  	password 			VARCHAR(128) NOT NULL, /*RN_1_0a*/
  	dateOfBirth			DATETIME NOT NULL, /*RN_1_0a*/
  	registrationDate 	DATETIME DEFAULT CURRENT_TIMESTAMP(), /*RN_1_0a RN_1_0b {readonly}*/
	withdrawalDate		DATETIME,
  	gender 				ENUM('male','female','other') NOT NULL, /*RN_1_0a, RN1_0z*/ 
  	hairColor 			ENUM('black','brunette','blonde','ginger','white','gray','other') NOT NULL, /*RN_1_0a, RN1_0z*/  
  	eyeColor 			ENUM('black','brown','blue','green','gray', 'other') NOT NULL, /*RN_1_0a, RN1_0z*/  
   	height	 			INT NOT NULL, /*RN_1_0a, RN_1_0z*/
   	wheight				INT NOT NULL, /*RN_1_0a, RN_1_0z*/
	bio		 			VARCHAR(1024) NOT NULL, /*RN_1_0a*/
   	address 			VARCHAR(64) NOT NULL, /*RN_1_0a*/
	province	 		VARCHAR(64) NOT NULL, /* Obligatorio */
	municipality	 	VARCHAR(80) ,
	postcode			CHAR(5),
 	isActive BOOLEAN DEFAULT TRUE NOT NULL,  -- solo la pongo por el silence


  	
	UNIQUE(email),
  	CONSTRAINT RN_1_0b_negative_height CHECK(height>=50),
  	CONSTRAINT RN_1_0b_negative_weight CHECK(wheight>=5),	
	CONSTRAINT RN_1_3_register_date_after_DoB CHECK( registrationDate >= dateOfBirth ),
 CONSTRAINT RN_1_3_register_date_earlier_withdrawal CHECK(NOT ( withdrawalDate IS NOT NULL ) OR ( withdrawalDate >= registrationDate ))
);

-- Fotos de un usuario
CREATE TABLE Pictures (
  	pictureId			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name 				VARCHAR(64) NOT NULL /* Obligatorio RN_1_0c*/,
  	description			VARCHAR(1024) NOT NULL /* Obligatorio RN_1_0c */,
  	pictureURL 			VARCHAR(2048) NOT NULL /* Obligatorio RN_1_0c */,
  	userId				INT NOT NULL,
  	FOREIGN KEY(userId) REFERENCES Users(userId)
);

-- Aficiones (conjunto de referencia)
CREATE TABLE Hobbies (
  	hobbyId				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  	name				VARCHAR(64) NOT NULL /* Obligatorio */
);

-- Aficiones de un usuario
CREATE TABLE UserHobbies (
  	userHobbyId				INT AUTO_INCREMENT PRIMARY KEY,
  	userId					INT NOT NULL,
  	hobbyId					INT NOT NULL,
  	FOREIGN KEY(userId) 	REFERENCES Users(userId),
  	FOREIGN KEY(hobbyId)	REFERENCES Hobbies(hobbyId)
);
 -- vinculo amistad


 CREATE TABLE if not EXISTS Links (
	 linkId INT NOT NULL AUTO_INCREMENT,
	 userId1  INT NOT NULL,
	 userId2  INT NOT NULL,
	request_date DATE NOT NULL  default CURDATE(),
	acceptance_date DATE,
	revocation_request_date DATE,
	revocation_acceptance_date DATE,
	isActive BOOLEAN NOT NULL DEFAULT false, 
	PRIMARY KEY (linkId),
	FOREIGN KEY(userId1) REFERENCES Users(userId),
	FOREIGN KEY(userId2) REFERENCES Users(userId),
	CONSTRAINT dateRange1 CHECK (request_date < acceptance_date),
	CONSTRAINT dateRange2 CHECK (acceptance_date < revocation_request_date  ),
	constraint dateRange3 CHECK ( acceptance_date <revocation_acceptance_date )
 );

 -- ficha preferencias
CREATE TABLE if NOT EXISTS  PreferenceCard(
cardId  INT(11) NOT NULL AUTO_INCREMENT,
max_age INTEGER DEFAULT 110 NOT NULL,
min_age INTEGER DEFAULT 18 NOT NULL,
postcode CHAR(5),
municipalityName VARCHAR(64),
provinceName VARCHAR(64),
max_height INTEGER DEFAULT 230 NOT NULL,
min_height INTEGER DEFAULT 130 NOT NULL,
max_weight INTEGER DEFAULT 350 NOT NULL,
min_weight INTEGER DEFAULT 40 NOT NULL,
userId  INT NOT NULL,
hairColor ENUM ('negro','castaño','rubio','rojo','blanco','gris')NOT NULL,
eyeColor ENUM ('negro','castaños','azules','verdes','grises' ) NOT NULL,
gender ENUM ('masculino','femenino','otros') NOT NULL,
PRIMARY KEY (cardId),
FOREIGN KEY(userId) REFERENCES Users(userId),
CONSTRAINT edadNegativa CHECK(max_age >0 AND min_age >0),
CONSTRAINT estaturaNegativa CHECK (max_height >0 AND min_height 
>0 ),
CONSTRAINT estaturaRango CHECK (max_height >min_height),
CONSTRAINT pesoNegativo CHECK (max_weight >0 AND min_weight > 0),
CONSTRAINT pesoRango CHECK (max_weight >min_weight),
CONSTRAINT fechaRango CHECK (min_age<max_age)
);


 -- aficiones ficha

 

 CREATE TABLE if NOT EXISTS  CardHobbies(
CardHobbyId  INT NOT NULL AUTO_INCREMENT,
hobbyId	 INT NOT NULL,
CardId  INT NOT NULL ,
PRIMARY KEY (CardHobbyId),
UNIQUE(CardId,hobbyId),
FOREIGN KEY(hobbyId)	REFERENCES Hobbies(hobbyId),
FOREIGN KEY(CardId) REFERENCES PreferenceCard(cardId)
);
 -- conversaciones y messages
  
  CREATE TABLE if NOT EXISTS  Chats(
chatId  INT NOT NULL AUTO_INCREMENT,
linkId  INT NOT NULL,
start_date DATE NOT NULL DEFAULT CURDATE(),
end_date DATE ,
new_message BOOLEAN NOT NULL DEFAULT TRUE , -- no se si esta la pedian
PRIMARY KEY (chatId),
FOREIGN KEY(linkId) REFERENCES Links(linkId),
CONSTRAINT fechaNoCoherente2 CHECK (start_date< end_date)
);

CREATE TABLE if NOT EXISTS  messages(
messageId  INT NOT NULL AUTO_INCREMENT,
chatId  INT NOT NULL,
instant DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
text VARCHAR(700) NOT NULL,
PRIMARY KEY (messageId),
FOREIGN KEY(chatId) REFERENCES Chats(chatId)
);


-- los triggers 