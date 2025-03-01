# Configuration
## Settings
- `image` : The docker image to use for `bunnyfinder` service.
- `dbconnect`: The database connection string, current only support mysql database, e.g. `root:password@tcp(ip:port)/dbname`
- `min_malicious_idx`: The min index that actor as a malicious validator.
- `max_malicious_idx`: The max index that actor as a malicious validator.
- `duration_per_strategy`: The execute duration for each strategy in minutes, this is used when `strategy` is set to `all` or multiple strategies.
- `strategy`: The strategy to use, support `all`, `random`, `exante`, `ext_exante`, `sandwich`, `ext_sandwich`, `staircase`, `ext_staircase`, `unrealized`, `ext_unrealized`, `withholding`, `ext_withholding`, the meaning of each strategy is explained in [strategy description](#strategy-description).
- `openai_key`: The openai api key, this is used when `strategy` is set to `ai`, also supported DeepSeek api.
- `openai_base_url`: The openai base url, this is used when `strategy` is set to `ai`, also supported DeepSeek api.
- `llm_model`: The large language model to use, this is used when `strategy` is set to `ai`, We recommend using deepseek-r1, deepseek-v3, gpt-4o.

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

Below is an example of the configuration file, using the `deepseek-r1` model provided by `aliyun`, the `bunnyfinder:latest` docker image, connecting to a local MySQL database, and executing the `ai` strategy.
```yaml
  image: 'bunnyfinder:latest'
  strategy: 'ai'
  dbconnect: 'eth:12345678@tcp(127.0.0.1:3306)/eth'
  max_malicious_idx: "85"
  openai_key: "sk-xxxxxxxxx"
  openai_base_url: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  llm_model: "deepseek-r1"
```
