# WalletConnect Bridge Server ⏮️🖥️⏭️

Bridge Server for relaying WalletConnect connections. 

This is a fork from WalletConnect version. 

I have added support for deploying to AWS elastic beanstalk instead of running within docker. one still need to have a running redis server but that is simple to setup(either get it from AWS or spin up another EC2 instance, and I have changed the EB script to include one)

The main purpose of this fork is really about having an easy to scale out setup using AWS elastic beanstalk(with/without ELB) for production usage. Docker is good but scaling that out would be too complicated(Kubernetes).

Concerning AWS elastic beanstalk, I just port from a python template I work on at here. read more about it there

https://github.com/garyng2000/flaskweb

## Development 🧪

Local dev work is using local self signed certificates within the docker environment.

Your Walletconnect enabled app needs to be on the same local network.

```
make dev # ports 80, 443, 5001, 6379 will be exposed locally
```

## Production 🗜️

#### Setting up docker 🎚️

Dependencies:
- git
- docker
- make

You will need to have docker swarm enabled:

```bash
docker swarm init
# If you get the following error: `could not chose an IP address to advertise...`. You can do the following:
docker swarm init --advertise-addr `curl -s ipecho.net/plain`
```

### Deploying 🚀

Run the following command and fill in the prompts:

```bash
git clone https://github.com/WalletConnect/node-walletconnect-bridge
cd node-walletconnect-bridge
make deploy
Bridge URL domain: <your bridge domain>
Email for SSL certificate (default noreply@gmail.com):
```

#### Additional Monitoring with Grafana

If you want a grafana dashboard you can use the following commands:

```bash
git clone https://github.com/WalletConnect/node-walletconnect-bridge
cd node-walletconnect-bridge
make deploy-monitoring
Bridge URL domain: <your bridge domain>
Email for SSL certificate (default noreply@gmail.com):
```

For this to work you must point grafana.`<bridge domain>` to the same ip as `<bridge domain>`.

#### Cloudflare Support

The config step of the Makefile will ask you whether you are using cloudflare as a DNS proxy for your bridge domain. If you answer yes then the certbot will need a Cloudflare API token that can be obtained from: https://dash.cloudflare.com/profile/api-tokens. The type of token you need is a `Edit zone DNS` with access to the bridge domain.

The API token will be safeguarded with a `docker secret`.

### Upgrading ⏫

This will upgrade your current bridge with minimal downtime. 

⚠️ ATTENTION: This will run `git fetch && git merge origin/master` in your repo ⚠️

```bash
make upgrade
```

### Monitoring 📜

This stack deploys 3 containers one of redis, nginx and node.js. You can follow the logs of the nginx container by running the following command:

```
docker service logs --raw -f walletconnect_nginx
```
