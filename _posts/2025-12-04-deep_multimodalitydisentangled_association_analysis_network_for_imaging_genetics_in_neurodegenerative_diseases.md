---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYWGXPMA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCJElrtYdGObNwuVcDyTQr11NI3rfwCRqEY4RdQ24AM6gIgTD8jnuWLExNB7CxXcLTlsRg1bVHINOobQSfGOHNW4QYq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDExpvm8HHa5pekMCFSrcA7dKSsabasfVVOEm4JYRV8P1lu6dGPz6xKG8U0hVWpaDltk%2BYzo2bhOgTAwaK9kGhjLEzqPQ8UoJlD97z886yx1QHCJSallO1EEnsGAaeJqTWEC9WuSqKrbR08U5J%2FR%2FrxUuKX9%2F%2Bm%2FvUgK29st%2BWVxLLQl3ZZgavUdiyzpZP3hIGdwU9zGX91aH45aYrRmrYCO7XG8xUICAQJKST%2FfO58N%2FkYwjACyV4crEEb8tj5HBUhyyKJzlmChpQ%2Bo0Hc8%2BGqzOHKJqqtWMFGe%2B52qaf9BZqfHZyduNsYEgthbGej8drq6FjQjVOYKimgfwCr%2FDpOA7P413Sj4zSyiZfaRL9LtdA%2BuSLAb83tizXUfLR43z6PMhugjiTrXcO2ZGgHe07RloNBZozsARtnTXaZ3toh99bm9Zd6YRe7DW0%2Fc2FHTIK0GeY7tYkXpz3BpKWCedCbyVcndwuMNwzJpjJgV9CawLG6a1%2F8nR0mSN5%2BccH%2Ftwl3fl8ZF7T9f1BO3IiLxHqvgDhoDkp8%2B2sgRYH4aAMsfCjZxizYvfr70O5LJlDOF20QcUXUmKpQYqpBf0WF7jO8faSg5kKAcfnmhrIK%2Beqaj63G08kKbQm5BEm0vO1isdaUDvbnZkCR%2BfKk1xMLzZ7M4GOqUBEulJpaY0ePSyTYxJxUEVZY7BcmTqmMfuUzv%2FHfAPmmi0IsfcIeid2I88UGYpKAWJuiYtysqfKD6wJYGXPPW1Th2XJDpmKozjAEsxtG8h1BT4fSvEXBStxG8HvblDQtOVhszyVcaAuCLplK2JfmWPZ%2FIajlMVtwhtn6X6eieuYyJBaUSFt%2F7uOumKrgFOglyvdvLZOxUPbd0iAyzQ3H9fi9cEU0uf&X-Amz-Signature=8303b7c62f0e463098280611e71a197cbd12211bdaa605833f5e5a7ee3a47b6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYWGXPMA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCJElrtYdGObNwuVcDyTQr11NI3rfwCRqEY4RdQ24AM6gIgTD8jnuWLExNB7CxXcLTlsRg1bVHINOobQSfGOHNW4QYq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDExpvm8HHa5pekMCFSrcA7dKSsabasfVVOEm4JYRV8P1lu6dGPz6xKG8U0hVWpaDltk%2BYzo2bhOgTAwaK9kGhjLEzqPQ8UoJlD97z886yx1QHCJSallO1EEnsGAaeJqTWEC9WuSqKrbR08U5J%2FR%2FrxUuKX9%2F%2Bm%2FvUgK29st%2BWVxLLQl3ZZgavUdiyzpZP3hIGdwU9zGX91aH45aYrRmrYCO7XG8xUICAQJKST%2FfO58N%2FkYwjACyV4crEEb8tj5HBUhyyKJzlmChpQ%2Bo0Hc8%2BGqzOHKJqqtWMFGe%2B52qaf9BZqfHZyduNsYEgthbGej8drq6FjQjVOYKimgfwCr%2FDpOA7P413Sj4zSyiZfaRL9LtdA%2BuSLAb83tizXUfLR43z6PMhugjiTrXcO2ZGgHe07RloNBZozsARtnTXaZ3toh99bm9Zd6YRe7DW0%2Fc2FHTIK0GeY7tYkXpz3BpKWCedCbyVcndwuMNwzJpjJgV9CawLG6a1%2F8nR0mSN5%2BccH%2Ftwl3fl8ZF7T9f1BO3IiLxHqvgDhoDkp8%2B2sgRYH4aAMsfCjZxizYvfr70O5LJlDOF20QcUXUmKpQYqpBf0WF7jO8faSg5kKAcfnmhrIK%2Beqaj63G08kKbQm5BEm0vO1isdaUDvbnZkCR%2BfKk1xMLzZ7M4GOqUBEulJpaY0ePSyTYxJxUEVZY7BcmTqmMfuUzv%2FHfAPmmi0IsfcIeid2I88UGYpKAWJuiYtysqfKD6wJYGXPPW1Th2XJDpmKozjAEsxtG8h1BT4fSvEXBStxG8HvblDQtOVhszyVcaAuCLplK2JfmWPZ%2FIajlMVtwhtn6X6eieuYyJBaUSFt%2F7uOumKrgFOglyvdvLZOxUPbd0iAyzQ3H9fi9cEU0uf&X-Amz-Signature=8303b7c62f0e463098280611e71a197cbd12211bdaa605833f5e5a7ee3a47b6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VV76ET4%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDmYTggWinZjEG7HJKsAk5dK8LycWDML5V3pvMiWCTEngIgNJpqYXVDYqMlQ6HPDYSAeKzcfhZF8mCT%2Bb9FtMl3F%2FQq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDBBMv3vGnsjGj5Tw7SrcA5Sx%2ByCdBFu2A9Og1mJn3ZEBILmFYkEwPXA1XOklkqkhWlt%2FCS%2Fuy5isULGHUlbrLMzpkvCj4VIJ7cRxj7Zc89G0cqcfvUbB8y9MTIP5P%2FocaPAChXXSLKXymzGcyJA4Jfa83H6KE3n0rF%2FLoLIUCSi7zcdEeuNErddePLB8RmPgG4QcQUhsQsE%2BwVWHg%2FLK0AU9BeQ5TTpFcLJ%2F%2ByvIjMCY8uYFZu%2Fmw4%2BrHk8h20sLjvmoIuPYYVr6d7w6%2BAO%2FdtPvCzgPp4b1zdgqYgac7HYQkoufg0u%2BkpLZNVOtrLDKiCYrsZjTSgeHlS%2BVtWlSp5E2jXvbio%2BQnGxUevSNPDGpZPn6%2FAuu3qVrXrvErg4JpxwvfVGM%2FuRWwIU6LZDWaHmDn0Tt34EOi%2F%2B7a7kpPZ91CkSifcJnX3ZAfYJdZcMN%2Bfjowqi9XonIbiXbZtSstz4gRx4N8qnRtiKob2Cgx%2FdEX2xeXwXp9bnEM1BLM%2FVDhdbJz294O5k8rqNd7tczSNpGrPLOdMOxOdhnb4WYSbyeHqMg93gSYApYLo0JAEMv96NaZoQhApOvc2kNkTtBTncmQS2yEaCLEiMPP8gK5hVozUPhA9G3TUAt90LSjNK0DPGPG%2FngAjZ6SqICMPHb7M4GOqUBx1nm%2BIrUsSX1qL7vKFIxALxUOIctYVHycx4VwPDF8T9wV8MMddrs00%2B0XMdPO28LI360z%2F2z%2B0gqSvDHloa4oNQFOGMhBerJz%2BarOk6jlJykSxMU5w%2Fd9Gg64DBTUI82sa8O%2B5MU2r2o2cqny7AF6ZwTyaOkNHPM7uZZ4WXchUiX3innnXoBVxNIaBG81x9hX5HGn4UQNB9Uk0invq5nFeytwwa2&X-Amz-Signature=868d159eb085565ae5fb505ac922bbbc1e449feea8fdd361dc7019c07f150052&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZKUX74C%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJFMEMCIEREM1%2FZ0uL5fARZAKSrOmEHbQj%2FW%2ByGkth3lcs4wbmSAh9cqBOqNGNrp%2FfjdxwjnB%2BZy5x%2F3Zk5tonVh8Hr1Yq%2BKv8DCFYQABoMNjM3NDIzMTgzODA1IgyV8rNxHhjdnJYvWUEq3AM97rUMpMDbYo%2B5r4JOeKKFjCR4ZfMvFnqmuqOUQA%2B1RHZYxJL4Pvr2TwNkXbj4WqgZEenfDZEIHqByMc4N2fpRxgASvsx1jW4uJHBaAM1%2Fbjlk6TinNJlyExqH3y%2FK5qsWOOCzl7qXMoqQ7Q7zdrwvhH67ABGSx5Tk3wiUsVRTIj%2BSXPZ6EUcm0aP2WffIHOy2h%2BNh3dpaRl8P7OknFRriFwKm7fzMnCy5%2Bzh%2BcHlzR4EBFdV%2Bs5N5Jd8qBsovCjNuD%2BZJ7PRPMty%2Fe00K9Xo%2BB9yE6NItKrtAHY1rPLs9XCIOVUjEi%2FbCBfmvQD3quHRrQnCKfBLLO5Y4KRMqvybhtrau4X1nQLiNRmrxaCqauTR2ujVDfefDUM8LrO%2BQVsZfVMXGQ%2BfXalsytRFdMTbLhBonYHip9eTQcjN0OjSGhLIbikKKux7FGv0Io%2BjhexFBnDyE3kc76rjzoExFIfLqhPY%2FtxXZ0EJbbz1MPBrz1xZBsg7mexaf04sMc9kqUqXWS123mCAmkM%2Bl5NimCWDJVyCOGllQb2HSjFZoLk4YVvsdZ4ECyqnQS9DqoMhazmPx0lDHkSbbMHtnmiP45jG7xBCerAU%2FN9D7WQc7hkqk%2BPszGO4fWk6lkULKEDCn2ezOBjqnAeoXosZgT0X5ohPoD9OyAHL8HSKfT7EPNX1%2FCX6aiWNc0pYJ6fLN2eoMxrwsWbZHrBLPC26q%2FEKAuQ56bHcT%2BQ8sdWOIvFTqIBZtwUJ%2Bizstz3RzdtHXVlonaR4xBbEEZgaiHKKzejCNTNqIo2LUpT5ZA8M2wR8cqE5eQ7wqCcnXknvtSH6Ga%2FV4A%2BjjkhJp%2FkjdYRIXcqcnanMxQh0THHsC5YB8YtRW&X-Amz-Signature=fcb6229b3b202296e7291976becdb0067ed51ab06e0794b073c1aab282868535&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZKUX74C%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJFMEMCIEREM1%2FZ0uL5fARZAKSrOmEHbQj%2FW%2ByGkth3lcs4wbmSAh9cqBOqNGNrp%2FfjdxwjnB%2BZy5x%2F3Zk5tonVh8Hr1Yq%2BKv8DCFYQABoMNjM3NDIzMTgzODA1IgyV8rNxHhjdnJYvWUEq3AM97rUMpMDbYo%2B5r4JOeKKFjCR4ZfMvFnqmuqOUQA%2B1RHZYxJL4Pvr2TwNkXbj4WqgZEenfDZEIHqByMc4N2fpRxgASvsx1jW4uJHBaAM1%2Fbjlk6TinNJlyExqH3y%2FK5qsWOOCzl7qXMoqQ7Q7zdrwvhH67ABGSx5Tk3wiUsVRTIj%2BSXPZ6EUcm0aP2WffIHOy2h%2BNh3dpaRl8P7OknFRriFwKm7fzMnCy5%2Bzh%2BcHlzR4EBFdV%2Bs5N5Jd8qBsovCjNuD%2BZJ7PRPMty%2Fe00K9Xo%2BB9yE6NItKrtAHY1rPLs9XCIOVUjEi%2FbCBfmvQD3quHRrQnCKfBLLO5Y4KRMqvybhtrau4X1nQLiNRmrxaCqauTR2ujVDfefDUM8LrO%2BQVsZfVMXGQ%2BfXalsytRFdMTbLhBonYHip9eTQcjN0OjSGhLIbikKKux7FGv0Io%2BjhexFBnDyE3kc76rjzoExFIfLqhPY%2FtxXZ0EJbbz1MPBrz1xZBsg7mexaf04sMc9kqUqXWS123mCAmkM%2Bl5NimCWDJVyCOGllQb2HSjFZoLk4YVvsdZ4ECyqnQS9DqoMhazmPx0lDHkSbbMHtnmiP45jG7xBCerAU%2FN9D7WQc7hkqk%2BPszGO4fWk6lkULKEDCn2ezOBjqnAeoXosZgT0X5ohPoD9OyAHL8HSKfT7EPNX1%2FCX6aiWNc0pYJ6fLN2eoMxrwsWbZHrBLPC26q%2FEKAuQ56bHcT%2BQ8sdWOIvFTqIBZtwUJ%2Bizstz3RzdtHXVlonaR4xBbEEZgaiHKKzejCNTNqIo2LUpT5ZA8M2wR8cqE5eQ7wqCcnXknvtSH6Ga%2FV4A%2BjjkhJp%2FkjdYRIXcqcnanMxQh0THHsC5YB8YtRW&X-Amz-Signature=970d9c5e8692abb4a8fa3c097f168173ae682aad1d010682f4a4f00e6cb93929&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZUOCB5H%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDLebmMRAIUfEADlJbrJyDfBvBWi5ivrqY0x8Yexvl4bAiEAzpFlNJXsE5XJs2jwraM8A5C5%2BKytWERGnwvOx6PoSwYq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDHfhBZJnmsfLN%2FO4iCrcA8IEpj463Qo1rC4kbb301VbyOFEXUoFqsAiDNMngc%2B%2B6nbTep0zjGkMY2t7xDOSfVRPA4fpudAnWdmllq0SzUARB3XpUiPOdwOauJBSisEzIxlg4s33vKJXuxsbocZjZjf8VQVXtpgf2hOpB%2FHRWu5lJ4z6HB6zXu%2F4NfeECTe92XkwJIkCet45GeB2RxumOQvKzHE6vS8jSyA2PszNxAkOVjC88Sja%2F9YX4WgSUvO0Suisw5kf86C%2Fpgly84MmJSb%2B40n1ST1%2BxMLHCTCpXtNEPc78pIH3QwGB7tNfMZueamgzqsyYcvWUjuLr0KQqM%2F4OWQ%2BEz3rBr5tJk2%2FIdltJnt7zqdaMQ4WkaEs%2BUiQRmUr2Zidax3ps8z5gZ0KRTzdLFG3YJEtK3m9t%2FX%2F5mqL3%2FjKPBr4ZT2a77Dw6jBYdQrHF8wwR1lP1AUNuEu%2FGQ22LlRHvDDCNtY4rSDHr5URnmILy7%2BHpg94YuuysUf3RLi0RRMEjKvNzYywpbupap94KbyjsCbTlRd6oiDZ5cCQkOr6fLNGJ2GDdhvyuouPu1E1A02ivgVo5t%2F%2FAubMVUpTqbigFoNy1lNhghfIrI3jZQbSSiO6BiZfaVeiZMMC9vAsnQkJLJO387Q2wGMOPb7M4GOqUBST6VHTcbEeRHzggyvKr%2B6FvPxua4OVwPGR2LZsi5h9nRh10YAy%2FgCZ1%2F%2BfypxEf9N6SNabZCotR1gxFAkf6mslt2WVB151w71gKoXmIFgz0bIXCbXovAzf3h9pvN7fR6H46XGG31zWlNdA7GeM2mLvwHcTBj8LVaLL4d%2BFQWbstlGBH4EsbErj4a4LcV%2Bs5CQcPai86cNZqtjLIgk%2F4TzFbdHsqO&X-Amz-Signature=5277f7e504b05ec3995bb51135f36fe28fa2d6310969e1bdc39224caa4f628a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4WPML5Q%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFAv9Z9%2FA1SzhnTRZfjbS5g%2FkG6rVyybHpxssY6ruqKIAiEAuv%2F25OnhGA%2F1oZqT9q3WRFFlLGy2m4j%2BLgXrkWh5m1oq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDB8kwVoijEErVnW9xircAzlmIliaP90Dnl50LN2vAc%2Br%2BU5t%2Boq%2FU%2F%2FlHRImjfgTyPendHuvzkgn4qaQDfJAgdsB%2F3McF4j49Af7s1DLZpcIc6A7CGfFuXFDXvZK1pL%2BKThqknUr7lghPCBHMlijEOyiOqC7GhqNF0BvntjTs0n7ytQonoYQf7yn5x9dlp%2F63jhpUR7n6%2Bqb7pi0GirmaP%2FWG%2BvKSPEhJg6STRcVoFt56LlOw5cHfFf5DwYHcFW86WJuDWs%2Ba2lQJI9wnrZvlDxDXu%2BRVOzP4jY2Fg3AqLDzlxmwU%2F1%2FY%2BEX%2BJq7lFpg1LHd7WIwK9UpWYLyBwp3uvF%2Fqzf7sBVwisrm4Gqt3gyZAUNsWRT3J3yVN3GL0pFK4lRL%2B2%2B9SIyUq%2BJc%2Bl%2Blb7LnzB%2FsM%2FkZLZKKocjkeYoC6K%2FhCy7POQybmSsz3SXF2HL58YSXXAQ%2FCtQnWTYMwjSDCV1OdAOL5VRUUQXAc%2B1iDmvNBKfyALbYnnGjN1o9VeKwlMIzdocM3O%2FYrBRqcJuA1E%2B0mV7k8sqqdk2Q0lpyKM6nZiSPqPx0q%2FXAEXyWny1f5jiKX8gTdT1%2Fees3Jim%2F%2By04eV5ZTPUfxNuAowbqsxNWiEMFyZBiA7asmzeFN1lW107rrj1KV7gnMLjZ7M4GOqUBZHaVtKT%2BYEs3jS8hocJVVmjwiVBsfuxxnDeLacX13t2mbGTRF8Sgu9%2F%2FmjPgz48H3pL2RAppgvidCoh2e42i69mdsCUIClRMiGRmmxU2wBSAcZgxdNAN%2FMr5PGl1ok2Ls88UalJN8YwSMpmB0tPQyxv7avOv20XzBF4cuKfighWoyqwNAbFqvUp%2FZU2%2FjL%2FoNv2QYz4S7a0Z8FF4L1V1MJIBT19C&X-Amz-Signature=97775c740f2cef90fec91a3b1689ff30a0c7c99e116f77aeb301c410d370e064&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUWUOAYT%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDNwIS9Tj2NKphyQFbXIKfDDc5omi%2BUfR5VqsMZouKJGgIga2xWLMktt29kilKE8uCOH591K8rbYlMdxaOBLnv20hQq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDL8frblBCDX5FMrFVyrcA2k5UHnV%2FFRmfpec9WYBIz%2Bg%2BRKaO7vShQ9YQ94rEa4Ok4YMCyF9UV0uQ6n1WQUDEwLweYBppiUafc3b9gmrILBa%2BNI6X%2BBjehE5qUB0mEqINGGBlUwUks8fmmTCuoMUD9eRNWX24Dq1tpDibDUFpQFz%2FN86hFGoBCpVz1F6S5zZQqLmUjDZbVqRxyV%2F9TdszEuBAXcG7C27CY7%2FAAZGeZeh0psY0v51oFmvJqZ%2By3BAcA%2F5ISWzoNnQINGIvfnv58KxzZDf9bUClbTB5JLNFnSH0OdrPg6UCkXLyJUOi3tAgP%2BJiZHXfXE42WEHt42d3vwbZ%2BkZBMfLh80MI0fHpFErGuFuh3TCOv2rjqwUd%2F%2Fvl1OSzVeIZPgVPP0QaQQOuykqFx587wt45i7fLnur7v8r9oQhzNkWl8iw5qqvg5xcsIaUI6MfSsMuXuZJ%2B8F%2B%2F2PCjIq%2Bfo%2FK0K7jrYa2rU1nRcvjatmYY%2BUchV4ybrDw51BcHGKptzMazCKcl0R3Eb1kuJ%2FBmxhRimVT7JXiOVqKbmhzpz2GwAbFcwZx4lc2X5CYsqTs0odoXuq4CHgTWl%2BkYNKDlPJKw2%2BTOboyS%2FwHuVkWA8V2dV9Xi8uM%2BZKOR%2Bc0LKCpwCSOeIS5MKva7M4GOqUBUkTqM%2B9nHQ%2BXHKtkdv0KU1Cc96WAj0lUjUg3DCo29gMvliCT6r6tWjOqdjBYWkiqxIaQUUJe%2FQ%2FoiQChv4lQoRKVX6t%2BWSwzQQqe0yLlxts833PrRGdEwG8EiYaxgnC7VL7IsMOmF52hYu6veXOTOHLhQM%2FLOO%2Ferpw7Hrc9roaRPQhSD1BpHt6dDdwr1crAvanRGeZG63H23BxC3r6H70nQ9rlx&X-Amz-Signature=2d9a8685d64153e2ea03892c50351fe09ab75c8f6d1fa74977bf34d406c41b47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U42GJWFB%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCyZczaI1sdnrc7X8UDQwSuc3zKAAixLYQPw2cFZPqe0gIhAOpM0ADQH8h1Uxaq4JQ%2BDfWMYNw0doJaWxvObDa%2BvOFJKv8DCFYQABoMNjM3NDIzMTgzODA1IgzNwlOn6FPAdXGTQVcq3APoNEkBt%2F4kmgnlxjXSj9yh%2B84gfLC2NCQ2LsVo70u90qWii1LxTt%2FhZ1a5nXeRY%2FC1ZhpgAyHF4ZRZZy3rmj1kT8FnZT8MerCde8UF6jLeKqpq5KQOpNjUWDJpzCUA8hka3wSEiJA8QOhF2%2BRnAWYcRHLEBlh8Lm4IJrVlwrgCg10isMASaK6ZNuCiTmzQfipzGfUQqmFzGYGQkduIJuk%2Fqt4ySqQ9c3LVAputh0g4xtZvKzG6EEG2b7N6jUPc5oou00f5gOUQyjwXkIZdMsVMowc9VRQxQt%2F%2BIa3MR8qI95kV0ZEIYO7XkyPnNJa07Oq%2FhWBgSdLnINZUHQr9QN3wGPdWynAcLw6d6TchmWvvR2aus0RdVUXWDRc7o1ZGqj3xNYtlwU%2FUad2Wga15Ek6yDqqKYLtVxa%2B3ffRk6x%2FLHH%2FQ93MGnKsuca7RSFNMxNtggoTtRsNyU5DRnG6v%2Bu%2BfetZg6yUJSFcBOe6PeLkTtcxbmGd3NmNpYIdAJY%2F1H08NqWjLKQnoUkNtCMV7%2FbUHyIy9HlnwB8c9xmWBt%2BVlrFwMpa6PDRi7u5bSxFWnQ5fAIa39soF8OdoCs%2FGsWF60Scq%2FAVxZGomht6%2BFtPpOVxRf5%2BN9TnK4YQKM1DDt2OzOBjqkAVph%2Bb1c78UKye5SQZaQgdTBU1Z3Vt6P3rdGIVmbWS1fWW6OTVKADgy%2FanyC1W7t60fpZJ68fSb%2FtdculOFN%2FEyAPC4iYG2YsR9Izr0pk9e6F2rpKfr4buWPdmqlX6o4eidOyucjTLaBYB7pHw17gZGL33hiUYLjYu7WLT30ZA7UohXr1T4qVnBHD1irudEQhnHbQE0jmKgfYTxB4b8nr%2BjUA5n1&X-Amz-Signature=c1c842c3d1337e7c638a5e4096b5a9691fa9ba2549167cf36b79f3789173fdc7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U42GJWFB%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCyZczaI1sdnrc7X8UDQwSuc3zKAAixLYQPw2cFZPqe0gIhAOpM0ADQH8h1Uxaq4JQ%2BDfWMYNw0doJaWxvObDa%2BvOFJKv8DCFYQABoMNjM3NDIzMTgzODA1IgzNwlOn6FPAdXGTQVcq3APoNEkBt%2F4kmgnlxjXSj9yh%2B84gfLC2NCQ2LsVo70u90qWii1LxTt%2FhZ1a5nXeRY%2FC1ZhpgAyHF4ZRZZy3rmj1kT8FnZT8MerCde8UF6jLeKqpq5KQOpNjUWDJpzCUA8hka3wSEiJA8QOhF2%2BRnAWYcRHLEBlh8Lm4IJrVlwrgCg10isMASaK6ZNuCiTmzQfipzGfUQqmFzGYGQkduIJuk%2Fqt4ySqQ9c3LVAputh0g4xtZvKzG6EEG2b7N6jUPc5oou00f5gOUQyjwXkIZdMsVMowc9VRQxQt%2F%2BIa3MR8qI95kV0ZEIYO7XkyPnNJa07Oq%2FhWBgSdLnINZUHQr9QN3wGPdWynAcLw6d6TchmWvvR2aus0RdVUXWDRc7o1ZGqj3xNYtlwU%2FUad2Wga15Ek6yDqqKYLtVxa%2B3ffRk6x%2FLHH%2FQ93MGnKsuca7RSFNMxNtggoTtRsNyU5DRnG6v%2Bu%2BfetZg6yUJSFcBOe6PeLkTtcxbmGd3NmNpYIdAJY%2F1H08NqWjLKQnoUkNtCMV7%2FbUHyIy9HlnwB8c9xmWBt%2BVlrFwMpa6PDRi7u5bSxFWnQ5fAIa39soF8OdoCs%2FGsWF60Scq%2FAVxZGomht6%2BFtPpOVxRf5%2BN9TnK4YQKM1DDt2OzOBjqkAVph%2Bb1c78UKye5SQZaQgdTBU1Z3Vt6P3rdGIVmbWS1fWW6OTVKADgy%2FanyC1W7t60fpZJ68fSb%2FtdculOFN%2FEyAPC4iYG2YsR9Izr0pk9e6F2rpKfr4buWPdmqlX6o4eidOyucjTLaBYB7pHw17gZGL33hiUYLjYu7WLT30ZA7UohXr1T4qVnBHD1irudEQhnHbQE0jmKgfYTxB4b8nr%2BjUA5n1&X-Amz-Signature=577575a8d77907bed41bf02290b6b98ae132e765e5180617d09dbd84a9b78b2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y47JB2IR%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCsnr5JjjcC90dQFIRKUY1nt1nh1505tW%2FZ8EUMInjD7wIgW74F6wPrS8pn6GwqZa4oDM1EA2wO%2B1qz0OBoNcHA9n8q%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDDcsFlcMSVj7aHN4eCrcA0pKdOY3wmEjE0VU71SRlYHuMqQoepluPd6g89OAhNEuSa0q45RgNBuSYc6x5LpOD31JweqVkzXMzIkP%2Fg7jPOS1qTdcnEIdayzRcrESuFbUJhDXd5hQ0o9PffvyN57FQ79RVvtAtCyfsd9FKrDaPa9KDxD4obgUh64degi4DUUd7zghajye9mmkMDaZU9T67KVR7H%2B3JLgNqn9b7rfxituDEjX%2BCaT5ef0iXOkZLo6sjK0DqCwp1lKjLcCAgR2syy14tL%2FBGoJ2DG2xt0BzcjPH4iSchM7e5vRdvX9weGROwIJ2C56CiCLhBO4sMUkLhH2LRDD8q2PtY1msvVBWyhuUYO3HC74JB6ozNLeMs50nmH6HCH3OauL9GVNrQGlKYHpknjkfmpC6EpbdPAyLylRpk7vc8iVGibw2I%2FeeJBqaWZg8UvRpOZqYx7I9DzjhY%2F62btr%2FYgjrlewGeW7zruy%2FyIqbbCeDAr9%2FbyM1lGldtRy0gqdhd9c2L7PkYYILgkWDIKxzYCc58vTx%2FPaTS1oAJwxgI0pJgOGJzWMEjVzB7o54ckiJygKe4FZ7QKUWgE9jo5UjYr%2FUlIUj0X5V6s%2F4JLnAt5F4JtjPr4zv9AE70gIroe9Z7oX0c0n%2FMLLb7M4GOqUBph5cU15%2FRZ%2BP21frykX7v5e2NOu5KoZMMU4%2BRJD5YhXo1MA2HChdJhSQ2eScjL%2BEJWkeQX6Tey8WXj40dNSK4JNom3S14HPZ9DSmjQjUDn%2BJKWFidSd8gTBPXovR3Prh%2Bh0m%2BIbuGLSTeTC%2F9BFqxqEVihPniABzazWrGOKbqLhdBCKFG30CuxvV5qiSD4Fp1k3O4YB8ngc1XlsLhZ4t1hKy7zRM&X-Amz-Signature=70e83a0bb1f7f5ef84a42957ae42e02f1f4f9a0360986dc82646449b558372db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HBTJO2P%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDXx5CMDPtD733lx8rgi%2FL17%2FLczRfaTWT0adwGdhzRxAiBo9XJBLfdrU6ttof4mJ104lx5m2vWogPRcBgjaczLhySr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMgxq57wnkP28rYd%2B5KtwDYMfilQkr3PJ9GEDPRZHvbZzeyJEUC4GOEv1vKUIK4GWR%2BY1UtPQZDXrDKrK8xUt1xClQl%2FeEA719wCFIcjuW7u8T1%2BflTjSaeZWRAyoesFBlZozWFjCg1LVFde0zvt43pZiFWFOZ7T6vyI57NG2WSjKdzdOG2759nZDQalUkiDygD4eSRHWx9OvFP%2FhtHTStgfsOjQ7UAgfjFF0%2FzgSLZOzA6nmfFL2SicPSPMCeid2EN3JC2zp1kQnNz57Cx3%2FTHymGgAUNvnRRgeLXuu85HiYSWKMHeZdLXk6DZqqZx4cE45Demlai82e9wrWy8YEOLs5FgeD3awaeCL%2BqWNqHFTNstH9dzcp0Fv8Nb4qnXsnIt9mzRfD24P9s%2Bws%2FfnWumu5VDSFJ%2FiokOb%2BmpH5iRfZl%2Bdu%2FpAgrxYWuagrOGr%2B%2BPgO3pORv8EAqioXa%2FoQoo3JFJBSdISVLuzUv7h5%2FymMQDEa1NYx9IDAHyrNAnKrpe5oap4VWyWcCtL2KdyYU%2B1Kwf61WAriCZZQSAY1cq1OuV2tPHQd%2FOKf7l3FRV149X5xtQsaX4pPSFpIHv7YqwE3y6vvfw9zQXCsLExswWMxENxVLhhKIZRRS40s1icg5DKKI%2F4d5QmAtvnYwzdnszgY6pgHiq6%2FguxXMzx9wTB6JfCI1nBKwEkSsdr4kZw9H46pEv3fT85d82kEHGLk9ZutCRWXtDua9egvo62m7px59xQl52SP2iebIn0kWC%2BGXxjwoo9OaF4UZ%2FGeA77afu2sCyeLQMFUqyk5QrNVNm0vLnYCTKq8lM%2BaTKaI28PjFl99YqAjeT5pDAMXllXzM0adMgFZu9vc4q3YH%2FFhJukS3TllnKLdHb9Y0&X-Amz-Signature=a508565a7f37e70430b4bb83e9f35056cf42013f1f985ddf7f71d9a0bea546ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HBTJO2P%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDXx5CMDPtD733lx8rgi%2FL17%2FLczRfaTWT0adwGdhzRxAiBo9XJBLfdrU6ttof4mJ104lx5m2vWogPRcBgjaczLhySr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMgxq57wnkP28rYd%2B5KtwDYMfilQkr3PJ9GEDPRZHvbZzeyJEUC4GOEv1vKUIK4GWR%2BY1UtPQZDXrDKrK8xUt1xClQl%2FeEA719wCFIcjuW7u8T1%2BflTjSaeZWRAyoesFBlZozWFjCg1LVFde0zvt43pZiFWFOZ7T6vyI57NG2WSjKdzdOG2759nZDQalUkiDygD4eSRHWx9OvFP%2FhtHTStgfsOjQ7UAgfjFF0%2FzgSLZOzA6nmfFL2SicPSPMCeid2EN3JC2zp1kQnNz57Cx3%2FTHymGgAUNvnRRgeLXuu85HiYSWKMHeZdLXk6DZqqZx4cE45Demlai82e9wrWy8YEOLs5FgeD3awaeCL%2BqWNqHFTNstH9dzcp0Fv8Nb4qnXsnIt9mzRfD24P9s%2Bws%2FfnWumu5VDSFJ%2FiokOb%2BmpH5iRfZl%2Bdu%2FpAgrxYWuagrOGr%2B%2BPgO3pORv8EAqioXa%2FoQoo3JFJBSdISVLuzUv7h5%2FymMQDEa1NYx9IDAHyrNAnKrpe5oap4VWyWcCtL2KdyYU%2B1Kwf61WAriCZZQSAY1cq1OuV2tPHQd%2FOKf7l3FRV149X5xtQsaX4pPSFpIHv7YqwE3y6vvfw9zQXCsLExswWMxENxVLhhKIZRRS40s1icg5DKKI%2F4d5QmAtvnYwzdnszgY6pgHiq6%2FguxXMzx9wTB6JfCI1nBKwEkSsdr4kZw9H46pEv3fT85d82kEHGLk9ZutCRWXtDua9egvo62m7px59xQl52SP2iebIn0kWC%2BGXxjwoo9OaF4UZ%2FGeA77afu2sCyeLQMFUqyk5QrNVNm0vLnYCTKq8lM%2BaTKaI28PjFl99YqAjeT5pDAMXllXzM0adMgFZu9vc4q3YH%2FFhJukS3TllnKLdHb9Y0&X-Amz-Signature=a508565a7f37e70430b4bb83e9f35056cf42013f1f985ddf7f71d9a0bea546ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBMMGS4V%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T075434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCrFM3rTMQ2lFlliZ7CcXnGdJ71xOswX4AWaW9ChoI0tAIhAP9qRvNXJviXyPVGEQMODEWCpny33FY9Uj2l902yRCfSKv8DCFcQABoMNjM3NDIzMTgzODA1IgzysYxV%2FFEELKM0cskq3AOChEIEseuDftbTuCWKTMtdBK5ZE0qqtcscojNoy26Hw1DEM8qaI1duXxuidPgadUSr7Woyh6NZXAVXQzq9O%2FtPb2WK74RA%2FeXNvC1vfpNf943htXsT3K481Z9uIcdjMV%2BEezqWGvCT2XgOM8aOVQUw8Bl%2BtwW7wR1HffJeDXbYtnbsGe6ELpFUZaMQNeazH9YTF0aySdY1utydfd2wkdPc0DBmxE3i1piAq0N5UTmXiuglu%2FzKZB3rky8t8E7rmvfl%2Fe0vys61wAOVnmYa6Ns7G8W4XNzyTR6I5jIKGuA7RCDiP0gir1TTHLknX7AfkrQUAT2zW4qkYWsuK4UnJP4kJ5Ch9xBvIi9o2x8SOeO9jUVF66lxqdUepjMWxV47CuSQ7ycGDzNqc0syPjU7MpaFJFrYIY5Go9YTcQwl%2FFKiwgO%2BrG8UNEsA6mSsVEFgek6EoNnK2gvw%2BIU73sNHD3iim1gzSWLTFyHCulLAqrvalsX4v6XM7CTsECTNpZ5O3t5il9KVju1Es9HKogo9g%2FjK1cmUbF9oFNCCzmbMRVbXdJPCzwGxjiCfJVSswgGceG9o8FHQSUbDvugpeWLexj7gK%2BQcOsYGZb8cYKSiHYxm85azL4ZWFPneeYBvOzDW2uzOBjqkAUTx1UK7hknTGHvwSvuLeJCEK%2BIWYlhUT6n7g7CmE%2FvD%2BjUirxjfdBBo8kCtrdH2Ra%2FtqrY0ZJ%2BY6Ux5WCFpd8cyxvX4k7Nyg%2BGVT7ZMQomFAztD%2Fuz3NeHSQWQllvwJcv3oxZ0yXJ9hrYYwcs2P3musZ1M7pXciroTMy4TCyv5Vyg2R2eo%2FYLKmF%2Bzgyr9DEZ9rDX0vVmjTEB4tWA9%2F%2FaWANZiy&X-Amz-Signature=a674a86048c0ec6d30952c6bb32b79a868a3b67c44f7b82a490d038a6e5a7784&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

