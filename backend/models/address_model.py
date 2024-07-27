from db import db

class addressModel(db.Model):
    __tablename__ = 'address'
    
    addressId=db.Column(db.Integer,primary_key=True)
    room_no=db.Column(db.String(80),nullable=True)
    street=db.Column(db.String(80),nullable=True)
    city=db.Column(db.String(80),nullable=True)
    district=db.Column(db.String(80),nullable=True)
    state=db.Column(db.String(80),nullable=True)
    country=db.Column(db.String(80),nullable=True)
    pincode=db.Column(db.String(80),nullable=True)
    
    userId = db.Column(db.Integer,db.ForeignKey("users.userId"),nullable=False,unique=False)
    
    users = db.relationship("userModel",back_populates="address")