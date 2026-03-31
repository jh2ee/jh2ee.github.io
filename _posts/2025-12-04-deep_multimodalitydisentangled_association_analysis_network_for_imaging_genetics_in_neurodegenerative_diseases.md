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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RT7P7SU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIBoQw4YNCILx2NdQYwCgLHshX1Kna60dQ28XzCMqk4aoAiEAxPcGtBnRwldAKBp5Xjdi5bscQCaVzzS238ELzDy3V28q%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDBR2WfsfB0eALMBSEircA8X9r3MizlESNkiam9JYMQ8d2leYJylKw2OG1kQvkS78YgKCtv4OS1Tg%2F9IBqly3K9NkYjy2E8P%2BcygwAc3pYQSrvN%2B%2BNJlW2UF2ehiMRxShjRGeqURbcOu9Pfy66lQ99vhh3EYItfdq8SNUksyMx3OUfQ2yMI38wU%2B1sTRk9O%2B337OUjLcW4%2B9nm6Byzef8UraHKHuoMXQ3kTNHBN37Gfd%2BCT%2FtsAzjVrRxncagaI4NYva957oul9zh6tuM3CqeRJ9rVP0ikbKOoPqSC7P%2FOccJD%2BIM3TMKulg1seu8RBcIoY7LUQsJoT8sPx6PPnyFgyu9Qfy2Ni20%2BpKTtYkbp4q32O40YAwhslqKv6nOxuBWooDtkTant5zvaJ6US05l%2F%2FmrFwUncJhb9Ax5C1uK3cfn0gFBqoMc9pkXQtdkMDANO4%2BlV2jB33mL51kOQuyrBV%2FRnpYH7asuws8%2FE9rVdNo3T44JS0RG5fm%2F7Fx2Qcr7J1ZbKnWbSqIjqLAPLhipyT0aNh0hhhc3MiWyHzod%2BlFdW0AvGz3ATplL3yj2uuYP5pVvu%2Ftk%2Bu1uKGi0IxbD7G0SFLD8zLJHB7LhiGi8S4bs2rqhsvlIUTjkQJW91Z5WXCMQCf6txWfdFAj6MN6NsM4GOqUB7harQ%2F4qra7%2Fo1q3wWtoLmkBWclboosZY6PuTrP4HEFtCtObZakYKakee8Hrap5DtdlH14%2FnZKQVkHxIdCIELcm1u3Ph7l2lD2toJ33IennE9ImDqKN1QD%2FjZiBiTEMGZ0Eb1csx4u0oen0GCxbMc7uXeiWGXYmmQ5PzsCahHGSj7EJrLE1ZNe9feJs5EthYw%2FVl1vp8oru0uOSLlQwzVICrbJL7&X-Amz-Signature=2110450535edee672b2787c7957e3fc57eaba1d79f156ab8e600bc5f5693841c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RT7P7SU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIBoQw4YNCILx2NdQYwCgLHshX1Kna60dQ28XzCMqk4aoAiEAxPcGtBnRwldAKBp5Xjdi5bscQCaVzzS238ELzDy3V28q%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDBR2WfsfB0eALMBSEircA8X9r3MizlESNkiam9JYMQ8d2leYJylKw2OG1kQvkS78YgKCtv4OS1Tg%2F9IBqly3K9NkYjy2E8P%2BcygwAc3pYQSrvN%2B%2BNJlW2UF2ehiMRxShjRGeqURbcOu9Pfy66lQ99vhh3EYItfdq8SNUksyMx3OUfQ2yMI38wU%2B1sTRk9O%2B337OUjLcW4%2B9nm6Byzef8UraHKHuoMXQ3kTNHBN37Gfd%2BCT%2FtsAzjVrRxncagaI4NYva957oul9zh6tuM3CqeRJ9rVP0ikbKOoPqSC7P%2FOccJD%2BIM3TMKulg1seu8RBcIoY7LUQsJoT8sPx6PPnyFgyu9Qfy2Ni20%2BpKTtYkbp4q32O40YAwhslqKv6nOxuBWooDtkTant5zvaJ6US05l%2F%2FmrFwUncJhb9Ax5C1uK3cfn0gFBqoMc9pkXQtdkMDANO4%2BlV2jB33mL51kOQuyrBV%2FRnpYH7asuws8%2FE9rVdNo3T44JS0RG5fm%2F7Fx2Qcr7J1ZbKnWbSqIjqLAPLhipyT0aNh0hhhc3MiWyHzod%2BlFdW0AvGz3ATplL3yj2uuYP5pVvu%2Ftk%2Bu1uKGi0IxbD7G0SFLD8zLJHB7LhiGi8S4bs2rqhsvlIUTjkQJW91Z5WXCMQCf6txWfdFAj6MN6NsM4GOqUB7harQ%2F4qra7%2Fo1q3wWtoLmkBWclboosZY6PuTrP4HEFtCtObZakYKakee8Hrap5DtdlH14%2FnZKQVkHxIdCIELcm1u3Ph7l2lD2toJ33IennE9ImDqKN1QD%2FjZiBiTEMGZ0Eb1csx4u0oen0GCxbMc7uXeiWGXYmmQ5PzsCahHGSj7EJrLE1ZNe9feJs5EthYw%2FVl1vp8oru0uOSLlQwzVICrbJL7&X-Amz-Signature=2110450535edee672b2787c7957e3fc57eaba1d79f156ab8e600bc5f5693841c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUIHYKYQ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIAWdvXmcVguzmhENxwDWUmzaXDXjo8q3xvmbtKu2sDArAiBXBLHkRJt1X6NKcDYTURSZ0a%2FMgkW4bq%2BGMhNKPR9JECr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMH8EhjikTUkOeA8GwKtwDswSum8%2BWmeLiUrgL6Ueq4rE0wYsIiEEatXG5n6KOxrssnQbPnHcyUmrzNIHRAcoA%2FPwJU5hCaowmvv1YWNJngCBJGlbP9996doBhdAWSnWLUiYw6UGkCwEO7NFEc0XNt4ekAeuXR5wbN70S0l5ToX%2BTk7QyRMZcFt2PSFZ%2Byh5ULO34rAVz%2FdgpYfl5lxPtL7jyARvLHkZO%2BoJZWJKu9XxG%2Bbfe4Y8TPZa5IdLRU9H6xDoDj1AP8QtJgTDozutc5SYPOSW7qm1JflLkd3%2BOw24a9PiJYkYPYSr3aoGlRLEpNaLwlKIRoGLkM9VTlvef0QOQxFCcoKqCRRSRtx%2BzxUfs311r%2Bn0PJo5DgBU6Vi4K%2BDZiFk8VAbP%2FOOGTBUMqPTKdIMFpYigETNnoCd7uZhZIjzUknA79D%2FtdpDKrHwID%2BkDQStMf9dERphXVwdZWcE43o6KBE9P7un9nuMkuWB0rfMssiGq0G9bTiOBVbYp2BlvPlVgH2c4%2FB5IklvdB3pXYDVlEzTm3pFebLZfQTDKLweMwlTpt0K0Kh%2BXfsp0PxTLOkipLmkuhGCy%2BZl7ucD9ltYhDOhUWjA2Hq8CX%2BTOLBWeBb4CCjQY8Wv%2BkAAWkJb1uTL1youRfHKaEwm46wzgY6pgGtNHvbnQQs932cT%2BV2Ntv1vDbbCoEzyOFU1APV5UGNXi0wsWOnCOqQDQlga1rSLBP6rtm59TlKuiv%2BK9SrTQHeE24Y67BJBHA5fnu3wXL1EBOvQ9o4YSiOqBJa6e2t7xsI5FV9p0fzPQ%2B01n2bjmKlLFVstIQs4%2B31SdqCUAIy2hWdn44I286CFK%2B9Zs2XQxopQImYKD2zOa9LVgzK1fEZr2EEe5hS&X-Amz-Signature=bdb0ab0ea0525f9b12987f91401fd155cac85f6dc1a88f789983b2698062e1f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQ5NJWAA%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDfIGQxIg5Hg2wWoPX2j9airGGQY4ha8TPhnNdXTU0BwwIhAM5F8g7kFLmHeur69I329SyulXnF8P%2Fb%2BARbRhqQePYqKv8DCEMQABoMNjM3NDIzMTgzODA1Igzh%2FitHGOHH0Pm3oeUq3ANI%2BQgv50do0%2BCxfcxGD1ukL3aWnXZ8NkfZv5NobcAXx1i88jqszQuVeEwi2nswSlbRURHE%2BjMW1ArpJQ%2B3C44Pcz5qnWB4ReqejTicmteSHT5Stm5jwMp9gjrNiSfWkBWsXqnA23%2BZVEx4kPvneE2e7oVaySY4rJjoEmqXIRC0I20oHHqXZIGBwdRJ962%2FRrFnE7seB62H5KLvH2xZhACqPAcxg%2B6mlu5JQrTt4emggb2%2FhWA6Xi7Tbo%2FvdbZLNfgtfcL8DLdfaRnJafbp6%2BOhZ4G2uSZYur9vjkF0smV9HKayN%2BwyhCQ1uN7ea8lG6ZHr0qkXejnyGF9IHozDRNVK9J1QiB6Jx%2B6Tcdf4TPmvKZINqathzYloqcw3w6TtmmvC6sQbXWz6ROvxws%2BEhVynD6J47cMaNYbsfSHJL3MiEH4akb6NGkt6VeIA7bR%2B5vGjdfwSy3RT0fe6i3a7aH4GAyRBZh%2FVpMtueLJ0a3VM%2F2VtTmzkDWP0DaEVQZioVrB9Co6DK09qES2HyG1oUVQ19SbsupOgC22xbXOK9cGYeJS%2F%2F4EMkEawSJgfkQMyhdSUhvUhVccjFeUW%2F0p%2BnfceQW3vd2lXr07Fb%2BqIu7KimWM%2BYpOH2%2FVOX%2Bl%2BdDC9jLDOBjqkAf1iIyvLb7EE%2BzW5Idov81AggYsvnzH9ofsLqs0l79%2FZya7htSD1a4zaJBmQ%2FtNwMz%2Fs7mn6Gmn%2FA4sotchqMP0O%2BLilrD8Dr2CIiXycfh5993BchEo20wBAoZCJjMm%2F88bzByqmBI6QdLSfTf6sLOZX%2Bbk8eYpxOF8V4k4k6sO24YjwptRMr%2BT8jvLS7pEgivP0xf2N81sAy5lolV%2BBvytk8SZN&X-Amz-Signature=663b7c86e40e484b844041d2db4f84bfbf1f43bcfc8b8e9fd3ac1a78ae76c30d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQ5NJWAA%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDfIGQxIg5Hg2wWoPX2j9airGGQY4ha8TPhnNdXTU0BwwIhAM5F8g7kFLmHeur69I329SyulXnF8P%2Fb%2BARbRhqQePYqKv8DCEMQABoMNjM3NDIzMTgzODA1Igzh%2FitHGOHH0Pm3oeUq3ANI%2BQgv50do0%2BCxfcxGD1ukL3aWnXZ8NkfZv5NobcAXx1i88jqszQuVeEwi2nswSlbRURHE%2BjMW1ArpJQ%2B3C44Pcz5qnWB4ReqejTicmteSHT5Stm5jwMp9gjrNiSfWkBWsXqnA23%2BZVEx4kPvneE2e7oVaySY4rJjoEmqXIRC0I20oHHqXZIGBwdRJ962%2FRrFnE7seB62H5KLvH2xZhACqPAcxg%2B6mlu5JQrTt4emggb2%2FhWA6Xi7Tbo%2FvdbZLNfgtfcL8DLdfaRnJafbp6%2BOhZ4G2uSZYur9vjkF0smV9HKayN%2BwyhCQ1uN7ea8lG6ZHr0qkXejnyGF9IHozDRNVK9J1QiB6Jx%2B6Tcdf4TPmvKZINqathzYloqcw3w6TtmmvC6sQbXWz6ROvxws%2BEhVynD6J47cMaNYbsfSHJL3MiEH4akb6NGkt6VeIA7bR%2B5vGjdfwSy3RT0fe6i3a7aH4GAyRBZh%2FVpMtueLJ0a3VM%2F2VtTmzkDWP0DaEVQZioVrB9Co6DK09qES2HyG1oUVQ19SbsupOgC22xbXOK9cGYeJS%2F%2F4EMkEawSJgfkQMyhdSUhvUhVccjFeUW%2F0p%2BnfceQW3vd2lXr07Fb%2BqIu7KimWM%2BYpOH2%2FVOX%2Bl%2BdDC9jLDOBjqkAf1iIyvLb7EE%2BzW5Idov81AggYsvnzH9ofsLqs0l79%2FZya7htSD1a4zaJBmQ%2FtNwMz%2Fs7mn6Gmn%2FA4sotchqMP0O%2BLilrD8Dr2CIiXycfh5993BchEo20wBAoZCJjMm%2F88bzByqmBI6QdLSfTf6sLOZX%2Bbk8eYpxOF8V4k4k6sO24YjwptRMr%2BT8jvLS7pEgivP0xf2N81sAy5lolV%2BBvytk8SZN&X-Amz-Signature=2c9ef4fff7c29956e992bf7c07d484b4a4c9692d79a347e569b858775410f342&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDESAXQ2%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIDDe02OvTrWIWuTw3SGD6xcpsu8c3BioriC%2F3daIBdY8AiBL3YH9yCNxO8XgP036GaeHOEY0DVxWf5DeYA6mOL04ASr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMnPR%2F1x5zXBtNkeXeKtwDO9MXs4bqPAYqoBY1oLC7JZJtGaAyM%2B2NVm%2FHhd40VH%2B%2BEtTxK7yNsdFSDnmNMPDn2HlFCUNwrCqvkrWWVpA1Kittpn9oVJ6hJMidEAdZtoKtY2nfoee6XGR9FNpdhoJefYenlfom3nwBEeXEvKymnYcDmt5XGEVXoBAfYlPsMRAgZEgtZPm2nWcYV6HbK0yHB0lCgUEx%2FTtLXr3cGneXn8qlrh9QZQ9vPRVp9quSvy62CPj0zR%2BnM4FbaqJ6USOlnI4ce0HOpA33kJSSlV25qKmEPEkhtvNTeMa1QDFP7YWB0H7tvjPjjFvl4uVfe%2FICl1Q8zzI9rHofZDpmYsWCcuQQIQ87Pvtbl0Js0iZ8XWtXoMi1upmBEYXpYsx3uRFn01X1UxqV%2Bj4ISt0wTGV0SIPAch%2BpDgX952FJEUYLK6t5yhXu4Vwi1FvZzS2qtrOcL1b6oMCh3uj4oelu3yecoh%2B8bgA3LE3aDvVpdy4VMLM5b8%2B0UHulkR7FLqLLU1RDhzenYSnGqZvZ1t3T1KwBfXiBFEGnQaqK9WJnBwT1YjYQ7lf%2B02FtO1mWBB%2BmfrjXMmBDUeWL2NdzS6%2Bk54nYrygf3q7egD7Sx2O1V8XZMd88J%2FtJrxWTcBxGwu0wgo2wzgY6pgEgBWUIaOnwgyhCb0Tow%2FZ6Aw2QSfopRHMvY9RNHIN%2Fvd9q%2BpXF%2Fv551ppIs7TCj%2BpDeIFbJcg9EjBWx6FMi9YEpJQwQRQT9lioJyV86wTBfoGx2ks0mbScmVJ3mhtwDa9iqSTyh48cV2hMMKpDdpvleRoWSuNW2jk8lGGeI6Jxv5o43dJ2lgxn9XQGRsSy2MR5p7j4WHaj%2BOohIEvQhfOZ%2BEUU8gL4&X-Amz-Signature=0791853642c92d6b97b88e8b8377c9ca04012d6f34c62b6b7914b7c76beb19d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OBSK5D6%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDa2wYbkNT5QPPZoXSxPOp5WVqehCMjKrlYPrLg3Wq2dgIgX6hD%2FDmBYEWwpobnYNvYjZzqb2JBrssA37iW7rv%2FwC8q%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDCBbj8w9m4h%2BMqm2TyrcAxBanyo%2F0JHWYq4Oe8l3eDgI0A4P9XzmJ1j6xsQKkx5vNfQ8q6L3HzN3GY4Plj2kEt1X1Mnq7sG54ZDrQwUJPtTnSX14bRNKaeoah31jU3PeqgKGWkpsCOMUlS8OEKlosjfm%2Fe1pczbSuJS5M7nS4KWrkPYC7TKaE1W1wBlEXXwGBT9KikYIgkq8%2FeirrAOvQmFp98etgE0RKsEJK80O%2FdE2cGILXEQQviFZToAQlrkNWqzoMLhbMd3%2FwVysZO4lA7KwAp34tQ1Suh8dWm7Smd27ROHvP5iAERyfxmhPypb9ItYFcsj8pGMdkvpoU35B%2FAYXgWXnb6mQsBA8BMXtmyuGYUFUUUBv%2BLQpDCgWAGi6Q4vwXGmT%2FMpcbkG6TX4cuVEBlF8duaQp%2FfPWz0p7OCPHGuw9Ak11cgziCNsKtB8aLMae0epIW0DAgWIzU%2FWEfDw81siGjCpLtyLhownMIBzldcbt8kT%2FrsYeR%2BM0Z5jtElpZMV%2FrI5bQzjfEY2hnHa5coTtuaPh%2BEQC9vGk2m8qy3ll32bn0PesyursBnB0U%2FJtdeF1jbcEd0Y1aeINlnbykx4IPaofZQkHBG%2FgryUNYm3mbQO8cnNo55vbJwkz5wu%2FvKlZXUuDjKRjRMOqMsM4GOqUBVHwjQF%2BCwClqYZMU7EDuiCyQaYHiOcnrU5kZdKueAG2%2BxZqP4NC%2BTsuNHaMKYbD%2B9T9rl%2FaId8CpjT2ncuYCgtF8T3mrXYQzjkjL7wlhtoFwmv2NMFyMWxJYyKsWz0aa7WLesqNyJab0UDDrno7XZyQ7fvkMOs2FKOAAfEdCeEbEM3JDGsw5Hbxl4EOXxcTseQ5qZOPGzr%2FBdFqT0xfjMfwoVWpM&X-Amz-Signature=0beb245c85ab612d722910e6e4e9415138f98d01a3985dee64cf501922bfef98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLGKSGKV%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIFl9HuVAgLEefU7Jgz8r3fp%2BoN%2BFkMWMXKIz3BrOVYEEAiEAl6mvR9t%2FMFszxYyx4J44fexuYHXelF9rMfG1ay2WA4Yq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDDZaQnDhr3Z6iEdZvircAzvKiwQ3gh2dy%2B%2FH8nVk6qaZSjFujSjAHqJ%2FJ6T7PHRoPW5%2Bv7ROHr1LFefY%2BLyaCzNu2W79602MGVG4JI%2FyxEsXQvT8ZuYIBziMgpe7v2MVILIyk0qNvcNmmulGI09%2BIL4lY3IUaM9ti84PnsOzetjpF0LxTlQukxm9sL4mG1tcWPgv3J4OK9uS6cymvdMvpYxpnghjjEW1iSXogk1TbuTXENk8KRzmcZyFtXO1bkxlAhn7FNoVmF7SKYSsjpCYOELcspOSU12vXt%2Fq4WXkle5jqWAQs1ZY5ThEISPLYFilD2zs2Rs48sspcmjkjb0afDS4OijRhYw5X7diK%2B18bdBDW8iReiWuSdfdE9rfeysOW3IHhrKDIaOIvUYF0f4zSj%2FpfGQIr%2BJzeHqrR4FTQhjYAz1qJsTaCmw4rXkmsG37SiepjcVCkq5rGxSuL%2FLlRRpxWvynVSpE8slyXs25mg4wijkvhT9DxBr9DlGWEq%2FB2C0Sw3%2FRfIJoYVuJLbW9olHERLuNOhi83FI%2F5ANQPiaXqR6CQCiNhVKM3whgXB%2BJui9DC%2BMiQlBXelhYMQEQUctSjTO2VVoPSe56Lbmt8s4wlO1f8XgPKXO2H2VX9qrtotskfStifwZePbQlMMWNsM4GOqUBTYQdlCJoV%2Fs3lrmDgQCajNhdmkGVH%2B%2Fx7p8UYib1sm6QTzeFCmgP5HiozLC7mIEY8x58Cot6sxsuERTIFWD0gdxYVJZFWaPKuJzoHJCodaxoB7UAAwlzVszW2jrQoXf5gsG%2FGe%2FwXp6iW%2FPlAmUY8TMcqN%2FlqZHYgOO3J8M3CBi20%2BUgu2%2FoOQFzVsHrhwMk363AT786YNE5BdklSnXW7kbwqeWD&X-Amz-Signature=c9c1d1d27293feed005f8c2c9eca5d09497503360594e9052b9ee8162a3c022a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YA2XUDQ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIGYqI1%2BLpNF0%2F%2FesMZDITBGd%2F2CyNzjcaAUs0SQQ3ePdAiEAk%2FO8yfcX2tTv6zjbnCAUJevjiACZPENy%2Br5CPTXFJTIq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDHZ0ZLYe0NdMhMW1%2FCrcA9BQWBc0JpD9Pi9W53NiRgrpu63KUOtve7Z8LdecRUmLxoD5UH5dOtA3mmhD2pKQq9HCVFxDEWuxxtf0UWvq94ZIn7sqSYyBX8O8dXNSmF56tGTNaAcZ4i5bi5HNe%2FzwrLnLZDQ2XQKbhBdzBeF9dP6Imz8MABIF7fuSUYQgSU7oGSwEzlBH4f9WvOPexWom%2B9B02zwiq00NE%2FlTzErFjKNX5%2B6z%2FHNHTonAPhWxrEjjoEEF6%2F7md4CGmqZjdcYstuqMxAiHaJMAEEVfq3l2SwGfOm0n1j43y2ZrQdHCHQwIBO2NIYDyZ68U%2BgsR15fpD485UBGJf0QuvWWXPfQPp%2FnjsHlp3ZCR5pCQTMu8czquUdT7%2F5pe6UUHtLtYjMMyqa%2BMcDGwoLfyiD1oXrSIGWM86uazzIbEaFqeCxNLvGOMus%2FDYiegvkjUOGk9s%2FjRY1jfYr0tFVzSpbkfpN74B%2ByeiLf7nG0d9%2B2%2BDo3rvU8ldPsT8S%2FKYKwtNYReG0IIF9T2l%2BCBlDBGsFHwqYKL1q8pnGRCVU%2BDurm%2BxvIzJMLIBWR8f1CaLYwNac%2FCIE15SwJuhB%2FKQr%2BQlecxGV%2BTtO22%2B3WMmHdl5e5Lpf7cTYWtDs5Tib5CRXhi%2FJtrMOiMsM4GOqUB%2BTFQ7oETQDmfE%2FojN9GHYGVHPRrywxKByyD4NwSj1g9qo7Jl0jtLJ3KotvPz56JU%2FKcqwMZ6Xw6gC6nwpSMnXyuHQM1gn26%2FoHk6bhTYYDt22lq%2BnRAZTIu0iydC2MZzzwneacbEqjBh6UnhTsdYxSIeyVWivAE1WhXyLAP%2Bii99VdoVo2njxknOZVEr9oD%2FCUAEyFRcz540Azr6sU46AYSa9xPx&X-Amz-Signature=47b1f804da09142ed67fc9fdb128dabfd616b6f445d394b3885fc27fffea3227&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YA2XUDQ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIGYqI1%2BLpNF0%2F%2FesMZDITBGd%2F2CyNzjcaAUs0SQQ3ePdAiEAk%2FO8yfcX2tTv6zjbnCAUJevjiACZPENy%2Br5CPTXFJTIq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDHZ0ZLYe0NdMhMW1%2FCrcA9BQWBc0JpD9Pi9W53NiRgrpu63KUOtve7Z8LdecRUmLxoD5UH5dOtA3mmhD2pKQq9HCVFxDEWuxxtf0UWvq94ZIn7sqSYyBX8O8dXNSmF56tGTNaAcZ4i5bi5HNe%2FzwrLnLZDQ2XQKbhBdzBeF9dP6Imz8MABIF7fuSUYQgSU7oGSwEzlBH4f9WvOPexWom%2B9B02zwiq00NE%2FlTzErFjKNX5%2B6z%2FHNHTonAPhWxrEjjoEEF6%2F7md4CGmqZjdcYstuqMxAiHaJMAEEVfq3l2SwGfOm0n1j43y2ZrQdHCHQwIBO2NIYDyZ68U%2BgsR15fpD485UBGJf0QuvWWXPfQPp%2FnjsHlp3ZCR5pCQTMu8czquUdT7%2F5pe6UUHtLtYjMMyqa%2BMcDGwoLfyiD1oXrSIGWM86uazzIbEaFqeCxNLvGOMus%2FDYiegvkjUOGk9s%2FjRY1jfYr0tFVzSpbkfpN74B%2ByeiLf7nG0d9%2B2%2BDo3rvU8ldPsT8S%2FKYKwtNYReG0IIF9T2l%2BCBlDBGsFHwqYKL1q8pnGRCVU%2BDurm%2BxvIzJMLIBWR8f1CaLYwNac%2FCIE15SwJuhB%2FKQr%2BQlecxGV%2BTtO22%2B3WMmHdl5e5Lpf7cTYWtDs5Tib5CRXhi%2FJtrMOiMsM4GOqUB%2BTFQ7oETQDmfE%2FojN9GHYGVHPRrywxKByyD4NwSj1g9qo7Jl0jtLJ3KotvPz56JU%2FKcqwMZ6Xw6gC6nwpSMnXyuHQM1gn26%2FoHk6bhTYYDt22lq%2BnRAZTIu0iydC2MZzzwneacbEqjBh6UnhTsdYxSIeyVWivAE1WhXyLAP%2Bii99VdoVo2njxknOZVEr9oD%2FCUAEyFRcz540Azr6sU46AYSa9xPx&X-Amz-Signature=0d3e57c30a36332b16f4bba2ac224f523a57a5c4da12127deee906a0e144f936&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVVTXRYP%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIBjPzqe2L2ruatKLzAQ%2BT6eRuHBRG5zpO8WqfW36NXkkAiBDYLkR3%2FHBr3yK%2FvKwvLTk3%2FFC%2BEybPEh6bq2RziBcQir%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMlYBM1muYgzexwAdNKtwDfLYpbOCI9QGAm4y0vhrM8mDyPA9VqVO3lqrazBE4sK3uZgomQ0KNgcjC%2F4Ynt8qqCQ7ucc4WiD9gwRojeutk6paifb9HhS2xPY9P2SaW1ffA%2Bs8ag7AM2b8N7%2B75YLO%2FRmCVxyrjNi4GsKOGX3hLNpijZd2KshloVqZtAyv%2BtTWaPZeO7KEryvROXzT%2B5nwp2BP0HI%2FtFyyaGY%2F%2FXr%2BK%2BN%2BtkfOmaSYu0GkMcwJgPt4Qx%2B5r3j10KHAYWhu%2FYrpKA%2BIsNHMMeYJw0BhD1pV7rjmWTEXGkW14SpHfsTy2KcqRwRbMWnoWNGO4tOQRv3RGTch5WSyqwKBDXlPGUPIxOLhUXEQO%2BsoMpfXwdhRXZUvXkxZaYZ%2BovI9AUF5nuPWWHDAu7OTdALtUJgzmd%2BwLqdVM0QVIhD3HWS8%2BNaWlOvXbOiPn6adaV5Pr%2BhDeSQJpqpzJhTMfsUPjH0s%2BCS%2BD8e2DcuUT3SNauLlrDLmGa%2FFHRDSCuhihlI81yLZmEmc6EJMGDvFr4e1iePFewLGou4BDmDybyCrTK5QK%2B559f2H5orkcbcerWokPjQ4FrpehzleOhaQH7nB0UfaP0SaHQzCkTaS5BQhtyrcua%2Be0KH97Y4vtUHlXfLvMEiow4I2wzgY6pgFbMF9%2BG8u%2B6gB6rGWwilO1vu33cpX5%2BTcWqZL5opM1OA0XAwANsoHdF5BYv%2F1XJ5TFEjWrUQ8xTizkqYMxN3Cta3zVbY7vdATsFgG3I8lJj3SWq6PAIJF5ZGfarfJm6bfd3ISsKPBLMFrlRVSDI6lxf0XYq0BwkrPPtbXpRQCOlO0FGdXLBbxdOMzHTORAqvSI3WdZqIWjPwCK52516%2BPA89oy23cw&X-Amz-Signature=7cb91d34e603dbd32c20fb038f598c36498ec5f714148ecf6a78e8549d761289&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4HJG2TC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIALaOYoRcgQ2HnmxVXbz0iyPRayzlYQHSHlHRyjpKtExAiBurmo5XF2hcpnFQK2FPuL8GCubdswL479cS36CEYcrmyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMQPRnFkB51BbSfN25KtwDYd%2BovNvYHqsXeO3Omi%2B4lQdC1oPvzbJzeEfbWFr2IveSJk5HT8ltfj%2FAQyMyh%2BMeGbXH%2FLXNiDxui%2F%2Be%2FIC%2FtIUyhx9T9hfrf9WdPp9jgm3wk6L8cyrLTV7ULQWYXfbundZMe3ttsM0vmetiZDwvs5ksT9V6AeSN6%2BsG0jVEyu6%2BFCkeRqRuApRjTGvqpEocotn5RA3exddOMIOrj7i3llkT8YkYZRFd4TMRkaQVI%2FD9sYWRl2BUqjgimVpuzDlQY2xDYVjHMFR%2B9lWVPSf1ScttFsgi%2Bp0RaLoGq7ApJH1gIXvc1bsJGzY35B5Rd2WyeMTAYAckzrqyJloF2%2FMVNU0SOhqKB6OwS6gl5c2U5WVQtImpcrJIW4Qqg3FGtk3dJK6JFqcDN%2BySPKQi5ufkWpfBiVIFlZVeoRuOoVPtdIOoLRmMRLwNQU9wCOHC75nkNOctH%2BhgX9Z037OQnmfCjohsbIumuBjnbVfL67NYLkBiof8dKSk9msO1ZW%2BK3v6v22aiB2ouju3N%2BfxA2PS04ip1vWqPiEIMNRpx4%2Fyanl7KNlvdbq0ZoZaybddZhiwXEpYSsOPZKbCGyLgEYEKNIXhIft2PUG8ovghD0PYp4nDnwg0G1N0yzPKXenAw%2Fo2wzgY6pgHg%2BbQfQnt2DnXsQ03dJdzWdkkdx0%2BW1vxkmjVPTulZfc68Ku5VsjOLlAPlBHl5DwXg9HJqNB00hfzcJYgkYqgGYOkj1qywVPfzsNGbL%2BJCFA2Pt2ubuNXfeUgPTdbKBrTr9YiJT56txZzrYFo8vU2JZkjSoJUeOhdkLvlSBN5SAtpiCOxyfaPJsJAyEzW4OQ3tuHBEX%2FHtkfXyf5r6FXRMWfHoofFl&X-Amz-Signature=383dfcb2f7e317eaf29186087b55504f65f74013d08f127288e6a309044a75b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4HJG2TC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIALaOYoRcgQ2HnmxVXbz0iyPRayzlYQHSHlHRyjpKtExAiBurmo5XF2hcpnFQK2FPuL8GCubdswL479cS36CEYcrmyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMQPRnFkB51BbSfN25KtwDYd%2BovNvYHqsXeO3Omi%2B4lQdC1oPvzbJzeEfbWFr2IveSJk5HT8ltfj%2FAQyMyh%2BMeGbXH%2FLXNiDxui%2F%2Be%2FIC%2FtIUyhx9T9hfrf9WdPp9jgm3wk6L8cyrLTV7ULQWYXfbundZMe3ttsM0vmetiZDwvs5ksT9V6AeSN6%2BsG0jVEyu6%2BFCkeRqRuApRjTGvqpEocotn5RA3exddOMIOrj7i3llkT8YkYZRFd4TMRkaQVI%2FD9sYWRl2BUqjgimVpuzDlQY2xDYVjHMFR%2B9lWVPSf1ScttFsgi%2Bp0RaLoGq7ApJH1gIXvc1bsJGzY35B5Rd2WyeMTAYAckzrqyJloF2%2FMVNU0SOhqKB6OwS6gl5c2U5WVQtImpcrJIW4Qqg3FGtk3dJK6JFqcDN%2BySPKQi5ufkWpfBiVIFlZVeoRuOoVPtdIOoLRmMRLwNQU9wCOHC75nkNOctH%2BhgX9Z037OQnmfCjohsbIumuBjnbVfL67NYLkBiof8dKSk9msO1ZW%2BK3v6v22aiB2ouju3N%2BfxA2PS04ip1vWqPiEIMNRpx4%2Fyanl7KNlvdbq0ZoZaybddZhiwXEpYSsOPZKbCGyLgEYEKNIXhIft2PUG8ovghD0PYp4nDnwg0G1N0yzPKXenAw%2Fo2wzgY6pgHg%2BbQfQnt2DnXsQ03dJdzWdkkdx0%2BW1vxkmjVPTulZfc68Ku5VsjOLlAPlBHl5DwXg9HJqNB00hfzcJYgkYqgGYOkj1qywVPfzsNGbL%2BJCFA2Pt2ubuNXfeUgPTdbKBrTr9YiJT56txZzrYFo8vU2JZkjSoJUeOhdkLvlSBN5SAtpiCOxyfaPJsJAyEzW4OQ3tuHBEX%2FHtkfXyf5r6FXRMWfHoofFl&X-Amz-Signature=383dfcb2f7e317eaf29186087b55504f65f74013d08f127288e6a309044a75b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LGDAB33%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T174357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDf6wJD5qf5OcZ%2BrDbVijP1YNmQeKrmzafxm9u4lgefiwIhAMi1ILkmy05XQAOFNOL4UQIjePqL4BEaZB%2BTXP6N%2FAN0Kv8DCEMQABoMNjM3NDIzMTgzODA1Igx6VsDdUJSg412dIPoq3AO08bGMr%2B2NWgNugffynxg2STAVdRZQuyc0N7%2FO%2BoYHy8aqO6jMbQ8xDSbvjdomrH1tTUzH6mboIwuJpVLFP5JfnrtVpteVVr0Vf8LpjdogX6Wcck48zKWMfYE%2BMHnQ76MhVUc707%2Box3G%2BC%2FALU2%2F4eEK9jR3DT3Qc5PklCZg4EeJx8w2uB9zAoSHWT%2FRHaTNQ6Yqjig1YnlqzPqWC1lq1zV3uNqp7KITChIwmMtH2dwJRa1bbYTEvgmclEbXE6T5oxogC639iZ8iFPpCgK6o4YqxLkqSjOEcYGGSbi7LQ5G1muVcly%2Bk%2BviLkZBS6z2eTv67Q9xaf%2BNITjXLodyHU8E1%2FylTAAzLrXM7N6yeDNwcDpZeiBNgztkcNmBoRptkyEabLfkB6kIA%2FhHnxCjhdgnGGlpl48tlpaX%2FhTAWlmeAbd%2BR9ISwt7Q42mhFruYGaLLQDf%2BHtYr6Y36yS%2FFL2Yb3G5wHaYkow4iMp2%2FV0rJsLWisVJTfH14IV1tNDoyU7WgKDm%2FakAkujuIlZ7RSTsDf79BaTmbQExDLeHPlYwu8lwXAY7S1XrVGUjezEFAErkwAsWsNfViuBXmjBQSAf3%2FusoYlq7UHCKn1O6gpyNkvSmjieVtPSoGMlxzCVjbDOBjqkAVvqqAqo1qhut6JWsHyXBUOxNj7KufqJJVpE0U2ZI7ZkkADIZPHjMYSiV5aigNenIIKM0BVKETAmLMCwzbL2UyqsAIIFoUFljdHMgt2FQcHDnZyW7a%2FAvF1F%2BWoBrZu6OU0xqeEnY7YOH6jE29IzB1V8%2B23Ed%2Bg4XlJXkJryuYyZwiqSz2eO4rz7snAzaZyXLAkVI7Fc08Zrqitd%2Bxq6gEwtim8a&X-Amz-Signature=d5ca84b91697dee5b2fa21169f517efc4d3d27e327d4b0fee6f056049cd338f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

