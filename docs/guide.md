# Introduction
Welcome to the BunnyFunder User Manual. This guide will help you get started with installing, configuring, and using the BunnyFunder framework.
# Installation
## Requirements
#### Software Requirements
- Ubuntu 22.04 and later
- Docker 24.0.6 and later
- docker-compose plugin
- kurtosis client

#### Hardware Requirements
- At least 8-cores CPU and 8GB of memory

## Installation Steps
* Clone the repository: `git clone https://github.com/tsinghua-cel/bunnyfinder`
* Enter the directory: `cd bunnyfinder`
* Build the docker images: `make docker`

# Configuration
## Settings
- `image` : The docker image to use for `bunnyfinder` service.
- `dbconnect`: The database connection string, current only support mysql database, e.g. `root:password@tcp(ip:port)/dbname`
- `min_malicious_idx`: The min index that actor as a malicious validator.
- `max_malicious_idx`: The max index that actor as a malicious validator.
- `duration_per_strategy`: The execute duration for each strategy in minutes, this is used when `strategy` is set to `all` or multiple strategies.
- `strategy`: The strategy to use, support `all`, `random`, `exante`, `ext_exante`, `sandwich`, `ext_sandwich`, `staircase`, `ext_staircase`, `unrealized`, `ext_unrealized`, `withholding`, `ext_withholding`.

#### Strategy Description

* all: Execute all existing strategies, switch to a different existing strategy randomly every `duration_per_strategy` minutes.
* random: Randomly generate an attack strategy.
* exante: Execute ex-ante attack.
* ext_exante: Execute ex-ante attack with some additional random attack strategies.
* sandwich: Execute sandwich attack.
* ext_sandwich: Execute sandwich attack with some additional random attack strategies.
* staircase: Execute staircase attack.
* ext_staircase: Execute staircase attack with some additional random attack strategies.
* unrealized: Execute unrealized attack.
* ext_unrealized: Execute unrealized attack with some additional random attack strategies.
* withholding: Execute withholding attack.
* ext_withholding: Execute withholding attack with some additional random attack strategies.


## Example
Bellow is an example of the configuration file, it use the `bunnyfinder:latest` docker image, connect to a local mysql database, and execute the `random` and `exante` strategies with a duration of 30 minutes for each strategy.
```yaml
  image: 'bunnyfinder:latest'
  strategy: 'random,exante'
  dbconnect: 'eth:12345678@tcp(127.0.0.1:3306)/eth'
  max_malicious_idx: "85"
  duration_per_strategy: "30"
```

# Usage
## Basic Usage
We have integrated `Bunnyfinder` into the `ethereum-package`.
You can run tests on an Ethereum PoS network with multiple client versions. Below is an example of running tests and retrieving the results.
#### Start the Test
We provide some scripts and test parameter files in the `guide` directory.

First, you need to switch to the `guide` directory.
```bash
cd guide
```
Then, use the following command to start the test.
```bash
./run.sh testname ./testset/network_params.yaml
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
#### Retrieve the Results
After running the test for at least 3 epochs (about 20 minutes), we can log in to the database to check the results.

Use SQL query to check whether any vulnerabilities have been detected and identify the corresponding strategies.

(1) Log in to the database, enter the password, and then switch to the eth database. When
prompted for a password, enter “12345678”.
```bash
$ docker exec -it ethmysql mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 9.1.0 MySQL Community Server - GPL

mysql> use eth
Database changed
```
(2) Use the following SQL queries to check for specific vulnerabilities:

##### SQL1: This query checks for reorganization events
```sql
SELECT content, reorg_count 
FROM t_strategy 
WHERE reorg_count > 0;
```
If the result is non-empty, it indicates that the current attack has triggered a reorganization, and the \texttt{content} field should be recorded as an effective attack strategy.

##### SQL2: This query checks for increased "honest validator's reward loss"
```sql
SELECT content, honest_lose_rate_avg 
FROM t_strategy 
WHERE honest_lose_rate_avg > 0;
```
If the result is non-empty, it indicates that the current attack has caused an increase in the honest reward loss rate. Again, the `content` field should be recorded as an effective attack strategy.

##### SQL3: This query compares the honest and attacker loss rates
```sql
SELECT content, honest_lose_rate_avg, attacker_lose_rate_avg 
FROM t_strategy 
WHERE honest_lose_rate_avg > attacker_lose_rate_avg;
```
If the result is non-empty, it suggests that the honest reward loss rate is higher than the attacker's loss rate, and the \texttt{content} field should be recorded as an effective attack strategy.

If *SQL1*, *SQL2*, and *SQL3* all return empty results, it means that none of the strategies in the current attack are effective.
Otherwise, it indicates that the attack is successful with some effective strategies.


#### Stop the Test
To stop the test, run the following command:
```bash
./stop.sh testname
```
Due to the limitations of Kurtosis, the test cannot be restarted once it has stopped.




## Advance Usage
This section will introduce how to add new attack strategy in `Bunnyfinder` and define the test network.

### Create Custom Strategies
To define a custom attack strategy, follow these steps:
##### Change the Directory
Move to the `bunnyfinder/library` directory:
```bash
$ cd bunnyfinder/library
```
##### Create a New Strategy
Use an existing strategy as a template.
For example, duplicate the `withholding` strategy and rename it:
```bash
$ cp -r library/withholding library/mystrategy
$ mv library/mystrategy/withholding.go library/mystrategy/mystrategy.go
```
##### Modify the Strategy
Make the following updates in the `library/mystrategy` directory:
- Update package declarations: change the first line in `mystrategy.go`, `check.go`, and `block.go` files from "package withholding" to "package mystrategy".
- Modify the Name method: alter the Name method return value to "mystrategy" in `mystrategy.go`.
- Adjust the Description method: update the Description method to reflect the characteristics of the new strategy.
- Register new strategy: open the `library/library.go` file, find the `Init` function, and add code `register(&mystrategy.Instance{})`.

##### Define Trigger Conditions
The file `check.go` in `library/mystrategy` directory is used to define the trigger conditions for the strategy.

It defines a `CheckDuties` method, which is used to proactively determine whether to issue attack strategies based on the propose duties for each slot in the next epoch.

Then, customize the `CheckDuties` function to define the trigger conditions. An example is shown as follows.
```go
func CheckDuties(param types.LibraryParams, duties []types.ProposerDuty) ([]interface{}, bool) {
    result := make([]interface{}, 0)
    tmpsub := make([]types.ProposerDuty, 0)
    
    for _, duty := range duties {
        valIdx, _ := strconv.Atoi(duty.ValidatorIndex)
        
        if types.IsHackValidator(valIdx, param) {
            tmpsub = append(tmpsub, duty)
        } else {
            if len(tmpsub) >= 3 {
                result = append(result, tmpsub)
            }
            tmpsub = make([]types.ProposerDuty, 0)
        }
    }
    
    if len(tmpsub) >= 3 {
        result = append(result, tmpsub)
    }
    
    if len(result) >= 2 {
        return result, true
    }
    return nil, false
}
```

##### Define Attack Actions
The file `block.go` in `library/mystrategy` directory is used to define detail strategies.

Fill the `GenSlotStrategy` method using the customized strategies. Below is an updated example:
```go
func GenSlotStrategy(allHacks []interface{}) []types.SlotStrategy {
    slotsPerEpoch := globalinfo.ChainBaseInfo().SlotsPerEpoch
    secondsPerSlot := globalinfo.ChainBaseInfo().SecondsPerSlot
    strategys := make([]types.SlotStrategy, 0)

    for _, hack := range allHacks {
        subduties := hack.([]types.ProposerDuty)
        endSlot, _ := strconv.Atoi(subduties[len(subduties)-1].Slot)
        
        for i := 0; i < len(subduties); i++ {
            slot, _ := strconv.Atoi(subduties[i].Slot)
            strategy := types.SlotStrategy{
                Slot:    subduties[i].Slot,
                Level:   1,
                Actions: make(map[string]string),
            }
            
            delaySlots := endSlot - slot + slotsPerEpoch/2
            strategy.Actions["BlockBeforeBroadCast"] = fmt.Sprintf("delayWithDuration:%d", delaySlots*secondsPerSlot)
            strategy.Actions["AttestBeforeBroadCast"] = fmt.Sprintf("delayWithDuration:%d", delaySlots*secondsPerSlot)
            
            strategys = append(strategys, strategy)
        }
    }
    return strategys
}
```

##### Compile and Test
Build the code and generate updated docker images:
```bash
make docker
```
And then, you can refer to the `Basic Usage` section to run the test network with the new strategy.

### Custom Test Network
To be continue.
