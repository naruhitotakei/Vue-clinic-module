const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'});
require('dotenv').config();

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const defaultBucketName = process.env.AWS_BUCKET_NAME

const listBuckets = async () => {
  return new Promise((resolve, reject) => {
    s3.listBuckets(function (err, data) {
      if (err) {
        let rv = {
          status: "NOK",
          error: err
        }
        resolve(rv);
      } else {
        let rv = {
          status: "OK",
          data: data.Buckets
        }
        resolve(rv);
      }
    })
  })
}

const listBucketObjects = async () => {
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: defaultBucketName
    }
    s3.listObjects(params, function (err, data) {
      if (err) {
        let rv = {
          status: "NOK",
          error: err
        }
        resolve(rv);
      } else {
        let rv = {
          status: "OK",
          data: data
        }
        resolve(rv);
      }
    })
  })
}

const listBucketObjectsWithPrefix = async (prefix) => {
  return new Promise((resolve, reject) => {
    var params = {
      Bucket: defaultBucketName,
      Prefix: prefix
    }
    s3.listObjects(params, function (err, data) {
      if (err) {
        let rv = {
          status: "NOK",
          error: err
        }
        resolve(rv);
      } else {
        let rv = {
          status: "OK",
          data: data
        }
        console.log(data)
        resolve(rv);
      }
    })
  })
}

const fileUpload = async (id, fileName, fileContent, mimeType) => {
  return new Promise((resolve, reject) => {

    var params = {
      Bucket: defaultBucketName,
      Key: fileName+ '.' + mimeType.split('/')[1],
      Body: fileContent,
      ContentType: mimeType,
      userId: id
    }
    s3.upload(params, function (err, data) {
      if (err) {
        let rv = {
          status: "NOK",
          error: err
        }
        resolve(rv);
      } else {
        let rv = {
          status: "OK",
          data: data.Location
        }
        resolve(rv);
      }
    })
  })
}

const upload = async (fileName, fileContent, mimeType) => {
  return new Promise((resolve, reject) => {
    var params = {
      Bucket: defaultBucketName,
      Key: fileName,
      Body: fileContent,
      ContentType: mimeType
    }
    s3.upload(params, function (err, data) {
      if (err) {
        let rv = {
          status: "NOK",
          error: err
        }
        resolve(rv);
      } else {
        let rv = {
          status: "OK",
          data: data.Location
        }
        resolve(rv);
      }
    })
  })
}

const download = async (fileName) => {
  return new Promise((resolve, reject) => {
    var params = {
      Bucket: defaultBucketName,
      Key: fileName
    }
    s3.getObject(params, function (err, data) {
      if (err) {
        let rv = {
          status: "NOK",
          error: err
        }
        resolve(rv);
      } else {
        let rv = {
          status: "OK",
          data: data
        }
        resolve(rv);
      }
    })
  })
}

const fileDownload = async (fileName) => {
  return new Promise((resolve, reject) => {
    var params = {
      Bucket: defaultBucketName,
      Key: fileName
    }
    s3.getObject(params, function (err, data) {
      if (err) {
        let rv = {
          status: "NOK",
          error: err
        }
        resolve(rv);
      } else {
        let rv = {
          status: "OK",
          data: data
        }
        resolve(rv);
      }
    })
  })
}

const remove = async (fileName) => {
  return new Promise((resolve, reject) => {
    var params = {
      Bucket: defaultBucketName,
      Key: fileName
    }
    s3.deleteObject(params, function (err, data) {
      if (err) {
        let rv = {
          status: "NOK",
          error: err
        }
        resolve(rv);
      } else {
        let rv = {
          status: "OK",
          data: data
        }
        resolve(rv);
      }
    })
  })
}

module.exports = {
  listBuckets,
  listBucketObjects,
  listBucketObjectsWithPrefix,
  upload,
  download,
  remove,
  fileUpload,
  fileDownload
}