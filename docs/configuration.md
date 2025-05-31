# Configuration
## Settings
- `image` : The docker image to use for `bunnyfinder` service.
- `dbconnect`: The database connection string, current only support mysql database, e.g. `root:password@tcp(ip:port)/dbname`
- `min_malicious_idx`: The min index that actor as a malicious validator.
- `max_malicious_idx`: The max index that actor as a malicious validator.
- `duration_per_strategy`: The execute duration for each strategy in minutes, this is used when `strategy` is set to `all` or multiple strategies.
- `strategy`: The strategy to use, all supported strategy is listed in [strategy description](#strategy-description).
- `openai_key`: The openai api key, this is used when `strategy` is set to `ai`, also supported DeepSeek api.
- `openai_base_url`: The openai base url, this is used when `strategy` is set to `ai`, also supported DeepSeek api.
- `llm_model`: The large language model to use, this is used when `strategy` is set to `ai`, We recommend using deepseek-r1, deepseek-v3, gpt-4o.
- `replay_project`: The project uuid to replay the attack strategies from the database, this is used when `strategy` is set to `replay`.

#### Strategy Description

* simple: Execute a simple attack strategy, which is a random attack strategy without any profile.
* random: Randomly generate an attack strategy with a random profile.
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
* ai: Use AI to generate attack strategies.
* replay: Replay the attack strategies from the database, this is used for testing and debugging.
* syncwrong: Execute a sync attack.
* all: Execute all existing strategies, switch to a different existing strategy randomly every `duration_per_strategy` minutes.

## Example
Bellow is an example of the configuration file, it use the `tscel/bunnyfinder:stable` docker image, connect to a local mysql database, and execute the `random` and `exante` strategies with a duration of 30 minutes for each strategy.
```yaml
  image: 'tscel/bunnyfinder:stable'
  strategy: 'random,exante'
  dbconnect: 'eth:12345678@tcp(127.0.0.1:3306)/eth'
  max_malicious_idx: "85"
  duration_per_strategy: "30"
```

Below is an example of the configuration file, using the `deepseek-r1` model provided by `aliyun`, the `tscel/bunnyfinder:stable` docker image, connecting to a local MySQL database, and executing the `ai` strategy.
```yaml
  image: 'tscel/bunnyfinder:stable'
  strategy: 'ai'
  dbconnect: 'eth:12345678@tcp(127.0.0.1:3306)/eth'
  max_malicious_idx: "85"
  openai_key: "sk-xxxxxxxxx"
  openai_base_url: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  llm_model: "deepseek-r1"
```

Below is an example of the configuration file, connect to a local MySQL database, and execute the `replay` strategy to replay the attack strategies from the database.
```yaml
  image: 'tscel/bunnyfinder:stable'
  strategy: 'replay'
  dbconnect: 'eth:12345678@tcp(127.0.0.1:3306)/eth'
  max_malicious_idx: "85"
  replay_project: "9c344c56-573b-459e-b0a8-952301c9e294"
```