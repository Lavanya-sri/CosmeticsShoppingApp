from marshmallow import Schema,fields

class plainUserSchema(Schema):
    userId = fields.Int(dump_only=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True,load_only=False)
    
class plainAddressSchema(Schema):
    addressId = fields.Int(dump_only=True)
    pincode = fields.Str(required=True)
    city = fields.Str(required=True)
    
class plainBrandsSchema(Schema):
    brandId = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    
class plainItemsSchema(Schema):
    itemId = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    category = fields.Str(required=True)


class addressSchema(plainAddressSchema):
    roomNo = fields.Str(required=True)
    street = fields.Str(required=True)
    district = fields.Str(required=True)
    state = fields.Str(required=True)
    country = fields.Str(required=True)
    userId = fields.Int(required=True)
    
    users= fields.Nested(plainUserSchema(),dump_only=True)
    
class userSchema(plainUserSchema):
    firstName = fields.Str(required=True)
    lastName = fields.Str(required=True)
    email = fields.Str(required=True)
    mobile = fields.Str(required=True)
    role = fields.Str(dump_only=True,load_only=False)
    
    address = fields.List(fields.Nested(plainAddressSchema()), dump_only=True)
    
class brandsSchema(plainBrandsSchema):
    items = fields.List(fields.Nested(plainItemsSchema()), dump_only=True)

class itemsSchema(plainItemsSchema):
    mainColor = fields.Str(required=True)
    secondaryColor = fields.Str(required=True)
    otherColor = fields.Str(required=True)
    brandId = fields.Int(required=True)
    price = fields.Int(required=True)
    
    brands = fields.Nested(plainBrandsSchema(),dump_only=True)
    
class plainCartSchema(Schema):
    cartId = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    price = fields.Int(required=True)
    quantity =  fields.Int(required=True)
    subTotal = fields.Int(dump_only=True)
    category = fields.Str(required=True)
    brandName = fields.Str(required=True)
    
class cartSchema(plainCartSchema):
    itemId = fields.Int(required=True)
    # items = fields.List(fields.Nested(itemsSchema()), dump_only=True)
    
    