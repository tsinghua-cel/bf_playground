# Strategy Introduction

In this section, we will describe 我们如何形式化定义攻击行为. We define a strategy specification format (SSF) in the form of JSON, specifying the exact time each message should be delayed and what content the message should be modified for the Byzantine validators. SSF file is defined as some JSON templates for both order manipulation and content manipulation. Based on the concrete attack strategies (e.g., the number of units each message should be delayed), the corresponding template is "filled". To be specific, in each slot, our SSF defines three factors: `slot` denotes the slot Byzantine validators should take the actions; `actions` denotes the actual attack strategies. One SSF file contains all slots' attack strategies in three epoch. The strategy format is shown in JSON. An example of JSON is as follows:
```JSON
[   
    {
        "slot": "1",
        "actions":{
            "point1": "action1",
            "point2": "action2",
            ...
        },
        "slot": "2",
        "actions":{
            "point1": "action1",
            "point2": "action2",
            ...
        },
        ...
    }
]
```


## Inject Points and Possible Actions

BunnyFinder manipulates validator behavior by injecting faults at various points in the Ethereum PoS protocol. Below are the key inject points, their descriptions, and possible actions:

| Inject Point               | Description                                               | Possible Actions                  | Action Description |
|----------------------------|-----------------------------------------------------------|------------------------------------|---------------------|
| `BlockBeforeBroadCast`     | When Byzantine validators attempt to broadcast a block.  | `return`                          | Prevent block broadcast. |
|                            |                                                           | `delayWithDuration:x`             | Delay block broadcast by `x` durations (x is an integer). |
| `BlockGetNewParentRoot`    | When Byzantine validators fetch the parent block.       | `modifyParentRoot:x`              | Replace parent block with block from slot `x` (x < slot). |
| `BlockBeforeSign`          | Before Byzantine validators pack attestations.          | `packPooledAttest`                | Pack Byzantine attestations. |
| `AttestBeforeBroadCast`    | When Byzantine validators attempt to broadcast attestations. | `return`                     | Prevent attestation broadcast. |
|                            |                                                           | `delayWithDuration:x`             | Delay attestation broadcast by `x` durations. |
| `AttestBeforeSign`         | Before Byzantine validators create an attestation.      | `modifyAttestHead:x`              | Replace head field with block from slot `x` (x ≤ slot). |
|                            |                                                           | `modifyAttestSource:x`            | Replace source field with block from slot `x` (x ≤ slot). |
|                            |                                                           | `modifyAttestTarget:x`            | Replace target field with block from slot `x` (x ≤ slot). |

## Strategy Implementation Example
An example SSF entry for a Byzantine validator delaying block broadcasts and modifying attestations:

```json
[
    {
        "slot": "10",
        "actions": {
            "BlockBeforeBroadCast": "delayWithDuration:2",
            "BlockGetNewParentRoot": "modifyParentRoot:8",
            "AttestBeforeSign": "modifyAttestHead:9"
        }
    }
]
```

This strategy:
- Delays block broadcast by two time units.
- Modifies the parent root of a block.
- Alters the head field in attestations.


