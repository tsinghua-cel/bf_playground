
# Advance Usage
This section will introduce how to add new attack strategy in `Bunnyfinder` and define the test network.

## Create Custom Strategies
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
And then, you can configure to run the test with new strategy.

```yaml
  image: 'bunnyfinder:latest'
  strategy: 'mystrategy'
  dbconnect: 'eth:12345678@tcp(127.0.0.1:3306)/eth'
  max_malicious_idx: "85"
  duration_per_strategy: "30"
```
