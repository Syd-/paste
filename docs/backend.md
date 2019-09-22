# Setting up the back end on AWS

## Set up DynamoDB table

1. I created a table called `paste` with `id` (string) as primary partition key.
1. I went to its Overview and clicked `Manage TTL`. I set the TTL attribute to `expiry`.

## Create a IAM role for paste

1. I created an IAM role called `lambda_paste` and gave it the following policies. These are a bit lax and can be tightened.
 - AmazonS3FullAccess
 - AmazonDynamoDBFullAccess
 - AWSLambdaBasicExecutionRole

## Set up S3 bucket

1. I created a new S3 bucket called `pasted`, and gave it public access permissions.
1. I allowed it to permit `Static Website Hosting` in `Properties`. (This value is `export const readURL` in `shared/urls.ts` (not in github))
1. I set up `CORS` in `Permissions` to Allowed Origin from my website. (I also added `localhost:4200` for testing, but I have removed it now.)
```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>http://siddhant.name</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <ExposeHeader>ETag</ExposeHeader>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

## Set up AWS Lambda functions
1. I created a `pasteDelete` function. This function listens to DynamoDB events from `paste`. When `paste` deletes a record, this function deletes the corresponding file in S3. This uses the `lambda_paste` role.
1. I created a `pastePost` function. This function listens to a put event. It first generates a random unused shortlink id, then creates an entry in DynamoDB with the id, finally creating a file in S3 with the id (and contents of what has been posted). It returns the `id` on success. 

## Set up API gateway
1. I created a new API (called paste) and created a `PUT` method for it. I then connected the PUT method to provide input to the `pastePost` function. Finally, I set up CORS to my site. (I had set it to `*` for testing, but that's dangerous) (This endpoint from this is `export const writeURL` in `shared/urls.ts` (not in github))
