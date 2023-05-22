# Set2Score

## Setup

.env file is required at the root of the project. The .env file should contain the following entries.

- MONGO_URL=mongodb://127.0.0.1:27017/set2score
- JWT_SECRET=8f8a9464934306b6a5a44bc08be0b2c679dbda6d
- IMAGES_FOLDER=./images/

Create a folder in the path that corresponds to the environment variable set above [IMAGES_FOLDER]

Make sure mongodb is installed and is running.

## Run

Before running the application, make sure all the dependencies are installed. To do this, open the Terminal (Linux) or Command Prompt (Windows) and navigate to the project root directory. Run the command `yarn install`.

To run the application, use `yarn start` or `yarn debug` to enable debugging mode.

## Production
ubuntu@ec2-44-237-204-140.us-west-2.compute.amazonaws.com

## Staging
ubuntu@ec2-35-80-126-193.us-west-2.compute.amazonaws.com

