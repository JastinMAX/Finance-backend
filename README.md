## Run Server

### Running on dev environment

Run `npm run watch:dev `

Server will be served on port 5000 by default, unless PORT is specified in .env

### Running apis locally / postman

- Login with the credentials on either dev or prod hosted domain.
- Go to the network tabs, select the api running and copy the _Authorization_ from the header and paste it into Authorization header of Postman
- Now in _Postman_ Run the api **User/(GET) User select subscription token**. This will attach a _roleToken_ cookie for future requests which is needed for Permission based Authorization in apis
- Great, you can now run and test apis locally

### Running on production environment

Run `npm start`

On running `npm run dev`, server will run on dev environment without nodemon watching changes
On running `npm run prod`, server will run on prod environment without nodemon watching changes

## On Error

If you get any errors of type NODE_ENV when running scripts, make sure that
on winOS the script contains `... SET NODE_ENV=blah && ...` &
on LinuxOS the script contains `... NODE_ENV=blah ...`

## Branching

Start work always from `dev` branch
You can create feature or releases branch as you wish, and when the work is complete, you can merge into dev
e.g.

1. `$ git checkout -b myfeature dev` _Switched to a new branch "myfeature"_ ->
2. `$ git checkout dev` _Switched to branch 'dev'_
3. `$ git merge --no-ff myfeature` _--no-ff creates a new commit_
4. `$ git branch -d myfeature` _delete feature branch_
5. `$ git push origin dev` _push dev branch to origin, all other branches are local_

Once testing is done on dev branch, which is deployed on heroku server. You can merge the dev onto main (prod) branch which is deployed on aws server.
e.g

1. `$ git checkout main`
2. `$ git merge --no-ff dev`
3. `$ git tag -a 1.2`
4. `$ git push origin main`
