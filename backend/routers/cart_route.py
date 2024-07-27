from flask.views import MethodView
from flask_smorest import Blueprint
from schema import cartSchema
from models.cart_model import cartModel
from models.items_model import itemsModel
from flask_smorest import abort
from db import db

blp = Blueprint("cart",__name__,description="cart Module.")

@blp.route("/cart/getAll")
class GetAllItems(MethodView):
    # @jwt_required()
    @blp.response(200,cartSchema(many=True))
    def get(self):
        return cartModel.query.all()
    
@blp.route("/cart/<int:id>")
class ItemsbyId(MethodView):
    # @jwt_required()
    @blp.response(200,cartSchema)
    def get(self,id):
        data=cartModel.query.get(id)
        if data:
            return data
        abort(400,message="Data not found.")
        
@blp.route("/cart/get/<int:id>")
class ItemsbyUserId(MethodView):
    # @jwt_required()
    @blp.response(200,cartSchema)
    def get(self,id):
        data=cartModel.query.get(id)
        if data:
            return data
        abort(400,message="Data not found.")
        
@blp.route("/cart/add")
class AddItems(MethodView):
    # @jwt_required()    
    @blp.arguments(cartSchema)
    @blp.response(201,cartSchema)
    def post(self,request_data):
        # request_data = request.get_json()
        new_item = cartModel(
            name=request_data['name'],
            price=request_data['price'],
            quantity=request_data['quantity'],
            subTotal=request_data['quantity']*request_data['price'],
            itemId=request_data['itemId'],
            category=request_data['category'],
            brandName=request_data['brandName'],
        )
        db.session.add(new_item)
        db.session.commit()
        return new_item


@blp.route('/cart/deleteItem/<int:id>')
class DeleteItem(MethodView):
    # @jwt_required()
    @blp.response(200,cartSchema)
    def delete(self,id):
        # store_data = StoreModel.query.get_or_404(id)
        items_data = cartModel.query.get_or_404(id)
        if items_data:
            if items_data:
                db.session.delete(items_data)
                db.session.commit()
            db.session.commit()
            return items_data
        else:
            abort(400,message="Item not Found")