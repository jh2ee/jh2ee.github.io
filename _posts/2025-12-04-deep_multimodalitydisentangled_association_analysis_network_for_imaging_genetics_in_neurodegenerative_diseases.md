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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSTE6Y5R%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCICQaDfY62RbQF79rbQVgkXXgmZwjW9PTJ3oPVyYWibE9AiEAgxmig7iE7Tet%2FxR2OQV2eAGcfDZRtUGgURdOpHtRLHgq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDPXYNj4kCEZ2%2Fi2MiCrcAxiSQteJpVuB14bgrNe4pA1bHw7l7LC4U%2F3ulwKj33Z%2FICW6IgOLbsztrdSLTJcbMUC2g1O8Ul2npJ91Rb7y5zASiD7pARBJKJN%2BzL4EcMl70yFxz%2BFlMoJDHNgQL%2FOk%2F658TnnVLy54B%2Bk2YLQeS%2BWHvYZbmvr7t4KAMB1Ap2ekFpY03UimoEgO7DMS%2B8XyXZ3Lxjm4JUIIhIkvu46YQPb5BTyvMEiI3ByfKfHHvm5IbDrKh5n1%2BkPzKCXf%2FDHMb62sGgMSDDKWU9inOPxQhGPMwaHVp4NijVUcpfhtsQ9r3M7IpLp7Mr5tfeZMdVMQ9TDYK4%2B3D4k7cUJXkxh95hLgT5Ari5TJgOynuaipHFtG6SDiv6FZ7eVRGB5NSfG8O1mWX5r%2FoJ5GQ%2Bu8e0adqrDpWS%2Bd%2FyBj7BLbqTiDBa4P47tRodRmF7EN%2Foy6YI6iYbsrcPN5XAR9F2APjDY8SG1rotPJ%2BP%2BhFuSAaz83Xkm5fx9KJEFe0bjX5E3D9np6hZxM6s5bGiuhiUc%2BiT0thfjoN2J%2FD3kxHziZc0B%2FGjFKlVG2r1PltZBk0D8p3FfQGrRTH0aAT37zSGPG%2BzZ9P%2B2b6%2ByXm8fOoGI1GlZpFGY0z5rVWcbmAbPrUPjzMOuH4M4GOqUBksy7TRk0pnfdiWr6p5bb2DObXhU6xCM8zw3nthpml1V7C6SSWQ8f5Y92o9YJP6cWoX%2BSav2B6M1loyB7QBvHAL6couuQieKrhfOwz7IQ928B3F4bRdkXSYWyRf65VVJLz17uNCJTw%2BC0Zj3kcR3IwUu94Pcuyxl%2FAOx9dowJcMiFM%2BwU1gCcc%2F7DLMXZmkw5vNrINyxx9SupduFp0EwIj2XWCSXq&X-Amz-Signature=8c94e70112249096ab636b18c9e2d326e832ad7acf7e925ee417237d6f1f6b38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSTE6Y5R%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCICQaDfY62RbQF79rbQVgkXXgmZwjW9PTJ3oPVyYWibE9AiEAgxmig7iE7Tet%2FxR2OQV2eAGcfDZRtUGgURdOpHtRLHgq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDPXYNj4kCEZ2%2Fi2MiCrcAxiSQteJpVuB14bgrNe4pA1bHw7l7LC4U%2F3ulwKj33Z%2FICW6IgOLbsztrdSLTJcbMUC2g1O8Ul2npJ91Rb7y5zASiD7pARBJKJN%2BzL4EcMl70yFxz%2BFlMoJDHNgQL%2FOk%2F658TnnVLy54B%2Bk2YLQeS%2BWHvYZbmvr7t4KAMB1Ap2ekFpY03UimoEgO7DMS%2B8XyXZ3Lxjm4JUIIhIkvu46YQPb5BTyvMEiI3ByfKfHHvm5IbDrKh5n1%2BkPzKCXf%2FDHMb62sGgMSDDKWU9inOPxQhGPMwaHVp4NijVUcpfhtsQ9r3M7IpLp7Mr5tfeZMdVMQ9TDYK4%2B3D4k7cUJXkxh95hLgT5Ari5TJgOynuaipHFtG6SDiv6FZ7eVRGB5NSfG8O1mWX5r%2FoJ5GQ%2Bu8e0adqrDpWS%2Bd%2FyBj7BLbqTiDBa4P47tRodRmF7EN%2Foy6YI6iYbsrcPN5XAR9F2APjDY8SG1rotPJ%2BP%2BhFuSAaz83Xkm5fx9KJEFe0bjX5E3D9np6hZxM6s5bGiuhiUc%2BiT0thfjoN2J%2FD3kxHziZc0B%2FGjFKlVG2r1PltZBk0D8p3FfQGrRTH0aAT37zSGPG%2BzZ9P%2B2b6%2ByXm8fOoGI1GlZpFGY0z5rVWcbmAbPrUPjzMOuH4M4GOqUBksy7TRk0pnfdiWr6p5bb2DObXhU6xCM8zw3nthpml1V7C6SSWQ8f5Y92o9YJP6cWoX%2BSav2B6M1loyB7QBvHAL6couuQieKrhfOwz7IQ928B3F4bRdkXSYWyRf65VVJLz17uNCJTw%2BC0Zj3kcR3IwUu94Pcuyxl%2FAOx9dowJcMiFM%2BwU1gCcc%2F7DLMXZmkw5vNrINyxx9SupduFp0EwIj2XWCSXq&X-Amz-Signature=8c94e70112249096ab636b18c9e2d326e832ad7acf7e925ee417237d6f1f6b38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AETMRZC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQDOiKdfKX438YMFgdDflA%2B78lXKVZXdG4JeKpBe%2Fth9QQIgYT7D7jId%2BkCErkNzujcIhpGGL883RCwZpvBo3hIGKL8q%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDErXzbmOB1Y4zLyh3yrcA8safXD11Yc2HqRvpBePApeXAEGF34quroPUGVLcS2TLWWUtRi5l7lFdeq5y%2FjK00ZJLOk%2FbTG8a9EB%2FHk1oRvGMHS0ehMJnRkFObiUNvCUqjAl%2BKXyTGuToQSMaWzSeqaV%2FuT8LG4eYLcwrGwibjpfonLpA7%2B%2FPX0sFnZDf4qTmXtAZE31Qsv336%2BL1NRXeUxolhdX7OXgq4XnXXGiiArpeAn7iYp9QuffIJSNZGneqg2xaK1ZOh%2BaifRk%2Bm3KPVWj3F%2B3WrW1mAfZyN30G3mvdbKLHqfEtnWvJ7Wm%2BcDuHAOKDVAeCEloLUdS9aK%2BsQssqKDjsys691ubMpNY0Ttbj%2B4OTeG56yus88VdY1OuyNdqFeg9KCpjKXXJXWZ7lfDI9cembwFetoC3nTeg1dSyTr3VQ5EK9mxa8iMwp2nOUFTtEMSpbOJzH0%2FqZrXHGnnOORzrujcK9uw6Q%2BhMEe5sLi48Lsq%2BB1XRDwcQJudALsIuNECrwQEGxq5cuw8X9367G79iIyE0wsA1bAwnfBIkVeeICLq4yO4B2v4E0tfNOc1aJUf%2FqGh0tBb%2BH%2BxvuFcIlkTEXJtx1nH7m8OS1VH%2BA1Fh2s1XYuk38GFeroJPX4CdNZcCzWYc5Vo1XMIKI4M4GOqUB3hlwbGz28ZdaZAMccTyqURq9%2Bnzat%2BkTPoa%2Fjn082dQaXRJUpti%2FYOhL%2BjaycMN44MGwowW9Ky9wpzJvMCk5H7CheUsKn4dr1iD0XvQewwwBhFeBZfJri1u4rU6QFnIdFCL6RFkWVhhRljdBfz744B19zYuBQen9Xl3gL5eKsLPhifM%2FJ%2B5c90%2BV0g4VFkt8v8i%2F7TDJW8kep71%2BZePbp257gESE&X-Amz-Signature=de4791cd1c9495be8edcf9100fb4c4661c781a0516eef4781ac33b70558e19e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZLDKNIH%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQDacqJca5BUveH%2B7o6LQpa6O4uv9MnpeyzkustJvxqTmAIgI8o%2B9KqebOyZ4CAXJK66gELDAhRTiF2eZLn8m4Xszvoq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDN%2BQyr6ON9kHcGyDJCrcA%2B2ru7y2cDrzBBCzYQH4BqSBhIGMLAQyU1DjEjLj8f2u7vZZC5V8Capgp%2FdB8vkW5S2sRV3LkBUMJX%2BUHY1mgVSDBQ4tB89Hk2kjPir2b7AadUadjUKapgNuCKlhliYjaP2QwE20Gfub3%2BfRWv9tmbuC43JPG1GhaWI4ab9jl8J5nAVPKsT3M2N8LDf6%2FEvwfIzdSlQzn%2FF3R0gXXlIOxVLww0IHSefbMlq7G335Yinq%2Bkd8rJBczteUtrFG4TrPbXtj1qs2aodd%2BNnf2LzQKdYzWlTrffKRh3QHSbDWg26Ri19ELvFxQihfn1u6tq07BJ0iwd5HS4vdfTttGCAApAFhp2MLgj2icINqPKPnybnqRMQHq1IOfbm3vGtAtSSaUs9Jbvri6VQLZb0pXdvqpZmuZXmCrnlrQFVZTJpZokb514NCh2uyIPIK1%2BkaTEbusjWL6i7iWq7OzCgEK%2FWzf%2BFLnkrT%2FeG0Mg2KfVdI2OFoT3ym1jxJ3D59ciPfSZklHVGFD2929w8%2FaGdRPwqNpGDkwLQ3v0fnNfXV3hkAZ%2FK%2BcJdlakxabTRd1lg%2FQDctVcUZBNK0oqWN4UYnC75GlJbhtvIqYkNj7FoHEq8jpT8jxuDCUnSEyza9p7G9MNCH4M4GOqUBWHJ%2FJUg2XGUtfeVwLhC8VYQunalrl52lhHTr6aI3ZODDoVdlXnE%2BgGHuKjtzii0MBIkKACxKNrbvkrfdjkUfehdqPf90a2GD0EGKmqFGX2zk7kWnQ%2BoSPnl8fNmaVSivUZR9ueH9P2SjKSIV1DVX6Nlkg4E7hsnx5AaYqF3eFhs6%2BIOjus7SBwh3Dy49pF7l3JSJPlf%2BLhXcxYS6vruu6RiKVZff&X-Amz-Signature=0056969988f7234aec082e3270ffcec6510b2e828daeb8b3a2c4241d2569f695&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZLDKNIH%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQDacqJca5BUveH%2B7o6LQpa6O4uv9MnpeyzkustJvxqTmAIgI8o%2B9KqebOyZ4CAXJK66gELDAhRTiF2eZLn8m4Xszvoq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDN%2BQyr6ON9kHcGyDJCrcA%2B2ru7y2cDrzBBCzYQH4BqSBhIGMLAQyU1DjEjLj8f2u7vZZC5V8Capgp%2FdB8vkW5S2sRV3LkBUMJX%2BUHY1mgVSDBQ4tB89Hk2kjPir2b7AadUadjUKapgNuCKlhliYjaP2QwE20Gfub3%2BfRWv9tmbuC43JPG1GhaWI4ab9jl8J5nAVPKsT3M2N8LDf6%2FEvwfIzdSlQzn%2FF3R0gXXlIOxVLww0IHSefbMlq7G335Yinq%2Bkd8rJBczteUtrFG4TrPbXtj1qs2aodd%2BNnf2LzQKdYzWlTrffKRh3QHSbDWg26Ri19ELvFxQihfn1u6tq07BJ0iwd5HS4vdfTttGCAApAFhp2MLgj2icINqPKPnybnqRMQHq1IOfbm3vGtAtSSaUs9Jbvri6VQLZb0pXdvqpZmuZXmCrnlrQFVZTJpZokb514NCh2uyIPIK1%2BkaTEbusjWL6i7iWq7OzCgEK%2FWzf%2BFLnkrT%2FeG0Mg2KfVdI2OFoT3ym1jxJ3D59ciPfSZklHVGFD2929w8%2FaGdRPwqNpGDkwLQ3v0fnNfXV3hkAZ%2FK%2BcJdlakxabTRd1lg%2FQDctVcUZBNK0oqWN4UYnC75GlJbhtvIqYkNj7FoHEq8jpT8jxuDCUnSEyza9p7G9MNCH4M4GOqUBWHJ%2FJUg2XGUtfeVwLhC8VYQunalrl52lhHTr6aI3ZODDoVdlXnE%2BgGHuKjtzii0MBIkKACxKNrbvkrfdjkUfehdqPf90a2GD0EGKmqFGX2zk7kWnQ%2BoSPnl8fNmaVSivUZR9ueH9P2SjKSIV1DVX6Nlkg4E7hsnx5AaYqF3eFhs6%2BIOjus7SBwh3Dy49pF7l3JSJPlf%2BLhXcxYS6vruu6RiKVZff&X-Amz-Signature=835de47cff0cab4bdcbd86367b934e459903e76726ac3eec0ccf8e0696a6757b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MZCLZRR%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIHNwMcMT20NbffBONdfiWlT99aqtjLIX2AnMfGg8l6SWAiEAkKPyfAdzk36yF2CYidFwnJNz%2F43bOCDc2OTIhTsyeyIq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDMvKbw9BROox%2FNyqDircA%2BfKWAOHG4TbVX7wcE944wkJPfl7hhReYFbGkByOEQa6KvOl%2F13LpZAJRuOO5qPOpZE6yZXmIJzWstR1YbBS7q%2B1551m%2BGE7D9UQc22imVsROotO5ctktd9hl9GZkSdwYKkEU9dKPN15Feacaz3ivjsk2jz7yEU%2Bgt3GvWbmM%2Faai4eIL%2BGdJ6%2BDrjt9uQmtfTPU4165k%2Fhv5jaJqUO2vJvnWw%2BVq85321tRnDWIiFfyAuKRQ1YviK5mwbxUy%2B%2F6z135earYvuuvSzbGCiE4ckxAH4J7HPRQ2FQafWs7x8Vm%2Fe1B1oFi4%2FUVirI4a9U57gojA8w2cD7tuEJAreDO1LQrAb1KGXBoxXmpriOcBtWC5n7dh2b0sBUc1GiclP75bTZUCCeEwCPBVREzUS%2FHVLdlm6qH40OxCQO0qvvky64ZRZLHmbUn9YSNWfBFqP2ptv8GRbHDdZUDGfSa2N4vFzNAIqmFX%2FmFP6rncK0fNLor3sGmlYphaAVdubfdAPEMhwxN6L%2FnaE9xX7oPEVZWFn0Y4FVx30TyPA2wo2ID1I%2F4FsWbe%2FswPBg1qwQrqBRD5cwqs2DV2%2Fx2JiYkJ9C6xaIS3LzpktixaN38VL%2FVpOq3%2FTM8G1V24UOogTqMMMiI4M4GOqUBAk9LKrfA5d%2FigLFlhVlnEHVGhwu2t6%2B9MNXDKdX%2FjvXZSKNk1pVW75U2EY5%2BILmAXwvKFgZ2k2HgWDt0ZFnZxw54Kha3C4ZAsFZ16SyvIwOxPkvd5eMi9pKZ6YFmerZ3AfygOc0Jo6f%2BK4njzwQPnauH1jpTRu7MRD2UcgG4QtK%2F0ncFO5NHzeqyhFSDYXpo%2BmIuvsorD%2BvGhn6yZT7UqFL6afU7&X-Amz-Signature=e734988ce3040232984675770ba8272f8e1df3f1e5151f056b0f0f5cc432e3c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCPHGLSS%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIC4WZUBMfbIsAplTAH3jb3QiUfgZwpiQDkG2uTDTpWx%2FAiAU9o21FO81BIecB6%2FzwMV45W%2BTIigL85s8iQioDwkD7Cr%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMysJ4BtilhA4c0VmcKtwDRIrb5dkcA9jrQsNV0HeYY8osVDv4pjnjjnV%2FScYc3kDn8DF2ZaDsmuib%2FgviDRUsC4XXLgkrKm%2F%2BbUx2uJn9F4eCRtTZ%2FdSZur3E0GE6d2gJXzDcC2XW%2FVhvkdYrghma1wAjGS9NsA9nMXze1%2FJiLID%2FPgyibB1krCaciItCIKJhPQNOrjpgkYZcjiE9NpQctXRLazI1xVI4eb9zzKdKgRNmh8QJ6%2BZDQgNp45ueil5gJamJFq5%2B6jCKs%2B350InIXqr2q1PyHQ0UwP8635NtQyGPKywxnV%2F0q0rQgZwvGl7dXO2mOvNgzeVHCa8qI0TNPOXcFIEgpvl%2Fr6MGhLQwsoEnTV8Y1mmQizhx663uG24XNyjlccuQVU06gMKRNdjipfOe1KdopWpIZESrWWv1mDXGsNQ2wusNbzwDuz6Iudz3BF8pDQw3PDCPWVaw%2Bl1l3Pemg970UmDRs6jW%2B3w78DjjyRxmel0VsxhZWPxv0PitqOHLc0QcI8xicfJG8Y3%2F5JyOND6xOgNQcHjHR2Fs7piWUuOQSS5dlhmITcuEu8gMU6PtD3zCk2iqnQGQfNhqWgpdbpmcr%2ByE6e6YZm36Oq8gEpDfBGkDa9IDFnis9zYksyR29RFpJVORnMUwhIfgzgY6pgEpD6u3V2lQsqPBm4sqAmN3zYl5uMGd2NgNMtzNYwQjZPrXugawmgJhEkI4HCZRVxOtpUGoOxTsmGFaaxqV%2F5Zr%2BwZ%2B7aMmskCOkGYYUaFjgSOccuuskyPVSq8Lms1Y99D0196b%2B3BlXRkI18k%2BSXJ4BORZjbTCrmJlvpMq4FYid03WR3Md7c2VoQZzVGxltFsRE83v7nRItxvlTejvo3ynJJMRDzq9&X-Amz-Signature=9c493e5db3e95d6b64975ae148931ed4c91345346f30cf6be4307e812d3295dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662K36ANTH%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQDs6pwCPbAopbO622PTe4XkSaqg0Q3521G4xyObAt8v0gIgYzfqgnFGXE9hzlPAzNjM6Kt9zPEB8AUp2GRV26NokLAq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDEVxh7AGnHFwxinTQircA6KoDyXyhbAECPuHYlskfclxa4ujSS87x1%2FvU19Nf%2FbC7vuwOd%2F9XBw37V0EeSKD0xA5D0WHML%2F3eoQOuMxXvhY2BUYHQN34RF6ibFYHtHjSZNzBntERb5ZCkJ8t1npEXsIjiSojEHRpVCFbxhoYpvpmuRFnMwk6MXYzvmPxhjXz5CwLmWoiAVRTdPu4c3boqP6QbrwMSVlUUDZFFUopG7EVgOMT%2BeLF5x86s%2BBj7zsWFvwmjeSvhHKhffb4kMJYFhcw%2BmZEafKN4T8N%2BqMb7OTbIb9%2FDWrH1t%2F2ZAs%2Fze7hOHR7kITpPdHVeHPorsZHJTsn8JgTDXtb0hGjB2PVWP8Zcbl%2BLWfsE%2BvpDl08sQD5D0pf9SBsNG0pFwFfYW9G9ovJX14vujH5flzmFsGR7%2F0FbnJI9pgzisTwuhsWZBs6%2BLafu68X4wS2eRX8Lk2GxMRZoQ%2BpL1n84F09Oa2n%2BphDgUL3ptgUmV2pvT7K%2FKGI%2FOkxshpXxRLwVWOi0stAMveAXEtWeOZT2HiuYT6dLG%2BQaEnWeSEw4TLV6ZP%2F%2FJbJOl4iPk%2FW2tNPWZJI0sq40SJH%2F7MY9uQfwZBoe2vDt2z8PuU8%2B7PoaI9VHHsexlrG7QQuXxQfOVzkSk6WMMqF4M4GOqUBhrFdH2njEOXuLgcxJyZ1LhD%2Fye9rk3%2FoET%2B6%2FEUPzrIhqlf35FhCzhC5sVQg5noucioGSctbadFR155PUVlagEb2IFmRTaISVtJbOWRSD4%2BI2m%2FGkYGS9KUj1buOubDEf7ygGlE6Y5XYk30YdbQ6429EPRmAreU9uGig2Vw3SpC5hBSQogix5mfMHYM%2FAHcOMJijLkUVxHddimpeEE8mAUnAGi73&X-Amz-Signature=205f4c1b5ca9a768f4012ffe7a3d07d8d04720a8e11a1f5685ed43cef287e541&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULY6RB7C%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQDqte3ffvfacjafeT2%2F23ZCAg8NgqHk944Nn40rMnJXaAIgAdxAH8PH7ZW3RJvtZ4YK%2BR9FAY1pbLj5WLdaP62a5Egq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDPMfBSOZB%2FN2LrV0WSrcA2oVwBuM9cgY2fKiQOXKWPgHxMqc8xmLH5XhJNKmWTYe6sMC9VDRX38Q8J0niKb7hddTt521oAGKedmwTjxsz4lIzldFdSslei8WapBTi7OuDsPuJQgMzHkSPG%2Flk0XHeZPNHxfpiCLVqdSl2mX4GNnB2xBcDC%2FIol%2BnFChnDWNaUDBUtN0rHsTG3J71W2mXuZA9BfbBmgr3GDHV5Oe%2F4SEfUVfsJNJ7hcDu0Z0zkN0DlB%2BJB9pqwylD52SH2wv%2BzeyXtmQKAAysWlF3JxXm7M%2F%2FH%2B2Kq6torGtLu2B%2BJem6HaKPI8RmCi38mvYvXMEB9IrEpWDRB3M6RECRE5YJkDixdviJskPSP1BJbk2wyvRtFcbdt9w6BGZnhoH%2BXyeYSWet27yNS6xtS1aqcgaJ4MRKyWAl2NLQFjjexa54DcW9r6AUKDlgQ0%2F%2FEpFtaZHpzA81hWFhH5V3eQN2xX4RjFTauyWmHwH1doveJ5UDol5snvv%2Bp0D%2Fkn5mOffHGQJ1aQRRj6YW%2BuWN5lNEASpZnDSSk0sMKG8JmCwKWSM2G91vnfTrcfBifF7vG0O6X549cSYMBFt%2FrTUM2BR8PeD1bPb47BtdrvlO8TN34EHuD9yPRbOhoKZA%2BbhKzhAWML6G4M4GOqUBv4x6TsyDLk%2BaTw6H7PXUYC%2BDAQBDLpW2BCkmBzO2ZMOm3O0SjE%2BdnhWZLJ03uOw6QFEZdm1hskbUVUCV2pgSCWjAqX6TmoZz0igUOMoviWxbW5zI6b2mRDsmuEMgCuNEQ41sZcNkj2z48I0RoN0kMteYEXEan3fGhAfGLyFwtceS%2BzfZpgJN9rMmGB%2B8z3fQp5UqjELUjsxA6RgLqaV8SEClpwc3&X-Amz-Signature=efb10064044755cf208efab0dec795228fbbd8ee2de59f2579557048b09a5f94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULY6RB7C%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQDqte3ffvfacjafeT2%2F23ZCAg8NgqHk944Nn40rMnJXaAIgAdxAH8PH7ZW3RJvtZ4YK%2BR9FAY1pbLj5WLdaP62a5Egq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDPMfBSOZB%2FN2LrV0WSrcA2oVwBuM9cgY2fKiQOXKWPgHxMqc8xmLH5XhJNKmWTYe6sMC9VDRX38Q8J0niKb7hddTt521oAGKedmwTjxsz4lIzldFdSslei8WapBTi7OuDsPuJQgMzHkSPG%2Flk0XHeZPNHxfpiCLVqdSl2mX4GNnB2xBcDC%2FIol%2BnFChnDWNaUDBUtN0rHsTG3J71W2mXuZA9BfbBmgr3GDHV5Oe%2F4SEfUVfsJNJ7hcDu0Z0zkN0DlB%2BJB9pqwylD52SH2wv%2BzeyXtmQKAAysWlF3JxXm7M%2F%2FH%2B2Kq6torGtLu2B%2BJem6HaKPI8RmCi38mvYvXMEB9IrEpWDRB3M6RECRE5YJkDixdviJskPSP1BJbk2wyvRtFcbdt9w6BGZnhoH%2BXyeYSWet27yNS6xtS1aqcgaJ4MRKyWAl2NLQFjjexa54DcW9r6AUKDlgQ0%2F%2FEpFtaZHpzA81hWFhH5V3eQN2xX4RjFTauyWmHwH1doveJ5UDol5snvv%2Bp0D%2Fkn5mOffHGQJ1aQRRj6YW%2BuWN5lNEASpZnDSSk0sMKG8JmCwKWSM2G91vnfTrcfBifF7vG0O6X549cSYMBFt%2FrTUM2BR8PeD1bPb47BtdrvlO8TN34EHuD9yPRbOhoKZA%2BbhKzhAWML6G4M4GOqUBv4x6TsyDLk%2BaTw6H7PXUYC%2BDAQBDLpW2BCkmBzO2ZMOm3O0SjE%2BdnhWZLJ03uOw6QFEZdm1hskbUVUCV2pgSCWjAqX6TmoZz0igUOMoviWxbW5zI6b2mRDsmuEMgCuNEQ41sZcNkj2z48I0RoN0kMteYEXEan3fGhAfGLyFwtceS%2BzfZpgJN9rMmGB%2B8z3fQp5UqjELUjsxA6RgLqaV8SEClpwc3&X-Amz-Signature=d7fcd7785fc4f2362788c20ebf75e7ad39b9a9b90e1f3e1abcffe4888816835b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUNI5ZZZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDdkC7BtppFPeIt3jazKzAQUzl3wXb4Foi076U1AY8Q5gIhAM7ufmkm5yuoA%2FJwrr4XTnXv8UqCFLQGZ8ZnB1uyjAa%2FKv8DCB0QABoMNjM3NDIzMTgzODA1Igw6p1Gs3R8ePJGMJ2oq3APmvZFMkG3Clc5F72hwM6DxDPiCpXZN48dklN6J41RAnlb7Iu9rRaq2EY5JuzDWRPMgBO98ZZRpnHO4AKdEu1y4hmWfbk5LqRZOU8f2OCP5W8jG4M3pDe4raOQ4VpkSebPEfMy5a1Y0q3LrHO1kGEBe9WEufxyJu4dJwTOhxuPKOvZPKu02uiLcni0CAKWXZaMHykAsotSqfAIsou2HZJAvEraGXzz%2FgxmJgiDtp8mf6k5JdZVOLMWqfqe%2BQ39IHz0wt7SneC%2F5x0DwY%2BC3qqiT%2BXwSfqV7frHRWsxEK9getzM%2ByTWU5qoRDEChPYa1fnG5DIausrdUHdsUkIa%2FSp7%2FvwqySl2bcy7XQEBZ673J3r8qUy8zeDdAlpq0uv9D%2FFQOwfZNFJXcdLOfqMeYyqcmYQcx0YflWyEtxRBu76Gj76CZlFHoIJL5y9Akaz28RkX5%2BhYp59tLZVToEpZmMOeOhBbwEU3FxzFFsiI%2Fa6adL7RIwqRVQaW%2B87DH%2BwDAt6lTWyjjwodZ9Wk7S5p8uuPkhgDvY45Bt8U4kpBzoM%2FW3gvrdymJ1t4z2caAANggZI8VeLXmoqDHI48w35PHi0pIs5BRENDEEjsb2gt4eXTojr6L00OQoQLIrH7DfTDZheDOBjqkASTHlu%2FUY6g6taKAXhGtLBibOT91L2nS9eKJMLIlj3x0PVbYx4PhzIU6aLOvmgk2689WRk%2FlBsY8dLQ7PpTmcrgs5KDBD1AdBj8%2BcyG1432lEzpGqb%2BBcs1%2Bb2yZoN8KhIazzq5ckHQGaK8E3UQiJWZFmquptWOJXMOhdklsAU4zyXXpZeAveJah94BvMTqyYW2TXUsYAsnRUaA8gz6Us6mCz11l&X-Amz-Signature=c3297b6f69665e9365b60be93b05838bd45884e46963e3d336675310478b59ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TXMSMW7%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDD4dsjotURnJ8ZgtrAIyzqJp%2FctXQcHseZ1t1McV41qwIhAIH%2B7AsR757lnnClRRJSktsPv3x83JDu3ZVgL1ED6eWUKv8DCB0QABoMNjM3NDIzMTgzODA1IgxZIrFaIiV0YAjRHtMq3ANOgSCrJAGFvklhCVkeLqixpgaQ44ttM0gC1fiY9jHoVCYOJa3dWTEXx3dW%2BrAbtTH%2BkMRFdAo8fdb6XwWzbJj%2F80kmyDCUSy4e4fVCuGdkoPqtlKwaAFrFl9BaRxP5HuUSXssCTapKvcckqJu3V7dL%2BQwpQMWovg6iHff4g3jAR4UC2oRmGFfLiHzN82poP6dYZFln6FRpHl1ozE3qSsMQz7mSTWm3eRzs%2BobXjry6mbXPyRaKnK%2FsZjIWTAPuDvScSg4ZBKeHiQppAOz7qg4y7oVZ5nipQBaJiplcnFv%2FR7NwNrEMt49QBXyov5rEKQpJWCmKnUoDZ%2F3TWmeC8t8SKrLTHzm6Mp5hTM5U0nK2Ppj1rBiKFNsX4ncYI3FkNzJfdTqBwuppf%2FkczbjLM6S%2BWjVztqCPLXlUWKCwMipAxOYpEai1kYXlC7ySYH10SQVuEYu3nlmj98yz8gfADnqCwuv5GljLA%2B5WEqxBmXBm2xzC28fF3V4CQERaPiThw7WUSGhBYzz6JoovcZnF70tInBAW8fcTeMaZ%2FAkW%2BHGGD%2BPKVRDR%2FBSlJ%2BNZecfksRMJw%2FqHJj3YPNv9DtromNgrXzkgh5grnTyjD5dzpQK8%2Bjcj71JsCvvk2HPy4jC%2BhuDOBjqkAbz9g2NNV97yJs6rUaiog9m7qBUoOu6IuLDIHvmueFt3tmLSj9okJHTjTcHrYLt4PtYhMjHCrzot1oo%2FVec3PIKD9bLVjP2%2Bq8Drxu8Ud9TYunrjE1D95r7r8zpdkLLmNPTgGP8Hr3Ut0yq1TLI9oQWBbpesVBwJSSki63yhI6o1%2FMGiDY1As8sYRn0DiASsj%2FoBR%2B2jpiwfX5r3uRLUGqBP63lB&X-Amz-Signature=ba282182905237a7528a69feb45dcfbd8d7b9a6960e3c5ef37ba15eb6caab9cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TXMSMW7%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDD4dsjotURnJ8ZgtrAIyzqJp%2FctXQcHseZ1t1McV41qwIhAIH%2B7AsR757lnnClRRJSktsPv3x83JDu3ZVgL1ED6eWUKv8DCB0QABoMNjM3NDIzMTgzODA1IgxZIrFaIiV0YAjRHtMq3ANOgSCrJAGFvklhCVkeLqixpgaQ44ttM0gC1fiY9jHoVCYOJa3dWTEXx3dW%2BrAbtTH%2BkMRFdAo8fdb6XwWzbJj%2F80kmyDCUSy4e4fVCuGdkoPqtlKwaAFrFl9BaRxP5HuUSXssCTapKvcckqJu3V7dL%2BQwpQMWovg6iHff4g3jAR4UC2oRmGFfLiHzN82poP6dYZFln6FRpHl1ozE3qSsMQz7mSTWm3eRzs%2BobXjry6mbXPyRaKnK%2FsZjIWTAPuDvScSg4ZBKeHiQppAOz7qg4y7oVZ5nipQBaJiplcnFv%2FR7NwNrEMt49QBXyov5rEKQpJWCmKnUoDZ%2F3TWmeC8t8SKrLTHzm6Mp5hTM5U0nK2Ppj1rBiKFNsX4ncYI3FkNzJfdTqBwuppf%2FkczbjLM6S%2BWjVztqCPLXlUWKCwMipAxOYpEai1kYXlC7ySYH10SQVuEYu3nlmj98yz8gfADnqCwuv5GljLA%2B5WEqxBmXBm2xzC28fF3V4CQERaPiThw7WUSGhBYzz6JoovcZnF70tInBAW8fcTeMaZ%2FAkW%2BHGGD%2BPKVRDR%2FBSlJ%2BNZecfksRMJw%2FqHJj3YPNv9DtromNgrXzkgh5grnTyjD5dzpQK8%2Bjcj71JsCvvk2HPy4jC%2BhuDOBjqkAbz9g2NNV97yJs6rUaiog9m7qBUoOu6IuLDIHvmueFt3tmLSj9okJHTjTcHrYLt4PtYhMjHCrzot1oo%2FVec3PIKD9bLVjP2%2Bq8Drxu8Ud9TYunrjE1D95r7r8zpdkLLmNPTgGP8Hr3Ut0yq1TLI9oQWBbpesVBwJSSki63yhI6o1%2FMGiDY1As8sYRn0DiASsj%2FoBR%2B2jpiwfX5r3uRLUGqBP63lB&X-Amz-Signature=ba282182905237a7528a69feb45dcfbd8d7b9a6960e3c5ef37ba15eb6caab9cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LMOQ3DE%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T213451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQDJPok5ihmxA8%2FMwTw54DJQ74hMnqm0gGcngwlEzjlqCgIgNQ7dPxWXGyXcjCwX6s5ClDt07RkVPS499nnCa4gysAUq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDCwHF3dmXaW3cK8sSSrcA1hqEaN3K8yi5kVpKITvNabt37A5nhloWVgMUhvXjWc1y5PegSZ62Vrh4VZt03klnDev6W12nNA6jTrsMOhllxTt6fVglJEZgGrNX8RNokhzNe9j5RzZKZme2avmnD8qZJV8kvYXH6UkRLNex4Gng%2BgTQ2%2FXSCv62qjrW9nBjA1BoZjjh6vXcgtx85uFIhVWvjni3%2B9n0wGM3pXbgbZBd9U5USB4wPSvFvU6LfNmZYngHEfPDNnFrJ5hzszFcpH6G5ReKznt75lycSpRPWLZ8FYtNDy54F3efiz2qgCr3P9ptCtoI8wJTHKFXkA0haqj4N%2FqH15CfmGtMAueqfiWS9ygJE03EdYeRR3f4TNPSeMkhqmHb2CnkQ%2Bk0gQEblvc7GDmWW3IiKKnz5vdVa%2FjG1CPG%2BOdCBc1qVopxQT%2Btm%2Fe3cP2yyw3W5HeM8xz1j%2B%2BkgeXFkfsh6Rh6R99wVDrXdmmOdbun47dkzUwXD%2FM2xpTd%2BcbaL8iUBG8v76wpKBOjWzWAChENWXrDwP%2FT3N2%2FqSZMTscxZsalJlEQW3zTtPE5u3hbPxrPkQLzh0QwYzraYO67f6AF%2FDsxvhAc2YkQy2HjVgrayCNtKquLgKuZ9BGPAXNnApZ%2BrNsDoHnMOOF4M4GOqUBSlOuIdi%2F6C80Mfp425qiyxuHEqwb%2BvErBLG0SX1lZvoCSdpm%2FAt2ou5AoYL4inVn7pYAlx%2FbMejVZacps6wFZRPOPzTqnKd1utBX%2B4UBKmxFifI71d1xpk0HGvPyQI1Ukl7rfHt%2FAPkHBF1jaTtzuaEaC8ts0BAEzGiGvIpGifbcOHkzNqv%2FeaOF1IyAlmsSrYbDzOa%2FzA2WmJ3tVckp1WWnpgMT&X-Amz-Signature=df46615391062de2af6d19c261e1e088586c0814aa150f06fc932cd9029caf23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

