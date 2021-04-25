// @NOTE Unused in the public demo

import { config as AWSConfig, CognitoIdentityCredentials } from "aws-sdk/global";
import S3, {
  ListObjectsV2Output,
  ListObjectsV2Request,
  ManagedUpload,
  PutObjectOutput,
  PutObjectRequest
} from "aws-sdk/clients/s3";
import { Promise } from "bluebird";
import config from "@/config.json";

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export default class S3Wrapper {
  public listObjectsV2: (
    params?: Optional<ListObjectsV2Request, "Bucket">
  ) => Promise<ListObjectsV2Output>;
  public putObject: (
    params?: Optional<PutObjectRequest, "Bucket">
  ) => Promise<PutObjectOutput>;
  public upload: (
    params: PutObjectRequest,
    options?: ManagedUpload.ManagedUploadOptions
  ) => Promise<ManagedUpload.SendData>;
  protected s3: S3;

  public constructor(params: {
    region?: string,
    identityPoolID?: string,
    s3?: {
      apiVersion?: string,
      bucket?: string,
      maxKeys?: number
    }
  } = {s3: {}}) {
    const options = {
      ...config.default.aws,
      ...params,
      s3: {
        ...config.default.aws.s3,
        ...params.s3
      }
    };

    if (!options.identityPoolID) {
      throw new Error("Cognito Identity Pool ID must be defined.");
    }

    AWSConfig.update({
      region: options.region,
      credentials: new CognitoIdentityCredentials({IdentityPoolId: options.identityPoolID})
    });

    this.s3 = new S3({
      apiVersion: options.s3.apiVersion,
      params: {
        Bucket: options.s3.bucket,
        MaxKeys: options.s3.maxKeys
      }
    });

    this.listObjectsV2 = Promise.promisify(this.s3.listObjectsV2, {context: this.s3});
    this.putObject = Promise.promisify(this.s3.putObject, {context: this.s3});
    this.upload = Promise.promisify(this.s3.upload, {context: this.s3});
  }

  public get unwrap(): S3 {
    return this.s3;
  }
}
