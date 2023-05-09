#!/usr/bin/env node

import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";

//gets arguments without first 2
const args = minimist(process.argv.slice(2));

function exit(x) {
    process.exit(x);
}

//adding help message for -h
if (args.h) {

    console.log(`
    Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -t TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -t            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`)
    exit(0);

}

//using minimist to parse data from command line instructions
const zone = moment.tz.guess();

const longitude = args.e || args.w*-1;
const latitude = args.n || args.s*-1;

//gets data from url of api
const res = await fetch('https://api.open-meteo.com/v1/forecase?latitude='+ latitude +'&longitude='+ longitude + '&hourly=temperature_2m');
//converts data to json
const data = await res.json();

// print data if -j command
if (args.j) {
    console.log(data);
    exit(0);
}


if (args.d == 0) {console.log("today.");}

if (args.d > 1) {console.log("in " + args.d)}

if (args.d <= 1) {console.log("tomorrow")};