import cloudinary from "cloudinary";
// import multer from "multer";
// import aws from "aws-sdk";
// import multerS3 from "multer-s3-v2";

// Configure Cloudinary inside the function
cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

export const deleteImagesInCloudinary = async (req, res, next) => {
  try {
    const { public_ids } = req.body;
    console.log("Public IDs to delete:", public_ids);

    // Delete multiple images from Cloudinary
    const deletePromises = public_ids.map(async (public_id) => {
      try {
        return await cloudinary.v2.uploader.destroy(public_id);
      } catch (err) {
        console.error(
          `Failed to delete image with public_id: ${public_id}`,
          err
        );
        throw new Error(`Failed to delete image with public_id: ${public_id}`);
      }
    });

    await Promise.all(deletePromises);

    res.status(200).send("Images deleted successfully.");
  } catch (err) {
    console.error("Error deleting images:", err);
    res.status(500).send("Failed to delete images.");
  }
};

// export const deleteImages = async (req, res, next) => {
//   try {
//     const { public_ids } = req.body;

//     if (!public_ids || !Array.isArray(public_ids)) {
//       throw new Error("Invalid public_ids array");
//     }

//     console.log("Public IDs to delete:", public_ids);

//     const deletePromises = public_ids.map((public_id) =>
//       cloudinary.v2.uploader.destroy(public_id)
//     );

//     const results = await Promise.all(deletePromises);

//     console.log("Cloudinary delete results:", results);

//     res.status(200).send("Images deleted successfully.");
//   } catch (err) {
//     console.error("Error deleting images:", err);
//     next(createError(500, "Failed to delete images."));
//   }
// };

// uploadd to local storage

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null, "../client/public/upload");
//     cb(null, "./upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage });

// app.post("/api/upload", upload.single("file"), function (req, res) {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });

// upload to aws s3
// var s3 = new aws.S3();

// export const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.CYCLIC_BUCKET_NAME,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       // console.log(file);
//       cb(null, file.originalname); //use Date.now() for unique file keys
//     },
//   }),
// });

// export const uploadImagesToS3 = (req, res, next) => {
//   let data = req.files;
//   res.status(200).send(data[0].key);
// };

// export const getImages = async (req, res) => {
//   let filename = req.params.filename;

//   try {
//     let data = await s3
//       .getObject({
//         Bucket: process.env.CYCLIC_BUCKET_NAME,
//         Key: filename,
//       })
//       .promise();
//     // res.set("Content-type", data.ContentType);
//     // res.send(encode(data.Body)).end();
//     res.writeHead(200, { "Content-Type": "image/jpeg" });
//     res.write(data.Body, "binary");
//     res.end(null, "binary");
//   } catch (error) {
//     if (error.code === "NoSuchKey") {
//       console.log(`No such key ${filename}`);
//       res.sendStatus(404).end();
//     } else {
//       console.log(error);
//       res.sendStatus(500).end();
//       res.send(error);
//     }
//   }
// };

// export const deleteImagesInS3 = async (req, res) => {
//   let filename = req.params.filename;
//   try {
//     await s3
//       .deleteObject({
//         Bucket: process.env.CYCLIC_BUCKET_NAME,
//         Key: filename,
//       })
//       .promise();

//     res.set("Content-type", "image/jpeg");
//     res.send("ok").end();
//   } catch (error) {
//     if (error.code === "NoSuchKey") {
//       console.log(`No such key ${filename}`);
//       res.sendStatus(404).end();
//     } else {
//       console.log(error);
//       res.sendStatus(500).end();
//       res.send(error);
//     }
//   }
// };

// app.use("/api/upload", express.static("upload"));

// app.get('/upload/:imageName', (req, res) => {
//   // do a bunch of if statements to make sure the user is
//   // authorized to view this image, then

//   const imageName = req.params.imageName
//   const readStream = fs.createReadStream(`images/${imageName}`)
//   readStream.pipe(res)
// })
