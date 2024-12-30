#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { env } from "~/env";
import { MainStack, StoreStack } from "~/lib/stack";
const app = new cdk.App();

new MainStack(app, "MainStack", {
  env: {
    account: env.accountId,
    region: env.region,
  },
});

new StoreStack(app, "StoreStack", {
  env: {
    account: env.accountId,
    region: env.region,
  },
});
