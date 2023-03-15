package com.alcorcode.awsimageupload.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonConfig {
    // CREATING S3 CLIENT
    @Bean // with (Bean) we can inject other classes
    public AmazonS3 s3(){
        // aws.amazon.com'dan alıyoruz bunu (accessKey ve secretKey'i)
        AWSCredentials awsCredentials = new BasicAWSCredentials(
                "1234asvb-123a-4saa-a5sd-34asds34a2sd",
                "123asd"

        );
        
        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
