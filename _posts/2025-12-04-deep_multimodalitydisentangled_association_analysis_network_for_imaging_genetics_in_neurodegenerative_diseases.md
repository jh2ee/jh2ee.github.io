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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNWEM4WK%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD9SaMm79M3OpwQ4U3ZMrzJOzXRDl9qLmrxxSo5L5ot%2FQIhAKWZBvj%2Fkk9%2FEBsLnv7yM%2Bh4s5sDfndfMJsNEUzxnAQqKv8DCFsQABoMNjM3NDIzMTgzODA1IgzWbLJnhsJWl37WGdEq3APTcCWukK3qechaDuK9K8yuqLebEleuMlW0bo4GKSq9%2BFh9JgAKFsPUdDgEL%2BnP63enu3CDgCBsh6ZYovwoYwV4nkHAd0J06%2BXH%2BKk8eB8A%2Bspq4VhcauxFqEfvlM9EvpN5a6wuIZh%2Bq4VOKAx8IWLXztZQtgf2OgooqbcqU22doOKWoxg4Ssx1jkNQu2TPuYm%2Bff9P8%2F6W36ta7wJBLRCRQTyonvZezChi0LrRdUEFicX%2Bimcq0iWH4gsb2sqqXYUAdXnqDe7gBv6dA%2BxNXxAeg7RieaHgd3jB%2FtOgWLynisgtxVzWpKlC%2FzVcOpCtTHxBkBQchVuPFWkSmb%2BUprYQT0OcCSNV9N4tq8IccgfF%2FRVLSC2AVN4UsO8ZQc39uYnAFBc4h2a3G36CGCdIV8GToibxb2aP17qlWI8gtJRyQo%2FXkpd%2FXpZ15Z1sg4PvV7w2fS5U7gj9jDWDosHxZ8qdKzRC9uNd07WyIG5c4G97S%2BMX%2FW4jxsVUyb6DnIx8wuu7tgKYBICWP5%2FZp5%2Fv7xitkVE%2FbFUsE3lr5Nn1y6rIO6owb%2Fibb49BxZ824mmx7bSfWDqY78yJKtHBcUl7kQDZ2tGMXcIelX1rNVp%2BBc2HdL9yyQBCR7gCIJEf%2BDDx66XPBjqkAUPUa8LYyN6azXpN20udfGHzWR0Br%2BVEm2ZH8iAS7YT8Z2xsV%2FSpyizw112uxp69YZBeUwaEw5hKf45jluMcPraC%2F72vIfIxIKBoG7eh20NvZUeZJDjXniRvBJrQ1owcjKdD281WEMZ4eOsMe2YflQKS8uebUsWZU8vStRvAvdrQrEWbjgpVJb5FL%2FZh02TangjmWjrjuM%2BqGZ9ZeDat7gJxwW%2Bx&X-Amz-Signature=2a1ddacd5831e54ccf86a5790dce181b6ead0b46ebb32675ea7b4e3b45f116e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNWEM4WK%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD9SaMm79M3OpwQ4U3ZMrzJOzXRDl9qLmrxxSo5L5ot%2FQIhAKWZBvj%2Fkk9%2FEBsLnv7yM%2Bh4s5sDfndfMJsNEUzxnAQqKv8DCFsQABoMNjM3NDIzMTgzODA1IgzWbLJnhsJWl37WGdEq3APTcCWukK3qechaDuK9K8yuqLebEleuMlW0bo4GKSq9%2BFh9JgAKFsPUdDgEL%2BnP63enu3CDgCBsh6ZYovwoYwV4nkHAd0J06%2BXH%2BKk8eB8A%2Bspq4VhcauxFqEfvlM9EvpN5a6wuIZh%2Bq4VOKAx8IWLXztZQtgf2OgooqbcqU22doOKWoxg4Ssx1jkNQu2TPuYm%2Bff9P8%2F6W36ta7wJBLRCRQTyonvZezChi0LrRdUEFicX%2Bimcq0iWH4gsb2sqqXYUAdXnqDe7gBv6dA%2BxNXxAeg7RieaHgd3jB%2FtOgWLynisgtxVzWpKlC%2FzVcOpCtTHxBkBQchVuPFWkSmb%2BUprYQT0OcCSNV9N4tq8IccgfF%2FRVLSC2AVN4UsO8ZQc39uYnAFBc4h2a3G36CGCdIV8GToibxb2aP17qlWI8gtJRyQo%2FXkpd%2FXpZ15Z1sg4PvV7w2fS5U7gj9jDWDosHxZ8qdKzRC9uNd07WyIG5c4G97S%2BMX%2FW4jxsVUyb6DnIx8wuu7tgKYBICWP5%2FZp5%2Fv7xitkVE%2FbFUsE3lr5Nn1y6rIO6owb%2Fibb49BxZ824mmx7bSfWDqY78yJKtHBcUl7kQDZ2tGMXcIelX1rNVp%2BBc2HdL9yyQBCR7gCIJEf%2BDDx66XPBjqkAUPUa8LYyN6azXpN20udfGHzWR0Br%2BVEm2ZH8iAS7YT8Z2xsV%2FSpyizw112uxp69YZBeUwaEw5hKf45jluMcPraC%2F72vIfIxIKBoG7eh20NvZUeZJDjXniRvBJrQ1owcjKdD281WEMZ4eOsMe2YflQKS8uebUsWZU8vStRvAvdrQrEWbjgpVJb5FL%2FZh02TangjmWjrjuM%2BqGZ9ZeDat7gJxwW%2Bx&X-Amz-Signature=2a1ddacd5831e54ccf86a5790dce181b6ead0b46ebb32675ea7b4e3b45f116e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYMQR35Z%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDuaGp2W5QSjWoIkXAjLn5gpp2LpQ990M9MsKYO4auxbQIhAO1OLol15nnSfBalYOC%2FXm7O3FrCA5dtr1eUf0%2F0%2FiqhKv8DCFoQABoMNjM3NDIzMTgzODA1IgxBgVByg8o5d3iBMoIq3AP6h334mj6VEK3aa4G70vnIm18zR6s%2BbiwuR29frjOPJttp5rFZ%2FAlGlslQKLNEVfqirGn2oTbgSppmPbx2ZR%2BqUMPD8NLYNMYLJQZYD1JKdA8KEQOLW74rztrZzqDTG3y6SvhYIN1R359nivXtgZF%2BOL%2FVIqsFSppalBtahvnMm8lP3XywcYMdDKEgj3FEiDXhiAvXxxhGvFrLqExK7X7S%2FntP4LsYm7DzB90TcdFh2fweP2vGWHSN%2Bt%2Fv%2Fs16vAxBp2WGc7X1kJ9%2BiOjODI4cTUIZ6xpvOJ0vxJtRP1%2B3OQHvgq4e9ohdsF8kqh1tUb7CCJCXH3bRj7uo9L7EQKwl4lVEcFtSok6RllpljGsydcSzxPjKVC49oqcvWUUQfLRf9ianE8OQ%2FGBCznib7KazWN8Gmyf88T38GHqx40E6vNfLqwQ4xD5Nq65Rbj5fqkyCYVx62SR%2BbxRtcTp0rZZRuw636ay49e%2Bsv2VSoXVXTY9wGPkmGXHNv0SxLOVTNRsjaf8ZYMgNsRjKwtO%2BKcIKzfajhtxjLOGflnPRCq7fRpVuk89ly2X33sxZ39GEn268HcwWyVIl7QV7J9djjn5%2BLy1QBoxlcXwTweCgQyiXhLWRvtL7V24Vhn5bCzCC3aXPBjqkAbvrZtfeJByQOQgsavbIzP2V2BWMs9duVuQ%2BJmRTdx5PP9UA6fn1hgJLOZrBjACDw%2FnpNjDPVJ7zTqwt3hyjkWasu1rbZkpfXbgqlf%2Br6Bf0VqVxuxemLtNsthKe2oNiVzE%2BY%2FhuKRvt6gdLzDMpbHi4Yd1oJ9pnQIRRW8QSoB7cfCUVGsp4m6vgbxdAGRb9g45m7gJm60pL3POJEXM8Y%2FXEKCAt&X-Amz-Signature=c156c0aa4c0d119edecabbc29aa07a8bf240db5271489dceda11671478b56b7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637U2I7B4%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEBTt2nxR%2By5RgonJgCOTjcwS4z2QpghY3Wkcow5HU20AiEAivVsHpvfbfTG%2F1dqFFAYnHnZlNUmN2v%2BB0xElK419cYq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDOVXN53%2Brnw6%2FPri3CrcA9sDBD0cC7zDARMlAgVacDJbmGi7MjrVzJJH2PcLHRleGLHayfWSEgNkpoK7ml0eh6E5JP67tMe0KhowC8BRDVVtnueHFXjRWVYLfoimQidbztivtRpxJtPiqf7uLk53s9wAbX0utgpT0kvQOMg82SKszJnNYeXdp%2BEO39uDEp0QADel%2Ft1UABzUQTl0l7U2ManeIAqHA9AXDW3vg7wS6mc%2Bz%2FUDy3wPm7ynxZ6EmWy4i%2BfughIp6mmsy8lr%2BsUVndiWmPHUZvF7LSGyKWVNwBB%2FAJrP0utvKaZNe%2FZ6LpK6pI04eZzAtOzRp4I01evkVIZI2jSZzf5DArgQovVCyI%2BrwB27t8Z554o0XQJpcI1JfTdSDe0unrUlL98wXC2fE2CaVeWcmB%2FeYv1f%2BayzPekOYkEy7yBRJyP2lKzYUqbNpFtyqhSfngNeqrDKvDCHTZjZmw18%2F5vr%2BnVG1y4X4r0CnUOEoJPtTpFyOfDtshSzY2HMWHzZyppqAINRReQWIAsMyQfYq7TLNCECUjX2s1W2gl9701KyiKxlH43EGFEe89hGUtH0%2FYdrQJLKs71DkWR%2BvStRegm7wz5rikwLmJWqx9zZ6ubBFUTQ7f6Rp0ch1P7CC8sp83jxZhWLMPGMps8GOqUB7mH0y1tWC4iuZj0RjnWS2J%2Byth00vS2W6OrjWzavfoSEilmE2V87qz6EMORN9KhNBQNKr1c7BmyFR2jzU7ffiOrwbW7Q%2F0AuSj536Menjg4xWOMT764D3w7Cx0%2Brzha7Y4tWbcrHdXjfvQ12WB3gqqtRbKAi8DFRLaRtajzHEfX2yMli4xt13sM%2BE%2B0TPvp2roZXQwV%2F6JGRl9neRWAkWdHHnMKl&X-Amz-Signature=1e9d3f4946b08d87e5b021846e52940b0a3030af431fc1059c12c9724b5e389b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637U2I7B4%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEBTt2nxR%2By5RgonJgCOTjcwS4z2QpghY3Wkcow5HU20AiEAivVsHpvfbfTG%2F1dqFFAYnHnZlNUmN2v%2BB0xElK419cYq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDOVXN53%2Brnw6%2FPri3CrcA9sDBD0cC7zDARMlAgVacDJbmGi7MjrVzJJH2PcLHRleGLHayfWSEgNkpoK7ml0eh6E5JP67tMe0KhowC8BRDVVtnueHFXjRWVYLfoimQidbztivtRpxJtPiqf7uLk53s9wAbX0utgpT0kvQOMg82SKszJnNYeXdp%2BEO39uDEp0QADel%2Ft1UABzUQTl0l7U2ManeIAqHA9AXDW3vg7wS6mc%2Bz%2FUDy3wPm7ynxZ6EmWy4i%2BfughIp6mmsy8lr%2BsUVndiWmPHUZvF7LSGyKWVNwBB%2FAJrP0utvKaZNe%2FZ6LpK6pI04eZzAtOzRp4I01evkVIZI2jSZzf5DArgQovVCyI%2BrwB27t8Z554o0XQJpcI1JfTdSDe0unrUlL98wXC2fE2CaVeWcmB%2FeYv1f%2BayzPekOYkEy7yBRJyP2lKzYUqbNpFtyqhSfngNeqrDKvDCHTZjZmw18%2F5vr%2BnVG1y4X4r0CnUOEoJPtTpFyOfDtshSzY2HMWHzZyppqAINRReQWIAsMyQfYq7TLNCECUjX2s1W2gl9701KyiKxlH43EGFEe89hGUtH0%2FYdrQJLKs71DkWR%2BvStRegm7wz5rikwLmJWqx9zZ6ubBFUTQ7f6Rp0ch1P7CC8sp83jxZhWLMPGMps8GOqUB7mH0y1tWC4iuZj0RjnWS2J%2Byth00vS2W6OrjWzavfoSEilmE2V87qz6EMORN9KhNBQNKr1c7BmyFR2jzU7ffiOrwbW7Q%2F0AuSj536Menjg4xWOMT764D3w7Cx0%2Brzha7Y4tWbcrHdXjfvQ12WB3gqqtRbKAi8DFRLaRtajzHEfX2yMli4xt13sM%2BE%2B0TPvp2roZXQwV%2F6JGRl9neRWAkWdHHnMKl&X-Amz-Signature=5781a8acd265b1416b9a7165cd5349d313b0cc210143db4a23e8bd97b8a3824c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3UVYRSL%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDFhie6a3UcdmNQOEuCODK2y1VDs5sG5UUylDnzLA8OoAiEAmuxgpo7eQWBiQhkVHLx4YE06mVZCoqnoekt0qVKYdmcq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDPOUn4a4qRHaLXiP7ircA1Ju9dA%2Be4XD5LMTmW3MaCXiGaD2ZZdKvWG44zs%2BNrgu1XOANwq7wefJALmgwvmzHU1VVD6g0o6%2BOCWZBVA9%2BqdYNTnMSoNlQm3F%2BtbrTwAwto8EXBQTcL%2FE9g5GL9xr6cziFZz7ds8AnT6ABdOum26OmJPLItH8F2VvVS%2B792GrptdEpMjDTpztIZDCIW0vbcr9%2F%2BOJEC7h9Jj%2FsY0w%2BKHe7CDIRZvoRVoGsEJ4kWZDwtka%2FVXl%2FOEAQuUGjEk2p0Cuf77S9U%2Bb5%2Bu%2BRDroWlfjxDQknfJbYDvPZGnBpV5enHTz2WNpCXyvlwN%2BZQsc46mKJNBSf34XZdGN52WzeFj8RMtPt3BCIRcP8YGruazH1fGPjZXmlJZK4X440Rhj0FwqosJT533JJYyBEZY30QmgiPu3dS3d%2BgETbcpA%2FEBL51CP1mh4YHSwMXxdGcmbOvTEMYXuR0cj%2B5Qrjo%2B4IFtKeJChhzNa5DFZ7d5C6V5N7LRBZj06%2BNIghOe75NQtFamRV%2BXOWhWrtITCVujXbUdq42uJj3s1LXFx5roIhN%2BlJOH%2FKzlEjjZnLsIfGaB%2FsF%2B5MDR%2FWeXl4HNp2cvQXRExYBc73%2Bhwt4pUn3ndO5jA1UNxvEThsiOl2d1OMJfepc8GOqUBHGw9TM%2F67N0q5m0HTQ7WLOZpxka%2F4M%2Bkgw6CWs6roQunj52JnoNQehvrrM%2F6p%2F9K6ubKLJzlKTujlFnn6%2Bg3Kkygsov61KswBE%2BqN%2Bq6%2Fm%2FRQyLmwqP%2FFfL3ggUNvcyMMFPkwhS2oL2wtLfopm%2BaooVmK8JwDdYGhVMc7NuTCQw0Li%2FHJPLNZJFhUi22IjNGb1vm7ygTWng0UqLoGRPwBugV5Bha&X-Amz-Signature=246be94111e37733ab9911d2fded744f1d0ff14fe5f5ffead594e174d293060d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JWWVKR4%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICksvHyMJLHUqU%2FwvHeHLSUUpdkK0jFyrOIAE5QetRPNAiEA497mm5RpipNAPaCPOnXPJH3DKViL7j9Gx7DqEyoTn2kq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDN631tiETd1nCho9qCrcA4X%2Bt30kUBgfS5xvT%2BkaDJjl%2FeBpgOaUcIkvq5FXmQrWx1yWy%2FDd391NwFo3bLcB0kOXrzsZYyT1XlxLgMmb56aA%2F1vNZjcDUhkCdSvGuRMov6GKo%2BEIGe3gzi6qLFUr7v%2BnyNJ2x60jqL5NPyks79Wv1%2BSalVUzFCMPGDt4hdjJnFOKrWrPzetPJtwWIQCFX2W%2BBBEpYLw88WnsjeyuZFWZtd5HhneSJrLYvilv3JhFKPVsBXTq5LN1wqAUUwocZBB3c2tDb0sTCFdE8CmNK%2B1cKIApKmDo0aqnA37qveckp1RJY69yydM9dDgXPcjC0o5xfoq0C2YbMdV%2FTJSVlpBoK4z3%2BlEFRuCZhd1nnllrA7T9FH94%2BaBwmVZeGdw5da%2Fuf44KcedCPvncClMxGGRRk7sE2WhV1ahe0HASD5eEok8lWl5hJoiV0tkIL3pDOMzR76BT3Uq01J50%2BrofZWUcyFROu77F6fCcmN8XyLtneEijRlwg7Kpre8%2BqU9lkIUEKn3pZ0ZlLndUZNOVRtg7Ex0wo%2BSNTTw4NZAbJ%2BURQ%2B6t2OlxCF1DwTtdcOg7I4usH2rNHBxb7HBWsK925jbt0mshtCc9wkVCYRB9zywYPkFCMJ0lzeSwL1T7zMKewps8GOqUB3DaZLROQq4%2BjpiY3pZe4it6qs8%2FFjl1dvWeLSV1sq4tJNMX1T0dsUN8wZt%2B7WAlCWYzhGtev0qXgr%2B0l%2FMLjEWFioT3edusNzBepk1a9v2B22KFV7DnbWyjmtCwM43JNSZaCeA6kAp2kwxZDZkyWfoSis4YCvZQ7YJ3rEZ5uk96qRNKTVKtSQGjxF1xThdKZbhxj%2Bg3uWH6R02%2FBI11%2Bx0kfw9h%2F&X-Amz-Signature=57e031524ac29a30d3eaf205c295595919c6eeb1b2a9e75979730dfc37fabd92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEIPCWVZ%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZwHHeFMRvQ5ThilU9t8WFzGp6rLJHZtIZuWSfqpwf4wIhALATd8c%2B0cROlj7uXkklW%2BRIKCpKJisJ8EIMsfnE%2FX6lKv8DCFoQABoMNjM3NDIzMTgzODA1IgzaT2I5uTHeoIYMiSoq3ANyHzBPJ3FIDxAkGb4mjZoe9OxmD2V3TUvwN22kcrWUAhrXfeUfR3R%2F%2B%2FVxHBPYBhsaRJHg7hQptJLW33TP6pQvXNCmb%2BBizg44rsTiiW4xE4tzlBDtMoI3xB2thet2HpSp3GKOKEFK9zTwA0RvTxmOHR%2BK0yyAwuIq%2BzzTHNs3%2F2uzNDUJWDmoXjeo9I%2BFHeZTt2732tP7AJT54HzIaHF3syFkoFY2z28W5Q1C7Rd%2FLAfjxRWpbURsi%2BmpTCTSp8cCUSfAsbKAEowc0vpFUwNhWuYWNNALZ2wqdxfzDgqmJpllv2BUMw8b1tfbt7sqG5AiVOFI%2B3bKkzFsnOtUd%2BsEVJrA093yVNGWhIQSUwZ2m%2FCue8v5x78cL1hXStZ6fYmcq3AD1PIWp32pulGTZzUt277YRYK7fpXJde0oJX4LaYdXKBGGK7rWNyTquBeGPnuTCeSbBlo2EniCizuohxznYv3%2BY0y2QPdYJzUUj0%2B3YNkzKWw%2BC18GEHvmSEBP5SLEROefOhD2EbPxs35sQFuzL5Q9Jhh2t2z6N4KlZdEdSmxYbmpr%2BmTtZsJvShlqHRowXyol5ttMru7AIfridVFGXK1GWeCXodSGTT3KqL3%2Fi%2FemPUxu%2BnWEDhSR5DDQ2qXPBjqkAb308simekzcjFxnM0XJk4K05Kb7yjO2knmP514v2115mG%2Fl0QCYdzooAMYAqnNdPzhu7EbG4dFUDqpnX2wZJYo51k%2FlyqS5N9y4Fdau9Us8MNQsX8Hc8rQSCOsUWJdmMt1MPngtpgtZpVjXzW%2BHKgilfflPEh2%2Ff7HfwfY%2FlKgpjh8AWIq1mRRtVmF%2FeoZpNqBPL%2ByAs8zbWDKMQJIp4u8iT0KW&X-Amz-Signature=f4cb04a6affa131fc5fddfd1aae294c827f7a35462dfa7d3ab803e84d59dc265&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RH7TLINW%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCSlTW3VhXQK1eKJglsdiuWwfeMPnTAkgq5KGgM%2FwH6kAIgNepSkAFiWlF5wplMHDPS1aEwfp2OfPSwFYtFpz1cNkAq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDCCe3WbvdG8EqJFubSrcA0gsfy9XKTr74k8mzBqWFKv4EA5kIP9n7BKtsOST1k8euDQ0Lve3B3dBjBzuGZI2HKGAerZ%2BtEiL1AMv3e4aLR%2Bis9snWlEnWjRiArnCRArpVVvabNOwKX212JODbpxBiK7BWuNtetwhUU8ID7EDqbNkrjvl25sF1KPS40Mow77GL6in%2B53YFePFyF6SUSA2%2FmC8pt0mO%2BDy4OudD9T5w6Hy0lWG1EEfzr%2BYfx16hbHVdp0etEP9sgDSq5b1xYzjj%2FNLjsqfqi%2BDNYwq1pNau3%2BnLuz%2BPtHoayfKf9DT%2BkhWIpjZepABlmHoCTZ8F8dPJmOOp81JObGx3xnuSsgT1SO%2B8t6%2FCzRw2fetcbRq4vJVR524n7XSq47j3ig596dPgiq2QZUymqI6uJyAEe6EvD8vsZjE5FBjVSOnm1O6BiWzimRbr1%2F0b61jb2mDtkDJ%2BAfWwbwYau4LmyPmbRhBGNLJ0HJ2Io7OGw6uriOxO6D58tI9JJ6fkVmTrjQf9EoMttBWgQntoAEHtleg0KSfFMdxrOQPxMiKsMnmjzTZ8N71AtmaLguspSWLby2RUBZCd7PHKU15%2Bw7bBPZWyKnmJ%2B2v20jzyAY%2F6lLfelaBFX63arRUApV%2BOkYAfsdhMLDdpc8GOqUBw6P3QERMuc5Ws2mVebYkuMJdv%2BT9IT8gcoH3XWzn91zqvZhRm0x8RMctXkCPe91mlwLsxVcgKzSLByfYAedMUAXOXUJBahhOD8fop3O5IvojTp%2Fg5bu%2BRCALtI8NGbhJunk4f0CM8wKdgDhoOp5Mzq5Czr709TjbPE01TmUQ6VpMZKeNFz02UwNGZCGmfZDz5Rmqkl686Vf2GnYiSNHntnuXHH61&X-Amz-Signature=2d8aeee9d29f2aca1da77756fafcade3c457e34cad298a945bd7ee9f448d2c1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RH7TLINW%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCSlTW3VhXQK1eKJglsdiuWwfeMPnTAkgq5KGgM%2FwH6kAIgNepSkAFiWlF5wplMHDPS1aEwfp2OfPSwFYtFpz1cNkAq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDCCe3WbvdG8EqJFubSrcA0gsfy9XKTr74k8mzBqWFKv4EA5kIP9n7BKtsOST1k8euDQ0Lve3B3dBjBzuGZI2HKGAerZ%2BtEiL1AMv3e4aLR%2Bis9snWlEnWjRiArnCRArpVVvabNOwKX212JODbpxBiK7BWuNtetwhUU8ID7EDqbNkrjvl25sF1KPS40Mow77GL6in%2B53YFePFyF6SUSA2%2FmC8pt0mO%2BDy4OudD9T5w6Hy0lWG1EEfzr%2BYfx16hbHVdp0etEP9sgDSq5b1xYzjj%2FNLjsqfqi%2BDNYwq1pNau3%2BnLuz%2BPtHoayfKf9DT%2BkhWIpjZepABlmHoCTZ8F8dPJmOOp81JObGx3xnuSsgT1SO%2B8t6%2FCzRw2fetcbRq4vJVR524n7XSq47j3ig596dPgiq2QZUymqI6uJyAEe6EvD8vsZjE5FBjVSOnm1O6BiWzimRbr1%2F0b61jb2mDtkDJ%2BAfWwbwYau4LmyPmbRhBGNLJ0HJ2Io7OGw6uriOxO6D58tI9JJ6fkVmTrjQf9EoMttBWgQntoAEHtleg0KSfFMdxrOQPxMiKsMnmjzTZ8N71AtmaLguspSWLby2RUBZCd7PHKU15%2Bw7bBPZWyKnmJ%2B2v20jzyAY%2F6lLfelaBFX63arRUApV%2BOkYAfsdhMLDdpc8GOqUBw6P3QERMuc5Ws2mVebYkuMJdv%2BT9IT8gcoH3XWzn91zqvZhRm0x8RMctXkCPe91mlwLsxVcgKzSLByfYAedMUAXOXUJBahhOD8fop3O5IvojTp%2Fg5bu%2BRCALtI8NGbhJunk4f0CM8wKdgDhoOp5Mzq5Czr709TjbPE01TmUQ6VpMZKeNFz02UwNGZCGmfZDz5Rmqkl686Vf2GnYiSNHntnuXHH61&X-Amz-Signature=4055bfaddcaefe326d1576b8aff1a150e8a0220dc8613830b9c02771129719e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJH63WGX%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDkmWJyXpRHhalsm4zXtXKAyVmidpCnzQ6JqC7PHn606wIhALM36swzaHn%2BnOBfRLmIZ6N69%2BUXIThA3WJnvTy1BDApKv8DCFoQABoMNjM3NDIzMTgzODA1IgyBQPTlu%2F3Rsv8LNJQq3AOtYnGN80wKdBjHdvNxui%2BSrnF77AkR8y98VYcu8T3y%2FWMk5o1X%2FnQwd%2FP8zFhh0PWepTpcGM6Jbfsiw%2FqGuoSfs%2FR9MG7K9px6X7p%2FV8IjWPoCxJZxdcQLLtYuYGTgTQ2ckWMQ4UZQfR49Y93ZzF33l%2F9FmXoCvL1qZexeJfZRrmvPOR2gzZ2fYrzlWr8CRApu659way8aza96N9t6YB5SEwsvjzozaITt7NpZH%2BTNNZLo0dNdgAB1WsjnJMp1e4K%2B5Wg8mwXugH9h7uT%2FFZQYXDy0L0VPXYQK8965NZDs27j7s%2FYgxcwjUPCEdrrFel6svuN8B1ZsNZ87FL6O%2B6MAoVD9KAbaMIk%2F5dH4i%2BVYJghMjzYaVM5BJB1eVkM7AuK0MwJOsVcew9csqCiYHTIPRopUQD7%2BJDHSCRa9rjAdIWe7wFafcSpM47%2F4adBfnC7vAHNgL4A420Q%2Fl9md6j7w8ZkABPDzm7hHhpy0t%2BGKTaVmiJazVUs0qun6lG8ppWa%2BZpGoidL0k3ZpqGzQDq39KT2OylD9qflo%2BjYcTFCfxRarCEGbRlR7EA6BxYWrPl1U0t2pU1NnpjLzre3uF7maBMusAc2xxSA7QkD582c0prdN8PcOfnbHB6m81TCG26XPBjqkAXQqocpqu6ruLN1%2BBzrhOsw128rBswqcSMY1FiYXaDbk3pc0dvVOmGlgDiM%2B7fkM%2F7K3LqWAOaaSXlCTPaTVhNJrjGW3SiKGTL55fF5hjywi%2BhHHLBQBz4Om6Nzb2VUvYVLjqNMJWgR0JLT66Esppbxmzw8PcpNU5qs96MoCAFshRAi499ltlaJmqlThqmgNcqsUHrRo5tZ7zoaV4XSANC5IUMOQ&X-Amz-Signature=9f2824250765cf0c0ffbf4d6b731b8232caa161dacfed9812382346fe8b2d93f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSNVXCUZ%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFWrSwWsUYpgMxnAAd%2B%2FZHgiAtMfgA7udIur%2FfQh8ZA%2BAiEA3l8jjKJ9%2F%2Bv6VKc7mIpXX8rk4PH%2B7NbyTv6m9B7FLhsq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDBHuagQ%2BWHZ1OBAqRSrcA5SUIYyeyNigze%2FfqYKqo4B1epOta8ZtCc9ILUr%2F52Mv132Xy85ckrdroiIII%2BbiTnuIihZwDPOT40Z423CV4Od6kdPJ7Ez18FqHFK4AjENtbun6XKutENPK4rDLfWeq%2B2pKKcu%2FHqpdn%2BvWoX%2B7Q3%2Fcay%2BMsFxkV9bI66rpfSc9hNDAffPjplohNU7BFriR%2BN0mGm95AhwuaUSk%2BhvHUmTUNNNAyJAaTVhI9Dmqb9H1wseH7wAwBWMBjq9UFABXpacXa72QJr%2FW461WzA9uOUAYC9ZME4qbh8mwxDL7rlRZm0USco8L%2Faguyi7bVBfLctcBM16yJik%2FcXrdtTFCSHJN6BarFB3uMPDs16QwwjJdzqGE%2F0qUiZnZCqmCktGSPcB%2FUZaZEiA5ruZ5vDgsL1Ci2rPWBYN%2BvJo3kpjbcEd1LeA20aW%2BIybuARyF5mKqbpd3wGZu2siR5EP%2B9aG7M1GKzMjkr0hfVgQeqy78NWVAXaIYEACBmOuU5NAdxrrmTLCdf1gvC0CBlbCh8CyrtdRlvusNOqWnj2%2FdLBVUmtVss5E0757xs1duI5%2BEukd6dcG5NKlopgXnDu9zidVgGerO4vXKPYEvDzHQcrPY%2B87Z%2FQ4moSqVqmiTUqg7MOLapc8GOqUBpBMIoy4deK7g%2Ft3NVYIJlvD%2BaassgtTtp2bsmpeUi67fy3%2BgBSPvdJD2i3Cy90YttE6f8P88zNin85%2FtxevdR4fiiqoiNee%2FdeDA0gxeidui19%2BHvQsqwCjlRRi5uIY4E%2BkWV22VvgcB0IFnBqgAZxNgASUnoXQXLb2bA0O8g7oxnGULUuS1lxFPebTiSxMGcy9KgFMaHMOfP4Y6DwRnDsnnZlNa&X-Amz-Signature=b97e19581aa73174790973cce5e7f740c44a08e77ff9771d1662675932e22c3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSNVXCUZ%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFWrSwWsUYpgMxnAAd%2B%2FZHgiAtMfgA7udIur%2FfQh8ZA%2BAiEA3l8jjKJ9%2F%2Bv6VKc7mIpXX8rk4PH%2B7NbyTv6m9B7FLhsq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDBHuagQ%2BWHZ1OBAqRSrcA5SUIYyeyNigze%2FfqYKqo4B1epOta8ZtCc9ILUr%2F52Mv132Xy85ckrdroiIII%2BbiTnuIihZwDPOT40Z423CV4Od6kdPJ7Ez18FqHFK4AjENtbun6XKutENPK4rDLfWeq%2B2pKKcu%2FHqpdn%2BvWoX%2B7Q3%2Fcay%2BMsFxkV9bI66rpfSc9hNDAffPjplohNU7BFriR%2BN0mGm95AhwuaUSk%2BhvHUmTUNNNAyJAaTVhI9Dmqb9H1wseH7wAwBWMBjq9UFABXpacXa72QJr%2FW461WzA9uOUAYC9ZME4qbh8mwxDL7rlRZm0USco8L%2Faguyi7bVBfLctcBM16yJik%2FcXrdtTFCSHJN6BarFB3uMPDs16QwwjJdzqGE%2F0qUiZnZCqmCktGSPcB%2FUZaZEiA5ruZ5vDgsL1Ci2rPWBYN%2BvJo3kpjbcEd1LeA20aW%2BIybuARyF5mKqbpd3wGZu2siR5EP%2B9aG7M1GKzMjkr0hfVgQeqy78NWVAXaIYEACBmOuU5NAdxrrmTLCdf1gvC0CBlbCh8CyrtdRlvusNOqWnj2%2FdLBVUmtVss5E0757xs1duI5%2BEukd6dcG5NKlopgXnDu9zidVgGerO4vXKPYEvDzHQcrPY%2B87Z%2FQ4moSqVqmiTUqg7MOLapc8GOqUBpBMIoy4deK7g%2Ft3NVYIJlvD%2BaassgtTtp2bsmpeUi67fy3%2BgBSPvdJD2i3Cy90YttE6f8P88zNin85%2FtxevdR4fiiqoiNee%2FdeDA0gxeidui19%2BHvQsqwCjlRRi5uIY4E%2BkWV22VvgcB0IFnBqgAZxNgASUnoXQXLb2bA0O8g7oxnGULUuS1lxFPebTiSxMGcy9KgFMaHMOfP4Y6DwRnDsnnZlNa&X-Amz-Signature=b97e19581aa73174790973cce5e7f740c44a08e77ff9771d1662675932e22c3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2FWSIHI%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T043908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAtvZLXSXPXsQ7TWYtKqNIQMPXzfkNgeyzBbjlWjq3%2B0AiAMMU2poOBBNwZ%2BKhVd%2F6NZeN63B38v3x3ZR047NfQwnCr%2FAwhaEAAaDDYzNzQyMzE4MzgwNSIMmY7NN9U13RfGzkjBKtwDD2hinDloobFD09ldhEUM%2B9YGtg3Uyz3TJf0w0JsNnCPl%2FNRcyJ8fR0i3BoEDeZrw6D1jYx122q2Kbzt4%2BhKc%2FHNkPbrkZpvz2FcJL%2B1C1xnGbY%2BI9cI%2BEtXXzsaw6aFzjQeZbb1JpgoCVdTYihT8%2BK3Kk8X%2Bw9yqdF7z24yXkM9dvhFkabdEubvBblsr2GNmmWfAzDrj%2F5w0Lx8U%2BHv4itHbfGBv9DOBguaZAK6y46rvTTPcnMWpAplyXaE9fHHFsX2lA0N0kgd9PhwHMvUFOg2pM8xhlV4pk%2FX2%2BkrweukuqCSOnSCyKHP1LAnDCSIizzGDCGhsub4Zn07R0BV%2BSLrFp97zBDeM9y%2FIo1CO9YC6vK5OnBcLAV%2B2h8lbeo3v3MrDsUTxSc8acF0ZCTnl9b3rYF9BUBu4zQ8%2Fpf%2FThT%2Fga5GJ5JV9ybn4PGhEyDRuOvrYeRk4MyCMtKKJsqWH2OR6mLNc7BfIuRVnTeKRxGWacaWJ55BCHusTrB3BLTB7jXPVMYriNluGgjj7ADYTj46rv6Zs7GY3UwG%2FNrewAOYU1Owzn8Rwga9aqlDXhmdX3EW%2FaC3a6cxihkGL0x0siRBPurd7WtiuFDkOMLTgHA03xmrp5A3vAhKl9Gww3tylzwY6pgGNb391rlVeCg2HJpr9zyDu6c9U0Gp5IErHCiXZJVWlbCH5%2FsORWftixS9Kc2eAqifFpnpxK4%2FkVAF5AwjZejDLWcJ4ef6vQKWUnKA7WOt0GOojik7Ak%2BvuWjr0Y65A1nsIbeGrgTfzT5y%2FLCWoXE3uFq3HwapehTyTcflRWw%2Fo%2BTjY3Wq9OgEuO6g3o69aB0Kml3KKldvuh9mwD8FYn23F9qKYmy4M&X-Amz-Signature=85cacc6bd34b97108f3cf008cf8066d20ba252ce2685558881a49689f8532d6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

