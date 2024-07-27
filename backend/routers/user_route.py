from flask import request,jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from db import db
import uuid
from schema import userSchema,plainUserSchema
import models
from models.user_model import userModel
from flask_smorest import abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token,jwt_required,get_jwt
import jwt
from datetime import *
from .blockList import blockList



blp = Blueprint("users",__name__,description="User Module.")


@blp.route("/users/register")
class Register(MethodView):
    @blp.arguments(userSchema)
    @blp.response(201,userSchema)
    def post(self,user_data):
        data = userModel.query.filter(userModel.userName == user_data["email"]).first()
        if data:
            abort(409,message="User already exisits.")
        new_user = userModel(
                userName = user_data["firstName"] + ' '+user_data["lastName"],
                password = pbkdf2_sha256.hash(user_data["password"]),
                role = "user",
                firstName = user_data["firstName"],
                lastName = user_data["lastName"],
                email = user_data["email"],
                mobile = user_data["mobile"]
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user


@blp.route("/users/login")
class Login(MethodView):
    @blp.arguments(plainUserSchema)
    def post(self,user_data):
        data = userModel.query.filter(userModel.email == user_data["email"]).first()
        if data and pbkdf2_sha256.verify(user_data["password"], data.password):
            access_token = create_access_token(identity={"id":data.userId,"role":data.role})
            return {"access_token":access_token},200
        abort(400,message="User not Found.")  
        
        
@blp.route('/users/logout')
class Logout(MethodView):
    @jwt_required()
    def post(self):
        jti = get_jwt()["jti"]
        blockList.add(jti)
        return "Logout Successfull.",200