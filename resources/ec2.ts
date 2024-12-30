import { StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as cdk from "aws-cdk-lib";
import { generateResourceName } from "~/util";
import { env, baseTags } from "~/env";
import { installSb } from "~/userData/install_sb";

interface SubStackProps extends StackProps {
  ec2Subnet: ec2.CfnSubnet;
  ec2SecurityGroup: ec2.CfnSecurityGroup;
  ec2Role: iam.CfnRole;
}

export class Ec2 {
  public readonly ec2: ec2.CfnInstance;

  constructor(scope: Construct, props: SubStackProps) {
    /**
     * Instance Profile
     */
    const instanceProfile = new iam.CfnInstanceProfile(scope, "myInstanceProfile", {
      roles: [props.ec2Role.roleName!],
    });
    instanceProfile.addDependency(props.ec2Role);

    const SBInstanceKey = new ec2.CfnKeyPair(scope, "SBInstanceKey", {
      keyName: generateResourceName("SBInstanceKey"),
    });

    const launchTemplate = new ec2.CfnLaunchTemplate(scope, "SBInstanceLaunchTemplate", {
      launchTemplateData: {
        instanceType: env.ec2.instanceType.toString(),
        imageId: env.ec2.ami,
        iamInstanceProfile: {
          name: instanceProfile.ref
        },
        blockDeviceMappings: [
          {
            deviceName: "/dev/sda1",
            ebs: {
              volumeSize: env.ebs.volumeSize,
              volumeType: "gp3",
              deleteOnTermination: true,
            },
          },
        ],
        networkInterfaces: [{
          deviceIndex: 0,
          associatePublicIpAddress: true,
          deleteOnTermination: true,
          subnetId: props.ec2Subnet.attrSubnetId,
          groups: [props.ec2SecurityGroup.attrGroupId],
        }],
        instanceMarketOptions: {
          marketType: "spot",
          spotOptions: {
            spotInstanceType: "one-time",
            instanceInterruptionBehavior: "terminate"
          }
        },
      }
    });

    /**
     * EC2 Instance
     */
    this.ec2 = new ec2.CfnInstance(scope, "SBInstance", {
      launchTemplate: {
        launchTemplateId: launchTemplate.ref,
        version: launchTemplate.attrLatestVersionNumber
      },
      keyName: SBInstanceKey.keyName,
      userData: cdk.Fn.base64(installSb),
      tags: [...baseTags, { key: "Name", value: generateResourceName("SBInstance") }],
    });
  }
}
