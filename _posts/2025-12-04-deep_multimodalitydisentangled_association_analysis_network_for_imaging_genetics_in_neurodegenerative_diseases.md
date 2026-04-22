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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAZKTIIH%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQDo0%2FcJFdEdNrL2mUtMy6Si%2FGKugmFfRRtATob4GZt9cwIhAI6D05WYGIEFcwtivA0d0gvMojHDGtpaaSH9DMDQT9hLKv8DCEIQABoMNjM3NDIzMTgzODA1Igyia%2BX%2B4Ifw8WRqGNUq3AOgXb2rTafhnQxdejgqXexZzOt5t8Kl9lHgVn1ENvczcq6FfHKbxFDzQCNO4lQjqb2Azge87OGrTOWT8sZThnYnAjd00IbCkRkSUdEZyNkESJO7bDHHZUkhwIl2A480YC2mzvZVlzECOAtL5S8vl%2BiIxGKVJdwKdMwiXHVcR7zz%2FwK%2Bf7opYKJOsfIttE0qmqb3upyUBJOdcQJAZRnsJ6DU%2FVlZn%2F1OrD1ur%2BqhOMjFkI6nj%2FdPuBreDbg0CJ6am3Kw1FaVyUwnDhYeMRPHyj%2F6t9%2FE3nZbeX%2B3twfAtT2BAS3hGYa1wpgstRovjDFJ1VzJo%2BoSjaDORWmw6xhRfqpWmYMQIWRLnQ6BI4NrlfSWBCMgRVvG%2FxyNxf3G9L4SceAu0rgvAhKPMx%2FIRo241X%2BaehNfQ9jUEB8EAfIWU5LGnIQlXlMGIlNmp6V0r%2BbYcPhhBBW2zWkTe%2BuzazG06BruHRBu3Dz1qe%2FkgLSNQ1KxTdKTJNU3%2FLLlfqhJWVCDOcyTy08TmIZnIlbgildRpkhSb9okSBMtjCdmCvPWS8A%2FwlK3qzQx%2FRLTKobGcrGf%2Fig%2BfCAgRN0EjWVR5Tf1Zu49TgE8JC9SaMVE5IYj%2B537A%2BckVROaGYFHhqmSHjDzr6DPBjqkAdbu7TxBM0WWs0ViKjX2N%2F%2B%2FLhZTNWbg1pr1WcRmGahemj4dAKpZEOBZcOhEQVcNf8JsTkcMZyCrSIFaWk8V2mp6zL0twKN4yl4OgZW9DBHhhAWyZbJJzajvC3xwK1CVp1jseaWE4%2BzGwfRkNe0T079EtY2H0a9p3hG6nl9b7xg7hwlW8NtHDzZKMifLj7M4ILB4HZ9NFFnoG9tDFRmDul7WOEsD&X-Amz-Signature=f0490867e1e7c71af9ff441a1b099f48daa705adaba742c235bfd6496f815457&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAZKTIIH%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQDo0%2FcJFdEdNrL2mUtMy6Si%2FGKugmFfRRtATob4GZt9cwIhAI6D05WYGIEFcwtivA0d0gvMojHDGtpaaSH9DMDQT9hLKv8DCEIQABoMNjM3NDIzMTgzODA1Igyia%2BX%2B4Ifw8WRqGNUq3AOgXb2rTafhnQxdejgqXexZzOt5t8Kl9lHgVn1ENvczcq6FfHKbxFDzQCNO4lQjqb2Azge87OGrTOWT8sZThnYnAjd00IbCkRkSUdEZyNkESJO7bDHHZUkhwIl2A480YC2mzvZVlzECOAtL5S8vl%2BiIxGKVJdwKdMwiXHVcR7zz%2FwK%2Bf7opYKJOsfIttE0qmqb3upyUBJOdcQJAZRnsJ6DU%2FVlZn%2F1OrD1ur%2BqhOMjFkI6nj%2FdPuBreDbg0CJ6am3Kw1FaVyUwnDhYeMRPHyj%2F6t9%2FE3nZbeX%2B3twfAtT2BAS3hGYa1wpgstRovjDFJ1VzJo%2BoSjaDORWmw6xhRfqpWmYMQIWRLnQ6BI4NrlfSWBCMgRVvG%2FxyNxf3G9L4SceAu0rgvAhKPMx%2FIRo241X%2BaehNfQ9jUEB8EAfIWU5LGnIQlXlMGIlNmp6V0r%2BbYcPhhBBW2zWkTe%2BuzazG06BruHRBu3Dz1qe%2FkgLSNQ1KxTdKTJNU3%2FLLlfqhJWVCDOcyTy08TmIZnIlbgildRpkhSb9okSBMtjCdmCvPWS8A%2FwlK3qzQx%2FRLTKobGcrGf%2Fig%2BfCAgRN0EjWVR5Tf1Zu49TgE8JC9SaMVE5IYj%2B537A%2BckVROaGYFHhqmSHjDzr6DPBjqkAdbu7TxBM0WWs0ViKjX2N%2F%2B%2FLhZTNWbg1pr1WcRmGahemj4dAKpZEOBZcOhEQVcNf8JsTkcMZyCrSIFaWk8V2mp6zL0twKN4yl4OgZW9DBHhhAWyZbJJzajvC3xwK1CVp1jseaWE4%2BzGwfRkNe0T079EtY2H0a9p3hG6nl9b7xg7hwlW8NtHDzZKMifLj7M4ILB4HZ9NFFnoG9tDFRmDul7WOEsD&X-Amz-Signature=f0490867e1e7c71af9ff441a1b099f48daa705adaba742c235bfd6496f815457&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YA5IDLR4%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJGMEQCICnJo9o38Xu5uArMH8G%2BChJYoZzajGf9HT%2FLmQlcM5eTAiAS%2B74x9jIXQESFIp5w1cooryZjVrxW4HyuLJjYQqSk6Cr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMXPDpOz4%2Buy2zgOsVKtwDC%2BOlg%2BjWV20R4D68bHwWNIqveEfEuFN4SFtmQ%2FG9qiusaOh6oer%2FBpSkXAT5lf%2BbQ1WXu08v8lwpIA7N4qfOnzr97qE1P2w4Q%2Bi91z1gEzxbnJELCLzm0YrinkIE8c3CCsF9m1%2FJaOr4gzQ1VLcv2sjYYTj%2BcqkLR%2B6n6Ex7i6u5m3M7Bdk0P8GlWo5sP022mmBNjMrDvdb4gG9UpPNWdU2nqadxv2YFYcImPcd3lu27z%2FBlgJzZiMoBmeoIi4dQ11EYMy%2B3dDWur0H6bn72M8oNHowvl5taSf2%2FcrUDz2nLL2O3EujERdrNtZFto7fBpapoVWfS37nhefdXDeVvgXFIVPvKQ2LzqifV%2FquifrP4LhvR4HZJsFaM8rhy1LpusduT7iuNu4np%2BMVbi5ZXPl2iNfWrryEIH%2BrYcJaLCyHRAO%2F4js%2F3TK5OwmXaVl7cBVpfPmM0vyGJzRzrpL1UUwWg8o1MhyGirxcO56iFGf3pKF1RwikIrZ3VNVf6QRgMZkyNP%2Bzw7n8uizQ4RhO3OdHvymB6cap%2Fyfw5qOkUC3gBcoLXICf3liALxZU%2BkAFj%2B727PboLBj7fBGApmx4uDgUycvjgx4Na6MCdF%2FmiES12sXL07gBLItWCWlsw27CgzwY6pgGde98Of8wUzGQoRERMsUKk%2B3Ih2W2zGOStQhHQSwU7cLzsO61UijbvA3vEYWQYHkS2TISUIaJUSSmyrZmTG90U6q%2FFXnWh%2BDNYzFJ23DLxA82NIvNu3Gz3WSbnmM90fSJS17ub0EURtDgBZtpw%2BF0dYNqh4pn7YWtntcRRpQtAP3UovbOvIRhYdJtw8x6tLOINAngiTT2Of7fj1b6S05THsedcOsAY&X-Amz-Signature=f55958d5f7708b52ce8b207d7845c89347a04fab40743293f78a852b3ac4c940&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBBISBRD%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQC2Y3womZOnom0RhQSFa4ENxbWt9HjnzkVZN8NC1LOxyQIgLoDT8M26EcfBpZ9c%2FuBomOxD91RZdvfDD78v2yLgPmUq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDIkgeJ6gJ7dgBlA62ircA0hJ0g9RTqQjRfJIlL841e37qYU859NeLwTXxTGGc3T%2BPOvQ0FA4y3XJQ5ba%2BuSJeQvgvf5k3ubuhlSZTsgc7MOpJmN4FCZWSAw2yVAATqtLj3G1%2F%2B7lgUXaeSqDfakOXn2y6qgbt6sQuiGGnLCSVl4cT%2FPPMs8oWVPHNRXBBvsdN6%2FO4A1%2Fmi2TRQVSc%2BBxsWwave2m1IwdrPi9lkqQ8M7pwYnfwC%2BlMNWtzWoiSfmLzwG5GI0u6M5wBHtRWm9ItkQpPH4Y%2FjFz%2F67PcayF7URZ0XhJYFZXPBIsdJ5G%2FK6EzAMO4sHzF2L4raJjGPZwxfwn21PUde3AHz%2FU%2F99A5A1l%2FvP2MdNxyiBrlsdiR7XJqNdCJ9cxGoDelWyOqvVTAag77cJUM1D4qjsm89o3M%2FzwNPsJtWYzzGOhmmKCQSJAG2DzVnoBPW1W1i5HQ%2FfLin9d%2BdfMQQoRG%2FdxifNbs%2FL2OmqWtHcK192E39NJjDiKgU13E99WRmFpfdUceBqUW8AnIZKN8rfUXh3YkZiIJTbzBgR%2FSh4MPIdSdGP8krE%2Brq6MFlftSkvWuDQXDdXtCekFj4IkDVp968yXPt9DTkMr%2BF5qe0gLxk62sWA%2FxLO1Ry2Z5aC3Q%2BWrG%2BhhMKmvoM8GOqUBM4hqIcVyia%2FV%2BWShBt95FqVylwAeQlpTguVh1voA4Ir4w5wDZver%2BTzBuHlPsCgFjtwCV3%2B20NzyMpbB4CdAXmcChrpt5%2FtnGy61xeMb2jZUzCP4EQ1Sn7FG%2BTQeb59uyPQFlG1Ttz0o8Hlc4CIWNdh5PBPG%2B4BQBOLyCRc2cFp0pIiguq1FuoHeg%2FnVdEz9D%2FFFYWdZwSmO62Ok3xUoA5p3W2QL&X-Amz-Signature=7c35e3510e5408181bec36afb259744135e8eb4efaea7c5f3ae18bd3db928fff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBBISBRD%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQC2Y3womZOnom0RhQSFa4ENxbWt9HjnzkVZN8NC1LOxyQIgLoDT8M26EcfBpZ9c%2FuBomOxD91RZdvfDD78v2yLgPmUq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDIkgeJ6gJ7dgBlA62ircA0hJ0g9RTqQjRfJIlL841e37qYU859NeLwTXxTGGc3T%2BPOvQ0FA4y3XJQ5ba%2BuSJeQvgvf5k3ubuhlSZTsgc7MOpJmN4FCZWSAw2yVAATqtLj3G1%2F%2B7lgUXaeSqDfakOXn2y6qgbt6sQuiGGnLCSVl4cT%2FPPMs8oWVPHNRXBBvsdN6%2FO4A1%2Fmi2TRQVSc%2BBxsWwave2m1IwdrPi9lkqQ8M7pwYnfwC%2BlMNWtzWoiSfmLzwG5GI0u6M5wBHtRWm9ItkQpPH4Y%2FjFz%2F67PcayF7URZ0XhJYFZXPBIsdJ5G%2FK6EzAMO4sHzF2L4raJjGPZwxfwn21PUde3AHz%2FU%2F99A5A1l%2FvP2MdNxyiBrlsdiR7XJqNdCJ9cxGoDelWyOqvVTAag77cJUM1D4qjsm89o3M%2FzwNPsJtWYzzGOhmmKCQSJAG2DzVnoBPW1W1i5HQ%2FfLin9d%2BdfMQQoRG%2FdxifNbs%2FL2OmqWtHcK192E39NJjDiKgU13E99WRmFpfdUceBqUW8AnIZKN8rfUXh3YkZiIJTbzBgR%2FSh4MPIdSdGP8krE%2Brq6MFlftSkvWuDQXDdXtCekFj4IkDVp968yXPt9DTkMr%2BF5qe0gLxk62sWA%2FxLO1Ry2Z5aC3Q%2BWrG%2BhhMKmvoM8GOqUBM4hqIcVyia%2FV%2BWShBt95FqVylwAeQlpTguVh1voA4Ir4w5wDZver%2BTzBuHlPsCgFjtwCV3%2B20NzyMpbB4CdAXmcChrpt5%2FtnGy61xeMb2jZUzCP4EQ1Sn7FG%2BTQeb59uyPQFlG1Ttz0o8Hlc4CIWNdh5PBPG%2B4BQBOLyCRc2cFp0pIiguq1FuoHeg%2FnVdEz9D%2FFFYWdZwSmO62Ok3xUoA5p3W2QL&X-Amz-Signature=8e1ad25b8c3b11f5c4f86c52331533bde206929878f3f6c6f17420bd360bfd24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FVICHAF%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQCBsUGIqlc%2FOe1BdOaaeySKUlba9SXSNAygdC%2B9ll5fLQIgZ4kCVoP1y98DVH2YtPAOQUB2JHfUfNYZcbsnR1TDekwq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDIwC76jXJFXnbVbEvSrcA9v3pSKiHTTyazmNUqVfMMLiCHzegtOu4pycAd6RcFn5r7MkywAUdBEMyX1cF0TnVc7O6Wkk7x%2F0i%2BehigyW%2BGc61XC4%2Bl1Kt6qogHptpnH2fY0D10OwMGd50DomwJHIs0%2BdxS0kcaphXX7cpf%2FH8%2FdSJm26P%2BSULr7RW4IptHQ3oIld79bFaaxSMcz9f3TVmsbGk3w1iF3D9ufR%2Bz%2Bi3fACchkGQpSx0gTdxOWv0Lqgm0L3ukORSV5oM4o4ZBQae2vxTbFi4lz3tMa04zXNoNFELUlpo9rYRTGscvqznayzuENlwaQH03xscQKvustLotvrFQUTxRVOwjT%2FgjzyJ4imyfAdHimGNp9cR0yG8iQ8LX3YuJRjG4544zhp0jS5MRAsaJaTxLBCTdJAqbcxi3L2P2%2BfWlQ2e6lncsZK8lJdxnNpbK6gjm2%2BoKzRAXzwzcnYImRjI%2Ff4F6T8BreQqFpxb3LN%2F49gcrmyNLFA8VxwQle2UTP9lXbfVSJTh8Kxz3NOTW5rSqqjyfQoyd4TrTqzKQBCkJNJBMKfjRCUjbuDVJYu3oE%2FV2rWOEqcZhlAGrrvDat6q7jf0Ena%2B1nkQLf19NA3Zhe3d%2BSHGWtrvgI3OCPxANC%2FCx2fymPrMOOvoM8GOqUBscqqOQyfezEl7kLH4h%2B2EoKIn5OxrTBujN4fi%2BNErejkzI8Ph6Brnexc%2BXLeZeM%2B0B87HaM0gZ4IqLVFwaiNoWER6PLdKOmYmlbdwm9wOjkZblPfqyw%2FG%2F2jvhLFqRWsCIl4MMirJXRBJ0zTRh7yL7IN8i8HYhkzZOge3%2B4%2BEREols3HSEXJu%2Bx5Se60m4P53pd9cibjfQjdC8KE%2FfPMDz%2FKT4Go&X-Amz-Signature=c3fb674948f4ffd48ac9fac8b1b1a1c57f43134430b87d3030646fc0874adef9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJLA5WGS%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJGMEQCIGgTFo8QUHuBxN08ezvNlYR9Ry3vA9UWxDax%2FhUffuqUAiB5DssqGK5%2BB2S%2Bwds1esFQkmCQ0M7uXbhd%2F6J0%2FkqScSr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMAvz9My8N1jr83z8HKtwD3HCigBw1tfaIOy6SZV8pIQ0uHUqcS019KWOdIZxyZEm84Fwmpvqp3oU%2Bg4lFYjQvDiKjiAzsrqXYuiteBe%2BeWpOkbT9aW0E9K8VoxrgslQ3b0sfwYJ4ILMSLxbRAABMGGVvOCG%2Fv9GYESlDxRZhXIpOQV9Fi%2ByExtIW%2FTy%2B%2FuxPpjT%2F9biQDvMpaFNRBQPJX30bFDffOzQInftsMkqccM8hv%2FTgSYXj4zAvd9AF6AzGKGC%2B6Jm0KDwQ%2F7aPzqMuXTropyMgOGAhjZ8xf8dvJ50eHPfIRLzTm9YY2F%2B5n36xf7SY%2B2YVrlJudnlC44RdIz%2BLhaFOTM9HOEVoZg8cWb2VQvHOAN8MqbZ0JFhZIDadCA9fyiXRKgG3VTFKqqOdrIQQ6qZxlqL5HMvYpH1k%2BPB78ueWvpn1O4pgRANoFHVrxrWu%2BCokbva4MrRUGYhiaxSUDhtGfxgcGmhTpYldkSiAERc2CkKsOrk5PFfWbtgTN%2FOxyF590SBeOKeZhKpn%2FWuchAgDuEsyD29rOTNhPVB34D50VagDh75HmsKEH3JKNDYVWdqLDtJQtksbzjj2JLG79%2FPM%2BP%2FhIyn1GdG6ecWyajJj%2Fk%2BdkbYuPiUXg7OxgHFqLP2i4jN%2BeRn0wuLCgzwY6pgFejyQKNcKjH7Dq8%2Bq24%2F6NXwctO80SBmVTPqhGSeiM1uQt0e4LTT6O0O60ez7HhJSpgUuCJJGZzj5Kyxl6FBhuh%2F0jFwR3sZbii3KFoUNCfI0t5Y0QEmilDsGqIn28kDmp80Zi4MrOUXcikPJx9woi2rmQGozSiGR52RmMAQA1PFVDV16ZAg%2FMYiLDteojjlNMnR8lifchzaFHIq%2FY8M%2BD1U88Rt5r&X-Amz-Signature=020d1ca529fca305bd85eb98c4ab568db26cccaf1f665a7e573cc25ff1aa2a73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWR7K7QM%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQCGB9v4brHao2vtkjIaiT0Paml7HLeVdnRXzssDoZlTMgIgBz9qS21zD1Edb%2BoYRLPNNtWbB2YNupmJ22Nuzo3Ajxoq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDB8nQrM%2BqMg8WQEh3ircA%2FCNIfSBc9Lrn%2FzhuPRFFWWr5t3qhJ5kj6y5wuFSVXqi3N5KsNOf4SKtHcn7NROCJ%2BeM5BcZPjdDLJbH8aEfiwL9ixONvV%2FG6SpT25MOsdL7E87cF1InPjLhyfuSAFV7ZNurhpjNMozexNAmVYXo7G22i4RT%2FU1QxeqFBeHI8nHnrTOlw6%2FgxpS7vopk0MBWLMC%2BPCiqtfJWSUfNFf3gpuzasirCe3yXYvP2dt7qYAnK7codoC%2BpRLXTgj6aEkYS8Z3c2pOsgb%2BjE25V28JDV%2FOgIdBdYobsF8eJdMRGkUSYno9XNu%2Fxk7bEAvPB6F%2B73LOjL%2BnRIjtgMhDWUZsJhnyi87eMJjWj%2F8a5%2FqnfkAravazjk0%2FIhTwjPJM%2BaT8sJkPnEoy9WPY%2Bt17aUMRxH7JMEHhGVvFF%2BUO9b0VBB2YsE5Q22gDJdxdE03S4D7lidO%2BYaZ%2F8BOMJU%2BsvVT%2B3Ds0Nt9XRDqOCJl8h0KdIqDCOS9duEaHhHvOHC2rJDjSY8LA0ZYgc21mpfVs0jT15DfJcfEkl8c6wpVETO71WtRY3tlMGNFetdeVAfj6233JOuJTjuDezxbDmtShABiAjnP9Q0qKSFrqyY41MkCuDJzFdfqJB7vqZNetLIUOpMO6voM8GOqUB2vEgDZ0PvheyrRZHeiFIN6vvcad1FSTLBeHsNCppKbk4fjElm5mvyLDequFj7%2BjSmXAkIMyrF%2BBlP0dc6tx6EVlK5hNRHqcQz2R9kHHJ2WSvlNn7X8ToLQFseZGs9XjpQUVBCgvMnO07qIttBhna84bzhzU1F%2FlFXKaYhC3xeHXO9dWC1JOUULg1pexSzrH7FPJEvYw5%2FewMpVQJ3P96CNY0%2Bdk%2B&X-Amz-Signature=9bb930a5e6d1932bcc1f0bdabd2f8e048957bedc0d72724b995d6a32b9e8a6b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662F4CF2QZ%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQClu7l69PY0BclXmJVdvvj%2FfaghNit9kYp7U8wO3w0aAQIhAINt%2FBzHakfnRwiGSUHmrUKwsBQR0usQwk20jLkcmIPUKv8DCEIQABoMNjM3NDIzMTgzODA1IgysI4ZkHo3NUBOo5igq3ANUjh5O6YmwLDOLr2q6LELQdMvw3Bmj18J77BD1m4b%2FmjSubQLF9JqGMi2fbmzEKXLDGt7eLgapyG3CLlev1gRNnUQiWlobfO2xn%2ByMed%2BelFKaZxdDXpJy0LY0J0fAA36ItxQOgsjPar9PdQzhaYXlAwhstPicVEFtSacIVwCja5SUFCM6RqgClGeQmXPNtVstJDCLKnOF00rPfJzbvFzvg0iitAEexqa2Dx%2FHq2zBjB3PQnBWEuiSkc67YR30Bl8TW%2BbZIMhC2R6Dc%2BOM%2BDjdXAkXRje3zIzLexFzGkTTA7WRq%2Bbelog%2FQ2SIS87WAFaU43iqtKqA4E8l0UWzOpY%2Fm4BIyHCdXkdp336LSCO9y64JYCuGoEW78yxI%2B%2FRdkgxmS%2BthzMP7m9xUB2mU7nNAtcZLC%2FyeY4CxLxE6imVJyxSfv%2F66UmqcnDhK0wtDr4g6tO98WXb%2Fl5N4ex28CI%2BXtg6%2FerA32rDnKuP1ZNnbKx62Yhgdkx%2BhUoqEaCitrKPJKlWjaRlFbJIKWexf7nIO1PSJ4Qd9ZZEFLkvz59u%2Biq%2Bi9gxUHmiKoE2wBas0FWYSBZ4qNThXjFJcgiNgfQFfUWprL%2BeDnRtp9HuFvLN3BvqHHRLZTkEiBrjqqzCar6DPBjqkAdXI%2BYlQsYAwMy%2F42q3Qu0VHR1YfXbP%2FOwXIste4ZLiUOy%2FHsJPdqU1%2FufrAarfNzdAQ52mZcXKuweKkUgZjfLSwnaUHsuocG2fPdOMWoiAbq8K2clPklTlMYhGjJOQ7fz7ysEJegvBjBTSTZmbWTFX4GrJ6Y9b%2ByLkxoOYIIlyTF20mGtdLsUO0ZNQq%2B5qtcRblUB%2BIWEZ0OT5mzj%2BgDPt9ClYL&X-Amz-Signature=4129e256cfb0ec022f48e00ba30123bceae07e17d81ec2ccb7f2c61b3299ff29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662F4CF2QZ%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQClu7l69PY0BclXmJVdvvj%2FfaghNit9kYp7U8wO3w0aAQIhAINt%2FBzHakfnRwiGSUHmrUKwsBQR0usQwk20jLkcmIPUKv8DCEIQABoMNjM3NDIzMTgzODA1IgysI4ZkHo3NUBOo5igq3ANUjh5O6YmwLDOLr2q6LELQdMvw3Bmj18J77BD1m4b%2FmjSubQLF9JqGMi2fbmzEKXLDGt7eLgapyG3CLlev1gRNnUQiWlobfO2xn%2ByMed%2BelFKaZxdDXpJy0LY0J0fAA36ItxQOgsjPar9PdQzhaYXlAwhstPicVEFtSacIVwCja5SUFCM6RqgClGeQmXPNtVstJDCLKnOF00rPfJzbvFzvg0iitAEexqa2Dx%2FHq2zBjB3PQnBWEuiSkc67YR30Bl8TW%2BbZIMhC2R6Dc%2BOM%2BDjdXAkXRje3zIzLexFzGkTTA7WRq%2Bbelog%2FQ2SIS87WAFaU43iqtKqA4E8l0UWzOpY%2Fm4BIyHCdXkdp336LSCO9y64JYCuGoEW78yxI%2B%2FRdkgxmS%2BthzMP7m9xUB2mU7nNAtcZLC%2FyeY4CxLxE6imVJyxSfv%2F66UmqcnDhK0wtDr4g6tO98WXb%2Fl5N4ex28CI%2BXtg6%2FerA32rDnKuP1ZNnbKx62Yhgdkx%2BhUoqEaCitrKPJKlWjaRlFbJIKWexf7nIO1PSJ4Qd9ZZEFLkvz59u%2Biq%2Bi9gxUHmiKoE2wBas0FWYSBZ4qNThXjFJcgiNgfQFfUWprL%2BeDnRtp9HuFvLN3BvqHHRLZTkEiBrjqqzCar6DPBjqkAdXI%2BYlQsYAwMy%2F42q3Qu0VHR1YfXbP%2FOwXIste4ZLiUOy%2FHsJPdqU1%2FufrAarfNzdAQ52mZcXKuweKkUgZjfLSwnaUHsuocG2fPdOMWoiAbq8K2clPklTlMYhGjJOQ7fz7ysEJegvBjBTSTZmbWTFX4GrJ6Y9b%2ByLkxoOYIIlyTF20mGtdLsUO0ZNQq%2B5qtcRblUB%2BIWEZ0OT5mzj%2BgDPt9ClYL&X-Amz-Signature=fb969b905a9ad8f8d521a722b7bd2d212f33395226f73e6f3a1cbbdd85285b1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672XHK3R5%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T010951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIDc3Qg7pmfLYO5cFUpgllt%2FTryRBtrGRsxYYd8bDDO5qAiEA3tF66f5hrt1somJvdJxrNiVSZGFBG90c2ybtJ0TuCuoq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDAQKC%2BAopswXS9f70SrcA4xyL0E17P6DrlhfM6WavpQkTCxHF7yG7jZdQmp3x2uBZWtCb3uFaRiQ5w7whqF1oAYdvX0hmazGZHNrp6DS3rbDieIspsVaaU4jVVa%2BE4RxQubcHnhIa1hqr2v24Y1Lq3aPQVVvXAaVEsndsWS%2BRudJfj%2B6RqOeYIoQ20fOLDw8Tm1ytSA7KoKBpwxn5%2BrekJSCxqtg4u16GWvf5EhL8yDetOzb%2FSzpvQgs%2BBa84VC7LgJXn5sk7V0F4HrTeaD%2FaYduv4TRbx40aPcJwucCvXSCkpigGvFl5LIzjdnFdwE3tF5%2FYypM%2FArdGA4eEZxjkle1CM8M1r37PT0%2FI7ZPI1Mg9aLNyp%2BUYHfELJ8dPyODzXVqlYj7Rp2lz2QAwUhgI%2BVaIoZ26wBEPynP6QHIetiyuQOSy7LQUE5PG88%2Fa2dY%2B1co%2BWn%2F9e2WjbGQdU4jNxJVG4WnepUvo2k6uz%2F21JNNEzYM%2BDscPR33rX%2BtkZwPCU%2Bd4fbhGdxNVR1J1XgHIU%2FambbQC3O1bnDo7FP%2BCgyCzQzX%2F7b74%2B3rIBYlFFCO206%2FAPwZKyEjyTe0G716pKjzDy%2BMabZ%2BiMVl%2BYjIqNyeBDrzMY1F9b5ib6fUyJgrQObHkwAhCMw4BDJlMKSvoM8GOqUB5lx19BBx2M%2BND2rJKBl5phoh4jh8JwIvHjPrDmW%2BgyxGzJf6WVm09FTDwgyyq%2BeIhGfTlmtPv7Gp%2BB4DBxGZrD7njExHbuy5Yf8X0yAj3N30TOaDtJI5ZdPa8e3hlpIAcobeenTt%2B93nXdUayVd62PVLxOTaaXTOvftgZFxVrbDOTuYAVf7reHZf0WAlsHSRH66vvmEIz3kd80GC20HBz3FeIj%2FH&X-Amz-Signature=43e98d400f51a04e6d59bca307f805609ed47caeddf4e4e908b7948bfef8f3c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DCUHIEU%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T011000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQDBKrsNvskXPEQ%2FD4zjr%2Fn18TYfuK1JbDSQkrKEyTD59AIhAJ4XiWrCiexajeB7AOk1UkhBbNHcc2jNpmFemI7J6nJCKv8DCEIQABoMNjM3NDIzMTgzODA1Igw2OSLBADkWvzetsEMq3AMA1LBB%2B7AHmzaP5FaM3kegCsD6qkOXTPqvGlDLm52ivdmcPFtMpib6H458oEH6frGzj1HUXrU0kbjRsWqtk6R8Z%2B6NX0wGZJ9Bi2MnLuBV96UmHhgv2tXmnII2VYrnK5ThgifvMKzLEDUhqLx%2Fk5Y%2BKwGRWRquMBpRZT7%2FCe0OEVrq7ohi7xiozoBsiqPR1EOB31S2lpttafSCC2rnxcx1hdwlhrGTMr02TRbwDfp6c3Zi8HgcurmubGWK0mQ%2FtTnO1Ao20127u4V%2FDaH%2BdXeM6RNrWXKWdCwpjmyQUT4aqZa%2Bc8lhxywYUvoWgOa%2FOnkwSgKDqysZKqnMFcm2O2qsIEH4Pjees%2B4QDXRFRraZgEAbwiQQQZ2nGpRfmcVvnxqBo6bQzij1ByO6ALmYv5sFnaU02cas40IkudRVQhpTpuFLvA5%2FHsqPf98V80LPJrci630EDn0HsoPzRDEsUqAZAet%2F5FhKtk0vgqJbOhDPShTUtUlD9E2eqjhJ0V7fL1UjIx9UdPdgDiuxmGXzBLZuaE%2FvkhVcHsDBhp7Af9JHEEFNrvB1BrVDi60U%2FkzHL1TSOmfzb28zmAItSPaHV1GN0Ssd0m3WuawUERPDkesT1jgpl1efyqbfNIj19TDBsKDPBjqkAfBdubjxiFOZtsgMVM%2FSEYhYnslj5EPCd9Wzed7E%2Fp2Bkn2DA2J1edGSSWeZcKxoXciwjWNlLwoVWjUcg2ZCHCSqnwaAG1rHGa8NYI5x5Pnf6lfFli0j9uMaMAhagqf5l1WLsokzgYvpfN09OusIFxe8dTM7pTqQauXyxRhf8GHHZs7ESsDI9rLiYSFjDQsS61Y5%2BZWymjMNEf3l%2FpKBPcqsqn2W&X-Amz-Signature=723221d6e280dde2e22a1c0acde63aa5ea9d1d414be65fc917c14a5c07ced17d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DCUHIEU%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T011000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQDBKrsNvskXPEQ%2FD4zjr%2Fn18TYfuK1JbDSQkrKEyTD59AIhAJ4XiWrCiexajeB7AOk1UkhBbNHcc2jNpmFemI7J6nJCKv8DCEIQABoMNjM3NDIzMTgzODA1Igw2OSLBADkWvzetsEMq3AMA1LBB%2B7AHmzaP5FaM3kegCsD6qkOXTPqvGlDLm52ivdmcPFtMpib6H458oEH6frGzj1HUXrU0kbjRsWqtk6R8Z%2B6NX0wGZJ9Bi2MnLuBV96UmHhgv2tXmnII2VYrnK5ThgifvMKzLEDUhqLx%2Fk5Y%2BKwGRWRquMBpRZT7%2FCe0OEVrq7ohi7xiozoBsiqPR1EOB31S2lpttafSCC2rnxcx1hdwlhrGTMr02TRbwDfp6c3Zi8HgcurmubGWK0mQ%2FtTnO1Ao20127u4V%2FDaH%2BdXeM6RNrWXKWdCwpjmyQUT4aqZa%2Bc8lhxywYUvoWgOa%2FOnkwSgKDqysZKqnMFcm2O2qsIEH4Pjees%2B4QDXRFRraZgEAbwiQQQZ2nGpRfmcVvnxqBo6bQzij1ByO6ALmYv5sFnaU02cas40IkudRVQhpTpuFLvA5%2FHsqPf98V80LPJrci630EDn0HsoPzRDEsUqAZAet%2F5FhKtk0vgqJbOhDPShTUtUlD9E2eqjhJ0V7fL1UjIx9UdPdgDiuxmGXzBLZuaE%2FvkhVcHsDBhp7Af9JHEEFNrvB1BrVDi60U%2FkzHL1TSOmfzb28zmAItSPaHV1GN0Ssd0m3WuawUERPDkesT1jgpl1efyqbfNIj19TDBsKDPBjqkAfBdubjxiFOZtsgMVM%2FSEYhYnslj5EPCd9Wzed7E%2Fp2Bkn2DA2J1edGSSWeZcKxoXciwjWNlLwoVWjUcg2ZCHCSqnwaAG1rHGa8NYI5x5Pnf6lfFli0j9uMaMAhagqf5l1WLsokzgYvpfN09OusIFxe8dTM7pTqQauXyxRhf8GHHZs7ESsDI9rLiYSFjDQsS61Y5%2BZWymjMNEf3l%2FpKBPcqsqn2W&X-Amz-Signature=723221d6e280dde2e22a1c0acde63aa5ea9d1d414be65fc917c14a5c07ced17d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VT2Y37I%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T011002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIAjryFuKnZC1LGmQqleZ0lkrhNjUkDgCHnM%2FjkRkBSvUAiEA3h0ink3eDBZsboCGqbk8rOie3pitS%2BVlh2sOqLZZQ2kq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDLXu4pHIhwU8DIj0FSrcAyzqP1UGyoejVwXJZ%2Fb7Sdmg6P8ugJBs8u4bedQ6RQPBr5%2FNbyLHPSh356%2Frh3k0jhrL4pXJf9yzCsDi%2FnpwLb1eCq4G8W29yqy%2FyKkJ59u2Sa%2Bcyr9lw7PcNju1KnAxq3Bl0N3jMe1B%2FAqJS1XEAdQwmJxbb1x9kPXCPMB79X%2F7xfsWC7Ja8MnokagqXbPeqmtzv4BBB%2BLRpewZBz38ie%2Faa4khPBnd2bNTgR1TDAhi8fGLS9baSRt752Po8WH%2BPEttabplomzavMMbYUjRLCQMjnvL55Uc11lEPKYkMx9Y40MTq%2BTDfAmkIBSeL6%2FPR0qnvdGqXfR4XjCX9RjxAS4D2jiX%2BTjVQiu0Au%2BP6g5rEcK4AfptgUASG8i3NpJJB1%2BF0juY3KWB58YqSyRwV%2F3oTTaD9kBAf%2BcRd9E4J%2ByAbI%2Bfc000szHxKuUx6HjE6JMogmKcoxbQvBkWGUAEvIBsbyMfqert1F5UaZgQLVKBTLj%2Bc0eZMcaZ7C2KFpuZJEUKMVRzhuFRyXK2YCvA%2Bk%2BTSE8zhzaGxBLDIfMHoIauwCUzF1TBq71wUjvITR7ZBQYfSrgD9OGy%2FepVj%2Btyl7SUz2OmOpLH%2BIc64LgtnfPr3gTDN4X%2BxkpA4kuGMJivoM8GOqUBC4eqaeOMDaVapOnZOmYfKW94VofLoqVriTlGtzdzL5bUcrMVfihrZHbCJu0aCG9hkw4HYjvyBc%2BAoJKk4P3jtcqK0OV7KFIICkw7NpGPUm7popPVLXcXgePqrjxc8u%2BABfVcLv8TEcMH1TIJrebJQXiExI9M7klAv5rQv5kvMh7MiYjifq4HATV%2B2PTQy339fbi6F9zWh7kcVEY6Dw3rjj8SmH56&X-Amz-Signature=13738a926f614fedc08462c90fb23eb5778f04249d798e43e046f8f4f90b5a06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

