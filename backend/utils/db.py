import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",          # your MySQL username
        password="vaishu",  # your MySQL password
        database="pcos_db"    # your database name
    )
