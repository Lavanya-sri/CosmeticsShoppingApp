from flask import Flask,request,jsonify
from flask_jwt_extended import JWTManager
from db import db
from flask_smorest import Api
import models
from routers.blockList import blockList
from routers.user_route import blp as userBlueprint
from routers.brands_route import blp as brandsBlueprint
from routers.items_route import blp as itemsBluePrint
from routers.cart_route import blp as cartBluePrint
import os
import flask_cors


import secrets

def create_app(db_url=None):
    # flask app
    app=Flask(__name__)
    
    # CORS(app)
    cors = flask_cors.CORS()
    cors.init_app(app)

    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "Stores REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or os.getenv("DATABASE_URL", "postgresql://username:password@localhost/dbname")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True

   
    api = Api(app)
    
    app.config["JWT_ALGORITHM"]="HS256"
    app.config["JWT_SECRET_KEY"]= str(secrets.SystemRandom().getrandbits(100))
    jwt=JWTManager()
    
    db.init_app(app)
    jwt.init_app(app)
    
    
    @jwt.additional_claims_loader
    def add_claims_to_jwt(identity):
        if identity['role'] == "admin":
            return {"is_admin": True}
        return {"is_admin": False}
    
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return (
            jsonify({"message": "The token has expired.", "error": "token_expired"}),
            401,
        )
        
    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        return jwt_payload["jti"] in blockList


    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return (
            jsonify(
                {"description": "The token has been revoked.", "error": "token_revoked"}
            ),
            401,
        )

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return (
            jsonify(
                {"message": "Signature verification failed.", "error": "invalid_token"}
            ),
            401,
        )

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return (
            jsonify(
                {
                    "message": "Request does not contain an access token.",
                    "error": "authorization_required",
                }
            ),
            401,
        )
        

    api.register_blueprint(userBlueprint)
    api.register_blueprint(brandsBlueprint)
    api.register_blueprint(itemsBluePrint)
    api.register_blueprint(cartBluePrint)
    
    
    with app.app_context():
        db.create_all()
        

    return app


