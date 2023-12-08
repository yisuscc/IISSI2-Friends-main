
USE IISSI_Friends;
-- trigger maxFotos Users
DELIMITER //
CREATE OR REPLACE TRIGGER maxFotosUsuario
BEFORE INSERT ON Pictures
FOR EACH ROW
BEGIN
DECLARE n INT;
SET n = (SELECT COUNT(*) FROM Pictures WHERE (userId = new.userId));
IF (n >= 5) THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =' `Un usuario no puede tener 
mas de 5 Pictures`';
END IF;
END //
DELIMITER ;
DELIMITER //
CREATE OR REPLACE TRIGGER vinAmistadDiarios
BEFORE INSERT ON Links
FOR EACH ROW
BEGIN
DECLARE n INT;
SET n  = (SELECT COUNT(*) FROM Links WHERE (userId1 = 
NEW.userId1 AND request_date = CURDATE()));
IF (n> 5) then
SIGNAL SQLSTATE'45000' SET MESSAGE_TEXT = 'un usauario no puede lanzar mas 
de 5 solicitudes por dia natural';
END if ;
END //
DELIMITER ;
DELIMITER //
CREATE OR REPLACE TRIGGER AutoExcusionVINAmistad BEFORE INSERT ON 
Links
FOR EACH ROW
BEGIN
if(NEW.userId1  = NEW.userId2) then
SIGNAL SQLSTATE'45000' SET MESSAGE_TEXT = 'un usuario no puede tener un 
vinculo consigo mismo';
END IF;
END //
DELIMITER ;
-- realizados por imane Aalouane
DELIMITER //
CREATE OR REPLACE TRIGGER  vinculoactivo
BEFORE INSERT ON Links
FOR EACH ROW
BEGIN
DECLARE n INT;
DECLARE d INT;
DECLARE g INT;
SET n = (SELECT COUNT(*) FROM Links v WHERE v.userId1 = 
NEW.userId2 AND v.userId2 = NEW.userId1 AND v.isActive = TRUE);
SET d = (SELECT COUNT(*) FROM Links v WHERE v.userId1 = 
NEW.userId1 AND v.userId2 = NEW.userId2 AND v.isActive = TRUE);
SET g = n+d;
IF(g>0) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =' Solo se admite un vínculo 
activo entre 2 personas';
END IF;
END //
DELIMITER ;
-- realizados por Álvaro Caño Soto
DElIMITER //
CREATE OR REPLACE TRIGGER convVincAmistad
BEFORE INSERT ON Chats
FOR EACH ROW
BEGIN
DECLARE isActive BOOLEAN;
SET isActive  = (SELECT isActive FROM Links v WHERE 
(v.linkId = NEW.linkId));
if(!isActive) then
SIGNAL SQLSTATE'45000' SET MESSAGE_TEXT = 'Una conversación solo puede 
crearse bajo un vínculo de amistad activo';
END IF;
END //
DELIMITER ;
DElIMITER //
CREATE OR REPLACE TRIGGER intervConver
BEFORE INSERT ON messages
FOR EACH ROW
BEGIN
DECLARE start_date DATE;
DECLARE end_date  DATE;
SET start_date  = (SELECT start_date FROM Chats WHERE 
(chatId  = new.chatId));
SET end_date   = (SELECT end_date  FROM Chats WHERE 
(chatId  = new.chatId));
if(start_date > NEW.instant || end_date  < NEW.instant) then
SIGNAL SQLSTATE'45000' SET MESSAGE_TEXT = 'El instant en que se genera un 
mensaje debe estar dentro del intervalo definido para una conversación';
END IF;
END //
DELIMITER ;

-- otros triggesr realizados por jesus carrascosa
DElIMITER //
create or REPLACE trigger messagesImutables
BEFORE UPDATE ON messages
FOR EACH ROW
BEGIN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Los messages son inmutables';
END //
DELIMITER ;
DELIMITER //
create or REPLACE trigger messagesInborrables
BEFORE DELETE ON messages
FOR EACH ROW
BEGIN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Los messages no se pueden 
borrar';
END //
DELIMITER ;
DELIMITER //
create or REPLACE trigger ChatsInborrables
BEFORE DELETE ON Chats
FOR EACH ROW
BEGIN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Las Chats no se 
pueden borrar';
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER  messagesConversacionActiva
BEFORE INSERT ON messages
FOR EACH ROW
BEGIN
DECLARE b BOOLEAN;
SET b = (SELECT new_message FROM Chats WHERE chatId = 
NEW.chatId);
if(b =FALSE) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'para enviar los messages se 
necesita una conversacion activa';
END if;
END //
DELIMITER ;
-- trigger para la eliminicaion del usuario
DELIMITER //
create OR REPLACE TRIGGER  eliminarUsuario
BEFORE DELETE ON Users
FOR EACH ROW
BEGIN
DECLARE id VARCHAR(250);
DECLARE fp INTEGER;
DECLARE f INTEGER ;
DECLARE v INTEGER;
SET id = OLD.userId;
SET fp = (SELECT COUNT(*) FROM PreferenceCard  WHERE userId = 
OLD.userId);
SET f = ( SELECT COUNT(*) FROM Pictures  WHERE userId = OLD.userId);
SET v = (SELECT COUNT(*) FROM Links   WHERE userId1 = 
OLD.userId OR userId2 = OLD.userId);

if( (fp+f+v) >0) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'no se puede borrar a este 
usuario';
END if ;
END //
DELIMITER ;

DELIMITER //
create OR REPLACE TRIGGER FichaConAficiones
BEFORE DELETE ON PreferenceCard
FOR EACH ROW
BEGIN
DECLARE n INTEGER;
SET n = (SELECT COUNT(*) FROM CardHobbies WHERE CardId = 
OLD.CardId);
if(n >0) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se puede borrar una ficha 
con aficiones vinculadas';
END if ;
END //
DELIMITER ;
-- coherencia fecha de baja y isActive
DELIMITER //
create OR REPLACE TRIGGER coherenciaFechaBajaEstaActivo1
BEFORE UPDATE ON Users
FOR EACH ROW
BEGIN
if(New.withdrawalDate  is NULL AND New.isActive = FALSE)then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'la fecha de baja y el 
isActive se contradicen';
END if  ;
IF(New.withdrawalDate is not NULL AND New.isActive = TRUE) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'la fecha de baja y el 
isActive se contradicen';
END if ;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER coherenciaFechaBajaEstaActivo2
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
if(New.withdrawalDate  is NULL AND New.isActive = FALSE)then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'la fecha de baja y el 
isActive se contradicen';
END if ;
IF(New.withdrawalDate is not NULL AND New.isActive = TRUE) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'la fecha de baja y el 
isActive se contradicen';
END if ;
END //
DELIMITER ;
