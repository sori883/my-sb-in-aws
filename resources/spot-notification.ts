import { Construct } from "constructs";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subscriptions from "aws-cdk-lib/aws-sns-subscriptions";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import { nodeEnv } from "~/env";

export class StopNotificationStack {
  constructor(scope: Construct) {
    const topic = new sns.Topic(scope, "EC2StopTopic", {
      topicName: "ec2-stop-notification",
      displayName: "EC2インスタンスが停止しました。",
      });
      topic.addSubscription(new subscriptions.EmailSubscription(nodeEnv.SNS_MAIL));
    
      const rule = new events.Rule(scope, "EC2StopRule", {
      eventPattern: {
        source: ["aws.ec2"],
        detailType: ["EC2 Spot Instance Interruption Warning"],
      },
      });
      rule.addTarget(new targets.SnsTopic(topic));
  }
}