from db import db

class itemsModel(db.Model):
    __tablename__ = 'items'
    
    itemId = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String,nullable=False)
    price = db.Column(db.String,nullable=False)
    category = db.Column(db.String,nullable=False)
    mainColor = db.Column(db.String,nullable=False)
    secondaryColor = db.Column(db.String,nullable=False)
    otherColor = db.Column(db.String,nullable=False)
    
    brandId = db.Column(db.Integer,db.ForeignKey("brands.brandId"),nullable=False,unique=False)
    
    brands = db.relationship("brandsModel",back_populates="items")
    