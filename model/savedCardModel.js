const mongoose = require("mongoose")

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const SavedCardSchema = mongoose.Schema({
    cardModel: {
        type: String,
        required: [true, "CardModel is required"]
    },
    logoURL: {
        type: String,
        required: [true, "LogoURL is required"]
    },
   
    companyName: {
        type: String,
        required: [true, "Name is required"]
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
  email: {
        type: String,
      //  validate: [validateEmail, 'Please fill a valid email address'],
        required: [true, "Email is required"],
    },
    phone: {
        type: Number,
        minlength: [10, "phone number must be 10 digits"],
        required: [true, "Phone number is required"]
    },
    websiteUrl: {
        type: String,
        required: [true, "WebsiteUrl is required"]
    },
    shippingDetails: {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        address: {
            type: String,
            required: [true, "Address is required"]
        },
        zipCode: {
            type: String,
            required: [true, "ZipCode is required"]
        },
        state: {
            type: String,
            required: [true, "State is required"]
        },
        country: {
            type: String,
            required: [true, "Country is required"]
        },
        landmark: {
            type: String,
            required: [true, "Landmark is required"]
        },
    },
    userID: {
        type: String,
        required: [true, "UserID is required"]
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    twitter: {
        type: String
       
    },
    linkedin: {
        type: String
    },
    
   
   
})
mongoose.set('strictQuery', false);

const SavedCard = mongoose.model('SavedCard',SavedCardSchema)
module.exports= SavedCard