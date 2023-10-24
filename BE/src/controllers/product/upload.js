import { upload } from "../../configs/cloudinary";

const uploadImage = (req, res) => {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    body.variants = JSON.parse(body.variants);

    const { error } = productSchema.validate(body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        error: true,
        messages: error.details.map((detail) => detail.message),
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
