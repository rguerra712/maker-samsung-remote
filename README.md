# maker-samsung-remote
Programming a smart samsung TV using maker and webtask (from IFTTT) on your local network

# Usage
1. Follow the ![steps to setup a webtask queue](https://github.com/rguerra712/webtask-queue/) and the environment variables needed
  1. Be sure to set the environment variables for `MAKER_WEBTASK_URL` and `WEBTASK_SECRET`
1. If you know what range of ports your tv is running, add it to the environment variable `SAMSUNG_IP_RANGE`
  1. e.g. `SAMSUNG_IP_RANGE=100-140`
1. Install the package via `npm install maker-samsung-remote`
1. Run the application `npm run maker-samsung-remote`
1. You can now control your TV by making API calls to webtask (or having maker make API calls to maker)

# Example:
1. Setup IFTTT such that IF is a Google Assistant call (or whatever tricker you want) to raise the tv off
2. Run the application above, with the MAKER_WEBTASK_URL environment variable set to https://wt-myemail-gmail-com-0.run.webtask.io and the WEBTASK_SECRET variable set to somesecret (NOTE: these need to be your own url and secret)
3. Setup Maker to POST to your API queue, for example:
`POST` to https://wt-myemail-gmail-com-0.run.webtask.io/queue?secret=somesecret
```{
  "device": "tv",
  "command": "off"
}```
4. Watch your tv turn off if successful
