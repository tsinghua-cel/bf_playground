# Database Creation Statement
The following are the SQL statements for creating the database and table structures. You can modify them as needed.

```mysql
USE mysql;

CREATE USER 'eth'@'127.0.0.1' IDENTIFIED BY '12345678';
CREATE USER 'eth'@'%' IDENTIFIED BY '12345678';

GRANT ALL ON *.* TO 'eth'@'%';
GRANT ALL ON *.* TO 'eth'@'127.0.0.1';

CREATE SCHEMA eth;

USE eth;

CREATE TABLE project (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id VARCHAR(255) NOT NULL DEFAULT '',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    strategy_count INT NOT NULL DEFAULT 0
);

CREATE TABLE t_attest_reward (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id VARCHAR(255) NOT NULL DEFAULT '',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    epoch BIGINT NOT NULL DEFAULT 0,
    validator_index INT NOT NULL DEFAULT 0,
    head_amount BIGINT NOT NULL DEFAULT 0,
    target_amount BIGINT NOT NULL DEFAULT 0,
    source_amount BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE t_block_reward (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id VARCHAR(255) NOT NULL DEFAULT '',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    slot BIGINT NOT NULL DEFAULT 0,
    proposer_index INT NOT NULL DEFAULT 0,
    total_amount BIGINT NOT NULL DEFAULT 0,
    attestation_amount BIGINT NOT NULL DEFAULT 0,
    sync_aggregate_amount BIGINT NOT NULL DEFAULT 0,
    proposer_slashing_amount BIGINT NOT NULL DEFAULT 0,
    attester_slashing_amount BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE t_chain_reorg (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id VARCHAR(255) NOT NULL DEFAULT '',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    epoch BIGINT NOT NULL DEFAULT 0,
    slot BIGINT NOT NULL DEFAULT 0,
    depth INT NOT NULL DEFAULT 0,
    old_block_slot BIGINT NOT NULL DEFAULT 0,
    new_block_slot BIGINT NOT NULL DEFAULT 0,
    old_block_proposer_index BIGINT NOT NULL DEFAULT 0,
    new_block_proposer_index BIGINT NOT NULL DEFAULT 0,
    old_head_state VARCHAR(255) NOT NULL DEFAULT '',
    new_head_state VARCHAR(255) NOT NULL DEFAULT ''
);

CREATE TABLE t_strategy (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id VARCHAR(255) NOT NULL DEFAULT '',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    uuid VARCHAR(255) NOT NULL DEFAULT '',
    content VARCHAR(10000) NULL,
    min_epoch BIGINT NOT NULL DEFAULT 0,
    max_epoch BIGINT NOT NULL DEFAULT 0,
    is_end TINYINT(1) NOT NULL DEFAULT 0,
    reorg_count INT NOT NULL DEFAULT 0,
    impact_validator_count INT NOT NULL DEFAULT 0,
    honest_lose_rate_avg DOUBLE NOT NULL DEFAULT 0,
    attacker_lose_rate_avg DOUBLE NOT NULL DEFAULT 0
);
```
