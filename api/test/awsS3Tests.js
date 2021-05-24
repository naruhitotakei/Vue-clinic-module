const chai = require('chai')
const should = require('chai').should();
const fs = require('fs');

const awsS3 = require('../services/awsS3')

describe('aws-test', async function () {

    it('should list buckets', async function () {
        rv = await awsS3.listBuckets()
        console.log('Avaliable buckets: ', rv)
    });
    
    it('should list default bucket content', async function () {
        rv = await awsS3.listBucketObjects()
        console.log('Default bucket content: ', rv.data.Contents)
    });
    
    it('should upload file', async function () {
        const fileContent = fs.readFileSync('./test/test-01.txt');
        rv = await awsS3.upload('test-01', fileContent, 'text/plain')
        console.log('Upload file test-01:', rv)
    });
    
    it('should list default bucket content again', async function () {
        rv = await awsS3.listBucketObjects()
        console.log('Default bucket content: ', rv.data.Contents)
    });
    
    it('should read file', async function () {
        rv = await awsS3.download('test-01')
        console.log('Read file: ', rv)
    });
    
    it('should remove file', async function () {
        rv = await awsS3.remove('test-01')
        console.log('Remove file: ', rv)
    });
    
    it('should list default bucket content jet again', async function () {
        rv = await awsS3.listBucketObjects()
        console.log('Default bucket content: ', rv.data.Contents)
    });
});