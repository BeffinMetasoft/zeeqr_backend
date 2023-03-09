const mongoose = require("mongoose")

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const ImageSchema = mongoose.Schema({
    imageName: {
        type: String,
        required: [true, "imageName is required"]
    },
    
    caption: String,
   
   
})
mongoose.set('strictQuery', false);

const Image = mongoose.model('Image',ImageSchema)
module.exports= Image