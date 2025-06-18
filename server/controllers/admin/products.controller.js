const { imageUploadUtil } = require("../../helpers/cloudinary");

//! Step-1, Create a controller function for the saving of image in cloudinary
const handelImageUpload = async (req, res) => {
  try {
    //! Step-1-1, Convert the image coming from client into base64 url
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    //! Step-1-2, get the url and hit the image upload function
    const result = await imageUploadUtil(url);

    //! Step-1-3, Send the response when successful
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = {
  handelImageUpload,
};
