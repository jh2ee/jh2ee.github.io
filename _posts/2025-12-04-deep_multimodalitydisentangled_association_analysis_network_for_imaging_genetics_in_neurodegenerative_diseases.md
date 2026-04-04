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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KJPUIBY%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDw6BeW%2Bx5qHaNPyLPDUIg3elenR8jcNl1SZackOokO2wIhAIyKsmpInOGHxhfiv0SPAbdM6EGDw3fj0RvLYSu7ZAPyKogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw6%2Fy4pRpsbinW5gTgq3AMKuc%2BBrtPN31Ke2ApQBnD6I0rl25Tu2TDQyOdjFKxYF806VCFJD1mNEd8x25Tnnz7UpALzw4LG7LFyUoKeEbCV98xNmwMfODlda1gEzRIJBVWadEEganLSElz1osbg8REa0aFXnnkZ1Xups8FAteuuD06C4sPrmjdxvNWqNF8SEvDhbyZBJNxisNr91vo8Aj8LTj37dhzIZWmWiWEmKqXXLR9G43Seu%2BwxWORuTFRfKKke2TUlt9H%2B8zE30iIoRxSO%2BBg1zSqm%2Fj3UyMKY8K943bcCZSKRqcLQ76Q0aA81JeS3wfTUFxS2PJEYZKwfqVkDYEvdJ2CEcG3iRfUk8Eh5cKFk7z1Hm2vWl9CII9wM386d9yY7rSse3i1h9lf185b92qXU9a0MFQAkgjg%2BMBh1mSAdCyFkqXvMpxGgm91CVA4aNqg0dOpUAkV1HVwXtvPwVUyCH%2Bva0oemBvl8ZmbPw6lF5KljUFOXFsO0zH%2BORj6u3meLbA3aXHsuL6tBTyrpBsntE%2BInoqSjAW52hKXJAXeM1CF9f%2BQWAhYKTnrltAc2oH%2FmeuDu%2BwZ43l%2B0UqlXzvGQRSFINEgPKyN%2F1vIqKCk%2FhXPKs%2FegiNJoB3JcbedLFKgJpbf6V8kMjTCop8TOBjqkAU6PVhpQSyoK371MTg0d5VbflMZOUojZUgcQjBdeyqF9QMHAtHu2RgMcJvHtZj93RMwJp2mIhyP%2FXoEk8jHZtpGoboNsqCb%2F3uIuzx4knaIyKjxaETQT8r4aYUzX09KvOutI0FqO7m9FmjeefkbCXXE91oXWegvRWtaeIIXAwS3tLGzOQHMQJ2mYnCn8x4feJHYWLOgTaCbmidPmWgwApDmdTnd1&X-Amz-Signature=95e6893067561b97912ddd33f357d772303a8324d1b501af395bee546c801133&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KJPUIBY%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDw6BeW%2Bx5qHaNPyLPDUIg3elenR8jcNl1SZackOokO2wIhAIyKsmpInOGHxhfiv0SPAbdM6EGDw3fj0RvLYSu7ZAPyKogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw6%2Fy4pRpsbinW5gTgq3AMKuc%2BBrtPN31Ke2ApQBnD6I0rl25Tu2TDQyOdjFKxYF806VCFJD1mNEd8x25Tnnz7UpALzw4LG7LFyUoKeEbCV98xNmwMfODlda1gEzRIJBVWadEEganLSElz1osbg8REa0aFXnnkZ1Xups8FAteuuD06C4sPrmjdxvNWqNF8SEvDhbyZBJNxisNr91vo8Aj8LTj37dhzIZWmWiWEmKqXXLR9G43Seu%2BwxWORuTFRfKKke2TUlt9H%2B8zE30iIoRxSO%2BBg1zSqm%2Fj3UyMKY8K943bcCZSKRqcLQ76Q0aA81JeS3wfTUFxS2PJEYZKwfqVkDYEvdJ2CEcG3iRfUk8Eh5cKFk7z1Hm2vWl9CII9wM386d9yY7rSse3i1h9lf185b92qXU9a0MFQAkgjg%2BMBh1mSAdCyFkqXvMpxGgm91CVA4aNqg0dOpUAkV1HVwXtvPwVUyCH%2Bva0oemBvl8ZmbPw6lF5KljUFOXFsO0zH%2BORj6u3meLbA3aXHsuL6tBTyrpBsntE%2BInoqSjAW52hKXJAXeM1CF9f%2BQWAhYKTnrltAc2oH%2FmeuDu%2BwZ43l%2B0UqlXzvGQRSFINEgPKyN%2F1vIqKCk%2FhXPKs%2FegiNJoB3JcbedLFKgJpbf6V8kMjTCop8TOBjqkAU6PVhpQSyoK371MTg0d5VbflMZOUojZUgcQjBdeyqF9QMHAtHu2RgMcJvHtZj93RMwJp2mIhyP%2FXoEk8jHZtpGoboNsqCb%2F3uIuzx4knaIyKjxaETQT8r4aYUzX09KvOutI0FqO7m9FmjeefkbCXXE91oXWegvRWtaeIIXAwS3tLGzOQHMQJ2mYnCn8x4feJHYWLOgTaCbmidPmWgwApDmdTnd1&X-Amz-Signature=95e6893067561b97912ddd33f357d772303a8324d1b501af395bee546c801133&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IH644P2%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE2LYwoWPvdeFMboERGOWTWOzH0pXcSiy0kOTWviYLd9AiBYXo0yVONV33bdPTbej5LOZNMy6lTFoQkOai%2BnjEaDjyqIBAif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4LoMa7avV4m72MG9KtwDgUt56FofpEitIM2M9c7Rq6XoRAj%2FXybayjZmTT7XlllvVvHw46KmLOI57JcQVNHecyJ93%2BplQ4yUHfzkRX6f4K97hVartEjCwOXLxmtBn0hbT6uFKc2fFc3r67qlBby2geRDf5qTgPuVwWUNdi%2Bpk68WjigYpSMeXj2Rhjxui7XrNAqVw%2F16MneK7ofumrIINrWoKambZ55IYLK1iHu3WSl9nbt2LdW6EBozLXdED9dskqrF2uEwq8wvkeeG3Xx1fLbaxDq78tJgZ8hXFaSTDiL6DRO6hYWWJmbbAKV69thQxOM4l7aVdtYotdIbcobJuGDYQxWBECRxqx8IvCYZoOWPQa7h7MZfL3tmugsUo8FjHK%2Fe0gV6XcfuqM%2F13BhkmfJAL11gNH0h%2BFryaIRmWt8SDx6s1ct68jZ%2B6TT6G0sBtTN2Kutl0pDc7ICQaH%2BCDO%2BrHv8X2N4wFbN1lVzhk4NR8FG0pa5FHrjce6mYIrZoFLcnJIPbn4Ej5L7aG%2BFey%2Fu1IdtDJ6fvaSk3kJ%2B9hqvLLRwSwytHNkXg4HfKwunmFwLWSS%2FzWk%2BfbelykLwmA5xO2nRU8ec8zGCjkVWOwzeY57oYadAbKwtd5M8AS5OoUyRaeyL5u1iWyRgwyqXEzgY6pgGDKHc6uAuIy8wMCrqhA%2FLjT4RQKYSZFVRx3CTC%2BqZONqX46EwuH8x5UGgnaBgQUOHluJVLsMue1zl3HiaLSFHXOaEfakcgMvXAk7nHM%2FYH6fe6wxF54EVm6hzZq0naJzZZ7JxfcVnn4oMgZNLtPAfAcbJ7ZABfFGF3a%2FxsnOAu6hG3k8gmt%2BiUli3s9DzFqcMooT59efWlVrN8KnSrUqFbII9oqnCW&X-Amz-Signature=311a4f39afc057732020eadc6be5dba519bfeb1b0724c614ca644551e717d4cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJ3WPIIE%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDVcBbemSfD2QUlOHr50OFU1x%2FnmkW2M6XkdGYsGDtFcAIhAMzYZNfjvgkqwqQMFLaY6OyDYO4Edbf1S3m2UvjclKRbKogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJNdeN0bqL064HvRsq3AMt%2BeJ3gun0o4pC63geATgJhuHrxFBgm%2F9AFhRUca%2Fc%2BkyKhC%2BZa%2F4HxQdlctxjecfA3nJh5YhWXgIRl0h7iJTTeVHD0jQjMd3Aj1ISi%2Be0uH%2BgK8SoDAGP5Lz%2FS3CuWK3FEwwuJ%2FyAh1MeME%2BfBjk%2BKZJQgjyiuSnGFfluFu%2BBjm2eYd199OjwSlFggPhgBkKwYrtlSqH%2FB1qwg60eUGS%2B09bpqpczd6CGg8OwEo1HcAs8Ofmpj%2BKQEozx5JLb4uEorDFJvjNsy81JhvVH5TX27WNvmKdRQEcycu6h5IK70%2BU1w5tngaibbW6qe9krccJmebgZf7B3mUi3eXyxumqLP7tsOBwIvMSf4Enc54GEt9u1ypwrutikLaRB1zisdhDXo%2Foh8QA4hVZpBiLn6%2FVnUuG2gDSKb2hftO%2Baqd4mBHMdD0A9fSAMAZBL%2F7%2FK1qWpX1vs6vXaH9gDyx6y9Bw0nXT8nX13mn1ovXXSLws%2B2y%2BdOTMmkck5ptFotRLEub5pIJo9jHr5ra%2Bis8W1Bka5ndnrRDEahiufpRllOmSnBpl7qNzQJgLpyl1bcSuEtbe%2B1rYaNvYjITS%2FVhs9BrEp7H5VXlXECBeQW3VCZWXaN1hArbQBtaddF1XuCjCPp8TOBjqkAZdFnWyYyloenMi9YUYO0rrcNf9a5lBgNq4UgqKfAwayIJbOTC0awYD9zd4aIAbJxafzz41vI0SA%2Fi0%2FWs1371Vcd0%2BMjl9NkCUSKP1WqRWidOcERUKCjNnyttfwNFvqdCuAGaF2EpxyZKkM4%2FvJflvpZ%2FBesq%2BBYqaBCfyse3usXhD%2FKjGE8pudZw0iEpoLHmhWsuEONt1m%2BaVDWc79CdApz8Q1&X-Amz-Signature=13b6e540960294b233d3ae553be9b28a1dc59f4fe65a6b70080b2cdbd3f9dec1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJ3WPIIE%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDVcBbemSfD2QUlOHr50OFU1x%2FnmkW2M6XkdGYsGDtFcAIhAMzYZNfjvgkqwqQMFLaY6OyDYO4Edbf1S3m2UvjclKRbKogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJNdeN0bqL064HvRsq3AMt%2BeJ3gun0o4pC63geATgJhuHrxFBgm%2F9AFhRUca%2Fc%2BkyKhC%2BZa%2F4HxQdlctxjecfA3nJh5YhWXgIRl0h7iJTTeVHD0jQjMd3Aj1ISi%2Be0uH%2BgK8SoDAGP5Lz%2FS3CuWK3FEwwuJ%2FyAh1MeME%2BfBjk%2BKZJQgjyiuSnGFfluFu%2BBjm2eYd199OjwSlFggPhgBkKwYrtlSqH%2FB1qwg60eUGS%2B09bpqpczd6CGg8OwEo1HcAs8Ofmpj%2BKQEozx5JLb4uEorDFJvjNsy81JhvVH5TX27WNvmKdRQEcycu6h5IK70%2BU1w5tngaibbW6qe9krccJmebgZf7B3mUi3eXyxumqLP7tsOBwIvMSf4Enc54GEt9u1ypwrutikLaRB1zisdhDXo%2Foh8QA4hVZpBiLn6%2FVnUuG2gDSKb2hftO%2Baqd4mBHMdD0A9fSAMAZBL%2F7%2FK1qWpX1vs6vXaH9gDyx6y9Bw0nXT8nX13mn1ovXXSLws%2B2y%2BdOTMmkck5ptFotRLEub5pIJo9jHr5ra%2Bis8W1Bka5ndnrRDEahiufpRllOmSnBpl7qNzQJgLpyl1bcSuEtbe%2B1rYaNvYjITS%2FVhs9BrEp7H5VXlXECBeQW3VCZWXaN1hArbQBtaddF1XuCjCPp8TOBjqkAZdFnWyYyloenMi9YUYO0rrcNf9a5lBgNq4UgqKfAwayIJbOTC0awYD9zd4aIAbJxafzz41vI0SA%2Fi0%2FWs1371Vcd0%2BMjl9NkCUSKP1WqRWidOcERUKCjNnyttfwNFvqdCuAGaF2EpxyZKkM4%2FvJflvpZ%2FBesq%2BBYqaBCfyse3usXhD%2FKjGE8pudZw0iEpoLHmhWsuEONt1m%2BaVDWc79CdApz8Q1&X-Amz-Signature=ba491c61acb2f263fa49b543b03c8998f4a3fb30b79d86249d56ca0739eabc4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTE5JAEZ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDCSFSXkyrMx1YfosCeXdoIfjedN%2Fr2l1bipmmZo2RPjgIhAJBHJTXU9czBFwHQ7jXByMhSMwMCOZO9WrPHAMQYy3HaKogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzcxrOr4qxfzhUTxHcq3AOv1DD2dh%2F2Kbpxfytf%2FZkr3YwnHtvbI3aJ1Eu5soOt4lRH77yMId6sFclms8wGik94bueNcLALG2zMr%2FudKga6aA3UJ0pmjmarNaxngV4W%2FfMzWOSKmcxJYQuz1VIyfVRAiXG7VOzcXtpJyg758yXpl4qRj4dClENhOJARj3GkimAoG8YHEI9HYZdKHadCqdD5cLmrSi%2FsC%2Fu7xX6xDF%2Fo4wSOksAdbsFr8dhlUxccZ%2F9LtcjbslMS9pPLMNlllwlR4VPm4cvpDp9Dd3NhVClRftNNa2R2%2F9CciV6R4I7uCS8qhFXNHIXF2my840YMljV3TktCWl1pKrbWK9%2B04xz3OQpggYSSWVPuHZglJW35xpc4eRNT3kbNhBi1ITH54BM1nIVJklnZ2whOd%2BWNnBbvkdSg2bFK60VfmJSVgBGNjuhrbfOYp11cWky%2FSQfCuQINyhnuP7rEMRFWowvw4cjS2Nd2C5EjAXNldxiUHgjHj%2FnEuevJine1ldJq5tMMSExhG6ZQHW5kI%2BEBoX5osczSe%2F%2FGlK0VB%2F1tzAmOF%2Bt1LcIV8sim4%2F9AxQBFMCmvjI9SyKOjnoPKGFS113nwkSoM7b12pkkhPVnMY4cH6o40j8TXkefraZihDu3%2F2jCIpsTOBjqkAfhXshSacgKob2q8%2Fop%2Fr2WMeo%2F8bwVBCoGiDIcZ4XD6djEo4nClppEaKgbanbsHTN3ajWGI4GrY4aYEyZPV6g1B3aKidPS3%2FWzVK0ypU%2FokBSdmoVmyU%2B1IzN12eHAzXoJ8t6LV901MeLTA2hsxYYbUj2zkCCBSA82c7zGNCj1BHsuQhsbjgS2gvlTqJXYMntdq81O%2BDRX1AMDWRNDSDEMqQAbb&X-Amz-Signature=a9f52b23ae254f8d098c311ab152c9cad4896ad0e26292e8a265fd6500293489&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663F5VBJSJ%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8Yy6DJkPxnSSNNPg6JfyMPM0epPx3NZetJXSbrN8SpgIgM6fJPMJo9N28fyyxBJ%2B48%2FGQdcdDLA06%2BZZzP5ECdfMqiAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJSPpFrtV2FImFXKHSrcA%2Fx25duGyv9m7hBpNkGLhtJEv0pG09qPtQ8qwzWmjijQQHS%2BNwv3OaTRRnkttqOTY0yOVMTsma9K3ElRb3zyrmLLL4mmoKN24ARm0TqPV%2FL9%2BYQrTkfw9hoRF91OcSIeYn%2FSXrCgZsMc9jzDVUzbS0BBzKuMQKsIMPk%2FVM%2BsqcRpsq%2BWwN8zseQfpoICOgQDuGmyvieK99GkmClVIS%2Bxp8NEvC4f1Hhz8O8Ky44N%2BVHQFb8Sm37%2FcAifWw9iBMMzmPj6uebKrzJkM%2BF1ZbF3Q1sFMSwz2pjtXqxFyd1XHhxCDC3V9gmbyANVtJwxsm5VugGtNM1c0OhEGLca%2BFIcPNnElm02qPqSZREL7aD8gKCcvxMuyY0J%2BqSoLHgRwgMw%2BnvUC5cx0dt73vCO1RjRMFI4ZLkzCjpZNCpJXftEUlf3YKguI14jHSUxGFlxUUFC7pzaWeBSJsmHz1FLAQa5mVVjtWh1CLvW4FJp5QAZeBiLc915Wvysa3SmX2vllN%2BKuOleC90vJSkEMBXluIvomb1TMPKnn52am0p9gnvIB1wxEnbEuQa5cI2XmaZENmsksgDDdSMgyJJjv7tup97Y2m%2BOFSQiWcOgvdNLBRbj5iB%2BRR0pAUzfRXJV1mL4MMmlxM4GOqUB0UlQegg4qsn1QVAkHjvUalxAYJ00C9jkUl%2F9GKnx3LWSFvDaDBUUm5lLOxamWR6VLqyk52A1GFR07CcF3SMI3mHiTaeUUdWnIUTKAiRCYIoYBoF%2Fk94%2FuGFaBSqC7vfy6br9d1jhTQ6esdB0GDC75AR3Ha%2FCLIG5AZk81g2ztq%2BO%2Fz7Pe5xsGq5GOPHTbsaBiM2H27QvMMU23aAKWkKIGjerkXSh&X-Amz-Signature=e22cea717f924faa88ae35e2dc4464e74d60763cea50c0374555f218bba7d1aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RC7AQ6LY%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCPAo2xE2UHE8K2tNdaqkHzmSQ6nMEP3EiPCQJMdknUJQIhAMhzwHgTC4X%2BFOoJCniqzG%2BZqpYg7lDPnfbszIX1%2BS8tKogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgywxKuAtSa9HYtY%2F30q3AOoFuGKu574cnYCFgDOEk7JvrDuR3aEhHN%2BnYwMOKNAcdsW3UZhogyLvCEKkMA87Z%2F%2Fpf6HXHQhj59YuRtxOHSBsaVjmznk1TYgZ%2FJhvhngGeE%2FYaQbo8zskvc6Vg6vD1ab5M62ybA5IuBcePYeRIS%2BjpPsOkXtyfe6T2v66PPdXLQ1aQ2DXPnkSOYGr7rxvYAH6GvbWJdV%2BkUXdfZmAX3WH0%2BVYCM1j60BjnNhj%2B7AGMS5VvXlIfDiHuBsA27louz7NSCxtgt27s2xlv2cW1gKWpBnfS0k1N%2FxxaqgKabbt6vQ6VJxwlYnlAEAoa3ZvxCtKTQSEEYeJC9Qg2VU0KSQnf3mTpmJW6VDTxWdmpzWiUJdwBgQhTXLpuTJJ2%2FiQBNNnMbFTbZ%2BnO0M81Kx2afr8bN%2Br4kvVvHy%2FhkEiq1VaaY6%2BXP%2FVtiotK5ccDKZBpnOBbValZPQ2Eb%2BTzSp571mI%2BIlmwZevEjIT0cp9R7wVLTrCi8xPfHA8%2Bu6k6hwM7ozNt%2B5uE55Vs1aEiXHDfWzNptay1YW1AI%2FWIYXvR6Jn58N2eJhTChWEAkbs%2F3Ym7SZ7uY3Jo5KMR8ywVpTBA8QTmuU%2FiiQ9qxQiNj1KdtOiNGY0RsSDa9otIiEKjCEqMTOBjqkAV4Hn%2Bi%2F7VoFNvpxLHgf2Bk3KPoL1nCX6jgYck2gnBZcXoeZ5zQPCvZGssrqkOQXxk2fWpuGp7vVJMlHIAfxGNEgkDHGDqo4Q8qzzIVuk7B1cuAOCAfYTP5Q5TTJDMdiqwblVkw5lHmLotYVAW8BaSdy2CfZt6YgoHhYr8Bcif3epOleo19q7YaD2xEK4IBhYYnqmdqMS6tLwB97AjtCxz68r0%2Bu&X-Amz-Signature=e5488245161e8cef1ac2830285c42c8ec430e744c9396b18c65047221821af0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPPN2QDW%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDtCxx%2BAm7cqoNLBWEOQuzwhDvLPk01MU5%2F7nPxJe9ceAiAkRNBo2fTAKcbzzpIdNSQwYSo01SYyvduvQnJY7VUK1SqIBAif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQfNV0lCwlm1QfXM7KtwDYBpPgPRrY6DsoS4RUZ59SXctRkKc9rURiH9Hm9Y5XLofRMP8%2BoVxK25RAyfoJU7xmmGO9XxSeGJySBBTXXiDWFEtES0u0A%2F4paHNC7wLmfcEYbgQQlRED47u4%2BHKbjLIs5Ga1nlQm%2FprYplnbRhtUlZbduC3K6%2BsMUw9QHZXn7PEpwE5ka5ZVmSRZ7tIbm4TIrMX8A2QUgt7D%2FpXfUttFwLYA4d22Fu7wbqR%2BMKWbHzJMtdRqct4SEuUbY%2FuRNzbhROmhVG1LiRr6aby7g8AMZgTVlWaG%2By9RvcjFDhu%2Bh9GXGO9lO%2FIr57ztT9grJzjGkCNrFN0xEgUoPMddO4Nfvx31LwVnqENVfq6m0%2FwItyuegDUVn%2Bf93l%2FhAKDkeFQui2nUdIQqxGHpbgzkpnY5YBtRbo9AXG%2FCSMQfGgNq06RxsfJbs0PuVPLkuiuE%2F7IUzEmbnxRcVcGWgr2MJe8%2FmTcqd9V0owPNc3CsJRlhvo8x%2FS5Y0TOFx5hoszGnCLAla0uzf%2FahWzK1lNkwkWZsPtmQILZR7ev7LGv6pK3mZ0gSXCtXHdot8PCLeosf8WaOTJx9MqSNZM4H8fFbu62UvjosEq2aoVXOsMSMJGhnUYbZKHc2VkuJmBQE1cwhajEzgY6pgEq%2BYozLE5cXujebAHaZRgxCLp%2F8j0f%2FUmxO5cwDLQxdlPr4tr35Nz1Dbg715yiu843FIk08z9bK76JXyBKdrPhPlIClioYjQw72b9BFuHVxYKYw3qRE%2FbTQ3%2BCKe2AvUKiUdcgbcNjPeLq0wvSMjolCH5%2FfHoZPc0U47uh0Wm6qsFzBS%2F4w0s0yM8flkUXFsN3lXqi4sTfZTDzb52zMSSbN7ccX7xz&X-Amz-Signature=6d7205d9cc5f6b32b670ac7f34440152688955224f2e4d6a8798657be2f442ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPPN2QDW%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDtCxx%2BAm7cqoNLBWEOQuzwhDvLPk01MU5%2F7nPxJe9ceAiAkRNBo2fTAKcbzzpIdNSQwYSo01SYyvduvQnJY7VUK1SqIBAif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQfNV0lCwlm1QfXM7KtwDYBpPgPRrY6DsoS4RUZ59SXctRkKc9rURiH9Hm9Y5XLofRMP8%2BoVxK25RAyfoJU7xmmGO9XxSeGJySBBTXXiDWFEtES0u0A%2F4paHNC7wLmfcEYbgQQlRED47u4%2BHKbjLIs5Ga1nlQm%2FprYplnbRhtUlZbduC3K6%2BsMUw9QHZXn7PEpwE5ka5ZVmSRZ7tIbm4TIrMX8A2QUgt7D%2FpXfUttFwLYA4d22Fu7wbqR%2BMKWbHzJMtdRqct4SEuUbY%2FuRNzbhROmhVG1LiRr6aby7g8AMZgTVlWaG%2By9RvcjFDhu%2Bh9GXGO9lO%2FIr57ztT9grJzjGkCNrFN0xEgUoPMddO4Nfvx31LwVnqENVfq6m0%2FwItyuegDUVn%2Bf93l%2FhAKDkeFQui2nUdIQqxGHpbgzkpnY5YBtRbo9AXG%2FCSMQfGgNq06RxsfJbs0PuVPLkuiuE%2F7IUzEmbnxRcVcGWgr2MJe8%2FmTcqd9V0owPNc3CsJRlhvo8x%2FS5Y0TOFx5hoszGnCLAla0uzf%2FahWzK1lNkwkWZsPtmQILZR7ev7LGv6pK3mZ0gSXCtXHdot8PCLeosf8WaOTJx9MqSNZM4H8fFbu62UvjosEq2aoVXOsMSMJGhnUYbZKHc2VkuJmBQE1cwhajEzgY6pgEq%2BYozLE5cXujebAHaZRgxCLp%2F8j0f%2FUmxO5cwDLQxdlPr4tr35Nz1Dbg715yiu843FIk08z9bK76JXyBKdrPhPlIClioYjQw72b9BFuHVxYKYw3qRE%2FbTQ3%2BCKe2AvUKiUdcgbcNjPeLq0wvSMjolCH5%2FfHoZPc0U47uh0Wm6qsFzBS%2F4w0s0yM8flkUXFsN3lXqi4sTfZTDzb52zMSSbN7ccX7xz&X-Amz-Signature=0d9d3ba5536dea534141df5a76f8002c147968711cd6e8a5b3b9bc1622becc24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZHAZCD4%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYgGX0XIDTPbgRxKDUk2iXcY6JU1Ab39OSiij6DK2YjwIgLhL%2F4vuBdg5gTKdg2G%2F1Q8Hd8JASWrEgRf4t26a2NeUqiAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJt1qBpYULpBT1DeBSrcA1Z3xzpwNc7wnz0XxpCSzd1%2FChoRx9Atu70xMYS%2BZPZN%2BewxGe08LZgIFkz0GbLh0ZkHICqJiDRqC3rp5PSz3aGpCCjO3T%2Fmcv3XIXc4Jziw7UNElSWd96TYCoOcadhC%2FegYukWfijeHq4PgY5mkwuTQI98dyaTPoWKF65XpkfT29cowwo%2BIQyW39XZDaRiIWT0hz3D0oFExnTOFFOL7lvKJ5GvDAo1CDzsjTNrFI5aWcfi6P8MXjxnKZHZhpZ4ftOBNi3WpahWV8EdjYCUiSPHFjl3k1TGsuZ0MsVQlxy%2FBWBUuvl69uDX20nXUu4mSUITuOGiWoQiHmtdl1alru%2FfJGCHnnKMhODL7RERu6oz1jFAwZAc0Wbb%2F9iTdNgQwh4GoIahsCvihJ5rBV9yG%2BIDobn2o1Jh12%2FSaDEKWEZa%2BKoYb1diYdde4wi%2FRVd1GBMv6MQFQBgc2d0RMjR1wfSUYhSM28WCI%2BthI4sRv66549L2mu1E6slnkBPl3wcLFfMskC1qlihcH7icrT%2Fu2xa9fiwK48MRDCPqp0Y6jS%2B2TRtFCFKrKlx0yI%2F2bL3x2xgBY4jk28U9pNXTJ4CVk27WvdnV%2FNuJJs9FfQDmMzJn7bjD0IC%2B%2BvXqn0bMVML6nxM4GOqUB3kF0%2Fdq3w%2Ft9XqQPzeMerpq0LpPUeJP1Wky3HN4C9CMhAtAIYyibTalER%2B%2BWkcalR3Ii7QTpMVl1yuO8HCUmH91oaJ%2Bz6m9uxPnyeEYmAJZDKTWuXi5oNKSaFo7J5vhox17fpDQTf2n%2Br5QR5sQmkL4OOBBanBuXTnv90aNESbFTKqSY4AthfSdHyA5lPygPRUrnR6ColsG5DNrpu%2FyX5NlEXYMw&X-Amz-Signature=53f4a9b207c901cc5837284dd654f4d9ff97bc8c1c7ab2217d71a162e34ad880&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TL56RDBM%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRPJSTg4iBHhT9YMEu2SRhbj9GesTFN3ZQrGc%2B3iwWJAIhANX4InbVip8yctw0Kv7PHHhgzdos5WGE3UZ9e9KJbZIWKogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwYYsDuTZUzLASePqoq3ANsXivxTi%2BV8Gx5hxwKo%2FB3C1l8qFIe53j%2BWkGIkWj%2FwXWPgQyEVhA3Ljl6XyLykk5sS86QTXsn6vKj9qe4lf8xoC3evBPPC45kMcIiKCeHfMi0vtKcKmczW5LZEd%2BwA24LJ%2BH3S2YeLKmVH7SZw3vuhS7hQ%2BpRZUSvbjpBWUL3j6VhvCkXv15XzZOKnwkB70KJTbX4KaICqD5vcOWm066hp0G0%2F49Hvuz%2B%2FLvY7JzoShcVM2VXyl2%2F4Q7yr1rLUUkpiPlkxYeRHqZ%2BrRqf1moJbznWna9Sf7qZHPGtIi9grPlLljWTDE67D4ud4jJamRATPOwTqILLWIK7wUC%2BXX%2FGI6hppMKVAEzsFKjJwe8aJu3LyCPTZk2Xy9UlLfcuPntNPkvpaBCusctaQE2mrG36cTugz6844p1853rz6ppj9afxZ10moU%2FqPPLNHISEoUjvSeTnH1nDdQ%2BiAwg%2F3%2B7C4dE4k2GYpHnRu77QeLqwWZwRdZ6oGPNrDoYRBRctX6Y0fjYPWcgDr2xdVmXyaIkyoX9kJQGBmbvhZ747fOxrt1udSVNoSUbsu0QIbXYAtez7G%2BloF1hGGyNelL3%2BYzzYIbnfGJqIFMIp0V5iV4JhGM5DI%2FNPplVt1azFQjD8pcTOBjqkAUK6%2BLVcDFZvOGGwkJZLyblkfhhh6HKn7TAkvilOmViC%2Bpft5ADk%2Bou8Ub2ZT8%2BDI1NWKUExn3lrVCtvULUg5JSgFlwL39KWiW1r%2F9ZK9%2BArYQK%2BYyOyog3Ieprz%2BDBuAH6XzPnE%2FTf6I2HIGRqUvrXtx0Av4vrGJ53NdNqqC%2Fy340c8%2BzxSAyAsyOzLeOJoIJxjzOew3dQcjf9EfxzK5Z4IQx6X&X-Amz-Signature=c39b5993aef2be3390996dc8f5cf3163fb4d93978beec5ccaee60426847a1238&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TL56RDBM%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRPJSTg4iBHhT9YMEu2SRhbj9GesTFN3ZQrGc%2B3iwWJAIhANX4InbVip8yctw0Kv7PHHhgzdos5WGE3UZ9e9KJbZIWKogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwYYsDuTZUzLASePqoq3ANsXivxTi%2BV8Gx5hxwKo%2FB3C1l8qFIe53j%2BWkGIkWj%2FwXWPgQyEVhA3Ljl6XyLykk5sS86QTXsn6vKj9qe4lf8xoC3evBPPC45kMcIiKCeHfMi0vtKcKmczW5LZEd%2BwA24LJ%2BH3S2YeLKmVH7SZw3vuhS7hQ%2BpRZUSvbjpBWUL3j6VhvCkXv15XzZOKnwkB70KJTbX4KaICqD5vcOWm066hp0G0%2F49Hvuz%2B%2FLvY7JzoShcVM2VXyl2%2F4Q7yr1rLUUkpiPlkxYeRHqZ%2BrRqf1moJbznWna9Sf7qZHPGtIi9grPlLljWTDE67D4ud4jJamRATPOwTqILLWIK7wUC%2BXX%2FGI6hppMKVAEzsFKjJwe8aJu3LyCPTZk2Xy9UlLfcuPntNPkvpaBCusctaQE2mrG36cTugz6844p1853rz6ppj9afxZ10moU%2FqPPLNHISEoUjvSeTnH1nDdQ%2BiAwg%2F3%2B7C4dE4k2GYpHnRu77QeLqwWZwRdZ6oGPNrDoYRBRctX6Y0fjYPWcgDr2xdVmXyaIkyoX9kJQGBmbvhZ747fOxrt1udSVNoSUbsu0QIbXYAtez7G%2BloF1hGGyNelL3%2BYzzYIbnfGJqIFMIp0V5iV4JhGM5DI%2FNPplVt1azFQjD8pcTOBjqkAUK6%2BLVcDFZvOGGwkJZLyblkfhhh6HKn7TAkvilOmViC%2Bpft5ADk%2Bou8Ub2ZT8%2BDI1NWKUExn3lrVCtvULUg5JSgFlwL39KWiW1r%2F9ZK9%2BArYQK%2BYyOyog3Ieprz%2BDBuAH6XzPnE%2FTf6I2HIGRqUvrXtx0Av4vrGJ53NdNqqC%2Fy340c8%2BzxSAyAsyOzLeOJoIJxjzOew3dQcjf9EfxzK5Z4IQx6X&X-Amz-Signature=c39b5993aef2be3390996dc8f5cf3163fb4d93978beec5ccaee60426847a1238&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2SYQ344%2F20260404%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260404T142220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCVpFD5AS%2FfN0SYnSd5pQEpCbYk2jz6h5IRbn8eohszKgIhAMwToovEe9GtrOhY%2BEK%2FP4DKCVKnm0lxIT6%2BxZRgz1QVKogECJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzifToOiNkR8r5lBr0q3AMiWlmEiFSHDTQN64FAh1fFKXMYw2CjudFLwd9bFVs8JWgZWKPR1mbhhZl986vDSffeh7MuF%2FVfemprWOY3OIrVbKXZXK456ECYMgCWK8fqyoJ0q0fddMgx2JDGhN38TKlMuoKbFH0FVz8hcga6Hswt3HxW60xGqs%2B956xE68OUN3rDoPo9OX0PR4ociLVpbk%2B375f5ZGidFg3yHdsURiiPa2fsgu6RBwhZXWT5PaVnVx4eGoTobGqU5a1tJJYAZJEso0SzXemPjs2qp4iU5U%2F8fzbRdIhSNzSmph20EyJABgnXz9Xo4vqoobumD5hXpBFfc0OOTL9oAqB48qpv5H8DlJ8mTSB4dh871gEPYpIHyR0vbwlPCQqMtmKS3Dx%2BWI6OHwjXE8fIlUhirMjJcMm2UpE6ynUYUPSP%2FfLX1LcGilwWnbmQ7CDfHkYejVe3MnhO%2FN%2B644Q0AyjpNkMIUnePJQfxiyz38ZCPFGoos55zJBQmkvKpp8heQO%2FRIxwQw%2Ftek%2F3dqlrDERXhfpnkeS8QKhz%2Fnp3iJ5C%2B3vPeTSXef9i1ctk3nl6KV10QKq%2BR9SGidEvNGF0jK%2F%2Bw25lFMTCCBiN79bs9%2F60511pR76L122Z6S5bAHsbcKqnRsTCUpsTOBjqkAYono1yqQ%2Fm9y8ScPFkvTf1llRoGmt5N7Q73wFhCAhWHqNmcduyUbETUNpo4wKxBzq78TrSWbWETPFY7jJ1sE2iNBHcUILniVl8WM7I5FeL8WCZQGpNFZ51gtIqTJT3cs5Mckt44BmrF8RNixlZaqXOYgo3U6ASEAz9ziAoliaxtD0XQiGvO5kr8uXQftoPWaGZ7tQxZXDipy5GXQJpU4mxWFxvy&X-Amz-Signature=3a8cdd9b2f6c3bdf9e5bcfe6c19236df653fafdd4a4c4d2a6a4e0208907b6d07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

