    CREATE OR REPLACE VIEW PicturesWithUsers AS
    SELECT P.*, U.username
    FROM Pictures P NATURAL JOIN Users U;
    
    CREATE OR REPLACE VIEW UsersWithHobbies  AS
    SELECT U.username, U.userId, H.name, H.hobbyId, UH.userHobbyId
    FROM Users U NATURAL JOIN  UserHobbies UH NATURAL JOIN Hobbies H  ;
