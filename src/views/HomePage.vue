<template>
  <div>
    <section id="overview" class="section">
      <h2>Overview</h2>
      <p>BunnyFinder is a novel framework designed to identify incentive flaws in Ethereum's Proof-of-Stake (PoS) protocol with minimal manual effort. Leveraging failure injection techniques, BunnyFinder uncovers both known and new incentive issues, helping to improve Ethereum's stability and security.</p>
      <div class="diagram">
        <div class="diagram-item">
          <img src="../../public/EPTF-arch.png" alt="Diagram 1">
          <p>Key architecture of BunnyFinder</p>
        </div>
        <div class="diagram-item">
          <div class="sub-diagram">
            <img src="../../public/BunnyFinder-strategy_struct.png" alt="Sub Diagram 2a">
            <img src="../../public/bunnyfinder_instruction.png" alt="Sub Diagram 2b">
          </div>
          <p>Execution process of strategies</p>
        </div>
        <div class="diagram-item">
          <div class="sub-diagram">
            <img src="../../public/bunnyfinder_honest_lost_rate.png" alt="Sub Diagram 2a">
          </div>
          <p>Analysis of outcomes</p>
        </div>
      </div>
      <p>Key features include:</p>
      <ul>
        <li>An automated workflow for attack strategy generation and execution.</li>
        <li>Comprehensive analysis of results to identify flaws.</li>
        <li>Support for fine-tuning attack parameters for maximum impact.</li>
      </ul>
    </section>

    <section id="methodology" class="section">
      <h2>Methodology</h2>
      <p>BunnyFinder employs three main components:</p>
      <ul>
        <li><strong>Strategy Generator:</strong> Semi-automatically creates a vast pool of attack strategies.</li>
        <li><strong>Strategy Executor:</strong> Automates the execution of attack strategies.</li>
        <li><strong>State Analyzer:</strong> Evaluates execution logs to identify potential incentive flaws.</li>
      </ul>
      <p>Inspired by software testing techniques like fuzz testing and chaos engineering, BunnyFinder shifts the focus from implementation bugs to design flaws, specifically targeting incentive vulnerabilities in blockchain protocols.</p>
    </section>

    <section id="manual" class="section">
      <h2>User Manual</h2>
      <p>To start using BunnyFinder, please follow these steps:</p>
      <ul>
        <li>Clone the GitHub repository: <a href="https://github.com/tsinghua-cel/attacker-service" target="_blank">BunnyFinder Framework Repository</a>.</li>
        <li>Follow the installation instructions provided in the repository README file.</li>
        <li>Run the predefined test cases to explore existing findings.</li>
        <li>Customize your attack strategies for advanced experiments.</li>
        <li>For detailed operation steps, please refer to our <a href="user_manual.html" target="_blank">User Guide</a>.</li>
      </ul>
    </section>

    <section id="findings" class="section">
      <h2>Key Findings</h2>
      <div class="diagram">
        <div class="diagram-item">
          <p><strong>Finding 1:</strong> Reproduction of a known attack</p>
          <p>We reproduced the Ex-ante Reorganization Attack successfully.</p>
        </div>
        <div class="diagram-item">
          <p><strong>Finding 2:</strong> Three new incentive flaws</p>
          <ul>
            <li><strong>Selfish Mining Attack:</strong> Profitable with only 13.4% stake control.</li>
            <li><strong>Staircase Attack-II:</strong> Exploits penalties for honest validators.</li>
            <li><strong>Pyrrhic Victory Attack:</strong> Situations where honest validators incur greater losses than Byzantine validators.</li>
          </ul>
        </div>
        <div class="diagram-item">
          <p><strong>Finding 3:</strong> Two implementation flaws</p>
          <ul>
            <li>Synchronization Deadlock: Prevents validators from normal operation.</li>
            <li>Erroneous Log Reporting: Misleading reorganization reports.</li>
          </ul>
        </div>
      </div>
      <p>Responsible disclosure of these findings led to Ethereum Foundation's acknowledgment and updates to the protocol.</p>
    </section>

    <section id="resource" class="section">
      <h2>Resource</h2>
      <p>Explore additional resources related to BunnyFinder:</p>
      <ul>
        <li>
          <strong>Datasets:</strong> Access the datasets used in our experiments:
          <a href="https://github.com/tsinghua-cel/datasets" target="_blank">GitHub Repository</a>.
        </li>
        <li>
          <strong>Blog:</strong> Stay updated with the latest developments and insights:
          <a href="https://blog.BunnyFinder.eth" target="_blank">BunnyFinder Blog</a>.
        </li>
        <li>
          <strong>Articles:</strong> Read our published papers and reports: <a href="https://doi.org/10.1000/example" target="_blank">Paper on Ethereum Incentive Flaws</a>
        </li>
      </ul>
    </section>

    <section id="contact" class="section">
      <h2>Contact</h2>
      <p>If you have questions about BunnyFinder or wish to collaborate, please contact us at:</p>
      <ul>
        <li>Email: <a href="mailto:research@BunnyFinder.eth">research@BunnyFinder.eth</a></li>
        <li>GitHub: <a href="https://github.com/tsinghua-cel/attacker-service" target="_blank">BunnyFinder Framework Repository</a></li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const features = ref([
  { id: 1, image: '@/assets/feature1.jpg', title: 'Feature 1', description: 'Description for feature 1' },
  { id: 2, image: '@/assets/feature2.jpg', title: 'Feature 2', description: 'Description for feature 2' },
  { id: 3, image: '@/assets/feature3.jpg', title: 'Feature 3', description: 'Description for feature 3' },
  { id: 4, image: '@/assets/feature4.jpg', title: 'Feature 4', description: 'Description for feature 4' },
])
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f2f5;
  color: #333;
  line-height: 1.6;
}

.section {
  padding: 2rem;
  background-color: #fff;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.section h2 {
  color: #2575fc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.section p, .section ul {
  color: #333;
}

.section ul {
  padding-left: 1.5rem;
}

.section a {
  color: #2575fc;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.section a:hover {
  color: #6a11cb;
}

.diagram {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  margin-bottom: 2rem;
}

.diagram-item {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 300px;
  padding: 1rem;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.diagram-item img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.3rem;
}

.diagram-item p {
  font-size: 1rem;
  color: #555;
  margin: 0;
}

.sub-diagram {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.sub-diagram img {
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: disc;
  margin: 1rem 0;
}

li {
  margin-bottom: 0.5rem;
}

a {
  color: #2575fc;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #6a11cb;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  margin-bottom: 1rem;
}
</style>