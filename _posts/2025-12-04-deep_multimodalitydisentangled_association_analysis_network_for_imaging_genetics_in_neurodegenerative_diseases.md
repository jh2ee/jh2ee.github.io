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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RS3XKVJD%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQC%2BQTF57zPWgnm39RMOniTmVb5IOAmo5B3bWnF298LFiwIhAIZLzB7UQKmzzkL7KIXA3jgjYJWSxAqo40Jaro4XRvx8Kv8DCAQQABoMNjM3NDIzMTgzODA1IgyG26a160tQTmt9mVIq3AO3QqhJ%2Bokm1MZDg8ojclqMZgYo0CUUDR6e85XNaiPx9GoO%2B4nuLBMgpbS%2BjTYRaND7TYxd5AkZ1GbalhNQ4NmN44QQnRQDMH6KvlcfHkdzZzzjiCORvd4%2F29oSZoff4VKB4oUJPRvLsC%2Bp7vkpp9g0Q164s8iV6MSPBTlu3zSz0XuSZqv0E7GV3dmC9oB1rJHi4OInPWULhyr9cXA%2BwT27aL2KYXDiBQW%2FNppNTSA0hYvMdkDZyNj8X1g%2BMvkPrBnNynPZqX9BweeHqLEnNT8GekInTURUCtkPiQ8PSWpU1CqOTaSjC7nQWeFu38xkklQKr%2B7WoabFVepo77NWqN4F2lXPPbRRKUbCA2jCZfzUmZReKC70wQEEMNzv2aop0mLkoRjQ7MD%2Bdsl46a1NomjIzcP5s8McnPdTMGOdlrkrf9Fi79PI1iZGIFaRlnYXgQJk8RrECSS8IzuB5jm0v2UNlc3BAojJxKOcfm3zIQ1wu%2BlHFsGDDaf6fon11f9k%2FUcBHmc7s6bfRkIVA5yNb98UyyY%2FaZ7sk%2FdAARHjCz1RSSxqXQs8f8sUlJxOj0X9hiBgFKcSyyfHpU75mJVoLQ2NsnzJJNK7SxL3570p5aMrbU5LfnrtyhXwlRHqdjCg8bHNBjqkAR3nokuseNxTGKEmjOvNhabpTW6oQLaDuxhHSiHxgxqg8a1Q%2BcDpWdRndshMtqYfDYYGr5vokVK6sqT6WN8y3eULPnwkqT3eCUVdYAsZ8DD9TltPWe%2FCMk50aYPB45wx0cTDxJeg%2FbpJ6fuiMGWZFzUqVO4jVSbMv05OFhyKsFGJ9ZQx0k9ffM48OGJsfCxihFbzO2IrzKAs6vIPGprxEHf9g7%2B9&X-Amz-Signature=6408ff5cc6795b41e69c58f1ac765f82b7e144e1ac8185b4cf4de99191fbcfb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RS3XKVJD%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQC%2BQTF57zPWgnm39RMOniTmVb5IOAmo5B3bWnF298LFiwIhAIZLzB7UQKmzzkL7KIXA3jgjYJWSxAqo40Jaro4XRvx8Kv8DCAQQABoMNjM3NDIzMTgzODA1IgyG26a160tQTmt9mVIq3AO3QqhJ%2Bokm1MZDg8ojclqMZgYo0CUUDR6e85XNaiPx9GoO%2B4nuLBMgpbS%2BjTYRaND7TYxd5AkZ1GbalhNQ4NmN44QQnRQDMH6KvlcfHkdzZzzjiCORvd4%2F29oSZoff4VKB4oUJPRvLsC%2Bp7vkpp9g0Q164s8iV6MSPBTlu3zSz0XuSZqv0E7GV3dmC9oB1rJHi4OInPWULhyr9cXA%2BwT27aL2KYXDiBQW%2FNppNTSA0hYvMdkDZyNj8X1g%2BMvkPrBnNynPZqX9BweeHqLEnNT8GekInTURUCtkPiQ8PSWpU1CqOTaSjC7nQWeFu38xkklQKr%2B7WoabFVepo77NWqN4F2lXPPbRRKUbCA2jCZfzUmZReKC70wQEEMNzv2aop0mLkoRjQ7MD%2Bdsl46a1NomjIzcP5s8McnPdTMGOdlrkrf9Fi79PI1iZGIFaRlnYXgQJk8RrECSS8IzuB5jm0v2UNlc3BAojJxKOcfm3zIQ1wu%2BlHFsGDDaf6fon11f9k%2FUcBHmc7s6bfRkIVA5yNb98UyyY%2FaZ7sk%2FdAARHjCz1RSSxqXQs8f8sUlJxOj0X9hiBgFKcSyyfHpU75mJVoLQ2NsnzJJNK7SxL3570p5aMrbU5LfnrtyhXwlRHqdjCg8bHNBjqkAR3nokuseNxTGKEmjOvNhabpTW6oQLaDuxhHSiHxgxqg8a1Q%2BcDpWdRndshMtqYfDYYGr5vokVK6sqT6WN8y3eULPnwkqT3eCUVdYAsZ8DD9TltPWe%2FCMk50aYPB45wx0cTDxJeg%2FbpJ6fuiMGWZFzUqVO4jVSbMv05OFhyKsFGJ9ZQx0k9ffM48OGJsfCxihFbzO2IrzKAs6vIPGprxEHf9g7%2B9&X-Amz-Signature=6408ff5cc6795b41e69c58f1ac765f82b7e144e1ac8185b4cf4de99191fbcfb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QR7OWCYE%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQC%2BSfHYi52KpBR2OYIWcqmMti7LCATCGZ7%2FtXHEX5b%2FlQIgRJ1RJvVuxBjzAfaiJNyZJNEHJY2VWZHm3irg%2FncicyEq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDCWv2v%2FYcf2NLhp9ISrcA0JE0HSKShHCbIOPAlVREmB4G7hAjUVRKI3wrjgTmfk9tTmXQM9%2F%2FVWDZNN2abHlRjNWdpr0Q6Cv52fL7AiFjhPe96KCSODpJQM04hecyqzD9EdbXbbBvlnTCtS3OSbHrnaMt%2BuO%2Baz0qGByh%2FLekqAZC0EDLVH%2FueCXuMFznB4p8a2ilZSIS7zq%2FGpnPE0SB9IF4zW8eTswe1kTWomBlqeiM8y74LGTk8yoWeA6by6g4lixFmz1Yz7giSAdeEJdZh4ofc6I08BKE9Do2RM1JImhTsrrYh%2FmP3mw8fp%2FWncbLKkX20TgaTNNmBDhF6ewH9ayJWuTcOwAoUBEylkdDvz7j1UHSYercScQeaNJvP1UOpLrLKsZO3QMRafcXHecDjeywpqm4qbjJ7sgM7SleHFuNFNn3pWduvrwK%2BSskIarK4LykDmlF1Gsc6Bu1k%2ByUxPXF7MhhqbRsflYfM56FoYThJ35hfcqMGI4f6LVxLnve9OvafTS5TFJhqvqUqEuQFiaJmclALT1rrgg5pLmINsMn6rym3fJgYUtDI4wjsh3n41nqrG9JglRp4Eph%2FRAyWZAMCDQQ4PeUeM4SqBjHvYjlzh1K2RXE%2BCffVhU%2FVS5EMzrVmr8v6a3eRRqMNrxsc0GOqUBytWBmBxk%2FqsuPfQw%2F5TnOTEzFOhUejkFOoURr5JXL7SNPnnhfTM30euLvwtpIkbWtFsnsv%2BdSnFbtCng4MaqHZCiRD35lh5mnucQpNJ0jk4vt8ZesBr%2B1zztGdFSHRqycboXLWFwa5uMUMOJDXaRqnluWdZcyjEB%2B41ZbpJMLpSCTSNwN3fwVOvhpx%2BGzM4oJfUakK2PE1IFOrui6sartrZ%2FDmNN&X-Amz-Signature=ea2663c8ad9fbd3d171e03450243be3241c7a5503ebe2068f6e5bd9496841018&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QLY2LUQ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCICGljlLoRrXT5k4ZRt08wN5T2KbXIJOQoKMeZYQKIht5AiEAhojkbK1bJ6aJKOamz6mLls8RuDdPe2zfwiQWu8c4VT0q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDNp%2BmCkxMsREbRc%2FXCrcA97bM1rmOsFPTqEe%2FgeIHZEKNrSljBUTOpx7ROc1FaEgO0uMdzmjYdUrFvvQd2PDok70YXhlUdD4FGWmNQkVZT2ShTjfSrgKS6fq5v8bdFctk9naxZuBIDpw3TCCG0W05MmUib03KzemQ9T5QxnCg6pDIbV7oerrywxEE4pHD3deSHthcVXGthGRYu41msGabZE69aa8wK6oVe78L8%2F6onQ82nSoZOZgxLP1elHeB3fiTlt9zB5jmozmnAzvKOSLQRA1wHOrHeduRCvZJikZti0Gtn9hQ9mSJkfIJ3Uh3eoC2CT%2BvFWXsNEkBi2J0U%2FZt6ySDAa%2FrgiOmcPi%2BS2ZsbB27ozg1nC6WbaV02PufvWDGjwwQCSF18KBeSdq4d2Bf8uwMfqAp26YQ615rDF1uiFa6RY1RzXaNVxAYzKOK6v%2FjPL%2FRPPMmTLoHoGuP1RqnDMwZWCYLltsVE6RWqB1WFYGT6V9FzxlE5zlAzl2DnrQ3pPAS4oRnm4P6bp5DU2TbP%2BDvJs3l1BknpLW94crUn7fyz63KP71vsQuP82TgpU2RU3vrI9hheCJzWCDhRZecOS67gUsFAD4MzwN%2Fqhf%2BkF2%2Bu2nENqi8JnepRYC3YyzpsL7YGh8jBd0uitHMLXwsc0GOqUBDSqiAFP342G2Em4EE3PSX5PMYPm0qIbIVWe8ooX6g%2FkBchd8PRcc87sI7j6q%2Fxl%2Fe61Z3iHT48VP9pf58fQ4yTZ0WySPGE9oznQu6g3J78DPFTYM3xOfXwqW%2B8jQyLZ%2Fh5FhVbdeN%2FTdl%2FGBO8ebysfHK3qsQmpBYdKFFWyJB8spRz3GA3gi0CpLi4UyrHS8cld1rZXS0421d317ubXn7TnAqMTj&X-Amz-Signature=ab5eed07c5ac96ab8875d664372b8c8eaea6e7571b3ada8dfd5897db6f9bcbda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QLY2LUQ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCICGljlLoRrXT5k4ZRt08wN5T2KbXIJOQoKMeZYQKIht5AiEAhojkbK1bJ6aJKOamz6mLls8RuDdPe2zfwiQWu8c4VT0q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDNp%2BmCkxMsREbRc%2FXCrcA97bM1rmOsFPTqEe%2FgeIHZEKNrSljBUTOpx7ROc1FaEgO0uMdzmjYdUrFvvQd2PDok70YXhlUdD4FGWmNQkVZT2ShTjfSrgKS6fq5v8bdFctk9naxZuBIDpw3TCCG0W05MmUib03KzemQ9T5QxnCg6pDIbV7oerrywxEE4pHD3deSHthcVXGthGRYu41msGabZE69aa8wK6oVe78L8%2F6onQ82nSoZOZgxLP1elHeB3fiTlt9zB5jmozmnAzvKOSLQRA1wHOrHeduRCvZJikZti0Gtn9hQ9mSJkfIJ3Uh3eoC2CT%2BvFWXsNEkBi2J0U%2FZt6ySDAa%2FrgiOmcPi%2BS2ZsbB27ozg1nC6WbaV02PufvWDGjwwQCSF18KBeSdq4d2Bf8uwMfqAp26YQ615rDF1uiFa6RY1RzXaNVxAYzKOK6v%2FjPL%2FRPPMmTLoHoGuP1RqnDMwZWCYLltsVE6RWqB1WFYGT6V9FzxlE5zlAzl2DnrQ3pPAS4oRnm4P6bp5DU2TbP%2BDvJs3l1BknpLW94crUn7fyz63KP71vsQuP82TgpU2RU3vrI9hheCJzWCDhRZecOS67gUsFAD4MzwN%2Fqhf%2BkF2%2Bu2nENqi8JnepRYC3YyzpsL7YGh8jBd0uitHMLXwsc0GOqUBDSqiAFP342G2Em4EE3PSX5PMYPm0qIbIVWe8ooX6g%2FkBchd8PRcc87sI7j6q%2Fxl%2Fe61Z3iHT48VP9pf58fQ4yTZ0WySPGE9oznQu6g3J78DPFTYM3xOfXwqW%2B8jQyLZ%2Fh5FhVbdeN%2FTdl%2FGBO8ebysfHK3qsQmpBYdKFFWyJB8spRz3GA3gi0CpLi4UyrHS8cld1rZXS0421d317ubXn7TnAqMTj&X-Amz-Signature=17b462961ae31164823fd13b3804516919d34ed7909e9ad645bd11058278e2cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGQICC4I%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIHv4k4%2B0YDaJbnSfudEfushqCz%2BTqbXkGaWfT4WKuJ7bAiEAyN35T39THra863OKUXuJyiIj0cF%2BCauPZc90ZqN%2BcaIq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDC2rtTx9fRDeeNLeTCrcA82l0u9fk%2BacBOIZY7t2IsdhIkkNyEUE%2FE8LIbdzQyNxxE4s4a0kkPs%2Fg%2Bu8VNCSgVZJzi5m8gJN9wsA5%2FaA9LoKya1OGqVbp7GDORPb%2Bvv%2F9adqsjJLieY%2FUAzhqVtUq%2FcYsFP1JE1MlLCYqQNjpQ8yr8op%2FDXSHkZov%2BiIeETR704tuGUKSbOw2kZzYsxTjFNZsay3OA9BldmGRA5P%2BJkMXZLfkL5i7%2FNIpYhLriD6GJJvRvFbB%2FOpBtXRvOLmlvM%2F2mSyiWOB6VM4M40M9RLV2l%2BviOhXQ5Grzg4NHVUidyN%2FeuyfuequO%2FNYRGNi3CvYkkiHmplelaq0TRngZenu5Vkia1hf8tWQzf6eQ1HxaFSvCX5ViPDAxU7nAuKS%2FlgOl9H7RNpUqZ9D9PreY4JAENywTAtT3JdA5ULWN9gDSimSBlSiN4IemfIXTSCC2yA4SZ6tNQLHt3uR9LWUsuChsRB%2Fbq46zkP4pi8m3SR%2BUsf3JcUUFnMJbhYTdfzRhPQMSJMT9OTWjD6D0o5COOJVS3pAPbNhQAOl%2FNZPDBqPPhDgfOv%2B%2BaAXwN7Bfa6GZB1bFvhKCC2mcyDYjpLzQdw08nxJyOspBqgmOt6QB5GKWuNOCw1Et2cJ%2Bt4qMMrwsc0GOqUBK4lAnXvWOSkOZHcbmTF0QtUXa0QbDIgCxIL%2BZWkCFVFOmgsjjPp98HdxcGCx8%2FU%2BMtxWM%2F3loxK%2F2lPyRbQa8G2TlHoMtZio6fe23e%2FluR81RO0ejgA6mw%2FMzNHwrydxkeBlbHrW9AgmVywNoa1wtUrkAaPtPpc57aPJK1Iec2wl1C%2B4US9wkhgJm3b%2BGClViaErGoG3PDM656omxrD6pL75yoWT&X-Amz-Signature=764d2014c5f2ba166acd1c3f2628c7aa18569488ab3b6124f2d709f75b120321&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWYLD5O6%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQC1gOUvqXSIYoSBy6tDct5lXzypCbYphM62PXoVhOab4wIhAOF%2Bu%2BQt77zM4%2BEL4z1yghR9AGPFPKPc%2Fp%2Fx19qK0JVLKv8DCAQQABoMNjM3NDIzMTgzODA1IgwBlLZaqv90rhaw1LMq3AM7VucxRDRBOwVkFRIf1Xvf4JJhbEXZTBhjbNYzW96cbflcCjMGfC1LwIaMtf9MKfdmizW3ZsIPWSws3R5DbfxJw40e9wZUdjYSAKrRCEQFQG%2B%2BnL1UasZk6t1RXKn2xKGzdKiIUupPXnWxTA4lwVONUzrB%2BptvKG%2Bh7ldAAWaSRz1lbpb3UgRA28S5TwqOxspSKMr%2B8WkiLlHQwlauDZZDKhW0LYluoTIBFfw3sx1C2lUBB7txdKPzjZYYJPDbvpS9iqtdMF10TZJ48zBFFoUFHIjjqJxPaWW4SdkXBoJ6J7fZBbhUjJKf9SQPBO%2BPS3d7tUq1xkX2JwH%2BWvQad%2B5phQeE7xEAY7APWM5vPNFtyTAKgvFYSY1G7JnDZ4Vi%2FemfpWpuSIb2fD%2BYK7iVfZsGmLeirDdfKM3ClSTuVg70asLjs%2BW%2FfMOnBmjAKX%2FcwSufXO8ZGgcqCpum68l5cUmSymX4iBHXIhMKhRONiRv5JniSq1Xl6CQusVL%2F2UFqMji81ltMEiWHGYpjwz9zawZd9ltPc55AyRNq1YvsQiX34gEwgWprJPPdHEhFyhA19RiJpZnLKY%2FNXpl69XRqPzeH4GVi9A2Puih3gZzCsgC0PR7B4O4L8yjs6VM8HjDC8LHNBjqkAX9MvjV0LeYJ3ouOsefPsibjdwn4Vt9W40Vq8TBD6wuBy0foQ7Idtt%2Bt1Y2GcdndCgs1BHGVNFfByD7E0XL%2FSGZX%2Beq0Xp8tdF%2FXMfh7RXhOl1yvaKhXvw%2F3HSM7yr2Iw%2Fz%2F7nx6e2GwJbhUpZtCkNqKjP09XzkwrYjyl0zDRVeKoMWmiJPTJHHwMzNOqOk8iJWMFRIb03%2FhTL4SqdWbAzsoyVHJ&X-Amz-Signature=3dbd838ad473d4c81e6beb8d416daf357315fcca3410ec370df3348f97983444&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFGIKN2U%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDIhpE7ZJ%2B90AlIf2PLlFfRbW2O%2BXuHdlpih7Jir4uHswIhAIVEOd2x0LR3Wjxc%2FxJ9vnOUe%2B76FHW27X7%2BYegPeeeGKv8DCAQQABoMNjM3NDIzMTgzODA1Igx%2B2LAe%2FH4skiVToZMq3AOzcafB%2F3VCYMQSxU9J2cn%2FWCXUthHNM08BZ6fT%2F4vk7Bdbe7BrVhijGM9V1saCU6yPmWCBKIuhdE4eEDX7zNQhNUx1gCOnavGMnPVDRFPAB55jH50ovSOmExTrPxP%2Bk4ZeNV%2BNmXkezYX9bksm0OYdR7Z3Sy8Nzaj52G6xYdKrhcNvwi5mCn93mUXb6Nj%2BwoeaSO2fik53dXGE%2FXY8SVVMFLJr1G%2B2idLJo7uNsC03WTfE5x6b7oz5LquE3%2FEHTprkWRly%2BO0pwbEXvJv9vRJv7a4u9a6VKj3ipKE4Z7H8NYSivmxM6NTnYv8m5b%2Frb%2FTuqGConun2Vi8uZ2WViQdrxNCdhoIhOc8ZRQsKjWk9gH%2B9R0CX0s%2FaCx6ApMwED6fLxgejS7Y3%2FEpF42UAv94ZHD0Vzoz%2FnpjAYGZW9EY0O8zNViCfzRq49KLnwkBHiXuJf5bcC78TsLTKXtYLjrO%2FR%2Bn4JybjP5VPhgr7QJtaTcEmivxc1HdLFdOfRJ6SMcjuFyXHdCk47MdKU7j6R%2FzRqr08I77N9507ScgrLDg7dgnT2sJFadB0YvowGyUiuNCEei5SZRgvKj8IMDOvgcKFOCL9GWhzjvud5CL3q3PjggKaataOz5GJxyRJ7zDx8LHNBjqkATgd4uCudbB5x3NHbSPqqHhEQsKy8uCnlCtJI%2BcsPJx9p9HgH3C15fSiuMvgC2E2gKp%2Fks4ei92G0G2zzT0McUAOk8fqKaHbNq%2FBCBid9u6nHYDFu%2BGLWcpkRQ5wL%2FBShBDgC%2FNrzxlzpQwGz5TzYhdqyFTsgD6GHuR0IH7oxgW2BZ2inuL%2BNuzWy3No1wc5haX2FMnt8s7mD%2Btn3li%2BlnHU2igY&X-Amz-Signature=935cabe30457c952f877949e8981e5d167764d0fe71f8bb9e45e3ca821e66c1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHDUR7XC%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQC9jIvkgsni93AgvucYUIQkk93DlkPrrNQenHPMdyZmBwIgapoWVmKbCxXbTMWWQRGCT%2B8i9M%2BWVz0N4wAhaO1whsoq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDEIORltgYmYANsD3LyrcA6ufL6rcGe5QxtZDwMyDR1oowPUB8zl7lT5o55UWCmzhBxmpwL48%2BNDone32t4Ldj8izm5KVeapKG5Dy3d%2BmhyQ%2FJwuI2e%2BM9FWhv6MeJy8HOn4auiCoF9%2BHJvP8EC9DG0ptIYnMmhwaGLp3f7JSYC%2BysfqNa8eFppSd6On6n7kkyHf7zc9bJxtECxQZdGfL5kRCAL2lJ6h4RvuqCl4roPard3XGAlOG8QzA0653RN6CE7mIrUtMArwcJOoJd%2BFC5wS2y1eYI2kcQKy%2Foki0w9br1A%2FD8tReu1PmiMHpvRX%2BUYvp3CayyeWhQS%2BJyv10l8HYRRk9NTTJWY4js01RIXgZ0qHGNed0%2FWX3VU%2FWxxeUmOe8hGWQ0sgiulgNsmD3u9jNBKRBbhLuWpxapKN6JEOkB52nrchcQUal0VmoAXtqYek%2FsDJcEeuOIGP6gKMe%2BFyzYlTHkGy1U8%2BfWpSg9cprh4v%2BYKy2qbHcb1hwMABa8I9w40W0ipUPdAJXnT2bOnH19%2F9%2FCq%2FDEfTtQ2XJRJJDmbmogxWAMXp3nY5At2GTa%2FFmoOBlcZBckwjxGVtr95snymP2XPh9I%2FT5XoEMwWYcseARFIddxjbwdfTxk5VsdIBdx9SA3n6ouZcNMLPwsc0GOqUBwtVNhPgusTAcHW%2FlK8IEQfl8nz6QWPr28dQ9NhEFUAqQVpozILXqvVeTHhj4HcMaXPHAfiyViQfW3BUKwYjub5OCtovF2FoMS4cdWN9BXsI3PAr%2BD0DwEkUcXJN21kJ1izodiYRWB1Nr0lErXJvxpx%2Fcf%2FuPYIaI6CiGzUZW2DGsWsdMDbqny26b95FgWniu3bNwpYJirUK3uVvScSMfUkzN%2F94Q&X-Amz-Signature=6b267bc8f59d1497140a4cf36ee61083671847cb0fd702d1691443fa9a5089c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHDUR7XC%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQC9jIvkgsni93AgvucYUIQkk93DlkPrrNQenHPMdyZmBwIgapoWVmKbCxXbTMWWQRGCT%2B8i9M%2BWVz0N4wAhaO1whsoq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDEIORltgYmYANsD3LyrcA6ufL6rcGe5QxtZDwMyDR1oowPUB8zl7lT5o55UWCmzhBxmpwL48%2BNDone32t4Ldj8izm5KVeapKG5Dy3d%2BmhyQ%2FJwuI2e%2BM9FWhv6MeJy8HOn4auiCoF9%2BHJvP8EC9DG0ptIYnMmhwaGLp3f7JSYC%2BysfqNa8eFppSd6On6n7kkyHf7zc9bJxtECxQZdGfL5kRCAL2lJ6h4RvuqCl4roPard3XGAlOG8QzA0653RN6CE7mIrUtMArwcJOoJd%2BFC5wS2y1eYI2kcQKy%2Foki0w9br1A%2FD8tReu1PmiMHpvRX%2BUYvp3CayyeWhQS%2BJyv10l8HYRRk9NTTJWY4js01RIXgZ0qHGNed0%2FWX3VU%2FWxxeUmOe8hGWQ0sgiulgNsmD3u9jNBKRBbhLuWpxapKN6JEOkB52nrchcQUal0VmoAXtqYek%2FsDJcEeuOIGP6gKMe%2BFyzYlTHkGy1U8%2BfWpSg9cprh4v%2BYKy2qbHcb1hwMABa8I9w40W0ipUPdAJXnT2bOnH19%2F9%2FCq%2FDEfTtQ2XJRJJDmbmogxWAMXp3nY5At2GTa%2FFmoOBlcZBckwjxGVtr95snymP2XPh9I%2FT5XoEMwWYcseARFIddxjbwdfTxk5VsdIBdx9SA3n6ouZcNMLPwsc0GOqUBwtVNhPgusTAcHW%2FlK8IEQfl8nz6QWPr28dQ9NhEFUAqQVpozILXqvVeTHhj4HcMaXPHAfiyViQfW3BUKwYjub5OCtovF2FoMS4cdWN9BXsI3PAr%2BD0DwEkUcXJN21kJ1izodiYRWB1Nr0lErXJvxpx%2Fcf%2FuPYIaI6CiGzUZW2DGsWsdMDbqny26b95FgWniu3bNwpYJirUK3uVvScSMfUkzN%2F94Q&X-Amz-Signature=bffeb1c434a928a919f78246573e71685dc803817c780ea4cb32f268dc5d73e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636Q7Y2UP%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCICgOPW7Ua9mmr%2BO%2Fe7lj5UpfQ%2BbxfvOHPRnsDmS50bN6AiBfm%2FErnv8pwsieyDMUfatdnkLZN2cbOmBqB7Yeybh9SSr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMwsNRLeTZ4%2BbIXN%2F5KtwDlXulb3YZk7dc20zRE9emGJvty0YGOSpulEDIs%2BbV%2FA9EORac8DE6g2MB7Gc9kxiXv5xUXfbuyCteSCZ4In4nwWG%2BiQlLayRu1D5QtU9S1RcFRwUKu5RAh5hmpfdNVhXovr9W5v%2B8NIR62Cg6etBQzyRfJd4zN4mYe4uOko7g%2FkRhsCb5dLkRA7Y4sHZnPM2wiUoNbeSD1KGloNutEak%2FQ%2BIFO5%2BFjIFwOUjgZYW7spbV991dKe8LR7G%2Fcq0VZs1DfmvN5TylI9OrrcryKcaNsIVZYnzkUasTziumYuw2cLvgmam%2BUocUG9%2Be%2BGt6YjUKSkN5C3VRbHKHuDQkL1WIVo7nypaEmGKiiSyMEkq%2FtKKIr%2FTW0XX4diWtpVH95yVwRdKGO0qrwrpm6Wdm4ikF32CWew7WFMKkGE22jB5VnQNtFKWSf30GJ3z%2BxxOZ9Tb6cQuS%2FQIvPEdBM028zsCmmDNFkrllTfSBWu6eScQz%2FfT36UyQASu%2F0mwvU6KP4v2fMqp7md9xO7OhKCyEtvcoz8NGhWRtTcID5%2BHXMCE9eDYqKA0rEchOqRmjQC0DERUtH0vO8K9RTcoCRH5l7b1nItMobMuKnjuuvD6gq1MrF9PmjMuReCUk5W2gHjgwsvGxzQY6pgEcGAOm%2B0VCJp3AsCUfB9oSZ8IWeHLjUVeD5%2FOImSwa7m5H8j%2Fh1e%2BGfncoYqV0K2AWeQ4lE43ypGhcvigi0VjEtRHLpoza5lUKQaH9tb%2F9uDr5%2FBPpVgHdEVTek9VVKU6TpNYPqxbYrQ5VE0F%2BHWJiQRpkOnQ4BQHUKHtwxiY02lCzlfDBv%2BaOV02lv6wiKJTP%2BY7oOcn3LxLszfFywmazXvk0xZ95&X-Amz-Signature=81c268cb961fac8f9d7300381ad2e5a06a61286899b2b83352e3663a15ae4dc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV7R6VZM%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIC3RGemx60i80mLMs4%2BMDCepdy61lMsJmoHzJS8X7UiWAiEAq4jMMTpZcTOToFou9HKeCQgQZ%2FWk%2Bn0BmXIlLLDm8BAq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDNxNaL60dC%2BMDOBwUircAwrb%2BlvsmJyadxztgXnkMrOJPPbPk1X70kOQYvTBW0FZV%2BhNgUjqc3M%2BuTKKNjgW5xG2Td8c3Lbige0MYC59ybUEA39GQA9sA0BLrH%2B2u4VP%2B2hgWmZohpnTAt3DRC4%2Ft44F%2B8es8jLhe6oXQizidZHxLPedYFqWj67NCetZxBufxPKcjFu1jEvmiXzX8hALdceNzoe0z7WmyLBFFe5v984qKJvsYzlexjjMYArAEYa%2B9PiXAtEtn8hyC6EwIJJED69pttPcf4Pjl836U3FsfDxFj1xcfgSr9Mur%2BfxhRKsjh1u6YaNxM%2Ffb4TmroOMyAuzOmVvc4FSAW30xZUH5xfYpDVsp%2FLZVVJDp4hgr%2B2hiUeNSi%2FWI4wNx6oWW7lNtHv6RXOLm4skg3DUEIl50WAjWWpGoXlA9c1edzW4%2BmN5OvWVpS3O9H3%2BF9arQvwpjb9OKZCRx1OII1ge5YRpYStKVzsxDNvsPF9ZgwcD64dUuW1pJbzbJ%2BvdNgvdv3In%2FBnrNNfiR08huV4kbXst17uz983vefUwD05EHjN7K7I4f%2F3oT6Cgf8fhmhwrKQxAPRojU6BWdKHVxkX8tf81ZTrd%2B4XpQPJ0uhBkH8guSExZWYYhKxk7zIigs3xHyMMrwsc0GOqUBsTF%2FSWr1Y4amJ598lzH5z1eiFFK%2B93pLgucZIle1bqlY2fbt9f%2FfDIQ563sjYFo2M1veCRpi9wx%2BJYVQLtlx6%2Bc%2B2I7OlE%2Bh6JjAXlw2WyZfG6C4nMtmC85hASez1wEjli3pAUq1qOWfp7lseIPxvSmV%2BGoW3d%2FXZajoLPkU%2BZBFXZsTR6lREya4V7KlduprkLdTQEDb0VPupxY0pKHBtUMTkqmH&X-Amz-Signature=5eddba943a94bd8cc324dcdf1d34a683ad9da14e6a0c7c52cdbf7cae0e57e517&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV7R6VZM%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIC3RGemx60i80mLMs4%2BMDCepdy61lMsJmoHzJS8X7UiWAiEAq4jMMTpZcTOToFou9HKeCQgQZ%2FWk%2Bn0BmXIlLLDm8BAq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDNxNaL60dC%2BMDOBwUircAwrb%2BlvsmJyadxztgXnkMrOJPPbPk1X70kOQYvTBW0FZV%2BhNgUjqc3M%2BuTKKNjgW5xG2Td8c3Lbige0MYC59ybUEA39GQA9sA0BLrH%2B2u4VP%2B2hgWmZohpnTAt3DRC4%2Ft44F%2B8es8jLhe6oXQizidZHxLPedYFqWj67NCetZxBufxPKcjFu1jEvmiXzX8hALdceNzoe0z7WmyLBFFe5v984qKJvsYzlexjjMYArAEYa%2B9PiXAtEtn8hyC6EwIJJED69pttPcf4Pjl836U3FsfDxFj1xcfgSr9Mur%2BfxhRKsjh1u6YaNxM%2Ffb4TmroOMyAuzOmVvc4FSAW30xZUH5xfYpDVsp%2FLZVVJDp4hgr%2B2hiUeNSi%2FWI4wNx6oWW7lNtHv6RXOLm4skg3DUEIl50WAjWWpGoXlA9c1edzW4%2BmN5OvWVpS3O9H3%2BF9arQvwpjb9OKZCRx1OII1ge5YRpYStKVzsxDNvsPF9ZgwcD64dUuW1pJbzbJ%2BvdNgvdv3In%2FBnrNNfiR08huV4kbXst17uz983vefUwD05EHjN7K7I4f%2F3oT6Cgf8fhmhwrKQxAPRojU6BWdKHVxkX8tf81ZTrd%2B4XpQPJ0uhBkH8guSExZWYYhKxk7zIigs3xHyMMrwsc0GOqUBsTF%2FSWr1Y4amJ598lzH5z1eiFFK%2B93pLgucZIle1bqlY2fbt9f%2FfDIQ563sjYFo2M1veCRpi9wx%2BJYVQLtlx6%2Bc%2B2I7OlE%2Bh6JjAXlw2WyZfG6C4nMtmC85hASez1wEjli3pAUq1qOWfp7lseIPxvSmV%2BGoW3d%2FXZajoLPkU%2BZBFXZsTR6lREya4V7KlduprkLdTQEDb0VPupxY0pKHBtUMTkqmH&X-Amz-Signature=5eddba943a94bd8cc324dcdf1d34a683ad9da14e6a0c7c52cdbf7cae0e57e517&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QP4DSN3N%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T200103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQCnitqO8uRoRFjKEsMNjZ3kqCTkV4PNUrftWD%2F2Eb59KwIgHG6kuukYVE7tzX2CWwUbpBXVzFwGFJbSFgxlR6wnltMq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDIHCs8%2F3NC4JXdnMLircA98ueaTH1KjEkeYRFVJ6qFPariIsCqPfeTpJtm3WfQO7K5QJ2674DJjQMVCc2gt%2B%2FJzvGCZ6fB2oYPrskCOMC999IyDfUGjdCiqrVomIX8wkfYtA0dpGuKHeRe0WzllFAZXDSzlW03V1bZUW7s58S4SnWSKC2%2BYLTiEPJ7AQJhIjRin3bdd4%2BbyeCilIDRoeMk9z1TZFIG33ZSbZ%2Fu1txqjs8TP2ExufHmBMhsep7I4%2BCq58Zwlkgux%2FYY0429Waajsl%2BpA5Byb6USurWbwQ%2BfPvOyXm1%2FSWCHqb6ZV2ZAYoPt9Gyilm0RybjoFgsS%2F%2BzHfGzP5xDDcM4gX21YnErteTyXpJxeN95V6ZQ6Zk1YCFjyd6YUQKdx1GGi2hFpLQIayGFzgX3YAeQcyH5udmftA09Fq5rCI4WAvIoLd5UAWw5rz1UqGbZp3HOEhacJqgQnt%2FG4sqNW%2BHjhTMO9lStpx8O535oCXkJUjY3m4Pi%2FTKn1xFDEBSfG7rDPGKbTiwbKjWFg4LY9SRNEsLN4BnH8gl6vn50hmtrUr87KBenNRKNpqBVMSjLpXiqA64POH7E57vxAOmkWcbT%2BX4czHcHUJ5qzolOihkVJVXtaunuyMvPF3jw5SQzl6AJb6vMPDwsc0GOqUBo08x%2BCR1wQa3sv90QxXtM9B3DKxyiJNd3TSf0dl8pxTxLuiQKkGm2X3gnxkZ%2BrgJddP%2BgDyk6A6XyzBvPMqXft58%2FehK5ZRAl4%2BIWDjnHNUuAIsCvRfG3oIcU9ou3NNuJZ1HpheqPmwdF%2BOlvNZzG0VYC4%2B44eUbSGVj23LKe3Db0tR%2BDpTOtY1JXq84q4ts5KvlDxgFIB%2FCoV6xorNzfVvOfQbm&X-Amz-Signature=4507becadbc91bf72e487e12d781d9ee191b72b416ce86d8ffc28c46d4255b34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

