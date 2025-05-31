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
create table if not exists project
(
    id                bigint auto_increment
        primary key,
    project_id        varchar(255) default '' not null,
    created_at        datetime                not null,
    updated_at        datetime                not null,
    strategy_category varchar(255) default '' not null,
    strategy_count    int          default 0  not null,
    latest_slot       bigint       default 0  not null
);

create table if not exists t_attest_duty
(
    id         bigint auto_increment
        primary key,
    project_id varchar(255) default '' not null,
    created_at datetime                not null,
    updated_at datetime                not null,
    epoch      bigint       default 0  not null,
    slot       bigint       default 0  not null,
    validator  bigint       default 0  not null
);

create table if not exists t_attest_reward
(
    id              bigint auto_increment
        primary key,
    project_id      varchar(255) default '' not null,
    created_at      datetime                not null,
    updated_at      datetime                not null,
    epoch           bigint       default 0  not null,
    validator_index int          default 0  not null,
    head_amount     bigint       default 0  not null,
    target_amount   bigint       default 0  not null,
    source_amount   bigint       default 0  not null
);

create table if not exists t_block_duty
(
    id         bigint auto_increment
        primary key,
    project_id varchar(255) default '' not null,
    created_at datetime                not null,
    updated_at datetime                not null,
    epoch      bigint       default 0  not null,
    slot       bigint       default 0  not null,
    validator  bigint       default 0  not null
);

create table if not exists t_block_reward
(
    id                       bigint auto_increment
        primary key,
    project_id               varchar(255) default '' not null,
    created_at               datetime                not null,
    updated_at               datetime                not null,
    slot                     bigint       default 0  not null,
    proposer_index           int          default 0  not null,
    total_amount             bigint       default 0  not null,
    attestation_amount       bigint       default 0  not null,
    sync_aggregate_amount    bigint       default 0  not null,
    proposer_slashing_amount bigint       default 0  not null,
    attester_slashing_amount bigint       default 0  not null
);

create table if not exists t_chain_reorg
(
    id                       bigint auto_increment
        primary key,
    project_id               varchar(255) default '' not null,
    created_at               datetime                not null,
    updated_at               datetime                not null,
    epoch                    bigint       default 0  not null,
    slot                     bigint       default 0  not null,
    depth                    int          default 0  not null,
    old_block_slot           bigint       default 0  not null,
    new_block_slot           bigint       default 0  not null,
    old_block_proposer_index bigint       default 0  not null,
    new_block_proposer_index bigint       default 0  not null,
    old_head_state           varchar(255) default '' not null,
    new_head_state           varchar(255) default '' not null
);

create table if not exists t_strategy
(
    id                     bigint auto_increment
        primary key,
    project_id             varchar(255)  default '' not null,
    created_at             datetime                 not null,
    updated_at             datetime                 not null,
    uuid                   varchar(255)  default '' not null,
    category               varchar(100)  default '' not null,
    content                varchar(4096) default '' not null,
    min_epoch              bigint        default 0  not null,
    max_epoch              bigint        default 0  not null,
    is_end                 tinyint(1)    default 0  not null,
    reorg_count            int           default 0  not null,
    impact_validator_count int           default 0  not null,
    honest_lose_rate_avg   double        default 0  not null,
    attacker_lose_rate_avg double        default 0  not null
);
```
