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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HVHE23P%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIHcBuaCKLbFl72WNmk2%2B46Exu%2BFv%2FMP1b6tSpBy24Z%2BBAiBSP5cv65ty1pqppg4E2se42nSXV4%2Bry7361D1p%2FvVUmyqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAU8qeFJRq8C1KLdzKtwDF3%2FDoUI8JFOiHmY9GgEHuXUvLU5K4hhpnEAZXucnWcbxGtnoQx%2F%2B1R4INsNWsJ3oxNUF8UEpiq5f54HOVz5ol44HOUwkRfw5A439talw276t2nb4JqmCmyg%2Fh6V%2B1UfTIF3t7eE0LUluvuCA7ucfqBN25nAeDoF7CkYIhjKYGxcGciEihcLfOoULR8WFQ1wolkBRDbcza7oZckGFUlIdVybXSP2Hzvp8mHe9XTd%2FLkj%2F7FSHgvPncjl5NtkQwlwS65opOkHWkM6wpYg57CKgY2cLLvyXZbDjAlU8tFOLpjpbmZqW6SCY0L4ZceBITVJFWdglGUZwMOubxgvBmTO2U4ELP59dYVoq%2Fg8xmiWzemo6SI3ItO4vAD6PfjzKvsIDSFIUzBzazA3l2jem3YHEwmGvPxPVFlAH3Fz%2Bhu%2FhKJq%2BoxtWPtXaACehxokush3m4OQdpUlmmhHN1WWQ6Np3Tfy9c%2FAIYYbyN4K6um0A8usMbh4pWw4VoKbZ5aABFKb1dlU9XPGiw07lbofpZibjn0syvvXUimfhIJe%2F1F5z518mJBurEmPFdHhFKpiL64j53C24J%2F%2BzE3Ytz6c%2FEfYWxPZe0nYU2OapxDr%2BheiF5y0XeyantVWwag4Fi0gw8N%2BKzwY6pgGq1vIPmodDbZUaHYa0VyR%2FgyXDibke9zgU9HoTYFLaVBSpXXI41VNSZOBFTWEo17ri86lYywfolk8P68HMhNzDJleMDgT8mQhmLbL3RfKDmvgk1IyYyqtn%2FsrjhOBRF2tWJ%2BudImWolScjddnTeYpa3OhXFP2gSZLXRyr%2FE87sC4jRnYQeYip1Fc7SMYxX42v%2F9YVTYEiYmt35YVbQZ3Q63h5gwZq4&X-Amz-Signature=fa90ece2e83c9e176f60ef8a0552bde8a258995a95d799b6af1e1764ccdd5e45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HVHE23P%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIHcBuaCKLbFl72WNmk2%2B46Exu%2BFv%2FMP1b6tSpBy24Z%2BBAiBSP5cv65ty1pqppg4E2se42nSXV4%2Bry7361D1p%2FvVUmyqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAU8qeFJRq8C1KLdzKtwDF3%2FDoUI8JFOiHmY9GgEHuXUvLU5K4hhpnEAZXucnWcbxGtnoQx%2F%2B1R4INsNWsJ3oxNUF8UEpiq5f54HOVz5ol44HOUwkRfw5A439talw276t2nb4JqmCmyg%2Fh6V%2B1UfTIF3t7eE0LUluvuCA7ucfqBN25nAeDoF7CkYIhjKYGxcGciEihcLfOoULR8WFQ1wolkBRDbcza7oZckGFUlIdVybXSP2Hzvp8mHe9XTd%2FLkj%2F7FSHgvPncjl5NtkQwlwS65opOkHWkM6wpYg57CKgY2cLLvyXZbDjAlU8tFOLpjpbmZqW6SCY0L4ZceBITVJFWdglGUZwMOubxgvBmTO2U4ELP59dYVoq%2Fg8xmiWzemo6SI3ItO4vAD6PfjzKvsIDSFIUzBzazA3l2jem3YHEwmGvPxPVFlAH3Fz%2Bhu%2FhKJq%2BoxtWPtXaACehxokush3m4OQdpUlmmhHN1WWQ6Np3Tfy9c%2FAIYYbyN4K6um0A8usMbh4pWw4VoKbZ5aABFKb1dlU9XPGiw07lbofpZibjn0syvvXUimfhIJe%2F1F5z518mJBurEmPFdHhFKpiL64j53C24J%2F%2BzE3Ytz6c%2FEfYWxPZe0nYU2OapxDr%2BheiF5y0XeyantVWwag4Fi0gw8N%2BKzwY6pgGq1vIPmodDbZUaHYa0VyR%2FgyXDibke9zgU9HoTYFLaVBSpXXI41VNSZOBFTWEo17ri86lYywfolk8P68HMhNzDJleMDgT8mQhmLbL3RfKDmvgk1IyYyqtn%2FsrjhOBRF2tWJ%2BudImWolScjddnTeYpa3OhXFP2gSZLXRyr%2FE87sC4jRnYQeYip1Fc7SMYxX42v%2F9YVTYEiYmt35YVbQZ3Q63h5gwZq4&X-Amz-Signature=fa90ece2e83c9e176f60ef8a0552bde8a258995a95d799b6af1e1764ccdd5e45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTUXE3FN%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQDUFKZhs7v07u9i%2BsjucNSzLoNJtbTgKBmLfbAHwMd%2BTwIhAP77j89MLqfcx%2BfDqOQJkjkUYyhm3qAdydq2%2FLb%2FCo%2BQKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyBiBhZRzbzg2%2BRsNgq3AN2oZt9ln%2Br99CJjzg%2F1JrwyK8XNwyVv8qH84ye5BcO1Pm%2BN3NkzyrHGazlaHIwEjBQNXGTr4SGHMmfxKHrF4dAmHqfsKmmDyv24hiNXJ%2FcN0P%2Bv3q%2FyCThZJV42YVTwbPILtiC8cAPgZ6HtVfL9TjN4zmFxbS8BaWxQQbsZ6dpsf4dSJCQ9Uflg1odCaAlY7ktjdN6%2B6yQl0PbShXHV47aOTa5eK%2BHH2w4FlqyMDngW4xiUQZnsyQJw%2BNqBx8CPB%2Fn717E6AvjmbkzcNjOKTgJaqHp4sljOcjdxRNUTSubNiOnYsDDi6UxbGmrkAkplK0o%2F9MUP7lqkDfF9iqj2S6tkLEAo0fqwzXJa6hmVQb3LoOQd3SriMxUA4LALda90w6AxXYgtNaBBr%2B2wYxj44lMFhNB4xZ%2FQRygDF0%2F7hxOwRKVxb778VMfzT7Hvh8wzju6pFLOme%2F6TNpnUrSsnt2PPoRV2aeMNgemX59cxVRxAqkQ5pcE7WeVMUnL2XAFNtvW6aQJciiBrmI4aB%2FY9xPoSj1CIgmPh%2FV4AOxnGo0oBsNsRTgAs1VqXCokd8RjyzQVygrf1PxsJmxNF4B7fpCBoytae5wRpC52MaqwmaEsCWFOAXJkamm6xzk4%2BDD43orPBjqkAW%2FSrcud3drSGUmL7fjhzqbH2ArAtXC9QyZ9Wbyrerf%2BM8sSG1UjQw2QAtjQY25tEXxW1FfxTGq0TtwQwTZfIIev0cE6pkaiYjeaa5l9ETvCiwwLkxRqowwHjcbtSJXxutsuyJrZ1Tei9VyFKNjaOABHU5srboaV98HSWQSWVifNFhqiqPuFvylTyPUn0A0jQptLvT%2BDpJN7dIMXjGWmVSiDC38I&X-Amz-Signature=e5064943619efa2f6da9468dde7732dd821bff2e3335296e9804bc0faddcc0b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJTS3PQ7%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQDjvf%2FjjkWQlaaNg0N0u0%2F4vH4pD8VWfj6K91Z0hZVV%2FgIhAIQ5MwU4zih82ODv7ERksrs7u1us0yO%2BHFr9tNJojBrrKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwwthNqqomKpz1EDocq3AN7BM3tUaVaGSShKeY4%2FE2%2FnJusfsVlY2OrgvkTSHvx641N%2F0tQy%2BNZ1Zapu6nyywyOP7pdwjsKR04YsaOzHJD56dgRaLZa37sPDfLlDNy3FJESuPY3zutO921DmrQVz%2Fi4hfEGEKPhJa0VsTAGpJ2wXw0yxzPLoBiBxeRcE1gnralrug2cebey8%2Bh2ShuONn5ixxAmwZc00jQOruqhJTj61k6S%2BpCXu6niU4DDH01sxO%2FQsKAC3CYGIHl%2Fazpnri7OC3WF5gRcAhRgIphirfzo3SfHKG9fwLMfdlc84%2FPFDwO%2BDa%2FoKXzG0U17wDO1uYaledoyHq3EjtFreOws454tzdDLdDsj5x5txlsLh7adS06gh1w0z9FQoa6y11kJZPgVH5iLf027dqijV6wSEynHlWwDpU6CKjfi6wWOyNl2G%2BZEV%2BX6qEnR0NLK0KY7qhFnyT56lDKT1blUUppf27MZNfb5wu%2BjNCtGvyi78c8OIzZH84JOrKvcXHtfDCgTAOGPYPwOp3jHyYZqmDsG4KFne%2B9iWTyAyWSZnk6iSZ2BwaR0bsV2zlmgBUyutGvJRXHZIamkdby6kCZIWFTKaz504n8xnNiKDlU28ZtTtYscVUf6E0lJ0ysbIbty7DDs3orPBjqkAU49aARJze1nZ9DBg3nW2%2BAsQVQODzTVyFPhfnvP6fkQIEtS1x1WfyfCYWYs6vrpd9l3I9Z2D4ZkKmPnK%2BfXbsyyzOZifjCi820MZahlFL0luFw%2FSXyrXvaygU6ec5nVah8Wejstc%2FXXrvTHJFHo6CRPy6tFyMFWJVuZ%2BH1DJfPxcvieDnoHIEsV4RL%2BiHp3dTmP%2FaX9cXWLMzTi2JLJ%2Fi04LaR7&X-Amz-Signature=43cf3b486ead4e5d2c191e9b39f53273cbeaf1b0e607a5e57c27e221be2df11f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJTS3PQ7%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQDjvf%2FjjkWQlaaNg0N0u0%2F4vH4pD8VWfj6K91Z0hZVV%2FgIhAIQ5MwU4zih82ODv7ERksrs7u1us0yO%2BHFr9tNJojBrrKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwwthNqqomKpz1EDocq3AN7BM3tUaVaGSShKeY4%2FE2%2FnJusfsVlY2OrgvkTSHvx641N%2F0tQy%2BNZ1Zapu6nyywyOP7pdwjsKR04YsaOzHJD56dgRaLZa37sPDfLlDNy3FJESuPY3zutO921DmrQVz%2Fi4hfEGEKPhJa0VsTAGpJ2wXw0yxzPLoBiBxeRcE1gnralrug2cebey8%2Bh2ShuONn5ixxAmwZc00jQOruqhJTj61k6S%2BpCXu6niU4DDH01sxO%2FQsKAC3CYGIHl%2Fazpnri7OC3WF5gRcAhRgIphirfzo3SfHKG9fwLMfdlc84%2FPFDwO%2BDa%2FoKXzG0U17wDO1uYaledoyHq3EjtFreOws454tzdDLdDsj5x5txlsLh7adS06gh1w0z9FQoa6y11kJZPgVH5iLf027dqijV6wSEynHlWwDpU6CKjfi6wWOyNl2G%2BZEV%2BX6qEnR0NLK0KY7qhFnyT56lDKT1blUUppf27MZNfb5wu%2BjNCtGvyi78c8OIzZH84JOrKvcXHtfDCgTAOGPYPwOp3jHyYZqmDsG4KFne%2B9iWTyAyWSZnk6iSZ2BwaR0bsV2zlmgBUyutGvJRXHZIamkdby6kCZIWFTKaz504n8xnNiKDlU28ZtTtYscVUf6E0lJ0ysbIbty7DDs3orPBjqkAU49aARJze1nZ9DBg3nW2%2BAsQVQODzTVyFPhfnvP6fkQIEtS1x1WfyfCYWYs6vrpd9l3I9Z2D4ZkKmPnK%2BfXbsyyzOZifjCi820MZahlFL0luFw%2FSXyrXvaygU6ec5nVah8Wejstc%2FXXrvTHJFHo6CRPy6tFyMFWJVuZ%2BH1DJfPxcvieDnoHIEsV4RL%2BiHp3dTmP%2FaX9cXWLMzTi2JLJ%2Fi04LaR7&X-Amz-Signature=5d87628bdc50dd6f7420d0f9da504000405ef35e628b607f0b640b3ae7d48ab3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNIVKAJS%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIFU1jqy%2BaSvNt86PTZNbg2dJ%2BRNyVXHbgj7Pc%2BnmFa07AiEAw7yiLMBV1Z85UoHM4rXZvKHBktIobj1DNcc3XfOvYRcqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAW6vqpbjZDOYTxOySrcA58BjJrBXHNl7UJHu7HUnfAZbiblOtnX%2Fi1N0a%2B8uWJCUYss7Wxk1cUX27eq9OLHzn12A8uKTgxa%2F7ijukDcZ23wn7hsW8nqYpF6EAubQOFVMj3yhx0QdGVIG9TlBUcpFp6ccsbFI%2B2BE2lYERUC19RvODeoTRyUU2BeIqQG6ErvSjIwJjUGlkZnnus4Vs%2Fr4JPnGbOIWv0ntPYm26sWwAhyF9F8G3pj1VGsJWPb9s9VBPgZ%2B%2B7rWoR3TU1zAl0RHK2HTi5pGp0T9%2Bp4CHtQ5uu9DkGygDNRdwFe9eiWsjaCw59BAfsTi2vc2q7%2BLbNW9W7ViNn81y1GRAQu1sSWYcfnFg2pQbUx80j1lF2IDR2jPWhkkPLxXghmeYLgM865ToO9Wb3kOQez5bMQ52rvf4qyHeR%2BojtdQyoTyc4KTTnX1PpBM6i9SbHxQkLnRTt66iA55k2mQ9m5WXoP75ZQ3UvHJJA9zbvO%2ButdBZ7rQagoJKhYr6dVvaEg9SiXE5Jcfm1U7WkAIHOUW%2Bv1n8gnH8L7kzzs0muEl29fTGnCaXx7%2BtOPqS3pzWKLjaMQTGdVScc%2FhXaRcR%2B5lE%2BFXlkhJHurtNQqtkPPFO6i5lhFNxdYJyNwvwHiK11NbrXsMMD1is8GOqUB9OS%2B7FZp4CT45CkVXt0wOVmQqE7h1T6MnbNeSyxFV2%2Bov4uHfrTMFN3dW1MNm99KxQgVtyFNJ4IaCXgoCjIXliQW59onO0KzAyGfnhEeC7PJL5P1bG79k5pLyVopngmE3Bde3L2xNNMzKQECi3l9GVETyvGS8%2FAJoRuksw7QbwwnAJc2%2BCYi2%2BeHQ5VLbeqvnsXt0BMJYNi08W4MMAAKHNLDzg2g&X-Amz-Signature=33bb169bc0a40193f07b39e96a521c4429559556a8a15419f061cee6b04134e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2LSX4U4%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQCXPqF1ItlFnAMUAWHz00toO5%2BFWTbMUf23M5xBuB04RQIgEnADhw4tsgRlidmehqOhKSS%2B%2BHpiMgCC3ng2SH%2BzIiAqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMu18qcrqAsJmx8BaCrcAwzMr6y641dn9uLK8jC62lTFi66VfGk1vRVqOADiApeIBGd5GBfg2QQOXy%2F8bSVxv4a32fDEJz4hqvtjeo0vb3HHiT1FXc0BhdV%2BEMvWgTexn6MP0UELxWh3CsbseRbVhKQLkJmrOkRdh93fxz2ZuRtx0TRNmCF3obf%2B3prkKuYzF1dk7EnvC5awEdmvw8Ur8vY5Z3vAHe%2Fj9wm4Eog%2FrALSjI5KlVCLj0BGTvJEwkeWBjMHsly4ajkRtBVGHr5aNXwCccwHlaEeJeDf7euTqy%2FlFQ6MnHZz2bdfGin81K4Ht8zy1WkFXNn3V0egjbgKkXx08gnRaNySHODw4DBz61QEcgvF17ihOCebuhG9z4VuikXl3uNpOHyiqg4YKGVixyDsXNjd0O6wHgtVDCtHMqHHTi8ojllNJTT9ba2iwEtxYIu%2B3Yy9w4hjPyzut%2B%2BuX4CmcGe88VzrwSApjC4a0TWMm6Ag%2FpdZO8LswBzpNNiTHavVCECGMcabljGo8yYY2yGMV2DbKk0b0%2B9AW4XuHK%2BOKVDoDYYYK5BLzcbFcFfXeKzKjqKhxgKt0cKHOrG400DBTIB2McokOBGJQX8nXSqLm3uDd1yRR%2BSJtQ%2FDHUkWAmh3PkYFw1o41JTwMOPgis8GOqUBCnRwZZaBM%2BlgkiL0RYLIoGDR3zApvcSFrPOIh%2FM4o7WUmADIln9PBaLz5raBzZvlSOmRl9ecrOSA4qtxfzvNUF1U1ekENwN3h2bRwSOZ6TP1qJFaVcDVXrZbzKMTA6xJUqLKW0LejsGkOUaTr8%2FePaSGiPwrcFzpPHbabRIDy4fAUvzcNh80eItC%2BTbdGDt682tiMBjpIKVBNYQy9hkBdNiLanD0&X-Amz-Signature=bece3cb22d55f75c41550856224596bfe3e1ae0d875b1379dfd4b3277da37565&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNCPFTMZ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQCT6LOPzAdvveov9HuBYD1PtNVvQkVIJLTuuImvEEpl0AIgXV4UjZDKwiGBJ7M3FoNgoPE3rUG%2FIOj5TwJ%2BafNzAwYqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG9IXPZbQbZsEQkt2ircA%2BE%2BpqzH6OgrnaWRQE8GpS%2FxTGgC59B1rXtcbgOC%2F%2B%2ByGTkHLx5ymR%2F2HOFGtjYc7lGBaVb91dQ2nggH7uPEj3pvp%2BwzWoq%2BKqGGf7GrCSgI7GfxqAfOhBh3c%2FzRHjPMDrAoE%2BKa1nEoWDLxvg7tpFbwWgV%2BcRhch%2F0dlMG8ibB%2FarvVZyYHv0idR34XrtbAhhe0MioYqJIye2FvG1XHpYQ13J1J2%2Fp2%2B15deYjMEdhOOJbiMeQ5j6AKXvThlj6kEdz3slm%2Bmbg79QsIbFGeCU9BcvnDNZZtm6NJsuWyWYot2M5SqoiYhmNUMfxx21uYnuSEPr0FT8S4GZaAXglr63fsitCSf4OXqutDtkMA8I0FUvBGizl83g7V05Y0SK%2FIsrdqoT1EBKlcYTR%2FQ0OztNa%2FIIAkqJdN7apv27Y9IAEaMhV%2FKr%2FSgccyYlbVsZuLBAgiVOoco%2F2kOUtOHg%2Bj5kE5a%2BgK5RCFP%2FiowuhEhKAip79ZS6Txv%2FcoyAz8TCHvqC9utO8xBrb7nm6MvPQIx4kyrrHLRVrW%2Bi%2FZKtyT0%2FNPA2VJ1uDtPE7YShAs%2FmZyXR5ak07OI465Ml9tSW11Q9GEzER%2BWNdfPeTKdihAVTTqb1xZkYgn0rqkCR7GML3his8GOqUBbR3B5TyclWn%2B3NoGR%2BFYN5tpqQkkrSQxRgkKgk2PvxJcHCalyhKGnhFE%2FEu39%2BwJV7SjjQMBjyKF8B8LyyJwaLX8y3MSFYzcalJBLUbtXVgXo8CkU%2BL2pMd4JtEQQItx5aWKH6Zp6qymEQsrNXRPxApN8bwLNn%2Bjbzfv4FY4yP71jFeA7s%2FzABUDO3Q9ysvyjBmeNNg8yQC8%2BufFn8WHeHRZlcC6&X-Amz-Signature=161e3ccbef5167fdd6ab62bbc228d485f90ebb7f4a0aa413fe0a3bc7fab4e89c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNTFCBLP%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQDBDXEoX6FQBGEu5xWKwrj7lHZpDWpZaSMkncwudQp5jAIhAMSKYYgtzjUsYV3XyByr5CulMZ36mGwKXCQOD5N79nwTKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx72De%2BpdgqxFHBqm0q3APTzl36EjfXtt3N0FhYYxGvmTZycnEmiLyi4ONJhGkpqCM%2FNh7XloQ9Ef2rES%2FM8gCQbIzehK2Z9vfkA5l7qHWygOhTGvvlTglOV3pHm9JcsVFawHQnN8lUNwMtLivqxFRyWLXo1nREBU4IO72lSuDUE9M71Q6CU1K4bZVT%2Bbhn%2FnI9tWGHG%2F5Hi%2FI7f5hEKOZE1l8Lr3TAlGJaQY6RPCszhc8XMrU0nObbjdzHqc%2FVXVTmXDbbCy12w%2BCG3tM6D8I85Od3D49rcwOXIIdRQ%2B4p75Mg4G%2F4cIkongIf4mvrA%2BRf%2FmsXmp7bTt7dwzyIXAI4CAiwyeVqjdF3Bd54bUCrXlhb%2F9UM5rZCHgNjMmCiUkDWqDK3D66HKWIXT84dlBmixXxoLm3MvPXR0k2AZim1nLswRixn4Av4kKgVeHUF6kRFVwcY6aWHdFmFRdwnsYUAPLqSCrvKwJyPqGRdgEfMgi%2FMZO1CpWeZs%2BpVA4x4TRFWvD5kgdIvHGXDwleIMTIlrsRcfuGQyQr3N7wcijUq%2BgpBkaQbqio8gcJBMyWyTJgoSfuvPWMfjmexqMXjQ5a843vvzOeoPaF0jL%2BAy3ql5srlPEaxe%2FxG9YG8Gmhdc8X42NspGbbAaWLGrDCz4IrPBjqkAbkhBh6NYlHvJl23uJ9jCqbHBrjoY99v5bgMdJYdYhv%2FkUDqI7gE3l%2BQZt60XkOi28dvaMJoXt8%2BbQYC9q8S7OFGY6Wcka1Ej6APwWjPbyE5nQI%2BQBCs0zaaU%2FOBX3aNrRzFuTTtpVSOxa3KPxDaoZUHSdNnR2r2BNYGbXY%2BqSvmXGx3egR48fxjhrFAHsFE4mE2XwWZ%2FPhbmzkdWA2ypajGK2n5&X-Amz-Signature=58b6fbf4085b3bd8b2b8940dd0bb635ab2b30819913641d87ad2fa8f3a6da4eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNTFCBLP%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQDBDXEoX6FQBGEu5xWKwrj7lHZpDWpZaSMkncwudQp5jAIhAMSKYYgtzjUsYV3XyByr5CulMZ36mGwKXCQOD5N79nwTKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx72De%2BpdgqxFHBqm0q3APTzl36EjfXtt3N0FhYYxGvmTZycnEmiLyi4ONJhGkpqCM%2FNh7XloQ9Ef2rES%2FM8gCQbIzehK2Z9vfkA5l7qHWygOhTGvvlTglOV3pHm9JcsVFawHQnN8lUNwMtLivqxFRyWLXo1nREBU4IO72lSuDUE9M71Q6CU1K4bZVT%2Bbhn%2FnI9tWGHG%2F5Hi%2FI7f5hEKOZE1l8Lr3TAlGJaQY6RPCszhc8XMrU0nObbjdzHqc%2FVXVTmXDbbCy12w%2BCG3tM6D8I85Od3D49rcwOXIIdRQ%2B4p75Mg4G%2F4cIkongIf4mvrA%2BRf%2FmsXmp7bTt7dwzyIXAI4CAiwyeVqjdF3Bd54bUCrXlhb%2F9UM5rZCHgNjMmCiUkDWqDK3D66HKWIXT84dlBmixXxoLm3MvPXR0k2AZim1nLswRixn4Av4kKgVeHUF6kRFVwcY6aWHdFmFRdwnsYUAPLqSCrvKwJyPqGRdgEfMgi%2FMZO1CpWeZs%2BpVA4x4TRFWvD5kgdIvHGXDwleIMTIlrsRcfuGQyQr3N7wcijUq%2BgpBkaQbqio8gcJBMyWyTJgoSfuvPWMfjmexqMXjQ5a843vvzOeoPaF0jL%2BAy3ql5srlPEaxe%2FxG9YG8Gmhdc8X42NspGbbAaWLGrDCz4IrPBjqkAbkhBh6NYlHvJl23uJ9jCqbHBrjoY99v5bgMdJYdYhv%2FkUDqI7gE3l%2BQZt60XkOi28dvaMJoXt8%2BbQYC9q8S7OFGY6Wcka1Ej6APwWjPbyE5nQI%2BQBCs0zaaU%2FOBX3aNrRzFuTTtpVSOxa3KPxDaoZUHSdNnR2r2BNYGbXY%2BqSvmXGx3egR48fxjhrFAHsFE4mE2XwWZ%2FPhbmzkdWA2ypajGK2n5&X-Amz-Signature=126eafba7b63e44e1284fddcfb38b45ae65ac573de7a020b1ebbcc2f74eda532&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UECUA4LJ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQC8PrnAPrigPdQ2JCK2pINwyV2Kblok0KQ2hFuJsge4aQIhALxiZAKUOW5cPgrGYzllJUJSEDDDObwKNoEnTxHheh2eKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz1r7h%2B6%2B9t0nk0k7gq3AN9BsUJ1LVxE0n6waUIrbgJA6QgwqPjD%2Bwsp5%2BTtlmw7elN1ne7dZOvrO7awoGw4Hx%2BPjfp1HUMwkmDOJKccqgGeBsm%2Bk3twfcCuXdYg3NNRXyTuOowaQbWsu0CrldnY6%2BXVgPs2w8TXIl0eTOHj8IRa1aS6NyVrgkInrO3V1QeFbi%2F3V1uYcxA73zWxj4HENBPWgw726BndX3VcvqCGMP1jldidPl1XtQX3D6lfUXH4X6rGeJ38M%2Bw6l4O12ZzAC7V6EakGUZEmLMZsJrqe0s%2BkWDyy7b4M9FAmUl5em2TOFY%2Btzpsm%2F7ofpMMbezlkS4yijl2W6PepN7DAWMzu4V9HFPLfFz53RKKVlRA5AIf8xOkt%2F7yS1R8mlJ5hcF%2Fhqifr06Rf%2BYe3Y9Gq5HsLRRH9fc486wS3suCnHxIL%2FzDH%2F%2FkcE%2BzPckegd9psMHmqc5lRQkZShMvJNLYsYOjsgkOWrjEdx01muVuJznY0hYYtscbSlPeSnZSl15Xy9idHKbJoD26eTWRRXBd80Y3vnj9Y8ar5HLIQNndwti02YbRtUUQY2XCFywy8colQu%2FkLy1WQvzqeBYdXu1YFtFszJuVGqHsH2H1TgXD7BbCHV0YdzvtmMlfZRnq1WthWzDY34rPBjqkASkiIdGIT7xX0ExiDxv5QbMeoqlIe2J13IIB34ztpBjHLSkmFII6XevfiyJ3OHQx43Swi%2F9hYAr63adBvy7IjP00s%2F%2Bj3O9ZgpLKfHEYenSdfHO6Id6CC8dn5%2BbbM31V3Lk6fU1EDNcUtvJiyvvDPU9Q8Mvtw6iBUUGNGEpc9%2BtHIpt4ob4hKI26IIYDuN4t55AUX0UYox8COIVwn3iRSI6KvpuS&X-Amz-Signature=5e01d27648dbb14503d6660239306bf5552d9a90482965f81cac5b5cf3fd6c6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YERBWXPY%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQDg4vVI9puxuGk8SJxCTp1d3Xcv5dnt6Dl%2FjtKTQrLpFwIgbtKToR0ZKg8hfTu7USy0sRc8IVGOwyMsZe0C1g7ID6EqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFfmdxf5R2XD399JKSrcAwfNQAMz%2FLA9ShPmWef3Min8KDoUDQ8%2BeWOARTkJAzwMc0fmsrxZJb6gGmBA5%2Fv%2BnR5gVEfCKrodAc03ubf3xpjrjJtygZgliO9%2BzqBb6LkfyO380nXvW9Syfvn%2B0DWEuGWMLJAQhlWlIm2UaLHwvThLEnc6bqayJzszGcr0p9cgiEVjRZmby4ZOSwhcQb1vCDX3039FOxXid3YcMoJ90HJES8Vn%2FXM6MPPg0m5u1IDptDJZq2GZ8radWn3FDxKPgA8oVYhhOzsJyGSAf6Zy1oqr%2FJYxzT%2FG3x6eEdJ01GzX%2BFCYQTHNTWnrQRgCHThUZ3EtBxd6n8TwQBm1KiJsJLG5aHlfh7B%2Fyl1vrfVWve4cM7bnmrqsR%2FHzbef5p4gAYgP%2FUM3qbmaV8RYSNHaTGHXK0X%2F3zu6UiajkVFU7yV5Qaoi%2FVrZtTjlROrbgO%2F0NJl1YEW3JrSmg5sj8ixTqUzrAL0qMo%2F9871zVJgjwXUj3ypayj%2F95SsXE2D2qI3DmhQLb%2Fp3%2BPsyIWJCOOPIkkN9%2Fq6ew7sCAJ8eBKZcrLyBg4Oh%2FlvtJM9M%2Fk2Wm5LR8IUlmja%2B0%2FiBRqqb2s6evhUpd20edVHLLatOvMIKSfv1pyJ357ya315YGNq9TMMTgis8GOqUBuor1Q91eVNXJUBMxMa62KL2zljMfLL4cg5YgvszYD5mYAoQ2ixxCLvBO%2BbAcywogWOLII1J7pOsDrKLTLbJd9kKQ0XS0USyqYk%2Fsjo9CPqIz9OcNTnGTLZsOELF9NjnbYVEW4qp16dmP%2FZy7qT1ddK45vQaPv49mZ5LD22nNxyGSDiaAzvQOAuZMPGlMkyUsCNquSFn4gaF2U9nUJZ6Xj%2BK0Oiji&X-Amz-Signature=ab4f2a6b4536ecfd9aa87ce0a0b063b65c446f8f7934a75349e89080df943ae6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YERBWXPY%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQDg4vVI9puxuGk8SJxCTp1d3Xcv5dnt6Dl%2FjtKTQrLpFwIgbtKToR0ZKg8hfTu7USy0sRc8IVGOwyMsZe0C1g7ID6EqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFfmdxf5R2XD399JKSrcAwfNQAMz%2FLA9ShPmWef3Min8KDoUDQ8%2BeWOARTkJAzwMc0fmsrxZJb6gGmBA5%2Fv%2BnR5gVEfCKrodAc03ubf3xpjrjJtygZgliO9%2BzqBb6LkfyO380nXvW9Syfvn%2B0DWEuGWMLJAQhlWlIm2UaLHwvThLEnc6bqayJzszGcr0p9cgiEVjRZmby4ZOSwhcQb1vCDX3039FOxXid3YcMoJ90HJES8Vn%2FXM6MPPg0m5u1IDptDJZq2GZ8radWn3FDxKPgA8oVYhhOzsJyGSAf6Zy1oqr%2FJYxzT%2FG3x6eEdJ01GzX%2BFCYQTHNTWnrQRgCHThUZ3EtBxd6n8TwQBm1KiJsJLG5aHlfh7B%2Fyl1vrfVWve4cM7bnmrqsR%2FHzbef5p4gAYgP%2FUM3qbmaV8RYSNHaTGHXK0X%2F3zu6UiajkVFU7yV5Qaoi%2FVrZtTjlROrbgO%2F0NJl1YEW3JrSmg5sj8ixTqUzrAL0qMo%2F9871zVJgjwXUj3ypayj%2F95SsXE2D2qI3DmhQLb%2Fp3%2BPsyIWJCOOPIkkN9%2Fq6ew7sCAJ8eBKZcrLyBg4Oh%2FlvtJM9M%2Fk2Wm5LR8IUlmja%2B0%2FiBRqqb2s6evhUpd20edVHLLatOvMIKSfv1pyJ357ya315YGNq9TMMTgis8GOqUBuor1Q91eVNXJUBMxMa62KL2zljMfLL4cg5YgvszYD5mYAoQ2ixxCLvBO%2BbAcywogWOLII1J7pOsDrKLTLbJd9kKQ0XS0USyqYk%2Fsjo9CPqIz9OcNTnGTLZsOELF9NjnbYVEW4qp16dmP%2FZy7qT1ddK45vQaPv49mZ5LD22nNxyGSDiaAzvQOAuZMPGlMkyUsCNquSFn4gaF2U9nUJZ6Xj%2BK0Oiji&X-Amz-Signature=ab4f2a6b4536ecfd9aa87ce0a0b063b65c446f8f7934a75349e89080df943ae6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KX3COZE%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T232747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJGMEQCIFIbGCCoT%2FEygMvStBFSW8vbOqTh%2F5CtbbaMr1TprvAuAiBOCQ6BJNTWFL0%2F5FlBr0jq2kCbGcn2I3zC2Y9nlzWB8SqIBAjg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BmraHT2je3yvKtcfKtwD6ATn0kRUnsRS5scCejWkt4t6oFp0G%2Blo8y1iLWaO1BE2Ok0b1QugBSbhukWNoVFCOuqNWcWo%2Bf9XEwWtlJgL0l5CfvWsx1OkoyZOzagxN%2F9U2f9oAoIwVeJf2OrOO9F%2BVxbCTYyGTuBm3CFtbsiTEle7u%2Bw%2FkUHhrTYTAnBuUwWcoDErvslgErL%2BHOxDyWNuKwRzkHp%2BGXnEwzeVTt11M9uVurh%2BKVX6I4S4fhUO57D85GCi5qQCmbWobRH0bW%2FcJelaruXhpvnelcyV3BLtemBA7xhgWklyaVcKzdla5iPtkyauPb0x3HSY6Hn8HG4BE%2BGr4hP5T%2B4ILDRDoYm%2B6J6FFN1p3eb0BWSUUKkiuIN4OcpSycViqqE%2BLnqT89jYBSPPZp99Nd2%2FUne5P5vTdg0HtDW6brzryEQMrP3j8VF4IgLhKIXb007peCIVBSm4JmfEdtOEYnNknCSU4lL%2BDGDgquXRp%2BQziu%2BAnih9nDrHNB5d%2BCnkVdJvQqxqCnoc6iyXzHT9oHW5hXJxTrL0CO7%2BRaM7ENHKiYZOeeOdhGD75RSBum1zyXzp5yYNVp6QBDL8n4xa26BnbM35l4q6vdrxyGWXk5aDNdxrIAVjq1hHZCrttX7aEpi8Jc4wrOiKzwY6pgEj3VtJXG7XwC02M8OmoXeEExdMhv2UdkVfCqhypWBBOaTmrKi1lkkC5oDmB4d0n21QjU9rkG8J8O0UkobNdcRIZU%2FGEfkdPtH1pWZdJthyaVoKHwqrI9rdw%2BdjO3pQWAZKPZAfSu6%2BHIgpfu42m%2BVQovtjsPb1yIAzZcUD66JpYrZZbDIPkK9ojlCkgcmsovDcQzFsIJgLILsMOPH%2BiGWYrDZrmC2%2F&X-Amz-Signature=eb9556c44a19b04d5f5002218767e691c778034e588ba2b7a0aa00a0b63372a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

