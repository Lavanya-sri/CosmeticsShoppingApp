from db import db

class brandsModel(db.Model):
    __tablename__ = 'brands'
    
    brandId = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String,nullable=False,unique=True)
    
    items = db.relationship("itemsModel",back_populates="brands",lazy="dynamic")