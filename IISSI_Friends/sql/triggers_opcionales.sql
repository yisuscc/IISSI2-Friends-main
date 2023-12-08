 USE IISSI_Friends;
 DELIMITER //
create OR REPLACE TRIGGER usuarioActivo1
BEFORE insert ON Pictures
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = NEW.userId	);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if ;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo2
BEFORE delete ON Pictures
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = old.userId	);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo3
BEFORE update ON Pictures
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = NEW.userId	);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo4
BEFORE insert ON Links
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = NEW.userId	1 OR userId	 
= NEW.userId	2);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo5
BEFORE update ON Links
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = NEW.userId	1 OR userId	 
= NEW.userId	2);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo6
BEFORE delete ON Links
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = old.userId	1 OR userId	 
= old.userId	2);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo7
BEFORE update ON PreferenceCard
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = NEW.userId	);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo8
BEFORE insert ON PreferenceCard
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = NEW.userId	);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo9
BEFORE delete ON PreferenceCard
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = old.userId	);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo10
BEFORE update ON UserHobbies
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = NEW.userId	);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo10
BEFORE insert ON UserHobbies
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = NEW.userId	);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo11
BEFORE update ON UserHobbies
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = NEW.userId	);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;
DELIMITER //
create OR REPLACE TRIGGER usuarioActivo12
BEFORE delete ON UserHobbies
FOR EACH ROW
begin
DECLARE b DATE;
DECLARE f DATE;
SET f = (CURDATE());
SET b = (SELECT withdrawalDate FROM Users WHERE userId	 = old.userId	);
if (b <= f) then
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'es necesario que el usuario 
esté activo';
END if;
END //
DELIMITER ;