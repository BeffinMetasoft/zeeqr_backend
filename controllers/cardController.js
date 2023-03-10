const CardModel = require("../model/cardModel");
const SavedCardModel = require("../model/savedCardModel");
const createError = require("http-errors");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const { uploadFile } = require("../helpers/s3");
const { generateQR } = require("../helpers/qrCodeGenerator");
const crypto = require("crypto");
require("dotenv").config();

const S3Url = process.env.AWS_BUCKET_URL
const QRBase = process.env.QR_CODE_BASE_URL

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

//saved card Controller

const saveCard = async (req, res, next) => {
  const file = req.file;
  const imageName = generateFileName();
  await uploadFile(file.buffer, imageName, file.mimetype);

  const CardData = {
    cardModel: req.body.cardModel,
    logoURL: imageName,
    companyName: req.body.companyName,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    websiteUrl: req.body.websiteUrl,
    facebook:req.body.facebook,
  instagram:req.body.instagram,
  twitter:req.body.twitter,
  linkedin:req.body.linkedin,
    shippingDetails: {
      name: req.body.shippingName,
      address: req.body.shippingAddress,
      zipCode: req.body.zipcode,
      state: req.body.state,
      country: req.body.country,
      landmark: req.body.landmark,
    },
    userID: req.user._id,
  };

  const newCard = new SavedCardModel(CardData);
  newCard._id = mongoose.Types.ObjectId();
  try {
    await newCard.save();
    res.status(200).json({ success: true, newCard, message: " Card Saved" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSavedCard = async (req, res, next) => {
  try {
    const card = await SavedCardModel.find({ userID: req.user._id });

    res.status(200).json({ success: true, card, message: "Saved Cards" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSingleSavedCard = async (req, res, next) => {
  try {
    const card = await SavedCardModel.findOne({ _id: req.params.id });

    res.status(200).json({ success: true, card, message: "Single Saved Card" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  const cardId = req.params.id;
  try {
    const savedcard = await SavedCardModel.findById(cardId);
    console.log(savedcard);
    if (savedcard.userID == req.user._id) {
      await savedcard.update(req.body);
      res.status(200).json({ success: true, message: "card updated" });
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const removeCard = async (req, res, next) => {
  try {
    const card = await SavedCardModel.findById(req.params.id);

    if (card.userID == req.user._id) {
      await card.deleteOne();
      res.status(200).json({ success: true, message: "card Removed" });
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//create card Controller

const createCard = async (req, res, next) => {
  const file = req.file;
  const imageName = generateFileName();
  await uploadFile(file.buffer, imageName, file.mimetype);
 
  const CardData = {
    cardModel: req.body.cardModel,
    logoURL: S3Url+imageName,
    companyName: req.body.companyName,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    websiteUrl: req.body.websiteUrl,
    facebook:req.body.facebook,
  instagram:req.body.instagram,
  twitter:req.body.twitter,
  linkedin:req.body.linkedin,
    shippingDetails: {
      name: req.body.shippingName,
      address: req.body.shippingAddress,
      zipCode: req.body.zipcode,
      state: req.body.state,
      country: req.body.country,
      landmark: req.body.landmark,
    },
    paymentMethod: req.body.paymentMethod,
    userID: req.user._id,
  };

  const newCard = new CardModel(CardData);
  newCard._id = mongoose.Types.ObjectId();
  const URL = QRBase + newCard._id;
  console.log("URL", URL);
  const QRCode = await generateQR(URL);
  newCard.QRCode = QRCode;
  console.log("newCard", newCard);
  try {
    await newCard.save();
    res.status(200).json(newCard);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCard = async (req, res, next) => {
  try {
    const card = await CardModel.find({ userID: req.user._id });

    res.status(200).json({ success: true, card, message: "Booked Card" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSingleCard = async (req, res, next) => {
  try {
    const card = await CardModel.findOne({ _id: req.params.id });

    res
      .status(200)
      .json({ success: true, card, message: "Single Booked Card" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Admin card Controller

const getAllCard = async (req, res, next) => {
  try {
    if ("640706d85e745adee6a75d89" == req.user._id) {
      const card = await CardModel.find();

      res.status(200).json({ success: true, card, message: "All Cards" });
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCardStatus = async (req, res, next) => {
  const cardId = req.params.id;

  try {
    const bookedcard = await CardModel.findById(cardId);

    if ("6401d5b4cc9f4d0802074f30" == req.user._id) {
      await bookedcard.updateOne({ $set: { status: req.body.status } });
      res.status(200).json({ success: true, message: "card status updated" });
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  saveCard,
  getSavedCard,
  getSingleSavedCard,
  updateCard,
  removeCard,

  createCard,
  getCard,
  getSingleCard,

  getAllCard,
  updateCardStatus,
};
