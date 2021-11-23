const multer = require("multer");




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './services/uploads');
    },
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
  });
  var upload = multer({ 
    storage: storage
  });



module.exports.upload = upload;
