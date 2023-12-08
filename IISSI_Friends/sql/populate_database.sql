INSERT INTO Provinces
VALUES
    /*provinceId,provinceName*/
    (1,'Sevilla'),
    (2,'Barcelona'),
    (3,'Madrid');

INSERT INTO Municipalities
VALUES 
    /*municipalityId,provinceId,municipalityName*/
    (1,1,'Gines'),
    (2,2,'Badalona'),
    (3,3,'Alcobendas'),
    (4,1,'Mairena del Alcor');
    
INSERT INTO PostCodes
VALUES
    /*postcodeId,municipalityId,postcode*/
    (1,1,41960),
    (2,2,08917),
    (3,3,28100),
    (4,4,41510);

INSERT INTO Users
VALUES 
    /*userId,username,email,password,dateOfBirth,registrationDate,withdrawalDate,gender,hairColor,eyeColor,height,weight,bio,address,provinceId,municipalityId,postcodeId,isActive*/
    (1,'mlpz','marisa.lopez@gallery.com','kdf2:sha256:150000$HfDHjWt9$ec4e09064e3b81',09/12/1989,14/02/2015,12/04/2019,'female','blonde','green',170,63,'Hola,¡Me encantan los animales!','López de Legazpi','Sevilla','Sevilla','41005',0),
    (2,'ismaelbcn','ismael.barcelona@gallery.com','kdf2:sha256:150000$HfDHjWt9$ec4e09064e3b81211233',15/05/1992,25/08/2020,null,'male','black','black',180,76,'Hola,aquí un fan de los insectos','Larga','Sevilla','Sevilla','41005',1),
    (3,'lucassnt','lucas.santos@gallery.com','kdf2:sha256:150000$HfDHjWt9$ec4e09064e3b8121354',16/09/1990,20/09/2019,27/09/2021,'male','brunette','blue',175,69,'Buenas, me considero cinefilo y aventurero','Ronda Pia','Sevilla','Sevilla','41005',0),
     (4,'admin','admin@us.es','admin','2011-11-11','2011-11-11',null,'other','brunette','blue',175,69,'Viva IISSI-Friends','Av Reina Mercedes','Sevilla','Sevilla','41005',1),
    (5,'lorenafdez','lorena.fernandez@gallery.com','kdf2:sha256:150000$HfDHjWt9$ec4e09064e3b812139',12/04/1995,29/07/2019,null,'female','blonde','black',165,61,'Saludos, soy Desarrolladora de aplicaciones web','Araña','Sevilla','Sevilla','41005',1);

INSERT INTO Pictures
VALUES
    /*pictureId,name,description,pictureURL,userId*/
    (1,'Tommy','¡Os muestro a mi perrito, Tommy!','https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k',1),
    (2,'Parque','¡Dia precioso en el parque!','https://i.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ',2),
    (3,'Puesta de sol','¡Espectacular atardecer en Cadiz','https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY',3),
    (4,'¡A remar!','¡Fantástico día remando en el lago!','https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk',4),
    (5,'¡Sesion de fotos!','¡Nueva fotito! Maquillaje realizado por mi amiga','https://i.picsum.photos/id/1027/2848/4272.jpg?hmac=EAR-f6uEqI1iZJjB6-NzoZTnmaX0oI0th3z8Y78UpKM',1),
    (6,'¡A pasear!','¡Día de paseo con mi sobrino!','https://i.picsum.photos/id/1001/5616/3744.jpg?hmac=38lkvX7tHXmlNbI0HzZbtkJ6_wpWyqvkX4Ty6vYElZE',2),
    (7,'Medusa','¡Os dejo con un recuerdo de mi visita al acuario de mi ciudad','https://i.picsum.photos/id/1069/3500/2333.jpg?hmac=VBJ1vR2opkcKLS9NKGDl5uPxF02u6dSqbwc1x1b4oJc',3),
    (8,'Otoño','¡Llegó el otoño a mi ciudad!','https://i.picsum.photos/id/167/2896/1944.jpg?hmac=YZo5hYh18tGFz3wI4Eic6fdwNHA2pN1ZpNjVNElC8wk',4);

INSERT INTO Hobbies
VALUES
    /*hobbyId,name*/
    (1,'Lectura'),
    (2,'Salir a correr'),
    (3,'Patinar'),
    (4,'Animales'),
    (5,'Ver peliculas'),
    (6,'Maquillaje');

INSERT INTO UserHobbies
VALUES
    /*userHobbyId,userId,hobbyId*/
    (1,1,4),
    (2,2,2),
    (3,3,5),
    (4,4,1),
    (5,1,6),
    (6,2,3),
    (7,3,4),
    (8,4,2);

INSERT INTO PreferenceCard
VALUES
    /*cardId,max_age,min_age,postcode,municipalityName,provinceName,max_height,min_height,max_weight,min_weight,userId,hairColor,eyeColor,gender*/
    (12345904,110,18,41960,'Gines', 'Sevilla', 230, 130, 350, 40, 1, 'rubio', 'verdes', 'femenino'),
    (12345902,110,18,08917, 'Badalona', 'Barcelona', 230, 130, 350, 40, 2, 'negro', 'negro', 'masculino'),
    (12345908,110,18,28100, 'Mairena del Alcor', 'Sevilla', 230, 130, 350, 40, 3, 'castaño', 'azules', 'masculino'),
    (12345901,110,18,41510, 'Alcobendas', 'Madrid', 230, 130, 350, 40, 4, 'rubio', 'negro', 'femenino'),
    (12345906,110,18,41960,'Gines', 'Sevilla', 230, 130, 350, 40, 1, 'rubio', 'verdes', 'femenino'),
    (12345903,110,18,08917, 'Badalona', 'Barcelona', 230, 130, 350, 40, 2, 'negro', 'negro', 'masculino'),
    (12345905,110,18,28100,'Mairena del Alcor','Sevilla',230,130,350,40,3,'castaño','azules','masculino'),
    (12345907,110,18,41510, 'Alcobendas', 'Madrid', 230, 130, 350, 40, 4, 'rubio', 'negro', 'femenino');

INSERT INTO CardHobbies
VALUES
    /*CardHobbyId,hobbyId,CardId*/
    (1,1,12345901),
    (2,2,12345902),
    (3,3,12345903),
    (4,4,12345904),
    (5,5,12345905),
    (6,6,12345906),
    (7,2,12345907),
    (8,4,12345908);
