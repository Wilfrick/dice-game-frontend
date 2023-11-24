# dice-game-frontend

This is the frontend for a browser based multiplayer dice game, based on Perudo and Liar's Dice.

This project was built with React + Vite

This is currently a work in progress and you can see a live demo [here](http://aw808.user.srcf.net/)


# Running locally
To serve the app in dev mode use `npm run dev`. To build and then serve in production mode (using a local testing server) use `npm run build` followed by `npm run preview`. If you are running `npm` for the first time after cloning the repo you may need to run `npm install` to make sure you have a local copy of the dependencies that Vite and React need to be built.

To see the game in action you will need to run the back end, which can be found [here](https://github.com/Wilfrick/dice-game-backend)

The config.json file contains host:port information that the front end uses to connect to the back end. If your local version runs but doesn't seem to be connected make sure that both the front and back end have the same config.json.

# Deployment

The command `npm run build` will create a set of static files that need to be hosted on a webserver. `update.sh` provides an example for how that can be used to deploy this app.
