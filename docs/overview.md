# System overview

The goal of this project is to automate the discovery of potential vulnerabilities in Ethereum’s incentive mechanisms using large language models (LLMs) like [GPT](https://openai.com/) and [Deepseek](https://www.deepseek.com/). This process leverages the power of LLMs to generate better attack strategies and refine the strategies using previous results, all in the context of Ethereum’s consensus protocols and incentive structures.


Finding these flaws is notoriously challenging due to two key hurdles:

- **Generating Effective Attack Strategies**: The space of potential malicious behaviors is vast, and manual exploration is impractical. Ethereum’s validators can behave arbitrarily—delaying blocks, withholding attestations, or manipulating message content. Even with only two basic malicious actions (order and content manipulation), the attack space explodes combinatorially. For example, delaying messages by just two epochs creates $128^{96}$ possible strategies, far beyond manual analysis.
- **Refining Attack Strategies**: Once attack strategies are discovered, it’s essential to fine-tune and improve them based on feedback from previous attempts. This step involves systematically optimizing strategies to be as effective as possible while remaining within the bounds of Ethereum’s protocol rulesattack strategy


#### Why LLMs?

Traditional fuzz testing generates random inputs, but Ethereum’s incentive flaws require semantically meaningful deviations from protocol rules. LLMs bridge this gap by combining protocol knowledge with creative adversarial reasoning, significantly reducing manual effort.

## Designing the Prompts

To guide the LLM effectively, it’s crucial to craft well-defined and precise prompts that provide the model with enough context and specificity. The prompts are designed to probe the incentive mechanisms under different scenarios and configurations, asking the LLM to analyze potential vulnerabilities or inefficiencies.

We approach prompt design in several key areas:

1. **Enviroment setting**: We ensure the model learns the full scope of Ethereum’s protocol design as well as the architecture of the Bunnyfinder framework. This provides the model with a foundation for understanding both the Ethereum protocol and the mechanisms we are testing.


2. **Well-defined strateg space**: The model needs clear boundaries on what constitutes an attack strategy. By defining a limited, well-structured space of strategies, we avoid overwhelming the model with an unmanageable set of possibilities.

3. **Well-defined Input and Output**: The prompts are structured such that the model’s outputs are directly connected to the Bunnyfinder framework, enabling real-time application of attack strategies. This ensures a smooth interface between the model’s reasoning and the system’s decision-making processes.


## Interacting with Large Models

The core of the discovery process involves interacting with large models to simulate how Ethereum’s incentive mechanisms might fail. This is not a simple Q&A; rather, it’s a conversational process in which the model is asked to reason through different situations and provide analyses. The following steps outline the typical interactions:

1. Initial Exploration: Begin by posing a broad question about Ethereum’s incentive structure, allowing the model to explain its understanding of how it works. This provides a baseline for what the model “knows” about Ethereum’s design.
2. Scenario Simulation: Once the initial understanding is established, we present specific scenarios where a potential vulnerability may arise. The model is tasked with considering how changes in variables (like a subset of malicious actors) might impact the system’s integrity.
3. Vulnerability Assessment: The model is asked to consider different attack strategies and assess the potential consequences for Ethereum’s network. This step simulates adversarial thinking, where the model considers how an attacker might exploit weaknesses in the system.
4. Validation and Refinement: After the model provides a response, we refine the prompts based on the feedback. This iterative process helps to pinpoint specific areas of vulnerability that might not be apparent from the first round of questioning.

## Analyzing Model Responses

Once the model provides its responses, we evaluate them to identify vulnerabilities, inefficiencies, or points of failure within Ethereum’s incentive design. The evaluation process involves cross-referencing the model’s responses with known vulnerabilities or design issues in the Ethereum ecosystem, as well as using domain knowledge to validate the insights.

The process is iterative, meaning that new insights gained from one round of interaction are used to refine the prompts and guide further questioning. This allows the model to continue exploring deeper aspects of Ethereum’s incentive mechanisms and uncover vulnerabilities that may have been missed initially.


### References

1. **Proof of Staked Authority (PoSA)**  
   [https://academy.binance.com/en/glossary/proof-of-staked-authority-posa](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa)

2. **Proof-of-authority (PoA)**  
   [https://ethereum.org/en/developers/docs/consensus-mechanisms/poa/](https://ethereum.org/en/developers/docs/consensus-mechanisms/poa/)

3. **Proof-of-stake (PoS)**  
   [https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/)

4. **Github for BNB-chain Parlia Implementation**  
   [https://github.com/bnb-chain/bsc/tree/master/consensus/parlia](https://github.com/bnb-chain/bsc/tree/master/consensus/parlia)