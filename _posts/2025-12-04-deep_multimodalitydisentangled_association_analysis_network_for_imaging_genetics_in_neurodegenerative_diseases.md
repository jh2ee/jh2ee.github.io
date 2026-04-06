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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPZ6RG4B%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIQD0ndgQoThKpq%2FDOVlhhQJqDYEU5DBDfTC1FfuOr5sr%2FAIgMArnoyqIo4%2BCPpr6YyXcRIrd8oF9%2B%2BdTGV0AsTNfMMIqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA%2F8QU781bkicAB4KCrcA8I6A4%2B6eNsKDCxlUwLOLpOz66WqeTT3Fi%2BWh6TD1pWh%2FFhTeVv8gNsEa3LZNdolJTOky9FLiICk8NWXb8GRZqxi4a%2BKBmzAoMscg2kLt99phBh%2FJjInCHTUyWoDoAAaJ%2B%2FmxKm5ds5FQwxBoH97TQl2LcMVwsfNcirya90%2FCG9TnO7oSo7rLiq3OaKH7JVMOXSZSGM3XkiYwEz4dXKwolsj8Q00yEUGUoUikH6xyBkKaxwPJ8pqDk13nZMFZ1gTfb6iTOIGMfz9%2BPYuEb9qUn1sxCm27gVZwrvj%2BLnaI7VI3aM8w4cX1s75dL9uSG5ajweEv%2B%2FvWj%2BOhO8k%2BP6FNziunLrFr1pwIHaPa%2FhK%2BY28G3tldf0%2BzVg2g6Xc1dokA1XFpRJywXAGAbuuaDXCRCb7zO5Nrrbs%2BH4SQKvEod2myBPM4WJPX0jEfu3VjhqgZWQjiVXFVI7KyDKE7cUmPiDT%2BgpgruyLBp5WVM9i9i6EpY583i%2F99K5VhyPZy1ki4eGW8C347FoD5Q1EAMuxLRKfaoGu9ASoVmFgbp5VzJs7Fh4Ya4yzbZqHVvQonwFo%2B8s0lFUn7BE2%2Fa5ogCbbCQBBXqxavrmNEZyqcFhKzl66RdB%2FeccyKiPw8rSGMO2H0M4GOqUBMCgJgXu76KkV5o3etVEq%2F9x1xfHekoGmwK9stWSrwzCvVmKDIeFTHhc392x4BDkZ4v5s7IMbpZIiM9RekcnmsKxo82QtCYzt7xdnd2XZNwtJ%2FkxGxXBHlHCe2RkHPOWXr4QuT07F1c8kk4m2%2Bi%2BruS3blgk67rsGPw%2Bz9z2v2%2BzgRIpLh3hgNXmDSKn0xwT3XMfM57j7OMkEBHTG5Dm922BW3wYk&X-Amz-Signature=d5cf565657141f617852d5fdddafe3e806ea113c3f96a1bcfabe32ead49b3993&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPZ6RG4B%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIQD0ndgQoThKpq%2FDOVlhhQJqDYEU5DBDfTC1FfuOr5sr%2FAIgMArnoyqIo4%2BCPpr6YyXcRIrd8oF9%2B%2BdTGV0AsTNfMMIqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA%2F8QU781bkicAB4KCrcA8I6A4%2B6eNsKDCxlUwLOLpOz66WqeTT3Fi%2BWh6TD1pWh%2FFhTeVv8gNsEa3LZNdolJTOky9FLiICk8NWXb8GRZqxi4a%2BKBmzAoMscg2kLt99phBh%2FJjInCHTUyWoDoAAaJ%2B%2FmxKm5ds5FQwxBoH97TQl2LcMVwsfNcirya90%2FCG9TnO7oSo7rLiq3OaKH7JVMOXSZSGM3XkiYwEz4dXKwolsj8Q00yEUGUoUikH6xyBkKaxwPJ8pqDk13nZMFZ1gTfb6iTOIGMfz9%2BPYuEb9qUn1sxCm27gVZwrvj%2BLnaI7VI3aM8w4cX1s75dL9uSG5ajweEv%2B%2FvWj%2BOhO8k%2BP6FNziunLrFr1pwIHaPa%2FhK%2BY28G3tldf0%2BzVg2g6Xc1dokA1XFpRJywXAGAbuuaDXCRCb7zO5Nrrbs%2BH4SQKvEod2myBPM4WJPX0jEfu3VjhqgZWQjiVXFVI7KyDKE7cUmPiDT%2BgpgruyLBp5WVM9i9i6EpY583i%2F99K5VhyPZy1ki4eGW8C347FoD5Q1EAMuxLRKfaoGu9ASoVmFgbp5VzJs7Fh4Ya4yzbZqHVvQonwFo%2B8s0lFUn7BE2%2Fa5ogCbbCQBBXqxavrmNEZyqcFhKzl66RdB%2FeccyKiPw8rSGMO2H0M4GOqUBMCgJgXu76KkV5o3etVEq%2F9x1xfHekoGmwK9stWSrwzCvVmKDIeFTHhc392x4BDkZ4v5s7IMbpZIiM9RekcnmsKxo82QtCYzt7xdnd2XZNwtJ%2FkxGxXBHlHCe2RkHPOWXr4QuT07F1c8kk4m2%2Bi%2BruS3blgk67rsGPw%2Bz9z2v2%2BzgRIpLh3hgNXmDSKn0xwT3XMfM57j7OMkEBHTG5Dm922BW3wYk&X-Amz-Signature=d5cf565657141f617852d5fdddafe3e806ea113c3f96a1bcfabe32ead49b3993&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4FA3L4G%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIQDLRS%2FcmIaLbnBxXnRbhcqMxVM06OcPQ8hcy8DwcvTjVQIgISNfKSuRz8sI52xRbPO5YNPwAhGRhQYKuTCDkrFd%2BhAqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN0iB9NEql7phpypHCrcA7KuOj4%2BajispMj9kfix0xbT%2B0aC2nUyIbbFdlRZmqgwnpgDFt39k%2FmCnJswXP7vb4BYfFkHGWySU%2Bj%2FzyJzDevrnDtHjeq5%2BBFIOCMiwkKlhlrEHyWwJ8KtGIRARFn6MCER7nvXKtb6ITwAN1ghDivoUze3NLTart5UqbDpdnZOBMz%2FVq9HA3wcOzi6SmIqPIMATQy9zTY6%2BqulpthEIHCkzaqr3%2BhQVkjW3UvPknbQ0QybeibQkDPSaEbJbxiqWyYFj%2BCiiGK26oOXKqcRdMC2YjjWIublk4KKACZ3BI8r2guW6QXY3znYHqRN6mFrsUwtlGlDotEdyZA3XD5arMbYTKiwajCXb7Cfk5FPbrnxP%2FSKcGJDioZA0zWURmbcHsTTI9i7gcV2oV09XOjHKZLmEhmft2zsk688h81p0K9cPX%2F1wqCMmdN67f14G5NKcOJC%2Bcc8EP2tI5RbnF9PWys0MTiTYoQVu7bZ5zdkHyQ99Q1Hex5xo%2FqL4MAGmB11ceYDaC%2FD81Y5OG5aQo0Y6HqhqY9S%2F41%2BDhXo3AFc%2BznKFgqMMBY9e2e0fnGdx%2BjVeL5DzxHj1JsC9IRawswnir%2F90GCbPYLzMms8ebbakzD1ofplErZ7ipkZagJGMPmG0M4GOqUBwdZkLgH6KncridfxDQXzznHtG7yoOTFHQNomClU3QKl1bwchLITN8JtNh6Rdj6Jmfd5oilDyUlKor3pQ5410qoCH0rgE63AAUn02frilw0nUVIrTWJYue4jRe6MwD4VshJRV%2FAzWFOlOzvqFmpKEoj8v5gCcClqOiqzIXSOHzWUft7U0Y%2Fgan0Oq21HDyhGu4liX1%2FbRoLNwHBaCbZKPmSyfYmcP&X-Amz-Signature=8af656ea911b8bae378f8078fecc4015d77a3173f253896560de12e13ed04627&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOPGJAKW%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIGhosbR0tJJmvzTTwzuZUiBYgwjXeeRMBttYlWSSPN0pAiAsKWr91YgZCdqAGVrZcJ7luvD5%2Buq0z7RR9Z9v29T4ViqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1zvxbPOj4Lg5r2MWKtwD8EJmu9vNGsu%2F2PF9WDjB5pf0QUOHP2XycO5mSyALPhYL3Od45bIzIQyKF8m%2FFFC55rxCf6jAdePUqD1io09JnmrgomvqyKb5zxSSQKo5EqxSEMNxfggpK5IjzDv1Fv%2BZHI8%2B5jXgzJB1UrBXWmEA5GwVQN%2B8rMVWqmV9ze8ZTHluOjmZWgV6gLlX1aef2dvD2YnF%2BAY6b5V%2FkoC0RQXvIuBvVMKqaFdV94RLHUmYbKMlZ7TGfRM3Uz2DKGyEJ8Eo%2BwhrLWAuUUDZ%2B2o0swRAmkOP6cwkX22VrXa%2BbXl2V7HsyoyDhduJosK3a8TLs0DDt63LLO4Zerscj3GN1YeTpHqMvGFxzlRdgGgxpMTJsRUxEWpWOPMezz7TYcfrOHQoFxNVTgw6EzJMgni65YemMGm%2FIMKZl5q8psMQYExoZm63xWJO1VoH%2FO90L5px55QpxHb1ESlUY%2FedKlvTPAlEacoZgPSsDXHSdY4nvk6FqtoMVjPvh0O1EhsWXQpjyG7jw%2BHq3bSEpeNDkEN94fiOL6ES5r8PQyUYq1u4HpP0akCsJazRZq5eeKJYjsbOTIEN2rB8Csfw0GuuJ0aiUPXip2x1TFzAtRRqNFww8qHWlvMQmex%2FJ2B3tOXdN3ow5YXQzgY6pgFgaCIi%2BXc7AAMhbWEhGiHKbZ9RSVyDrVrK9G74ytbFI0Cqd8j%2BLZWWPxTn32VJe63WpBxd6Sy0GFhMFuNZpgDbUh0eolGKns313OxqoIVyU7Q6ZFldGHxnubIT9p7LRmWZt%2B%2FSw5XHQROMx9AFMpdtHRr6Ws711dIbw6UnPYxij6cFQ3S%2BGfMUPpQoA0jnF%2FgFP8tzXPQyw7UASQGn%2FQ%2FgvKsz5JDw&X-Amz-Signature=19b23b45febefbb757b23d6af49dac268aa021f0c0e99eb25e94f28f390ab7a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOPGJAKW%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIGhosbR0tJJmvzTTwzuZUiBYgwjXeeRMBttYlWSSPN0pAiAsKWr91YgZCdqAGVrZcJ7luvD5%2Buq0z7RR9Z9v29T4ViqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1zvxbPOj4Lg5r2MWKtwD8EJmu9vNGsu%2F2PF9WDjB5pf0QUOHP2XycO5mSyALPhYL3Od45bIzIQyKF8m%2FFFC55rxCf6jAdePUqD1io09JnmrgomvqyKb5zxSSQKo5EqxSEMNxfggpK5IjzDv1Fv%2BZHI8%2B5jXgzJB1UrBXWmEA5GwVQN%2B8rMVWqmV9ze8ZTHluOjmZWgV6gLlX1aef2dvD2YnF%2BAY6b5V%2FkoC0RQXvIuBvVMKqaFdV94RLHUmYbKMlZ7TGfRM3Uz2DKGyEJ8Eo%2BwhrLWAuUUDZ%2B2o0swRAmkOP6cwkX22VrXa%2BbXl2V7HsyoyDhduJosK3a8TLs0DDt63LLO4Zerscj3GN1YeTpHqMvGFxzlRdgGgxpMTJsRUxEWpWOPMezz7TYcfrOHQoFxNVTgw6EzJMgni65YemMGm%2FIMKZl5q8psMQYExoZm63xWJO1VoH%2FO90L5px55QpxHb1ESlUY%2FedKlvTPAlEacoZgPSsDXHSdY4nvk6FqtoMVjPvh0O1EhsWXQpjyG7jw%2BHq3bSEpeNDkEN94fiOL6ES5r8PQyUYq1u4HpP0akCsJazRZq5eeKJYjsbOTIEN2rB8Csfw0GuuJ0aiUPXip2x1TFzAtRRqNFww8qHWlvMQmex%2FJ2B3tOXdN3ow5YXQzgY6pgFgaCIi%2BXc7AAMhbWEhGiHKbZ9RSVyDrVrK9G74ytbFI0Cqd8j%2BLZWWPxTn32VJe63WpBxd6Sy0GFhMFuNZpgDbUh0eolGKns313OxqoIVyU7Q6ZFldGHxnubIT9p7LRmWZt%2B%2FSw5XHQROMx9AFMpdtHRr6Ws711dIbw6UnPYxij6cFQ3S%2BGfMUPpQoA0jnF%2FgFP8tzXPQyw7UASQGn%2FQ%2FgvKsz5JDw&X-Amz-Signature=78a804897ce824e34c72b6e6b7750bb2726a298566575b484f744f315babbb4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HTXHVLE%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIQCeA1raMrnsNjJvsarUhReyjEpkFCmJzdv0MbE2fbmbUQIgW5kOEDbt3X%2FeD1mA8idgMBxQeBBsPM8G99DvXj7o9TYqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNQAIzPf%2BVfgwWrGrircA1u8O0LDCh3ngeHF%2Bok0Kqs4I47OsvHV6KtqGoVg6ugR4QFkrTF0ip44TMoyg4kOA0BfWsNl6DhOqcKJQ5vH4gKFPDWEIyRXu7rz%2F9NB9Xi5D6z2oHv8vTS0aK4W7tPmfRdIefNaEbX%2FJCtvGALjIaWTi5HkuzCNiuBLJ8cTv%2Fm24pFUEk5Ps7FDdYC%2BeXz7B2HR9HFUY5vRUK6RJ7KzZdfq9hsd2tRIeVvfUzz5isPAbSsrjKog3ILfTb2%2B8p1qxnuk3fw4KTZrJmj30qpHCr06%2FpU1f5Os%2Bc2o3tCtl3jq%2BTKSWuvVjM8pM%2BD7TZRIqMExczUND6njj7AUv6jmI7wKj0b5c3VFXsHmzmLx89tViu9GUIgFD3Q8Pdl0DzcTsmK5e3XSPggHOEzDHo%2BxktSVSH3yJB0%2FApIRxixCCRlu6S5cqq4k%2BQ574HhjUd%2FTKEkuw%2FNKwjnF%2FDXbAraeCvCWK3H6KTSKFwHUYhPrkBGXcXFRLxiVfz2vmRu6NaBmwSJ5SlQu0J8Z4pT2t7%2BTen%2F0N8fXdIXgYkVa3Dr4hWhp8iYQVVn3fDv%2BqHKRau26ERiObqSAyMk6B250bBiGUsaEWW9C9%2B%2BTMyREDvdOvuy8bGm%2Fxwry5aHA6ayrMNSH0M4GOqUBlxafDONoUBFi4FnWjKsS19kxQRFlqPaJcz5VZhcv1qqwH6MvZ%2BtLl0OLfLmBxE3YBj764p03QRw15jRyswXrK8olVxTiPs1tshARiIkiNX%2BmRJm%2FltGtfDwKjARYmDuPmKJjwW%2FgUDLf7siy94ZJV7SAJcne0eOmVTjkWrSPKKVGi476HnUfHMDWAzrUGqowA4p8K9p%2FY3xCNemQFQddel8pQkMW&X-Amz-Signature=3782f37da63fe8f9ce5f48f90040151b65aa94380739275dea579cdfa32ba632&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAAZ4EFY%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJIMEYCIQCQ7MSQ83yaVqsWFMRu4gELONxn3xxOxB3gFQR%2BJnihOwIhAPCKXjZV9QBXWs6j7KiM5NhWa%2FY4kxjAzvUbIEipKU0hKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx%2BI%2B0pFqeyQDVwO6Iq3APXTu7Noy9a%2BITyk5mblh%2FMxhoC40ecxJt31X0gCD9olKWJyMR%2B6b%2BiZCjDHRMY3XEVsfeAJVtAKr2iLRpc%2Bc3WqlA7HrF%2FF04fh5tce2ubkCODhSk5catyHeDtjGlC96LCJTZwQRBN7j33iFtcgNYLxTv1Y%2FlGbM1XSDwCkm8pJ4SRsQV5tvoYv4sa0gcDjHspdM1CD0brRd8txdtDm96mGSbW1OkoU7vZ%2B1wHOesPOu1CgzkN6y%2FWrVZZN7XGKCo%2FNVxoiFr2Aga6vhx3%2B3VgFi146haDScaqVs34CJZESDYLyX4Jbc%2FdkDvsWTT0WACOBUBNYo%2Bb4Lf%2BXPcIrPVt1vcN6VWB%2FbyZQDPNSaa0fwx35ce0S%2Fv7Jh8RwU%2Bh4ae6FvhaITtDLlpLI1aZwMI4aemSM%2FAfeQl0%2BMkVkTH%2BZdUdI96T0hMfaRcys88Cabzf7mbSBs62ZNvistuPGzLMy0TuyykEYczHa59FiIFH%2FnbenklkZ0eABLkTRZcHYXNjaK%2FOjtWLkTqxzzAfp%2F31WziA8t08Y0oheacYpHop20ZW7RU8Uo3Y7JwCzh6Dp8NaNoSqvcC0IkvZefeqZssKkHA5BLaWnBXZ40q04ThoMSE0BXWXGUsnz7xDFjDShNDOBjqkAZWptWMy%2FIO6NhuSmutrtSmQWGlWSbjn%2F%2Bo5rQwSqR1mqCFHT5%2B5VhqQzE0bjPc3tvdjD3UYVzxHmBXXOeLKO4rKZ9DFDcPSSrlsxTdheIYQ4u2dGkoOspW3%2FQZSE3NKcQ3yWYbhPFumKtRSpPR4FssDQA2nymYqSnNZQldQCEDOy321ogJtdjx2qmy%2F48QtdfWsOlYeisUqezSDjkfjBdfdHUQE&X-Amz-Signature=93e65f4e886a25623f21c8353d4bb25dd30312213930e60d8e61b9f38fdfe0fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NZ67XH4%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIHKOdjrzTXUtpsrMzvGLbTvT03tQAA76XsESsduyn3idAiB0UVgHrSl7VbcZl0zp3FFQwRfKDViUL5dF6VRjPmnQoiqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMr2p8fMC5qyaYME2LKtwDQq7%2F64bqcEJouQAR8GoZkrTiG2n%2F%2FtUTVosr6XEVNJnVS8WfEAB64KrIDcz%2BgOZJ46wJbfRIRgIXliTCzPOOaKHyXkGfL8iQEY80jw%2ByHlBJeFjz2XEulU8KZD%2FUX1G4gxDGrEcvX%2FtUmdrb8SMBF5w5lmAA0%2BXFzaTtLIW5lscJZH%2B8S0XJzNFlGnUzQ10BINEdl2NFVIYdaAKi0vmwTkuVFl6BKAoOgkaP0CLtbHmXPtuJaCZ2lbMkCZoJU67WB6%2FOtuJY1TIrxPabhYIrGw2kwlWENbTwFgBkgHWEBCzQLllFADKSBuMUcUOVBUINT%2FmR3J1%2BNQYIYVF9gje%2FT0c68OZ%2FXu9kWmLBMJn%2FyzCGxb8fa1NUJFRSrKAJXW5u0bvNmzJuAqwSRgt5vNKXxEsZ1dk23A%2Fn9ZdKq4t7q88qL3VFMhrmyqK%2BtW2FQOsYstZMSuEe9G0bRcClcMtltFRSCktYhSVM5c0sG0Fm27vq9sbuNGPr%2Bo8oUp5WLfFH1olRfoTMNAmGcnOz%2By5PGLxMGkxHIp5Xp%2FC3U8W8Fns4ntcSfTAATjsDf2rzlj1X%2B1IR52ccgtnLrW4E0ZnqMnTJSE1Zl%2F6ojFN59T5KeRaalxUjlZPDmII9LfMw5obQzgY6pgGSIxUkfzn2DfJw5GWYaJssEmc5S4xz%2BkhegW7gBSZJBr7YO%2BGeixCEXi1QCrUsCg%2FrbCyVUxGr1%2B5rFyEs9SCnixYjuWeSdx5lZFxwMMEX2KtwjTQXyMfGy8VZO7fkTM2CBBRpeu0vloqcJ5nLx3fzLqic2aMyrWe1T%2Bb7q%2BF9qlepQL2llmS6FPetKWDVBQXNF1ZxVusFPoXQCzg%2BELWh322VFX0B&X-Amz-Signature=5b76c7915b5975279171c295d3f4b6e8dcc23f85fbc028b6cfa177791ef2697b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KFYIUJR%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIEp61KzmwJU2PAMYp7fySlUXv%2BveBx%2Foctnb6LcmfQPoAiBBAfWvrCzW0Ax4bLJs4kC%2BeYoj2gKxsPQnFTB%2BMZbVcSqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3wsm5jinusol8Q0CKtwDAetn%2Fyo%2FftzX8SroakcUYOuVGXB%2BaW54tGVUK2RNFipl7uA9pGAZdBFZFRfCOldvATNVjKCc3p4wAjbIsBKFU69gPILb4VISGEHP918Nh0fHiREywz38qXKstr%2Bt5mcWdF81WNfG4JJp7j82oV%2Bi2DFUAqVrgd%2F2N2l8fQ837p6jjPpl8OOIJTdmjpcgs2zBU2HKwO4YC%2BRP4Evzo3K%2FUF4aFkW48WABZz1jg8dl%2Fvx5JbiQ4N2D8q6DWzo0p0NayHw9WqfN%2Brk8WoXXb5KCHq7g6xufuN1xz89C2ApJbhwA9jxRfq8UfsUT3ronJACLk0GyYsDgvpIxfS1SZKoF7zSLjU0HDUF3Ef6jTPGVAg7pYRP%2F95Q8SMLk%2FOb2n5fyxCX4%2B5FvGJOF1qPC32%2Bn0qhQrHGBYStAJGEZnZE%2B5eFS%2Fx3JcVIuDyCTVN7qoi7cIP%2BzoaDsswUsCySnt2l412sS%2BW%2FtFr6w%2BM%2Bi1WQ4cbo771qXZktlHCDOUUdcnew3vAYVPmZ9ZgbMqYlBtE0Hpf33Ynsz%2BfXsxkSNY1BOL0FOEZbZAufPrEiwY4SPI9Ss1kNsPb%2Bx7%2Bxa5Lhu0Mn0MjfWndFxXs9ODcQZ9prDHEYBDKuHj1ClMaN0xG8wi4jQzgY6pgEjSgwYFA1VDXkL8JBOdiRiZZHOsWNWpf922j00%2FoAbxb6y65A7nFwvCTOEBJjevRjN7AU3qkqMtnIdTpXJg8IFb3k1pZ8pvRnsgBgy2CSl7M7Ot5mA8S%2Bp2FRL9yITl2aGVMntzATK2eS9WUiOE0RhtW7JtTd3CVpNvJdMrlR%2BKYrqC9WpRxlGUfoXT9p7OjhSN%2FwuLc%2BT4kOWtDSHxf1jEyk7glPs&X-Amz-Signature=6c7f919d16f6e2bd5d9f057ed179473202a0509147297ee7e8e6fd8e52af7f83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KFYIUJR%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIEp61KzmwJU2PAMYp7fySlUXv%2BveBx%2Foctnb6LcmfQPoAiBBAfWvrCzW0Ax4bLJs4kC%2BeYoj2gKxsPQnFTB%2BMZbVcSqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3wsm5jinusol8Q0CKtwDAetn%2Fyo%2FftzX8SroakcUYOuVGXB%2BaW54tGVUK2RNFipl7uA9pGAZdBFZFRfCOldvATNVjKCc3p4wAjbIsBKFU69gPILb4VISGEHP918Nh0fHiREywz38qXKstr%2Bt5mcWdF81WNfG4JJp7j82oV%2Bi2DFUAqVrgd%2F2N2l8fQ837p6jjPpl8OOIJTdmjpcgs2zBU2HKwO4YC%2BRP4Evzo3K%2FUF4aFkW48WABZz1jg8dl%2Fvx5JbiQ4N2D8q6DWzo0p0NayHw9WqfN%2Brk8WoXXb5KCHq7g6xufuN1xz89C2ApJbhwA9jxRfq8UfsUT3ronJACLk0GyYsDgvpIxfS1SZKoF7zSLjU0HDUF3Ef6jTPGVAg7pYRP%2F95Q8SMLk%2FOb2n5fyxCX4%2B5FvGJOF1qPC32%2Bn0qhQrHGBYStAJGEZnZE%2B5eFS%2Fx3JcVIuDyCTVN7qoi7cIP%2BzoaDsswUsCySnt2l412sS%2BW%2FtFr6w%2BM%2Bi1WQ4cbo771qXZktlHCDOUUdcnew3vAYVPmZ9ZgbMqYlBtE0Hpf33Ynsz%2BfXsxkSNY1BOL0FOEZbZAufPrEiwY4SPI9Ss1kNsPb%2Bx7%2Bxa5Lhu0Mn0MjfWndFxXs9ODcQZ9prDHEYBDKuHj1ClMaN0xG8wi4jQzgY6pgEjSgwYFA1VDXkL8JBOdiRiZZHOsWNWpf922j00%2FoAbxb6y65A7nFwvCTOEBJjevRjN7AU3qkqMtnIdTpXJg8IFb3k1pZ8pvRnsgBgy2CSl7M7Ot5mA8S%2Bp2FRL9yITl2aGVMntzATK2eS9WUiOE0RhtW7JtTd3CVpNvJdMrlR%2BKYrqC9WpRxlGUfoXT9p7OjhSN%2FwuLc%2BT4kOWtDSHxf1jEyk7glPs&X-Amz-Signature=c285b4671117ed6bedb97aa568d11da76c130d3670780643d3e9a5540ec4a8e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Z3QJPC5%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIBjAwNBHkD2jTu8LvbqlLX4hqoLUk%2FbKvM0%2BRWLfylpBAiA6%2FoP099%2BuA7Nf8hZNE0tje6DLRJB0XwvSXHFUaHkJ1iqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMEwk%2FRysUnyuMbNzYKtwDC7O93CV%2BZmHm8RNeeMrkx%2B7XMGhWHDT9vIY6fnNZbbAEnqwpL1l6k6uP8o%2FCLZMOwEhEUuLMARjEwkUW%2BZrLn14H5M4jD%2FTO2xxxBytiL1SGvHeJOmxBRa2T2shwy4NvsNhPCFBbJ5MmYwXZgwLgKaoTb%2Fy3WCJepFCodpDFK6wtCQt8PyWpciYcn8IpTi4PaNnkiDTRoOII7qG%2F0UdTMTugL6OUnZXz5%2FxgdtIkhdx4MntGaWTF4VeMzb%2B25mrBWk3iCGIhp8760s27yiva4BwPWDcumbzn59gfIERpEkVkJULRgZa2XEglIoiBK%2FLZTPUdozYyA8HA3Lt4BeezwkeAEKA%2F5MCEqLnRksBVDX%2FUBEcC3qU6ENdPkpfXpk7ro%2BEJ%2BHDwSBOk9A1UWwAVJNlrwD2nrUBGe2jbPiLE5W87%2BJCfty251Gv4yLGR9hJvDxvHcxo4J%2Fo9UlPebZtFU2PjAXTBbZAml1eYgHAlHJk02mgPcZOrzGPE3l4ST6qXGGL93emCXPHgu7sLf%2BKGB1Pm7qlfBFPfBoeD2v9Q0ztv6TAT4PUoMSJxOfFuLhenr0O%2B9p%2FzPq388FnJa1TYGYsi%2BbDR%2F7JGeheM6fyHAlgz8Eh1PBaF1DlFAv8ww4TQzgY6pgGk3LlDwMcI5xnc2de%2BVhRYCAV0MRkdN7evNr5LQL4Q%2FKOM%2FhOh5NLiIlScl%2FqVprU2Q6M2XSFpCRE3OcSrkVDENUfBykcwYRTsALyqf74cUyOoy4mpUbVG2XJysgXSvIesvIi1W59%2Fto5IsYdSR7RZcU8IElMfK45ZX54C75xg2XG8wtrRzrP0kA2yKiktywOMH73N6Ov7XLR%2Bc88KTGj4kXF8hmxh&X-Amz-Signature=1d5fd6f50818fbbf2d16ef268a331018b9cc13ceea326e6f8fe796c5e7484f00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466527FG5VD%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIQDrOs1VenxcTvIbI%2FJ4mWA6sneA6cJCVcY6%2Fi3ntt3DygIgcRFdtkzNHOO1lG3aV3s3tmLbAN90JYDpWg4le2VyApAqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA1NbHhskCU0XnwgXCrcA1h1J3UyWgRPqj4uoVvce%2FGAoMlfI%2BqvGavp1SZr%2BMsa8JQ0wHFBRAjvCD1MaIBzIt99v0XS0QntSoPV2gba5XkFb5MOjbFzy7KGA9lQy3oX4JpsPowRu3nMG%2F9kAspE5i8kC8zKlfz67stJGZHfLYaA7aLm%2B5i86bplkyO7cn%2BDk73%2FadnY4Q2Ay8bUcnKXKJBek%2FYsCV3cE6yebXH4WIcHxXBZUiimpgcOeKGcz0X42Zn%2Fdhq2J08aK3RITj62K437xNYkTIAp8ggrtVfBY%2BQTL%2BlFVbNl8dsqpIKHrETamuRlJ8djcbP%2B6q%2B0gMvWN0W5hddVTNpMyW1cYKTgt6fKuos%2BoJv%2BlVKQZXZQzL7RHY5T%2FYVQL5Z1dFJQtCMo%2FC1Fcx4gsWqY6k2bv89pOfvt7MNgPNdgPUwjJ3tCpNH8OPT1Z4arTCBw0usS6ABQyGbK7UjFMpDZBFJ5VDjaQHbWDPciehXDhDH8uQGv70RDD6650qnsvSXO74ZYM1891vYO%2FNwNKTLGPgPJG2FZBmoKxmpLzi4m60EcxTiANe%2BeGKIaFK3X6xohtaGPZ%2FSr7zJWgwXNnZ%2FNyz263lXJTL%2BxDGYWmqdXOkpPCkAugLGdY1mZXHdUThEeAeDuMN6E0M4GOqUB3rWGr9tTWsnn%2BNCD8LPQ4usZYW7LmRe3gtYVj8Z7XK6OsPoHOM1mcjso2tRs1X7bBFaOS0sPhQ0xL1NjpXDXKWIjw%2Fi1ZNfs0I43jnZog2Xh%2FR39xMImZi5FvuCYAvMEOJGKmN8T%2BOlL0sq9jeYYG454FqWXFBFMx6IOJmZzt6bRpDlhw%2FZCVYsGEwM5TKEFK5K05WGlrOldzvR%2FzbQEzvJ8gpt%2B&X-Amz-Signature=da2eb0e7645cf6e82c0bee4f8f8b48aa25d863d1c8e52ae9cc4259ec846e7f66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466527FG5VD%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIQDrOs1VenxcTvIbI%2FJ4mWA6sneA6cJCVcY6%2Fi3ntt3DygIgcRFdtkzNHOO1lG3aV3s3tmLbAN90JYDpWg4le2VyApAqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA1NbHhskCU0XnwgXCrcA1h1J3UyWgRPqj4uoVvce%2FGAoMlfI%2BqvGavp1SZr%2BMsa8JQ0wHFBRAjvCD1MaIBzIt99v0XS0QntSoPV2gba5XkFb5MOjbFzy7KGA9lQy3oX4JpsPowRu3nMG%2F9kAspE5i8kC8zKlfz67stJGZHfLYaA7aLm%2B5i86bplkyO7cn%2BDk73%2FadnY4Q2Ay8bUcnKXKJBek%2FYsCV3cE6yebXH4WIcHxXBZUiimpgcOeKGcz0X42Zn%2Fdhq2J08aK3RITj62K437xNYkTIAp8ggrtVfBY%2BQTL%2BlFVbNl8dsqpIKHrETamuRlJ8djcbP%2B6q%2B0gMvWN0W5hddVTNpMyW1cYKTgt6fKuos%2BoJv%2BlVKQZXZQzL7RHY5T%2FYVQL5Z1dFJQtCMo%2FC1Fcx4gsWqY6k2bv89pOfvt7MNgPNdgPUwjJ3tCpNH8OPT1Z4arTCBw0usS6ABQyGbK7UjFMpDZBFJ5VDjaQHbWDPciehXDhDH8uQGv70RDD6650qnsvSXO74ZYM1891vYO%2FNwNKTLGPgPJG2FZBmoKxmpLzi4m60EcxTiANe%2BeGKIaFK3X6xohtaGPZ%2FSr7zJWgwXNnZ%2FNyz263lXJTL%2BxDGYWmqdXOkpPCkAugLGdY1mZXHdUThEeAeDuMN6E0M4GOqUB3rWGr9tTWsnn%2BNCD8LPQ4usZYW7LmRe3gtYVj8Z7XK6OsPoHOM1mcjso2tRs1X7bBFaOS0sPhQ0xL1NjpXDXKWIjw%2Fi1ZNfs0I43jnZog2Xh%2FR39xMImZi5FvuCYAvMEOJGKmN8T%2BOlL0sq9jeYYG454FqWXFBFMx6IOJmZzt6bRpDlhw%2FZCVYsGEwM5TKEFK5K05WGlrOldzvR%2FzbQEzvJ8gpt%2B&X-Amz-Signature=da2eb0e7645cf6e82c0bee4f8f8b48aa25d863d1c8e52ae9cc4259ec846e7f66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTIMQEDN%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T194234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJIMEYCIQD0qv9LwPez%2FLSgeWuUfcqUclVeKV94X0SLkp%2FXesP4kgIhAIhSS0FdGT21PNQNgcGr6LqC6KZy2KX4r%2F2gCb4Et9bOKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzDlEZoldkdVJh%2Fi%2FQq3AO7%2BPzfZlucHi5KrwELYwkVlq%2FECBrA7yCZMkzsQ5FWbLyBZv9rxJVovEMWix3WiHRpIBcAHUDY6Xb5Y%2FeYwx%2FCGx6q2vf%2FEK7OTawxeByBeNjDTyF%2FC8WO%2B4G3mlGfZUjLkhiUG17NyETR%2BSnvdy6gCd9tmAmcKZZzBKBzcYGIZwaav9HykxmJNdtYMlXorSzk1dtQ4VP52IaxDBlsnElquy3vFALi6aMQdzZl7IXq3R%2FAnQJ7zN1WC0Fp4KCgPY4lrpP8hn7JGldBek%2F6jKuwrUYHJN1fHO9S9gXPIJFcwDg05g8hW7A3ES5AVke2fCX9ZKFQ9iuKc5rWJgHyhFGHQZPox3jDBXuC2fhim9tZbws4hfBg4bXAkTtwjU%2B6E60Lgonu6DIDPO01DVtcm9uCpwgxxOGISlAIAudFerMKXPTgtPyMzh85DrhEOhmfPJJ%2Fb8QMLjBBkdmtlNzGpe8BI1Gfzk70xRmf9s%2FUtviEJgwiKwxZ3qjj7SXFrkVks%2FWRi0ToIa%2BTV6UY6F1JUqaPOf6VXGmIjE7W1olfeI%2Fi9Cjhz%2BA6xrGHYUjQOqdRv3OcF%2BsIioKTMDISn1CLI8xVAi%2FLa6DhWK4doie0vHDVPmnbRrHrfIY%2F%2B8J0ejDohdDOBjqkAcEP%2BYKU%2BKdGwosbFAL%2B48DGDT65dIJVtiNDY7E%2F0dp8576DzRj8n9yTNG14LFo7uztf9V2epzeLHLEIF1o4CHtI1JyK71G8oL1ApXF5zaWbDKxuS9zasMyXDhfvH8ZFiCDLTv3vNnc4nL3TURxjCnyNrYgsnr%2BEvQ2ulogYUmj5w85CcNxo3b5k7byxi74FLKoeHATMKoxm8MBT7I4%2BcD%2BHz496&X-Amz-Signature=a671465bd0626cc0ba821d4ca30c23458a157c4b5d303e1ca17b07b826a08b96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

