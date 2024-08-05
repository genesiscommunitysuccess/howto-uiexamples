# UIExamples

This project has been created from the Genesis Blank Application Seed. Our seeds allow users to quickly bootstrap
their projects. Each seed adheres to strict Genesis best practices, and has passed numerous performance, compliance and
accessibility checks. 

Example Application for showing the possibilities in the front end

# Introduction

This application is set up to show the power of the Genesis front end, with multiple UI's shown, with links to the
corresponding code.
The back end is purposely kept simple, with little functionality.  It contains:
1. Static data tables for Entity and Client
2. Trade table with 10 pre-loaded trades
3. Kafka topic subscription for FX Rates, to show ticking data in the front end
4. Time series data of inflation rates for use in charting

The login is admin / genesis


## Next Steps

To get a simple application running check the [Quick Start](https://learn.genesis.global/docs/getting-started/quick-start/) guide.

If you need an introduction to the Genesis platform and its modules it's worth heading [here](https://learn.genesis.global/docs/getting-started/learn-the-basics/simple-introduction/).


## Project Structure

This project contains **server** and **client** directories which contain the server and client code respectively.

### Server

The server code for this project can be found [here](./server/README.md).
It is built using a DSL-like definition based on the Kotlin language: GPAL.

When first opening the project, if you receive a notification from IntelliJ IDE detecting Gradle project select the option to 'Load as gradle project'.

### Web Client

The Web client for this project can be found [here](./client/README.md). It is built using Genesis's next
generation web development framework, which is based on Web Components.

# License

This is free and unencumbered software released into the public domain. For full terms, see [LICENSE](./LICENSE)

**NOTE** This project uses licensed components listed in the next section, thus licenses for those components are required during development.

## Licensed components
Genesis low-code platform
