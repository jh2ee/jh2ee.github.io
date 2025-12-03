---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625WOQ6SC%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T004123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIAYrqBaKeTYHGE7go3LhfBYsGA%2F6lYs7IyyiSi59Cfl7AiEAq%2FwOHyI0Hu%2F6BfPantxO0KfzvcKLyNCIno79RxQULoQq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDJIYsRsqUioC3mh05CrcAyMADVM5V%2B0v8vx2%2BIN01OpkTNKv4%2BB85qdKj3UpdcCwX9ZcPSqlj0DE74D2B9Hzx3UyPYI1CtNuZI1Rl%2FFBHl3Tza7f%2BKnBTcNOrPhaibGsX%2Fijm%2BclsJD9ndDiK0Z4bTVua60DEhcIP8VSKOg6we8gsjaTXqzbZYe5pQAjj9LEmWSVge8Te0LhE04WB8XvO4rELBpXSOM4aQrplugA9bTTxTTdsv6TiFryMnUGNN6Ar%2BRB6XJwK4PHBgAo%2F4SFxiNcqV1v8mJ9nHdC%2BzIkSZhl2I%2FPFpgtBfq5noHPZCoTvCZPl1Swxak7%2B28LDUYDMAGtJPDjF7viuhm3MpRe2Nq7hhG3GCWdXYS8DmsW4LBpG%2BMje11UjCIRA7o5K8AT8NBsDYeb8pl8kXfZxcfO5yKl%2FTL1cI%2F73KtzIohGycZ7YmstHc2Cm%2FuzsxdnR5dEviO%2BUYXYoOYd%2FggUDnVjFeqWYOnkAynAmJuEvpdomBb25%2FUg2PfZERR2nYuv5hUdcuvUvzSUdTohoKQom392QQvRwjzNfnYXpDr4%2BtssT%2B%2FRcs0GKEa3UCiQJQNC%2FQneb4LTBp3gOv%2BITX5x1Cg9XugaA17TGnv2QBT96FVI9EpD9W7BZ0SeKu%2Foo90cMJyIvskGOqUBSThruQvlvgTWxCwIH1h6DGwMCR%2BmGzNT1yK52lRF5dSZZXyMhv6rzbSXrC49Iglx%2FiHOFXmsvahC%2FyuOdh7cm6id%2FOEPJOP8%2FvYJFebO%2F8G%2F0okQsrgV%2BDXHwDBM11nwtWvg7MWHt8qgGVMILmfEg9d9J99e579p1UQxwzUZZR7g%2FooJOGs3GqxIWsjRc13WMKwyVOjU6rkR3fPDeHtnh52czJ%2Bo&X-Amz-Signature=29dbc97d7ff0da09c50368064bace95ac76b5a8855e5f5d87c73959c82fd41f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625WOQ6SC%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T004123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIAYrqBaKeTYHGE7go3LhfBYsGA%2F6lYs7IyyiSi59Cfl7AiEAq%2FwOHyI0Hu%2F6BfPantxO0KfzvcKLyNCIno79RxQULoQq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDJIYsRsqUioC3mh05CrcAyMADVM5V%2B0v8vx2%2BIN01OpkTNKv4%2BB85qdKj3UpdcCwX9ZcPSqlj0DE74D2B9Hzx3UyPYI1CtNuZI1Rl%2FFBHl3Tza7f%2BKnBTcNOrPhaibGsX%2Fijm%2BclsJD9ndDiK0Z4bTVua60DEhcIP8VSKOg6we8gsjaTXqzbZYe5pQAjj9LEmWSVge8Te0LhE04WB8XvO4rELBpXSOM4aQrplugA9bTTxTTdsv6TiFryMnUGNN6Ar%2BRB6XJwK4PHBgAo%2F4SFxiNcqV1v8mJ9nHdC%2BzIkSZhl2I%2FPFpgtBfq5noHPZCoTvCZPl1Swxak7%2B28LDUYDMAGtJPDjF7viuhm3MpRe2Nq7hhG3GCWdXYS8DmsW4LBpG%2BMje11UjCIRA7o5K8AT8NBsDYeb8pl8kXfZxcfO5yKl%2FTL1cI%2F73KtzIohGycZ7YmstHc2Cm%2FuzsxdnR5dEviO%2BUYXYoOYd%2FggUDnVjFeqWYOnkAynAmJuEvpdomBb25%2FUg2PfZERR2nYuv5hUdcuvUvzSUdTohoKQom392QQvRwjzNfnYXpDr4%2BtssT%2B%2FRcs0GKEa3UCiQJQNC%2FQneb4LTBp3gOv%2BITX5x1Cg9XugaA17TGnv2QBT96FVI9EpD9W7BZ0SeKu%2Foo90cMJyIvskGOqUBSThruQvlvgTWxCwIH1h6DGwMCR%2BmGzNT1yK52lRF5dSZZXyMhv6rzbSXrC49Iglx%2FiHOFXmsvahC%2FyuOdh7cm6id%2FOEPJOP8%2FvYJFebO%2F8G%2F0okQsrgV%2BDXHwDBM11nwtWvg7MWHt8qgGVMILmfEg9d9J99e579p1UQxwzUZZR7g%2FooJOGs3GqxIWsjRc13WMKwyVOjU6rkR3fPDeHtnh52czJ%2Bo&X-Amz-Signature=29dbc97d7ff0da09c50368064bace95ac76b5a8855e5f5d87c73959c82fd41f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XZVW234%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T004124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQD6Bd%2BUtPy3EbLaPwJ44k5u6EK33lrQIaDWAusn56OpzwIhAL%2Bdp%2FOR4gDB5S4iAifz04Mql182apFcQrGgUes2qzZiKv8DCCIQABoMNjM3NDIzMTgzODA1IgxxGCyCKxciWX5y3Ksq3APMxfc6yrGlrUiMAURZAgkCZMJdiuU3rLDGwKi4UAgAXfCbocIQNUxIyGJglZ05sCuWJXyYQjEDHQesmiJp8YDJ6GVwii7%2BVtBFhbmFc%2B6k7LbtYs2u%2FOyyWouLr4I7mY9OtVmD72JkaChgq4vw17ZdS1nNS2GgHWW0cYwir4NufMo8TCWsuwQ4F8TpFffZyaQZvO5I9GypCH%2F9t18aEcCjptmfjByIPw0gzXGEI%2B%2F7fyM7YXAMaFkycTKJKrYzxSjvucisrjI1po%2BbJn2GCxMFnhkmoJ3GW%2BmsoXVsBmxmcjJytC1RWRj0QuuGu4GNSQOevdz6q%2Bq0%2FRqpxZ20%2Fox2GZdr2TO05dSdgXbQUwRWQON6yMHKMsm9L5or%2BUxwls142%2F7jMIZCqag%2B1Hiat%2FAEZWjLxJYPjF8T88mvczfezyLHdR%2FLz6X1f9ah2LB5ZUw9KVQ5HsO8FPrSMVXNdAEEww8BL4Fw7jOpEsbI%2BJDzAOAdYaDm6urFqLoGzUqFNdCQ1VmCn1saz8XdY3ER3pI8dKRheSq5Jzi0JdDmc5a7yLlriEDKdzeiEAGKxokYhACbu%2BJDoR4t6R0BP9D9QJD3uoIqUaeafO77sQJICBhtthJSNCt%2BFsdYHrPlPzDSiL7JBjqkAfSkHTJdxdPq0xjjVyKJlXl1PUq2VnAFTS6bF4BP0OANjQAd63MYs7xfcj0YF3A2jV39BHDRqrw99ovsphtURtg9dv4ZjI1KO2uf2F4qHcoFGn6j5f01JYoIQjIHKHVSgLI5QYLSuIgghOOuoNLf22gcxzJ6Uacy%2BHqomEThGthE3ScbmDAQEuPRI4yYakBBwrAbP6W6vDrIQ3%2BEA8gPpXbwsJMs&X-Amz-Signature=78baaa2f6d30e4c4a3f5f995d7d0f2c7537f776fe02bd2a51905f4762818c00a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XZVW234%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T004124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJIMEYCIQD6Bd%2BUtPy3EbLaPwJ44k5u6EK33lrQIaDWAusn56OpzwIhAL%2Bdp%2FOR4gDB5S4iAifz04Mql182apFcQrGgUes2qzZiKv8DCCIQABoMNjM3NDIzMTgzODA1IgxxGCyCKxciWX5y3Ksq3APMxfc6yrGlrUiMAURZAgkCZMJdiuU3rLDGwKi4UAgAXfCbocIQNUxIyGJglZ05sCuWJXyYQjEDHQesmiJp8YDJ6GVwii7%2BVtBFhbmFc%2B6k7LbtYs2u%2FOyyWouLr4I7mY9OtVmD72JkaChgq4vw17ZdS1nNS2GgHWW0cYwir4NufMo8TCWsuwQ4F8TpFffZyaQZvO5I9GypCH%2F9t18aEcCjptmfjByIPw0gzXGEI%2B%2F7fyM7YXAMaFkycTKJKrYzxSjvucisrjI1po%2BbJn2GCxMFnhkmoJ3GW%2BmsoXVsBmxmcjJytC1RWRj0QuuGu4GNSQOevdz6q%2Bq0%2FRqpxZ20%2Fox2GZdr2TO05dSdgXbQUwRWQON6yMHKMsm9L5or%2BUxwls142%2F7jMIZCqag%2B1Hiat%2FAEZWjLxJYPjF8T88mvczfezyLHdR%2FLz6X1f9ah2LB5ZUw9KVQ5HsO8FPrSMVXNdAEEww8BL4Fw7jOpEsbI%2BJDzAOAdYaDm6urFqLoGzUqFNdCQ1VmCn1saz8XdY3ER3pI8dKRheSq5Jzi0JdDmc5a7yLlriEDKdzeiEAGKxokYhACbu%2BJDoR4t6R0BP9D9QJD3uoIqUaeafO77sQJICBhtthJSNCt%2BFsdYHrPlPzDSiL7JBjqkAfSkHTJdxdPq0xjjVyKJlXl1PUq2VnAFTS6bF4BP0OANjQAd63MYs7xfcj0YF3A2jV39BHDRqrw99ovsphtURtg9dv4ZjI1KO2uf2F4qHcoFGn6j5f01JYoIQjIHKHVSgLI5QYLSuIgghOOuoNLf22gcxzJ6Uacy%2BHqomEThGthE3ScbmDAQEuPRI4yYakBBwrAbP6W6vDrIQ3%2BEA8gPpXbwsJMs&X-Amz-Signature=78baaa2f6d30e4c4a3f5f995d7d0f2c7537f776fe02bd2a51905f4762818c00a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4OOPBGY%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T004119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIFyHCEv3V0%2Bl0f2VdFfk%2FzeGE3HQRdxNV%2BCIldBvXk6PAiEAx7Ju1gp9N1hE%2FvvSDL5%2F8XExF0gRXGpJ3R5IFiPW%2Flkq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDKZtXL%2FwebWR%2Fa4L9SrcA6xJf3KrEPqltCLq0FsXGnCOp3WK9bLVbXbrzcuqn9OA3gIPvhdtZY6DPEFNFRaO8JCr2hKmoG4FPKYu6AC8VoJJ2Wo%2FLXmf0Gh89taRDB2xJtep%2BQg5ZABH8dNJ8RmYzDE4px8KpIFr86hmiq4J%2Fm76MJADL3t0cfIfiApPa2%2B6Sow3XTPxpShYbnhbH6k%2FNNLqCg0NAnY37YornR5Z72sNBryIAZ4mlBHBarSa%2BVYAvm5dumhJtB6YyHUPtrdgbfnvizSDE%2BM9EuEzkEu2%2BAfTcEE7NdoLt%2FtotpA1HORDG44z%2BE5L1jqETDNpx1%2B7P%2Bz6vIrm1TVJbrciiivZibP8BDTebJhs8%2BG9YD%2FrFYWmQZK%2FghUQX9itLMMyzVXqpT9p4he9A4qZzYLZL5EwAdNAEk5CTAOBg4oXW5Yzsc3PZkc7AZrIQM0wSLTTwKokwv4tqGsX2EhbPXXf%2BLydaDnxVO8CcA9FzDXPpJtM3wmyI2nPmuZh2u4x%2FqgdpxjQZ24GWPvz79h0O7KnLE0%2FovMx9meYveff%2FNtLOecbNGh0KeIFLd7imM4%2FJSEUZ6NCRzwm3qMywuhFWHDtglPqcRdXbiRJKElZhy%2BYmTTg0VVwikbmKMQt3g2pnhEPMPyHvskGOqUBhR%2F4q%2FN9KgrvUnEYzHiNFs745%2FOEYS0suqiNA4WYyHrMfNKL0lIvgWbfjFbshL5KNDlki23Y1j4ErmbPSDA7oD%2BXKbWhhkM2vdOfKUCO8SLt%2FJTDFYNd90UpCinFYdwwxh91suPaX7x9oWKfxc7VpATbNCjc1h3srwtBokea6tzk0EX%2FGwfuC9NMdKbvJldmHJI5roQl4Xds%2F%2B8IyZRShXgI0aeZ&X-Amz-Signature=d5091f59e0bc5bd4f02072ef7e5d3bfdde82c51f922ee4b4bfeb4081682c9301&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4RZ3EE6%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T004126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIF5cfB90aUFHQMoBXSTmAS2y4YeXR8hflmAZeXUL2U5qAiEAk%2BcyJCtGdyR9UgfEDNNmhzPqDNZW4YhOqo5m8R1C8FMq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDA1DC%2FoPVOrKNMNzxircA1ygoQqv90YLv8dkXAC0QDY9j6K%2BEsZ1hWYBnSxQ3vSQYQ4NmaKqHe1x3S37jTBjj70k6eof10i0wy1g1RbqfMpGPRpsXEq47xRUPuEr5BiSo78Hoy2WN5vMniQxTgs4pnF%2BJB%2F%2BjjKuJSJjdWnVsWlm0Vt03O9fQOzXu23fNI0UJvoVdAyagz2OxysMSPAtHMqm5s%2FgcLwVV7umGiWlRu0y3MZLI87N3anMJJnoTRYny5T60LZjkTz7ZU3Gx608RIsiwz20o6nKQsIWl25zKcWw%2FXtd4airxaepSw1qhXjPjkGIkSpCV0v%2BFrtMrD%2F2vhQkZLL5LhqwtTTiBVyfwe66TQ9ZgtioPthL8E%2F9M8B8idX%2BCNtjvuyvEAyyY2kloUooIiVtMTDGAPcspCQQUSxIdZwW3sIqS8c6u%2BAjldecHIITnYI3fGd9QYeuTUZVWTb6wPwqIPGKOpG1b6L6TxQ%2FB4J3ue5b3aCqcmhVN5vCRxWfj9V3MsKV9%2FeU%2Fuxrk8Kgjs4yAvv%2BM0dW6JzefiZpjKU4qJtGm3KPb3klDLE3GEEK0uNG07Z3ddUPOCD0ByyoLYBQ8lU2QdvGfmY8SAeyKqSHecfwWcram13r58KBBvv9nN%2FbnL7cLl3eMPGHvskGOqUBb13lXRRGMCncMshhTgoGtR0THDAMZ8h11Ut7rviueKe%2BFenvZX9rFTnBCsN%2BE0IYr33KyN4EMAH6BAS6Ej2ZyN38M5Zqg5BP%2BV7rSqQJ9%2FFUh5E6J0x%2Fpve6q8B0s%2BXWuGjLZqwmK34mgfgohskGu7VcUqGkJsvt3h3BJ0ObCrCIWpY88V3iqNg4X%2BxRYkmFvAJF6Ls7tSrmEVcOEXIfQPRg%2F12L&X-Amz-Signature=a5aba873786cd1c823275ce7963d9320cc2b32feb130c22ce8480c729cb390b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4RZ3EE6%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T004126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLXdlc3QtMiJHMEUCIF5cfB90aUFHQMoBXSTmAS2y4YeXR8hflmAZeXUL2U5qAiEAk%2BcyJCtGdyR9UgfEDNNmhzPqDNZW4YhOqo5m8R1C8FMq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDA1DC%2FoPVOrKNMNzxircA1ygoQqv90YLv8dkXAC0QDY9j6K%2BEsZ1hWYBnSxQ3vSQYQ4NmaKqHe1x3S37jTBjj70k6eof10i0wy1g1RbqfMpGPRpsXEq47xRUPuEr5BiSo78Hoy2WN5vMniQxTgs4pnF%2BJB%2F%2BjjKuJSJjdWnVsWlm0Vt03O9fQOzXu23fNI0UJvoVdAyagz2OxysMSPAtHMqm5s%2FgcLwVV7umGiWlRu0y3MZLI87N3anMJJnoTRYny5T60LZjkTz7ZU3Gx608RIsiwz20o6nKQsIWl25zKcWw%2FXtd4airxaepSw1qhXjPjkGIkSpCV0v%2BFrtMrD%2F2vhQkZLL5LhqwtTTiBVyfwe66TQ9ZgtioPthL8E%2F9M8B8idX%2BCNtjvuyvEAyyY2kloUooIiVtMTDGAPcspCQQUSxIdZwW3sIqS8c6u%2BAjldecHIITnYI3fGd9QYeuTUZVWTb6wPwqIPGKOpG1b6L6TxQ%2FB4J3ue5b3aCqcmhVN5vCRxWfj9V3MsKV9%2FeU%2Fuxrk8Kgjs4yAvv%2BM0dW6JzefiZpjKU4qJtGm3KPb3klDLE3GEEK0uNG07Z3ddUPOCD0ByyoLYBQ8lU2QdvGfmY8SAeyKqSHecfwWcram13r58KBBvv9nN%2FbnL7cLl3eMPGHvskGOqUBb13lXRRGMCncMshhTgoGtR0THDAMZ8h11Ut7rviueKe%2BFenvZX9rFTnBCsN%2BE0IYr33KyN4EMAH6BAS6Ej2ZyN38M5Zqg5BP%2BV7rSqQJ9%2FFUh5E6J0x%2Fpve6q8B0s%2BXWuGjLZqwmK34mgfgohskGu7VcUqGkJsvt3h3BJ0ObCrCIWpY88V3iqNg4X%2BxRYkmFvAJF6Ls7tSrmEVcOEXIfQPRg%2F12L&X-Amz-Signature=a5aba873786cd1c823275ce7963d9320cc2b32feb130c22ce8480c729cb390b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

