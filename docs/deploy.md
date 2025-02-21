# Deploying Generated Attacks in Ethereum Testnets: A Closed-Loop Adversarial Testing Framework

In this blog, we show how LLM are deployed with our framework.

**Step 1: Injecting Attacks into the Testnet**  
The **Strategy Executor (SE)** deploys LLM-generated attack strategies, encoded in **Strategy Specification Format (SSF)** files, on a local Ethereum testnet. These files contain specific modifications to the validator client code that simulate adversarial behavior. The core manipulations include:

- **Order Manipulation**: The SE introduces delays in the propagation of blocks and attestations using a priority queue and unit-based timers (e.g., 4-second intervals). This simulates attacks that disrupt the sequence of events in the network.
  
- **Content Manipulation**: The SE allows overriding critical fields in the protocol, such as block parent hashes or attestation checkpoints. This simulates attacks that alter the data within blocks or attestations to deceive the network.

By modifying the testnet environment to reflect these strategies, the SE ensures that the attack scenarios are executed within a controlled, realistic setting.

---

**Step 2: Analyzing Outcomes**  
After deploying the attack strategies, the **State Analyzer (SA)** monitors the Ethereum testnet to evaluate the effects of the attacks. Key performance metrics include:

1. **Reward Imbalances**:  
   - Do Byzantine (malicious) validators gain disproportionate rewards compared to their stake? This metric reveals whether the attack enables malicious actors to exploit the incentive system for personal gain.

2. **Penalty Triggers**:  
   - Are honest validators penalized for following protocol-compliant actions, such as timely attestations? The SA identifies if the attack interferes with legitimate behavior, triggering unjust penalties.

3. **Finalization Failures**:  
   - Does the attack cause chain splits or delay finalization? This metric assesses whether the attack disrupts Ethereum’s ability to reach consensus, potentially forking the chain or causing delays in block finality.

By tracking these outcomes, the SA provides valuable feedback on the effectiveness of each attack and the potential weaknesses in the Ethereum network.

---

**Step 3: LLM-Driven Optimization**  
The results collected by the State Analyzer are fed back into the **LLM (Large Language Model)** for optimization. Based on the feedback, the LLM fine-tunes the attack strategies, improving their effectiveness over time. For instance:

- **Checkpoint Spoofing Attack**:  
  - **Initial SSF**: Byzantine validators spoof source checkpoints in their attestations, misleading the network about the correct chain.
  - **Result**: Honest validators end up finalizing conflicting chains, resulting in a 15% reward loss due to unresolved forks.
  - **Refinement**: The LLM adjusts the attack, timing the checkpoint spoofing to target epochs with higher stake participation, increasing the reward loss to 30% and enhancing the attack’s impact.

This iterative process of **refinement** ensures that the attack strategies are continually improved and adapted to exploit weaknesses in the Ethereum protocol more effectively.

---

### **Case Study: Delayed Block Attack**

One of the most straightforward but effective attacks involves delaying block proposals. Here's an example of how the attack is optimized through BunnyFinder's closed-loop system:

- **Initial Strategy**: Delaying block proposals by 1 unit (4 seconds).
- **Outcome**: Honest validators miss attestation deadlines, resulting in a 10% reduction in rewards.
- **Refinement**: The LLM increases the delay to 3 units (12 seconds), which causes a 40% reward drop. In addition, slashing penalties are triggered due to validator equivocation (attesting to conflicting blocks).

This case study illustrates the power of iterative optimization, where the attack's effectiveness is refined through feedback loops to amplify its impact.

---

### **Why This Matters**

BunnyFinder’s closed-loop adversarial testing framework is a game-changer for Ethereum security testing. Here’s why this system is so valuable:

- **Scalability**:  
  LLMs enable the exploration of attack spaces 100x faster than manual methods. This accelerated testing process allows for the rapid discovery of potential vulnerabilities across Ethereum’s complex protocol.

- **Precision**:  
  By using protocol-aware prompts, BunnyFinder ensures that the LLM generates meaningful and targeted attack strategies. This minimizes the likelihood of generating irrelevant or ineffective strategies (e.g., attacking immutable fields).

- **Adaptability**:  
  The iterative nature of the system means that it continuously uncovers hidden flaws. For example, a simple **checkpoint spoofing attack** could destabilize finalization and compromise Ethereum’s consensus process. With each iteration, the system refines its attack vectors to test more subtle and sophisticated vulnerabilities.
