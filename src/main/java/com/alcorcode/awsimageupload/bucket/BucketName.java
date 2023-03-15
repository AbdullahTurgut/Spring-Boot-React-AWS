package com.alcorcode.awsimageupload.bucket;

public enum BucketName {
    PROFILE_IMAGE("aws.amazon.com-amazon-s3-bucket-kısmı");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
