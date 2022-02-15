const mongoose = require('mongoose');
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
     type: String,
     required: true,
     trim: true,
     minlength: 5,
     maxlength: 200
   },
    dailyRentalRate: {
    type:Number,
    min:0,
    max:200
  }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now()
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
})

const validateRental  = (rental) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  })
  return schema.validate(rental)
}
const Rental = mongoose.model('Rental', rentalSchema);

exports.Rental = Rental;
exports.validate = validateRental;