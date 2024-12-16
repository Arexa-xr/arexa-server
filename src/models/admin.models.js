import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         unique: true,
         required: true,
      },

      email: {
         type: String,
         unique: true,
         required: true,
      },

      password: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

adminSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.isPassworCorrect = async function (password) {
   return await bcrypt.compare(this.password, password);
};

adminSchema.methods.generateAccessToken = function () {
   return jwt.sign(
      {
         id: this._id,
         email: this.email,
         username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
   );
};

adminSchema.methods.generateRefreshToken = function () {
   return jwt.sign(
      {
         id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
   );
};

export const Admin = mongoose.model("Admin", adminSchema);
