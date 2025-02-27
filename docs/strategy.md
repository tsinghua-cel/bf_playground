# Strategy Introduction

In this section, we will describe how we formally define attack behavior.. We define a strategy specification format (SSF) in the form of JSON, specifying the exact time each message should be delayed and what content the message should be modified for the Byzantine validators. SSF file is defined as some JSON templates for both order manipulation and content manipulation. Based on the concrete attack strategies (e.g., the number of units each message should be delayed), the corresponding template is "filled". To be specific, in each slot, our SSF defines three factors: `slot` denotes the slot Byzantine validators should take the actions; `actions` denotes the actual attack strategies. One SSF file contains all slots' attack strategies in three epoch. The strategy format is shown in JSON. An example of JSON is as follows:
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

BunnyFinder manipulates validator behavior by injecting faults at various points in the Ethereum PoS protocol. Below are the key inject points and their possible actions:

| Inject Point               | Description                                               | Possible Actions                  |
|----------------------------|-----------------------------------------------------------|------------------------------------|
| `BlockBeforeBroadCast`     | When Byzantine validators attempt to broadcast a block.  | `return`, `delayWithDuration:x`   |
| `BlockGetNewParentRoot`    | When Byzantine validators fetch the parent block.       | `modifyParentRoot:x`              |
| `BlockBeforeSign`          | Before Byzantine validators pack attestations.          | `packPooledAttest`                |
| `AttestBeforeBroadCast`    | When Byzantine validators attempt to broadcast attestations. | `return`, `delayWithDuration:x` |
| `AttestBeforeSign`         | Before Byzantine validators create an attestation.      | `modifyAttestHead:x`, `modifyAttestSource:x`, `modifyAttestTarget:x` |

## Possible Actions
| Action                     | Description |
|----------------------------|-------------|
| `return`                   | Prevents the validator from broadcasting a block or attestation. |
| `delayWithDuration:x`      | Delays the action by `x` time units (each unit = 4 seconds). |
| `modifyParentRoot:x`       | Replaces the parent block with the block from slot `x`. |
| `packPooledAttest`         | Packs attestations from Byzantine validators. |
| `modifyAttestHead:x`       | Replaces the head field with the block from slot `x`. |
| `modifyAttestSource:x`     | Replaces the source field with the block from slot `x`. |
| `modifyAttestTarget:x`     | Replaces the target field with the block from slot `x`. |

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

## Conclusion
BunnyFinder systematically explores Ethereum PoS incentive vulnerabilities by iteratively refining attack strategies based on execution results. By leveraging SSF-defined strategies, it enables the automated discovery of flaws that could be exploited in real-world blockchain environments.

