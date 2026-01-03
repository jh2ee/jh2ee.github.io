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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNYYIMUN%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQDWFIxJwUxUvaFDMsLUUDXYP505gOkCX1NJzoWVDYNulQIhAO3mxgpGtv9AX0fhDy06nPoQT64zdZhWN0%2F4kXjpdLEAKv8DCBMQABoMNjM3NDIzMTgzODA1IgwOksrndrrCuU47O%2Foq3APtX1BoIpFvfg1U%2Fua6r7lXzkk%2FU%2FvXe%2BrrahnkeyzDHL0eJ6%2FBl28zb%2FsDwtiV6zEIQ5gfXciep76chO%2B%2BSBSzZRHjqu8nlQaR3kvMa%2Bde5r%2FCifqJLMPuYE5d9sBhEYxr%2BsLzo3i7ZnUxkspYnAnwkxg8K%2FrgBoepY2awnDggNqXTFStNeW%2BtsfoQgTsgqDdY1jx9E4uJ7y85A7TLpZNcu0YGwB6tVJepZ1CkA5JfkQ4IFq2Sv3vjkC9DIY49JuoiRV0Fq0alCx%2FwJRAGqLC8C9fpT%2Foe7%2BT1sS2d1Jp8CLHSTLl0jXgaSOZoT5vIT6LoaTvKi8hQci40ngMXkaYZmhvP5EuTOjRnXwjurmIurHIUXv4NyzLAuHAwkb%2B%2BKm1NHWdyLVUVT9gCWwj3nP0iqzcZDy9NLHx158Ydkfmn5Eq4S8GPvwkXw7unHg2grucn%2BzeZJB5UT4rr4s5ubWzmBjnK1eRcoXYg2aAZpmNtmRCt3cXz2Xoj8TZ3LbRMcMggZN%2FEcDV9Kjh6UahnCfIQtEh4%2FC6TeT7k5tB1Q5x03rJrVdIG76thH2qbY0bLDHFw%2FV6iH2PCXy6d6dvYRlPxTmon6W2Lc3eWlsMG8R0S%2FnmHpfP%2B%2B4aaR4ts2DDHyePKBjqkAQ%2Fbg0BT5WoOit7mgxOyf1KBl4dQ70A2G83X9SsGMGBUDfb1zMrv2Sn%2BAXlA8GqXABpM%2B%2B9y6Fxjo5Rvboo5k8Aa7ILeD9411lT6SxlBxCMhHEbzDDP%2B0H%2BL0Q8HZwRkJDOBf2YobYcSfsa%2FkcjIN0aMekuJXns2VrlVUBKpHeldlYfrbfxTgavvpdhKqEQWKjp8TnYgFt2FMOmyksnn%2Fgwc4rad&X-Amz-Signature=874ee6ee48660fa35481e7482a019a5c66a31e14f1e05a2f99596afc758bfa78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNYYIMUN%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQDWFIxJwUxUvaFDMsLUUDXYP505gOkCX1NJzoWVDYNulQIhAO3mxgpGtv9AX0fhDy06nPoQT64zdZhWN0%2F4kXjpdLEAKv8DCBMQABoMNjM3NDIzMTgzODA1IgwOksrndrrCuU47O%2Foq3APtX1BoIpFvfg1U%2Fua6r7lXzkk%2FU%2FvXe%2BrrahnkeyzDHL0eJ6%2FBl28zb%2FsDwtiV6zEIQ5gfXciep76chO%2B%2BSBSzZRHjqu8nlQaR3kvMa%2Bde5r%2FCifqJLMPuYE5d9sBhEYxr%2BsLzo3i7ZnUxkspYnAnwkxg8K%2FrgBoepY2awnDggNqXTFStNeW%2BtsfoQgTsgqDdY1jx9E4uJ7y85A7TLpZNcu0YGwB6tVJepZ1CkA5JfkQ4IFq2Sv3vjkC9DIY49JuoiRV0Fq0alCx%2FwJRAGqLC8C9fpT%2Foe7%2BT1sS2d1Jp8CLHSTLl0jXgaSOZoT5vIT6LoaTvKi8hQci40ngMXkaYZmhvP5EuTOjRnXwjurmIurHIUXv4NyzLAuHAwkb%2B%2BKm1NHWdyLVUVT9gCWwj3nP0iqzcZDy9NLHx158Ydkfmn5Eq4S8GPvwkXw7unHg2grucn%2BzeZJB5UT4rr4s5ubWzmBjnK1eRcoXYg2aAZpmNtmRCt3cXz2Xoj8TZ3LbRMcMggZN%2FEcDV9Kjh6UahnCfIQtEh4%2FC6TeT7k5tB1Q5x03rJrVdIG76thH2qbY0bLDHFw%2FV6iH2PCXy6d6dvYRlPxTmon6W2Lc3eWlsMG8R0S%2FnmHpfP%2B%2B4aaR4ts2DDHyePKBjqkAQ%2Fbg0BT5WoOit7mgxOyf1KBl4dQ70A2G83X9SsGMGBUDfb1zMrv2Sn%2BAXlA8GqXABpM%2B%2B9y6Fxjo5Rvboo5k8Aa7ILeD9411lT6SxlBxCMhHEbzDDP%2B0H%2BL0Q8HZwRkJDOBf2YobYcSfsa%2FkcjIN0aMekuJXns2VrlVUBKpHeldlYfrbfxTgavvpdhKqEQWKjp8TnYgFt2FMOmyksnn%2Fgwc4rad&X-Amz-Signature=874ee6ee48660fa35481e7482a019a5c66a31e14f1e05a2f99596afc758bfa78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BCMBERN%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQDoSeoHEwH9loi6NKmM1DqFrxutUM5Y1PCOz2PFRKSZ%2BQIhAJyHauWMXeColvg3jMk7mcd9013PAp6xkCXTZrdFw9kvKv8DCBMQABoMNjM3NDIzMTgzODA1IgznC4WJ%2FhcOVN8QjnMq3AO1qnNQOCPMMe5Y2BDL0GU7bIasyoqYISkuHgJD4xQa6Md%2BcA4X2wqPTqXWa%2FPTwlOEA3JeOdvsW0xSnB1wgfqMbEuHzaQt%2FSnBdc6%2FAE1nCnrxKD%2F320z503XFhZcBWqmr8WfF7BZ%2FRlRMmKAEvinD80yOMTphaFWISerap4dbCSK2H0AS1%2B39SwGv2TFccW%2FDwQWb0lnEjdzAhzO1pSHT8qGKrNqY3L3i9r28CtbQqsdw6XfaDJQPmH8RYcUuABIhtv79kl2MHbrJ8PgGZSZzD%2BOCrA4Osok11%2BVvyak0lbjmUG6HAsuJ9ExXUzErUxquXgm%2BqM7GVffKPggav5x3BNvoHPegBBWo4FYmZpHAbzJrc%2BgtzLqsnw4RBY3qU%2Bx1BlDATCG532IIc%2FAH3l1wk089scpj8kd%2F6fKMZAUm6BJQO4zAAPjmEmMkVvZH9qHRqg%2BVUog5oLouRZYzqx9315lJ2VbI2laNKxfub7SaP5srUTuMroaSBXlu444oEV7Hc8iP7E3mlvrAcpw9xtQdrCYfTn3pRqalR55WhtYBK16HZrUaGW6OHkdcMlZDkLMi7bSoVHx6MEV61csmiALKM5dwWiXvBNLPReuAkW2Ey%2FOdAna1UF%2B458JGFjDcwePKBjqkAdQ8jxJq6NtPdsIN0voDkzvM1%2BSfUlW5F3vJlDmrSUqftYOjCq%2Fms%2BlQVPpEaz4kmXoU6mN6Zsq6NDp3iic4Lm7Ikp2Eha7m1N5jL%2FX0teC7szU6WCJ1LNpngiPXaLjTNNG5mwPaT%2BYN48dGYi8ym543%2BYNkNjji6DrQdByA9L5Nr6YST1vUAigVjAdbHciCdjJKiQRJlDZ5%2BsjIfunp5yTvdkE5&X-Amz-Signature=1139acc79d2d9bd824cc310bc9f2f02aa601179c6000d4fab0b434efc1ccd6c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNRNLSES%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIC2zLVQvYeiI2A2eLRUOcq06I%2BKYxmLWViaZhpGgX0PhAiAkMdvwPA3p6A1h11I5hJBv3d4PKCNu6taWxJ07RE6KKyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMe4wPk21hCgXWc534KtwDuaG14RU623B%2BU%2BZdnbcfjPCUKgsu8AL8uk2uBzxRRBjytq4LqvSDizBNvFm7HGtis1qWe5cdsMt8hYSTvmcnFzTFpiGfG%2BWzKnlQPayLBWNsRnLiicENZqD%2BphqKSw3NAR1cakobmTfbeLt9w%2BLihM0CsefzX%2FhjzABQrWOI2jL5kN9I5kJYaW4Rtn1BJTfFjGJ0dShjse03LxZCGw7QA38K6TJqdamyALRWsYPYBAnePvVvGONWkjF0XPKiGH7FxymfUd1HHfKcXzHh%2BEb9m%2FEOzYw19J5WRAHaWTqFZ5lQkwOB5ZW9KoVAre%2F8L%2F2gpokX7MGIraW%2FN717T2xTerLIrdygvBowrrHIJsNW46rOdce4ktT7hgnqy7UmfjwJLxON%2FdF1LT%2B1wVIQH2HgdpvzAAPOfYReRmSp%2BPmFiaHZPHRqJPdDF0I%2FeTfnlXo0W%2F%2F%2BtVb0jILrpIDDj2phGelUH6syzshFgd0rMNN5aW0gmYV54eZrbpavUMramrIIxoAY%2BPTDn25zccuWbttUv6SEJKTCw7Eo%2FDhnL%2FCKEO0xTuxjMMV4V1Yxlob1lQs8%2F9T63BgOBtmbxnR5G2yjwzrdr4ccQ%2B8YjNu9WiSRJeiZMkSXBgx3BXVknIcwscnjygY6pgF2cxs%2Fw4sNIpWUkqU2mfojodXivoObjbgQwvt7L6LucBgql52t%2Bevy72kfbxg00Oc0CK39qw%2FBqBclW037u2z%2BVG%2BjetP%2BL3f%2BJ3BQdOeXjKyvUeRnkfSeyuBPIZZO5seAaZ91GgJdl4Ekz7Q%2Bzucx1zCCLBB8dwtQz3OJsl3fSHcCdJ%2FAa8XyODQ6r0UV%2BXyqQXvzOJk6uTBEdiMtbTffyiVr2XKa&X-Amz-Signature=f106ebcff6c23e379a446abf2aecbd23f5c4eef2253de4cd64e8d5ad7542808c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNRNLSES%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIC2zLVQvYeiI2A2eLRUOcq06I%2BKYxmLWViaZhpGgX0PhAiAkMdvwPA3p6A1h11I5hJBv3d4PKCNu6taWxJ07RE6KKyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMe4wPk21hCgXWc534KtwDuaG14RU623B%2BU%2BZdnbcfjPCUKgsu8AL8uk2uBzxRRBjytq4LqvSDizBNvFm7HGtis1qWe5cdsMt8hYSTvmcnFzTFpiGfG%2BWzKnlQPayLBWNsRnLiicENZqD%2BphqKSw3NAR1cakobmTfbeLt9w%2BLihM0CsefzX%2FhjzABQrWOI2jL5kN9I5kJYaW4Rtn1BJTfFjGJ0dShjse03LxZCGw7QA38K6TJqdamyALRWsYPYBAnePvVvGONWkjF0XPKiGH7FxymfUd1HHfKcXzHh%2BEb9m%2FEOzYw19J5WRAHaWTqFZ5lQkwOB5ZW9KoVAre%2F8L%2F2gpokX7MGIraW%2FN717T2xTerLIrdygvBowrrHIJsNW46rOdce4ktT7hgnqy7UmfjwJLxON%2FdF1LT%2B1wVIQH2HgdpvzAAPOfYReRmSp%2BPmFiaHZPHRqJPdDF0I%2FeTfnlXo0W%2F%2F%2BtVb0jILrpIDDj2phGelUH6syzshFgd0rMNN5aW0gmYV54eZrbpavUMramrIIxoAY%2BPTDn25zccuWbttUv6SEJKTCw7Eo%2FDhnL%2FCKEO0xTuxjMMV4V1Yxlob1lQs8%2F9T63BgOBtmbxnR5G2yjwzrdr4ccQ%2B8YjNu9WiSRJeiZMkSXBgx3BXVknIcwscnjygY6pgF2cxs%2Fw4sNIpWUkqU2mfojodXivoObjbgQwvt7L6LucBgql52t%2Bevy72kfbxg00Oc0CK39qw%2FBqBclW037u2z%2BVG%2BjetP%2BL3f%2BJ3BQdOeXjKyvUeRnkfSeyuBPIZZO5seAaZ91GgJdl4Ekz7Q%2Bzucx1zCCLBB8dwtQz3OJsl3fSHcCdJ%2FAa8XyODQ6r0UV%2BXyqQXvzOJk6uTBEdiMtbTffyiVr2XKa&X-Amz-Signature=18d641293d75d746de92a4a1527a5b88f093767119541fa436447e1893c323a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HMJU4W3%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCRrONzFayBdFMCTFB4ZzD05rpVciDNaDy2Y2WpyVi%2BzAIgdtm6ozPaEWNartnMEL3ybxA5bomguQ6YvxRnOXrZ9vEq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDKAX0R14ncwp8F8AmSrcA0GBPIwWVM%2FW0YCgMBKH2xI6KmB8erqh%2FFGkqCtvvT4Uq4pkKJ17nrGADwbarmyHSdh%2BxhdXr5ERkP%2BOYAr8%2FSf4hCsCSA8ZLdzS9owXFUgkKCuAzkI%2BalKtVSDbsW1HH7odeupH2VUvd0mXZ0i03Xd6jTHuOmt9DerEYL8XOQgSYiuvqfz3yIcsaTsyg8kOlFGhw%2FTworQ6chDrGDRmKVMKDxXIFXk42S%2BmuDw%2FWcimcCVH8GnwpDvjPHJnoreEkFMjrnHdAIGmtDN1NnfPNj8dAvHtLVtBGrejCn0%2Byi%2BlNNkePRzIZqkJOHwUTTP16BbaBXQo3okJZ%2FzCkyIDqrmQbfHOifHW8a2pI%2B1xQiceRlvMmt2tK6bXN2%2BuXzIbwArYTL5Q4%2Ft%2BmgwHmGsp7lMT2cvNHyBLRcqK%2B4ih%2BrjCyEPyrlMfA2j%2BDJMFhKcZ%2FNb7zBN61rgxDrelmI8wkwC3XJsAAYd8EAHUgOXh3OVRyCxd5QqUKYL%2FhRsgf8aI0a6usvr7Til%2BqSBNBVZq5un9BMR5qJbCHdudg%2FkYrriY88BoWVt3%2BSWGJOb4Z1HTjB3Hjuqw%2BBFv88nO7YkuI6OnBu9yw%2FoFZObIkBzYAugxNOuZmexUYXUWNWmWMK7I48oGOqUBZjwINdDXrEPXb34kvSSXJrf1IGKM06KLGCPgyoj%2Bcd4fp597JieYJGYelQ1kjXnYCg%2BMpZGoMLHXwgN8IAu%2FwfrLuwz%2FbncXHX1euyo%2Btd9onyQW6YQ99m1kMEeGPT2xsdUJDbEwGVNeL%2BpSF7UbyjD0fqmao6oNCen0SVnzPXDZp2XopZtUrHmwrqO2gJnpRuC9WYwwgqwBYUHCvZ44QARxE0oG&X-Amz-Signature=8f38f45ebb693ed0c714c19bed7ab40ca51e77fd2b0a7834977707ec4fa5c746&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJUO6HA4%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIGf770HWf1REHOskSKhBnVxyyTrNPVBMxG3QezOMwEEHAiEAq0zQO8NHGoqbJqwf2D%2Fz%2FoW%2BX5PbctdeP8CnTJ2Kr6Yq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDMmJ5uqCELtOqZtuYSrcA%2B2JrQ9GzJE7NT6myQkGgR%2F420dkcfzocOk32aT3IRZX9mkJNIUo6F9DNIbdBQ%2BQXEn6bktzolP8LNN5PvNNUTO%2F4cEutjhNtjGW7VMVC%2FbpHOcqhXHd4UAaGIC2NwrtplXnR7bpYcgC1QQQiapOiaui6jGv4kBJMfPGNcZyWa1%2FROhyfV6LrQTNpfg4i%2BvSCDYnt%2B9LtGD1LGE2Mbgv6OQ4nD9lpV5eS1TkFKEe3AVzAN1CPkDRxXo8LAZVsYrHvSqGhHqzazVN5Yq8nl8BkUsEIUEO2OV%2BfJSuJxP6cVFjBif4fv%2BEoOCtDuuC6tEHJ5m9ssJeKQJIkmtspzM5l%2Fz1s70OzjHzGeJyDRt3hnN7LDMo8UjHTPhZe9XUAb77b7wrXKOstLL8iL52hlzGF8nNBPGwysrrFnud0Y%2FMHr%2BfZsu9oXxLpeUpTlCmYHCjQFYseSKaJNvClhVw3m3IahGrHr%2BiRtmlmQzoW5CLNeDZT7oGbCmmKJ%2FfIJpXirkkTmUZu9FrO5oPe8jpH5cBWDZT5GIJD2qLriDUX5b7eHemETxwyTczxRBz8%2F5qiRBmvrX5SR9UOghcqDCjP23khjuwbCvWjX2AfBIbVGaXEcfd9nJNbokKoZlEG7%2FuMNjG48oGOqUBnqpxl8Fsisca1DmCuIltxfqZIoHbQaMhneGmZM5Zs0KshRZn%2F6Qqr%2FzTxEnwIwzUppIBDwMq1d9jcMGyxJbBNhNhpMUCvSMMdbpiqM54n%2Bo%2Bp94VNP8yJ3hgHJB%2F%2BQHYg7N4lvcRjIU8OkSKmYDJ6OGnC7je3BL8jo0A84Qzk5myyIeQ6BXwWXSXsVG3osTdfudSPzrcEJdxW7DiH2zytQLv%2Fujk&X-Amz-Signature=b64328193e6835da1db0698136fd44bdb1b36ce1adc2dbceaa50308bea6e7811&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNQSBS4U%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDS1kNqSVbZCqWFQwSgFdpnTuYgSm%2FL%2BUvXpDFY6ozszQIgb5cyqT2wBX9wmHEWPHJ%2FmGZ3C05Jqf3ZhO4ISWGl%2Fdcq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDISW0Df799s4ktSTgSrcA4kPg3icL0VH57FwxwdMOMHK5XcW%2BWrchSdFFdF2tYiULaeXrj9zws599C5C4zNLwEGid71J%2BZUFf%2Fzs2Bj54e6nupvGzHxKZizsh2pqw0L%2FQB21G%2FdM1Z%2BOsKTIblmrbscIYCtfnmvMha6z9j0CHJCNWJcUYDJMzvhtO0cUGJWSaWtTxPEavF3zBk9ykAsIJI24nYNMwV7YpZXRwE%2FlMLcvabOcAylano3VLfdDNXOkQ2PBd1BKsEFvp4ysunH2lG2EZOJ5Vtyrm39hEAr2UvGdTTKvZcmLOZ5OVng3wG0bCNEXB8oRRiFJqYEhNz7XFpDHefm9mvBvbC4mj9XNIhDAfYhSSbQXTkZSeJhQ2rMFuPPNf7z%2FPHRmnQH2uhsg4dYQb4pL4pHmhM49%2BbYIxXXfvwdQEjZ7AaGNVf6YrEa%2FG2ELUdOZPHXLwlEScBE0HCgLIXxqhb3ptRR%2FwDwwz4JYHVI8Z87VjIfiyrXXT%2Fo%2F8HCPTSGM2u344pIrHSykAs9SggaKepO3UoCuHhkkAiIJdmYJ2xISXdWo6UVwvpiN6t4siLgj%2BztE%2FoS44NC%2FNLqZ%2Fs7OIgEPGOX1peOjnpSmYtEPE368U1pphBlKg5ZVituIESCtIRoxfl3OMNfG48oGOqUBFvsqVQbRlQ1JB1j5HGFwGsx2JjtgR4c%2B%2FyiyYab3LOj3kNNPYw2dnoJOg2L2Z13ALAuZBG%2BZQLDB0xXQm1rBMTzHgXcuoqnJEiApY72yxtcNi8LxLjjS%2FX%2BfWYEmF2rzyMObw1iLjDVg2vT2JJY3VNlreE%2BSOFM7z3950rRrJ9XeAL1bq2X0bhCFe8o0RyI1P3idssArA2GFKktH4%2FTNJWeiRbui&X-Amz-Signature=f55b5a640d207a194bed8476b179142b5d1ed2b1f0a0e15156ba76e1201b6649&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMLIMHD5%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQC2b10iYTY70b%2F6qSVS%2BRBmxxjLnvHJMvvOxI2Biy5%2B4AIgQbCH0Xr1ovm3KZXp0F2g2cdM4K3aGo43OU9RaTkDOCsq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDJUe4IkYsF2B7xKHoSrcAxYaLfY%2F8WtC1nwPQbR3GgRKUvk7tZxpvlpH60eV7EVr%2Bh00q8OEVeNoqbgNiuSMoXnLhMd%2Fz635YMkVK8%2FGzeN9PNGETQ9GYiKqm5y9swYfqslmFCSrs5BZ5VzKktoo7ZtUPCJUihXpP7yTwSBxgcBRZxi6rZQMKkzuU6FCFBT0ofuViCaicxOcmBGcKVabbotmMGhiceuG3hVxvMwmzxxmhA7%2Fpt2gXqnOL%2F%2Fj1CTpuCRaHmdHBn0Qj%2FYMPeu1lts%2BttsUUKnR3JxDNGWgqu%2BMo5ryW5jsHCrZ1P7mS3pkwqBuYpOBOCpTZ64vtPUsSPT7MsDUmuPjjFA3NDOlmTZCv%2BJYxjPQgSc%2F9lNyssX0kd34q4Yz0ZQiPxSUlFvtpGhjuJQmAAZHIUyClAYcMA4kx7dR%2B2Vuz9RCCFV05mMJLY8A3LfLPkXBtYTyG6O2N12neIzkjWRKk%2FVa%2FRbLS2YWvBHwKa3jEOxDSJp5%2B58%2BvZYBmJEaNu78vOJnaImOCbnjCQUFvp%2FaIGLr9AK%2BcTabg5xGHKe2CgCBaPM24zlCq%2BRcRo9aHi9W2AuvASiizxGPFtpzorrlAwxYQxmBEMaiH6mRZeV77bZCQpc8MxI%2FckGJanhq%2Fy8bUR0SMOnH48oGOqUBBl2tLBFI56SmI%2F33nuVh%2Bcp5XeOnDqnabfU2m3IlAqL%2FGkviNOq6Y3rjnBNVJrWhbQqMPnwGo%2B9%2FSEDiI68rILNRnj9LJHUx4vVLdFOCVwVnfCgAYIHJtGPCsZ3t4p1rafrVMZnKRvNQTolE65ZUbb5Gk0hCJlXc0AkGdeoICLF7gQJhhneUMR6Gaf7uOo2lXTxDEoJO%2FfUNfHk56hSVv0EQNtNT&X-Amz-Signature=30c44196aea7471ba2b3f307035bac0f50142dfcd85fd5cf450385b5063621f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMLIMHD5%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQC2b10iYTY70b%2F6qSVS%2BRBmxxjLnvHJMvvOxI2Biy5%2B4AIgQbCH0Xr1ovm3KZXp0F2g2cdM4K3aGo43OU9RaTkDOCsq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDJUe4IkYsF2B7xKHoSrcAxYaLfY%2F8WtC1nwPQbR3GgRKUvk7tZxpvlpH60eV7EVr%2Bh00q8OEVeNoqbgNiuSMoXnLhMd%2Fz635YMkVK8%2FGzeN9PNGETQ9GYiKqm5y9swYfqslmFCSrs5BZ5VzKktoo7ZtUPCJUihXpP7yTwSBxgcBRZxi6rZQMKkzuU6FCFBT0ofuViCaicxOcmBGcKVabbotmMGhiceuG3hVxvMwmzxxmhA7%2Fpt2gXqnOL%2F%2Fj1CTpuCRaHmdHBn0Qj%2FYMPeu1lts%2BttsUUKnR3JxDNGWgqu%2BMo5ryW5jsHCrZ1P7mS3pkwqBuYpOBOCpTZ64vtPUsSPT7MsDUmuPjjFA3NDOlmTZCv%2BJYxjPQgSc%2F9lNyssX0kd34q4Yz0ZQiPxSUlFvtpGhjuJQmAAZHIUyClAYcMA4kx7dR%2B2Vuz9RCCFV05mMJLY8A3LfLPkXBtYTyG6O2N12neIzkjWRKk%2FVa%2FRbLS2YWvBHwKa3jEOxDSJp5%2B58%2BvZYBmJEaNu78vOJnaImOCbnjCQUFvp%2FaIGLr9AK%2BcTabg5xGHKe2CgCBaPM24zlCq%2BRcRo9aHi9W2AuvASiizxGPFtpzorrlAwxYQxmBEMaiH6mRZeV77bZCQpc8MxI%2FckGJanhq%2Fy8bUR0SMOnH48oGOqUBBl2tLBFI56SmI%2F33nuVh%2Bcp5XeOnDqnabfU2m3IlAqL%2FGkviNOq6Y3rjnBNVJrWhbQqMPnwGo%2B9%2FSEDiI68rILNRnj9LJHUx4vVLdFOCVwVnfCgAYIHJtGPCsZ3t4p1rafrVMZnKRvNQTolE65ZUbb5Gk0hCJlXc0AkGdeoICLF7gQJhhneUMR6Gaf7uOo2lXTxDEoJO%2FfUNfHk56hSVv0EQNtNT&X-Amz-Signature=8138c340bfd5c63d5a5791ff0efa3f20fe7693afe26b31ec66170e68608bde75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYFXIMRW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIHx6hXXT2du8xLnylsABy9F4wSM6F45PLpvlj%2BTzgJhwAiEAyXqpvVhds54Jlp3TBv5fHsmkcA5Md5u0PM1%2BbLlWIa0q%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDHW5%2BfdyA8DQg2JZmCrcA3OprE0E6e9YZokj2HHb5iE1pQ06M6HVfvthHALWBVaQomBSk9mdy6H3Nqc0qvsu8%2Fi24H%2BIcihvI5qWxXYnm%2BcKXnn9xaeUsKFKpZvj73qHWi%2FMCbwzwA4kNrYLvH4Cb60cFqLUb9VfFFCvPV2wnVY4gdYgXJ%2FqylReGxt4BEfqAB7lQXs3x1H1TTTVToE2H6fCn%2BKXetjqG%2BMAYKX0%2BDVeu0JfSBYND0IfJrxoWcQaAszIKoVL0GdLDLOJ0R9pSaCRlwMgmQjEWO438pbG6b2Xvm33mABfrLjOFc6Q3m9XJjciU%2B%2FdL8S27SpKpAJVrb9g7FfDpgEL520MMpTRmNDn8dj%2Bxx9ZdQAVG4K5QUyyTx8fGs4EpjW4uWmXob%2FIotUua3hCLOVcN51rqBgqQSwqDoFIoqViiUHJj5uzBwMOVm%2BMEtRJEToHUzXgCVK05CjrojzJFj%2BA0S1X0Bapi%2BpZzAuc4RByIr8Vlh7tiZcl4H%2FZhMQeqcf8yHjO%2B7%2Bs2UiWM65LdGN%2F7oOj5m2iAQgKxyTwBCleLSwd7OLtK71I%2FFQM%2FJ%2B1%2FeEAHOPH6uN77fEQCJTTM8ORNO2C%2FlVR0o3HcftyxQeMGK02hPOPM%2FVrHovYrijrUb5p8JTOMOnH48oGOqUB0skeMd092Sh0ougV4wEkGco7I7LEzj%2F16v9g245gm6Gg%2FECvOGiTZOVq1QbyFl3SaWvzmg4lYVGDo9VhtpGhCHrAcTSgcLJCNkwi8lC%2BKrUnqumOsY5a%2B9DfQ1pznFKGMETxU4nPVAVZlGqErVSBjywxpte3XyUgM9L9kCFCJU0Gpk2%2BVCpjnJ9S0zkGY3ZTQ8LC92JvLUyCbZ3jVuaxQtB97PUe&X-Amz-Signature=4d14e09335c72ee447355008af3ddbbd0e74cdf70389042b5634bd005cccc7dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDSOXWXZ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIG7QLBl5yUqcmqjO0I%2FNix1AVwyryzZ%2FMH5eU%2BMqqQvNAiALTsif%2BbFAYQ9dqk01U1FSPMo%2Bf5XUl1nIEgfolrGMkyr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMhsPcQujw%2FcSySLjzKtwDAt4WYhUmETuI%2FS8k5oAm0Mxy4wrpcf6t%2F3hc0vJOsbvGt0WtLgPIHwgo1BjIMd6cXMg5ZXQatoqy3KRS8KVMc4pLA5O3Cz9%2FPDvFbBx6zercVokmbWGsx%2Fv2dCFmdmS%2B2Fki5mFcBtQ4RdhrP1IY0K7sdpIHc67iNXvYzg7bGzpt%2BAN5aOGuWThNa%2F7abrbuSjmqNSRv2rXeuf75U4V%2B0PyY7Bf3PVMzzXFOG8Gz0HPYcwDNRnRQ8VajztjpKqJFaSHMr6ee2SIS6qll7%2FyOr94UM714cN0fJbXbFhINpebktO89YQ9gX%2BuHajUzaf38c%2Fpohqx9wYh5ltuHoeZLH5mEmeKw19qLXuzsKxRaDtfi%2BrTaotC6vl2vzxeutRaGwVQiadOJ5UGjTqcTdF6IVpivpgfx2OCtbe54h3F2VWX8m2s%2BgHUzAbmpUJoE%2FPUvMv9RZTEFdzbbvkQE5wCP6ajnMlHQIFgUc7AQnTD%2B0gZzp8oSTANJ%2FNZKAgA4INbLpGo58PujVdrRLRwKnLbRW50S7v2x9TixmkAdf9gNQUNUvETeI7%2FObMvM2iNxgr1ZGqtqC7TngPnYfpi1tgMwxOuaP2QWSEjSIEBkA15YlDqllZ4JoX4qtNKfxcgwyL%2FjygY6pgE%2FQhUGZccSRwxatvyPssFMq0aQ23tS8vIK1S29dHtvWbWg%2FMDLGwu5Ln2f4Jw1n6I2IS3g6nN9qwieKTxkHDIh3ZHK%2BeuhnQl50W9FuW90Uqtw%2Fziuqd%2B%2F%2F3ChXuG2skn998fkzqr34xHoE2D3W6D%2BJ8zuyWjn%2B4x3ml1Is61kGDnmy%2FNv6ec%2B4dbA4A0Gtw90cDtInIwzD%2FvUipWMveI2Mf8oxa6L&X-Amz-Signature=3d61fa11f6bca9b37898457987658225bcf9210b4d6a1e2514620d5ab1537a48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDSOXWXZ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIG7QLBl5yUqcmqjO0I%2FNix1AVwyryzZ%2FMH5eU%2BMqqQvNAiALTsif%2BbFAYQ9dqk01U1FSPMo%2Bf5XUl1nIEgfolrGMkyr%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMhsPcQujw%2FcSySLjzKtwDAt4WYhUmETuI%2FS8k5oAm0Mxy4wrpcf6t%2F3hc0vJOsbvGt0WtLgPIHwgo1BjIMd6cXMg5ZXQatoqy3KRS8KVMc4pLA5O3Cz9%2FPDvFbBx6zercVokmbWGsx%2Fv2dCFmdmS%2B2Fki5mFcBtQ4RdhrP1IY0K7sdpIHc67iNXvYzg7bGzpt%2BAN5aOGuWThNa%2F7abrbuSjmqNSRv2rXeuf75U4V%2B0PyY7Bf3PVMzzXFOG8Gz0HPYcwDNRnRQ8VajztjpKqJFaSHMr6ee2SIS6qll7%2FyOr94UM714cN0fJbXbFhINpebktO89YQ9gX%2BuHajUzaf38c%2Fpohqx9wYh5ltuHoeZLH5mEmeKw19qLXuzsKxRaDtfi%2BrTaotC6vl2vzxeutRaGwVQiadOJ5UGjTqcTdF6IVpivpgfx2OCtbe54h3F2VWX8m2s%2BgHUzAbmpUJoE%2FPUvMv9RZTEFdzbbvkQE5wCP6ajnMlHQIFgUc7AQnTD%2B0gZzp8oSTANJ%2FNZKAgA4INbLpGo58PujVdrRLRwKnLbRW50S7v2x9TixmkAdf9gNQUNUvETeI7%2FObMvM2iNxgr1ZGqtqC7TngPnYfpi1tgMwxOuaP2QWSEjSIEBkA15YlDqllZ4JoX4qtNKfxcgwyL%2FjygY6pgE%2FQhUGZccSRwxatvyPssFMq0aQ23tS8vIK1S29dHtvWbWg%2FMDLGwu5Ln2f4Jw1n6I2IS3g6nN9qwieKTxkHDIh3ZHK%2BeuhnQl50W9FuW90Uqtw%2Fziuqd%2B%2F%2F3ChXuG2skn998fkzqr34xHoE2D3W6D%2BJ8zuyWjn%2B4x3ml1Is61kGDnmy%2FNv6ec%2B4dbA4A0Gtw90cDtInIwzD%2FvUipWMveI2Mf8oxa6L&X-Amz-Signature=3d61fa11f6bca9b37898457987658225bcf9210b4d6a1e2514620d5ab1537a48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTYKNJXR%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T100122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJGMEQCIBFzrEVpRVeUgv8igE8V%2B8X0tqoYXyEpfA5btayk8FikAiAn1juTpmxpsUqPXd%2FgUdKLCdNKSoyguAKhSJ9wYt4ouCr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMPved7hj6LsXY6cXRKtwDJ%2Beqd%2Ffy08rWwiY4FZgY1rp2rsFbf4FxlVSVrXp8SbNC1fIY%2FymPmyQ7QHpziTQuvSn9spi8dZf13UHO4kVVehPFk3AE%2BoRwUk3w%2BsCNNk%2FZSjVmH5d%2FaHE10CKHjcVQsyudxJ5w4FhAfEqHrITw0Woh9PwYFBbFeg9LOqEYM%2BozFtqjqopB2wqDoBni9vXgoMbi8aSlo6PHI7LuH4qYfq%2F%2BS4zdEfDWfgdbzBDBb8S7zc9KBKmmrw2xjaj0aJuZTe%2BntL0lfvXr43cxm6p6emiUDhPt2vKESL2RCUJUwHax5ySx9wcGQDkYEQh5pux1VY9Iwh1VVNsxjRPCXXHOoKu4aB0TCBNRZI%2BxG5BHWZUtKergFZKkMnVvf5Jhdpd2GJ2jSYQOvxhsu7gy%2FRnURsgTcNA%2BLt95iIGmm9I37R3P4Q8iCKIxavpQ%2BhxMFylZCGxUkqtVlDDIiiq4zOmtvQB3mEjx8pDTS0192O%2BaqxP0RTCozosbD%2BbK8s4iKVXQnsf6nqdnqldHFX%2BGhaDko3cp5BlWkf0WkbEXG4w8slJgdJngd6nqL%2BFeWgYjCE%2BUs3TmuTRRYFRfh5uRkOn743Dwl6FPdsB6n2ZVoTGyIdsA%2FN3OiLbzsaObNO4ws8zjygY6pgEQgmiOoDXpxTQtwZvgYXAXVt3Azu8kOl%2B9hwFEZQ59GREsa%2Bt1S9oziekwTP5engRuAhPF2PxeN%2BsabcS5Op55CLTtP%2F1V%2F04aCnpEqWPX6V6XzGLkJtEk47U98KWtU5LB24KID%2FUkJm1q%2BkQJN85knLs3Fz8Ina0RSfkzjzEYIviYS6ZM49Hki75hLmvJnWd2KAidk9FvboY2ie%2BZVA5y94rw830W&X-Amz-Signature=5c045324dc383bcbcdd693a804ff3f26b42c57d07cf3dbb55dd6feb363ffc4e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

