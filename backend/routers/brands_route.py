from flask.views import MethodView
from flask_smorest import Blueprint
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from schema import brandsSchema
from models.brands_model import brandsModel
from flask_smorest import abort
from db import db

blp = Blueprint("brands",__name__,description="Brands Module.")


@blp.route('/brands/getAllBrands')
class GetAll(MethodView):
    # @jwt_required()
    @blp.response(200,brandsSchema(many=True))
    def get(self):
        return brandsModel.query.all()

@blp.route('/brands/getBrandByName/<int:id>')
class GetBrandById(MethodView):
    @blp.response(200,brandsSchema)
    def get(self,id):
        data = brandsModel.query.get(id)
        if data:
            return data
        else:
            abort(400,message="Store not found.")
            
@blp.route('/brands/getBrandByName/<string:brandName>')
class GetBrandByName(MethodView):
    @blp.response(200,brandsSchema)
    def get(self,brandName):
        data = brandsModel.query.filter_by(name=brandName).first()
        if data:
            return data
        else:
            abort(400,message="Store not found.")
            
@blp.route("/brands/add")
class AddBrand(MethodView):
    # @jwt_required()    
    @blp.arguments(brandsSchema)
    @blp.response(201,brandsSchema)
    def post(self,request_data):
        # request_data = request.get_json()
        new_store = brandsModel(**request_data)
        try:
            db.session.add(new_store)
            db.session.commit()
        except IntegrityError:
            abort(400, message="Store already Exisits.")
        except SQLAlchemyError:
            abort(500,message="Unexpected error during creation of store.")  
        return new_store