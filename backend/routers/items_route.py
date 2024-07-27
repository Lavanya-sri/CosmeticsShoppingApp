from flask.views import MethodView
from flask_smorest import Blueprint
from schema import brandsSchema,itemsSchema
from models.brands_model import brandsModel
from models.items_model import itemsModel
from flask_smorest import abort
from db import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from sqlalchemy import distinct


blp = Blueprint("items",__name__,description="Items Module.")

@blp.route("/items/getAll")
class GetAllItems(MethodView):
    # @jwt_required()
    @blp.response(200,itemsSchema(many=True))
    def get(self):
        return itemsModel.query.all()
    

@blp.route("/items/<int:id>")
class ItemsbyId(MethodView):
    # @jwt_required()
    @blp.response(200,itemsSchema)
    def get(self,id):
        data=itemsModel.query.get(id)
        if data:
            return data
        abort(400,message="Data not found.")
        
@blp.route("/items/getItems/<int:brand_id>")
class ItemsbyStoreId(MethodView):
    # @jwt_required()
    @blp.response(200,itemsSchema(many=True))
    def get(self,brand_id):
        data=brandsModel.query.get(brand_id)
        if data and data.items.all():
            return data.items.all()
        abort(400,message="Data not found.")
        

@blp.route("/items/getItems/<string:item_name>")
class ItemsbyItemName(MethodView):
    # @jwt_required()
    @blp.response(200,itemsSchema(many=True))
    def get(self,item_name):
        data=itemsModel.query.filter_by(name=item_name).all()
        if data:
            return data
        abort(400,message="Data not found.")

        
@blp.route("/items/getItems/<string:brand_name>")
class ItemsbyBrandName(MethodView):
    # @jwt_required()
    @blp.response(200,itemsSchema(many=True))
    def get(self,brand_name):
        data=brandsModel.query.filter_by(name=brand_name).first()
        if data and data.items.all():
            return data.items.all()
        abort(400,message="Data not found.")
        
@blp.route("/items/add")
class AddItems(MethodView):
    # @jwt_required()    
    @blp.arguments(itemsSchema)
    @blp.response(201,itemsSchema)
    def post(self,request_data):
        # request_data = request.get_json()
        data=brandsModel.query.get(request_data["brandId"])
        if data:
            new_item = itemsModel(**request_data)
            db.session.add(new_item)
            db.session.commit()
            return new_item
    
        abort(400,message="Store not found.")
        
        
@blp.route("/items/getItemsByColor/<string:item_color>")
class ItemsbyColor(MethodView):
    # @jwt_required()
    @blp.response(200,itemsSchema(many=True))
    def get(self,item_color):
        data=itemsModel.query.filter_by(mainColor=item_color)
        if data:
            return data
        abort(400,message="Data not found.")

@blp.route("/items/getItemsByCategory/<string:item_category>")
class ItemsbyCategory(MethodView):
    # @jwt_required()
    @blp.response(200,itemsSchema(many=True))
    def get(self,item_category):
        data=itemsModel.query.filter_by(category=item_category)
        if data:
            return data
        abort(400,message="Data not found.")

@blp.route('/items/popularItems')
class GetPopularItems(MethodView):
    @blp.response(200,itemsSchema(many=True))
    def get(self):
        subquery = db.session.query(itemsModel.category, func.max(itemsModel.price).label('max_price')).group_by(itemsModel.category).subquery()
        data = db.session.query(itemsModel).join(subquery, db.and_(itemsModel.category == subquery.c.category, itemsModel.price == subquery.c.max_price)).limit(4).all()
        if data:
            return data
        else:
            abort(400,message="Data not found.")
            
@blp.route('/items/specialItems')
class GetspecialItems(MethodView):
    @blp.response(200,itemsSchema(many=True))
    def get(self):
        subquery = db.session.query(itemsModel.category, func.min(itemsModel.price).label('min_price')).group_by(itemsModel.category).subquery()
        data = db.session.query(itemsModel).join(subquery, db.and_(itemsModel.category == subquery.c.category, itemsModel.price == subquery.c.min_price)).limit(4).all()
        if data:
            return data
        else:
            abort(400,message="Data not found.")