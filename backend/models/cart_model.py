from db import db

class cartModel(db.Model):
    __tablename__ = 'cart'
    
    cartId = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String,nullable=False)
    category = db.Column(db.String,nullable=False)
    price = db.Column(db.String,nullable=False)
    quantity = db.Column(db.Integer,nullable=False)
    subTotal = db.Column(db.Integer,nullable=False)
    brandName = db.Column(db.String,nullable=False)
    
    itemId = db.Column(db.Integer,db.ForeignKey("items.itemId"),nullable=False,unique=False)
    