# Serverless Stack Demo API

[Serverless Stack](http://serverless-stack.com) is a free comprehensive guide to creating full-stack serverless applications. We create a [note taking app](http://demo2.serverless-stack.com) from scratch.

This repo is for the serverless backend API that we build over the course of the tutorial. You can find the repo for the frontend React app [here](https://github.com/AnomalyInnovations/serverless-stack-demo-client). And the repo for the tutorial [here](https://github.com/AnomalyInnovations/serverless-stack-com).

#### Steps

To support the different chapters and steps of the tutorial; we use branches to represent the project codebase at the various points. Here is an index of the various chapters and branches in order.

- [Initialize the Backend Repo](../../tree/initialize-the-backend-repo)
- [Handle API Gateway CORS Errors](../../tree/handle-api-gateway-cors-errors)
- [Deploy Your Serverless Infrastructure](../../tree/deploy-your-serverless-infrastructure)

#### Usage

To use this repo locally you need to have the [Serverless framework](https://serverless.com) installed.

``` bash
$ npm install serverless -g
```

Clone this repo and install the NPM packages.

``` bash
$ git clone https://github.com/AnomalyInnovations/serverless-stack-demo-api
$ npm install
```

Run a single API on local.

``` bash
$ serverless invoke local --function list --path event.json
```

Where, `event.json` contains the request event info and looks something like this.

``` json
{
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "USER-SUB-1234"
      }
    }
  }
}
```

Finally, run this to deploy to your AWS account.

``` bash
$ serverless deploy
```

This project refers to an `.env` file for secret environment variables that are not checking in to the repo. Make sure to create one before dpeloying - https://serverless-stack.com/chapters/load-secrets-from-env.html.


or 

``` bash
$ serverless deploy function --function find
```

For just a function update

https://fy9hpw4mfa.execute-api.us-east-2.amazonaws.com/dev/find

npx aws-api-gateway-cli-test --invoke-url https://fy9hpw4mfa.execute-api.us-east-2.amazonaws.com/dev --api-gateway-region us-east-2 --path-template /find --method POST --body "{\"lat\":\"61.21759217\",\"lng\":\"-149.8935557\"}"

npx aws-api-gateway-cli-test --username admin@example.com --password Passw0rd! --user-pool-id us-east-2_2kKklLdqN --app-client-id 34e9kptne291p770648bcmoarb --cognito-region us-east-2 --identity-pool-id us-east-2:34ca4eb3-3887-44f5-89e5-409aca93ee88  --invoke-url https://fy9hpw4mfa.execute-api.us-east-2.amazonaws.com/dev --api-gateway-region us-east-2 --path-template /find --method POST --body "{\"lat\":\"61.21759217\",\"lng\":\"-149.8935557\"}"

Sort of works:

npx aws-api-gateway-cli-test --username admin@example.com --password Passw0rd! --user-pool-id us-east-2_2kKklLdqN --app-client-id 34e9kptne291p770648bcmoarb --cognito-region us-east-2 --identity-pool-id us-east-2:34ca4eb3-3887-44f5-89e5-409aca93ee88  --invoke-url https://fy9hpw4mfa.execute-api.us-east-2.amazonaws.com/dev --api-gateway-region us-east-2 --path-template /find --method POST --body "{\"lat\":\"61.21759217\",\"lng\":\"-149.8935557\"}"

---

This repo is maintained by [Anomaly Innovations](https://anoma.ly); makers of [Seed](https://seed.run) and [Serverless Stack](https://serverless-stack.com).

[Email]: mailto:contact@anoma.ly
