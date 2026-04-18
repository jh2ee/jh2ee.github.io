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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKGDVENT%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCICRZ0Nd4%2BEpjFOpHCD6vWg9Wd%2FMAb8ChM3yDmaMrGJWhAiAzrjpwxvIga0tUL1YijMVVdbqLiVuRoeB36JLYYSbVjiqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMDuVoK34jtXZheF8bKtwDASUDpUR60daX3CdAVz9ojhg3A1eohX%2FCRhYwHysgnILbmK49u7RkPA48M8qhH7g7c4ST0sbb%2B8CR2B3XI70La5Pz7GJ%2BMdpMrzc6Obe3h340hF2zmF4b%2Bo8ku%2BIHJaxWqik%2FHbZQD1yVFexnCyVoCUxab2cv6avLiSE735tTZMfl3V9mNFrb5%2BXQUPfit5cvQzGlCPyCh4U4jEXxmEVEKztZoISDx3%2FhHKgbktSvnYMRHuDS%2F28Rxx5x9XaDv%2BXNSGFqGSEF458wP6MffygIfGbr7PnRJPnPhHOhQxHFElaaFghnJgH6ydebufgyJ%2BhmmFKs5wN9t7o23HEaVh9BtQhBEB24zE5dNdqSaajrlsyYAj3MJrUrt6mBV4NJCkcgxuxfFMYiQLCdD9to7C2lpTk4eTM0E61Wssz4RQLZVk30ef5aSXnB6TdPaRundlHPsMlwhiwfShzlwo38P9EPspCW9FcifWYSEN7qIS1YWzYV0VtKgtzD%2BnDFUFdjOHmOECQk%2B6qmZLzy%2BpKiF7I8U%2BpPhcsK4K25IUn8RGHH68TrumzkrkJezK%2FKwdEFHGQNt2RJh0Fx5rUEARypqqQelAxwyxLQM7DYkJJm6yvbulEMcGJy0VFxAnDo3qMw5c2NzwY6pgG7W2kkychmdneAmyYh5R7V2FLpx9dVtIHmZiPOoh65PhK8c0526X2HWUV0aC0dFFhBqKthhnQlfL7%2FQ0ENKW23ONenKY2d%2BxCT2zKnliTqiZTPwIi8OG3WPYP5FSuDMvnT1WZYYWs77pjbe1pZ5wedlZpSNoVz2eeEWfWJUG6XhNv6y%2FaqFavrrswRoRtFuUwvhlVs7RZgOay%2FhIPkWH7jpaG%2FYpck&X-Amz-Signature=80d0423ddef9267c6928629bf50d2288c3c443fb519787a9dda8976905f3040f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKGDVENT%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCICRZ0Nd4%2BEpjFOpHCD6vWg9Wd%2FMAb8ChM3yDmaMrGJWhAiAzrjpwxvIga0tUL1YijMVVdbqLiVuRoeB36JLYYSbVjiqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMDuVoK34jtXZheF8bKtwDASUDpUR60daX3CdAVz9ojhg3A1eohX%2FCRhYwHysgnILbmK49u7RkPA48M8qhH7g7c4ST0sbb%2B8CR2B3XI70La5Pz7GJ%2BMdpMrzc6Obe3h340hF2zmF4b%2Bo8ku%2BIHJaxWqik%2FHbZQD1yVFexnCyVoCUxab2cv6avLiSE735tTZMfl3V9mNFrb5%2BXQUPfit5cvQzGlCPyCh4U4jEXxmEVEKztZoISDx3%2FhHKgbktSvnYMRHuDS%2F28Rxx5x9XaDv%2BXNSGFqGSEF458wP6MffygIfGbr7PnRJPnPhHOhQxHFElaaFghnJgH6ydebufgyJ%2BhmmFKs5wN9t7o23HEaVh9BtQhBEB24zE5dNdqSaajrlsyYAj3MJrUrt6mBV4NJCkcgxuxfFMYiQLCdD9to7C2lpTk4eTM0E61Wssz4RQLZVk30ef5aSXnB6TdPaRundlHPsMlwhiwfShzlwo38P9EPspCW9FcifWYSEN7qIS1YWzYV0VtKgtzD%2BnDFUFdjOHmOECQk%2B6qmZLzy%2BpKiF7I8U%2BpPhcsK4K25IUn8RGHH68TrumzkrkJezK%2FKwdEFHGQNt2RJh0Fx5rUEARypqqQelAxwyxLQM7DYkJJm6yvbulEMcGJy0VFxAnDo3qMw5c2NzwY6pgG7W2kkychmdneAmyYh5R7V2FLpx9dVtIHmZiPOoh65PhK8c0526X2HWUV0aC0dFFhBqKthhnQlfL7%2FQ0ENKW23ONenKY2d%2BxCT2zKnliTqiZTPwIi8OG3WPYP5FSuDMvnT1WZYYWs77pjbe1pZ5wedlZpSNoVz2eeEWfWJUG6XhNv6y%2FaqFavrrswRoRtFuUwvhlVs7RZgOay%2FhIPkWH7jpaG%2FYpck&X-Amz-Signature=80d0423ddef9267c6928629bf50d2288c3c443fb519787a9dda8976905f3040f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663L6ULQ6W%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIAQF6g41SeRsZpNX6b1Njxl81ljqcfzaIq3Jvd6tngefAiEA2YO158ACzTwdC8vRC3xEoisByrjedKyjwYZsTfBpIawqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG8DmwGmP6qFXgk9GSrcA3MdDgMSKlC1ypLmtIYWJd%2Fw2W8bAvltUOvU2jTjcbfZiYwRl06eHW16e914E0UhAodXPlYt%2ByE2cnC%2BqlKx0HIRQEvZNFS3GYpITv40yRDigmdtTghGzKrQtGwgdgtrUANpZdYReg9PLQN4gMoERi7Oo0uU7Yrjs%2FGkSCwDDxAEbjab%2BUtPczLiEE2RG2TNW%2BjYel3n6FrXD28twzCau7tiR7fDI4nphZdcvOwF%2BgFCLyddYoBQvms9VHEKILYPqzvpgoxZdZnmetfq%2FaQq%2F0JCUJMRmLFK2O3TZs3CLMbqwsArrxpeduFqmcvqVJpwdX2%2F53AyjTROoqbMR2Is9i9iCzWyT%2FXmlwXRJCXbLR3F7fjz5UCmpJy6fYLIPPX1OK%2BZ7cZKh91WoJLkwC8qaH7%2Faspdy%2FxZo0TqUc5iUHLX%2F0%2F7Ieq33vmgQPUrbim7HC05UK%2BNQWdareXdgk8IsvuxQP8o78DCUsG%2FLEDvhdUl4CYrNJ2r3OC8xoAD3Q8H3LDHEokuT746ys7aKkdf2WuRTvMd%2FaAL6tBOkZkxhHNah74VHyG6mkuRf8HMvD2ac3UbX58FO%2B8iEmlJf0WufMaHwSdJpxBKW2pnyocHb6CFaT1hTj5dWsz%2BumGUMObMjc8GOqUBunbAZ09EVlT3CEax%2BXfEkgpFOLPOADa%2B2expw7PGFSet4MG7ddsVjEdJhO%2B92%2F7ywhk9tMhMgVdTJhfGayc0FQAxw156ZntI%2F%2FxUVZk7Jw7UQv6HmmJ5oGBys2janNNNPueu3E34N96JRJNn2SuqiU%2B6iJKSa5Obhqzr1MIe2ytf74CidXb9wdCfx37ZKt9LbD0wvm%2FUW6m%2FDUL7k2ZcfHHsKH9A&X-Amz-Signature=9a1aca253658b8a7453a1f6df85d1b751ce7251c3c529bdb46696b9f4acf47e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDODNYZG%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIGs8bLmrU3oax8vQyNzNR5JIPo9M1DSVBNP8yi%2BACM0WAiEA5BEgmh4c1Bu6x%2BkTDu84rsJ16NL4Y6k%2FNYKaZ3BxzjwqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLIjKJC%2BRNMqrbvK4yrcA4G%2FGYZMbWgOcuQ9NNGC6TMiZv7CWrxEjLPA1oJB2dMsDj4oEoPqbVvMUv%2BjjQMVFOuqk7SgflhIZde1eNDvnYPDMgHJbOfDrYfC5ybAzXyQY461CFSW%2BJErvilGqB0bY7D3FTF0sOTpcP6kznbcFWmaX8rs5pkSY1GnUDET30IuQkUy5yE32Q6HDB%2BjNp1CuRw9FUKgDBS8s06SD8E%2F0qMf97xnqiqJTWZWXbw7aaq%2FYbut38CW5katak%2FB8lvWx7DBc%2ByUrG%2B%2BdyvXQgKlyBM%2Fx5%2FsXetes%2Fezy4hXZTBL5j0xi%2Fne6V5lQiZVIZJ%2BhwDZ0xeoxTzujMpQaw3qZ0G9DQBLNweUPXvxT0krMG73qyLwsX9CQaDAUASVjOFQKmGqMjwydAXD0khcYs8c6%2F8gq%2Bxv4PfiU%2B4xNpVUs0cjqPf8r5PlJr3ZqzVBCzK0mXFfIy2tldytTn13E0dX7vCn2Ok%2F3SGQVYyOP0r8D1jTwBeCluED10lbGtf8KImsYoPR5HWGC0pqvKgYhRj%2BK%2BjBqEUH4GI%2FerEVTxHHpNyzgS1sz234Q7EY%2FOG4MMdhI9szNARTDoNBxRX%2BrHTWDk%2FWe9VEy3q%2FScb5ZK2vKx6YU5zAErmkpciZVuaQMMTNjc8GOqUBE%2B0ERprLYvbeEt26%2Bx9MYNa4sgv3KpYcdF7NEHuMqEM12fM3SZ0UIJA%2Bq5bcmHbswBG6CIJp3ECVeIILaGpU2RKj9j68KEr865VEnrh6iIzYN4jBZDUbHOPcAOsnGx%2BMF9zlW%2BQEcS%2F8SkNpa8G%2BuFXvoJqbsPoeQAygN20EfrxIFlRQeJb%2BBgzZGSIu6u37aIhOE2igW9Rkto7BJ8R2OnQxWthE&X-Amz-Signature=51cfcacced3fa6b24f1f9efb40cfb93107176aab5fb41a76ee12fba1ff9d4f36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDODNYZG%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIGs8bLmrU3oax8vQyNzNR5JIPo9M1DSVBNP8yi%2BACM0WAiEA5BEgmh4c1Bu6x%2BkTDu84rsJ16NL4Y6k%2FNYKaZ3BxzjwqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLIjKJC%2BRNMqrbvK4yrcA4G%2FGYZMbWgOcuQ9NNGC6TMiZv7CWrxEjLPA1oJB2dMsDj4oEoPqbVvMUv%2BjjQMVFOuqk7SgflhIZde1eNDvnYPDMgHJbOfDrYfC5ybAzXyQY461CFSW%2BJErvilGqB0bY7D3FTF0sOTpcP6kznbcFWmaX8rs5pkSY1GnUDET30IuQkUy5yE32Q6HDB%2BjNp1CuRw9FUKgDBS8s06SD8E%2F0qMf97xnqiqJTWZWXbw7aaq%2FYbut38CW5katak%2FB8lvWx7DBc%2ByUrG%2B%2BdyvXQgKlyBM%2Fx5%2FsXetes%2Fezy4hXZTBL5j0xi%2Fne6V5lQiZVIZJ%2BhwDZ0xeoxTzujMpQaw3qZ0G9DQBLNweUPXvxT0krMG73qyLwsX9CQaDAUASVjOFQKmGqMjwydAXD0khcYs8c6%2F8gq%2Bxv4PfiU%2B4xNpVUs0cjqPf8r5PlJr3ZqzVBCzK0mXFfIy2tldytTn13E0dX7vCn2Ok%2F3SGQVYyOP0r8D1jTwBeCluED10lbGtf8KImsYoPR5HWGC0pqvKgYhRj%2BK%2BjBqEUH4GI%2FerEVTxHHpNyzgS1sz234Q7EY%2FOG4MMdhI9szNARTDoNBxRX%2BrHTWDk%2FWe9VEy3q%2FScb5ZK2vKx6YU5zAErmkpciZVuaQMMTNjc8GOqUBE%2B0ERprLYvbeEt26%2Bx9MYNa4sgv3KpYcdF7NEHuMqEM12fM3SZ0UIJA%2Bq5bcmHbswBG6CIJp3ECVeIILaGpU2RKj9j68KEr865VEnrh6iIzYN4jBZDUbHOPcAOsnGx%2BMF9zlW%2BQEcS%2F8SkNpa8G%2BuFXvoJqbsPoeQAygN20EfrxIFlRQeJb%2BBgzZGSIu6u37aIhOE2igW9Rkto7BJ8R2OnQxWthE&X-Amz-Signature=8ebd81864c023f3009049dacc1687bddec9de97ecb9cdc482a24dfea28b61d5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUDGY4S6%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIH7%2FZkV2r9C%2FvEsrGeZHLfD5yUHHVRDSshZ08twL5fnKAiEAnnpOupTa%2FZ%2FHYgOIHi%2FSUSOcgjSAvSopAoYNiTTtCS0qiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEm%2FsQsHqgRE4rdZZCrcAww4V455imk4VGBn%2BITYQVsrJ8xtcMRCNVSl8pvQ2aMiz1138uPsUICH1KL3kSrpCkQlAZKwSFg105elukxnOAaov1z0ele8NZlKSplnzmVGEAiGI4ltqasRiKsW5ORscw2jhyrkYK8PMdZcF9jk6vp6P%2FHC4EH6CAR%2FyKW2LFizmvCVqVClaoy9C2VBx2u9P2Q8QI%2B553bieM%2BuH%2FwGKO2iqPuvWkH8ADv6a7sw3PkNxZWvb9Gx1sUUS8g%2BGaQJyWu5l6h5mh9s5JaiG5ub9WD9i7E%2FyZlqMKU%2BKNBxjzjyic2a%2F7t1uplgVJf%2F9pdSekTvFqqhmKkxvNT9UbZio0HLYD2hN0MOXTu4%2F41NCP5coZ4bLoan%2FvzHW%2BIvsO57%2BdBSWeVr1GawXmwCW5XioGPKJ3BtfgUWjSvoWZEap%2B4%2FDfu2f3uuYx%2FsDLneB9I2GQuUPZiDopX4yb1brG9i%2B%2FmPx%2FtxmgDpoNVAOaAGDQt28Io4t2tsMsYc5xwk7VpOmBXGEKBf3DWxVsjZ44DjQS%2FSRe5VPoljWJSgY6Of6jiwFJC8lYKGMvsGBp9j%2Fd5G%2FHNArcmJagxGaJeYxPT2jDSTL9OiYtoCYC1zadfUYM6TgaZxHyoWQSnCDljWMNbNjc8GOqUBODGvzFDd%2B1Wyb1ps3WRA9OTgnxmLwCvv7CU0REaQiIymXX%2FRyFwZS0XZXyvtJ%2FF0VPJi8IqflY5ow0vAaiN61NHrZPrAzJW75wyAGGq3Kx6X8GVAoAABkfOYiTfW4y4qakz4A55ErQvAnGljEKO7PpqNrG2XSqu7T5QFSvvnN6d7EXeXRPIo%2B71y7ynY23dw0TAte%2B35LYSi7kAm4bJwp82xQAOQ&X-Amz-Signature=821c788e5ea7a9ad62e28dfef6f0e60cdbe8332902841edb0d6b6eb74a244f0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWJTCD3D%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIEO7TAMGHYn7Yvl%2FvnVQI3CZx4ZFdhS7%2Bl4j0r0W0Di3AiEA1QCYMSTC1ABsHOAoAjvWhzrk%2FVWKe0MrQZHUiXVIQNUqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFNxZB%2FSwo%2Blct5wnyrcA8KJuIP1U7oHjUpjh2iyg2arWaU%2BkBQsjADOdBGA1RN%2Fz%2BOsteyEsTZTJsd69mLJEDqHUnwRhHMzyfqkC26y%2B3bvuyJzEp%2Bd47bZVrOaf6LCqaYuq75S8FCzcTucpE6ZwaoKnxpuu3sGIlM6NfAnCwnhzuRCnyElJrvATzOURlk68JrZmj6hXPeOPthCrdLo4ymoyED9%2FBc3nQlHNOM2alB%2FEEm8%2FhKHo2ZIPqscVG7AxemmoTMcXPnfmxAfooMigquXKmTCwq%2FNbVCRnCh0D0H1rG5nYn%2BmoY9%2FOx5y5IVlSMOiigU%2BDKeLh7vAHwBj1WyRahujdsq%2FWjftfjLL3Y99lKGcwLEhlxEHRB3o8a6pqMXq118H89e0NnT7pNAtX7QlAQUjfghqlDN1ZW0c%2FwxGM72WKXAYMv4ERiCTcumlor5OQM71tubguoG7eUNUm42sIUrQh3sf%2FgGiFn5wq53lURu8x%2F%2BNMmG3GmXOrP2GId5kr1KDYvZgNxg0cYrPV7bXErFC9V117Snebuw93u2wHkZBvGD1gWO7qMFiYfdv3KBu7oxUMEZHwAqRrhCGkMVVQdAA7ZI14HAORuYUR48%2BfQnm0DMSmTU%2FMPpXlpSiG6PtUSDTUq3qlLdOMJfOjc8GOqUBdZ0C%2BIdllFOzSgZGesHuNVrNcqFWDBUqIuGdm74L6iqBT2aRJ2TQBZaU14CoWnLb4EwmzKczCM2eTrenQvQ2RB3QG5cSPn4%2BmEnO3uPXjbEls0QNiT23C93sZE21KiEdBQdBN8P6IvTbSfD8uiap504xTLiVC3hf1CXg1RYBq2EkD350uBWYQdgJPoAX4lCNW2iU%2BAokAB4RGHnVkOduQ37ziX6a&X-Amz-Signature=a7c84f7b51374a84d805ae7f0d48f8c889ec2beb9999053334b6d9ee5f3a43b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCX53KYI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCICMzXTFpb4048rFLDsKp3%2Fjp8KiT%2BtijmmG8VsptqioWAiAGOqI0AefcnvUzou%2F1Sl5teFGvB%2BIRQSlO9rLXRkIFMiqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvodVP8LE%2BP58TYGxKtwDVO1wIcACGSX9tMvDqis6gVb%2BuPVdyXexfBIL3t%2Fkr5jNdJXSnsATSd5YpELJTX7A2YejJ2Ni%2FFEsGj9ryCC0a%2BVu26sfjZexJPB602LiTROyXTEEmFxpQCfyu1uBMIjG6LeLjopCYSFJhRlB%2BcUbYOkjYZigOpe76GqxwDu56X8TxD4I3G73wC9PZ3V4KFPcfKsAJ4FNIopln7x4zpsrRfzhW1dCyxeulFTEFiBKZbSzjjWWctR6v8oKFoRXj6Ixsc9HUH%2Fy7GBp2ApiD8Prz4wTgbft3M%2FPnzhFGfBfjCf2fkYqZqWen3YZrn7oN5FyrSm3ZZppfcDpNxr5tKh4z81UubuGTch9y9mUzMy6MT%2BIxTCLzKvR6Zthw%2B3k5oMrIoBj%2FTjWS23qHe9qZRZ2S5TVfcj3xOoCGJ8KgaHWsBnBreQ8MKoDv2qNdGyEoxoZlFG0Bzl2XQ%2Bcglvwzy63MJ8xyEBlDCx5ejKAcsZs9naxnARh1bAMJA1WuIy9GAA48RgAIyQZqXjOPS27aZj6I1gQm%2BQyik7WmmarBhfcggdBppCC3aH%2BlF%2FaT3l7pSiJfixTs45CA2m6uFZKW9nt8KHSYeRdstcWUpmGY1nPaOksjYBxuKAyotGDIKMwsM6NzwY6pgFf9vmqe8yhLBoK6dXdcFh2Ctcz9wz2OLd%2FEqFspiSpblUe2R5%2FZ%2FXwLi9kpvjHHumOfwgQ%2BhYgHSdE9dD6oMdcp%2BFOXRkShB2gq4SwcxYKJIpQl9efELdJ79unPkNJW9UihM1X3zpPK40aU7bcrJpm%2FQGaj%2BILYt61AkFojyo43tG82jte4b9NJyFtucWU75j9qMaMN3r2ZbeWb%2BqVHC62y35PgU02&X-Amz-Signature=f88549036694413dbbdcc2e9bf01412b308beb4b538cc7187596b5186b672253&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NYDRI6C%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIFqc7AghyRVsIO60%2BimvUbXyuxiN8c9e%2Buau70NI38w3AiAgYXdZPOqJjV%2B9%2FNyut9xbtzPACDbzVmEBQFIAEBUltiqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVVVdXZXg%2BkKDnqWnKtwD96c5yRIIb0YP%2Bj7vVkLNcvkZQPoHVK9ipDK2QwWrksKuUpvPLjUrYMXFa08n%2FFQpbP%2Bm%2BEdo%2BQlYpbrEU8Tir966r9vVbQ6cbck1iQUI3Z4oOQ7cfbZGhPkm2%2FlSzYp%2BxSA1tZo%2B8UCAkDXb45WID5hTVzVba2PDlCjn0UW3IgOYb4L9LVa%2F1xqgJ0lwxpgTke0nAszhSAY8QlfaM5lMxQ6QoVMoTTU9iw9IDub1DZok21Z1wT6Hms4Io7YPUbvmkihmW9vghsIO3N7JXbbQM6VqD0hvfD8cxV26hzIhuETNDxXopfZdbHVcaNKTdse2DKBmSLZWhGaWlpQ0alpAQvxgD685Y2J093iTZIJ7t27VZaVJsKAa6kCr5fAUsZMKZ%2F3pit3yVOdXMc0O6FxjmpzdltqHbIr3J08rctBBKmCTQ3r4BZKH3WJPDWxPb2lopK92IYLGpp8yp3Iy70Rt9q9sWrjQeympgvpSIlOpk6mtLndxu4UGeTUOlGWumrSAMh9jWKE2K6kxq6e9zGNbI3mlIxpiDXkO%2BTNjUOzzI%2B6J3m0C4p%2B0yK5k72RK6CyvYUJCQq8CzsgUsLPpv4B0hNbOXFL44JpG8vKNHzBZPlSJMSwSRzPeijA6Q0Qw2c%2BNzwY6pgH9kmj22se0gBN0ylg78Q19Lz7pIE1mxKeTxStiaFN3u4aLoRYwDgKhnORsVN%2Bua8in%2FGachovJ9gdGw7HywTmMxbDcOjIBMon67kfxoXx0NzVlYVWiKoM%2BN4z8EGalQP2diNfo4AmY20FLOxVsftLeFeL%2F%2Fbi4gX9%2BfFWvHtSuPY3EQUAqLxnRM3L7aC10OELZg1veA7cMzcwaFrv5ONVxcMY2aRSz&X-Amz-Signature=0e2923930b111a3b119ed5a9de97761a4be10d3747c9dcd5c8e4c2d1da110b2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NYDRI6C%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIFqc7AghyRVsIO60%2BimvUbXyuxiN8c9e%2Buau70NI38w3AiAgYXdZPOqJjV%2B9%2FNyut9xbtzPACDbzVmEBQFIAEBUltiqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVVVdXZXg%2BkKDnqWnKtwD96c5yRIIb0YP%2Bj7vVkLNcvkZQPoHVK9ipDK2QwWrksKuUpvPLjUrYMXFa08n%2FFQpbP%2Bm%2BEdo%2BQlYpbrEU8Tir966r9vVbQ6cbck1iQUI3Z4oOQ7cfbZGhPkm2%2FlSzYp%2BxSA1tZo%2B8UCAkDXb45WID5hTVzVba2PDlCjn0UW3IgOYb4L9LVa%2F1xqgJ0lwxpgTke0nAszhSAY8QlfaM5lMxQ6QoVMoTTU9iw9IDub1DZok21Z1wT6Hms4Io7YPUbvmkihmW9vghsIO3N7JXbbQM6VqD0hvfD8cxV26hzIhuETNDxXopfZdbHVcaNKTdse2DKBmSLZWhGaWlpQ0alpAQvxgD685Y2J093iTZIJ7t27VZaVJsKAa6kCr5fAUsZMKZ%2F3pit3yVOdXMc0O6FxjmpzdltqHbIr3J08rctBBKmCTQ3r4BZKH3WJPDWxPb2lopK92IYLGpp8yp3Iy70Rt9q9sWrjQeympgvpSIlOpk6mtLndxu4UGeTUOlGWumrSAMh9jWKE2K6kxq6e9zGNbI3mlIxpiDXkO%2BTNjUOzzI%2B6J3m0C4p%2B0yK5k72RK6CyvYUJCQq8CzsgUsLPpv4B0hNbOXFL44JpG8vKNHzBZPlSJMSwSRzPeijA6Q0Qw2c%2BNzwY6pgH9kmj22se0gBN0ylg78Q19Lz7pIE1mxKeTxStiaFN3u4aLoRYwDgKhnORsVN%2Bua8in%2FGachovJ9gdGw7HywTmMxbDcOjIBMon67kfxoXx0NzVlYVWiKoM%2BN4z8EGalQP2diNfo4AmY20FLOxVsftLeFeL%2F%2Fbi4gX9%2BfFWvHtSuPY3EQUAqLxnRM3L7aC10OELZg1veA7cMzcwaFrv5ONVxcMY2aRSz&X-Amz-Signature=0b1d227611cea066d9e5184cc1791c603960c50bda7203908668ddae851faf13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ENNQURK%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQD31F3Dpv%2FmhhY%2BzKVIeoKYaaIS88633j0%2FjT6wIYkGnwIgBSTG8UK0rz3y4QmRyz8EF%2FemOoULaOQvbUf0J%2BORqE4qiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHNg7DXHRkXBaqBJ%2BSrcAz7kS43V584bKuUsJ8j7Hkqok%2B3wZQRZ164T2futQXd0%2FjnVQRjy1yzNd2O8QUW1KLhSLF4L3hLcxuEGpDG926%2Fl3I%2FRKX%2B5X2%2Fa%2BHK22ZZUaZl1tNInAIYosvpnjWbgsQiTS64IDbeWv38z%2FQy1B5keUATlCvKLJatxx7HJO3oeq15AxAkj7Xs6%2FF8JxbOgvsm9MNFGTntXKiTQKtLzrgaQlHLKi05h9k%2BdOMTb3MtD9Tjqkz9RlDS2%2FRI%2F8DVjU%2FmTp3q3cNQMjY7bzl0TM94YUP0Ll8MWeyzRvnjg03ise6CxqQHOuS7E9BlL3XeOTHax%2FjkJw2G%2BU1wBOAV627PgCTw3f1vy9h9K1kgNxJ1CQzxKsW6WxM2EInLhlu5VuVFoYvJOHXAskvSZsQw%2FxPEYtdhMzleQTtDvfb0%2BrX0m3DLE80Ogjcrq9ndKrdxzG9iGXxMLZqb8sieqrREZ6rJKBAI1yDU740QZgoo9D%2FoYSUpC%2BvJKoVV%2BbeaXievPQTwVqdddIso6VwbGHCm13QQdEOthmX9VtkQIhWDir9vbqznboxKmdAIDEqnTKbkrAzB2ef0T1GO9gatskPjjMwEYdvVHxK3wQIv8viXHb6%2BdmuAV6GPjpZnWYaHWMIDOjc8GOqUB%2FCLn4JYwWZPCMfUdt9SR7zQ28upDqXaZKZ00xdWz1pUKY1596suf6kpjLCti4fzxPJvlcEUNzfKnOwILXMxjtp7pL1FTRs8ChgPX%2FTdCP22%2BgL8eNbdHz%2FGdMvOabJa8iZr1%2F448mam9Gbqq0TWi9w1MD1XjcMMlG6SDm%2FEr31tr%2Bn7kVnSYr7CPZEKJrvAGsg465gvsosE7BsJPoSk8p6oxF94G&X-Amz-Signature=dea9bdf11235d34d5e7267ba4d054844354a92eca7b95e0bc8d4161ae3f1fbc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WTQFGAW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCICfK6YdYgHv0QJJU%2FoWNPTCYLTrFwJY3Wlt1jxPl0VKJAiEA3ROwL%2BO6jSvIkgik3jC4a69WrMqF9fFFIhXQA0Wp3%2BEqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNtgJ4qNA9WLvbg2TCrcA%2FENt%2BvZ11SHTCePA8c33hYv4%2BnUdz6Cn1I%2BOcgUwppxbNrfnqBMif67Kx9qE3Zg38CA%2Bt%2BCa%2FEBRjpoqht3pg7aR8KRwm%2FoPFMlf7FsEaDbhXE2S6T6S5O%2BAV0E2cB9YedgJUXP8dGY2wKLcPodoYQ21Pk32W0PnSud3TfxMwTIsT7a4vdOKwR1NPw52G0GKEUYnW7k9VZPcSQrIsZs4EO8MicxDjoKEG%2F8yFsmj4XQv2LPb2c5y5bwZg1LoNB17O5SSIhWMv88OsO8Adt6vbh8ZMOU6d7TAblKSqaNKJtgrn0JplO0iHSENc2RE77xlAX4XDGrtVz5joil9kSHu5yv9r2%2B1Q38VPRANridYryoIIEHUhzBQONp8GOwGoKhDemZTgNQPlxNvW%2Bp%2BhM3uDN5aQjBThSsSZPpEcstmaMJEJY7Cm7OROPRyOFi7Uiqpb1UdzKX4h9nbLIlMoXGe5sq%2FomOdcXampdaiuTje2M8O5cZnXhZhABzPvZlM6tYSOvqt00tUkUaMDT8UkN0ke96ubsmR6c58%2BFczXQl3Gn%2FaIl3sK6WD9ZQRSZ6ha5e3NVDSAmo58yiE%2FIvBVjB0UBVVseplqbK5DrRuKy2foIUevhC%2BPBZA5sZJWF8MJjOjc8GOqUBfLqjMvq2GFkRKMTcL3ju9EWLSd5YrjPg5sGXiX7Avq%2B5rFQ%2FmTe0vZ23dtbLRA1R6PCCQ%2BOsP8eD1Aw%2BEcuSYd6OkxLPx4VJ%2BXs69pLdwPDVnVZxd3av6tFUYmjKrjqFrIY3XrPGM7WuRL%2F1gP7ty5bauYzaX1NFsG186INvREkeqkbv6SCLBixvYufzmGzbQz1rDzFHQax9pUjXeQUe1rX%2FXpNk&X-Amz-Signature=ab911ed40aa8e88be9c5c85b42233a1a4cac85fa347f69fe63d99e2742b9582d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WTQFGAW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCICfK6YdYgHv0QJJU%2FoWNPTCYLTrFwJY3Wlt1jxPl0VKJAiEA3ROwL%2BO6jSvIkgik3jC4a69WrMqF9fFFIhXQA0Wp3%2BEqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNtgJ4qNA9WLvbg2TCrcA%2FENt%2BvZ11SHTCePA8c33hYv4%2BnUdz6Cn1I%2BOcgUwppxbNrfnqBMif67Kx9qE3Zg38CA%2Bt%2BCa%2FEBRjpoqht3pg7aR8KRwm%2FoPFMlf7FsEaDbhXE2S6T6S5O%2BAV0E2cB9YedgJUXP8dGY2wKLcPodoYQ21Pk32W0PnSud3TfxMwTIsT7a4vdOKwR1NPw52G0GKEUYnW7k9VZPcSQrIsZs4EO8MicxDjoKEG%2F8yFsmj4XQv2LPb2c5y5bwZg1LoNB17O5SSIhWMv88OsO8Adt6vbh8ZMOU6d7TAblKSqaNKJtgrn0JplO0iHSENc2RE77xlAX4XDGrtVz5joil9kSHu5yv9r2%2B1Q38VPRANridYryoIIEHUhzBQONp8GOwGoKhDemZTgNQPlxNvW%2Bp%2BhM3uDN5aQjBThSsSZPpEcstmaMJEJY7Cm7OROPRyOFi7Uiqpb1UdzKX4h9nbLIlMoXGe5sq%2FomOdcXampdaiuTje2M8O5cZnXhZhABzPvZlM6tYSOvqt00tUkUaMDT8UkN0ke96ubsmR6c58%2BFczXQl3Gn%2FaIl3sK6WD9ZQRSZ6ha5e3NVDSAmo58yiE%2FIvBVjB0UBVVseplqbK5DrRuKy2foIUevhC%2BPBZA5sZJWF8MJjOjc8GOqUBfLqjMvq2GFkRKMTcL3ju9EWLSd5YrjPg5sGXiX7Avq%2B5rFQ%2FmTe0vZ23dtbLRA1R6PCCQ%2BOsP8eD1Aw%2BEcuSYd6OkxLPx4VJ%2BXs69pLdwPDVnVZxd3av6tFUYmjKrjqFrIY3XrPGM7WuRL%2F1gP7ty5bauYzaX1NFsG186INvREkeqkbv6SCLBixvYufzmGzbQz1rDzFHQax9pUjXeQUe1rX%2FXpNk&X-Amz-Signature=ab911ed40aa8e88be9c5c85b42233a1a4cac85fa347f69fe63d99e2742b9582d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZ5GOK2V%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T123047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQD%2Fs4gkRYz97g%2BgmG2WM9YXvfou%2BEtUOq2RWaOID5hfqAIgfGKnZdCahHb54UKJyhfzAYS2RHP6WszH5DzeaNN1QXMqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN1Ez69jZTp47gk2UircAyJ7HVJKsOJObUXB6dBcPnt2a1LmFZQFiYRmELIHkoUldSeQW2DCKNjqJK3BMAoCJgX%2BwdmO0MOxyMWYyGkHQrOTq4B0pBoNqEuelGJItbmA4H0%2FovAp%2FiJSGMpNe4PlRu9i8EUlXqx29xcvxwyL85NCiwsXnnTJZRXSapLTA7Cy26VpWmeIrKb0RCY7Qe5piOwIFZwoj0Tj5PHc4xnmNpgv0QS6GBD2c4jA0TTAvQo10iFLmmacpf0ipsehrbkZ9eZm5wmQFotM%2Fh8cmgL0THrSIX5UzOq4Qrlm%2BvvGPIe3OxmgNOExdCtScEQ4jXyEBp4ATq2BLC2Bt3BLe%2BrHxztDrJD6v9U7kF9xMpdlaTp%2BLuyOhs%2BdQrH2f5eBDfF1XaX8GmnbjstSV9aAEekrvt6yU3QthWAJ%2BdetUOABX%2BrT4Oe%2FLWn%2FbKldn3prWmmEwjWDkD34Hx6jlW34l0rvs2qecuGeRhqX68FN6GUJnQIxEFSQIVz6CT38pJo1edV2wXtRnZDI57itEUh9TT5754Wq1r%2BmaaMfYB8rjyGcpNPNPwGt2CyNmyEVL%2F8vHPGWaTnxWKZaUsE0yV404KFJkkOa2AM912B1ESrbMHMhfJAn8YNZWdVnB9%2Bt8BYRMMbOjc8GOqUBH8DxWPtxKhRKrVFf21hu5%2BFtYsImfff2SaT0rAtA2gMvUrQ0Iqhi9E%2FXNVnxxXK2tbvn2bcU4Du6Fa5GfHOz25a0JlFJmbUFx%2F%2BPgpnTNKF%2BFgrlRAyGrKN%2Fh07xDty2bI1TWAOPUPOsgxe1C7w%2BOjGvoQJ9gd3qYsJXZkFHkRutGZmHWTj11H8hVUVfXFLBVG2P14Dh7EUBUtv8lRZqJeRD65d%2F&X-Amz-Signature=a01fbd0054839e5976e97fe9141caa5112fd2e2885461f263339d269f2977f80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

