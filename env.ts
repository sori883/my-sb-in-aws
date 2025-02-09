import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";

require("dotenv").config();

export const nodeEnv = {
  APPLICATION_ID: process.env.APPLICATION_ID!,
  DISCORD_TOKEN: process.env.DISCORD_TOKEN!,
  APPLICATION_PUBLIC_KEY: process.env.APPLICATION_PUBLIC_KEY!,
  COMMAND_GUILD_ID: process.env.COMMAND_GUILD_ID!,
  SB_USERNAME: process.env.SB_USERNAME!,
  SB_PASSWORD: process.env.SB_PASSWORD!,
  SNS_MAIL: process.env.SNS_MAIL!
};

export const env = {
  accountId: process.env.ACCOUNTID!,
  projectName: "stable-diffusion",
  region: "us-east-1",
  prefix: "sb",
  azs: {
    a: "us-east-1a",
    c: "us-east-1c",
    d: "us-east-1d",
  },
  vpc: {
    cidrBlock: "10.10.0.0/16",
    subnet: {
      ec2: "10.10.1.0/24",
      endpoint: "10.10.2.0/24",
    },
  },
  ec2: {
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.G4DN, ec2.InstanceSize.XLARGE),
    ami: "ami-020aa8e2ad29a5c33",
  },
  ebs: {
    volumeSize: 100,
  },
};

export const baseTags: cdk.CfnTag[] = [
  { key: "environment", value: env.prefix },
  { key: "project", value: env.projectName },
  { key: "costcenter", value: "cdk" },
];

export const awsEnv = {
  regions: [
    "us-east-1",
    "us-east-2",
    "us-west-1",
    "us-west-2",
    "ap-south-1",
    "ap-northeast-3",
    "ap-northeast-2",
    "ap-southeast-1",
    "ap-southeast-2",
    "us-east-1",
    "ca-central-1",
    "eu-central-1",
    "eu-west-1",
    "eu-west-2",
    "eu-west-3",
    "eu-north-1",
    "sa-east-1",
    "af-south-1",
    "ap-east-1",
    "ap-south-2",
    "ap-southeast-3",
    "ap-southeast-5",
    "ap-southeast-4",
    "ca-west-1",
    "eu-south-1",
    "eu-south-2",
    "eu-central-2",
    "me-south-1",
    "me-central-1",
    "il-central-1",
  ],
  managedPrefixList: {
    s3: "pl-63a5400a",
  },
  ManagedPolicy: {
    AmazonSSMManagedInstanceCore: "AmazonSSMManagedInstanceCore",
    AmazonS3FullAccess: "AmazonS3FullAccess",
    AWSLambdaBasicExecutionRole: "service-role/AWSLambdaBasicExecutionRole",
    AmazonEC2FullAccess: "AmazonEC2FullAccess",
    AWSLambdaRole: "service-role/AWSLambdaRole",
  },
};
