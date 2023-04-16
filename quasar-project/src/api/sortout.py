
import os
import psycopg2
from pathlib import Path

API_KEY = 'LtJuwpkK.03wY83zUhoPgJtWqCyXnOTnLPYKoshrb'
CURRENT_DIR = Path('C:\\Users\\pc\Desktop\\balrs\\ticketML\\ticketML\\models\\dataset\\pytorch\\classification\\doctype')
MINIO_STORAGE = Path('D:\\minio\\ticket\\ticket')

def sortout():
    db = psycopg2.connect(database="ticket", user="ticket", password="pistache")
    for folder_name in ['recepiece', 'tickets']:
        for file_name in os.listdir(CURRENT_DIR / folder_name):
            print(file_name)
        
        
def main():
    sortout()

if __name__ == '__main__':
    CHECK_DIR = 'C:\\Users\\pc\\Desktop\\balrs\\ticketML\\ticketML'
    if os.getcwd() != CHECK_DIR:
        raise Exception(f"You must be in '{CHECK_DIR}'")
    main()

