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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEXPCMPG%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQDMXOC6BuDxHjL5J5vpmcIIZJ59UirfpuiV00rKKWcUtAIhAJSBiS9Jgd%2BAOVoBC0KioL0Vcd64Pwj4uByrDD10irPfKogECNf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwO6NHVa1aUPfaQoE8q3ANnr6oMRm9KA8tMIvBg9Js4OOMRrNJLTcMiixAO6UxE%2By9F7phRm3oK2FMSMNCk1sZ9joICwAIWQstiX7LuCTvqTdmXvgPa3hv8jaSFo7VvC5WyVdCFZdvvf0gTQYMjKx0tH%2B7GqNPzTWGKWaRlvrOKC9OuOzpDsho7iEsT53KAabiCe%2FPLQsoJTDwGL5057RfE8JZc8EIm3o%2FHeBWN2FLOCWM5K13clVfwXYYSrMzog1nsNVELAp8GVid7yxNNvbo0OT3BcyWuyaAuxLq9jv0d1IHFjzXjCszlXNQ5jKVjCaLNpH%2B1FaoCFC3SS%2Bqtz1KqSKeZWJnAuJL%2Fc4oVh7CSPb1zGzpiqf%2FYZ%2FH3XV4WPkBfuZdZfUlUQyLpvg6J8ifUbIh3Cve5I9XYTWvebm54ehzcQdsD%2BN3DKw2v%2FB3icsvOB6jCbkOFhJ6QUlydnfByN8iYtwrl3f%2FAX%2FWfucP%2BH66dQ2uOBqEpdXU6GUjNj0jzoYbTLBBzRxJoWAZh%2FMpiTzlZEOou89mcujR2sLBY0bWL9SmSxS%2BIUjzTXWhz2TjScDXI0rvZ5kkhIGDl5uDmFEmLl8HIArgnGcGsyaJe8d%2BQkQLUMzlXJzTc%2FAL4S4Ck6cbplZv7HHleZjCm1tDOBjqkARX%2BSAYQ7VJC%2BWrKd4pEE4xErZW89FOmAOW0g%2FYll%2F2aTzLl0ayEiHIF3wW%2F3sbZ%2BpSuHjeVdGiCSNtvihFFhW%2Bh796Z3XgjmV38bDwFfLvMNSJUnnVOhT9lV79SFLvN04ghgeHvz9zKW7y8Rws0alk0nXXDqcEAahVM%2B0DKVFKN%2FN8XA3n0PrNc59h%2F%2Fn4cyxoIFsTVSK2ZXf0lcLOmI%2BhkbXwY&X-Amz-Signature=f291d8c377af6956be33c90fe9efc35408cfa30a3e246c8e703b51dcd4a64a91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEXPCMPG%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQDMXOC6BuDxHjL5J5vpmcIIZJ59UirfpuiV00rKKWcUtAIhAJSBiS9Jgd%2BAOVoBC0KioL0Vcd64Pwj4uByrDD10irPfKogECNf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwO6NHVa1aUPfaQoE8q3ANnr6oMRm9KA8tMIvBg9Js4OOMRrNJLTcMiixAO6UxE%2By9F7phRm3oK2FMSMNCk1sZ9joICwAIWQstiX7LuCTvqTdmXvgPa3hv8jaSFo7VvC5WyVdCFZdvvf0gTQYMjKx0tH%2B7GqNPzTWGKWaRlvrOKC9OuOzpDsho7iEsT53KAabiCe%2FPLQsoJTDwGL5057RfE8JZc8EIm3o%2FHeBWN2FLOCWM5K13clVfwXYYSrMzog1nsNVELAp8GVid7yxNNvbo0OT3BcyWuyaAuxLq9jv0d1IHFjzXjCszlXNQ5jKVjCaLNpH%2B1FaoCFC3SS%2Bqtz1KqSKeZWJnAuJL%2Fc4oVh7CSPb1zGzpiqf%2FYZ%2FH3XV4WPkBfuZdZfUlUQyLpvg6J8ifUbIh3Cve5I9XYTWvebm54ehzcQdsD%2BN3DKw2v%2FB3icsvOB6jCbkOFhJ6QUlydnfByN8iYtwrl3f%2FAX%2FWfucP%2BH66dQ2uOBqEpdXU6GUjNj0jzoYbTLBBzRxJoWAZh%2FMpiTzlZEOou89mcujR2sLBY0bWL9SmSxS%2BIUjzTXWhz2TjScDXI0rvZ5kkhIGDl5uDmFEmLl8HIArgnGcGsyaJe8d%2BQkQLUMzlXJzTc%2FAL4S4Ck6cbplZv7HHleZjCm1tDOBjqkARX%2BSAYQ7VJC%2BWrKd4pEE4xErZW89FOmAOW0g%2FYll%2F2aTzLl0ayEiHIF3wW%2F3sbZ%2BpSuHjeVdGiCSNtvihFFhW%2Bh796Z3XgjmV38bDwFfLvMNSJUnnVOhT9lV79SFLvN04ghgeHvz9zKW7y8Rws0alk0nXXDqcEAahVM%2B0DKVFKN%2FN8XA3n0PrNc59h%2F%2Fn4cyxoIFsTVSK2ZXf0lcLOmI%2BhkbXwY&X-Amz-Signature=f291d8c377af6956be33c90fe9efc35408cfa30a3e246c8e703b51dcd4a64a91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3AXXGBX%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIF%2FTRWdRjcg%2F%2Fpgy0fVX2G%2BiYEI85LOFTFJ5lm2MYjQLAiAqvQOg8NF3%2BC9EOMTygmtTuyQmWevBI0uJQ44OTLCluSqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsVR%2BXKwRt5POJSCBKtwDgqJBH%2BKvtw066M8TarDUUNCCNfXzWL%2FgONJHQRaYWq1qlACb%2BNG1Vb4gBxA2KI4UqWGfrs9Odq%2FzEkK6IZ%2Fp3baBrL3Yo%2FHtrKpWO28VLxrd9YRZ%2Fdfnv%2FJjh%2BceDj8pqMKjU7cfpb%2BbHa3LnYV11%2FJwFGppQ8Po%2FIuDUNTcbexwbLgECxvIzNI9osbQozduAbeuNW%2FuJpPiMvIg25Ij%2BQJ7NcCvP2Jzh1wfCo1y7TNHV5R4DAJR6%2BZvWCDeulx0OSG2a1myvS%2F74tIoWxbVRWhdBCoL56aulvLPsDPMqpyzeRdLUfEQTXxkr12z%2FEt2UdJWlt%2FBU4Y1H2O8u0M1n3efCA5wNnFUC8GNVWRmfVy0Fa5xupfJH1%2FsG4CMSw3msnFnzuuCv7yKcq0%2FG2f0cTGd9Q6i5cAzVqlIJhC7AbIhk2iw%2F6%2FXwxWw4I0j2j1sbFUYSyZxe2%2B1RsvJTuIHXHR8KTEGoWhvg8urVBmDE%2FlvQ1ipNy4bSyCoxg4LNGprgMmWKu50feTSETJKI7IN53NEjzIjZ%2B0E%2FNTZToWtK%2F%2BEz4VAmmC7g%2Fqs8IlzKtL0naiylxj4tknP3KtBtFd0pHc2NUPAar6yIV2leSZ%2F570vljoV4%2Fr%2Bx%2F8QBToww9fQzgY6pgEhoOJCEIOq%2FQQxBsrNe%2FLHueOu0B%2F57q%2BUgsWnv0FaZhnh8g1geWXuq5jpq4LjzLWEjOxXfu8%2BrpcBggX4l0L8TiWWGagLxBOF1TZhXY%2BT3m3hfCocZXi9PQtZCfWCJ21h3%2BJxVQStdur1mM2DtSWXn%2BYCObTDPEusobAiSyRhcS%2FkkCNWhSKc1FCRZgM%2Bkf0jwBySbNSqdVxggs08BAXG1PBJEahF&X-Amz-Signature=49b13032319fd5885bdb49c4c8590f2a1b093aaf779d828c1e36a9727fc7f3b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZGP3LP7%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIDe2hH9%2FKB1cn40nzm9N1uTIGf0FNc%2FOe%2BbHiYoEVNMiAiEAwJ5VU1owrVzjGx3g%2B1X8jHYDEHSK8RN5mJLh%2BcNa6aUqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNYUfLH4T4JOumJkIyrcAw2b%2Flsule7mPkZ5loho6UFKkSkKJffyMFPFiHbQEjbOr5dJdLgT9eRt8shm7DgXfXcYPUZojeSCjQ3jZoYJ8tOl7pnwkXvzloibaBanV%2BQ0tca5Er%2B4EYnaG3MgBbH%2F4k1Yqz4f%2BPTfPnxu33XHpgcz%2F6xv5AXBoqnUxsGp76EdA5KSgUWk%2FGT4BihTDuBJU%2Bmqi2DC6EcYT26Hh7wvg7%2BKaRxHaxp1C52vlKB%2FzV025VO1owW3jvx95NZTjacav9eiYKgf%2FGZftVpV1LIHxrTIJz25m%2BDyyTcDVbYKEUZYExVRoeON6kXmqmTfjgkuJAFpxYJunRIitVbs5O9bp2GPdt2%2FtItM1A9PEiVpC6GWEZ8vTQuAdC%2BF5Od7pkvsvkIpMlDuZDy%2BzEZlH8bTJ4Jpe7Eo4bVSI6%2FR4lMjE67A%2BVcPrAlRgrHuCser7u0BM2ClVg6jwxD0jhHVB6FLCRNOSCxKlnJgSzBDgPCvCnFavVhbTK866DVYU7f99AEB%2F1OMvoev67wDCeDbSOCBO0j9aQmwgifR7BN7cPKnlErtO8iYUhrE58F40WsLCfX6q4jpnhSwiTG4x%2FXuuqT2g6N1WR1zmPa8jzL48l0eEJ4yk3LdyIrjPZ0N6ROkMJ%2FX0M4GOqUBo7%2FSsLOu8pjH7ZQrH%2FzU1BUGTeLUhhoPXia6PNCPJ1IaJck8cW8l4VqDGCB7%2FiEAzXY5RcngLE3FIybe3RMqMhmwPP7KV%2BYoEqC7kKdR8vkBl8MzqLs4p3m51uffLkazQASQ13%2Bs0JJKedQOUxzvsXXVfbniw2ZZ%2BPfRx5LGR9Uc7MzHfVpoksOZY3emPqu1XKgdmhvfv3Vc53SU8zgbaHv1U8TK&X-Amz-Signature=0280e358df54c2dd7e4c7075063b9fb8f60f75c2aeea9ac417e7c5d2041ed416&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZGP3LP7%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIDe2hH9%2FKB1cn40nzm9N1uTIGf0FNc%2FOe%2BbHiYoEVNMiAiEAwJ5VU1owrVzjGx3g%2B1X8jHYDEHSK8RN5mJLh%2BcNa6aUqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNYUfLH4T4JOumJkIyrcAw2b%2Flsule7mPkZ5loho6UFKkSkKJffyMFPFiHbQEjbOr5dJdLgT9eRt8shm7DgXfXcYPUZojeSCjQ3jZoYJ8tOl7pnwkXvzloibaBanV%2BQ0tca5Er%2B4EYnaG3MgBbH%2F4k1Yqz4f%2BPTfPnxu33XHpgcz%2F6xv5AXBoqnUxsGp76EdA5KSgUWk%2FGT4BihTDuBJU%2Bmqi2DC6EcYT26Hh7wvg7%2BKaRxHaxp1C52vlKB%2FzV025VO1owW3jvx95NZTjacav9eiYKgf%2FGZftVpV1LIHxrTIJz25m%2BDyyTcDVbYKEUZYExVRoeON6kXmqmTfjgkuJAFpxYJunRIitVbs5O9bp2GPdt2%2FtItM1A9PEiVpC6GWEZ8vTQuAdC%2BF5Od7pkvsvkIpMlDuZDy%2BzEZlH8bTJ4Jpe7Eo4bVSI6%2FR4lMjE67A%2BVcPrAlRgrHuCser7u0BM2ClVg6jwxD0jhHVB6FLCRNOSCxKlnJgSzBDgPCvCnFavVhbTK866DVYU7f99AEB%2F1OMvoev67wDCeDbSOCBO0j9aQmwgifR7BN7cPKnlErtO8iYUhrE58F40WsLCfX6q4jpnhSwiTG4x%2FXuuqT2g6N1WR1zmPa8jzL48l0eEJ4yk3LdyIrjPZ0N6ROkMJ%2FX0M4GOqUBo7%2FSsLOu8pjH7ZQrH%2FzU1BUGTeLUhhoPXia6PNCPJ1IaJck8cW8l4VqDGCB7%2FiEAzXY5RcngLE3FIybe3RMqMhmwPP7KV%2BYoEqC7kKdR8vkBl8MzqLs4p3m51uffLkazQASQ13%2Bs0JJKedQOUxzvsXXVfbniw2ZZ%2BPfRx5LGR9Uc7MzHfVpoksOZY3emPqu1XKgdmhvfv3Vc53SU8zgbaHv1U8TK&X-Amz-Signature=1c5eb68541cd2d43b5cee053fcbd6e56dd2b43af9ce481485204d55097ea23f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667F4EOBBG%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIQDm1MsB1CBJtVMsj%2F8CJUafcXuaxwOjBV9wbPVfQJwNsAIgHb0PSCyvljU%2B6l%2Bprc1t%2BRyhFd1VU0DR0kk2qHkTnoIqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEH5ENaMUkAtd1%2BpqCrcA9wkPTg%2B08QJpU%2BgecEAlQ91Arif7bVthR2hJhWwykpEPw9CgH3RGohVebEjJZuWGiszTu26YbemN6UUL3NzaoxXn5qWD9GOOhHmv9SJnXEfW%2FdI3b5VOUO0I6mC1fBAoZTjkibbcEMmBs4Y%2FXmdtaTYmQ1fD5xeFsrzkZl13ZvoIH2E%2B24mebTmAaGd823f3GxF5iHuPs9QYQC90ddIAiWnhRzj0UOg2MZMjeS66AF2XRl%2Fg0J24wrkWTSXjHDozdx%2F8KvYxHg%2FGW4QVhJpjVIvvQIvbAQ2wPAehfhwUDR%2FdR%2B%2BkgBs3kGK3hADphoseovlBsnKjzcsA5YscBzMgJGBARO2GH3Dcgol7IOUhnZkMal%2Bw%2BWU8MB0kYk7kBmqB9iz9tAKtGyj6BJgPEoob8LjfjBEC%2BX5%2BE9dFigBX7Qe1c0au5FhRtnRp2%2FimvBDPK%2ByXvzkf0HF8YwwyCWphRpkoC9PMDU0QKojrfRxUhXNzXgO5fIMjrjaU2YYZ%2FrjysLDq5%2Bl2oRpp7aBgcmEExWDzN0mBYTUMPFXGWedE4RBwKfpWCXMdX3ShqJVMJdfX%2B9TRiNeJEYnbuT9h6qvUsZtk2%2FJqFgGSHavxsGoLGftyRlIejgIgBeySA3qMM%2FV0M4GOqUBTHUtqFNHhTqqcIyEpXlv6yOwELyMOmxk8nLpS4hvbamGbDrTZBm%2FkSDkGYCfXwoqpdse7Xgzwi0WwUK%2FJitnCKaujLU4%2F8xjuRiUEt8kU9D%2BtK81Lkm2YnTt9M4lUne1yRbCc1vRi8pZLohJ4uLIMMHN97%2BG6zloan4z9UkWamT9n6U3fRuGhLNQT8TPxKHNKjlfaKtLIz0JJxIU77e9tr7pA8PM&X-Amz-Signature=2f37baee4dc299298e051cb3eaf1ea3ddfb3b5727dc70168f587717448769b1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MLNWHEF%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIQDN9uudjO4oY3qiTyUqYPfV9WDH1cXzN3iD3NXMhg%2FAZgIgMIXxoL03ZvVgCw6iKwgSMVY9p3POT7hpoWCSwsMFVW4qiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE6GWXLBstoIbgW3MircA73qbDwSblnh8ICsImPFkYge4FIAZq7G2%2FQ4%2Fz%2FCj0DBqORyuR2sfUbzOPCUtaXge2ZNYbh2l8GO8eauYCI2esSL8K1wvpdgQ6dWeSXGOEaRI7cY%2BkLxkqoenyY2A5X5%2F2tKYgcKFhCBF1C%2FJC2ZIsI5rf8X%2Fq1Oljk2NIp4jMt33h31ClMhinBfGUwStVwCVisr2GZ2pJvToacioyKonSb81d4mztLU6nVg7iscFG0PzKXOclFb3XcM%2FZCX42Itww0nnnUdNP1wXdfZ%2FbyQJVxfqr0QwO%2FlFpi1szBocxVOw0EEXyUQz4uR9W7SuZl3qk2MsPvuTJLXNzcW9ZTaX%2FoKix%2BD%2BNYP9aFaOnAxLZ4koPoKn6J9kGdrGT9YzpcZmYp2%2Fqt1XSnEo%2FE1wtUyemXmZZVlBFck0yZJYsc2DJt3wkFnLKCufD7zdYmM8iYWKQkkF3rg2hzOlrHCtEevwGyfQT8xi17AuVTKCJh0Lupt%2F1IRoePH%2BgjsGU8D1k%2ByjmNYpgHMpl1okOsfjgYGdsMNWY%2FByvia4Siz0ShhSzsbjRRXtZv1J2690uTeafA660Xdy4IUbr8%2FnKgbShdKlHv7j3btg8luvjYLJTJvLcFZAiudD4KfxicuxhXpMNrX0M4GOqUBDF1vEG92ok2GqUsuIcoO09auvWr5A5wK1QBWL22Z9Bfyp9OiyFS4iEJ6hxWeGEkgus%2Fqx86baBp5OMPNnqgRRBj9KqHzK8XbkQhzuf2%2F7bEwrlCeDnDhw%2BmZRD4Die4C2ClCZ4oBVK3%2Bv%2Bre3L8CJAe056sEvJ0uyiIWCTTKNg6AopfopCZkhxk8WnahTj13scyccywHvWM5BYk70Buo7BBUuIeT&X-Amz-Signature=4946517e0344ade0661d16e80b8027393de33317eedf055bab0224b1ef1f6094&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV3G6DL5%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQCIjSpjq67g0dN2Y%2Bci3eXtA1eF1fFmSlNaXkzmcyLzDQIhAIrmOdQsN8sp9RiKPwKvh%2Fik0I3xxjjiQC2uUiaiIxReKogECNf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyYYlyt423SgmDEtsUq3ANLwYr%2B0jJsP9eIfhF0iqxNwrK3azerMc1RcbQvqrUhEuUSHn25u14a5QHOkiVMMHlgRpdX3MdMhlRiw%2FPafq3MCPVQrG%2BcGu9Lg6FbDGiv9ZKKLJ%2Fw12K%2BPmJ%2Bst0lvGDwwxTu%2BbskeUSEA2qc7uCRQ4D%2B8xuJgVZ6NUgAPbM0PQKqJ311V72jmVe4q%2BqfTMZ6BsXFRheUjbenwFnG%2FeOmbg%2BEFRrzI2%2BLYc1FkBZouyUXCzGlDzRqFY%2FfPrwYBIKuunKf2Odrz2udSC%2F3xbZsNwgTWUMEETpBRMMUn8KTJeqJwrZKUF03A1efdhQh1EJXU%2FLVT8pe8XowXqAxJJXEgOzzl425%2BCZKxnYot0%2BRg45%2FGtYZ1qILOA43bw%2FH63U2cFbVUmOchBUusera4MPIWJJucpYD9Fq78DVu089K3LpC0xBj3ANbqHJKsVgFnRK%2BU5YilUKqVDQh%2FmZlV%2BVdzPcjmtVAkQB3KUVoDO2IAXdKadVS8g%2FArKWAG7DzvyzwARZdPZOvmRKO4Opg9vtsuH3ACE70PYjn4pG8sHUothVNnnCJ9k%2Fksxnx920fWvp0l%2FUyY9OOSUBY7jqk1DYgz7JYJu6XzXdbt3lE2QkYXGKaVQ5SyTA%2BufawTjDi2NDOBjqkASl5tIUqINaqXczgxkaC36K59qrujU6B6SQ4U39u4uiLDuzfdFYB9czYDBT0rrYZ65lrLgAl70eV3vL8GGTVKOac0qFONuL1SuBc6IsrnhzX%2B4o2wCRqhR4HtancqOxC8z7Hc2WoU68uiwxDgUL%2Flznv4nU%2BOmViFMVjQali9ZlK2c1MtRFV0eYR5hrt8YTk1JjrOwKzdDTGU5DlqpgaLIMN3o%2Be&X-Amz-Signature=754fcc70e3a0e5b0bf9cddd248c7df13bfd4d0606bd819a31797f17439684662&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YVSIYHB%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIDDXkYkEcVdSindsY5W68VfKOoSGJb5AovXGTQ1ML9UIAiEA%2FR6M9u0g9mwxtJixtKhhxqiuHW5DnnrDuQavfaL7%2Fi8qiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJxAUUrS%2BNU7JahASircA22gRy0Ww7wri8W20rRo39LxzU54AtTEmrOkeC78ulVlAlw6i8rdwE0lDXaDBrq4qiEnl2TmVMee5oOzlxl1OmywEkesGKJD49tgnCujLWqXqRrErVR7MQkoteBsFw83ThYlk6PiIr5FrFr74YEo4DI3ApjLe1jzSWTfq9wdh6L5nJHzpit6taDpGR5P6dhV4AoqE%2BeVU2DK6uxrSaLrK5DYa5Nw%2BPykrcefxJUxQAWZmVHPNVVAvJpMJ0TGrPideTqIhkqJMMFBeiXvyMK2AqrR4ZPY95PJv%2F6pkJrduCNkk2sVfrgu2f6%2B%2BTLkY5WfTz9d4%2Fce%2FalLJ2Fq5I5o0sR17xgXSDBuc1g0QfgmFAVq%2BoBz31xdgwDAyIO2z6xz8qbBtG1PLSStuZXp%2Bl2N%2BigGYGilaYjC6CDKhNLr0Xqp%2FOsJuu%2FfU%2FvM33WmrDBNWUENh09OOtWx7hRdA6WqROr54tqr83otC52hoANHpHp%2Bkh9YIdgOX37riZoDt4YfL3nguLpqIO1bBj7Jns7rNQwCfNV%2BJOrKECWGgo6AMZofF6kl%2FfDB1TcujebFqdVW6dKqs8Z4NfXBFxqvuRNb6UT25Ykhe8iLbrioufOG787oam4MlXkosfmB5OmMMIHW0M4GOqUBRh7vKPRq4BgxSRxC2x1%2F%2Fdh%2FLCgrR9tULiDReJqQY4KtEl2v3UiciUtgcASNr5c%2Bw4fiuruVjtHBcbco%2FdOHrhNpKZjYo73G0cExVR5i2PD9O48yy%2FI5DWYSqnqBf5%2FRMmFWIst2MJYYQ2FByRsE04wOENBR6GnGvdH4MNuiLIyxrfHaS0tm%2FEdfIFlyCNoM%2BlQtLRoTv09bto2RWv9jf55fR9lW&X-Amz-Signature=c877d14b7cfc40866dfe1381ab3eb77392b18b62645c6ae1549d21ae819c211a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YVSIYHB%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIDDXkYkEcVdSindsY5W68VfKOoSGJb5AovXGTQ1ML9UIAiEA%2FR6M9u0g9mwxtJixtKhhxqiuHW5DnnrDuQavfaL7%2Fi8qiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJxAUUrS%2BNU7JahASircA22gRy0Ww7wri8W20rRo39LxzU54AtTEmrOkeC78ulVlAlw6i8rdwE0lDXaDBrq4qiEnl2TmVMee5oOzlxl1OmywEkesGKJD49tgnCujLWqXqRrErVR7MQkoteBsFw83ThYlk6PiIr5FrFr74YEo4DI3ApjLe1jzSWTfq9wdh6L5nJHzpit6taDpGR5P6dhV4AoqE%2BeVU2DK6uxrSaLrK5DYa5Nw%2BPykrcefxJUxQAWZmVHPNVVAvJpMJ0TGrPideTqIhkqJMMFBeiXvyMK2AqrR4ZPY95PJv%2F6pkJrduCNkk2sVfrgu2f6%2B%2BTLkY5WfTz9d4%2Fce%2FalLJ2Fq5I5o0sR17xgXSDBuc1g0QfgmFAVq%2BoBz31xdgwDAyIO2z6xz8qbBtG1PLSStuZXp%2Bl2N%2BigGYGilaYjC6CDKhNLr0Xqp%2FOsJuu%2FfU%2FvM33WmrDBNWUENh09OOtWx7hRdA6WqROr54tqr83otC52hoANHpHp%2Bkh9YIdgOX37riZoDt4YfL3nguLpqIO1bBj7Jns7rNQwCfNV%2BJOrKECWGgo6AMZofF6kl%2FfDB1TcujebFqdVW6dKqs8Z4NfXBFxqvuRNb6UT25Ykhe8iLbrioufOG787oam4MlXkosfmB5OmMMIHW0M4GOqUBRh7vKPRq4BgxSRxC2x1%2F%2Fdh%2FLCgrR9tULiDReJqQY4KtEl2v3UiciUtgcASNr5c%2Bw4fiuruVjtHBcbco%2FdOHrhNpKZjYo73G0cExVR5i2PD9O48yy%2FI5DWYSqnqBf5%2FRMmFWIst2MJYYQ2FByRsE04wOENBR6GnGvdH4MNuiLIyxrfHaS0tm%2FEdfIFlyCNoM%2BlQtLRoTv09bto2RWv9jf55fR9lW&X-Amz-Signature=cfcc59d38abdec4893ef36bf623994a7ea90c9540cc557a5d1905829115f83be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CASDPRO%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQD6gH8PaA%2FbNZZIxh4s0PypncppuQFscSVYNxBC%2BmCHCwIhANTTp%2B1kBH2dySgVdgV9%2BM0V4R308YBnJ5wqPVJQPwQHKogECNf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw5Ap%2BPdENncPRQeK4q3ANe1TPpeexDycGwXO2XNh7igcEild6kO71wjwlOHiGRLdJ0tZ2LZxezMTbPGkwCxNsBNvJPtacQmAFvL8JTmLst%2FNVe6wf17Ghue7J8BK683gdT%2FPsEvBrydi60du5sg%2BRWvhHrLGhkYOEoOutxrhcfrVxppY1xwcC6vDxWI4%2FSLuyBsQHi%2BuCtNvvda2pvaX5i7dEzmV6HOTtknT3lqoNEUA%2BVa3gXgtq0esQhrwad3ymxNza2KYU0jfFPCvDn%2FAF0L15HbVEJEudj9O5qT6Sthzq17Z48pnqhKstngUhnjczSAEpuQfjMvVR4VcUNwFuB9CvH8OJUITfv2FJHvbAZ65KirhXMta6JeARr8JM22Slv2oeAPnKdK%2BF%2B9mziqstI3%2Fk92CFuEbFl9291F3JRu8OV45UzB6Sf2oFEH41oxWTYvVe387vdyhMzlhPDhmQxB5W8umjyLrggn1cTLGTHu%2FCLe1lnciaH22MA%2BHVOB1bduELVILB3alJrSxoobimRq8fk0HDeI%2BuywjyKDI4r3rgI2Wi9mhIKSoc3Tm9Ctj%2B0nU4QPtxvNY4kvaQUcBVYUJmXVeDxKPz%2FKnjGvOq8eOn3Zam4gaZ%2B75gQonzmXsUviC1emWbhlKzryzCI1tDOBjqkAbObfhSTmisoHEZ%2BPo3O2TfYDcmAj%2FD8Ph18CC5V8q%2FCWYScnn3Ner7he0Aurj2Er%2F%2BoaDSGymuoycj0YmPMutC7wgnWw5pBTYKMs%2BwmopemBD2AYSe%2BwyXBNtTbl%2F1mPpS8vTkBDj1c%2FGKTSyxhJhgMqOvjE0ujGvCaChNXkBMAoFuv%2BDoy6i%2BCg8FQuNk3vH9iIrQtE1CWkeXyX5pc%2BXJaT1oY&X-Amz-Signature=92cf727dbbdb2c9a4cbfdda0b860e4d18a46bd2a01c261320d1f98b639682fc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNB7RJY3%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIAwm0D%2BHnuFyScth5LyeY9EXKC3hGBHc8lrMuOxc7D%2F3AiB5It%2FtgV1IpizIjAhq%2BOlMlzhsDOGOiR6ndSD5DMyQTCqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvuwREll5dC94SwStKtwDXD%2BcBTUDt6LvA%2F05xLMiOgHeGJw8kNEo%2BhvPwWjGXnqswY1CxZ6FS%2BkeLJhi8f%2FVuxM%2BUc2gvtELrUVPMYYJAI%2BvdQuVI8cewIG%2FoZqpZU57WP2B%2FpAzXwlonoVCqXKPNUHBlCqxEqEZCyKr0pG%2BTEiBfmsKLk%2FDRu41vKG25YxikQnpR51E8RIGI3U0IeGcppuYe44YVFJtT1B45UNhotYK%2FKvDnKGz%2FpCB24TJ4jzGnF084xW%2BBXIlyRc0SGtaOD2KFehShzdCbvAcIecvXxxuhLxIDWtFsDuHzoYyA9CjZLpzQ%2FkLEP%2FVQbKj5dhv203Ar8%2FYt%2BJyDOgavfUBnHLiEl3a5a2bCE426TL%2BX0jQMcpHTl3QmSrs62o88ZciSrwo3IsRV3tualGcXS5%2FHnWJ%2B5%2FvIpYRVUyDgJLPJIFH%2BZZtdy%2BaOToV0b1xWE%2FCZfYaPGOUcMA032enVWGo5cu%2FpsX6dNDko7zoabnknu1Q8lZbu0CoeZoAGSFMUnp3sEXHI1ZEruhMHQA2YPB4OZVizg6Ljz7DcHPSPv6Maz5UzIRlhwlahzKngM%2BxFY3VLMlVXbFi7jiVQC8TcYN%2FZ5zcOpHWsRQoAj9r8%2Fhy3yHRKxGaxKQkXApu0n4w5tXQzgY6pgE%2B0yGXqGpgtjb5MZa5GESrmslYwEuUWP2oQHL8AoU4JpzIYHXdmcDeYQIaL8iCPFIzvD%2Bl%2Bbd1W7jZZz0JQ%2B%2Bola2u51RbFFpTGDCsA%2BF6zdMxcxFhRw%2Bn2jOa%2BIVj9x7ovj4uN%2BMUsqsWoeVwgos5t1MV15e97ahJZgD3JOcjDGVhICFI0tImlRTdSFk7TixSYaWaj2Ios6mKxlw%2Bp%2BJcA9lzPHjj&X-Amz-Signature=1755a980c92ab95000cc20a5ae5b68fc15723774a57ce4206b986f501eaa7f99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNB7RJY3%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIAwm0D%2BHnuFyScth5LyeY9EXKC3hGBHc8lrMuOxc7D%2F3AiB5It%2FtgV1IpizIjAhq%2BOlMlzhsDOGOiR6ndSD5DMyQTCqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvuwREll5dC94SwStKtwDXD%2BcBTUDt6LvA%2F05xLMiOgHeGJw8kNEo%2BhvPwWjGXnqswY1CxZ6FS%2BkeLJhi8f%2FVuxM%2BUc2gvtELrUVPMYYJAI%2BvdQuVI8cewIG%2FoZqpZU57WP2B%2FpAzXwlonoVCqXKPNUHBlCqxEqEZCyKr0pG%2BTEiBfmsKLk%2FDRu41vKG25YxikQnpR51E8RIGI3U0IeGcppuYe44YVFJtT1B45UNhotYK%2FKvDnKGz%2FpCB24TJ4jzGnF084xW%2BBXIlyRc0SGtaOD2KFehShzdCbvAcIecvXxxuhLxIDWtFsDuHzoYyA9CjZLpzQ%2FkLEP%2FVQbKj5dhv203Ar8%2FYt%2BJyDOgavfUBnHLiEl3a5a2bCE426TL%2BX0jQMcpHTl3QmSrs62o88ZciSrwo3IsRV3tualGcXS5%2FHnWJ%2B5%2FvIpYRVUyDgJLPJIFH%2BZZtdy%2BaOToV0b1xWE%2FCZfYaPGOUcMA032enVWGo5cu%2FpsX6dNDko7zoabnknu1Q8lZbu0CoeZoAGSFMUnp3sEXHI1ZEruhMHQA2YPB4OZVizg6Ljz7DcHPSPv6Maz5UzIRlhwlahzKngM%2BxFY3VLMlVXbFi7jiVQC8TcYN%2FZ5zcOpHWsRQoAj9r8%2Fhy3yHRKxGaxKQkXApu0n4w5tXQzgY6pgE%2B0yGXqGpgtjb5MZa5GESrmslYwEuUWP2oQHL8AoU4JpzIYHXdmcDeYQIaL8iCPFIzvD%2Bl%2Bbd1W7jZZz0JQ%2B%2Bola2u51RbFFpTGDCsA%2BF6zdMxcxFhRw%2Bn2jOa%2BIVj9x7ovj4uN%2BMUsqsWoeVwgos5t1MV15e97ahJZgD3JOcjDGVhICFI0tImlRTdSFk7TixSYaWaj2Ios6mKxlw%2Bp%2BJcA9lzPHjj&X-Amz-Signature=1755a980c92ab95000cc20a5ae5b68fc15723774a57ce4206b986f501eaa7f99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665K5YTTCU%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T222134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIQD5qZaikm3euCAWjLclhKx3udrW0NZoP%2FcdLjsBD1rMLgIgPuH6ytCwaaZ%2FNPZ1UJ%2BmiQ%2F1Y1kcwW5WLuhtTbaVKnYqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEr%2Bzgp%2Bt1HH%2BsNTnCrcA0jlrhF5Cv%2Fh7bJpmxyhC%2F%2Fwa0mF7uoSFEBZ1OvBeRnGrbGz0648Q4zcLtBnZF%2BKuFTZ%2FKm%2BsYcRCEIYBC%2FjFzzoHvzELBIl3gybPRwhC%2FG01WpRZBDZg1lPbG3n9OE3ElsuYwpau2EpdESeRolh4sZZfts1abT3tNIJPQ2WyQatZlqO78t8FIZWz7KoaCOoxWmKNswRe%2Bbfsv2Xa9onCRDL6uJvJD%2FEbjX0q%2BJgn%2BSxr0SOT0KCWYPlFWG%2FHqz97qjcfGN4sEcpsu6a2OwH%2BaEy0jfgLqc6WkxKB86XC1QXixuEwWZHmBQ%2F9V0PvIQtjkhG8NDvpziC1n%2Bfn8Ar2vojR80elWgzGgkuNNUJZDLKUOpmEwlNQnfMO%2BU38kbhdcpV9b%2Fp%2B3%2BJhuyO1LZF%2Fy2Pr5fXaKR0KyaGbLgL%2BQ%2BuRBqF1iz1lwKHsY%2BZZIuv0ShaOAXeFUgeMeUU4YGTeI0E5pHblrh1GebFCRKYeDST9KeQlt8em7asCBWDEFnySFRmqhlaZ7yMAM1sILvprRar8u2C%2BX9EN7Oyp7EbFPRKWlMIqht3vfmCydQa3NYaLbV6Jy%2Bbgk5E13sGSYjTuEUghOZ%2BP1pe9IRRnWFzBepDe0gJkEK2kQpqKt81MKzX0M4GOqUBxXfNnpIuuGVCiekyNLAupj8Ogpazb0Lz6KVdp6fXnssCF9o5S1bTrDc3xcet5pRaq%2BhzPGni%2B4PnIQYL2PLWYQSxy%2BAokXgsu%2BjpjKnhwZZMcfF1ccB3SN1XSn%2BC%2B3xrse2YtNNBqAEey7G1aA2fSQ%2FQUNNPu4riHlln8ceTOqzyv8t8JOYZzw6F%2Bs9Nwst3uWBdoPUP%2Fq0KzHB3Goyoe5r%2B1hDL&X-Amz-Signature=653581365dc63029d871ec37e6a066a7dda94511618a34b7e8da818ad5483ad4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

