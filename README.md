
Resources
Starability : https://github.com/LunarLogic/starability

Cloudinary : https://cloudinary.com/

MongoDb cannot hold images, but can hold url. Bson have limit of 16mb. So cloudinary will hold images and turn it into url which is stored into MongoDb.


npm i dotenv


npm i multer
multer: Multer is a node.js middleware for handling multipart/form-data which is primarily used for uploading multiple files. git pullMulter adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file/files object contains the files uploaded via the form.