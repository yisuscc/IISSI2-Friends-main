###############################################################################
# Project-specific settings
###############################################################################

# Shows debug messages while Silence is running
DEBUG_ENABLED = False

# Database connection details
DB_CONN = {
    "host": "127.0.0.1",
    "port": 3306,
    "username": "iissi_user",
    "password": "iissi$user",
    "database": "IISSI_Friends",
}

# The sequence of SQL scripts located in the sql/ folder that must
# be ran when the 'silence createdb' command is issued
SQL_SCRIPTS = [
    # Reference your sql files here, e.g. "create_tables.sql"
    "create_tables.sql",

    "populate_database.sql",

    "triggers-jescarcar5.sql",
    "Views.sql"
    #"triggers_opcionales.sql"

]

# The port in which the API and the web server will be deployed
HTTP_PORT = 8080

# The URL prefix for all API endpoints
API_PREFIX = "/api/v1"

# Table and fields that are used for both login and register
# Uncomment this and set up your own table and columns:

USER_AUTH_DATA = {
   "table": "Users",
    "identifier": "email",
    "password": "password",
    "active_status": "isActive"
}
ALLOW_CLEAR_PASSWORDS = True; #solo para pruebas 
# A random string that is used for security purposes
# (this has been generated automatically upon project creation)
SECRET_KEY = "cjksg0bDAu8Ep9zmiZP9V0CskiPbv4KyRohGwQaJ0MY"
