# System overview

Finding these flaws is notoriously challenging due to two key hurdles:

- **Generating Attack Strategies**: The space of potential malicious behaviors is vast, and manual exploration is impractical.
- **Executing Attacks in a Distributed Environment**: Testing attack strategies on live systems risks disrupting the network or triggering unintended penalties.

These challenges raise an important question: Can we find incentive flaws in Ethereum with minimal manual effort?

## Automating Detection with LLMs and Fault Injection

Our approach is inspired by software testing tools like penetration testing, chaos engineering, and fuzz testing. However, unlike these tools, which focus on implementation bugs, our approach targets design flaws, particularly those related to incentives.

### LLM-Based Strategy Generation

Ethereum’s validators can behave arbitrarily—delaying blocks, withholding attestations, or manipulating message content. Even with only two basic malicious actions (order and content manipulation), the attack space explodes combinatorially. For example, delaying messages by just two epochs creates $128^{96}$ possible strategies, far beyond manual analysis.

To tackle this, we leverage large language models (LLMs) trained on Ethereum’s protocol documentation and historical attack patterns. The LLM acts as a "malicious strategist," simulating adversarial reasoning to propose attack variants. Here’s how it works:

1. **Prompt Design**: The LLM is prompted to generate attack scenarios based on Ethereum’s incentive rules. For example: "Generate a strategy where Byzantine validators delay blocks to maximize honest validators’ penalties while minimizing their own losses." *rujia: mingfei add*

2. **Scenario Filtering**: The LLM outputs are filtered using predefined rules (e.g., excluding physically impossible delays) and ranked by potential profitability.

3. **Parameterization**: Valid strategies are converted into executable parameters (e.g., delay duration, message fields to modify).

#### Why LLMs?

Traditional fuzz testing generates random inputs, but Ethereum’s incentive flaws require semantically meaningful deviations from protocol rules. LLMs bridge this gap by combining protocol knowledge with creative adversarial reasoning, significantly reducing manual effort.

### Fault Injection in a Controlled Network

We execute attacks in a controlled Ethereum network using fault injection, a technique borrowed from chaos engineering. Key steps include:

1. **Testnet Setup**: Setup a local Ethereum testnet that mirrors the mainnet’s state, including validators, stake distribution, and network conditions.

2. **Fault Injection**: We modify Prysm’s codebase to inject malicious behaviors (e.g., delaying blocks, altering attestations) at runtime.

3. **Testnet Setup**: (This section is repeated in the original document and might need clarification).

#### Why Fault Injection?

- **Precision**: Directly modifies validator behavior without disrupting the broader network.
- **Reproducibility**: Logs network states, rewards, and penalties for post-analysis.
- **Safety**: Isolates attacks from real-world systems.

#### Why This Matters

1. **For Developers**: BunnyFinder’s LLM-driven approach reduces reliance on expert knowledge, democratizing security analysis.
2. **For Researchers**: Fault injection enables safe exploration of "what-if" scenarios without endangering live networks.
3. **For Ethereum**: Automated flaw detection strengthens the protocol’s resilience against evolving threats.

## Summary

Incentive flaws are a critical vulnerability in blockchain systems, yet their detection remains labor-intensive and error-prone. BunnyFinder addresses this by combining LLM-based strategy generation with safe fault injection, automating the discovery process. As Ethereum evolves, tools like BunnyFinder will be essential to ensure its incentive mechanisms remain robust against adversarial creativity.

For questions or collaborations, contact

---

### References

1. **Proof of Staked Authority (PoSA)**  
   [https://academy.binance.com/en/glossary/proof-of-staked-authority-posa](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa)

2. **Proof-of-authority (PoA)**  
   [https://ethereum.org/en/developers/docs/consensus-mechanisms/poa/](https://ethereum.org/en/developers/docs/consensus-mechanisms/poa/)

3. **Proof-of-stake (PoS)**  
   [https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/)

4. **Github for BNB-chain Parlia Implementation**  
   [https://github.com/bnb-chain/bsc/tree/master/consensus/parlia](https://github.com/bnb-chain/bsc/tree/master/consensus/parlia)

5. **BEP-126: Introduce Fast Finality Mechanism**  
   [https://github.com/](https://github.com/)