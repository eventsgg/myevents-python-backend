import os

#print(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
#print(os.path.join(os.path.relpath(__file__)))
print(os.path.dirname(os.path.realpath(__file__)))
print(os.path.abspath(os.path.dirname(__name__)))
