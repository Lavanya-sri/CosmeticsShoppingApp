from db import db

class userModel(db.Model):
    __tablename__ = 'users'
    
    userId= db.Column(db.Integer,primary_key=True)
    userName=db.Column(db.String(80),unique=True,nullable=False)
    password=db.Column(db.String,nullable=False)
    role = db.Column(db.String(80),nullable=False)
    firstName=db.Column(db.String(80),nullable=True)
    lastName=db.Column(db.String(80),nullable=True)
    email=db.Column(db.String(80),nullable=True)
    role=db.Column(db.String(80),nullable=True)
    mobile=db.Column(db.String(80),nullable=True)
    
    address = db.relationship("addressModel",back_populates="users",lazy="dynamic")