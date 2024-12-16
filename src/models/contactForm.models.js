import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema(
   {
      fullName: {
         type: String,
         required: true,
      },

      email: {
         type: String,
         required: true,
      },

      designation: {
         type: String,
         required: true,
      },

      message: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export const ContactForm = mongoose.model("ContactForm", contactFormSchema);
