# GistMD-proj

In this project I created an app for doctors as end user clients, where they can track their patients and add new patients to the system. 

## Important note

I added the .env files to this project so it is available online for this project. In an actual app going for production, the .env files would have been added to the gitignore file, so it is not available online.

## How to run:

Have a databse available and change DATABASE_URL variable according to the db attached if needed, as well as datasource inputs in schema.prisma.
Once variables are set, open a cli and nevigate to GistMD-proj/back-source, and run `$npm run start:dev`. \
Open another cli and nevigate to GistMD-proj/client, and then run `$npm start`. \
Recommended to open the app using Edge browser, so when opening in "mobile mode" scrolling is available.

### Important:

Start with running backend first before running the client!
