# Basic Usage
We have integrated `Bunnyfinder` into the `ethereum-package`.
You can run tests on an Ethereum PoS network with multiple client versions. Below is an example of running tests and retrieving the results.

## Start the Test
First, you need to start the test environment. The test environment is based on the `mysql` database and `bfbackend`.
```bash
$ docker compose up -d
```

Then, use the following command to start the test.
```bash
$ ./scripts/run.sh bftest ./networkparams/example
```
Here, we are running three sets of beacon nodes, each using a different client. The execution layer includes `besu`, `geth`, and `nethermind`, while the consensus layer includes `prysm`, `lighthouse`, and `teku`.

When the following log appears, it indicates that the entire test has run successfully.
```text
========================================== User Services ==========================================
UUID           Name                                             Ports                                         Status
90ee4bff7ac7   bunnyfinder                                      http: 19000/tcp -> http://127.0.0.1:32828     RUNNING
0a95359926df   cl-1-prysm-besu                                  http: 3500/tcp -> http://127.0.0.1:32819      RUNNING
                                                                metrics: 8080/tcp -> http://127.0.0.1:32816   
                                                                profiling: 6060/tcp -> 127.0.0.1:32817        
                                                                rpc: 4000/tcp -> 127.0.0.1:32818              
                                                                tcp-discovery: 13000/tcp -> 127.0.0.1:32815   
                                                                udp-discovery: 12000/udp -> 127.0.0.1:32777   
895d9bf907f9   cl-2-lighthouse-geth                             http: 4000/tcp -> http://127.0.0.1:32822      RUNNING
                                                                metrics: 5054/tcp -> http://127.0.0.1:32821   
                                                                tcp-discovery: 9000/tcp -> 127.0.0.1:32820    
                                                                udp-discovery: 9000/udp -> 127.0.0.1:32778    
5c8e2e2c7c7d   cl-3-teku-nethermind                             http: 4000/tcp -> http://127.0.0.1:32825      RUNNING
                                                                metrics: 8008/tcp -> http://127.0.0.1:32824   
                                                                tcp-discovery: 9000/tcp -> 127.0.0.1:32823    
                                                                udp-discovery: 9000/udp -> 127.0.0.1:32779    
af977800bf29   el-1-besu-prysm                                  engine-rpc: 8551/tcp -> 127.0.0.1:32802       RUNNING
                                                                metrics: 9001/tcp -> http://127.0.0.1:32801   
                                                                rpc: 8545/tcp -> 127.0.0.1:32804              
                                                                tcp-discovery: 30303/tcp -> 127.0.0.1:32800   
                                                                udp-discovery: 30303/udp -> 127.0.0.1:32774   
                                                                ws: 8546/tcp -> 127.0.0.1:32803               
b861d349ff1a   el-2-geth-lighthouse                             engine-rpc: 8551/tcp -> 127.0.0.1:32807       RUNNING
                                                                metrics: 9001/tcp -> http://127.0.0.1:32806   
                                                                rpc: 8545/tcp -> 127.0.0.1:32809              
                                                                tcp-discovery: 30303/tcp -> 127.0.0.1:32805   
                                                                udp-discovery: 30303/udp -> 127.0.0.1:32775   
                                                                ws: 8546/tcp -> 127.0.0.1:32808               
8900b3150379   el-3-nethermind-teku                             engine-rpc: 8551/tcp -> 127.0.0.1:32812       RUNNING
                                                                metrics: 9001/tcp -> http://127.0.0.1:32811   
                                                                rpc: 8545/tcp -> 127.0.0.1:32814              
                                                                tcp-discovery: 30303/tcp -> 127.0.0.1:32810   
                                                                udp-discovery: 30303/udp -> 127.0.0.1:32776   
                                                                ws: 8546/tcp -> 127.0.0.1:32813               
5578c58fd8d8   validator-key-generation-cl-validator-keystore   <none>                                        RUNNING
ff8b93b77564   vc-1-besu-prysm                                  metrics: 8080/tcp -> http://127.0.0.1:32826   RUNNING
305d686276e2   vc-2-geth-lighthouse                             metrics: 8080/tcp -> http://127.0.0.1:32827   RUNNING
```
## Retrieve the Results
After running the test for at least 3 epochs (about 20 minutes), we can view the result at browser `http://localhost:35770/`. 

The results will be displayed in a table format, showing the strategies and their effectiveness.


## Stop the Test
To stop the test, run the following command:
```bash
$ ./scripts/stop.sh bftest
```
Due to the limitations of Kurtosis, the test cannot be restarted once it has stopped.

The script will dump all service logs to the `./logs` directory, which can be useful for debugging or further analysis.