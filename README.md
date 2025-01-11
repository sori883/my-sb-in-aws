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

### 4.Upload Your Assets to S3
set the folder names to the following
- embeddings/
- Lora/
- Stable-diffusion/
- VAE/


### 5.Deploy MainStack(EC2)
```
cdk --profile your_profile deploy "MainStack" --require-approval never
```

