const chai = require('chai')
const should = require('chai').should();
const fs = require('fs');

const awsS3 = require('../services/awsS3')

describe('aws-test', async function () {

    it('should test aws', async function () {
        rv = await awsS3.listBuckets()
        console.log('Avaliable buckets: ', rv)

        rv = await awsS3.listBucketObjects()
        console.log('Default bucket content: ', rv.data.Contents)

        const fileContent = fs.readFileSync('./test/test-01.txt');
        rv = await awsS3.upload('test-01', fileContent, 'text/plain')
        console.log('Upload file test-01:', rv)

        rv = await awsS3.listBucketObjects()
        console.log('Default bucket content: ', rv.data.Contents)
        
        rv = await awsS3.listBucketObjectsWithPrefix('test')
        console.log('Default bucket content with prefix test: ', rv.data.Contents)        

        rv = await awsS3.download('test-01')
        console.log('Read file: ', rv)

        rv = await awsS3.remove('test-01')
        console.log('Remove file: ', rv)

        rv = await awsS3.listBucketObjects()
        console.log('Default bucket content: ', rv.data.Contents)
    });
});