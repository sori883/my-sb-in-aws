# stable-diffusion-aws
## Usage
### 1. env
rename .env.example to .env

### 2.Bootstrap
```
cdk --profile your_profile bootstrap
```

### 3.Deploy StoreStack(S3)
```
cdk --profile your_profile deploy "StoreStack" --require-approval never
```

### 4.DownLoad Models and Upload S3
like the image below


### 5.Deploy MainStack(EC2)
```
cdk --profile your_profile deploy "MainStack" --require-approval never
```

